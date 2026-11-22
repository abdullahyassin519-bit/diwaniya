/* SHUHUB in real browsers: menu → level 1 played by holding the pointer → win → level 2 unlocked → workshop purchase → duel by link between two browsers */
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path'), fs = require('fs');
const PORT = 3740 + Math.floor(Math.random() * 30), BASE = `http://localhost:${PORT}`, OUT = process.env.SH_SHOTS || '/tmp/sh-shots'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
const AIM = () => { const R = SH_DEBUG.run(); if (!R) return null; let b = -1, bx = 50; for (let x = 6; x <= 94; x += 2) { const v = SH_DEBUG.C.lane(R.st, x); if (v > b) { b = v; bx = x; } } return bx; };
async function play(p, ms, mouse) { // hold the pointer and steer it to the best lane, like a player would
  const end = Date.now() + ms; const vp = p.viewportSize();
  const toPx = x => p.evaluate(x => { const c = document.getElementById('cv'); const K = Math.min(innerWidth / 100, innerHeight / 186), OX = (innerWidth - 100 * K) / 2; return OX + x * K; }, x);
  let down = false;
  while (Date.now() < end) { const x = await p.evaluate(AIM); if (x == null) break; const px = await toPx(x); if (mouse) { await p.mouse.move(px, vp.height * .82); if (!down) { await p.mouse.down(); down = true; } } else await p.evaluate(x => { SH_DEBUG.input.fire = true; SH_DEBUG.input.x = x; }, x); await sleep(200); }
  if (mouse && down) await p.mouse.up(); else await p.evaluate(() => { SH_DEBUG.input.fire = false; });
}
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT }, stdio: 'ignore' }); await sleep(1500);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const errs = [];
  const mk = async (name, lang, vp) => { const p = await (await br.newContext({ viewport: vp, deviceScaleFactor: 2 })).newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); await p.addInitScript(([n, l]) => { localStorage.setItem('sh_lang', JSON.stringify(l)); localStorage.setItem('sh_name', JSON.stringify(n)); }, [name, lang]); return p; };
  try {
    const A = await mk('عبدالله', 'ar', { width: 390, height: 844 });
    await A.goto(BASE + '/shuhub/'); await A.waitForFunction(() => window.SH_DEBUG); await sleep(500);
    ok(await A.isVisible('#bPlay') && await A.isVisible('#bDuel') && await A.isVisible('#bShop'), 'menu: play, duel, workshop');
    ok((await A.textContent('#bPlay')).includes('العب'), 'Arabic by default'); await A.screenshot({ path: OUT + '/1-menu.png' });
    await A.click('#bPlay'); await sleep(250); ok(await A.isVisible('#intro') && (await A.textContent('#iTip')).length > 20, 'level 1 intro with a tip'); await A.screenshot({ path: OUT + '/2-intro.png' });
    await A.click('#bGo'); await sleep(400); ok(await A.isVisible('#hud') && await A.isVisible('#hold'), 'HUD and the hold hint'); await A.screenshot({ path: OUT + '/3-start.png' });
    await play(A, 2200, true); await A.screenshot({ path: OUT + '/4-swarm.png' });
    ok(await A.evaluate(() => SH_DEBUG.run().st.shot > 10 && document.getElementById('hold').classList.contains('hide')), 'holding the pointer fires meteors and hides the hint');
    await play(A, 40000, true); await A.waitForFunction(() => !document.getElementById('win').classList.contains('hide'), null, { timeout: 15000 }).catch(() => {});
    ok(await A.isVisible('#win'), 'level 1 won by playing'); await sleep(900); await A.screenshot({ path: OUT + '/5-win.png' });
    const pg = await A.evaluate(() => SH_DEBUG.PG); ok(pg.un === 2 && pg.st[1] >= 1 && pg.coins > 0, 'level 2 unlocked, stars and coins saved ' + JSON.stringify(pg));
    // a level with guards, rocks and a moving fort, to see it running
    await A.evaluate(() => { SH_DEBUG.PG.un = 15; SH_DEBUG.startRun(7, 'solo'); }); await play(A, 3500, false); await A.screenshot({ path: OUT + '/6-level7.png' });
    ok(await A.evaluate(() => SH_DEBUG.run().st.P.length > 20), 'swarm grows through gates on level 7');
    await A.evaluate(() => { SH_DEBUG.toMenu(); SH_DEBUG.PG.un = 15; SH_DEBUG.startRun(12, 'solo'); }); await play(A, 3000, false); await A.screenshot({ path: OUT + '/7-night.png' });
    await A.evaluate(() => { const R = SH_DEBUG.run(); R.st.charge = 1; }); await sleep(150); ok(await A.evaluate(() => document.getElementById('bFalcon').classList.contains('ready')), 'falcon button lights up when charged');
    await A.click('#bFalcon'); await sleep(350); ok(await A.evaluate(() => !!SH_DEBUG.run().st.falcon || SH_DEBUG.run().st.charge === 0), 'falcon dives'); await A.screenshot({ path: OUT + '/8-falcon.png' });
    // workshop
    await A.evaluate(() => { SH_DEBUG.toMenu(); SH_DEBUG.PG.coins = 500; }); await A.click('#bShop'); await sleep(200); await A.screenshot({ path: OUT + '/9-shop.png' });
    await A.click('[data-up="rate"]'); await sleep(120); const pg2 = await A.evaluate(() => SH_DEBUG.PG); ok(pg2.up.rate === 1 && pg2.coins === 440, 'workshop upgrade bought');
    await A.click('#shop [data-back]'); await sleep(150);
    // levels map
    await A.click('#bLevels'); await sleep(200); ok(await A.evaluate(() => document.querySelectorAll('.lv').length === 15), '15 levels on the map'); await A.screenshot({ path: OUT + '/10-levels.png' });
    await A.evaluate(() => SH_DEBUG.toMenu());
    /* ---------- duel by link ---------- */
    await A.click('#bDuel'); await A.waitForFunction(() => SH_DEBUG.NET.room, null, { timeout: 6000 }); const code = await A.evaluate(() => SH_DEBUG.NET.code);
    ok(/^[A-Z0-9]{5}$/.test(code) && A.url().includes('?r=' + code), 'room code in the link ' + code);
    const B = await mk('Omar', 'en', { width: 412, height: 860 }); await B.goto(BASE + '/shuhub/?r=' + code);
    await B.waitForFunction(() => SH_DEBUG.NET.room && SH_DEBUG.NET.room.players.length === 2, null, { timeout: 8000 }); ok(true, 'friend joins from the link');
    await A.waitForFunction(() => SH_DEBUG.NET.room.players.length === 2); await sleep(200); await A.screenshot({ path: OUT + '/11-lobby.png' }); await B.screenshot({ path: OUT + '/11-lobby-b.png' });
    ok(await A.isVisible('#bStart') && await B.isHidden('#bStart'), 'only the host can start');
    for (let i = 0; i < 20 && await A.evaluate(() => SH_DEBUG.NET.room.lv !== 2); i++) { await A.click(await A.evaluate(() => SH_DEBUG.NET.room.lv > 2) ? '#lvPrev' : '#lvNext'); await sleep(120); }
    ok((await B.textContent('#lbLevel')).includes('2'), 'friend sees the chosen level');
    await A.click('#bStart'); await A.waitForFunction(() => SH_DEBUG.run() && SH_DEBUG.run().mode === 'duel', null, { timeout: 5000 }); await B.waitForFunction(() => SH_DEBUG.run() && SH_DEBUG.run().mode === 'duel', null, { timeout: 5000 });
    ok(true, 'both enter the duel'); await sleep(3800);
    ok(await A.evaluate(() => SH_DEBUG.run().st.L.id === 2) && await A.evaluate(() => SH_DEBUG.run().st.up.rate === 0), 'duel uses the base launcher even with upgrades');
    // B fires a little so their fort has holes; A attacks hard → A's broken bricks rebuild B's fort
    await B.evaluate(() => { let rep = 0; window.__rep = () => rep; const o = WebSocket.prototype; });
    await Promise.all([play(A, 4000, false), play(B, 1500, false)]);
    await A.screenshot({ path: OUT + '/12-duel-a.png' }); await B.screenshot({ path: OUT + '/12-duel-b.png' });
    ok(await B.evaluate(() => [...SH_DEBUG.NET.opp.values()][0].sw >= 0 && document.getElementById('opp').textContent.includes('عبدالله')), 'B sees A\'s live status');
    await play(A, 30000, false);
    await A.waitForFunction(() => !document.getElementById('res').classList.contains('hide'), null, { timeout: 20000 }).catch(() => {});
    await B.waitForFunction(() => !document.getElementById('res').classList.contains('hide'), null, { timeout: 20000 }).catch(() => {});
    ok((await A.textContent('#rT')).includes('فزت'), 'A wins the duel: ' + await A.textContent('#rT')); ok((await B.textContent('#rT')).includes('عبدالله'), 'B sees who won: ' + await B.textContent('#rT'));
    await A.screenshot({ path: OUT + '/13-res.png' }); await B.screenshot({ path: OUT + '/13-res-b.png' });
    await A.click('#bAgain'); await B.waitForFunction(() => !document.getElementById('lobby').classList.contains('hide'), null, { timeout: 5000 }); ok(true, 'rematch returns both to the lobby');
  } catch (e) { console.log('ERROR', e.message); fail++; }
  ok(!errs.length, 'no page errors ' + errs.join(' | '));
  await br.close(); srv.kill(); console.log(`e2e-shuhub: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
