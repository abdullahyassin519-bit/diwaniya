/* شُهُب — SHUHUB core: shared by the browser and the tests (UMD).
   A portrait field 100 × 178 (y grows downward). Your launcher sits at the bottom and fires meteors upward.
   Meteors pass gates (×, ÷, fire, split), crash through rocks, and dig into a Najdi mud-brick fort at the top.
   Break the fort's lantern-heart to win. Guards on the walls shoot meteors down. */
(function (root, f) { const m = f(); if (typeof module === 'object' && module.exports) module.exports = m; else root.SHC = m; })(this, function () {
  'use strict';
  const W = 100, H = 178, CS = 3, FY = 20, LY = 160, CAP = 700, SPEED = 96;
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function hashStr(t) { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  /* ---------- the 15 levels ----------
     g: gate rows [y, [[type, value, x, width, moveAmp, moveSpeed], ...]]   types: mul, div, fire, split
     rocks: [x, y, w, hp]   fort: {w cols, h rows, wall rows, towers, mid tower, stone/iron, core hp, move amp/speed}
     guards: count, rate (shots/s), max weight a shot can remove.  ammo: meteors you can fire. */
  const LV = [
    { n: ['أول شهاب', 'First Light'], ammo: 60, g: [[112, [['mul', 3, 50, 44]]]], fort: { w: 14, h: 9, wall: 5, core: 60 }, guards: [0, 0, 0],
      tip: ['أبقِ إصبعك على الشاشة لتُطلق، واسحبه يميناً ويساراً لتصوّب. مرّر الشهب عبر بوابة ×3.', 'Hold to fire, slide to aim. Send your meteors through the ×3 gate.'] },
    { n: ['تضاعف', 'Doubling'], ammo: 60, g: [[130, [['mul', 3, 28, 26], ['mul', 5, 62, 26]]], [98, [['mul', 3, 50, 30]]]], fort: { w: 16, h: 10, wall: 5, core: 120 }, guards: [0, 0, 0],
      tip: ['البوابات تتراكم: ×5 ثم ×3 تعني خمسة عشر ضعفاً.', 'Gates stack: ×5 then ×3 is fifteen times as many.'] },
    { n: ['الفخ', 'The Trap'], ammo: 60, g: [[130, [['mul', 5, 36, 18], ['div', 2, 52, 12], ['mul', 3, 70, 18]]], [100, [['div', 2, 22, 22], ['mul', 3, 46, 22], ['div', 2, 76, 22]]]], fort: { w: 16, h: 10, wall: 6, core: 160 }, guards: [1, .9, 3],
      tip: ['البوابات الحمراء تقسم سربك. والحارس فوق السور يُسقط الشهب: اهدم ما تحته.', 'Red gates divide your swarm. Break the brick under the guard to drop him.'] },
    { n: ['بوابة راقصة', 'Dancing Gate'], ammo: 60, g: [[132, [['mul', 5, 50, 20, 26, .9]]], [102, [['mul', 3, 38, 18], ['div', 3, 54, 10], ['mul', 3, 68, 16]]]], fort: { w: 18, h: 11, wall: 6, core: 220 }, guards: [2, 1, 3],
      tip: ['بعض البوابات تتحرك: لاحقها بإصبعك.', 'Some gates move: follow them with your finger.'] },
    { n: ['بوابة النار', 'Fire Gate'], ammo: 60, g: [[134, [['mul', 5, 34, 20], ['div', 2, 50, 10], ['fire', 0, 64, 16]]], [104, [['mul', 3, 42, 18], ['fire', 0, 58, 12]]]], fort: { w: 18, h: 11, wall: 6, core: 280, stone: .25 }, guards: [2, 1.1, 4],
      tip: ['الشهب المشتعلة تضرب بضعف القوة. الحجارة الرمادية أصلب من الطين.', 'Burning meteors hit twice as hard. Grey stone is tougher than mud.'] },
    { n: ['الصخور', 'Boulders'], ammo: 60, g: [[136, [['mul', 5, 50, 30]]], [108, [['mul', 3, 40, 16], ['div', 3, 56, 14], ['mul', 3, 72, 14]]]], rocks: [[50, 120, 14, 120], [28, 90, 12, 80], [62, 88, 10, 160]], fort: { w: 18, h: 11, wall: 7, core: 320, stone: .3 }, guards: [3, 1.1, 4],
      tip: ['الصخور تبتلع الشهب حتى تتحطم. التفّ حولها أو حطّمها.', 'Boulders swallow meteors until they shatter. Go around or break through.'] },
    { n: ['القلعة الماشية', 'Walking Fort'], ammo: 60, g: [[134, [['mul', 3, 50, 40]]], [106, [['mul', 5, 36, 18, 14, .7], ['fire', 0, 70, 16]]]], fort: { w: 16, h: 11, wall: 6, core: 360, stone: .3, amp: 18, sp: .45 }, guards: [3, 1.2, 4],
      tip: ['القلعة تمشي على قوائمها الخشبية. صوّب حيث ستكون، لا حيث هي.', 'The fort walks on its wooden legs. Aim where it will be.'] },
    { n: ['الجشع', 'Greed'], ammo: 60, g: [[138, [['mul', 15, 50, 10, 30, 1.2], ['div', 3, 14, 18], ['div', 3, 86, 18]]], [106, [['mul', 3, 36, 18], ['div', 2, 52, 10], ['mul', 5, 66, 18]]]], fort: { w: 20, h: 12, wall: 7, core: 520, stone: .35 }, guards: [4, 1.2, 5],
      tip: ['بوابة ×15 ضيقة وسريعة. تستحق المخاطرة؟', 'The ×15 gate is narrow and fast. Worth the risk?'] },
    { n: ['المروحة', 'The Fan'], ammo: 60, g: [[136, [['split', 0, 50, 22]]], [112, [['mul', 3, 37, 14], ['div', 2, 50, 8], ['mul', 5, 63, 14]]]], rocks: [[50, 92, 16, 240]], fort: { w: 20, h: 12, wall: 7, core: 600, stone: .4, iron: .05 }, guards: [4, 1.3, 5],
      tip: ['بوابة المروحة تنشر السرب ليمرّ في عدة بوابات معاً. الحديد الأسود هو الأصلب.', 'The fan gate spreads your swarm across several gates. Black iron is toughest.'] },
    { n: ['قصر الريح', 'Palace of Wind'], ammo: 60, boss: 1, g: [[138, [['mul', 5, 32, 18, 6, .8], ['mul', 5, 68, 18, 6, .8]]], [110, [['fire', 0, 50, 14], ['div', 2, 22, 16], ['div', 2, 78, 16]]], [88, [['mul', 3, 32, 22], ['div', 2, 50, 10], ['mul', 3, 68, 22]]]], fort: { w: 22, h: 14, wall: 8, mid: 1, core: 900, stone: .45, iron: .08, amp: 12, sp: .35 }, guards: [6, 1.3, 6],
      tip: ['قصر بثلاثة أبراج يتمايل مع الريح، وعلى أبراجه ستة حراس.', 'A three-tower palace swaying in the wind, with six guards.'] },
    { n: ['المتاهة', 'The Maze'], ammo: 60, g: [[138, [['mul', 5, 44, 20]]], [116, [['div', 2, 58, 16]]], [96, [['mul', 3, 40, 16], ['mul', 5, 64, 12]]]], rocks: [[22, 126, 16, 160], [76, 126, 16, 160], [52, 104, 8, 260]], fort: { w: 20, h: 12, wall: 8, core: 860, stone: .45, iron: .1, amp: 10, sp: .5 }, guards: [5, 1.4, 6],
      tip: ['الطريق المستقيم فخ. ابحث عن الممر.', 'The straight path is a trap. Find the lane.'] },
    { n: ['الليل الطويل', 'The Long Night'], ammo: 60, night: 1, g: [[138, [['mul', 8, 50, 14, 22, .9]]], [112, [['mul', 3, 38, 18, 6, .6], ['fire', 0, 64, 14, 6, .6]]], [92, [['div', 3, 50, 12, 20, 1.1]]]], fort: { w: 20, h: 13, wall: 8, core: 1000, stone: .5, iron: .12 }, guards: [6, 1.5, 6],
      tip: ['في الظلام لا ترى إلا ما يضيئه سربك.', 'In the dark you only see what your swarm lights.'] },
    { n: ['العاصفة', 'Sandstorm'], ammo: 60, wind: 7, g: [[138, [['mul', 5, 38, 20]]], [114, [['mul', 3, 46, 22], ['div', 2, 70, 14]]], [94, [['mul', 5, 52, 18, 14, .9]]]], fort: { w: 20, h: 13, wall: 8, core: 1150, stone: .5, iron: .14, amp: 12, sp: .55 }, guards: [6, 1.6, 7],
      tip: ['الريح تدفع الشهب يميناً. صوّب عكسها.', 'Wind pushes the meteors right. Aim against it.'] },
    { n: ['الحصار', 'The Siege'], ammo: 60, g: [[140, [['split', 0, 50, 20]]], [118, [['mul', 3, 36, 12], ['div', 2, 50, 8], ['mul', 5, 64, 12]]], [96, [['fire', 0, 38, 14, 8, .8], ['mul', 3, 62, 18]]]], rocks: [[50, 106, 10, 300]], fort: { w: 24, h: 14, wall: 9, mid: 1, core: 1400, stone: .55, iron: .16, amp: 8, sp: .4 }, guards: [7, 1.7, 7],
      tip: ['استخدم كل ما تعلمته: المروحة، النار، والصبر.', 'Use everything: the fan, the fire, and patience.'] },
    { n: ['قلعة الشهب', 'Citadel of Stars'], ammo: 60, boss: 1, night: 1, g: [[142, [['mul', 5, 36, 18, 12, .9], ['fire', 0, 70, 16, 12, .9]]], [120, [['split', 0, 50, 18]]], [100, [['mul', 3, 37, 12], ['div', 3, 50, 8], ['mul', 3, 63, 12]]], [84, [['mul', 3, 50, 26, 18, .7]]]], fort: { w: 26, h: 15, wall: 9, mid: 1, core: 1900, stone: .55, iron: .22, amp: 10, sp: .45 }, guards: [9, 1.8, 8],
      tip: ['القلعة الأخيرة. قلبها يحرسه الحديد.', 'The final citadel. Its heart is guarded by iron.'] },
  ];
  /* fort strength and ammo per level, calibrated so a fair bot without upgrades wins using ~60% of the meteors (test/shuhub-core.js re-checks) */
  const CAL = [[4.642,201],[11.354,236],[8.48,265],[1.891,296],[3.494,326],[3.063,360],[2.194,384],[1.792,418],[0.487,449],[1.349,479],[1.61,508],[0.884,544],[3.928,568],[1.383,604],[1.662,673]];
  LV.forEach((L, i) => { L.id = i + 1; L.seed = hashStr('shuhub-' + L.id); L.fort.hs = CAL[i][0]; L.ammo = CAL[i][1]; });

  /* ---------- the fort: a Najdi mud-brick castle built on a grid ---------- */
  const HP = { 1: 4, 2: 12, 3: 30 };
  function buildFort(L) {
    const F = L.fort, r = rng(L.seed ^ 0x51ed), cols = F.w, rows = F.h, t = new Uint8Array(cols * rows), hp = new Float32Array(cols * rows);
    const sc = F.hs || 1, set = (c, rr, k) => { if (c < 0 || c >= cols || rr < 0 || rr >= rows) return; t[rr * cols + c] = k; hp[rr * cols + c] = (HP[k] || 1) * sc; };
    const wallTop = rows - F.wall, tw = cols >= 20 ? 4 : 3;
    for (let rr = wallTop; rr < rows; rr++) for (let c = 0; c < cols; c++) set(c, rr, 1);
    for (let c = tw; c < cols - tw; c += 2) set(c, wallTop - 1, 1); // triangular-ish crenellation
    const tower = (c0, w, top) => { for (let rr = top; rr < wallTop; rr++) for (let c = c0; c < c0 + w; c++) set(c, rr, 1); set(c0, top - 1, 1); set(c0 + w - 1, top - 1, 1); if (w >= 4) { set(c0 + 1, top - 2, 0); } };
    tower(0, tw, 2); tower(cols - tw, tw, 2); if (F.mid) tower((cols >> 1) - 2, 4, 1);
    // the lantern-heart: 2×2, inside the wall, ringed by tougher stone on harder levels
    const cc = (cols >> 1) - 1, cr = Math.min(rows - 3, wallTop + 1);
    for (const [dc, dr] of [[0, 0], [1, 0], [0, 1], [1, 1]]) set(cc + dc, cr + dr, 9);
    const ring = []; for (let dr = -1; dr <= 3; dr++) for (let dc = -1; dc <= 2; dc++) { const c = cc + dc, rr = cr + dr; if (t[rr * cols + c] && t[rr * cols + c] !== 9) ring.push([c, rr]); }
    for (let i = 0; i < t.length; i++) { if (!t[i] || t[i] === 9) continue; const x = r(); if (x < (F.iron || 0)) { t[i] = 3; hp[i] = HP[3] * sc; } else if (x < (F.iron || 0) + (F.stone || 0)) { t[i] = 2; hp[i] = HP[2] * sc; } }
    if ((F.stone || 0) > .3) for (const [c, rr] of ring) { const i = rr * cols + c; t[i] = F.iron > .1 ? 3 : 2; hp[i] = HP[t[i]] * sc; }
    let total = 0; for (let i = 0; i < t.length; i++) if (t[i] && t[i] !== 9) total += hp[i];
    // guards stand on top surfaces, spread across the fort
    const tops = []; for (let c = 0; c < cols; c++) for (let rr = 1; rr < rows; rr++) if (t[rr * cols + c] && !t[(rr - 1) * cols + c]) { tops.push([c, rr - 1]); break; }
    const G = [], n = L.guards[0];
    for (let k = 0; k < n; k++) { const s = tops[Math.floor((k + .5) / n * tops.length)]; if (s) G.push({ c: s[0], r: s[1], cd: .6 + k * .37, alive: 1, aim: null }); }
    return { cols, rows, t, hp, total, coreHp: F.core * sc, core0: F.core * sc, sc, cc, cr, guards: G, x0: (W - cols * CS) / 2 };
  }

  /* ---------- a game state ---------- */
  function create(L, up) {
    up = Object.assign({ rate: 0, twin: 0, power: 0, ammo: 0, falcon: 0 }, up || {});
    const st = { L, up, rand: rng(L.seed), t: 0, ammo: Math.round(L.ammo * (1 + .1 * up.ammo)), shot: 0, cd: 0, cx: 50, P: [], fort: buildFort(L),
      gates: [], rocks: (L.rocks || []).map(([x, y, w, hp]) => ({ x, y, w, h: 8, hp, hp0: hp })), charge: 0, falcon: null, done: 0, won: 0, broke: 0, dmg: 0, peak: 0, kills: 0, ev: [] };
    let i = 0; for (const [y, row] of L.g) for (const [type, v, x, w, amp, sp] of row) st.gates.push({ i: i++, type, v, x0: x, x, y, w, h: 7, amp: amp || 0, sp: sp || 0, ph: i * 1.7, flash: 0 });
    st.rate = 10 * (1 + .15 * up.rate); st.barrels = 1 + up.twin; st.pow = 1 + .25 * up.power;
    return st;
  }
  const fortX = st => st.fort.x0 + (st.L.fort.amp ? Math.sin(st.t * st.L.fort.sp) * st.L.fort.amp : 0);
  function swarm(st) { let n = 0; for (const p of st.P) n += p.w; return n; }
  function cellAt(st, x, y) { const F = st.fort, c = Math.floor((x - fortX(st)) / CS), r = Math.floor((y - FY) / CS); if (c < 0 || c >= F.cols || r < 0 || r >= F.rows) return -1; return r * F.cols + c; }
  function hitCell(st, i, dmg) { // returns damage absorbed
    const F = st.fort, k = F.t[i]; if (!k) return 0;
    if (k === 9) { const d = Math.min(dmg, F.coreHp); F.coreHp -= d; st.dmg += d; st.ev.push({ e: 'core', i }); if (F.coreHp <= 0) { st.won = 1; st.done = 1; for (let j = 0; j < F.t.length; j++) if (F.t[j] === 9) F.t[j] = 0; st.ev.push({ e: 'win' }); } return d; }
    const d = Math.min(dmg, F.hp[i]); F.hp[i] -= d; st.dmg += d;
    if (F.hp[i] <= 1e-6) { F.t[i] = 0; st.broke++; st.charge = Math.min(1, st.charge + .01 * (1 + .25 * st.up.falcon)); st.ev.push({ e: 'brk', i, k }); } else st.ev.push({ e: 'hit', i, k });
    return d;
  }
  function spawnClones(st, p, k, spread) {
    const room = Math.max(0, CAP - st.P.length), n = Math.min(k - 1, room), tot = p.w * k, each = tot / (n + 1);
    p.w = each; for (let j = 0; j < n; j++) { const a = (j + 1) * (j % 2 ? 1 : -1) * Math.ceil((j + 1) / 2) / (j + 1); st.P.push({ x: p.x + a * 1.2, y: p.y - st.rand() * 2, vx: p.vx + a * spread + (st.rand() - .5) * 3, vy: p.vy * (.94 + st.rand() * .1), w: each, m: p.m, f: p.f }); }
  }
  /* advance the game by dt. input: { fire: bool, x: aim x } */
  function step(st, dt, input) {
    if (st.done) return; st.t += dt; const L = st.L, F = st.fort, fx = fortX(st), wind = L.wind || 0;
    for (const g of st.gates) { g.x = g.x0 + (g.amp ? Math.sin(st.t * g.sp + g.ph) * g.amp : 0); g.flash = Math.max(0, g.flash - dt * 3); }
    if (input) st.cx += (Math.max(6, Math.min(94, input.x)) - st.cx) * Math.min(1, dt * 18);
    st.cd -= dt;
    if (input && input.fire && st.ammo > 0) while (st.cd <= 0 && st.ammo > 0) {
      st.cd += 1 / st.rate; st.ammo--; st.shot++;
      for (let b = 0; b < st.barrels; b++) { const off = (b - (st.barrels - 1) / 2) * 2.4; st.P.push({ x: st.cx + off, y: LY - 4, vx: (st.rand() - .5) * 5, vy: -SPEED, w: 1, m: 0, f: 0 }); }
      st.ev.push({ e: 'fire' });
    }
    if (st.cd < 0 && !(input && input.fire)) st.cd = 0;
    // falcon: dives straight up the launcher's column, tearing through everything
    if (st.falcon) { const fa = st.falcon; fa.y -= 150 * dt; for (let dx = -2; dx <= 2; dx++) { const i = cellAt(st, fa.x + dx * CS * .5, fa.y); if (i >= 0 && F.t[i]) hitCell(st, i, 40 * st.pow * F.sc); } for (const r of st.rocks) if (r.hp > 0 && Math.abs(fa.y - r.y) < 4 && Math.abs(fa.x - r.x) < r.w / 2 + 3) r.hp = 0; if (fa.y < FY - 6) st.falcon = null; }
    const P = st.P, coreX = fx + (F.cc + 1) * CS; let live = 0;
    for (let k = 0; k < P.length; k++) {
      const p = P[k], y0 = p.y; p.vx += wind * dt; if (p.y < 92 && F.coreHp > 0) { const want = (coreX - p.x) * 2.6; p.vx += (want - p.vx) * Math.min(1, dt * 4); } /* the lantern-heart pulls meteors in: side gates still pay off */ p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < 1) { p.x = 1; p.vx = Math.abs(p.vx); } else if (p.x > W - 1) { p.x = W - 1; p.vx = -Math.abs(p.vx); }
      for (const g of st.gates) {
        if (p.m & (1 << g.i)) continue; if (!(y0 >= g.y && p.y < g.y) || Math.abs(p.x - g.x) > g.w / 2) continue;
        p.m |= 1 << g.i; g.flash = 1;
        if (g.type === 'mul') { spawnClones(st, p, g.v, 4.5); st.ev.push({ e: 'gate', g: g.i, k: g.v }); }
        else if (g.type === 'div') { p.w /= g.v; if (p.w < 1) { if (st.rand() < p.w) p.w = 1; else p.w = 0; } st.ev.push({ e: 'bad', g: g.i }); }
        else if (g.type === 'fire') { if (!p.f) st.ev.push({ e: 'flame', g: g.i }); p.f = 1; }
        else if (g.type === 'split') { spawnClones(st, p, 3, 34); st.ev.push({ e: 'gate', g: g.i, k: 3 }); }
      }
      if (p.w <= 0) continue;
      for (const r of st.rocks) { if (r.hp <= 0 || Math.abs(p.x - r.x) > r.w / 2 || Math.abs(p.y - r.y) > r.h / 2) continue; const d = Math.min(p.w, r.hp); r.hp -= d; p.w -= d; st.ev.push({ e: 'rock', x: p.x, y: p.y, gone: r.hp <= 0 }); if (p.w <= 0) break; }
      if (p.w <= 0) continue;
      if (p.y < FY + F.rows * CS && p.y > FY - 2) { const i = cellAt(st, p.x, p.y); if (i >= 0 && F.t[i]) { const mul = st.pow * (p.f ? 2 : 1); const used = hitCell(st, i, p.w * mul) / mul; p.w -= used; if (p.f && p.w > 0) { const j = i + (st.rand() < .5 ? -1 : 1); if (j >= 0 && j < F.t.length && F.t[j]) p.w -= hitCell(st, j, Math.min(p.w, 2) * mul) / mul; } if (p.w <= 1e-6) continue; } }
      if (p.y < -4) continue;
      P[live++] = p;
    }
    P.length = live;
    // guards: each shot erases one meteor (up to its strength); a guard falls when the brick under it breaks
    for (const g of F.guards) {
      if (!g.alive) continue; const gx = fx + (g.c + .5) * CS, gy = FY + (g.r + .5) * CS, below = (g.r + 1) * F.cols + g.c;
      if (g.r + 1 >= F.rows || !F.t[below]) { g.alive = 0; st.kills++; st.ev.push({ e: 'gfall', x: gx, y: gy }); continue; }
      g.cd -= dt; if (g.cd > 0) continue; let best = null, bd = 64 * 64;
      for (const p of P) { if (p.y < gy) continue; const d = (p.x - gx) ** 2 + (p.y - gy) ** 2; if (d < bd) { bd = d; best = p; } }
      if (!best) { g.cd = .15; continue; } g.cd = 1 / L.guards[1]; const kill = Math.min(best.w, L.guards[2]); best.w -= kill; g.aim = { x: best.x, y: best.y, t: .18 };
      st.ev.push({ e: 'zap', x0: gx, y0: gy, x1: best.x, y1: best.y }); if (best.w <= 1e-6) { const j = P.indexOf(best); if (j >= 0) P.splice(j, 1); }
    }
    const n = swarm(st); if (n > st.peak) st.peak = n;
    if (!st.done && st.ammo <= 0 && !P.length && !st.falcon) { st.done = 1; st.won = 0; st.ev.push({ e: 'lose' }); }
  }
  function falcon(st) { if (st.charge < 1 || st.falcon || st.done) return false; st.charge = 0; st.falcon = { x: st.cx, y: LY - 6 }; st.ev.push({ e: 'falcon' }); return true; }
  function stars(st) { const f = st.ammo / Math.round(st.L.ammo * (1 + .1 * st.up.ammo)); return f >= .4 ? 3 : f >= .2 ? 2 : 1; }
  /* fort repairs (duel): restore n destroyed bricks next to living ones */
  function repair(st, n) { const F = st.fort, out = []; for (let i = 0; i < F.t.length && out.length < n; i++) { const j = (i * 7919 + st.shot * 31) % F.t.length; if (F.t[j]) continue; const c = j % F.cols; const nb = [j - 1, j + 1, j - F.cols, j + F.cols].some(q => q >= 0 && q < F.t.length && F.t[q] && Math.abs((q % F.cols) - c) <= 1); if (nb) { F.t[j] = 1; F.hp[j] = HP[1] * F.sc; out.push(j); } } return out; }
  /* where a straight-ish stream from x would go: product of gate factors (used by the tutorial arrow and the test bot) */
  function lane(st, x) {
    const gs = st.gates.slice().sort((a, b) => b.y - a.y);
    const prod = (x, y0) => { // gate product for a stream going up from height y0 (a fan gate fans the stream into three lanes)
      let m = 1, f = 0;
      for (const g of gs) { if (g.y >= y0 || Math.abs(x - g.x) > g.w / 2) continue;
        if (g.type === 'mul') m *= g.v; else if (g.type === 'div') m /= g.v; else if (g.type === 'fire') f = 1;
        else if (g.type === 'split') { const sub = [-11, 0, 11].map(d => prod(x + d, g.y)); return m * (f ? 1.6 : 1) * (sub[0].m + sub[1].m + sub[2].m); } }
      for (const r of st.rocks) if (r.hp > 0 && r.y < y0 && Math.abs(x - r.x) <= r.w / 2) m *= .35;
      return { m: m * (f ? 1.6 : 1) };
    };
    const m = prod(x, 1e9).m, F = st.fort, coreX = fortX(st) + (F.cc + 1) * CS; return m / (1 + Math.abs(x - coreX) / 25);
  }
  return { W, H, CS, FY, LY, CAP, SPEED, LEVELS: LV, rng, hashStr, create, step, falcon, stars, swarm, fortX, cellAt, repair, lane, buildFort };
});
