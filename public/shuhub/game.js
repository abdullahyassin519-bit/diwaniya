/* شُهُب — SHUHUB client: drawing, input, sound, screens, workshop and duels. The rules live in core.js (window.SHC). */
(() => {
  'use strict';
  const C = window.SHC, $ = id => document.getElementById(id);
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* ---------------- words ---------------- */
  const TXT = {
    ar: { sub: 'أطلق الشهب. ضاعفها. اهدم القلعة.', play: 'العب', duel: 'تحدَّ أصحابك', duelS: 'أرسل رابطاً · من يهدم قلعته أولاً يفوز', levels: 'المراحل', shop: 'الورشة', back: 'رجوع', go: 'ابدأ الحصار',
      won: 'سقطت القلعة!', peak: 'أكبر سرب', bricks: 'طوب', coins: 'دنانير', next: 'المرحلة التالية', retry: 'أعد', lost: 'نفدت الشهب', heartLeft: 'بقي من القلب', heart: 'قلب القلعة',
      lobby: 'غرفة التحدي', lobbyS: 'أرسل الرابط لأصحابك (حتى 4). كلٌّ يحاصر نسخته من القلعة، وكل طوبة تهدمها تُعيد بناء طوب في قلاع خصومك. من يكسر القلب أولاً يفوز.', invite: 'ادعُ', copy: 'انسخ', start: 'ابدأ التحدي', leave: 'غادر', again: 'جولة أخرى',
      playSub: 'المرحلة {0} · ★ {1}/45', shopSub: '{0} دينار', lvHead: '★ {0}/45 · {1} دينار', lvl: 'المرحلة {0}', locked: 'مقفلة', info: '☄ {0} شهاب · {1} حارس', hold: '👆 اضغط مطوّلاً واسحب لتصوّب',
      firstWin: 'فتحت المرحلة {0}!', bestStars: 'نجوم أكثر من قبل!', loseTip: 'جرّب ممراً آخر، أو طوّر مدفعك في الورشة.', heartBroken: 'انكسر القلب!', guardDown: 'سقط الحارس!', falconReady: 'الصقر جاهز! 🦅',
      buy: 'شراء', max: 'الحد الأقصى', u_rate: 'سرعة الإطلاق', u_rateD: '+15% شهب في الثانية', u_twin: 'مدفع مزدوج', u_twinD: 'كل طلقة تخرج شهابين', u_power: 'قوة الشهاب', u_powerD: '+25% ضرر على الطوب', u_ammo: 'جعبة أكبر', u_ammoD: '+10% شهب لكل مرحلة', u_falcon: 'الصقر', u_falconD: 'يمتلئ أسرع بـ25%',
      connecting: 'جارٍ الاتصال…', youHost: 'أنت المضيف 👑: اختر المرحلة وابدأ.', waitHost: 'بانتظار {0} ليبدأ…', noroom: 'هذا التحدي لم يعد موجوداً', full: 'الغرفة ممتلئة', busy: 'التحدي بدأ بالفعل — انتظر الجولة القادمة', you: 'أنت',
      youWin: 'فزت! 🏆', place: 'المركز {0}', wonBy: '{0} هدم قلعته أولاً', draw: 'لم يكسر أحد القلب', repaired: '🧱 {0} رمّم قلعتك', outWait: 'نفدت شهبك — بانتظار الباقين', inviteText: 'تحدَّني في شُهُب! من يهدم القلعة أولاً؟ غرفتي {0}:', copied: 'نُسخ الرابط', fair: 'التحدي عادل: الجميع بمدفع الورشة الأساسي.', heartPct: 'القلب {0}%' },
    en: { sub: 'Fire the meteors. Multiply them. Break the fort.', play: 'Play', duel: 'Challenge friends', duelS: 'send a link · first to break their fort wins', levels: 'Levels', shop: 'Workshop', back: 'Back', go: 'Start the siege',
      won: 'The fort fell!', peak: 'biggest swarm', bricks: 'bricks', coins: 'dinars', next: 'Next level', retry: 'Retry', lost: 'Out of meteors', heartLeft: 'heart left', heart: 'Fort heart',
      lobby: 'Challenge room', lobbyS: 'Send the link to up to 4 friends. Everyone sieges their own copy of the fort — every brick you break rebuilds bricks in your rivals\' forts. First to break the heart wins.', invite: 'Invite', copy: 'Copy', start: 'Start', leave: 'Leave', again: 'Rematch',
      playSub: 'Level {0} · ★ {1}/45', shopSub: '{0} dinars', lvHead: '★ {0}/45 · {1} dinars', lvl: 'Level {0}', locked: 'locked', info: '☄ {0} meteors · {1} guards', hold: '👆 Hold and slide to aim',
      firstWin: 'Level {0} unlocked!', bestStars: 'More stars than before!', loseTip: 'Try another lane, or upgrade your launcher in the workshop.', heartBroken: 'Heart broken!', guardDown: 'Guard down!', falconReady: 'Falcon ready! 🦅',
      buy: 'Buy', max: 'MAX', u_rate: 'Fire rate', u_rateD: '+15% meteors per second', u_twin: 'Twin launcher', u_twinD: 'every shot fires two meteors', u_power: 'Meteor power', u_powerD: '+25% damage to bricks', u_ammo: 'Bigger quiver', u_ammoD: '+10% meteors per level', u_falcon: 'Falcon', u_falconD: 'charges 25% faster',
      connecting: 'Connecting…', youHost: 'You host 👑: pick a level and start.', waitHost: 'Waiting for {0} to start…', noroom: 'That challenge no longer exists', full: 'The room is full', busy: 'That duel already started — wait for the next round', you: 'you',
      youWin: 'You win! 🏆', place: 'Place {0}', wonBy: '{0} broke their fort first', draw: 'Nobody broke the heart', repaired: '🧱 {0} rebuilt your fort', outWait: 'Out of meteors — waiting for the others', inviteText: 'Challenge me in SHUHUB! Who breaks the fort first? Room {0}:', copied: 'Link copied', fair: 'Fair duel: everyone uses the base launcher.', heartPct: 'heart {0}%' },
  };
  let LANG = LS.get('sh_lang', (navigator.language || '').startsWith('ar') ? 'ar' : 'ar');
  const tr = (k, ...a) => String((TXT[LANG] || TXT.ar)[k] ?? TXT.en[k] ?? k).replace(/\{(\d)\}/g, (_, i) => a[i]);
  const AR = () => LANG === 'ar', N = L => L.n[AR() ? 0 : 1];
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? (n / 1e3).toFixed(1) + 'K' : String(Math.round(n));
  /* ---------------- player ---------------- */
  const PG = Object.assign({ un: 1, st: {}, coins: 0, up: {}, wins: 0 }, LS.get('sh_prog', {})); PG.up = PG.up || {}; PG.st = PG.st || {};
  const saveP = () => LS.set('sh_prog', PG), starsTotal = () => Object.values(PG.st).reduce((a, b) => a + b, 0);
  let NAME = LS.get('sh_name', ''), HUE = LS.get('sh_hue', Math.floor(Math.random() * 360)), MUTE = LS.get('sh_mute', false);
  let TOK = LS.get('sh_tok', ''); if (!/^[\w-]{16,64}$/.test(TOK)) { TOK = Array.from(crypto.getRandomValues(new Uint8Array(18)), b => b.toString(36).padStart(2, '0')).join('').slice(0, 24); LS.set('sh_tok', TOK); }
  /* ---------------- sound: synthesized, with a Hijaz-scale music bed ---------------- */
  let AC = null, master, musicG, sfxG, noiseBuf, lastS = {};
  function audio() {
    if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
    try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = AC.createGain(); master.gain.value = MUTE ? 0 : .8; master.connect(AC.destination);
    sfxG = AC.createGain(); sfxG.gain.value = .9; sfxG.connect(master); musicG = AC.createGain(); musicG.gain.value = .22; musicG.connect(master);
    noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    music();
  }
  const gate = (k, ms) => { const t = performance.now(); if (t - (lastS[k] || 0) < ms) return false; lastS[k] = t; return true; };
  function tone(f, dur, type = 'sine', vol = .2, slide = 1, delay = 0, out = sfxG) { if (!AC) return; const t = AC.currentTime + delay, o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if (slide !== 1) o.frequency.exponentialRampToValueAtTime(Math.max(30, f * slide), t + dur); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0008, t + dur); o.connect(g).connect(out); o.start(t); o.stop(t + dur + .05); }
  function noise(dur, f0, f1, vol = .2, q = 1, delay = 0) { if (!AC) return; const t = AC.currentTime + delay, s = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = AC.createGain(); s.buffer = noiseBuf; fl.type = 'bandpass'; fl.Q.value = q; fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); s.connect(fl).connect(g).connect(sfxG); s.start(t, Math.random() * .5); s.stop(t + dur); }
  const HIJAZ = [293.7, 311.1, 370, 392, 440, 466.2, 523.3, 587.3]; // D Eb F# G A Bb C D
  const SFX = {
    fire: () => { if (gate('fire', 45)) { noise(.09, 2400 + Math.random() * 800, 700, .05, 2); tone(520 + Math.random() * 120, .07, 'triangle', .025, 1.8); } },
    gate: k => { if (gate('gate', 70)) { const i = Math.min(7, Math.round(Math.log2(k) * 2)); tone(HIJAZ[i] * 2, .22, 'triangle', .06); tone(HIJAZ[i] * 4, .15, 'sine', .03, 1, .02); } },
    bad: () => { if (gate('bad', 120)) { tone(140, .25, 'sawtooth', .05, .6); } },
    flame: () => { if (gate('flame', 140)) noise(.3, 500, 2500, .07, .8); },
    brk: k => { if (gate('brk' + k, k === 1 ? 50 : 80)) { if (k === 3) { tone(1800 + Math.random() * 400, .18, 'square', .03, .7); noise(.08, 5000, 3000, .06, 4); } else if (k === 2) { noise(.12, 1600, 500, .12, 1.5); tone(300, .08, 'square', .03, .6); } else noise(.1, 900 + Math.random() * 300, 250, .12, 1.2); } },
    hit: () => { if (gate('hit', 60)) noise(.04, 2500, 1500, .035, 3); },
    rock: gone => { if (gone) { noise(.5, 600, 90, .3, .8); tone(80, .4, 'sine', .12, .5); } else if (gate('rock', 90)) noise(.06, 700, 400, .06, 2); },
    zap: () => { if (gate('zap', 80)) { tone(1500, .12, 'sawtooth', .03, .35); } },
    gfall: () => { tone(700, .7, 'triangle', .07, .3); noise(.3, 800, 200, .1, 1, .5); },
    core: () => { if (gate('core', 110)) { tone(110, .6, 'sine', .14, .97); tone(220, .5, 'triangle', .05, .98); tone(660, .3, 'sine', .03); } },
    win: () => { noise(1.8, 300, 60, .35, .6); tone(55, 1.8, 'sine', .2, .6); [0, 2, 4, 7].forEach((n, i) => { tone(HIJAZ[n] * 2, .8, 'triangle', .07, 1, .5 + i * .14); }); tone(HIJAZ[7] * 2, 1.6, 'triangle', .06, 1, 1.15); },
    lose: () => { [4, 3, 1, 0].forEach((n, i) => tone(HIJAZ[n], .6, 'triangle', .07, 1, i * .18)); },
    falcon: () => { tone(2200, .9, 'sawtooth', .04, .4); tone(2600, .7, 'triangle', .03, .5, .05); noise(1, 3000, 800, .14, 1.5); },
    ready: () => { tone(HIJAZ[4] * 2, .2, 'triangle', .06); tone(HIJAZ[7] * 2, .4, 'triangle', .06, 1, .1); },
    coin: () => { tone(1568, .12, 'square', .03); tone(2093, .25, 'square', .03, 1, .07); },
    click: () => tone(880, .05, 'triangle', .04),
    beep: hi => tone(hi ? 1174.7 : 587.3, hi ? .5 : .15, 'square', .05),
    repair: () => { if (gate('rep', 300)) { tone(392, .2, 'triangle', .05); tone(293.7, .25, 'triangle', .05, 1, .1); } },
    low: () => tone(1760, .06, 'square', .03),
  };
  function music() { // a slow oud-like pluck on the Hijaz scale over a drone
    if (!AC) return; const drone = AC.createOscillator(), dg = AC.createGain(); drone.type = 'sine'; drone.frequency.value = 73.4; dg.gain.value = .25; drone.connect(dg).connect(musicG); drone.start();
    const pat = [0, 1, 2, 1, 3, 2, 1, 0, 4, 3, 2, 1, 2, 1, 0, -1]; let i = 0;
    setInterval(() => { if (!AC || MUTE || document.hidden) return; const n = pat[i++ % pat.length]; if (n < 0) return; const f = HIJAZ[n] * (i % 32 < 16 ? 1 : 2) / 2; const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(), fl = AC.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.setValueAtTime(2400, t); fl.frequency.exponentialRampToValueAtTime(400, t + .4); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .005); g.gain.exponentialRampToValueAtTime(.001, t + .9); o.connect(fl).connect(g).connect(musicG); o.start(t); o.stop(t + 1); }, 330);
  }
  const buzz = p => { try { if (navigator.vibrate && !RM()) navigator.vibrate(p); } catch (e) { } };
  function setMute(m) { MUTE = m; LS.set('sh_mute', m); if (master) master.gain.value = m ? 0 : .8; $('bMute').textContent = $('bMute2').textContent = m ? '🔇' : '🔊'; }

  /* ---------------- canvas and view ---------------- */
  const cv = $('cv'), cx = cv.getContext('2d'); let VW = 0, VH = 0, DPR = 1, K = 1, OX = 0, OY = 0, BG = null, DARK = null;
  function resize() {
    DPR = Math.min(2, devicePixelRatio || 1); VW = innerWidth; VH = innerHeight; cv.width = VW * DPR; cv.height = VH * DPR;
    K = Math.min(VW / C.W, VH / (C.H + 8)); OX = (VW - C.W * K) / 2; OY = Math.max(0, (VH - C.H * K) / 2) + (VH > C.H * K + 60 ? 10 : 0);
    BG = paintBg(); DARK = document.createElement('canvas'); DARK.width = Math.ceil(VW / 2); DARK.height = Math.ceil(VH / 2);
  }
  const X = x => OX + x * K, Y = y => OY + y * K;
  function hsh(i) { let h = i * 2654435761 >>> 0; h ^= h >>> 15; return (h >>> 0) / 4294967296; }
  function paintBg() { // dusk sky, crescent moon, stars, far dunes, palms — painted once per resize
    const c = document.createElement('canvas'); c.width = VW * DPR; c.height = VH * DPR; const g = c.getContext('2d'); g.scale(DPR, DPR);
    const sky = g.createLinearGradient(0, 0, 0, VH); sky.addColorStop(0, '#0d0a24'); sky.addColorStop(.42, '#2a1d55'); sky.addColorStop(.7, '#7a3d66'); sky.addColorStop(.86, '#e0784e'); sky.addColorStop(1, '#f4b26a'); g.fillStyle = sky; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 160; i++) { const x = hsh(i) * VW, y = hsh(i + 999) * VH * .55, r = hsh(i + 77) * 1.3 + .2; g.fillStyle = `rgba(255,245,220,${.25 + hsh(i + 5) * .6})`; g.fillRect(x, y, r, r); }
    const mx = OX + C.W * K * .87, my = OY + 76 * K, mr = 4.6 * K; g.fillStyle = '#ffeec4'; g.shadowColor = '#ffd88a'; g.shadowBlur = 30; g.beginPath(); g.arc(mx, my, mr, 0, Math.PI * 2); g.fill(); g.shadowBlur = 0; g.fillStyle = sky; g.beginPath(); g.arc(mx + mr * .45, my - mr * .2, mr * .9, 0, Math.PI * 2); g.fill(); /* crescent cut painted with the sky itself (a transparent hole would show stale frames) */
    const dune = (y0, col, amp, seed) => { g.fillStyle = col; g.beginPath(); g.moveTo(0, VH); for (let x = 0; x <= VW; x += 8) g.lineTo(x, y0 + Math.sin(x / VW * 6 + seed) * amp + Math.sin(x / VW * 15 + seed * 2) * amp * .3); g.lineTo(VW, VH); g.fill(); };
    const hz = Y(C.LY - 8); dune(hz - 26 * K * .4, '#5a2f52', 10, 1); dune(hz - 8, '#3d2346', 14, 3);
    const palm = (x, y, s) => { g.strokeStyle = '#21142f'; g.lineWidth = s * .18; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + s * .3, y - s, x + s * .1, y - s * 1.9); g.stroke(); g.fillStyle = '#21142f'; for (let a = 0; a < 7; a++) { const an = -Math.PI / 2 + (a - 3) * .5; g.beginPath(); g.ellipse(x + s * .1 + Math.cos(an) * s * .5, y - s * 1.9 + Math.sin(an) * s * .25 + s * .1, s * .62, s * .12, an, 0, Math.PI * 2); g.fill(); } };
    palm(OX - 4, hz + 6, 22); palm(OX + C.W * K * .08, hz + 2, 15); palm(OX + C.W * K + 2, hz + 8, 24); palm(OX + C.W * K * .9, hz + 4, 13);
    const sand = g.createLinearGradient(0, Y(C.LY - 3), 0, VH); sand.addColorStop(0, '#c98a52'); sand.addColorStop(1, '#8a5232'); g.fillStyle = sand; g.beginPath(); g.moveTo(0, VH); g.lineTo(0, Y(C.LY - 1)); for (let x = 0; x <= VW; x += 10) g.lineTo(x, Y(C.LY - 1) + Math.sin(x * .02) * 4); g.lineTo(VW, VH); g.fill();
    if (OX > 2) { g.fillStyle = 'rgba(10,7,25,.35)'; g.fillRect(0, 0, OX, VH); g.fillRect(OX + C.W * K, 0, VW, VH); }
    return c;
  }

  /* ---------------- a run ---------------- */
  let R = null, last = 0, acc = 0; const input = { fire: false, x: 50, kx: 0 };
  const parts = [], floats = [], beams = [];
  function startRun(lv, mode, room) {
    const L = C.LEVELS[lv - 1]; audio();
    const st = C.create(L, mode === 'duel' ? {} : PG.up);
    R = { lv, L, st, mode, t0: performance.now() + (mode === 'duel' && room ? Math.max(600, room.at - room.now) : 0), shake: 0, hitstop: 0, slow: 1, flash: 0, fired: 0, end: 0, lastCount: 0, readyShown: 0, b0: 0, net: 0, out: 0, gateT: {} };
    parts.length = floats.length = beams.length = 0; input.fire = false; input.x = 50;
    show(null); $('hud').classList.remove('hide'); $('lang').classList.add('hide');
    $('hName').textContent = tr('lvl', lv) + ' · ' + N(L); $('opp').classList.toggle('hide', mode !== 'duel'); $('emo').classList.toggle('hide', mode !== 'duel');
    $('hold').textContent = tr('hold'); $('hold').classList.toggle('hide', !(lv <= 2 && mode !== 'duel'));
    $('cd').classList.toggle('hide', mode !== 'duel'); hud(true);
  }
  function endRun() { R = null; $('hud').classList.add('hide'); $('lang').classList.remove('hide'); }
  function shake(a) { if (!RM() && R) R.shake = Math.max(R.shake, a); }
  function burst(x, y, n, col, sp = 30, life = .7, grav = 60, size = .7) { if (RM()) n = Math.ceil(n / 4); for (let i = 0; i < n && parts.length < 1400; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * sp; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * .3, l: life * (.5 + Math.random() * .7), m: life, c: col, s: size * (.5 + Math.random()), g: grav }); } }
  const floatText = (x, y, t, c, s = 1) => floats.push({ x, y, t, c, l: 1.1, s });
  const BRICK = { 1: ['#d69a5c', '#c4874a', '#b9783f'], 2: ['#9aa0ad', '#868c99', '#7a808c'], 3: ['#4c4f5c', '#3f414c', '#555867'] };
  function fortCellXY(st, i) { const F = st.fort, c = i % F.cols, r = Math.floor(i / F.cols); return [C.fortX(st) + (c + .5) * C.CS, C.FY + (r + .5) * C.CS]; }
  function events() {
    const st = R.st;
    for (const e of st.ev) {
      if (e.e === 'fire') { SFX.fire(); R.fired++; if (R.fired === 1) $('hold').classList.add('hide'); }
      else if (e.e === 'gate') { SFX.gate(e.k); const g = st.gates[e.g]; if (performance.now() - (R.gateT[e.g] || 0) > 260) { R.gateT[e.g] = performance.now(); floatText(g.x + (Math.random() - .5) * g.w * .5, g.y - 4, '×' + e.k, '#7ff7df', .8); } }
      else if (e.e === 'bad') { SFX.bad(); const g = st.gates[e.g]; if (performance.now() - (R.gateT[e.g] || 0) > 300) { R.gateT[e.g] = performance.now(); floatText(g.x, g.y - 4, '÷' + g.v, '#ff6f8a', .8); } }
      else if (e.e === 'flame') SFX.flame();
      else if (e.e === 'brk') { SFX.brk(e.k); const [x, y] = fortCellXY(st, e.i); burst(x, y, 6, BRICK[e.k][0], 26, .8, 90, .9); if (e.k > 1) shake(.15); }
      else if (e.e === 'hit') { SFX.hit(); if (Math.random() < .25) { const [x, y] = fortCellXY(st, e.i); burst(x, y + 1, 1, '#ffe0a0', 12, .3, 0, .5); } }
      else if (e.e === 'core') { SFX.core(); const [x, y] = fortCellXY(st, e.i); if (Math.random() < .4) burst(x, y, 3, '#ffd36b', 30, .5, 20, .8); shake(.12); }
      else if (e.e === 'rock') { SFX.rock(e.gone); if (e.gone) { burst(e.x, e.y, 40, '#8b7b74', 40, 1, 80, 1.3); shake(.5); } else if (Math.random() < .3) burst(e.x, e.y, 1, '#b9a89a', 14, .4, 40, .6); }
      else if (e.e === 'zap') { SFX.zap(); beams.push({ x0: e.x0, y0: e.y0, x1: e.x1, y1: e.y1, l: .14 }); burst(e.x1, e.y1, 3, '#7ff7ff', 14, .3, 0, .6); }
      else if (e.e === 'gfall') { SFX.gfall(); floatText(e.x, e.y - 3, tr('guardDown'), '#ffd987', .9); burst(e.x, e.y, 18, '#3fb7e0', 30, 1, 120, .8); buzz(25); }
      else if (e.e === 'falcon') { SFX.falcon(); shake(.6); buzz([20, 30, 20]); }
      else if (e.e === 'win') { R.end = 1; R.hitstop = .3; R.slow = .3; R.flash = 1; SFX.win(); buzz([40, 60, 120]); collapse(); floatText(50, 60, tr('heartBroken'), '#ffd36b', 1.6); }
      else if (e.e === 'lose') { R.end = 2; SFX.lose(); }
    }
    st.ev.length = 0;
  }
  function collapse() { // every remaining brick tumbles down
    const st = R.st, F = st.fort; for (let i = 0; i < F.t.length; i++) { const k = F.t[i]; if (!k) continue; const [x, y] = fortCellXY(st, i); parts.push({ x, y, vx: (Math.random() - .5) * 30 + (x - 50) * .4, vy: -Math.random() * 30, l: 1.6 + Math.random(), m: 2.2, c: k === 9 ? '#ffd36b' : BRICK[k][i % 3], s: 2.6, g: 110, sq: 1 }); F.t[i] = 0; }
    for (let i = 0; i < 70; i++) { const a = Math.random() * Math.PI * 2; parts.push({ x: 50, y: C.FY + F.rows * C.CS * .6, vx: Math.cos(a) * 60, vy: Math.sin(a) * 60, l: 1.2, m: 1.2, c: '#ffe6a6', s: .9, g: 10 }); }
    shake(1.2);
  }
  /* ---------------- loop ---------------- */
  function frame(ts) {
    requestAnimationFrame(frame); const dtr = Math.min(.05, (ts - (last || ts)) / 1000); last = ts;
    if (R) {
      const pre = R.t0 > performance.now(); if (pre) { const n = Math.ceil((R.t0 - performance.now()) / 1000); if (n !== R.cdN) { R.cdN = n; $('cd').textContent = n; if (n <= 3) SFX.beep(0); } }
      else if (R.mode === 'duel' && !R.goSaid) { R.goSaid = 1; $('cd').textContent = AR() ? 'انطلق!' : 'GO!'; SFX.beep(1); setTimeout(() => $('cd').classList.add('hide'), 700); }
      let dt = dtr; if (R.hitstop > 0) { R.hitstop -= dt; dt = 0; } dt *= R.slow; if (R.end === 1) R.slow = Math.min(1, R.slow + dtr * .5);
      if (input.kx) input.x = Math.max(4, Math.min(96, input.x + input.kx * 70 * dtr));
      if (!pre) { acc += dt; let n = 0; while (acc >= 1 / 60 && n++ < 4) { acc -= 1 / 60; C.step(R.st, 1 / 60, { fire: input.fire && !R.end, x: input.x }); events(); if (!R) return; } }
      for (const p of parts) { p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.l -= dt; } for (let i = parts.length - 1; i >= 0; i--) if (parts[i].l <= 0) parts.splice(i, 1);
      for (const f of floats) { f.y -= 9 * dtr; f.l -= dtr; } for (let i = floats.length - 1; i >= 0; i--) if (floats[i].l <= 0) floats.splice(i, 1);
      for (const b of beams) b.l -= dtr; for (let i = beams.length - 1; i >= 0; i--) if (beams[i].l <= 0) beams.splice(i, 1);
      R.shake = Math.max(0, R.shake - dtr * 2.2); R.flash = Math.max(0, R.flash - dtr * 2);
      if (R.st.charge >= 1 && !R.readyShown) { R.readyShown = 1; SFX.ready(); toast(tr('falconReady')); } if (R.st.charge < 1) R.readyShown = 0;
      if (R.mode === 'duel') netTick();
      if (R.end && !R.endT) { R.endT = performance.now(); }
      if (R.end && R.end < 3 && performance.now() - R.endT > (R.end === 1 ? 2000 : 900)) { finishRun(); if (!R) return; }
      hud(); draw();
    } else drawIdle(dtr);
  }
  function finishRun() {
    const st = R.st, won = R.end === 1, lv = R.lv, mode = R.mode;
    if (mode === 'duel') { if (won) netSend({ t: 'st', hp: 0, sw: 0, b: 0 }), netSend({ t: 'win' }); else { netSend({ t: 'st', hp: st.fort.coreHp / st.fort.core0, sw: 0, b: 0, out: 1 }); R.out = 1; } R.end = 3; toast(won ? tr('heartBroken') : tr('outWait')); return; }
    const stars = won ? C.stars(st) : 0, first = won && !PG.st[lv], better = won && stars > (PG.st[lv] || 0);
    const coins = won ? 20 + Math.round(st.broke / 4) + stars * 15 + (first ? 30 : 0) : Math.round(st.broke / 8);
    PG.coins += coins; if (won) { PG.st[lv] = Math.max(PG.st[lv] || 0, stars); if (lv >= PG.un && lv < C.LEVELS.length) PG.un = lv + 1; } saveP();
    const peak = st.peak, broke = st.broke, hp = Math.round(st.fort.coreHp / st.fort.core0 * 100); endRun();
    if (won) { show('win'); $('wStars').innerHTML = [1, 2, 3].map(i => `<span class="${i <= stars ? 'on' : ''}" style="animation-delay:${i * .25}s">★</span>`).join(''); $('wPeak').textContent = fmt(peak); $('wBroke').textContent = broke; $('wCoins').textContent = '+' + coins;
      $('wNote').textContent = first && lv < C.LEVELS.length ? tr('firstWin', lv + 1) : better ? tr('bestStars') : ''; $('bNext').classList.toggle('hide', lv >= C.LEVELS.length); $('bNext').onclick = () => intro(lv + 1); $('bRetry').onclick = () => startRun(lv, 'solo');
      for (let i = 1; i <= stars; i++) setTimeout(SFX.coin, 250 * i + 150); }
    else { show('lose'); $('lHeart').textContent = hp + '%'; $('lCoins').textContent = '+' + coins; $('lNote').textContent = tr('loseTip'); $('bRetry2').onclick = () => startRun(lv, 'solo'); }
  }
  /* ---------------- drawing ---------------- */
  function drawIdle(dt) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); if (BG) cx.drawImage(BG, 0, 0, VW, VH); idleT += dt; // a lazy demo swarm behind the menus
    cx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { const ph = (idleT * .35 + hsh(i)) % 1, x = X(15 + hsh(i + 3) * 70 + Math.sin(ph * 6 + i) * 3), y = Y(C.LY - ph * 150); cx.strokeStyle = 'rgba(255,190,110,.35)'; cx.lineWidth = K * .5; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y + K * 6); cx.stroke(); cx.fillStyle = '#fff1c8'; cx.beginPath(); cx.arc(x, y, K * .55, 0, Math.PI * 2); cx.fill(); } cx.globalCompositeOperation = 'source-over'; }
  let idleT = 0;
  function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }
  function draw() {
    const st = R.st, L = R.L, T = performance.now() / 1000, F = st.fort, fx = C.fortX(st);
    cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.drawImage(BG, 0, 0, VW, VH); cx.direction = 'ltr';
    if (R.shake) cx.translate((Math.random() - .5) * R.shake * K * 3, (Math.random() - .5) * R.shake * K * 3);
    // twinkle + wind streaks
    if (L.wind) { cx.strokeStyle = 'rgba(255,220,170,.18)'; cx.lineWidth = K * .25; for (let i = 0; i < 26; i++) { const xx = ((T * 60 + hsh(i) * 140) % 140) - 20, yy = 20 + hsh(i + 9) * 140; cx.beginPath(); cx.moveTo(X(xx), Y(yy)); cx.lineTo(X(xx + 9), Y(yy)); cx.stroke(); } }
    // fort shadow & legs (walking forts)
    const fb = C.FY + F.rows * C.CS, fw = F.cols * C.CS;
    if (L.fort.amp) { cx.strokeStyle = '#5b3a22'; cx.lineWidth = K * 1.4; cx.lineCap = 'round'; for (let k = 0; k < 4; k++) { const lx = fx + fw * (.12 + k * .25), sw = Math.sin(T * L.fort.sp * 6 + k * 1.7) * 2.5; cx.beginPath(); cx.moveTo(X(lx), Y(fb)); cx.lineTo(X(lx + sw), Y(fb + 5)); cx.lineTo(X(lx + sw * .4), Y(fb + 9)); cx.stroke(); } cx.lineCap = 'butt'; }
    else { cx.fillStyle = 'rgba(30,15,40,.35)'; cx.beginPath(); cx.ellipse(X(fx + fw / 2), Y(fb + 1.2), fw * K * .55, K * 1.6, 0, 0, Math.PI * 2); cx.fill(); }
    // fort bricks
    const cs = C.CS * K;
    for (let i = 0; i < F.t.length; i++) {
      const k = F.t[i]; if (!k || k === 9) continue; const c = i % F.cols, r = (i / F.cols) | 0, x = X(fx + c * C.CS), y = Y(C.FY + r * C.CS), pal = BRICK[k];
      const top = r === 0 || !F.t[i - F.cols]; cx.fillStyle = pal[(c * 7 + r * 3) % 3]; cx.fillRect(x, y, cs + .5, cs + .5);
      cx.fillStyle = 'rgba(255,240,210,.16)'; cx.fillRect(x, y, cs, cs * .14); cx.fillStyle = 'rgba(40,15,10,.22)'; cx.fillRect(x, y + cs * .86, cs, cs * .14);
      if (k === 1 && (c + r) % 4 === 0) { cx.fillStyle = 'rgba(90,50,25,.35)'; cx.fillRect(x + cs * .2, y + cs * .45, cs * .5, cs * .08); }
      if (k === 3) { cx.fillStyle = '#9aa0b3'; cx.fillRect(x + cs * .18, y + cs * .2, cs * .12, cs * .12); cx.fillRect(x + cs * .7, y + cs * .65, cs * .12, cs * .12); }
      const hp0 = { 1: 4, 2: 12, 3: 30 }[k] * F.sc; if (F.hp[i] < hp0 * .55) { cx.strokeStyle = 'rgba(30,10,10,.6)'; cx.lineWidth = Math.max(1, K * .2); cx.beginPath(); cx.moveTo(x + cs * .2, y + cs * .25); cx.lineTo(x + cs * .5, y + cs * .55); cx.lineTo(x + cs * .38, y + cs * .85); cx.stroke(); }
      if (top) { cx.fillStyle = pal[0]; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + cs / 2, y - cs * .55); cx.lineTo(x + cs, y); cx.fill(); } // Najdi triangular crenellation
    }
    // banners on the tallest bricks
    for (const [c0] of [[0], [F.cols - 1]]) { let r0 = -1; for (let r = 0; r < F.rows; r++) if (F.t[r * F.cols + c0]) { r0 = r; break; } if (r0 < 0) continue; const x = X(fx + (c0 + .5) * C.CS), y = Y(C.FY + r0 * C.CS) - cs * .5; cx.strokeStyle = '#3b2615'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y - K * 7); cx.stroke(); cx.fillStyle = '#e8c370'; cx.beginPath(); cx.moveTo(x, y - K * 7); cx.quadraticCurveTo(x + K * 3, y - K * (6.4 + Math.sin(T * 4 + c0) * .6), x + K * 5, y - K * 6); cx.lineTo(x, y - K * 4.6); cx.fill(); }
    // the lantern-heart
    if (F.coreHp > 0) { const x = X(fx + (F.cc + 1) * C.CS), y = Y(C.FY + (F.cr + 1) * C.CS), pu = 1 + Math.sin(T * 5) * .08, hpf = F.coreHp / F.core0;
      const gl = cx.createRadialGradient(x, y, 0, x, y, cs * 2.6 * pu); gl.addColorStop(0, `rgba(255,214,110,${.55 + .3 * (1 - hpf)})`); gl.addColorStop(1, 'rgba(255,214,110,0)'); cx.fillStyle = gl; cx.fillRect(x - cs * 3, y - cs * 3, cs * 6, cs * 6);
      cx.fillStyle = '#3a2412'; rr(x - cs * .8, y - cs * .95, cs * 1.6, cs * 1.9, cs * .3); cx.fill(); cx.fillStyle = `hsl(${40 - (1 - hpf) * 30},100%,${62 + Math.sin(T * 9) * 6}%)`; rr(x - cs * .55, y - cs * .65, cs * 1.1, cs * 1.3, cs * .25); cx.fill();
      cx.strokeStyle = '#3a2412'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(x, y - cs * .65); cx.lineTo(x, y + cs * .65); cx.moveTo(x - cs * .55, y); cx.lineTo(x + cs * .55, y); cx.stroke(); }
    // guards: hooded sand-djinn with glowing eyes
    for (const g of F.guards) { if (!g.alive) continue; const x = X(fx + (g.c + .5) * C.CS), y = Y(C.FY + (g.r + 1) * C.CS) + K * .4, s = K * 4, bob = Math.sin(T * 3 + g.c) * K * .3;
      cx.fillStyle = '#1d6d8f'; cx.beginPath(); cx.moveTo(x - s * .55, y); cx.quadraticCurveTo(x, y - s * 1.9 + bob, x + s * .55, y); cx.fill(); cx.fillStyle = '#123a52'; cx.beginPath(); cx.arc(x, y - s * 1.05 + bob, s * .36, 0, Math.PI * 2); cx.fill();
      cx.fillStyle = '#7ff7ff'; cx.shadowColor = '#7ff7ff'; cx.shadowBlur = K * 2; for (const e of [-1, 1]) { cx.beginPath(); cx.arc(x + e * s * .14, y - s * 1.05 + bob, s * .07, 0, Math.PI * 2); cx.fill(); } cx.shadowBlur = 0;
      cx.strokeStyle = '#c9a25a'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(x + s * .5, y); cx.lineTo(x + s * .62, y - s * 1.6); cx.stroke(); cx.fillStyle = '#7ff7ff'; cx.beginPath(); cx.arc(x + s * .62, y - s * 1.65, s * .12, 0, Math.PI * 2); cx.fill(); }
    // rocks
    for (const r of st.rocks) { if (r.hp <= 0) continue; const x = X(r.x), y = Y(r.y), w = r.w * K / 2, h = r.h * K / 2, f = r.hp / r.hp0;
      cx.fillStyle = '#6e5f5a'; cx.beginPath(); for (let a = 0; a < 10; a++) { const an = a / 10 * Math.PI * 2, rr2 = 1 + (hsh(a + r.x * 7) - .5) * .25; cx.lineTo(x + Math.cos(an) * w * rr2, y + Math.sin(an) * h * rr2); } cx.fill();
      cx.fillStyle = 'rgba(255,255,255,.12)'; cx.beginPath(); cx.ellipse(x - w * .25, y - h * .35, w * .45, h * .25, 0, 0, Math.PI * 2); cx.fill();
      if (f < .66) { cx.strokeStyle = 'rgba(25,15,15,.7)'; cx.lineWidth = K * .3; cx.beginPath(); cx.moveTo(x - w * .5, y - h * .2); cx.lineTo(x, y + h * .1); cx.lineTo(x + w * .3, y - h * .4); if (f < .33) { cx.moveTo(x, y + h * .1); cx.lineTo(x + w * .1, y + h * .7); } cx.stroke(); }
      cx.fillStyle = 'rgba(255,240,220,.8)'; cx.font = `800 ${K * 2.6}px Tajawal,system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(Math.ceil(r.hp), x, y + h * .1); }
    // gates
    for (const g of st.gates) {
      const x = X(g.x - g.w / 2), y = Y(g.y - g.h / 2), w = g.w * K, h = g.h * K, col = { mul: [63, 224, 197], div: [255, 77, 109], fire: [255, 122, 61], split: [186, 120, 255] }[g.type], fl = g.flash;
      cx.fillStyle = `rgba(${col},${.2 + fl * .35})`; rr(x, y, w, h, K * 1.4); cx.fill(); cx.strokeStyle = `rgba(${col},${.85})`; cx.lineWidth = K * (.45 + fl * .4); cx.stroke();
      cx.shadowColor = `rgb(${col})`; cx.shadowBlur = K * (2 + fl * 4); cx.fillStyle = '#fff'; cx.font = `900 ${K * 4.6}px Tajawal,system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle';
      cx.fillText(g.type === 'mul' ? '×' + g.v : g.type === 'div' ? '÷' + g.v : g.type === 'fire' ? '🔥' : '⇶', X(g.x), Y(g.y) + K * .3); cx.shadowBlur = 0;
      if (g.amp) { cx.fillStyle = `rgba(${col},.5)`; cx.fillRect(X(g.x0 - g.amp - g.w / 2), Y(g.y + g.h / 2 + 1), (g.amp * 2 + g.w) * K, K * .3); }
    }
    // meteors
    cx.globalCompositeOperation = 'lighter'; const P = st.P;
    cx.lineCap = 'round';
    for (const fire of [0, 1]) { cx.strokeStyle = fire ? 'rgba(255,110,40,.42)' : 'rgba(255,190,110,.36)'; cx.lineWidth = K * .7; cx.beginPath(); for (const p of P) { if ((p.f || 0) !== fire) continue; cx.moveTo(X(p.x), Y(p.y)); cx.lineTo(X(p.x - p.vx * .055), Y(p.y - p.vy * .055)); } cx.stroke(); }
    for (const p of P) { const r = K * Math.min(2.4, .5 + Math.log2(1 + p.w) * .28); cx.fillStyle = p.f ? '#ffb27a' : '#fff1c8'; cx.beginPath(); cx.arc(X(p.x), Y(p.y), r, 0, Math.PI * 2); cx.fill(); if (p.w > 6) { cx.fillStyle = p.f ? 'rgba(255,100,40,.25)' : 'rgba(255,200,120,.22)'; cx.beginPath(); cx.arc(X(p.x), Y(p.y), r * 2.2, 0, Math.PI * 2); cx.fill(); } }
    cx.lineCap = 'butt';
    for (const b of beams) { cx.strokeStyle = `rgba(127,247,255,${b.l / .14})`; cx.lineWidth = K * .8; cx.beginPath(); cx.moveTo(X(b.x0), Y(b.y0)); cx.lineTo(X(b.x1), Y(b.y1)); cx.stroke(); }
    if (st.falcon) { const fa = st.falcon, x = X(fa.x), y = Y(fa.y); const gl = cx.createRadialGradient(x, y, 0, x, y, K * 9); gl.addColorStop(0, 'rgba(255,220,140,.8)'); gl.addColorStop(1, 'rgba(255,220,140,0)'); cx.fillStyle = gl; cx.fillRect(x - K * 9, y - K * 9, K * 18, K * 40); }
    cx.globalCompositeOperation = 'source-over';
    if (st.falcon) { const fa = st.falcon; cx.font = `${K * 9}px system-ui`; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.save(); cx.translate(X(fa.x), Y(fa.y)); cx.fillText('🦅', 0, 0); cx.restore(); }
    // launcher: a brass astrolabe on a cart
    { const x = X(st.cx), y = Y(C.LY), s = K * 5.2, spin = T * (input.fire && st.ammo ? 9 : 1.2);
      cx.fillStyle = '#4a2d18'; rr(x - s * 1.1, y + s * .2, s * 2.2, s * .55, s * .2); cx.fill(); cx.fillStyle = '#2a1a10'; for (const e of [-.7, .7]) { cx.beginPath(); cx.arc(x + e * s, y + s * .8, s * .32, 0, Math.PI * 2); cx.fill(); }
      cx.strokeStyle = '#e2b25c'; cx.lineWidth = K * .9; cx.beginPath(); cx.arc(x, y - s * .2, s * .78, 0, Math.PI * 2); cx.stroke();
      cx.save(); cx.translate(x, y - s * .2); cx.rotate(spin); cx.strokeStyle = '#ffdc8a'; cx.lineWidth = K * .4; for (let a = 0; a < 4; a++) { cx.rotate(Math.PI / 4); cx.beginPath(); cx.moveTo(-s * .7, 0); cx.lineTo(s * .7, 0); cx.stroke(); } cx.restore();
      const gl = cx.createRadialGradient(x, y - s * .2, 0, x, y - s * .2, s * (input.fire && st.ammo ? 1.6 : .9)); gl.addColorStop(0, 'rgba(255,236,170,.95)'); gl.addColorStop(1, 'rgba(255,170,80,0)'); cx.fillStyle = gl; cx.beginPath(); cx.arc(x, y - s * .2, s * 1.6, 0, Math.PI * 2); cx.fill();
      if (R.lv <= 2 && !R.fired && R.mode !== 'duel') { let bx = 50, bv = -1; for (let xx = 8; xx <= 92; xx += 2) { const v = C.lane(st, xx); if (v > bv) { bv = v; bx = xx; } } cx.setLineDash([K * 1.5, K * 1.5]); cx.strokeStyle = 'rgba(255,240,200,.55)'; cx.lineWidth = K * .45; cx.beginPath(); cx.moveTo(X(bx), Y(C.LY - 8)); cx.lineTo(X(bx), Y(C.FY + F.rows * C.CS + 4)); cx.stroke(); cx.setLineDash([]); }
    }
    // particles
    for (const p of parts) { const a = Math.max(0, p.l / p.m); cx.globalAlpha = Math.min(1, a * 1.5); cx.fillStyle = p.c; const s = p.s * K; if (p.sq) { cx.save(); cx.translate(X(p.x), Y(p.y)); cx.rotate(p.l * 3); cx.fillRect(-s / 2, -s / 2, s, s); cx.restore(); } else cx.fillRect(X(p.x) - s / 2, Y(p.y) - s / 2, s, s); }
    cx.globalAlpha = 1;
    // night: only your swarm, the launcher and the lantern give light
    if (L.night && DARK) { const d = DARK.getContext('2d'), sc = .5; d.globalCompositeOperation = 'source-over'; d.clearRect(0, 0, DARK.width, DARK.height); d.fillStyle = 'rgba(4,2,14,.9)'; d.fillRect(0, 0, DARK.width, DARK.height); d.globalCompositeOperation = 'destination-out';
      const hole = (x, y, r) => { const g = d.createRadialGradient(x * sc, y * sc, 0, x * sc, y * sc, r * sc); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); d.fillStyle = g; d.fillRect((x - r) * sc, (y - r) * sc, r * 2 * sc, r * 2 * sc); };
      hole(X(st.cx), Y(C.LY), K * 22); if (F.coreHp > 0) hole(X(fx + (F.cc + 1) * C.CS), Y(C.FY + (F.cr + 1) * C.CS), K * 9); const step = Math.max(1, Math.floor(P.length / 70)); for (let i = 0; i < P.length; i += step) hole(X(P[i].x), Y(P[i].y), K * 11); for (const g of st.gates) hole(X(g.x), Y(g.y), K * 6);
      cx.drawImage(DARK, 0, 0, VW, VH); }
    // floating numbers
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; for (const f of floats) { cx.globalAlpha = Math.min(1, f.l * 2); cx.font = `900 ${K * 5 * f.s}px Tajawal,system-ui`; cx.lineWidth = K * .8; cx.strokeStyle = 'rgba(20,10,30,.8)'; cx.strokeText(f.t, X(f.x), Y(f.y)); cx.fillStyle = f.c; cx.fillText(f.t, X(f.x), Y(f.y)); } cx.globalAlpha = 1;
    if (R.flash) { cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.fillStyle = `rgba(255,235,190,${R.flash * .45})`; cx.fillRect(0, 0, VW, VH); }
  }
  /* ---------------- HUD ---------------- */
  let hudT = 0;
  function hud(force) {
    if (!R) return; const now = performance.now(); if (!force && now - hudT < 66) return; hudT = now; const st = R.st, F = st.fort;
    const hp = Math.max(0, F.coreHp / F.core0); $('hBar').style.width = (hp * 100).toFixed(1) + '%'; $('hHp').textContent = Math.ceil(hp * 100) + '%';
    const n = Math.round(C.swarm(st)); $('hCount').textContent = '☄ ' + fmt(n); if (n > R.lastCount * 1.25 + 5) { const e = $('hCount'); e.classList.add('bump'); setTimeout(() => e.classList.remove('bump'), 90); } R.lastCount = n;
    $('hAmmo').textContent = '☄ ' + st.ammo; const low = st.ammo < st.rate * 3; $('hAmmo').classList.toggle('low', low); if (low && input.fire && st.ammo > 0 && gate('lowb', 500)) SFX.low();
    $('bFalcon').style.setProperty('--p', (st.charge * 100).toFixed(0) + '%'); $('bFalcon').classList.toggle('ready', st.charge >= 1);
  }
  let toastT = 0; function toast(a, b) { const e = $('toast'); e.innerHTML = esc(a) + (b ? '<small>' + esc(b) + '</small>' : ''); e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 1800); }
  /* ---------------- input ---------------- */
  const wx = cx0 => Math.max(4, Math.min(96, (cx0 - OX) / K));
  cv.addEventListener('pointerdown', e => { if (!R) return; audio(); input.fire = true; input.x = wx(e.clientX); try { cv.setPointerCapture(e.pointerId); } catch (x) { } });
  cv.addEventListener('pointermove', e => { if (R && input.fire) input.x = wx(e.clientX); });
  const up = () => { input.fire = false; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('lostpointercapture', up);
  addEventListener('keydown', e => { if (!R) return; if (e.key === 'ArrowLeft' || e.key === 'a') input.kx = -1; else if (e.key === 'ArrowRight' || e.key === 'd') input.kx = 1; else if (e.key === ' ') { input.fire = true; audio(); e.preventDefault(); } else if (e.key === 'f' || e.key === 'F') useFalcon(); else if (e.key === 'Escape') toMenu(); });
  addEventListener('keyup', e => { if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') input.kx = 0; else if (e.key === ' ') input.fire = false; });
  function useFalcon() { if (R && C.falcon(R.st)) events(); }
  $('bFalcon').addEventListener('pointerdown', e => { e.stopPropagation(); useFalcon(); });
  /* ---------------- screens ---------------- */
  const OVS = ['menu', 'levels', 'intro', 'win', 'lose', 'shop', 'lobby', 'res']; let prevScreen = 'menu', curScreen = 'menu';
  function show(id) { if (id && curScreen && curScreen !== id && ['menu', 'win', 'lose', 'res'].includes(curScreen)) prevScreen = curScreen; curScreen = id; for (const k of OVS) $(k).classList.toggle('hide', k !== id); }
  function toMenu() { if (NET.ws) leaveDuel(); if (R) endRun(); show('menu'); refreshMenu(); }
  function refreshMenu() { $('playSub').textContent = tr('playSub', PG.un, starsTotal()); $('shopSub').textContent = tr('shopSub', PG.coins); }
  const ICON = ['✨', '✖️', '🪤', '💃', '🔥', '🪨', '🦵', '💎', '🪭', '🏰', '🌀', '🌙', '🌪️', '⚔️', '👑'];
  function levels() { show('levels'); $('lvHead').textContent = tr('lvHead', starsTotal(), PG.coins);
    $('grid').innerHTML = C.LEVELS.map(L => { const lock = L.id > PG.un, s = PG.st[L.id] || 0; return `<button class="lv ${lock ? 'lock' : ''} ${L.id === PG.un && !s ? 'next' : ''} ${L.boss ? 'boss' : ''}" data-lv="${L.id}" ${lock ? 'disabled' : ''}><i>${lock ? '🔒' : ICON[L.id - 1]}</i><b>${L.id}</b><em>${'★'.repeat(s)}${'☆'.repeat(3 - s)}</em><span>${lock ? tr('locked') : esc(N(L))}</span></button>`; }).join('');
    $('grid').querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { SFX.click(); intro(+b.dataset.lv); }); }
  function intro(n) { const L = C.LEVELS[n - 1]; if (!L || n > PG.un) return levels(); show('intro'); $('iNum').textContent = n; $('iName').textContent = N(L); $('iTip').textContent = L.tip[AR() ? 0 : 1]; $('iIcon').textContent = ICON[n - 1];
    $('iInfo').textContent = tr('info', Math.round(L.ammo * (1 + .1 * (PG.up.ammo || 0))), L.guards[0]); $('bGo').onclick = () => startRun(n, 'solo'); }
  const UPS = [{ k: 'rate', i: '⚡', max: 5, cost: [60, 120, 220, 360, 540] }, { k: 'twin', i: '🎯', max: 2, cost: [400, 1200] }, { k: 'power', i: '💥', max: 5, cost: [80, 160, 280, 440, 640] }, { k: 'ammo', i: '🏹', max: 5, cost: [50, 110, 190, 300, 450] }, { k: 'falcon', i: '🦅', max: 3, cost: [120, 260, 480] }];
  function shop() { show('shop'); $('shCoins').textContent = '🪙 ' + PG.coins + ' ' + tr('coins');
    $('shList').innerHTML = UPS.map(u => { const l = PG.up[u.k] || 0, mx = l >= u.max, c = u.cost[l]; return `<div class="up"><i>${u.i}</i><div><b>${tr('u_' + u.k)} <small>${'●'.repeat(l)}${'○'.repeat(u.max - l)}</small></b><span>${tr('u_' + u.k + 'D')}</span></div><button data-up="${u.k}" ${mx || PG.coins < c ? 'disabled' : ''}>${mx ? tr('max') : tr('buy') + ' · ' + c}</button></div>`; }).join('');
    $('shList').querySelectorAll('[data-up]').forEach(b => b.onclick = () => { const u = UPS.find(x => x.k === b.dataset.up), l = PG.up[u.k] || 0, c = u.cost[l]; if (l >= u.max || PG.coins < c) return; PG.coins -= c; PG.up[u.k] = l + 1; saveP(); SFX.coin(); shop(); }); }
  $('bPlay').onclick = () => { audio(); SFX.click(); intro(Math.min(PG.un, C.LEVELS.length)); };
  $('bLevels').onclick = () => { audio(); SFX.click(); levels(); }; $('bShop').onclick = () => { audio(); SFX.click(); shop(); }; $('bShop2').onclick = shop;
  document.querySelectorAll('[data-back]').forEach(b => b.onclick = () => { SFX.click(); if (prevScreen === 'menu' || !prevScreen) { show('menu'); refreshMenu(); } else show(prevScreen); });
  document.querySelectorAll('[data-to]').forEach(b => b.onclick = () => { SFX.click(); b.dataset.to === 'levels' ? levels() : show(b.dataset.to); });
  $('bMenu').onclick = toMenu; $('bMute').onclick = $('bMute2').onclick = () => { audio(); setMute(!MUTE); };
  const nameIn = $('name'); nameIn.value = NAME; nameIn.placeholder = AR() ? 'اسمك' : 'Your name'; nameIn.oninput = () => { NAME = nameIn.value.trim().slice(0, 16); LS.set('sh_name', NAME); };
  const paintSw = () => { $('sw').style.background = `hsl(${HUE},80%,60%)`; }; $('sw').onclick = () => { HUE = (HUE + 47) % 360; LS.set('sh_hue', HUE); paintSw(); }; paintSw();
  function applyLang() { const h = document.documentElement; h.lang = LANG; h.dir = AR() ? 'rtl' : 'ltr'; document.querySelectorAll('[data-i]').forEach(e => e.textContent = tr(e.dataset.i)); $('lang').textContent = AR() ? 'English' : 'العربية'; nameIn.placeholder = AR() ? 'اسمك' : 'Your name'; refreshMenu(); }
  $('lang').onclick = () => { LANG = AR() ? 'en' : 'ar'; LS.set('sh_lang', LANG); applyLang(); if (curScreen === 'levels') levels(); if (curScreen === 'shop') shop(); };
  /* ---------------- duels by link ---------------- */
  const NET = { ws: null, me: null, code: null, room: null, res: null, sentB: 0, t: 0, opp: new Map() };
  const link = code => location.origin + location.pathname.replace(/[^/]*$/, '') + '?r=' + code;
  const netSend = m => { if (NET.ws && NET.ws.readyState === 1) NET.ws.send(JSON.stringify(m)); };
  function connect(code) {
    if (NET.ws) try { NET.ws.close(); } catch (e) { } audio(); show('lobby'); $('lbCode').textContent = code || '·····'; $('lbWait').textContent = tr('connecting'); $('lbPlayers').innerHTML = '';
    const nm = NAME || (AR() ? 'رامي' : 'Archer'); const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/sh/ws?t=' + TOK + '&n=' + encodeURIComponent(nm) + '&h=' + HUE + '&lv=' + Math.min(PG.un, C.LEVELS.length) + (code ? '&r=' + code : ''));
    NET.ws = ws; ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } onNet(m); }; ws.onclose = () => { if (NET.ws === ws) NET.ws = null; };
  }
  function leaveDuel() { const ws = NET.ws; NET.ws = null; NET.room = null; NET.code = null; if (ws) try { ws.close(); } catch (e) { } history.replaceState(null, '', location.pathname); }
  function onNet(m) {
    if (m.t === 'hello') { NET.me = m.me; NET.code = m.code; history.replaceState(null, '', '?r=' + m.code); $('lbCode').textContent = m.code; return; }
    if (m.t === 'err') { if (m.e === 'nowin') return; toast(tr(m.e)); setTimeout(toMenu, 1200); return; }
    if (m.t === 'room') { const prev = NET.room; NET.room = m;
      if (m.state === 'duel' && (!R || R.mode !== 'duel' || (prev && prev.at !== m.at))) { NET.opp.clear(); for (const p of m.players) if (p.id !== NET.me) NET.opp.set(p.id, { n: p.n, h: p.h, hp: 1, sw: 0, out: 0 }); NET.sentB = 0; startRun(m.lv, 'duel', m); renderOpp(); return; }
      if (m.state === 'lobby') { if (R) endRun(); lobby(); } return; }
    if (m.t === 'pl') { const o = NET.opp.get(m.id); if (o) { o.hp = m.hp; o.sw = m.sw; o.out = m.out; renderOpp(); } return; }
    if (m.t === 'atk') { if (R && R.mode === 'duel' && !R.end) { const n = Math.max(1, Math.round(m.n * .5)), rep = C.repair(R.st, n); for (const i of rep) { const [x, y] = fortCellXY(R.st, i); burst(x, y, 4, '#ffe6a6', 10, .6, -10, .6); } if (rep.length) { SFX.repair(); const o = NET.opp.get(m.from); if (gate('reptoast', 2500)) toast(tr('repaired', o ? o.n : '')); } } return; }
    if (m.t === 'emo') { const pl = NET.room && NET.room.players.find(p => p.id === m.id), d = document.createElement('div'); d.innerHTML = m.e + '<small>' + esc(pl ? pl.n : '') + '</small>'; d.style.left = (15 + Math.random() * 70) + '%'; $('emof').appendChild(d); setTimeout(() => d.remove(), 2500); return; }
    if (m.t === 'res') { NET.res = m.res; setTimeout(() => { if (R) endRun(); results(m.res); }, R && R.end === 1 ? 1200 : 300); }
  }
  function netTick() { const now = performance.now(); if (now - NET.t < 400 || R.t0 > now || R.out) return; NET.t = now; const st = R.st, b = st.broke - NET.sentB; NET.sentB = st.broke; netSend({ t: 'st', hp: +(st.fort.coreHp / st.fort.core0).toFixed(3), sw: Math.round(C.swarm(st)), b: Math.min(40, b) }); }
  function renderOpp() { $('opp').innerHTML = [...NET.opp.values()].map(o => `<div style="border-color:hsl(${o.h},80%,60%)">${esc(o.n)} · ☄${fmt(o.sw)}${o.out ? ' ✖' : ''}<i><u style="width:${(o.hp * 100).toFixed(0)}%"></u></i></div>`).join(''); }
  function lobby() { const r = NET.room; if (!r) return; show('lobby'); const host = r.host === NET.me, hn = (r.players.find(p => p.id === r.host) || {}).n || '', L = C.LEVELS[r.lv - 1];
    $('lbCode').textContent = r.code; $('lbPlayers').innerHTML = r.players.map(p => `<li class="${p.id === NET.me ? 'mine' : ''}"><i style="background:hsl(${p.h},80%,60%)"></i>${esc(p.n)}${p.id === NET.me ? ' (' + tr('you') + ')' : ''}${p.id === r.host ? ' 👑' : ''}<b>${p.on ? '●' : '○'}</b></li>`).join('');
    $('lbLevel').innerHTML = `${ICON[r.lv - 1]} ${tr('lvl', r.lv)} · ${esc(N(L))}<small>${tr('fair')}</small>`; $('lvPrev').disabled = $('lvNext').disabled = !host; $('bStart').classList.toggle('hide', !host); $('lbWait').textContent = host ? tr('youHost') : tr('waitHost', hn); }
  function results(res) { show('res'); const mine = res.find(x => x.id === NET.me), host = NET.room && NET.room.host === NET.me, w = res.find(x => x.time);
    $('rT').textContent = mine && mine.time ? tr('youWin') : w ? tr('wonBy', w.n) : tr('draw'); if (mine && mine.time) { PG.wins++; PG.coins += 40; saveP(); SFX.win(); }
    $('rList').innerHTML = res.map(x => `<li class="${x.id === NET.me ? 'mine' : ''}"><small>${x.place}</small><i style="background:hsl(${x.h},80%,60%)"></i>${esc(x.n)}<b>${x.time ? x.time + 's 🏆' : tr('heartPct', x.hp)}</b></li>`).join('');
    $('bAgain').classList.toggle('hide', !host); $('rWait').textContent = host ? '' : tr('waitHost', (NET.room && (NET.room.players.find(p => p.id === NET.room.host) || {}).n) || ''); }
  $('bDuel').onclick = () => connect(null);
  $('lvPrev').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv > 1 ? r.lv - 1 : C.LEVELS.length }); }; $('lvNext').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv < C.LEVELS.length ? r.lv + 1 : 1 }); };
  $('bStart').onclick = () => netSend({ t: 'go' }); $('bAgain').onclick = () => netSend({ t: 'again' }); $('bLeave').onclick = $('bRLeave').onclick = toMenu;
  const inviteText = () => tr('inviteText', NET.code || '');
  $('bWa').onclick = () => window.open('https://wa.me/?text=' + encodeURIComponent(inviteText() + ' ' + link(NET.code)), '_blank');
  $('bShare').onclick = async () => { try { if (navigator.share) { await navigator.share({ title: 'شُهُب', text: inviteText(), url: link(NET.code) }); return; } } catch (e) { return; } try { await navigator.clipboard.writeText(inviteText() + ' ' + link(NET.code)); toast(tr('copied')); } catch (e) { } };
  $('bCopy').onclick = async () => { try { await navigator.clipboard.writeText(link(NET.code)); toast(tr('copied')); } catch (e) { prompt('', link(NET.code)); } };
  document.querySelectorAll('#emo button').forEach(b => b.addEventListener('pointerdown', e => { e.stopPropagation(); netSend({ t: 'emo', e: b.textContent }); }));
  /* ---------------- boot ---------------- */
  addEventListener('resize', resize); resize(); setMute(MUTE); applyLang(); show('menu'); requestAnimationFrame(frame);
  const qr = new URLSearchParams(location.search).get('r'); if (qr) setTimeout(() => connect(qr.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5)), 60);
  window.SH_DEBUG = { C, PG, run: () => R, NET, startRun, levels, intro, shop, connect, input, toMenu, finishRun };
})();
