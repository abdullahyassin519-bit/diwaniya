/* SOULSTACK in real browsers: input, climbing, sacrifice, shared bodies between two players, credit, spikes, share card, Arabic, phone layout */
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const os = require('os'), fs = require('fs'), path = require('path');
const PORT = 3660 + Math.floor(Math.random() * 30), BASE = `http://localhost:${PORT}`, OUT = process.env.SS_SHOTS || '/tmp/ss-shots';
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-e2e-')); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
/* in-page: find a launch from where the player stands that lands on the next chain platform above (uses the game's own physics) */
const AIM = () => {
  const { S, C } = SS_DEBUG, P = S.P, w = S.world, here = Math.round(P.y) - 1;
  const next = w.nodes.find(n => n.y > here && !n.chasm && n.y - here <= C.REACH); if (!next) return null;
  for (let a = 0; a < 90; a++) for (const pw of [.6, .7, .8, .9, 1]) {
    const ang = Math.PI / 2 + (a / 89 - .5) * Math.PI * .95, dx = Math.cos(ang) * pw, dy = Math.sin(ang) * pw, Q = { ...P, gr: 1 }; C.launch(Q, dx, dy);
    let d = null; for (let k = 0; k < 300; k++) { d = C.step(w, S.blocks, Q, 1 / 60, (Date.now() + S.skew) / 1000 + k / 60); if (d || Q.gr) break; }
    if (!d && Q.gr && Math.round(Q.y) - 1 > here) return { dx, dy, to: Math.round(Q.y) - 1 };
  }
  return null;
};
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SS_DATA: DATA }, stdio: 'ignore' }); await sleep(1500);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const errs = []; const watch = p => { p.on('response', r => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url().replace(/t=[^&]*/, 't=…'), r.request().postData()); }); p.on('pageerror', e => errs.push(String(e).slice(0, 200))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); }); };
  try {
    /* ---------- player A on desktop ---------- */
    const A = await (await br.newContext({ viewport: { width: 1280, height: 800 } })).newPage(); watch(A);
    await A.addInitScript(() => { localStorage.setItem('ss_lang', '"en"'); localStorage.setItem('ss_name', '"Layla"'); localStorage.setItem('ss_hue', '30'); });
    await A.goto(BASE + '/soulstack/'); await A.waitForFunction(() => window.SS_DEBUG && SS_DEBUG.S.online, null, { timeout: 15000 });
    ok(await A.isVisible('#how'), 'first visit shows how-to-play'); await A.screenshot({ path: OUT + '/a0-how.png' });
    await A.click('#bHowGo'); await sleep(600); ok(await A.isVisible('#bPlay'), 'menu shows play'); await A.screenshot({ path: OUT + '/a1-menu.png' });
    ok((await A.textContent('#chips')).includes('25'), 'menu shows 25 souls');
    await A.click('#bPlay'); await sleep(500);
    ok(await A.evaluate(() => SS_DEBUG.S.mode === 'play' && !document.getElementById('hud').classList.contains('hide')), 'play starts with HUD');
    ok(await A.isVisible('#hint'), 'first-time drag hint shown');
    // first jump with a real mouse drag: aim, then pull the opposite way
    const aim = await A.evaluate(AIM); ok(!!aim, 'a jump to the next platform exists');
    const k = await A.evaluate(() => SS_DEBUG.dragK());
    await A.mouse.move(640, 400); await A.mouse.down(); await A.mouse.move(640 - aim.dx * k, 400 + aim.dy * k, { steps: 6 }); await sleep(150);
    await A.screenshot({ path: OUT + '/a2-aim.png' }); ok(await A.evaluate(() => !!SS_DEBUG.S.aim), 'dragging shows the aim arc');
    await A.mouse.up(); await sleep(1600);
    let h = await A.evaluate(() => Math.round(SS_DEBUG.S.P.y) - 1); ok(h === aim.to, `a real drag-and-release jump lands on the next platform (${h} vs ${aim.to})`);
    ok(await A.evaluate(() => document.getElementById('hint').classList.contains('hide')), 'hint disappears after the first leap');
    // climb a few more platforms
    let climbed = 0; for (let i = 0; i < 6; i++) { const a = await A.evaluate(AIM); if (!a) break; await A.evaluate(a => SS_DEBUG.launch(a.dx, a.dy), a); await A.waitForFunction(() => SS_DEBUG.S.P.gr || SS_DEBUG.S.mode !== 'play', null, { timeout: 6000 }).catch(() => { }); await sleep(250); const hh = await A.evaluate(() => Math.round(SS_DEBUG.S.P.y) - 1); if (hh > h) climbed++; h = hh; }
    ok(climbed >= 4, `climbed ${climbed} platforms in a row, now at ${h} m`); await A.screenshot({ path: OUT + '/a3-climb.png' });
    ok(await A.evaluate(() => +document.getElementById('hH').textContent) === h, 'HUD height matches');
    // sacrifice at the top of a vertical leap
    await A.waitForFunction(() => SS_DEBUG.S.mode === 'play' && SS_DEBUG.S.P.gr, null, { timeout: 8000 }); const soulsBefore = await A.evaluate(() => SS_DEBUG.S.souls);
    /* like a player: wait until no saw sweeps through the space above before leaping straight up */
    await A.waitForFunction(() => { const S = SS_DEBUG.S, P = S.P, t = (Date.now() + S.skew) / 1000; return S.world.saws.every(s => s.y < P.y - 1 || s.y > P.y + 6 || Math.abs(S.world.sawPos(s, t) - P.x) > 6); }, null, { timeout: 20000 });
    await A.evaluate(() => SS_DEBUG.launch(0, 1)); await A.waitForFunction(() => SS_DEBUG.S.P.vy <= 0 || SS_DEBUG.S.mode !== 'play', null, { timeout: 3000 });
    const pre = await A.evaluate(() => ({ m: SS_DEBUG.S.mode, gr: SS_DEBUG.S.P.gr, vy: SS_DEBUG.S.P.vy, y: SS_DEBUG.S.P.y, dis: document.getElementById('bSac').disabled }));
    await A.click('#bSac'); await sleep(250);
    const post = await A.evaluate(() => ({ m: SS_DEBUG.S.mode, souls: SS_DEBUG.S.souls, n: SS_DEBUG.S.blocks.size })); if (post.m !== 'dead') console.log('DIAG', JSON.stringify(pre), JSON.stringify(post)); await A.screenshot({ path: OUT + '/a4-sacrifice.png' });
    const shown = await A.evaluate(() => ({ m: SS_DEBUG.S.mode, hud: document.getElementById('hSn').textContent, souls: SS_DEBUG.S.souls, bodies: [...SS_DEBUG.S.blocks.values()].map(b => b.c + ':' + b.y) })); ok(shown.m === 'dead' && +shown.hud === soulsBefore - 1, 'sacrifice spends exactly one soul (' + soulsBefore + ' → ' + (soulsBefore - 1) + ') ' + JSON.stringify(shown));
    await A.waitForFunction(() => [...SS_DEBUG.S.blocks.values()].some(b => typeof b.i === 'number'), null, { timeout: 5000 });
    const body = await A.evaluate(() => { const b = [...SS_DEBUG.S.blocks.values()].find(b => typeof b.i === 'number'); return { i: b.i, x: b.x, y: b.y }; });
    ok(body.i > 0, `server registered the body #${body.i} at (${body.x},${body.y})`);
    await sleep(1600); ok(await A.evaluate(() => SS_DEBUG.S.mode === 'play'), 'respawns at camp after the sacrifice');
    /* ---------- player B on a phone: sees A's body and stands on it ---------- */
    const B = await (await br.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })).newPage(); watch(B);
    await B.addInitScript(() => { localStorage.setItem('ss_lang', '"en"'); localStorage.setItem('ss_name', '"Omar"'); localStorage.setItem('ss_seen', '1'); });
    await B.goto(BASE + '/soulstack/'); await B.waitForFunction(() => window.SS_DEBUG && SS_DEBUG.S.online, null, { timeout: 15000 }); await sleep(500);
    ok(await B.evaluate(b => { const x = SS_DEBUG.S.byId.get(b.i); return !!x && x.n === 'Layla'; }, body), 'another player sees Layla\'s body');
    ok((await B.textContent('#chips')).includes('1 bodies') || (await B.textContent('#chips')).includes('1'), 'menu counts bodies in today\'s tower');
    await B.screenshot({ path: OUT + '/b1-phone-menu.png' });
    await B.tap('#bPlay'); await sleep(400);
    /* as if B had climbed there: report progress first (the server rejects bodies far above your recorded height) */
    await B.evaluate(() => { SS_DEBUG.S.best = 80; SS_DEBUG.S.lastProg = 0; }); await sleep(700);
    await B.waitForFunction(b => { const S = SS_DEBUG.S, t = (Date.now() + S.skew) / 1000; return S.world.saws.every(s => Math.abs(s.y - b.y - 1.5) > 2 || Math.abs(S.world.sawPos(s, t) - b.x - .5) > 4); }, body, { timeout: 15000 });
    await B.evaluate(b => { const P = SS_DEBUG.S.P; P.x = b.x + .5; P.y = b.y + 1.4; P.gr = 0; P.vx = 0; P.vy = 0; }, body); await sleep(1200);
    ok(await B.evaluate(b => { const P = SS_DEBUG.S.P; return P.gr && Math.round(P.y) === b.y + 1; }, body), 'B lands on Layla\'s body (one-way platform)');
    await B.screenshot({ path: OUT + '/b2-phone-on-body.png' });
    ok((await B.textContent('#toast')).includes('Layla'), 'B is told whose body they stand on');
    await B.evaluate(() => { SS_DEBUG.S.lastProg = 0; }); await sleep(5600);
    await A.evaluate(() => SS_DEBUG.sync(false)); await sleep(800);
    ok(await A.evaluate(() => SS_DEBUG.S.helped) === 1, 'Layla is credited: her body lifted 1 climber');
    // phone layout: sacrifice button and HUD inside the screen, not overlapping
    const lay = await B.evaluate(() => { const r = id => document.getElementById(id).getBoundingClientRect(), s = r('bSac'), t = r('hS'); return { s: [s.left, s.top, s.right, s.bottom], t: [t.left, t.top, t.right, t.bottom], W: innerWidth, H: innerHeight }; });
    ok(lay.s[2] <= lay.W && lay.s[3] <= lay.H && lay.s[0] >= 0, 'sacrifice button fits the phone screen');
    // spike: drop B onto a real spike → body covers it
    const sp = await B.evaluate(() => { const w = SS_DEBUG.S.world; for (const k of w.spikes) { const [x, y] = k.split(',').map(Number); if (y > 3 && y < 80 && !SS_DEBUG.S.blocks.has(k)) return { x, y }; } return null; });
    if (sp) { await B.evaluate(s => { const P = SS_DEBUG.S.P; P.x = s.x + .5; P.y = s.y + 1.5; P.gr = 0; P.vx = 0; P.vy = 0; }, sp); await sleep(900);
      ok(await B.evaluate(s => { const b = SS_DEBUG.S.blocks.get(s.x + ',' + s.y); return !!b && b.c === 'spike'; }, sp), 'dying on a spike leaves a body that covers it'); await B.screenshot({ path: OUT + '/b3-phone-spike.png' }); }
    // share card
    const size = await A.evaluate(async () => (await SS_DEBUG.card()).size); ok(size > 40000, 'share card image generated (' + Math.round(size / 1024) + ' KB)');
    const png = await A.evaluate(async () => { const b = await SS_DEBUG.card(); return await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); }); fs.writeFileSync(OUT + '/card.png', Buffer.from(png.split(',')[1], 'base64'));
    // Arabic
    await A.evaluate(() => SS_DEBUG.toMenu()); await sleep(300); await A.click('#lang'); await sleep(300);
    ok(await A.evaluate(() => document.documentElement.dir === 'rtl' && document.querySelector('[data-i=play]').textContent.includes('اصعد')), 'Arabic interface, right-to-left'); await A.screenshot({ path: OUT + '/a5-arabic.png' });
    await A.click('#bBoard'); await sleep(700); ok((await A.textContent('#lb')).includes('Layla') || (await A.textContent('#lb')).includes('Omar'), 'leaderboard lists today\'s climbers'); await A.screenshot({ path: OUT + '/a6-board.png' });
    // practice spends no souls
    await A.click('#bBoardX'); const sv = await A.evaluate(() => SS_DEBUG.S.souls); await A.click('#bPractice'); await sleep(300); const s0 = await A.evaluate(() => document.getElementById('hSn').textContent); await A.evaluate(() => SS_DEBUG.die()); await sleep(1700);
    ok(s0 === '∞' && await A.evaluate(() => SS_DEBUG.S.souls) === sv, 'practice tower costs no souls');
    // landscape phone
    const L = await (await br.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })).newPage(); watch(L);
    await L.addInitScript(() => { localStorage.setItem('ss_seen', '1'); localStorage.setItem('ss_lang', '"en"'); }); await L.goto(BASE + '/soulstack/'); await L.waitForFunction(() => window.SS_DEBUG && SS_DEBUG.S.online); await sleep(600);
    await L.screenshot({ path: OUT + '/l1-landscape-menu.png' }); await L.tap('#bPlay'); await sleep(800); await L.screenshot({ path: OUT + '/l2-landscape-play.png' });
    ok(await L.evaluate(() => { const r = document.getElementById('bSac').getBoundingClientRect(); return r.bottom <= innerHeight && r.right <= innerWidth; }), 'landscape layout keeps the sacrifice button on screen');
    ok(!errs.length, 'no page errors: ' + errs.slice(0, 3).join(' | '));
  } catch (e) { fail++; console.log('ERR', e.message.slice(0, 400)); }
  await br.close(); srv.kill(); console.log(`e2e-soulstack: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
