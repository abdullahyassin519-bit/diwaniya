/* ديوانية — خادم الغرف المباشرة. بلا أي اعتماديات: Node 18+ فقط.
   التشغيل: node server.js   (المنفذ من PORT أو 3000)
   الخادم لا يعرف قواعد الألعاب: يحفظ آخر حالة لكل غرفة ويوصل الأحداث بين اللاعبين (SSE + POST).
   قائد الغرفة يشغّل منطق اللعبة، وإذا انقطع ينقل الخادم القيادة تلقائياً للاعب متصل. */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public');
const MAX_BODY = 400 * 1024, MAX_ROOMS = 3000, IDLE_MS = 3 * 3600e3, HOST_GRACE = 12000;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' };
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

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'), q = u.searchParams, p = u.pathname;
  try {
    if (p === '/api/ping') return json(res, 200, { ok: 1, rooms: rooms.size });
    if (p === '/api/create' && req.method === 'POST') {
      const pid = q.get('p'); if (!validId(pid)) return json(res, 400, { err: 'bad id' });
      if (rooms.size >= MAX_ROOMS) return json(res, 503, { err: 'full' });
      const room = { code: newCode(), host: pid, hk: key(), state: null, conns: new Map(), q: [], last: Date.now(), timer: null };
      rooms.set(room.code, room); return json(res, 200, { code: room.code, hk: room.hk });
    }
    if (p.startsWith('/api/')) {
      const room = rooms.get(String(q.get('c') || '').toUpperCase()), pid = q.get('p');
      if (!room) return json(res, 404, { err: 'no room' }); if (!validId(pid)) return json(res, 400, { err: 'bad id' });
      room.last = Date.now();
      if (p === '/api/ev') {
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
        JSON.parse(b); room.state = b; cast(room, 'state', b, null, pid); return json(res, 200, { ok: 1 });
      }
      if (p === '/api/act') {
        const a = JSON.stringify({ p: pid, a: JSON.parse(b) });
        if (room.conns.has(room.host)) cast(room, 'act', a, room.host); else if (room.q.length < 300) room.q.push(a);
        return json(res, 200, { ok: 1 });
      }
      return json(res, 404, { err: 'unknown' });
    }
    /* ملفات الواجهة */
    let f = path.normalize(path.join(PUB, decodeURIComponent(p === '/' ? '/index.html' : p)));
    if (!f.startsWith(PUB)) return json(res, 403, {});
    fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end('not found'); } res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); res.end(d); });
  } catch (e) { if (!res.headersSent) json(res, typeof e === 'number' ? e : 400, { err: 'bad request' }); }
});
setInterval(() => { const t = Date.now(); for (const [c, r] of rooms) if (!r.conns.size && t - r.last > IDLE_MS) rooms.delete(c); }, 600e3).unref();
server.listen(PORT, () => console.log('Diwaniya listening on http://localhost:' + PORT));
