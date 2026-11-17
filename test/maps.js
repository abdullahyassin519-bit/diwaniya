/* طخطخة: فحص كل الخرائط (الأبعاد، نقاط البداية، المواقع، الاتصال) وفحص السقف داخل المباني */
const C = require('../public/js/strike-core.js');
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
for (const name of Object.keys(C.RAW)) {
  const m = C.parseMap(name), walk = i => !m.g[i];
  ok(m.sp[0].length >= 5 && m.sp[1].length >= 5, name + ': at least 5 spawns per team');
  let a = 0, b = 0; for (const v of m.st) { if (v === 1) a++; if (v === 2) b++; } ok(a >= 4 && b >= 4, name + ': both bomb sites have area');
  const s = (m.sp[0][0][1] | 0) * m.w + (m.sp[0][0][0] | 0), seen = new Uint8Array(m.w * m.h), q = [s]; seen[s] = 1;
  while (q.length) { const i = q.shift(), x = i % m.w, y = i / m.w | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = (y + dy) * m.w + x + dx; if (!seen[n] && walk(n)) { seen[n] = 1; q.push(n); } } }
  let un = 0; for (let i = 0; i < m.w * m.h; i++) if (walk(i) && !seen[i] && !m.fh[i]) un++;
  ok(un === 0, name + ': every walkable ground cell is reachable from the attacker spawn (' + un + ' unreachable)');
  const d = (m.sp[1][0][1] | 0) * m.w + (m.sp[1][0][0] | 0); ok(seen[d], name + ': defender spawn reachable');
  for (const k of ['a', 'b']) { const [x, y] = m.sc[k]; ok(seen[(y | 0) * m.w + (x | 0)], name + ': site ' + k + ' reachable'); }
}
/* السقف: رصاصة للأعلى داخل مبنى تتوقف عند السقف، وخارجه لا */
const m = C.parseMap('السوق'); let inCell = -1, outCell = -1;
for (let i = 0; i < m.w * m.h; i++) { if (m.ind[i] && !m.g[i] && inCell < 0) inCell = i; if (!m.ind[i] && !m.g[i] && outCell < 0 && i > m.w) outCell = i; }
const ix = inCell % m.w + .5, iy = (inCell / m.w | 0) + .5, t = C.ray3(m, ix, iy, .8, 0, 0, 1, 10);
ok(Math.abs(t - (C.CEIL - .8)) < 1e-6 && C.R3.kind === 'c', 'shot straight up indoors stops at the ceiling (t=' + t.toFixed(2) + ')');
const ox = outCell % m.w + .5, oy = (outCell / m.w | 0) + .5; C.ray3(m, ox, oy, .8, 0, 0, 1, 10); ok(C.R3.kind !== 'c', 'shot straight up outdoors is not stopped by a ceiling');
ok(C.ray3(m, ix, iy, 5, 0, 0, -1, 10) < 5 - C.ROOF + 1e-6 && C.R3.kind === 't', 'shot downward from above a building hits its roof');
ok(m.ind.reduce((a, v) => a + v, 0) > 50 && C.parseMap('المدرسة').ind.reduce((a, v) => a + v, 0) > 50 && C.parseMap('الميناء').ind.reduce((a, v) => a + v, 0) > 30, 'new maps have enterable interiors');
ok(Object.keys(C.RAW).length >= 6, 'six maps available');
console.log(`maps: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
