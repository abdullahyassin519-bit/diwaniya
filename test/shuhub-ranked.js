/* Ranked: two real clients queue, get paired, the war starts by itself, the loser's fall settles it, Elo moves, the board shows it */
const { spawn } = require('child_process'); const WS = require('ws'); const path = require('path'), os = require('os'), fs = require('fs');
const PORT = 3800 + Math.floor(Math.random() * 40), BASE = `http://localhost:${PORT}`, WSB = `ws://localhost:${PORT}`;
let pass = 0, fail = 0; const ok = (c, m) => { if (c) pass++; else { fail++; console.log('FAIL', m); } }, sleep = ms => new Promise(r => setTimeout(r, ms));
const client = (url) => new Promise((res, rej) => { const ws = new WS(url), msgs = []; ws.msgs = msgs; ws.on('message', d => msgs.push(JSON.parse(d))); ws.on('open', () => res(ws)); ws.on('error', rej); });
const waitFor = async (ws, f, ms = 8000) => { const end = Date.now() + ms; while (Date.now() < end) { const m = ws.msgs.find(f); if (m) return m; await sleep(50); } return null; };
(async () => {
  const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'sh-r-'));
  const srv = spawn('node', ['server.js'], { cwd: path.join(__dirname, '..'), env: { ...process.env, PORT, SH_DATA: DATA }, stdio: 'ignore' }); await sleep(1300);
  try {
    const TA = 'rankedplayerAAAAAAAAAA', TB = 'rankedplayerBBBBBBBBBB';
    const a = await client(`${WSB}/sh/ws?m=ranked&t=${TA}&n=Layla&h=30`); const qa = await waitFor(a, m => m.t === 'queued'); ok(qa && qa.r === 1000 && qa.lg === 'bronze', 'queued at 1000 (bronze)');
    await sleep(1500); ok(!a.msgs.some(m => m.t === 'match'), 'alone in the queue: no fake opponent');
    const b = await client(`${WSB}/sh/ws?m=ranked&t=${TB}&n=Omar&h=200`);
    const ma = await waitFor(a, m => m.t === 'match'), mb = await waitFor(b, m => m.t === 'match'); ok(ma && mb && ma.code === mb.code, 'paired into the same room ' + (ma && ma.code)); ok(ma && ma.foe.n === 'Omar' && mb.foe.n === 'Layla', 'each sees the real opponent');
    const ra = await client(`${WSB}/sh/ws?m=war&r=${ma.code}&t=${TA}&n=Layla&h=30`), rb = await client(`${WSB}/sh/ws?m=war&r=${ma.code}&t=${TB}&n=Omar&h=200`);
    const intruder = await client(`${WSB}/sh/ws?m=war&r=${ma.code}&t=intruderCCCCCCCCCCCC&n=X&h=1`); const e = await waitFor(intruder, m => m.t === 'err'); ok(e && e.e === 'full', 'nobody else can enter a ranked room');
    const st = await waitFor(ra, m => m.t === 'room' && m.state === 'duel'); ok(st && Object.keys(st.sides).length === 2, 'the ranked war starts by itself when both arrive');
    await sleep(st.at - st.now + 200);
    ra.send(JSON.stringify({ t: 'fire', k: 300, a: .8, p: .7, w: 'dune', s: 1 })); const f = await waitFor(rb, m => m.t === 'fire'); ok(f && f.w === 'dune', 'new actions (dune) are relayed');
    rb.send(JSON.stringify({ t: 'dead' })); const res = await waitFor(ra, m => m.t === 'res'); ok(res && res.ranked && res.delta, 'the result is ranked');
    const ids = Object.keys(res.delta), me = res.res.find(x => x.time), lo = res.res.find(x => !x.time); ok(res.delta[me.id].d === 16 && res.delta[lo.id].d === -16, 'equal ratings: +16 / −16 (' + res.delta[me.id].d + ')');
    ra.send(JSON.stringify({ t: 'again' })); await sleep(300); ok(!ra.msgs.some(m => m.t === 'room' && m.state === 'lobby' && m.code === ma.code && ra.msgs.indexOf(m) > ra.msgs.indexOf(res)), 'no rematch inside ranked (queue again instead)');
    const board = await (await fetch(`${BASE}/sh/api/board?t=${TA}`)).json(); ok(board.top.length === 2 && board.top[0].n === 'Layla' && board.top[0].r === 1016 && board.top[0].me === 1, 'the board lists this season with you marked');
    ok(board.me && board.me.rank === 1 && board.me.w === 1, 'your line: rank 1, one win');
    await sleep(16000); ok(fs.existsSync(path.join(DATA, 'ratings.json')), 'ratings are snapshotted to disk');
    [a, b, ra, rb, intruder].forEach(w => { try { w.close(); } catch (x) { } });
  } catch (e) { console.log('ERROR', e.message); fail++; }
  srv.kill(); console.log(`shuhub-ranked: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
})();
