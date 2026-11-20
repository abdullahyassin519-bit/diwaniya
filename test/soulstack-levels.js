/* SOULSTACK trials: every level is climbable to its goal, its time limit is fair (a bot that climbs with the real physics needs well under it),
   and monsters, pickups and bolts behave. */
const C = require('../public/soulstack/core.js'), L = require('../public/soulstack/levels.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 30) console.log('FAIL', m); } };
function sim(w, blocks, P, dx, dy, until, t0 = 1000) {
  const Q = { x: P.x, y: P.y, vx: 0, vy: 0, gr: 1, air: 0 }; C.launch(Q, dx, dy); let t = 0;
  for (let k = 0; k < 400; k++) { t += 1 / 60; const d = C.step(w, blocks, Q, 1 / 60, t0 + k / 60); if (d) return { dead: d, Q, t }; if (until && until(Q)) return { Q, t }; if (Q.gr) return { Q, t }; }
  return { Q, t };
}
function safeStarts(w, blocks, seg) { const out = []; for (let x = seg.x0; x <= seg.x1; x++) if (!w.spike(x, seg.y + 1) || blocks.has(C.bkey(x, seg.y + 1))) { out.push(x + .5); if (x === seg.x0 || w.spike(x - 1, seg.y + 1)) out.push(x + .36); if (x === seg.x1 || w.spike(x + 1, seg.y + 1)) out.push(x + .64); } return out; }
function solve(w, blocks, from, to) {
  const pad = Array.from({ length: to.x1 - to.x0 + 1 }, (_, i) => to.x0 + i).every(x => w.spike(x, to.y + 1) && !blocks.has(C.bkey(x, to.y + 1)));
  for (const t0 of [1000, 1000.7, 1001.4, 1002.1, 1002.9]) for (const sx of safeStarts(w, blocks, from)) for (let a = 0; a < 48; a++) for (const pw of [.55, .65, .75, .85, .95, 1]) {
    const ang = Math.PI / 2 + (a / 47 - .5) * Math.PI * .95, dx = Math.cos(ang) * pw, dy = Math.sin(ang) * pw, r = sim(w, blocks, { x: sx, y: from.y + 1 }, dx, dy, null, t0);
    if (pad && r.dead && r.dead.cause === 'spike' && r.dead.y === to.y + 1) return { t: r.t, cover: { x: r.dead.x, y: r.dead.y } };
    if (!r.dead && r.Q.gr && Math.round(r.Q.y) === to.y + 1 && r.Q.x >= to.x0 - .3 && r.Q.x <= to.x1 + 1.3 && !w.spike(Math.floor(r.Q.x), to.y + 1)) return { t: r.t };
  }
  return null;
}
const THINK = .9, RESPAWN = 2.2; /* a decisive player: ~0.9 s to aim each leap; death → soul flight back to camp */
for (const lv of L.LEVELS) {
  const w = L.world(lv), blocks = new Map(); w.ensure(lv.H + 30); let time = 0, deaths = 0, i = 1, cpIdx = 0;
  const climbTime = []; // time to climb from the start to node k, used to price a respawn
  climbTime[0] = 0; let ok1 = true;
  for (; i < w.nodes.length && w.nodes[i - 1].y < lv.H; i++) {
    const a = w.nodes[i - 1], b = w.nodes[i];
    if (!safeStarts(w, blocks, a).length) { // spike pad: someone must die on it first (in a trial, that someone is you)
      let done = false; for (let x = a.x0; x <= a.x1 && !done; x++) { const bl = new Map(blocks); bl.set(C.bkey(x, a.y + 1), 1); const s = solve(w, bl, { y: a.y + 1, x0: x, x1: x }, b); if (s) { blocks.set(C.bkey(x, a.y + 1), 1); time += RESPAWN + (climbTime[i - 1] - climbTime[cpIdx]) + s.t + THINK; deaths++; done = true; } }
      ok(done, `L${lv.id} node ${i}: spike pad passable`); if (!done) { ok1 = false; break; } climbTime[i] = time; if (b.cp) cpIdx = i; continue;
    }
    if (!b.chasm) { const s = solve(w, blocks, a, b); ok(!!s, `L${lv.id} node ${i}: ${a.y}→${b.y} reachable`); if (!s) { ok1 = false; break; } time += s.t + THINK; if (s.cover) { blocks.set(C.bkey(s.cover.x, s.cover.y), 1); time += RESPAWN + (climbTime[i - 1] - climbTime[cpIdx]); deaths++; } climbTime[i] = time; if (b.cp) cpIdx = i; continue; }
    let done = false;
    for (const sx of safeStarts(w, blocks, a)) { if (done) break; for (let a2 = -6; a2 <= 6 && !done; a2++) {
      const dx = a2 * .07, dy = Math.sqrt(1 - dx * dx); let apex = null;
      const r = sim(w, blocks, { x: sx, y: a.y + 1 }, dx, dy, Q => { if (Q.vy <= 0 && !apex) { apex = { x: Q.x, y: Q.y }; return true; } });
      if (r.dead || !apex) continue;
      const cell = C.bodyCell(w, blocks, C.sacCell(apex)), bl = new Map(blocks); bl.set(C.bkey(cell.x, cell.y), 1); const body = { y: cell.y, x0: cell.x, x1: cell.x };
      const s1 = solve(w, bl, a, body), s2 = s1 && solve(w, bl, body, b);
      if (s2) { blocks.set(C.bkey(cell.x, cell.y), 1); time += r.t + RESPAWN + (climbTime[i - 1] - climbTime[cpIdx]) + s1.t + s2.t + 2 * THINK + THINK; deaths++; done = true; }
    } }
    ok(done, `L${lv.id} node ${i}: chasm ${a.y}→${b.y} solvable with one sacrifice`); if (!done) { ok1 = false; break; }
    climbTime[i] = time; if (b.cp) cpIdx = i;
  }
  ok(ok1 && w.nodes[i - 1].y >= lv.H - 0, `L${lv.id}: climbable to the goal ${lv.H} m`);
  ok(lv.T >= time * 1.8, `L${lv.id}: time limit ${lv.T}s is fair (bot needs ${time.toFixed(0)}s, ${deaths} deaths)`);
  console.log(`L${lv.id} ${lv.n[0].padEnd(16)} H ${lv.H}  T ${lv.T}s  bot ${time.toFixed(0)}s  ratio ${(lv.T / time).toFixed(2)}  deaths ${deaths}`);
  // entities
  const E = L.entities(lv, w); ok(E.picks.filter(p => p.k !== 'shard').length === lv.power.length, `L${lv.id}: all ${lv.power.length} power-ups placed`);
  for (const m of E.crawlers) { const s = w.solidRow(m.y - 1, Math.floor((m.x0 + m.x1) / 2)); ok(!!s && m.x0 < m.x1, `L${lv.id}: crawler stands on a ledge at ${m.y}`); }
  ok(!!lv.crawl === E.crawlers.length > 0, `L${lv.id}: crawlers ${lv.crawl ? 'present' : 'absent'} (${E.crawlers.length})`);
  ok(!!lv.wraith === E.wraiths.length > 0, `L${lv.id}: wraiths ${lv.wraith ? 'present' : 'absent'} (${E.wraiths.length})`);
  ok(JSON.stringify(L.entities(lv).picks) === JSON.stringify(E.picks), `L${lv.id}: entities are deterministic (same for every racer)`);
}
// difficulty rises: harder towers, more monsters, higher goals
for (let k = 1; k < L.LEVELS.length; k++) ok(L.LEVELS[k].H > L.LEVELS[k - 1].H, `L${k + 1} is taller than L${k}`);
// monster mechanics
{
  const lv = L.LEVELS[3], E = L.entities(lv), m = E.crawlers[0]; m.x0 = m.x1 = 5; m.ph = 0;
  let P = { x: 5, y: m.y + .3, vx: 0, vy: -6 }; let r = L.stepEntities(E, P, 1 / 60, 0, true); ok(r.stomp === m && !m.alive, 'landing on a crawler crushes it');
  const m2 = E.crawlers[1] || E.crawlers[0]; m2.alive = 1; m2.x0 = m2.x1 = 5; P = { x: 5.3, y: m2.y, vx: 0, vy: 0 }; r = L.stepEntities(E, P, 1 / 60, 0, true); ok(r.hit === m2, 'walking into a crawler kills you');
  const lw = L.LEVELS[5], W2 = L.entities(lw), wr = W2.wraiths[0]; const Pw = { x: wr.x + 3, y: wr.y - 2, vx: 0, vy: 0 };
  let d0 = Math.hypot(wr.x - Pw.x, wr.y - Pw.y - .43); for (let k = 0; k < 30; k++) L.stepEntities(W2, Pw, 1 / 30, k / 30, true); ok(wr.on && Math.hypot(wr.x - Pw.x, wr.y - Pw.y - .43) < d0, 'a wraith wakes and hunts you');
  const tg = L.fire(W2, Pw); ok(tg === wr, 'a soul bolt locks onto the nearest monster'); for (let k = 0; k < 60 && wr.alive; k++) L.stepEntities(W2, Pw, 1 / 60, 2 + k / 60, true); ok(!wr.alive, 'the bolt kills the wraith');
  const pk = W2.picks[0]; r = L.stepEntities(W2, { x: pk.x, y: pk.y - .43, vx: 0, vy: 0 }, 1 / 60, 9, true); ok(r.picked.includes(pk), 'touching a pickup collects it');
}
console.log(`soulstack-levels: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
