/* طخطخة ثلاثية الأبعاد: جهازان حقيقيان على الخادم (المحاكاة على الخادم) + لقطات للخرائط */
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3113/', sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3113 }, stdio: 'inherit' }); await sleep(900);
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const errs = []; let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const mk = async (name, vp, touch, q) => { const ctx = await br.newContext({ viewport: vp || { width: 800, height: 520 }, hasTouch: !!touch, isMobile: !!touch }); await ctx.addInitScript(q => { localStorage.setItem('dw_sk', JSON.stringify({ q, lock: 1 })); }, q || 0); const p = await ctx.newPage(); p.setDefaultTimeout(9000); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_|Failed to load/.test(m.text())) errs.push(name + ' console: ' + m.text().slice(0, 200)); }); return p; };
  const until = async (f, ms = 10000, m = '') => { const t = Date.now(); while (Date.now() - t < ms) { try { if (await f()) return true; } catch (e) { } await sleep(150); } console.log('  timeout: ' + m); return false; };
  const SS = p => p.evaluate(() => { const s = window.SK && SK.dbg.S(); return s && { ph: s.ph, rd: s.rd, sc: s.sc, pl: s.pl, bomb: s.bomb, mvp: s.mvp }; });

  const A = await mk('A'), B = await mk('B', { width: 780, height: 360 }, true);
  await A.goto(URL); await A.waitForFunction(() => window.DW && DW.Net.ok);
  await A.evaluate(async () => { const c = document.createElement('canvas'); c.width = c.height = 200; const x = c.getContext('2d'); x.fillStyle = '#2a7'; x.fillRect(0, 0, 200, 200); x.fillStyle = '#fff'; x.font = '120px sans-serif'; x.fillText('ع', 60, 140); const b = await new Promise(r => c.toBlob(r, 'image/png')); await DW.setFace(new File([b], 'f.png', { type: 'image/png' })); });
  await A.click('[data-act=create]'); await until(() => A.evaluate(() => DW.Room.R && DW.Room.R.code !== 'LOCAL'));
  const code = await A.evaluate(() => DW.Room.R.code); await B.goto(URL + '#r-' + code); await until(() => A.evaluate(() => DW.Room.R.ps.length === 2));
  await A.click('[data-act="pick:strike"]'); ok(await A.evaluate(() => DW.Room.R.teams === 1), 'lobby: picking the shooter turns on team assignment');
  await A.selectOption('#o_w', '0'); await A.selectOption('#o_map', '3'); await A.click('[data-act=start]');
  ok(await until(async () => (await SS(A)) && (await SS(B)) && (await SS(B)).rd === 1, 40000, 'snapshot'), 'both devices get round state from the server simulation');
  const idA = await A.evaluate(() => DW.P.id), idB = await B.evaluate(() => DW.P.id);
  ok(await until(() => B.evaluate(a => !!SK.dbg.faces[a], idA), 12000), 'face photo of A delivered to B');
  ok(await until(() => A.evaluate(b => !!SK.dbg.Ppos[b] && !!SK.dbg.chars[b], idB), 12000), 'B position reaches A and a 3D soldier is created for B');
  await B.evaluate(() => SK.dbg.toHost(['buy', 'rifle'])); await sleep(500); ok((await SS(A)).pl[idB].w === '', 'server refuses a rifle the player cannot afford');
  await B.evaluate(a => SK.dbg.toHost(['h', a, 0, 0, 1]), idA); await sleep(500); ok((await SS(A)).pl[idA].hp === 100, 'server ignores hits during freeze time');
  ok(await until(async () => (await SS(A)).ph === 'live', 14000), 'round goes live');
  const p0 = await A.evaluate(b => ({ ...SK.dbg.Ppos[b] }), idB);
  const cdp = await B.context().newCDPSession(B), tp = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts });
  await tp('touchStart', [{ x: 110, y: 240, id: 1 }]); await tp('touchMove', [{ x: 110, y: 150, id: 1 }]);
  ok(await until(() => A.evaluate(([b, p]) => Math.hypot(SK.dbg.Ppos[b].tx - p.x, SK.dbg.Ppos[b].ty - p.y) > .6, [idB, p0]), 15000), 'touch joystick moves B and A sees it'); await tp('touchEnd', []);
  await A.evaluate(() => { const s = SK.dbg.self; s.x = 6.5; s.y = 6.5; s.a = 0; }); await B.evaluate(() => { const s = SK.dbg.self; s.x = 9.5; s.y = 6.5; s.a = Math.PI; s.pi = 0; });
  await until(() => B.evaluate(a => Math.abs(SK.dbg.Ppos[a].x - 6.5) < .15, idA), 8000); await sleep(600); await B.screenshot({ path: 'test/sk-aim-mobile.png' }); await A.screenshot({ path: 'test/sk-enemy.png' });
  const fb = await B.locator('.sk-fire').boundingBox(); let killed = false;
  for (let i = 0; i < 6 && !killed; i++) { await tp('touchStart', [{ x: fb.x + fb.width / 2, y: fb.y + fb.height / 2, id: 5 }]); await sleep(120); await tp('touchEnd', []); killed = await until(async () => !(await SS(A)).pl[idA].al, 700, 'tap ' + i); }   /* المسدس نصف آلي: نقرة لكل طلقة */
  ok(killed, 'real 3D hitscan: holding fire on the enemy in the crosshair kills him (server-computed damage)');
  const s1 = await SS(B); ok(s1.pl[idB].k === 1 && s1.pl[idB].hs === 1, 'kill + headshot recorded by the server (eye-level shot hits the head box)');
  ok(await until(async () => { const s = await SS(B); return s.rd === 2 && s.ph === 'freeze' && s.pl[idA].al && s.pl[idB].$ === 800 + 300 + 3000; }, 12000), 'next round: respawn and money (kill 300 + win 3000)');
  await B.evaluate(() => { SK.dbg.toHost(['buy', 'rifle']); SK.dbg.toHost(['buy', 'armor']); });
  ok(await until(async () => { const q = (await SS(A)).pl[idB]; return q.w === 'rifle' && q.ar === 100 && q.$ === 4100 - 2700 - 650; }), 'buy rifle + armor in freeze time');
  await B.screenshot({ path: 'test/sk-rifle-mobile.png' });
  /* إعادة اتصال: B يحدّث الصفحة وسط المباراة */
  await B.reload(); ok(await until(async () => { const s = await SS(B); return s && s.rd === 2 && s.pl[idB].w === 'rifle'; }, 40000), 'reconnect: refreshed player rejoins the same server-side match with his rifle');
  await until(async () => (await SS(A)).ph === 'live', 14000);
  await A.evaluate(() => { const s = SK.dbg.self; s.x = 6.5; s.y = 6.5; }); await B.evaluate(() => { const s = SK.dbg.self; s.x = 9.5; s.y = 6.5; }); await sleep(900);
  await B.evaluate(a => SK.dbg.toHost(['h', a, 1, 1, 1]), idA);
  ok(await until(async () => (await SS(A)).sc[(await SS(A)).pl[idB].tm] === 2, 8000), 'second round won');
  await until(async () => (await SS(B)).rd === 3 && (await SS(B)).ph === 'live', 25000);
  await A.evaluate(() => { const s = SK.dbg.self; s.x = 6.5; s.y = 6.5; }); await B.evaluate(() => { const s = SK.dbg.self; s.x = 9.5; s.y = 6.5; }); await sleep(900);
  await B.evaluate(a => SK.dbg.toHost(['h', a, 1, 1, 1]), idA);
  ok(await until(() => A.evaluate(() => !!DW.Room.R.res), 15000) && await until(() => B.evaluate(() => !!DW.Room.R.res)), 'match over: platform result on both devices');
  ok(await B.evaluate(() => DW.Room.R.res.win.includes(DW.P.id) && /3 – 0/.test(DW.Room.R.res.msg) && DW.Room.R.st.mvp === DW.P.id && DW.Room.R.st.fin[DW.P.id][0] === 3), 'final 3–0, MVP and K/D/A/HS table stored');
  await A.screenshot({ path: 'test/sk-result.png' });
  await A.close(); await B.close();

  /* تدريب بلا اتصال بالخادم (المحاكاة نفسها محلياً) + لقطات */
  const S = await mk('S', { width: 1280, height: 800 }, false, 2); await S.goto(URL); await S.waitForFunction(() => window.DW);
  await S.click('.card[data-act="game:strike"]'); await sleep(2500); await S.screenshot({ path: 'test/sk-menu.png' }); await S.click('[data-act="solo:strike"]');
  ok(await until(async () => (await SS(S)) && (await SS(S)).ph === 'freeze', 40000), 'training: offline match vs bots starts (6 players)');
  await S.evaluate(() => { document.querySelector('.sk-lock').style.display = 'none'; }); await sleep(1500); await S.screenshot({ path: 'test/sk-buy.png' });
  await until(async () => (await SS(S)).ph === 'live', 14000); await sleep(4000);
  const moved = await S.evaluate(() => { const s = SK.dbg.S(); return Object.keys(s.pl).filter(id => id !== DW.P.id && SK.dbg.Ppos[id] && Math.hypot(SK.dbg.Ppos[id].x - s.pl[id].sp[0], SK.dbg.Ppos[id].y - s.pl[id].sp[1]) > 1).length; });
  ok(moved >= 3, `bots leave spawn and navigate (${moved}/5)`);
  await S.keyboard.down('KeyW'); await sleep(2500); await S.keyboard.up('KeyW'); const d = await S.evaluate(() => { const s = SK.dbg.S(), me = s.pl[DW.P.id]; return Math.hypot(SK.dbg.self.x - me.sp[0], SK.dbg.self.y - me.sp[1]); }); ok(d > .3, 'keyboard: W moves the player (' + d.toFixed(2) + ' tiles at headless frame rate)');
  await S.screenshot({ path: 'test/sk-play.png' });
  console.log('page errors:', errs.length ? errs.slice(0, 10) : 'none'); if (errs.length) fails++;
  await br.close(); srv.kill(); console.log(fails ? `\n${fails} FAILURES` : '\nALL STRIKE E2E PASSED'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
