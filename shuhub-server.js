/* شُهُب — duel rooms over WebSocket (/sh/ws). Up to 4 friends siege the same fort at the same time.
   Every brick you break repairs nothing for you — it rebuilds bricks in your friends' forts (a tug-of-war siege).
   First to break the lantern-heart wins. Duels use the base launcher (no workshop upgrades) so it's fair. */
const { WebSocketServer } = require('ws'); const crypto = require('crypto'); const fs = require('fs'), path = require('path'), os = require('os');
/* ranked: Elo ratings by player token, kept in memory and snapshotted to disk (SH_DATA). On Render's free plan the disk is
   wiped on redeploy/restart, so ratings are only as durable as that disk — a database would make them permanent. */
const DATA = process.env.SH_DATA || process.env.SS_DATA || path.join(os.tmpdir(), 'shuhub'); try { fs.mkdirSync(DATA, { recursive: true }); } catch (e) { }
const RFILE = path.join(DATA, 'ratings.json'); const ratings = new Map(); try { for (const [k, v] of JSON.parse(fs.readFileSync(RFILE, 'utf8'))) ratings.set(k, v); } catch (e) { }
let rDirty = 0; setInterval(() => { if (!rDirty) return; rDirty = 0; fs.writeFile(RFILE, JSON.stringify([...ratings].slice(-20000)), () => { }); }, 15000).unref();
const LEAGUES = [[0, 'bronze'], [1100, 'silver'], [1250, 'gold'], [1400, 'platinum'], [1550, 'diamond'], [1700, 'star']];
const leagueOf = r => LEAGUES.filter(([m]) => r >= m).pop()[1];
const season = () => new Date().toISOString().slice(0, 7); // a season per calendar month
const rec = (pid, n, h) => { let R = ratings.get(pid); if (!R || R.s !== season()) { R = { r: 1000, w: 0, l: 0, s: season(), n: n || 'رامي', h: h || 0, best: 1000 }; ratings.set(pid, R); } if (n) R.n = n; if (h != null) R.h = h; return R; };
const queue = new Map(); // pid -> { ws, n, h, r, at }
const SHC = require('./public/shuhub/core.js');
const wss = new WebSocketServer({ noServer: true, maxPayload: 4096 });
const rooms = new Map(), tok = new Map();
const pidOf = q => { const t = q.get('t'); if (typeof t !== 'string' || !/^[\w-]{16,64}$/.test(t)) return null; let id = tok.get(t); if (!id) { id = 'h' + crypto.createHash('sha256').update('sh:' + t).digest('hex').slice(0, 12); if (tok.size > 50000) tok.clear(); tok.set(t, id); } return id; };
const cleanName = s => String(s || '').replace(/[\u0000-\u001f\u007f<>&"'`\\]/g, '').trim().slice(0, 16) || 'رامي';
const cleanHue = h => ((h | 0) % 360 + 360) % 360;
const NLV = SHC.LEVELS.length, clampLv = n => Math.max(1, Math.min(NLV, n | 0 || 1));
const code5 = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c; do { c = Array.from({ length: 5 }, () => A[Math.floor(Math.random() * A.length)]).join(''); } while (rooms.has(c)); return c; };
const live = p => p.ws && p.ws.readyState === 1;
function rstate(R) { return { t: 'room', code: R.code, host: R.host, lv: R.lv, mode: R.mode, seed: R.seed || 0, sides: R.sides || {}, state: R.state, at: R.at || 0, now: Date.now(), players: [...R.players.values()].map(p => ({ id: p.id, n: p.n, h: p.h, hp: p.hp, sw: p.sw || 0, out: p.out || 0, on: live(p) ? 1 : 0 })) }; }
function bcast(R, m, skip) { const s = typeof m === 'string' ? m : JSON.stringify(m); for (const p of R.players.values()) if (p.id !== skip && live(p) && p.ws.bufferedAmount < 5e5) p.ws.send(s); }
function finish(R, winner) {
  if (R.state !== 'duel') return; R.state = 'done'; clearTimeout(R.timer);
  if (R.ranked && winner && R.players.size === 2) { // Elo, K = 32; a win against a stronger player is worth more
    const [a, b] = [...R.players.values()], ra = rec(a.id), rb = rec(b.id), ea = 1 / (1 + 10 ** ((rb.r - ra.r) / 400)), sa = a.id === winner ? 1 : 0, d = Math.round(32 * (sa - ea));
    ra.r += d; rb.r -= d; ra.best = Math.max(ra.best, ra.r); rb.best = Math.max(rb.best, rb.r); if (sa) { ra.w++; rb.l++; } else { rb.w++; ra.l++; } rDirty = 1;
    R.delta = { [a.id]: { d, r: ra.r, lg: leagueOf(ra.r) }, [b.id]: { d: -d, r: rb.r, lg: leagueOf(rb.r) } };
  }
  const res = [...R.players.values()].sort((a, b) => (b.id === winner) - (a.id === winner) || a.hp - b.hp).map((p, i) => ({ id: p.id, n: p.n, h: p.h, hp: Math.round(p.hp * 100), place: i + 1, broke: p.broke || 0, time: p.id === winner ? Math.round((Date.now() - R.at) / 100) / 10 : 0 }));
  bcast(R, { t: 'res', res, lv: R.lv, ranked: R.ranked ? 1 : 0, delta: R.delta || null }); bcast(R, rstate(R));
}
/* ranked matchmaking: a real queue of real players. Pairs the two closest ratings (the window widens while you wait). */
function makeRanked(A, B) {
  const code = code5(), R = { code, host: A.id, mode: 'war', ranked: 1, lv: 1 + Math.floor(Math.random() * 5), state: 'lobby', players: new Map(), last: Date.now(), allow: new Set([A.id, B.id]) }; rooms.set(code, R);
  for (const [X, Y] of [[A, B], [B, A]]) { try { X.ws.send(JSON.stringify({ t: 'match', code, foe: { n: Y.n, h: Y.h, r: Y.r, lg: leagueOf(Y.r) } })); X.ws.close(); } catch (e) { } }
  setTimeout(() => { if (R.state === 'lobby' && [...R.players.values()].filter(live).length < 2) { for (const p of R.players.values()) try { p.ws.send(JSON.stringify({ t: 'err', e: 'foeGone' })); } catch (e) { } } }, 15000);
}
function matchmake() { const now = Date.now(), q = [...queue.entries()].filter(([, e]) => e.ws.readyState === 1); for (const [k, e] of queue) if (e.ws.readyState !== 1) queue.delete(k);
  q.sort((a, b) => a[1].r - b[1].r); for (let i = 0; i + 1 < q.length; i++) { const [ia, A] = q[i], [ib, B] = q[i + 1], win = 100 + Math.min(600, (now - Math.min(A.at, B.at)) / 1000 * 25); if (Math.abs(A.r - B.r) <= win) { queue.delete(ia); queue.delete(ib); makeRanked({ id: ia, ...A }, { id: ib, ...B }); i++; } } }
setInterval(matchmake, 1000).unref();
function handle(req, res, u) { // GET /sh/api/board?t=TOKEN — this season's top 20 and your own line
  if (u.pathname !== '/sh/api/board') { res.writeHead(404); return res.end(); }
  const pid = pidOf(u.searchParams), s = season(), all = [...ratings.entries()].filter(([, R]) => R.s === s && R.w + R.l > 0).sort((a, b) => b[1].r - a[1].r);
  const top = all.slice(0, 20).map(([id, R], i) => ({ rank: i + 1, n: R.n, h: R.h, r: R.r, w: R.w, l: R.l, lg: leagueOf(R.r), me: id === pid ? 1 : 0 }));
  const mi = pid ? all.findIndex(([id]) => id === pid) : -1, mine = pid ? rec(pid) : null;
  res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify({ season: s, top, me: mine ? { rank: mi + 1, r: mine.r, w: mine.w, l: mine.l, lg: leagueOf(mine.r), best: mine.best } : null, queue: queue.size, players: all.length }));
}
function upgrade(req, sock, head, u) {
  const pid = pidOf(u.searchParams); if (!pid) return sock.destroy();
  if (u.searchParams.get('m') === 'ranked') return wss.handleUpgrade(req, sock, head, ws => { // join the queue
    const n = cleanName(u.searchParams.get('n')), h = cleanHue(u.searchParams.get('h')), R0 = rec(pid, n, h); const old = queue.get(pid); if (old) try { old.ws.close(); } catch (e) { }
    queue.set(pid, { ws, n, h, r: R0.r, at: Date.now() }); const tell = () => { try { ws.send(JSON.stringify({ t: 'queued', n: queue.size, r: R0.r, lg: leagueOf(R0.r), w: R0.w, l: R0.l })); } catch (e) { } }; tell(); const iv = setInterval(tell, 3000);
    ws.on('close', () => { clearInterval(iv); if (queue.get(pid) && queue.get(pid).ws === ws) queue.delete(pid); }); ws.on('message', () => { }); matchmake();
  });
  let code = String(u.searchParams.get('r') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5), R = rooms.get(code);
  const refuse = e => wss.handleUpgrade(req, sock, head, ws => { ws.send(JSON.stringify({ t: 'err', e })); ws.close(); });
  if (code && !R) return refuse('noroom');
  if (R && !R.players.has(pid) && R.players.size >= (R.mode === 'war' ? 2 : 4)) return refuse('full');
  if (R && !R.players.has(pid) && R.state === 'duel') return refuse('busy');
  if (R && R.allow && !R.allow.has(pid)) return refuse('full');
  if (!R) { if (rooms.size > 2000) return sock.destroy(); code = code5(); R = { code, host: pid, mode: u.searchParams.get('m') === 'war' ? 'war' : 'siege', lv: clampLv(u.searchParams.get('lv')), state: 'lobby', players: new Map(), last: Date.now() }; if (R.mode === 'war') R.lv = Math.max(1, Math.min(5, R.lv)); rooms.set(code, R); }
  wss.handleUpgrade(req, sock, head, ws => {
    let P = R.players.get(pid); if (P && P.ws) try { P.ws.close(); } catch (e) { }
    if (!P) { P = { id: pid, hp: 1 }; R.players.set(pid, P); }
    P.ws = ws; P.n = cleanName(u.searchParams.get('n')); P.h = cleanHue(u.searchParams.get('h')); R.last = Date.now();
    if (R.ranked) rec(pid, P.n, P.h);
    ws.send(JSON.stringify({ t: 'hello', me: pid, code: R.code, ranked: R.ranked ? 1 : 0 })); bcast(R, rstate(R));
    if (R.ranked && R.state === 'lobby' && [...R.players.values()].filter(live).length === 2) { // both arrived: the ranked war starts by itself
      const ids = [...R.allow]; R.sides = { [ids[0]]: 0, [ids[1]]: 1 }; R.seed = (Math.random() * 4e9) >>> 0; R.state = 'duel'; R.at = Date.now() + 4000; for (const p of R.players.values()) p.hp = 1;
      clearTimeout(R.timer); R.timer = setTimeout(() => finish(R, null), 4000 + 8 * 60 * 1000); bcast(R, rstate(R)); }
    ws.on('message', (d, bin) => {
      const now = Date.now(); if (now - (ws.wT || 0) > 1000) { ws.wT = now; ws.wN = 0; } if (++ws.wN > 30 || bin) return;
      let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (!m || typeof m.t !== 'string') return; R.last = now;
      if (m.t === 'lv' && pid === R.host && R.state !== 'duel') { R.lv = R.mode === 'war' ? Math.max(1, Math.min(5, m.lv | 0 || 1)) : clampLv(m.lv); bcast(R, rstate(R)); return; }
      if (m.t === 'go' && pid === R.host && R.state !== 'duel' && [...R.players.values()].filter(live).length >= (R.mode === 'war' ? 2 : 1)) {
        if (R.mode === 'war') { const ids = [...R.players.values()].filter(live).map(p => p.id); R.sides = { [ids[0]]: 0, [ids[1]]: 1 }; R.seed = (Math.random() * 4e9) >>> 0; }
        R.state = 'duel'; R.at = now + 3500; for (const p of R.players.values()) { p.hp = 1; p.sw = 0; p.out = 0; p.broke = 0; p.last = 0; }
        clearTimeout(R.timer); R.timer = setTimeout(() => finish(R, null), 3500 + 5 * 60 * 1000); bcast(R, rstate(R)); return;
      }
      if (m.t === 'again' && pid === R.host && R.state === 'done' && !R.ranked) { R.state = 'lobby'; bcast(R, rstate(R)); return; }
      if (m.t === 'emo' && ['👋', '😂', '🔥', '😱', '💥', '🏆'].includes(m.e)) { bcast(R, { t: 'emo', id: pid, e: m.e }); return; }
      if (R.state !== 'duel' || now < R.at - 300) return;
      if (R.mode === 'war') { // mountain war: relay shots and the defender's own castle state; the defender declares their own fall
        const side = R.sides[pid]; if (side == null) return;
        if (m.t === 'fire' && ['swarm', 'fire', 'boulder', 'dune', 'star'].includes(m.w) && isFinite(+m.a) && isFinite(+m.p) && Number.isInteger(m.k)) { bcast(R, { t: 'fire', side, k: m.k, a: +m.a, p: +m.p, w: m.w, s: m.s >>> 0 }, pid); return; }
        if (m.t === 'cs' && m.pk && Array.isArray(m.pk.hp) && m.pk.hp.length <= 120) { P.hp = Math.max(0, Math.min(1, +m.f || 0)); bcast(R, { t: 'cs', side, pk: { hp: m.pk.hp.map(v => +v || 0), core: +m.pk.core || 0 } }, pid); return; }
        if (m.t === 'dead') { P.hp = 0; const other = [...R.players.values()].find(p => p.id !== pid); finish(R, other ? other.id : null); return; }
        return;
      }
      if (m.t === 'st') { // status: heart left (0..1, can only go down), swarm size, bricks broken since last message → rebuild the others' forts
        const hp = Math.max(0, Math.min(1, +m.hp)), sw = Math.max(0, Math.min(1e7, +m.sw | 0)), b = Math.max(0, Math.min(40, m.b | 0));
        if (isFinite(hp)) P.hp = Math.min(P.hp, hp); P.sw = sw; P.broke = (P.broke || 0) + b; if (m.out) P.out = 1;
        if (b) bcast(R, { t: 'atk', from: pid, n: b }, pid);
        bcast(R, JSON.stringify({ t: 'pl', id: pid, hp: P.hp, sw, out: P.out ? 1 : 0 }), pid);
        if ([...R.players.values()].every(p => p.out || !live(p))) finish(R, null); return;
      }
      if (m.t === 'win') { if ((now - R.at) / 1000 < 3 || P.hp > .02) { ws.send(JSON.stringify({ t: 'err', e: 'nowin' })); return; } finish(R, pid); return; } /* referee: your reported heart must be broken */
    });
    ws.on('close', () => { R.last = Date.now(); if (R.mode === 'war' && R.state === 'duel') { const other = [...R.players.values()].find(p => p.id !== pid && live(p)); if (other) finish(R, other.id); } if (R.host === pid) { const nx = [...R.players.values()].find(p => p.id !== pid && live(p)); if (nx) R.host = nx.id; } bcast(R, rstate(R)); if (R.state === 'duel' && [...R.players.values()].every(p => p.out || !live(p))) finish(R, null); });
  });
}
setInterval(() => { const t = Date.now(); for (const [k, R] of rooms) if (![...R.players.values()].some(live) && t - R.last > 120000) { clearTimeout(R.timer); rooms.delete(k); } }, 30000).unref();
module.exports = { upgrade, handle, _rooms: rooms, _ratings: ratings, _queue: queue, leagueOf };
