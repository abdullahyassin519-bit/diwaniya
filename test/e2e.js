const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3111/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3111 }, stdio: 'inherit' }); await sleep(700);
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const errs = []; let fails = 0;
  const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++; };
  const mk = async (name, vp) => { const ctx = await br.newContext({ viewport: vp || { width: 1100, height: 800 } }); await ctx.addInitScript(() => { try { if (!localStorage.getItem('dw_p')) localStorage.setItem('dw_p', JSON.stringify({ named: 1 })); } catch (e) { } }); const p = await ctx.newPage(); p.setDefaultTimeout(7000); p.on('pageerror', e => errs.push(name + ': ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/fonts|ERR_|Failed to load resource/.test(m.text())) errs.push(name + ' console: ' + m.text()); }); return p; };
  const R = p => p.evaluate(() => { const r = DW.Room.R; return r && { code: r.code, n: r.ps.length, ph: r.ph, gid: r.gid, host: r.host, res: !!r.res, v: r.v, st: r.st && { ph: r.st.ph, i: r.st.i, k: r.st.k, word: r.st.word, dr: r.st.dr, sc: r.st.sc, strokes: (r.st.strokes || []).length }, isHost: DW.Room.host, me: DW.P.id }; });
  const until = async (f, ms = 8000, m = '') => { const t = Date.now(); while (Date.now() - t < ms) { if (await f()) return true; await sleep(120); } console.log('  timeout: ' + m); return false; };

  /* ===== 1) ثلاثة لاعبين في غرفة مباشرة ===== */
  const A = await mk('A'), B = await mk('B', { width: 390, height: 780 }), C = await mk('C');
  await A.goto(URL); await A.waitForFunction(() => window.DW && DW.Net.ok);
  await A.screenshot({ path: 'test/shot-home.png' });
  await A.click('[data-act=create]'); await until(async () => (await R(A)) && (await R(A)).code !== 'LOCAL');
  const code = (await R(A)).code; ok(/^[A-Z0-9]{4}$/.test(code), 'room created with code ' + code);
  await B.goto(URL + '#r-' + code); await C.goto(URL); await C.waitForFunction(() => DW.Net.ok); await C.fill('#join_in', code.toLowerCase()); await C.click('[data-act=join]');
  ok(await until(async () => (await R(A)).n === 3 && (await R(B))?.n === 3 && (await R(C))?.n === 3, 8000, 'join'), 'three players see each other (link + code join)');
  await B.click('[data-act=rdy]'); await B.fill('#chat_in', 'هلا والله'); await B.click('[data-act=chat]');
  ok(await until(() => A.evaluate(() => DW.Room.R.chat.some(c => c.m === 'هلا والله') && DW.Room.R.ps.filter(p => p.rdy).length === 1)), 'ready state + chat reach host');
  await C.click('[data-act="gv:wyr"]'); ok(await until(() => A.evaluate(() => DW.Room.R.gv && Object.values(DW.Room.R.gv)[0] === 'wyr')), 'game vote reaches host');
  await B.screenshot({ path: 'test/shot-lobby-mobile.png' });

  /* ماذا تفضل: مباراة كاملة */
  await A.click('[data-act="pick:wyr"]'); await A.selectOption('#o_rd', '0'); await A.click('[data-act=start]');
  ok(await until(async () => (await R(B)).ph === 'game' && (await R(C)).st?.i === 0), 'game start synced');
  for (let q = 0; q < 5; q++) {
    await until(async () => (await R(A)).st.i === q && (await R(A)).st.ph === 'q' && (await R(B)).st.i === q && (await R(B)).st.ph === 'q' && (await R(C)).st.i === q && (await R(C)).st.ph === 'q', 9000, 'q' + q);
    for (const p of [A, B, C]) await p.click('#gv button.opt >> nth=' + (q % 2));
    await until(async () => (await R(A)).st.ph === 'rev' || (await R(A)).res, 4000, 'rev' + q);
    if (q === 0) await B.screenshot({ path: 'test/shot-wyr-mobile.png' });
  }
  ok(await until(async () => (await R(A)).res && (await R(B)).res && (await R(C)).res, 9000), 'wyr: full game finished on all 3 devices');
  const sA = (await R(A)).st.sc, sB = (await R(B)).st.sc; ok(JSON.stringify(sA) === JSON.stringify(sB) && Object.values(sA).every(v => v === 500), 'wyr: identical scores everywhere ' + JSON.stringify(Object.values(sA)));
  ok(await B.evaluate(() => DW.P.played === 1 && DW.P.xp > 0), 'profile xp/coins awarded on client');

  /* ارسم وخمّن: رسم + تخمين */
  await A.click('.mod [data-act=end]'); await A.click('[data-act="pick:draw"]'); await A.click('[data-act=start]');
  await until(async () => (await R(C)).st?.ph === 'pick');
  const pages = { [(await R(A)).me]: A, [(await R(B)).me]: B, [(await R(C)).me]: C };
  const dr = (await R(A)).st.dr, D = pages[dr], others = Object.keys(pages).filter(k => k !== dr).map(k => pages[k]);
  await D.click('#gv button.opt >> nth=1'); await until(async () => (await R(others[0])).st.ph === 'draw');
  const box = await D.locator('canvas.cv').boundingBox();
  await D.mouse.move(box.x + 40, box.y + 40); await D.mouse.down(); for (let i = 1; i <= 12; i++) await D.mouse.move(box.x + 40 + i * 20, box.y + 40 + i * 14); await D.mouse.up();
  ok(await until(async () => (await R(others[0])).st.strokes === 1 && (await R(others[1])).st.strokes === 1), 'draw: stroke synced to guessers');
  const inked = await others[0].evaluate(() => { const c = document.querySelector('canvas.cv'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] < 200) n++; return n; }); ok(inked > 100, 'draw: guesser canvas actually shows ink (' + inked + ' px)');
  await D.screenshot({ path: 'test/shot-draw.png' });
  const word = (await R(A)).st.word; await others[0].fill('#f_x', 'غلط'); await others[0].press('#f_x', 'Enter'); await others[0].fill('#f_x', word); await others[0].press('#f_x', 'Enter');
  ok(await until(async () => Object.values((await R(D)).st.sc).some(v => v > 0)), 'draw: correct guess scored');

  /* إعادة الاتصال: تحديث صفحة لاعب وسط المباراة */
  const meB = (await R(B)).me; await B.reload(); ok(await until(async () => { const r = await R(B); return r && r.ph === 'game' && r.gid === 'draw' && r.me === meB && r.n === 3; }, 8000), 'reconnect: refreshed player returns to the running game with same identity');
  /* تحديث صفحة القائد */
  await A.reload(); ok(await until(async () => { const r = await R(A); return r && r.isHost && r.ph === 'game'; }, 8000), 'host refresh: host resumes hosting');
  /* انتقال القيادة عند خروج القائد */
  await A.close(); ok(await until(async () => (await R(B)).isHost || (await R(C)).isHost, 20000, 'migration'), 'host migration: another player became host after host left');
  const v0 = (await R(B)).v; ok(await until(async () => (await R(B)).v > v0 + 1 || (await R(B)).res, 100000, 'progress'), 'game keeps running under the new host (timers advance)');
  await B.close(); await C.close();

  /* ===== 2) كل لعبة في متصفح حقيقي ضد لاعبين آليين ===== */
  const S = await mk('S'); await S.goto(URL); await S.waitForFunction(() => window.DW);
  const ids = await S.evaluate(() => G.list.map(g => g.id));
  for (const id of ids) {
    await S.evaluate(() => { if (DW.Room.R) document.querySelector('[data-act=leave]').click(); });
    await S.evaluate(id => document.querySelector(`[data-act="solo:${id}"]`).click(), id);
    const started = await until(() => S.evaluate(() => DW.Room.R && DW.Room.R.ph === 'game' && document.querySelector('#gv').innerHTML.length > 20), 4000, id);
    await sleep(900); if (id === 'mafia') { await S.setViewportSize({ width: 390, height: 800 }); await S.evaluate(() => { document.documentElement.dataset.theme = 'dark'; }); await sleep(200); await S.screenshot({ path: 'test/shot-mafia-dark-mobile.png', fullPage: true }); await S.evaluate(() => { delete document.documentElement.dataset.theme; }); await S.setViewportSize({ width: 1100, height: 800 }); }
    if (['chess', 'ludo', 'tycoon', 'snakes', 'colors', 'mafia', 'island', 'caravan', 'letters', 'dama'].includes(id)) await S.screenshot({ path: `test/shot-${id}.png` });
    await S.evaluate(() => { DW.Room.R.auto[DW.P.id] = 1; });
    const fin = await until(() => S.evaluate(() => !!DW.Room.R.res), ['c4', 'snakes', 'colors', 'wyr'].includes(id) ? 90000 : 2500, 'finish ' + id);
    const txt = await S.evaluate(() => document.querySelector('#main').innerText); const bad = /undefined|NaN|\[object/.test(txt);
    ok(started && !bad, `${id}: renders and runs in browser${fin ? ' — played to the end' : ' (long game, sampled)'}`);
    if (fin && !global.shotRes) { global.shotRes = 1; await S.screenshot({ path: 'test/shot-results.png' }); }
  }
  /* لاعبان على الجهاز نفسه: أربعة تربح */
  await S.evaluate(() => document.querySelector('[data-act=leave]').click()); await S.click('[data-act=create]'); await S.click('[data-act=loc]'); await S.click('[data-act="pick:c4"]'); await S.click('[data-act=start]');
  for (let i = 0; i < 7 && !(await R(S)).res; i++) { await S.click(`.c4c >> nth=${i % 2}`); await sleep(80); }
  ok((await R(S)).res, 'same-device play: two humans alternate on one device (connect four) and a winner is declared');
  /* الملف الشخصي والمتجر */
  await S.evaluate(() => document.querySelector('[data-act=leave]').click()); await S.click('[data-act=profile]'); await S.screenshot({ path: 'test/shot-profile.png' });
  ok(await S.evaluate(() => DW.P.played >= 4 && Object.keys(DW.P.ach).length >= 2), 'profile: stats + achievements recorded');
  await S.click('[data-act=close]'); await S.setViewportSize({ width: 390, height: 800 }); await S.evaluate(() => { document.documentElement.dataset.theme = 'dark'; }); await S.screenshot({ path: 'test/shot-home-mobile.png' }); const ow = await S.evaluate(() => document.documentElement.scrollWidth - innerWidth); ok(ow <= 0, 'mobile: no horizontal overflow (' + ow + ')');
  console.log('page errors:', errs.length ? errs.slice(0, 12) : 'none'); if (errs.length) fails++;
  await br.close(); srv.kill(); console.log(fails ? `\n${fails} FAILURES` : '\nALL E2E PASSED'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
