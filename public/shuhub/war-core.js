/* شُهُب — حرب الجبل (Mountain War) core, shared by browser, server and tests (UMD → window.SHW_C).
   Side view 300 × 150 (y grows downward). Two castles, a destructible mountain between them, star gates floating in the passes.
   Signature mechanics:
     • Star Gates — volleys multiply as they pass gates in the air (aim decides which gates you thread).
     • Rolling Boulders — boulders land, roll with the slope, gather speed and slam into walls: bank shots off the mountain.
     • Dune Shield — spend sand to raise a dune in front of your fort; it soaks shots until it is blown away.
     • The Great Star — damage and gate passes charge a meter; release it to call a meteor down on any point.
     • Oil Jars — jars on the battlefield explode when struck (fire ignites them from close by) and set off their neighbours.
   Fully deterministic from (map, seed, ordered actions). */
(function (root, f) { const m = f(); if (typeof module === 'object' && module.exports) module.exports = m; else root.SHW_C = m; })(this, function () {
  'use strict';
  const W = 300, H = 150, GY = 130, CS = 3, G = 62, DT = 1 / 60, CAP = 360;
  function rng(seed) { let s = (seed >>> 0) ^ 0x9e3779b9 || 7; const f = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; for (let i = 0; i < 6; i++) f(); return f; } /* warmed up: small seeds no longer give biased first values */
  function hashStr(t) { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /* weapons: volley size, weight each, damage multiplier, crater radius, cooldown (s), spread, gap between shots */
  const WPN = {
    swarm: { n: 8, w: 1, dmg: 1, crater: 2.2, cd: 2.6, spread: .05, gap: .06 },
    fire: { n: 5, w: 1, dmg: 2, crater: 2, cd: 5, spread: .04, gap: .08, fire: 1 },
    boulder: { n: 1, w: 14, dmg: 1, crater: 4, cd: 7, spread: 0, gap: 0, big: 1 },
    ball: { n: 1, w: 6, dmg: 1, crater: 2.4, cd: 3, spread: 0, gap: 0, heavy: 1, splash: [4, 3.5] }, // cannonball: reliable, half the wind, arrows can't stop it
    cluster: { n: 1, w: 3, dmg: 1, crater: 2, cd: 6.5, spread: 0, gap: 0, cl: 6 }, // splits into bomblets at the top of its arc
    bolt: { n: 1, w: 1, dmg: 1, crater: 1.5, cd: 9, spread: 0, gap: 0, bolt: 1, ammo: 2 }, // lightning: strikes the whole column it lands on, gates don't multiply it
  };
  const ACTS = ['swarm', 'fire', 'boulder', 'dune', 'ball', 'cluster', 'bolt'], NA = 8; // cooldown slots per side
  /* castle defenders: archer posts [col,row] on the tower tops; arrows only stop light shots (meteors, fire, bomblets) */
  const POSTS = [[0, 0], [8, 0], [3, 2], [5, 2]], ARCH_RANGE = 36, ARCH_HIT = .4, REPAIR_EVERY = 540, REPAIR_WALK = 120;
  const hash = (a, b, c) => { let h = Math.imul((a ^ 0x9e3779b9) >>> 0, 2654435761) ^ Math.imul(b + 0x7f4a7c15, 2246822519) ^ Math.imul(c + 0x165667b1, 3266489917); h ^= h >>> 15; h = Math.imul(h, 2246822519); h ^= h >>> 13; return (h >>> 0) / 4294967296; };
  const SAND_MAX = 3, SAND_REGEN = 9 * 60, DUNE_CD = 90, STAR_DELAY = 70;
  /* maps: hills [x, peakY, halfWidth], gates [x, y, h, value, moveAmp, moveSpeed], wind range, oil jars at x, weather */
  const MAPS = [
    { n: ['الممر', 'The Pass'], hills: [[120, 74, 30], [180, 74, 30]], valley: [150, 90, 12], gates: [[150, 56, 18, 10, 0, 0]], wind: 0, jars: [100, 200], wx: 'dusk' },
    { n: ['القمة', 'The Peak'], hills: [[150, 54, 58]], gates: [[150, 34, 14, 5, 8, .7], [104, 64, 12, 3, 0, 0], [196, 64, 12, 3, 0, 0]], wind: 4, jars: [128, 172], wx: 'dawn' },
    { n: ['الهضبة', 'The Mesa'], hills: [[150, 76, 70]], flat: [120, 180, 76], gates: [[128, 56, 12, 3, 8, .9], [172, 56, 12, 3, 8, .9], [150, 36, 10, 10, 12, 1.1]], wind: 6, jars: [135, 150, 165], wx: 'noon' },
    { n: ['الأخدود', 'The Gorge'], hills: [[112, 58, 30], [188, 58, 30]], valley: [150, 112, 14], gates: [[150, 44, 18, 10, 7, .8], [112, 36, 10, 3, 0, 0], [188, 36, 10, 3, 0, 0]], wind: 8, jars: [143, 157], wx: 'night' },
    { n: ['العاصفة', 'The Storm'], hills: [[126, 68, 30], [174, 68, 30]], valley: [150, 96, 10], gates: [[150, 50, 14, 5, 10, 1], [108, 38, 10, 3, 6, .6], [192, 38, 10, 3, 6, .6]], wind: 11, jars: [92, 150, 208], wx: 'storm' },
  ];
  /* computer personalities. err: first-shot error (deg); corr: correction from its last impact; nA/nP: per-shot shake; slow: reload pace;
     w: weapon appetite; dune: chance to raise a shield when threatened; star: 'now' | 'smart' | 'late'; jars: appetite for jar shots; hp: fort strength */
  const P = {
    beginner: { n: ['مبتدئ', 'Beginner'], err: 9, corr: .35, nA: 3, nP: .05, slow: 1.6, w: { swarm: 1, fire: .1, boulder: .1 , ball: .3, cluster: 0, bolt: 0 }, dune: 0, star: 'late', jars: 0, gates: 0, hp: .8 },
    tactical: { n: ['تكتيكي', 'Tactician'], err: 4, corr: .75, nA: 1.2, nP: .02, slow: 1.1, w: { swarm: .7, fire: .45, boulder: .35 , ball: .5, cluster: .35, bolt: .3 }, dune: .35, star: 'smart', jars: .6, gates: 1, hp: 1 },
    aggressive: { n: ['مهاجم', 'Berserker'], err: 5, corr: .6, nA: 1.6, nP: .028, slow: .82, w: { swarm: .55, fire: .7, boulder: .6 , ball: .6, cluster: .55, bolt: .4 }, dune: 0, star: 'now', jars: .2, gates: .3, hp: .95 },
    defensive: { n: ['مدافع', 'Warden'], err: 4.5, corr: .7, nA: 1.3, nP: .022, slow: 1.2, w: { swarm: .8, fire: .2, boulder: .3 , ball: .6, cluster: .2, bolt: .2 }, dune: .9, star: 'smart', jars: .3, gates: .5, hp: 1.15 },
    expert: { n: ['خبير', 'Grandmaster'], err: 2, corr: .9, nA: .5, nP: .01, slow: .95, w: { swarm: .6, fire: .6, boulder: .5 , ball: .5, cluster: .45, bolt: .5 }, dune: .6, star: 'smart', jars: .8, gates: 1, hp: 1.2, adapt: 1 },
  };
  /* legacy difficulty names (quick battle) map onto personalities */
  const DIFF = { easy: Object.assign({}, P.beginner, { n: ['سهل', 'Easy'] }), normal: Object.assign({}, P.tactical, { n: ['متوسط', 'Normal'], err: 6, corr: .55, nA: 1.8, nP: .03, slow: 1.25, dune: .15 }), hard: Object.assign({}, P.tactical, { n: ['صعب', 'Hard'], err: 3.5 }), expert: Object.assign({}, P.expert, { n: ['خبير', 'Expert'] }) };
  /* the campaign: ten lords, each with a personality, a map and a fort strength */
  const BOTS = [
    Object.assign({}, P.beginner, { n: ['الراعي', 'The Shepherd'], map: 0, hp: .7, per: 'beginner' }),
    Object.assign({}, P.beginner, { n: ['الحارس', 'The Watchman'], map: 1, corr: .45, err: 7, per: 'beginner' }),
    Object.assign({}, P.aggressive, { n: ['الذئب', 'The Wolf'], map: 2, err: 6.5, corr: .5, per: 'aggressive' }),
    Object.assign({}, P.defensive, { n: ['البنّاء', 'The Mason'], map: 0, err: 6, per: 'defensive' }),
    Object.assign({}, P.tactical, { n: ['الفارس', 'The Knight'], map: 3, per: 'tactical' }),
    Object.assign({}, P.aggressive, { n: ['العاصفة الحمراء', 'Red Storm'], map: 4, per: 'aggressive' }),
    Object.assign({}, P.defensive, { n: ['حارسة الواحة', 'Oasis Warden'], map: 2, err: 3.5, corr: .8, per: 'defensive' }),
    Object.assign({}, P.tactical, { n: ['القائد', 'The Captain'], map: 1, err: 3, corr: .82, per: 'tactical', hp: 1.1 }),
    Object.assign({}, P.expert, { n: ['الأمير', 'The Emir'], map: 4, err: 2.6, corr: .85, per: 'expert', hp: 1.15 }),
    Object.assign({}, P.expert, { n: ['الصقر الأسود', 'The Black Falcon'], map: 3, per: 'expert', hp: 1.3 }),
  ];
  function buildTerrain(M) {
    const h = new Float32Array(W + 1);
    for (let x = 0; x <= W; x++) {
      let y = GY; for (const [cx, py, hw] of M.hills) { const d = Math.abs(x - cx) / hw; if (d < 1) y = Math.min(y, GY - (GY - py) * (Math.cos(d * Math.PI) * .5 + .5)); }
      if (M.flat && x >= M.flat[0] && x <= M.flat[1]) y = Math.min(y, M.flat[2]);
      if (M.valley) { const [vx, vy, vw] = M.valley, d = Math.abs(x - vx) / vw; if (d < 1) y = Math.max(y, vy - (vy - y) * (1 - Math.cos(d * Math.PI)) * .5 * (d < .5 ? d * 2 : 1)); }
      const mxx = Math.min(x, W - x); y += Math.sin(mxx * .37) * .8 + Math.sin(mxx * 1.3) * .35; h[x] = Math.min(GY, y); /* mirrored ripples: both sides get the same ground */
    }
    return h;
  }
  const HP = { 1: 18, 2: 48 };
  function buildCastle(side, seed, hpMul) {
    const cols = 9, rows = 11, t = new Uint8Array(cols * rows), hp = new Float32Array(cols * rows), r = rng(seed), x0 = side ? W - 18 - cols * CS : 18;
    const set = (c, rr, k) => { if (c < 0 || c >= cols || rr < 0 || rr >= rows) return; t[rr * cols + c] = k; hp[rr * cols + c] = (HP[k] || 1) * hpMul; };
    for (let rr = 4; rr < rows; rr++) for (let c = 0; c < cols; c++) set(c, rr, 1);
    for (let rr = 0; rr < 4; rr++) for (const c of [0, 1, 7, 8]) set(c, rr, 1); for (let rr = 2; rr < 4; rr++) for (const c of [3, 4, 5]) set(c, rr, 1);
    for (let i = 0; i < t.length; i++) if (t[i] && r() < .3) { t[i] = 2; hp[i] = HP[2] * hpMul; }
    const cc = 3 + (side ? 1 : 0), cr = 7; for (const [dc, dr] of [[0, 0], [1, 0], [0, 1], [1, 1]]) set(cc + dc, cr + dr, 9);
    for (const [c, rr] of [[cc - 1, cr - 1], [cc + 2, cr - 1], [cc - 1, cr + 2], [cc + 2, cr + 2], [cc, cr - 1], [cc + 1, cr - 1]]) { const i = rr * cols + c; if (t[i] && t[i] !== 9) { t[i] = 2; hp[i] = HP[2] * hpMul; } }
    const gc = side ? 6 : 2; return { side, cols, rows, t, hp, x0, y0: GY - rows * CS, cc, cr, coreHp: 360 * hpMul, core0: 360 * hpMul, hm: hpMul, orig: Uint8Array.from(t), gone: new Int32Array(cols * rows), burn: new Uint16Array(cols * rows), arc: [0, 0, 0, 0], gate: [(rows - 1) * cols + gc, (rows - 2) * cols + gc], rep: null, ls: 0, rage: 0, repairs: 0 };
  }
  function create(mapIdx, seed, opt) {
    opt = opt || {}; const M = MAPS[mapIdx % MAPS.length], r = rng(seed ^ 0xa11);
    const st = { M, map: mapIdx % MAPS.length, seed, tick: 0, h: buildTerrain(M), castles: [buildCastle(0, seed ^ 1, opt.hp0 || 1), buildCastle(1, seed ^ 2, opt.hp1 || 1)],
      gates: M.gates.map(([x, y, h, v, amp, sp], i) => ({ i, x, y0: y, y, h, v, amp, sp, ph: i * 2.1, flash: 0 })), R: [], pending: [], cd: new Array(NA * 2).fill(0), bolts: [0, 1].map(s => WPN.bolt.ammo + (((opt.mods || [])[s] || {}).bolt || 0)), mods: [0, 1].map(s => ((opt.mods || [])[s]) || {}), re: rng(seed ^ 0xe7e7), nextEv: 900, gust: 0, crate: null, slid: {}, arrows: [0, 0], intercepted: [0, 0], bolted: [0, 0], burned: [0, 0], slides: [0, 0], crates: [0, 0], wind: 0, vid: 0, impact: [null, null], rw: r,
      protect: opt.protect == null ? -1 : opt.protect, done: 0, winner: -1, ev: [], peak: [0, 0], dealt: [0, 0], gatesHit: [0, 0], gv: {}, chains: [0, 0], stars: [0, 0], dunes: [0, 0],
      sand: [SAND_MAX, SAND_MAX], sandT: [0, 0], star: [0, 0], starCalls: [], jars: (opt.noJars ? [] : M.jars).map((x, i) => ({ i, x, y: 0, alive: 1, fuse: 0, by: -1 })), opt };
    for (const j of st.jars) j.y = st.h[Math.round(j.x)];
    st.windMax = opt.windMax != null ? opt.windMax : M.wind; st.wind = st.windMax ? (r() * 2 - 1) * st.windMax : 0;
    return st;
  }
  const launcher = side => side ? { x: W - 52, y: GY - 6 } : { x: 52, y: GY - 6 };
  /* the strip of ground each side may raise dunes on (between its fort and the mountain) */
  const duneRange = side => side ? [W - 128, W - 62] : [62, 128];
  function velocity(side, a, p) { const v = 46 + 84 * Math.max(0, Math.min(1, p)), dir = side ? -1 : 1; return { vx: Math.cos(a) * v * dir, vy: -Math.sin(a) * v }; }
  function ready(st, side, wk) { if (wk === 'star') return st.star[side] >= 1; if (wk === 'dune' && st.sand[side] < 1) return false; if (wk === 'bolt' && st.bolts[side] < 1) return false; return (st.opt.noCd && wk !== 'dune') || st.tick >= (st.cd[side * NA + ACTS.indexOf(wk)] || 0); }
  /* one action: {side, w: swarm|fire|boulder|dune|star, a (radians), p (0..1 power; for dune/star: position 0..1), s (seed), k (tick)} */
  function fire(st, o) {
    const at = o.k == null ? st.tick : o.k;
    if (o.w === 'star') { if (st.star[o.side] < 1 || st.done) return false; st.star[o.side] = 0; st.stars[o.side]++; const x = Math.max(4, Math.min(W - 4, o.p * W)); st.starCalls.push({ side: o.side, x, k: at + STAR_DELAY }); st.ev.push({ e: 'starcall', side: o.side, x, k: at + STAR_DELAY }); return true; }
    const ai = ACTS.indexOf(o.w); if (ai < 0 || st.done) return false; const key = o.side * NA + ai; if (!(st.opt.noCd && o.w !== 'dune') && at < (st.cd[key] || 0) - 1) return false; if (o.w === 'bolt') { if (st.bolts[o.side] < 1) return false; st.bolts[o.side]--; }
    if (o.w === 'dune') { if (st.sand[o.side] < 1) return false; const [a0, a1] = duneRange(o.side), x = a0 + Math.max(0, Math.min(1, o.p)) * (a1 - a0); st.sand[o.side]--; st.cd[key] = at + DUNE_CD; raiseDune(st, x); st.dunes[o.side]++; st.ev.push({ e: 'dune', side: o.side, x }); return true; }
    st.cd[key] = at + Math.round(WPN[o.w].cd * 60 * (o.slow || 1));
    const Wp = WPN[o.w], r = rng(o.s >>> 0 || 1), L = launcher(o.side), vid = ++st.vid;
    for (let j = 0; j < Wp.n; j++) { const a = o.a + (r() - .5) * 2 * Wp.spread, p = o.p * (1 + (r() - .5) * .03), v = velocity(o.side, a, p); st.pending.push({ k: at + Math.round(j * Wp.gap * 60), x: L.x, y: L.y, vx: v.vx, vy: v.vy, w: Wp.w, m: 0, o: o.side, wk: o.w, f: Wp.fire || 0, big: Wp.big || 0, vid, cl: Wp.cl ? Wp.cl + (st.mods[o.side].clus || 0) : 0 }); }
    st.ev.push({ e: 'launch', side: o.side, w: o.w }); return true;
  }
  function raiseDune(st, cx) { const h = st.h; for (let x = Math.max(0, Math.floor(cx - 8)); x <= Math.min(W, Math.ceil(cx + 8)); x++) { const d = Math.abs(x - cx) / 8, up = 24 * (Math.cos(d * Math.PI) * .5 + .5); h[x] = Math.max(GY - 40, Math.min(h[x], GY) - up * (h[x] > GY - 40 ? 1 : 0)); } for (const j of st.jars) if (j.alive) j.y = h[Math.round(j.x)]; }
  function carve(st, cx, cy, r) { const h = st.h; for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) { const d = Math.sqrt(Math.max(0, r * r - (x - cx) ** 2)); if (cy - d < h[x] + 0.01 && cy + d > h[x]) h[x] = Math.min(H + 5, Math.max(h[x], cy + d)); } }
  function cellOf(C, x, y) { const c = Math.floor((x - C.x0) / CS), r = Math.floor((y - C.y0) / CS); if (c < 0 || c >= C.cols || r < 0 || r >= C.rows) return -1; return r * C.cols + c; }
  function hit(st, C, i, dmg, by, noCharge) {
    const k = C.t[i]; if (!k) return 0;
    if (k === 9) { const d = Math.max(0, Math.min(dmg, C.coreHp - (st.protect === C.side ? .5 : 0))); /* online: only the defender may break their own heart */ C.coreHp -= d; st.dealt[by] += d; if (!C.ls && C.coreHp < C.core0 * .3 && C.coreHp > 1e-6) { C.ls = 1; C.lsAt = st.tick + 1; } if (by !== C.side && !noCharge) st.star[by] = Math.min(1, st.star[by] + d / 520); st.ev.push({ e: 'core', side: C.side, i }); if (C.coreHp <= 1e-6 && !st.done) { st.done = 1; st.winner = 1 - C.side; for (let j = 0; j < C.t.length; j++) if (C.t[j] === 9) C.t[j] = 0; st.ev.push({ e: 'win', winner: st.winner }); } return d; }
    const d = Math.min(dmg, C.hp[i]); C.hp[i] -= d; st.dealt[by] += d; if (by !== C.side && !noCharge) st.star[by] = Math.min(1, st.star[by] + d / 520); if (C.hp[i] <= 1e-6) { C.t[i] = 0; C.burn[i] = 0; C.gone[i] = st.tick; C.dirty = 1; C.by = by; st.ev.push({ e: 'brk', side: C.side, i, k }); } return d;
  }
  function blastCastles(st, x, y, rad, dmg, by) { for (const C of st.castles) for (let i = 0; i < C.t.length; i++) { if (!C.t[i]) continue; const cx = C.x0 + ((i % C.cols) + .5) * CS, cy = C.y0 + (((i / C.cols) | 0) + .5) * CS, d = Math.hypot(cx - x, cy - y); if (d < rad) hit(st, C, i, dmg * (1 - d / rad * .6), by, 1); } } /* blasts never recharge the star meter */
  function igniteJar(st, j, by, delay) { if (!j.alive || j.fuse) return; j.fuse = st.tick + (delay || 1); j.by = by; }
  function clones(st, p, k) { const n = Math.min(k - 1, Math.max(0, CAP - st.R.length)), each = p.w * k / (n + 1); p.w = each; for (let j = 0; j < n; j++) { const s = (j % 2 ? 1 : -1) * Math.ceil((j + 1) / 2); st.R.push({ x: p.x, y: p.y + s * .4, vx: p.vx * (1 - Math.abs(s) * .012), vy: p.vy + s * 2.2, w: each, m: p.m, o: p.o, wk: p.wk, f: p.f, big: p.big, vid: p.vid, cl: p.cl, split: p.split }); } }
  function landed(st, p, hitSide) { const I = st.impact[p.o]; if (!I || I.vid !== p.vid) st.impact[p.o] = { vid: p.vid, x: p.x, y: p.y, hit: hitSide, tick: st.tick }; }
  function explodeBoulder(st, p) { carve(st, p.x, p.y + 1, 6); blastCastles(st, p.x, p.y, 7, 9, p.o); for (const j of st.jars) if (j.alive && Math.hypot(j.x - p.x, j.y - p.y) < 8) igniteJar(st, j, p.o, 4); st.ev.push({ e: 'boom', x: p.x, y: p.y, r: 6, side: p.o, dirt: 1 }); }
  function starBlast(st, p) { carve(st, p.x, p.y, 13); blastCastles(st, p.x, p.y, 11, 34, p.o); for (const j of st.jars) if (j.alive && Math.abs(j.x - p.x) < 16) igniteJar(st, j, p.o, 6); st.ev.push({ e: 'star', x: p.x, y: p.y, side: p.o }); }
  /* lightning: strikes the whole column at x, top brick hardest */
  function lightning(st, x, by) {
    let top = st.h[Math.max(0, Math.min(W, Math.round(x)))];
    for (const C of st.castles) { let dmg = 18; for (let r = 0; r < C.rows; r++) for (let c = 0; c < C.cols; c++) { const i = r * C.cols + c, cx = C.x0 + (c + .5) * CS; if (!C.t[i] || Math.abs(cx - x) > 2.6) continue; const cy = C.y0 + r * CS; if (cy < top) top = cy; hit(st, C, i, C.t[i] === 9 ? 22 : dmg, by, 1); dmg *= .82; } }
    for (const j of st.jars) if (j.alive && Math.abs(j.x - x) < 3.5) igniteJar(st, j, by, 2);
    carve(st, x, st.h[Math.max(0, Math.min(W, Math.round(x)))], 2.6); if (by >= 0) st.bolted[by]++; st.ev.push({ e: 'bolt', x, y: top, side: by });
  }
  /* a hard impact high on a slope shakes rocks loose: one rolls downhill, toward whichever fort lies that way */
  function rockslide(st, p, chance) {
    if (p.o < 0 || st.slid[p.vid]) return; const xi = Math.max(4, Math.min(W - 4, Math.round(p.x))), h = st.h; if (h[xi] > GY - 22) return; const sl = (h[xi + 3] - h[xi - 3]) / 6; if (Math.abs(sl) < .55) return;
    if (hash(st.seed, p.vid, xi) > chance) return; st.slid[p.vid] = 1; const dir = Math.sign(sl); st.slides[p.o]++;
    st.R.push({ x: p.x + dir * 3, y: h[Math.round(p.x + dir * 3)] - 1.6, vx: dir * 16, vy: 0, w: 8, m: 0xffff, o: p.o, wk: 'boulder', f: 0, big: 1, roll: 1, rt: 0, vid: p.vid, slide: 1 }); st.ev.push({ e: 'slide', x: p.x, y: p.y, dir, side: p.o });
  }
  function ignite(st, C, i, ticks) { if (!C.t[i] || C.t[i] === 9) return; if (!C.burn[i]) st.ev.push({ e: 'ignite', side: C.side, i }); C.burn[i] = Math.max(C.burn[i], ticks); }
  /* the living fort: archers, fire, repair crews, last stand */
  function forts(st) {
    const t = st.tick;
    for (const C of st.castles) {
      const s = C.side, frac = Math.max(0, C.coreHp / C.core0), mods = st.mods[s];
      // archers on the tower tops shoot light shots out of the sky — fewer towers, fewer archers; a wounded fort reloads slower
      for (let k = 0; k < POSTS.length; k++) { const [pc, pr] = POSTS[k], pi = pr * C.cols + pc; if (!C.t[pi] || t < C.arc[k]) continue;
        const ax = C.x0 + (pc + .5) * CS, ay = C.y0 + pr * CS - 2; let best = null, bd = ARCH_RANGE;
        for (const p of st.R) { if (p.o === s || p.big || p.roll || p.dead || WPN[p.wk].heavy || WPN[p.wk].bolt || p.vy <= 0 || p.y > ay + 4) continue; const d = Math.hypot(p.x - ax, p.y - ay); if (d < bd) { bd = d; best = p; } }
        if (!best) continue; C.arc[k] = t + Math.round((80 + 70 * (1 - frac)) * (C.rage > t ? .65 : 1) * (1 - .12 * (mods.arch || 0)));
        const ok = hash(st.seed ^ s, best.vid * 64 + k, t) < ARCH_HIT; if (ok) { best.dead = 1; if (best.o >= 0) st.intercepted[s]++; } st.arrows[s]++; st.ev.push({ e: 'arrow', side: s, k, ax, ay, x: best.x, y: best.y, hit: ok ? 1 : 0 }); }
      // fire: burning bricks smoulder, then spread to the weaker sandstone next to them
      if (t % 20 === 0) for (let i = 0; i < C.t.length; i++) { if (!C.burn[i]) continue; if (!C.t[i]) { C.burn[i] = 0; continue; } C.burn[i] = Math.max(0, C.burn[i] - 20); hit(st, C, i, 1.1, 1 - s, 1); st.burned[1 - s] += 1.1;
        if (t % 60 === 0 && C.burn[i] > 60) { const c = i % C.cols, nb = [i - C.cols, i + C.cols, c > 0 ? i - 1 : -1, c < C.cols - 1 ? i + 1 : -1], j = nb[Math.floor(hash(st.seed, i, t) * 4)]; if (j >= 0 && j < C.t.length && C.t[j] === 1 && !C.burn[j] && hash(st.seed, j, t + 1) < .45) ignite(st, C, j, 150); } }
      // repair crew: while the gate stands, masons walk out and rebuild a fallen brick (lowest first, nearest the gate)
      const gateUp = C.t[C.gate[0]] && C.t[C.gate[1]];
      if (C.rep && t >= C.rep.at) { const i = C.rep.i; C.rep = null; if (gateUp && !C.t[i] && frac > 0 && !st.done) { C.t[i] = C.orig[i]; C.hp[i] = (HP[C.orig[i]] || 1) * C.hm * .5; C.burn[i] = 0; C.repairs++; st.ev.push({ e: 'repair', side: s, i }); } }
      if (!C.rep && gateUp && frac > 0 && (t + s * 270) % REPAIR_EVERY === 0) { let best = -1, bs = 1e9; const gc = C.gate[0] % C.cols;
        for (let i = 0; i < C.t.length; i++) { if (C.t[i] || !C.orig[i] || C.orig[i] === 9 || t - C.gone[i] < 120) continue; const r = (i / C.cols) | 0; if (r < C.rows - 1 && !C.t[i + C.cols]) continue; const sc = (C.rows - r) * 20 + Math.abs((i % C.cols) - gc); if (sc < bs) { bs = sc; best = i; } }
        if (best >= 0) { C.rep = { i: best, at: t + REPAIR_WALK }; st.ev.push({ e: 'sortie', side: s, i: best }); } }
      // last stand: once the heart falls below 30%, the crew fires a free triple salvo and the archers rally
      if (C.lsAt && t >= C.lsAt && !st.done) { C.lsAt = 0; C.rage = t + 600; const r = rng((st.seed ^ (s + 1) * 7919) >>> 0), A = botAim(st, s, { err: 5, perr: .05, gates: 0 }, r), L = launcher(s), vid = ++st.vid;
        for (let j = 0; j < 3; j++) { const v = velocity(s, A.a + (r() - .5) * .03, A.p * (1 + (r() - .5) * .03)); st.pending.push({ k: t + 40 + j * 26, x: L.x, y: L.y, vx: v.vx, vy: v.vy, w: 5, m: 0, o: s, wk: 'ball', f: 0, big: 0, vid, ls: 1 }); }
        st.ev.push({ e: 'laststand', side: s }); }
    }
  }
  /* battlefield events every ~25 s: a gust, a supply balloon worth popping, or a meteor shower that reshapes the mountain */
  function fieldEvents(st) {
    const t = st.tick, re = st.re;
    if (st.gust && t >= st.gust) { st.gust = 0; st.wind = st.windMax ? (st.rw() * 2 - 1) * st.windMax : 0; st.ev.push({ e: 'wind' }); }
    if (st.crate) { const c = st.crate; c.x += c.vx * DT; c.y = c.y0 + Math.sin(t * DT * 1.3) * 3; if (t > c.until || c.x < 60 || c.x > W - 60) st.crate = null; }
    if (t < st.nextEv || st.opt.noEvents) return; st.nextEv = t + 1500; const roll = re(), storm = st.M.wx === 'storm';
    if (roll < (storm ? .55 : .35)) { const m = Math.max(st.windMax, 6) * 1.5; st.wind = (st.wind > 0 ? -1 : 1) * m * (.7 + re() * .3); st.gust = t + 480; st.ev.push({ e: 'gust' }); }
    else if (roll < .75) { const y0 = 16 + re() * 10; st.crate = { x: W / 2 + (re() - .5) * 40, y0, y: y0, vx: (re() < .5 ? -1 : 1) * (5 + re() * 3), until: t + 1000, id: t }; st.ev.push({ e: 'crate' }); }
    else { const vid = ++st.vid; for (let j = 0; j < 5; j++) { const x = 118 + re() * 64; st.pending.push({ k: t + 30 + j * 14, x: x - 10, y: -20, vx: 10, vy: 70, w: 3, m: 0xffff, o: -1, wk: 'ball', f: 1, big: 0, vid, neutral: 1 }); } st.ev.push({ e: 'shower' }); }
  }
  function step(st) {
    if (st.done) { st.tick++; return; } const t = ++st.tick, tt = t * DT, h = st.h;
    for (const g of st.gates) { g.y = g.y0 + (g.amp ? Math.sin(tt * g.sp + g.ph) * g.amp : 0); g.flash = Math.max(0, g.flash - DT * 3); }
    if (st.windMax && t % 1200 === 0) { st.wind = (st.rw() * 2 - 1) * st.windMax; st.ev.push({ e: 'wind' }); }
    for (const s of [0, 1]) if (st.sand[s] < SAND_MAX && ++st.sandT[s] >= SAND_REGEN) { st.sandT[s] = 0; st.sand[s]++; }
    for (let i = st.pending.length - 1; i >= 0; i--) if (st.pending[i].k <= t) { st.R.push(st.pending[i]); st.pending.splice(i, 1); }
    for (let i = st.starCalls.length - 1; i >= 0; i--) { const c = st.starCalls[i]; if (c.k <= t) { const dir = c.side ? -1 : 1; st.R.push({ x: c.x - dir * 34, y: -24, vx: dir * 30, vy: 112, w: 40, m: 0xffff, o: c.side, wk: 'boulder', f: 1, big: 2, vid: ++st.vid }); st.starCalls.splice(i, 1); } }
    forts(st); fieldEvents(st);
    // oil jars: settle on the ground; burning fuses go off and chain
    for (const j of st.jars) { if (!j.alive) continue; j.y = h[Math.max(0, Math.min(W, Math.round(j.x)))]; if (j.y > H) { j.alive = 0; continue; }
      if (j.fuse && t >= j.fuse) { j.alive = 0; carve(st, j.x, j.y, 7); blastCastles(st, j.x, j.y - 1, 9, 30, j.by); if (j.by >= 0) st.chains[j.by]++; if (j.by >= 0) st.star[j.by] = Math.min(1, st.star[j.by] + .12); st.ev.push({ e: 'jar', x: j.x, y: j.y, side: j.by });
        for (const o of st.jars) if (o.alive && !o.fuse && Math.abs(o.x - j.x) < 22) igniteJar(st, o, j.by, 14); } }
    const R = st.R; let live = 0;
    for (let k = 0; k < R.length; k++) {
      const p = R[k];
      if (p.roll) { // a boulder rolling on the ground: the slope speeds it up, walls stop it
        const xi = Math.max(3, Math.min(W - 3, Math.round(p.x))), sl = (h[xi + 3] - h[xi - 3]) / 6; /* smoothed slope: ignore pebble ripples */ p.vx += G * .95 * sl / Math.sqrt(1 + sl * sl) * DT; p.vx *= 1 - .28 * DT; const nx = p.x + p.vx * DT, ny = h[Math.max(0, Math.min(W, Math.round(nx)))] - 1.6;
        if (sl * Math.sign(p.vx) < -1.3 && p.rt > .15) { st.ev.push({ e: 'thud', x: p.x, y: p.y, side: p.o, v: Math.abs(p.vx) }); explodeBoulder(st, p); continue; } // ran into a wall of sand or rock
        if (ny < p.y - 2.2 && Math.abs(p.vx) < 40) p.vx *= -.35; else { p.x = nx; p.y = ny; } p.rt += DT;
        let hitW = false; const dirx = Math.sign(p.vx) || 1;
        for (const C of st.castles) { const i = cellOf(C, p.x + dirx * 1.8, p.y), i2 = cellOf(C, p.x + dirx * 1.8, p.y - 2.5); for (const q of [i, i2]) if (q >= 0 && C.t[q]) { hit(st, C, q, 6 + Math.abs(p.vx) * 1.1, p.o); hitW = true; } if (hitW) { landed(st, p, C.side); break; } }
        for (const j of st.jars) if (j.alive && Math.abs(j.x - p.x) < 2.6) igniteJar(st, j, p.o, 2);
        if (hitW) { st.ev.push({ e: 'thud', x: p.x, y: p.y, side: p.o, v: Math.abs(p.vx) }); explodeBoulder(st, p); continue; } // smashes into the wall and bursts
        if (p.x < 1 || p.x > W - 1 || p.rt > 6 || (Math.abs(p.vx) < 3 && p.rt > .8)) { explodeBoulder(st, p); continue; }
        R[live++] = p; continue;
      }
      if (p.dead) continue; // shot down by an archer
      const x0 = p.x; p.vy += G * DT; p.vx += st.wind * DT * (p.big ? .3 : WPN[p.wk].heavy ? .5 : 1); p.x += p.vx * DT; p.y += p.vy * DT;
      if (p.cl && !p.split && p.vy > 0) { p.split = 1; const n = Math.min(p.cl, 1 + Math.max(0, CAP - st.R.length)); for (let j = 1; j < n; j++) { const s2 = j - (n - 1) / 2; st.R.push({ x: p.x, y: p.y, vx: p.vx * (1 + s2 * .09), vy: p.vy + s2 * 2.5, w: p.w, m: p.m, o: p.o, wk: p.wk, f: 0, big: 0, vid: p.vid, split: 1, cl: 0 }); } p.vx *= 1 - (n - 1) / 2 * .09; p.vy -= (n - 1) / 2 * 2.5; st.ev.push({ e: 'split', x: p.x, y: p.y, side: p.o, n }); }
      if (st.crate && p.o >= 0 && Math.hypot(p.x - st.crate.x, p.y - st.crate.y) < 3.6) { const c = st.crate; st.crate = null; st.star[p.o] = Math.min(1, st.star[p.o] + .35); st.sand[p.o] = Math.min(SAND_MAX, st.sand[p.o] + 1); st.crates[p.o]++; st.ev.push({ e: 'cratepop', side: p.o, x: c.x, y: c.y }); }
      for (const g of st.gates) { if ((p.m & (1 << g.i)) || WPN[p.wk].bolt) continue; if (!((x0 - g.x) * (p.x - g.x) <= 0) || Math.abs(p.y - g.y) > g.h / 2) continue; p.m |= 1 << g.i; g.flash = 1; if (!p.big) clones(st, p, g.v); else p.w *= Math.min(3, g.v); const gk = p.vid * 16 + g.i; if (!st.gv[gk]) { st.gv[gk] = 1; st.gatesHit[p.o]++; } /* one count per volley per gate */ st.star[p.o] = Math.min(1, st.star[p.o] + .004 * g.v / 3); st.ev.push({ e: 'gate', g: g.i, k: g.v, side: p.o }); }
      if (p.x < -10 || p.x > W + 10 || p.y > H + 10) continue;
      // jars: struck directly, or ignited by fire passing close
      let jarHit = false; for (const j of st.jars) { if (!j.alive) continue; const d = Math.hypot(j.x - p.x, j.y - 1.5 - p.y); if (d < 2.4 || (p.f && d < 4.5)) { igniteJar(st, j, p.o, 1); if (d < 2.4) jarHit = true; } }
      if (jarHit && WPN[p.wk].bolt) { landed(st, p, 'jar'); lightning(st, p.x, p.o); continue; }
      if (jarHit && !p.big) { landed(st, p, 'jar'); st.ev.push({ e: 'boom', x: p.x, y: p.y, r: 1, side: p.o }); continue; }
      let gone = false;
      for (const C of st.castles) { const i = cellOf(C, p.x, p.y); if (i < 0 || !C.t[i]) continue; if (WPN[p.wk].bolt) { landed(st, p, C.side); lightning(st, p.x, p.o); gone = true; break; } if (p.f && !p.big) { ignite(st, C, i, 240 + 60 * (st.mods[p.o] ? st.mods[p.o].burn || 0 : 0)); } const Sp = WPN[p.wk].splash; if (Sp) { blastCastles(st, p.x, p.y, Sp[0], Sp[1] * (p.ls ? 1.2 : 1), p.o); st.ev.push({ e: 'boom', x: p.x, y: p.y, r: 3.5, side: p.o, ball: 1 }); landed(st, p, C.side); gone = true; } if (gone) break; const mul = WPN[p.wk].dmg; const used = hit(st, C, i, p.w * mul, p.o) / mul; p.w -= used;
        if (p.big) { const rad = p.big === 2 ? 2 : 1, dm = p.big === 2 ? 40 : 6; for (let dr = -rad; dr <= rad; dr++) for (let dc = -rad; dc <= rad; dc++) { const c = (i % C.cols) + dc, r = ((i / C.cols) | 0) + dr; if ((dc || dr) && c >= 0 && c < C.cols && r >= 0 && r < C.rows) hit(st, C, r * C.cols + c, dm, p.o, 1); } }
        landed(st, p, C.side); if (p.big === 2) { starBlast(st, p); gone = true; } else if (p.w <= 1e-6) { st.ev.push({ e: 'boom', x: p.x, y: p.y, r: p.big ? 5 : 1, side: p.o }); gone = true; } break; }
      if (gone) continue;
      const xi = Math.round(p.x); if (xi >= 0 && xi <= W && p.y >= h[xi]) {
        if (p.big === 1) { landed(st, p, 'ground'); carve(st, p.x, p.y, 3); p.roll = 1; p.rt = 0; p.y = h[xi] - 1.6; p.vx *= .75; st.ev.push({ e: 'thud', x: p.x, y: p.y, side: p.o, land: 1 }); R[live++] = p; continue; }
        if (p.big === 2) { landed(st, p, 'ground'); rockslide(st, p, 1); starBlast(st, p); continue; }
        if (WPN[p.wk].bolt) { landed(st, p, 'ground'); lightning(st, p.x, p.o); continue; }
        landed(st, p, 'ground'); const r = WPN[p.wk].crater * Math.min(2.2, .7 + Math.log2(1 + p.w) * .35); carve(st, p.x, p.y, r); st.ev.push({ e: 'boom', x: p.x, y: p.y, r, side: p.o, dirt: 1, ball: WPN[p.wk].heavy ? 1 : 0, neutral: p.neutral ? 1 : 0 });
        if (p.f && p.o >= 0) for (const C of st.castles) for (let i = 0; i < C.t.length; i++) { if (!C.t[i]) continue; const cx = C.x0 + ((i % C.cols) + .5) * CS, cy = C.y0 + (((i / C.cols) | 0) + .5) * CS; if (Math.hypot(cx - p.x, cy - p.y) < 3.2) ignite(st, C, i, 150); }
        if (WPN[p.wk].heavy && !p.neutral) rockslide(st, p, .45); continue; }
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
  /* where a single shot would land (no clones), for the aim preview and the AI */
  function trace(st, side, a, p, maxT = 6, stopAt, wk) {
    const wf = wk && WPN[wk] ? (WPN[wk].big ? .3 : WPN[wk].heavy ? .5 : 1) : 1;
    const v = velocity(side, a, p), L = launcher(side); let x = L.x, y = L.y, vx = v.vx, vy = v.vy, mult = 1, m = 0; const pts = [];
    for (let t = 0; t < maxT * 60; t++) { const x0 = x, tt = (st.tick + t) * DT; vy += G * DT; vx += st.wind * DT * wf; x += vx * DT; y += vy * DT; if (t % 3 === 0) pts.push([x, y]); if (stopAt && pts.length > stopAt) break;
      for (const g of st.gates) { if ((m & (1 << g.i)) || (wk && WPN[wk] && WPN[wk].bolt)) continue; const gy = g.y0 + (g.amp ? Math.sin(tt * g.sp + g.ph) * g.amp : 0); if ((x0 - g.x) * (x - g.x) <= 0 && Math.abs(y - gy) <= g.h / 2) { m |= 1 << g.i; mult *= g.v; } }
      if (x < -10 || x > W + 10 || y > H + 10) return { pts, x, y, mult, hit: null };
      for (const j of st.jars) if (j.alive && Math.hypot(j.x - x, j.y - 1.5 - y) < 2.4) return { pts, x, y, mult, hit: 'jar', jar: j.i };
      for (const C of st.castles) { const i = cellOf(C, x, y); if (i >= 0 && C.t[i]) return { pts, x, y, mult, hit: C.side, cell: i }; }
      const xi = Math.round(x); if (xi >= 0 && xi <= W && y >= st.h[xi]) return { pts, x, y, mult, hit: 'ground' };
    }
    return { pts, x, y, mult, hit: null };
  }
  /* AI aim search: tries many aims toward a target point; prefers the enemy heart and big gates */
  function botAim(st, side, B, r, target) {
    const E = st.castles[1 - side], cx = target ? target.x : E.x0 + (E.cc + 1) * CS, cy = target ? target.y : E.y0 + (E.cr + 1) * CS; let best = null;
    for (let ai = 0; ai < 30; ai++) for (let pi = 0; pi < 16; pi++) {
      const a = (8 + ai * 2) * Math.PI / 180, p = .25 + pi * .05, tr = trace(st, side, a, p);
      let sc; if (target && tr.hit === 'jar' && st.jars[tr.jar] && Math.abs(st.jars[tr.jar].x - cx) < 3) sc = 150; else if (tr.hit === 1 - side) sc = 100 - Math.hypot(tr.x - cx, tr.y - cy) * 2; else if (tr.hit === side) sc = -500; else sc = -Math.hypot(tr.x - cx, (tr.y - cy) * .5) - 20;
      sc += Math.log2(tr.mult) * 30 * (B.gates == null ? 1 : B.gates) * (tr.hit === 1 - side ? 1 : .2);
      if (!best || sc > best.sc) best = { a, p, sc, mult: tr.mult };
    }
    const er = B.err * Math.PI / 180;
    return { a: Math.max(5 * Math.PI / 180, Math.min(72 * Math.PI / 180, best.a + (r() - .5) * 2 * er)), p: Math.max(0, Math.min(1, best.p + (r() - .5) * 2 * B.perr)), mult: best.mult, sc: best.sc };
  }
  /* the computer aims like a person: a first guess, then it corrects from where its last volley landed */
  function botPlan(st, side, B, mem, r) { // mem: { shots: {vid: {a,p}}, last: {a,p} } — call remember() after firing
    const E = st.castles[1 - side], tx = E.x0 + (E.cc + 1) * CS, D = Math.PI / 180, I = st.impact[side];
    mem.shots = mem.shots || {}; const jit = (a, p, k = 1) => ({ a: Math.max(5 * D, Math.min(72 * D, a + (r() - .5) * 2 * B.nA * D * k)), p: Math.max(.05, Math.min(1, p + (r() - .5) * 2 * B.nP * k)) });
    const base = I && mem.shots[I.vid];
    if (!base) { if (mem.last) return jit(mem.last.a, mem.last.p); const s0 = botAim(st, side, { err: B.err, perr: B.err * .012, gates: B.gates }, r); return { a: s0.a, p: s0.p, fresh: 1 }; }
    if (base.used) return jit(mem.last.a, mem.last.p);
    base.used = 1;
    let a = base.a, p = base.p; const dir = side ? -1 : 1, short = (tx - I.x) * dir;
    const flat = (pp) => { const v = velocity(side, a, pp), L = launcher(side); let x = L.x, y = L.y, vx = v.vx, vy = v.vy; for (let t = 0; t < 600; t++) { vy += G * DT; vx += st.wind * DT; x += vx * DT; y += vy * DT; if (vy > 0 && y >= I.y) break; } return x; };
    const slope = ((flat(Math.min(1, p + .03)) - flat(Math.max(.05, p - .03))) * dir) / (Math.min(1, p + .03) - Math.max(.05, p - .03));
    if (I.hit === 1 - side) { p += (Math.abs(slope) > 5 ? short / slope : 0) * .25; mem.good = { a, p }; return jit(a, p, .6); } // hitting the fort: keep pounding, creep toward the heart
    if (I.hit === 'ground' && I.y < GY - 14 && short > 20) { if (mem.good && !mem.blockedGood) { mem.blockedGood = 1; return jit(mem.good.a, mem.good.p, .4); } mem.blockedGood = 0; a = Math.min(72 * D, a + (4 + r() * 3) * D); p = Math.min(1, p + .07); } // blocked by the mountain or a dune: lob higher and harder
    else if (I.hit === side) a = Math.max(8 * D, a - 6 * D); // fell on itself: flatten
    else p = p + (Math.abs(slope) > 5 ? short / slope : Math.sign(short) * .06) * B.corr;
    return jit(a, p);
  }
  function remember(st, mem, a, p) { mem.shots = mem.shots || {}; mem.shots[st.vid] = { a, p }; mem.last = { a, p }; }
  /* one decision for a computer side: weapon / dune / star, with its personality. Returns an action (without k/s) or null */
  function botTurn(st, side, B, mem, r) {
    const E = st.castles[1 - side], M = st.castles[side], eh = E.coreHp / E.core0, mh = M.coreHp / M.core0, D = Math.PI / 180;
    // 1) the Great Star
    if (st.star[side] >= 1) { const go = B.star === 'now' || (B.star === 'smart' && (eh < .55 || mh < .4)) || (B.star === 'late' && eh < .3) || mem.starWait > 3; mem.starWait = (mem.starWait || 0) + 1;
      if (go) { mem.starWait = 0; const tx = E.x0 + (E.cc + 1) * CS + (r() - .5) * B.err * 1.2; return { w: 'star', a: 0, p: tx / W }; } }
    // 2) a dune when the enemy keeps landing near our fort
    const I = st.impact[1 - side], nearMe = I && (I.hit === side || Math.abs(I.x - (M.x0 + 13.5)) < 40);
    if (B.dune && nearMe && st.sand[side] >= 1 && ready(st, side, 'dune') && I.vid !== mem.lastDuneVid && r() < B.dune) {
      mem.lastDuneVid = I.vid; mem.shots = {}; mem.last = null; mem.good = null; /* our own aim must account for the new dune */ const [a0, a1] = duneRange(side), front = side ? M.x0 - 16 : M.x0 + M.cols * CS + 16; let x = front + (side ? -1 : 1) * (14 + r() * 16); return { w: 'dune', a: 0, p: Math.max(0, Math.min(1, (x - a0) / (a1 - a0))) };
    }
    // 3) a weapon by appetite (what is loaded)
    const opts = ['swarm', 'fire', 'boulder', 'ball', 'cluster', 'bolt'].filter(w => ready(st, side, w) && (B.w[w] || 0) > 0); if (!opts.length) return null;
    let adaptBoost = 0; if (B.adapt && mem.blocked > 1) adaptBoost = .6; // the player hides behind dunes: lob boulders and fire
    let tot = 0; const wts = opts.map(w => { const v = (B.w[w] || .1) + (w !== 'swarm' ? adaptBoost : 0); tot += v; return v; }); let pick = r() * tot, wk = opts[0]; for (let i = 0; i < opts.length; i++) { pick -= wts[i]; if (pick <= 0) { wk = opts[i]; break; } }
    // 4) jar opportunity: an enemy-side jar close to their fort
    if (B.jars && r() < B.jars * .35 && !mem.jarTried) { const ej = st.jars.filter(j => j.alive && Math.abs(j.x - (E.x0 + 13.5)) < 70).sort((a, b) => Math.abs(a.x - (E.x0 + 13.5)) - Math.abs(b.x - (E.x0 + 13.5)))[0];
      if (ej) { mem.jarTried = 1; const s0 = botAim(st, side, { err: B.err * .8, perr: B.err * .01 }, r, { x: ej.x, y: ej.y - 1.5 }); return { w: wk === 'boulder' ? 'swarm' : wk, a: s0.a, p: s0.p, jar: 1 }; } }
    if (I && I.hit === 'ground' && mem.lastI !== (st.impact[side] && st.impact[side].vid)) { const mine = st.impact[side]; if (mine && mine.hit === 'ground' && mine.y < GY - 6 && Math.abs(mine.x - (E.x0 + 13.5)) < 50) mem.blocked = (mem.blocked || 0) + 1; mem.lastI = mine && mine.vid; }
    const pl = botPlan(st, side, B, mem, r);
    if (wk === 'boulder') { const t2 = trace(st, side, pl.a, pl.p); const mid = W / 2; if (t2.hit === 'ground' && (side ? t2.x > mid + 8 : t2.x < mid - 8)) wk = ready(st, side, 'fire') ? 'fire' : 'swarm'; } // a short boulder rolls home
    return { w: wk, a: pl.a, p: pl.p };
  }
  /* victim-authoritative castle sync for online play */
  function packCastle(C) { const a = []; for (let i = 0; i < C.t.length; i++) a.push(C.t[i] ? Math.round(C.hp[i] * 10) / 10 : 0); return { hp: a, core: Math.round(C.coreHp * 10) / 10 }; }
  function applyCastle(st, C, pk) { if (!pk || !Array.isArray(pk.hp) || pk.hp.length !== C.t.length) return; for (let i = 0; i < C.t.length; i++) { const v = +pk.hp[i] || 0; if (C.t[i] === 9) continue; if (v <= 0) C.t[i] = 0; else if (C.t[i]) C.hp[i] = Math.min(C.hp[i], v); else if (C.orig[i] && C.orig[i] !== 9 && st.tick - C.gone[i] > 240) { C.t[i] = C.orig[i]; C.hp[i] = v; } } if (isFinite(+pk.core)) C.coreHp = Math.min(C.coreHp, Math.max(0, +pk.core)); if (C.coreHp <= 1e-6 && !st.done) { st.done = 1; st.winner = 1 - C.side; for (let j = 0; j < C.t.length; j++) if (C.t[j] === 9) C.t[j] = 0; st.ev.push({ e: 'win', winner: st.winner }); } }
  return { W, H, GY, CS, G, DT, WPN, ACTS, NA, POSTS, hash, lightning, MAPS, BOTS, DIFF, P, SAND_MAX, STAR_DELAY, botPlan, botTurn, remember, rng, hashStr, create, fire, ready, step, trace, botAim, launcher, velocity, cellOf, packCastle, applyCastle, carve, duneRange, buildCastle };
});
