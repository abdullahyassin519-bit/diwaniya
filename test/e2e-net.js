/* شُهُب online: invite link, real 2-player battle, reload mid-battle and resume, forfeit after the grace period, series score */
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms)); const PORT = 3933;
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: __dirname + '/..', env: { ...process.env, PORT, SH_GRACE_MS: 6000 }, stdio: 'ignore' }); await sleep(1200);
  const br = await chromium.launch(); const errs = [];
  const mk = async (name, tok, url = '') => { const ctx = await br.newContext({ viewport: { width: 390, height: 844 } }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message));
    await p.addInitScript(([n, t]) => { localStorage.setItem('sh_name', JSON.stringify(n)); localStorage.setItem('sh_tok', JSON.stringify(t)); if (!localStorage.getItem('sh2_prog')) localStorage.setItem('sh2_prog', JSON.stringify({ tut: 1, fired: 9, set: { gfx: '2d' } })); }, [name, tok]);
    await p.goto(`http://localhost:${PORT}/shuhub/${url}`); await p.waitForFunction(() => window.SHW_DEBUG); return p; };
  try {
    const H = await mk('Abdullah', 'tokhost000000001'); await H.evaluate(() => SHW_DEBUG.connect()); await H.waitForFunction(() => SHW_DEBUG.NET.code); const code = await H.evaluate(() => SHW_DEBUG.NET.code);
    ok(/^[A-Z0-9]{5}$/.test(code) && (await H.url()).includes('?w=' + code), 'host gets a room code and a shareable ?w= link');
    const G2 = await mk('Sara', 'tokguest00000002', '?w=' + code); await H.waitForFunction(() => SHW_DEBUG.NET.room && SHW_DEBUG.NET.room.players.filter(p => p.on).length === 2, null, { timeout: 10000 }).catch(() => {});
    ok(await H.evaluate(() => SHW_DEBUG.NET.room.players.map(p => p.n).sort().join() === 'Abdullah,Sara'), 'the invite link joins the friend by name');
    await H.click('#wStart'); await Promise.all([H, G2].map(p => p.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 10000 })));
    ok(await H.evaluate(() => SHW_DEBUG.b().side) !== await G2.evaluate(() => SHW_DEBUG.b().side), 'each player gets their own side');
    await sleep(4500);
    await G2.evaluate(() => { const b = SHW_DEBUG.b(); b.st.cd.fill(0); SHW_DEBUG.act('ball', .8, .7); }); await sleep(800);
    ok(await H.evaluate(() => SHW_DEBUG.b().st.R.length + SHW_DEBUG.b().st.pending.length > 0 || SHW_DEBUG.b().st.impact[1] || SHW_DEBUG.b().st.impact[0]), 'a shot crosses to the other player in real time');
    // the guest reloads mid-battle: they must come back into the same battle at the same moment
    await G2.reload(); await G2.waitForFunction(() => window.SHW_DEBUG && SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 15000 }).catch(() => {}); await sleep(1500);
    const t1 = await H.evaluate(() => SHW_DEBUG.b().st.tick), t2 = await G2.evaluate(() => SHW_DEBUG.b() ? SHW_DEBUG.b().st.tick : -1);
    ok(t2 > 0 && Math.abs(t1 - t2) < 90, `reloaded player resumes at the battle's current moment (${t1} vs ${t2} ticks)`);
    ok(await G2.evaluate(() => SHW_DEBUG.b().st.vid >= 1), 'shots fired before the reload are replayed');
    ok(await H.evaluate(() => !SHW_DEBUG.b().st.done), 'the battle was not forfeited by a quick reload');
    // the guest vanishes: after the grace period the host wins, and the series score counts it
    await G2.close(); await H.waitForFunction(() => !document.getElementById('wres').classList.contains('hide'), null, { timeout: 20000 }).catch(() => {});
    ok(await H.evaluate(() => !document.getElementById('wres').classList.contains('hide') && /١|1/.test(document.getElementById('wrExtra').textContent)), 'after the grace period the remaining player wins, with the series score ' + await H.evaluate(() => document.getElementById('wrExtra').textContent));
    ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  } catch (e) { fail++; console.log('FAIL exception', e.message); }
  await br.close(); srv.kill(); console.log(`e2e-net: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
