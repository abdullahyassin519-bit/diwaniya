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
    await page.click('.card[data-act="game:strike"]'); await sleep(800);
    await page.click('[data-act="play:strike"]');
    await page.waitForSelector('.sl', { timeout: 15000 });
    ok(true, 'strike lobby renders');
    const sides = await page.$$eval('.sl-side', els => els.map(e => e.className));
    ok(sides.length === 2 && sides[0].includes('red') && sides[1].includes('blue'), 'two sides: attackers red, defenders blue');
    const startDisabled = await page.$eval('[data-act="start"]', b => b.disabled);
    ok(startDisabled === true, 'start is disabled with one player');
    const maps = await page.$$eval('.sl-map', els => els.length);
    ok(maps >= 3, 'map cards shown: ' + maps);
    const thumbOk = await page.$eval('.sl-map img', i => i.src.startsWith('data:image/png'));
    ok(thumbOk, 'map thumbnail is a real drawn image');
    await page.click('[data-act="bot"]'); await sleep(400);
    const startNow = await page.$eval('[data-act="start"]', b => b.disabled);
    ok(startNow === false, 'start enabled once both teams have a player');
    await page.click('.sl-map:nth-of-type(2)'); await sleep(300);
    const picked = await page.$eval('.sl-big img', i => !!i.src).catch(() => false);
    ok(picked, 'selected map shows large preview');
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
