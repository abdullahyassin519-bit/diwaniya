/* غرف ودعوات: شاشة الانضمام من الرابط، القفل، الحد الأقصى، الطرد، الإغلاق */
const { chromium } = require('/opt/npm-tools/node_modules/playwright'); const { spawn } = require('child_process');
const URL = 'http://localhost:3117/', sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3117 }, stdio: 'inherit' }); await sleep(800);
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const errs = []; let fails = 0;
  const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const mk = async (name, vp) => { const ctx = await br.newContext({ viewport: vp || { width: 1100, height: 800 } }); const p = await ctx.newPage(); p.setDefaultTimeout(7000); p.on('pageerror', e => errs.push(name + ': ' + e.message)); return p; };
  const until = async (f, ms = 8000) => { const t = Date.now(); while (Date.now() - t < ms) { try { if (await f()) return true; } catch (e) { } await sleep(120); } return false; };
  const toast = p => p.evaluate(() => document.querySelector('#toast').innerText);
  const A = await mk('A'), B = await mk('B', { width: 390, height: 800 }), C = await mk('C');
  await A.goto(URL); await A.waitForFunction(() => window.DW && DW.Net.ok); await A.click('[data-act=create]'); await until(() => A.evaluate(() => DW.Room.R && DW.Room.R.code !== 'LOCAL'));
  const code = await A.evaluate(() => DW.Room.R.code), link = URL + '#r-' + code;
  ok(await A.evaluate(c => document.querySelector('a[href*="wa.me"]').href.includes(encodeURIComponent('#r-' + c)), code), 'lobby: WhatsApp button carries the invite link');
  await B.goto(link);
  ok(await until(() => B.evaluate(() => !!document.querySelector('#gate_in'))), 'invite link opens the join screen (name + picture) instead of dropping the guest in');
  ok(await B.evaluate(c => document.querySelector('.mod').innerText.includes(c) && /1 من 12/.test(document.querySelector('.mod').innerText), code), 'join screen shows the room code and player count');
  await B.screenshot({ path: 'test/room-gate.png' });
  await B.fill('#gate_in', 'سالم'); await B.click('.avb >> nth=3'); await B.click('[data-act=enter]');
  ok(await until(() => A.evaluate(() => DW.Room.R.ps.length === 2 && DW.Room.R.ps[1].n === 'سالم')), 'host sees the friend in the lobby with the name he typed');
  /* صلاحيات: B لا يستطيع تغيير إعدادات الغرفة */
  ok(await B.evaluate(() => !document.querySelector('[data-act=lock]') && !document.querySelector('[data-act=closeroom]') && !document.querySelector('[data-act=start]')), 'guest has no host controls');
  await A.click('[data-act=lock]'); await sleep(400); await C.goto(link);
  ok(await until(async () => /مقفلة/.test(await toast(C))) && await C.evaluate(() => !DW.Room.R), 'locked room: newcomer is told it is locked and stays out');
  await A.click('[data-act=lock]'); for (let i = 0; i < 10; i++) await A.click('[data-act="max:-1"]'); await sleep(400);
  ok(await A.evaluate(() => DW.Room.R.max === 2), 'host sets the player cap (cannot go below current players)');
  await C.goto(URL); await C.waitForFunction(() => DW.Net.ok); await C.fill('#join_in', code); await C.click('[data-act=join]');
  ok(await until(async () => /مكتملة/.test(await toast(C))), 'full room: third player is told it is full');
  await A.click('[data-act="max:1"]'); await sleep(400); await C.click('[data-act=join]'); await until(() => C.evaluate(() => !!document.querySelector('#gate_in'))); await C.click('[data-act=enter]');
  ok(await until(() => A.evaluate(() => DW.Room.R.ps.length === 3)), 'after raising the cap the third player joins by code');
  await A.screenshot({ path: 'test/room-lobby.png' });
  /* طرد */
  const idB = await B.evaluate(() => DW.P.id); await A.click(`[data-act="kick:${idB}"]`);
  ok(await until(() => B.evaluate(() => !DW.Room.R)) && await until(async () => /أزالك/.test(await toast(B))), 'kick: removed player is sent home with a message');
  await B.goto(link); ok(await until(async () => /أزالك قائد/.test(await toast(B))) && await B.evaluate(() => !DW.Room.R), 'kicked player cannot come back through the link');
  /* تحديث صفحة عضو = عودة تلقائية بلا شاشة انضمام */
  await C.reload(); ok(await until(() => C.evaluate(() => DW.Room.R && DW.Room.R.ps.length === 2)), 'member refresh: returns straight to the lobby');
  /* إغلاق */
  await A.click('[data-act=closeroom]');
  ok(await until(() => C.evaluate(() => !DW.Room.R)) && await until(async () => /أغلق القائد/.test(await toast(C))), 'close room: everyone is sent home');
  await C.goto(link); ok(await until(async () => /لا توجد غرفة/.test(await toast(C))), 'closed room link no longer works');
  console.log('page errors:', errs.length ? errs : 'none'); if (errs.length) fails++;
  await br.close(); srv.kill(); console.log(fails ? `\n${fails} FAILURES` : '\nALL ROOM E2E PASSED'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
