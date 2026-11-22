/* SHUHUB core: every level can be won by a fair bot with no upgrades, with ammo to spare but not too much; mechanics behave */
const C = require('../public/shuhub/core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function bot(L, up, opt = {}) {
  const st = C.create(L, up); let x = 50, t = 0; const dt = 1 / 60;
  while (!st.done && t < 240) {
    if (Math.round(t * 60) % 15 === 0) { let best = -1, bx = x; for (let xx = 6; xx <= 94; xx += 2) { const v = C.lane(st, xx) * (1 - Math.abs(xx - x) / 400); if (v > best) { best = v; bx = xx; } } x = bx; if (opt.dumb) x = 50; }
    C.step(st, dt, { fire: true, x }); if (st.charge >= 1 && !opt.noFalcon) C.falcon(st); st.ev.length = 0; t += dt;
  }
  return { won: st.won, ammoLeft: st.ammo / Math.round(L.ammo * (1 + .1 * (up && up.ammo || 0))), t: +t.toFixed(1), peak: Math.round(st.peak), broke: st.broke, kills: st.kills, st };
}
for (const L of C.LEVELS) {
  const r = bot(L), d = bot(L, null, { dumb: 1 });
  console.log(`L${String(L.id).padStart(2)} ${L.n[1].padEnd(18)} ammo ${String(L.ammo).padStart(2)}  bot: ${r.won ? 'WIN ' : 'lose'} left ${(r.ammoLeft * 100).toFixed(0).padStart(3)}%  ${String(r.t).padStart(5)}s peak ${String(r.peak).padStart(5)}  | aim-center-only: ${d.won ? 'WIN' : 'lose'}`);
  ok(r.won, `L${L.id} winnable by a bot without upgrades`);
  ok(r.ammoLeft < .7, `L${L.id} not trivially easy (bot used ${(100 - r.ammoLeft * 100).toFixed(0)}% ammo)`);
  if (L.id >= 3) ok(!d.won || d.st.ammo < r.st.ammo, `L${L.id}: aiming matters (center-only does worse)`);
}
/* mechanics */
{ const st = C.create(C.LEVELS[0]); st.P.push({ x: 50, y: 114, vx: 0, vy: -96, w: 1, m: 0, f: 0 }); C.step(st, 1 / 30, null); ok(Math.abs(C.swarm(st) - 3) < 1e-6, 'a ×3 gate triples weight ' + C.swarm(st)); ok(st.P.length === 3, 'and splits into three meteors'); C.step(st, 1 / 30, null); ok(Math.abs(C.swarm(st) - 3) < 1e-6, 'each meteor passes a gate once'); }
{ const st = C.create(C.LEVELS[2]); for (let k = 0; k < 400; k++) st.P.push({ x: 52, y: 132, vx: 0, vy: -96, w: 1, m: 0, f: 0 }); C.step(st, 1 / 30, null); const n = C.swarm(st); ok(n > 150 && n < 250, '÷2 halves a swarm on average ' + n); }
{ const st = C.create(C.LEVELS[0]); for (let k = 0; k < 2000; k++) st.P.push({ x: 50, y: 114, vx: 0, vy: -96, w: 1, m: 0, f: 0 }); st.P.length = 600; C.step(st, 1 / 30, null); ok(st.P.length <= C.CAP && Math.abs(C.swarm(st) - 1800) < 1e-3, 'above the cap, weight is kept exactly while meteors merge'); }
{ const L = C.LEVELS[4], st = C.create(L); const F = st.fort; const i = F.t.findIndex(k => k === 2); const c = i % F.cols, r = Math.floor(i / F.cols); const x = C.fortX(st) + (c + .5) * C.CS, y = C.FY + (r + .9) * C.CS;
  st.P.push({ x, y: y + 1, vx: 0, vy: -96, w: 1, m: 0, f: 1 }); C.step(st, 1 / 60, null); const h0 = 12 * F.sc; ok(Math.abs(F.hp[i] - (h0 - 2 * st.pow)) < 1e-3, 'burning meteor deals double damage to stone ' + F.hp[i]); }
{ const st = C.create(C.LEVELS[2]); const g = st.fort.guards[0]; ok(!!g, 'level 3 has a guard'); const below = (g.r + 1) * st.fort.cols + g.c; st.fort.t[below] = 0; C.step(st, 1 / 60, null); ok(!g.alive && st.kills === 1, 'a guard falls when its brick breaks'); }
{ const st = C.create(C.LEVELS[0]); st.charge = 1; ok(C.falcon(st) && !C.falcon(st), 'falcon needs a full charge'); const b0 = st.fort.coreHp; for (let k = 0; k < 120; k++) C.step(st, 1 / 60, { fire: false, x: 50 }); ok(st.broke > 0, 'the falcon tears through bricks ' + st.broke + ' core ' + b0 + '→' + st.fort.coreHp); }
{ const st = C.create(C.LEVELS[5]); const F = st.fort; let n0 = F.t.filter(Boolean).length; for (let i = F.t.length - F.cols; i < F.t.length; i++) if (F.t[i] !== 9) F.t[i] = 0; const n1 = F.t.filter(Boolean).length; const rep = C.repair(st, 5); ok(rep.length === 5 && F.t.filter(Boolean).length === n1 + 5, 'duel repairs restore bricks next to the living wall'); }
{ const a = C.create(C.LEVELS[6]), b = C.create(C.LEVELS[6]); for (let k = 0; k < 300; k++) { C.step(a, 1 / 60, { fire: true, x: 40 }); C.step(b, 1 / 60, { fire: true, x: 40 }); } ok(a.fort.coreHp === b.fort.coreHp && a.P.length === b.P.length, 'deterministic for the same inputs'); }
{ const r = bot(C.LEVELS[14], { rate: 3, twin: 1, power: 3, ammo: 3, falcon: 2 }); const r0 = bot(C.LEVELS[14]); ok(r.won && r.ammoLeft > r0.ammoLeft, 'upgrades make the final level easier'); }
console.log(`shuhub-core: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
