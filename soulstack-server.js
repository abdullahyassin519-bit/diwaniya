/* SOULSTACK server: one shared tower per UTC day. The server is the authority on souls, bodies (blocks) and credit.
   Everything lives in memory and is snapshotted to disk (SS_DATA, default: OS temp) so a restart keeps today's tower when the disk survives. */
const C = require('./public/soulstack/core.js');
const fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');
const DATA = process.env.SS_DATA || path.join(os.tmpdir(), 'soulstack');
try { fs.mkdirSync(DATA, { recursive: true }); } catch (e) { }

const days = new Map(); // day -> D
function load(day) {
  let D = days.get(day); if (D) return D;
  D = { day, seed: C.daySeed(day), world: C.World(C.daySeed(day)), blocks: [], cells: new Map(), byId: new Map(), players: new Map(), seq: 0, dirty: false };
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(DATA, day + '.json'), 'utf8'));
    for (const b of raw.blocks || []) { D.blocks.push(b); D.cells.set(C.bkey(b.x, b.y), b); D.byId.set(b.i, b); D.seq = Math.max(D.seq, b.i); }
    for (const [pid, p] of raw.players || []) D.players.set(pid, { ...p, stepped: new Set(p.stepped || []) });
  } catch (e) { }
  days.set(day, D); for (const k of days.keys()) if (k < day && days.size > 2) days.delete(k);
  return D;
}
function save(D) { if (!D.dirty) return; D.dirty = false; const out = { blocks: D.blocks, players: [...D.players].map(([k, p]) => [k, { ...p, stepped: [...p.stepped].slice(-3000) }]) }; fs.writeFile(path.join(DATA, D.day + '.json'), JSON.stringify(out), () => { }); }
setInterval(() => { for (const D of days.values()) save(D); }, 15000).unref();

const tok = new Map();
function pidOf(q) { const t = q.get('t'); if (typeof t !== 'string' || !/^[\w-]{16,64}$/.test(t)) return null; let id = tok.get(t); if (!id) { id = 's' + crypto.createHash('sha256').update('ss:' + t).digest('hex').slice(0, 12); if (tok.size > 50000) tok.clear(); tok.set(t, id); } return id; }
const cleanName = s => String(s || '').replace(/[\u0000-\u001f\u007f<>&"'`\\]/g, '').trim().slice(0, 16) || 'Wanderer';
const cleanHue = h => ((h | 0) % 360 + 360) % 360;
function player(D, pid, b) {
  let p = D.players.get(pid); if (!p) { p = { n: 'Wanderer', h: 200, souls: C.SOULS, best: 0, helped: 0, stepped: new Set(), last: 0, lastDie: 0, rep: 0 }; D.players.set(pid, p); }
  if (b && b.n) p.n = cleanName(b.n); if (b && b.h != null) p.h = cleanHue(b.h);
  p.last = Date.now(); return p;
}
const pub = b => [b.i, b.x, b.y, b.n, b.h, b.s, b.c, b.o];
function frontier(D) { let f = 0; for (const p of D.players.values()) f = Math.max(f, p.best); return f; }

async function handle(req, res, p, q, ip, H) {
  const { json, body, over } = H, day = C.dayKey(), D = load(day);
  if (p === '/ss/api/board') {
    if (over(ip, 'ssb', 60, 60000)) return json(res, 429, { err: 'slow down' });
    const ps = [...D.players.values()];
    return json(res, 200, { day, height: ps.filter(x => x.best > 0).sort((a, b) => b.best - a.best).slice(0, 20).map(x => ({ n: x.n, h: x.h, v: x.best })), helpers: ps.filter(x => x.helped > 0).sort((a, b) => b.helped - a.helped).slice(0, 20).map(x => ({ n: x.n, h: x.h, v: x.helped })), souls: D.blocks.length, climbers: ps.length });
  }
  const pid = pidOf(q); if (!pid) return json(res, 400, { err: 'bad id' });
  if (over(ip, 'ss', 240, 60000)) return json(res, 429, { err: 'slow down' });
  if (p === '/ss/api/state') {
    const P = player(D, pid), since = Math.max(0, q.get('since') | 0), now = Date.now();
    let climbers = 0; for (const x of D.players.values()) if (now - x.last < 120000) climbers++;
    const bl = since >= D.seq ? [] : D.blocks.filter(b => b.i > since).slice(0, 4000);
    return json(res, 200, { day, seed: D.seed, now, me: pid, souls: P.souls, best: P.best, helped: P.helped, mine: D.blocks.filter(b => b.o === pid).length, total: D.blocks.length, frontier: frontier(D), climbers, seq: bl.length ? bl[bl.length - 1].i : D.seq, more: bl.length === 4000, blocks: bl.map(pub) });
  }
  if (req.method !== 'POST') return json(res, 405, { err: 'method' });
  let b; try { b = JSON.parse(await body(req) || '{}'); } catch (e) { return json(res, 400, { err: 'json' }); }
  if (b.day && b.day !== day) return json(res, 409, { err: 'new day', day });
  const P = player(D, pid, b), now = Date.now();
  /* best height: you can't climb faster than physics allows since your last report */
  const climb = () => { const h = Math.max(0, Math.floor(+b.best || 0)), dt = Math.max(1, (now - (P.rep || now - 30000)) / 1000), cap = P.best + 12 + dt * 7; if (h > P.best) { P.best = Math.min(h, Math.floor(cap)); D.dirty = true; } P.rep = now; };
  if (p === '/ss/api/prog') { // best height + steps on other people's bodies
    climb(); let credited = 0;
    if (Array.isArray(b.steps)) for (const id of b.steps.slice(0, 60)) { const bl = D.byId.get(id | 0); if (!bl || bl.o === pid || P.stepped.has(bl.i)) continue; if (Math.abs(bl.y - P.best) > 400) continue; P.stepped.add(bl.i); bl.s++; credited++; const o = D.players.get(bl.o); if (o) o.helped++; D.dirty = true; }
    return json(res, 200, { ok: 1, best: P.best, credited, souls: P.souls, helped: P.helped });
  }
  if (p === '/ss/api/die') {
    if (P.souls <= 0) return json(res, 403, { err: 'no souls', souls: 0 });
    if (b.best != null) climb();
    if (now - P.lastDie < 700) return json(res, 429, { err: 'too fast' });
    const x = b.x | 0, y = b.y | 0, c = ['sac', 'spike', 'saw'].includes(b.c) ? b.c : null;
    if (!c || x < 1 || x > 12 || y < 0 || y > P.best + 9 || y > D.world.top() + 50) return json(res, 400, { err: 'bad body' });
    D.world.ensure(y + 10);
    if (c === 'spike' && !D.world.spike(x, y)) return json(res, 400, { err: 'no spike there' });
    const cell = c === 'spike' && !D.cells.has(C.bkey(x, y)) ? { x, y } : C.bodyCell(D.world, D.cells, { x, y });
    const bl = { i: ++D.seq, x: cell.x, y: cell.y, n: P.n, h: P.h, s: 0, c, o: pid, t: now };
    D.blocks.push(bl); D.cells.set(C.bkey(bl.x, bl.y), bl); D.byId.set(bl.i, bl);
    P.souls--; P.lastDie = now; D.dirty = true;
    return json(res, 200, { ok: 1, block: pub(bl), souls: P.souls });
  }
  return json(res, 404, { err: 'unknown' });
}
module.exports = { handle, _days: days, _load: load };

/* ===================== Races with friends: /ss/ws?r=CODE (no code → a new room, you host) =====================
   Each player simulates their own climb (nobody pushes anybody), the server relays positions, shares bodies, and referees the finish. */
const { WebSocketServer } = require('ws');
const SSL = require('./public/soulstack/levels.js');
const rwss = new WebSocketServer({ noServer: true, maxPayload: 8 * 1024 });
const races = new Map();
const code5 = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c; do { c = Array.from({ length: 5 }, () => A[Math.floor(Math.random() * A.length)]).join(''); } while (races.has(c)); return c; };
const LV = n => SSL.LEVELS[Math.max(1, Math.min(SSL.LEVELS.length, n | 0)) - 1];
function rstate(R) { return { t: 'room', code: R.code, host: R.host, lv: R.lv, state: R.state, at: R.at || 0, now: Date.now(), players: [...R.players.values()].map(p => ({ id: p.id, n: p.n, h: p.h, fin: p.fin || 0, place: p.place || 0, y: Math.floor(p.maxY || 0), on: p.ws && p.ws.readyState === 1 ? 1 : 0 })), bodies: R.state === 'lobby' ? [] : R.bodies.slice(-400) }; }
function bcast(R, m, skip) { const s = typeof m === 'string' ? m : JSON.stringify(m); for (const p of R.players.values()) if (p.id !== skip && p.ws && p.ws.readyState === 1 && p.ws.bufferedAmount < 5e5) p.ws.send(s); }
function finishRace(R) {
  if (R.state !== 'race') return; R.state = 'done'; clearTimeout(R.timer);
  const res = [...R.players.values()].sort((a, b) => (a.fin || 1e12) - (b.fin || 1e12) || (b.maxY || 0) - (a.maxY || 0)).map((p, i) => ({ id: p.id, n: p.n, h: p.h, time: p.fin || 0, y: Math.floor(p.maxY || 0), place: i + 1 }));
  R.results = res; bcast(R, { t: 'res', res, lv: R.lv }); bcast(R, rstate(R));
}
function upgrade(req, sock, head, u) {
  const pid = pidOf(u.searchParams); if (!pid) return sock.destroy();
  let code = String(u.searchParams.get('r') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5), R = races.get(code);
  if (code && !R) return rwss.handleUpgrade(req, sock, head, ws => { ws.send(JSON.stringify({ t: 'err', e: 'noroom' })); ws.close(); });
  if (R && !R.players.has(pid) && R.players.size >= 8) return rwss.handleUpgrade(req, sock, head, ws => { ws.send(JSON.stringify({ t: 'err', e: 'full' })); ws.close(); });
  if (!R) { if (races.size > 2000) return sock.destroy(); code = code5(); R = { code, host: pid, lv: Math.max(1, Math.min(12, u.searchParams.get('lv') | 0 || 1)), state: 'lobby', players: new Map(), bodies: [], last: Date.now() }; races.set(code, R); }
  rwss.handleUpgrade(req, sock, head, ws => {
    let P = R.players.get(pid); if (P && P.ws) try { P.ws.close(); } catch (e) { }
    if (!P) { P = { id: pid, n: 'Wanderer', h: 200, maxY: 0, fin: 0, place: 0 }; R.players.set(pid, P); }
    P.ws = ws; P.n = cleanName(u.searchParams.get('n')); P.h = cleanHue(u.searchParams.get('h') | 0); R.last = Date.now();
    ws.send(JSON.stringify({ t: 'hello', me: pid, code: R.code })); bcast(R, rstate(R));
    ws.on('message', (d, bin) => {
      const now = Date.now(); if (now - (ws.wT || 0) > 1000) { ws.wT = now; ws.wN = 0; } if (++ws.wN > 40 || bin) return;
      let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (!m || typeof m.t !== 'string') return; R.last = now;
      if (m.t === 'lv' && pid === R.host && R.state !== 'race') { R.lv = Math.max(1, Math.min(12, m.lv | 0)); bcast(R, rstate(R)); return; }
      if (m.t === 'go' && pid === R.host && R.state !== 'race') {
        R.state = 'race'; R.at = now + 3500; R.bodies = []; R.results = null; for (const p of R.players.values()) { p.maxY = 0; p.fin = 0; p.place = 0; p.lastY = 0; p.lastT = R.at; }
        const L = LV(R.lv); clearTimeout(R.timer); R.timer = setTimeout(() => finishRace(R), 3500 + L.T * 1000 + 1500); bcast(R, rstate(R)); return;
      }
      if (m.t === 'again' && pid === R.host && R.state === 'done') { R.state = 'lobby'; R.bodies = []; bcast(R, rstate(R)); return; }
      if (m.t === 'emo' && typeof m.e === 'string' && ['👋', '😂', '🔥', '😱', '💀', '🏆'].includes(m.e)) { bcast(R, { t: 'emo', id: pid, e: m.e }); return; }
      if (R.state !== 'race' || now < R.at - 200) return;
      if (m.t === 'p') { // position: relay, and track the height you really reached (can't rise faster than a leap allows)
        const y = +m.y, x = +m.x; if (!isFinite(x) || !isFinite(y)) return;
        const dt = Math.max(.05, (now - (P.lastT || R.at)) / 1000), cap = (P.lastY || 0) + 4.8 + dt * 18; const yy = Math.min(y, cap);
        if (yy > P.maxY) P.maxY = yy; P.lastY = Math.max(0, yy); P.lastT = now;
        bcast(R, JSON.stringify({ t: 'p', id: pid, x: +x.toFixed(2), y: +y.toFixed(2), vx: +(+m.vx || 0).toFixed(1), vy: +(+m.vy || 0).toFixed(1), g: m.g ? 1 : 0, s: m.s ? 1 : 0 }), pid); return;
      }
      if (m.t === 'die') { const x = m.x | 0, y = m.y | 0, c = ['sac', 'spike', 'saw', 'mon'].includes(m.c) ? m.c : 'sac'; if (x < 1 || x > 12 || y < 0 || y > (P.maxY || 0) + 9 || R.bodies.length > 600) return; const b = { x, y, n: P.n, h: P.h, c, o: pid, i: R.bodies.length + 1 }; R.bodies.push(b); bcast(R, { t: 'body', b }); return; }
      if (m.t === 'fin' && !P.fin) {
        const L = LV(R.lv), el = (now - R.at) / 1000;
        if (P.maxY < L.H - .5 || el < L.H / 9) { ws.send(JSON.stringify({ t: 'err', e: 'nofin' })); return; } /* referee: you must really have climbed there */
        P.fin = Math.round(el * 100) / 100; P.place = [...R.players.values()].filter(p => p.fin).length; bcast(R, { t: 'fin', id: pid, time: P.fin, place: P.place, n: P.n });
        if ([...R.players.values()].every(p => p.fin || !(p.ws && p.ws.readyState === 1))) finishRace(R); else bcast(R, rstate(R));
      }
    });
    ws.on('close', () => { R.last = Date.now(); if (R.host === pid) { const nx = [...R.players.values()].find(p => p.id !== pid && p.ws && p.ws.readyState === 1); if (nx) R.host = nx.id; } bcast(R, rstate(R)); if (R.state === 'race' && [...R.players.values()].every(p => p.fin || !(p.ws && p.ws.readyState === 1))) finishRace(R); });
  });
}
setInterval(() => { const t = Date.now(); for (const [k, R] of races) { const live = [...R.players.values()].some(p => p.ws && p.ws.readyState === 1); if (!live && t - R.last > 120000) { clearTimeout(R.timer); races.delete(k); } } }, 30000).unref();
module.exports.upgrade = upgrade; module.exports._races = races;
