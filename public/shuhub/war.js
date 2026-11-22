/* شُهُب — حرب الجبل (Mountain War) client. Rules in war-core.js (window.SHW_C); shared helpers from game.js (window.SHG). */
(() => {
  'use strict';
  const C = window.SHW_C, G = window.SHG, $ = G.$, tr = G.tr, SFX = G.SFX;
  Object.assign(G.TXT.ar, { war: '⚔️ حرب الجبل', warS: 'واحد ضد واحد · صوّب فوق الجبل واهدم قلعة خصمك', warT: 'حرب الجبل', warHow: 'اسحب للخلف ثم أفلت: الاتجاه يحدد الزاوية، والمسافة تحدد القوة. مرّر قذائفك عبر بوابات المضاعفة فوق الجبل، واهدم قلب قلعة خصمك قبل أن يهدم قلبك.',
    warFriend: '⚔️ ضد صديق', warFriendS: 'أرسل له رابطاً على واتساب', warBots: 'أو تحدَّ قادة الجبل واحداً تلو الآخر', warLobby: 'غرفة الحرب', warLobbyS: 'أرسل الرابط لصديقك. أنت على يسار الجبل وهو على يمينه، وكلٌّ يرى نفسه على اليسار.', warStart: 'ابدأ الحرب',
    wSwarm: 'سرب', wFire: 'نار', wBoulder: 'صخرة', dmg: 'ضرر', time: 'الوقت', youWon: 'انتصرت! 🏆', youLost: 'سقطت قلعتك', vsBot: 'هزمت {0}!', lostTo: '{0} هدم قلعتك', nextBot: 'القائد التالي', rematch: 'جولة أخرى', retry: 'أعد',
    aimHint: '👆 اسحب للخلف وأفلت لتطلق', reload: 'يُعاد التلقيم…', incoming: '⚠️ قذائف قادمة!', need2: 'بانتظار صديقك…', mapN: 'الخريطة: {0}', windN: 'ريح', foeLeft: 'غادر خصمك — فزت', waitRes: 'القلب ينهار…', lockedBot: 'اهزم من قبله أولاً', botMap: 'خريطة {0}', fair: 'نفس القلعة ونفس الأسلحة للطرفين.' });
  Object.assign(G.TXT.en, { war: '⚔️ Mountain War', warS: '1 vs 1 · aim over the mountain, break the enemy fort', warT: 'Mountain War', warHow: 'Pull back and release: direction sets the angle, distance sets the power. Send your volley through the multiplier gates above the mountain and break the enemy heart before they break yours.',
    warFriend: '⚔️ Vs a friend', warFriendS: 'send them a WhatsApp link', warBots: 'or beat the mountain lords one by one', warLobby: 'War room', warLobbyS: 'Send the link to a friend. You\'re left of the mountain, they\'re right — each of you sees yourself on the left.', warStart: 'Start the war',
    wSwarm: 'Swarm', wFire: 'Fire', wBoulder: 'Boulder', dmg: 'damage', time: 'time', youWon: 'Victory! 🏆', youLost: 'Your fort fell', vsBot: 'You beat {0}!', lostTo: '{0} broke your fort', nextBot: 'Next lord', rematch: 'Rematch', retry: 'Retry',
    aimHint: '👆 Pull back and release to fire', reload: 'Reloading…', incoming: '⚠️ Incoming!', need2: 'Waiting for your friend…', mapN: 'Map: {0}', windN: 'wind', foeLeft: 'Your rival left — you win', waitRes: 'The heart is crumbling…', lockedBot: 'Beat the one before first', botMap: '{0} map', fair: 'Same fort and weapons for both sides.' });
  const AR = () => G.LANG === 'ar', nm = o => o.n[AR() ? 0 : 1];
  const PG = Object.assign({ un: 1, w: {} }, G.LS.get('shw_prog', {})); const saveP = () => G.LS.set('shw_prog', PG);
  const ICON = ['🐑', '🛡️', '🐎', '⚔️', '👑', '🦅'];
  /* ---------------- canvas ---------------- */
  const cv = $('cv'), cx = cv.getContext('2d'), mini = $('wMini'), mx = mini.getContext('2d');
  let VW = 0, VH = 0, DPR = 1, K = 1, OY = 0, viewW = 120, BG = null;
  function resize() {
    DPR = Math.min(2, devicePixelRatio || 1); VW = innerWidth; VH = innerHeight;
    const top = 104, bot = 96, availH = Math.max(200, VH - top - bot); K = Math.min(VW / Math.min(C.W, 125), availH / C.H); if (VW / K > C.W) K = Math.min(availH / C.H, VW / C.W) || K; viewW = VW / K;
    OY = top + Math.max(0, (availH - C.H * K) / 2); BG = paintBg(); mini.width = mini.clientWidth * DPR || 300; mini.height = mini.clientHeight * DPR || 80;
  }
  function paintBg() {
    const c = document.createElement('canvas'); c.width = VW * DPR; c.height = VH * DPR; const g = c.getContext('2d'); g.scale(DPR, DPR);
    const sky = g.createLinearGradient(0, 0, 0, VH); sky.addColorStop(0, '#120d2c'); sky.addColorStop(.4, '#2b1f5a'); sky.addColorStop(.7, '#8a4563'); sky.addColorStop(1, '#f0a868'); g.fillStyle = sky; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 120; i++) { g.fillStyle = `rgba(255,245,220,${.2 + G.hsh(i + 5) * .6})`; const r = G.hsh(i + 77) * 1.3 + .3; g.fillRect(G.hsh(i) * VW, G.hsh(i + 999) * VH * .5, r, r); }
    g.fillStyle = 'rgba(70,35,70,.55)'; g.beginPath(); g.moveTo(0, VH); for (let x = 0; x <= VW; x += 10) g.lineTo(x, OY + C.H * K * .62 + Math.sin(x * .013) * 18 + Math.sin(x * .041) * 6); g.lineTo(VW, VH); g.fill();
    return c;
  }
  /* ---------------- a battle ---------------- */
  let B = null; const parts = [], floats = [];
  const W = { get on() { return !!B; }, frame, leave };
  window.SHW = W;
  function start(o) { // o: {mode:'bot'|'net', map, seed, side, bot, names:[a,b], hues:[a,b], localAt}
    G.audio(); const st = C.create(o.map, o.seed, { hp1: o.mode === 'bot' ? (o.bot.hp || 1) : 1, protect: o.mode === 'net' ? 1 - o.side : null });
    B = Object.assign({ st, cam: 0, shake: 0, aim: null, wsel: 'swarm', fired: 0, endT: 0, flash: 0, slow: 1, lastCs: 0, botNext: 2.2 * 60, botR: C.rng(o.seed ^ 77), claimT: 0, t0: performance.now() }, o);
    if (B.mode === 'net') B.localAt = o.localAt; else B.localAt = performance.now() + 2600;
    B.cam = camTarget(); parts.length = floats.length = 0; G.show(null); $('whud').classList.remove('hide'); $('hud').classList.add('hide'); $('lang').classList.add('hide');
    $('wN0').textContent = B.names[0]; $('wN1').textContent = B.names[1]; $('wEmo').classList.toggle('hide', B.mode !== 'net'); $('wHint').textContent = tr('aimHint'); $('wHint').classList.toggle('hide', PG.fired > 3);
    $('wCd').classList.remove('hide'); selW('swarm'); hud(true);
  }
  function leave() { if (NET.ws) { const ws = NET.ws; NET.ws = null; try { ws.close(); } catch (e) { } history.replaceState(null, '', location.pathname); } if (B) { B = null; $('whud').classList.add('hide'); $('lang').classList.remove('hide'); } }
  const me = () => B.side, foe = () => 1 - B.side;
  /* view: mirrored for the right-side player so everyone sees themselves on the left */
  const vx = x => B.side ? C.W - x : x, SX = x => (vx(x) - B.cam) * K, SY = y => OY + y * K;
  function camTarget() {
    const st = B.st; if (viewW >= C.W) return (C.W - viewW) / 2;
    let lead = null; for (const p of st.R) if (p.o === me()) { const v = vx(p.x); if (lead == null || v > lead) lead = v; }
    let threat = false; for (const p of st.R) if (p.o === foe() && vx(p.x) < 165) threat = true;
    const t = lead != null && !threat ? lead - viewW * .55 : threat && lead == null ? 0 : lead != null ? Math.min(lead - viewW * .55, 60) : 0;
    return Math.max(0, Math.min(C.W - viewW, t));
  }
  function burst(x, y, n, col, sp = 30, life = .7, grav = 60, size = .8) { if (G.RM()) n = Math.ceil(n / 4); for (let i = 0; i < n && parts.length < 1500; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * sp; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * .3, l: life * (.5 + Math.random() * .7), m: life, c: col, s: size * (.5 + Math.random()), g: grav }); } }
  const BR = { 1: ['#d69a5c', '#c4874a', '#b9783f'], 2: ['#9aa0ad', '#868c99', '#7a808c'] };
  function cellXY(Cs, i) { return [Cs.x0 + ((i % Cs.cols) + .5) * C.CS, Cs.y0 + (((i / Cs.cols) | 0) + .5) * C.CS]; }
  let lastWh = 0;
  function events() {
    const st = B.st;
    for (const e of st.ev) {
      if (e.e === 'launch') { G.tone(90, .25, 'sine', .2, .5); G.noise(.35, 1800, 400, .12, 1); if (e.side === foe()) { if (performance.now() - lastWh > 900) { lastWh = performance.now(); G.tone(1400, 1.6, 'sine', .03, .45); } } else { B.fired++; PG.fired = (PG.fired || 0) + 1; saveP(); $('wHint').classList.add('hide'); } if (e.side === me()) G.buzz(15); }
      else if (e.e === 'gate') { SFX.gate(e.k); const g = st.gates[e.g]; if (performance.now() - (g.ft || 0) > 280) { g.ft = performance.now(); floats.push({ x: g.x, y: g.y - g.h / 2 - 3, t: '×' + e.k, c: '#7ff7df', l: 1.1, s: 1 }); } }
      else if (e.e === 'boom') { const big = e.r > 3; if (big || Math.random() < .5) { G.noise(big ? .7 : .25, big ? 500 : 900, big ? 60 : 150, big ? .35 : .1, .8); if (big) G.tone(55, .6, 'sine', .25, .6); } burst(e.x, e.y, big ? 50 : 7, e.dirt ? '#b77a4c' : '#ffcf7a', big ? 50 : 22, big ? 1.1 : .6, 90, big ? 1.6 : .8); if (big) { B.shake = Math.max(B.shake, .9); B.flash = .3; } if (e.dirt && !big && Math.random() < .3) burst(e.x, e.y, 2, '#ffe0a0', 15, .3, 0, .6); }
      else if (e.e === 'brk') { SFX.brk(e.k); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 6, BR[e.k][0], 24, .9, 90, 1); if (e.side === me()) B.shake = Math.max(B.shake, .25); }
      else if (e.e === 'core') { SFX.core(); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 3, '#ffd36b', 26, .5, 20, .8); B.shake = Math.max(B.shake, .2); if (e.side === me()) G.buzz(30); }
      else if (e.e === 'wind') toast('🌬 ' + windTxt());
      else if (e.e === 'win') onWin(e.winner);
    }
    st.ev.length = 0;
  }
  function onWin(w) {
    const st = B.st;
    if (B.mode === 'net' && w !== me()) netSend({ t: 'dead' });
    collapse(1 - w); B.endT = performance.now(); B.slow = .35; B.flash = 1; if (w === me()) SFX.win(); else SFX.lose(); G.buzz([40, 60, 120]);
  }
  function collapse(side) { const Cs = B.st.castles[side]; for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k) continue; const [x, y] = cellXY(Cs, i); parts.push({ x, y, vx: (Math.random() - .5) * 34, vy: -Math.random() * 34, l: 1.7 + Math.random(), m: 2.4, c: k === 9 ? '#ffd36b' : BR[k][i % 3], s: 2.6, g: 110, sq: 1 }); Cs.t[i] = 0; } B.shake = 1.3; }
  /* ---------------- loop ---------------- */
  function frame(dtr) {
    if (!B) return; const st = B.st, now = performance.now();
    const pre = now < B.localAt; if (pre) { const n = Math.ceil((B.localAt - now) / 1000); if (n !== B.cdN) { B.cdN = n; $('wCd').textContent = n; SFX.beep(0); } }
    else if (!B.goSaid) { B.goSaid = 1; $('wCd').textContent = AR() ? 'اشتباك!' : 'FIGHT!'; SFX.beep(1); setTimeout(() => $('wCd').classList.add('hide'), 700); }
    if (!pre) {
      let target = Math.floor((now - B.localAt) / (1000 / 60)); if (B.endT) target = st.tick + (Math.random() < B.slow ? 1 : 0);
      let n = 0; while (st.tick < target && n++ < (B.mode === 'net' ? 90 : 4)) { C.step(st); bot(); events(); if (!B) return; }
      if (B.mode === 'bot' && st.tick < target - 4) B.localAt = now - st.tick * (1000 / 60); // never run more than a few frames behind locally
    }
    if (B.endT) B.slow = Math.min(1, B.slow + dtr * .4);
    for (const p of st.R) if (Math.random() < .35 && parts.length < 1500) parts.push({ x: p.x - p.vx * .02, y: p.y - p.vy * .02, vx: (Math.random() - .5) * 3, vy: -2 - Math.random() * 3, l: .9, m: .9, c: p.f ? 'rgba(255,140,80,.5)' : 'rgba(90,80,90,.45)', s: 1.4 + Math.min(2.5, Math.log2(1 + p.w)), g: -4, smoke: 1 });
    for (const p of parts) { p.vy += p.g * dtr; p.x += p.vx * dtr; p.y += p.vy * dtr; p.l -= dtr; if (p.smoke) p.s += dtr * 2.2; } for (let i = parts.length - 1; i >= 0; i--) if (parts[i].l <= 0) parts.splice(i, 1);
    for (const f of floats) { f.y -= 8 * dtr; f.l -= dtr; } for (let i = floats.length - 1; i >= 0; i--) if (floats[i].l <= 0) floats.splice(i, 1);
    B.cam += (camTarget() - B.cam) * (1 - Math.exp(-3.2 * dtr)); B.shake = Math.max(0, B.shake - dtr * 2); B.flash = Math.max(0, B.flash - dtr * 1.6);
    if (B.mode === 'net') netTick(now);
    if (B.endT && now - B.endT > 2600 && B.mode === 'bot') return finish(st.winner === me());
    draw(); drawMini(); hud();
  }
  function bot() { // the computer lord on the right
    if (B.mode !== 'bot' || B.st.done) return; const st = B.st, Bt = B.bot, r = B.botR; if (st.tick < B.botNext) return;
    const wk = r() < Bt.smart && C.ready(st, 1, 'boulder') ? 'boulder' : r() < Bt.smart && C.ready(st, 1, 'fire') ? 'fire' : 'swarm';
    if (C.ready(st, 1, wk)) { const aim = C.botAim(st, 1, Bt, r); C.fire(st, { side: 1, a: aim.a, p: aim.p, w: wk, s: (r() * 1e9) | 0, slow: Bt.slow }); }
    B.botNext = st.tick + Math.round(60 * (.9 + r() * .8) * Bt.slow);
  }
  /* ---------------- drawing ---------------- */
  function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }
  function draw() {
    const st = B.st, T = performance.now() / 1000; cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.direction = 'ltr'; cx.drawImage(BG, 0, 0, VW, VH);
    if (B.shake && !G.RM()) cx.translate((Math.random() - .5) * B.shake * K * 2.5, (Math.random() - .5) * B.shake * K * 2.5);
    // the mountain and the plains (destructible)
    const h = st.h, x0 = Math.max(0, Math.floor(B.side ? C.W - B.cam - viewW - 2 : B.cam - 2)), x1 = Math.min(C.W, Math.ceil(B.side ? C.W - B.cam + 2 : B.cam + viewW + 2));
    const gr = cx.createLinearGradient(0, SY(40), 0, SY(C.H)); gr.addColorStop(0, '#c98a58'); gr.addColorStop(.35, '#9a5a3c'); gr.addColorStop(1, '#4e2a2a'); cx.fillStyle = gr;
    cx.beginPath(); cx.moveTo(SX(x0), SY(C.H + 30)); for (let x = x0; x <= x1; x++) cx.lineTo(SX(x), SY(h[x])); cx.lineTo(SX(x1), SY(C.H + 30)); cx.closePath(); cx.fill();
    cx.strokeStyle = 'rgba(255,220,170,.55)'; cx.lineWidth = Math.max(1.5, K * .45); cx.beginPath(); for (let x = x0; x <= x1; x++) { const y = SY(h[x]); x === x0 ? cx.moveTo(SX(x), y) : cx.lineTo(SX(x), y); } cx.stroke();
    cx.fillStyle = 'rgba(60,25,25,.25)'; for (let x = x0; x <= x1; x += 6) { const y = h[x]; if (y < C.GY - 2) { cx.fillRect(SX(x), SY(y + 4 + (x % 5)), K * 3, K * .5); } }
    // gates (vertical panels in the passes)
    for (const g of st.gates) { const x = SX(g.x), y = SY(g.y - g.h / 2), w = K * 8.5, hh = g.h * K, fl = g.flash, col = g.v >= 10 ? [255, 207, 107] : [63, 224, 197]; const gl = cx.createRadialGradient(x, y + hh / 2, 0, x, y + hh / 2, hh * .9); gl.addColorStop(0, `rgba(${col},${.25 + fl * .3})`); gl.addColorStop(1, `rgba(${col},0)`); cx.fillStyle = gl; cx.fillRect(x - hh, y - hh * .4, hh * 2, hh * 1.8);
      cx.fillStyle = `rgba(${col},${.22 + fl * .35})`; rr(x - w / 2, y, w, hh, K * 1.2); cx.fill(); cx.strokeStyle = `rgba(${col},.95)`; cx.lineWidth = K * (.45 + fl * .4); cx.stroke();
      cx.save(); cx.translate(x, y + hh / 2); cx.shadowColor = `rgb(${col})`; cx.shadowBlur = K * 3; cx.fillStyle = '#fff'; cx.font = `900 ${K * (g.v >= 10 ? 5.4 : 4.8)}px Tajawal,system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('×' + g.v, 0, 0); cx.restore();
      if (g.amp) { cx.fillStyle = `rgba(${col},.4)`; cx.fillRect(x - K * .2, SY(g.y0 - g.amp - g.h / 2), K * .4, (g.amp * 2 + g.h) * K); } }
    // castles
    for (const Cs of st.castles) drawCastle(Cs, T);
    // launchers with the current aim
    for (const s of [0, 1]) { const L = C.launcher(s), x = SX(L.x), y = SY(L.y), sz = K * 4.5, mine = s === me(); const ang = mine && B.aim ? B.aim.a : .7 + Math.sin(T + s) * .05;
      cx.fillStyle = '#4a2d18'; rr(x - sz, y + sz * .3, sz * 2, sz * .55, sz * .2); cx.fill(); cx.fillStyle = '#2a1a10'; for (const e of [-.6, .6]) { cx.beginPath(); cx.arc(x + e * sz, y + sz * .9, sz * .3, 0, Math.PI * 2); cx.fill(); }
      cx.save(); cx.translate(x, y + sz * .2); const dir = (s === me()) ? 1 : -1; cx.rotate(-ang * dir); cx.fillStyle = mine ? '#e2b25c' : '#c66a4a'; rr(0, -sz * .22, sz * 1.5 * dir, sz * .44, sz * .2); cx.fill(); cx.restore();
      if (!C.ready(st, s, B.wsel) && mine) { cx.strokeStyle = 'rgba(255,255,255,.25)'; cx.lineWidth = K * .5; cx.beginPath(); cx.arc(x, y - sz * .6, sz * .55, 0, Math.PI * 2); cx.stroke(); } }
    // aim preview: only the first part of the arc, so skill still matters
    if (B.aim && !st.done) { const tr2 = C.trace(st, me(), B.aim.a, B.aim.p, 6, 13); cx.fillStyle = 'rgba(255,240,200,.85)'; tr2.pts.forEach(([x, y], i) => { cx.globalAlpha = 1 - i / 15; cx.beginPath(); cx.arc(SX(x), SY(y), K * .55, 0, Math.PI * 2); cx.fill(); }); cx.globalAlpha = 1; }
    // smoke behind, rockets on top
    for (const p of parts) if (p.smoke) { cx.globalAlpha = Math.max(0, p.l / p.m) * .8; cx.fillStyle = p.c; cx.beginPath(); cx.arc(SX(p.x), SY(p.y), p.s * K * .5, 0, Math.PI * 2); cx.fill(); } cx.globalAlpha = 1;
    for (const p of st.R) { const x = SX(p.x), y = SY(p.y), ang = Math.atan2(p.vy, B.side ? -p.vx : p.vx), L = K * (p.big ? 3.2 : 1.9 + Math.min(1.6, Math.log2(1 + p.w) * .35));
      cx.save(); cx.translate(x, y); cx.rotate(ang); if (p.big) { cx.fillStyle = '#6e5f5a'; cx.beginPath(); cx.arc(0, 0, L * .7, 0, Math.PI * 2); cx.fill(); cx.fillStyle = '#ff9a4a'; cx.globalAlpha = .5; cx.beginPath(); cx.arc(-L * .3, 0, L * .9, 0, Math.PI * 2); cx.fill(); cx.globalAlpha = 1; }
      else { cx.fillStyle = '#d8d2c8'; cx.fillRect(-L, -L * .14, L * 1.4, L * .28); cx.fillStyle = p.o === me() ? '#3fe0c5' : '#ff4d6d'; cx.beginPath(); cx.moveTo(L * .4, -L * .2); cx.lineTo(L * .95, 0); cx.lineTo(L * .4, L * .2); cx.fill(); cx.fillStyle = p.f ? '#ff7a3d' : '#ffcf7a'; cx.beginPath(); cx.moveTo(-L, -L * .14); cx.lineTo(-L * 1.5 - Math.random() * L * .4, 0); cx.lineTo(-L, L * .14); cx.fill(); }
      cx.restore(); }
    for (const p of parts) { if (p.smoke) continue; cx.globalAlpha = Math.min(1, Math.max(0, p.l / p.m) * 1.5); cx.fillStyle = p.c; const s = p.s * K; if (p.sq) { cx.save(); cx.translate(SX(p.x), SY(p.y)); cx.rotate(p.l * 3); cx.fillRect(-s / 2, -s / 2, s, s); cx.restore(); } else cx.fillRect(SX(p.x) - s / 2, SY(p.y) - s / 2, s, s); } cx.globalAlpha = 1;
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; for (const f of floats) { cx.globalAlpha = Math.min(1, f.l * 2); cx.font = `900 ${K * 5 * f.s}px Tajawal,system-ui`; cx.lineWidth = K * .8; cx.strokeStyle = 'rgba(20,10,30,.8)'; cx.strokeText(f.t, SX(f.x), SY(f.y)); cx.fillStyle = f.c; cx.fillText(f.t, SX(f.x), SY(f.y)); } cx.globalAlpha = 1;
    // off-screen enemy fort arrow
    const ef = st.castles[foe()], ex = SX(ef.x0 + ef.cols * C.CS / 2); if (ex > VW) { cx.fillStyle = 'rgba(255,77,109,.85)'; cx.beginPath(); const ay = SY(C.GY - 18); cx.moveTo(VW - 8, ay); cx.lineTo(VW - 22, ay - 10); cx.lineTo(VW - 22, ay + 10); cx.fill(); }
    if (B.flash) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.fillStyle = `rgba(255,235,190,${B.flash * .4})`; cx.fillRect(0, 0, VW, VH); }
  }
  function drawCastle(Cs, T) {
    const cs = C.CS * K, mine = Cs.side === me(), mir = B.side === 1;
    for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k || k === 9) continue; const c = i % Cs.cols, r = (i / Cs.cols) | 0, wx = Cs.x0 + c * C.CS, x = mir ? SX(wx + C.CS) : SX(wx), y = SY(Cs.y0 + r * C.CS), pal = BR[k];
      cx.fillStyle = pal[(c * 7 + r * 3) % 3]; cx.fillRect(x, y, cs + .5, cs + .5); cx.fillStyle = 'rgba(255,240,210,.16)'; cx.fillRect(x, y, cs, cs * .14); cx.fillStyle = 'rgba(40,15,10,.22)'; cx.fillRect(x, y + cs * .86, cs, cs * .14);
      const hp0 = k === 1 ? 18 : 48; if (Cs.hp[i] < hp0 * .55) { cx.strokeStyle = 'rgba(30,10,10,.6)'; cx.lineWidth = Math.max(1, K * .2); cx.beginPath(); cx.moveTo(x + cs * .2, y + cs * .25); cx.lineTo(x + cs * .5, y + cs * .55); cx.lineTo(x + cs * .38, y + cs * .85); cx.stroke(); }
      if (r === 0 || !Cs.t[i - Cs.cols]) { cx.fillStyle = pal[0]; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + cs / 2, y - cs * .55); cx.lineTo(x + cs, y); cx.fill(); } }
    // banner in the player's colour
    let top = -1; for (let r = 0; r < Cs.rows; r++) if (Cs.t[r * Cs.cols]) { top = r; break; }
    if (top >= 0) { const bx = SX(Cs.x0 + C.CS * .5), by = SY(Cs.y0 + top * C.CS) - cs * .5, hue = B.hues[Cs.side]; cx.strokeStyle = '#3b2615'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(bx, by); cx.lineTo(bx, by - K * 7); cx.stroke(); cx.fillStyle = `hsl(${hue},80%,60%)`; const d = (mir ? -1 : 1) * (Cs.side ? -1 : 1); cx.beginPath(); cx.moveTo(bx, by - K * 7); cx.quadraticCurveTo(bx + d * K * 3, by - K * (6.4 + Math.sin(T * 4) * .6), bx + d * K * 5, by - K * 6); cx.lineTo(bx, by - K * 4.6); cx.fill(); }
    if (Cs.coreHp > 0) { const x = SX(Cs.x0 + (Cs.cc + 1) * C.CS), y = SY(Cs.y0 + (Cs.cr + 1) * C.CS), f = Cs.coreHp / Cs.core0, pu = 1 + Math.sin(T * 5) * .08; const gl = cx.createRadialGradient(x, y, 0, x, y, cs * 2.4 * pu); gl.addColorStop(0, `rgba(255,214,110,${.5 + .3 * (1 - f)})`); gl.addColorStop(1, 'rgba(255,214,110,0)'); cx.fillStyle = gl; cx.fillRect(x - cs * 3, y - cs * 3, cs * 6, cs * 6);
      cx.fillStyle = '#3a2412'; rr(x - cs * .8, y - cs * .95, cs * 1.6, cs * 1.9, cs * .3); cx.fill(); cx.fillStyle = `hsl(${40 - (1 - f) * 30},100%,${62 + Math.sin(T * 9) * 6}%)`; rr(x - cs * .55, y - cs * .65, cs * 1.1, cs * 1.3, cs * .25); cx.fill(); }
  }
  function drawMini() {
    const st = B.st, w = mini.width, h = mini.height, sx = x => vx(x) / C.W * w, sy = y => (y - 20) / (C.H - 20) * h; mx.clearRect(0, 0, w, h);
    mx.fillStyle = 'rgba(201,138,88,.75)'; mx.beginPath(); mx.moveTo(sx(0), h); for (let x = 0; x <= C.W; x += 2) mx.lineTo(sx(x), sy(st.h[x])); mx.lineTo(sx(C.W), h); mx.fill();
    for (const Cs of st.castles) { mx.fillStyle = Cs.side === me() ? '#3fe0c5' : '#ff4d6d'; const a = sx(Cs.x0), b = sx(Cs.x0 + Cs.cols * C.CS); mx.fillRect(Math.min(a, b), sy(Cs.y0), Math.abs(b - a), sy(C.GY) - sy(Cs.y0)); }
    for (const g of st.gates) { mx.fillStyle = '#ffcf6b'; mx.fillRect(sx(g.x) - 1.5 * DPR, sy(g.y - g.h / 2), 3 * DPR, g.h / (C.H - 20) * h); }
    for (const p of st.R) { mx.fillStyle = p.o === me() ? '#bffff2' : '#ffb0be'; mx.fillRect(sx(p.x) - DPR, sy(p.y) - DPR, 2 * DPR, 2 * DPR); }
    if (viewW < C.W) { mx.strokeStyle = 'rgba(255,255,255,.7)'; mx.lineWidth = DPR; mx.strokeRect(B.cam / C.W * w, 1, viewW / C.W * w, h - 2); }
  }
  /* ---------------- HUD ---------------- */
  let hudT = 0;
  const windTxt = () => { const wv = B.st.wind * (B.side ? -1 : 1); return Math.abs(wv) < .5 ? '0' : (wv > 0 ? '→ ' : '← ') + Math.abs(wv).toFixed(1); };
  function hud(force) {
    const now = performance.now(); if (!force && now - hudT < 70) return; hudT = now; const st = B.st;
    for (const [s, el] of [[me(), 0], [foe(), 1]]) { const Cs = st.castles[s], f = Math.max(0, Cs.coreHp / Cs.core0); $('wH' + el).style.width = (f * 100).toFixed(1) + '%'; $('wP' + el).textContent = Math.ceil(f * 100) + '%'; }
    $('wWind').textContent = st.windMax ? '🌬 ' + windTxt() : '🌬 0';
    document.querySelectorAll('#wWeps button').forEach(b => { const wk = b.dataset.w, key = me() * 3 + Object.keys(C.WPN).indexOf(wk), left = Math.max(0, (st.cd[key] || 0) - st.tick), full = C.WPN[wk].cd * 60; b.querySelector('u').style.height = (Math.min(1, left / full) * 100).toFixed(0) + '%'; });
    if (B.aim) { $('wAim').classList.remove('hide'); $('wAim').textContent = `∠ ${Math.round(B.aim.a * 180 / Math.PI)}°   ⚡ ${Math.round(B.aim.p * 100)}%`; } else $('wAim').classList.add('hide');
    let inc = false; for (const p of st.R) if (p.o === foe() && vx(p.x) < 150 && p.vy > 0) inc = true; if (inc && !B.incT) { B.incT = now; toast(tr('incoming')); } if (!inc && B.incT && now - B.incT > 3000) B.incT = 0;
  }
  let toastT = 0; function toast(t) { const e = $('wToast'); e.textContent = t; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 1600); }
  function selW(w) { if (B) B.wsel = w; document.querySelectorAll('#wWeps button').forEach(b => b.classList.toggle('sel', b.dataset.w === w)); }
  document.querySelectorAll('#wWeps button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); G.SFX.click(); selW(b.dataset.w); }));
  $('wMenu').onclick = () => G.toMenu(); $('wMute').onclick = () => { G.audio(); G.setMute(!G.MUTE); };
  /* ---------------- aiming: pull back like a slingshot ---------------- */
  let drag = null;
  cv.addEventListener('pointerdown', e => { if (!B || B.st.done || performance.now() < B.localAt) return; G.audio(); drag = { x: e.clientX, y: e.clientY }; try { cv.setPointerCapture(e.pointerId); } catch (x) { } }, true);
  cv.addEventListener('pointermove', e => { if (!B || !drag) return; const px = drag.x - e.clientX, py = e.clientY - drag.y, d = Math.hypot(px, py); /* pull back-and-down to shoot forward-and-up */ if (d < 10) { B.aim = null; return; }
    const a = Math.max(3, Math.min(87, Math.atan2(py, Math.max(.001, px)) * 180 / Math.PI)) * Math.PI / 180, p = Math.min(1, d / (Math.min(VW, VH) * .42)); B.aim = { a, p }; }, true);
  function release() { if (!B || !drag) return; drag = null; const aim = B.aim; B.aim = null; if (!aim) return; shoot(aim.a, aim.p, B.wsel); }
  cv.addEventListener('pointerup', release, true); cv.addEventListener('pointercancel', () => { drag = null; if (B) B.aim = null; }, true);
  function shoot(a, p, wk) {
    const st = B.st; if (!C.ready(st, me(), wk)) { const alt = Object.keys(C.WPN).find(k => C.ready(st, me(), k)); if (!alt) { toast(tr('reload')); return; } wk = alt; selW(alt); }
    const s = (Math.random() * 4e9) >>> 0, k = st.tick + (B.mode === 'net' ? 8 : 1); if (!C.fire(st, { side: me(), a, p, w: wk, s, k })) return;
    if (B.mode === 'net') netSend({ t: 'fire', k, a: +a.toFixed(4), p: +p.toFixed(4), w: wk, s }); events();
    if (wk !== 'swarm' && C.ready(st, me(), 'swarm')) setTimeout(() => B && selW('swarm'), 200);
  }
  addEventListener('keydown', e => { if (!B) return; if (e.key === '1') selW('swarm'); else if (e.key === '2') selW('fire'); else if (e.key === '3') selW('boulder'); else if (e.key === 'Escape') G.toMenu(); });
  /* ---------------- results ---------------- */
  function finish(won, foeLeft) {
    const st = B.st, mode = B.mode, peak = st.peak[me()], dmg = st.dealt[me()], secs = Math.round((performance.now() - B.localAt) / 1000), bi = B.botIdx; leave(); saveP();
    G.show('wres'); $('wrPeak').textContent = Math.round(peak); $('wrDmg').textContent = Math.round(dmg); $('wrTime').textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
    if (mode === 'bot') { const Bt = C.BOTS[bi]; $('wrT').textContent = won ? tr('youWon') : tr('youLost'); $('wrSub').textContent = won ? tr('vsBot', nm(Bt)) : tr('lostTo', nm(Bt));
      if (won) { PG.w[bi] = 1; if (bi + 1 >= PG.un && bi + 1 < C.BOTS.length) PG.un = bi + 2; saveP(); }
      const nxt = won && bi + 1 < C.BOTS.length; $('wrMain').textContent = nxt ? tr('nextBot') + ' ' + ICON[bi + 1] : tr('retry'); $('wrMain').onclick = () => startBot(nxt ? bi + 1 : bi); $('wrMain').classList.remove('hide'); $('wrWait').textContent = ''; $('wrBack').onclick = warMenu; }
  }
  /* ---------------- menus ---------------- */
  function warMenu() { leave(); G.show('war'); $('botList').innerHTML = C.BOTS.map((b, i) => { const lock = i + 1 > PG.un, won = PG.w[i]; return `<button class="bot ${lock ? 'lock' : ''} ${i + 1 === PG.un && !won ? 'next' : ''}" data-b="${i}" ${lock ? 'disabled' : ''}><i>${lock ? '🔒' : ICON[i]}</i><div>${G.esc(nm(b))}<small>${tr('botMap', nm(C.MAPS[b.map]))}</small></div><b>${won ? '🏆' : ''}</b></button>`; }).join('');
    $('botList').querySelectorAll('[data-b]').forEach(b => b.onclick = () => { G.SFX.click(); startBot(+b.dataset.b); }); }
  function startBot(i) { const Bt = C.BOTS[i]; start({ mode: 'bot', map: Bt.map, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: Bt, botIdx: i, names: [G.NAME || (AR() ? 'أنت' : 'You'), nm(Bt)], hues: [G.HUE, 8] }); }
  $('bWar').onclick = () => { G.audio(); G.SFX.click(); warMenu(); };
  /* ---------------- online war ---------------- */
  const NET = { ws: null, me: null, code: null, room: null };
  const link = code => location.origin + location.pathname.replace(/[^/]*$/, '') + '?w=' + code;
  const netSend = m => { if (NET.ws && NET.ws.readyState === 1) NET.ws.send(JSON.stringify(m)); };
  function connect(code) {
    if (NET.ws) try { NET.ws.close(); } catch (e) { } G.audio(); G.show('wlobby'); $('wCode').textContent = code || '·····'; $('wWait').textContent = tr('connecting'); $('wPlayers').innerHTML = '';
    const nm2 = G.NAME || (AR() ? 'رامي' : 'Archer'); const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/sh/ws?m=war&t=' + G.TOK + '&n=' + encodeURIComponent(nm2) + '&h=' + G.HUE + '&lv=1' + (code ? '&r=' + code : ''));
    NET.ws = ws; ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } onNet(m); }; ws.onclose = () => { if (NET.ws === ws) NET.ws = null; };
  }
  function onNet(m) {
    if (m.t === 'hello') { NET.me = m.me; NET.code = m.code; history.replaceState(null, '', '?w=' + m.code); $('wCode').textContent = m.code; return; }
    if (m.t === 'err') { G.toast(tr(m.e)); setTimeout(() => G.toMenu(), 1200); return; }
    if (m.t === 'room') { const prev = NET.room; NET.room = m;
      if (m.state === 'duel' && (!B || (prev && prev.at !== m.at))) { const side = m.sides[NET.me]; if (side == null) return; const pl = s => m.players.find(p => m.sides[p.id] === s) || { n: '?', h: 0 };
        const ws = NET.ws; NET.ws = null; if (B) leave(); NET.ws = ws;
        start({ mode: 'net', map: (m.lv - 1) % C.MAPS.length, seed: m.seed, side, names: side ? [pl(1).n, pl(0).n] : [pl(0).n, pl(1).n], hues: [pl(0).h, pl(1).h], localAt: performance.now() + (m.at - m.now) }); return; }
      if (m.state === 'lobby') { if (B) { const ws = NET.ws; NET.ws = null; leave(); NET.ws = ws; } lobby(); } return; }
    if (!B) { if (m.t === 'res') results(m.res); return; }
    if (m.t === 'fire') { const st = B.st; C.fire(st, { side: m.side, a: m.a, p: m.p, w: m.w, s: m.s, k: Math.max(m.k, st.tick + 1) }); return; }
    if (m.t === 'cs') { if (m.side !== me()) C.applyCastle(B.st, B.st.castles[m.side], m.pk); events(); return; }
    if (m.t === 'emo') { const pl = NET.room && NET.room.players.find(p => p.id === m.id), d = document.createElement('div'); d.innerHTML = m.e + '<small>' + G.esc(pl ? pl.n : '') + '</small>'; d.style.left = (15 + Math.random() * 70) + '%'; $('wEmof').appendChild(d); setTimeout(() => d.remove(), 2500); return; }
    if (m.t === 'res') { const mine = m.res.find(x => x.id === NET.me), won = !!(mine && mine.time); if (!B.endT) { collapse(won ? foe() : me()); B.endT = performance.now(); won ? SFX.win() : SFX.lose(); } setTimeout(() => { if (B) { const st = B.st; NET.last = { peak: st.peak[me()], dmg: st.dealt[me()], secs: Math.round((performance.now() - B.localAt) / 1000) }; const ws = NET.ws; NET.ws = null; leave(); NET.ws = ws; } results(m.res); }, 2200); }
  }
  function netTick(now) { if (now - B.lastCs < 300 || now < B.localAt) return; B.lastCs = now; const Cs = B.st.castles[me()]; netSend({ t: 'cs', pk: C.packCastle(Cs), f: +(Cs.coreHp / Cs.core0).toFixed(3) }); }
  function lobby() { const r = NET.room; if (!r) return; G.show('wlobby'); const host = r.host === NET.me, hn = (r.players.find(p => p.id === r.host) || {}).n || '', M = C.MAPS[(r.lv - 1) % C.MAPS.length];
    $('wCode').textContent = r.code; $('wPlayers').innerHTML = r.players.map(p => `<li class="${p.id === NET.me ? 'mine' : ''}"><i style="background:hsl(${p.h},80%,60%)"></i>${G.esc(p.n)}${p.id === NET.me ? ' (' + tr('you') + ')' : ''}${p.id === r.host ? ' 👑' : ''}<b>${p.on ? '●' : '○'}</b></li>`).join('');
    $('wMap').innerHTML = `⛰️ ${tr('mapN', G.esc(nm(M)))}<small>${tr('fair')}</small>`; $('wPrev').disabled = $('wNext').disabled = !host; const two = r.players.filter(p => p.on).length >= 2;
    $('wStart').classList.toggle('hide', !host); $('wStart').disabled = !two; $('wStart').style.opacity = two ? 1 : .5; $('wWait').textContent = !two ? tr('need2') : host ? tr('youHost') : tr('waitHost', hn); }
  function results(res) { G.show('wres'); const mine = res.find(x => x.id === NET.me), host = NET.room && NET.room.host === NET.me, won = !!(mine && mine.time), L = NET.last || { peak: 0, dmg: 0, secs: 0 }, foeP = res.find(x => x.id !== NET.me);
    $('wrT').textContent = won ? tr('youWon') : tr('youLost'); $('wrSub').textContent = won ? '' : foeP ? tr('lostTo', foeP.n) : ''; $('wrPeak').textContent = Math.round(L.peak); $('wrDmg').textContent = Math.round(L.dmg); $('wrTime').textContent = Math.floor(L.secs / 60) + ':' + String(L.secs % 60).padStart(2, '0');
    $('wrMain').textContent = tr('rematch'); $('wrMain').classList.toggle('hide', !host); $('wrMain').onclick = () => netSend({ t: 'again' }); $('wrWait').textContent = host ? '' : tr('waitHost', (NET.room && (NET.room.players.find(p => p.id === NET.room.host) || {}).n) || ''); $('wrBack').onclick = () => G.toMenu(); }
  $('bWarFriend').onclick = () => connect(null);
  $('wPrev').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv > 1 ? r.lv - 1 : C.MAPS.length }); }; $('wNext').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv < C.MAPS.length ? r.lv + 1 : 1 }); };
  $('wStart').onclick = () => netSend({ t: 'go' }); $('wLeave').onclick = () => G.toMenu();
  const inviteText = () => (AR() ? 'تحدَّني في حرب الجبل! من يهدم قلعة الآخر أولاً؟ غرفتي ' : 'Fight me in Mountain War! Room ') + (NET.code || '') + ':';
  $('wWa').onclick = () => window.open('https://wa.me/?text=' + encodeURIComponent(inviteText() + ' ' + link(NET.code)), '_blank');
  $('wShare').onclick = async () => { try { if (navigator.share) { await navigator.share({ title: 'حرب الجبل', text: inviteText(), url: link(NET.code) }); return; } } catch (e) { return; } try { await navigator.clipboard.writeText(inviteText() + ' ' + link(NET.code)); G.toast(tr('copied')); } catch (e) { } };
  $('wCopy').onclick = async () => { try { await navigator.clipboard.writeText(link(NET.code)); G.toast(tr('copied')); } catch (e) { prompt('', link(NET.code)); } };
  document.querySelectorAll('#wEmo button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); netSend({ t: 'emo', e: b.textContent }); }));
  addEventListener('resize', resize); resize(); G.applyLang();
  const qw = new URLSearchParams(location.search).get('w'); if (qw) setTimeout(() => connect(qw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5)), 80);
  window.SHW_DEBUG = { C, PG, b: () => B, NET, startBot, warMenu, connect, shoot, selW };
})();
