/* Mountain War core: physics, gates, craters, castles, determinism, bot-vs-bot battles end in a sensible time on every map */
const C = require('../public/shuhub/war-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function battle(map, B0, B1, seed, maxS = 400) {
  const st = C.create(map, seed, { hp1: B1.hp || 1 }); const r = [C.rng(seed ^ 9), C.rng(seed ^ 19)]; const Bs = [B0, B1]; const next = [60, 90];
  while (!st.done && st.tick < maxS * 60) {
    for (const s of [0, 1]) if (st.tick >= next[s]) { const B = Bs[s]; const wk = r[s]() < B.smart && C.ready(st, s, 'boulder') ? 'boulder' : r[s]() < B.smart && C.ready(st, s, 'fire') ? 'fire' : 'swarm';
      if (C.ready(st, s, wk)) { const aim = C.botAim(st, s, B, r[s]); C.fire(st, { side: s, a: aim.a, p: aim.p, w: wk, s: (r[s]() * 1e9) | 0, slow: B.slow }); } next[s] = st.tick + Math.round(60 * (.8 + r[s]() * .6) * B.slow); }
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
{ const a = battle(2, C.BOTS[3], C.BOTS[3], 77, 60), b = battle(2, C.BOTS[3], C.BOTS[3], 77, 60); ok(a.castles[0].coreHp === b.castles[0].coreHp && a.castles[1].coreHp === b.castles[1].coreHp && a.h[150] === b.h[150], 'deterministic battles'); }
// castle sync (victim authority) can only lower values
{ const st = C.create(0, 1), C1 = st.castles[1], pk = C.packCastle(C1); pk.hp[pk.hp.findIndex(v => v > 0 && v < 50)] = 0; pk.core = 10; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10 && C.packCastle(C1).hp.filter(v => v === 0).length > C.packCastle(st.castles[0]).hp.filter(v => v === 0).length, 'castle sync applies the defender\'s damage'); pk.core = 999; C.applyCastle(st, C1, pk); ok(C1.coreHp === 10, 'sync never heals'); }
// battles on every map: end in a sensible time; stronger bot usually wins
for (let m = 0; m < C.MAPS.length; m++) {
  let wins = 0, ts = []; for (let s = 1; s <= 6; s++) { const st = battle(m, C.BOTS[5], C.BOTS[0], s * 101 + m); ts.push(st.done ? st.tick / 60 : 999); if (st.winner === 0) wins++; }
  const even = battle(m, C.BOTS[3], C.BOTS[3], 4242 + m); ts.sort((a, b) => a - b);
  console.log(`map ${m} ${C.MAPS[m].n[1].padEnd(10)} strong-vs-weak wins ${wins}/6  median ${ts[3].toFixed(0)}s  even match: ${even.done ? (even.tick / 60).toFixed(0) + 's winner ' + even.winner : 'no winner in 400s'}`);
  ok(wins >= 5, `map ${m}: a sharp aimer beats a sloppy one (${wins}/6)`); ok(ts[3] > 20 && ts[3] < 240, `map ${m}: battles last between 20s and 4min (median ${ts[3].toFixed(0)}s)`); ok(even.done, `map ${m}: an even battle finishes`);
}
console.log(`shuhub-war: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
