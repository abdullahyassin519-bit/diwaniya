/* six skill levels and boss forts (war-core.js) */
const C = require('../public/shuhub/war-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function battle(map, B0, B1, seed, opt = {}) { const st = C.create(map, seed, Object.assign({ hp0: B0.hp, hp1: B1.hp }, opt)); const r = [C.rng(seed ^ 9), C.rng(seed ^ 19)], Bs = [B0, B1], next = [60, 90], mem = [{}, {}];
  while (!st.done && st.tick < 400 * 60) { for (const s of [0, 1]) if (st.tick >= next[s]) { const a = C.botTurn(st, s, Bs[s], mem[s], r[s]); if (a) { const f = C.fire(st, Object.assign({ side: s, s: (r[s]() * 1e9) | 0, slow: Bs[s].slow }, a)); if (f && a.w !== 'dune' && a.w !== 'star' && !a.jar) C.remember(st, mem[s], a.a, a.p); } next[s] = st.tick + Math.round(60 * (.8 + r[s]() * .6) * Bs[s].slow); } C.step(st); st.ev.length = 0; } return st; }
const L = C.LEVELS; ok(L.join() === 'beginner,easy,medium,hard,expert,master', 'six levels');
ok(L.every(l => C.skill(C.P.expert, l).hp === 1 && C.skill(C.P.beginner, l).hp === 1), 'skill never changes fort strength — no unfair advantages');
ok(C.skill(C.P.tactical, 'master').err < C.skill(C.P.tactical, 'hard').err && C.skill(C.P.tactical, 'master').smart && !C.skill(C.P.tactical, 'expert').smart, 'master aims tighter and reads the fort');
for (let i = 0; i < 5; i++) { let w = 0, n = 0; for (let sd = 1; sd <= 10; sd++) { const hi = C.skill(C.P.tactical, L[i + 1]), lo = C.skill(C.P.tactical, L[i]), side = sd % 2, st = battle(sd % 5, side ? lo : hi, side ? hi : lo, sd * 977); if (st.done) { n++; if (st.winner === side) w++; } } ok(w >= 6, `${L[i + 1]} beats ${L[i]} (${w}/${n})`); }
{ let w = 0; for (let sd = 1; sd <= 6; sd++) { const st = battle(sd % 5, C.skill(C.P.aggressive, 'master'), C.skill(C.P.defensive, 'easy'), sd * 31); if (st.winner === 0) w++; } ok(w >= 5, 'a master berserker beats an easy warden ' + w + '/6'); }
// boss: the rune shield soaks heart damage while both tower tops stand
{ const st = C.create(3, 5, { boss: [null, { shield: 1 }] }); C.step(st); const E = st.castles[1]; ok(C.shieldUp(E), 'boss fort raises its rune shield'); const h0 = E.coreHp; C.lightning(st, E.x0 + (E.cc + .5) * C.CS, 0); const shieldedDmg = h0 - E.coreHp;
  const s2 = C.create(3, 5, { boss: [null, { shield: 1 }] }); C.step(s2); const E2 = s2.castles[1]; E2.t[C.POSTS[0][1] * E2.cols + C.POSTS[0][0]] = 0; ok(!C.shieldUp(E2), 'toppling a rune tower drops the shield'); const h2 = E2.coreHp; C.lightning(s2, E2.x0 + (E2.cc + .5) * C.CS, 0);
  ok(shieldedDmg > 0 && (h2 - E2.coreHp) > shieldedDmg * 2.5, `the shield soaks most heart damage (${shieldedDmg.toFixed(1)} vs ${(h2 - E2.coreHp).toFixed(1)})`); }
{ const st = C.create(3, 5, { boss: [null, { shield: 1, volley: 24 }], noEvents: 1 }); let v = 0; for (let i = 0; i < 24 * 60 * 2 + 5; i++) { C.step(st); v += st.ev.filter(e => e.e === 'bossvolley').length; st.ev.length = 0; } ok(v === 2, 'the last lord fires a war-volley every 24 s (' + v + ')'); }
{ const BT = C.BOTS.filter(b => b.boss); ok(BT.length === 2 && C.BOTS.indexOf(BT[0]) === 4 && C.BOTS.indexOf(BT[1]) === 9, 'lords 5 and 10 are bosses'); }
console.log(`shuhub-ai: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
