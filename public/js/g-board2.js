/* ألعاب الطاولة 2: السلم والثعبان، لودو، أربعة ألوان، تاجر المدن */
(function () {
  const { esc } = U;
  const turnLine = (st, H) => st.over ? '' : `<p class="ctr">الدور على ${U.who(H, st.ps[st.k])}</p>`;
  const COL = ['#e5484d', '#2fa36b', '#e8a317', '#3b82f6', '#a855f7', '#0ea5a4'];

  /* ---------- السلم والثعبان ---------- */
  const SL = { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 87: 94, 16: 6, 46: 25, 49: 11, 62: 19, 64: 60, 74: 53, 89: 68, 92: 88, 95: 75, 99: 80 };
  const slXY = n => { const r = Math.floor((n - 1) / 10); let c = (n - 1) % 10; if (r & 1) c = 9 - c; return [c * 10 + 5, (9 - r) * 10 + 5]; };
  G.reg({
    id: 'snakes', n: 'السلم والثعبان', cat: 'board', em: '🐍', hue: 140, min: 2, max: 6, t: 10, modes: 'f', local: 1,
    d: 'ارمِ النرد، اصعد السلالم واحذر الثعابين.',
    r: 'يرمي كل لاعب النرد في دوره ويتقدم. السلم يرفعك والثعبان ينزلك. من يرمي 6 يلعب مرة أخرى. يجب أن تصل الخانة 100 بالعدد المضبوط، وأول الواصلين يفوز.',
    init(ps) { return { ps, pos: U.zero(ps), k: 0, d: 0, sc: U.zero(ps), msg: '' }; },
    turn: st => st.ps[st.k],
    act(st, p, a, H) {
      if (st.over || p !== st.ps[st.k] || a.t !== 'roll') return;
      const d = 1 + U.rnd(6); st.d = d; let n = st.pos[p] + d; st.msg = '';
      if (n > 100) { n = st.pos[p]; st.msg = `${H.nm(p)} يحتاج العدد المضبوط`; }
      else if (SL[n]) { st.msg = `${H.nm(p)} ${SL[n] > n ? 'صعد سلماً 🪜' : 'لدغه ثعبان 🐍'}`; n = SL[n]; }
      st.pos[p] = n; st.sc[p] = n;
      if (n === 100) { st.over = { win: [p] }; return; }
      if (d !== 6) st.k = (st.k + 1) % st.ps.length;
    },
    view(st, me, H) {
      let cells = '';
      for (let row = 9; row >= 0; row--) for (let c = 0; c < 10; c++) {
        const n = row * 10 + ((row & 1) ? 9 - c : c) + 1;
        const tk = st.ps.map((p, i) => st.pos[p] === n ? `<b style="background:${COL[i]}">${H.av(p)}</b>` : '').join('');
        cells += `<div class="slc${SL[n] ? (SL[n] > n ? ' up' : ' dn') : ''}"><small>${n}</small>${tk}</div>`;
      }
      let svg = '';
      for (const a in SL) { const [x1, y1] = slXY(+a), [x2, y2] = slXY(SL[a]); svg += SL[a] > a ? `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="lad"/>` : `<path d="M${x1} ${y1} Q${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 4} ${x2} ${y2}" class="snk"/><circle cx="${x1}" cy="${y1}" r="1.6" class="snh"/>`; }
      const my = !st.over && st.ps[st.k] === me;
      return turnLine(st, H) + `<div class="slb ltr"><div class="slg">${cells}</div><svg viewBox="0 0 100 100">${svg}</svg></div>
        <div class="row ctr">${U.dice(st.d)} ${my ? U.B('ارمِ النرد', { t: 'roll' }, 'pri') : ''}</div>
        <p class="ctr mut">${esc(st.msg)}</p><div class="row ctr">${st.ps.filter(p => !st.pos[p]).map(p => `<span class="chip">${H.av(p)} عند البداية</span>`).join('')}</div>`;
    },
    bot(st, p) { if (st.ps[st.k] === p) return { t: 'roll' }; },
  });

  /* ---------- لودو ---------- */
  const LP = []; (() => { const a = (r, c) => LP.push([r, c]); for (let c = 1; c <= 5; c++) a(6, c); for (let r = 5; r >= 0; r--) a(r, 6); a(0, 7); a(0, 8); for (let r = 1; r <= 5; r++) a(r, 8); for (let c = 9; c <= 14; c++) a(6, c); a(7, 14); a(8, 14); for (let c = 13; c >= 9; c--) a(8, c); for (let r = 9; r <= 14; r++) a(r, 8); a(14, 7); a(14, 6); for (let r = 13; r >= 9; r--) a(r, 6); for (let c = 5; c >= 0; c--) a(8, c); a(7, 0); a(6, 0); })();
  const LS = [0, 13, 26, 39], LSAFE = [0, 8, 13, 21, 26, 34, 39, 47], LYD = [[0, 0], [0, 9], [9, 9], [9, 0]];
  const lHome = (s, k) => [[7, k], [k, 7], [7, 14 - k], [14 - k, 7]][s];
  const lCell = (s, g, i) => g < 0 ? [LYD[s][0] + 1 + (i >> 1) * 3, LYD[s][1] + 1 + (i & 1) * 3] : g <= 50 ? LP[(LS[s] + g) % 52] : g < 56 ? lHome(s, g - 50) : [7, 7];
  const lValid = (st, p) => st.tk[p].map((g, i) => (g < 0 ? st.d === 6 : g < 56 && g + st.d <= 56) ? i : -1).filter(i => i >= 0);
  function lMove(st, p, i, H) {
    const s = st.seat[p], g = st.tk[p][i], n = g < 0 ? 0 : g + st.d; st.tk[p][i] = n; let extra = st.d === 6;
    if (n <= 50) {
      const ab = (LS[s] + n) % 52;
      if (!LSAFE.includes(ab)) for (const q of st.ps) if (q !== p) st.tk[q].forEach((x, j) => { if (x >= 0 && x <= 50 && (LS[st.seat[q]] + x) % 52 === ab) { st.tk[q][j] = -1; extra = true; st.msg = `${H.nm(p)} أعاد قطعة ${H.nm(q)} إلى البيت!`; } });
    }
    if (n === 56) { st.sc[p]++; extra = true; if (st.tk[p].every(x => x === 56)) { st.over = { win: [p] }; return; } }
    st.d = 0; if (!extra) st.k = (st.k + 1) % st.ps.length;
  }
  G.reg({
    id: 'ludo', n: 'لودو', cat: 'board', em: '🎲', hue: 48, min: 2, max: 4, t: 20, modes: 'fp', local: 1,
    d: 'أخرج قطعك ودُر بها حول اللوحة حتى البيت قبل الجميع.',
    r: 'ارمِ النرد: تحتاج 6 لإخراج قطعة من القاعدة. إذا نزلت على قطعة خصم خارج الخانات الآمنة (المميزة بنجمة وخانات الانطلاق) تعيدها إلى قاعدتها. تحصل على رمية إضافية عند الرقم 6 أو عند أكل قطعة أو إدخال قطعة إلى البيت. يجب العدد المضبوط لدخول البيت. يفوز أول من يُدخل كل قطعه.',
    opts: [{ k: 'tk', n: 'عدد القطع', v: [2, 4], d: 4 }],
    init(ps, o) {
      const seats = ps.length === 2 ? [0, 2] : [0, 1, 2, 3], st = { ps, seat: {}, tk: {}, k: 0, d: 0, sc: U.zero(ps), msg: '' };
      ps.forEach((p, i) => { st.seat[p] = seats[i]; st.tk[p] = Array(o.tk || 4).fill(-1); }); return st;
    },
    turn: st => st.ps[st.k],
    act(st, p, a, H) {
      if (st.over || p !== st.ps[st.k]) return;
      if (a.t === 'roll' && !st.d) {
        st.d = 1 + U.rnd(6); st.msg = ''; const v = lValid(st, p);
        if (!v.length) { st.msg = `${H.nm(p)} رمى ${st.d} ولا نقلة متاحة`; const six = st.d === 6; st.d = 0; st.ld = six ? 6 : st.ld; if (!six) st.k = (st.k + 1) % st.ps.length; }
        else if (v.length === 1 || v.every(i => st.tk[p][i] === st.tk[p][v[0]])) { st.ld = st.d; lMove(st, p, v[0], H); }
        else st.ld = st.d;
      } else if (a.t === 'mv' && st.d && lValid(st, p).includes(a.i)) lMove(st, p, a.i, H);
    },
    view(st, me, H) {
      const cell = Array.from({ length: 225 }, () => ({ c: '', t: '' }));
      for (let s = 0; s < 4; s++) { const [br, bc] = LYD[s]; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) cell[(br + r) * 15 + bc + c].c = 'yd s' + s; for (let k = 1; k <= 5; k++) { const [r, c] = lHome(s, k); cell[r * 15 + c].c = 'hm s' + s; } }
      for (let r = 6; r <= 8; r++) for (let c = 6; c <= 8; c++) cell[r * 15 + c].c = 'cn';
      LP.forEach(([r, c], i) => { cell[r * 15 + c].c = 'tr' + (LS.includes(i) ? ' s' + LS.indexOf(i) : LSAFE.includes(i) ? ' sf' : ''); });
      const my = !st.over && st.ps[st.k] === me, v = my && st.d ? lValid(st, me) : [];
      for (const p of st.ps) st.tk[p].forEach((g, i) => { const [r, c] = lCell(st.seat[p], g, i); cell[r * 15 + c].t += `<button class="ltk s${st.seat[p]}${p === me && v.includes(i) ? ' can' : ''}" ${p === me && v.includes(i) ? U.A({ t: 'mv', i }) : 'disabled'}></button>`; });
      return turnLine(st, H) + `<div class="ludo ltr">${cell.map(x => `<div class="${x.c}">${x.t}</div>`).join('')}</div>
        <div class="row ctr">${st.ps.map(p => `<span class="chip"><i class="dot s${st.seat[p]}"></i>${esc(H.nm(p))}</span>`).join('')}</div>
        <div class="row ctr">${U.dice(st.d || st.ld)} ${my && !st.d ? U.B('ارمِ النرد', { t: 'roll' }, 'pri') : my ? '<span class="mut">اختر قطعة لتحريكها</span>' : ''}</div><p class="ctr mut">${esc(st.msg)}</p>`;
    },
    bot(st, p) { if (st.ps[st.k] !== p) return; return st.d ? { t: 'mv', i: U.pick(lValid(st, p)) } : { t: 'roll' }; },
  });

  /* ---------- أربعة ألوان (لعبة ورق أصلية بروح أونو) ---------- */
  const UC = 'rgby', USYM = { S: '⊘', R: '⇄', D: '+2', W: '★', F: '+4', T: '🌪' };
  const unoOk = (st, c) => c[0] === 'w' || c[0] === st.col || c[1] === st.top[1];
  const unoPts = c => c[0] === 'w' ? 50 : /\d/.test(c[1]) ? +c[1] : 20;
  function unoDraw(st, p, n) { for (let i = 0; i < n; i++) { if (!st.deck.length) { st.deck = U.shuf(st.disc); st.disc = []; } if (!st.deck.length) return; st.hands[p].push(st.deck.pop()); } }
  const unoCard = (c, at = 'disabled', cls = '') => `<button class="uc c-${c[0]} ${cls}" ${at}>${USYM[c[1]] || c[1]}</button>`;
  G.reg({
    id: 'colors', n: 'أربعة ألوان', cat: 'board', em: '🎴', hue: 350, min: 2, max: 8, t: 10, modes: 'fp',
    d: 'تخلّص من أوراقك أولاً، واحذر ورقة العاصفة التي تدوّر كل الأيادي!',
    r: 'العب ورقة تطابق لون الورقة المكشوفة أو رمزها. ⊘ تتخطى اللاعب التالي، ⇄ تعكس الاتجاه، +2 و +4 تسحّبان اللاعب التالي وتتخطيانه، ★ تغيّر اللون. ورقة العاصفة 🌪 خاصة بديوانية: كل لاعب يسلّم أوراقه كلها للاعب الذي يليه! إن لم تجد ورقة فاسحب واحدة. أول من تنتهي أوراقه يفوز ويجمع نقاط أوراق الباقين.',
    init(ps) {
      const d = []; for (const c of UC) { d.push(c + '0'); for (const v of '123456789SRD') d.push(c + v, c + v); }
      for (let i = 0; i < 4; i++) d.push('wW', 'wF'); d.push('wT', 'wT');
      const st = { ps, deck: U.shuf(d), disc: [], hands: {}, k: 0, dir: 1, drew: 0, n: 0, sc: U.zero(ps) };
      for (const p of ps) st.hands[p] = st.deck.splice(0, 7);
      const i = st.deck.findIndex(c => /\d/.test(c[1])); st.top = st.deck.splice(i, 1)[0]; st.col = st.top[0]; return st;
    },
    act(st, p, a, H) {
      if (st.over || st.ps[st.k] !== p) return; const h = st.hands[p], n = st.ps.length;
      const at = s => st.ps[((st.k + st.dir * s) % n + n) % n], nx = s => { st.k = ((st.k + st.dir * s) % n + n) % n; st.drew = 0; if (++st.n > 500) st.over = { win: [st.ps.slice().sort((x, y) => st.hands[x].length - st.hands[y].length)[0]], msg: 'انتهى الوقت' }; };
      if (a.t === 'p') {
        const c = h[a.i]; if (!c || !unoOk(st, c) || (st.drew && a.i !== h.length - 1) || (c[0] === 'w' && !UC.includes(a.col) )) return;
        h.splice(a.i, 1); st.disc.push(st.top); st.top = c; st.col = c[0] === 'w' ? a.col : c[0]; st.msg = '';
        if (!h.length) { st.sc[p] = st.ps.reduce((s, q) => s + st.hands[q].reduce((x, y) => x + unoPts(y), 0), 0); st.over = { win: [p] }; return; }
        const v = c[1]; let s = 1;
        if (v === 'R') { st.dir *= -1; if (n === 2) s = 2; }
        else if (v === 'S') s = 2;
        else if (v === 'D') { unoDraw(st, at(1), 2); s = 2; }
        else if (v === 'F') { unoDraw(st, at(1), 4); s = 2; }
        else if (v === 'T') { const hs = st.ps.map(q => st.hands[q]); st.ps.forEach((q, i) => st.hands[q] = hs[((i - st.dir) % n + n) % n]); st.msg = '🌪 عاصفة! دارت كل الأوراق'; }
        nx(s);
      } else if (a.t === 'd' && !st.drew) {
        const before = h.length; unoDraw(st, p, 1);
        if (h.length > before && unoOk(st, h[h.length - 1])) st.drew = 1; else nx(1);
      } else if (a.t === 'pass' && st.drew) nx(1);
    },
    view(st, me, H) {
      const my = !st.over && st.ps[st.k] === me, h = st.hands[me] || [], w = H.ui.w;
      let o = `<div class="row ctr">${st.ps.map((p, i) => `<span class="chip ${i === st.k ? 'ok' : ''}">${H.av(p)} ${esc(H.nm(p))} · ${st.hands[p].length} 🂠</span>`).join('')}</div>
        <div class="row ctr unotop">${unoCard(st.top, 'disabled', 'big')}<div><div class="swatch c-${st.col}"></div><small class="mut">اللون الحالي · الاتجاه ${st.dir > 0 ? '⟳' : '⟲'}</small></div></div><p class="ctr mut">${esc(st.msg || '')}</p>`;
      if (my && w != null && h[w] && h[w][0] === 'w') return o + `<p class="ctr">اختر اللون</p><div class="row ctr">${[...UC].map(c => `<button class="uc c-${c}" ${U.A({ t: 'p', i: w, col: c })}></button>`).join('')}${`<button class="btn ghost" ${U.UI({ w: null })}>رجوع</button>`}</div>`;
      o += `<div class="hand ltr">${h.map((c, i) => { const ok = my && unoOk(st, c) && (!st.drew || i === h.length - 1); return unoCard(c, ok ? (c[0] === 'w' ? U.UI({ w: i }) : U.A({ t: 'p', i })) : 'disabled', ok ? 'ok' : ''); }).join('')}</div>`;
      if (my) o += `<p class="ctr">${st.drew ? U.B('تخطَّ دوري', { t: 'pass' }, 'ghost') : U.B('اسحب ورقة', { t: 'd' }, 'pri')}</p>`;
      return o;
    },
    bot(st, p) {
      if (st.ps[st.k] !== p) return; const h = st.hands[p];
      for (let i = h.length - 1; i >= 0; i--) if (unoOk(st, h[i]) && (!st.drew || i === h.length - 1)) return { t: 'p', i, col: U.pick([...UC]) };
      return st.drew ? { t: 'pass' } : { t: 'd' };
    },
  });

  /* ---------- تاجر المدن (لعبة عقارات بروح مونوبولي) ---------- */
  const TY = [['go', 'الانطلاق'], ['p', 'حائل', 60, 0], ['ch', 'حظ'], ['p', 'تبوك', 80, 0], ['tax', 'ضريبة'], ['p', 'أبها', 100, 1],
  ['rest', 'استراحة'], ['p', 'الطائف', 120, 1], ['p', 'ينبع', 140, 2], ['ch', 'حظ'], ['p', 'المدينة', 160, 2], ['p', 'الدمام', 180, 3],
  ['gift', 'مهرجان'], ['p', 'الخبر', 200, 3], ['p', 'المنامة', 220, 4], ['ch', 'حظ'], ['p', 'الدوحة', 240, 4], ['p', 'مسقط', 260, 5],
  ['stop', 'مخالفة'], ['p', 'الكويت', 280, 5], ['p', 'أبوظبي', 300, 6], ['tax', 'ضريبة'], ['p', 'دبي', 320, 6], ['p', 'الرياض', 400, 7]];
  const TYG = ['#8d6e63', '#38bdf8', '#ec4899', '#f97316', '#ef4444', '#eab308', '#22c55e', '#6366f1'];
  const TYC = [['ربحت مسابقة الحي', 100], ['صيانة السيارة', -50], ['عيدية من الجدّة', 150], ['مخالفة سرعة', -80], ['بعت أغراضاً قديمة', 60], ['عزمت الشلّة على العشاء', -120]];
  const tyPos = i => i <= 6 ? [6, 6 - i] : i <= 12 ? [12 - i, 0] : i <= 18 ? [0, i - 12] : [i - 18, 6];
  const tyRent = (st, i) => { const g = TY[i][3], o = st.own[i], full = TY.every((t, j) => t[3] !== g || st.own[j] === o); return TY[i][2] / 10 * (full ? 2 : 1) * (1 + 2 * (st.lv[i] || 0)); };
  const tyNet = (st, p) => st.cash[p] + TY.reduce((s, t, i) => s + (st.own[i] === p ? t[2] * (1 + (st.lv[i] || 0) / 2) : 0), 0);
  function tyPay(st, p, amt, to, H) {
    if (st.cash[p] >= amt) { st.cash[p] -= amt; if (to) st.cash[to] += amt; return; }
    if (to) st.cash[to] += st.cash[p]; st.cash[p] = 0; st.out[p] = 1;
    for (const i in st.own) if (st.own[i] === p) { delete st.own[i]; delete st.lv[i]; }
    st.msg += ` — ${H.nm(p)} أفلس وخرج من اللعبة!`;
  }
  function tyEnd(st) {
    const live = st.ps.filter(p => !st.out[p]); for (const p of st.ps) st.sc[p] = st.out[p] ? 0 : tyNet(st, p);
    if (live.length <= 1) { st.over = { win: live }; return; }
    for (let i = 0; i < 20; i++) {
      st.k = (st.k + 1) % st.ps.length; if (st.k === 0 && ++st.rd >= st.max) { st.over = { win: U.top(st.sc), msg: 'انتهت الجولات — الفوز للأغنى' }; return; }
      const p = st.ps[st.k]; if (st.out[p]) continue; if (st.skip[p]) { delete st.skip[p]; continue; } break;
    }
    st.ph = 'roll';
  }
  G.reg({
    id: 'tycoon', n: 'تاجر المدن', cat: 'board', em: '🏙️', hue: 160, min: 2, max: 6, t: 25, modes: 'ps', local: 1,
    d: 'اشترِ المدن، طوّرها، واجمع الإيجارات حتى يفلس خصومك.',
    r: 'يبدأ كل لاعب بـ 1500 ريال افتراضي. ارمِ النرد وتحرك: المدينة الحرة يمكنك شراؤها، ومدينة غيرك تدفع إيجارها، ومدينتك يمكنك تطويرها (حتى 3 مستويات) لمضاعفة الإيجار. امتلاك مدينتَي اللون نفسه يضاعف الإيجار. المرور بالانطلاق يمنحك 200. من يعجز عن الدفع يفلس. يفوز آخر الصامدين أو الأغنى عند نهاية الجولات. (نسخة مبسطة: بلا رهن ولا مزادات.)',
    opts: [{ k: 'rd', n: 'عدد الجولات', v: [12, 20, 30], d: 20 }],
    init(ps, o) { const st = { ps, pos: U.zero(ps), cash: {}, own: {}, lv: {}, out: {}, skip: {}, k: 0, rd: 0, max: o.rd || 20, ph: 'roll', d: 0, msg: 'ابدأوا الرمي!', sc: {} }; for (const p of ps) st.cash[p] = st.sc[p] = 1500; return st; },
    turn: st => st.ps[st.k],
    act(st, p, a, H) {
      if (st.over || p !== st.ps[st.k]) return; const i = st.pos[p], T = TY[i];
      if (st.ph === 'roll' && a.t === 'roll') {
        const d = 1 + U.rnd(6), n = (i + d) % 24, t = TY[n]; st.d = d; st.pos[p] = n; st.msg = `${H.nm(p)} وصل ${t[1]}`;
        if (n < i) { st.cash[p] += 200; st.msg += ' (+200 للمرور بالانطلاق)'; }
        if (t[0] === 'p') {
          const o = st.own[n];
          if (!o) { if (st.cash[p] >= t[2]) { st.ph = 'buy'; return; } st.msg += ' — لا يملك ثمنها'; }
          else if (o === p) { if ((st.lv[n] || 0) < 3 && st.cash[p] >= t[2] / 2) { st.ph = 'up'; return; } }
          else { const r = tyRent(st, n); st.msg += ` ودفع ${r} إيجاراً لـ${H.nm(o)}`; tyPay(st, p, r, o, H); }
        } else if (t[0] === 'ch') { const c = U.pick(TYC); st.msg = `حظ ${H.nm(p)}: ${c[0]} (${c[1] > 0 ? '+' : ''}${c[1]})`; if (c[1] > 0) st.cash[p] += c[1]; else tyPay(st, p, -c[1], null, H); }
        else if (t[0] === 'tax') { st.msg += ' ودفع ضريبة 100'; tyPay(st, p, 100, null, H); }
        else if (t[0] === 'gift') { st.cash[p] += 100; st.msg += ' وربح جائزة المهرجان +100'; }
        else if (t[0] === 'stop') { st.skip[p] = 1; st.msg += ' — يخسر دوره القادم'; }
        tyEnd(st);
      } else if (st.ph === 'buy') {
        if (a.t === 'buy' && st.cash[p] >= T[2]) { st.cash[p] -= T[2]; st.own[i] = p; st.msg = `${H.nm(p)} اشترى ${T[1]}`; } else if (a.t !== 'skip') return; tyEnd(st);
      } else if (st.ph === 'up') {
        if (a.t === 'up' && st.cash[p] >= T[2] / 2) { st.cash[p] -= T[2] / 2; st.lv[i] = (st.lv[i] || 0) + 1; st.msg = `${H.nm(p)} طوّر ${T[1]}`; } else if (a.t !== 'skip') return; tyEnd(st);
      }
    },
    view(st, me, H) {
      const my = !st.over && st.ps[st.k] === me, i = st.pos[me], T = TY[i] || [];
      let h = '<div class="ty ltr">' + TY.map((t, j) => {
        const [r, c] = tyPos(j), o = st.own[j], oi = st.ps.indexOf(o);
        return `<div class="tyt ${t[0]}" style="grid-area:${r + 1}/${c + 1};${t[0] === 'p' ? `--g:${TYG[t[3]]}` : ''}${o ? `;--o:${COL[oi]}` : ''}"><b>${t[1]}</b>${t[0] === 'p' ? `<small>${o ? '●'.repeat(1 + (st.lv[j] || 0)) : t[2]}</small>` : ''}<span>${st.ps.filter(p => !st.out[p] && st.pos[p] === j).map(p => `<i style="background:${COL[st.ps.indexOf(p)]}">${H.av(p)}</i>`).join('')}</span></div>`;
      }).join('');
      h += `<div class="tyc" dir="rtl">${turnLine(st, H)}<p class="ctr">${U.dice(st.d)}</p><p class="ctr mut">${esc(st.msg)}</p><div class="row ctr">`;
      if (my && st.ph === 'roll') h += U.B('ارمِ النرد', { t: 'roll' }, 'pri');
      if (my && st.ph === 'buy') h += U.B(`اشترِ ${T[1]} بـ ${T[2]}`, { t: 'buy' }, 'pri') + U.B('لا أريد', { t: 'skip' }, 'ghost');
      if (my && st.ph === 'up') h += U.B(`طوّر ${T[1]} بـ ${T[2] / 2}`, { t: 'up' }, 'pri') + U.B('لاحقاً', { t: 'skip' }, 'ghost');
      h += `</div><div class="row ctr">${st.ps.map((p, j) => `<span class="chip ${st.out[p] ? 'off' : ''}"><i class="dot" style="background:${COL[j]}"></i>${esc(H.nm(p))} · ${st.cash[p]}</span>`).join('')}</div><small class="mut ctr">الجولة ${Math.min(st.rd + 1, st.max)} من ${st.max}</small></div></div>`;
      return h;
    },
    bot(st, p) {
      if (st.ps[st.k] !== p) return; const T = TY[st.pos[p]];
      if (st.ph === 'roll') return { t: 'roll' }; if (st.ph === 'buy') return { t: st.cash[p] >= T[2] + 100 ? 'buy' : 'skip' }; return { t: st.cash[p] >= T[2] / 2 + 250 ? 'up' : 'skip' };
    },
  });
})();
