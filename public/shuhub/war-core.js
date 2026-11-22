/* شُهُب — حرب الجبل (Mountain War) core, shared by browser and tests (UMD → window.SHW_C).
   Side view 300 × 150 (y grows downward). Two castles, a destructible mountain between them, gates floating in the passes.
   Each side drags to aim (angle + power) and releases a volley; rockets fly in arcs, multiply through gates, carve craters,
   and crack bricks. Break the enemy's lantern-heart to win. Fully deterministic from (map seed, fire events). */
(function (root, f) { const m = f(); if (typeof module === 'object' && module.exports) module.exports = m; else root.SHW_C = m; })(this, function () {
  'use strict';
  const W = 300, H = 150, GY = 130, CS = 3, G = 62, DT = 1 / 60, CAP = 360;
  function rng(seed) { let s = seed >>> 0 || 7; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function hashStr(t) { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /* weapons: volley size, weight each, damage multiplier, crater radius, cooldown (s), spread */
  const WPN = {
    swarm: { n: 8, w: 1, dmg: 1, crater: 2.2, cd: 2.6, spread: .05, gap: .06 },
    fire: { n: 5, w: 1, dmg: 2, crater: 2, cd: 5, spread: .04, gap: .08, fire: 1 },
    boulder: { n: 1, w: 14, dmg: 1, crater: 9, cd: 7, spread: 0, gap: 0, big: 1 },
  };
  /* maps: mountain profile [x, peakY, halfWidth] bumps, gates [x, y, h, value, moveAmp, moveSpeed], wind range */
  const MAPS = [
    { n: ['الممر', 'The Pass'], hills: [[120, 74, 30], [180, 74, 30]], valley: [150, 90, 12], gates: [[150, 56, 18, 10, 0, 0]], wind: 0 },
    { n: ['القمة', 'The Peak'], hills: [[150, 54, 58]], gates: [[150, 34, 14, 5, 8, .7], [104, 64, 12, 3, 0, 0], [196, 64, 12, 3, 0, 0]], wind: 4 },
    { n: ['الهضبة', 'The Mesa'], hills: [[150, 76, 70]], flat: [120, 180, 76], gates: [[128, 56, 12, 3, 8, .9], [172, 56, 12, 3, 8, .9], [150, 36, 10, 10, 12, 1.1]], wind: 6 },
    { n: ['الأخدود', 'The Gorge'], hills: [[112, 58, 30], [188, 58, 30]], valley: [150, 112, 14], gates: [[150, 44, 18, 10, 7, .8], [112, 36, 10, 3, 0, 0], [188, 36, 10, 3, 0, 0]], wind: 8 },
  ];
  /* the AI ladder: map, aim error (deg / power), reload slowness, weapon smarts */
  /* computer opponents. err: first-shot error (deg); corr: how well it corrects from its last impact; nA/nP: per-shot shake; slow: reload pace; smart: weapon choice; hp: castle strength */
  const DIFF = {
    easy: { n: ['سهل', 'Easy'], err: 9, corr: .35, nA: 3, nP: .05, slow: 1.6, smart: .1, hp: .8 },
    normal: { n: ['متوسط', 'Normal'], err: 6, corr: .55, nA: 1.8, nP: .03, slow: 1.25, smart: .4, hp: 1 },
    hard: { n: ['صعب', 'Hard'], err: 3.5, corr: .75, nA: 1, nP: .018, slow: 1.05, smart: .7, hp: 1.1 },
    expert: { n: ['خبير', 'Expert'], err: 2, corr: .9, nA: .5, nP: .01, slow: .9, smart: .95, hp: 1.25 },
  };
  const BOTS = [
    Object.assign({}, DIFF.easy, { n: ['الراعي', 'The Shepherd'], map: 0, hp: .7 }),
    Object.assign({}, DIFF.easy, { n: ['الحارس', 'The Watchman'], map: 1, corr: .45, err: 7 }),
    Object.assign({}, DIFF.normal, { n: ['الفارس', 'The Knight'], map: 2 }),
    Object.assign({}, DIFF.hard, { n: ['القائد', 'The Captain'], map: 3, hp: 1 }),
    Object.assign({}, DIFF.hard, { n: ['الأمير', 'The Emir'], map: 1, corr: .85, hp: 1.15 }),
    Object.assign({}, DIFF.expert, { n: ['الصقر الأسود', 'The Black Falcon'], map: 3, hp: 1.3 }),
  ];
  function buildTerrain(M) {
    const h = new Float32Array(W + 1);
    for (let x = 0; x <= W; x++) {
      let y = GY; for (const [cx, py, hw] of M.hills) { const d = Math.abs(x - cx) / hw; if (d < 1) y = Math.min(y, GY - (GY - py) * (Math.cos(d * Math.PI) * .5 + .5)); }
      if (M.flat && x >= M.flat[0] && x <= M.flat[1]) y = Math.min(y, M.flat[2]);
      if (M.valley) { const [vx, vy, vw] = M.valley, d = Math.abs(x - vx) / vw; if (d < 1) y = Math.max(y, vy - (vy - y) * (1 - Math.cos(d * Math.PI)) * .5 * (d < .5 ? d * 2 : 1)); }
      y += Math.sin(x * .37) * .8 + Math.sin(x * 1.3) * .35; h[x] = Math.min(GY, y);
    }
    return h;
  }
  const HP = { 1: 8, 2: 22 };
  function buildCastle(side, seed, hpMul) {
    const cols = 9, rows = 11, t = new Uint8Array(cols * rows), hp = new Float32Array(cols * rows), r = rng(seed), x0 = side ? W - 18 - cols * CS : 18;
    const set = (c, rr, k) => { if (c < 0 || c >= cols || rr < 0 || rr >= rows) return; t[rr * cols + c] = k; hp[rr * cols + c] = (HP[k] || 1) * hpMul; };
    for (let rr = 4; rr < rows; rr++) for (let c = 0; c < cols; c++) set(c, rr, 1);
    for (let rr = 0; rr < 4; rr++) for (const c of [0, 1, 7, 8]) set(c, rr, 1); for (let rr = 2; rr < 4; rr++) for (const c of [3, 4, 5]) set(c, rr, 1);
    for (let i = 0; i < t.length; i++) if (t[i] && r() < .3) { t[i] = 2; hp[i] = HP[2] * hpMul; }
    const cc = 3 + (side ? 1 : 0), cr = 7; for (const [dc, dr] of [[0, 0], [1, 0], [0, 1], [1, 1]]) set(cc + dc, cr + dr, 9);
    for (const [c, rr] of [[cc - 1, cr - 1], [cc + 2, cr - 1], [cc - 1, cr + 2], [cc + 2, cr + 2], [cc, cr - 1], [cc + 1, cr - 1]]) { const i = rr * cols + c; if (t[i] && t[i] !== 9) { t[i] = 2; hp[i] = HP[2] * hpMul; } }
    return { side, cols, rows, t, hp, x0, y0: GY - rows * CS, cc, cr, coreHp: 180 * hpMul, core0: 180 * hpMul };
  }
  function create(mapIdx, seed, opt) {
    opt = opt || {}; const M = MAPS[mapIdx % MAPS.length], r = rng(seed ^ 0xa11);
    const st = { M, map: mapIdx, seed, tick: 0, h: buildTerrain(M), castles: [buildCastle(0, seed ^ 1, opt.hp0 || 1), buildCastle(1, seed ^ 2, opt.hp1 || 1)],
      gates: M.gates.map(([x, y, h, v, amp, sp], i) => ({ i, x, y0: y, y, h, v, amp, sp, ph: i * 2.1, flash: 0 })), R: [], pending: [], cd: [0, 0, 0, 0, 0, 0], wind: 0, windT: 0, vid: 0, impact: [null, null], rw: r, protect: opt.protect == null ? -1 : opt.protect, done: 0, winner: -1, ev: [], peak: [0, 0], dealt: [0, 0] };
    st.windMax = M.wind; st.wind = M.wind ? (r() * 2 - 1) * M.wind : 0;
    return st;
  }
  const launcher = side => side ? { x: W - 52, y: GY - 6 } : { x: 52, y: GY - 6 };
  /* a fire order: side, angle (radians, 0 = toward the enemy horizontally, positive = up), power 0..1, weapon key, seed */
  function velocity(side, a, p) { const v = 46 + 84 * Math.max(0, Math.min(1, p)), dir = side ? -1 : 1; return { vx: Math.cos(a) * v * dir, vy: -Math.sin(a) * v }; }
  function ready(st, side, wk) { return st.tick >= (st.cd[side * 3 + Object.keys(WPN).indexOf(wk)] || 0); }
  function fire(st, o) { // o: {side, a, p, w, s, k (tick)} — schedules the volley; returns false if that weapon is reloading
    const wi = Object.keys(WPN).indexOf(o.w); if (wi < 0) return false; const key = o.side * 3 + wi, at = o.k == null ? st.tick : o.k;
    if (at < (st.cd[key] || 0) - 1) return false; st.cd[key] = at + Math.round(WPN[o.w].cd * 60 * (o.slow || 1));
    const Wp = WPN[o.w], r = rng(o.s >>> 0 || 1), L = launcher(o.side), vid = ++st.vid;
    for (let j = 0; j < Wp.n; j++) { const a = o.a + (r() - .5) * 2 * Wp.spread, p = o.p * (1 + (r() - .5) * .03), v = velocity(o.side, a, p); st.pending.push({ k: at + Math.round(j * Wp.gap * 60), x: L.x, y: L.y, vx: v.vx, vy: v.vy, w: Wp.w, m: 0, o: o.side, wk: o.w, f: Wp.fire || 0, big: Wp.big || 0, vid }); }
    st.ev.push({ e: 'launch', side: o.side, w: o.w }); return true;
  }
  function carve(st, cx, cy, r) { const h = st.h; for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) { const d = Math.sqrt(Math.max(0, r * r - (x - cx) ** 2)); if (cy - d < h[x] + 0.01 && cy + d > h[x]) h[x] = Math.min(H + 5, Math.max(h[x], cy + d)); } }
  function cellOf(C, x, y) { const c = Math.floor((x - C.x0) / CS), r = Math.floor((y - C.y0) / CS); if (c < 0 || c >= C.cols || r < 0 || r >= C.rows) return -1; return r * C.cols + c; }
  function hit(st, C, i, dmg, by) {
    const k = C.t[i]; if (!k) return 0;
    if (k === 9) { const d = Math.max(0, Math.min(dmg, C.coreHp - (st.protect === C.side ? .5 : 0))); /* online: only the defender may break their own heart */ C.coreHp -= d; st.dealt[by] += d; st.ev.push({ e: 'core', side: C.side, i }); if (C.coreHp <= 1e-6 && !st.done) { st.done = 1; st.winner = 1 - C.side; for (let j = 0; j < C.t.length; j++) if (C.t[j] === 9) C.t[j] = 0; st.ev.push({ e: 'win', winner: st.winner }); } return d; }
    const d = Math.min(dmg, C.hp[i]); C.hp[i] -= d; st.dealt[by] += d; if (C.hp[i] <= 1e-6) { C.t[i] = 0; C.dirty = 1; C.by = by; st.ev.push({ e: 'brk', side: C.side, i, k }); } return d;
  }
  function clones(st, p, k) { const n = Math.min(k - 1, Math.max(0, CAP - st.R.length)), each = p.w * k / (n + 1); p.w = each; for (let j = 0; j < n; j++) { const s = (j % 2 ? 1 : -1) * Math.ceil((j + 1) / 2); st.R.push({ x: p.x, y: p.y + s * .4, vx: p.vx * (1 - Math.abs(s) * .012), vy: p.vy + s * 2.2, w: each, m: p.m, o: p.o, wk: p.wk, f: p.f, big: p.big, vid: p.vid }); } }
  function landed(st, p, hitSide) { const I = st.impact[p.o]; if (!I || I.vid !== p.vid) st.impact[p.o] = { vid: p.vid, x: p.x, y: p.y, hit: hitSide, tick: st.tick }; }
  function step(st) {
    if (st.done) { st.tick++; return; } const t = ++st.tick, tt = t * DT;
    for (const g of st.gates) { g.y = g.y0 + (g.amp ? Math.sin(tt * g.sp + g.ph) * g.amp : 0); g.flash = Math.max(0, g.flash - DT * 3); }
    if (st.windMax && t % 1200 === 0) { st.wind = (st.rw() * 2 - 1) * st.windMax; st.ev.push({ e: 'wind' }); }
    for (let i = st.pending.length - 1; i >= 0; i--) if (st.pending[i].k <= t) { st.R.push(st.pending[i]); st.pending.splice(i, 1); }
    const R = st.R; let live = 0;
    for (let k = 0; k < R.length; k++) {
      const p = R[k], x0 = p.x; p.vy += G * DT; p.vx += st.wind * DT * (p.big ? .3 : 1); p.x += p.vx * DT; p.y += p.vy * DT;
      for (const g of st.gates) { if (p.m & (1 << g.i)) continue; if (!((x0 - g.x) * (p.x - g.x) <= 0) || Math.abs(p.y - g.y) > g.h / 2) continue; p.m |= 1 << g.i; g.flash = 1; if (!p.big) clones(st, p, g.v); else p.w *= Math.min(3, g.v); st.ev.push({ e: 'gate', g: g.i, k: g.v, side: p.o }); }
      if (p.x < -10 || p.x > W + 10 || p.y > H + 10) continue;
      let gone = false;
      for (const C of st.castles) { const i = cellOf(C, p.x, p.y); if (i < 0 || !C.t[i]) continue; const mul = WPN[p.wk].dmg; const used = hit(st, C, i, p.w * mul, p.o) / mul; p.w -= used; if (p.big) { for (const [dc, dr] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1]]) { const c = (i % C.cols) + dc, r = ((i / C.cols) | 0) + dr; if (c >= 0 && c < C.cols && r >= 0 && r < C.rows) hit(st, C, r * C.cols + c, 6, p.o); } } landed(st, p, C.side); if (p.w <= 1e-6) { st.ev.push({ e: 'boom', x: p.x, y: p.y, r: p.big ? 5 : 1, side: p.o }); gone = true; } break; }
      if (gone) continue;
      const xi = Math.round(p.x); if (xi >= 0 && xi <= W && p.y >= st.h[xi]) { landed(st, p, 'ground'); const r = WPN[p.wk].crater * (p.big ? 1 : Math.min(2.2, .7 + Math.log2(1 + p.w) * .35)); carve(st, p.x, p.y, r); st.ev.push({ e: 'boom', x: p.x, y: p.y, r, side: p.o, dirt: 1 }); continue; }
      R[live++] = p;
    }
    R.length = live; for (const Cs of st.castles) if (Cs.dirty) collapse(st, Cs);
    for (const s of [0, 1]) { let n = 0; for (const p of R) if (p.o === s) n += p.w; if (n > st.peak[s]) st.peak[s] = n; }
  }
  /* bricks that no longer connect to the ground fall (the heart stays put) */
  function collapse(st, C) {
    C.dirty = 0; const n = C.t.length, seen = new Uint8Array(n), q = [];
    for (let c = 0; c < C.cols; c++) { const i = (C.rows - 1) * C.cols + c; if (C.t[i]) { seen[i] = 1; q.push(i); } }
    while (q.length) { const i = q.pop(), c = i % C.cols; for (const j of [i - C.cols, i + C.cols, c > 0 ? i - 1 : -1, c < C.cols - 1 ? i + 1 : -1]) if (j >= 0 && j < n && !seen[j] && C.t[j]) { seen[j] = 1; q.push(j); } }
    for (let i = 0; i < n; i++) if (C.t[i] && !seen[i] && C.t[i] !== 9) { st.dealt[C.by] += C.hp[i]; st.ev.push({ e: 'fall', side: C.side, i, k: C.t[i] }); C.t[i] = 0; }
  }
  /* the computer aims like a person: a first guess, then it corrects from where its last volley landed */
  function botPlan(st, side, B, mem, r) { // mem: { shots: {vid: {a,p}}, last: {a,p} } — call remember() after firing
    const E = st.castles[1 - side], tx = E.x0 + (E.cc + 1) * CS, ty = E.y0 + (E.cr + 1) * CS, D = Math.PI / 180, I = st.impact[side];
    mem.shots = mem.shots || {}; const jit = (a, p, k = 1) => ({ a: Math.max(5 * D, Math.min(72 * D, a + (r() - .5) * 2 * B.nA * D * k)), p: Math.max(.05, Math.min(1, p + (r() - .5) * 2 * B.nP * k)) });
    const base = I && mem.shots[I.vid];
    if (!base) { if (mem.last) return jit(mem.last.a, mem.last.p); const s0 = botAim(st, side, { err: B.err, perr: B.err * .012 }, r); return { a: s0.a, p: s0.p, fresh: 1 }; }
    if (base.used) return jit(mem.last.a, mem.last.p);
    base.used = 1;
    let a = base.a, p = base.p; const dir = side ? -1 : 1, short = (tx - I.x) * dir;
    const flat = (pp) => { const v = velocity(side, a, pp), L = launcher(side); let x = L.x, y = L.y, vx = v.vx, vy = v.vy; for (let t = 0; t < 600; t++) { vy += G * DT; vx += st.wind * DT; x += vx * DT; y += vy * DT; if (vy > 0 && y >= I.y) break; } return x; };
    const slope = ((flat(Math.min(1, p + .03)) - flat(Math.max(.05, p - .03))) * dir) / (Math.min(1, p + .03) - Math.max(.05, p - .03));
    if (I.hit === 1 - side) { p += (Math.abs(slope) > 5 ? short / slope : 0) * .25; mem.good = { a, p }; return jit(a, p, .6); } // hitting the fort: keep pounding, creep toward the heart
    if (I.hit === 'ground' && I.y < GY - 14 && short > 20) { if (mem.good) return jit(mem.good.a, mem.good.p, .4); a = Math.min(72 * D, a + (4 + r() * 3) * D); p = Math.min(1, p + .07); } // hit the mountain: back to what worked, or lob higher and harder
    else if (I.hit === side) a = Math.max(8 * D, a - 6 * D); // fell on itself: flatten
    else p = p + (Math.abs(slope) > 5 ? short / slope : Math.sign(short) * .06) * B.corr;
    return jit(a, p);
  }
  function remember(st, mem, a, p) { mem.shots = mem.shots || {}; mem.shots[st.vid] = { a, p }; mem.last = { a, p }; }
  /* where a single rocket would land (no clones), for the aim preview and the AI */
  function trace(st, side, a, p, maxT = 6, stopAt) {
    const v = velocity(side, a, p), L = launcher(side); let x = L.x, y = L.y, vx = v.vx, vy = v.vy, mult = 1, m = 0; const pts = [];
    for (let t = 0; t < maxT * 60; t++) { const x0 = x, tt = (st.tick + t) * DT; vy += G * DT; vx += st.wind * DT; x += vx * DT; y += vy * DT; if (t % 3 === 0) pts.push([x, y]); if (stopAt && pts.length > stopAt) break;
      for (const g of st.gates) { if (m & (1 << g.i)) continue; const gy = g.y0 + (g.amp ? Math.sin(tt * g.sp + g.ph) * g.amp : 0); if ((x0 - g.x) * (x - g.x) <= 0 && Math.abs(y - gy) <= g.h / 2) { m |= 1 << g.i; mult *= g.v; } }
      if (x < -10 || x > W + 10 || y > H + 10) return { pts, x, y, mult, hit: null };
      for (const C of st.castles) { const i = cellOf(C, x, y); if (i >= 0 && C.t[i]) return { pts, x, y, mult, hit: C.side, cell: i }; }
      const xi = Math.round(x); if (xi >= 0 && xi <= W && y >= st.h[xi]) return { pts, x, y, mult, hit: 'ground' };
    }
    return { pts, x, y, mult, hit: null };
  }
  /* AI: tries many aims, prefers ones that reach the enemy heart through big gates */
  function botAim(st, side, B, r) {
    const E = st.castles[1 - side], cx = E.x0 + (E.cc + 1) * CS, cy = E.y0 + (E.cr + 1) * CS; let best = null;
    for (let ai = 0; ai < 30; ai++) for (let pi = 0; pi < 16; pi++) {
      const a = (8 + ai * 2) * Math.PI / 180, p = .25 + pi * .05, tr = trace(st, side, a, p);
      let sc; if (tr.hit === 1 - side) sc = 100 - Math.hypot(tr.x - cx, tr.y - cy) * 2; else if (tr.hit === side) sc = -500; else sc = -Math.abs(tr.x - cx) - 20;
      sc *= 1; sc += Math.log2(tr.mult) * 30 * (tr.hit === 1 - side ? 1 : .2);
      if (!best || sc > best.sc) best = { a, p, sc, mult: tr.mult };
    }
    const er = B.err * Math.PI / 180;
    return { a: Math.max(5 * Math.PI / 180, Math.min(72 * Math.PI / 180, best.a + (r() - .5) * 2 * er)), p: Math.max(0, Math.min(1, best.p + (r() - .5) * 2 * B.perr)), mult: best.mult, sc: best.sc };
  }
  /* victim-authoritative castle sync for online play */
  function packCastle(C) { const a = []; for (let i = 0; i < C.t.length; i++) a.push(C.t[i] ? Math.round(C.hp[i] * 10) / 10 : 0); return { hp: a, core: Math.round(C.coreHp * 10) / 10 }; }
  function applyCastle(st, C, pk) { if (!pk || !Array.isArray(pk.hp) || pk.hp.length !== C.t.length) return; for (let i = 0; i < C.t.length; i++) { const v = +pk.hp[i] || 0; if (C.t[i] === 9) continue; if (v <= 0) C.t[i] = 0; else if (C.t[i]) C.hp[i] = Math.min(C.hp[i], v); } if (isFinite(+pk.core)) C.coreHp = Math.min(C.coreHp, Math.max(0, +pk.core)); if (C.coreHp <= 1e-6 && !st.done) { st.done = 1; st.winner = 1 - C.side; for (let j = 0; j < C.t.length; j++) if (C.t[j] === 9) C.t[j] = 0; st.ev.push({ e: 'win', winner: st.winner }); } }
  return { W, H, GY, CS, G, DT, WPN, MAPS, BOTS, DIFF, botPlan, remember, rng, hashStr, create, fire, ready, step, trace, botAim, launcher, velocity, cellOf, packCastle, applyCastle, carve };
});
