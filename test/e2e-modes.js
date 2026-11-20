/* SOULSTACK modes in real browsers: trials (clear level 1 → level 2 unlocks), monsters + stomp/shield, shrine purchase, and a race between two browsers joined by link */
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const os = require('os'), fs = require('fs'), path = require('path');
const PORT = 3700 + Math.floor(Math.random() * 30), BASE = `http://localhost:${PORT}`, OUT = process.env.SS_SHOTS || '/tmp/ss-shots';
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-e2e-m-')); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
/* in-page bot: one leap toward the next platform above using the game's own physics */
const STEP = () => {
  const { S, C } = SS_DEBUG, G = window.SSG, P = S.P; if (!P || S.mode !== 'play' || !P.gr) return 'wait';
  const w = S.world, here = Math.round(P.y) - 1;
  const tgt = w.nodes.filter(n => n.y > here && n.y - here <= C.REACH + 1).sort((a, b) => a.y - b.y);
  let best = null;
  for (let a = 0; a < 70; a++) for (const pw of [.55, .7, .85, 1]) {
    const ang = Math.PI / 2 + (a / 69 - .5) * Math.PI * .95, dx = Math.cos(ang) * pw, dy = Math.sin(ang) * pw, Q = { ...P, gr: 1 }; C.launch(Q, dx, dy);
    let d = null; for (let k = 0; k < 260; k++) { d = C.step(w, S.blocks, Q, 1 / 60, k / 60); if (d || Q.gr) break; }
    const to = Math.round(Q.y) - 1; if (!d && Q.gr && to > here && (!best || to > best.to)) best = { dx, dy, to };
  }
  if (!best && tgt.length && tgt[0].chasm) { G.die('sac', C.sacCell(P)); return 'sac'; }
  if (!best) return 'none'; G.leap(best.dx, best.dy); return best.to;
};
async function climb(p, until, ms) { const end = Date.now() + ms; while (Date.now() < end) { if (await p.evaluate(until)) return true; await p.evaluate(STEP); await sleep(260); } return false; }
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SS_DATA: DATA }, stdio: 'ignore' }); await sleep(1500);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const errs = [];
  const mk = async (name, hue, vp, lang = 'en') => { const p = await (await br.newContext({ viewport: vp })).newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.addInitScript(([n, h, l]) => { localStorage.setItem('ss_lang', JSON.stringify(l)); localStorage.setItem('ss_name', JSON.stringify(n)); localStorage.setItem('ss_hue', String(h)); localStorage.setItem('ss_tut', '1'); localStorage.setItem('ss_hinted', '3'); }, [name, hue, lang]); return p; };
  try {
    const A = await mk('Layla', 30, { width: 1280, height: 800 });
    await A.goto(BASE + '/soulstack/'); await A.waitForFunction(() => window.SS_DEBUG && SS_DEBUG.PG, null, { timeout: 15000 }); await sleep(500);
    ok(await A.isVisible('#bTrials') && await A.isVisible('#bRace') && await A.isVisible('#bShrine'), 'menu has trials, race and shrine');
    ok((await A.textContent('#bTrials')).includes('Trials'), 'strings applied to new buttons'); await A.screenshot({ path: OUT + '/m1-menu.png' });
    /* trials map: only level 1 open */
    await A.click('#bTrials'); await sleep(300); ok(await A.isVisible('#trials'), 'trials screen opens');
    ok(await A.evaluate(() => document.querySelectorAll('.tcard.lock').length === 11), '11 trials locked at start'); await A.screenshot({ path: OUT + '/m2-trials.png' });
    await A.click('[data-lv="1"]'); await sleep(250); ok((await A.textContent('#iGoal')).includes('20'), 'intro shows the height goal'); await A.screenshot({ path: OUT + '/m3-intro.png' });
    await A.click('#bGo'); await sleep(400);
    ok(await A.evaluate(() => SS_DEBUG.S.mode === 'cd' && !document.getElementById('cd').classList.contains('hide')), 'countdown before the start');
    await A.screenshot({ path: OUT + '/m4-countdown.png' });
    await A.waitForFunction(() => SS_DEBUG.S.mode === 'play', null, { timeout: 5000 }); ok(true, 'go!');
    ok(await A.isVisible('#hT') && await A.isVisible('#hGoal'), 'timer and goal bar visible');
    const cleared = await climb(A, () => !document.getElementById('done').classList.contains('hide'), 60000);
    ok(cleared, 'bot clears trial 1 within the limit'); await sleep(900); await A.screenshot({ path: OUT + '/m5-done.png' });
    const pg = await A.evaluate(() => SS_DEBUG.PG); ok(pg.un === 2 && pg.st[1] >= 1 && pg.em >= 20, 'level 2 unlocked, stars and embers saved ' + JSON.stringify(pg));
    /* monsters: level 4 (crawlers) — touch one from the side → death; with a shield → survive */
    await A.evaluate(() => { const PG = SS_DEBUG.PG; PG.un = 6; PG.em = 500; localStorage.setItem('ss_prog', JSON.stringify(PG)); });
    await A.evaluate(() => SS_DEBUG.startRun(4, 'trial')); await A.waitForFunction(() => SS_DEBUG.S.mode === 'play', null, { timeout: 5000 });
    const hit = await A.evaluate(async () => { const R = SS_DEBUG.run(), S = SS_DEBUG.S, m = R.E.crawlers.find(c => c.alive && c.x != null) || R.E.crawlers[0];
      R.inv = 0; R.shield = 1; await new Promise(r => setTimeout(r, 50)); const x = m.x; S.P.x = x; S.P.y = m.y; S.P.vx = 0; S.P.vy = 0; S.P.gr = 1; await new Promise(r => setTimeout(r, 120));
      const afterShield = { mode: S.mode, shield: R.shield }; R.inv = 0; await new Promise(r => setTimeout(r, 30)); const m2 = R.E.crawlers.find(c => c.alive && c.x != null); S.P.x = m2.x; S.P.y = m2.y; S.P.vy = 0; S.P.vx = 0; S.P.gr = 1; await new Promise(r => setTimeout(r, 120)); return { afterShield, mode: S.mode }; });
    ok(hit.afterShield.mode === 'play' && hit.afterShield.shield === 0, 'shield absorbs a monster hit ' + JSON.stringify(hit));
    ok(hit.mode === 'dead', 'monster kills without a shield');
    await A.waitForFunction(() => SS_DEBUG.S.mode === 'play', null, { timeout: 6000 });
    const st = await A.evaluate(async () => { const R = SS_DEBUG.run(), S = SS_DEBUG.S; R.inv = 0; const m = R.E.crawlers.filter(c => c.alive && c.x != null).pop(); /* one with no body on its ledge */ const k0 = R.kills; m.sp = 0; /* hold it still so the test aims exactly */ await new Promise(r => setTimeout(r, 60)); S.P.x = m.x; S.P.y = m.y + .45; S.P.vy = -6; S.P.gr = 0; await new Promise(r => setTimeout(r, 100)); return { k: R.kills - k0, mode: S.mode, vy: S.P.vy, }; });
    ok(st.k === 1 && st.mode === 'play', 'falling onto a crawler stomps it ' + JSON.stringify(st));
    await A.screenshot({ path: OUT + '/m6-monsters.png' });
    /* bolts */
    const fb = await A.evaluate(async () => { const R = SS_DEBUG.run(); R.bolts = 2; SSG.updHud(); const vis = !document.getElementById('bFire').classList.contains('hide'); const S = SS_DEBUG.S, m = R.E.crawlers.find(c => c.alive && c.x != null && Math.abs(c.y - S.P.y) < 6) ; return { vis, m: !!m }; });
    ok(fb.vis, 'fire button appears when you carry bolts');
    /* shrine */
    await A.evaluate(() => SS_DEBUG.S.mode = 'over'); await A.evaluate(() => SSG.toMenu()); await sleep(200);
    await A.click('#bShrine'); await sleep(250); await A.screenshot({ path: OUT + '/m7-shrine.png' });
    const em0 = await A.evaluate(() => SS_DEBUG.PG.em); await A.click('[data-up="pow"]'); await sleep(150);
    const pg2 = await A.evaluate(() => SS_DEBUG.PG); ok(pg2.up.pow === 1 && pg2.em === em0 - 40, 'shrine upgrade bought and saved');
    await A.click('#bShrineX');
    /* ---------- race by link ---------- */
    await A.click('#bRace'); await A.waitForFunction(() => SS_DEBUG.NET.room, null, { timeout: 5000 }); await sleep(200);
    const code = await A.evaluate(() => SS_DEBUG.NET.code); ok(/^[A-Z0-9]{5}$/.test(code), 'room code ' + code);
    ok(A.url().includes('?r=' + code), 'url carries the room code');
    const B = await mk('Omar', 200, { width: 390, height: 844 }, 'ar'); await B.goto(BASE + '/soulstack/?r=' + code);
    await B.waitForFunction(() => window.SS_DEBUG && SS_DEBUG.NET.room && SS_DEBUG.NET.room.players.length === 2, null, { timeout: 8000 }); ok(true, 'friend joined from the link');
    await A.waitForFunction(() => SS_DEBUG.NET.room.players.length === 2, null, { timeout: 5000 }); await sleep(200);
    ok(await B.isHidden('#bStart') && await A.isVisible('#bStart'), 'only the host can start'); await A.screenshot({ path: OUT + '/m8-lobby.png' }); await B.screenshot({ path: OUT + '/m8-lobby-b.png' });
    for (let i = 0; i < 12 && await A.evaluate(() => SS_DEBUG.NET.room.lv !== 1); i++) { await A.click('#lvPrev'); await sleep(150); }
    ok(await A.evaluate(() => SS_DEBUG.NET.room.lv === 1) && (await B.textContent('#lbLevel')).includes('1'), 'host picks the trial; friend sees it');
    await A.click('#bStart'); await A.waitForFunction(() => SS_DEBUG.S.mode === 'play', null, { timeout: 7000 }); await B.waitForFunction(() => SS_DEBUG.S.mode === 'play', null, { timeout: 4000 }); ok(true, 'both start together');
    await sleep(1200); ok(await B.evaluate(() => SS_DEBUG.NET.ghosts.size === 1), 'friend sees the other climber');
    // A climbs, B stands still → A wins
    await A.evaluate(STEP); await sleep(500); await B.screenshot({ path: OUT + '/m9-race-b.png' });
    const won = await climb(A, () => !document.getElementById('rres').classList.contains('hide') || (SS_DEBUG.run() && SS_DEBUG.run().done), 60000); ok(won, 'A reaches the top');
    await B.waitForFunction(() => !document.getElementById('rres').classList.contains('hide'), null, { timeout: 60000 }).catch(() => {});
    await A.waitForFunction(() => !document.getElementById('rres').classList.contains('hide'), null, { timeout: 60000 }).catch(() => {});
    ok((await A.textContent('#rrT')).includes('win'), 'A sees "You win"'); ok((await B.textContent('#rrList')).includes('Layla'), 'B sees results'); await A.screenshot({ path: OUT + '/m10-results.png' }); await B.screenshot({ path: OUT + '/m10-results-b.png' });
    await A.click('#bAgain'); await B.waitForFunction(() => !document.getElementById('lobby').classList.contains('hide'), null, { timeout: 5000 }); ok(true, 'rematch returns both to the lobby');
  } catch (e) { console.log('ERROR', e.message); fail++; }
  ok(!errs.length, 'no page errors ' + errs.join(' | '));
  await br.close(); srv.kill(); console.log(`modes e2e: ${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
})();
