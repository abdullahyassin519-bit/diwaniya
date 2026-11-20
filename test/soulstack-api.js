/* SOULSTACK API against a real server process */
const { spawn } = require('child_process'); const os = require('os'), fs = require('fs'), path = require('path');
const C = require('../public/soulstack/core.js');
const PORT = 3610 + Math.floor(Math.random() * 50), BASE = 'http://localhost:' + PORT, DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ss-test-'));
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const TA = 'tokA_' + 'a'.repeat(20), TB = 'tokB_' + 'b'.repeat(20);
const get = async (u, t) => { const r = await fetch(BASE + u + (u.includes('?') ? '&' : '?') + 't=' + t); return { code: r.status, j: await r.json() }; };
const post = async (u, t, b) => { const r = await fetch(BASE + u + '?t=' + t, { method: 'POST', body: JSON.stringify(b) }); return { code: r.status, j: await r.json() }; };
let srv; const start = async () => { srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SS_DATA: DATA }, stdio: 'ignore' }); for (let i = 0; i < 40; i++) { try { await fetch(BASE + '/healthz'); return; } catch (e) { await sleep(150); } } };
(async () => {
  await start();
  const page = await fetch(BASE + '/soulstack/'); ok(page.status === 200 && (await page.text()).includes('SOULSTACK'), 'game page served at /soulstack/');
  const red = await fetch(BASE + '/soulstack', { redirect: 'manual' }); ok(red.status === 301, '/soulstack redirects to /soulstack/');
  let s = await get('/ss/api/state?since=0', TA); ok(s.code === 200 && s.j.souls === C.SOULS && s.j.day === C.dayKey(), 'fresh player has ' + C.SOULS + ' souls today');
  ok((await get('/ss/api/state', 'x')).code === 400, 'bad token rejected');
  const day = s.j.day, w = C.World(C.daySeed(day));
  ok(s.j.seed === C.daySeed(day), 'server and client agree on today\'s seed');
  // progress, then a sacrifice
  let r = await post('/ss/api/prog', TA, { day, best: 70, n: 'Layla', h: 30 }); ok(r.j.best === 70, 'progress recorded (best 70)');
  r = await post('/ss/api/die', TA, { day, x: 5, y: 40, c: 'sac' }); ok(r.code === 200 && r.j.souls === C.SOULS - 1 && r.j.block[1] === 5, 'sacrifice creates a body and costs a soul');
  const bodyA = r.j.block[0];
  r = await post('/ss/api/die', TA, { day, x: 5, y: 40, c: 'sac' }); ok(r.code === 429, 'deaths are rate-limited'); await sleep(750);
  r = await post('/ss/api/die', TA, { day, x: 5, y: 40, c: 'sac' }); ok(r.code === 200 && (r.j.block[2] !== 40 || r.j.block[1] !== 5), 'a second body in the same cell stacks on top (cell ' + r.j.block.slice(1, 3) + ')'); await sleep(750);
  r = await post('/ss/api/die', TA, { day, x: 5, y: 200, c: 'sac' }); ok(r.code === 400, 'cannot die far above your best height'); await sleep(750);
  r = await post('/ss/api/die', TA, { day, x: 5, y: 10, c: 'spike' }); ok(r.code === 400 || w.spike(5, 10), 'a spike death needs a real spike'); await sleep(750);
  const sp = [...w.spikes].map(k => k.split(',').map(Number)).find(([x, y]) => y < 75);
  if (sp) { r = await post('/ss/api/die', TA, { day, x: sp[0], y: sp[1], c: 'spike' }); ok(r.code === 200 && r.j.block[1] === sp[0] && r.j.block[2] === sp[1], 'dying on a spike covers that exact spike cell'); await sleep(750); }
  r = await post('/ss/api/die', TA, { day: '1999-01-01', x: 5, y: 3, c: 'sac' }); ok(r.code === 409, 'old day rejected');
  // B sees A's bodies and stands on one
  s = await get('/ss/api/state?since=0', TB); ok(s.j.blocks.some(b => b[0] === bodyA && b[3] === 'Layla' && b[4] === 30), 'another player sees the body with its name and colour');
  const seq = s.j.seq; ok((await get('/ss/api/state?since=' + seq, TB)).j.blocks.length === 0, 'incremental polling returns only new bodies');
  r = await post('/ss/api/prog', TB, { day, best: 41, steps: [bodyA], n: 'Omar', h: 200 }); ok(r.j.credited === 1, 'standing on someone\'s body credits them');
  r = await post('/ss/api/prog', TB, { day, best: 41, steps: [bodyA] }); ok(r.j.credited === 0, 'credit is once per climber per body');
  r = await post('/ss/api/prog', TA, { day, best: 70, steps: [bodyA] }); ok(r.j.credited === 0, 'no credit for standing on yourself');
  s = await get('/ss/api/state', TA); ok(s.j.helped === 1, 'owner sees helped = 1');
  r = await post('/ss/api/prog', TB, { day, best: 5000 }); ok(r.j.best < 300, 'impossible height jumps are capped (' + r.j.best + ')');
  const b = await (await fetch(BASE + '/ss/api/board')).json(); ok(b.helpers[0] && b.helpers[0].n === 'Layla' && b.height.length === 2, 'leaderboard lists helpers and heights');
  // run out of souls
  let left = (await get('/ss/api/state', TA)).j.souls, last;
  while (left > 0) { last = await post('/ss/api/die', TA, { day, x: 2 + (left % 9), y: 20, c: 'sac' }); if (last.code === 429) { await sleep(300); continue; } left = last.j.souls; await sleep(720); }
  r = await post('/ss/api/die', TA, { day, x: 3, y: 20, c: 'sac' }); ok(r.code === 403 && r.j.souls === 0, 'after ' + C.SOULS + ' souls you are done for the day');
  // persistence across restart
  await sleep(16000); srv.kill(); await sleep(500); await start();
  s = await get('/ss/api/state?since=0', TB); ok(s.j.blocks.length >= C.SOULS && s.j.blocks.some(x => x[0] === bodyA), 'today\'s tower survives a server restart (' + s.j.blocks.length + ' bodies)');
  ok((await get('/ss/api/state', TA)).j.souls === 0, 'souls stay spent after restart');
  srv.kill(); console.log(`soulstack-api: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR', e); srv && srv.kill(); process.exit(1); });
