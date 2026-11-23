/* the living fort & new arsenal (war-core.js) */
const C = require('../public/shuhub/war-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
const run = (st, n) => { const ev = []; for (let i = 0; i < n; i++) { C.step(st); ev.push(...st.ev); st.ev.length = 0; } return ev; };
const aimAt = (st, side, wk) => { const E = st.castles[1 - side], tx = E.x0 + (E.cc + 1) * C.CS; let best = null; for (let a = 10; a < 75; a += .5) for (let p = .2; p <= 1; p += .01) { const t = C.trace(st, side, a * Math.PI / 180, p, 6, 0, wk); if (t.hit === 1 - side && !(t.mult > 1)) { const d = Math.abs(t.x - tx); if (!best || d < best.d) best = { a: a * Math.PI / 180, p, d }; } } return best; };
const fresh = (m = 2) => { const st = C.create(m, 9, { noEvents: 1 }); st.wind = 0; return st; };
// cannonball: splash damage, arrows can't stop it, half wind
{ const st = fresh(), A = aimAt(st, 0, 'ball'); C.fire(st, { side: 0, w: 'ball', a: A.a, p: A.p, s: 3 }); const hp0 = st.castles[1].hp.reduce((a, b) => a + b, 0); const ev = run(st, 400); const hp1 = st.castles[1].hp.reduce((a, b) => a + b, 0);
  ok(hp0 - hp1 > 5, 'a cannonball hits several bricks at once ' + (hp0 - hp1).toFixed(1)); ok(!ev.some(e => e.e === 'arrow'), 'archers never shoot at cannonballs'); }
// archers shoot light shots out of the sky; break the towers and they are gone
{ let shot = 0, inter = 0; for (let sd = 1; sd <= 6; sd++) { const st = C.create(2, sd, { noEvents: 1 }); st.wind = 0; const A = aimAt(st, 0, 'swarm'); C.fire(st, { side: 0, w: 'swarm', a: A.a, p: A.p, s: sd }); run(st, 400); shot += st.arrows[1]; inter += st.intercepted[1]; }
  ok(shot >= 6 && inter >= 1, `archers fire at incoming meteors (${shot} arrows, ${inter} hits)`);
  const st = fresh(), E = st.castles[1]; for (const [c, r] of C.POSTS) { E.t[r * E.cols + c] = 0; } const A = aimAt(st, 0, 'swarm'); C.fire(st, { side: 0, w: 'swarm', a: A.a, p: A.p, s: 1 }); run(st, 400); ok(st.arrows[1] === 0, 'no towers, no archers'); }
// fire: burning bricks keep taking damage and the flames can spread
{ const st = fresh(), A = aimAt(st, 0, 'fire'); C.fire(st, { side: 0, w: 'fire', a: A.a, p: A.p, s: 2 }); const ev = run(st, 200); const E = st.castles[1], burning = E.burn.filter(Boolean).length; ok(ev.some(e => e.e === 'ignite') && burning > 0, 'fireballs set bricks alight (' + burning + ')');
  const hp0 = E.hp.reduce((a, b) => a + b, 0); run(st, 120); ok(E.hp.reduce((a, b) => a + b, 0) < hp0 - 1, 'burning bricks smoulder away'); }
// lightning: hits the whole column, top brick hardest
{ const st = fresh(), E = st.castles[1], x = E.x0 + .5 * C.CS; const before = [...E.hp]; C.lightning(st, x, 0); const hitCells = before.map((v, i) => v - E.hp[i]).map((d, i) => [d, i]).filter(([d]) => d > 0);
  ok(hitCells.length >= 8 && hitCells.every(([, i]) => i % E.cols === 0), 'lightning strikes every brick in the column (' + hitCells.length + ')'); ok(hitCells[0][0] >= hitCells[hitCells.length - 1][0], 'the top of the tower takes the worst of it');
  const s2 = fresh(); ok(C.fire(s2, { side: 0, w: 'bolt', a: .8, p: .8, s: 1, k: 0 }) && C.fire(s2, { side: 0, w: 'bolt', a: .8, p: .8, s: 1, k: 9999 }) && !C.fire(s2, { side: 0, w: 'bolt', a: .8, p: .8, s: 1, k: 99999 }), 'two lightning strikes per battle'); }
// cluster bomb splits at the top of its arc
{ const st = fresh(); C.fire(st, { side: 0, w: 'cluster', a: .9, p: .8, s: 1 }); const ev = run(st, 200); const sp = ev.find(e => e.e === 'split'); ok(sp && sp.n === 6, 'cluster bomb splits into 6 ' + (sp && sp.n)); }
// repair crew: rebuilds while the gate stands, not after it falls
{ const st = fresh(), E = st.castles[0]; const i = (E.rows - 1) * E.cols + 8; E.t[i] = 0; E.gone[i] = -999; const ev = run(st, 1200); ok(ev.some(e => e.e === 'sortie' && e.side === 0) && E.t[i], 'masons walk out and rebuild a fallen brick');
  const s2 = fresh(), E2 = s2.castles[0]; E2.t[i] = 0; E2.gone[i] = -999; for (const g of E2.gate) E2.t[g] = 0; run(s2, 1200); ok(!E2.t[i] && !E2.repairs, 'with the gate broken nobody comes out'); }
// last stand: once, three free cannonballs, archers rally
{ const st = fresh(), E = st.castles[0]; st.protect = -1; E.coreHp = E.core0 * .32;
  // damage the heart below 30% through the public lightning (column through the heart)
  const x = E.x0 + (E.cc + .5) * C.CS; C.lightning(st, x, 1); C.lightning(st, x, 1); const ev = run(st, 300); const ls = ev.filter(e => e.e === 'laststand'); const balls = ev.filter(e => e.e === 'boom' && e.ball && e.side === 0).length;
  ok(ls.length === 1, 'last stand triggers once below 30%'); ok(balls >= 2 || st.castles[1].hp.reduce((a, b) => a + b, 0) < fresh().castles[1].hp.reduce((a, b) => a + b, 0), 'the last stand salvo flies at the enemy'); ok(E.rage > 0, 'the archers rally'); }
// rockslide: a cannonball high on the slope sends a boulder rolling
{ let slides = 0; for (let sd = 1; sd <= 12; sd++) { const st = C.create(1, sd, { noEvents: 1 }); st.wind = 0; for (let p = .3; p < .9; p += .02) { const t = C.trace(st, 0, 45 * Math.PI / 180, p, 6, 0, 'ball'); if (t.hit === 'ground' && t.y < C.GY - 30) { C.fire(st, { side: 0, w: 'ball', a: 45 * Math.PI / 180, p, s: sd }); break; } } const ev = run(st, 400); if (ev.some(e => e.e === 'slide')) slides++; }
  ok(slides >= 2 && slides <= 11, 'cannonballs on the slope sometimes start a rockslide (' + slides + '/12)'); }
// battlefield events: deterministic, varied, and the supply balloon pays whoever pops it
{ const kinds = new Set(); for (let sd = 1; sd <= 8; sd++) { const st = C.create(sd % 5, sd); run(st, 1500 * 4 + 900).forEach(e => ['gust', 'crate', 'shower'].includes(e.e) && kinds.add(e.e)); } ok(kinds.size === 3, 'gusts, supply balloons and meteor showers all happen ' + [...kinds]);
  const a = C.create(3, 77), b = C.create(3, 77); run(a, 4000); run(b, 4000); ok(a.wind === b.wind && a.h[150] === b.h[150], 'battlefield events are deterministic');
  const st = fresh(); st.crate = { x: 100, y0: 60, y: 60, vx: 0, until: 9e9 }; st.R.push({ x: 99, y: 60, vx: 20, vy: 0, w: 1, m: 0, o: 0, wk: 'swarm', f: 0, big: 0, vid: 99 }); const s0 = st.star[0]; run(st, 2); ok(!st.crate && st.star[0] > s0 + .3 && st.crates[0] === 1, 'popping the supply balloon fills the star meter'); }
// local versus: no reload timers
{ const st = C.create(0, 1, { noCd: 1 }); ok(C.fire(st, { side: 0, w: 'boulder', a: .7, p: .7, s: 1 }) && C.fire(st, { side: 0, w: 'boulder', a: .7, p: .7, s: 1 }), 'turn-based play has no reload timers'); }
// online sync: the defender's rebuilt bricks reach the attacker
{ const st = C.create(0, 1), E = st.castles[1], i = 80; E.t[i] = 0; E.gone[i] = -999; const pk = C.packCastle(C.create(0, 1).castles[1]); C.applyCastle(st, E, pk); ok(E.t[i] > 0, 'rebuilt bricks sync from the defender'); }
console.log(`shuhub-fort: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
