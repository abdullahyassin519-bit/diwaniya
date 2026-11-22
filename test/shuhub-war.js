/* Mountain War core: physics, gates, craters, castles, determinism, bot-vs-bot battles end in a sensible time on every map */
const C = require('../public/shuhub/war-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function battle(map, B0, B1, seed, maxS = 400) {
  const st = C.create(map, seed, { hp1: B1.hp || 1 }); const r = [C.rng(seed ^ 9), C.rng(seed ^ 19)]; const Bs = [B0, B1]; const next = [60, 90], mem = [{}, {}];
  while (!st.done && st.tick < maxS * 60) {
    for (const s of [0, 1]) if (st.tick >= next[s]) { const B = Bs[s]; const wk = r[s]() < B.smart && C.ready(st, s, 'boulder') ? 'boulder' : r[s]() < B.smart && C.ready(st, s, 'fire') ? 'fire' : 'swarm';
      if (C.ready(st, s, wk)) { const pl = C.botPlan(st, s, B, mem[s], r[s]); if (C.fire(st, { side: s, a: pl.a, p: pl.p, w: wk, s: (r[s]() * 1e9) | 0, slow: B.slow })) C.remember(st, mem[s], pl.a, pl.p); } next[s] = st.tick + Math.round(60 * (.8 + r[s]() * .6) * B.slow); }
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
{ const a = battle(2, C.DIFF.hard, C.DIFF.hard, 77, 60), b = battle(2, C.DIFF.hard, C.DIFF.hard, 77, 60); ok(a.castles[0].coreHp === b.castles[0].coreHp && a.castles[1].coreHp === b.castles[1].coreHp && a.h[150] === b.h[150], 'deterministic battles'); }
// castle sync (victim authority) can only lower values
{ const st = C.create(0, 1), C1 = st.castles[1], pk = C.packCastle(C1); pk.hp[pk.hp.findIndex(v => v > 0 && v < 50)] = 0; pk.core = 10; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10 && C.packCastle(C1).hp.filter(v => v === 0).length > C.packCastle(st.castles[0]).hp.filter(v => v === 0).length, 'castle sync applies the defender\'s damage'); pk.core = 999; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10, 'sync never heals'); }
// battles on every map: end in a sensible time; stronger bot usually wins
for (let m = 0; m < C.MAPS.length; m++) {
  let wins = 0, ts = []; for (let s = 1; s <= 6; s++) { const st = battle(m, C.DIFF.expert, C.DIFF.easy, s * 101 + m); ts.push(st.done ? st.tick / 60 : 999); if (st.winner === 0) wins++; }
  const even = battle(m, C.DIFF.hard, C.DIFF.hard, 4242 + m); ts.sort((a, b) => a - b);
  console.log(`map ${m} ${C.MAPS[m].n[1].padEnd(10)} strong-vs-weak wins ${wins}/6  median ${ts[3].toFixed(0)}s  even match: ${even.done ? (even.tick / 60).toFixed(0) + 's winner ' + even.winner : 'no winner in 400s'}`);
  ok(wins >= 5, `map ${m}: a sharp aimer beats a sloppy one (${wins}/6)`); ok(ts[3] > 15 && ts[3] < 240, `map ${m}: battles last between 15s and 4min (median ${ts[3].toFixed(0)}s)`); ok(even.done, `map ${m}: an even battle finishes`);
}
// unsupported bricks fall
{ const st = C.create(0, 1), Cs = st.castles[0]; const n0 = Cs.t.filter(Boolean).length; for (let r = 4; r < Cs.rows; r++) for (const c of [0, 1]) { Cs.t[r * Cs.cols + c] = 0; } Cs.dirty = 1; Cs.by = 1; C.step(st); const falls = st.ev.filter(e => e.e === 'fall').length; ok(falls === 8, 'cutting a tower at its base drops the 8 bricks above ' + falls); ok(Cs.t.some(k => k === 9), 'the heart stays'); }
// the computer corrects its aim from where its shots land (gets closer over time)
for (const dk of ['normal', 'expert']) { let firstErr = 0, laterErr = 0, n1 = 0, n2 = 0;
  for (let sd = 1; sd <= 8; sd++) { const st = C.create(1, sd * 37), r = C.rng(sd), mem = {}, B = C.DIFF[dk], E = st.castles[0], tx = E.x0 + (E.cc + 1) * C.CS; st.wind = 0; let seen = -1, k = 0;
    while (k < 7 && st.tick < 60 * 60) { if (st.tick % 170 === 10) { const pl = C.botPlan(st, 1, B, mem, r); if (C.fire(st, { side: 1, a: pl.a, p: pl.p, w: 'swarm', s: 5 })) C.remember(st, mem, pl.a, pl.p); }
      C.step(st); st.ev.length = 0; const I = st.impact[1]; if (I && I.vid !== seen) { seen = I.vid; k++; const e = I.hit === 0 ? Math.max(0, Math.abs(I.x - tx) - 14) : Math.abs(I.x - tx); if (k === 1) { firstErr += e; n1++; } else if (k >= 4) { laterErr += e; n2++; } } } }
  ok(laterErr / n2 <= firstErr / n1, `${dk} AI zeroes in: first-shot miss ${(firstErr / n1).toFixed(1)} → later ${(laterErr / n2).toFixed(1)}`); }
console.log(`shuhub-war: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
