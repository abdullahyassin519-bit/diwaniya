/* Mountain War in real browsers: beat the first lord (aiming by dragging), unlock the next, then a 2-browser war by link (each side mirrored to the left) */
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path'), fs = require('fs');
const PORT = 3770 + Math.floor(Math.random() * 30), BASE = `http://localhost:${PORT}`, OUT = process.env.SH_SHOTS || '/tmp/war-shots'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
/* a sharp player: finds an aim that hits the enemy heart (through gates if possible) and fires whatever is loaded */
const SHARP = () => { const b = SHW_DEBUG.b(); if (!b || b.st.done) return 'x'; const C = SHW_DEBUG.C, st = b.st, s = b.side; const wk = ['boulder', 'fire', 'swarm'].find(k => C.ready(st, s, k)); if (!wk) return 'r';
  const aim = C.botAim(st, s, { err: 0, perr: 0 }, Math.random); SHW_DEBUG.selW(wk); SHW_DEBUG.shoot(aim.a, aim.p, wk); return wk; };
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT }, stdio: 'ignore' }); await sleep(1500);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const errs = [];
  const mk = async (name, lang, vp) => { const p = await (await br.newContext({ viewport: vp, deviceScaleFactor: 2 })).newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); await p.addInitScript(([n, l, h]) => { localStorage.setItem('sh_lang', JSON.stringify(l)); localStorage.setItem('sh_name', JSON.stringify(n)); localStorage.setItem('sh_hue', String(h)); }, [name, lang, name === 'Omar' ? 200 : 10]); return p; };
  try {
    const A = await mk('عبدالله', 'ar', { width: 390, height: 844 });
    await A.goto(BASE + '/shuhub/'); await A.waitForFunction(() => window.SHW_DEBUG); await sleep(400);
    ok(await A.isVisible('#bWar'), 'Mountain War is the first button on the menu'); await A.click('#bWar'); await sleep(250);
    ok(await A.evaluate(() => document.querySelectorAll('.bot').length === 6 && document.querySelectorAll('.bot.lock').length === 5), '6 mountain lords, 5 locked'); await A.screenshot({ path: OUT + '/1-war-menu.png' });
    await A.click('[data-b="0"]'); await sleep(400); ok(await A.isVisible('#whud') && await A.isVisible('#wCd'), 'battle HUD and countdown'); await A.waitForFunction(() => performance.now() > SHW_DEBUG.b().localAt + 100, null, { timeout: 5000 });
    // aim by real dragging: pull back-left-down → arc preview to the right and up
    await A.mouse.move(260, 430); await A.mouse.down(); await A.mouse.move(200, 500, { steps: 6 }); await A.mouse.move(150, 540, { steps: 6 }); await sleep(150);
    const aim = await A.evaluate(() => SHW_DEBUG.b().aim); ok(aim && aim.a > .5 && aim.a < 1.2 && aim.p > .4, 'dragging back sets angle and power ' + JSON.stringify(aim)); ok(await A.isVisible('#wAim'), 'angle/power readout'); await A.screenshot({ path: OUT + '/2-aim.png' });
    await A.mouse.up(); await sleep(250); ok(await A.evaluate(() => SHW_DEBUG.b().fired === 1 && SHW_DEBUG.b().st.R.length + SHW_DEBUG.b().st.pending.length > 0), 'releasing fires a volley'); await sleep(900); await A.screenshot({ path: OUT + '/3-volley.png' });
    // now fight it out like a sharp player
    let shots = 0; const end = Date.now() + 120000; let gotGate = false;
    while (Date.now() < end) { const r = await A.evaluate(SHARP); if (r === 'x') break; if (r !== 'r') shots++; if (!gotGate && await A.evaluate(() => SHW_DEBUG.b() && SHW_DEBUG.b().st.peak[0] > 12)) { gotGate = true; await sleep(500); await A.screenshot({ path: OUT + '/4-gate.png' }); } await sleep(350); if (shots === 6) await A.screenshot({ path: OUT + '/5-battle.png' }); }
    await A.waitForFunction(() => !document.getElementById('wres').classList.contains('hide'), null, { timeout: 15000 }).catch(() => {});
    ok(await A.isVisible('#wres') && (await A.textContent('#wrT')).includes('انتصرت'), 'beat the Shepherd: ' + await A.textContent('#wrT')); await A.screenshot({ path: OUT + '/6-win.png' });
    ok(await A.evaluate(() => SHW_DEBUG.PG.un === 2), 'the next lord unlocks'); ok(gotGate, 'volleys multiplied through the mountain gate');
    /* ---------- online war ---------- */
    await A.evaluate(() => { SHG.toMenu(); document.getElementById('wrT').textContent = ''; }); await A.click('#bWar'); await sleep(200); await A.click('#bWarFriend'); await A.waitForFunction(() => SHW_DEBUG.NET.room, null, { timeout: 6000 });
    const code = await A.evaluate(() => SHW_DEBUG.NET.code); ok(/^[A-Z0-9]{5}$/.test(code) && A.url().includes('?w=' + code), 'war room link ' + code);
    ok(await A.evaluate(() => document.getElementById('wStart').disabled), 'cannot start alone');
    const B = await mk('Omar', 'en', { width: 412, height: 860 }); await B.goto(BASE + '/shuhub/?w=' + code);
    await B.waitForFunction(() => window.SHW_DEBUG && SHW_DEBUG.NET.room && SHW_DEBUG.NET.room.players.length === 2, null, { timeout: 8000 }); ok(true, 'friend joins from the link');
    await A.waitForFunction(() => SHW_DEBUG.NET.room.players.length === 2 && !document.getElementById('wStart').disabled, null, { timeout: 4000 }); await A.screenshot({ path: OUT + '/7-lobby.png' }); await B.screenshot({ path: OUT + '/7-lobby-b.png' });
    const C3 = await B.evaluate(() => document.querySelector('#wPlayers').textContent); ok(C3.includes('عبدالله') && C3.includes('Omar'), 'both names in the lobby');
    for (let i = 0; i < 6 && await A.evaluate(() => SHW_DEBUG.NET.room.lv !== 3); i++) { await A.click('#wNext'); await sleep(150); }
    ok((await B.textContent('#wMap')).includes('Mesa'), 'friend sees the chosen map');
    await A.click('#wStart'); await A.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 5000 }); await B.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 5000 });
    const sides = [await A.evaluate(() => SHW_DEBUG.b().side), await B.evaluate(() => SHW_DEBUG.b().side)]; ok(sides[0] !== sides[1], 'one player per side ' + sides);
    ok(await B.evaluate(() => SHW_DEBUG.b().st.seed) === await A.evaluate(() => SHW_DEBUG.b().st.seed), 'same battlefield on both screens');
    await A.waitForFunction(() => performance.now() > SHW_DEBUG.b().localAt + 200, null, { timeout: 6000 }); await B.waitForFunction(() => performance.now() > SHW_DEBUG.b().localAt + 200, null, { timeout: 6000 });
    // B fires once; A must see B's volley
    await B.evaluate(SHARP); await sleep(700); ok(await A.evaluate(() => { const b = SHW_DEBUG.b(); return b.st.R.some(p => p.o !== b.side) || b.st.pending.some(p => p.o !== b.side); }), 'A sees B\'s volley in flight'); await A.screenshot({ path: OUT + '/8-net-a.png' }); await B.screenshot({ path: OUT + '/8-net-b.png' });
    // A attacks until B's fort falls (B's own simulation declares it)
    const end2 = Date.now() + 150000; while (Date.now() < end2) { const r = await A.evaluate(SHARP); if (r === 'x' || !(await A.evaluate(() => !!SHW_DEBUG.b()))) break; await sleep(400); }
    await A.waitForFunction(() => !document.getElementById('wres').classList.contains('hide'), null, { timeout: 20000 }).catch(() => {}); await B.waitForFunction(() => !document.getElementById('wres').classList.contains('hide'), null, { timeout: 20000 }).catch(() => {});
    ok((await A.textContent('#wrT')).includes('انتصرت'), 'A wins: ' + await A.textContent('#wrT')); ok((await B.textContent('#wrT')).toLowerCase().includes('fell'), 'B loses: ' + await B.textContent('#wrT'));
    await A.screenshot({ path: OUT + '/9-res-a.png' }); await B.screenshot({ path: OUT + '/9-res-b.png' });
    await A.click('#wrMain'); await B.waitForFunction(() => !document.getElementById('wlobby').classList.contains('hide'), null, { timeout: 5000 }); ok(true, 'rematch returns both to the war room');
  } catch (e) { console.log('ERROR', e.message); fail++; }
  ok(!errs.length, 'no page errors ' + errs.join(' | '));
  await br.close(); srv.kill(); console.log(`e2e-war: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
