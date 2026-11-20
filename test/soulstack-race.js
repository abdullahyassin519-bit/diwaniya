/* SOULSTACK races with friends: rooms by link, host controls, countdown, refereed finish, shared bodies, results, rematch */
const { spawn } = require('child_process'); const WebSocket = require('ws'); const path = require('path'), os = require('os'), fs = require('fs');
const L = require('../public/soulstack/levels.js');
const PORT = 3760 + Math.floor(Math.random() * 30), sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } };
function client(q) {
  const ws = new WebSocket(`ws://localhost:${PORT}/ss/ws?${q}`), c = { ws, msgs: [], room: null };
  ws.on('message', d => { const m = JSON.parse(d.toString()); c.msgs.push(m); if (m.t === 'room') c.room = m; if (m.t === 'hello') c.me = m.me; });
  c.send = m => ws.send(JSON.stringify(m)); c.open = new Promise(r => ws.on('open', r)); c.closed = new Promise(r => ws.on('close', r));
  c.wait = async (f, ms = 3000) => { const t = Date.now(); while (Date.now() - t < ms) { const m = c.msgs.find(f); if (m) return m; await sleep(20); } return null; };
  return c;
}
(async () => {
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SS_DATA: fs.mkdtempSync(path.join(os.tmpdir(), 'ssr-')) }, stdio: 'ignore' }); await sleep(1500);
  try {
    const A = client('t=tokA_aaaaaaaaaaaaaaaaaaaa&n=Layla&h=30'); await A.open; await A.wait(m => m.t === 'room');
    const code = A.room.code; ok(/^[A-Z0-9]{5}$/.test(code) && A.room.host === A.me, 'connecting without a code creates a room you host (' + code + ')');
    const B = client(`t=tokB_bbbbbbbbbbbbbbbbbbbb&n=Omar&h=200&r=${code}`); await B.open; await B.wait(m => m.t === 'room' && m.players.length === 2);
    await A.wait(m => m.t === 'room' && m.players.length === 2); ok(A.room.players.map(p => p.n).sort().join() === 'Layla,Omar', 'a friend joins by the link code; both see each other');
    B.send({ t: 'lv', lv: 5 }); B.send({ t: 'go' }); await sleep(300); ok(A.room.lv === 1 && A.room.state === 'lobby', 'only the host picks the level and starts');
    A.send({ t: 'lv', lv: 2 }); await B.wait(m => m.t === 'room' && m.lv === 2); ok(B.room.lv === 2, 'host picks level 2; friends see it');
    A.send({ t: 'go' }); const go = await B.wait(m => m.t === 'room' && m.state === 'race'); ok(go && go.at - go.now > 3000, 'start gives everyone a synced 3.5 s countdown');
    await sleep(go.at - go.now + 100);
    const H = L.LEVELS[1].H;
    B.send({ t: 'p', x: 5, y: H + 2, vx: 0, vy: 0, g: 1 }); B.send({ t: 'fin' }); ok(!!(await B.wait(m => m.t === 'err' && m.e === 'nofin')), 'teleporting to the top is refused by the referee');
    const rel = A.wait(m => m.t === 'p' && m.id === B.me); ok(!!(await rel), 'positions are relayed to the other racers');
    B.send({ t: 'die', x: 6, y: 3, c: 'sac' }); const body = await A.wait(m => m.t === 'body'); ok(body && body.b.n === 'Omar' && body.b.x === 6, 'a body left in the race appears for every racer');
    A.send({ t: 'emo', e: '🔥' }); ok(!!(await B.wait(m => m.t === 'emo' && m.e === '🔥')), 'emoji reactions reach friends');
    // A climbs honestly: a few metres per 200 ms
    for (let y = 1; y <= H + 1; y += 2.5) { A.send({ t: 'p', x: 5, y, vx: 0, vy: 8, g: 0 }); await sleep(200); }
    const el = (Date.now() - go.at) / 1000; if (el < H / 9) await sleep((H / 9 - el) * 1000 + 100);
    A.send({ t: 'fin' }); const f1 = await B.wait(m => m.t === 'fin' && m.id === A.me); ok(f1 && f1.place === 1 && f1.time > 0, `Layla finishes first in ${f1 && f1.time}s`);
    for (let y = 1; y <= H + 1; y += 3) { B.send({ t: 'p', x: 5, y, vx: 0, vy: 8, g: 0 }); await sleep(200); }
    B.send({ t: 'fin' }); const res = await A.wait(m => m.t === 'res'); ok(res && res.res[0].n === 'Layla' && res.res[1].n === 'Omar' && res.res[1].place === 2, 'when everyone finishes: results in order');
    ok(A.room.state === 'done' || (await A.wait(m => m.t === 'room' && m.state === 'done')), 'race marked done');
    A.send({ t: 'again' }); ok(!!(await B.wait(m => m.t === 'room' && m.state === 'lobby' && m.bodies.length === 0)), 'rematch returns everyone to the lobby with a clean tower');
    const X = client('t=tokX_xxxxxxxxxxxxxxxxxxxx&r=ZZZZZ'); ok(!!(await X.wait(m => m.t === 'err' && m.e === 'noroom')), 'a wrong code says the room does not exist');
    A.ws.close(); await B.wait(m => m.t === 'room' && m.host === B.me); ok(B.room.host === B.me, 'if the host leaves, a friend becomes host');
    B.ws.close();
  } catch (e) { fail++; console.log('ERR', e); }
  srv.kill(); console.log(`soulstack-race: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
