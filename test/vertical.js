/* فحوص الحركة الرأسية: القفز، الدرج إلى السطح، منع الاختراق، والتحقق على الخادم من الارتفاع */
const C = require('../public/js/strike-core.js');
let fail = 0, pass = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
const DT = 1 / 60;

// 1) الخريطة تحتوي الدرج والسطح في الموضع المتوقع
const m = C.parseMap('المستودع');
const at = (x, y) => m.ch[y * m.w + x];
ok(at(7, 6) === 'y' && at(8, 6) === 'z' && at(9, 6) === 'w', 'stairs present');
ok(at(10, 6) === 'Q' && at(12, 6) === 'Q', 'roof cells present');
ok(Math.abs(m.fh[6 * m.w + 8] - C.FH.z) < 1e-4 && Math.abs(m.fh[6 * m.w + 12] - C.FH.Q) < 1e-4, 'floor heights set');
ok(m.fh[6 * m.w + 6] === 0, 'ground stays at 0');

// 2) المشي من الأرض عبر الدرج يوصل إلى السطح
{
  const P = { x: 6.5, y: 6.5, a: 0, z: 0, vz: 0, gr: 1 };
  let maxZ = 0;
  for (let t = 0; t < 3; t += DT) { C.mv(m, P, 2.6 * DT, 0); C.vert(m, P, DT, false); if (P.z > maxZ) maxZ = P.z; }
  ok(P.x > 11 && Math.abs(P.z - C.FH.Q) < .01, 'walk up stairs onto roof, x=' + P.x.toFixed(2) + ' z=' + P.z);
  ok(maxZ <= C.FH.Q + .01, 'no overshoot above roof');
}

// 3) لا يمكن دخول السطح مباشرة من الأرض دون درج أو قفز عالٍ بما يكفي
{
  const P = { x: 9.5, y: 6.5, a: 0, z: 0, vz: 0, gr: 1 };
  // نقف على خلية أرضية x=9 ارتفاعها 1.95 ممنوعة من الأرض: نجرّب الدخول إلى Q من خلية أرضية (6,4) حيث لا درج
  const Q = { x: 6.5, y: 4.5, a: 0, z: 0, vz: 0, gr: 1 };
  for (let i = 0; i < 200; i++) { C.mv(m, Q, 2.6 * DT, 0); C.vert(m, Q, DT, false); }
  ok(Q.z === 0 && Q.x < 10, 'ground player blocked from roof without stairs');
  ok(P.z === 0, 'sanity');
}

// 4) القفز: ذروة نحو 1.1 والهبوط بعد وقت قصير
{
  const P = { x: 3.5, y: 2.5, a: 0, z: 0, vz: 0, gr: 1 };
  C.vert(m, P, DT, true);
  let apex = P.z, landed = -1;
  for (let i = 1; i < 300; i++) { C.vert(m, P, DT, false); if (P.z > apex) apex = P.z; if (P.gr && landed < 0 && i > 3) { landed = i * DT; break; } }
  ok(apex > .95 && apex < 1.25, 'jump apex ~1.08, got ' + apex.toFixed(2));
  ok(landed > 0 && landed < 1.2, 'lands in ' + landed.toFixed(2) + 's');
  ok(Math.abs(P.z) < 1e-6, 'back to ground');
}

// 5) القفز فوق ساتر منخفض (c ارتفاعه .55) ممكن، والمشي العادي عبره ممنوع
{
  // ابحث عن خلية 'c' في المستودع ومجاورتها الغربية
  let cx = -1, cy = -1;
  for (let y = 1; y < m.h - 1 && cx < 0; y++) for (let x = 2; x < m.w - 2; x++) if (at(x, y) === 'c' && at(x - 1, y) === '.') { cx = x; cy = y; break; }
  if (cx > 0) {
    const walk = { x: cx - .5, y: cy + .5, a: 0, z: 0, vz: 0, gr: 1 };
    for (let i = 0; i < 120; i++) { C.mv(m, walk, 2.6 * DT, 0); C.vert(m, walk, DT, false); }
    ok(walk.x < cx + .5, 'cannot walk through low cover');
    const jp = { x: cx - .5, y: cy + .5, a: 0, z: 0, vz: 0, gr: 1 };
    let crossed = false;
    for (let i = 0; i < 240 && !crossed; i++) {
      if (i < 30) C.vert(m, jp, DT, i === 0);
      else C.vert(m, jp, DT, false);
      if (jp.gr && i > 0 && i % 25 === 0) C.vert(m, jp, DT, true);
      C.mv(m, jp, 2.6 * DT, 0);
      if (jp.x > cx + .8) crossed = true;
    }
    ok(crossed, 'jump lets player clear low cover');
  } else ok(true, 'no low cover found (skipped)');
}

// 6) الخادم يرفض ارتفاعاً لا يُمكن الوصول إليه (قفز من الأرض إلى السطح)
{
  const emitted = [];
  let now = 0;
  const sim = C.Sim({ map: 'المستودع', now: () => now, emit: () => { }, ps: ['a', 'b'], tm: { a: 1, b: 0 }, bots: {}, connected: () => true, diff: 1, target: 5 });
  sim.msg('a', ['p', 6.5, 6.5, 0, 0, 0, 0]);
  now += 200; sim.msg('a', ['p', 10.5, 6.5, 0, 0, 0, 2.6]);
  ok(!sim.pos.a || sim.pos.a.z !== 2.6 || sim.pos.a.x !== 10.5, 'server rejects teleport onto roof');
  // صعود صحيح عبر الدرج: كل خطوة لا تتجاوز ارتفاعاً معقولاً عن السابقة
  const seq = [[7.5, .65], [8.5, 1.3], [9.5, 1.95], [10.5, 2.6]];
  let prevZ = 0;
  for (const [x, z] of seq) { now += 80; sim.msg('a', ['p', x, 6.5, 0, 0, 0, z]); }
  ok(sim.pos.a && Math.abs(sim.pos.a.z - 2.6) < .01 && sim.pos.a.x === 10.5, 'server accepts stepwise stair climb');
  // سقوط من السطح مسموح
  now += 80; sim.msg('a', ['p', 9.5, 6.5, 0, 0, 0, 2.0]);
  ok(sim.pos.a && sim.pos.a.z === 2.0, 'falling is accepted');
  // ارتفاع خيالي فوق الأرض
  now += 80; sim.msg('a', ['p', 6.5, 4.5, 0, 0, 0, 3.5]);
  ok(!(sim.pos.a && sim.pos.a.z === 3.5), 'impossible height rejected');
  // ارتفاع غير صالح
  now += 80; sim.msg('a', ['p', 6.5, 6.5, 0, 0, 0, NaN]);
  ok(!(sim.pos.a && sim.pos.a.z !== sim.pos.a.z), 'NaN height rejected');
}

// 7) الرصاص من السطح يمر فوق الجدار المنخفض، ولا يمر من الجدار الأعلى
{
  const e = C.ray3(m, 9.5, 6.5, .8, 1, 0, 0, 5, false); // من الأرض عبر جدار
  ok(e < 5, 'ground ray blocked by wall');
  const r = C.ray3(m, 9.5, 6.5, 3.4, 1, 0, 0, 5, false); // من السطح (ارتفاع 3.4) فوق الجدار
  ok(r === 5, 'roof-height ray passes over wall top, got ' + r);
}

console.log(`vertical: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
