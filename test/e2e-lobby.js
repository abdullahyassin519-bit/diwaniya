/* فحوص لوبي طخطخة في المتصفح: الفريقان، شرط البدء، إضافة Bot، اختيار الخريطة */
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3115/', sleep = ms => new Promise(r => setTimeout(r, ms));
let fail = 0, pass = 0;
const ok = (c, m) => { if (c) { pass++; console.log('PASS', m); } else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3115 }, stdio: 'inherit', cwd: __dirname + '/..' });
  await sleep(900);
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(URL); await page.waitForFunction(() => window.DW);
    await page.evaluate((s => document.querySelector(s).click()), '[data-act="play:strike"]');
    await page.waitForSelector('.lb', { timeout: 15000 });
    ok(true, 'strike lobby renders');
    const sides = await page.$$eval('.lb-team', els => els.map(e => e.className));
    ok(sides.length === 2 && sides[0].includes('att') && sides[1].includes('def'), 'two sides: attackers and defenders');
    const startDisabled = await page.$eval('[data-act="start"]', b => b.disabled);
    ok(startDisabled === true, 'start is disabled with one player');
    const maps = await page.$$eval('.lb-map', els => els.length);
    ok(maps >= 7, 'map cards shown: ' + maps);
    await page.waitForFunction(() => window.MENU3D && Object.keys(MENU3D.shots).length >= 1, null, { timeout: 120000 }).catch(() => { }); await sleep(800);
    const thumbOk = await page.$eval('.lb-map img', i => i.src.startsWith('data:image'));
    ok(thumbOk, 'map thumbnail is a real drawn image');
    await page.evaluate(() => document.querySelector('[data-act="bot2:2"]').click()); await sleep(400);
    const startNow = await page.$eval('[data-act="start"]', b => b.disabled);
    ok(startNow === false, 'start enabled once both teams have a player');
    await page.evaluate(() => document.querySelector('[data-act="map:السوق"]').click()); await sleep(400);
    const picked = await page.evaluate(() => document.querySelector('.lb-head h2').textContent === 'السوق' && document.querySelector('.lb-map.on b').textContent === 'السوق');
    ok(picked, 'selected map is highlighted and shown as the room header');
    await page.screenshot({ path: 'test/sk-lobby.png' });
    ok(errors.length === 0, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  } catch (e) {
    fail++; console.log('FAIL exception', String(e).slice(0, 300));
  } finally {
    await browser.close(); srv.kill();
    console.log(`e2e-lobby: ${pass} pass, ${fail} fail`);
    process.exit(fail ? 1 : 0);
  }
})();
