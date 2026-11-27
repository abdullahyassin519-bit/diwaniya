/* شُهُب 3D battlefield, local versus, workshop, locks, landscape, fallbacks — headless Chrome (SwiftShader WebGL) */
const { chromium } = require('playwright'); const { spawn } = require('child_process');
const sleep = ms => new Promise(r => setTimeout(r, ms)); const PORT = 3931;
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: __dirname + '/..', env: { ...process.env, PORT }, stdio: 'ignore' }); await sleep(1200);
  const GL = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
  const br = await chromium.launch({ args: GL }); const errs = [];
  const mk = async (vp, prog, lang = 'ar', b = br) => { const p = await (await b.newContext({ viewport: vp, deviceScaleFactor: 1, hasTouch: true })).newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(([pr, l]) => { if (sessionStorage.x) return; sessionStorage.x = 1; localStorage.setItem('sh_lang', JSON.stringify(l)); localStorage.setItem('sh_name', '"Abdullah"'); localStorage.setItem('sh2_prog', JSON.stringify(pr)); }, [prog, lang]);
    await p.goto(`http://localhost:${PORT}/shuhub/`); await p.waitForFunction(() => window.SHW_DEBUG && window.SHM_DEBUG); return p; };
  // fast deterministic clock: one sim tick per rendered frame
  const lockClock = p => p.evaluate(() => { let fake = performance.now(); performance.now = () => fake; const t = () => { fake += 1000 / 60; requestAnimationFrame(t); }; requestAnimationFrame(t); });
  const frames = (p, n) => p.evaluate(n => new Promise(r => { let k = 0; const f = () => ++k >= n ? r() : requestAnimationFrame(f); requestAnimationFrame(f); }), n);
  try {
    // 1) the 3D battlefield starts, draws a real scene and every weapon works in it
    const A = await mk({ width: 390, height: 844 }, { tut: 1, fired: 9, lv: 8, quickP: 'tactical', quickMap: 2 });
    await A.evaluate(() => SHM_DEBUG.startQuick()); await A.waitForFunction(() => SHW_DEBUG.r3(), null, { timeout: 30000 }).catch(() => {});
    ok(await A.evaluate(() => SHW_DEBUG.r3()), '3D renderer starts for a quick battle'); await lockClock(A); await frames(A, 170);
    let S = await A.evaluate(() => SH3D.stats()); ok(S && S.calls > 40 && S.tris > 10000, `the 3D scene draws (${S && S.calls} calls, ${S && S.tris} triangles)`);
    ok(await A.evaluate(() => getComputedStyle(document.getElementById('cv3')).display !== 'none'), 'the WebGL canvas is shown under the overlay');
    await A.evaluate(() => { const b = SHW_DEBUG.b(); b.botNext = 1e9; b.st.nextEv = 1e9; });
    for (const w of ['swarm', 'ball', 'fire', 'cluster', 'boulder', 'bolt']) { const fired = await A.evaluate(w => { const b = SHW_DEBUG.b(), C = SHW_DEBUG.C; b.st.cd.fill(0); const a = C.botAim(b.st, 0, { err: 0, perr: 0, gates: 0 }, Math.random); return SHW_DEBUG.act(w, a.a, a.p); }, w); ok(fired, 'fires ' + w + ' in 3D'); await frames(A, 40); }
    await A.waitForFunction(() => SHW_DEBUG.b().st.bolted[0] >= 1, null, { timeout: 120000 }).catch(() => {}); ok(await A.evaluate(() => SHW_DEBUG.b().st.bolted[0] >= 1), 'the lightning strike landed');
    ok(await A.evaluate(() => SHW_DEBUG.act('dune', 0, .5)), 'raises a dune in 3D');
    await A.evaluate(() => { SHW_DEBUG.b().st.star[0] = 1; }); ok(await A.evaluate(() => SHW_DEBUG.act('star', 0, .9)), 'calls the Great Star in 3D'); await frames(A, 140);
    S = await A.evaluate(() => SH3D.stats()); ok(S.geos < 400 && S.tex < 60, `no runaway GPU allocations (${S.geos} geometries, ${S.tex} textures)`);
    // the enemy fort collapses and the results screen follows the cinematic
    await A.evaluate(() => { const b = SHW_DEBUG.b(), E = b.st.castles[1]; E.coreHp = 1; b.st.protect = -1; SHW_DEBUG.C.lightning(b.st, E.x0 + (E.cc + .5) * 3, 0); });
    await A.waitForFunction(() => !SHW_DEBUG.b() || SHW_DEBUG.b().endT > 0, null, { timeout: 120000 }).catch(() => {}); ok(await A.evaluate(() => !SHW_DEBUG.b() || SHW_DEBUG.b().endT > 0), 'victory starts the end cinematic ' + JSON.stringify(await A.evaluate(() => { const b = SHW_DEBUG.b(); return b && { done: b.st.done, w: b.st.winner, tick: b.st.tick, core: b.st.castles[1].coreHp }; })));
    await A.waitForFunction(() => !document.getElementById('wres').classList.contains('hide'), null, { timeout: 200000 }).catch(() => {}); ok(await A.evaluate(() => !document.getElementById('wres').classList.contains('hide')), 'results screen after the cinematic');
    ok(await A.evaluate(() => getComputedStyle(document.getElementById('cv3')).display === 'none'), 'the 3D canvas is released after the battle');
    // 1b) boss battle: the 5th lord raises a rune shield that falls with its towers
    const Bo = await mk({ width: 390, height: 844 }, { tut: 1, fired: 9, lv: 8, campUn: 10 });
    await Bo.evaluate(() => SHM_DEBUG.startCamp(4)); await Bo.waitForFunction(() => SHW_DEBUG.b(), null, { timeout: 10000 });
    await lockClock(Bo); await frames(Bo, 170); ok(await Bo.evaluate(() => /زعيم|Boss/.test(document.getElementById('wBanner').textContent + document.getElementById('wToast').textContent)), 'boss battles open with a boss card'); await frames(Bo, 20);
    ok(await Bo.evaluate(() => /🛡️/.test(document.getElementById('wD1').textContent) && SHW_DEBUG.C.shieldUp(SHW_DEBUG.b().st.castles[1])), 'the boss heart is shielded');
    await Bo.evaluate(() => { const E = SHW_DEBUG.b().st.castles[1]; E.t[0] = 0; }); await frames(Bo, 5); ok(await Bo.evaluate(() => !/🛡️/.test(document.getElementById('wD1').textContent)), 'toppling a rune tower breaks the shield');
    // 2) local versus: turns pass between the two players, no reload timers, full arsenal even at level 1
    const L = await mk({ width: 390, height: 844 }, { tut: 1, fired: 9, lv: 1, quickMap: 1 });
    await L.click('#hLocal'); await L.fill('#lcN2', 'Sara'); await L.click('#lcGo'); await L.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'local');
    await lockClock(L); await frames(L, 200); ok(await L.evaluate(() => document.getElementById('wN0').textContent === 'Abdullah' && document.getElementById('wN1').textContent === 'Sara'), 'player 1 aims first');
    ok(await L.evaluate(() => !document.querySelector('#wWeps button[data-w="bolt"]').classList.contains('lock')), 'local battles get the whole arsenal');
    await L.evaluate(() => { const b = SHW_DEBUG.b(); b.st.nextEv = 1e9; SHW_DEBUG.shoot(.8, .62, 'ball'); }); ok(await L.evaluate(() => SHW_DEBUG.b().lt.ph === 'fly'), 'a shot ends the turn');
    ok(await L.evaluate(() => { const b = SHW_DEBUG.b(); return !SHW_DEBUG.act('swarm', .8, .6); }), 'no second shot while the volley flies');
    await L.waitForFunction(() => SHW_DEBUG.b().side === 1 && SHW_DEBUG.b().lt.ph === 'aim', null, { timeout: 60000 }).catch(() => {});
    ok(await L.evaluate(() => SHW_DEBUG.b().side === 1 && document.getElementById('wN0').textContent === 'Sara'), 'the turn passes to player 2 and the view swings to their fort');
    ok(await L.evaluate(() => { const b = SHW_DEBUG.b(); return SHW_DEBUG.act('boulder', .8, .6) && (b.lt.ph = 'aim', SHW_DEBUG.act('boulder', .8, .6)); }), 'no reload timers in turn-based play');
    // 3) workshop: upgrades cost dinars and reach the battle (solo only); weapon locks by level
    const Wp = await mk({ width: 390, height: 844 }, { tut: 1, fired: 9, lv: 2, coins: 1000, quickMap: 0 });
    await Wp.click('#hWorkshop'); await Wp.click('[data-u="arch"]'); ok(await Wp.evaluate(() => SHM_DEBUG.P.up.arch === 1 && SHM_DEBUG.P.coins === 850), 'buying an archer upgrade costs 150 dinars');
    ok(await Wp.evaluate(() => document.querySelector('[data-u="bolt"]').disabled && /5/.test(document.querySelector('[data-u="bolt"]').textContent)), 'lightning upgrades wait for level 5');
    await Wp.evaluate(() => { SHM_DEBUG.P.set.gfx = '2d'; SHM_DEBUG.startQuick(); }); await Wp.waitForFunction(() => SHW_DEBUG.b());
    ok(await Wp.evaluate(() => SHW_DEBUG.b().st.mods[0].arch === 1), 'upgrades apply against the computer'); ok(await Wp.evaluate(() => !SHW_DEBUG.r3()), 'classic 2D renderer when chosen in settings');
    ok(await Wp.evaluate(() => document.querySelector('#wWeps button[data-w="cluster"]').classList.contains('lock')), 'cluster is locked below level 3 in solo play');
    await Wp.evaluate(() => SHW_DEBUG.selW('cluster')); ok(await Wp.evaluate(() => SHW_DEBUG.b().wsel !== 'cluster' && /3/.test(document.getElementById('wToast').textContent)), 'a locked weapon explains when it opens');
    // 4) landscape phone: the whole weapon bar fits and the battle renders in 3D
    const Ls = await mk({ width: 844, height: 390 }, { tut: 1, fired: 9, lv: 8, quickMap: 3 }, 'en');
    await Ls.evaluate(() => SHM_DEBUG.startQuick()); await Ls.waitForFunction(() => SHW_DEBUG.r3(), null, { timeout: 30000 }).catch(() => {}); await sleep(1500);
    const bar = await Ls.evaluate(() => { const r = document.getElementById('wWeps').getBoundingClientRect(), top = document.querySelector('.wtop').getBoundingClientRect(); return { l: r.left, r: r.right, b: r.bottom, h: innerHeight, w: innerWidth, topB: top.bottom, dir: document.documentElement.dir }; });
    ok(bar.l >= 0 && bar.r <= bar.w && bar.b <= bar.h, 'landscape: all 8 weapons fit on screen'); ok(bar.dir === 'ltr', 'English battle runs left-to-right'); ok(await Ls.evaluate(() => SHW_DEBUG.r3()), 'landscape battle in 3D');
    await Ls.screenshot({ path: __dirname + '/sh3d-landscape.png' });
    // 5) no WebGL at all: the classic 2D battle still runs
    const br2 = await chromium.launch({ args: ['--disable-3d-apis', '--disable-gpu'] }); const N = await mk({ width: 390, height: 844 }, { tut: 1, fired: 9, lv: 8, quickMap: 1 }, 'ar', br2);
    await N.evaluate(() => SHM_DEBUG.startQuick()); await sleep(4000); ok(await N.evaluate(() => !SHW_DEBUG.r3() && SHW_DEBUG.b() && SHW_DEBUG.b().st.tick > 30), 'without WebGL the battle falls back to 2D'); await br2.close();
    ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  } catch (e) { fail++; console.log('FAIL exception', e.message); }
  await br.close(); srv.kill(); console.log(`e2e-3d: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
