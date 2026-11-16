/* طخطخة — تصويب بمنظور الشخص الأول بين فريقين (حتى 6 ضد 6). القائد يحكم الجولات، وكل لاعب يحكم حركته وتصويبه. */
(function () {
  const { esc } = U, RAD = .25, EYE = .55, WH = 1.4, UNIT = 485;
  const TN = ['المهاجمون', 'المدافعون'], TC = ['#e8662a', '#3b82f6'];
  const FREEZE = 7000, ROUND = 110000, ENDT = 5000, BOMB = 38000;
  const WP = {
    pistol: { n: 'مسدس', $: 0, dmg: 26, rate: 260, mag: 12, rel: 1300, sp: .018, auto: 0, len: 70 },
    smg: { n: 'رشاش خفيف', $: 1200, dmg: 18, rate: 80, mag: 30, rel: 1800, sp: .045, auto: 1, len: 95 },
    shotgun: { n: 'شوزن', $: 1700, dmg: 13, pel: 7, rate: 800, mag: 6, rel: 2300, sp: .1, auto: 0, len: 118 },
    rifle: { n: 'رشاش AK', $: 2700, dmg: 31, rate: 105, mag: 30, rel: 2100, sp: .024, auto: 1, len: 125 },
    sniper: { n: 'قناص', $: 4200, dmg: 95, rate: 1250, mag: 5, rel: 2800, sp: .002, auto: 0, zoom: 1, len: 150 },
  };
  const RAW = {
    'الحارة': { sky: ['#e9a45c', '#fbe3b8'], fl: ['#d6b47c', '#a8834f'], wl: { 1: [206, 166, 112], 2: [172, 110, 70], 3: [128, 96, 60] }, rows: [
      '1111111111111111111111111111',
      '1TTT....1......2.....1..aaa1',
      '1TTT....1..33..2.....1..aaa1',
      '1TTT.......33........1..aaa1',
      '1.......1.........2........1',
      '1..11111111..1111.2..111..11',
      '1.......2....1........1....1',
      '1.......2....1..33....1.CCC1',
      '111..1..2..........1....CCC1',
      '1....1.....111.....1....CCC1',
      '1....1.....111..2..1.......1',
      '1..331..2.......2....11..111',
      '1..33...2..1....2..........1',
      '1.......2..1.........3.....1',
      '11.111.....1..22222..3..1..1',
      '1......1...............1...1',
      '1bbb...1....33.....1...1...1',
      '1bbb.......33......1.......1',
      '1bbb...1...........1.......1',
      '1111111111111111111111111111'] },
    'المستودع': { sky: ['#2c333f', '#5d6673'], fl: ['#7d848e', '#494e56'], wl: { 1: [124, 134, 146], 2: [178, 86, 62], 3: [156, 120, 64] }, rows: [
      '11111111111111111111111111',
      '1TTT....3.....2......aaa.1',
      '1TTT....3.....2......aaa.1',
      '1TTT..........2..33..aaa.1',
      '1.....222.........33.....1',
      '1.....2......3...........1',
      '111...2..33..3...2222..111',
      '1.........33.....2.......1',
      '1...3............2.......1',
      '1...3...2222..........CCC1',
      '1.......2.......33....CCC1',
      '111.............33....CCC1',
      '1....33...2..............1',
      '1....33...2....222...3...1',
      '1.bbb.....2..........3...1',
      '1.bbb..3.......2.........1',
      '1.bbb..3.......2.....33..1',
      '11111111111111111111111111'] },
    'القلعة': { sky: ['#6ea8e4', '#d8ebfb'], fl: ['#8fb57c', '#4c7648'], wl: { 1: [156, 156, 150], 2: [112, 118, 124], 3: [146, 102, 62] }, rows: [
      '1111111111111111111111111111',
      '1TTT...2............2...CCC1',
      '1TTT...2..11111111..2...CCC1',
      '1TTT......1aaaaaa1......CCC1',
      '1......2..1aaaaaa1..2......1',
      '1222..22..11.aa.11..22..2221',
      '1..........................1',
      '1....33......22......33....1',
      '1....33......22......33....1',
      '1..........................1',
      '1222..22..11.bb.11..22..2221',
      '1......2..1bbbbbb1..2......1',
      '1.........1bbbbbb1.........1',
      '1......2..11111111..2......1',
      '1......2............2......1',
      '1111111111111111111111111111'] },
  };
  const MC = {};
  function parseMap(name) {
    if (MC[name]) return MC[name]; const r = RAW[name], h = r.rows.length, w = Math.max(...r.rows.map(x => x.length));
    const m = { name, w, h, g: new Uint8Array(w * h), st: new Uint8Array(w * h), sp: [[], []], sc: {}, raw: r, fc: new Map() }, acc = { a: [0, 0, 0], b: [0, 0, 0] };
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let c = r.rows[y][x] || '1'; if ((!x || !y || x === w - 1 || y === h - 1) && !(c >= '1' && c <= '3')) c = '1';
      if (c >= '1' && c <= '3') m.g[y * w + x] = +c; else if (c === 'T') m.sp[0].push([x + .5, y + .5]); else if (c === 'C') m.sp[1].push([x + .5, y + .5]);
      else if (c === 'a' || c === 'b') { m.st[y * w + x] = c === 'a' ? 1 : 2; acc[c][0] += x + .5; acc[c][1] += y + .5; acc[c][2]++; }
    }
    for (const k of ['a', 'b']) { let bx = 0, by = 0, bd = 1e9; const ax = acc[k][0] / acc[k][2], ay = acc[k][1] / acc[k][2]; for (let i = 0; i < w * h; i++) if (m.st[i] === (k === 'a' ? 1 : 2)) { const x = i % w + .5, y = (i / w | 0) + .5, d = Math.hypot(x - ax, y - ay); if (d < bd) { bd = d; bx = x; by = y; } } m.sc[k] = [bx, by]; }
    return MC[name] = m;
  }
  const RC = { d: 0, k: 0, side: 0, wx: 0 };
  function cast(m, x, y, rx, ry) {      /* DDA: مع متجه وحدة يعيد المسافة الحقيقية، ومع متجه الكاميرا يعيد المسافة العمودية */
    let mx = x | 0, my = y | 0, side = 0, k = 0; const ddx = rx ? Math.abs(1 / rx) : 1e30, ddy = ry ? Math.abs(1 / ry) : 1e30, sx = rx < 0 ? -1 : 1, sy = ry < 0 ? -1 : 1;
    let sdx = rx < 0 ? (x - mx) * ddx : (mx + 1 - x) * ddx, sdy = ry < 0 ? (y - my) * ddy : (my + 1 - y) * ddy;
    for (let i = 0; i < 80; i++) { if (sdx < sdy) { sdx += ddx; mx += sx; side = 0; } else { sdy += ddy; my += sy; side = 1; } if (mx < 0 || my < 0 || mx >= m.w || my >= m.h) { k = 1; break; } k = m.g[my * m.w + mx]; if (k) break; }
    const d = side ? sdy - ddy : sdx - ddx; RC.d = d; RC.k = k || 1; RC.side = side; const wx = side ? x + d * rx : y + d * ry; RC.wx = wx - Math.floor(wx); return d;
  }
  function los(m, x1, y1, x2, y2) { const d = Math.hypot(x2 - x1, y2 - y1); if (d < .01) return true; return cast(m, x1, y1, (x2 - x1) / d, (y2 - y1) / d) >= d - .05; }
  const solid = (m, x, y) => x < 0 || y < 0 || x >= m.w || y >= m.h || m.g[(y | 0) * m.w + (x | 0)] > 0;
  const blk = (m, x, y) => solid(m, x - RAD, y - RAD) || solid(m, x + RAD, y - RAD) || solid(m, x - RAD, y + RAD) || solid(m, x + RAD, y + RAD);
  function mv(m, P, dx, dy) { if (!blk(m, P.x + dx, P.y)) P.x += dx; if (!blk(m, P.x, P.y + dy)) P.y += dy; }
  function field(m, gx, gy) {
    const key = gy * m.w + gx; let F = m.fc.get(key); if (F) return F; F = new Int16Array(m.w * m.h).fill(-1); m.fc.set(key, F); if (m.g[key]) return F;
    const q = [key]; F[key] = 0; for (let i = 0; i < q.length; i++) { const c = q[i], x = c % m.w, y = c / m.w | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy, n = Y * m.w + X; if (X < 0 || Y < 0 || X >= m.w || Y >= m.h || m.g[n] || F[n] >= 0) continue; F[n] = F[c] + 1; q.push(n); } }
    return F;
  }
  const nrm = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
  const r2 = v => Math.round(v * 100) / 100;

  /* ---------- منطق القائد: الجولات، الضرر، القنبلة، واللاعبون الآليون ---------- */
  function newS(st) { const S = { ph: 'freeze', r: FREEZE, rd: 1, sc: [0, 0], pl: {}, bomb: null, lw: -1, msg: '' }; for (const id of st.ps) S.pl[id] = { tm: st.tm[id], hp: 100, al: 1, k: 0, d: 0, w: 'pistol', $: 800, sp: [1.5, 1.5, 0] }; return S; }
  function makeHost(env, fresh) {
    const m = env.m, S = env.S, bots = {}, D = [.6, 1, 1.4][env.diff] || 1; let dl = env.now() + S.r, bdl = S.bomb ? env.now() + S.bomb.r : 0, liveT = env.now(), snapT = 0, botT = env.now(), posT = 0, dirty = true;
    const ids = () => Object.keys(S.pl), alive = tm => ids().filter(i => S.pl[i].al && S.pl[i].tm === tm);
    const spos = p => ({ x: p.sp[0], y: p.sp[1], a: p.sp[2], tx: p.sp[0], ty: p.sp[1], ta: p.sp[2] });
    const nb = () => ({ site: Math.random() < .5 ? 'a' : 'b', seen: 0, sid: null, next: 0, act: 0, str: 1, strT: 0, swT: 0, hunt: Math.random() < .3 });
    function startRound(first) {
      for (const tm of [0, 1]) { const tiles = U.shuf(m.sp[tm]); ids().filter(i => S.pl[i].tm === tm).forEach((id, i) => { const t = tiles[i % tiles.length]; S.pl[id].sp = [t[0], t[1], r2(Math.atan2(m.h / 2 - t[1], m.w / 2 - t[0]))]; }); }
      for (const id of ids()) {
        const p = S.pl[id]; if (!first && !p.al) p.w = 'pistol'; p.hp = 100; p.al = 1;
        if (env.isBot(id)) { env.pos[id] = spos(p); bots[id] = nb(); const r = Math.random(), w = p.$ >= 2700 && r < .75 ? 'rifle' : p.$ >= 1700 && r < .3 ? 'shotgun' : p.$ >= 1200 ? 'smg' : null; if (w && WP[w].$ > WP[p.w].$) { p.$ -= WP[w].$; p.w = w; } }
      }
      S.bomb = null; S.ph = 'freeze'; S.msg = ''; dl = env.now() + FREEZE; dirty = true;
    }
    function endRound(win, msg) { S.sc[win]++; S.lw = win; S.msg = msg; for (const id of ids()) { const p = S.pl[id]; p.$ = Math.min(9000, p.$ + (p.tm === win ? 3000 : 1800)); } S.ph = 'end'; dl = env.now() + ENDT; dirty = true; }
    function hurt(from, vid, d, hs) {
      const a = S.pl[from], v = S.pl[vid]; if (S.ph !== 'live' || !a || !v || !a.al || !v.al || a.tm === v.tm) return;
      v.hp -= Math.max(0, Math.min(200, Math.round(+d || 0))); dirty = true;
      if (v.hp <= 0) { v.hp = 0; v.al = 0; v.d++; a.k++; a.$ = Math.min(9000, a.$ + 300); env.emit(['k', from, vid, a.w, hs ? 1 : 0]); }
    }
    function msg(from, q) {
      const p = S.pl[from], P = env.pos[from]; if (!p) return;
      if (q[0] === 'h') hurt(from, q[1], q[2], q[3]);
      else if (q[0] === 'buy') { const w = WP[q[1]]; if (w && p.al && S.ph === 'freeze' && p.$ >= w.$ && p.w !== q[1]) { p.$ -= w.$; p.w = q[1]; dirty = true; } }
      else if (q[0] === 'pl') { if (P && p.tm === 0 && p.al && S.ph === 'live' && !S.bomb && m.st[(P.y | 0) * m.w + (P.x | 0)]) { S.bomb = { x: r2(P.x), y: r2(P.y), r: BOMB }; bdl = env.now() + BOMB; env.emit(['e', 'pl']); dirty = true; } }
      else if (q[0] === 'df') { if (P && p.tm === 1 && p.al && S.ph === 'live' && S.bomb && Math.hypot(P.x - S.bomb.x, P.y - S.bomb.y) < 1.5) { env.emit(['e', 'df']); endRound(1, 'أُبطلت القنبلة ✂️'); } }
    }
    function turn(P, ta, mx) { const d = nrm(ta - P.a); P.a = nrm(P.a + Math.max(-mx, Math.min(mx, d))); return nrm(ta - P.a); }
    function botStep(dt, now) {
      for (const id of ids()) {
        if (!env.isBot(id)) continue; const p = S.pl[id]; if (!p.al) continue;
        const B = bots[id] || (bots[id] = nb()), P = env.pos[id] || (env.pos[id] = spos(p)), W = WP[p.w]; let best = null, bd = 1e9, near = null, nd = 1e9;
        for (const e of ids()) { const q = S.pl[e], Q = env.pos[e]; if (!q.al || q.tm === p.tm || !Q) continue; const d = Math.hypot(Q.x - P.x, Q.y - P.y); if (d < nd) { nd = d; near = Q; } if (d < bd && d < 24 && los(m, P.x, P.y, Q.x, Q.y)) { bd = d; best = e; } }
        if (best) {
          const Q = env.pos[best]; B.seen = B.sid === best ? B.seen + dt : 0; B.sid = best; B.act = 0; const df = turn(P, Math.atan2(Q.y - P.y, Q.x - P.x), 7 * dt);
          if (B.seen > .45 / D && Math.abs(df) < .25 && now >= B.next) {
            B.next = now + W.rate * 1.3 + (W.auto && Math.random() < .2 ? 350 : 0); env.emit(['f', id]);
            if (Math.random() < Math.max(.1, Math.min(.6, .62 - bd * .03)) * D) { const hs = Math.random() < .12; hurt(id, best, (W.pel ? W.dmg * 4 * Math.max(.3, 1 - bd * .07) : W.dmg) * (hs ? 1.8 : 1), hs); }
          }
          if (now > B.strT) { B.strT = now + 500 + Math.random() * 900; B.str = Math.random() < .3 ? 0 : Math.random() < .5 ? -1 : 1; }
          mv(m, P, -Math.sin(P.a) * B.str * 1.5 * dt, Math.cos(P.a) * B.str * 1.5 * dt);
        } else {
          B.seen = 0; B.sid = null; const b = S.bomb, el = now - liveT, hunting = !b && (B.hunt || el > 45000) && near; let gx, gy;
          if (b) { gx = b.x; gy = b.y; } else if (hunting) { gx = near.x; gy = near.y; }
          else { if (p.tm === 1 && now > B.swT) { if (B.swT && Math.random() < .4) B.site = B.site === 'a' ? 'b' : 'a'; B.swT = now + 12000 + Math.random() * 8000; } gx = m.sc[B.site][0]; gy = m.sc[B.site][1]; }
          const d = Math.hypot(gx - P.x, gy - P.y), arrived = b ? d < .9 : hunting ? d < .6 : m.st[(P.y | 0) * m.w + (P.x | 0)] === (B.site === 'a' ? 1 : 2) && d < 1.6;
          if (arrived) {
            if (p.tm === 0 && !b && !hunting) { B.act += dt; if (B.act >= 3.2) { B.act = 0; msg(id, ['pl']); } }
            else if (p.tm === 1 && b) { B.act += dt; if (B.act >= 5) { B.act = 0; msg(id, ['df']); } }
            else P.a = nrm(P.a + dt * .9);
          } else {
            B.act = 0; const F = field(m, gx | 0, gy | 0), cx = P.x | 0, cy = P.y | 0; let nx = cx, ny = cy, bv = F[cy * m.w + cx]; if (bv < 0) bv = 1e9;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const X = cx + dx, Y = cy + dy, v = F[Y * m.w + X]; if (v === undefined || v < 0) continue; if (dx && dy && (m.g[cy * m.w + X] || m.g[Y * m.w + cx])) continue; if (v < bv) { bv = v; nx = X; ny = Y; } }
            const tx = nx === cx && ny === cy ? gx : nx + .5, ty = nx === cx && ny === cy ? gy : ny + .5, ta = Math.atan2(ty - P.y, tx - P.x); turn(P, ta, 8 * dt); mv(m, P, Math.cos(ta) * 2.9 * dt, Math.sin(ta) * 2.9 * dt);
          }
        }
        P.tx = P.x; P.ty = P.y; P.ta = P.a;
      }
    }
    function tick() {
      const now = env.now();
      if (S.ph === 'freeze') { if (now >= dl) { S.ph = 'live'; dl = now + ROUND; liveT = now; botT = now; dirty = true; } }
      else if (S.ph === 'live') {
        const t = alive(0).length, c = alive(1).length;
        if (S.bomb) { if (!c) endRound(0, 'قُضي على المدافعين'); else if (now >= bdl) { env.emit(['e', 'boom']); endRound(0, 'انفجرت القنبلة 💥'); } }
        else if (!t) endRound(1, 'قُضي على المهاجمين'); else if (!c) endRound(0, 'قُضي على المدافعين'); else if (now >= dl) endRound(1, 'انتهى الوقت');
        if (S.ph === 'live' && now - botT >= 50) { botStep(Math.min(.1, (now - botT) / 1000), now); botT = now; }
      } else if (S.ph === 'end') { if (now >= dl) { if (S.sc[S.lw] >= env.target) { S.ph = 'over'; dirty = true; env.over(S.lw); } else { S.rd++; startRound(); } } }
      if (dirty || now - snapT >= 250) { S.r = Math.max(0, Math.round(dl - now)); if (S.bomb) S.bomb.r = Math.max(0, Math.round(bdl - now)); snapT = now; dirty = false; env.emit(['S', S]); }
      if (now - posT >= 100) { posT = now; const arr = []; for (const id of ids()) if (env.isBot(id) && S.pl[id].al && env.pos[id]) { const P = env.pos[id]; arr.push([id, r2(P.x), r2(P.y), r2(P.a)]); } if (arr.length) env.emit(['b', arr]); }
    }
    if (fresh) startRound(true);
    return { tick, msg };
  }

  /* ---------- المحرك في المتصفح: إدخال، شبكة، ورسم ---------- */
  const CSS = `.sk{position:relative;width:100%;aspect-ratio:16/9;max-height:max(240px,calc(100vh - 235px));background:#000;border-radius:12px;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;margin:auto;direction:ltr}
.sk.fs{position:fixed;inset:0;z-index:200;max-height:none;border-radius:0;aspect-ratio:auto;width:100vw;height:100vh;height:100dvh}
.sk canvas{width:100%;height:100%;display:block}.sk [hidden]{display:none!important}
.sk-z{position:absolute;top:0;bottom:0;display:none}.sk.touch .sk-z{display:block}.sk-joy{left:0;width:42%}.sk-look{right:0;width:58%}
.sk button{font:600 15px 'Readex Pro',sans-serif;color:#fff;background:rgba(10,20,25,.55);border:1.5px solid rgba(255,255,255,.4);border-radius:12px;padding:6px 10px;-webkit-tap-highlight-color:transparent}
.sk-top{position:absolute;top:6px;right:6px;display:flex;gap:6px}
.sk-btns{position:absolute;right:10px;bottom:10px;display:none;gap:10px;align-items:flex-end;flex-wrap:wrap;justify-content:flex-end;max-width:46%}.sk.touch .sk-btns{display:flex}
.sk .sk-fire{width:84px;height:84px;border-radius:50%;font-size:30px;background:rgba(200,40,40,.5)}.sk-btns button{min-width:52px;min-height:52px;border-radius:50%}
.sk .sk-actb{border-radius:14px;background:rgba(224,160,8,.75);color:#221700;padding:8px 14px}
.sk-buy{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);display:flex;gap:6px;flex-wrap:wrap;justify-content:center;background:rgba(8,18,22,.82);padding:8px;border-radius:14px;direction:rtl;max-width:96%}
.sk-buy b{flex:1 1 100%;text-align:center;color:#f5b62e;font:600 14px 'Readex Pro',sans-serif}.sk-buy button{font-size:13px;line-height:1.35}.sk-buy button.on{background:#e0a008;color:#221700}.sk-buy button:disabled{opacity:.4}
.sk-rot{position:absolute;inset:0;display:none;place-items:center;background:rgba(0,0,0,.8);color:#fff;font:600 20px 'Readex Pro',sans-serif;text-align:center;direction:rtl;pointer-events:none}
@media (orientation:portrait){.sk.fs.touch .sk-rot{display:grid}}`;
  let NB;
  function sfx(type, vol) {
    try {
      if (!(window.DW && DW.P.snd) || vol <= .02) return; const AC = sfx.ac || (sfx.ac = new (window.AudioContext || window.webkitAudioContext)()), t = AC.currentTime, g = AC.createGain(); g.connect(AC.destination);
      if (type === 'shot') { if (!NB) { NB = AC.createBuffer(1, AC.sampleRate * .2, AC.sampleRate); const d = NB.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); } const s = AC.createBufferSource(), f = AC.createBiquadFilter(); s.buffer = NB; f.type = 'lowpass'; f.frequency.value = 1800; s.connect(f).connect(g); g.gain.value = .35 * vol; s.start(); }
      else { const o = AC.createOscillator(), F = { hit: 1100, kill: 520, rel: 240, beep: 1500, boom: 60, win: 700 }[type] || 600, d = type === 'boom' ? .8 : .1; o.type = type === 'boom' ? 'sawtooth' : 'square'; o.frequency.value = F; o.connect(g); g.gain.setValueAtTime(.08 * vol, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.start(); o.stop(t + d); }
    } catch (e) { }
  }
  function Engine() {
    if (!document.getElementById('sk-css')) { const s = document.createElement('style'); s.id = 'sk-css'; s.textContent = CSS; document.head.appendChild(s); }
    const wrap = document.createElement('div'); wrap.className = 'sk' + (matchMedia('(pointer:coarse)').matches ? ' touch fs' : '');   /* على الجوال تبدأ اللعبة بملء الشاشة، و ⛶ يعيدها للصفحة */
    wrap.innerHTML = `<canvas></canvas><div class="sk-z sk-joy" data-tc="joy"></div><div class="sk-z sk-look" data-tc="look"></div>
      <div class="sk-top"><button data-k="tab" aria-label="النتائج">📋</button><button data-k="face" aria-label="صورة وجهي">📷</button><button data-k="fs" aria-label="ملء الشاشة">⛶</button></div>
      <div class="sk-btns"><button data-k="zoom" hidden>🔭</button><button data-k="rel">🔄</button><button class="sk-actb" data-tc="act" hidden></button><button class="sk-fire" data-tc="fire">🔥</button></div>
      <div class="sk-buy" hidden></div><div class="sk-rot">أدِر جوالك أفقياً 🔄</div><input type="file" accept="image/*" hidden>`;
    const cv = wrap.firstChild, cx = cv.getContext('2d'), buyEl = wrap.querySelector('.sk-buy'), fileEl = wrap.querySelector('input'), actEl = wrap.querySelector('[data-tc=act]'), zoomEl = wrap.querySelector('[data-k=zoom]');
    let W = 640, HH = 360, zb = new Float32Array(W), bg = null, mmc = null, X = null, m = null, me = null, S = null, host = null, ws = null, wsOpen = 0, born = performance.now(), dead = false, gone = 0, lastF = 0, posT = 0, lastSent = '', faceT = 0, uiKey = '', tab = false, spec = 0, overSent = false;
    const Ppos = {}, faces = {}, spr = {}, feed = [], inp = { f: 0, s: 0, fire: 0, act: 0, held: 0, k: {} }, self = { x: 2, y: 2, a: 0, ammo: 12, rel: 0, last: 0, zoom: 0, act: 0, rd: -1, w: '', bob: 0, kick: 0, hitT: 0, hurtT: 0, hp: 100, mvT: 0 }, AB = new AbortController(), on = (t, ev, fn, o) => t.addEventListener(ev, fn, Object.assign({ signal: AB.signal }, o));
    const isHost = () => X.H.isHost(), my = () => S && S.pl[me];
    /* شبكة */
    const send = q => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(q)); };
    const emit = q => { send(q); onMsg(me, q); };
    const toHost = q => { if (isHost()) { if (host) host.msg(me, q); } else send(q); };
    function connect() {
      if (dead || X.H.offline || X.H.code === 'LOCAL') return;
      try { ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + location.pathname.replace(/[^/]*$/, '') + 'ws?c=' + X.H.code + '&p=' + me); } catch (e) { return; }
      ws.onopen = () => { wsOpen = performance.now(); send(['hi']); sendFace(); };
      ws.onmessage = e => { let d; try { d = JSON.parse(e.data); } catch (er) { return; } if (d && Array.isArray(d.m) && typeof d.f === 'string') onMsg(d.f, d.m); };
      ws.onclose = () => { ws = null; if (!dead) setTimeout(connect, 1500); };
    }
    function sendFace() { const f = window.DW && DW.P.face; if (f) { setFaceImg(me, f); send(['fc', f]); } }
    function setFaceImg(id, src) { if (typeof src !== 'string' || !/^data:image\/(jpeg|png);base64,/.test(src) || src.length > 20000) return; const im = new Image(); im.onload = () => { faces[id] = im; delete spr[id]; }; im.src = src; }
    function setS(s) { S = s; S._dl = performance.now() + (s.r || 0); if (s.bomb) s.bomb._dl = performance.now() + (s.bomb.r || 0); }
    function onMsg(f, q) {
      const t = q[0], hid = X.H.hostId(), fromHost = f === hid || f === me;
      if (t === 'p') { if (f !== me && S && S.pl[f]) { if (!Ppos[f]) setTimeout(sendFace, 300 + Math.random() * 500); const P = Ppos[f] || (Ppos[f] = { x: +q[1], y: +q[2], a: +q[3] }); P.tx = +q[1]; P.ty = +q[2]; P.ta = +q[3]; } }
      else if (t === 'S') { if (fromHost && q[1] && q[1].pl) setS(q[1]); }
      else if (t === 'S0') { if (isHost() && !S && !host && q[1] && q[1].pl) setS(q[1]); }
      else if (t === 'b') { if (fromHost && !isHost()) for (const b of q[1]) { const P = Ppos[b[0]] || (Ppos[b[0]] = { x: b[1], y: b[2], a: b[3] }); P.tx = b[1]; P.ty = b[2]; P.ta = b[3]; } }
      else if (t === 'f') { const id = q[1] && fromHost ? q[1] : f, P = Ppos[id]; if (P && id !== me) { P.fire = performance.now(); sfx('shot', Math.max(0, 1 - Math.hypot(P.x - self.x, P.y - self.y) / 22)); } }
      else if (t === 'k') { if (fromHost) { feed.push({ a: q[1], v: q[2], hs: q[4], t: performance.now() }); if (feed.length > 5) feed.shift(); if (q[1] === me) sfx('kill', 1); const P = Ppos[q[2]]; if (P) { P.dx = P.x; P.dy = P.y; } } }
      else if (t === 'e') { if (fromHost) sfx(q[1] === 'boom' ? 'boom' : 'beep', 1); }
      else if (t === 'fc') { if (f !== me) setFaceImg(f, q[1]); }
      else if (t === 'hi') { if (S) send([isHost() ? 'S' : 'S0', S]); if (performance.now() - faceT > 1500) { faceT = performance.now(); setTimeout(sendFace, Math.random() * 600); } }
      else if (isHost() && host && f !== me) host.msg(f, q);
    }
    function hostLoop() {
      if (dead || !X) return;
      if (!isHost()) { host = null; return; }
      if (!host) {
        const off = X.H.offline || X.H.code === 'LOCAL', t = performance.now();
        if (!S && !off && !(wsOpen && t - wsOpen > 1300) && t - born < 4000) return;
        const fresh = !S; if (fresh) S = newS(X.st);
        host = makeHost({ m, S, pos: Ppos, isBot: id => X.H.isBot(id), emit, now: () => performance.now(), diff: ['سهل', 'متوسط', 'صعب'].indexOf(X.H.o.bot || 'متوسط'), target: X.H.o.w || 5,
          over: win => { if (overSent) return; overSent = true; const fin = {}; for (const id in S.pl) fin[id] = [S.pl[id].k, S.pl[id].d]; X.send({ t: 'over', win, fin, rs: S.sc.slice() }); } }, fresh);
      }
      if (S.ph === 'over' && !overSent) { overSent = true; const fin = {}; for (const id in S.pl) fin[id] = [S.pl[id].k, S.pl[id].d]; X.send({ t: 'over', win: S.lw, fin, rs: S.sc.slice() }); }
      host.tick();
    }
    const hostIv = setInterval(hostLoop, 50);
    /* إدخال */
    const typing = e => /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    on(document, 'keydown', e => { if (typing(e) || !document.body.contains(wrap)) return; const k = e.code; inp.k[k] = 1; if (k === 'KeyR') reload(); else if (k === 'KeyQ') toggleZoom(); else if (k === 'Tab') { tab = true; e.preventDefault(); } else if (k === 'KeyF') fs(); else if (/^Digit[1-5]$/.test(k)) buy(Object.keys(WP)[+k[5] - 1]); if (/^(Space|Arrow|Tab)/.test(k)) e.preventDefault(); });
    on(document, 'keyup', e => { inp.k[e.code] = 0; if (e.code === 'Tab') tab = false; });
    on(document, 'mousemove', e => { if (document.pointerLockElement === wrap) self.a = nrm(self.a + e.movementX * (self.zoom ? .0008 : .0024)); });
    on(cv, 'mousedown', e => { if (wrap.classList.contains('touch')) return; if (document.pointerLockElement !== wrap) { try { const p = wrap.requestPointerLock(); if (p && p.catch) p.catch(() => { }); } catch (er) { } } if (e.button === 2) toggleZoom(); else { inp.fire = 1; inp.held = 0; } });
    on(document, 'mouseup', () => { inp.fire = 0; });
    on(wrap, 'contextmenu', e => e.preventDefault());
    const tch = {};
    on(wrap, 'touchstart', e => {
      wrap.classList.add('touch');
      for (const t of e.changedTouches) { const el = t.target.closest && t.target.closest('[data-tc]'); if (!el) continue; e.preventDefault(); const r = el.dataset.tc; tch[t.identifier] = { r, x: t.clientX, y: t.clientY, ox: t.clientX, oy: t.clientY }; if (r === 'fire') { inp.fire = 1; inp.held = 0; } if (r === 'act') inp.act = 1; if (r === 'look' && my() && !my().al) spec++; }
    }, { passive: false });
    on(wrap, 'touchmove', e => {
      for (const t of e.changedTouches) { const c = tch[t.identifier]; if (!c) continue; e.preventDefault();
        if (c.r === 'joy') { const dx = (t.clientX - c.ox) / 46, dy = (t.clientY - c.oy) / 46, l = Math.max(1, Math.hypot(dx, dy)); inp.s = dx / l; inp.f = -dy / l; }
        else if (c.r === 'look' || c.r === 'fire') { self.a = nrm(self.a + (t.clientX - c.x) * (self.zoom ? .0022 : .0062)); c.x = t.clientX; } }
    }, { passive: false });
    const tend = e => { for (const t of e.changedTouches) { const c = tch[t.identifier]; if (!c) continue; delete tch[t.identifier]; if (c.r === 'joy') inp.f = inp.s = 0; if (c.r === 'fire') inp.fire = 0; if (c.r === 'act') inp.act = 0; } };
    on(wrap, 'touchend', tend); on(wrap, 'touchcancel', tend);
    on(wrap, 'click', e => { const b = e.target.closest('[data-k],[data-w]'); if (!b) return; e.stopPropagation(); if (b.dataset.w) return buy(b.dataset.w); const k = b.dataset.k; if (k === 'fs') fs(); else if (k === 'face') fileEl.click(); else if (k === 'tab') tab = !tab; else if (k === 'rel') reload(); else if (k === 'zoom') toggleZoom(); });
    on(fileEl, 'change', () => { const f = fileEl.files[0]; fileEl.value = ''; if (f && window.DW && DW.setFace) DW.setFace(f).then(sendFace, () => { }); });
    on(window, 'dw-face', () => sendFace());
    function fs() { const onNow = wrap.classList.toggle('fs'); try { if (onNow) { const p = wrap.requestFullscreen && wrap.requestFullscreen(); if (p && p.then) p.then(() => { try { screen.orientation.lock('landscape').catch(() => { }); } catch (e) { } }, () => { }); } else if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { } }
    on(document, 'fullscreenchange', () => { if (!document.fullscreenElement && wrap.classList.contains('fs') && wrap.requestFullscreen && !/iPhone|iPad/.test(navigator.userAgent)) wrap.classList.remove('fs'); });
    function reload() { const w = WP[self.w]; if (w && !self.rel && self.ammo < w.mag && my() && my().al) { self.rel = performance.now() + w.rel; self.zoom = 0; sfx('rel', 1); } }
    function toggleZoom() { if (WP[self.w] && WP[self.w].zoom && !self.rel) self.zoom = self.zoom ? 0 : 1; }
    function buy(w) { if (S && S.ph === 'freeze' && WP[w]) toHost(['buy', w]); }
    function shoot(now) {
      const w = WP[self.w], p = my(), moving = now - self.mvT < 120, sp = w.sp * (moving ? 1.8 : 1) * (w.zoom ? (self.zoom ? 1 : 14) : 1), hits = {}, touch = wrap.classList.contains('touch');
      for (let i = 0; i < (w.pel || 1); i++) {
        const a = self.a + (Math.random() - .5) * 2 * sp, ca = Math.cos(a), sa = Math.sin(a), wd = cast(m, self.x, self.y, ca, sa); let best = null, bt = wd, hs = 0;
        for (const id in S.pl) { const q = S.pl[id], Q = Ppos[id]; if (id === me || !q.al || q.tm === p.tm || !Q) continue; const dx = Q.x - self.x, dy = Q.y - self.y, t = dx * ca + dy * sa; if (t <= 0 || t >= bt) continue; const lat = Math.abs(dx * sa - dy * ca); if (lat < (touch ? .42 : .3)) { best = id; bt = t; hs = lat < .09; } }
        if (best) { const d = w.dmg * (w.pel ? Math.max(.25, 1 - bt * .07) : Math.max(.5, 1 - bt * .012)) * (hs ? 1.8 : 1), h = hits[best] || (hits[best] = [0, 0]); h[0] += d; h[1] = h[1] || (hs ? 1 : 0); }
      }
      for (const id in hits) { toHost(['h', id, Math.round(hits[id][0]), hits[id][1]]); self.hitT = now; sfx('hit', .7); }
      send(['f']); sfx('shot', 1); self.kick = 1; self.last = now; self.ammo--; if (w.zoom) self.zoom = 0;
    }
    /* رسم */
    function resize() { const r = wrap.getBoundingClientRect(); if (!r.height) return; const w = Math.max(420, Math.min(880, Math.round(HH * r.width / r.height / 2) * 2)); if (w !== cv.width || cv.height !== HH) { W = w; cv.width = W; cv.height = HH; zb = new Float32Array(W + 2); bg = null; } }
    function sprite(id) {
      if (spr[id]) return spr[id]; const c = document.createElement('canvas'); c.width = 64; c.height = 128; const x = c.getContext('2d'), col = TC[S.pl[id].tm];
      x.fillStyle = '#1d2329'; x.fillRect(19, 86, 11, 40); x.fillRect(34, 86, 11, 40); x.fillStyle = col; x.beginPath(); x.roundRect ? x.roundRect(14, 44, 36, 46, 8) : x.rect(14, 44, 36, 46); x.fill();
      x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(14, 70, 36, 5); x.fillStyle = col; x.fillRect(6, 48, 9, 30); x.fillRect(49, 48, 9, 30); x.fillStyle = '#111'; x.fillRect(8, 72, 46, 7); x.fillRect(46, 66, 6, 16);
      x.save(); x.beginPath(); x.arc(32, 23, 20, 0, 7); x.closePath(); x.fillStyle = '#f1c9a5'; x.fill(); x.clip();
      if (faces[id]) x.drawImage(faces[id], 12, 3, 40, 40); else { x.font = '30px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(X.H.av(id), 32, 25); }
      x.restore(); x.lineWidth = 4; x.strokeStyle = col; x.beginPath(); x.arc(32, 23, 20, 0, 7); x.stroke(); return spr[id] = c;
    }
    function txt(s, x, y, size, col, al, bold) { cx.font = `${bold === 0 ? 400 : 600} ${size}px "Readex Pro",sans-serif`; cx.textAlign = al || 'center'; cx.lineWidth = 3; cx.strokeStyle = 'rgba(0,0,0,.65)'; cx.strokeText(s, x, y); cx.fillStyle = col || '#fff'; cx.fillText(s, x, y); }
    function render(now, vx, vy, va, zoom) {
      const unit = UNIT * (zoom ? 2.6 : 1), fov = W / (2 * unit), ca = Math.cos(va), sa = Math.sin(va), plx = -sa * fov, ply = ca * fov, hz = HH / 2, pal = m.raw.wl;
      if (!bg) { bg = document.createElement('canvas'); bg.width = W; bg.height = HH; const b = bg.getContext('2d'); let g = b.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, m.raw.sky[0]); g.addColorStop(1, m.raw.sky[1]); b.fillStyle = g; b.fillRect(0, 0, W, hz); g = b.createLinearGradient(0, hz, 0, HH); g.addColorStop(0, m.raw.fl[1]); g.addColorStop(1, m.raw.fl[0]); b.fillStyle = g; b.fillRect(0, hz, W, hz); }
      cx.drawImage(bg, 0, 0);
      for (let c = 0; c < W; c += 2) {
        const cam = 2 * (c + 1) / W - 1, d = Math.max(.02, cast(m, vx, vy, ca + plx * cam, sa + ply * cam)); zb[c] = zb[c + 1] = d; const lh = unit / d, top = hz - lh * (WH - EYE), p = pal[RC.k] || pal[1];
        let sh = (RC.side ? .76 : 1) / (1 + d * d * .01); if (RC.wx < .035 || RC.wx > .965) sh *= .8; else if (RC.k === 3 && Math.abs(RC.wx - .5) < .04) sh *= .82; else if (RC.k === 2 && (RC.wx * 4 % 1) < .08) sh *= .88;
        cx.fillStyle = `rgb(${p[0] * sh | 0},${p[1] * sh | 0},${p[2] * sh | 0})`; cx.fillRect(c, top, 2, lh * WH + 1);
      }
      const list = [], inv = 1 / (plx * sa - ca * ply), mt = my() ? my().tm : 0;
      const add = (x, y, o) => { const sx = x - vx, sy = y - vy, tY = inv * (-ply * sx + plx * sy); if (tY > .15) { o.tX = inv * (sa * sx - ca * sy); o.tY = tY; list.push(o); } };
      for (const id in S.pl) { const q = S.pl[id], P = id === me ? self : Ppos[id]; if (!P || (id === X.view)) continue; if (q.al) add(P.x, P.y, { id }); else if (P.dx) add(P.dx, P.dy, { t: '💀', z: .25, s: .3 }); }
      if (S.bomb) add(S.bomb.x, S.bomb.y, { t: '💣', z: .16, s: .3, blink: 1 });
      add(m.sc.a[0], m.sc.a[1], { t: 'A', z: .95, s: .5, site: 1 }); add(m.sc.b[0], m.sc.b[1], { t: 'B', z: .95, s: .5, site: 1 });
      list.sort((a, b) => b.tY - a.tY); cx.textBaseline = 'alphabetic';
      for (const o of list) {
        const sxc = W / 2 * (1 + o.tX / o.tY), sc = unit / o.tY, ci = Math.max(0, Math.min(W - 1, sxc | 0));
        if (o.t) { if (o.tY < zb[ci] && sxc > -40 && sxc < W + 40) { const y = hz + sc * (EYE - o.z); cx.globalAlpha = o.site ? .5 : o.blink && (now % 500 < 250) ? .5 : 1; txt(o.t, sxc, y, Math.max(8, sc * o.s), o.site ? '#fff' : '#fff'); cx.globalAlpha = 1; } continue; }
        const img = sprite(o.id), h = sc * .66, w = sc * .33, bot = hz + sc * EYE, top = bot - h, x0 = sxc - w / 2, xe = Math.min(W, x0 + w); let vis = false;
        for (let x = Math.max(0, Math.floor(x0)) & ~1; x < xe; x += 2) { if (o.tY >= zb[x]) continue; const u = (x - x0) / w; if (u < 0 || u >= 1) continue; vis = true; cx.drawImage(img, Math.min(63, u * 64 | 0), 0, Math.max(1, Math.min(64, 128 / w)), 128, x, top, 2, h); }
        if (vis) { const P = Ppos[o.id]; if (P && now - (P.fire || 0) < 70) { cx.fillStyle = '#ffe27a'; cx.beginPath(); cx.arc(sxc + w * .3, top + h * .58, Math.max(2, w * .16), 0, 7); cx.fill(); } if (o.tY < zb[ci] && (S.pl[o.id].tm === mt || o.tY < 9)) txt(X.H.nm(o.id), sxc, top - 4, Math.max(9, Math.min(15, sc * .09)), TC[S.pl[o.id].tm]); }
      }
    }
    function gun(now) {
      const w = WP[self.w] || WP.pistol, bx = Math.sin(self.bob) * 6, by = Math.abs(Math.cos(self.bob)) * 5 + self.kick * 16 + (self.rel ? 40 : 0); cx.save(); cx.translate(W * .64 + bx, HH + by);
      if (now - self.last < 55) { cx.fillStyle = '#ffd54a'; cx.beginPath(); cx.arc(-30, -w.len - 8, 16, 0, 7); cx.fill(); cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(-30, -w.len - 8, 7, 0, 7); cx.fill(); }
      cx.fillStyle = '#15181c'; cx.beginPath(); cx.moveTo(-14, 0); cx.lineTo(-36, -w.len); cx.lineTo(-24, -w.len - 4); cx.lineTo(20, 0); cx.fill(); cx.fillStyle = '#2b3138'; cx.beginPath(); cx.moveTo(-18, 0); cx.lineTo(-30, -w.len * .5); cx.lineTo(4, -w.len * .5 - 6); cx.lineTo(34, 0); cx.fill();
      cx.fillStyle = '#e2b48c'; cx.beginPath(); cx.ellipse(22, -6, 20, 14, 0, 0, 7); cx.fill(); cx.restore();
    }
    function hud(now, p, watching) {
      const hz = HH / 2, tl = Math.max(0, (S.bomb && S.ph === 'live' ? S.bomb._dl : S._dl) - performance.now()), sec = Math.ceil(tl / 1000), tm = p ? p.tm : 0;
      if (self.zoom && !watching) { cx.fillStyle = '#000'; cx.beginPath(); cx.rect(0, 0, W, HH); cx.arc(W / 2, hz, HH * .44, 0, 7, true); cx.fill('evenodd'); cx.strokeStyle = '#000'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(W / 2, 0); cx.lineTo(W / 2, HH); cx.moveTo(0, hz); cx.lineTo(W, hz); cx.stroke(); }
      else if (p && p.al && !watching) { gun(now); const g = 5 + (now - self.mvT < 120 ? 5 : 0) + self.kick * 6; cx.strokeStyle = now - self.hitT < 140 ? '#ff4d4d' : '#eaffea'; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(W / 2 - g - 7, hz); cx.lineTo(W / 2 - g, hz); cx.moveTo(W / 2 + g, hz); cx.lineTo(W / 2 + g + 7, hz); cx.moveTo(W / 2, hz - g - 7); cx.lineTo(W / 2, hz - g); cx.moveTo(W / 2, hz + g); cx.lineTo(W / 2, hz + g + 7); cx.stroke(); }
      if (now - self.hurtT < 300) { cx.fillStyle = `rgba(200,0,0,${.4 * (1 - (now - self.hurtT) / 300)})`; cx.fillRect(0, 0, W, HH); }
      /* الخريطة المصغرة */
      const k = Math.min(3.4, 104 / m.w); if (!mmc) { mmc = document.createElement('canvas'); mmc.width = m.w * k; mmc.height = m.h * k; const b = mmc.getContext('2d'); b.fillStyle = 'rgba(0,0,0,.55)'; b.fillRect(0, 0, mmc.width, mmc.height); for (let i = 0; i < m.w * m.h; i++) { const x = i % m.w, y = i / m.w | 0; if (m.g[i]) { b.fillStyle = 'rgba(255,255,255,.55)'; b.fillRect(x * k, y * k, k + .5, k + .5); } else if (m.st[i]) { b.fillStyle = 'rgba(245,182,46,.35)'; b.fillRect(x * k, y * k, k + .5, k + .5); } } }
      cx.drawImage(mmc, 6, 6);
      for (const id in S.pl) { const q = S.pl[id], P = id === me ? self : Ppos[id]; if (!P || !q.al || (q.tm !== tm && id !== me)) continue; cx.fillStyle = id === me ? '#fff' : TC[q.tm]; cx.beginPath(); cx.arc(6 + P.x * k, 6 + P.y * k, id === me ? 2.6 : 2.2, 0, 7); cx.fill(); if (id === me) { cx.strokeStyle = '#fff'; cx.lineWidth = 1.5; cx.beginPath(); cx.moveTo(6 + P.x * k, 6 + P.y * k); cx.lineTo(6 + (P.x + Math.cos(P.a) * 2.2) * k, 6 + (P.y + Math.sin(P.a) * 2.2) * k); cx.stroke(); } }
      if (S.bomb && (now % 600 < 400)) { cx.fillStyle = '#ff3b3b'; cx.fillRect(4 + S.bomb.x * k, 4 + S.bomb.y * k, 5, 5); }
      /* النتيجة والوقت */
      const al = t => Object.values(S.pl).filter(q => q.tm === t && q.al).length; cx.fillStyle = 'rgba(0,0,0,.45)'; cx.fillRect(W / 2 - 104, 4, 208, 30);
      txt(String(S.sc[0]), W / 2 - 52, 27, 22, TC[0]); txt(String(S.sc[1]), W / 2 + 52, 27, 22, TC[1]); txt('👤' + al(0), W / 2 - 86, 25, 11, '#fff'); txt('👤' + al(1), W / 2 + 86, 25, 11, '#fff');
      txt((S.bomb && S.ph === 'live' ? '💣 ' : '') + (sec / 60 | 0) + ':' + String(sec % 60).padStart(2, '0'), W / 2, 25, 15, S.bomb && S.ph === 'live' ? '#ff6b6b' : '#fff');
      cx.direction = 'rtl';
      feed.forEach((f, i) => { if (now - f.t < 6000) txt(`${X.H.nm(f.a)} ${f.hs ? '🎯' : '🔫'} ${X.H.nm(f.v)}`, W - 8, 62 + i * 17, 12, f.a === me ? '#ffe27a' : f.v === me ? '#ff8a8a' : '#fff', 'right'); });
      if (p && !watching) {
        txt('❤ ' + p.hp, 10, HH - 12, 20, p.hp > 35 ? '#fff' : '#ff6b6b', 'left'); txt('$' + p.$, 10, HH - 36, 13, '#9be28f', 'left');
        const w = WP[self.w]; if (w) { txt(self.rel ? 'تعبئة…' : self.ammo + ' / ' + w.mag, W - 10, HH - (wrap.classList.contains('touch') ? 110 : 12), 18, self.ammo ? '#fff' : '#ff6b6b', 'right'); txt(w.n, W - 10, HH - (wrap.classList.contains('touch') ? 132 : 34), 12, '#ddd', 'right', 0); }
      }
      const role = `أنت مع ${TN[tm]}`;
      if (S.ph === 'freeze') { txt(`الجولة ${S.rd} تبدأ بعد ${sec}`, W / 2, hz - 60, 24, '#fff'); txt(role + (tm ? ' — احموا الموقعين A و B' : ' — ازرعوا القنبلة في A أو B'), W / 2, hz - 34, 14, TC[tm]); }
      else if (S.ph === 'end' || S.ph === 'over') { txt(`فاز ${TN[S.lw]}!`, W / 2, hz - 50, 30, TC[S.lw]); txt(S.msg || '', W / 2, hz - 24, 15, '#fff'); }
      else if (p && !p.al) txt(watching ? `تشاهد: ${X.H.nm(watching)} (اضغط للتبديل)` : 'خرجتَ من الجولة 💀', W / 2, HH - 46, 15, '#fff');
      else if (S.bomb && S.ph === 'live') txt(tm ? 'القنبلة مزروعة! أبطِلوها' : 'القنبلة مزروعة! احموها', W / 2, 54, 14, '#ff8a8a');
      if (self.act > 0 && p && p.al) { const need = tm ? 5 : 3.2; cx.fillStyle = 'rgba(0,0,0,.6)'; cx.fillRect(W / 2 - 80, hz + 40, 160, 12); cx.fillStyle = '#f5b62e'; cx.fillRect(W / 2 - 78, hz + 42, 156 * Math.min(1, self.act / need), 8); txt(tm ? 'إبطال القنبلة…' : 'زرع القنبلة…', W / 2, hz + 34, 13, '#fff'); }
      else if (X.can && p && p.al && !wrap.classList.contains('touch')) txt(tm ? 'اضغط E مطوّلاً لإبطال القنبلة' : 'اضغط E مطوّلاً لزرع القنبلة', W / 2, hz + 50, 14, '#f5b62e');
      if (tab || S.ph === 'over') {
        cx.fillStyle = 'rgba(5,15,18,.86)'; cx.fillRect(W * .12, 44, W * .76, HH - 70);
        for (const t of [0, 1]) { const x0 = t ? W * .13 : W * .51, ids = Object.keys(S.pl).filter(i => S.pl[i].tm === t).sort((a, b) => S.pl[b].k - S.pl[a].k); txt(`${TN[t]} — ${S.sc[t]}`, x0 + W * .345, 66, 15, TC[t], 'right'); ids.forEach((id, i) => { const q = S.pl[id]; txt(`${q.al ? '' : '💀 '}${X.H.nm(id)}`, x0 + W * .345, 88 + i * 19, 12, id === me ? '#ffe27a' : '#fff', 'right', 0); txt(`${q.k} / ${q.d}`, x0 + 6, 88 + i * 19, 12, '#fff', 'left', 0); }); }
      }
      if (!wrap.classList.contains('touch') && S.ph === 'freeze') txt('الحركة WASD · التصويب بالفأرة · التعبئة R · المنظار Q · النتائج Tab · ملء الشاشة F', W / 2, HH - 62, 11, '#ddd', 'center', 0);
      cx.direction = 'ltr';
    }
    function ui(p) {
      const showBuy = !!(p && p.al && S.ph === 'freeze'), key = [showBuy, p && p.$, p && p.w, X.can, p && p.tm, self.w].join('|'); if (key === uiKey) return; uiKey = key;
      buyEl.hidden = !showBuy; if (showBuy) buyEl.innerHTML = `<b>المتجر — رصيدك $${p.$}</b>` + Object.keys(WP).map((w, i) => `<button data-w="${w}" class="${p.w === w ? 'on' : ''}" ${p.w === w || p.$ < WP[w].$ ? 'disabled' : ''}>${WP[w].n}<br>${WP[w].$ ? '$' + WP[w].$ : 'مجاني'}</button>`).join('');
      actEl.hidden = !X.can; if (X.can) actEl.textContent = p.tm ? '✂️ أبطِل (اضغط مطوّلاً)' : '💣 ازرع (اضغط مطوّلاً)'; zoomEl.hidden = !(WP[self.w] && WP[self.w].zoom);
    }
    function frame(t) {
      if (dead) return; requestAnimationFrame(frame);
      if (!document.body.contains(wrap)) { if (++gone > 90) destroy(); return; } gone = 0;
      const now = performance.now(), dt = Math.min(.05, (now - lastF) / 1000 || 0); lastF = now; resize();
      if (!S || !S.pl) { cx.fillStyle = '#0c2427'; cx.fillRect(0, 0, W, HH); cx.textBaseline = 'alphabetic'; txt('جارٍ تجهيز الساحة…', W / 2, HH / 2, 20, '#fff'); return; }
      const p = S.pl[me];
      if (p) {
        if (self.rd !== S.rd) { self.rd = S.rd; self.x = p.sp[0]; self.y = p.sp[1]; self.a = p.sp[2]; self.rel = 0; self.zoom = 0; self.act = 0; self.ammo = WP[p.w].mag; self.w = p.w; for (const id in Ppos) Ppos[id].dx = 0; if (S.rd > 1) sfx('win', .6); }
        if (self.w !== p.w) { self.w = p.w; self.ammo = WP[p.w].mag; self.rel = 0; self.zoom = 0; }
        if (p.hp < self.hp) self.hurtT = now; self.hp = p.hp;
        const K = inp.k; let f = inp.f + (K.KeyW || K.ArrowUp ? 1 : 0) - (K.KeyS || K.ArrowDown ? 1 : 0), s = inp.s + (K.KeyD ? 1 : 0) - (K.KeyA ? 1 : 0); if (K.ArrowLeft) self.a = nrm(self.a - 2.4 * dt); if (K.ArrowRight) self.a = nrm(self.a + 2.4 * dt);
        const l = Math.hypot(f, s), tile = m.st[(self.y | 0) * m.w + (self.x | 0)];
        X.can = !!(p.al && S.ph === 'live' && (p.tm === 0 ? tile && !S.bomb : S.bomb && Math.hypot(self.x - S.bomb.x, self.y - S.bomb.y) < 1.2));
        if (p.al && S.ph !== 'freeze') {
          if (l > .05) { const v = (self.zoom ? 1.6 : self.w === 'sniper' ? 2.9 : 3.3) * dt / Math.max(1, l), ca = Math.cos(self.a), sa = Math.sin(self.a); mv(m, self, (ca * f - sa * s) * v, (sa * f + ca * s) * v); self.bob += dt * 9; self.mvT = now; }
          if (X.can && (inp.act || K.KeyE) && l <= .05) { self.act += dt; if (self.act >= (p.tm ? 5 : 3.2)) { toHost([p.tm ? 'df' : 'pl']); self.act = 0; } } else self.act = 0;
          const w = WP[self.w]; if (self.rel && now >= self.rel) { self.rel = 0; self.ammo = w.mag; }
          const firing = inp.fire || K.Space; if (!firing) inp.held = 0;
          if (firing && S.ph === 'live' && !self.rel && now - self.last >= w.rate && (w.auto || !inp.held)) { inp.held = 1; if (self.ammo > 0) shoot(now); else reload(); }
        } else self.act = 0;
        self.kick = Math.max(0, self.kick - dt * 7);
        if (now - posT >= 100) { const q = `${r2(self.x)},${r2(self.y)},${r2(self.a)}`; if (q !== lastSent || now - posT >= 1000) { posT = now; lastSent = q; send(['p', r2(self.x), r2(self.y), r2(self.a)]); } }
        const Me = Ppos[me] || (Ppos[me] = {}); Me.x = Me.tx = self.x; Me.y = Me.ty = self.y; Me.a = Me.ta = self.a;
      }
      const kk = 1 - Math.exp(-dt * 14), hostNow = isHost();
      for (const id in Ppos) { const P = Ppos[id]; if (id === me || P.tx == null || (hostNow && X.H.isBot(id))) continue; if (Math.hypot(P.tx - P.x, P.ty - P.y) > 4) { P.x = P.tx; P.y = P.ty; } P.x += (P.tx - P.x) * kk; P.y += (P.ty - P.y) * kk; P.a = nrm(P.a + nrm(P.ta - P.a) * kk); }
      let vx = self.x, vy = self.y, va = self.a, watching = null; X.view = me;
      if (!p || !p.al) { const mates = Object.keys(S.pl).filter(i => i !== me && S.pl[i].al && Ppos[i] && (!p || S.pl[i].tm === p.tm)); if (mates.length) { watching = mates[spec % mates.length]; const P = Ppos[watching]; vx = P.x; vy = P.y; va = P.a; X.view = watching; } if (inp.fire && !inp.held) { inp.held = 1; spec++; } }
      cx.textBaseline = 'alphabetic'; render(now, vx, vy, va, self.zoom && !watching); hud(now, p, watching); ui(p);
    }
    function destroy() { if (dead) return; dead = true; clearInterval(hostIv); AB.abort(); try { ws && ws.close(); } catch (e) { } try { if (document.pointerLockElement === wrap) document.exitPointerLock(); } catch (e) { } }
    function set(st, id, sendFn, H) { const first = !X; X = Object.assign(X || {}, { st, send: sendFn, H }); me = id; m = parseMap(st.map); if (first) { const f = window.DW && DW.P.face; if (f) setFaceImg(me, f); connect(); lastF = performance.now(); requestAnimationFrame(frame); } }
    return { wrap, set, destroy, dbg: { S: () => S, self, Ppos, toHost, faces, isHost, hostObj: () => host } };
  }

  G.reg({
    id: 'strike', n: 'طخطخة', cat: 'act', em: '🔫', hue: 12, min: 2, max: 12, t: 12, modes: 'ps', rt: 1, solo: 6,
    _t: { RAW, parseMap, cast, los, field, newS, makeHost, WP },
    d: 'تصويب بمنظور الشخص الأول بين فريقين حتى 6 ضد 6، بثلاث خرائط وصورة وجهك على شخصيتك.',
    r: 'فريقان: المهاجمون يحاولون زرع القنبلة في أحد الموقعين A أو B، والمدافعون يمنعونهم أو يبطلونها. تُحسم الجولة بالقضاء على الفريق الآخر، أو بانفجار القنبلة، أو بإبطالها، أو بانتهاء الوقت (لصالح المدافعين). قبل كل جولة لديك 7 ثوانٍ لشراء سلاح بأموال افتراضية تكسبها من الجولات والإصابات، ومن ينجُ يحتفظ بسلاحه. الإصابة في الوجه تضاعف الضرر. الكمبيوتر: WASD للحركة والفأرة للتصويب و E للزرع والإبطال. الجوال: اسحب يسار الشاشة للحركة ويمينها للتصويب، واضغط 📷 لوضع صورة وجهك على شخصيتك. صور الوجوه تُرسل للاعبين في غرفتك فقط ولا تُحفظ على الخادم.',
    opts: [{ k: 'map', n: 'الخريطة', v: ['عشوائي', ...Object.keys(RAW)], d: 'عشوائي' }, { k: 'w', n: 'جولات الفوز', v: [3, 5, 8], d: 5 }, { k: 'bot', n: 'مستوى الآليين', v: ['سهل', 'متوسط', 'صعب'], d: 'متوسط' }],
    init(ps, o, H) {
      const st = { ps, sc: U.zero(ps), tm: {}, map: RAW[o.map] ? o.map : U.pick(Object.keys(RAW)) }; let a = [], b = [];
      if (H.teamsOn && H.team) for (const id of ps) (H.team(id) === 2 ? b : a).push(id);
      if (!a.length || !b.length || Math.abs(a.length - b.length) > 1 && !H.teamsOn) { a = []; b = []; ps.forEach((id, i) => (i % 2 ? b : a).push(id)); }
      a.forEach(id => st.tm[id] = 0); b.forEach(id => st.tm[id] = 1); return st;
    },
    act(st, p, a, H) {
      if (st.over || a.t !== 'over' || (H.hostId && p !== H.hostId())) return; const win = a.win ? 1 : 0, rs = [0, 1].map(i => (a.rs && a.rs[i]) | 0); st.fin = {};
      for (const id of st.ps) { const f = (a.fin && a.fin[id]) || [0, 0]; st.fin[id] = [f[0] | 0, f[1] | 0]; st.sc[id] = f[0] | 0; }
      st.rs = rs; st.over = { win: st.ps.filter(id => st.tm[id] === win), msg: `فاز ${TN[win]} ${rs[win]} – ${rs[1 - win]}` };
    },
    view(st, me, H) {
      if (st.over) return `<div class="pn"><p class="big ctr">${esc(st.over.msg)}</p><div class="tblw"><table class="tbl"><tr><th>اللاعب</th><th>الفريق</th><th>إصابات قاتلة</th><th>مرات السقوط</th></tr>${st.ps.slice().sort((a, b) => st.fin[b][0] - st.fin[a][0]).map(id => `<tr><td>${H.av(id)} ${esc(H.nm(id))}</td><td style="color:${TC[st.tm[id]]}">${TN[st.tm[id]]}</td><td>${st.fin[id][0]}</td><td>${st.fin[id][1]}</td></tr>`).join('')}</table></div></div>`;
      return `<p class="ctr mut">الخريطة: ${esc(st.map)} · أنت مع <b style="color:${TC[st.tm[me]]}">${TN[st.tm[me]]}</b> · اضغط ⛶ لملء الشاشة و 📷 لوضع وجهك</p><div data-keep="strike"></div>`;
    },
    bind(el, st, me, send, H) { const s = el.querySelector('[data-keep=strike]'); if (!s) return; const e = H.keep('strike', Engine); e.set(st, me, send, H); if (e.wrap.parentNode !== s) s.appendChild(e.wrap); window.SK = e; },
  });
})();
