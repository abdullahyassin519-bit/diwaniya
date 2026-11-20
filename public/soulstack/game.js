/* SOULSTACK client — canvas renderer, slingshot controls, live shared tower, menus, share card, Arabic/English. */
(() => {
  'use strict';
  const C = window.SSC, $ = id => document.getElementById(id);
  const cv = $('c'), g = cv.getContext('2d');

  /* ---------------- i18n ---------------- */
  const TXT = {
    en: {
      tag: 'Every fall builds the way up.', play: "Climb today's tower", how: 'How it works', board: 'Leaderboard', practice: 'Practice tower (no souls spent)',
      foot: 'A new tower rises for the whole world every day at 00:00 UTC.', go: 'Got it', back: 'Back', tH: 'Highest', tHelp: 'Most helpful',
      h1t: 'Drag back, release to leap', h1: "Pull anywhere on the screen like a slingshot. The dotted arc shows where you'll land.",
      h2t: 'Your body becomes a step — for everyone', h2: 'When you die, you crystallise where you fell, with your name on it. Every player in the world can stand on you for the rest of the day. Fall on spikes and your body covers them.',
      h3t: 'Sacrifice to build', h3: 'Some gaps are too high for anyone. Leap, then press Sacrifice at the top of the jump: you become the step you need, and respawn at the last camp.',
      h4t: '25 souls a day', h4: 'Each death spends a soul. Climb as high as you can — and see how many strangers your body lifted.',
      overT: 'Your souls are spent', overS: 'Your bodies stay in the tower until tomorrow, lifting everyone who comes after you.',
      bodies: 'bodies left', lifted: 'climbers lifted', next: 'next tower', share: 'Share my tower', sac: 'SACRIFICE',
      cBodies: '{0} bodies in today\'s tower', cTop: 'highest: {0} m', cNow: '{0} climbing now', cSouls: 'your souls: {0}', cLift: 'you lifted {0}', offline: 'offline — practice only',
      playSub: '{0} souls left · camp {1}', playDone: 'souls spent — back tomorrow', best: 'best {0} m', world: 'world {0} m',
      hintDrag: 'Drag back & release to leap', hintSac: 'Too high? Leap, then press ☠ at the top', camp: 'Camp {0}', campS: 'you will return here when you fall',
      dSac: 'You became a step', dSpike: 'Your body covers the spikes now', dSaw: 'Cut down — but you remain', dMon: 'Taken by the tower',  dSub: '{0} souls left · everyone can stand on you',
      onBody: 'Standing on {0}', onBodyS: '{0} climbers stood here', fell: '<b>{0}</b> fell at {1} m', noSouls: 'No souls left today', empty: 'No one yet — be the first',
      shareText: 'I fell at {0} m in today\'s SOULSTACK tower. My body lifted {1} climbers. Stand on me:', copied: 'Link copied', practiceOn: 'PRACTICE', you: 'you', name0: 'Wanderer',
      newBest: 'New personal record!', newBestS: 'past your {0} m', mileS: 'keep climbing', skip: 'Skip', learn: 'Learn in 30 seconds',
      t1: 'Drag back & release to leap onto the ledge', t2: 'Too high for anyone. Leap straight up, then press ☠ at the top', t3: 'That crystal is you. Now jump onto yourself',
      t4: 'Today, anyone in the world can stand on you too. Reach the gate', t5: 'You\'re ready. Every fall builds the way up', gate: 'GATE',
      cardFell: 'I fell at', cardLift: 'my body lifted {0} climbers', cardBodies: '{0} bodies in today\'s tower', cardCta: 'every fall builds the way up', m: 'm',
      cBodies1: '1 body in today\'s tower', onBodyS1: '1 climber stood here', cardLift1: 'my body lifted 1 climber', cardBodies1: '1 body in today\'s tower', cLift1: 'you lifted 1', dSub1: '1 soul left · everyone can stand on you',
    },
    ar: {
      tag: 'كل سقطة تبني طريق الصعود.', play: 'اصعد برج اليوم', how: 'كيف تلعب', board: 'المتصدّرون', practice: 'برج تدريب (بلا أرواح)',
      foot: 'برج جديد يرتفع للعالم كله كل يوم الساعة 00:00 بتوقيت غرينتش.', go: 'فهمت', back: 'رجوع', tH: 'الأعلى', tHelp: 'الأكثر مساعدة',
      h1t: 'اسحب للخلف وأفلت لتقفز', h1: 'اسحب من أي مكان في الشاشة كالمقلاع. القوس المنقّط يريك أين ستهبط.',
      h2t: 'جسدك يصبح درجة — للجميع', h2: 'عندما تموت تتحوّل إلى بلّورة في مكان سقوطك وعليها اسمك. كل لاعب في العالم يستطيع الوقوف عليك حتى نهاية اليوم. وإن سقطت على الأشواك يغطيها جسدك.',
      h3t: 'ضحِّ لتبني', h3: 'بعض الفجوات أعلى من قفزة أي أحد. اقفز ثم اضغط «تضحية» في أعلى القفزة: تصبح أنت الدرجة التي تحتاجها، وتعود عند آخر مخيّم.',
      h4t: '25 روحاً في اليوم', h4: 'كل موت يكلّفك روحاً. اصعد أعلى ما تستطيع — وانظر كم غريباً رفعه جسدك.',
      overT: 'نفدت أرواحك', overS: 'أجسادك تبقى في البرج حتى الغد، ترفع كل من يأتي بعدك.',
      bodies: 'جسداً تركت', lifted: 'متسلّقاً رفعت', next: 'البرج القادم', share: 'شارك برجي', sac: 'تضحية',
      cBodies: '{0} جسداً في برج اليوم', cTop: 'الأعلى: {0} م', cNow: '{0} يتسلّقون الآن', cSouls: 'أرواحك: {0}', cLift: 'رفعتَ {0}', offline: 'بلا اتصال — تدريب فقط',
      playSub: 'بقي {0} روحاً · المخيّم {1}', playDone: 'نفدت الأرواح — عُد غداً', best: 'أفضل {0} م', world: 'العالم {0} م',
      hintDrag: 'اسحب للخلف وأفلت لتقفز', hintSac: 'عالية جداً؟ اقفز ثم اضغط ☠ في الأعلى', camp: 'المخيّم {0}', campS: 'ستعود إلى هنا إن سقطت',
      dSac: 'أصبحتَ درجة', dSpike: 'جسدك يغطي الأشواك الآن', dSaw: 'سقطتَ — لكنك باقٍ', dMon: 'التهمك البرج',  dSub: 'بقي {0} روحاً · الجميع يستطيع الوقوف عليك',
      onBody: 'تقف على {0}', onBodyS: 'وقف هنا {0} متسلّقاً', fell: 'سقط <b>{0}</b> عند {1} م', noSouls: 'لا أرواح متبقية اليوم', empty: 'لا أحد بعد — كن الأول',
      shareText: 'سقطتُ عند {0} م في برج SOULSTACK اليوم، وجسدي رفع {1} متسلّقاً. قِف عليّ:', copied: 'نُسخ الرابط', practiceOn: 'تدريب', you: 'أنت', name0: 'عابر',
      newBest: 'رقم شخصي جديد!', newBestS: 'تجاوزتَ {0} م', mileS: 'واصل الصعود', skip: 'تخطٍّ', learn: 'تعلّم في 30 ثانية',
      t1: 'اسحب للخلف وأفلت لتقفز إلى الحافة', t2: 'عالية على أي أحد. اقفز للأعلى ثم اضغط ☠ في القمة', t3: 'تلك البلّورة هي أنت. اقفز الآن فوق نفسك',
      t4: 'اليوم يستطيع أي شخص في العالم أن يقف عليك أيضاً. اصعد إلى البوابة', t5: 'أنت جاهز. كل سقطة تبني طريق الصعود', gate: 'البوابة',
      cardFell: 'سقطتُ عند', cardLift: 'جسدي رفع {0} متسلّقاً', cardBodies: '{0} جسداً في برج اليوم', cardCta: 'كل سقطة تبني طريق الصعود', m: 'م',
      cBodies1: 'جسد واحد في برج اليوم', onBodyS1: 'وقف هنا متسلّق واحد', cardLift1: 'جسدي رفع متسلّقاً واحداً', cardBodies1: 'جسد واحد في برج اليوم', cLift1: 'رفعتَ واحداً', dSub1: 'بقيت روح واحدة · الجميع يستطيع الوقوف عليك',
    },
  };
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  let LANG = LS.get('ss_lang', (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en');
  const tr = (k, ...a) => { if (a[0] === 1 && (TXT[LANG][k + '1'] || TXT.en[k + '1'])) k = k + '1'; let s = (TXT[LANG][k] != null ? TXT[LANG][k] : TXT.en[k]) || k; a.forEach((v, i) => { s = s.split('{' + i + '}').join(v); }); return s; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- identity ---------------- */
  let TOK = LS.get('ss_t'); if (!TOK) { TOK = 'ss' + Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join(''); LS.set('ss_t', TOK); }
  const HUES = [192, 275, 330, 22, 48, 140, 0, 218, 300, 165];
  let NAME = LS.get('ss_name', ''), HUE = LS.get('ss_hue', HUES[Math.floor(Math.random() * HUES.length)]);
  if (!NAME) { NAME = tr('name0') + ' ' + (1000 + Math.floor(Math.random() * 9000)); LS.set('ss_name', NAME); } LS.set('ss_hue', HUE);

  /* ---------------- state ---------------- */
  const S = {
    mode: 'boot', practice: false, online: false, day: C.dayKey(), seed: 0, world: null, blocks: new Map(), byRow: new Map(), byId: new Map(),
    me: null, souls: C.SOULS, best: 0, helped: 0, total: 0, frontier: 0, climbers: 0, seq: 0, skew: 0, mine: 0,
    P: null, cp: null, stepped: new Set(), steps: [], cam: { b: 0, shake: 0 }, aim: null, parts: [], floats: [], deadT: 0, lastProg: 0, lid: 0, runBest: 0,
    attract: 0, saved: null, mute: LS.get('ss_mute', false), hinted: LS.get('ss_hinted', 0),
    rings: [], soul: null, flash: 0, hitstop: 0, buf: null, pred: null, kaim: { a: Math.PI / 2, p: .8 }, kb: false, recordFrom: 0, recordShown: false, mile: 0, tut: 0,
  };
  /* accessibility: honour the OS reduced-motion setting (no shake, flashes, parallax or heavy particles) */
  const RMQ = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false }; const RM = () => RMQ.matches;
  S.cam.x = 7;
  /* extension hooks used by modes.js (trials, races, monsters, pickups) */
  const HK = { step: [], tick: [], drawWorld: [], drawTop: [], land: [], die: [], respawn: [], hud: [], menu: [], spawn: [], airLeap: [] };
  const runHooks = (k, ...a) => { let r; for (const f of HK[k]) { const v = f(...a); if (v !== undefined) r = v; } return r; };
  const now = () => performance.now();
  const wclock = () => (Date.now() + S.skew) / 1000;
  function addBlock(a, fromNet) {
    const b = Array.isArray(a) ? { i: a[0], x: a[1], y: a[2], n: a[3], h: a[4], s: a[5], c: a[6], o: a[7] } : a;
    const k = C.bkey(b.x, b.y), old = S.blocks.get(k); if (old && old.i === b.i) { old.s = b.s; return old; }
    if (b.i != null && S.byId.has(b.i)) return S.byId.get(b.i);
    b.born = fromNet && S.seq ? now() : (b.born || now() - 9e3); S.blocks.set(k, b); if (b.i != null) S.byId.set(b.i, b);
    let r = S.byRow.get(b.y); if (!r) S.byRow.set(b.y, r = []); r.push(b); return b;
  }
  function moveBlock(b, x, y) { const r = S.byRow.get(b.y); if (r) r.splice(r.indexOf(b), 1); S.blocks.delete(C.bkey(b.x, b.y)); b.x = x; b.y = y; S.blocks.set(C.bkey(x, y), b); let q = S.byRow.get(y); if (!q) S.byRow.set(y, q = []); q.push(b); }

  /* ---------------- network ---------------- */
  async function api(path, body) {
    const r = await fetch('/ss/api/' + path + (path.includes('?') ? '&' : '?') + 't=' + TOK, body ? { method: 'POST', body: JSON.stringify(Object.assign({ day: S.day, n: NAME, h: HUE }, body)) } : undefined);
    const j = await r.json().catch(() => ({})); j._code = r.status; return j;
  }
  function absorb(j) {
    const newDay = !S.me || (j.day && j.day !== S.day); if (j.day && j.day !== S.day) { S.day = j.day; S.seq = 0; S.blocks.clear(); S.byRow.clear(); S.byId.clear(); S.best = 0; }
    if (!S.world || S.seed !== j.seed) { S.seed = j.seed; if (!S.practice) S.world = C.World(j.seed); }
    S.me = j.me; S.skew = j.now - Date.now(); S.souls = newDay ? j.souls : Math.min(S.souls, j.souls); /* souls only go down within a day: a poll that raced a death can't give one back */ S.best = Math.max(S.best, j.best); S.helped = j.helped; S.total = j.total; S.frontier = j.frontier; S.climbers = j.climbers; S.mine = j.mine;
    for (const a of j.blocks) { const nb = !S.blocks.has(C.bkey(a[1], a[2])) && !S.byId.has(a[0]); const b = addBlock(a, true); if (nb && S.seq && b.o !== S.me && S.mode === 'play' && !S.practice) feed(tr('fell', esc(b.n), b.y)); }
    S.seq = Math.max(S.seq, j.seq); S.online = true;
  }
  async function sync(full) {
    try { let j; do { j = await api('state?since=' + (full ? 0 : S.seq)); if (j._code !== 200) throw 0; absorb(j); full = false; } while (j.more); }
    catch (e) { S.online = false; }
    refreshMenu();
  }
  setInterval(() => { if (!document.hidden && !S.practice) sync(false); }, 4000);
  async function prog(force) {
    if (S.practice || !S.online) return; const t = now(); if (!force && t - S.lastProg < 5000) return; S.lastProg = t;
    const steps = S.steps.splice(0); try { const j = await api('prog', { best: S.best, steps }); if (j._code === 200) { S.helped = j.helped; S.souls = j.souls; } else S.steps.push(...steps); } catch (e) { S.steps.push(...steps); }
  }

  /* ---------------- audio (synthesised, no files) ---------------- */
  let AC = null, master = null, wind = null;
  function audio() {
    if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
    try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = AC.createGain(); master.gain.value = S.mute ? 0 : .8; master.connect(AC.destination);
    const len = AC.sampleRate * 2, buf = AC.createBuffer(1, len, AC.sampleRate), d = buf.getChannelData(0); let l = 0; for (let i = 0; i < len; i++) { l = (l + .02 * (Math.random() * 2 - 1)) / 1.02; d[i] = l * 3.5; }
    const src = AC.createBufferSource(); src.buffer = buf; src.loop = true; const f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500; wind = AC.createGain(); wind.gain.value = .05; src.connect(f).connect(wind).connect(master); src.start(); wind.f = f;
    AC.noise = buf; music();
  }
  function tone(freq, dur, type = 'sine', vol = .2, slide = 0, delay = 0) { if (!AC) return; const t = AC.currentTime + delay, o = AC.createOscillator(), v = AC.createGain(); o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t + dur); v.gain.setValueAtTime(0, t); v.gain.linearRampToValueAtTime(vol, t + .012); v.gain.exponentialRampToValueAtTime(.0008, t + dur); o.connect(v).connect(master); o.start(t); o.stop(t + dur + .05); }
  function noise(dur, f0, f1, vol = .25, q = 1.2) { if (!AC) return; const t = AC.currentTime, s = AC.createBufferSource(), fl = AC.createBiquadFilter(), v = AC.createGain(); s.buffer = AC.noise; fl.type = 'bandpass'; fl.Q.value = q; fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur); v.gain.setValueAtTime(vol, t); v.gain.exponentialRampToValueAtTime(.001, t + dur); s.connect(fl).connect(v).connect(master); s.start(t, Math.random()); s.stop(t + dur); }
  const SFX = {
    leap: p => { noise(.28, 400, 2400 + p * 1600, .22 * p + .05); tone(220 + p * 180, .18, 'triangle', .05, 1.6); },
    land: v => { noise(.12, 260, 90, Math.min(.35, .08 + v * .1), .8); tone(90, .12, 'sine', Math.min(.25, .05 + v * .06), .6); },
    sac: () => { [261.6, 329.6, 392, 523.3].forEach((f, i) => tone(f, 1.8, 'sine', .07, .5, i * .04)); noise(1.2, 3000, 300, .12, .6); },
    spike: () => { noise(.25, 1800, 300, .3, .9); tone(140, .3, 'sawtooth', .08, .4); SFX.sac(); },
    chime: () => { const s = [523.3, 587.3, 659.3, 784, 880]; tone(s[Math.floor(Math.random() * 5)], 1.2, 'sine', .08); tone(1046.5, .9, 'sine', .03, 1, .05); },
    camp: () => { [196, 246.9, 293.7, 392].forEach((f, i) => tone(f, 2.2, 'triangle', .05, 1, i * .09)); },
    bonk: () => tone(180, .08, 'square', .03, .7),
    tick: () => tone(880, .05, 'sine', .04),
    record: () => { [523.3, 659.3, 784, 1046.5].forEach((f, i) => tone(f, .9, 'triangle', .07, 1, i * .09)); tone(1318.5, 1.4, 'sine', .04, 1, .4); },
  };
  /* generative score: a slow minor progression with a soft arpeggio that opens up as you climb */
  let musT = null, musStep = 0, musNext = 0, musG = null; const PROG = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  function pad(f, at, dur) { const o = AC.createOscillator(), o2 = AC.createOscillator(), lp = AC.createBiquadFilter(), v = AC.createGain(); o.type = o2.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f * 1.004; lp.type = 'lowpass'; lp.frequency.value = 700 + Math.min(1600, Math.max(0, S.cam.b) * 6); v.gain.setValueAtTime(0, at); v.gain.linearRampToValueAtTime(.022, at + 1.4); v.gain.linearRampToValueAtTime(0, at + dur); o.connect(lp); o2.connect(lp); lp.connect(v).connect(musG); o.start(at); o2.start(at); o.stop(at + dur + .1); o2.stop(at + dur + .1); }
  function pluck(f, at) { const o = AC.createOscillator(), v = AC.createGain(); o.type = 'sine'; o.frequency.value = f; v.gain.setValueAtTime(0, at); v.gain.linearRampToValueAtTime(.03, at + .01); v.gain.exponentialRampToValueAtTime(.0005, at + 1.1); o.connect(v).connect(musG); o.start(at); o.stop(at + 1.2); }
  function music() {
    if (!AC || musT) return; musG = AC.createGain(); musG.gain.value = .9; musG.connect(master); musNext = AC.currentTime + .2;
    musT = setInterval(() => { if (!AC || document.hidden) return; if (musNext < AC.currentTime) musNext = AC.currentTime + .1; while (musNext < AC.currentTime + .7) { const ch = PROG[Math.floor(musStep / 8) % 4], st = musStep % 8, lift = Math.min(1, Math.max(0, S.cam.b) / 150);
      if (st === 0) ch.forEach(m => pad(mtof(m - 12), musNext, 4.6)); if (Math.random() < .45 + lift * .45) pluck(mtof(ch[[0, 1, 2, 1, 2, 0, 1, 2][st]] + 12 + (st > 4 && lift > .4 ? 12 : 0)), musNext);
      musNext += .58; musStep++; } }, 200);
  }
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { } };

  /* ---------------- view ---------------- */
  let DPR = 1, VW = 0, VH = 0;
  function resize() { DPR = Math.min(2, window.devicePixelRatio || 1); VW = Math.round(innerWidth * DPR); VH = Math.round(innerHeight * DPR); cv.width = VW; cv.height = VH; }
  addEventListener('resize', resize); resize();
  const ZOOM = 1.34;
  function view(W, H, wide) {
    let tw = Math.min(W, H * (wide || .7)), t = tw / 14, ox = (W - tw) / 2;
    if (!wide && W < H * .8 && (S.mode === 'play' || S.mode === 'dead' || S.mode === 'cd')) { t = W / 14 * ZOOM; tw = 14 * t; const half = W / 2 / t, cx = Math.max(half, Math.min(14 - half, S.cam.x)); ox = W / 2 - cx * t; }
    return { W, H, tw, t, ox };
  }

  /* ---------------- effects ---------------- */
  function burst(x, y, n, hue, sp = 5, life = .9, up = 2) { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = Math.random() * sp; S.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v + up, l: life * (.5 + Math.random() * .7), m: life, h: hue, s: .05 + Math.random() * .09 }); } }
  function floatText(x, y, txt, col) { S.floats.push({ x, y, txt, col, l: 1.8 }); }
  let toastT = 0; function toast(a, b) { const e = $('toast'); e.innerHTML = esc(a) + (b ? '<small>' + esc(b) + '</small>' : ''); e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove('on'), 2200); }
  function feed(html) { const f = $('feed'), d = document.createElement('div'); d.innerHTML = html; f.appendChild(d); while (f.children.length > 3) f.firstChild.remove(); setTimeout(() => d.remove(), 6200); }
  function hint(txt) { const e = $('hint'); if (!txt) { e.classList.add('hide'); return; } e.textContent = txt; e.classList.remove('hide'); }

  /* ---------------- game flow ---------------- */
  function spawn() {
    const cp = S.cp || S.world.cps[0]; S.P = { x: cp.x, y: cp.y + 1, vx: 0, vy: 0, gr: 1, air: 0, sq: 0, face: 1 };
    runHooks('spawn', S.P); S.mode = 'play'; if (!S.soul) S.cam.x = S.P.x; S.cam.b = S.P.y - (VH / view(VW, VH).t) * .32; S.soul = null;
  }
  function startDaily() {
    if (!S.online) { startPractice(); return; }
    if (S.souls <= 0) { showOver(); return; }
    S.practice = false; S.world = C.World(S.seed); const saved = LS.get('ss_cp_' + S.day, 0); S.world.ensure((S.world.cps[saved] || { y: 0 }).y + 40);
    S.cp = S.world.cps[Math.min(saved, S.world.cps.length - 1)] || S.world.cps[0]; S.runBest = 0; S.recordFrom = S.best; S.recordShown = false; S.mile = Math.floor(S.best / 25) * 25; enterGame(); spawn();
    if (S.hinted < 1) hint(tr('hintDrag'));
  }
  function startPractice() {
    S.saved = S.practice ? S.saved : { blocks: S.blocks, byRow: S.byRow, byId: S.byId };
    S.practice = true; S.world = C.World((Math.random() * 4e9) >>> 0); S.blocks = new Map(); S.byRow = new Map(); S.byId = new Map(); S.cp = S.world.cps[0]; enterGame(); spawn(); hint(tr('hintDrag'));
  }
  /* ---------------- interactive tutorial: the whole idea in 30 seconds ---------------- */
  function TutWorld() {
    const rows = new Map(), add = (y, x0, x1, cp) => { const sg = { y, x0, x1, cp, chain: true }; if (!rows.has(y)) rows.set(y, []); rows.get(y).push(sg); return sg; };
    const n0 = add(0, 1, 12, 0), n1 = add(3, 4, 9, 1), n2 = add(10, 5, 8, 0); n2.goal = 1; n2.chasm = true;
    const cps = [{ y: 0, x: 6.5, i: 0 }, { y: 3, x: 6.5, i: 1 }];
    return { seed: 1, nodes: [n0, n1, n2], saws: [], cps, spikes: new Set(), tut: 1, ensure() { }, top: () => 10, segs: y => rows.get(y) || [], spike: () => false, sawPos: () => 0,
      solidRow(y, x) { const a = rows.get(y); if (!a) return null; for (const sg of a) if (x >= sg.x0 && x <= sg.x1) return sg; return null; }, cpAt(y) { return y >= 3 ? cps[1] : cps[0]; } };
  }
  function startTutorial() {
    S.saved = S.practice ? S.saved : { blocks: S.blocks, byRow: S.byRow, byId: S.byId }; S.practice = true; S.tut = 1;
    S.world = TutWorld(); S.blocks = new Map(); S.byRow = new Map(); S.byId = new Map(); S.cp = S.world.cps[0]; enterGame(); spawn(); $('bSkip').classList.remove('hide'); tutStep(1);
  }
  function tutStep(n) {
    S.tut = n; hint(tr('t' + n)); $('hand').classList.toggle('hide', n !== 1); $('bSac').classList.toggle('pulse', n === 2);
    if (n === 5) { SFX.record(); if (!RM()) burst(S.P.x, S.P.y + 1, 50, 45, 7, 1.6, 4); LS.set('ss_tut', 1); setTimeout(() => { if (S.tut === 5) endTutorial(true); }, 2200); }
  }
  function endTutorial(play) { S.tut = 0; if (S.hinted < 1) { S.hinted = 1; LS.set('ss_hinted', 1); } $('bSkip').classList.add('hide'); $('hand').classList.add('hide'); $('bSac').classList.remove('pulse'); LS.set('ss_tut', 1); hint(null); toMenu(); if (play) startDaily(); }
  function tutLand(P) {
    if (!S.tut) return; const on = P.on, row = Math.round(P.y) - 1;
    if (S.tut === 1 && row === 3) tutStep(2);
    else if ((S.tut === 3 || S.tut === 2) && on && typeof on === 'object') tutStep(4);
    else if (S.tut >= 2 && row === 10) tutStep(5);
  }
  function leavePractice() { S.tut = 0; if (S.practice && S.saved) { S.blocks = S.saved.blocks; S.byRow = S.saved.byRow; S.byId = S.saved.byId; S.saved = null; } S.practice = false; if (S.seed) S.world = C.World(S.seed); }
  function enterGame() { audio(); show(null); $('lang').classList.add('hide'); $('hud').classList.remove('hide'); updHud(); }
  function toMenu() { $('bSkip').classList.add('hide'); $('hand').classList.add('hide'); $('bSac').classList.remove('pulse'); $('lang').classList.remove('hide'); prog(true); if (S.practice) leavePractice(); S.mode = 'menu'; $('hud').classList.add('hide'); hint(null); runHooks('menu'); show('menu'); refreshMenu(); }

  function die(cause, d) {
    if (S.mode !== 'play') return; const P = S.P;
    if (!S.practice && S.souls <= 0) { toast(tr('noSouls')); return; }
    const cell = cause === 'spike' && !S.blocks.has(C.bkey(d.x, d.y)) ? { x: d.x, y: d.y } : C.bodyCell(S.world, S.blocks, d);
    const b = addBlock({ i: 'L' + (++S.lid), x: cell.x, y: cell.y, n: NAME, h: HUE, s: 0, c: cause, o: S.me || 'me', born: now(), local: 1 });
    if (!S.practice) S.souls--; S.mode = 'dead'; S.deadAt = { x: P.x, y: P.y };
    const cp = S.cp || S.world.cps[0], dist = Math.hypot(cp.x - P.x, cp.y + 1 - P.y);
    S.soul = { x0: P.x, y0: P.y + .5, x1: cp.x, y1: cp.y + 1.5, t: -.55, T: Math.max(.9, Math.min(2.2, .7 + dist * .045)) }; S.deadT = S.soul.T + .55;
    S.hitstop = RM() ? 0 : .12; S.flash = RM() ? 0 : .55; S.live && (S.live.textContent = tr(cause === 'sac' ? 'dSac' : cause === 'spike' ? 'dSpike' : 'dSaw'));
    burst(P.x, P.y + .45, RM() ? 14 : 46, HUE, 7, 1.1, 1); burst(cell.x + .5, cell.y + .5, RM() ? 8 : 24, HUE, 3, 1.4, 0); S.cam.shake = RM() ? 0 : cause === 'sac' ? .25 : .5; buzz(cause === 'sac' ? 30 : 60);
    (cause === 'spike' ? SFX.spike : SFX.sac)(); if (cause === 'mon') SFX.monKill && SFX.monKill();
    if (runHooks('die', cause, cell) !== false) toast(tr(cause === 'sac' ? 'dSac' : cause === 'spike' ? 'dSpike' : cause === 'mon' ? 'dMon' : 'dSaw'), S.practice ? '' : tr('dSub', S.souls));
    if (!S.practice && S.online) api('die', { x: d.x, y: d.y, c: cause, best: S.best }).then(j => {
      if (j._code === 200) { const [i, x, y] = j.block; S.blocks.delete(C.bkey(b.x, b.y)); if (b.x !== x || b.y !== y) { S.blocks.set(C.bkey(b.x, b.y), b); moveBlock(b, x, y); } else S.blocks.set(C.bkey(x, y), b); b.i = i; delete b.local; S.byId.set(i, b); S.souls = j.souls; }
      else if (j._code === 403) S.souls = 0; updHud();
    }).catch(() => { });
    updHud(); prog(true);
  }
  function respawn() {
    if (!S.practice && S.souls <= 0) { S.mode = 'over'; $('hud').classList.add('hide'); $('lang').classList.remove('hide'); showOver(); return; }
    spawn(); burst(S.P.x, S.P.y + .4, 30, 40, 3, 1, 2); SFX.camp(); if (S.tut === 2) tutStep(3); runHooks('respawn');
  }
  function onLand(P) {
    const v = P.land || 0; P.sq = Math.min(.45, v * .5); S.rings.push({ x: P.x, y: P.y, l: .45 }); tutLand(P); runHooks('land', P); burst(P.x, P.y, 6 + Math.floor(v * 10), 260, 2.4, .5, 1.2); SFX.land(v); if (v > .5) buzz(10);
    const on = P.on;
    if (on && typeof on === 'object' && on !== 'p') {
      if (on.o !== S.me && !on.local && !S.stepped.has(on.i)) { S.stepped.add(on.i); if (!S.practice) S.steps.push(on.i); on.s = (on.s || 0) + 1; SFX.chime(); floatText(on.x + .5, on.y + 1.6, '♥ ' + on.n, on.h); toast(tr('onBody', on.n), tr('onBodyS', on.s)); prog(); }
    } else {
      const seg = S.world.solidRow(Math.round(P.y) - 1, Math.floor(P.x));
      if (seg && seg.cp && (!S.cp || seg.cp > S.cp.i)) { S.cp = S.world.cps[seg.cp]; if (!S.practice) LS.set('ss_cp_' + S.day, seg.cp); toast(tr('camp', seg.cp), tr('campS')); S.live.textContent = tr('camp', seg.cp); SFX.camp(); burst(P.x, P.y + .5, 40, 35, 4, 1.4, 3); prog(true); }
      // contextual hint: the next gap is a chasm
      if (!S.tut && S.hinted < 2 && seg && seg.chain) { const i = S.world.nodes.indexOf(seg), nx = S.world.nodes[i + 1]; if (nx && nx.chasm) { hint(tr('hintSac')); S.hinted = 2; LS.set('ss_hinted', 2); setTimeout(() => hint(null), 7000); } }
    }
  }
  function predict(P, dx, dy) { // the real physics, run ahead: where exactly will this leap land, and does it kill you?
    const Q = { x: P.x, y: P.y, vx: 0, vy: 0, gr: 1, air: 0, pow: P.pow }; if (!C.launch(Q, dx, dy)) return null;
    const pts = [], t0 = wclock(); let d = null;
    for (let k = 0; k < 200; k++) { d = C.step(S.world, S.blocks, Q, 1 / 60, t0 + k / 60); if (k % 2 === 0) pts.push([Q.x, Q.y]); if (d || Q.gr) break; }
    pts.push([Q.x, Q.y]); return { pts, land: !d && Q.gr ? { x: Q.x, y: Q.y, on: Q.on } : null, dead: d ? { x: Q.x, y: Q.y, c: d.cause } : null };
  }
  function leap(dx, dy) {
    const P = S.P, pw = Math.hypot(dx, dy); if (pw < .12) return false;
    if (!P.gr) { if (runHooks('airLeap', dx, dy)) return true; S.buf = { dx, dy, t: now() }; return false; } /* released a moment before landing: fire on touchdown */
    if (!C.launch(P, dx, dy)) return false;
    SFX.leap(pw); buzz(8); P.sq = -.2; burst(P.x, P.y, RM() ? 4 : 10, 260, 2.5, .5, .5); S.buf = null;
    if (S.hinted < 1) { S.hinted = 1; LS.set('ss_hinted', 1); if (!S.tut) hint(null); } return true;
  }
  function milestone(h) {
    if (S.practice) return;
    if (!S.recordShown && S.recordFrom >= 3 && h > S.recordFrom) { S.recordShown = true; toast(tr('newBest'), tr('newBestS', S.recordFrom)); SFX.record(); if (!RM()) for (let i = 0; i < 3; i++) burst(S.P.x, S.P.y + 1, 30, [45, 192, 330][i], 8, 1.6, 4); S.live && (S.live.textContent = tr('newBest')); return; }
    const m = Math.floor(h / 25) * 25; if (m > S.mile && m >= 25) { S.mile = m; toast(m + ' ' + tr('m'), tr('mileS')); SFX.tick(); }
  }
  function update(dt) {
    const P = S.P;
    if (S.hitstop > 0) { S.hitstop -= dt; dt = 0; } /* a beat of stillness on death */
    if (S.mode === 'play') {
      P.pvy = P.vy; P.py = P.y; const was = P.gr, d = C.step(S.world, S.blocks, P, dt, wclock()); /* pvy: speed just before landing, so a stomp still counts on the landing frame */
      if (P.bonk) { P.bonk = 0; SFX.bonk(); }
      if (!was && P.gr) { onLand(P); if (S.buf && now() - S.buf.t < 220 && S.mode === 'play') leap(S.buf.dx, S.buf.dy); S.buf = null; }
      if (!P.gr && Math.random() < (RM() ? .15 : .5)) S.parts.push({ x: P.x + (Math.random() - .5) * .3, y: P.y + .3, vx: 0, vy: .4, l: .5, m: .5, h: HUE, s: .04 });
      const h = Math.max(0, Math.floor(P.y - 1)); if (h > S.runBest) S.runBest = h; if (h > S.best) { S.best = h; } if (h > S.frontier && !S.practice) S.frontier = h; if (P.gr) milestone(h);
      runHooks('step', dt, P);
      if (d && S.mode === 'play') die(d.cause, d.cause === 'spike' ? { x: d.x, y: d.y } : C.sacCell(P));
      prog();
      S.pred = S.aim && P.gr ? predict(P, S.aim.dx, S.aim.dy) : null;
    } else if (S.mode === 'dead') {
      S.deadT -= dt; if (S.soul) { S.soul.t += dt; if (S.soul.t > 0 && Math.random() < .7) { const q = soulPos(); S.parts.push({ x: q.x + (Math.random() - .5) * .2, y: q.y, vx: (Math.random() - .5) * .6, vy: -.2, l: .7, m: .7, h: HUE, s: .06 }); } }
      if (S.deadT <= 0) respawn();
    }
    runHooks('tick', dt);
    P && (P.sq *= Math.pow(.02, dt));
    for (const p of S.parts) { p.l -= dt; p.vy -= 6 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= Math.pow(.3, dt); }
    S.parts = S.parts.filter(p => p.l > 0); if (S.parts.length > 900) S.parts.splice(0, S.parts.length - 900);
    for (const f of S.floats) { f.l -= dt; f.y += dt * .8; } S.floats = S.floats.filter(f => f.l > 0);
    for (const r of S.rings) r.l -= dt; S.rings = S.rings.filter(r => r.l > 0);
    S.cam.shake = Math.max(0, S.cam.shake - dt * 1.6); S.flash = Math.max(0, S.flash - dt * 2.2);
    const v = view(VW, VH), rows = VH / v.t, k = 1 - Math.exp(-dt * 4);
    if (S.mode === 'play' || S.mode === 'dead' || S.mode === 'cd') {
      let fy = P.y, fx = P.x;
      if (S.mode === 'dead' && S.soul) { const q = soulPos(); fy = q.y; fx = q.x; }
      else if (S.pred) { const e = S.pred.land || S.pred.dead || { x: P.x, y: P.y }; fy = P.y + Math.max(0, e.y - P.y) * .55; fx = (P.x + e.x) / 2; } /* look toward where you're aiming */
      S.cam.b += (fy - rows * .32 - S.cam.b) * k; S.cam.x += (fx - S.cam.x) * k;
    }
    else { S.attract += dt; const top = Math.max(40, Math.min(S.frontier + 12, 160)); S.cam.b = (top - rows * .6) * (.5 - .5 * Math.cos(S.attract * .045)); S.cam.x = 7; }
    if (wind) { const h = Math.max(0, S.cam.b); wind.gain.value = S.mute ? 0 : .03 + Math.min(.07, h / 3000); wind.f.frequency.value = 350 + Math.min(900, h * 2); }
    if (S.mode === 'play' || S.mode === 'dead' || S.mode === 'cd') updHud();
  }
  function soulPos() { const o = S.soul, u = Math.max(0, Math.min(1, o.t / o.T)), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2, cy = Math.max(o.y0, o.y1) + 2.5; return { x: o.x0 + (o.x1 - o.x0) * e, y: (1 - e) * (1 - e) * o.y0 + 2 * (1 - e) * e * cy + e * e * o.y1 }; }

  /* ---------------- renderer (also used for the share card) ---------------- */
  const hash = (a, b) => { let h = Math.imul(a, 374761393) + Math.imul(b, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  function sky(c, v, camB) {
    const H = v.H, k = Math.max(0, camB), t1 = Math.min(1, k / 120), t2 = Math.min(1, Math.max(0, (k - 120) / 200));
    const top = `hsl(${250 - t1 * 20 + t2 * 30},${55 - t1 * 10}%,${14 - t1 * 6}%)`, mid = `hsl(${280 - t1 * 40 - t2 * 60},${62}%,${24 - t1 * 11 + t2 * 3}%)`, bot = `hsl(${20 + t1 * 220 + t2 * 20},${75 - t1 * 30}%,${38 - t1 * 24}%)`;
    const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, top); gr.addColorStop(.6, mid); gr.addColorStop(1, bot); c.fillStyle = gr; c.fillRect(0, 0, v.W, H);
    // stars (fade in with height), parallax
    const sa = Math.min(1, .25 + k / 90); c.fillStyle = '#fff';
    for (let i = 0; i < 140; i++) { const sx = hash(i, 7) * v.W, sy = ((hash(i, 11) * H * 3 + camB * v.t * .08) % (H * 1.2)) - H * .1, tw = RM() ? .8 : .5 + .5 * Math.sin(now() / 700 + i); c.globalAlpha = sa * (.25 + .6 * hash(i, 3)) * tw; const r = (hash(i, 5) * 1.4 + .4) * (v.t / 30); c.fillRect(sx, H - sy, r, r); }
    c.globalAlpha = 1;
    // aurora above 120 m
    if (t2 > 0 || k > 90) { const a = Math.min(.5, (k - 90) / 200); c.globalCompositeOperation = 'lighter'; for (let j = 0; j < 3; j++) { c.beginPath(); for (let x = 0; x <= v.W; x += v.W / 24) { const y = H * (.18 + .08 * j) + Math.sin(x / v.W * 6 + now() / 2600 + j) * H * .05; x ? c.lineTo(x, y) : c.moveTo(x, y); } c.strokeStyle = `hsla(${150 + j * 40},90%,60%,${a * .35})`; c.lineWidth = v.t * (1.6 - j * .3); c.stroke(); } c.globalCompositeOperation = 'source-over'; }
    // distant mountains near the ground
    if (camB < 60) { const base = H + camB * v.t * .25; for (let L = 0; L < 2; L++) { c.fillStyle = L ? '#1a1236' : '#24184a'; c.beginPath(); c.moveTo(0, H); for (let x = 0; x <= v.W; x += v.W / 20) c.lineTo(x, base - v.t * (3 + L * 2) - hash(Math.floor(x / (v.W / 20)), L + 1) * v.t * (4 + L * 3)); c.lineTo(v.W, H); c.fill(); } }
  }
  function draw(c, v, camB, opt = {}) {
    const { t, ox, H } = v, sy = y => H - (y - camB) * t, sx = x => ox + x * t, w = S.world; if (!w) return;
    const shake = opt.card ? 0 : S.cam.shake; if (shake) { c.save(); c.translate((Math.random() - .5) * shake * t, (Math.random() - .5) * shake * t); }
    sky(c, v, camB);
    const y0 = Math.floor(camB) - 2, y1 = Math.ceil(camB + H / t) + 2; w.ensure(y1);
    // outer cliffs and walls
    if (ox > 4) { // the world outside: distant spires of other towers with a few lights, parallax
      for (let i = 0; i < 9; i++) { const side = i % 2, px = side ? ox + v.tw + (hash(i, 9) * .9 + .05) * (v.W - ox - v.tw) : hash(i, 9) * .9 * ox, sw = t * (1.2 + hash(i, 4) * 2.2), top = H * (.15 + hash(i, 8) * .5) + camB * t * (.12 + hash(i, 6) * .1);
        c.fillStyle = `hsl(${255 + hash(i, 2) * 20},30%,${7 + hash(i, 3) * 5}%)`; c.beginPath(); c.moveTo(px - sw / 2, H); c.lineTo(px - sw / 2, top + sw * .6); c.lineTo(px, top); c.lineTo(px + sw / 2, top + sw * .6); c.lineTo(px + sw / 2, H); c.fill();
        for (let j = 0; j < 6; j++) { const ly = top + sw + hash(i, j + 20) * (H - top); c.fillStyle = `hsla(${hash(i, j) * 360},80%,70%,${.35 + .3 * Math.sin(now() / 900 + i + j)})`; c.fillRect(px - sw * .25 + hash(j, i) * sw * .5, ly, Math.max(1.5, t * .07), Math.max(1.5, t * .07)); } }
      c.fillStyle = 'rgba(6,4,16,.28)'; c.fillRect(0, 0, ox, H); c.fillRect(ox + v.tw, 0, v.W - ox - v.tw, H);
    }
    for (let y = y0; y <= y1; y++) for (const col of [0, 13]) { const s = hash(y, col), X = sx(col); c.fillStyle = `hsl(${252 + s * 14},${20 + s * 10}%,${15 + s * 8}%)`; c.fillRect(X, sy(y + 1), t, t + 1); c.fillStyle = `hsl(${252 + s * 14},20%,${10 + s * 5}%)`; c.fillRect(X + t * (.2 + s * .4), sy(y + 1) + t * (.3 + s * .3), t * .3, t * .08); c.fillStyle = `rgba(170,160,255,${.12 + s * .08})`; c.fillRect(col ? X : X + t - Math.max(1, t * .06), sy(y + 1), Math.max(1, t * .06), t); }
    // frontier line: the highest anyone reached today
    if (!S.practice && S.frontier > 3) { const fy = sy(S.frontier + 1); if (fy > -10 && fy < H + 10) { c.strokeStyle = 'rgba(255,207,107,.55)'; c.setLineDash([t * .3, t * .25]); c.lineWidth = Math.max(1, t * .05); c.beginPath(); c.moveTo(sx(1), fy); c.lineTo(sx(13), fy); c.stroke(); c.setLineDash([]); c.fillStyle = 'rgba(255,207,107,.9)'; c.font = `700 ${t * .32}px system-ui`; c.textAlign = 'center'; c.fillText(tr('world', S.frontier), sx(7), fy - t * .15); } }
    // platforms
    for (let y = y0; y <= y1; y++) for (const s of w.segs(y)) {
      const X = sx(s.x0), Y = sy(y + 1), Wd = (s.x1 - s.x0 + 1) * t, th = t * .52;
      c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(X + Wd / 2, Y + th + t * .18, Wd * .5, t * .14, 0, 0, Math.PI * 2); c.fill();
      const gr = c.createLinearGradient(0, Y, 0, Y + th); gr.addColorStop(0, s.cp ? '#8a6450' : s.chain ? '#5a4f96' : '#4a4378'); gr.addColorStop(1, s.cp ? '#3b2524' : '#241e4a'); c.fillStyle = gr;
      c.beginPath(); c.roundRect ? c.roundRect(X, Y, Wd, th, t * .12) : c.rect(X, Y, Wd, th); c.fill();
      c.fillStyle = 'rgba(10,6,30,.35)'; for (let x = s.x0 + 1; x <= s.x1; x++) c.fillRect(sx(x) - Math.max(1, t * .025) / 2 + (hash(x, y) - .5) * t * .3, Y + th * .3, Math.max(1, t * .025), th * .7);
      c.fillStyle = 'rgba(10,6,30,.25)'; c.fillRect(X + t * .08, Y + th * .55, Wd - t * .16, Math.max(1, t * .025));
      c.fillStyle = s.cp ? 'rgba(255,200,130,.9)' : 'rgba(200,190,255,.7)'; c.fillRect(X + t * .06, Y, Wd - t * .12, Math.max(1.5, t * .06));
      for (let x = s.x0; x <= s.x1; x++) if (hash(x, y) < .35) { c.fillStyle = 'rgba(126,232,255,.25)'; c.fillRect(sx(x) + hash(y, x) * t * .8, Y + th * .5, t * .06, t * .06); }
      if (s.goal) { c.fillStyle = 'rgba(255,207,107,.95)'; c.font = `900 ${t * .4}px system-ui`; c.textAlign = 'center'; c.fillText('✦ ' + tr('gate') + ' ✦', X + Wd / 2, Y - t * 1.2); }
      if (s.cp) { // campfire
        const fx = sx((s.x0 + s.x1 + 1) / 2), fy = Y; c.fillStyle = '#2a1a14'; c.fillRect(fx - t * .35, fy - t * .1, t * .7, t * .1);
        for (let i = 0; i < 3; i++) { const fl = .55 + .2 * Math.sin(now() / 120 + i * 2); c.fillStyle = ['#ff6a2a', '#ffb347', '#fff1a8'][i]; c.beginPath(); c.ellipse(fx, fy - t * fl * (1 - i * .25) * .6, t * (.28 - i * .07), t * fl * (1 - i * .25) * .6, 0, 0, Math.PI * 2); c.fill(); }
        const gl = c.createRadialGradient(fx, fy - t * .3, 0, fx, fy - t * .3, t * 3); gl.addColorStop(0, 'rgba(255,150,70,.32)'); gl.addColorStop(1, 'rgba(255,150,70,0)'); c.fillStyle = gl; c.fillRect(fx - t * 3, fy - t * 3.3, t * 6, t * 6);
        c.fillStyle = 'rgba(255,220,180,.85)'; c.font = `800 ${t * .3}px system-ui`; c.textAlign = 'center'; c.fillText(tr('camp', s.cp) + ' · ' + (y + 1) + ' ' + tr('m'), fx, Y + th + t * .42);
      }
    }
    // spikes (unless a body covers them)
    for (let y = y0; y <= y1; y++) for (let x = 1; x <= 12; x++) if (w.spike(x, y) && !S.blocks.has(C.bkey(x, y))) {
      const X = sx(x), Y = sy(y); c.fillStyle = '#e9e4f5'; c.beginPath(); for (let k = 0; k < 3; k++) { const a = X + t * (.06 + k * .3), b = a + t * .28; c.moveTo(a, Y); c.lineTo((a + b) / 2, Y - t * .55); c.lineTo(b, Y); } c.fill();
      c.fillStyle = 'rgba(255,70,100,.22)'; c.fillRect(X, Y - t * .6, t, t * .6);
    }
    // bodies
    const P = S.P, near = P && (S.mode === 'play' || S.mode === 'dead');
    for (let y = y0; y <= y1; y++) { const r = S.byRow.get(y); if (!r) continue; for (const b of r) {
      const X = sx(b.x), Y = sy(b.y + 1), age = (now() - b.born) / 1000, pop = age < .6 ? 1 + (1 - age / .6) * .35 : 1, m = t * .06, mine = b.o === S.me || b.local;
      c.save(); c.translate(X + t / 2, Y + t / 2); c.scale(pop, pop);
      const gr = c.createLinearGradient(0, -t / 2, 0, t / 2); gr.addColorStop(0, `hsl(${b.h},85%,72%)`); gr.addColorStop(1, `hsl(${b.h},70%,38%)`);
      c.shadowColor = `hsl(${b.h},90%,60%)`; c.shadowBlur = opt.card ? t * .5 : t * .35; c.fillStyle = gr; c.beginPath(); const R = -t / 2 + m, L = t - 2 * m;
      c.moveTo(R + L * .2, R); c.lineTo(R + L * .8, R); c.lineTo(R + L, R + L * .25); c.lineTo(R + L, R + L); c.lineTo(R, R + L); c.lineTo(R, R + L * .25); c.closePath(); c.fill(); c.shadowBlur = 0;
      c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(R + L * .2, R); c.lineTo(R + L * .5, R); c.lineTo(R + L * .35, R + L * .55); c.lineTo(R + L * .08, R + L * .3); c.fill();
      // sleeping soul glyph
      c.fillStyle = `hsla(${b.h},60%,18%,.7)`; c.beginPath(); c.arc(0, L * .08, L * .16, 0, Math.PI * 2); c.fill(); c.fillRect(-L * .2, L * .2, L * .4, L * .12);
      if (mine) { c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = Math.max(1, t * .04); c.strokeRect(R, R, L, L); }
      if (age < 1.2) { c.globalAlpha = 1 - age / 1.2; c.strokeStyle = `hsl(${b.h},90%,80%)`; c.lineWidth = t * .08; c.beginPath(); c.arc(0, 0, t * (.5 + age * 1.6), 0, Math.PI * 2); c.stroke(); c.globalAlpha = 1; }
      c.restore();
      const showName = opt.card ? b.o === S.me : (near && Math.abs(b.y - P.y) < 6) || age < 4 || S.mode === 'menu' && hash(b.i | 0, 1) < .3;
      if (showName && t * .3 >= 8) { c.font = `700 ${t * .28}px system-ui`; c.textAlign = 'center'; c.fillStyle = `hsla(${b.h},90%,85%,.95)`; c.fillText(b.n + (b.s ? '  ♥' + b.s : ''), X + t / 2, Y - t * .12); }
    } }
    runHooks('drawWorld', c, v, sx, sy, y0, y1, opt);
    // saws
    const wt = opt.card ? 0 : wclock();
    for (const s of w.saws) { if (s.y < y0 - 1 || s.y > y1 + 1) continue; const X = sx(w.sawPos(s, wt)), Y = sy(s.y), r = t * .42, rot = wt * 9;
      c.save(); c.translate(X, Y); c.rotate(rot); c.fillStyle = '#c9c3dd'; c.beginPath(); for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2, rr = k % 2 ? r : r * .78; c.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } c.fill(); c.fillStyle = '#3a3358'; c.beginPath(); c.arc(0, 0, r * .3, 0, Math.PI * 2); c.fill(); c.restore();
      c.strokeStyle = 'rgba(255,90,120,.25)'; c.lineWidth = Math.max(1, t * .03); c.beginPath(); c.moveTo(sx(s.x0), Y); c.lineTo(sx(s.x1), Y); c.stroke(); }
    // particles
    c.globalCompositeOperation = 'lighter';
    for (const p of S.parts) { const a = Math.max(0, p.l / p.m); c.fillStyle = `hsla(${p.h},90%,70%,${a})`; const r = p.s * t; c.fillRect(sx(p.x) - r / 2, sy(p.y) - r / 2, r, r); }
    c.globalCompositeOperation = 'source-over';
    // landing rings
    for (const r of S.rings) { const a = r.l / .45; c.strokeStyle = `rgba(220,210,255,${a * .7})`; c.lineWidth = Math.max(1, t * .05); c.beginPath(); c.ellipse(sx(r.x), sy(r.y), t * (.3 + (1 - a) * 1.1), t * (.08 + (1 - a) * .18), 0, 0, Math.PI * 2); c.stroke(); }
    // aim: the real predicted path, ending exactly where you will land (or die)
    if (P && S.mode === 'play' && S.aim && S.pred) {
      const pr = S.pred, n = pr.pts.length, pw = Math.min(1, Math.hypot(S.aim.dx, S.aim.dy)), bad = !!pr.dead;
      pr.pts.forEach(([x, y], i) => { if (i % 2) return; const f = i / n; c.fillStyle = bad ? `rgba(255,110,130,${.95 - f * .5})` : `rgba(255,255,255,${.95 - f * .55})`; c.beginPath(); c.arc(sx(x), sy(y + .43), t * (.1 - f * .04), 0, Math.PI * 2); c.fill(); });
      if (pr.land) { const X = sx(pr.land.x), Y = sy(pr.land.y), on = pr.land.on, body = on && typeof on === 'object';
        c.strokeStyle = body ? `hsl(${on.h},90%,75%)` : 'rgba(150,255,190,.95)'; c.lineWidth = Math.max(1.5, t * .07); c.beginPath(); c.ellipse(X, Y, t * .42, t * .13, 0, 0, Math.PI * 2); c.stroke();
        c.fillStyle = body ? `hsla(${on.h},90%,70%,.25)` : 'rgba(150,255,190,.18)'; c.fill();
        if (body && on.o !== S.me) { c.fillStyle = `hsl(${on.h},90%,85%)`; c.font = `800 ${t * .3}px system-ui`; c.textAlign = 'center'; c.fillText('♥ ' + on.n, X, Y - t * .95); } }
      if (pr.dead) { const X = sx(pr.dead.x), Y = sy(pr.dead.y + .45), r = t * .26; c.strokeStyle = '#ff6b80'; c.lineWidth = Math.max(2, t * .09); c.beginPath(); c.moveTo(X - r, Y - r); c.lineTo(X + r, Y + r); c.moveTo(X + r, Y - r); c.lineTo(X - r, Y + r); c.stroke(); }
      const X = sx(P.x), Y = sy(P.y); c.strokeStyle = `hsla(${120 - pw * 120},90%,65%,.9)`; c.lineWidth = t * .07; c.beginPath(); c.arc(X, Y - t * .43, t * .8, -Math.PI / 2, -Math.PI / 2 + pw * Math.PI * 2); c.stroke();
    }
    // player: a hooded spirit that breathes, blinks, crouches as you pull and leans where you aim
    if (P && (S.mode === 'play' || S.mode === 'cd')) {
      const T = now() / 1000, X = sx(P.x), Y = sy(P.y), pw = S.aim && P.gr ? Math.min(1, Math.hypot(S.aim.dx, S.aim.dy)) : 0, br = P.gr && !pw && !RM() ? Math.sin(T * 2.4) * .035 : 0;
      const sq = (P.sq || 0) + pw * .22, st = P.gr ? 0 : Math.min(.25, Math.abs(P.vy) / 60), wdt = t * .66 * (1 + sq - st - br), ht = t * .9 * (1 - sq + st + br);
      const lean = S.aim && P.gr ? Math.max(-.35, Math.min(.35, -S.aim.dx * .45)) : Math.max(-.3, Math.min(.3, P.vx / 30));
      const gl = c.createRadialGradient(X, Y - ht * .5, 0, X, Y - ht * .5, t * 1.6); gl.addColorStop(0, `hsla(${HUE},90%,65%,.4)`); gl.addColorStop(1, `hsla(${HUE},90%,65%,0)`); c.fillStyle = gl; c.fillRect(X - t * 1.6, Y - ht * .5 - t * 1.6, t * 3.2, t * 3.2);
      c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(X, Y, wdt * .5, t * .07, 0, 0, Math.PI * 2); c.fill();
      c.save(); c.translate(X, Y); c.rotate(lean);
      // cloak tail, trailing behind motion
      const tail = P.gr ? Math.sin(T * 3) * .08 : -P.vx * .02; c.fillStyle = `hsl(${HUE},70%,48%)`; c.beginPath(); c.moveTo(-wdt * .45, 0); c.quadraticCurveTo(-wdt * (.7 + tail), -ht * .2, -wdt * .25, -ht * .45); c.lineTo(wdt * .3, -ht * .3); c.lineTo(wdt * .5, 0); c.fill();
      const body = c.createLinearGradient(0, -ht, 0, 0); body.addColorStop(0, `hsl(${HUE},85%,72%)`); body.addColorStop(1, `hsl(${HUE},75%,50%)`); c.fillStyle = body;
      c.beginPath(); c.moveTo(0, -ht); c.quadraticCurveTo(wdt * .66, -ht * .58, wdt * .5, 0); c.lineTo(-wdt * .5, 0); c.quadraticCurveTo(-wdt * .66, -ht * .58, 0, -ht); c.fill();
      c.fillStyle = 'rgba(255,255,255,.28)'; c.beginPath(); c.moveTo(0, -ht * .96); c.quadraticCurveTo(-wdt * .5, -ht * .6, -wdt * .38, -ht * .2); c.lineTo(-wdt * .2, -ht * .2); c.quadraticCurveTo(-wdt * .3, -ht * .6, 0, -ht * .96); c.fill();
      c.fillStyle = `hsl(${HUE},60%,16%)`; c.beginPath(); c.ellipse(0, -ht * .52, wdt * .32, ht * .21, 0, 0, Math.PI * 2); c.fill();
      const lx = S.aim ? Math.max(-1, Math.min(1, S.aim.dx * 3)) : Math.max(-1, Math.min(1, P.vx / 8)), ly = S.aim ? Math.max(-1, Math.min(1, S.aim.dy)) * .35 : 0, blink = (T % 3.7) < .12 ? .15 : 1;
      c.fillStyle = '#fff'; c.shadowColor = '#fff'; c.shadowBlur = t * .2;
      for (const e of [-1, 1]) { c.beginPath(); c.ellipse(e * wdt * .13 + lx * wdt * .09, -ht * .54 - ly * ht * .12, t * .06, t * .075 * blink, 0, 0, Math.PI * 2); c.fill(); }
      c.shadowBlur = 0; c.restore();
    }
    // a soul returning to camp after death
    if (S.mode === 'dead' && S.soul && S.soul.t > 0) { const q = soulPos(), X = sx(q.x), Y = sy(q.y), g2 = c.createRadialGradient(X, Y, 0, X, Y, t * 1.1); g2.addColorStop(0, '#fff'); g2.addColorStop(.25, `hsla(${HUE},95%,75%,.9)`); g2.addColorStop(1, `hsla(${HUE},95%,60%,0)`); c.fillStyle = g2; c.beginPath(); c.arc(X, Y, t * 1.1, 0, Math.PI * 2); c.fill(); }
    for (const f of S.floats) { c.globalAlpha = Math.min(1, f.l); c.fillStyle = `hsl(${f.col},90%,80%)`; c.font = `800 ${t * .36}px system-ui`; c.textAlign = 'center'; c.fillText(f.txt, sx(f.x), sy(f.y)); c.globalAlpha = 1; }
    runHooks('drawTop', c, v, sx, sy, opt);
    if (shake) c.restore();
    if (S.flash > 0 && !opt.card) { c.fillStyle = `rgba(255,240,255,${S.flash * .45})`; c.fillRect(0, 0, v.W, H); }
  }

  /* ---------------- input: slingshot ---------------- */
  let drag = null;
  cv.addEventListener('pointerdown', e => { audio(); if (S.mode !== 'play') return; drag = { x: e.clientX, y: e.clientY, id: e.pointerId }; S.aim = { dx: 0, dy: 0 }; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag || e.pointerId !== drag.id) return; const k = view(VW, VH).t / DPR * 3.4; S.aim = { dx: (drag.x - e.clientX) / k, dy: (e.clientY - drag.y) / k }; const m = Math.hypot(S.aim.dx, S.aim.dy); if (m > 1) { S.aim.dx /= m; S.aim.dy /= m; } const st = Math.floor(Math.min(1, m) * 4); if (st !== drag.st) { if (st > (drag.st || 0) && SFX.aim) SFX.aim(st); drag.st = st; } }); /* the pull creaks higher as you draw harder */
  const release = e => { if (!drag || e.pointerId !== drag.id) return; drag = null; const a = S.aim; S.aim = null; S.pred = null; if (S.mode !== 'play' || !a) return; leap(a.dx, a.dy); };
  cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', e => { drag = null; S.aim = null; });
  $('bSac').addEventListener('click', () => { audio(); if (S.mode === 'play') die('sac', C.sacCell(S.P)); });
  /* keyboard: ←/→ or A/D turn the aim, ↑/↓ or W/S set power, Space/Enter leaps, X sacrifices, Esc menu */
  addEventListener('keydown', e => {
    if (e.target && e.target.tagName === 'INPUT') return;
    if (e.key === 'Escape' && (S.mode === 'play' || S.mode === 'dead')) { toMenu(); return; }
    if (S.mode !== 'play') return; const k = e.key.toLowerCase(), A = S.kaim; let aimed = false;
    if (k === 'arrowleft' || k === 'a') { A.a = Math.min(Math.PI * .97, A.a + .07); aimed = true; } else if (k === 'arrowright' || k === 'd') { A.a = Math.max(Math.PI * .03, A.a - .07); aimed = true; }
    else if (k === 'arrowup' || k === 'w') { A.p = Math.min(1, A.p + .05); aimed = true; } else if (k === 'arrowdown' || k === 's') { A.p = Math.max(.2, A.p - .05); aimed = true; }
    else if (k === ' ' || k === 'enter') { e.preventDefault(); audio(); const a = S.aim || { dx: Math.cos(A.a) * A.p, dy: Math.sin(A.a) * A.p }; S.aim = null; S.pred = null; S.kb = false; leap(a.dx, a.dy); return; }
    else if (k === 'x') { audio(); die('sac', C.sacCell(S.P)); return; }
    if (aimed) { e.preventDefault(); audio(); S.kb = true; S.aim = { dx: Math.cos(A.a) * A.p, dy: Math.sin(A.a) * A.p }; }
  });

  /* ---------------- HUD & menus ---------------- */
  function updHud() {
    const P = S.P; if (!P) return; $('hH').textContent = Math.max(0, Math.floor(P.y - 1));
    $('hB').textContent = S.practice ? tr('practiceOn') : tr('best', S.best) + (S.frontier > S.best ? ' · ' + tr('world', S.frontier) : '');
    $('hSn').textContent = S.practice ? '∞' : S.souls; $('bSac').disabled = !S.practice && S.souls <= 0; runHooks('hud');
  }
  function show(id) { for (const k of ['menu', 'how', 'board', 'over', 'trials', 'intro', 'done', 'fail', 'shrine', 'lobby', 'rres', 'join']) $(k).classList.toggle('hide', k !== id); }
  function refreshMenu() {
    const ch = $('chips'); if (!ch) return;
    ch.innerHTML = S.online ? [tr('cBodies', S.total), tr('cTop', S.frontier), tr('cNow', Math.max(1, S.climbers)), tr('cSouls', S.souls), S.helped ? tr('cLift', S.helped) : ''].filter(Boolean).map(s => '<span class="chip">' + s.replace(/(\d[\d,]*)/, '<b>$1</b>') + '</span>').join('') : '<span class="chip">' + tr('offline') + '</span>';
    const cpi = LS.get('ss_cp_' + S.day, 0); $('playSub').textContent = !S.online ? '' : S.souls > 0 ? tr('playSub', S.souls, cpi) : tr('playDone'); $('bPlay').disabled = S.online && S.souls <= 0 && false;
    $('name').value = NAME; $('sw').style.background = `hsl(${HUE},80%,62%)`; $('sw').style.color = `hsl(${HUE},80%,62%)`;
  }
  function applyLang() { $('hU').textContent = tr('m'); $('oU').textContent = tr('m'); const h = document.documentElement; h.lang = LANG; h.dir = LANG === 'ar' ? 'rtl' : 'ltr'; document.querySelectorAll('[data-i]').forEach(e => { e.textContent = tr(e.dataset.i); }); $('lang').textContent = LANG === 'ar' ? 'English' : 'العربية'; $('sacL').textContent = tr('sac'); refreshMenu(); }
  function nextIn() { const n = new Date(), t = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + 1) - n.getTime(); const h = Math.floor(t / 3.6e6), m = Math.floor(t / 6e4) % 60; return `${h}:${String(m).padStart(2, '0')}`; }
  function showOver() { S.mode = 'over'; show('over'); $('oBest').textContent = S.best; $('oBodies').textContent = S.mine || [...S.blocks.values()].filter(b => b.o === S.me || b.local).length; $('oHelped').textContent = S.helped; $('oNext').textContent = nextIn(); }
  async function showBoard(kind) {
    show('board'); $('tH').classList.toggle('on', kind === 'height'); $('tHelp').classList.toggle('on', kind === 'helpers'); const ul = $('lb'); ul.innerHTML = '<li class="empty">…</li>';
    try { const j = await (await fetch('/ss/api/board')).json(); const L = j[kind] || []; ul.innerHTML = L.length ? L.map((r, i) => `<li><small>${i + 1}</small><i style="background:hsl(${r.h},80%,62%)"></i>${esc(r.n)}<b dir="ltr">${kind === 'height' ? r.v + ' ' + tr('m') : '♥ ' + r.v}</b></li>`).join('') : `<li class="empty">${tr('empty')}</li>`; }
    catch (e) { ul.innerHTML = `<li class="empty">${tr('offline')}</li>`; }
  }
  $('bPlay').onclick = () => { audio(); if (!LS.get('ss_tut', 0)) startTutorial(); else startDaily(); };
  $('bPractice').onclick = $('bPractice2').onclick = () => { audio(); startPractice(); };
  $('bHow').onclick = () => { audio(); startTutorial(); }; $('bSkip').onclick = () => endTutorial(false); $('bHowGo').onclick = () => show('menu');
  $('bBoard').onclick = () => showBoard('height'); $('tH').onclick = () => showBoard('height'); $('tHelp').onclick = () => showBoard('helpers'); $('bBoardX').onclick = () => show('menu');
  $('bOverX').onclick = () => toMenu(); $('bMenu').onclick = () => toMenu();
  $('bMute').onclick = () => { S.mute = !S.mute; LS.set('ss_mute', S.mute); $('bMute').textContent = S.mute ? '🔇' : '🔊'; if (master) master.gain.value = S.mute ? 0 : .8; };
  $('bMute').textContent = S.mute ? '🔇' : '🔊';
  $('lang').onclick = () => { LANG = LANG === 'ar' ? 'en' : 'ar'; LS.set('ss_lang', LANG); applyLang(); };
  $('name').addEventListener('change', e => { NAME = (e.target.value || '').replace(/[<>&"'`\\]/g, '').trim().slice(0, 16) || NAME; LS.set('ss_name', NAME); e.target.value = NAME; });
  $('name').addEventListener('keydown', e => e.stopPropagation());
  $('sw').onclick = () => { HUE = HUES[(HUES.indexOf(HUE) + 1) % HUES.length]; LS.set('ss_hue', HUE); refreshMenu(); };

  /* ---------------- share card ---------------- */
  async function card() {
    const W = 1080, H = 1350, k = document.createElement('canvas'); k.width = W; k.height = H; const c = k.getContext('2d');
    const v = view(W, 1050, .95); const mine = [...S.blocks.values()].filter(b => b.o === S.me || b.local);
    const focus = mine.length ? mine.reduce((a, b) => (b.y > a.y ? b : a)).y : S.best;
    draw(c, { ...v, H: 1050 }, Math.max(0, focus - 1050 / v.t * .45), { card: 1 });
    const gr = c.createLinearGradient(0, 760, 0, H); gr.addColorStop(0, 'rgba(11,10,26,0)'); gr.addColorStop(.35, 'rgba(11,10,26,.92)'); gr.addColorStop(1, '#0b0a1a'); c.fillStyle = gr; c.fillRect(0, 760, W, H - 760);
    c.textAlign = 'center'; c.direction = LANG === 'ar' ? 'rtl' : 'ltr';
    c.fillStyle = '#7ee8ff'; c.font = '900 64px system-ui'; c.fillText('SOULSTACK', W / 2, 110);
    c.fillStyle = '#cfc8f0'; c.font = '600 38px system-ui'; c.fillText(tr('cardFell'), W / 2, 1010);
    c.fillStyle = '#ffcf6b'; c.font = '900 150px system-ui'; c.fillText(S.best + ' ' + tr('m'), W / 2, 1150);
    c.fillStyle = '#fff'; c.font = '700 44px system-ui'; c.fillText(tr('cardLift', S.helped), W / 2, 1222);
    c.fillStyle = '#a79fc9'; c.font = '600 32px system-ui'; c.fillText(tr('cardBodies', S.total) + ' · ' + S.day, W / 2, 1278); c.fillText(location.host + '/soulstack', W / 2, 1322);
    return new Promise(r => k.toBlob(r, 'image/png'));
  }
  $('bShare').onclick = async () => {
    const url = location.origin + '/soulstack/', text = tr('shareText', S.best, S.helped) + ' ' + url;
    try { const b = await card(), f = new File([b], 'soulstack.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], text, title: 'SOULSTACK' }); return; }
      const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'soulstack-' + S.day + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } catch (e) { }
    try { await navigator.clipboard.writeText(text); $('bShare').textContent = tr('copied'); setTimeout(() => { $('bShare').textContent = tr('share'); }, 1800); } catch (e) { }
  };

  /* ---------------- main loop ---------------- */
  let last = now();
  function frame() {
    const t = now(), dt = Math.min(.05, (t - last) / 1000); last = t;
    if (S.world) { update(dt); draw(g, view(VW, VH), S.cam.b); }
    requestAnimationFrame(frame);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) prog(true); });
  addEventListener('pagehide', () => { if (S.steps.length && navigator.sendBeacon) navigator.sendBeacon('/ss/api/prog?t=' + TOK, JSON.stringify({ day: S.day, best: S.best, steps: S.steps.splice(0), n: NAME, h: HUE })); });

  S.live = $('live'); applyLang(); S.world = C.World(C.daySeed(S.day)); S.mode = 'menu'; show('menu');
  sync(true);
  requestAnimationFrame(frame);

  /* test hooks (harmless in production) */
  window.SSG = { applyLang: () => applyLang(), S, C, HK, LS, tr, TXT, esc, $, toast, hint, feed, floatText, burst, buzz, SFX, tone, noise, audio, RM, now, wclock, view, addBlock, die, leap, spawn, enterGame, toMenu, show, leavePractice, updHud, refreshMenu, get NAME() { return NAME; }, get HUE() { return HUE; }, get TOK() { return TOK; }, get LANG() { return LANG; }, get VW() { return VW; }, get VH() { return VH; }, get DPR() { return DPR; } };
  window.SS_DEBUG = { startTutorial, pred: () => S.pred, view: () => view(VW, VH), dragK: () => view(VW, VH).t / DPR * 3.4, S, C, die: () => S.mode === 'play' && die('sac', C.sacCell(S.P)), launch: (dx, dy) => { if (S.P && S.P.gr && C.launch(S.P, dx, dy)) return true; return false; }, card, sync, startDaily, startPractice, toMenu };
})();
