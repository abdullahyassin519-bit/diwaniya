/* طخطخة: فحوص متصفح لاختيار الشخصية، ملء الشاشة التلقائي، النماذج المتحركة، وتمييز الحلفاء من الأعداء */
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const URL = 'http://localhost:3125/', sleep = ms => new Promise(r => setTimeout(r, ms));
let fail = 0, pass = 0;
const ok = (c, m) => { if (c) { pass++; console.log('PASS', m); } else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3125 }, stdio: 'inherit', cwd: __dirname + '/..' }); await sleep(900);
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } }); await page.addInitScript(() => { if (!localStorage.getItem('dw_sk')) localStorage.setItem('dw_sk', JSON.stringify({ q: 1 })); }); /* جودة متوسطة: المتصفح الآلي يرسم بلا معالج رسوميات */
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(URL); await page.waitForFunction(() => window.DW);
    await page.evaluate((s => document.querySelector(s).click()), '[data-act="play:strike"]'); await page.waitForSelector('.lb', { timeout: 15000 });
    await page.waitForSelector('.lb-ch img', { timeout: 60000 });
    ok(await page.$$eval('.lb-ch', n => n.length) === 4, 'four characters offered in the lobby');
    ok(await page.$eval('.lb-ch img', i => i.src.startsWith('data:image/png')), 'character card has a rendered 3D picture');
    await page.evaluate(() => document.querySelector('[data-act="char:3"]').click()); await sleep(400);
    ok(await page.evaluate(() => JSON.parse(localStorage.getItem('dw_sk') || '{}').skin === 3), 'choice is saved');
    ok(await page.$eval('.lb-ch.on', b => b.dataset.act === 'char:3'), 'chosen card is highlighted');
    for (const t of [2, 1, 2]) { await page.evaluate(t => document.querySelector('[data-act="bot2:' + t + '"]').click(), t); await sleep(300); }
    await page.evaluate(() => document.querySelector('[data-act="start"]').click());
    await page.waitForFunction(() => window.SK && SK.dbg && SK.dbg.S && SK.dbg.S() && SK.dbg.S().ph === 'live', null, { timeout: 60000 });
    await sleep(1500);
    ok(await page.evaluate(() => { const w = document.querySelector('.sk'); return w.classList.contains('fs') && getComputedStyle(w).position === 'fixed'; }), 'match opens as a full-screen overlay automatically');
    ok(await page.$('.sk-quit') !== null, 'exit button is available inside the full-screen view');
    const r = await page.evaluate(() => {
      const D = SK.dbg, S = D.S(), me = DW.P.id, mt = S.pl[me].tm, out = { models: 0, total: 0, sides: true, mineSkin: null };
      for (const id in D.chars) { const c = D.chars[id]; out.total++; if (c.def) out.models++; if (id === me) { out.mineSkin = c.def && c.def.k; continue; } const want = S.pl[id].tm === mt; if (c.side !== want) out.sides = false; }
      return out;
    });
    ok(r.total > 0 && r.models === r.total, 'every player uses an animated glTF character (' + r.models + '/' + r.total + ')');
    ok(r.sides, 'allies are marked as allies and enemies as enemies');
    /* الحركة: مقطع المشي/الجري يعمل لبوت يتحرك */
    const anim = await page.evaluate(() => new Promise(res => setTimeout(() => { const D = SK.dbg; let moving = 0; for (const id in D.chars) { const c = D.chars[id]; const n = c.cur && c.cur.getClip().name; if (/Walk|Run/.test(n || '')) moving++; } res(moving); }, 2500)));
    ok(anim > 0, 'moving players play walk or run animations (' + anim + ')');
    await page.keyboard.press('v'); await sleep(800);
    ok(await page.evaluate(() => { const c = SK.dbg.chars[DW.P.id]; return !!c && c.root.visible && c.def && c.def.k === 'shaun'; }), 'own third-person character is the one chosen in the lobby');
    await page.screenshot({ path: __dirname + '/sk-chars.png' });
    ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  } catch (e) { fail++; console.log('FAIL exception', e.message); }
  await browser.close(); srv.kill();
  console.log(`e2e-chars: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
