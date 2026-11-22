/* شُهُب — حرب الجبل (Mountain War) client. Rules in war-core.js (window.SHW_C); shared helpers from game.js (window.SHG). */
(() => {
  'use strict';
  const C = window.SHW_C, G = window.SHG, $ = G.$, tr = G.tr, SFX = G.SFX;
  Object.assign(G.TXT.ar, { war: '⚔️ حرب الجبل', warS: 'واحد ضد واحد · صوّب فوق الجبل واهدم قلعة خصمك', warT: 'حرب الجبل', warHow: 'اسحب للخلف ثم أفلت: الاتجاه يحدد الزاوية، والمسافة تحدد القوة. مرّر قذائفك عبر بوابات المضاعفة فوق الجبل، واهدم قلب قلعة خصمك قبل أن يهدم قلبك.',
    warFriend: '⚔️ ضد صديق', warFriendS: 'أرسل له رابطاً على واتساب', warBots: 'أو تحدَّ قادة الجبل واحداً تلو الآخر', warLobby: 'غرفة الحرب', warLobbyS: 'أرسل الرابط لصديقك. أنت على يسار الجبل وهو على يمينه، وكلٌّ يرى نفسه على اليسار.', warStart: 'ابدأ الحرب',
    vsAI: '🤖 ضد الآلي', aiGo: 'ابدأ المعركة', randomMap: '🎲 عشوائية', aiName: 'الآلي ({0})', acc: 'الدقة',
    wSwarm: 'سرب', wFire: 'نار', wBoulder: 'صخرة', dmg: 'ضرر', time: 'الوقت', youWon: 'انتصرت! 🏆', youLost: 'سقطت قلعتك', vsBot: 'هزمت {0}!', lostTo: '{0} هدم قلعتك', nextBot: 'القائد التالي', rematch: 'جولة أخرى', retry: 'أعد', again2: 'معركة أخرى',
    aimHint: '👆 اسحب للخلف وأفلت لتطلق', reload: 'يُعاد التلقيم…', incoming: '⚠️ قذائف قادمة!', need2: 'بانتظار صديقك…', mapN: 'الخريطة: {0}', foeLeft: 'غادر خصمك — فزت', botMap: 'خريطة {0}', fair: 'نفس القلعة ونفس الأسلحة للطرفين.', heartHit: 'أصبت القلب!', collapse: 'انهار البرج!' });
  Object.assign(G.TXT.en, { war: '⚔️ Mountain War', warS: '1 vs 1 · aim over the mountain, break the enemy fort', warT: 'Mountain War', warHow: 'Pull back and release: direction sets the angle, distance sets the power. Send your volley through the multiplier gates above the mountain and break the enemy heart before they break yours.',
    warFriend: '⚔️ Vs a friend', warFriendS: 'send them a WhatsApp link', warBots: 'or beat the mountain lords one by one', warLobby: 'War room', warLobbyS: 'Send the link to a friend. You\'re left of the mountain, they\'re right — each of you sees yourself on the left.', warStart: 'Start the war',
    vsAI: '🤖 Vs the computer', aiGo: 'Start the battle', randomMap: '🎲 Random', aiName: 'Computer ({0})', acc: 'accuracy',
    wSwarm: 'Swarm', wFire: 'Fire', wBoulder: 'Boulder', dmg: 'damage', time: 'time', youWon: 'Victory! 🏆', youLost: 'Your fort fell', vsBot: 'You beat {0}!', lostTo: '{0} broke your fort', nextBot: 'Next lord', rematch: 'Rematch', retry: 'Retry', again2: 'Another battle',
    aimHint: '👆 Pull back and release to fire', reload: 'Reloading…', incoming: '⚠️ Incoming!', need2: 'Waiting for your friend…', mapN: 'Map: {0}', foeLeft: 'Your rival left — you win', botMap: '{0} map', fair: 'Same fort and weapons for both sides.', heartHit: 'Heart hit!', collapse: 'Tower down!' });
  const AR = () => G.LANG === 'ar', nm = o => o.n[AR() ? 0 : 1];
  const PG = Object.assign({ un: 1, w: {}, diff: 'normal', map: -1 }, G.LS.get('shw_prog', {})); const saveP = () => G.LS.set('shw_prog', PG);
  const ICON = ['🐑', '🛡️', '🐎', '⚔️', '👑', '🦅'];
  /* map moods: sky stops, far range, near range, rock strata */
  const MOOD = [
    { sky: ['#120d2c', '#2b1f5a', '#8a4563', '#f0a868'], far: '#5a3566', near: '#3d2346', rock: ['#c98a58', '#9a5a3c', '#4e2a2a'], stars: 1, sun: 0 },
    { sky: ['#1d2b5c', '#5a5fa0', '#e39aa6', '#ffd2a1'], far: '#7a6aa0', near: '#5a4a7c', rock: ['#d39a6a', '#a8684a', '#5a3030'], stars: .3, sun: 1 },
    { sky: ['#2a4a7a', '#5c8ac0', '#f2c38a', '#ffe2a8'], far: '#a08066', near: '#80604a', rock: ['#e0a66a', '#b87448', '#6a3a28'], stars: 0, sun: 2 },
    { sky: ['#05040f', '#0f1235', '#1f2050', '#3a3060'], far: '#1c1838', near: '#141130', rock: ['#8a6a5a', '#5c4038', '#2a1a1a'], stars: 1.4, sun: 0, night: 1 },
  ];
  /* ---------------- canvas ---------------- */
  const cv = $('cv'), cx = cv.getContext('2d'), mini = $('wMini'), mx = mini.getContext('2d');
  let VW = 0, VH = 0, DPR = 1, K0 = 1, K = 1, OY = 0, GSY = 0, viewW0 = 120, viewW = 120, BG = null, BGmap = -1; const TOP = 104, BOT = 96;
  function resize() {
    DPR = Math.min(2, devicePixelRatio || 1); VW = innerWidth; VH = innerHeight; const availH = Math.max(200, VH - TOP - BOT);
    K0 = Math.min(VW / Math.min(C.W, 118), availH / C.H); if (VW / K0 > C.W) K0 = Math.min(availH / C.H, VW / C.W) || K0; viewW0 = VW / K0;
    GSY = TOP + Math.max(0, (availH - C.H * K0) / 2) + C.GY * K0; K = K0; viewW = viewW0; OY = GSY - C.GY * K; BGmap = -1; mini.width = mini.clientWidth * DPR || 300; mini.height = mini.clientHeight * DPR || 80;
  }
  function paintBg(mood) {
    const c = document.createElement('canvas'); c.width = VW * DPR; c.height = VH * DPR; const g = c.getContext('2d'); g.scale(DPR, DPR);
    const sky = g.createLinearGradient(0, 0, 0, VH); mood.sky.forEach((col, i) => sky.addColorStop([0, .38, .72, 1][i], col)); g.fillStyle = sky; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 160 * mood.stars; i++) { g.fillStyle = `rgba(255,245,220,${.2 + G.hsh(i + 5) * .6})`; const r = G.hsh(i + 77) * 1.4 + .3; g.fillRect(G.hsh(i) * VW, G.hsh(i + 999) * VH * .55, r, r); }
    if (mood.stars >= 1) { const mx2 = VW * .8, my = VH * .16, mr = 16; g.fillStyle = '#ffeec4'; g.shadowColor = '#ffd88a'; g.shadowBlur = 30; g.beginPath(); g.arc(mx2, my, mr, 0, Math.PI * 2); g.fill(); g.shadowBlur = 0; g.fillStyle = sky; g.beginPath(); g.arc(mx2 + 7, my - 3, mr * .9, 0, Math.PI * 2); g.fill(); }
    if (mood.sun) { const sx = VW * (mood.sun === 1 ? .2 : .75), sy = GSY - 90 - mood.sun * 40, gl = g.createRadialGradient(sx, sy, 0, sx, sy, 140); gl.addColorStop(0, 'rgba(255,240,200,.95)'); gl.addColorStop(.12, 'rgba(255,220,160,.7)'); gl.addColorStop(1, 'rgba(255,200,140,0)'); g.fillStyle = gl; g.fillRect(sx - 140, sy - 140, 280, 280); }
    return c;
  }
  /* ---------------- a battle ---------------- */
  let B = null; const parts = [], floats = [], lights = [], scorch = [];
  window.SHW = { get on() { return !!B; }, frame, leave };
  function start(o) { // o: {mode:'bot'|'net', map, seed, side, bot, names:[a,b], hues:[a,b], localAt}
    G.audio(); const st = C.create(o.map, o.seed, { hp1: o.mode === 'bot' ? (o.bot.hp || 1) : 1, protect: o.mode === 'net' ? 1 - o.side : null });
    B = Object.assign({ st, cam: 0, shake: 0, aim: null, wsel: 'swarm', fired: 0, endT: 0, flash: 0, slow: 1, lastCs: 0, botNext: 2.4 * 60, botR: C.rng(o.seed ^ 77), botMem: {}, botAimAt: null, foeArm: .7,
      ghost: null, track: null, hits: 0, volleys: 0, seenImp: -1, hpPrev: [0, 0], dmgAcc: [0, 0], dmgT: 0 }, o);
    B.localAt = B.mode === 'net' ? o.localAt : performance.now() + 2600; B.hpPrev = [castleHP(st.castles[0]), castleHP(st.castles[1])];
    K = K0; viewW = viewW0; OY = GSY - C.GY * K; B.cam = 0; parts.length = floats.length = lights.length = scorch.length = 0;
    G.show(null); $('whud').classList.remove('hide'); $('hud').classList.add('hide'); $('lang').classList.add('hide');
    $('wN0').textContent = B.names[0]; $('wN1').textContent = B.names[1]; $('wEmo').classList.toggle('hide', B.mode !== 'net'); $('wHint').textContent = tr('aimHint'); $('wHint').classList.toggle('hide', (PG.fired || 0) > 2);
    $('wCd').classList.remove('hide'); $('wCd').textContent = ''; selW('swarm'); hud(true); ambience(true);
  }
  function leave() { if (NET.ws) { const ws = NET.ws; NET.ws = null; try { ws.close(); } catch (e) { } history.replaceState(null, '', location.pathname); } if (B) { B = null; ambience(false); $('whud').classList.add('hide'); $('lang').classList.remove('hide'); } }
  const me = () => B.side, foe = () => 1 - B.side;
  const castleHP = Cs => { let s = Cs.coreHp; for (let i = 0; i < Cs.t.length; i++) if (Cs.t[i] && Cs.t[i] !== 9) s += Cs.hp[i]; return s; };
  /* view: mirrored for the right-side player so everyone sees themselves on the left; the camera zooms out to frame every arc in flight */
  const vx = x => B.side ? C.W - x : x, SX = x => (vx(x) - B.cam) * K, SY = y => OY + y * K;
  function camera(dt) { // follow your volley's lead; frame incoming fire with your fort; never zoom out so far that the action gets small
    const st = B.st; let lead = -1, inc = -1;
    for (const p of st.R) { const v = vx(p.x); if (p.o === me()) lead = Math.max(lead, v); else if (v < 175) inc = Math.max(inc, v); }
    let L, R;
    if (B.endT) { const lc = vx(st.castles[st.winner === me() ? foe() : me()].x0 + 14); L = lc - viewW0 * .5; R = lc + viewW0 * .5; }
    else if (lead >= 0) { R = lead + 26; if (lead > 165) { const E = st.castles[foe()], ef = Math.max(vx(E.x0), vx(E.x0 + E.cols * C.CS)); R = Math.max(R, ef + 8); } L = Math.max(0, R - 160); }
    else if (B.focus && performance.now() < B.focus.t) { L = B.focus.v - 70; R = B.focus.v + 40; }
    else if (inc >= 0) { L = 4; R = Math.max(70, 180 - inc + 70 > 0 ? Math.min(175, 300 - inc + 20) : 70); R = Math.min(175, Math.max(70, 360 - inc - 100)); }
    else { L = 4; R = B.aim ? 120 : 70; }
    const want = Math.max(viewW0, Math.min(165, R - L)), k = 1 - Math.exp(-(want > viewW ? 3 : 1.8) * dt);
    viewW += (want - viewW) * k; K = VW / viewW; if (VW / K0 >= C.W) { K = K0; viewW = VW / K; }
    OY = GSY - C.GY * K; const camWant = viewW >= C.W ? (C.W - viewW) / 2 : Math.max(0, Math.min(C.W - viewW, lead >= 0 && !B.endT ? R - viewW : (L + R) / 2 - viewW / 2 > 0 && !(L <= 4) ? (L + R) / 2 - viewW / 2 : L));
    B.cam += (camWant - B.cam) * (1 - Math.exp(-3.4 * dt)); if (viewW >= C.W) B.cam = (C.W - viewW) / 2;
  }
  function burst(x, y, n, col, sp = 30, life = .7, grav = 60, size = .8) { if (G.RM()) n = Math.ceil(n / 4); for (let i = 0; i < n && parts.length < 1600; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * sp; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * .3, l: life * (.5 + Math.random() * .7), m: life, c: col, s: size * (.5 + Math.random()), g: grav }); } }
  const BR = { 1: ['#d69a5c', '#c4874a', '#b9783f'], 2: ['#9aa0ad', '#868c99', '#7a808c'] };
  function cellXY(Cs, i) { return [Cs.x0 + ((i % Cs.cols) + .5) * C.CS, Cs.y0 + (((i / Cs.cols) | 0) + .5) * C.CS]; }
  /* ---------------- sound extras: volley whoosh, layered blasts, war drums ---------------- */
  let drumIv = 0;
  function whoosh(foeSide) { G.noise(1.4, foeSide ? 600 : 2600, foeSide ? 2600 : 500, .09, 1.6); if (foeSide) G.tone(1500, 1.5, 'sine', .025, .5); }
  function blast(big) { G.noise(big ? .9 : .32, big ? 420 : 1100, big ? 50 : 160, big ? .4 : .13, .7); G.tone(big ? 46 : 70, big ? .8 : .25, 'sine', big ? .3 : .12, .55); if (big) G.noise(.5, 3500, 1200, .06, 2, .08); }
  function ambience(on) { // maqsum rhythm on a doumbek: doum tek _ tek doum _ tek _ ; faster hi-hat when your heart is low
    clearInterval(drumIv); drumIv = 0; if (!on) return; let step = 0; const pat = [1, 2, 0, 2, 1, 0, 2, 0];
    drumIv = setInterval(() => { if (!B || G.MUTE || document.hidden || performance.now() < B.localAt - 400) return; const k = pat[step++ % 8], mine = B.st.castles[me()], urgent = mine.coreHp / mine.core0 < .35;
      if (k === 1) G.tone(78, .32, 'sine', .14, .7); else if (k === 2) G.noise(.06, 3800, 2600, .05, 3); if (urgent && step % 2) G.noise(.04, 6000, 5000, .02, 4); }, 250);
  }
  /* ---------------- events from the simulation ---------------- */
  function events() {
    const st = B.st;
    for (const e of st.ev) {
      if (e.e === 'launch') { G.tone(90, .25, 'sine', .22, .5); G.noise(.3, 1800, 400, .12, 1); whoosh(e.side === foe()); const L = C.launcher(e.side); lights.push({ x: L.x, y: L.y - 3, r: 14, l: .2, m: .2, c: '255,200,120' }); burst(L.x, L.y - 3, 10, '#ffd38a', 18, .4, -10, .9);
        if (e.side === me()) { B.fired++; B.volleys++; PG.fired = (PG.fired || 0) + 1; saveP(); $('wHint').classList.add('hide'); G.buzz(15); if (B.track && B.track.pts.length > 2) B.ghost = B.track; B.track = { vid: st.vid, pts: [], imp: null }; } }
      else if (e.e === 'gate') { SFX.gate(e.k); const g = st.gates[e.g]; if (performance.now() - (g.ft || 0) > 280) { g.ft = performance.now(); floats.push({ x: g.x, y: g.y - g.h / 2 - 3, t: '×' + e.k, c: g.v >= 10 ? '#ffd36b' : '#7ff7df', l: 1.2, s: 1.1 }); lights.push({ x: g.x, y: g.y, r: 16, l: .3, m: .3, c: '255,215,130' }); } }
      else if (e.e === 'boom') { const big = e.r > 3; if (big || Math.random() < .45) blast(big); burst(e.x, e.y, big ? 60 : 7, e.dirt ? '#b77a4c' : '#ffcf7a', big ? 55 : 22, big ? 1.2 : .6, 90, big ? 1.7 : .8);
        lights.push({ x: e.x, y: e.y, r: big ? 26 : 7, l: big ? .35 : .15, m: big ? .35 : .15, c: '255,190,110' }); if (big) { B.shake = Math.max(B.shake, .9); B.flash = .25; lights.push({ x: e.x, y: e.y, r: 4, l: .5, m: .5, ring: 1 }); }
        if (e.dirt && scorch.length < 160) scorch.push({ x: e.x, y: e.y, r: e.r * 1.5 }); }
      else if (e.e === 'brk') { SFX.brk(e.k); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 7, BR[e.k][0], 24, .9, 90, 1); if (e.side === me()) B.shake = Math.max(B.shake, .25); }
      else if (e.e === 'fall') { const [x, y] = cellXY(st.castles[e.side], e.i); parts.push({ x, y, vx: (Math.random() - .5) * 8, vy: -Math.random() * 4, l: 1.6, m: 1.6, c: BR[e.k][e.i % 3], s: 2.6, g: 90, sq: 1 }); if (Math.random() < .3) G.noise(.25, 500, 120, .12, 1, .3);
        if (!B.fallT || performance.now() - B.fallT > 1500) { B.fallT = performance.now(); floats.push({ x, y: y - 6, t: tr('collapse'), c: '#ffd987', l: 1.4, s: .8 }); B.shake = Math.max(B.shake, .5); } }
      else if (e.e === 'core') { SFX.core(); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 4, '#ffd36b', 26, .5, 20, .9); lights.push({ x, y, r: 12, l: .25, m: .25, c: '255,215,120' }); B.shake = Math.max(B.shake, .22);
        if (e.side === me()) G.buzz(30); else if (!B.hhT || performance.now() - B.hhT > 2500) { B.hhT = performance.now(); floats.push({ x, y: y - 9, t: tr('heartHit'), c: '#ffd36b', l: 1.4, s: .9 }); } }
      else if (e.e === 'wind') toast('🌬 ' + windTxt());
      else if (e.e === 'win') onWin(e.winner);
    }
    st.ev.length = 0;
    const I = st.impact[me()]; if (I && I.vid !== B.seenImp) { B.seenImp = I.vid; if (I.hit === foe()) B.hits++; if (B.track && B.track.vid === I.vid) B.track.imp = { x: I.x, y: I.y }; B.focus = { v: vx(I.x), t: performance.now() + 1600 }; }
  }
  function onWin(w) {
    if (B.mode === 'net' && w !== me()) netSend({ t: 'dead' });
    collapseFx(1 - w); B.endT = performance.now(); B.slow = .3; B.flash = 1; if (w === me()) SFX.win(); else SFX.lose(); G.buzz([40, 60, 120]);
  }
  function collapseFx(side) { const Cs = B.st.castles[side]; for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k) continue; const [x, y] = cellXY(Cs, i); parts.push({ x, y, vx: (Math.random() - .5) * 34, vy: -Math.random() * 34, l: 1.8 + Math.random(), m: 2.6, c: k === 9 ? '#ffd36b' : BR[k][i % 3], s: 2.6, g: 110, sq: 1 }); Cs.t[i] = 0; }
    const x = Cs.x0 + 14, y = Cs.y0 + 20; lights.push({ x, y, r: 40, l: .8, m: .8, c: '255,210,130' }); lights.push({ x, y, r: 6, l: .8, m: .8, ring: 1 }); B.shake = 1.4; blast(true); }
  /* ---------------- loop ---------------- */
  function frame(dtr) {
    if (!B) return; const st = B.st, now = performance.now();
    const pre = now < B.localAt; if (pre) { const n = Math.ceil((B.localAt - now) / 1000); if (n !== B.cdN) { B.cdN = n; $('wCd').textContent = n; SFX.beep(0); } }
    else if (!B.goSaid) { B.goSaid = 1; $('wCd').textContent = AR() ? 'اشتباك!' : 'FIGHT!'; SFX.beep(1); setTimeout(() => $('wCd').classList.add('hide'), 700); }
    if (!pre) {
      let target = Math.floor((now - B.localAt) / (1000 / 60)); if (B.endT) target = st.tick + (Math.random() < B.slow ? 1 : 0);
      let n = 0; while (st.tick < target && n++ < (B.mode === 'net' ? 90 : 4)) { C.step(st); bot(); events(); if (!B) return; trackShot(); }
      if (B.mode === 'bot' && st.tick < target - 4) B.localAt = now - st.tick * (1000 / 60);
    }
    if (B.endT) B.slow = Math.min(1, B.slow + dtr * .35);
    for (const p of st.R) if (Math.random() < .4 && parts.length < 1600) parts.push({ x: p.x - p.vx * .02, y: p.y - p.vy * .02, vx: (Math.random() - .5) * 3, vy: -2 - Math.random() * 3, l: .9, m: .9, c: p.f ? '255,140,80' : '120,105,115', s: 1.3 + Math.min(2.5, Math.log2(1 + p.w)), g: -4, smoke: 1 });
    for (const p of parts) { p.vy += p.g * dtr; p.x += p.vx * dtr; p.y += p.vy * dtr; p.l -= dtr; if (p.smoke) p.s += dtr * 2.4; } for (let i = parts.length - 1; i >= 0; i--) if (parts[i].l <= 0) parts.splice(i, 1);
    for (const f of floats) { f.y -= 8 * dtr; f.l -= dtr; } for (let i = floats.length - 1; i >= 0; i--) if (floats[i].l <= 0) floats.splice(i, 1);
    for (const l of lights) { l.l -= dtr; if (l.ring) l.r += 70 * dtr; } for (let i = lights.length - 1; i >= 0; i--) if (lights[i].l <= 0) lights.splice(i, 1);
    for (const s of [0, 1]) { const h = castleHP(st.castles[s]); B.dmgAcc[s] += Math.max(0, B.hpPrev[s] - h); B.hpPrev[s] = h; } // floating damage per fort, summed over half a second
    if (now - B.dmgT > 500) { B.dmgT = now; for (const s of [0, 1]) if (B.dmgAcc[s] >= 1) { const Cs = st.castles[s]; floats.push({ x: Cs.x0 + 13.5 + (Math.random() - .5) * 8, y: Cs.y0 - 4, t: '-' + Math.round(B.dmgAcc[s]), c: s === me() ? '#ff6f8a' : '#ffe08a', l: 1.1, s: .9 }); B.dmgAcc[s] = 0; } }
    camera(dtr); B.shake = Math.max(0, B.shake - dtr * 2); B.flash = Math.max(0, B.flash - dtr * 1.6);
    if (B.botAimAt) B.foeArm += (B.botAimAt.a - B.foeArm) * (1 - Math.exp(-6 * dtr));
    if (B.mode === 'net') netTick(now);
    if (B.endT && now - B.endT > 2800 && B.mode === 'bot') return finish(st.winner === me());
    draw(); drawMini(); hud();
  }
  function trackShot() { const t = B.track; if (!t || t.imp || t.pts.length > 200 || B.st.tick % 3) return; const p = B.st.R.find(q => q.vid === t.vid && q.o === me()); if (p) t.pts.push([p.x, p.y]); }
  function bot() { // the computer: aims (you see its barrel turn and a 🎯), waits a beat, fires, then corrects from where it landed
    if (B.mode !== 'bot' || B.st.done) return; const st = B.st, Bt = B.bot, r = B.botR;
    if (B.botAimAt && st.tick >= B.botAimAt.t) { const o = B.botAimAt; B.botAimAt = null; if (C.fire(st, { side: 1, a: o.a, p: o.p, w: o.wk, s: (r() * 1e9) | 0, slow: Bt.slow })) C.remember(st, B.botMem, o.a, o.p); B.botNext = st.tick + Math.round(60 * (.9 + r() * .9) * Bt.slow); return; }
    if (B.botAimAt || st.tick < B.botNext) return;
    const wk = r() < Bt.smart && C.ready(st, 1, 'boulder') ? 'boulder' : r() < Bt.smart && C.ready(st, 1, 'fire') ? 'fire' : 'swarm';
    if (!C.ready(st, 1, wk)) { B.botNext = st.tick + 20; return; }
    const pl = C.botPlan(st, 1, Bt, B.botMem, r); B.botAimAt = { a: pl.a, p: pl.p, wk, t: st.tick + Math.round(36 + r() * 30 * Bt.slow) };
  }
  /* ---------------- drawing ---------------- */
  function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }
  function draw() {
    const st = B.st, T = performance.now() / 1000, mood = MOOD[st.map % MOOD.length]; if (BGmap !== st.map) { BG = paintBg(mood); BGmap = st.map; }
    cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.direction = 'ltr'; cx.drawImage(BG, 0, 0, VW, VH);
    if (B.shake && !G.RM()) cx.translate((Math.random() - .5) * B.shake * K * 2.5, (Math.random() - .5) * B.shake * K * 2.5);
    // parallax ranges and drifting clouds
    for (const [f, col, amp, base] of [[.18, mood.far, 26, .55], [.4, mood.near, 18, .74]]) { cx.fillStyle = col; cx.beginPath(); cx.moveTo(0, VH); const off = B.cam * K * f; for (let x = 0; x <= VW; x += 8) { const u = (x + off) / VW; cx.lineTo(x, SY(C.GY) - (C.GY * K * (1 - base)) + Math.sin(u * 7 + f * 9) * amp + Math.sin(u * 19) * amp * .3); } cx.lineTo(VW, VH); cx.fill(); }
    if (!mood.night) { cx.fillStyle = 'rgba(255,255,255,.16)'; for (let i = 0; i < 5; i++) { const x = ((G.hsh(i) * VW * 1.6 + T * (6 + i * 2) - B.cam * K * .1) % (VW * 1.6) + VW * 1.6) % (VW * 1.6) - VW * .3, y = SY(14 + i * 9); cx.beginPath(); cx.ellipse(x, y, 40 + i * 9, 7 + i, 0, 0, Math.PI * 2); cx.ellipse(x + 30, y - 4, 28, 8, 0, 0, Math.PI * 2); cx.fill(); } }
    // the mountain: layered strata, scorch marks, a lit edge, desert scrub
    const h = st.h, x0 = Math.max(0, Math.floor(B.side ? C.W - B.cam - viewW - 2 : B.cam - 2)), x1 = Math.min(C.W, Math.ceil(B.side ? C.W - B.cam + 2 : B.cam + viewW + 2));
    cx.save(); cx.beginPath(); cx.moveTo(SX(x0), SY(C.H + 40)); for (let x = x0; x <= x1; x++) cx.lineTo(SX(x), SY(h[x])); cx.lineTo(SX(x1), SY(C.H + 40)); cx.closePath();
    const gr = cx.createLinearGradient(0, SY(40), 0, SY(C.H)); gr.addColorStop(0, mood.rock[0]); gr.addColorStop(.4, mood.rock[1]); gr.addColorStop(1, mood.rock[2]); cx.fillStyle = gr; cx.fill(); cx.clip();
    for (let y = 40; y < C.H + 30; y += 5) { cx.fillStyle = (y / 5) % 2 ? 'rgba(255,230,190,.06)' : 'rgba(40,15,15,.08)'; cx.beginPath(); cx.moveTo(SX(x0), SY(y)); for (let x = x0; x <= x1; x += 4) cx.lineTo(SX(x), SY(y + Math.sin(x * .06 + y) * 1.4)); for (let x = x1; x >= x0; x -= 4) cx.lineTo(SX(x), SY(y + 2.6 + Math.sin(x * .06 + y) * 1.4)); cx.fill(); }
    for (const s of scorch) { const gx = cx.createRadialGradient(SX(s.x), SY(s.y), 0, SX(s.x), SY(s.y), s.r * K); gx.addColorStop(0, 'rgba(25,10,10,.55)'); gx.addColorStop(1, 'rgba(25,10,10,0)'); cx.fillStyle = gx; cx.fillRect(SX(s.x) - s.r * K, SY(s.y) - s.r * K, s.r * K * 2, s.r * K * 2); }
    cx.restore();
    cx.strokeStyle = mood.night ? 'rgba(190,200,255,.35)' : 'rgba(255,225,175,.6)'; cx.lineWidth = Math.max(1.5, K * .5); cx.beginPath(); for (let x = x0; x <= x1; x++) { const y = SY(h[x]); x === x0 ? cx.moveTo(SX(x), y) : cx.lineTo(SX(x), y); } cx.stroke();
    for (let x = x0 - x0 % 7; x <= x1; x += 7) if (h[x] > C.GY - 3 && G.hsh(x) < .5) { const bx = SX(x), by = SY(h[x]); cx.strokeStyle = 'rgba(60,40,20,.7)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(bx, by); cx.lineTo(bx - K * .6, by - K * 1.4); cx.moveTo(bx, by); cx.lineTo(bx + K * .5, by - K * 1.6); cx.stroke(); }
    // gates
    for (const g of st.gates) { const x = SX(g.x), y = SY(g.y - g.h / 2), w = K * 8.5, hh = g.h * K, fl = g.flash, col = g.v >= 10 ? [255, 207, 107] : [63, 224, 197]; const gl = cx.createRadialGradient(x, y + hh / 2, 0, x, y + hh / 2, hh * .9); gl.addColorStop(0, `rgba(${col},${.25 + fl * .3})`); gl.addColorStop(1, `rgba(${col},0)`); cx.fillStyle = gl; cx.fillRect(x - hh, y - hh * .4, hh * 2, hh * 1.8);
      cx.fillStyle = `rgba(${col},${.22 + fl * .35})`; rr(x - w / 2, y, w, hh, K * 1.2); cx.fill(); cx.strokeStyle = `rgba(${col},.95)`; cx.lineWidth = K * (.45 + fl * .4); cx.stroke();
      cx.save(); cx.translate(x, y + hh / 2); cx.shadowColor = `rgb(${col})`; cx.shadowBlur = K * 3; cx.fillStyle = '#fff'; cx.font = `900 ${K * (g.v >= 10 ? 5.4 : 4.8)}px Tajawal,system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('×' + g.v, 0, 0); cx.restore();
      if (g.amp) { cx.fillStyle = `rgba(${col},.4)`; cx.fillRect(x - K * .2, SY(g.y0 - g.amp - g.h / 2), K * .4, (g.amp * 2 + g.h) * K); } }
    for (const Cs of st.castles) drawCastle(Cs, T);
    // your last shot: faint path + an ✕ where it landed
    if (B.ghost && !st.done) { cx.setLineDash([K, K * 1.4]); cx.strokeStyle = 'rgba(255,255,255,.3)'; cx.lineWidth = Math.max(1, K * .35); cx.beginPath(); B.ghost.pts.forEach(([x, y], i) => i ? cx.lineTo(SX(x), SY(y)) : cx.moveTo(SX(x), SY(y))); cx.stroke(); cx.setLineDash([]);
      if (B.ghost.imp) { const ix = SX(B.ghost.imp.x), iy = SY(B.ghost.imp.y), s = K * 1.6; cx.strokeStyle = 'rgba(255,255,255,.8)'; cx.lineWidth = K * .45; cx.beginPath(); cx.moveTo(ix - s, iy - s); cx.lineTo(ix + s, iy + s); cx.moveTo(ix + s, iy - s); cx.lineTo(ix - s, iy + s); cx.stroke(); } }
    // launchers: cannons on wheels with a team ring; the computer's barrel turns as it aims
    for (const s of [0, 1]) { const L = C.launcher(s), x = SX(L.x), y = SY(L.y), sz = K * 4.6, mine = s === me(); const ang = mine ? (B.aim ? B.aim.a : B.lastA || .7) : (B.mode === 'bot' ? B.foeArm : .7 + Math.sin(T + s) * .04);
      const dir = mine ? 1 : -1; cx.save(); cx.translate(x, y + sz * .15); cx.scale(dir, 1); cx.rotate(-ang); const bar = cx.createLinearGradient(0, -sz * .25, 0, sz * .25); bar.addColorStop(0, mine ? '#f2cf7c' : '#e08060'); bar.addColorStop(1, mine ? '#9a6a28' : '#8a3a28'); cx.fillStyle = bar; rr(-sz * .2, -sz * .25, sz * 1.8, sz * .5, sz * .22); cx.fill(); cx.fillStyle = '#2a1a10'; cx.fillRect(sz * 1.45, -sz * .3, sz * .15, sz * .6); cx.restore();
      cx.fillStyle = '#4a2d18'; rr(x - sz * .9, y + sz * .2, sz * 1.8, sz * .5, sz * .2); cx.fill(); for (const e of [-.55, .55]) { cx.fillStyle = '#2a1a10'; cx.beginPath(); cx.arc(x + e * sz, y + sz * .85, sz * .34, 0, Math.PI * 2); cx.fill(); cx.strokeStyle = '#7a5530'; cx.lineWidth = K * .3; cx.beginPath(); cx.arc(x + e * sz, y + sz * .85, sz * .2, 0, Math.PI * 2); cx.stroke(); }
      cx.strokeStyle = `hsl(${B.hues[s]},80%,60%)`; cx.lineWidth = K * .45; cx.beginPath(); cx.arc(x, y + sz * .15, sz * .32, 0, Math.PI * 2); cx.stroke();
      if (!mine && B.botAimAt) { cx.font = `${K * 3}px system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('🎯', x, y - sz * 1.5 + Math.sin(T * 8) * K * .4); } }
    // aim preview: only the first part of the arc, so skill still matters
    if (B.aim && !st.done) { const tr2 = C.trace(st, me(), B.aim.a, B.aim.p, 6, 14); tr2.pts.forEach(([x, y], i) => { cx.globalAlpha = 1 - i / 16; cx.fillStyle = i % 2 ? 'rgba(255,240,200,.9)' : 'rgba(127,247,223,.9)'; cx.beginPath(); cx.arc(SX(x), SY(y), K * (.75 - i * .03), 0, Math.PI * 2); cx.fill(); }); cx.globalAlpha = 1; }
    // smoke, rockets, debris, light
    for (const p of parts) if (p.smoke) { cx.globalAlpha = Math.max(0, p.l / p.m) * .55; cx.fillStyle = `rgb(${p.c})`; cx.beginPath(); cx.arc(SX(p.x), SY(p.y), p.s * K * .5, 0, Math.PI * 2); cx.fill(); } cx.globalAlpha = 1;
    for (const p of st.R) { const x = SX(p.x), y = SY(p.y), ang = Math.atan2(p.vy, B.side ? -p.vx : p.vx), L = K * (p.big ? 3.2 : 2 + Math.min(1.6, Math.log2(1 + p.w) * .35));
      cx.save(); cx.translate(x, y); cx.rotate(ang);
      if (p.big) { cx.rotate(T * 6); cx.fillStyle = '#6e5f5a'; cx.beginPath(); for (let a = 0; a < 9; a++) { const an = a / 9 * Math.PI * 2, r2 = L * (.8 + G.hsh(a) * .25); cx.lineTo(Math.cos(an) * r2, Math.sin(an) * r2); } cx.fill(); cx.fillStyle = 'rgba(255,255,255,.15)'; cx.beginPath(); cx.arc(-L * .25, -L * .25, L * .35, 0, Math.PI * 2); cx.fill(); }
      else { cx.globalCompositeOperation = 'lighter'; cx.fillStyle = p.f ? 'rgba(255,110,40,.6)' : 'rgba(255,190,110,.5)'; cx.beginPath(); cx.ellipse(-L * 1.25, 0, L * (.6 + Math.random() * .3), L * .22, 0, 0, Math.PI * 2); cx.fill(); cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = '#e8e2d8'; rr(-L, -L * .15, L * 1.5, L * .3, L * .14); cx.fill(); cx.fillStyle = p.o === me() ? '#3fe0c5' : '#ff4d6d'; cx.beginPath(); cx.moveTo(L * .45, -L * .17); cx.quadraticCurveTo(L * 1.05, 0, L * .45, L * .17); cx.fill();
        cx.fillStyle = '#8a8378'; cx.beginPath(); cx.moveTo(-L * .95, -L * .15); cx.lineTo(-L * 1.2, -L * .38); cx.lineTo(-L * .7, -L * .15); cx.moveTo(-L * .95, L * .15); cx.lineTo(-L * 1.2, L * .38); cx.lineTo(-L * .7, L * .15); cx.fill(); }
      cx.restore(); }
    for (const p of parts) { if (p.smoke) continue; cx.globalAlpha = Math.min(1, Math.max(0, p.l / p.m) * 1.5); cx.fillStyle = p.c; const s = p.s * K; if (p.sq) { cx.save(); cx.translate(SX(p.x), SY(p.y)); cx.rotate(p.l * 3); cx.fillRect(-s / 2, -s / 2, s, s); cx.restore(); } else cx.fillRect(SX(p.x) - s / 2, SY(p.y) - s / 2, s, s); } cx.globalAlpha = 1;
    cx.globalCompositeOperation = 'lighter'; for (const l of lights) { const a = Math.max(0, l.l / l.m); if (l.ring) { cx.strokeStyle = `rgba(255,240,210,${a * .7})`; cx.lineWidth = K * 1.2 * a; cx.beginPath(); cx.arc(SX(l.x), SY(l.y), l.r * K, 0, Math.PI * 2); cx.stroke(); continue; }
      const g2 = cx.createRadialGradient(SX(l.x), SY(l.y), 0, SX(l.x), SY(l.y), l.r * K); g2.addColorStop(0, `rgba(${l.c},${.75 * a})`); g2.addColorStop(1, `rgba(${l.c},0)`); cx.fillStyle = g2; cx.fillRect(SX(l.x) - l.r * K, SY(l.y) - l.r * K, l.r * K * 2, l.r * K * 2); } cx.globalCompositeOperation = 'source-over';
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; for (const f of floats) { cx.globalAlpha = Math.min(1, f.l * 2); cx.font = `900 ${K * 4.6 * f.s}px Tajawal,system-ui`; cx.lineWidth = K * .8; cx.strokeStyle = 'rgba(20,10,30,.85)'; cx.strokeText(f.t, SX(f.x), SY(f.y)); cx.fillStyle = f.c; cx.fillText(f.t, SX(f.x), SY(f.y)); } cx.globalAlpha = 1;
    const ef = st.castles[foe()], ex = SX(ef.x0 + ef.cols * C.CS / 2); if (ex > VW) { cx.fillStyle = 'rgba(255,77,109,.85)'; cx.beginPath(); const ay = SY(C.GY - 18); cx.moveTo(VW - 8, ay); cx.lineTo(VW - 22, ay - 10); cx.lineTo(VW - 22, ay + 10); cx.fill(); }
    if (mood.night) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); const vg = cx.createRadialGradient(VW / 2, VH * .55, VH * .2, VW / 2, VH * .55, VH * .8); vg.addColorStop(0, 'rgba(0,0,20,0)'); vg.addColorStop(1, 'rgba(0,0,20,.45)'); cx.fillStyle = vg; cx.fillRect(0, 0, VW, VH); }
    if (B.flash) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.fillStyle = `rgba(255,235,190,${B.flash * .4})`; cx.fillRect(0, 0, VW, VH); }
  }
  function drawCastle(Cs, T) {
    const cs = C.CS * K, mir = B.side === 1, cellX = c => mir ? SX(Cs.x0 + (c + 1) * C.CS) : SX(Cs.x0 + c * C.CS);
    for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k || k === 9) continue; const c = i % Cs.cols, r = (i / Cs.cols) | 0, x = cellX(c), y = SY(Cs.y0 + r * C.CS), pal = BR[k];
      cx.fillStyle = pal[(c * 7 + r * 3) % 3]; cx.fillRect(x, y, cs + .5, cs + .5); cx.fillStyle = 'rgba(255,240,210,.18)'; cx.fillRect(x, y, cs, cs * .14); cx.fillStyle = 'rgba(40,15,10,.25)'; cx.fillRect(x, y + cs * .86, cs, cs * .14); cx.fillRect(x + cs * .92, y, cs * .08, cs);
      if (k === 1 && (c + r * 2) % 5 === 0) { cx.fillStyle = 'rgba(90,50,25,.35)'; cx.fillRect(x + cs * .2, y + cs * .45, cs * .5, cs * .08); }
      if ((r === 2 || r === 5) && (c === 1 || c === 7 || c === 4)) { cx.fillStyle = 'rgba(20,10,20,.75)'; rr(x + cs * .35, y + cs * .18, cs * .3, cs * .6, cs * .14); cx.fill(); } // window slits
      const hp0 = k === 1 ? 8 : 22; if (Cs.hp[i] < hp0 * .55) { cx.strokeStyle = 'rgba(30,10,10,.65)'; cx.lineWidth = Math.max(1, K * .22); cx.beginPath(); cx.moveTo(x + cs * .2, y + cs * .25); cx.lineTo(x + cs * .5, y + cs * .55); cx.lineTo(x + cs * .38, y + cs * .85); cx.stroke(); }
      if (r === 0 || !Cs.t[i - Cs.cols]) { cx.fillStyle = pal[0]; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + cs / 2, y - cs * .55); cx.lineTo(x + cs, y); cx.fill(); } }
    const gc = Cs.side ? 6 : 2, gi = (Cs.rows - 1) * Cs.cols + gc; if (Cs.t[gi] && Cs.t[gi - Cs.cols]) { const x = cellX(gc), y = SY(Cs.y0 + (Cs.rows - 2) * C.CS); cx.fillStyle = '#5a3418'; rr(x + cs * .1, y + cs * .3, cs * .8, cs * 1.7, cs * .4); cx.fill(); cx.strokeStyle = '#2a170a'; cx.lineWidth = K * .25; cx.beginPath(); cx.moveTo(x + cs * .5, y + cs * .4); cx.lineTo(x + cs * .5, y + cs * 2); cx.stroke(); } // wooden gate
    let top = -1; for (let r = 0; r < Cs.rows; r++) if (Cs.t[r * Cs.cols]) { top = r; break; }
    if (top >= 0) { const bx = SX(Cs.x0 + C.CS * .5), by = SY(Cs.y0 + top * C.CS) - cs * .5, hue = B.hues[Cs.side]; cx.strokeStyle = '#3b2615'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(bx, by); cx.lineTo(bx, by - K * 7); cx.stroke(); cx.fillStyle = `hsl(${hue},80%,60%)`; const d = (mir ? -1 : 1) * (Cs.side ? -1 : 1); cx.beginPath(); cx.moveTo(bx, by - K * 7); cx.quadraticCurveTo(bx + d * K * 3, by - K * (6.4 + Math.sin(T * 4) * .6), bx + d * K * 5, by - K * 6); cx.lineTo(bx, by - K * 4.6); cx.fill(); }
    if (Cs.coreHp > 0) { const x = SX(Cs.x0 + (Cs.cc + 1) * C.CS), y = SY(Cs.y0 + (Cs.cr + 1) * C.CS), f = Cs.coreHp / Cs.core0, pu = 1 + Math.sin(T * (5 + (1 - f) * 8)) * .1; const gl = cx.createRadialGradient(x, y, 0, x, y, cs * 2.6 * pu); gl.addColorStop(0, `rgba(255,214,110,${.5 + .35 * (1 - f)})`); gl.addColorStop(1, 'rgba(255,214,110,0)'); cx.fillStyle = gl; cx.fillRect(x - cs * 3, y - cs * 3, cs * 6, cs * 6);
      cx.fillStyle = '#3a2412'; rr(x - cs * .8, y - cs * .95, cs * 1.6, cs * 1.9, cs * .3); cx.fill(); cx.fillStyle = `hsl(${40 - (1 - f) * 34},100%,${62 + Math.sin(T * 9) * 6}%)`; rr(x - cs * .55, y - cs * .65, cs * 1.1, cs * 1.3, cs * .25); cx.fill(); cx.strokeStyle = '#3a2412'; cx.lineWidth = K * .25; cx.beginPath(); cx.moveTo(x, y - cs * .65); cx.lineTo(x, y + cs * .65); cx.moveTo(x - cs * .55, y); cx.lineTo(x + cs * .55, y); cx.stroke(); }
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
    $('wWind').textContent = '🌬 ' + (st.windMax ? windTxt() : '0');
    document.querySelectorAll('#wWeps button').forEach(b => { const wk = b.dataset.w, key = me() * 3 + Object.keys(C.WPN).indexOf(wk), left = Math.max(0, (st.cd[key] || 0) - st.tick), full = C.WPN[wk].cd * 60; b.querySelector('u').style.height = (Math.min(1, left / full) * 100).toFixed(0) + '%'; b.classList.toggle('ready', !left); });
    if (B.aim) { $('wAim').classList.remove('hide'); $('wAim').textContent = `∠ ${Math.round(B.aim.a * 180 / Math.PI)}°   ⚡ ${Math.round(B.aim.p * 100)}%`; } else $('wAim').classList.add('hide');
    let inc = false; for (const p of st.R) if (p.o === foe() && vx(p.x) < 150 && p.vy > 0) inc = true; if (inc && !B.incT) { B.incT = now; toast(tr('incoming')); G.tone(880, .12, 'square', .04); G.tone(660, .12, 'square', .04, 1, .14); } if (!inc && B.incT && now - B.incT > 3000) B.incT = 0;
  }
  let toastT = 0; function toast(t) { const e = $('wToast'); e.textContent = t; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 1600); }
  function selW(w) { if (B) B.wsel = w; document.querySelectorAll('#wWeps button').forEach(b => b.classList.toggle('sel', b.dataset.w === w)); }
  document.querySelectorAll('#wWeps button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); G.SFX.click(); selW(b.dataset.w); }));
  $('wMenu').onclick = () => G.toMenu(); $('wMute').onclick = () => { G.audio(); G.setMute(!G.MUTE); };
  /* ---------------- aiming: pull back like a slingshot ---------------- */
  let drag = null, lastTick = 0;
  cv.addEventListener('pointerdown', e => { if (!B || B.st.done || performance.now() < B.localAt) return; G.audio(); drag = { x: e.clientX, y: e.clientY }; try { cv.setPointerCapture(e.pointerId); } catch (x) { } }, true);
  cv.addEventListener('pointermove', e => { if (!B || !drag) return; const px = drag.x - e.clientX, py = e.clientY - drag.y, d = Math.hypot(px, py); if (d < 10) { B.aim = null; return; }
    const a = Math.max(3, Math.min(87, Math.atan2(py, Math.max(.001, px)) * 180 / Math.PI)) * Math.PI / 180, p = Math.min(1, d / (Math.min(VW, VH) * .42)); B.aim = { a, p };
    const tk = Math.round(p * 20) + Math.round(a * 30) * 100; if (tk !== lastTick) { lastTick = tk; G.tone(300 + p * 500, .03, 'triangle', .02); } }, true); // a soft tick as the aim moves
  function release() { if (!B || !drag) return; drag = null; const aim = B.aim; B.aim = null; if (!aim) return; B.lastA = aim.a; shoot(aim.a, aim.p, B.wsel); }
  cv.addEventListener('pointerup', release, true); cv.addEventListener('pointercancel', () => { drag = null; if (B) B.aim = null; }, true);
  function shoot(a, p, wk) {
    const st = B.st; if (!C.ready(st, me(), wk)) { const alt = Object.keys(C.WPN).find(k => C.ready(st, me(), k)); if (!alt) { toast(tr('reload')); return; } wk = alt; selW(alt); }
    const s = (Math.random() * 4e9) >>> 0, k = st.tick + (B.mode === 'net' ? 8 : 1); if (!C.fire(st, { side: me(), a, p, w: wk, s, k })) return;
    if (B.mode === 'net') netSend({ t: 'fire', k, a: +a.toFixed(4), p: +p.toFixed(4), w: wk, s }); events();
    if (wk !== 'swarm' && C.ready(st, me(), 'swarm')) setTimeout(() => B && selW('swarm'), 200);
  }
  addEventListener('keydown', e => { if (!B) return; if (e.key === '1') selW('swarm'); else if (e.key === '2') selW('fire'); else if (e.key === '3') selW('boulder'); else if (e.key === 'Escape') G.toMenu(); });
  /* ---------------- results ---------------- */
  const statsOf = () => { const st = B.st; return { peak: st.peak[me()], dmg: st.dealt[me()], secs: Math.round((performance.now() - B.localAt) / 1000), acc: B.volleys ? Math.round(B.hits / B.volleys * 100) : 0 }; };
  function showStats(S) { $('wrPeak').textContent = Math.round(S.peak); $('wrDmg').textContent = Math.round(S.dmg); $('wrAcc').textContent = S.acc + '%'; $('wrTime').textContent = Math.floor(S.secs / 60) + ':' + String(S.secs % 60).padStart(2, '0'); }
  function finish(won) {
    const S = statsOf(), o = { bi: B.botIdx, quick: B.quick }; leave(); saveP(); G.show('wres'); showStats(S); $('wrT').textContent = won ? tr('youWon') : tr('youLost');
    if (o.quick) { $('wrSub').textContent = tr('aiName', nm(C.DIFF[PG.diff])); $('wrMain').textContent = tr('again2'); $('wrMain').onclick = startQuick; }
    else { const Bt = C.BOTS[o.bi]; $('wrSub').textContent = won ? tr('vsBot', nm(Bt)) : tr('lostTo', nm(Bt));
      if (won) { PG.w[o.bi] = 1; if (o.bi + 1 >= PG.un && o.bi + 1 < C.BOTS.length) PG.un = o.bi + 2; saveP(); }
      const nxt = won && o.bi + 1 < C.BOTS.length; $('wrMain').textContent = nxt ? tr('nextBot') + ' ' + ICON[o.bi + 1] : tr('retry'); $('wrMain').onclick = () => startBot(nxt ? o.bi + 1 : o.bi); }
    $('wrMain').classList.remove('hide'); $('wrWait').textContent = ''; $('wrBack').onclick = warMenu;
  }
  /* ---------------- menus ---------------- */
  function chips() {
    $('diffChips').innerHTML = Object.keys(C.DIFF).map(k => `<button data-d="${k}" class="${PG.diff === k ? 'on' : ''}">${nm(C.DIFF[k])}</button>`).join('');
    $('mapChips').innerHTML = [`<button data-m="-1" class="${PG.map === -1 ? 'on' : ''}">${tr('randomMap')}</button>`].concat(C.MAPS.map((m, i) => `<button data-m="${i}" class="${PG.map === i ? 'on' : ''}">⛰️ ${G.esc(nm(m))}</button>`)).join('');
    $('diffChips').querySelectorAll('button').forEach(b => b.onclick = () => { G.SFX.click(); PG.diff = b.dataset.d; saveP(); chips(); });
    $('mapChips').querySelectorAll('button').forEach(b => b.onclick = () => { G.SFX.click(); PG.map = +b.dataset.m; saveP(); chips(); });
  }
  function warMenu() { leave(); G.show('war'); chips(); $('botList').innerHTML = C.BOTS.map((b, i) => { const lock = i + 1 > PG.un, won = PG.w[i]; return `<button class="bot ${lock ? 'lock' : ''} ${i + 1 === PG.un && !won ? 'next' : ''}" data-b="${i}" ${lock ? 'disabled' : ''}><i>${lock ? '🔒' : ICON[i]}</i><div>${G.esc(nm(b))}<small>${tr('botMap', nm(C.MAPS[b.map]))}</small></div><b>${won ? '🏆' : ''}</b></button>`; }).join('');
    $('botList').querySelectorAll('[data-b]').forEach(b => b.onclick = () => { G.SFX.click(); startBot(+b.dataset.b); }); }
  function startBot(i) { const Bt = C.BOTS[i]; start({ mode: 'bot', map: Bt.map, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: Bt, botIdx: i, names: [G.NAME || (AR() ? 'أنت' : 'You'), nm(Bt)], hues: [G.HUE, 8] }); }
  function startQuick() { const D = C.DIFF[PG.diff] || C.DIFF.normal, map = PG.map >= 0 ? PG.map : Math.floor(Math.random() * C.MAPS.length); start({ mode: 'bot', quick: 1, map, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: D, names: [G.NAME || (AR() ? 'أنت' : 'You'), '🤖 ' + tr('aiName', nm(D))], hues: [G.HUE, 8] }); }
  $('bWar').onclick = () => { G.audio(); G.SFX.click(); warMenu(); }; $('bAIgo').onclick = () => { G.SFX.click(); startQuick(); };
  /* ---------------- online war ---------------- */
  const NET = { ws: null, me: null, code: null, room: null };
  const link = code => location.origin + location.pathname.replace(/[^/]*$/, '') + '?w=' + code;
  const netSend = m => { if (NET.ws && NET.ws.readyState === 1) NET.ws.send(JSON.stringify(m)); };
  function connect(code) {
    if (NET.ws) try { NET.ws.close(); } catch (e) { } G.audio(); G.show('wlobby'); $('wCode').textContent = code || '·····'; $('wWait').textContent = tr('connecting'); $('wPlayers').innerHTML = '';
    const nm2 = G.NAME || (AR() ? 'رامي' : 'Archer'); const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/sh/ws?m=war&t=' + G.TOK + '&n=' + encodeURIComponent(nm2) + '&h=' + G.HUE + '&lv=1' + (code ? '&r=' + code : ''));
    NET.ws = ws; ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } onNet(m); }; ws.onclose = () => { if (NET.ws === ws) NET.ws = null; };
  }
  const keepWs = fn => { const ws = NET.ws; NET.ws = null; fn(); NET.ws = ws; };
  function onNet(m) {
    if (m.t === 'hello') { NET.me = m.me; NET.code = m.code; history.replaceState(null, '', '?w=' + m.code); $('wCode').textContent = m.code; return; }
    if (m.t === 'err') { G.toast(tr(m.e)); setTimeout(() => G.toMenu(), 1200); return; }
    if (m.t === 'room') { const prev = NET.room; NET.room = m;
      if (m.state === 'duel' && (!B || (prev && prev.at !== m.at))) { const side = m.sides[NET.me]; if (side == null) return; const pl = s => m.players.find(p => m.sides[p.id] === s) || { n: '?', h: 0 };
        if (B) keepWs(leave); start({ mode: 'net', map: (m.lv - 1) % C.MAPS.length, seed: m.seed, side, names: side ? [pl(1).n, pl(0).n] : [pl(0).n, pl(1).n], hues: [pl(0).h, pl(1).h], localAt: performance.now() + (m.at - m.now) }); return; }
      if (m.state === 'lobby') { if (B) keepWs(leave); lobby(); } return; }
    if (!B) { if (m.t === 'res') results(m.res); return; }
    if (m.t === 'fire') { const st = B.st; C.fire(st, { side: m.side, a: m.a, p: m.p, w: m.w, s: m.s, k: Math.max(m.k, st.tick + 1) }); return; }
    if (m.t === 'cs') { if (m.side !== me()) C.applyCastle(B.st, B.st.castles[m.side], m.pk); events(); return; }
    if (m.t === 'emo') { const pl = NET.room && NET.room.players.find(p => p.id === m.id), d = document.createElement('div'); d.innerHTML = m.e + '<small>' + G.esc(pl ? pl.n : '') + '</small>'; d.style.left = (15 + Math.random() * 70) + '%'; $('wEmof').appendChild(d); setTimeout(() => d.remove(), 2500); return; }
    if (m.t === 'res') { const mine = m.res.find(x => x.id === NET.me), won = !!(mine && mine.time); if (!B.endT) { collapseFx(won ? foe() : me()); B.endT = performance.now(); won ? SFX.win() : SFX.lose(); } setTimeout(() => { if (B) { NET.last = statsOf(); keepWs(leave); } results(m.res); }, 2400); }
  }
  function netTick(now) { if (now - B.lastCs < 300 || now < B.localAt) return; B.lastCs = now; const Cs = B.st.castles[me()]; netSend({ t: 'cs', pk: C.packCastle(Cs), f: +(Cs.coreHp / Cs.core0).toFixed(3) }); }
  function lobby() { const r = NET.room; if (!r) return; G.show('wlobby'); const host = r.host === NET.me, hn = (r.players.find(p => p.id === r.host) || {}).n || '', M = C.MAPS[(r.lv - 1) % C.MAPS.length];
    $('wCode').textContent = r.code; $('wPlayers').innerHTML = r.players.map(p => `<li class="${p.id === NET.me ? 'mine' : ''}"><i style="background:hsl(${p.h},80%,60%)"></i>${G.esc(p.n)}${p.id === NET.me ? ' (' + tr('you') + ')' : ''}${p.id === r.host ? ' 👑' : ''}<b>${p.on ? '●' : '○'}</b></li>`).join('');
    $('wMap').innerHTML = `⛰️ ${tr('mapN', G.esc(nm(M)))}<small>${tr('fair')}</small>`; $('wPrev').disabled = $('wNext').disabled = !host; const two = r.players.filter(p => p.on).length >= 2;
    $('wStart').classList.toggle('hide', !host); $('wStart').disabled = !two; $('wStart').style.opacity = two ? 1 : .5; $('wWait').textContent = !two ? tr('need2') : host ? tr('youHost') : tr('waitHost', hn); }
  function results(res) { G.show('wres'); const mine = res.find(x => x.id === NET.me), host = NET.room && NET.room.host === NET.me, won = !!(mine && mine.time), foeP = res.find(x => x.id !== NET.me);
    $('wrT').textContent = won ? tr('youWon') : tr('youLost'); $('wrSub').textContent = won ? '' : foeP ? tr('lostTo', foeP.n) : ''; showStats(NET.last || { peak: 0, dmg: 0, secs: 0, acc: 0 });
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
  window.SHW_DEBUG = { C, PG, b: () => B, NET, startBot, startQuick, warMenu, connect, shoot, selW };
})();
