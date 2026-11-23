/* SHUHUB end to end: home, tutorial, quick battle (AI personality), campaign, survival, daily challenge, practice, missions, armory,
   profile, settings (language/RTL-LTR, sound), friends by link, ranked between two real browsers, desktop + mobile layouts */
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const path = require('path'), fs = require('fs'), os = require('os');
const PORT = 3880 + Math.floor(Math.random() * 40), BASE = `http://localhost:${PORT}`, OUT = process.env.SH_SHOTS || '/tmp/hub-shots'; fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
const SHARP = () => { const b = SHW_DEBUG.b(); if (!b || b.st.done) return 'x'; const C = SHW_DEBUG.C, st = b.st, s = b.side, only = b.rules.only; if (st.star[s] >= 1 && (!only || only.includes('star'))) { const E = st.castles[1 - s]; SHW_DEBUG.act('star', 0, (E.x0 + 13.5) / C.W); return 'star'; }
  const wk = ['boulder', 'fire', 'swarm'].filter(w => !only || only.includes(w)).find(k => C.ready(st, s, k)); if (!wk) return 'r'; const aim = C.botAim(st, s, { err: 0, perr: 0, gates: 1 }, Math.random); SHW_DEBUG.selW(wk); SHW_DEBUG.shoot(aim.a, aim.p, wk); return wk; };
async function fight(p, ms) { const end = Date.now() + ms; while (Date.now() < end) { const r = await p.evaluate(SHARP); if (r === 'x') break; await sleep(350); } }
const visible = (p, id) => p.evaluate(id => { const e = document.getElementById(id); return !!e && !e.classList.contains('hide'); }, id);
async function waitShown(p, id, ms = 20000) { await p.waitForFunction(id => { const e = document.getElementById(id); return e && !e.classList.contains('hide'); }, id, { timeout: ms }).catch(() => {}); return visible(p, id); }
(async () => {
  const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-e2e-'));
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SH_DATA: DATA }, stdio: 'ignore' }); await sleep(1500);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] }); const errs = [];
  const mk = async (name, lang, vp, seedProg) => { const p = await (await br.newContext({ viewport: vp, deviceScaleFactor: 2 })).newPage(); p.on('pageerror', e => errs.push(name + ': ' + e.message)); await p.addInitScript(([n, l, sp]) => { localStorage.setItem('sh_lang', JSON.stringify(l)); localStorage.setItem('sh_name', JSON.stringify(n)); localStorage.setItem('sh2_prog', JSON.stringify(Object.assign({}, sp || {}, { set: Object.assign({ gfx: '2d' }, (sp && sp.set) || {}) }))); } /* menus & flows run on the classic renderer for speed; e2e-3d.js covers the 3D battlefield */, [name, lang, seedProg]); return p; };
  try {
    const A = await mk('عبدالله', 'ar', { width: 390, height: 844 });
    await A.goto(BASE + '/shuhub/'); await A.waitForFunction(() => window.SHM_DEBUG); await sleep(900);
    ok(await visible(A, 'home'), 'opens on the new home screen'); ok(await A.evaluate(() => document.documentElement.dir === 'rtl'), 'Arabic, right-to-left');
    ok(await visible(A, 'hTutPop'), 'first visit offers the tutorial'); await A.screenshot({ path: OUT + '/01-home-tut.png' });
    /* ---- tutorial ---- */
    await A.click('#tpYes'); await sleep(900); ok(await A.evaluate(() => SHW_DEBUG.b() && SHW_DEBUG.b().tutStep === 1 && SHW_DEBUG.b().mode === 'practice'), 'tutorial starts in the practice range');
    await A.mouse.move(250, 440); await A.mouse.down(); await A.mouse.move(150, 560, { steps: 8 }); await sleep(120); await A.screenshot({ path: OUT + '/02-tut-aim.png' }); await A.mouse.up(); await sleep(400);
    ok(await A.evaluate(() => SHW_DEBUG.b().tutStep >= 2), 'step 1 → 2 after a real drag-and-release shot');
    for (let i = 0; i < 12 && await A.evaluate(() => SHW_DEBUG.b().tutStep < 4); i++) { await A.evaluate(SHARP); await sleep(2900); }
    ok(await A.evaluate(() => SHW_DEBUG.b().tutStep >= 4), 'steps 2–3: hit the fort, thread a gate (' + await A.evaluate(() => SHW_DEBUG.b().tutStep) + ')');
    await A.evaluate(() => SHW_DEBUG.tut(5)); await sleep(200);
    await A.click('#wWeps [data-w="dune"]'); await sleep(250); ok(await A.evaluate(() => SHW_DEBUG.b().place === 'dune'), 'dune button enters placement'); await A.screenshot({ path: OUT + '/03-tut-dune-place.png' });
    const duneX = await A.evaluate(() => { const b = SHW_DEBUG.b(), K = innerWidth / (b.cam + 0 >= 0 ? (innerWidth / (document.getElementById('cv').width / Math.min(2, devicePixelRatio))) : 1); return null; });
    await A.evaluate(() => SHW_DEBUG.place(75)); await sleep(400); ok(await A.evaluate(() => SHW_DEBUG.b().st.dunes[0] === 1 && SHW_DEBUG.b().tutStep === 6), 'a dune rises; step 6 (star meter filled)'); await A.screenshot({ path: OUT + '/04-tut-dune.png' });
    await A.click('#wWeps [data-w="star"]'); await sleep(300); ok(await A.evaluate(() => SHW_DEBUG.b().place === 'star'), 'star button enters targeting'); await A.screenshot({ path: OUT + '/05-tut-star-target.png' });
    await A.evaluate(() => { const b = SHW_DEBUG.b(), E = b.st.castles[1]; SHW_DEBUG.place(E.x0 + 13.5); }); await sleep(1300); await A.screenshot({ path: OUT + '/06-star-fall.png' }); await sleep(900);
    ok(await A.evaluate(() => SHW_DEBUG.b().tutStep === 7 && SHM_DEBUG.P.tut === 1), 'the Great Star lands; tutorial complete'); await A.screenshot({ path: OUT + '/07-star-impact.png' });
    await A.evaluate(() => SHG.toMenu()); await sleep(300); ok(await visible(A, 'home') && !(await visible(A, 'hTutPop')), 'back home');
    /* ---- quick battle vs a personality ---- */
    await A.click('#hQuick'); await sleep(200); ok(await A.evaluate(() => document.querySelectorAll('#qPers button').length === 5), '5 AI personalities'); await A.click('#qPers [data-p="defensive"]'); await A.click('#qMap [data-m="2"]'); await A.screenshot({ path: OUT + '/08-quick.png' });
    await A.click('#qGo'); await A.waitForFunction(() => SHW_DEBUG.b() && performance.now() > SHW_DEBUG.b().localAt, null, { timeout: 6000 }); ok(await A.evaluate(() => SHW_DEBUG.b().bot.dune === SHW_DEBUG.C.P.defensive.dune && SHW_DEBUG.b().st.map === 2), 'battle vs the Warden on the Mesa');
    await fight(A, 9000); await A.screenshot({ path: OUT + '/09-battle.png' }); await fight(A, 150000);
    ok(await waitShown(A, 'wres', 25000), 'results screen'); await sleep(900); await A.screenshot({ path: OUT + '/10-results.png' });
    const P1 = await A.evaluate(() => SHM_DEBUG.P); ok(P1.stats.battles === 1 && P1.coins > 0 && (P1.xp > 0 || P1.lv > 1), 'XP, dinars and stats recorded ' + JSON.stringify({ b: P1.stats.battles, c: P1.coins, xp: P1.xp, lv: P1.lv }));
    ok((await A.textContent('#wrXpT')).includes('+'), 'XP gain shown'); const aiActs = await A.evaluate(() => SHM_DEBUG.P.stats.wins);
    /* ---- campaign ---- */
    await A.click('#wrBack'); await sleep(200); await A.click('#hCampaign'); await sleep(200); ok(await A.evaluate(() => document.querySelectorAll('#cmList .bot').length === 10 && document.querySelectorAll('#cmList .bot.lock').length === 9), '10 lords, 9 locked'); await A.screenshot({ path: OUT + '/11-campaign.png' });
    await A.click('[data-b="0"]'); await A.waitForFunction(() => SHW_DEBUG.b() && performance.now() > SHW_DEBUG.b().localAt, null, { timeout: 6000 }); await fight(A, 150000); await waitShown(A, 'wres', 25000);
    const P2 = await A.evaluate(() => SHM_DEBUG.P); ok(P2.camp[0] >= 1 && P2.campUn === 2, 'beat the Shepherd: stars and lord 2 unlocked ' + JSON.stringify({ c: P2.camp, u: P2.campUn })); ok((await A.textContent('#wrExtra')).includes('★'), 'stars shown');
    /* ---- survival: wave 1 → wave 2 with the heart carried ---- */
    await A.click('#wrBack'); await sleep(200); await A.click('#hSurvival'); await sleep(200); await A.click('#svGo'); await A.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().wave === 1 && performance.now() > SHW_DEBUG.b().localAt, null, { timeout: 6000 });
    await fight(A, 150000); await waitShown(A, 'wres', 25000); ok((await A.textContent('#wrT')).includes('1'), 'wave 1 survived: ' + await A.textContent('#wrT')); await A.screenshot({ path: OUT + '/12-survival.png' });
    await A.click('#wrMain'); await A.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().wave === 2, null, { timeout: 6000 }); ok(await A.evaluate(() => SHW_DEBUG.b().carry != null), 'wave 2 starts, heart carried over'); await A.evaluate(() => SHG.toMenu());
    /* ---- daily challenge rules ---- */
    await sleep(200); await A.click('#hDaily'); await sleep(200); const dc = await A.evaluate(() => SHM_DEBUG.dcToday()); await A.screenshot({ path: OUT + '/13-daily.png' }); await A.click('#dcGo'); await A.waitForFunction(() => SHW_DEBUG.b(), null, { timeout: 6000 }); await sleep(300);
    const dis = await A.evaluate(() => [...document.querySelectorAll('#wWeps button')].filter(b => b.disabled).map(b => b.dataset.w)); ok(!dc.rules.only || dis.length === 8 - dc.rules.only.length, 'challenge rules enforced (' + dc.id + ': disabled ' + dis.join(',') + ')');
    if (dc.rules.maxVolleys) ok((await A.textContent('#wAim')).length > 0, 'volleys-left counter shown'); await A.evaluate(() => SHG.toMenu());
    /* ---- practice range ---- */
    await sleep(200); await A.click('#hPractice'); await sleep(200); await A.click('#prFree'); await sleep(900); ok(await visible(A, 'wPrac'), 'practice bar'); await A.click('#wArc'); await A.evaluate(() => { SHW_DEBUG.b().aim = { a: .8, p: .7 }; }); await sleep(200); await A.screenshot({ path: OUT + '/14-practice-arc.png' });
    await A.evaluate(() => { SHW_DEBUG.b().aim = null; SHW_DEBUG.shoot(.8, .7, 'swarm'); }); await sleep(3500); ok((await A.textContent('#wPracInfo')).length > 0, 'practice reports short/long: ' + await A.textContent('#wPracInfo')); await A.evaluate(() => SHG.toMenu());
    /* ---- missions, armory, profile, settings ---- */
    await sleep(200); await A.click('#hMissions'); await sleep(200); ok(await A.evaluate(() => document.querySelectorAll('#msList .ms').length === 3 && document.querySelectorAll('#msAch .ach').length === 21), '3 daily missions, 21 achievements'); await A.screenshot({ path: OUT + '/15-missions.png' });
    const claimable = await A.evaluate(() => document.querySelectorAll('#msList button:not([disabled])').length); if (claimable) { const c0 = await A.evaluate(() => SHM_DEBUG.P.coins); await A.click('#msList button:not([disabled])'); ok(await A.evaluate(() => SHM_DEBUG.P.coins) > c0, 'claiming a mission pays dinars'); }
    await A.click('#missions [data-home]'); await A.evaluate(() => { SHM_DEBUG.P.coins = 1000; SHM_DEBUG.P.lv = 3; }); await A.click('#hArmory'); await sleep(200); await A.screenshot({ path: OUT + '/16-armory.png' });
    await A.click('#arSkins [data-k="obsidian"]'); await sleep(100); ok(await A.evaluate(() => SHM_DEBUG.P.cos.skin === 'obsidian' && SHM_DEBUG.P.coins === 750), 'bought and equipped a cosmetic skin');
    await A.click('#armory [data-home]'); await A.click('#hProfile'); await sleep(200); ok(await A.evaluate(() => document.querySelectorAll('#prStats div').length === 8), 'profile stats'); await A.screenshot({ path: OUT + '/17-profile.png' });
    await A.click('#profile [data-home]'); await A.click('#hSettings'); await sleep(200); await A.screenshot({ path: OUT + '/18-settings.png' });
    await A.evaluate(() => { const e = document.getElementById('stSfx'); e.value = .3; e.dispatchEvent(new Event('input')); }); ok(await A.evaluate(() => SHM_DEBUG.P.set.sfx === .3), 'effects volume saved');
    await A.click('#stFx'); ok(await A.evaluate(() => SHM_DEBUG.P.set.fx === 'low'), 'battery-saver effects'); await A.click('#stFx');
    await A.click('#stLang'); await sleep(300); ok(await A.evaluate(() => document.documentElement.dir === 'ltr' && document.getElementById('setT') !== undefined), 'English switches to left-to-right');
    await A.click('#settings [data-home]'); await sleep(300); ok((await A.textContent('#hQuick')).includes('Quick'), 'home in English'); await A.screenshot({ path: OUT + '/19-home-en.png' });
    await A.click('#hDaily'); await sleep(150); await A.screenshot({ path: OUT + '/20-daily-en.png' }); await A.evaluate(() => SHG.toMenu());
    /* ---- trials (classic game) still reachable ---- */
    await A.click('#hTrials'); await sleep(200); ok(await visible(A, 'menu'), 'Meteor Trials reachable'); await A.click('#menu [data-home]'); await sleep(200); ok(await visible(A, 'home'), 'and back home');
    /* ---- ranked: two real browsers ---- */
    await A.click('#hRanked'); await sleep(500); ok((await A.textContent('#rkCard')).includes('1000'), 'ranked card shows a 1000 rating'); await A.screenshot({ path: OUT + '/21-ranked.png' });
    await A.click('#rkFind'); await sleep(1500); ok((await A.textContent('#rkStatus')).length > 5, 'searching (real queue): ' + await A.textContent('#rkStatus'));
    const Bp = await mk('Omar', 'en', { width: 1280, height: 800 }, { tut: 1 }); await Bp.goto(BASE + '/shuhub/'); await Bp.waitForFunction(() => window.SHM_DEBUG); await sleep(500); await Bp.screenshot({ path: OUT + '/22-home-desktop.png' });
    await Bp.click('#hRanked'); await sleep(400); await Bp.click('#rkFind');
    await A.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 15000 }); await Bp.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 15000 }); ok(true, 'matched with a real player; the ranked war starts');
    await A.waitForFunction(() => performance.now() > SHW_DEBUG.b().localAt + 200, null, { timeout: 8000 }); await Bp.waitForFunction(() => performance.now() > SHW_DEBUG.b().localAt + 200, null, { timeout: 8000 });
    await Bp.evaluate(() => SHW_DEBUG.act('dune', 0, .3)); await sleep(800); ok(await A.evaluate(() => SHW_DEBUG.b().st.dunes[1 - SHW_DEBUG.b().side] === 1), 'an opponent\'s dune appears on my screen'); await A.screenshot({ path: OUT + '/23-ranked-a.png' }); await Bp.screenshot({ path: OUT + '/23-ranked-b-desktop.png' });
    const end2 = Date.now() + 160000; while (Date.now() < end2) { const r = await A.evaluate(SHARP); if (r === 'x' || !(await A.evaluate(() => !!SHW_DEBUG.b()))) break; await sleep(400); }
    ok(await waitShown(A, 'wres', 25000) && await waitShown(Bp, 'wres', 25000), 'both see results'); ok(/\+\d+/.test(await A.textContent('#wrExtra')) && /-\d+/.test(await Bp.textContent('#wrExtra')), 'rating moves: ' + await A.textContent('#wrExtra') + ' / ' + await Bp.textContent('#wrExtra'));
    await A.screenshot({ path: OUT + '/24-ranked-res.png' }); await Bp.screenshot({ path: OUT + '/24-ranked-res-b.png' });
    await A.click('#wrBack'); await sleep(200); await A.click('#hBoard'); await sleep(600); ok(await A.evaluate(() => document.querySelectorAll('#bdList li').length >= 2 && document.querySelector('#bdList li.mine')), 'leaderboard lists both, you highlighted'); await A.screenshot({ path: OUT + '/25-board.png' });
    /* ---- friends by link (desktop host, mobile guest) ---- */
    await Bp.click('#wrBack'); await sleep(200); await Bp.click('#hFriends'); await Bp.waitForFunction(() => SHW_DEBUG.NET.code, null, { timeout: 6000 }); const code = await Bp.evaluate(() => SHW_DEBUG.NET.code);
    const Cp = await mk('Sara', 'ar', { width: 390, height: 844 }, { tut: 1 }); await Cp.goto(BASE + '/shuhub/?w=' + code); const joined = await Cp.waitForFunction(() => !!(window.SHW_DEBUG && SHW_DEBUG.NET.room && SHW_DEBUG.NET.room.players.length === 2), null, { timeout: 8000 }).then(() => true).catch(() => false); ok(joined, 'friend joins by link');
    await Bp.waitForFunction(() => !document.getElementById('wStart').disabled, null, { timeout: 5000 }); await Cp.screenshot({ path: OUT + '/26-friends-lobby.png' }); await Bp.click('#wStart');
    await Cp.waitForFunction(() => SHW_DEBUG.b() && SHW_DEBUG.b().mode === 'net', null, { timeout: 8000 }); ok(await Cp.evaluate(() => SHW_DEBUG.b().side === 1), 'guest plays the right side, drawn mirrored');
  } catch (e) { console.log('ERROR', e.message.split('\n')[0]); fail++; }
  ok(!errs.length, 'no page errors ' + errs.slice(0, 3).join(' | '));
  await br.close(); srv.kill(); console.log(`e2e-hub: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
