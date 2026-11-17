/* طخطخة: فحص متصفح للخرائط الجديدة: الدخول للمباني، الصدى الداخلي، مؤثرات الإصابة، وواجهة اللعب */
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const { spawn } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms)); let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('PASS', m); } else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { env: { ...process.env, PORT: 3126 }, stdio: 'inherit', cwd: __dirname + '/..' }); await sleep(900);
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const errs = [];
  try {
    const p = await b.newPage({ viewport: { width: 960, height: 540 } }); p.on('pageerror', e => errs.push(String(e)));
    await p.addInitScript(() => localStorage.setItem('dw_sk', JSON.stringify({ q: 1 })));
    await p.goto('http://localhost:3126/'); await p.waitForFunction(() => window.DW);
    await p.click('.card[data-act="game:strike"]'); await sleep(800);
    await p.click('[data-act="play:strike"]'); await p.waitForSelector('.sl', { timeout: 15000 });
    ok(await p.$$eval('.sl-map', n => n.length) >= 6, 'six maps offered in the lobby');
    await p.evaluate(() => document.querySelector('[data-act="map:الميناء"]').click()); await sleep(300);
    await p.click('[data-act="bot"]'); await sleep(300); await p.click('[data-act="start"]');
    await p.waitForFunction(() => window.SK && SK.dbg && SK.dbg.S && SK.dbg.S() && SK.dbg.S().ph === 'live', null, { timeout: 60000 });
    await p.mouse.click(480, 270); await sleep(300);
    ok(await p.evaluate(() => (SK.dbg.S().map || SK.dbg.S().mp) === 'الميناء'), 'match runs on the chosen new map');
    const r = await p.evaluate(async () => {
      const D = SK.dbg, o = D.self, w8 = ms => new Promise(r => setTimeout(r, ms));
      o.x = 13.3; o.y = 3.5; o.a = 0; o.pi = -.05; o.z = 0; await w8(300); const outInd = D.au().ind;
      for (let i = 0; i < 4; i++) { o.last = 0; o.rel = 0; o.ammo[o.slot] = 12; o.x = 13.3; o.y = 3.5; o.a = (i - 2) * .05; D.shoot(); await w8(60); }
      const F = D.fx(), live = P => { let n = 0; for (let i = 0; i < P.n; i++) if (P.life[i] > 0) n++; return n; };
      const fx = { spk: live(F.spk), deb: live(F.deb), shells: F.shells.filter(s => s.visible).length };
      o.x = 6.5; o.y = 5.5; o.z = 0; await w8(400);
      return { outInd, inInd: D.au().ind, fx, audio: !!D.au().ac };
    });
    ok(r.outInd === 0 && r.inInd === 1, 'audio switches to indoor reverb inside the warehouse');
    ok(r.fx.spk > 0 && r.fx.deb > 0, 'hitting a metal container makes sparks and debris (' + r.fx.spk + '/' + r.fx.deb + ')');
    ok(r.fx.shells > 0, 'spent casings are ejected (' + r.fx.shells + ')');
    ok(await p.evaluate(() => { const v = document.querySelector('.sk-vit'); return !!v && /%/.test(v.style.getPropertyValue('--hp')); }), 'health bar reflects health');
    await p.evaluate(() => { const l = document.querySelector('.sk-lock'); if (l) l.style.display = 'none'; const o = SK.dbg.self; o.x = 6.5; o.y = 5.5; o.a = -1.2; o.pi = .15; });
    await sleep(600); await p.screenshot({ path: __dirname + '/sk-indoor.png' });
    ok(!errs.length, 'no page errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  } catch (e) { fail++; console.log('FAIL exception', e.message); }
  await b.close(); srv.kill(); console.log(`e2e-maps: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
