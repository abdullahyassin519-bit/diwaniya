/* SOULSTACK: every daily tower must be climbable with the real physics.
   For each chain step: some launch from the current platform lands on the next one without dying.
   Chasms (too high to jump) must be solvable with one sacrifice placed at the top of a jump. */
const C = require('../public/soulstack/core.js'); let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 25) console.log('FAIL', m); } };

function sim(w, blocks, P, dx, dy, until, t0 = 1000.123) {
  const Q = { ...P, vx: 0, vy: 0, gr: 1, air: 0 }; C.launch(Q, dx, dy);
  for (let k = 0; k < 400; k++) { const d = C.step(w, blocks, Q, 1 / 60, t0 + k / 60); if (d) return { dead: d, Q }; if (until && until(Q)) return { Q }; if (Q.gr) return { Q }; }
  return { Q };
}
function safeStarts(w, blocks, seg) { const out = []; for (let x = seg.x0; x <= seg.x1; x++) if (!w.spike(x, seg.y + 1) || blocks.has(C.bkey(x, seg.y + 1))) { out.push(x + .5); if (x === seg.x0 || w.spike(x - 1, seg.y + 1)) out.push(x + .36); if (x === seg.x1 || w.spike(x + 1, seg.y + 1)) out.push(x + .64); } return out; }
function solve(w, blocks, from, to, t0) {
  const starts = safeStarts(w, blocks, from), pad = to.x1 >= to.x0 && Array.from({ length: to.x1 - to.x0 + 1 }, (_, i) => to.x0 + i).every(x => w.spike(x, to.y + 1) && !blocks.has(C.bkey(x, to.y + 1)));
  for (const t0 of [1000, 1000.7, 1001.4, 1002.1, 1002.9]) for (const sx of starts) for (let a = 0; a < 48; a++) for (const pw of [.55, .65, .75, .85, .95, 1]) {
    const ang = Math.PI / 2 + (a / 47 - .5) * Math.PI * .95, dx = Math.cos(ang) * pw, dy = Math.sin(ang) * pw;
    const r = sim(w, blocks, { x: sx, y: from.y + 1 }, dx, dy, null, t0);
    if (pad && r.dead && r.dead.cause === 'spike' && r.dead.y === to.y + 1) return { sx, dx, dy, cover: true }; /* reaching a spike pad means your body covers it */
    if (!r.dead && r.Q.gr && Math.round(r.Q.y) === to.y + 1 && r.Q.x >= to.x0 - .3 && r.Q.x <= to.x1 + 1.3) {
      const cell = Math.floor(r.Q.x); if (!w.spike(cell, to.y + 1)) return { sx, dx, dy };
    }
  }
  return null;
}
let chasms = 0, solvedChasms = 0, cpCount = 0;
for (const day of ['2026-11-20', '2026-11-21', '2027-01-01', '2026-06-15']) {
  const w = C.World(C.daySeed(day)); w.ensure(330); const blocks = new Map();
  ok(C.daySeed(day) === C.daySeed(day) && C.World(C.daySeed(day)).nodes[5].x0 === w.nodes[5].x0, `${day}: deterministic`);
  for (let i = 1; i < w.nodes.length && w.nodes[i].y < 320; i++) {
    const a = w.nodes[i - 1], b = w.nodes[i]; if (b.cp) cpCount++;
    ok(b.y - a.y >= 2, `${day} node ${i}: gap >= 2`);
    if (!b.chasm) {
      if (!safeStarts(w, blocks, a).length) { // a pad fully covered in spikes: the first climber's body covers one spike, then everyone climbs from it
        let done = false; for (let x = a.x0; x <= a.x1 && !done; x++) { const bl = new Map(blocks); bl.set(C.bkey(x, a.y + 1), { id: 'body' }); if (solve(w, bl, { y: a.y + 1, x0: x, x1: x }, b)) done = true; }
        ok(done, `${day} node ${i}: spike pad ${a.y} passable after one body covers it`); continue; }
      const s = solve(w, blocks, a, b); ok(!!s, `${day} node ${i}: reachable from ${a.y}[${a.x0}-${a.x1}] to ${b.y}[${b.x0}-${b.x1}]`); continue; }
    chasms++; ok(b.y - a.y > C.REACH, `${day} node ${i}: chasm is really too high to jump (${b.y - a.y})`);
    ok(!solve(w, blocks, a, b), `${day} node ${i}: chasm can't be jumped alone`);
    // one sacrifice at the apex of a jump, then climb onto your own body
    let done = false;
    for (const t0 of [1000, 1000.6, 1001.3, 1002.2]) for (const sx of safeStarts(w, blocks, a)) { if (done) break; for (let a2 = -6; a2 <= 6 && !done; a2++) {
      const dx = a2 * .07, dy = Math.sqrt(1 - dx * dx); let apex = null;
      const r = sim(w, blocks, { x: sx, y: a.y + 1 }, dx, dy, Q => { if (Q.vy <= 0 && !apex) { apex = { x: Q.x, y: Q.y }; return true; } }, t0);
      if (r.dead || !apex) continue;
      const cell = C.bodyCell(w, blocks, C.sacCell(apex)), bl = new Map(blocks); bl.set(C.bkey(cell.x, cell.y), { id: 'me' });
      // respawn → climb back to platform a is assumed (it is reachable); from a, jump onto the body, then from the body reach b
      const body = { y: cell.y, x0: cell.x, x1: cell.x };
      if (solve(w, bl, a, body) && solve(w, bl, body, b)) done = true;
    } }
    ok(done, `${day} node ${i}: chasm ${a.y}→${b.y} solvable with one sacrifice`); if (done) solvedChasms++;
  }
  ok(w.cps.length >= 10, `${day}: checkpoints every ${C.CP_EVERY} m (${w.cps.length})`);
}
console.log(`chasms checked ${chasms}, solved with one sacrifice ${solvedChasms}, checkpoints ${cpCount}`);
console.log(`soulstack-core: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
