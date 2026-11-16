/* طخطخة — النواة المشتركة بين الخادم والمتصفح: الخرائط، التصادم، مسار الرصاص، ومحاكاة المباراة (الجولات، الضرر، القنبلة، الآليون).
   الوحدة = بلاطة واحدة = متران تقريباً. الإحداثيات: x,y على الأرض و z للأعلى. */
(function (root, f) { if (typeof module === 'object' && module.exports) module.exports = f(); else root.SKC = f(); })(typeof self !== 'undefined' ? self : this, function () {
  const RAD = .22, FREEZE = 10000, ROUND = 115000, ENDT = 6000, BOMB = 40000, PLANT = 3200, DEFUSE = 5000, ARMOR = 650;
  const BODY = [{ top: .72, head: .82 }, { top: .46, head: .54 }], HR = .095, BR = .2;
  const WP = {
    pistol: { n: 'مسدس', $: 0, dmg: 28, hs: 2.2, rate: 220, mag: 12, rel: 1300, sp: .012, rec: .02, auto: 0, fall: .012 },
    smg: { n: 'رشاش خفيف', $: 1200, dmg: 20, hs: 1.9, rate: 75, mag: 30, rel: 1900, sp: .03, rec: .011, auto: 1, fall: .02 },
    shotgun: { n: 'شوزن', $: 1700, dmg: 14, hs: 1.3, pel: 8, rate: 850, mag: 6, rel: 2400, sp: .07, rec: .05, auto: 0, fall: .06 },
    rifle: { n: 'بندقية AK', $: 2700, dmg: 33, hs: 3.2, rate: 100, mag: 30, rel: 2200, sp: .012, rec: .017, auto: 1, fall: .008 },
    sniper: { n: 'قناصة', $: 4200, dmg: 92, hs: 3, rate: 1300, mag: 5, rel: 3000, sp: .001, rec: .06, auto: 0, zoom: 1, fall: 0 },
  };
  const FULL = '#2KSWop', LOWH = { c: .55, v: .6, r: .5, x: .5 };
  const RAW = {
    'الحارة': { theme: 'hara', rows: [
      '################################',
      '#TTT..#####..v...####....#aaaa.#',
      '#TTT..#####......####....#aaaa.#',
      '#TTT.........c...####..c...aaa.#',
      '#.....#####..........,,..#.....#',
      '#..v..#####.####.###.##..####.##',
      '#.....##........c...........#..#',
      '##.#####..##.........###.x..#..#',
      '#......#..##..###.v..###....,..#',
      '#..p...,......###....###.##.#..#',
      '#.c.##.#..r.........c....##.#..#',
      '#...##.#######.,.####.......#DD#',
      '#......#.....#...#....##.c..#DD#',
      '###.####..c..#...#.v..##.....DD#',
      '#......,.....##,##...........DD#',
      '#.v....#..........##.####.######',
      '#......####.##.c..##.####......#',
      '#bbbb..####.##......x......p...#',
      '#bbbb.......##..r...####..v....#',
      '#bbbb..#....,.......####.......#',
      '#bbbb..#....##.c...............#',
      '################################'] },
    'المستودع': { theme: 'depot', rows: [
      '##############################',
      '#TTT....KK....S.S.S....#aaaa.#',
      '#TTT....KK....S.S.S......aaa.#',
      '#TTT..c.......S.S.S..c.#aaaa.#',
      '#.......KK.............###.###',
      '#..KK...KK..c..KKK.r.........#',
      '#..KK..........KKK.....S.S...#',
      '#......r...v...........S.S...#',
      '###.#####..........KK..S.S...#',
      '#.......#..SSSS.c..KK.......D#',
      '#..c....#..................DD#',
      '#.......#..SSSS....c..##.#.DD#',
      '#.KK.............v....#....DD#',
      '#.KK..r..KKK..........#..c.###',
      '#........KKK...S.S.S..#......#',
      '#bbbb..........S.S.S.....KK..#',
      '#bbbb...c......S.S.S..r..KK..#',
      '#bbbb.....KK.................#',
      '#bbbb.....KK....c....#.......#',
      '##############################'] },
    'القلعة': { theme: 'castle', rows: [
      'W##############WW##############W',
      '#TTT...#......,..,......#...DDD#',
      '#TTT...#..##########....#...DDD#',
      '#TTT......#aaaaaaaa#........DDD#',
      '#......#..#aaaaaaaa#..x.#......#',
      '####,###..###.aa.###..x.####,###',
      '#......,................,......#',
      '#..c.......o...x...o.......c...#',
      '#..........................r...#',
      '#...##..##...W##W...##..##.....#',
      '#...##..##...#,,#...##..##.....#',
      '#...........,,,,,,.............#',
      '#...##..##...#,,#...##..##.....#',
      '#...##..##...W##W...##..##.....#',
      '#..r.......................c...#',
      '#..c.......o...x...o...........#',
      '#......,................,......#',
      '####,###..###.bb.###..x.####,###',
      '#......#..#bbbbbbbb#..x.#......#',
      '#.........#bbbbbbbb#...........#',
      '#......#..##########....#......#',
      'W##############WW##############W'] },
  };
  const MC = {};
  function parseMap(name) {
    if (MC[name]) return MC[name]; const r = RAW[name] || RAW[Object.keys(RAW)[0]], h = r.rows.length, w = Math.max(...r.rows.map(x => x.length));
    const m = { name, theme: r.theme, w, h, g: new Uint8Array(w * h), hh: new Float32Array(w * h), st: new Uint8Array(w * h), cov: new Uint8Array(w * h), ch: [], sp: [[], []], sc: {}, fc: new Map() }, acc = { a: [0, 0, 0], b: [0, 0, 0] };
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let c = r.rows[y][x] || '#'; if ((!x || !y || x === w - 1 || y === h - 1) && !FULL.includes(c)) c = '#'; const i = y * w + x; m.ch[i] = c;
      if (FULL.includes(c)) { m.g[i] = 1; m.hh[i] = 99; } else if (LOWH[c]) { m.g[i] = 2; m.hh[i] = LOWH[c]; }
      else if (c === 'T') m.sp[0].push([x + .5, y + .5]); else if (c === 'D') m.sp[1].push([x + .5, y + .5]); else if (c === ',') m.cov[i] = 1;
      else if (c === 'a' || c === 'b') { m.st[i] = c === 'a' ? 1 : 2; acc[c][0] += x + .5; acc[c][1] += y + .5; acc[c][2]++; }
    }
    for (const k of ['a', 'b']) { let bx = 1.5, by = 1.5, bd = 1e9; const ax = acc[k][0] / acc[k][2], ay = acc[k][1] / acc[k][2]; for (let i = 0; i < w * h; i++) if (m.st[i] === (k === 'a' ? 1 : 2)) { const x = i % w + .5, y = (i / w | 0) + .5, d = Math.hypot(x - ax, y - ay); if (d < bd) { bd = d; bx = x; by = y; } } m.sc[k] = [bx, by]; }
    return MC[name] = m;
  }
  /* مسار ثلاثي الأبعاد عبر الشبكة: الجدران الكاملة تحجب دائماً، والسواتر المنخفضة تحجب ما دون ارتفاعها. يعيد المسافة على المتجه (غير مطبَّع مسموح). */
  const R3 = { t: 0, kind: '', side: 0, sx: 1, sy: 1 };
  function ray3(m, ox, oy, oz, dx, dy, dz, max, lowToo) {
    let mx = ox | 0, my = oy | 0, side = 0, te = 0; const ddx = dx ? Math.abs(1 / dx) : 1e30, ddy = dy ? Math.abs(1 / dy) : 1e30, sx = dx < 0 ? -1 : 1, sy = dy < 0 ? -1 : 1, tf = dz < 0 ? -oz / dz : 1e30;
    let sdx = dx < 0 ? (ox - mx) * ddx : (mx + 1 - ox) * ddx, sdy = dy < 0 ? (oy - my) * ddy : (my + 1 - oy) * ddy; R3.sx = sx; R3.sy = sy;
    for (let i = 0; i < 160; i++) {
      if (sdx < sdy) { te = sdx; sdx += ddx; mx += sx; side = 0; } else { te = sdy; sdy += ddy; my += sy; side = 1; }
      if (tf <= te) { if (tf > max) break; R3.t = tf; R3.kind = 'f'; return tf; }
      if (te > max) break;
      if (mx < 0 || my < 0 || mx >= m.w || my >= m.h) { R3.t = te; R3.kind = 'w'; R3.side = side; return te; }
      const k = m.g[my * m.w + mx]; if (!k) continue;
      if (k === 1) { R3.t = te; R3.kind = 'w'; R3.side = side; return te; }
      if (lowToo === false) continue;
      const hh = m.hh[my * m.w + mx], ze = oz + dz * te; if (ze < hh) { R3.t = te; R3.kind = 'w'; R3.side = side; return te; }
      const tx = Math.min(sdx, sdy), zx = oz + dz * tx; if (zx < hh && dz < 0) { const tt = (hh - oz) / dz; R3.t = tt; R3.kind = 't'; return tt; }
    }
    R3.t = max; R3.kind = ''; return max;
  }
  function los3(m, x1, y1, z1, x2, y2, z2) { const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1, d = Math.hypot(dx, dy, dz); if (d < .01) return true; return ray3(m, x1, y1, z1, dx / d, dy / d, dz / d, d) >= d - .03; }
  /* إصابة لاعب: رأس كروي وجسم أسطواني. المتجه مطبَّع. */
  const H3 = { t: 0, part: 0 };
  function hitPlayer(ox, oy, oz, dx, dy, dz, px, py, cr, pad) {
    const b = BODY[cr ? 1 : 0], hr = HR + (pad || 0), br = BR + (pad || 0); let best = 1e30, part = 0;
    const hx = px - ox, hy = py - oy, hz = b.head - oz, tc = hx * dx + hy * dy + hz * dz; if (tc > 0) { const d2 = hx * hx + hy * hy + hz * hz - tc * tc; if (d2 < hr * hr) { best = tc - Math.sqrt(hr * hr - d2); part = 1; } }
    const a = dx * dx + dy * dy; if (a > 1e-9) { const fx = ox - px, fy = oy - py, bq = fx * dx + fy * dy, c = fx * fx + fy * fy - br * br, disc = bq * bq - a * c; if (disc > 0) { const t = (-bq - Math.sqrt(disc)) / a, z = oz + dz * t; if (t > 0 && z >= 0 && z <= b.top && t < best) { best = t; part = 0; } } }
    if (best > 1e29) return false; H3.t = best; H3.part = part; return true;
  }
  const solid = (m, x, y) => x < 0 || y < 0 || x >= m.w || y >= m.h || m.g[(y | 0) * m.w + (x | 0)] > 0;
  const blk = (m, x, y) => solid(m, x - RAD, y - RAD) || solid(m, x + RAD, y - RAD) || solid(m, x - RAD, y + RAD) || solid(m, x + RAD, y + RAD);
  function mv(m, P, dx, dy) { if (!blk(m, P.x + dx, P.y)) P.x += dx; if (!blk(m, P.x, P.y + dy)) P.y += dy; }
  function field(m, gx, gy) {
    const key = gy * m.w + gx; let F = m.fc.get(key); if (F) return F; F = new Int16Array(m.w * m.h).fill(-1); m.fc.set(key, F); if (m.g[key]) return F;
    const q = [key]; F[key] = 0; for (let i = 0; i < q.length; i++) { const c = q[i], x = c % m.w, y = c / m.w | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy, n = Y * m.w + X; if (X < 0 || Y < 0 || X >= m.w || Y >= m.h || m.g[n] || F[n] >= 0) continue; F[n] = F[c] + 1; q.push(n); } }
    return F;
  }
  const nrm = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
  const r2 = v => Math.round(v * 100) / 100, rnd = Math.random, cl = (v, a, b) => Math.max(a, Math.min(b, v));
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- محاكاة المباراة: تعمل على الخادم للغرف المباشرة، وفي المتصفح للتدريب بلا اتصال ---------- */
  function Sim(cfg) {
    const m = parseMap(cfg.map), now = cfg.now, emit = cfg.emit, D = [.55, 1, 1.5][cfg.diff] || 1, pos = {}, bots = {}, last = {}, actT = {}, dmgLog = {}, taken = {}, hold = {}, lastHit = {}, t0 = now(), target = cfg.target || 5;
    const S = { ph: 'freeze', r: FREEZE, rd: 1, sc: [0, 0], pl: {}, bomb: null, lw: -1, msg: '', map: m.name, tg: target };
    for (const id of cfg.ps) S.pl[id] = { tm: cfg.tm[id] ? 1 : 0, hp: 100, ar: 0, al: 1, k: 0, d: 0, as: 0, hs: 0, w: '', $: 800, sp: [1.5, 1.5, 0] };
    let dl = 0, bdl = 0, liveT = 0, snapT = 0, botT = t0, posT = 0, dirty = true, plan = 'a', done = false;
    const ids = () => Object.keys(S.pl), alive = tm => ids().filter(i => S.pl[i].al && S.pl[i].tm === tm);
    const isBot = id => !!cfg.bots[id] || (!cfg.connected(id) && now() - (last[id] || t0) > 6000);
    const spos = p => ({ x: p.sp[0], y: p.sp[1], a: p.sp[2], pi: 0, fl: 0, cr: 0 });
    const nb = () => ({ site: 'a', seen: 0, sid: null, next: 0, act: 0, str: 1, strT: 0, swT: 0, crT: 0, hunt: rnd() < .25, ammo: 0, rel: 0, burst: 4, alert: 0, ls: null, gc: null, gk: '' });
    function startRound(first) {
      for (const tm of [0, 1]) { const tiles = shuf(m.sp[tm]); ids().filter(i => S.pl[i].tm === tm).forEach((id, i) => { const t = tiles[i % tiles.length]; S.pl[id].sp = [t[0], t[1], r2(Math.atan2(m.h / 2 - t[1], m.w / 2 - t[0]))]; }); }
      plan = rnd() < .5 ? 'a' : 'b'; let ci = 0, ti = 0;
      for (const id of ids()) {
        const p = S.pl[id]; if (!first && !p.al) { p.w = ''; p.ar = 0; } p.hp = 100; p.al = 1; dmgLog[id] = {}; delete actT[id];
        const B = bots[id] = nb(); B.site = p.tm ? (ci++ % 2 ? 'b' : 'a') : (ti++ % 4 === 3 ? (plan === 'a' ? 'b' : 'a') : plan);
        if (isBot(id)) {
          pos[id] = spos(p); taken[id] = cfg.bots[id] ? 0 : 1; const r = rnd(), w = p.$ >= 2700 && r < .8 ? 'rifle' : p.$ >= 4200 + 650 && r < .9 ? 'sniper' : p.$ >= 1700 && r < .25 ? 'shotgun' : p.$ >= 1200 ? 'smg' : '';
          if (w && w !== 'sniper' && (!p.w || WP[w].$ > WP[p.w].$)) { p.$ -= WP[w].$; p.w = w; } if (p.ar < 100 && p.$ >= ARMOR + 200) { p.$ -= ARMOR; p.ar = 100; }
        }
        B.ammo = WP[p.w || 'pistol'].mag;
      }
      S.bomb = null; S.ph = 'freeze'; S.msg = ''; dl = now() + FREEZE; dirty = true;
    }
    function endRound(win, msg) { S.sc[win]++; S.lw = win; S.msg = msg; for (const id of ids()) { const p = S.pl[id]; p.$ = Math.min(12000, p.$ + (p.tm === win ? 3000 : 1900)); } S.ph = 'end'; dl = now() + ENDT; dirty = true; }
    function hurt(from, vid, part, slot, pel) {
      const a = S.pl[from], v = S.pl[vid], A = pos[from], V = pos[vid]; if (S.ph !== 'live' || !a || !v || !a.al || !v.al || a.tm === v.tm || !A || !V) return;
      const wn = slot && a.w ? a.w : 'pistol', W = WP[wn], d = Math.hypot(A.x - V.x, A.y - V.y); let dmg = W.dmg * Math.max(.35, 1 - d * W.fall) * (part ? W.hs : 1) * cl(pel | 0 || 1, 1, W.pel || 1);
      if (v.ar > 0) { const ab = Math.min(v.ar, dmg * .35); v.ar = Math.round(v.ar - ab); dmg -= ab; }
      dmg = Math.max(1, Math.round(dmg)); v.hp -= dmg; dirty = true; dmgLog[vid][from] = (dmgLog[vid][from] || 0) + dmg; emit(['dm', vid, from, dmg, part ? 1 : 0]);
      const VB = bots[vid]; if (VB) { VB.alert = now() + 5000; VB.ls = { x: A.x, y: A.y, t: now() }; }
      if (v.hp <= 0) { v.hp = 0; v.al = 0; v.d++; a.k++; if (part) a.hs++; a.$ = Math.min(12000, a.$ + 300); for (const o in dmgLog[vid]) if (o !== from && dmgLog[vid][o] >= 40 && S.pl[o]) S.pl[o].as++; emit(['k', from, vid, wn, part ? 1 : 0]); v.w = ''; v.ar = 0; }
    }
    function plant(id) { const p = S.pl[id], P = pos[id]; if (!P || p.tm !== 0 || !p.al || S.ph !== 'live' || S.bomb || !m.st[(P.y | 0) * m.w + (P.x | 0)]) return; S.bomb = { x: r2(P.x), y: r2(P.y), r: BOMB }; bdl = now() + BOMB; p.$ = Math.min(12000, p.$ + 300); emit(['e', 'pl', S.bomb.x, S.bomb.y]); dirty = true; }
    function defuse(id) { const p = S.pl[id], P = pos[id]; if (!P || p.tm !== 1 || !p.al || S.ph !== 'live' || !S.bomb || Math.hypot(P.x - S.bomb.x, P.y - S.bomb.y) > 1.3) return; emit(['e', 'df', S.bomb.x, S.bomb.y]); endRound(1, 'أُبطلت القنبلة'); }
    function msg(from, q) {
      const p = S.pl[from], t = now(); if (!p || !Array.isArray(q)) return;
      if (q[0] === 'p') {
        if (hold[from] > t) return; const x = +q[1], y = +q[2]; if (!(x > 0 && y > 0 && x < m.w && y < m.h) || m.g[(y | 0) * m.w + (x | 0)]) return;
        const fl = q[5] | 0; pos[from] = { x, y, a: +q[3] || 0, pi: cl(+q[4] || 0, -1.5, 1.5), fl, cr: fl & 1 }; last[from] = t; taken[from] = 0; if (fl & 8) { if (!actT[from]) actT[from] = t; } else delete actT[from];
      } else if (q[0] === 'h') {
        const W = WP[q[3] && p.w ? p.w : 'pistol'], A = pos[from], V = pos[q[1]]; if (!A || !V || t - (lastHit[from] || 0) < W.rate * .5) return; const d = Math.hypot(A.x - V.x, A.y - V.y);
        if (d > 70 || (d > 1.5 && ray3(m, A.x, A.y, .8, (V.x - A.x) / d, (V.y - A.y) / d, 0, d, false) < d - 1.3)) return; lastHit[from] = t; hurt(from, q[1], q[2] ? 1 : 0, q[3] ? 1 : 0, q[4]);
      } else if (q[0] === 'buy') {
        if (!p.al || S.ph !== 'freeze') return; if (q[1] === 'armor') { if (p.ar < 100 && p.$ >= ARMOR) { p.$ -= ARMOR; p.ar = 100; dirty = true; } } else { const w = WP[q[1]]; if (w && w.$ && p.w !== q[1] && p.$ >= w.$) { p.$ -= w.$; p.w = q[1]; dirty = true; } }
      } else if (q[0] === 'pl') { if (actT[from] && t - actT[from] >= PLANT - 500) plant(from); }
      else if (q[0] === 'df') { if (actT[from] && t - actT[from] >= DEFUSE - 600) defuse(from); }
    }
    function join(id) { if (!S.pl[id]) return; emit(['S', S], id); if (taken[id] && pos[id] && S.pl[id].al) { hold[id] = now() + 600; emit(['tp', r2(pos[id].x), r2(pos[id].y), r2(pos[id].a), S.rd], id); } taken[id] = 0; last[id] = now(); }
    function turn(P, ta, mx) { const d = nrm(ta - P.a); P.a = nrm(P.a + cl(d, -mx, mx)); return nrm(ta - P.a); }
    function guardCell(B, cx, cy, key) {
      if (B.gk === key && B.gc) return B.gc; B.gk = key; B.gc = [cx, cy];
      for (let i = 0; i < 24; i++) { const x = (cx + (rnd() * 10 - 5)) | 0, y = (cy + (rnd() * 10 - 5)) | 0; if (x < 1 || y < 1 || x >= m.w - 1 || y >= m.h - 1 || m.g[y * m.w + x]) continue; const d = Math.hypot(x + .5 - cx, y + .5 - cy); if (d < 1.5 || d > 5 || !los3(m, x + .5, y + .5, .7, cx, cy, .3)) continue; B.gc = [x + .5, y + .5]; break; }
      return B.gc;
    }
    function botStep(dt, t) {
      const all = ids(), defuser = S.bomb ? all.filter(i => S.pl[i].al && S.pl[i].tm === 1 && isBot(i) && pos[i]).sort((a, b) => Math.hypot(pos[a].x - S.bomb.x, pos[a].y - S.bomb.y) - Math.hypot(pos[b].x - S.bomb.x, pos[b].y - S.bomb.y))[0] : null;
      for (const id of all) {
        if (!isBot(id)) continue; const p = S.pl[id]; if (!p.al) continue; taken[id] = cfg.bots[id] ? 0 : 1;
        const B = bots[id] || (bots[id] = nb()), P = pos[id] || (pos[id] = spos(p)), W = WP[p.w || 'pistol'], ez = BODY[P.cr ? 1 : 0].head; let best = null, bd = 1e9, bodyVis = false, near = null, nd = 1e9;
        for (const e of all) {
          const q = S.pl[e], Q = pos[e]; if (!q.al || q.tm === p.tm || !Q) continue; const d = Math.hypot(Q.x - P.x, Q.y - P.y); if (d < nd) { nd = d; near = Q; }
          if (d >= bd || d > 28) continue; if (d > 3 && B.alert < t && Math.abs(nrm(Math.atan2(Q.y - P.y, Q.x - P.x) - P.a)) > 1.75) continue;
          const qb = BODY[Q.cr ? 1 : 0]; if (!los3(m, P.x, P.y, ez, Q.x, Q.y, qb.head)) continue; bd = d; best = e; bodyVis = los3(m, P.x, P.y, ez, Q.x, Q.y, qb.top * .6);
        }
        if (best) {
          const Q = pos[best], qb = BODY[Q.cr ? 1 : 0]; B.seen = B.sid === best ? B.seen + dt : 0; B.sid = best; B.act = 0; B.alert = t + 4000; B.ls = { x: Q.x, y: Q.y, t };
          const df = turn(P, Math.atan2(Q.y - P.y, Q.x - P.x), (5 + 3 * D) * dt); P.pi = Math.atan2((bodyVis ? qb.top * .7 : qb.head) - ez, bd); let fwd = 0;
          if (B.rel > t) fwd = -1.6;
          else if (B.seen > .5 / D && Math.abs(df) < .2 && t >= B.next) {
            B.next = t + W.rate * (W.auto ? 1.15 : 1.6); if (W.auto && --B.burst <= 0) { B.burst = 3 + (rnd() * 6 | 0); B.next += 220 + rnd() * 320; }
            const er = (1 - cl(.7 * D, .2, .95)) * .12; emit(['f', p.w ? 1 : 0, r2(P.a + (rnd() - .5) * er), r2(P.pi + (rnd() - .5) * er), id]);
            if (--B.ammo <= 0) { B.ammo = W.mag; B.rel = t + W.rel; }
            if (rnd() < cl(.7 - bd * .028 + (P.cr ? .08 : 0), .1, .75) * D * (bodyVis ? 1 : .45)) hurt(id, best, !bodyVis || rnd() < .08 + .07 * D ? 1 : 0, p.w ? 1 : 0, W.pel ? Math.ceil(W.pel * cl(1 - bd * .09, .15, .8)) : 1);
          }
          if (t > B.strT) { B.strT = t + 500 + rnd() * 900; B.str = rnd() < .3 ? 0 : rnd() < .5 ? -1 : 1; } if (t > B.crT) { B.crT = t + 1500 + rnd() * 2000; P.cr = bd > 6 && rnd() < .35 ? 1 : 0; }
          if (!fwd) fwd = bd < 2.2 ? -1.2 : p.w === 'shotgun' && bd > 5 ? 1.6 : 0; const sp = P.cr ? .5 : 1;
          mv(m, P, (Math.cos(P.a) * fwd - Math.sin(P.a) * B.str * 1.3) * dt * sp, (Math.sin(P.a) * fwd + Math.cos(P.a) * B.str * 1.3) * dt * sp); P.fl = (P.cr ? 1 : 0) | 2 | (p.w ? 4 : 0);
        } else {
          B.seen = 0; B.sid = null; P.pi = 0; P.cr = 0; const b = S.bomb, el = t - liveT; let gx, gy, mode = 'site';
          if (b) { if (p.tm === 1) { gx = b.x; gy = b.y; mode = id === defuser ? 'defuse' : 'guard'; } else { mode = 'guard'; } if (mode === 'guard') { const g = guardCell(B, b.x, b.y, 'b' + S.rd); gx = g[0]; gy = g[1]; } }
          else if (B.ls && t - B.ls.t < 6000 && Math.hypot(B.ls.x - P.x, B.ls.y - P.y) > 1) { gx = B.ls.x; gy = B.ls.y; mode = 'hunt'; }
          else if ((B.hunt || el > 50000) && near) { gx = near.x; gy = near.y; mode = 'hunt'; }
          else if (p.tm === 0) { gx = m.sc[B.site][0]; gy = m.sc[B.site][1]; mode = 'plant'; }
          else { if (t > B.swT) { if (B.swT && rnd() < .3) B.site = B.site === 'a' ? 'b' : 'a'; B.swT = t + 14000 + rnd() * 9000; } const g = guardCell(B, m.sc[B.site][0], m.sc[B.site][1], B.site + S.rd + B.swT); gx = g[0]; gy = g[1]; mode = 'guard'; }
          const d = Math.hypot(gx - P.x, gy - P.y), inSite = m.st[(P.y | 0) * m.w + (P.x | 0)] === (B.site === 'a' ? 1 : 2), arrived = mode === 'plant' ? inSite && d < 2 : d < (mode === 'defuse' ? .8 : .6);
          if (arrived) {
            P.fl = (p.w ? 4 : 0);
            if (mode === 'plant') { B.act += dt; P.fl |= 8 | 1; P.cr = 1; if (B.act >= PLANT / 1000) { B.act = 0; plant(id); } }
            else if (mode === 'defuse') { B.act += dt; P.fl |= 8 | 1; P.cr = 1; if (B.act >= DEFUSE / 1000) { B.act = 0; defuse(id); } }
            else if (mode === 'guard') { const es = m.sp[1 - p.tm][0], F = field(m, es[0] | 0, es[1] | 0), cx = P.x | 0, cy = P.y | 0; let bx = 0, by = 0, bv = 1e9; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const v = F[(cy + dy) * m.w + cx + dx]; if (v >= 0 && v < bv) { bv = v; bx = dx; by = dy; } } turn(P, Math.atan2(by, bx) + Math.sin(t / 900 + B.strT) * .7, 2.5 * dt); if (t > B.crT) { B.crT = t + 4000; B.crg = rnd() < .4; } P.cr = B.crg ? 1 : 0; P.fl |= P.cr; }
            else { B.ls = null; P.a = nrm(P.a + dt * 1.2); }
          } else {
            B.act = 0; const F = field(m, gx | 0, gy | 0), cx = P.x | 0, cy = P.y | 0; let nx = cx, ny = cy, bv = F[cy * m.w + cx]; if (bv < 0) bv = 1e9;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const X = cx + dx, Y = cy + dy; if (X < 0 || Y < 0 || X >= m.w || Y >= m.h) continue; const v = F[Y * m.w + X]; if (v < 0) continue; if (dx && dy && (m.g[cy * m.w + X] || m.g[Y * m.w + cx])) continue; if (v < bv) { bv = v; nx = X; ny = Y; } }
            const same = nx === cx && ny === cy, tx = same ? gx : nx + .5, ty = same ? gy : ny + .5, ta = Math.atan2(ty - P.y, tx - P.x), sp = mode === 'guard' && d < 3 ? 1.6 : 2.5; turn(P, ta, 8 * dt); mv(m, P, Math.cos(ta) * sp * dt, Math.sin(ta) * sp * dt); P.fl = 2 | (p.w ? 4 : 0);
          }
        }
        for (const o of all) { if (o === id || !S.pl[o].al || !pos[o] || S.pl[o].tm !== p.tm) continue; const O = pos[o], dx = P.x - O.x, dy = P.y - O.y, dd = Math.hypot(dx, dy); if (dd < .45 && dd > .001) mv(m, P, dx / dd * .02, dy / dd * .02); }
      }
    }
    function heard(id) { const A = pos[id], a = S.pl[id]; if (!A || !a) return; const t = now(); for (const o in bots) { const p = S.pl[o], P = pos[o]; if (!p || !p.al || p.tm === a.tm || !P || bots[o].sid) continue; if (Math.hypot(P.x - A.x, P.y - A.y) < 13 && rnd() < .5) { bots[o].ls = { x: A.x, y: A.y, t }; bots[o].alert = t + 3000; } } }
    function tick() {
      if (done) return; const t = now();
      if (S.ph === 'freeze') { if (t >= dl) { S.ph = 'live'; dl = t + ROUND; liveT = t; botT = t; dirty = true; } }
      else if (S.ph === 'live') {
        const a = alive(0).length, c = alive(1).length;
        if (S.bomb) { if (!c) endRound(0, 'قُضي على المدافعين'); else if (t >= bdl) { emit(['e', 'boom', S.bomb.x, S.bomb.y]); for (const id of ids()) { const p = S.pl[id], P = pos[id]; if (p.al && P && Math.hypot(P.x - S.bomb.x, P.y - S.bomb.y) < 4) { p.hp = 0; p.al = 0; p.d++; p.w = ''; p.ar = 0; } } endRound(0, 'انفجرت القنبلة'); } }
        else if (!a) endRound(1, 'قُضي على المهاجمين'); else if (!c) endRound(0, 'قُضي على المدافعين'); else if (t >= dl) endRound(1, 'انتهى الوقت');
        if (S.ph === 'live' && t - botT >= 50) { botStep(Math.min(.1, (t - botT) / 1000), t); botT = t; }
      } else if (S.ph === 'end') {
        if (t >= dl) { if (S.sc[S.lw] >= target) { S.ph = 'over'; let mv = null, bs = -1; for (const id of ids()) { const p = S.pl[id], s = p.k * 2 + p.as + p.hs * .5 - p.d * .25; if (s > bs) { bs = s; mv = id; } } S.mvp = mv; S.r = 0; done = true; emit(['S', S]); if (cfg.onOver) cfg.onOver(S); return; } S.rd++; startRound(); }
      }
      if (dirty || t - snapT >= 250) { S.r = Math.max(0, Math.round(dl - t)); if (S.bomb) S.bomb.r = Math.max(0, Math.round(bdl - t)); snapT = t; dirty = false; emit(['S', S]); }
      if (t - posT >= 100) { posT = t; const arr = []; for (const id of ids()) if (isBot(id) && S.pl[id].al && pos[id]) { const P = pos[id]; arr.push([id, r2(P.x), r2(P.y), r2(P.a), r2(P.pi || 0), P.fl | 0]); } if (arr.length) emit(['b', arr]); }
    }
    startRound(true);
    return { S, pos, tick, msg, join, heard, isBot, get done() { return done; }, gk: cfg.gk };
  }
  return { RAW, WP, BODY, RAD, HR, BR, ARMOR, PLANT, DEFUSE, FREEZE, parseMap, ray3, R3, los3, hitPlayer, H3, mv, blk, field, nrm, r2, Sim };
});
