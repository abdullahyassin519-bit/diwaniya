const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3113/', sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3113 }, stdio: 'inherit' }); await sleep(800);
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const errs = []; let fails = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const mk = async (name, vp, touch) => { const ctx = await br.newContext({ viewport: vp || { width: 1100, height: 760 }, hasTouch: !!touch, isMobile: !!touch }); const p = await ctx.newPage(); p.setDefaultTimeout(8000); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_|Failed to load/.test(m.text())) errs.push(name + ' console: ' + m.text()); }); return p; };
  const until = async (f, ms = 9000, m = '') => { const t = Date.now(); while (Date.now() - t < ms) { try { if (await f()) return true; } catch (e) { } await sleep(150); } console.log('  timeout: ' + m); return false; };
  const SS = p => p.evaluate(() => { const s = window.SK && SK.dbg.S(); return s && { ph: s.ph, rd: s.rd, sc: s.sc, pl: s.pl, bomb: s.bomb }; });

  /* 1) لاعبان حقيقيان 1 ضد 1 */
  const A = await mk('A'), B = await mk('B', { width: 844, height: 390 }, true);
  await A.goto(URL); await A.waitForFunction(() => window.DW && DW.Net.ok);
  /* وجه للاعب A */
  await A.evaluate(async () => { const c = document.createElement('canvas'); c.width = c.height = 200; const x = c.getContext('2d'); x.fillStyle = '#2a7'; x.fillRect(0, 0, 200, 200); x.fillStyle = '#fff'; x.font = '120px sans-serif'; x.fillText('ع', 60, 140); const b = await new Promise(r => c.toBlob(r, 'image/png')); await DW.setFace(new File([b], 'f.png', { type: 'image/png' })); });
  ok(await A.evaluate(() => DW.P.face && DW.P.face.length > 500 && DW.P.face.length < 20000), 'face: photo cropped and stored on device');
  await A.click('[data-act=create]'); await until(() => A.evaluate(() => DW.Room.R && DW.Room.R.code !== 'LOCAL'));
  const code = await A.evaluate(() => DW.Room.R.code); await B.goto(URL + '#r-' + code);
  await until(() => A.evaluate(() => DW.Room.R.ps.length === 2));
  await A.click('[data-act="pick:strike"]'); await A.selectOption('#o_w', '0'); await A.selectOption('#o_map', '3'); await A.click('[data-act=start]');
  ok(await until(async () => (await SS(A)) && (await SS(B)) && (await SS(B)).rd === 1, 9000, 'snapshot'), 'both devices receive the host round state over WebSocket');
  const ids = await A.evaluate(() => ({ a: DW.P.id })), idB = await B.evaluate(() => DW.P.id);
  const gotFace = await until(() => B.evaluate(a => !!SK.dbg.faces[a], ids.a)); if (!gotFace) console.log('  dbg', await B.evaluate(() => Object.keys(SK.dbg.faces)), await A.evaluate(() => [DW.P.face.length, Object.keys(SK.dbg.faces)])); ok(gotFace, 'face: host face delivered to the other device');
  ok(await until(() => A.evaluate(b => !!SK.dbg.Ppos[b], idB)), 'positions: B visible to A');
  await until(async () => (await SS(A)).ph === 'live', 9000); 
  /* حركة B باللمس (عصا يسار) تصل إلى A */
  const p0 = await A.evaluate(b => ({ ...SK.dbg.Ppos[b] }), idB);
  const cdp = await B.context().newCDPSession(B); const tp = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts });
  await tp('touchStart', [{ x: 120, y: 250, id: 1 }]); await tp('touchMove', [{ x: 120, y: 170, id: 1 }]); await sleep(900);
  await tp('touchMove', [{ x: 120, y: 170, id: 1 }, { x: 600, y: 200, id: 2 }]).catch(() => { }); await tp('touchEnd', []);
  ok(await until(() => A.evaluate(([b, p]) => Math.hypot(SK.dbg.Ppos[b].tx - p.x, SK.dbg.Ppos[b].ty - p.y) > .8, [idB, p0])), 'touch joystick: B moved and A sees the movement');
  await B.screenshot({ path: 'test/sk-mobile.png' });
  /* شراء مرفوض خارج وقت الشراء ثم ضرر: B يصيب A */
  await B.evaluate(a => { SK.dbg.toHost(['h', a, 60, 0]); }, ids.a);
  ok(await until(async () => (await SS(A)).pl[ids.a].hp === 40 && (await SS(B)).pl[ids.a].hp === 40), 'damage: hit from B reduces A health on both devices');
  await B.evaluate(a => { SK.dbg.toHost(['h', a, 60, 1]); }, ids.a);
  ok(await until(async () => { const s = await SS(B); return s.ph === 'end' && s.sc[s.pl[idB].tm] === 1 && !s.pl[ids.a].al; }), 'kill ends the 1v1 round and scores for B team');
  ok(await until(async () => { const s = await SS(B); return s.rd === 2 && s.ph === 'freeze' && s.pl[ids.a].al && s.pl[idB].$ === 800 + 300 + 3000; }, 9000), 'next round starts: respawn + money (kill 300 + win 3000)');
  await B.evaluate(() => SK.dbg.toHost(['buy', 'rifle']));
  ok(await until(async () => (await SS(A)).pl[idB].w === 'rifle' && (await SS(A)).pl[idB].$ === 1400), 'buy: rifle bought in freeze time, money deducted by host');
  /* تصويب حقيقي: نضع A أمام B ونطلق */
  await until(async () => (await SS(A)).ph === 'live', 9000);
  await A.evaluate(() => { const s = SK.dbg.self; s.x = 6.5; s.y = 6.5; }); await sleep(400);
  await B.evaluate(() => { const s = SK.dbg.self; s.x = 9.5; s.y = 6.5; s.a = Math.PI; }); await sleep(500);
  await B.screenshot({ path: 'test/sk-aim.png' });
  const fb = await B.locator('.sk-fire').boundingBox(); await tp('touchStart', [{ x: fb.x + fb.width / 2, y: fb.y + fb.height / 2, id: 5 }]); 
  const killed = await until(async () => !(await SS(A)).pl[ids.a].al, 6000, 'real shots'); await tp('touchEnd', []);
  ok(killed, 'real hitscan: holding the fire button kills the enemy standing in the crosshair');
  /* أكمل المباراة حتى 3 */
  await until(async () => (await SS(B)).rd === 3 && (await SS(B)).ph === 'live', 20000);
  await B.evaluate(a => { SK.dbg.toHost(['h', a, 200, 0]); }, ids.a);
  ok(await until(() => A.evaluate(() => !!DW.Room.R.res), 12000) && await until(() => B.evaluate(() => !!DW.Room.R.res)), 'match over: platform result appears on both devices');
  ok(await B.evaluate(() => DW.Room.R.res.win.includes(DW.P.id) && /3 – 0/.test(DW.Room.R.res.msg)), 'winner and final score 3–0 reported');
  await A.screenshot({ path: 'test/sk-result.png' });
  await A.close(); await B.close();

  /* 2) ضد لاعبين آليين 3 ضد 3 + لقطات لكل خريطة */
  const S = await mk('S'); await S.goto(URL); await S.waitForFunction(() => window.DW);
  await S.screenshot({ path: 'test/sk-home.png' });
  for (const [i, name] of [[1, 'hara'], [2, 'depot'], [3, 'castle']]) {
    await S.evaluate(() => { if (DW.Room.R) document.querySelector('[data-act=leave]').click(); });
    await S.click('[data-act=create]'); for (let k = 0; k < 5; k++) await S.click('[data-act=bot]');
    await S.click('[data-act="pick:strike"]'); await S.selectOption('#o_map', String(i)); await S.selectOption('#o_w', '0'); await S.click('[data-act=start]');
    await until(async () => (await SS(S)) && (await SS(S)).ph === 'freeze'); await sleep(600); await S.screenshot({ path: `test/sk-${name}-buy.png` });
    await until(async () => (await SS(S)).ph === 'live', 9000); await sleep(3500); await S.screenshot({ path: `test/sk-${name}.png` });
    const moved = await S.evaluate(() => { const s = SK.dbg.S(); return Object.keys(s.pl).filter(id => id !== DW.P.id && SK.dbg.Ppos[id] && Math.hypot(SK.dbg.Ppos[id].x - s.pl[id].sp[0], SK.dbg.Ppos[id].y - s.pl[id].sp[1]) > 1).length; });
    ok(moved >= 3, `${name}: bots leave spawn and navigate (${moved}/5 moved)`);
    if (i === 1) { await S.keyboard.down('KeyW'); await sleep(700); await S.keyboard.up('KeyW'); const d = await S.evaluate(() => { const s = SK.dbg.S(), me = s.pl[DW.P.id]; return Math.hypot(SK.dbg.self.x - me.sp[0], SK.dbg.self.y - me.sp[1]); }); ok(d > 1, 'keyboard: W moves the player (' + d.toFixed(1) + ' tiles)');
      ok(await until(() => S.evaluate(() => !!DW.Room.R.res), 240000, 'bot match'), 'solo vs bots: a full match plays to the end in the browser'); }
  }
  console.log('page errors:', errs.length ? errs.slice(0, 10) : 'none'); if (errs.length) fails++;
  await br.close(); srv.kill(); console.log(fails ? `\n${fails} FAILURES` : '\nALL STRIKE E2E PASSED'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
