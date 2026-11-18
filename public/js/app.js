/* ديوانية — التطبيق: الملف الشخصي، الغرف، المزامنة، والواجهة */
(function () {
  'use strict';
  const $ = s => document.querySelector(s), esc = U.esc;
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  const rid = n => Array.from(crypto.getRandomValues(new Uint8Array(n)), b => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
  const CATS = { act: ['أكشن مباشر', 'تصويب وفِرق في الوقت الحقيقي'], board: ['ألعاب الطاولة', 'كلاسيكيات واستراتيجية'], party: ['ألعاب الشلّة', 'أدوار سرية وتصويت وضحك'], brain: ['ذكاء ومعلومات', 'من الأسرع والأدق؟'], fun: ['ضحك وإبداع', 'ارسم، اكتب، اخدع'], orig: ['حصريات ديوانية', 'ألعاب ابتكرناها ولن تجدها في مكان آخر'] };
  const MODES = { f: 'العائلة والأطفال', p: 'الأصدقاء والحفلات', s: 'استراتيجية' };
  const AV0 = ['🦊', '🐪', '🦅', '🐎', '🐢', '🦁', '🐼', '🐙', '🦉', '🐬'], AV1 = { '🦄': 60, '🐉': 90, '🤖': 60, '👑': 150, '🧞': 120, '🚀': 80, '🥷': 100, '🦖': 70 };
  const FR = [['بلا إطار', 0], ['إطار ذهبي', 120], ['إطار زمردي', 80], ['إطار ياقوتي', 80]];
  const okAv = a => AV0.includes(a) || a in AV1 ? a : '🦊';

  /* ---------- الملف الشخصي ---------- */
  const P = Object.assign({ id: 'u' + rid(10), n: '', av: U.pick(AV0), fr: 0, xp: 0, coins: 50, own: [], ach: {}, played: 0, won: 0, streak: 0, hosted: 0, games: {}, hist: [], day: {}, week: {}, snd: 1, theme: '', k: 0, d: 0, as: 0, hs: 0, mvp: 0 }, LS.get('dw_p', {}));
  if (!P.n) P.n = 'ضيف ' + (100 + U.rnd(900));
  if (!P.tok) P.tok = rid(28);
  const save = () => LS.set('dw_p', P); save();
  const ACH = [['first', '☕ أول فنجان', 'العب أول مباراة', () => P.played >= 1], ['win1', '🏅 أول فوز', 'افز بمباراة', () => P.won >= 1], ['win5', '🏆 خمسة انتصارات', 'افز بخمس مباريات', () => P.won >= 5], ['play10', '🎮 مدمن ديوانية', 'العب 10 مباريات', () => P.played >= 10],
  ['var5', '🎯 مقاتل الديوانية', 'العب 5 مباريات طخطخة', () => (P.games.strike || 0) >= 5], ['orig', '🏆 فريق الحسم', 'اربح 3 مباريات', () => P.won >= 3], ['host', '🛋️ راعي المجلس', 'افتح غرفة', () => P.hosted >= 1],
  ['streak3', '🔥 سلسلة ثلاثية', 'افز 3 مرات متتالية', () => P.streak >= 3], ['k50', '💀 خمسون قتيلاً', 'اقضِ على 50 خصماً', () => P.k >= 50], ['hs25', '🎯 قنّاص الرؤوس', '25 إصابة رأس قاتلة', () => P.hs >= 25], ['mvp1', '⭐ أفضل لاعب', 'كن أفضل لاعب في مباراة', () => P.mvp >= 1], ['daily', '📅 ملتزم', 'أنجز تحدي اليوم', () => P.day.done], ['rich', '🪙 تاجر', 'اجمع 500 عملة', () => P.coins >= 500]];
  function checkAch() { for (const a of ACH) if (!P.ach[a[0]] && a[3]()) { P.ach[a[0]] = 1; toast('إنجاز جديد: ' + a[1]); } }
  const today = () => new Date().toISOString().slice(0, 10), weekNo = () => Math.floor(Date.now() / 6048e5);
  const dailyGame = () => { let h = 0; for (const c of today()) h = (h * 31 + c.charCodeAt(0)) % 9973; return G.list[h % G.list.length]; };
  if (P.day.d !== today()) P.day = { d: today(), done: 0 }; if (P.week.w !== weekNo()) P.week = { w: weekNo(), g: [], done: 0 };
  const level = () => Math.floor(P.xp / 100) + 1;

  /* ---------- صوت وتنبيهات ---------- */
  let AC; function beep(f = 600, d = .08, type = 'sine') { if (!P.snd) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(.07, AC.currentTime); g.gain.exponentialRampToValueAtTime(.001, AC.currentTime + d); o.connect(g).connect(AC.destination); o.start(); o.stop(AC.currentTime + d); } catch (e) { } }
  let tT; function toast(m) { $('#toast').innerHTML = `<div>${esc(m)}</div>`; clearTimeout(tT); tT = setTimeout(() => $('#toast').innerHTML = '', 3200); }

  /* ---------- الشبكة (SSE + POST إلى خادم ديوانية) ---------- */
  const Net = {
    ok: false, es: null, code: null,
    async ping() { try { const c = new AbortController(); setTimeout(() => c.abort(), 3500); const r = await fetch('api/ping?t=' + P.tok, { signal: c.signal }), j = await r.json(); if (j.id) { P.id = j.id; save(); } Net.ok = !!j.ok; } catch (e) { Net.ok = false; } },
    url: (p, x = '') => `api/${p}?c=${Net.code}&t=${P.tok}${x}`,
    info: code => fetch(`api/room?c=${code}&t=${P.tok}`).then(r => r.status === 404 ? { err: 'none' } : r.status === 429 ? { err: 'slow' } : r.json(), () => ({ err: 'net' })),
    open(code, h) {
      Net.close(); Net.code = code; let opened = false; const es = Net.es = new EventSource(Net.url('ev'));
      es.addEventListener('state', e => h.state(JSON.parse(e.data))); es.addEventListener('act', e => { const d = JSON.parse(e.data); h.act(d.p, d.a); });
      es.addEventListener('pres', e => h.pres(JSON.parse(e.data))); es.addEventListener('hk', e => h.hk(JSON.parse(e.data).hk)); es.addEventListener('closed', e => h.closed(JSON.parse(e.data)));
      es.onopen = () => { opened = true; h.conn(true); }; es.onerror = () => { if (!opened && es.readyState === 2) h.missing(); else h.conn(false); };
    },
    close() { if (Net.es) Net.es.close(); Net.es = null; },
    post: (p, body, x) => fetch(Net.url(p, x), { method: 'POST', body: JSON.stringify(body) }),
  };

  /* ---------- الغرفة ---------- */
  const Room = { R: null, host: false, hk: null, on: [], ui: {}, keep: {}, off: 0, offline: false, busy: false, dirty: false, botAt: 0, conn: true, hideRes: 0, awarded: '' };
  let view = 'home', modal = null; const filt = { q: '', cat: 'all', mode: 'all' };
  const newR = code => ({ code, host: P.id, ps: [], ph: 'lobby', gid: null, o: {}, st: null, gps: [], gk: 0, res: null, tot: {}, chat: [], gv: {}, teams: 0, auto: {}, v: 0, _now: Date.now() });
  const defOpts = g => Object.fromEntries((g.opts || []).map(o => [o.k, o.d]));
  function H() { const R = Room.R, by = {}; R.ps.forEach(x => by[x.id] = x); return { ps: R.gps, nm: id => (by[id] || {}).n || 'لاعب', av: id => okAv((by[id] || {}).av), now: Date.now() + Room.off, o: R.o, ui: Room.ui, keep: (k, f) => Room.keep[k] || (Room.keep[k] = f()), code: R.code, gk: R.gk, offline: Room.offline, teamsOn: R.teams, team: id => (by[id] || {}).team, isHost: () => Room.host, hostId: () => Room.R ? Room.R.host : null, isBot: id => { const r = Room.R, x = r && r.ps.find(q => q.id === id); return !!(x && x.bot) || !!(r && r.auto[id]); } }; }
  function setFace(file) {
    return new Promise((ok, no) => { const img = new Image(), url = URL.createObjectURL(file); img.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 96; const s = Math.min(img.width, img.height) * .8; c.getContext('2d').drawImage(img, (img.width - s) / 2, Math.max(0, (img.height - s) * .35), s, s, 0, 0, 96, 96); P.face = c.toDataURL('image/jpeg', .72); save(); URL.revokeObjectURL(url); window.dispatchEvent(new Event('dw-face')); ok(); }; img.onerror = no; img.src = url; });
  }
  const sys = m => { const R = Room.R; R.chat.push({ s: m }); if (R.chat.length > 40) R.chat.shift(); };
  const txt = (x, n) => String(x == null ? '' : x).replace(/\s+/g, ' ').trim().slice(0, n);

  function handle(p, a) {            /* يعمل عند قائد الغرفة فقط */
    const R = Room.R; if (!R || !a) return; const pl = R.ps.find(x => x.id === p);
    switch (a.t) {
      case 'join': if (!pl && R.ps.length < (R.max || 12) && !R.lock && !(R.ban || []).includes(p)) { R.ps.push({ id: p, n: txt(a.n, 16) || 'لاعب', av: okAv(a.av), fr: a.fr | 0, rdy: 0, team: 1 + R.ps.length % 2 }); sys(`انضم ${txt(a.n, 16)} إلى الغرفة`); } break;
      case 'prof': if (pl) { pl.n = txt(a.n, 16) || pl.n; pl.av = okAv(a.av); pl.fr = a.fr | 0; } break;
      case 'rdy': if (pl) pl.rdy = pl.rdy ? 0 : 1; break;
      case 'team': if (pl) pl.team = pl.team === 1 ? 2 : 1; break;
      case 'sk': if (pl) pl.sk = Math.max(0, Math.min(3, a.s | 0)); break;
      case 'chat': if (pl && txt(a.m, 120)) { R.chat.push({ p, n: pl.n, a: pl.av, m: txt(a.m, 120) }); if (R.chat.length > 40) R.chat.shift(); } break;
      case 'gv': if (pl && G.by[a.g]) R.gv[p] = a.g; break;
      case 'leave': if (pl) { if (R.ph === 'game' && R.gps.includes(p)) R.auto[p] = 1; else R.ps = R.ps.filter(x => x.id !== p); sys(`غادر ${pl.n}`); } break;
      case 'g': if (R.ph === 'game' && R.st && !R.res && R.gps.includes(p)) { try { G.by[R.gid].act(R.st, p, a.a || {}, H()); } catch (e) { console.error(e); } finish(); } break;
    }
  }
  function finish() {
    const R = Room.R, st = R.st; if (!st || !st.over || R.res) return;
    const sc = st.sc || {}, win = st.over.win || [];
    R.res = { win, msg: st.over.msg || '', coop: st.over.coop || 0, rank: R.gps.map(id => ({ id, s: sc[id] || 0 })).sort((a, b) => b.s - a.s || win.includes(b.id) - win.includes(a.id)) };
    for (const id of R.gps) R.tot[id] = (R.tot[id] || 0) + (win.includes(id) ? 3 : 1);
  }
  function push() {
    const R = Room.R; R.v++; R._now = Date.now(); Room.botAt = Date.now() + 650 + U.rnd(500); render();
    if (!Room.offline) flush();
  }
  function flush() {
    if (Room.busy) { Room.dirty = true; return; } Room.busy = true;
    Net.post('state', Room.R, '&k=' + Room.hk).then(r => { if (r.status === 403) { Room.host = false; render(); } }).catch(() => { }).finally(() => { Room.busy = false; if (Room.dirty && Room.host && Room.R) { Room.dirty = false; flush(); } });
  }
  function act(a, pid) { if (!Room.R) return; if (Room.host) { handle(pid || P.id, a); push(); } else Net.post('act', a).catch(() => toast('تعذر الإرسال. تحقق من الاتصال')); }
  function vid() { const R = Room.R, g = G.by[R.gid]; if (Room.host && g && g.turn && R.st && !R.st.over) { const t = g.turn(R.st), pl = R.ps.find(x => x.id === t); if (pl && pl.loc) return t; } return P.id; }
  const mine = () => ({ t: 'join', n: P.n, av: P.av, fr: P.fr });
  const NH = {
    state(s) { if (Room.host && Room.R && s.v <= Room.R.v) return; const old = Room.R; Room.R = s; Room.off = s._now - Date.now(); Room.host = s.host === P.id && !!Room.hk; if (!old || old.gk !== s.gk) { Room.ui = {}; Room.keep = {}; Room.hideRes = 0; } if (!s.ps.some(x => x.id === P.id)) { if (old && old.ps.some(x => x.id === P.id)) { toast('أزالك قائد الغرفة'); leave(true); return; } Net.post('act', mine()); } render(); },
    act(p, a) { if (Room.host) { handle(p, a); push(); } },
    pres(d) { Room.on = d.on; const R = Room.R; if (R && d.host !== R.host) { R.host = d.host; if (d.host !== P.id) Room.host = false; } render(); },
    hk(hk) { Room.hk = hk; LS.set('dw_hk_' + Net.code, hk); if (Room.R) { Room.host = true; Room.R.host = P.id; sys('انتقلت قيادة الغرفة إلى ' + P.n); push(); } },
    conn(ok) { if (Room.conn && !ok) toast('انقطع الاتصال… نحاول إعادة الاتصال'); else if (!Room.conn && ok) toast('عاد الاتصال ✅'); Room.conn = ok; },
    missing() { toast('تعذر دخول الغرفة: قد تكون مغلقة أو مقفلة'); leave(true); },
    closed(d) { toast(d && d.kick ? 'أزالك قائد الغرفة' : 'أغلق القائد الغرفة'); leave(true); },
  };
  function resetRoom() { Object.assign(Room, { R: null, host: false, hk: null, on: [], ui: {}, keep: {}, off: 0, offline: false, busy: false, dirty: false, hideRes: 0, conn: true, sess: rid(5) }); }
  async function createRoom(gid, offline) {
    resetRoom(); P.hosted++; checkAch(); save();
    if (offline || !Net.ok) { Room.offline = true; Room.R = newR('LOCAL'); }
    else { try { const r = await fetch(`api/create?t=${P.tok}`, { method: 'POST' }); if (!r.ok) throw 0; const j = await r.json(); Room.hk = j.hk; LS.set('dw_hk_' + j.code, j.hk); Room.R = newR(j.code); Net.open(j.code, NH); try { location.hash = 'r-' + j.code; } catch (e) { } } catch (e) { toast('تعذر فتح غرفة مباشرة، فتحنا لك غرفة على هذا الجهاز'); Room.offline = true; Room.R = newR('LOCAL'); } }
    Room.host = true; view = 'room'; modal = null; handle(P.id, mine());
    if (gid) { Room.R.gid = gid; Room.R.o = defOpts(G.by[gid]); if (G.by[gid].teams) Room.R.teams = 1; }
    push(); window.scrollTo(0, 0);
  }
  const ERR = { none: 'لا توجد غرفة بهذا الرمز. تأكد منه أو اطلب رابطاً جديداً', slow: 'محاولات كثيرة. انتظر دقيقة ثم حاول', net: 'تعذر الاتصال بالخادم', banned: 'أزالك قائد هذه الغرفة ولا يمكنك العودة إليها', locked: 'الغرفة مقفلة. اطلب من القائد فتحها', full: 'الغرفة مكتملة العدد' };
  async function joinRoom(code, gated) {
    code = String(code || '').trim().toUpperCase(); if (!/^[A-Z0-9]{4}$/.test(code)) return toast('رمز الغرفة أربعة أحرف أو أرقام'); if (!Net.ok) return toast('الغرف المباشرة تعمل عند تشغيل المنصة على خادمها');
    const j = await Net.info(code), e = j.err || j.no; if (e) { toast(ERR[e] || ERR.net); try { history.replaceState(null, '', location.pathname + location.search); } catch (er) { } modal = null; render(); return; }
    if (!gated && !P.named) { modal = { t: 'gate', code, n: j.n, max: j.max, ph: j.ph, gid: j.gid }; render(); return; }   /* أول دخول: شاشة الاسم والصورة */
    resetRoom(); Room.hk = LS.get('dw_hk_' + code, null); view = 'room'; modal = null; Net.open(code, NH); try { location.hash = 'r-' + code; } catch (er) { } render();
  }
  function leave(silent) { if (Room.R && !Room.offline && !Room.host && !silent) Net.post('act', { t: 'leave' }).catch(() => { }); Net.close(); resetRoom(); view = 'home'; modal = null; try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { } render(); }
  function start() {
    const R = Room.R, g = G.by[R.gid], n = R.ps.length; if (!g) return toast('اختر لعبة أولاً');
    if (n < g.min) return toast(`هذه اللعبة تحتاج ${g.min} لاعبين على الأقل — أضف لاعباً آلياً أو ادعُ أصدقاءك`); if (n > g.max) return toast(`الحد الأقصى لهذه اللعبة ${g.max} لاعبين`);
    if (R.ps.some(x => x.loc) && !g.local) return toast('هذه اللعبة تحتاج جهازاً لكل لاعب. أزل لاعبي «الجهاز نفسه»');
    R.gps = U.shuf(R.ps.map(x => x.id)); R.o = Object.assign(defOpts(g), R.o); R.gk++; R.res = null; R.auto = {}; R.gv = {}; R.ph = 'game'; Room.ui = {}; Room.keep = {}; Room.hideRes = 0;
    R.st = g.init(R.gps.slice(), R.o, H()); R.ps.forEach(x => x.rdy = 0); beep(700, .15); push(); window.scrollTo(0, 0);
  }
  const BOTN = ['نمر', 'صقر', 'غيمة', 'برق', 'نجمة', 'موج', 'جبل', 'ريم', 'سهم', 'ورد', 'قمر'];
  function addSeat(kind) { const R = Room.R; if (R.ps.length >= (R.max || 12)) return toast('الغرفة ممتلئة. ارفع الحد الأقصى أولاً'); const used = R.ps.map(x => x.n), n = kind === 'bot' ? BOTN.find(x => !used.includes(x + ' 🤖')) + ' 🤖' : 'لاعب ' + (R.ps.filter(x => x.loc).length + 2); R.ps.push({ id: kind[0] + rid(8), n, av: U.pick(AV0), fr: 0, rdy: 1, team: 1 + R.ps.length % 2, [kind]: 1 }); }

  setInterval(() => {               /* نبض القائد: المؤقتات واللاعبون الآليون */
    const R = Room.R; if (!R || !Room.host || R.ph !== 'game' || !R.st || R.st.over) return;
    const g = G.by[R.gid], h = H(); let ch = false;
    try {
      if (g.tick && g.tick(R.st, h)) ch = true;
      if (Date.now() >= Room.botAt && g.bot) for (const id of R.gps) { if (R.st.over) break; const pl = R.ps.find(x => x.id === id); if (!(pl && pl.bot) && !R.auto[id]) continue; const a = g.bot(R.st, id, h); if (a) { g.act(R.st, id, a, h); ch = true; } }
    } catch (e) { console.error(e); }
    if (ch) { finish(); push(); }
  }, 300);
  setInterval(() => {               /* ساعة العرض + الإرسال التلقائي عند انتهاء الوقت */
    const R = Room.R, tb = $('#tb'); if (!tb) return; const st = R && R.ph === 'game' && R.st, dl = st && !st.over && st.dl;
    if (!dl) { tb.className = 'tbar'; return; }
    const left = dl - (Date.now() + Room.off), w = Math.max(0, Math.min(1, left / (st.dlT || 30000)));
    tb.className = 'tbar on' + (left < 6000 ? ' low' : ''); tb.firstChild.style.width = (w * 100) + '%';
    if (left < 700 && left > -1200) { const f = $('#gv [data-auto]'); if (f && Room.autoKey !== dl) { Room.autoKey = dl; if ([...f.querySelectorAll('input')].some(i => i.value.trim())) submit(f); } }
  }, 200);

  function award() {
    const R = Room.R, g = G.by[R.gid], won = R.res.win.includes(P.id), f = (R.st && R.st.fin && R.st.fin[P.id]) || [0, 0, 0, 0], mvp = R.st && R.st.mvp === P.id;
    /* خبرة حقيقية من أداء المباراة: مشاركة + فوز + قتل + رؤوس + مساعدات + أفضل لاعب */
    const parts = [['المشاركة', 20], ['الفوز', won ? 40 : 0], ['القتل ×' + f[0], f[0] * 5], ['إصابات الرأس ×' + f[3], f[3] * 3], ['المساعدات ×' + f[2], f[2] * 2], ['أفضل لاعب', mvp ? 25 : 0]].filter(x => x[1]);
    const xp0 = P.xp; let xp = parts.reduce((a, x) => a + x[1], 0), co = 10 + (won ? 25 : 0) + f[0] * 2;
    P.k += f[0]; P.d += f[1]; P.as += f[2]; P.hs += f[3]; if (mvp) P.mvp++;
    P.played++; P.games[g.id] = (P.games[g.id] || 0) + 1; if (won) { P.won++; P.streak++; } else P.streak = 0;
    if (!P.day.done && g.id === dailyGame().id) { P.day.done = 1; co += 50; toast('أنجزت تحدي اليوم! +50 عملة'); }
    P.week.g.push(g.id); if (!P.week.done && P.week.g.length >= 5) { P.week.done = 1; co += 150; toast('أنجزت تحدي الأسبوع! +150 عملة'); }
    P.xp += xp; P.coins += co; P.hist.unshift({ g: g.id, t: Date.now(), w: won ? 1 : 0, s: (R.st.sc || {})[P.id] || 0, n: R.gps.length }); P.hist = P.hist.slice(0, 20);
    Room.gain = { xp, co, parts, xp0 }; checkAch(); save(); if (won) { beep(660, .12); setTimeout(() => beep(880, .2), 130); } else beep(300, .25, 'triangle');
  }

  /* ---------- الواجهة ---------- */
  function swap(el, html, key) {
    if (el._h === html) return; const a = document.activeElement, id = a && el.contains(a) && a.id, ss = id && a.selectionStart, same = el._k === key, vals = {};
    el.querySelectorAll('input[id]:not([type=file])').forEach(i => { if (same || !i.id.startsWith('f_')) vals[i.id] = i.value; });
    const ms = el.querySelector('.msgs'), mt = ms && ms.scrollTop;
    el.innerHTML = html; el._h = html; el._k = key;
    for (const k in vals) { const i = el.querySelector('#' + k); if (i) i.value = vals[k]; }
    if (id) { const i = el.querySelector('#' + id); if (i) { i.focus(); try { i.setSelectionRange(ss, ss); } catch (e) { } } }
    const m2 = el.querySelector('.msgs'); if (m2) m2.scrollTop = m2.scrollHeight;
  }
  const art = (g, tag = 'div') => `<${tag} class="art" style="--h:${g.hue}">${g.em}</${tag}>`;
  const meta = g => `<div class="meta"><span>👥 ${g.min === g.max ? g.min : g.min + '–' + g.max} لاعبين</span><span>⏱ ${g.t} د</span>${g.cat === 'orig' ? '<span class="new">حصرية</span>' : ''}</div>`;
  function topHTML() {
    return `<div class="wrap"><button class="logo" data-act="home" aria-label="طخطخة — القائمة الرئيسية"><i></i>طخطخة</button><span class="sp"></span>
      <span class="pill" style="color:var(--gold)">🪙 ${P.coins}</span><span class="pill lvl">مستوى ${level()}</span>
      <button class="ib" data-act="snd" aria-label="الصوت">${P.snd ? '🔊' : '🔇'}</button>
      <button class="ib av f${P.fr}" data-act="profile" aria-label="ملفي">${P.av}</button></div>`;
  }
  const CHARS = [['فهد', 'قائد هادئ الأعصاب'], ['صقر', 'خفيف وسريع'], ['زياد', 'مهاجم جريء'], ['أبو سعد', 'خبير ميداني']];
  /* القائمة الرئيسية: مشهد ثلاثي الأبعاد حيّ خلف القائمة، وشخصيتك المختارة في المقدمة */
  function homeHTML() {
    const d = dailyGame(), sk = mySkin(), ch = CHARS[sk], kd = P.d ? (P.k / P.d).toFixed(2) : P.k ? P.k.toFixed(2) : '0.00', hsr = P.k ? Math.round(P.hs / P.k * 100) : 0;
    return `<section class="mm"><div class="mm-bg" id="m3d"></div><div class="mm-grad"></div><div class="mm-ui">
      <div class="mm-top"><button class="mm-logo" data-act="home"><i></i>طخطخة</button><span class="sp"></span>
        <span class="mm-coin">🪙 ${P.coins}</span><button class="mm-ib" data-act="snd" aria-label="الصوت">${P.snd ? '🔊' : '🔇'}</button>
        <button class="mm-me" data-act="profile"><span class="av">${P.av}</span><span><b>${esc(P.n)}</b><small>المستوى ${level()} · ${P.xp % 100}/100</small><span class="xpb"><i style="--w:${P.xp % 100}%"></i></span></span></button></div>
      <nav class="mm-nav"><div class="mm-title"><span class="tag">تكتيكي · فريق ضد فريق</span><h1>طخطخة</h1><p>ازرع القنبلة أو أبطلها. جولات، اقتصاد، وأصدقاؤك عبر رابط واحد.</p></div>
        <button class="mm-b pri" data-act="solo:strike"><span class="ic">▶</span><span><b>العب الآن</b><small>مباراة فورية ضد لاعبين آليين</small></span></button>
        <button class="mm-b" data-act="play:strike"><span class="ic">👥</span><span><b>العب مع أصدقائك</b><small>افتح غرفة وأرسل الرابط</small></span></button>
        <div class="mm-join"><input class="inp" id="join_in" maxlength="4" placeholder="رمز الغرفة" aria-label="رمز الغرفة" autocomplete="off"><button class="btn pri" data-act="join">انضم</button></div>
        <button class="mm-b" data-act="chars"><span class="ic">🪖</span><span><b>الشخصيات</b><small>اختر مقاتلك</small></span></button>
        <button class="mm-b" data-act="profile"><span class="ic">📊</span><span><b>المسيرة والإنجازات</b><small>${Object.keys(P.ach).length}/${ACH.length} إنجاز · ${P.played} مباراة</small></span></button>
        <p class="mm-net">${Net.ok ? '<b>●</b> الخوادم متصلة: الغرف المباشرة تعمل من أي مكان.' : '<b style="color:var(--gold)">●</b> وضع بلا خادم: العب ضد الآليين على هذا الجهاز.'}</p></nav>
      <div class="mm-hero"><div><div class="ds">مقاتلك</div><div class="nm">${ch[0]}</div><div class="ds">${ch[1]}</div></div><button class="btn" data-act="chars">تغيير</button></div>
      <div class="mm-side">
        <div class="mm-card"><small>تحدي اليوم · ${P.day.done ? 'أُنجز ✅' : '+50 عملة'}</small><b>العب مباراة كاملة</b><div class="bar"><i style="--w:${P.day.done ? 100 : 0}%"></i></div></div>
        <div class="mm-card"><small>تحدي الأسبوع · ${P.week.done ? 'أُنجز ✅' : '+150 عملة'}</small><b>5 مباريات (${Math.min(5, P.week.g.length)}/5)</b><div class="bar"><i style="--w:${Math.min(5, P.week.g.length) * 20}%"></i></div></div>
        <div class="mm-card mm-stats"><div><b>${P.played}</b><small>مباراة</small></div><div><b>${P.played ? Math.round(P.won / P.played * 100) : 0}%</b><small>فوز</small></div><div><b>${kd}</b><small>K/D</small></div><div><b>${hsr}%</b><small>رأس</small></div></div>
      </div></div></section>`;
  }
  function chatHTML() {
    const R = Room.R;
    return `<div class="pn chat"><div class="msgs">${R.chat.slice(-25).map(c => c.s ? `<div class="sys">${esc(c.s)}</div>` : `<div><b>${okAv(c.a)} ${esc(c.n)}:</b> ${esc(c.m)}</div>`).join('') || '<div class="sys">الدردشة فارغة. قل مرحباً 👋</div>'}</div>
      <div class="row">${['👍', '😂', '😮', '👏', '🔥', '😭'].map(e => `<button class="btn sm ghost" data-act="react:${e}">${e}</button>`).join('')}</div>
      <div class="row"><input class="inp" id="chat_in" maxlength="120" placeholder="اكتب رسالة…" aria-label="رسالة"><button class="btn" data-act="chat">إرسال</button></div></div>`;
  }
  const isOff = x => !Room.offline && !x.bot && !x.loc && Room.on.length && !Room.on.includes(x.id);
  /* لوبي طخطخة: فريقان، خرائط بمعاينة حقيقية مرسومة من بيانات الخريطة، وشروط بدء واضحة. */
  const MAP_TAG = { 'الحارة': 'أزقة ضيقة وساحة مركزية، مواجهات قريبة', 'المستودع': 'مساحة مفتوحة وصناديق، وسطح مرتفع بدرج خارجي', 'القلعة': 'أسوار ومداخل محصّنة وممرات طويلة', 'السوق': 'سوق مسقوف ودكاكين، والموقع A داخل قاعة مغلقة', 'الميناء': 'مستودع على البحر وممرات حاويات ومكتب إدارة', 'المدرسة': 'فصول وممرات داخلية، والموقع B في الصالة الرياضية' };
  const THUMBS = {};
  function mapThumb(name, width) {
    const key = name + '|' + width, C = window.SKC;
    if (THUMBS[key] !== undefined) return THUMBS[key];
    if (!C || !C.RAW[name]) return '';
    const m = C.parseMap(name), cell = Math.max(2, Math.floor(width / m.w)), cv = document.createElement('canvas');
    cv.width = m.w * cell; cv.height = m.h * cell;
    const g = cv.getContext('2d');
    const col = { '#': '#262a31', P: '#363b44', W: '#56616b', K: '#7a5a3a', S: '#7a5a3a', o: '#6b4f33', p: '#6b4f33', c: '#9a8a66', v: '#9a8a66', r: '#9a8a66', x: '#9a8a66', Q: '#cdc7b8', y: '#bcb49f', z: '#aca28d', w: '#9d9581', d: '#8b7b5b', a: '#e2b84a', b: '#e2b84a', T: '#c9d8e6', D: '#e0c9b0' };
    for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) { const c = m.ch[y * m.w + x]; g.fillStyle = col[c] || '#e4dccb'; g.fillRect(x * cell, y * cell, cell, cell); if (m.ind && m.ind[y * m.w + x]) { g.fillStyle = 'rgba(70,90,120,.32)'; g.fillRect(x * cell, y * cell, cell, cell); } }
    THUMBS[key] = cv.toDataURL();
    return THUMBS[key];
  }
  /* صورة ثلاثية الأبعاد لجندي الفريق داخل اللوبي: تُرسم مرة واحدة لكل زي وفريق ثم تُخزَّن. */
  let SKR = null;
  const SOLDIER_IMG = {};
  function soldierThumb(outfit, team) {
    const key = outfit + '|' + team, T = window.THREE, W = window.SKW;
    if (SOLDIER_IMG[key] !== undefined) return SOLDIER_IMG[key];
    if (!T || !W || !W.soldier) return '';
    try {
      if (!SKR) {
        const cv = document.createElement('canvas');
        cv.width = 160; cv.height = 220;
        const r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
        r.setClearColor(0x000000, 0);
        r.toneMapping = T.ACESFilmicToneMapping; r.outputColorSpace = T.SRGBColorSpace;
        const sc = new T.Scene(), cam = new T.PerspectiveCamera(28, 160 / 220, .1, 50);
        cam.position.set(0, 1.2, 4.6); cam.lookAt(0, .95, 0);
        sc.add(new T.HemisphereLight(0xffffff, 0x4a4f55, 2.2));
        const key1 = new T.DirectionalLight(0xfff3dc, 2.2); key1.position.set(-2.5, 3, 3); sc.add(key1);
        const rim = new T.DirectionalLight(0x9fc4ff, 1.1); rim.position.set(3, 2, -3); sc.add(rim);
        SKR = { cv, r, sc, cam };
      }
      const s = W.soldier(T, { outfit: outfit | 0, team: team | 0, face: null });
      SKR.sc.add(s.root);
      const box = new T.Box3().setFromObject(s.root), c = box.getCenter(new T.Vector3()), h = Math.max(.5, box.max.y - box.min.y);
      const d = (h / 2) / Math.tan(T.MathUtils.degToRad(SKR.cam.fov / 2)) * 1.14;
      SKR.cam.position.set(c.x, c.y, c.z + d); SKR.cam.lookAt(c.x, c.y, c.z);
      SKR.r.render(SKR.sc, SKR.cam);
      const url = SKR.cv.toDataURL('image/png');
      SKR.sc.remove(s.root);
      if (s.dispose) s.dispose();
      SOLDIER_IMG[key] = url;
      return url;
    } catch (e) {
      SOLDIER_IMG[key] = '';
      return '';
    }
  }
  /* تحميل نماذج الشخصيات للوبي (مرة واحدة)، ثم إعادة الرسم */
  let MODELS_P = null, SKIN_SENT = '';
  function ensureModels() {
    if (MODELS_P) return MODELS_P;
    const add = src => new Promise((ok, no) => { const sc = document.createElement('script'); sc.src = src; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
    MODELS_P = (window.MENU3D ? MENU3D.boot() : (window.THREE ? Promise.resolve() : add('js/vendor/three.min.js'))
      .then(() => (window.GLX ? 0 : add('js/vendor/gltf-loader.js')))
      .then(() => (window.SKM ? SKM.load(window.THREE) : false)))
      .then(ok => { if (ok && ((Room.R && Room.R.gid === 'strike' && Room.R.ph !== 'game') || modal)) render(); }, () => { });
    return MODELS_P;
  }
  const mySkin = () => { const c = LS.get('dw_sk', {}); return Math.max(0, Math.min(3, (c && c.skin) | 0)); };
  const seatSkin = x => x.id === P.id ? mySkin() : x.sk != null ? x.sk | 0 : [...String(x.id)].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  /* صورة الخريطة: لقطة جوية ثلاثية الأبعاد حقيقية (تُرسم مرة وتُخزّن)، والمخطط احتياطاً حتى تجهز */
  const mapImg = (name, w) => { const shot = window.MENU3D ? MENU3D.mapShot(name, () => render()) : ''; return shot || mapThumb(name, w || 320); };
  function strikeLobbyHTML() {
    const R = Room.R, host = Room.host, C = window.SKC, ps = R.ps, n = ps.length;
    const side = t => ps.filter(x => (x.team || 1) === t), A = side(1), D = side(2);
    const chosen = R.o.map && R.o.map !== 'عشوائي' && C && C.RAW[R.o.map] ? R.o.map : null, rounds = R.o.w || 5;
    const canStart = host && n >= 2 && A.length > 0 && D.length > 0;
    const why = n < 2 ? 'تحتاج لاعبين اثنين على الأقل' : !A.length ? 'فريق المهاجمين فارغ' : !D.length ? 'فريق المدافعين فارغ' : '';
    const me = ps.find(x => x.id === P.id) || {};
    const ready3 = !!(window.SKM && SKM.ready()); if (!ready3) ensureModels();
    if (me.id && me.sk !== mySkin() && SKIN_SENT !== R.code + mySkin()) { SKIN_SENT = R.code + mySkin(); setTimeout(() => act({ t: 'sk', s: mySkin() }), 0); }
    const seat = x => {
      const mine = x.id === P.id, off = isOff(x), team = (x.team || 1) - 1, img = ready3 ? SKM.thumb(seatSkin(x), team, 150, 200) : '';
      const st = x.id === R.host ? ['قائد الغرفة', 'host'] : x.bot ? ['لاعب آلي', 'bot'] : x.loc ? ['على جهاز القائد', 'bot'] : off ? ['غير متصل', 'off'] : x.rdy ? ['جاهز', 'rdy'] : ['غير جاهز', 'wait'];
      const acts = (host || mine ? '<button data-act="team:' + x.id + '" title="انقل إلى الفريق الآخر" aria-label="بدّل الفريق">⇄</button>' : '') + (host && (x.bot || x.loc || !mine) ? '<button data-act="kick:' + x.id + '" title="أزِل" aria-label="أزل اللاعب">✕</button>' : '');
      return '<div class="lb-p ' + (mine ? 'me ' : '') + st[1] + '"><div class="pic">' + (img ? '<img src="' + img + '" alt="">' : '<span>' + okAv(x.av) + '</span>') + '</div><div class="inf"><b>' + esc(x.n) + (mine ? ' <i>أنت</i>' : '') + '</b><span class="st">' + st[0] + '</span></div><div class="ac">' + acts + '</div></div>';
    };
    const slots = (list, t) => list.map(seat).join('') + (list.length < 5 ? '<div class="lb-p empty">' + (host ? '<button data-act="bot2:' + t + '">+ لاعب آلي</button>' : 'مكان شاغر') + '</div>' : '');
    const names = C ? Object.keys(C.RAW) : [];
    const maps = ['عشوائي'].concat(names).map(name => { const on = name === 'عشوائي' ? !chosen : chosen === name; return '<button class="lb-map ' + (on ? 'on' : '') + '" data-act="' + (host ? 'map' : 'noop') + ':' + name + '"' + (host ? '' : ' disabled') + '>' + (name === 'عشوائي' ? '<span class="rnd">?</span>' : '<img src="' + mapImg(name) + '" alt="">') + '<b>' + name + '</b></button>'; }).join('');
    const link = Room.offline ? '' : location.origin + location.pathname + '#r-' + R.code;
    const bg = chosen ? mapImg(chosen, 640) : '';
    const roundBtns = [3, 5, 8].map(v => '<button class="' + (rounds === v ? 'on' : '') + '" data-act="rounds:' + v + '"' + (host ? '' : ' disabled') + '>' + v + '</button>').join('');
    const chars = ready3 ? SKM.CHARS.map((c, i) => '<button class="lb-ch ' + (mySkin() === i ? 'on' : '') + '" data-act="char:' + i + '" title="' + c.n + '"><img src="' + SKM.thumb(i, (me.team || 1) - 1, 120, 160) + '" alt="' + c.n + '"></button>').join('') : '';
    const go = host ? '<button class="lb-go" data-act="start" ' + (canStart ? '' : 'disabled') + '><b>ابدأ المباراة</b><small>' + (why || (A.length + ' ضد ' + D.length + ' · ' + rounds + ' جولات للفوز')) + '</small></button>'
      : '<button class="lb-go ' + (me.rdy ? 'done' : '') + '" data-act="rdy"><b>' + (me.rdy ? 'جاهز ✓' : 'أنا جاهز') + '</b><small>' + (me.rdy ? 'اضغط للإلغاء · بانتظار القائد' : 'القائد يبدأ عندما يجهز الجميع') + '</small></button>';
    return '<div class="lb">' + (bg ? '<div class="lb-bg" style="background-image:url(' + bg + ')"></div>' : '<div class="lb-bg"></div>') + '<div class="lb-shade"></div><div class="lb-in">'
      + '<div class="lb-head"><div><small>غرفة الانتظار · ' + n + '/' + (R.max || 12) + ' لاعب</small><h2>' + (chosen || 'خريطة عشوائية') + '</h2><p>' + (chosen ? MAP_TAG[chosen] || '' : 'تُختار الخريطة عند البدء') + '</p></div><span class="sp"></span>'
      + (Room.offline ? '<span class="lb-code"><small>غرفة على هذا الجهاز</small></span>' : '<div class="lb-code"><small>رمز الغرفة</small><b>' + R.code + '</b></div><div class="lb-inv"><button data-act="copy">📋 نسخ الرابط</button>' + (navigator.share ? '<button data-act="share">📤 مشاركة</button>' : '') + '<a target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent('تعال العب معي طخطخة 🎯 ' + link) + '">واتساب</a></div>')
      + (host && !Room.offline ? '<div class="lb-host"><button data-act="lock" class="' + (R.lock ? 'on' : '') + '">' + (R.lock ? '🔒 مقفلة' : '🔓 مفتوحة') + '</button><span>الحد <button data-act="max:-1" aria-label="أنقص">−</button><b>' + (R.max || 12) + '</b><button data-act="max:1" aria-label="زد">+</button></span><button data-act="closeroom">إغلاق الغرفة</button></div>' : '')
      + '<button class="lb-x" data-act="leave">مغادرة</button></div>'
      + '<div class="lb-main"><section class="lb-team att"><h3><span>المهاجمون</span><em>' + A.length + '</em></h3>' + slots(A, 1) + '</section>'
      + '<section class="lb-mid"><div class="lb-rounds"><span>جولات الفوز</span>' + roundBtns + '</div><div class="lb-maps">' + maps + '</div>' + (host ? '<button class="lb-loc" data-act="loc">+ لاعب يشاركك هذا الجهاز</button>' : '') + '</section>'
      + '<section class="lb-team def"><h3><span>المدافعون</span><em>' + D.length + '</em></h3>' + slots(D, 2) + '</section></div>'
      + '<div class="lb-bot"><div class="lb-chs"><small>مقاتلك</small><div>' + (chars || '<span class="mut">جارٍ تحميل الشخصيات…</span>') + '</div></div>' + go + '</div>'
      + '<details class="lb-chat"><summary>💬 الدردشة (' + R.chat.length + ')</summary>' + chatHTML() + '</details>'
      + '</div></div>';
  }
  function lobbyHTML() {
    const R = Room.R; if (R && R.gid === 'strike') return strikeLobbyHTML();
    const g = G.by[R.gid], host = Room.host, n = R.ps.length, votes = U.tally(R.gv), meP = R.ps.find(x => x.id === P.id) || {};
    const pls = R.ps.map(x => `<div class="pc ${x.rdy || x.bot || x.loc || x.id === R.host ? 'rdy' : ''} ${isOff(x) ? 'off' : ''} ${R.teams ? 't' + (x.team || 1) : ''}"><span class="av f${x.fr | 0}">${okAv(x.av)}</span><span class="nm">${esc(x.n)}<small>${x.id === R.host ? '👑 قائد الغرفة' : x.bot ? 'لاعب آلي' : x.loc ? 'على جهاز القائد' : isOff(x) ? 'غير متصل' : x.rdy ? 'جاهز ✅' : 'ينتظر…'}${R.teams ? ' · ' + (g && g.teamNames ? g.teamNames[x.team === 2 ? 1 : 0] : 'فريق ' + (x.team === 2 ? 'أزرق' : 'أحمر')) : ''}</small></span>${R.teams && (x.id === P.id || host) ? `<button class="x" data-act="team:${x.id}" aria-label="بدّل الفريق">⇄</button>` : ''}${host && x.id !== P.id ? `<button class="x" data-act="kick:${x.id}" aria-label="إزالة">✕</button>` : ''}</div>`).join('');
    const opts = g && (g.opts || []).map(o => host ? `<label class="chip">${o.n} <select data-opt="${o.k}" id="o_${o.k}">${o.v.map((v, i) => `<option value="${i}" ${String(R.o[o.k] ?? o.d) === String(v) ? 'selected' : ''}>${v}</option>`).join('')}</select></label>` : `<span class="chip">${o.n}: ${R.o[o.k] ?? o.d}</span>`).join('');
    const link = Room.offline ? '' : location.origin + location.pathname + '#r-' + R.code;
    const lg = Object.keys(R.tot).length ? `<div class="pn"><b>دوري الغرفة</b> <small class="mut">فوز = 3 · مشاركة = 1</small><table class="lg">${R.ps.filter(x => R.tot[x.id]).sort((a, b) => R.tot[b.id] - R.tot[a.id]).map((x, i) => `<tr><td>${i + 1}</td><td>${okAv(x.av)} ${esc(x.n)}</td><td>${R.tot[x.id]}</td></tr>`).join('')}</table>${R.teams ? `<p class="mut">🔴 ${R.ps.filter(x => x.team !== 2).reduce((s, x) => s + (R.tot[x.id] || 0), 0)} — ${R.ps.filter(x => x.team === 2).reduce((s, x) => s + (R.tot[x.id] || 0), 0)} 🔵</p>` : ''}${host ? '<button class="btn sm ghost" data-act="resetlg">تصفير الدوري</button>' : ''}</div>` : '';
    return `<div class="wrap room"><div class="cols"><div>
      <div class="pn"><div class="row"><b>اللاعبون (${n}/${R.max || 12})</b>${R.lock ? ' <span class="chip">🔒 مقفلة</span>' : ''}<span class="sp"></span>${host ? `<button class="btn sm" data-act="bot">+ لاعب آلي</button><button class="btn sm" data-act="loc">+ لاعب على هذا الجهاز</button><button class="btn sm ${R.teams ? 'pri' : 'ghost'}" data-act="teams">فِرق</button>` : ''}</div><div class="pl" style="margin-top:10px">${pls}</div></div>
      ${g ? `<div class="pn"><div class="row"><span class="pic">${g.em}</span><div style="flex:1;min-width:200px"><h3 class="big">${g.n}</h3><span class="mut">${g.d}</span></div></div><p>${g.r}</p><div class="row">${opts}</div>${meta(g)}${n < g.min ? `<p class="warn">تحتاج ${g.min - n} لاعبين إضافيين على الأقل.</p>` : n > g.max ? `<p class="warn">هذه اللعبة لـ ${g.max} لاعبين كحد أقصى.</p>` : ''}</div>` : '<div class="pn ctr mut">لم تُختر لعبة بعد. اختر من القائمة بالأسفل.</div>'}
      <div class="row" style="margin:12px 0">${host ? `<button class="btn pri lg" data-act="start" ${g ? '' : 'disabled'}>ابدأ اللعب</button><button class="btn" data-act="rand">🎲 لعبة عشوائية</button>${Object.keys(votes).length ? '<button class="btn" data-act="voted">اعتمد الأكثر تصويتاً</button>' : ''}` : `<button class="btn ${meP.rdy ? '' : 'pri'} lg" data-act="rdy">${meP.rdy ? 'إلغاء الجاهزية' : 'أنا جاهز'}</button><span class="mut">قائد الغرفة يختار اللعبة ويبدأها. صوّت للعبة التي تريدها 👇</span>`}</div>
      <div class="pn"><b>${host ? 'اختر اللعبة' : 'صوّت للعبة القادمة'}</b><div class="pick" style="margin-top:8px">${G.list.map(x => `<button class="pk ${R.gid === x.id ? 'on' : ''} ${n < x.min || n > x.max ? 'no' : ''}" data-act="${host ? 'pick' : 'gv'}:${x.id}"><b>${x.em}</b>${x.n}<br><small class="mut">${x.min === x.max ? x.min : x.min + '–' + x.max}</small>${votes[x.id] ? `<em>${votes[x.id]}</em>` : ''}</button>`).join('')}</div></div>
      </div><div>
      <div class="pn ctr">${Room.offline ? '<b>غرفة على هذا الجهاز</b><p class="mut">أضف لاعبين آليين، أو لاعبين يتناوبون معك على الجهاز نفسه في ألعاب الطاولة.</p>' : `<small class="mut">رمز الغرفة</small><div class="code">${R.code}</div><p class="mut" style="word-break:break-all;font-size:.8rem;direction:ltr">${esc(link)}</p><div class="row ctr"><button class="btn pri" data-act="copy">انسخ رابط الدعوة</button>${navigator.share ? '<button class="btn" data-act="share">مشاركة</button>' : ''}<a class="btn" style="text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('تعال العب معي في ديوانية 🎮 ' + link)}">واتساب</a></div>${host ? `<div class="row ctr" style="margin-top:10px"><button class="btn sm ${R.lock ? 'pri' : ''}" data-act="lock">${R.lock ? '🔒 افتح الغرفة' : '🔓 اقفل الغرفة'}</button><span class="chip">الحد الأقصى <button class="x" data-act="max:-1" aria-label="أقل">−</button><b>${R.max || 12}</b><button class="x" data-act="max:1" aria-label="أكثر">+</button></span></div>` : ''}`}<p><button class="btn sm ghost" data-act="leave">مغادرة الغرفة</button>${host && !Room.offline ? ' <button class="btn sm dng" data-act="closeroom">إغلاق الغرفة للجميع</button>' : ''}</p></div>
      ${lg}${chatHTML()}</div></div></div>`;
  }
  function gameHTML() {
    const R = Room.R, g = G.by[R.gid], h = H(), v = vid(), sc = R.st.sc || {}; let body;
    if (!R.gps.includes(P.id) && v === P.id) body = '<div class="pn ctr"><p class="big">المباراة جارية</p><p class="mut">ستنضم مع بداية اللعبة التالية. تابع النتائج من الأعلى.</p></div>';
    else try { body = g.view(R.st, v, h); } catch (e) { console.error(e); body = '<p class="ctr warn">تعذر عرض هذه المرحلة</p>'; }
    const loc = v !== P.id ? `<p class="ctr"><span class="chip ok">الجهاز الآن مع: ${esc(h.nm(v))}</span></p>` : '';
    return `<div class="wrap room"><div class="gbar"><h2>${g.em} ${g.n}</h2><button class="btn sm ghost" data-act="rules:${g.id}">القواعد</button>${Room.host ? '<button class="btn sm dng" data-act="end">إنهاء</button>' : ''}<button class="btn sm ghost" data-act="leave">خروج</button></div>
      <div class="tbar" id="tb"><i></i></div><div class="sb">${R.gps.map(id => { const pl = R.ps.find(x => x.id === id) || {}, off = isOff(pl); return `<span class="chip ${id === P.id ? 'me' : ''}">${h.av(id)} ${esc(h.nm(id))} <b>${sc[id] ?? 0}</b>${R.auto[id] ? ' 🤖' : off ? ' 📴' : ''}${Room.host && (off || R.auto[id]) && !pl.bot ? `<button class="x" data-act="auto:${id}">${R.auto[id] ? 'أوقف الآلي' : 'لاعب آلي بدلاً منه'}</button>` : ''}</span>`; }).join('')}</div>
      ${loc}<div id="gv">${body}</div>${chatHTML()}</div>`;
  }
  /* نتيجة طخطخة: نصر/هزيمة، أفضل لاعب، جدول الفريقين، والخبرة المكتسبة من الأداء الفعلي */
  function strikeResHTML() {
    const R = Room.R, r = R.res, st = R.st, h = H(), gn = Room.gain, fin = st.fin || {}, tm = st.tm || {}, rs = st.rs || [0, 0], mineT = tm[P.id];
    const won = r.win.includes(P.id), winT = r.win.length ? tm[r.win[0]] : -1, played = R.gps.includes(P.id);
    const ready3 = !!(window.SKM && SKM.ready()), mvp = st.mvp, mvpSeat = R.ps.find(x => x.id === mvp) || { id: mvp }, mf = fin[mvp] || [0, 0, 0, 0];
    const rows = t => R.gps.filter(id => tm[id] === t).sort((a, b) => (fin[b] || [0])[0] - (fin[a] || [0])[0]).map(id => { const f = fin[id] || [0, 0, 0, 0]; return '<tr class="' + (id === P.id ? 'me' : '') + '"><td>' + (id === mvp ? '⭐ ' : '') + esc(h.nm(id)) + '</td><td>' + f[0] + '</td><td>' + f[1] + '</td><td>' + f[2] + '</td><td>' + (f[0] ? Math.round(f[3] / f[0] * 100) : 0) + '%</td></tr>'; }).join('');
    const tbl = t => '<div class="rs-t t' + t + '"><h4>' + (t ? 'المدافعون' : 'المهاجمون') + ' <b>' + rs[t] + '</b>' + (winT === t ? ' <em>فائز</em>' : '') + '</h4><table><thead><tr><th>اللاعب</th><th>قتل</th><th>سقوط</th><th>مساعدة</th><th>رأس</th></tr></thead><tbody>' + rows(t) + '</tbody></table></div>';
    const lv0 = gn ? Math.floor(gn.xp0 / 100) + 1 : level(), lv1 = level(), a = gn && lv1 === lv0 ? gn.xp0 % 100 : 0, b = P.xp % 100;
    const xp = gn && played ? '<div class="rs-xp"><div class="rs-xph"><b>+' + gn.xp + ' خبرة</b><span>🪙 +' + gn.co + '</span></div><ul>' + gn.parts.map(p => '<li><span>' + p[0] + '</span><b>+' + p[1] + '</b></li>').join('') + '</ul><div class="rs-lv"><span>المستوى ' + lv1 + (lv1 > lv0 ? ' <em>جديد!</em>' : '') + '</span><div class="rs-bar"><i style="--a:' + a + '%;--b:' + b + '%"></i></div><small>' + b + '/100</small></div></div>' : '';
    return '<div class="ov rs-ov"><div class="rs ' + (won ? 'win' : 'loss') + '"><div class="rs-ban"><small>انتهت المباراة · ' + esc(st.map || '') + '</small><h1>' + (!played ? 'انتهت المباراة' : won ? 'نصر' : 'هزيمة') + '</h1><div class="rs-sc"><b class="a">' + rs[0] + '</b><span>—</span><b class="d">' + rs[1] + '</b></div></div>'
      + '<div class="rs-body"><div class="rs-mvp">' + (ready3 && mvp ? '<img src="' + SKM.thumb(seatSkin(mvpSeat), tm[mvp] || 0, 300, 400) + '" alt="">' : '') + '<small>أفضل لاعب</small><b>' + esc(mvp ? h.nm(mvp) : '—') + '</b><span>' + mf[0] + ' قتل · ' + mf[3] + ' رأس · ' + mf[2] + ' مساعدة</span></div>'
      + '<div class="rs-tables">' + tbl(0) + tbl(1) + '</div>' + xp + '</div>'
      + '<div class="rs-act">' + (Room.host ? '<button class="lb-go" data-act="again"><b>العب مرة أخرى</b><small>الفرق نفسها والخريطة نفسها</small></button><button class="btn" data-act="end">غرفة الانتظار</button>' : '<span class="mut">بانتظار قرار قائد الغرفة…</span>') + '<button class="btn ghost" data-act="leave">القائمة الرئيسية</button></div></div></div>';
  }
  function resHTML() {
    if (Room.R && Room.R.gid === 'strike' && Room.R.st && Room.R.st.fin) return strikeResHTML();
    const R = Room.R, r = R.res, h = H(), w = r.win, gn = Room.gain;
    const title = r.coop ? (w.length ? 'نجا الفريق! 🎉' : 'خسر الفريق 😵') : !w.length ? 'تعادل 🤝' : w.length === 1 ? `🏆 الفائز: ${esc(h.nm(w[0]))}` : '🏆 فوز مشترك';
    const teams = R.teams ? `<p>🔴 ${r.rank.filter(x => (R.ps.find(p => p.id === x.id) || {}).team !== 2).reduce((s, x) => s + x.s, 0)} — ${r.rank.filter(x => (R.ps.find(p => p.id === x.id) || {}).team === 2).reduce((s, x) => s + x.s, 0)} 🔵</p>` : '';
    return `<div class="ov"><div class="mod res"><div class="sadu"></div><div class="in ctr"><h2>${title}</h2><p class="mut">${esc(r.msg)}</p>
      <div class="rank">${r.rank.map((x, i) => `<div class="${w.includes(x.id) ? 'w' : ''}"><span>${i + 1}</span><span class="av">${h.av(x.id)}</span>${esc(h.nm(x.id))}<b>${x.s}</b></div>`).join('')}</div>${teams}
      ${G.by[R.gid].resView && R.st ? G.by[R.gid].resView(R.st, h) : ''}
      ${gn && R.gps.includes(P.id) ? `<p><span class="chip ok">+${gn.xp} خبرة</span> <span class="chip ok">+${gn.co} 🪙</span></p>` : ''}
      <div class="row ctr">${Room.host ? '<button class="btn pri" data-act="again">العب مرة أخرى</button><button class="btn" data-act="end">لعبة أخرى</button>' : '<span class="mut">بانتظار قرار قائد الغرفة…</span>'}<button class="btn ghost" data-act="hideres">شاهد اللوحة</button><button class="btn ghost" data-act="leave">خروج</button></div></div></div></div>`;
  }
  function modalHTML() {
    const m = modal; if (!m) return '';
    if (m.t === 'game' || m.t === 'rules') {
      const g = G.by[m.id];
      return `<div class="ov" data-act="close"><div class="mod" data-stop>${art(g)}<div class="in"><h2>${g.n}</h2><p class="mut">${g.d}</p>${meta(g)}<p class="row">${[...g.modes].map(k => `<span class="chip">${MODES[k]}</span>`).join('')}</p>${g.menuHTML && m.t === 'game' ? g.menuHTML() : ''}<h3 style="margin-top:10px">طريقة اللعب</h3><p>${g.r}</p>
        <div class="row" style="margin-top:14px">${m.t === 'rules' ? '' : `<button class="btn pri" data-act="play:${g.id}">${Net.ok ? 'افتح غرفة والعب مع الأصدقاء' : 'افتح غرفة على هذا الجهاز'}</button><button class="btn" data-act="solo:${g.id}">جرّبها الآن ضد لاعبين آليين</button>`}<button class="btn ghost" data-act="close">إغلاق</button></div></div></div></div>`;
    }
    if (m.t === 'gate') {
      const g = m.gid && G.by[m.gid];
      return `<div class="ov"><div class="mod" data-stop><div class="sadu"></div><div class="in"><h2>دعوة إلى غرفة ${esc(m.code)}</h2><p class="mut">${m.n} من ${m.max} لاعبين${g ? ` · اللعبة: ${g.em} ${g.n}` : ''}${m.ph === 'game' ? ' · المباراة جارية، ستنضم مع بداية اللعبة التالية' : ''}</p>
        <h3 style="margin-top:10px">اسمك</h3><div class="row"><input class="inp" id="gate_in" maxlength="16" value="${esc(P.n)}" aria-label="اسمك"></div>
        <h3 style="margin-top:12px">صورتك</h3><div class="avs">${AV0.concat(P.own.filter(a => a in AV1)).map(a => `<button class="avb ${P.av === a ? 'on' : ''}" data-act="gav:${a}" aria-label="صورة رمزية">${a}</button>`).join('')}</div>
        <div class="row" style="margin-top:14px"><button class="btn pri lg" data-act="enter">ادخل الغرفة</button><button class="btn ghost" data-act="nogate">ليس الآن</button></div></div></div></div>`;
    }
    if (m.t === 'chars') {
      const sk = mySkin(), ready = !!(window.SKM && SKM.ready()); if (!ready) ensureModels();
      return `<div class="ov" data-act="close"><div class="mod chs" data-stop><div class="chs-big">${ready ? `<img src="${SKM.thumb(sk, 0, 420, 560)}" alt="">` : '<span class="mut">جارٍ تحميل الشخصيات…</span>'}</div>
        <div class="chs-side"><small class="mut">اختر مقاتلك</small><h2>${CHARS[sk][0]}</h2><p class="mut">${CHARS[sk][1]}</p>
        <div class="chs-grid">${CHARS.map((c, i) => `<button class="chs-p ${sk === i ? 'on' : ''}" data-act="char:${i}">${ready ? `<img src="${SKM.thumb(i, 0, 180, 240)}" alt="">` : ''}<b>${c[0]}</b></button>`).join('')}</div>
        <p class="mut" style="font-size:.82rem">يظهر مقاتلك لزملائك وخصومك في كل الغرف، مع خوذة وصدرية بلون فريقك.</p>
        <button class="btn pri lg" data-act="close">تأكيد</button></div></div></div>`;
    }
    if (m.t === 'profile') {
      const rate = P.played ? Math.round(P.won / P.played * 100) : 0;
      return `<div class="ov" data-act="close"><div class="mod" data-stop><div class="sadu"></div><div class="in"><h2>ملفي</h2>
        <div class="row"><span class="av f${P.fr}" style="width:54px;height:54px;font-size:1.9rem">${P.av}</span><input class="inp" id="pn_in" maxlength="16" value="${esc(P.n)}" aria-label="اسمك"><button class="btn" data-act="name">حفظ الاسم</button></div>
        <p class="mut" style="margin-bottom:2px">المستوى ${level()} · ${P.xp % 100}/100 خبرة</p><div class="xp"><i style="--w:${P.xp % 100}%"></i></div>
        <div class="stats pn"><div><b>${P.played}</b><small>مباراة</small></div><div><b>${P.won}</b><small>فوز</small></div><div><b>${rate}%</b><small>نسبة الفوز</small></div><div><b>${P.coins}</b><small>عملة</small></div></div>
        <h3>الصور الرمزية والمتجر</h3><div class="avs">${AV0.concat(Object.keys(AV1)).map(a => { const own = AV0.includes(a) || P.own.includes(a); return `<button class="avb ${P.av === a ? 'on' : ''}" data-act="av:${a}" aria-label="صورة رمزية">${a}${own ? '' : `<small>${AV1[a]} 🪙</small>`}</button>`; }).join('')}</div>
        <div class="row">${FR.map((f, i) => { const own = !i || P.own.includes('f' + i); return `<button class="btn sm ${P.fr === i ? 'pri' : ''}" data-act="fr:${i}">${f[0]}${own ? '' : ` · ${f[1]} 🪙`}</button>`; }).join('')}</div>
        <h3 style="margin-top:14px">الإنجازات (${Object.keys(P.ach).length}/${ACH.length})</h3><div class="ach">${ACH.map(a => `<div class="${P.ach[a[0]] ? 'on' : ''}"><b>${a[1]}</b><br>${a[2]}</div>`).join('')}</div>
        <h3 style="margin-top:14px">وجهك في لعبة طخطخة</h3><div class="row">${P.face ? `<img src="${P.face}" alt="" style="width:54px;height:54px;border-radius:50%;object-fit:cover">` : ''}<label class="btn">📷 ${P.face ? 'غيّر الصورة' : 'أضف صورة وجهك'}<input type="file" accept="image/*" id="face_in" hidden></label>${P.face ? '<button class="btn ghost" data-act="noface">إزالة</button>' : ''}</div><p class="mut" style="font-size:.8rem">تظهر على رأس شخصيتك للاعبين في غرفتك فقط، ولا تُحفظ على الخادم.</p>
        <h3 style="margin-top:14px">آخر المباريات</h3>${P.hist.length ? `<table class="lg">${P.hist.slice(0, 8).map(x => { const g = G.by[x.g]; return g ? `<tr><td>${g.em} ${g.n}</td><td class="mut">${new Date(x.t).toLocaleDateString('ar')}</td><td>${x.w ? 'فوز 🏆' : 'مشاركة'}</td></tr>` : ''; }).join('')}</table>` : '<p class="mut">لم تلعب أي مباراة بعد.</p>'}
        <p class="mut" style="font-size:.8rem">ملفك محفوظ على هذا الجهاز فقط.</p><div class="row"><button class="btn ghost" data-act="close">إغلاق</button></div></div></div></div>`;
    }
    return '';
  }
  let lastTurn = '';
  function render() {
    const R = Room.R; $('#top').innerHTML = topHTML();
    const main = $('#main'); let key = view, html, over = '';
    if (view === 'home') html = homeHTML();
    else if (!R) html = '<div class="wrap room"><div class="pn ctr"><p class="big">جارٍ دخول الغرفة…</p><button class="btn ghost" data-act="leave">إلغاء</button></div></div>';
    else if (R.ph === 'game' && R.st) { const st = R.st; key = ['g', R.gk, st.ph, st.i, st.rd, st.k, st.day].join('|'); html = gameHTML(); }
    else html = lobbyHTML();
    swap(main, html, key);
    document.body.classList.toggle('mm-on', view === 'home');
    if (window.MENU3D) { const host = view === 'home' && document.getElementById('m3d'); if (host) { MENU3D.mount(host, { skin: mySkin() }); MENU3D.pause(!!modal); } else MENU3D.unmount(); }
    if (R && R.ph === 'game' && R.st) {
      const g = G.by[R.gid]; if (g.bind) g.bind(main, R.st, vid(), a => act({ t: 'g', a }, vid()), H());
      if (R.res) { const ak = (Room.offline ? Room.sess : R.code) + '|' + R.gk; if (Room.awarded !== ak && LS.get('dw_aw', '') !== ak) { Room.awarded = ak; LS.set('dw_aw', ak); Room.gain = null; if (R.gps.includes(P.id)) award(); $('#top').innerHTML = topHTML(); } if (!Room.hideRes) over = resHTML(); }
      const t = g.turn && !R.st.over ? g.turn(R.st) : ''; if (t !== lastTurn) { lastTurn = t; if (t === P.id) beep(880, .1); }
    }
    swap($('#modal'), over || modalHTML(), 'm');
    if (!over && modal && modal.t === 'game' && G.by[modal.id].preview) G.by[modal.id].preview(document.querySelector('#modal .art'));
  }
  function submit(f) {
    if (!f) return; const a = JSON.parse(f.dataset.form);
    f.querySelectorAll('input').forEach(i => { a[i.name] = i.type === 'number' ? Number(i.value) : i.value; i.value = ''; });
    act({ t: 'g', a }, vid());
  }
  function cmd(c, x, el) {
    const R = Room.R, host = Room.host; beep(520, .04);
    switch (c) {
      case 'home': if (view === 'room' && R) { toast('أنت داخل غرفة. اضغط «مغادرة الغرفة» للعودة'); return; } view = 'home'; modal = null; break;
      case 'theme': { const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches; P.theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = P.theme; save(); break; }
      case 'snd': P.snd = P.snd ? 0 : 1; save(); break;
      case 'profile': modal = { t: 'profile' }; break;
      case 'chars': modal = { t: 'chars' }; break;
      case 'gav': P.av = x; save(); break;
      case 'enter': { const n = txt(($('#gate_in') || {}).value, 16); if (n) P.n = n; P.named = 1; save(); joinRoom(modal.code, true); return; }
      case 'nogate': modal = null; try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { } break;
      case 'share': { const link = location.origin + location.pathname + '#r-' + R.code, text = `تعال العب معي في ديوانية 🎮 رمز الغرفة ${R.code}`; if (navigator.share) navigator.share({ title: 'ديوانية', text, url: link }).catch(() => { }); else cmd('copy'); return; }
      case 'max': if (host && R) { R.max = Math.max(Math.max(2, R.ps.length), Math.min(12, (R.max || 12) + (+x))); push(); } return;
      case 'close': modal = null; break;
      case 'cat': filt.cat = x; break; case 'mode': filt.mode = x; break;
      case 'game': if (view === 'room') return; modal = { t: 'game', id: x }; break;
      case 'rules': modal = { t: 'rules', id: x }; break;
      case 'create': createRoom(); return;
      case 'play': createRoom(x); return;
      case 'solo': createRoom(x, true).then(() => { const g = G.by[x], want = g.solo || Math.max(g.min, Math.min(g.max, g.min <= 2 ? 3 : g.min + 1)); while (Room.R.ps.length < want) addSeat('bot'); start(); }); return;
      case 'join': joinRoom(($('#join_in') || {}).value); return;
      case 'leave': leave(); return;
      case 'copy': { const link = location.origin + location.pathname + '#r-' + R.code; (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(() => toast('نُسخ رابط الدعوة ✅'), () => toast('انسخ الرابط الظاهر يدوياً')); return; }
      case 'skin': if (modal && G.by[modal.id] && G.by[modal.id].setSkin) G.by[modal.id].setSkin(+x); break;
      case 'noface': delete P.face; save(); window.dispatchEvent(new Event('dw-face')); break;
      case 'name': { const n = txt(($('#pn_in') || {}).value, 16); if (n) { P.n = n; P.named = 1; save(); if (R) act({ t: 'prof', n: P.n, av: P.av, fr: P.fr }); toast('تم حفظ الاسم'); } break; }
      case 'av': { const own = AV0.includes(x) || P.own.includes(x); if (!own) { if (P.coins < AV1[x]) { toast('عملاتك لا تكفي. العب أكثر لتجمع العملات'); return; } P.coins -= AV1[x]; P.own.push(x); toast('تم الشراء 🎉'); } P.av = x; save(); if (R) act({ t: 'prof', n: P.n, av: P.av, fr: P.fr }); break; }
      case 'fr': { const i = +x, own = !i || P.own.includes('f' + i); if (!own) { if (P.coins < FR[i][1]) { toast('عملاتك لا تكفي'); return; } P.coins -= FR[i][1]; P.own.push('f' + i); } P.fr = i; save(); if (R) act({ t: 'prof', n: P.n, av: P.av, fr: P.fr }); break; }
      case 'chat': { const i = $('#chat_in'), m = txt(i && i.value, 120); if (m) { i.value = ''; act({ t: 'chat', m }); } return; }
      case 'react': act({ t: 'chat', m: x }); return;
      case 'rdy': act({ t: 'rdy' }); return;
      case 'bot2': { if (!host || !R) return; const before = R.ps.length; cmd('bot'); const nb = R.ps[R.ps.length - 1]; if (R.ps.length > before && nb && nb.bot && (nb.team || 1) !== +x) { nb.team = +x; push(); } return; }
      case 'char': { const c = LS.get('dw_sk', {}) || {}; c.skin = Math.max(0, Math.min(3, +x | 0)); LS.set('dw_sk', c); SKIN_SENT = R ? R.code + c.skin : ''; if (R) act({ t: 'sk', s: c.skin }); if (window.MENU3D) MENU3D.setSkin(c.skin); render(); return; }
      case 'gv': act({ t: 'gv', g: x }); return;
      case 'team': if (host) { const pl = R.ps.find(p => p.id === x); if (pl) pl.team = pl.team === 1 ? 2 : 1; push(); } else act({ t: 'team' }); return;
      case 'hideres': Room.hideRes = 1; break;
    }
    if (host && R) {
      let ch = true;
      switch (c) {
        case 'pick': R.gid = x; R.o = defOpts(G.by[x]); if (G.by[x].teams) R.teams = 1; break;
        case 'map': if (R.gid === 'strike') R.o.map = x; break;
        case 'rounds': if (R.gid === 'strike') R.o.w = +x; break;
        case 'rand': { const ok = G.list.filter(g => R.ps.length >= g.min && R.ps.length <= g.max && g.id !== R.gid && (g.local || !R.ps.some(p => p.loc))); if (!ok.length) { toast('لا توجد لعبة تناسب هذا العدد'); return; } const g = U.pick(ok); R.gid = g.id; R.o = defOpts(g); break; }
        case 'voted': { const v = U.tally(R.gv), top = Object.keys(v).sort((a, b) => v[b] - v[a])[0]; if (top) { R.gid = top; R.o = defOpts(G.by[top]); } break; }
        case 'bot': addSeat('bot'); break; case 'loc': addSeat('loc'); break;
        case 'kick': { const k = R.ps.find(p => p.id === x); R.ps = R.ps.filter(p => p.id !== x); if (k && !k.bot && !k.loc) { R.ban = (R.ban || []).concat(x).slice(-50); delete R.auto[x]; sys(`أُزيل ${k.n} من الغرفة`); } break; }
        case 'lock': R.lock = R.lock ? 0 : 1; sys(R.lock ? 'قُفلت الغرفة: لا يدخلها لاعبون جدد' : 'فُتحت الغرفة'); break;
        case 'closeroom': if (!Room.offline) Net.post('close', {}, '&k=' + Room.hk).catch(() => { }); toast('أُغلقت الغرفة'); leave(true); return;
        case 'teams': R.teams = R.teams ? 0 : 1; break;
        case 'resetlg': R.tot = {}; break;
        case 'auto': if (R.auto[x]) delete R.auto[x]; else R.auto[x] = 1; break;
        case 'start': start(); return; case 'again': start(); return;
        case 'end': R.ph = 'lobby'; R.st = null; R.res = null; R.gps = []; break;
        default: ch = false;
      }
      if (ch) { push(); return; }
    }
    render();
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-a],[data-ui],[data-go],[data-act],[data-stop]'); if (!t || t.disabled || t.dataset.stop != null) return;
    if (t.dataset.act != null) { const i = t.dataset.act.indexOf(':'); cmd(i < 0 ? t.dataset.act : t.dataset.act.slice(0, i), i < 0 ? undefined : t.dataset.act.slice(i + 1), t); return; }
    if (t.dataset.go != null) { beep(520, .04); submit(t.closest('[data-form]')); return; }
    if (t.dataset.ui) { Object.assign(Room.ui, JSON.parse(t.dataset.ui)); render(); return; }
    if (t.dataset.a && Room.R) { beep(520, .04); const g = G.by[Room.R.gid]; if (g.id !== 'draw') Room.ui = {}; act({ t: 'g', a: JSON.parse(t.dataset.a) }, vid()); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal) { modal = null; render(); return; }
    if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return; const f = e.target.closest('[data-form]');
    if (f) { const ins = [...f.querySelectorAll('input')], i = ins.indexOf(e.target); if (i < ins.length - 1) ins[i + 1].focus(); else submit(f); }
    else if (e.target.id === 'chat_in') cmd('chat'); else if (e.target.id === 'join_in') cmd('join'); else if (e.target.id === 'pn_in') cmd('name');
  });
  document.addEventListener('input', e => { if (e.target.id === 'q') { filt.q = e.target.value; render(); } });
  document.addEventListener('change', e => { if (e.target.id === 'face_in' && e.target.files[0]) { setFace(e.target.files[0]).then(() => { toast('تم حفظ صورة وجهك ✅'); render(); }, () => toast('تعذر قراءة الصورة')); return; } const k = e.target.dataset && e.target.dataset.opt, R = Room.R; if (k && R && Room.host) { const o = G.by[R.gid].opts.find(o => o.k === k); R.o[k] = o.v[+e.target.value]; push(); } });

  /* ---------- الإقلاع ---------- */
  document.documentElement.dataset.theme = 'dark';
  $('#app').innerHTML = '<header class="top" id="top"></header><main id="main"></main><div id="modal"></div>';
  render();
  Net.ping().then(() => { render(); const m = location.hash.match(/^#r-([A-Za-z0-9]{4})$/); if (m) { if (Net.ok) joinRoom(m[1], !!LS.get('dw_hk_' + m[1].toUpperCase(), null)); else toast('رابط غرفة مباشرة: يعمل عند فتحه من خادم ديوانية'); } });
  window.addEventListener('hashchange', () => { const m = location.hash.match(/^#r-([A-Za-z0-9]{4})$/); if (m && Net.ok && !Room.R && view !== 'room') joinRoom(m[1]); });
  window.DW = { Room, P, Net, setFace };
})();
