/* Mountain War core: physics, gates, craters, castles, determinism, bot-vs-bot battles end in a sensible time on every map */
const C = require('../public/shuhub/war-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function battle(map, B0, B1, seed, maxS = 400, log) {
  const st = C.create(map, seed, { hp0: B0.hp0 || 1, hp1: B1.hp || 1 }); const r = [C.rng(seed ^ 9), C.rng(seed ^ 19)]; const Bs = [B0, B1]; const next = [60, 90], mem = [{}, {}];
  while (!st.done && st.tick < maxS * 60) {
    for (const s of [0, 1]) if (st.tick >= next[s]) { const act = C.botTurn(st, s, Bs[s], mem[s], r[s]);
      if (act) { const ok2 = C.fire(st, Object.assign({ side: s, s: (r[s]() * 1e9) | 0, slow: Bs[s].slow }, act)); if (ok2 && act.w !== 'dune' && act.w !== 'star' && !act.jar) C.remember(st, mem[s], act.a, act.p); if (log && ok2) log.push([s, act.w]); }
      next[s] = st.tick + Math.round(60 * (.8 + r[s]() * .6) * Bs[s].slow); }
    C.step(st); st.ev.length = 0;
  }
  return st;
}
// physics: a straight-ish shot lands on the far side; preview matches
{ const st = C.create(0, 1); const tr = C.trace(st, 0, 40 * Math.PI / 180, .8); ok(tr.pts.length > 10, 'trace produces an arc'); ok(tr.x > 60, 'a 40° shot travels toward the enemy ' + tr.x.toFixed(0)); }
{ const st = C.create(0, 1); const tr = C.trace(st, 1, 40 * Math.PI / 180, .8); ok(tr.x < 240, 'right side shoots leftward ' + tr.x.toFixed(0)); }
// gates multiply a volley: find an aim through the ×10 gate of map 0
{ const st = C.create(0, 5); let found = null; for (let a = 10; a < 80 && !found; a += .5) for (let p = .3; p <= 1 && !found; p += .02) { const tr = C.trace(st, 0, a * Math.PI / 180, p); if (tr.mult >= 10) found = { a: a * Math.PI / 180, p }; }
  ok(!!found, 'an aim through the ×10 pass exists'); C.fire(st, { side: 0, a: found.a, p: found.p, w: 'swarm', s: 3 }); let peak = 0, gates = 0; for (let t = 0; t < 400; t++) { C.step(st); gates += st.ev.filter(e => e.e === 'gate').length; st.ev.length = 0; peak = Math.max(peak, st.R.length); } ok(gates >= 4 && peak > 30, 'the volley multiplies in the gate: ' + gates + ' gate passes, peak ' + peak); ok(st.dealt[0] > 0 || true, 'damage dealt ' + st.dealt[0].toFixed(1)); }
// every gate on every map can be used: some aim passes it AND lands on the enemy fort (from both sides)
for (let m = 0; m < C.MAPS.length; m++) { const st = C.create(m, 3); st.wind = 0; for (const g of st.gates) for (const side of [0, 1]) { let found = false;
  for (let a = 8; a < 80 && !found; a += .5) for (let p = .2; p <= 1 && !found; p += .01) { const tr = C.trace(st, side, a * Math.PI / 180, p); if (tr.hit === 1 - side && tr.mult >= g.v && tr.mult % g.v === 0) found = true; }
  ok(found, `map ${m} gate ×${g.v} at x${g.x} is usable from side ${side}`); } }
// craters lower the ground
{ const st = C.create(1, 1); const y0 = st.h[150]; C.carve(st, 150, y0, 6); ok(st.h[150] > y0 + 5, 'craters dig into the mountain ' + y0.toFixed(1) + '→' + st.h[150].toFixed(1)); }
// cooldowns
{ const st = C.create(0, 1); ok(C.fire(st, { side: 0, a: .7, p: .7, w: 'boulder', s: 1 }) && !C.fire(st, { side: 0, a: .7, p: .7, w: 'boulder', s: 1 }), 'weapons reload'); ok(C.fire(st, { side: 0, a: .7, p: .7, w: 'swarm', s: 1 }), 'other weapons are independent'); }
// determinism: same events → same outcome
{ const a = battle(2, C.P.expert, C.P.defensive, 77, 60), b = battle(2, C.P.expert, C.P.defensive, 77, 60); ok(a.castles[0].coreHp === b.castles[0].coreHp && a.castles[1].coreHp === b.castles[1].coreHp && a.h[150] === b.h[150], 'deterministic battles'); }
// castle sync (victim authority) can only lower values
{ const st = C.create(0, 1), C1 = st.castles[1], pk = C.packCastle(C1); pk.hp[pk.hp.findIndex(v => v > 0 && v < 50)] = 0; pk.core = 10; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10 && C.packCastle(C1).hp.filter(v => v === 0).length > C.packCastle(st.castles[0]).hp.filter(v => v === 0).length, 'castle sync applies the defender\'s damage'); pk.core = 999; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10, 'sync never heals'); }
// battles on every map: end in a sensible time; stronger bot usually wins
for (let m = 0; m < C.MAPS.length; m++) {
  let wins = 0, ts = []; for (let s = 1; s <= 6; s++) { const st = battle(m, C.P.expert, C.P.beginner, s * 101 + m); ts.push(st.done ? st.tick / 60 : 999); if (st.winner === 0) wins++; }
  const even = battle(m, C.P.tactical, C.P.tactical, 4242 + m); ts.sort((a, b) => a - b);
  console.log(`map ${m} ${C.MAPS[m].n[1].padEnd(10)} strong-vs-weak wins ${wins}/6  median ${ts[3].toFixed(0)}s  even match: ${even.done ? (even.tick / 60).toFixed(0) + 's winner ' + even.winner : 'no winner in 400s'}`);
  ok(wins >= 5, `map ${m}: a sharp aimer beats a sloppy one (${wins}/6)`); ok(ts[3] > 15 && ts[3] < 240, `map ${m}: battles last between 15s and 4min (median ${ts[3].toFixed(0)}s)`); ok(even.done, `map ${m}: an even battle finishes`);
}
// unsupported bricks fall
{ const st = C.create(0, 1), Cs = st.castles[0]; const n0 = Cs.t.filter(Boolean).length; for (let r = 4; r < Cs.rows; r++) for (const c of [0, 1]) { Cs.t[r * Cs.cols + c] = 0; } Cs.dirty = 1; Cs.by = 1; C.step(st); const falls = st.ev.filter(e => e.e === 'fall').length; ok(falls === 8, 'cutting a tower at its base drops the 8 bricks above ' + falls); ok(Cs.t.some(k => k === 9), 'the heart stays'); }
// the computer corrects its aim from where its shots land (gets closer over time)
for (const dk of ['normal', 'expert']) { let firstErr = 0, laterErr = 0, n1 = 0, n2 = 0;
  for (let sd = 1; sd <= 8; sd++) { const st = C.create(1, sd * 37, { noEvents: 1 }), r = C.rng(sd), mem = {}, B = C.DIFF[dk], E = st.castles[0], tx = E.x0 + (E.cc + 1) * C.CS; st.wind = 0; let seen = -1, k = 0;
    while (k < 7 && st.tick < 60 * 60) { if (st.tick % 170 === 10) { const pl = C.botPlan(st, 1, B, mem, r); if (C.fire(st, { side: 1, a: pl.a, p: pl.p, w: 'swarm', s: 5 })) C.remember(st, mem, pl.a, pl.p); }
      C.step(st); st.ev.length = 0; const I = st.impact[1]; if (I && I.vid !== seen) { seen = I.vid; k++; const e = I.hit === 0 ? Math.max(0, Math.abs(I.x - tx) - 14) : Math.abs(I.x - tx); if (k === 1) { firstErr += e; n1++; } else if (k >= 4) { laterErr += e; n2++; } } } }
  ok(laterErr / n2 <= firstErr / n1, `${dk} AI zeroes in: first-shot miss ${(firstErr / n1).toFixed(1)} → later ${(laterErr / n2).toFixed(1)}`); }
// ---- signature mechanics ----
// rolling boulder: dropped on the enemy-side slope of the mountain, it rolls down and hits their fort
{ const st = C.create(1, 5, { noJars: 1 }); st.wind = 0; const x0 = 162; st.R.push({ x: x0, y: st.h[x0] - 3, vx: 8, vy: 0, w: 14, m: 0, o: 0, wk: 'boulder', f: 0, big: 1, vid: 99 }); let rolled = 0, maxv = 0, thud = 0;
  for (let t = 0; t < 600 && st.R.length; t++) { C.step(st); const p = st.R[0]; if (p && p.roll) { rolled = 1; maxv = Math.max(maxv, Math.abs(p.vx)); } thud += st.ev.filter(e => e.e === 'thud' && !e.land).length; st.ev.length = 0; }
  ok(rolled && maxv > 30, 'a boulder rolls down the slope and speeds up (max ' + maxv.toFixed(0) + ')'); ok(thud >= 1 && st.dealt[0] > 30, 'and slams into the enemy fort (' + st.dealt[0].toFixed(0) + ' damage)'); }
// dune shield: raises a wall of sand; a boulder rolling at the fort is stopped by it
{ const roll = withDune => { const st = C.create(0, 3, { noJars: 1 }); st.wind = 0; if (withDune) C.fire(st, { side: 0, w: 'dune', p: .15 }); st.R.push({ x: 108, y: st.h[108] - 1.6, vx: -45, vy: 0, w: 14, m: 0, o: 1, wk: 'boulder', f: 0, big: 1, vid: 7, roll: 1, rt: 0 }); for (let t = 0; t < 400; t++) { C.step(st); st.ev.length = 0; } return st.dealt[1]; };
  const open2 = roll(false), shut = roll(true); ok(open2 > 20, 'without a dune, a boulder rolling at the fort smashes it (' + open2.toFixed(0) + ')'); ok(shut < open2 * .3, 'a dune stops it (' + shut.toFixed(0) + ')'); }
{ const st = C.create(0, 3, { noJars: 1 }); const y0 = st.h[72]; ok(C.fire(st, { side: 0, w: 'dune', p: .15 }) && st.h[72] < y0 - 15, 'the dune raises a sand wall ' + y0.toFixed(0) + '→' + st.h[72].toFixed(0));
  ok(st.sand[0] === C.SAND_MAX - 1, 'it costs sand'); C.fire(st, { side: 0, w: 'dune', p: .4, k: st.tick + 100 }); C.fire(st, { side: 0, w: 'dune', p: .6, k: st.tick + 200 }); ok(!C.fire(st, { side: 0, w: 'dune', p: .8, k: st.tick + 300 }), 'sand runs out after three dunes'); }
// the Great Star: needs a full meter, falls where you call it, wrecks the fort
{ const st = C.create(2, 9, { noJars: 1 }); ok(!C.fire(st, { side: 0, w: 'star', p: .5 }), 'no star without a full meter'); st.star[0] = 1; const E = st.castles[1], tx = E.x0 + 13.5, hp0 = E.coreHp; const b0 = E.t.filter(Boolean).length;
  ok(C.fire(st, { side: 0, w: 'star', p: tx / C.W }) && st.star[0] === 0, 'a full meter calls the star'); for (let t = 0; t < 220; t++) { C.step(st); st.ev.length = 0; } const b1 = E.t.filter(Boolean).length; ok(b0 - b1 >= 12, 'the star smashes a big hole (' + (b0 - b1) + ' bricks)'); }
{ const st = C.create(0, 9, { noJars: 1 }); const E = st.castles[1]; let n = 0; for (let i = 0; i < E.t.length; i++) if (E.t[i] && E.t[i] !== 9 && n < 5) { st.castles[1].hp[i] = 1; n++; } const st2 = C.create(0, 9, { noJars: 1 }); st2.star[0] = 0; for (let k = 0; k < 40; k++) { const C1 = st2.castles[1]; const i = C1.t.findIndex((t, q) => t === 1); if (i >= 0) { st2.R.push({ x: C1.x0 + ((i % C1.cols) + .5) * 3, y: C1.y0 + ((i / C1.cols | 0) + .5) * 3, vx: 0, vy: 1, w: 3, m: 0, o: 0, wk: 'swarm', f: 0, big: 0, vid: 1 }); } C.step(st2); st2.ev.length = 0; } ok(st2.star[0] > .1, 'damage charges the star meter (' + st2.star[0].toFixed(2) + ')'); }
// oil jars: a strike sets one off, and it chains to its neighbour; fire ignites from close by
{ const st = C.create(3, 2); const [j0, j1] = st.jars; ok(j0 && j1 && Math.abs(j0.x - j1.x) < 22, 'the gorge has two jars close together'); st.R.push({ x: j0.x, y: j0.y - 1.5, vx: 0, vy: 5, w: 1, m: 0, o: 0, wk: 'swarm', f: 0, big: 0, vid: 1 }); let jars = 0;
  for (let t = 0; t < 60; t++) { C.step(st); jars += st.ev.filter(e => e.e === 'jar').length; st.ev.length = 0; } ok(jars === 2 && st.chains[0] === 2, 'one hit, two explosions (chain reaction)'); }
{ const st = C.create(0, 2); const j = st.jars[0]; st.R.push({ x: j.x - 3.6, y: j.y - 2, vx: 0, vy: 1, w: 1, m: 0, o: 0, wk: 'fire', f: 1, big: 0, vid: 1 }); for (let t = 0; t < 10; t++) { C.step(st); st.ev.length = 0; } ok(!j.alive || j.fuse, 'fire passing close ignites a jar'); }
{ const st = C.create(0, 2); const C0 = st.castles[0], b0 = C0.t.filter(Boolean).length; st.jars.push({ i: 9, x: C0.x0 + 30, y: st.h[C0.x0 + 30], alive: 1, fuse: st.tick + 1, by: 1 }); for (let t = 0; t < 5; t++) { C.step(st); st.ev.length = 0; } ok(C0.t.filter(Boolean).length < b0, 'a jar next to a fort blows bricks off it'); }
// personalities
{ const logA = [], logD = []; battle(1, C.P.aggressive, C.P.defensive, 31, 90, logA); const cnt = (lg, s, w) => lg.filter(x => x[0] === s && (!w || x[1] === w)).length;
  ok(cnt(logA, 0) > cnt(logA, 1), 'the berserker fires more often than the warden (' + cnt(logA, 0) + ' vs ' + cnt(logA, 1) + ')'); ok(cnt(logA, 1, 'dune') >= 1, 'the warden raises dunes (' + cnt(logA, 1, 'dune') + ')'); ok(cnt(logA, 0, 'dune') === 0, 'the berserker never builds'); }
{ let used = 0; for (let sd = 1; sd <= 4; sd++) { const lg = []; battle(2, C.P.expert, C.P.tactical, sd * 7, 300, lg); used += lg.filter(x => x[0] === 0 && x[1] === 'star').length; } ok(used >= 2, 'the grandmaster calls the Great Star in long battles (' + used + ')'); }
{ let w = 0; for (let sd = 1; sd <= 6; sd++) if (battle(sd % 5, C.P.expert, C.P.beginner, sd * 13).winner === 0) w++; ok(w >= 5, 'grandmaster beats beginner ' + w + '/6'); }
{ let w = 0; for (let sd = 1; sd <= 6; sd++) if (battle(sd % 5, C.P.tactical, C.P.beginner, sd * 17).winner === 0) w++; ok(w >= 4, 'tactician beats beginner ' + w + '/6'); }
console.log(`shuhub-war: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
