/* شُهُب — battle client. Rules live in war-core.js (window.SHW_C); shared helpers from game.js (window.SHG); modes & progression in meta.js (window.SHM).
   Modes: 'bot' (campaign / quick / survival / challenge), 'net' (friends & ranked), 'practice' (range + tutorial). */
(() => {
  'use strict';
  const C = window.SHW_C, G = window.SHG, $ = G.$, tr = G.tr, SFX = G.SFX;
  Object.assign(G.TXT.ar, { wSwarm: 'سرب', wFire: 'نار', wBoulder: 'صخرة', wDune: 'كثيب', wStar: 'الشهاب', reload: 'يُعاد التلقيم…', incoming: '⚠️ قذائف قادمة!', heartHit: 'أصبت القلب!', collapse: 'انهار البرج!',
    aimHint: '👆 اسحب للخلف وأفلت لتطلق', placeDune: '🏜️ المس الأرض أمام قلعتك لترفع كثيباً', placeStar: '🌠 المس أي مكان لتستدعي الشهاب الأعظم', noSand: 'نفد الرمل — يتجدد مع الوقت', starNotReady: 'املأ عدّاد الشهاب بالضرب والبوابات', chain: 'سلسلة انفجارات!', smash: 'ضربة متدحرجة!', starFall: 'الشهاب الأعظم!',
    victory: 'النصر', defeat: 'الهزيمة', onlyW: 'هذا التحدي يسمح فقط بـ: {0}', volleysLeft: 'الطلقات المتبقية: {0}', practiceT: 'ميدان التدريب', fullArc: 'المسار الكامل', shortBy: 'قصيرة بـ {0} م', longBy: 'طويلة بـ {0} م', onTarget: 'في الهدف!', rebuilt: 'أُعيد بناء القلعة',
    tut1: '١/٦ اسحب للخلف من أي مكان ثم أفلت: الاتجاه زاوية، والمسافة قوة', tut2: '٢/٦ أصب القلعة الحمراء', tut3: '٣/٦ مرّر سربك عبر بوابة ×', tut4: '٤/٦ اختر 🪨 الصخرة: تتدحرج على المنحدر وتصطدم بالجدار', tut5: '٥/٦ اختر 🏜️ الكثيب ثم المس الأرض أمام قلعتك', tut6: '٦/٦ عدّاد الشهاب ممتلئ: اختر 🌠 ثم المس قلعة الخصم', tutDone: 'أتقنت الأساسيات! 🎉', wave: 'الموجة {0}' });
  Object.assign(G.TXT.en, { wSwarm: 'Swarm', wFire: 'Fire', wBoulder: 'Boulder', wDune: 'Dune', wStar: 'Star', reload: 'Reloading…', incoming: '⚠️ Incoming!', heartHit: 'Heart hit!', collapse: 'Tower down!',
    aimHint: '👆 Pull back and release to fire', placeDune: '🏜️ Tap the ground in front of your fort to raise a dune', placeStar: '🌠 Tap anywhere to call the Great Star', noSand: 'Out of sand — it refills over time', starNotReady: 'Fill the star meter with hits and gates', chain: 'Chain reaction!', smash: 'Rolling smash!', starFall: 'THE GREAT STAR!',
    victory: 'VICTORY', defeat: 'DEFEAT', onlyW: 'This challenge allows only: {0}', volleysLeft: 'Volleys left: {0}', practiceT: 'Practice range', fullArc: 'Full arc', shortBy: '{0} m short', longBy: '{0} m long', onTarget: 'On target!', rebuilt: 'Fort rebuilt',
    tut1: '1/6 Pull back anywhere and release: direction = angle, distance = power', tut2: '2/6 Hit the red fort', tut3: '3/6 Thread your swarm through a × gate', tut4: '4/6 Pick 🪨 Boulder: it rolls down the slope and smashes the wall', tut5: '5/6 Pick 🏜️ Dune, then tap the ground in front of your fort', tut6: '6/6 Star meter is full: pick 🌠 and tap the enemy fort', tutDone: 'You know the basics! 🎉', wave: 'Wave {0}' });
  const AR = () => G.LANG === 'ar', nm = o => o.n[AR() ? 0 : 1];
  const M = () => window.SHM || {};
  const MOOD = {
    dusk: { sky: ['#120d2c', '#2b1f5a', '#8a4563', '#f0a868'], far: '#5a3566', near: '#3d2346', rock: ['#c98a58', '#9a5a3c', '#4e2a2a'], stars: 1, sun: 0, fx: 'motes' },
    dawn: { sky: ['#1d2b5c', '#5a5fa0', '#e39aa6', '#ffd2a1'], far: '#7a6aa0', near: '#5a4a7c', rock: ['#d39a6a', '#a8684a', '#5a3030'], stars: .3, sun: 1, fx: 'birds' },
    noon: { sky: ['#2a4a7a', '#5c8ac0', '#f2c38a', '#ffe2a8'], far: '#a08066', near: '#80604a', rock: ['#e0a66a', '#b87448', '#6a3a28'], stars: 0, sun: 2, fx: 'haze' },
    night: { sky: ['#05040f', '#0f1235', '#1f2050', '#3a3060'], far: '#1c1838', near: '#141130', rock: ['#8a6a5a', '#5c4038', '#2a1a1a'], stars: 1.4, sun: 0, night: 1, fx: 'fireflies' },
    storm: { sky: ['#0e1220', '#262c40', '#4a4a58', '#7a6a5e'], far: '#3a3a48', near: '#2a2a36', rock: ['#a88a6a', '#7a5a44', '#3a2a24'], stars: 0, sun: 0, fx: 'rain' },
  };
  const SKIN = { bronze: ['#f2cf7c', '#9a6a28'], obsidian: ['#5a5470', '#1a1626'], jade: ['#7af0c0', '#1f7a5a'], royal: ['#ffe28a', '#b8860b'], crystal: ['#bfe8ff', '#4a7ab8'] };
  const TRAIL = { ember: ['255,190,110', '255,110,40'], frost: ['170,230,255', '120,180,255'], emerald: ['140,255,190', '60,200,140'], violet: ['210,160,255', '160,90,255'], rainbow: null };
  const cv = $('cv'), cx = cv.getContext('2d'), mini = $('wMini'), mx = mini.getContext('2d');
  let VW = 0, VH = 0, DPR = 1, K0 = 1, K = 1, OY = 0, GSY = 0, viewW0 = 120, viewW = 120, BG = null, BGkey = ''; const TOP = 104, BOT = 104;
  function resize() {
    DPR = Math.min(2, devicePixelRatio || 1); VW = innerWidth; VH = innerHeight; const availH = Math.max(200, VH - TOP - BOT);
    K0 = Math.min(VW / Math.min(C.W, 118), availH / C.H); if (VW / K0 > C.W) K0 = Math.min(availH / C.H, VW / C.W) || K0; viewW0 = VW / K0;
    GSY = TOP + Math.max(0, (availH - C.H * K0) / 2) + C.GY * K0; K = K0; viewW = viewW0; OY = GSY - C.GY * K; BGkey = ''; mini.width = mini.clientWidth * DPR || 300; mini.height = mini.clientHeight * DPR || 80;
  }
  function paintBg(mood) {
    const c = document.createElement('canvas'); c.width = VW * DPR; c.height = VH * DPR; const g = c.getContext('2d'); g.scale(DPR, DPR);
    const sky = g.createLinearGradient(0, 0, 0, VH); mood.sky.forEach((col, i) => sky.addColorStop([0, .38, .72, 1][i], col)); g.fillStyle = sky; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 160 * mood.stars; i++) { g.fillStyle = `rgba(255,245,220,${.2 + G.hsh(i + 5) * .6})`; const r = G.hsh(i + 77) * 1.4 + .3; g.fillRect(G.hsh(i) * VW, G.hsh(i + 999) * VH * .55, r, r); }
    if (mood.stars >= 1) { const mx2 = VW * .8, my = VH * .16, mr = 16; g.fillStyle = '#ffeec4'; g.shadowColor = '#ffd88a'; g.shadowBlur = 30; g.beginPath(); g.arc(mx2, my, mr, 0, Math.PI * 2); g.fill(); g.shadowBlur = 0; g.fillStyle = sky; g.beginPath(); g.arc(mx2 + 7, my - 3, mr * .9, 0, Math.PI * 2); g.fill(); }
    if (mood.sun) { const sx = VW * (mood.sun === 1 ? .2 : .75), sy = GSY - 90 - mood.sun * 40, gl = g.createRadialGradient(sx, sy, 0, sx, sy, 140); gl.addColorStop(0, 'rgba(255,240,200,.95)'); gl.addColorStop(.12, 'rgba(255,220,160,.7)'); gl.addColorStop(1, 'rgba(255,200,140,0)'); g.fillStyle = gl; g.fillRect(sx - 140, sy - 140, 280, 280); }
    return c;
  }
  let B = null; const parts = [], floats = [], lights = [], scorch = [], wx = [];
  window.SHW = { get on() { return !!B; }, frame, leave, start, startNet: (c, o) => connect(c, o), get b() { return B; } };
  const LOW = () => (M().set && M().set().fx === 'low') || G.RM();
  function start(o) {
    G.audio(); const rules = o.rules || {}; const st = C.create(o.map, o.seed, { hp0: o.hp0 || 1, hp1: o.mode === 'bot' ? (o.bot.hp || 1) * (o.hpMul || 1) : 1, protect: o.mode === 'net' ? 1 - o.side : null, noJars: rules.noJars, windMax: rules.windMax });
    if (o.carry != null) { const Cm = st.castles[0]; Cm.coreHp = Math.max(Cm.core0 * .15, Math.min(Cm.core0, o.carry * Cm.core0)); }
    B = Object.assign({ st, cam: 0, shake: 0, aim: null, wsel: 'swarm', place: null, fired: 0, endT: 0, flash: 0, slow: 1, lastCs: 0, botNext: 2.4 * 60, botR: C.rng(o.seed ^ 77), botMem: {}, botAimAt: null, foeArm: .7,
      ghost: null, track: null, hits: 0, volleys: 0, seenImp: -1, hpPrev: [0, 0], dmgAcc: [0, 0], dmgT: 0, thuds: 0, falls: 0, starHit: 0, tutStep: o.tut ? 1 : 0, used: {}, minHp: 1, rules, side: 0 }, o);
    B.localAt = B.mode === 'net' ? o.localAt : performance.now() + (o.mode === 'practice' ? 600 : 2600); B.hpPrev = [castleHP(st.castles[0]), castleHP(st.castles[1])];
    K = K0; viewW = viewW0; OY = GSY - C.GY * K; B.cam = 0; parts.length = floats.length = lights.length = scorch.length = wx.length = 0;
    G.show(null); $('whud').classList.remove('hide'); $('hud').classList.add('hide'); $('lang').classList.add('hide');
    $('wN0').textContent = B.names[0]; $('wN1').textContent = B.names[1]; $('wEmo').classList.toggle('hide', B.mode !== 'net');
    hint(B.tutStep ? tr('tut1') : (M().fired && M().fired() > 2 ? '' : tr('aimHint')));
    document.querySelectorAll('#wWeps button').forEach(b => { const w = b.dataset.w, ok = !rules.only || rules.only.includes(w); b.disabled = !ok; b.style.opacity = ok ? '' : .3; });
    $('wCd').classList.toggle('hide', B.mode === 'practice'); $('wCd').textContent = ''; $('wPrac').classList.toggle('hide', B.mode !== 'practice'); $('wPracInfo').textContent = ''; $('wBanner').className = 'wbanner hide';
    selW(rules.only ? rules.only[0] : 'swarm'); hud(true); ambience(true);
  }
  function leave() { if (NET.ws) { const ws = NET.ws; NET.ws = null; try { ws.close(); } catch (e) { } history.replaceState(null, '', location.pathname); } if (B) { B = null; ambience(false); $('whud').classList.add('hide'); $('lang').classList.remove('hide'); } }
  const me = () => B.side, foe = () => 1 - B.side;
  const castleHP = Cs => { let s = Cs.coreHp; for (let i = 0; i < Cs.t.length; i++) if (Cs.t[i] && Cs.t[i] !== 9) s += Cs.hp[i]; return s; };
  function hint(t) { const e = $('wHint'); e.textContent = t || ''; e.classList.toggle('hide', !t); }
  const vx = x => B.side ? C.W - x : x, SX = x => (vx(x) - B.cam) * K, SY = y => OY + y * K, worldX = sx => { const v = sx / K + B.cam; return B.side ? C.W - v : v; };
  function camera(dt) {
    const st = B.st; let lead = -1, inc = -1;
    for (const p of st.R) { const v = vx(p.x); if (p.o === me()) lead = Math.max(lead, v); else if (v < 175) inc = Math.max(inc, v); }
    for (const c of st.starCalls) if (c.side === me()) lead = Math.max(lead, vx(c.x) - 20);
    let L, R;
    if (B.endT) { const lc = vx(st.castles[st.winner === me() ? foe() : me()].x0 + 14); L = lc - viewW0 * .5; R = lc + viewW0 * .5; }
    else if (B.place === 'star') { L = 0; R = C.W; }
    else if (lead >= 0) { R = lead + 26; if (lead > 165) { const E = st.castles[foe()], ef = Math.max(vx(E.x0), vx(E.x0 + E.cols * C.CS)); R = Math.max(R, ef + 8); } L = Math.max(0, R - 160); }
    else if (B.focus && performance.now() < B.focus.t) { L = B.focus.v - 70; R = B.focus.v + 40; }
    else if (inc >= 0) { L = 4; R = Math.min(175, Math.max(70, 360 - inc - 100)); }
    else { L = 4; R = B.aim ? 120 : B.place === 'dune' ? 140 : 70; }
    const maxW = B.place === 'star' ? C.W : 165, want = Math.max(viewW0, Math.min(maxW, R - L)), k = 1 - Math.exp(-(want > viewW ? 3 : 1.8) * dt);
    viewW += (want - viewW) * k; K = VW / viewW; if (VW / K0 >= C.W) { K = K0; viewW = VW / K; }
    OY = GSY - C.GY * K; const camWant = viewW >= C.W ? (C.W - viewW) / 2 : Math.max(0, Math.min(C.W - viewW, lead >= 0 && !B.endT ? R - viewW : (L + R) / 2 - viewW / 2 > 0 && !(L <= 4) ? (L + R) / 2 - viewW / 2 : L));
    B.cam += (camWant - B.cam) * (1 - Math.exp(-3.4 * dt)); if (viewW >= C.W) B.cam = (C.W - viewW) / 2;
  }
  function burst(x, y, n, col, sp = 30, life = .7, grav = 60, size = .8) { if (LOW()) n = Math.ceil(n / 3); for (let i = 0; i < n && parts.length < 1600; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * sp; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * .3, l: life * (.5 + Math.random() * .7), m: life, c: col, s: size * (.5 + Math.random()), g: grav }); } }
  const BR = { 1: ['#d69a5c', '#c4874a', '#b9783f'], 2: ['#9aa0ad', '#868c99', '#7a808c'] };
  function cellXY(Cs, i) { return [Cs.x0 + ((i % Cs.cols) + .5) * C.CS, Cs.y0 + (((i / Cs.cols) | 0) + .5) * C.CS]; }
  let drumIv = 0;
  function whoosh(foeSide) { G.noise(1.4, foeSide ? 600 : 2600, foeSide ? 2600 : 500, .09, 1.6); if (foeSide) G.tone(1500, 1.5, 'sine', .025, .5); }
  function blast(big) { G.noise(big ? .9 : .32, big ? 420 : 1100, big ? 50 : 160, big ? .4 : .13, .7); G.tone(big ? 46 : 70, big ? .8 : .25, 'sine', big ? .3 : .12, .55); if (big) G.noise(.5, 3500, 1200, .06, 2, .08); }
  function ambience(on) {
    clearInterval(drumIv); drumIv = 0; if (!on) return; let step = 0; const pat = [1, 2, 0, 2, 1, 0, 2, 0];
    drumIv = setInterval(() => { if (!B || G.MUTE || document.hidden || performance.now() < B.localAt - 400 || (M().set && M().set().music === 0)) return; const k = pat[step++ % 8], mine = B.st.castles[me()], urgent = mine.coreHp / mine.core0 < .35;
      if (k === 1) G.tone(78, .32, 'sine', .14, .7); else if (k === 2) G.noise(.06, 3800, 2600, .05, 3); if (urgent && step % 2) G.noise(.04, 6000, 5000, .02, 4); }, 250);
  }
  function events() {
    const st = B.st;
    for (const e of st.ev) {
      if (e.e === 'launch') { G.tone(90, .25, 'sine', .22, .5); G.noise(.3, 1800, 400, .12, 1); whoosh(e.side === foe()); const L = C.launcher(e.side); lights.push({ x: L.x, y: L.y - 3, r: 14, l: .2, m: .2, c: '255,200,120' }); burst(L.x, L.y - 3, 10, '#ffd38a', 18, .4, -10, .9);
        if (e.side === me()) { B.fired++; B.volleys++; B.used[e.w] = 1; M().onFire && M().onFire(); if (!B.tutStep) hint(''); G.buzz(15); if (B.track && B.track.pts.length > 2) B.ghost = B.track; B.track = { vid: st.vid, pts: [], imp: null }; B.recoil = 1; } else B.foeRecoil = 1; }
      else if (e.e === 'gate') { SFX.gate(e.k); const g = st.gates[e.g]; if (e.side === me() && B.tutStep === 3) tut(4); if (performance.now() - (g.ft || 0) > 280) { g.ft = performance.now(); floats.push({ x: g.x, y: g.y - g.h / 2 - 3, t: '×' + e.k, c: g.v >= 10 ? '#ffd36b' : '#7ff7df', l: 1.2, s: 1.1 }); lights.push({ x: g.x, y: g.y, r: 16, l: .3, m: .3, c: '255,215,130' }); } }
      else if (e.e === 'boom') { const big = e.r > 3; if (big || Math.random() < .45) blast(big); burst(e.x, e.y, big ? 60 : 7, e.dirt ? '#b77a4c' : '#ffcf7a', big ? 55 : 22, big ? 1.2 : .6, 90, big ? 1.7 : .8);
        lights.push({ x: e.x, y: e.y, r: big ? 26 : 7, l: big ? .35 : .15, m: big ? .35 : .15, c: '255,190,110' }); if (big) { B.shake = Math.max(B.shake, .9); B.flash = .25; lights.push({ x: e.x, y: e.y, r: 4, l: .5, m: .5, ring: 1 }); }
        if (e.dirt && scorch.length < 160) scorch.push({ x: e.x, y: e.y, r: e.r * 1.5 }); }
      else if (e.e === 'thud') { if (e.land) { G.noise(.3, 300, 90, .2, 1); G.tone(60, .3, 'sine', .15, .6); burst(e.x, e.y + 1, 14, '#b77a4c', 22, .7, 90, 1.1); }
        else { G.noise(.5, 500, 70, .35, .8); G.tone(50, .5, 'sine', .3, .5); B.shake = Math.max(B.shake, .8); if (e.side === me()) { B.thuds++; if (B.tutStep === 4) tut(5); floats.push({ x: e.x, y: e.y - 6, t: tr('smash'), c: '#ffd987', l: 1.3, s: .85 }); } } }
      else if (e.e === 'dune') { G.noise(.8, 300, 1400, .16, .6); G.tone(140, .5, 'triangle', .05, 1.6); for (let i = 0; i < (LOW() ? 10 : 30); i++) parts.push({ x: e.x + (Math.random() - .5) * 16, y: B.st.h[Math.round(e.x)] + 4, vx: (Math.random() - .5) * 10, vy: -20 - Math.random() * 25, l: .9, m: .9, c: '#e6b878', s: 1.1, g: 70 }); if (e.side === me() && B.tutStep === 5) tut(6); }
      else if (e.e === 'starcall') { G.tone(880, 1.2, 'sine', .05, 2.2); G.tone(1320, 1.1, 'triangle', .03, 2, .1); B.starMark = { x: e.x, side: e.side, until: performance.now() + C.STAR_DELAY / 60 * 1000 + 200 }; if (e.side === foe()) toast('🌠 ' + tr('incoming')); }
      else if (e.e === 'star') { blast(true); G.noise(1.6, 1800, 40, .5, .5, .05); G.tone(38, 1.4, 'sine', .4, .6); G.tone(660, 1.2, 'triangle', .06, .3, .1); B.shake = 1.6; B.flash = .9; lights.push({ x: e.x, y: e.y, r: 60, l: 1, m: 1, c: '255,220,150' }); lights.push({ x: e.x, y: e.y, r: 6, l: 1, m: 1, ring: 1 });
        burst(e.x, e.y, LOW() ? 40 : 140, '#ffd38a', 80, 1.6, 70, 1.8); burst(e.x, e.y, LOW() ? 20 : 60, '#9a5a3c', 60, 1.4, 110, 1.6); scorch.push({ x: e.x, y: e.y, r: 20 }); floats.push({ x: e.x, y: e.y - 14, t: tr('starFall'), c: '#ffe08a', l: 1.8, s: 1.3 }); G.buzz([60, 40, 120]);
        if (e.side === me()) { const E = B.st.castles[foe()]; if (Math.abs(e.x - (E.x0 + 13.5)) < 22) B.starHit++; if (B.tutStep === 6) tut(7); } }
      else if (e.e === 'jar') { blast(true); G.noise(.6, 2400, 300, .2, 1.4); B.shake = Math.max(B.shake, 1); lights.push({ x: e.x, y: e.y - 2, r: 30, l: .6, m: .6, c: '255,150,60' }); burst(e.x, e.y - 2, LOW() ? 30 : 90, '#ff8a3a', 55, 1.1, 40, 1.4); burst(e.x, e.y - 2, 30, '#5a3418', 40, 1.2, 100, 1.2); scorch.push({ x: e.x, y: e.y, r: 12 });
        if (e.side === me() && B.st.chains[e.side] >= 2 && (!B.chainT || performance.now() - B.chainT > 2000)) { B.chainT = performance.now(); floats.push({ x: e.x, y: e.y - 12, t: tr('chain'), c: '#ff9a4a', l: 1.5, s: 1 }); } }
      else if (e.e === 'brk') { SFX.brk(e.k); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 7, BR[e.k][0], 24, .9, 90, 1); if (e.side === me()) B.shake = Math.max(B.shake, .25); else if (B.tutStep === 2) tut(3); }
      else if (e.e === 'fall') { const [x, y] = cellXY(st.castles[e.side], e.i); parts.push({ x, y, vx: (Math.random() - .5) * 8, vy: -Math.random() * 4, l: 1.6, m: 1.6, c: BR[e.k][e.i % 3], s: 2.6, g: 90, sq: 1 }); if (Math.random() < .3) G.noise(.25, 500, 120, .12, 1, .3); if (e.side !== me()) B.falls++;
        if (!B.fallT || performance.now() - B.fallT > 1500) { B.fallT = performance.now(); floats.push({ x, y: y - 6, t: tr('collapse'), c: '#ffd987', l: 1.4, s: .8 }); B.shake = Math.max(B.shake, .5); } }
      else if (e.e === 'core') { SFX.core(); const [x, y] = cellXY(st.castles[e.side], e.i); burst(x, y, 4, '#ffd36b', 26, .5, 20, .9); lights.push({ x, y, r: 12, l: .25, m: .25, c: '255,215,120' }); B.shake = Math.max(B.shake, .22);
        if (e.side === me()) G.buzz(30); else { if (B.tutStep === 2) tut(3); if (!B.hhT || performance.now() - B.hhT > 2500) { B.hhT = performance.now(); floats.push({ x, y: y - 9, t: tr('heartHit'), c: '#ffd36b', l: 1.4, s: .9 }); } } }
      else if (e.e === 'wind') toast('🌬 ' + windTxt());
      else if (e.e === 'win') onWin(e.winner);
    }
    st.ev.length = 0;
    const I = st.impact[me()]; if (I && I.vid !== B.seenImp) { B.seenImp = I.vid; if (I.hit === foe()) B.hits++; if (B.track && B.track.vid === I.vid) B.track.imp = { x: I.x, y: I.y, hit: I.hit }; B.focus = { v: vx(I.x), t: performance.now() + 1600 };
      if (B.mode === 'practice') { const E = st.castles[foe()], tx = E.x0 + (E.cc + 1) * C.CS, d = (tx - I.x) * (me() ? -1 : 1); $('wPracInfo').textContent = I.hit === foe() ? tr('onTarget') : d > 0 ? tr('shortBy', Math.round(d)) : tr('longBy', Math.round(-d)); } }
  }
  function tut(n) { if (!B.tutStep || n <= B.tutStep) return; B.tutStep = n; SFX.ready && SFX.ready(); if (n === 6) B.st.star[me()] = 1; if (n === 7) { hint(tr('tutDone')); M().onTutDone && M().onTutDone(); setTimeout(() => B && B.tutStep === 7 && hint(''), 3500); return; } hint(tr('tut' + n)); if (n === 4) selW('boulder'); }
  function onWin(w) {
    if (B.mode === 'net' && w !== me()) netSend({ t: 'dead' });
    if (B.mode === 'practice') { toast(tr('rebuilt')); collapseFx(foe()); setTimeout(() => { if (!B) return; B.st.castles[foe()] = C.buildCastle(foe(), (Math.random() * 1e9) >>> 0, 1); B.st.done = 0; B.st.winner = -1; B.hpPrev[foe()] = castleHP(B.st.castles[foe()]); }, 1600); return; }
    collapseFx(1 - w); B.endT = performance.now(); B.slow = .3; B.flash = 1; const won = w === me(); if (won) SFX.win(); else SFX.lose(); G.buzz([40, 60, 120]);
    setTimeout(() => { if (!B) return; const b = $('wBanner'); b.textContent = won ? tr('victory') : tr('defeat'); b.className = 'wbanner ' + (won ? 'win' : 'lose'); if (won && !LOW()) confetti(); }, 650);
  }
  function confetti() { const cols = ['#ffd36b', '#3fe0c5', '#ff7a3d', '#ff4d6d', '#bfa6ff']; const E = B.st.castles[foe()], x0 = E.x0 + 13; for (let i = 0; i < 120; i++) parts.push({ x: x0 + (Math.random() - .5) * 60, y: 30 + Math.random() * 20, vx: (Math.random() - .5) * 30, vy: Math.random() * 10, l: 2.6, m: 2.6, c: cols[i % 5], s: .9, g: 18, sq: 1 }); }
  function collapseFx(side) { const Cs = B.st.castles[side]; for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k) continue; const [x, y] = cellXY(Cs, i); parts.push({ x, y, vx: (Math.random() - .5) * 34, vy: -Math.random() * 34, l: 1.8 + Math.random(), m: 2.6, c: k === 9 ? '#ffd36b' : BR[k][i % 3], s: 2.6, g: 110, sq: 1 }); Cs.t[i] = 0; }
    const x = Cs.x0 + 14, y = Cs.y0 + 20; lights.push({ x, y, r: 40, l: .8, m: .8, c: '255,210,130' }); lights.push({ x, y, r: 6, l: .8, m: .8, ring: 1 }); B.shake = 1.4; blast(true); }
  function frame(dtr) {
    if (!B) return; const st = B.st, now = performance.now();
    const pre = now < B.localAt; if (pre && B.mode !== 'practice') { const n = Math.ceil((B.localAt - now) / 1000); if (n !== B.cdN) { B.cdN = n; $('wCd').textContent = n; SFX.beep(0); } }
    else if (!pre && !B.goSaid) { B.goSaid = 1; if (B.mode !== 'practice') { $('wCd').textContent = AR() ? 'اشتباك!' : 'FIGHT!'; SFX.beep(1); setTimeout(() => $('wCd').classList.add('hide'), 700); } }
    if (!pre) {
      let target = Math.floor((now - B.localAt) / (1000 / 60)); if (B.endT) target = st.tick + (Math.random() < B.slow ? 1 : 0);
      let n = 0; while (st.tick < target && n++ < (B.mode === 'net' ? 90 : 4)) { C.step(st); bot(); events(); if (!B) return; trackShot(); }
      if (B.mode !== 'net' && st.tick < target - 4) B.localAt = now - st.tick * (1000 / 60);
    }
    if (B.endT) B.slow = Math.min(1, B.slow + dtr * .35);
    const myC = st.castles[me()]; B.minHp = Math.min(B.minHp, myC.coreHp / myC.core0);
    if (B.rules.maxVolleys && B.volleys >= B.rules.maxVolleys && !B.endT && !st.R.some(p => p.o === me()) && !st.pending.some(p => p.o === me()) && now - (B.lastShotT || 0) > 2500 && st.winner < 0) { B.endT = now; st.done = 1; st.winner = foe(); SFX.lose(); const b = $('wBanner'); b.textContent = tr('defeat'); b.className = 'wbanner lose'; }
    const tc = TRAIL[(M().cos && M().cos().trail) || 'ember'];
    for (const p of st.R) if (Math.random() < (LOW() ? .2 : .4) && parts.length < 1600) { let c = p.f ? '255,140,80' : '120,105,115'; if (p.o === me() && !p.f && !p.big) c = tc ? tc[0] : hsl2rgb((now / 8 + p.x * 3) % 360); if (p.big === 2) c = '255,220,150'; parts.push({ x: p.x - p.vx * .02, y: p.y - p.vy * .02, vx: (Math.random() - .5) * 3, vy: -2 - Math.random() * 3, l: p.big === 2 ? 1.4 : .9, m: p.big === 2 ? 1.4 : .9, c, s: (p.big === 2 ? 5 : 1.3) + Math.min(2.5, Math.log2(1 + p.w)), g: -4, smoke: 1 }); }
    for (const p of parts) { p.vy += p.g * dtr; p.x += p.vx * dtr; p.y += p.vy * dtr; p.l -= dtr; if (p.smoke) p.s += dtr * 2.4; } for (let i = parts.length - 1; i >= 0; i--) if (parts[i].l <= 0) parts.splice(i, 1);
    for (const f of floats) { f.y -= 8 * dtr; f.l -= dtr; } for (let i = floats.length - 1; i >= 0; i--) if (floats[i].l <= 0) floats.splice(i, 1);
    for (const l of lights) { l.l -= dtr; if (l.ring) l.r += 70 * dtr; } for (let i = lights.length - 1; i >= 0; i--) if (lights[i].l <= 0) lights.splice(i, 1);
    for (const s of [0, 1]) { const h = castleHP(st.castles[s]); B.dmgAcc[s] += Math.max(0, B.hpPrev[s] - h); B.hpPrev[s] = h; }
    if (now - B.dmgT > 500) { B.dmgT = now; for (const s of [0, 1]) if (B.dmgAcc[s] >= 1) { const Cs = st.castles[s]; floats.push({ x: Cs.x0 + 13.5 + (Math.random() - .5) * 8, y: Cs.y0 - 4, t: '-' + Math.round(B.dmgAcc[s]), c: s === me() ? '#ff6f8a' : '#ffe08a', l: 1.1, s: .9 }); B.dmgAcc[s] = 0; } }
    weather(dtr); camera(dtr); B.shake = Math.max(0, B.shake - dtr * 2); B.flash = Math.max(0, B.flash - dtr * 1.6); B.recoil = Math.max(0, (B.recoil || 0) - dtr * 5); B.foeRecoil = Math.max(0, (B.foeRecoil || 0) - dtr * 5);
    if (B.botAimAt) B.foeArm += ((B.botAimAt.a || B.foeArm) - B.foeArm) * (1 - Math.exp(-6 * dtr));
    if (B.mode === 'net') netTick(now);
    if (B.endT && now - B.endT > 3000 && B.mode !== 'net') return finish(st.winner === me());
    draw(); drawMini(); hud();
  }
  function hsl2rgb(h) { const s = .8, l = .62, a = s * Math.min(l, 1 - l), f = n => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); }; return `${f(0)},${f(8)},${f(4)}`; }
  function trackShot() { const t = B.track; if (!t || t.imp || t.pts.length > 200 || B.st.tick % 3) return; const p = B.st.R.find(q => q.vid === t.vid && q.o === me()); if (p) t.pts.push([p.x, p.y]); }
  function bot() {
    if (B.mode !== 'bot' || B.st.done) return; const st = B.st, Bt = B.bot, r = B.botR;
    if (B.botAimAt && st.tick >= B.botAimAt.t) { const o = B.botAimAt; B.botAimAt = null; const ok = C.fire(st, { side: 1, a: o.a, p: o.p, w: o.w, s: (r() * 1e9) | 0, slow: Bt.slow }); if (ok && o.w !== 'dune' && o.w !== 'star' && !o.jar) C.remember(st, B.botMem, o.a, o.p); B.botNext = st.tick + Math.round(60 * (.9 + r() * .9) * Bt.slow); return; }
    if (B.botAimAt || st.tick < B.botNext) return;
    const act2 = C.botTurn(st, 1, Bt, B.botMem, r); if (!act2) { B.botNext = st.tick + 20; return; }
    B.botAimAt = Object.assign(act2, { t: st.tick + (act2.w === 'dune' || act2.w === 'star' ? 20 : Math.round(36 + r() * 30 * Bt.slow)) });
  }
  function weather(dt) {
    const mood = MOOD[B.st.M.wx] || MOOD.dusk, n = LOW() ? 0 : mood.fx === 'rain' ? 140 : mood.fx === 'fireflies' ? 26 : mood.fx === 'motes' ? 30 : mood.fx === 'birds' ? 5 : 0;
    while (wx.length < n) wx.push({ x: Math.random() * VW, y: Math.random() * VH, v: Math.random(), ph: Math.random() * 6 });
    const wind = B.st.wind * (B.side ? -1 : 1), T = performance.now();
    for (const p of wx) { if (mood.fx === 'rain') { p.y += (520 + p.v * 300) * dt; p.x += (wind * 18 + 60) * dt; if (p.y > VH) { p.y = -10; p.x = Math.random() * VW * 1.2 - VW * .1; } }
      else if (mood.fx === 'birds') { p.x += (30 + p.v * 20) * dt; p.y = VH * (.12 + p.v * .15) + Math.sin(p.ph + T / 600) * 6; if (p.x > VW + 20) p.x = -20; }
      else { p.x += (wind * 4 + Math.sin(p.ph + T / 900) * 8) * dt; p.y += Math.cos(p.ph + T / 1300) * 6 * dt; if (p.x > VW) p.x = 0; if (p.x < 0) p.x = VW; } }
    if (mood.fx === 'rain' && !LOW() && Math.random() < dt * .08) { B.lightning = 1; setTimeout(() => G.noise(1.8, 160, 40, .35, .6), 300 + Math.random() * 600); }
    B.lightning = Math.max(0, (B.lightning || 0) - dt * 3);
  }
  function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }
  function draw() {
    const st = B.st, T = performance.now() / 1000, mood = MOOD[st.M.wx] || MOOD.dusk; const key = st.M.wx + VW + 'x' + VH; if (BGkey !== key) { BG = paintBg(mood); BGkey = key; }
    cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.direction = 'ltr'; cx.drawImage(BG, 0, 0, VW, VH);
    if (B.shake && !G.RM()) cx.translate((Math.random() - .5) * B.shake * K * 2.5, (Math.random() - .5) * B.shake * K * 2.5);
    for (const [f, col, amp, base] of [[.18, mood.far, 26, .55], [.4, mood.near, 18, .74]]) { cx.fillStyle = col; cx.beginPath(); cx.moveTo(0, VH); const off = B.cam * K * f; for (let x = 0; x <= VW; x += 8) { const u = (x + off) / VW; cx.lineTo(x, SY(C.GY) - (C.GY * K * (1 - base)) + Math.sin(u * 7 + f * 9) * amp + Math.sin(u * 19) * amp * .3); } cx.lineTo(VW, VH); cx.fill(); }
    if (!mood.night && mood.fx !== 'rain') { cx.fillStyle = 'rgba(255,255,255,.16)'; for (let i = 0; i < 5; i++) { const x = ((G.hsh(i) * VW * 1.6 + T * (6 + i * 2) - B.cam * K * .1) % (VW * 1.6) + VW * 1.6) % (VW * 1.6) - VW * .3, y = SY(14 + i * 9); cx.beginPath(); cx.ellipse(x, y, 40 + i * 9, 7 + i, 0, 0, Math.PI * 2); cx.ellipse(x + 30, y - 4, 28, 8, 0, 0, Math.PI * 2); cx.fill(); } }
    if (mood.fx === 'rain') { cx.fillStyle = 'rgba(40,44,60,.55)'; for (let i = 0; i < 6; i++) { const x = ((G.hsh(i) * VW * 1.6 + T * 18 - B.cam * K * .1) % (VW * 1.6) + VW * 1.6) % (VW * 1.6) - VW * .3, y = SY(8 + i * 6); cx.beginPath(); cx.ellipse(x, y, 70 + i * 10, 14 + i, 0, 0, Math.PI * 2); cx.fill(); } }
    if (mood.fx === 'birds') { cx.strokeStyle = 'rgba(40,30,60,.6)'; cx.lineWidth = 1.5; for (const p of wx) { const f = Math.sin(T * 8 + p.ph) * 3; cx.beginPath(); cx.moveTo(p.x - 6, p.y - f); cx.lineTo(p.x, p.y); cx.lineTo(p.x + 6, p.y - f); cx.stroke(); } }
    const h = st.h, x0 = Math.max(0, Math.floor(B.side ? C.W - B.cam - viewW - 2 : B.cam - 2)), x1 = Math.min(C.W, Math.ceil(B.side ? C.W - B.cam + 2 : B.cam + viewW + 2));
    cx.save(); cx.beginPath(); cx.moveTo(SX(x0), SY(C.H + 40)); for (let x = x0; x <= x1; x++) cx.lineTo(SX(x), SY(h[x])); cx.lineTo(SX(x1), SY(C.H + 40)); cx.closePath();
    const gr = cx.createLinearGradient(0, SY(40), 0, SY(C.H)); gr.addColorStop(0, mood.rock[0]); gr.addColorStop(.4, mood.rock[1]); gr.addColorStop(1, mood.rock[2]); cx.fillStyle = gr; cx.fill(); cx.clip();
    if (!LOW()) for (let y = 40; y < C.H + 30; y += 5) { cx.fillStyle = (y / 5) % 2 ? 'rgba(255,230,190,.06)' : 'rgba(40,15,15,.08)'; cx.beginPath(); cx.moveTo(SX(x0), SY(y)); for (let x = x0; x <= x1; x += 4) cx.lineTo(SX(x), SY(y + Math.sin(x * .06 + y) * 1.4)); for (let x = x1; x >= x0; x -= 4) cx.lineTo(SX(x), SY(y + 2.6 + Math.sin(x * .06 + y) * 1.4)); cx.fill(); }
    for (const s of scorch) { const gx = cx.createRadialGradient(SX(s.x), SY(s.y), 0, SX(s.x), SY(s.y), s.r * K); gx.addColorStop(0, 'rgba(25,10,10,.55)'); gx.addColorStop(1, 'rgba(25,10,10,0)'); cx.fillStyle = gx; cx.fillRect(SX(s.x) - s.r * K, SY(s.y) - s.r * K, s.r * K * 2, s.r * K * 2); }
    cx.restore();
    cx.strokeStyle = mood.night ? 'rgba(190,200,255,.35)' : 'rgba(255,225,175,.6)'; cx.lineWidth = Math.max(1.5, K * .5); cx.beginPath(); for (let x = x0; x <= x1; x++) { const y = SY(h[x]); x === x0 ? cx.moveTo(SX(x), y) : cx.lineTo(SX(x), y); } cx.stroke();
    for (let x = x0 - x0 % 7; x <= x1; x += 7) if (h[x] > C.GY - 3 && G.hsh(x) < .5) { const bx = SX(x), by = SY(h[x]); cx.strokeStyle = 'rgba(60,40,20,.7)'; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(bx, by); cx.lineTo(bx - K * .6, by - K * 1.4); cx.moveTo(bx, by); cx.lineTo(bx + K * .5, by - K * 1.6); cx.stroke(); }
    if (B.place === 'dune') { const [a0, a1] = C.duneRange(me()), p0 = SX(a0), p1 = SX(a1), y = SY(C.GY - 26); cx.fillStyle = `rgba(230,184,120,${.18 + Math.sin(T * 5) * .06})`; cx.fillRect(Math.min(p0, p1), y, Math.abs(p1 - p0), SY(C.GY + 2) - y); cx.strokeStyle = 'rgba(255,220,160,.8)'; cx.setLineDash([K, K]); cx.strokeRect(Math.min(p0, p1), y, Math.abs(p1 - p0), SY(C.GY + 2) - y); cx.setLineDash([]); }
    for (const g of st.gates) { const x = SX(g.x), y = SY(g.y - g.h / 2), w = K * 8.5, hh = g.h * K, fl = g.flash, col = g.v >= 10 ? [255, 207, 107] : [63, 224, 197]; const gl = cx.createRadialGradient(x, y + hh / 2, 0, x, y + hh / 2, hh * .9); gl.addColorStop(0, `rgba(${col},${.25 + fl * .3})`); gl.addColorStop(1, `rgba(${col},0)`); cx.fillStyle = gl; cx.fillRect(x - hh, y - hh * .4, hh * 2, hh * 1.8);
      cx.fillStyle = `rgba(${col},${.22 + fl * .35})`; rr(x - w / 2, y, w, hh, K * 1.2); cx.fill(); cx.strokeStyle = `rgba(${col},.95)`; cx.lineWidth = K * (.45 + fl * .4); cx.stroke();
      cx.save(); cx.translate(x, y + hh / 2); cx.shadowColor = `rgb(${col})`; cx.shadowBlur = K * 3; cx.fillStyle = '#fff'; cx.font = `900 ${K * (g.v >= 10 ? 5.4 : 4.8)}px Tajawal,system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('×' + g.v, 0, 0); cx.restore();
      if (g.amp) { cx.fillStyle = `rgba(${col},.4)`; cx.fillRect(x - K * .2, SY(g.y0 - g.amp - g.h / 2), K * .4, (g.amp * 2 + g.h) * K); } }
    for (const j of st.jars) { if (!j.alive) continue; const x = SX(j.x), y = SY(j.y), s = K * 2.2; cx.fillStyle = '#7a3a1a'; cx.beginPath(); cx.ellipse(x, y - s * .9, s * .75, s * .95, 0, 0, Math.PI * 2); cx.fill(); cx.fillStyle = '#a85a2a'; cx.beginPath(); cx.ellipse(x - s * .2, y - s * 1.1, s * .3, s * .5, 0, 0, Math.PI * 2); cx.fill();
      cx.fillStyle = '#5a2a10'; cx.fillRect(x - s * .3, y - s * 2.1, s * .6, s * .35); cx.strokeStyle = '#e8c370'; cx.lineWidth = K * .25; cx.beginPath(); cx.moveTo(x - s * .7, y - s * .9); cx.lineTo(x + s * .7, y - s * .9); cx.stroke();
      if (j.fuse) { cx.fillStyle = `rgba(255,${120 + Math.random() * 100},40,.9)`; cx.beginPath(); cx.arc(x, y - s * 2.3, s * (.3 + Math.random() * .3), 0, Math.PI * 2); cx.fill(); } }
    for (const Cs of st.castles) drawCastle(Cs, T);
    if (B.ghost && !st.done) { cx.setLineDash([K, K * 1.4]); cx.strokeStyle = 'rgba(255,255,255,.3)'; cx.lineWidth = Math.max(1, K * .35); cx.beginPath(); B.ghost.pts.forEach(([x, y], i) => i ? cx.lineTo(SX(x), SY(y)) : cx.moveTo(SX(x), SY(y))); cx.stroke(); cx.setLineDash([]);
      if (B.ghost.imp) { const ix = SX(B.ghost.imp.x), iy = SY(B.ghost.imp.y), s = K * 1.6; cx.strokeStyle = 'rgba(255,255,255,.8)'; cx.lineWidth = K * .45; cx.beginPath(); cx.moveTo(ix - s, iy - s); cx.lineTo(ix + s, iy + s); cx.moveTo(ix + s, iy - s); cx.lineTo(ix - s, iy + s); cx.stroke(); } }
    if (B.starMark && performance.now() < B.starMark.until) { const x = SX(B.starMark.x), y = SY(st.h[Math.round(B.starMark.x)]), pr = 1 - (B.starMark.until - performance.now()) / (C.STAR_DELAY / 60 * 1000 + 200); cx.strokeStyle = B.starMark.side === me() ? 'rgba(255,224,138,.9)' : 'rgba(255,90,110,.9)'; cx.lineWidth = K * .5;
      for (const k of [1, .6]) { cx.beginPath(); cx.ellipse(x, y, K * 14 * k * (1.2 - pr * .4), K * 4 * k, 0, 0, Math.PI * 2); cx.stroke(); } cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y - K * 60 * pr); cx.stroke(); }
    const skin = SKIN[(M().cos && M().cos().skin) || 'bronze'] || SKIN.bronze;
    for (const s of [0, 1]) { const L = C.launcher(s), x = SX(L.x), y = SY(L.y), sz = K * 4.6, mine = s === me(); const ang = mine ? (B.aim ? B.aim.a : B.lastA || .7) : (B.mode === 'bot' ? B.foeArm : .7 + Math.sin(T + s) * .04), rec = (mine ? B.recoil : B.foeRecoil) || 0;
      cx.save(); cx.translate(x, y + sz * .15); cx.scale(mine ? 1 : -1, 1); cx.rotate(-ang); cx.translate(-rec * sz * .35, 0); const bar = cx.createLinearGradient(0, -sz * .25, 0, sz * .25); bar.addColorStop(0, mine ? skin[0] : '#e08060'); bar.addColorStop(1, mine ? skin[1] : '#8a3a28'); cx.fillStyle = bar; rr(-sz * .2, -sz * .25, sz * 1.8, sz * .5, sz * .22); cx.fill(); cx.fillStyle = '#2a1a10'; cx.fillRect(sz * 1.45, -sz * .3, sz * .15, sz * .6); cx.fillStyle = 'rgba(255,255,255,.25)'; cx.fillRect(0, -sz * .2, sz * 1.4, sz * .08); cx.restore();
      cx.fillStyle = '#4a2d18'; rr(x - sz * .9, y + sz * .2, sz * 1.8, sz * .5, sz * .2); cx.fill(); for (const e of [-.55, .55]) { cx.fillStyle = '#2a1a10'; cx.beginPath(); cx.arc(x + e * sz, y + sz * .85, sz * .34, 0, Math.PI * 2); cx.fill(); cx.strokeStyle = '#7a5530'; cx.lineWidth = K * .3; cx.beginPath(); cx.arc(x + e * sz, y + sz * .85, sz * .2, 0, Math.PI * 2); cx.stroke(); }
      cx.strokeStyle = `hsl(${B.hues[s]},80%,60%)`; cx.lineWidth = K * .45; cx.beginPath(); cx.arc(x, y + sz * .15, sz * .32, 0, Math.PI * 2); cx.stroke();
      if (!mine && B.botAimAt) { cx.font = `${K * 3}px system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(B.botAimAt.w === 'dune' ? '🏜️' : B.botAimAt.w === 'star' ? '🌠' : '🎯', x, y - sz * 1.5 + Math.sin(T * 8) * K * .4); } }
    if (B.aim && !st.done) { const full = B.mode === 'practice' && B.fullArc, tr2 = C.trace(st, me(), B.aim.a, B.aim.p, 6, full ? 999 : 14); tr2.pts.forEach(([x, y], i) => { cx.globalAlpha = full ? .8 : 1 - i / 16; cx.fillStyle = i % 2 ? 'rgba(255,240,200,.9)' : 'rgba(127,247,223,.9)'; cx.beginPath(); cx.arc(SX(x), SY(y), K * Math.max(.3, .75 - i * .03), 0, Math.PI * 2); cx.fill(); }); cx.globalAlpha = 1; }
    for (const p of parts) if (p.smoke) { cx.globalAlpha = Math.max(0, p.l / p.m) * .55; cx.fillStyle = `rgb(${p.c})`; cx.beginPath(); cx.arc(SX(p.x), SY(p.y), p.s * K * .5, 0, Math.PI * 2); cx.fill(); } cx.globalAlpha = 1;
    for (const p of st.R) { const x = SX(p.x), y = SY(p.y), ang = Math.atan2(p.vy, B.side ? -p.vx : p.vx), L = K * (p.big ? 3.2 : 2 + Math.min(1.6, Math.log2(1 + p.w) * .35));
      cx.save(); cx.translate(x, y);
      if (p.big === 2) { const g2 = cx.createRadialGradient(0, 0, 0, 0, 0, K * 9); g2.addColorStop(0, 'rgba(255,255,230,1)'); g2.addColorStop(.3, 'rgba(255,210,120,.9)'); g2.addColorStop(1, 'rgba(255,150,60,0)'); cx.globalCompositeOperation = 'lighter'; cx.fillStyle = g2; cx.beginPath(); cx.arc(0, 0, K * 9, 0, Math.PI * 2); cx.fill(); cx.rotate(ang); cx.fillStyle = 'rgba(255,200,120,.5)'; cx.beginPath(); cx.ellipse(-K * 14, 0, K * 16, K * 3, 0, 0, Math.PI * 2); cx.fill(); cx.globalCompositeOperation = 'source-over'; }
      else if (p.big) { cx.rotate(p.roll ? p.x / 2 * (B.side ? -1 : 1) : T * 6); cx.fillStyle = '#6e5f5a'; cx.beginPath(); for (let a = 0; a < 9; a++) { const an = a / 9 * Math.PI * 2, r2 = L * (.8 + G.hsh(a) * .25); cx.lineTo(Math.cos(an) * r2, Math.sin(an) * r2); } cx.fill(); cx.fillStyle = 'rgba(255,255,255,.15)'; cx.beginPath(); cx.arc(-L * .25, -L * .25, L * .35, 0, Math.PI * 2); cx.fill(); cx.strokeStyle = 'rgba(30,20,20,.5)'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(-L * .5, 0); cx.lineTo(L * .4, L * .2); cx.stroke(); }
      else { cx.rotate(ang); const tc2 = p.o === me() && !p.f && TRAIL[(M().cos && M().cos().trail) || 'ember']; cx.globalCompositeOperation = 'lighter'; cx.fillStyle = p.f ? 'rgba(255,110,40,.6)' : tc2 ? `rgba(${tc2[1]},.55)` : 'rgba(255,190,110,.5)'; cx.beginPath(); cx.ellipse(-L * 1.25, 0, L * (.6 + Math.random() * .3), L * .22, 0, 0, Math.PI * 2); cx.fill(); cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = '#e8e2d8'; rr(-L, -L * .15, L * 1.5, L * .3, L * .14); cx.fill(); cx.fillStyle = p.o === me() ? '#3fe0c5' : '#ff4d6d'; cx.beginPath(); cx.moveTo(L * .45, -L * .17); cx.quadraticCurveTo(L * 1.05, 0, L * .45, L * .17); cx.fill();
        cx.fillStyle = '#8a8378'; cx.beginPath(); cx.moveTo(-L * .95, -L * .15); cx.lineTo(-L * 1.2, -L * .38); cx.lineTo(-L * .7, -L * .15); cx.moveTo(-L * .95, L * .15); cx.lineTo(-L * 1.2, L * .38); cx.lineTo(-L * .7, L * .15); cx.fill(); }
      cx.restore(); }
    for (const p of parts) { if (p.smoke) continue; cx.globalAlpha = Math.min(1, Math.max(0, p.l / p.m) * 1.5); cx.fillStyle = p.c; const s = p.s * K; if (p.sq) { cx.save(); cx.translate(SX(p.x), SY(p.y)); cx.rotate(p.l * 3); cx.fillRect(-s / 2, -s / 2, s, s); cx.restore(); } else cx.fillRect(SX(p.x) - s / 2, SY(p.y) - s / 2, s, s); } cx.globalAlpha = 1;
    cx.globalCompositeOperation = 'lighter'; for (const l of lights) { const a = Math.max(0, l.l / l.m); if (l.ring) { cx.strokeStyle = `rgba(255,240,210,${a * .7})`; cx.lineWidth = K * 1.2 * a; cx.beginPath(); cx.arc(SX(l.x), SY(l.y), l.r * K, 0, Math.PI * 2); cx.stroke(); continue; }
      const g2 = cx.createRadialGradient(SX(l.x), SY(l.y), 0, SX(l.x), SY(l.y), l.r * K); g2.addColorStop(0, `rgba(${l.c},${.75 * a})`); g2.addColorStop(1, `rgba(${l.c},0)`); cx.fillStyle = g2; cx.fillRect(SX(l.x) - l.r * K, SY(l.y) - l.r * K, l.r * K * 2, l.r * K * 2); } cx.globalCompositeOperation = 'source-over';
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; for (const f of floats) { cx.globalAlpha = Math.min(1, f.l * 2); cx.font = `900 ${K * 4.6 * f.s}px Tajawal,system-ui`; cx.lineWidth = K * .8; cx.strokeStyle = 'rgba(20,10,30,.85)'; cx.strokeText(f.t, SX(f.x), SY(f.y)); cx.fillStyle = f.c; cx.fillText(f.t, SX(f.x), SY(f.y)); } cx.globalAlpha = 1;
    const ef = st.castles[foe()], ex = SX(ef.x0 + ef.cols * C.CS / 2); if (ex > VW) { cx.fillStyle = 'rgba(255,77,109,.85)'; cx.beginPath(); const ay = SY(C.GY - 18); cx.moveTo(VW - 8, ay); cx.lineTo(VW - 22, ay - 10); cx.lineTo(VW - 22, ay + 10); cx.fill(); }
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (mood.fx === 'rain') { cx.strokeStyle = 'rgba(190,200,230,.35)'; cx.lineWidth = 1; cx.beginPath(); const wv = B.st.wind * (B.side ? -1 : 1); for (const p of wx) { cx.moveTo(p.x, p.y); cx.lineTo(p.x - (wv * 1.4 + 4), p.y - 14); } cx.stroke(); if (B.lightning) { cx.fillStyle = `rgba(220,230,255,${B.lightning * .35})`; cx.fillRect(0, 0, VW, VH); } }
    else if (mood.fx === 'fireflies' || mood.fx === 'motes') { for (const p of wx) { const a = mood.fx === 'fireflies' ? .4 + Math.sin(T * 3 + p.ph) * .4 : .25; cx.fillStyle = mood.fx === 'fireflies' ? `rgba(200,255,150,${a})` : `rgba(255,230,190,${a})`; cx.beginPath(); cx.arc(p.x, p.y, mood.fx === 'fireflies' ? 1.8 : 1.2, 0, Math.PI * 2); cx.fill(); } }
    else if (mood.fx === 'haze' && !LOW()) { cx.fillStyle = 'rgba(255,240,210,.05)'; for (let i = 0; i < 4; i++) { const y = GSY - 20 - i * 6 + Math.sin(T * 2 + i) * 2; cx.fillRect(0, y, VW, 2); } }
    if (mood.night) { const vg = cx.createRadialGradient(VW / 2, VH * .55, VH * .2, VW / 2, VH * .55, VH * .8); vg.addColorStop(0, 'rgba(0,0,20,0)'); vg.addColorStop(1, 'rgba(0,0,20,.45)'); cx.fillStyle = vg; cx.fillRect(0, 0, VW, VH); }
    if (B.endT && st.winner !== me()) { cx.fillStyle = `rgba(20,10,30,${Math.min(.45, (performance.now() - B.endT) / 3000)})`; cx.fillRect(0, 0, VW, VH); }
    if (B.flash) { cx.fillStyle = `rgba(255,235,190,${B.flash * .4})`; cx.fillRect(0, 0, VW, VH); }
  }
  function drawCastle(Cs, T) {
    const cs = C.CS * K, mir = B.side === 1, cellX = c => mir ? SX(Cs.x0 + (c + 1) * C.CS) : SX(Cs.x0 + c * C.CS), night = MOOD[B.st.M.wx] && MOOD[B.st.M.wx].night;
    for (let i = 0; i < Cs.t.length; i++) { const k = Cs.t[i]; if (!k || k === 9) continue; const c = i % Cs.cols, r = (i / Cs.cols) | 0, x = cellX(c), y = SY(Cs.y0 + r * C.CS), pal = BR[k];
      cx.fillStyle = pal[(c * 7 + r * 3) % 3]; cx.fillRect(x, y, cs + .5, cs + .5); cx.fillStyle = 'rgba(255,240,210,.18)'; cx.fillRect(x, y, cs, cs * .14); cx.fillStyle = 'rgba(40,15,10,.25)'; cx.fillRect(x, y + cs * .86, cs, cs * .14); cx.fillRect(x + cs * .92, y, cs * .08, cs);
      if (k === 1 && (c + r * 2) % 5 === 0) { cx.fillStyle = 'rgba(90,50,25,.35)'; cx.fillRect(x + cs * .2, y + cs * .45, cs * .5, cs * .08); }
      if ((r === 2 || r === 5) && (c === 1 || c === 7 || c === 4)) { cx.fillStyle = 'rgba(20,10,20,.75)'; rr(x + cs * .35, y + cs * .18, cs * .3, cs * .6, cs * .14); cx.fill(); if (night) { cx.fillStyle = 'rgba(255,200,110,.6)'; rr(x + cs * .38, y + cs * .24, cs * .24, cs * .45, cs * .1); cx.fill(); } }
      const hp0 = k === 1 ? 18 : 48; if (Cs.hp[i] < hp0 * .55) { cx.strokeStyle = 'rgba(30,10,10,.65)'; cx.lineWidth = Math.max(1, K * .22); cx.beginPath(); cx.moveTo(x + cs * .2, y + cs * .25); cx.lineTo(x + cs * .5, y + cs * .55); cx.lineTo(x + cs * .38, y + cs * .85); cx.stroke(); }
      if (r === 0 || !Cs.t[i - Cs.cols]) { cx.fillStyle = pal[0]; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + cs / 2, y - cs * .55); cx.lineTo(x + cs, y); cx.fill(); } }
    const gc = Cs.side ? 6 : 2, gi = (Cs.rows - 1) * Cs.cols + gc; if (Cs.t[gi] && Cs.t[gi - Cs.cols]) { const x = cellX(gc), y = SY(Cs.y0 + (Cs.rows - 2) * C.CS); cx.fillStyle = '#5a3418'; rr(x + cs * .1, y + cs * .3, cs * .8, cs * 1.7, cs * .4); cx.fill(); cx.strokeStyle = '#2a170a'; cx.lineWidth = K * .25; cx.beginPath(); cx.moveTo(x + cs * .5, y + cs * .4); cx.lineTo(x + cs * .5, y + cs * 2); cx.stroke(); }
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
    for (const j of st.jars) if (j.alive) { mx.fillStyle = '#ff8a3a'; mx.beginPath(); mx.arc(sx(j.x), sy(j.y) - 2 * DPR, 2 * DPR, 0, Math.PI * 2); mx.fill(); }
    for (const p of st.R) { mx.fillStyle = p.o === me() ? '#bffff2' : '#ffb0be'; mx.fillRect(sx(p.x) - DPR, sy(p.y) - DPR, 2 * DPR, 2 * DPR); }
    if (viewW < C.W) { mx.strokeStyle = 'rgba(255,255,255,.7)'; mx.lineWidth = DPR; mx.strokeRect(B.cam / C.W * w, 1, viewW / C.W * w, h - 2); }
  }
  let hudT = 0;
  const windTxt = () => { const wv = B.st.wind * (B.side ? -1 : 1); return Math.abs(wv) < .5 ? '0' : (wv > 0 ? '→ ' : '← ') + Math.abs(wv).toFixed(1); };
  function hud(force) {
    const now = performance.now(); if (!force && now - hudT < 70) return; hudT = now; const st = B.st;
    for (const [s, el] of [[me(), 0], [foe(), 1]]) { const Cs = st.castles[s], f = Math.max(0, Cs.coreHp / Cs.core0); $('wH' + el).style.width = (f * 100).toFixed(1) + '%'; $('wP' + el).textContent = Math.ceil(f * 100) + '%'; }
    $('wWind').textContent = '🌬 ' + (st.windMax ? windTxt() : '0');
    document.querySelectorAll('#wWeps button').forEach(b => { const wk = b.dataset.w; let left = 0, full = 1;
      if (wk === 'star') { left = 1 - st.star[me()]; b.classList.toggle('full', st.star[me()] >= 1); }
      else { const key = me() * 4 + C.ACTS.indexOf(wk); left = Math.max(0, (st.cd[key] || 0) - st.tick); full = wk === 'dune' ? 90 : C.WPN[wk].cd * 60; if (wk === 'dune') { b.querySelector('b').textContent = st.sand[me()]; if (!st.sand[me()]) left = full; } }
      b.querySelector('u').style.height = (Math.min(1, left / full) * 100).toFixed(0) + '%'; b.classList.toggle('ready', !left); });
    if (B.aim) { $('wAim').classList.remove('hide'); $('wAim').textContent = `∠ ${Math.round(B.aim.a * 180 / Math.PI)}°   ⚡ ${Math.round(B.aim.p * 100)}%`; }
    else if (B.rules.maxVolleys) { $('wAim').classList.remove('hide'); $('wAim').textContent = tr('volleysLeft', Math.max(0, B.rules.maxVolleys - B.volleys)); }
    else $('wAim').classList.add('hide');
    let inc = false; for (const p of st.R) if (p.o === foe() && vx(p.x) < 150 && p.vy > 0) inc = true; if (inc && !B.incT) { B.incT = now; toast(tr('incoming')); G.tone(880, .12, 'square', .04); G.tone(660, .12, 'square', .04, 1, .14); } if (!inc && B.incT && now - B.incT > 3000) B.incT = 0;
  }
  let toastT = 0; function toast(t) { const e = $('wToast'); e.textContent = t; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 1600); }
  function selW(w) {
    if (!B) return; if (B.rules.only && !B.rules.only.includes(w)) { toast(tr('onlyW', B.rules.only.map(x => tr('w' + x[0].toUpperCase() + x.slice(1))).join(AR() ? '، ' : ', '))); return; }
    if (w === 'dune') { if (B.st.sand[me()] < 1) { toast(tr('noSand')); return; } B.place = B.place === 'dune' ? null : 'dune'; hint(B.place ? tr('placeDune') : ''); }
    else if (w === 'star') { if (B.st.star[me()] < 1) { toast(tr('starNotReady')); return; } B.place = B.place === 'star' ? null : 'star'; hint(B.place ? tr('placeStar') : ''); }
    else { B.wsel = w; B.place = null; if (B.tutStep && B.tutStep < 7) hint(tr('tut' + B.tutStep)); else hint(''); }
    document.querySelectorAll('#wWeps button').forEach(b => b.classList.toggle('sel', b.dataset.w === (B.place || B.wsel)));
  }
  document.querySelectorAll('#wWeps button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); G.SFX.click(); selW(b.dataset.w); }));
  $('wMenu').onclick = () => G.toMenu(); $('wMute').onclick = () => { G.audio(); G.setMute(!G.MUTE); };
  $('wArc').onclick = () => { if (B) { B.fullArc = !B.fullArc; $('wArc').classList.toggle('on', B.fullArc); } };
  let drag = null, lastTick = 0;
  cv.addEventListener('pointerdown', e => { if (!B || B.st.done || performance.now() < B.localAt) return; G.audio();
    if (B.place) { place(worldX(e.clientX)); return; }
    drag = { x: e.clientX, y: e.clientY }; try { cv.setPointerCapture(e.pointerId); } catch (x) { } }, true);
  cv.addEventListener('pointermove', e => { if (!B || !drag) return; const px = drag.x - e.clientX, py = e.clientY - drag.y, d = Math.hypot(px, py); if (d < 10) { B.aim = null; return; }
    const a = Math.max(3, Math.min(87, Math.atan2(py, Math.max(.001, px)) * 180 / Math.PI)) * Math.PI / 180, p = Math.min(1, d / (Math.min(VW, VH) * .42)); B.aim = { a, p };
    const tk = Math.round(p * 20) + Math.round(a * 30) * 100; if (tk !== lastTick) { lastTick = tk; G.tone(300 + p * 500, .03, 'triangle', .02); } }, true);
  function release() { if (!B || !drag) return; drag = null; const aim = B.aim; B.aim = null; if (!aim) return; B.lastA = aim.a; shoot(aim.a, aim.p, B.wsel); }
  cv.addEventListener('pointerup', release, true); cv.addEventListener('pointercancel', () => { drag = null; if (B) B.aim = null; }, true);
  function place(x) {
    const w = B.place;
    if (w === 'dune') { const [a0, a1] = C.duneRange(me()); if (x < Math.min(a0, a1) - 6 || x > Math.max(a0, a1) + 6) { toast(tr('placeDune')); return; } act('dune', 0, Math.max(0, Math.min(1, (x - a0) / (a1 - a0)))); }
    else if (w === 'star') act('star', 0, Math.max(0, Math.min(1, x / C.W)));
    B.place = null; selW(B.wsel);
  }
  function act(w, a, p) { const st = B.st, s = (Math.random() * 4e9) >>> 0, k = st.tick + (B.mode === 'net' ? 8 : 1); if (!C.fire(st, { side: me(), a, p, w, s, k })) { toast(w === 'dune' ? tr('noSand') : tr('reload')); return false; } if (B.mode === 'net') netSend({ t: 'fire', k, a: +a.toFixed(4), p: +p.toFixed(4), w, s }); B.used[w] = 1; events(); M().onAct && M().onAct(w); return true; }
  function shoot(a, p, wk) {
    const st = B.st; if (B.rules.maxVolleys && B.volleys >= B.rules.maxVolleys) return;
    if (!C.ready(st, me(), wk)) { const alt = ['swarm', 'fire', 'boulder'].filter(k => !B.rules.only || B.rules.only.includes(k)).find(k => C.ready(st, me(), k)); if (!alt) { toast(tr('reload')); return; } wk = alt; selW(alt); }
    if (act(wk, a, p)) { B.lastShotT = performance.now(); if (B.tutStep === 1) tut(2); if (wk !== 'swarm' && C.ready(st, me(), 'swarm') && (!B.rules.only || B.rules.only.includes('swarm'))) setTimeout(() => B && (!B.tutStep || B.tutStep > 4) && selW('swarm'), 200); }
  }
  addEventListener('keydown', e => { if (!B) return; const m = { 1: 'swarm', 2: 'fire', 3: 'boulder', 4: 'dune', 5: 'star' }[e.key]; if (m) selW(m); else if (e.key === 'Escape') { if (B.place) { B.place = null; hint(''); selW(B.wsel); } else G.toMenu(); } });
  const statsOf = () => { const st = B.st; return { peak: Math.round(st.peak[me()]), dmg: Math.round(st.dealt[me()]), secs: Math.round((performance.now() - B.localAt) / 1000), acc: B.volleys ? Math.round(B.hits / B.volleys * 100) : 0, volleys: B.volleys, gates: st.gatesHit[me()], chains: st.chains[me()], stars: st.stars[me()], starHit: B.starHit, dunes: st.dunes[me()], thuds: B.thuds, falls: B.falls, minHp: B.minHp, used: Object.keys(B.used), heart: st.castles[me()].coreHp / st.castles[me()].core0, foeHeart: st.castles[foe()].coreHp / st.castles[foe()].core0, map: st.map }; };
  function finish(won) { const S = statsOf(), o = { mode: B.mode, kind: B.kind, botIdx: B.botIdx, wave: B.wave, challenge: B.challenge, diff: B.diff, map: B.st.map }; leave(); if (M().result) M().result(Object.assign(o, { won, stats: S })); else G.toMenu(); }
  const NET = { ws: null, me: null, code: null, room: null, ranked: 0 };
  const link = code => location.origin + location.pathname.replace(/[^/]*$/, '') + '?w=' + code;
  const netSend = m => { if (NET.ws && NET.ws.readyState === 1) NET.ws.send(JSON.stringify(m)); };
  function connect(code, opt) {
    opt = opt || {}; if (NET.ws) try { NET.ws.close(); } catch (e) { } G.audio(); NET.ranked = opt.ranked ? 1 : 0; NET.last = null; NET.room = null;
    if (!NET.ranked) { G.show('wlobby'); $('wCode').textContent = code || '·····'; $('wWait').textContent = tr('connecting'); $('wPlayers').innerHTML = ''; }
    const nm2 = G.NAME || (AR() ? 'رامي' : 'Archer'); const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/sh/ws?m=war&t=' + G.TOK + '&n=' + encodeURIComponent(nm2) + '&h=' + G.HUE + '&lv=1' + (code ? '&r=' + code : ''));
    NET.ws = ws; ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } onNet(m); }; ws.onclose = () => { if (NET.ws === ws) NET.ws = null; };
  }
  const keepWs = fn => { const ws = NET.ws; NET.ws = null; fn(); NET.ws = ws; };
  function onNet(m) {
    if (m.t === 'hello') { NET.me = m.me; NET.code = m.code; if (!NET.ranked) { history.replaceState(null, '', '?w=' + m.code); $('wCode').textContent = m.code; } return; }
    if (m.t === 'err') { G.toast(tr(m.e) !== m.e ? tr(m.e) : (AR() ? 'تعذّر الاتصال' : 'Could not connect')); setTimeout(() => G.toMenu(), 1400); return; }
    if (m.t === 'room') { const prev = NET.room; NET.room = m;
      if (m.state === 'duel' && (!B || (prev && prev.at !== m.at))) { const side = m.sides[NET.me]; if (side == null) return; const pl = s => m.players.find(p => m.sides[p.id] === s) || { n: '?', h: 0 };
        if (B) keepWs(leave); start({ mode: 'net', kind: NET.ranked ? 'ranked' : 'friends', map: (m.lv - 1) % C.MAPS.length, seed: m.seed, side, names: side ? [pl(1).n, pl(0).n] : [pl(0).n, pl(1).n], hues: [pl(0).h, pl(1).h], localAt: performance.now() + (m.at - m.now) }); return; }
      if (m.state === 'lobby' && !NET.ranked) { if (B) keepWs(leave); lobby(); } return; }
    if (!B) { if (m.t === 'res') results(m); return; }
    if (m.t === 'fire') { const st = B.st; C.fire(st, { side: m.side, a: m.a, p: m.p, w: m.w, s: m.s, k: Math.max(m.k, st.tick + 1) }); return; }
    if (m.t === 'cs') { if (m.side !== me()) C.applyCastle(B.st, B.st.castles[m.side], m.pk); events(); return; }
    if (m.t === 'emo') { const pl = NET.room && NET.room.players.find(p => p.id === m.id), d = document.createElement('div'); d.innerHTML = m.e + '<small>' + G.esc(pl ? pl.n : '') + '</small>'; d.style.left = (15 + Math.random() * 70) + '%'; $('wEmof').appendChild(d); setTimeout(() => d.remove(), 2500); return; }
    if (m.t === 'res') { const mine = m.res.find(x => x.id === NET.me), won = !!(mine && mine.time); if (!B.endT) { collapseFx(won ? foe() : me()); B.endT = performance.now(); won ? SFX.win() : SFX.lose(); const b = $('wBanner'); b.textContent = won ? tr('victory') : tr('defeat'); b.className = 'wbanner ' + (won ? 'win' : 'lose'); }
      setTimeout(() => { if (B) { NET.last = statsOf(); keepWs(leave); } results(m); }, 2600); }
  }
  function netTick(now) { if (now - B.lastCs < 300 || now < B.localAt) return; B.lastCs = now; const Cs = B.st.castles[me()]; netSend({ t: 'cs', pk: C.packCastle(Cs), f: +(Cs.coreHp / Cs.core0).toFixed(3) }); }
  function lobby() { const r = NET.room; if (!r) return; G.show('wlobby'); const host = r.host === NET.me, hn = (r.players.find(p => p.id === r.host) || {}).n || '', Mp = C.MAPS[(r.lv - 1) % C.MAPS.length];
    $('wCode').textContent = r.code; $('wPlayers').innerHTML = r.players.map(p => `<li class="${p.id === NET.me ? 'mine' : ''}"><i style="background:hsl(${p.h},80%,60%)"></i>${G.esc(p.n)}${p.id === NET.me ? ' (' + tr('you') + ')' : ''}${p.id === r.host ? ' 👑' : ''}<b>${p.on ? '●' : '○'}</b></li>`).join('');
    $('wMap').innerHTML = `⛰️ ${tr('mapN', G.esc(nm(Mp)))}<small>${tr('fair')}</small>`; $('wPrev').disabled = $('wNext').disabled = !host; const two = r.players.filter(p => p.on).length >= 2;
    $('wStart').classList.toggle('hide', !host); $('wStart').disabled = !two; $('wStart').style.opacity = two ? 1 : .5; $('wWait').textContent = !two ? tr('need2') : host ? tr('youHost') : tr('waitHost', hn); }
  function results(m) { const res = m.res, mine = res.find(x => x.id === NET.me), won = !!(mine && mine.time), foeP = res.find(x => x.id !== NET.me), S = NET.last || { peak: 0, dmg: 0, secs: 0, acc: 0, volleys: 0, gates: 0, chains: 0, stars: 0, dunes: 0, thuds: 0, falls: 0, minHp: 1, used: [] };
    if (M().result) M().result({ mode: 'net', kind: NET.ranked ? 'ranked' : 'friends', won, stats: S, foeName: foeP ? foeP.n : '', delta: m.delta && m.delta[NET.me], host: NET.room && NET.room.host === NET.me, rematch: () => netSend({ t: 'again' }) }); }
  $('wPrev').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv > 1 ? r.lv - 1 : C.MAPS.length }); }; $('wNext').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv < C.MAPS.length ? r.lv + 1 : 1 }); };
  $('wStart').onclick = () => netSend({ t: 'go' }); $('wLeave').onclick = () => G.toMenu();
  const inviteText = () => (AR() ? 'تحدَّني في شُهُب! من يهدم قلعة الآخر أولاً؟ غرفتي ' : 'Challenge me in SHUHUB! Who breaks the other fort first? Room ') + (NET.code || '') + ':';
  $('wWa').onclick = () => window.open('https://wa.me/?text=' + encodeURIComponent(inviteText() + ' ' + link(NET.code)), '_blank');
  $('wShare').onclick = async () => { try { if (navigator.share) { await navigator.share({ title: 'شُهُب', text: inviteText(), url: link(NET.code) }); return; } } catch (e) { return; } try { await navigator.clipboard.writeText(inviteText() + ' ' + link(NET.code)); G.toast(tr('copied')); } catch (e) { } };
  $('wCopy').onclick = async () => { try { await navigator.clipboard.writeText(link(NET.code)); G.toast(tr('copied')); } catch (e) { prompt('', link(NET.code)); } };
  document.querySelectorAll('#wEmo button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); netSend({ t: 'emo', e: b.textContent }); }));
  addEventListener('resize', resize); resize();
  const qw = new URLSearchParams(location.search).get('w'); if (qw) setTimeout(() => connect(qw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5)), 80); // opened from a friend's invite link
  window.SHW_DEBUG = { C, b: () => B, NET, shoot, selW, act, place, start, connect, tut: n => tut(n) };
})();
