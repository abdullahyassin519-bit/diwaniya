/* لكل درج (y→z→w): يبدأ لاعب على الأرض قبل أول درجة، يمشي بالفيزياء المشتركة نفسها، ويجب أن يصل إلى السطح (ROOF) ثم لا يسقط عبره */
const C = require('../public/js/strike-core.js'); let pass = 0, fail = 0;
const ok = (c, msg) => { if (c) pass++; else { fail++; console.log('FAIL', msg); } };
for (const name of Object.keys(C.RAW)) {
  const m = C.parseMap(name), at = (x, y) => m.ch[y * m.w + x];
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) {
    if (at(x, y) !== 'y') continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      if (at(x + dx, y + dy) !== 'z' || at(x + 2 * dx, y + 2 * dy) !== 'w') continue;
      const tx = x + 3 * dx, ty = y + 3 * dy, ti = ty * m.w + tx; if (!m.ind[ti]) continue; /* درج المستودع الخارجي يصل إلى منصة Q ويُختبر في vertical */
      const sx = x - dx, sy = y - dy, si = sy * m.w + sx;
      ok(!m.g[si] && !m.fh[si], `${name} (${x},${y}): ground before the first step is walkable`);
      const P = { x: sx + .5, y: sy + .5, z: 0, vz: 0, gr: 1 }; let maxZ = 0;
      for (let k = 0; k < 400; k++) { C.mv(m, P, dx * .03, dy * .03); C.vert(m, P, 1 / 60, false); maxZ = Math.max(maxZ, P.z); if ((P.x | 0) === tx && (P.y | 0) === ty && P.z >= C.ROOF - .01) break; }
      ok((P.x | 0) === tx && (P.y | 0) === ty && Math.abs(P.z - C.ROOF) < .02, `${name} (${x},${y}): reached the roof tile (${tx},${ty}) at z=${C.ROOF}; got (${P.x.toFixed(2)},${P.y.toFixed(2)}) z=${P.z.toFixed(2)}`);
      for (let k = 0; k < 120; k++) C.vert(m, P, 1 / 60, false);
      ok(Math.abs(P.z - C.ROOF) < .02, `${name}: standing on the roof does not fall through, z=${P.z.toFixed(2)}`);
      /* من الغرفة تحت السطح: القفز لا يخترق السقف */
      const Q = { x: tx + .5, y: ty + .5, z: 0, vz: 0, gr: 1 }; C.vert(m, Q, 1 / 60, true); let qm = 0; for (let k = 0; k < 90; k++) { C.vert(m, Q, 1 / 60, false); qm = Math.max(qm, Q.z); }
      ok(qm <= C.ROOF_IN + .01 && Q.z < .01, `${name}: a jump inside the room stays under the ceiling (max z=${qm.toFixed(2)})`);
      console.log(`${name}: stairs (${x},${y}) → roof (${tx},${ty}) ok`);
    }
  }
}
/* الخادم يقبل موقع لاعب يصعد الدرج حتى السطح (لا يعيده إلى الأسفل) */
{
  const name = 'الحارة', m = C.parseMap(name); let T = 1000; const out = [];
  const sim = C.Sim({ map: name, ps: ['a', 'b'], tm: { a: 0, b: 1 }, bots: { b: 1 }, connected: () => true, now: () => T, emit: (msg, to) => out.push(msg) });
  let x = 8.5, y = 13.5, z = 0; const P = { x, y, z, vz: 0, gr: 1 };
  sim.S.ph = 'live'; let accepted = 0;
  for (let k = 0; k < 400; k++) { C.mv(m, P, .03, 0); C.vert(m, P, 1 / 60, false); T += 16; sim.msg && 0; if (k % 3 === 0) { const before = sim.pos && sim.pos.a ? sim.pos.a.z : null; sim.msg('a', ['p', P.x, P.y, 0, 0, 0, P.z]); } if ((P.x | 0) === 12 && P.z >= C.ROOF - .01) break; }
  const pz = sim.pos && sim.pos.a ? sim.pos.a.z : -1;
  ok(Math.abs(pz - C.ROOF) < .05, `server accepts the climb to the roof (server z=${pz})`);
}
console.log(`roofs+server: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
