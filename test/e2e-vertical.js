/* طخطخة: فحوص متصفح للقفز، منظور الكتف، وصعود الدرج إلى السطح (على خريطة المستودع) */
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3114/', sleep = ms => new Promise(r => setTimeout(r, ms));
let fail = 0, pass = 0;
const ok = (c, m) => { if (c) { pass++; console.log('PASS', m); } else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3114 }, stdio: 'inherit', cwd: __dirname + '/..' }); await sleep(900);
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(URL); await page.waitForFunction(() => window.DW);
    await page.click('.card[data-act="game:strike"]'); await sleep(1500);
    await page.click('[data-act="solo:strike"]');
    await page.waitForFunction(() => window.SK && SK.dbg && SK.dbg.S && SK.dbg.S() && SK.dbg.S().ph === 'freeze', null, { timeout: 40000 });
    await page.evaluate(() => { const l = document.querySelector('.sk-lock'); if (l) l.style.display = 'none'; });
    await page.waitForFunction(() => SK.dbg.S().ph === 'live', null, { timeout: 30000 });
    ok(true, 'training match is live');

    // 1) القفز: من الأرض يرتفع ثم يهبط
    const grounded = await page.evaluate(() => SK.dbg.self.gr === 1 && Math.abs(SK.dbg.self.z) < .01);
    ok(grounded, 'player starts grounded');
    await page.keyboard.press('Space');
    const peak = await page.evaluate(() => new Promise(res => { let mx = 0, n = 0; const iv = setInterval(() => { mx = Math.max(mx, SK.dbg.self.z); if (++n > 40) { clearInterval(iv); res(mx); } }, 25); }));
    ok(peak > .5, 'jump raises the feet, peak=' + peak.toFixed(2));
    const landed = await page.evaluate(() => new Promise(res => { const t0 = Date.now(); const iv = setInterval(() => { if (SK.dbg.self.gr === 1 || Date.now() - t0 > 2000) { clearInterval(iv); res(SK.dbg.self.gr === 1); } }, 40); }));
    ok(landed, 'player lands back on the ground');

    // 2) منظور الكتف: الشخصية تظهر والكاميرا خلفها
    const fpBefore = await page.evaluate(() => SK.dbg.chars[DW.P.id] ? SK.dbg.chars[DW.P.id].root.visible : null);
    await page.keyboard.press('KeyV'); await sleep(400);
    const tpv = await page.evaluate(() => { const c = SK.dbg.chars[DW.P.id]; const me = SK.dbg.self; const cam = SK.dbg.cam(); return { vis: c ? c.root.visible : null, camDist: Math.hypot(cam.position.x - me.x, cam.position.z - me.y) }; });
    ok(fpBefore === false || fpBefore === null, 'first person hides own model');
    ok(tpv.vis === true, 'third person shows own model');
    ok(tpv.camDist > 1.5, 'third-person camera sits behind the player, dist=' + tpv.camDist.toFixed(2));
    await page.keyboard.press('KeyV'); await sleep(200);

    // 3) الدرج إلى السطح: يُختبر فقط إن كانت الخريطة المستودع
    let map = await page.evaluate(() => SK.dbg.S().map);
    for (let tries = 0; tries < 8 && map !== 'المستودع'; tries++) {
      await page.reload(); await page.waitForFunction(() => window.DW);
      await page.click('.card[data-act="game:strike"]'); await sleep(1500); await page.click('[data-act="solo:strike"]');
      await page.waitForFunction(() => window.SK && SK.dbg && SK.dbg.S && SK.dbg.S() && SK.dbg.S().ph === 'freeze', null, { timeout: 40000 });
      await page.evaluate(() => { const l = document.querySelector('.sk-lock'); if (l) l.style.display = 'none'; });
      await page.waitForFunction(() => SK.dbg.S().ph === 'live', null, { timeout: 30000 });
      map = await page.evaluate(() => SK.dbg.S().map);
    }
    if (map === 'المستودع') {
      await page.evaluate(() => { SK.dbg.self.x = 6.5; SK.dbg.self.y = 6.5; SK.dbg.self.z = 0; SK.dbg.self.vz = 0; SK.dbg.self.gr = 1; SK.dbg.self.a = 0; SK.dbg.self.pi = 0; });
      await page.keyboard.down('KeyW');
      await page.waitForFunction(() => SK.dbg.self.x > 10.6 && SK.dbg.self.z > 2.4, null, { timeout: 25000, polling: 100 }).catch(() => {});
      await page.keyboard.up('KeyW');
      await sleep(600); await page.screenshot({ path: 'test/sk-roof.png' });
      const climb = await page.evaluate(() => ({ x: SK.dbg.self.x, z: SK.dbg.self.z }));
      ok(climb.x > 10 && climb.z > 2.4, 'walked up the stairs onto the roof: x=' + climb.x.toFixed(2) + ' z=' + climb.z.toFixed(2));
    } else console.log('SKIP roof climb (map is ' + map + ')');
    ok(errors.length === 0, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  } catch (e) {
    fail++; console.log('FAIL exception', String(e).slice(0, 400));
  } finally {
    await browser.close(); srv.kill();
    console.log(`e2e-vertical: ${pass} pass, ${fail} fail`);
    process.exit(fail ? 1 : 0);
  }
})();
