/* ديوانية — خادم الغرف المباشرة. بلا أي اعتماديات: Node 18+ فقط.
   التشغيل: node server.js   (المنفذ من PORT أو 3000)
   الخادم لا يعرف قواعد الألعاب: يحفظ آخر حالة لكل غرفة ويوصل الأحداث بين اللاعبين (SSE + POST).
   قائد الغرفة يشغّل منطق اللعبة، وإذا انقطع ينقل الخادم القيادة تلقائياً للاعب متصل. */
const { WebSocketServer } = require('ws');
const SKC = require('./public/js/strike-core.js');
const SH = require('./shuhub-server.js'); /* شُهُب: حصار القلعة */
const SS = require('./soulstack-server.js'); /* SOULSTACK: البرج اليومي المشترك */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public');
const MAX_BODY = 400 * 1024, MAX_ROOMS = 3000, IDLE_MS = 3 * 3600e3, HOST_GRACE = 12000;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const rooms = new Map();
const ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newCode = () => { for (;;) { let c = ''; for (const b of crypto.randomBytes(4)) c += ABC[b % ABC.length]; if (!rooms.has(c)) return c; } };
const key = () => crypto.randomBytes(12).toString('hex');

function send(res, ev, data) { res.write(`event: ${ev}\ndata: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`); }
function cast(room, ev, data, only, except) { for (const [pid, set] of room.conns) { if (only && pid !== only) continue; if (pid === except) continue; for (const r of set) send(r, ev, data); } }
const online = room => [...room.conns.keys()];
function presence(room) { cast(room, 'pres', { on: online(room), host: room.host }); }
function migrate(room) {
  room.timer = null; if (room.conns.has(room.host)) return;
  const next = online(room)[0]; if (!next) return;
  room.host = next; room.hk = key(); cast(room, 'hk', { hk: room.hk }, next); presence(room);
  for (const a of room.q.splice(0)) cast(room, 'act', a, next);
}
function body(req) {
  return new Promise((ok, no) => { let n = 0; const ch = []; req.on('data', c => { n += c.length; if (n > MAX_BODY) { no(413); req.destroy(); } else ch.push(c); }); req.on('end', () => ok(Buffer.concat(ch).toString('utf8'))); req.on('error', () => no(400)); });
}
const json = (res, code, o) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(o)); };
const validId = s => typeof s === 'string' && /^[\w-]{6,40}$/.test(s);
/* هوية اللاعب: يرسل المتصفح رمزاً سرياً (t) ويشتق الخادم منه المعرّف العلني، فلا يستطيع أحد انتحال معرّف غيره. */
const tokIds = new Map();
function pidOf(q) { const t = q.get('t'); if (typeof t !== 'string' || !/^[\w-]{16,64}$/.test(t)) return null; let id = tokIds.get(t); if (!id) { id = 'u' + crypto.createHash('sha256').update(t).digest('hex').slice(0, 12); if (tokIds.size > 50000) tokIds.clear(); tokIds.set(t, id); } return id; }
/* حدود الطلبات لكل عنوان */
const buckets = new Map();
const ipOf = req => String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
function over(ip, kind, limit, ms) { const k = kind + ip, t = Date.now(); let b = buckets.get(k); if (!b || t - b.t > ms) { b = { t, n: 0 }; buckets.set(k, b); } return ++b.n > limit; }
setInterval(() => { const t = Date.now(); for (const [k, b] of buckets) if (t - b.t > 120000) buckets.delete(k); }, 60000).unref();
function meta(room, o) { room.lock = !!o.lock; room.max = Math.max(2, Math.min(12, o.max | 0 || 12)); room.ban = new Set(Array.isArray(o.ban) ? o.ban.slice(0, 50) : []); room.members = new Set((Array.isArray(o.ps) ? o.ps : []).map(x => x && x.id)); room.n = room.members.size; room.ph = o.ph === 'game' ? 'game' : 'lobby'; room.gid = typeof o.gid === 'string' ? o.gid.slice(0, 20) : null; }
function admit(room, pid) { if (room.ban && room.ban.has(pid)) return 'banned'; if (pid === room.host || (room.members && room.members.has(pid))) return ''; if (room.lock) return 'locked'; if ((room.n || 0) >= (room.max || 12)) return 'full'; return ''; }
function closeRoom(room) { cast(room, 'closed', {}); for (const set of room.conns.values()) for (const r of set) try { r.end(); } catch (e) { } if (room.rt) for (const w of room.rt.values()) try { w.close(); } catch (e) { } if (room.timer) clearTimeout(room.timer); room.sim = null; rooms.delete(room.code); }

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'), q = u.searchParams, p = u.pathname;
  try {
    const ip = ipOf(req);
    if (p === '/healthz') return json(res, 200, { ok: 1, up: Math.round(process.uptime()) });
    if (p.startsWith('/ss/api/')) return SS.handle(req, res, p, q, ip, { json, body, over });
    if (p === '/shuhub') { res.writeHead(301, { Location: '/shuhub/' + u.search }); return res.end(); }
    if (p === '/soulstack') { res.writeHead(301, { Location: '/soulstack/' + u.search }); return res.end(); }
    if (p === '/api/ping') return json(res, 200, { ok: 1, rooms: rooms.size, id: pidOf(q), q: u.search.length });
    if (p === '/api/create' && req.method === 'POST') {
      const pid = pidOf(q); if (!pid) return json(res, 400, { err: 'bad id' });
      if (over(ip, 'c', 12, 60000)) return json(res, 429, { err: 'slow down' });
      if (rooms.size >= MAX_ROOMS) return json(res, 503, { err: 'full' });
      const room = { code: newCode(), host: pid, hk: key(), state: null, conns: new Map(), q: [], last: Date.now(), timer: null };
      rooms.set(room.code, room); return json(res, 200, { code: room.code, hk: room.hk });
    }
    if (p.startsWith('/api/')) {
      const room = rooms.get(String(q.get('c') || '').toUpperCase()), pid = pidOf(q);
      if (!room) { if (over(ip, 'm', 30, 60000)) return json(res, 429, { err: 'slow down' }); return json(res, 404, { err: 'no room' }); } if (!pid) return json(res, 400, { err: 'bad id' });
      if (over(ip, 'r', 900, 10000)) return json(res, 429, { err: 'slow down' });
      if (p === '/api/room') return json(res, 200, { ok: 1, n: room.n || 0, max: room.max || 12, ph: room.ph || 'lobby', gid: room.gid || null, no: admit(room, pid) });
      room.last = Date.now();
      if (p === '/api/ev') {
        const no = admit(room, pid); if (no) return json(res, 403, { err: no });
        res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
        res.write('retry: 2000\n\n');
        if (!room.conns.has(pid)) room.conns.set(pid, new Set()); room.conns.get(pid).add(res);
        if (room.state) send(res, 'state', room.state);
        presence(room);
        if (pid === room.host) { if (room.timer) { clearTimeout(room.timer); room.timer = null; } for (const a of room.q.splice(0)) send(res, 'act', a); }
        else if (!room.conns.has(room.host) && !room.timer) room.timer = setTimeout(() => migrate(room), HOST_GRACE);
        const hb = setInterval(() => res.write(': hb\n\n'), 20000);
        req.on('close', () => {
          clearInterval(hb); const s = room.conns.get(pid); if (s) { s.delete(res); if (!s.size) room.conns.delete(pid); }
          presence(room); if (pid === room.host && !room.conns.has(pid) && !room.timer) room.timer = setTimeout(() => migrate(room), HOST_GRACE);
        });
        return;
      }
      if (req.method !== 'POST') return json(res, 405, { err: 'method' });
      const b = await body(req);
      if (p === '/api/state') {
        if (pid !== room.host || q.get('k') !== room.hk) return json(res, 403, { err: 'not host' });
        meta(room, JSON.parse(b)); room.state = b; cast(room, 'state', b, null, pid);
        for (const id of room.ban) { const set = room.conns.get(id); if (set) for (const r of set) try { send(r, 'closed', { kick: 1 }); r.end(); } catch (e) { } const w = room.rt && room.rt.get(id); if (w) try { w.close(); } catch (e) { } }
        return json(res, 200, { ok: 1 });
      }
      if (p === '/api/close') {
        if (pid !== room.host || q.get('k') !== room.hk) return json(res, 403, { err: 'not host' });
        closeRoom(room); return json(res, 200, { ok: 1 });
      }
      if (p === '/api/act') {
        if (admit(room, pid)) return json(res, 403, { err: 'not member' });
        const a = JSON.stringify({ p: pid, a: JSON.parse(b) });
        if (room.conns.has(room.host)) cast(room, 'act', a, room.host); else if (room.q.length < 300) room.q.push(a);
        return json(res, 200, { ok: 1 });
      }
      return json(res, 404, { err: 'unknown' });
    }
    /* ملفات الواجهة */
    let f = path.normalize(path.join(PUB, decodeURIComponent(p.endsWith('/') ? p + 'index.html' : p)));
    if (!f.startsWith(PUB)) return json(res, 403, {});
    fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end('not found'); } res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); res.end(d); });
  } catch (e) { if (!res.headersSent) json(res, typeof e === 'number' ? e : 400, { err: 'bad request' }); }
});
/* محاكاة طخطخة تعمل هنا على الخادم: هو الحكم في الجولات والضرر والقنبلة والآليين */
function rtSend(room, m, to) { const out = `{"f":"*","m":${JSON.stringify(m)}}`; if (!room.rt) return; if (to) { const w = room.rt.get(to); if (w && w.readyState === 1) w.send(out); return; } for (const w of room.rt.values()) if (w.readyState === 1 && w.bufferedAmount < 1e6) w.send(out); }
function startSim(room, c) {
  if (!c || typeof c !== 'object' || (room.sim && room.sim.gk === c.gk && !room.sim.done)) return;
  if (!Array.isArray(c.ps) || c.ps.length < 2 || c.ps.length > 12 || !c.ps.every(validId) || !SKC.RAW[c.map]) return;
  const tm = {}, bots = {}; for (const id of c.ps) { tm[id] = c.tm && c.tm[id] ? 1 : 0; if (c.bots && c.bots[id]) bots[id] = 1; }
  room.sim = SKC.Sim({ gk: c.gk, ps: c.ps.slice(), tm, bots, map: c.map, target: [3, 5, 8].includes(c.target) ? c.target : 5, diff: [0, 1, 2].includes(c.diff) ? c.diff : 1, now: Date.now, connected: id => !!(room.rt && room.rt.has(id)), emit: (m, to) => rtSend(room, m, to) });
  for (const id of room.rt.keys()) room.sim.join(id);
}
setInterval(() => { const t = Date.now(); for (const r of rooms.values()) { if (!r.sim) continue; if (r.rt && r.rt.size) { r.simIdle = t; try { r.sim.tick(); } catch (e) { console.error('sim', e); r.sim = null; } } else if (t - (r.simIdle || t) > 120000) r.sim = null; else if (!r.simIdle) r.simIdle = t; } }, 50).unref();
/* قناة الوقت الحقيقي (WebSocket): مرحّل رسائل بين لاعبي الغرفة للألعاب السريعة. لا يُخزَّن شيء. */
const wss = new WebSocketServer({ noServer: true, maxPayload: 32 * 1024 });
server.on('upgrade', (req, sock, head) => {
  let u; try { u = new URL(req.url, 'http://x'); } catch (e) { return sock.destroy(); }
  if (u.pathname === '/sh/ws') return SH.upgrade(req, sock, head, u); /* شُهُب duels */
  if (u.pathname === '/ss/ws') return SS.upgrade(req, sock, head, u); /* SOULSTACK races */
  const room = rooms.get(String(u.searchParams.get('c') || '').toUpperCase()), pid = pidOf(u.searchParams);
  if (u.pathname !== '/ws' || !room || !pid || admit(room, pid) || !(room.members && room.members.has(pid))) return sock.destroy();
  wss.handleUpgrade(req, sock, head, ws => {
    room.rt = room.rt || new Map(); const old = room.rt.get(pid); if (old) try { old.close(); } catch (e) { }
    room.rt.set(pid, ws); ws.alive = true; ws.on('pong', () => { ws.alive = true; });
    if (room.sim) room.sim.join(pid);
    ws.on('message', (d, bin) => {
      const tt = Date.now(); if (tt - (ws.wT || 0) > 1000) { ws.wT = tt; ws.wN = 0; } if (++ws.wN > 120) return;   /* حد الرسائل لكل اتصال */
      if (bin) return; const s = d.toString(); if (s[0] !== '[') return; let q; try { q = JSON.parse(s); } catch (e) { return; }
      room.last = Date.now(); const t = q[0];
      if (t === 'init') { if (pid === room.host) startSim(room, q[1]); return; }
      if (room.sim) { if (t === 'p' || t === 'h' || t === 'buy' || t === 'pl' || t === 'df') { room.sim.msg(pid, q); if (t !== 'p') return; } else if (t === 'f') room.sim.heard(pid); }
      const out = `{"f":"${pid}","m":${s}}`;
      for (const [q2, w] of room.rt) if (q2 !== pid && w.readyState === 1 && w.bufferedAmount < 1e6) w.send(out);
    });
    ws.on('close', () => { if (room.rt.get(pid) === ws) room.rt.delete(pid); }); ws.on('error', () => { });
  });
});
setInterval(() => { for (const r of rooms.values()) if (r.rt) for (const w of r.rt.values()) { if (!w.alive) { try { w.terminate(); } catch (e) { } continue; } w.alive = false; try { w.ping(); } catch (e) { } } }, 25000).unref();
setInterval(() => { const t = Date.now(); for (const [c, r] of rooms) if (!r.conns.size && !(r.rt && r.rt.size) && t - r.last > IDLE_MS) rooms.delete(c); }, 600e3).unref();
process.on('uncaughtException', e => console.error('[uncaught]', e && e.stack || e)); process.on('unhandledRejection', e => console.error('[unhandled]', e));
server.listen(PORT, () => console.log('Diwaniya listening on http://localhost:' + PORT));
