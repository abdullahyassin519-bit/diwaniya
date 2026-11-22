/* شُهُب — duel rooms over WebSocket (/sh/ws). Up to 4 friends siege the same fort at the same time.
   Every brick you break repairs nothing for you — it rebuilds bricks in your friends' forts (a tug-of-war siege).
   First to break the lantern-heart wins. Duels use the base launcher (no workshop upgrades) so it's fair. */
const { WebSocketServer } = require('ws'); const crypto = require('crypto');
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
  const res = [...R.players.values()].sort((a, b) => (b.id === winner) - (a.id === winner) || a.hp - b.hp).map((p, i) => ({ id: p.id, n: p.n, h: p.h, hp: Math.round(p.hp * 100), place: i + 1, broke: p.broke || 0, time: p.id === winner ? Math.round((Date.now() - R.at) / 100) / 10 : 0 }));
  bcast(R, { t: 'res', res, lv: R.lv }); bcast(R, rstate(R));
}
function upgrade(req, sock, head, u) {
  const pid = pidOf(u.searchParams); if (!pid) return sock.destroy();
  let code = String(u.searchParams.get('r') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5), R = rooms.get(code);
  const refuse = e => wss.handleUpgrade(req, sock, head, ws => { ws.send(JSON.stringify({ t: 'err', e })); ws.close(); });
  if (code && !R) return refuse('noroom');
  if (R && !R.players.has(pid) && R.players.size >= (R.mode === 'war' ? 2 : 4)) return refuse('full');
  if (R && !R.players.has(pid) && R.state === 'duel') return refuse('busy');
  if (!R) { if (rooms.size > 2000) return sock.destroy(); code = code5(); R = { code, host: pid, mode: u.searchParams.get('m') === 'war' ? 'war' : 'siege', lv: clampLv(u.searchParams.get('lv')), state: 'lobby', players: new Map(), last: Date.now() }; if (R.mode === 'war') R.lv = Math.max(1, Math.min(4, R.lv)); rooms.set(code, R); }
  wss.handleUpgrade(req, sock, head, ws => {
    let P = R.players.get(pid); if (P && P.ws) try { P.ws.close(); } catch (e) { }
    if (!P) { P = { id: pid, hp: 1 }; R.players.set(pid, P); }
    P.ws = ws; P.n = cleanName(u.searchParams.get('n')); P.h = cleanHue(u.searchParams.get('h')); R.last = Date.now();
    ws.send(JSON.stringify({ t: 'hello', me: pid, code: R.code })); bcast(R, rstate(R));
    ws.on('message', (d, bin) => {
      const now = Date.now(); if (now - (ws.wT || 0) > 1000) { ws.wT = now; ws.wN = 0; } if (++ws.wN > 30 || bin) return;
      let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (!m || typeof m.t !== 'string') return; R.last = now;
      if (m.t === 'lv' && pid === R.host && R.state !== 'duel') { R.lv = R.mode === 'war' ? Math.max(1, Math.min(4, m.lv | 0 || 1)) : clampLv(m.lv); bcast(R, rstate(R)); return; }
      if (m.t === 'go' && pid === R.host && R.state !== 'duel' && [...R.players.values()].filter(live).length >= (R.mode === 'war' ? 2 : 1)) {
        if (R.mode === 'war') { const ids = [...R.players.values()].filter(live).map(p => p.id); R.sides = { [ids[0]]: 0, [ids[1]]: 1 }; R.seed = (Math.random() * 4e9) >>> 0; }
        R.state = 'duel'; R.at = now + 3500; for (const p of R.players.values()) { p.hp = 1; p.sw = 0; p.out = 0; p.broke = 0; p.last = 0; }
        clearTimeout(R.timer); R.timer = setTimeout(() => finish(R, null), 3500 + 5 * 60 * 1000); bcast(R, rstate(R)); return;
      }
      if (m.t === 'again' && pid === R.host && R.state === 'done') { R.state = 'lobby'; bcast(R, rstate(R)); return; }
      if (m.t === 'emo' && ['👋', '😂', '🔥', '😱', '💥', '🏆'].includes(m.e)) { bcast(R, { t: 'emo', id: pid, e: m.e }); return; }
      if (R.state !== 'duel' || now < R.at - 300) return;
      if (R.mode === 'war') { // mountain war: relay shots and the defender's own castle state; the defender declares their own fall
        const side = R.sides[pid]; if (side == null) return;
        if (m.t === 'fire' && ['swarm', 'fire', 'boulder'].includes(m.w) && isFinite(+m.a) && isFinite(+m.p) && Number.isInteger(m.k)) { bcast(R, { t: 'fire', side, k: m.k, a: +m.a, p: +m.p, w: m.w, s: m.s >>> 0 }, pid); return; }
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
module.exports = { upgrade, _rooms: rooms };
