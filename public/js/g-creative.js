/* ألعاب مضحكة وإبداعية: ارسم وخمّن، أكمل القصة، الجواب المزيّف، إنسان حيوان نبات */
(function () {
  const { esc } = U;

  /* ---------- ارسم وخمّن ---------- */
  const DW = ['جمل', 'نخلة', 'قهوة', 'خيمة', 'صقر', 'سيارة', 'طائرة', 'قمر', 'شمس', 'بيت', 'شجرة', 'سمكة', 'قطة', 'نظارة', 'ساعة', 'مفتاح', 'كتاب', 'كرة', 'دراجة', 'مظلة', 'هاتف', 'كرسي', 'برج', 'سفينة', 'جبل', 'وردة', 'تفاحة', 'موزة', 'بيتزا', 'آيس كريم', 'قلم', 'مقص', 'باب', 'سلّم', 'غيمة', 'مطر', 'نجمة', 'قلب', 'عين', 'يد', 'حذاء', 'قبعة', 'تاج', 'سيف', 'مصباح', 'شمعة', 'هدية', 'بالون', 'صاروخ', 'روبوت', 'فيل', 'زرافة', 'أرنب', 'سلحفاة', 'فراشة', 'عنكبوت', 'ثعبان', 'ديناصور', 'مسجد', 'جسر', 'قطار', 'إشارة مرور', 'ميزان', 'طبلة', 'عود', 'دلّة'];
  const PAL = ['#111827', '#e5484d', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#92400e', '#ffffff'];
  function dwTurn(st, H) {
    st.k++; if (st.k >= st.total) { st.over = { win: U.top(st.sc) }; return; }
    st.dr = st.ps[st.k % st.ps.length]; st.opts = U.shuf(DW).slice(0, 3); st.word = ''; st.strokes = []; st.sn = 0; st.got = {}; st.fd = []; st.ph = 'pick'; U.dl(st, H, 15000);
  }
  function dwRev(st, H) { st.sc[st.dr] += 25 * Object.keys(st.got).length; st.ph = 'rev'; U.dl(st, H, 5000); }
  function dwPaint(cv) {
    const x = cv.getContext('2d'), { st } = cv._x, k = cv.width / 1000; x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, cv.height); x.lineCap = x.lineJoin = 'round';
    cv._pend = (cv._pend || []).filter(p => p.k === st.k && p.sn > st.sn);
    for (const s of (st.strokes || []).concat(cv._pend.map(p => p.s), cv._cur ? [cv._cur] : [])) {
      x.strokeStyle = PAL[s[0]] || '#111'; x.lineWidth = s[1] * k; x.beginPath(); x.moveTo(s[2] * k, s[3] * k);
      for (let i = 4; i < s.length; i += 2) x.lineTo(s[i] * k, s[i + 1] * k); if (s.length === 4) x.lineTo(s[2] * k + .1, s[3] * k); x.stroke();
    }
  }
  function dwCanvas() {
    const cv = document.createElement('canvas'); cv.width = cv.height = 720; cv.className = 'cv';
    const pt = e => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) / r.width * 1000), Math.round((e.clientY - r.top) / r.height * 1000)]; };
    const mv = e => { if (!cv._cur) return; const [x, y] = pt(e), c = cv._cur, n = c.length; if (Math.hypot(x - c[n - 2], y - c[n - 1]) > 8) { c.push(x, y); dwPaint(cv); } };
    const up = () => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); let c = cv._cur; cv._cur = null; if (!c) return;
      while (c.length > 124) { const d = [c[0], c[1]]; for (let i = 2; i < c.length; i += 4) d.push(c[i], c[i + 1]); c = d; }
      const { st, send } = cv._x; cv._pend.push({ s: c, sn: st.sn + cv._pend.length + 1, k: st.k }); send({ t: 'st', s: c }); dwPaint(cv);
    };
    cv.addEventListener('pointerdown', e => {
      const { st, me, H } = cv._x; if (st.ph !== 'draw' || st.dr !== me) return; e.preventDefault();
      const [x, y] = pt(e); cv._cur = [H.ui.c || 0, H.ui.w || 8, x, y]; dwPaint(cv); window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
    });
    return cv;
  }
  G.reg({
    id: 'draw', n: 'ارسم وخمّن', cat: 'fun', em: '🎨', hue: 300, min: 3, max: 10, t: 12, modes: 'fp',
    d: 'واحد يرسم والبقية يتسابقون على تخمين الكلمة.',
    r: 'في كل دور يختار الرسّام كلمة من ثلاث ويرسمها خلال 80 ثانية دون كتابة حروف. يكتب الباقون تخميناتهم، وكلما خمّنت أسرع كسبت أكثر (حتى 150 نقطة). ينال الرسّام 25 نقطة عن كل من عرف رسمته.',
    opts: [{ k: 'r', n: 'عدد الدورات', v: [1, 2, 3], d: 1 }],
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), k: -1, total: ps.length * (o.r || 1) }; dwTurn(st, H); return st; },
    act(st, p, a, H) {
      if (st.ph === 'pick' && p === st.dr && a.t === 'w' && st.opts[a.i]) { st.word = st.opts[a.i]; st.ph = 'draw'; U.dl(st, H, 80000); }
      else if (st.ph === 'draw' && p === st.dr) {
        if (a.t === 'st' && Array.isArray(a.s) && a.s.length >= 4 && a.s.length <= 130 && st.strokes.length < 160) { st.strokes.push(a.s.map(n => n | 0)); st.sn++; }
        else if (a.t === 'undo') { st.strokes.pop(); st.sn++; } else if (a.t === 'clr') { st.strokes = []; st.sn++; }
      } else if (st.ph === 'draw' && a.t === 'gs' && !(p in st.got)) {
        const x = String(a.x || '').trim().slice(0, 30); if (!x) return;
        if (U.norm(x) === U.norm(st.word)) { const pts = 50 + Math.round(100 * Math.max(0, st.dl - H.now) / 80000); st.got[p] = pts; st.sc[p] += pts; if (st.ps.every(q => q === st.dr || q in st.got)) dwRev(st, H); }
        else { st.fd.push({ p, x }); if (st.fd.length > 6) st.fd.shift(); }
      }
    },
    tick(st, H) { if (H.now < st.dl) return; if (st.ph === 'pick') { st.word = st.opts[0]; st.ph = 'draw'; U.dl(st, H, 80000); } else if (st.ph === 'draw') dwRev(st, H); else dwTurn(st, H); return true; },
    view(st, me, H) {
      const dr = me === st.dr; let h = `<p class="ctr mut">الدور ${st.k + 1} من ${st.total} · الرسّام ${U.who(H, st.dr)}</p>`;
      if (st.ph === 'pick') return h + (dr ? `<p class="ctr big">اختر كلمة لترسمها</p><div class="opts">${st.opts.map((w, i) => `<button class="opt" ${U.A({ t: 'w', i })}>${w}</button>`).join('')}</div>` : '<p class="ctr">الرسّام يختار كلمته…</p>');
      h += `<p class="ctr big">${dr || st.ph === 'rev' ? st.word : me in st.got ? `✅ ${st.word}` : st.word.replace(/[^ ]/g, '＿ ')}</p><div class="cvw" data-keep="cv"></div>`;
      if (st.ph === 'draw' && dr) h += `<div class="row ctr">${PAL.map((c, i) => `<button class="sw ${(H.ui.c || 0) === i ? 'sel' : ''}" style="background:${c}" ${U.UI({ c: i })} aria-label="لون"></button>`).join('')}</div><div class="row ctr">${[4, 8, 18].map(w => `<button class="btn sm ${(H.ui.w || 8) === w ? 'pri' : 'ghost'}" ${U.UI({ w })}>${w === 4 ? 'رفيع' : w === 8 ? 'وسط' : 'عريض'}</button>`).join('')}${U.B('تراجع', { t: 'undo' }, 'ghost sm')}${U.B('مسح', { t: 'clr' }, 'ghost sm')}</div>`;
      if (st.ph === 'draw' && !dr && !(me in st.got)) h += U.form({ t: 'gs' }, `${U.inp('x', 'اكتب تخمينك…', 30)}${U.go('خمّن')}`);
      h += `<div class="row ctr">${st.ps.filter(p => p in st.got).map(p => `<span class="chip ok">${H.av(p)} +${st.got[p]}</span>`).join('')}${st.fd.map(f => `<span class="chip">${H.av(f.p)} ${esc(f.x)}</span>`).join('')}</div>`;
      return h;
    },
    bind(el, st, me, send, H) { const s = el.querySelector('[data-keep=cv]'); if (!s) return; const cv = H.keep('cv', dwCanvas); cv._x = { st, me, send, H }; s.appendChild(cv); dwPaint(cv); },
    bot(st, p, H) {
      if (st.ph === 'pick' && p === st.dr) return { t: 'w', i: 0 };
      if (st.ph === 'draw' && p === st.dr && st.strokes.length < 3 && Math.random() < .3) return { t: 'st', s: [U.rnd(6), 8, ...Array.from({ length: 12 }, () => 100 + U.rnd(800))] };
      if (st.ph === 'draw' && p !== st.dr && !(p in st.got) && Math.random() < .04) return { t: 'gs', x: Math.random() < .6 ? st.word : U.pick(DW) };
    },
  });

  /* ---------- أكمل القصة ---------- */
  const OPEN = ['في ليلة ماطرة، سمع فهد طرقاً غريباً على باب المطبخ…', 'استيقظت نورة لتجد أن قطتها تتكلم العربية الفصحى…', 'قرر الجدّ فجأة أن يشارك في سباق الهجن…', 'وصلت رسالة إلى قروب العائلة تقول: «لا تفتحوا الثلاجة»…', 'في أول يوم دوام، اكتشف سالم أن مديره روبوت…', 'هبطت مركبة فضائية صغيرة في حوش بيتنا…', 'وجد الأطفال خريطة كنز داخل علبة المعمول…', 'أعلن المذيع: «انقطعت القهوة من المدينة كلها»…', 'تعطلت السيارة في منتصف البرّ، وفجأة ظهر جمل يلبس نظارة…', 'فتحت أمي الفرن فوجدت بداخله تذكرة سفر…'];
  function stRound(st, H) { st.sub = {}; st.ph = 'write'; U.dl(st, H, 75000); }
  function stPush(st, H) {
    const N = st.ps.length; st.ps.forEach((p, i) => st.st[(i + st.rd) % N].push({ p, x: st.sub[p] || '…' }));
    st.rd++; if (st.rd < st.n) stRound(st, H); else { st.ph = 'vote'; st.votes = {}; U.dl(st, H, 90000); }
  }
  function stRes(st, H) {
    const c = U.tally(st.votes), m = Math.max(0, ...Object.values(c)); st.top = Object.keys(c).filter(k => c[k] === m).map(Number);
    for (const i of st.top) for (const p of new Set(st.st[i].map(l => l.p).filter(Boolean))) st.sc[p] += 50;
    st.ph = 'rev'; U.dl(st, H, 10000);
  }
  G.reg({
    id: 'story', n: 'أكمل القصة', cat: 'fun', em: '📖', hue: 30, min: 3, max: 8, t: 10, modes: 'fp',
    d: 'كل لاعب يضيف جملة وهو لا يرى إلا الجملة السابقة… والنتيجة قصص عجيبة!',
    r: 'تبدأ عدة قصص في الوقت نفسه. في كل جولة تصلك قصة مختلفة لا ترى منها إلا آخر جملة، فتكتب الجملة التالية. في النهاية تُكشف القصص كاملة ويصوّت الجميع لأطرفها، وينال كتّاب القصة الفائزة 50 نقطة.',
    init(ps, o, H) { const op = U.shuf(OPEN), st = { ps, sc: U.zero(ps), rd: 0, n: Math.min(Math.max(ps.length, 3), 5), st: ps.map((_, i) => [{ p: null, x: op[i] }]) }; stRound(st, H); return st; },
    act(st, p, a, H) {
      if (st.ph === 'write' && a.t === 'w' && !(p in st.sub)) { const x = String(a.x || '').trim().slice(0, 140); if (!x) return; st.sub[p] = x; if (U.all(st.sub, st.ps)) stPush(st, H); }
      else if (st.ph === 'vote' && a.t === 'v' && st.st[a.i] && !(p in st.votes)) { st.votes[p] = a.i; if (U.all(st.votes, st.ps)) stRes(st, H); }
    },
    tick(st, H) { if (H.now < st.dl + (st.ph === 'write' ? 1500 : 0)) return; if (st.ph === 'write') stPush(st, H); else if (st.ph === 'vote') stRes(st, H); else st.over = { win: U.top(st.sc) }; return true; },
    view(st, me, H) {
      if (st.ph === 'write') {
        const s = st.st[(st.ps.indexOf(me) + st.rd) % st.ps.length], last = s[s.length - 1];
        return `<p class="ctr mut">الجولة ${st.rd + 1} من ${st.n}</p>` + (me in st.sub ? '<p class="ctr">وصلت جملتك! بانتظار البقية…</p>' : `<div class="pn"><p class="mut">آخر جملة في القصة:</p><p class="big">${esc(last.x)}</p>${U.form({ t: 'w' }, `${U.inp('x', 'وماذا حدث بعدها؟', 140)}${U.go('أضف جملتي')}`, 1)}</div>`) + U.wait(st.sub, st.ps, H);
      }
      const rev = st.ph === 'rev';
      return `<p class="ctr big">${rev ? 'القصة الفائزة 🏆' : 'اقرأوا القصص وصوّتوا لأطرفها'}</p><div class="opts one">${st.st.map((s, i) => {
        const body = s.map(l => `<span title="${l.p ? esc(H.nm(l.p)) : ''}">${esc(l.x)}</span>`).join(' ');
        return rev ? `<div class="opt res story ${st.top.includes(i) ? 'win' : ''}">${body}<small>${st.ps.filter(p => st.votes[p] === i).map(p => H.av(p)).join(' ')}</small></div>` : `<button class="opt story ${st.votes[me] === i ? 'sel' : ''}" ${me in st.votes ? 'disabled' : U.A({ t: 'v', i })}>${body}</button>`;
      }).join('')}</div>${rev ? '' : U.wait(st.votes, st.ps, H)}`;
    },
    bot(st, p) {
      if (st.ph === 'write' && !(p in st.sub)) return { t: 'w', x: U.pick(['ثم ضحك الجميع وأكلوا كبسة.', 'لكن الجمل رفض أن يتحرك.', 'وفجأة انطفأت الأنوار!', 'فقررنا أن نسأل الجدة عن السر.']) };
      if (st.ph === 'vote' && !(p in st.votes)) return { t: 'v', i: U.rnd(st.st.length) };
    },
  });

  /* ---------- الجواب المزيّف ---------- */
  const FACT = [['عدد قلوب الأخطبوط هو ____.', '3'], ['الثديي الوحيد القادر على الطيران الحقيقي هو ____.', 'الخفاش'], ['أقصر حرب في التاريخ (بين بريطانيا وزنجبار عام 1896) دامت نحو ____ دقيقة.', '38'], ['حيوان ____ له بصمات أصابع تكاد تطابق بصمات الإنسان.', 'الكوالا'],
  ['اليوم الواحد على كوكب الزهرة أطول من ____ على الكوكب نفسه.', 'السنة'], ['لسان ____ لونه أزرق داكن يميل إلى السواد.', 'الزرافة'], ['يزداد ارتفاع برج إيفل صيفاً بنحو ____ سنتيمتراً بسبب تمدد الحديد.', '15'], ['الموطن الأصلي لشجرة البنّ هو ____.', 'إثيوبيا'],
  ['الحيوان الوطني لاسكتلندا هو ____.', 'اليونيكورن'], ['الدولة التي تضم أكبر عدد من الأهرامات في العالم هي ____.', 'السودان'], ['عين النعامة أكبر من ____.', 'دماغها'], ['يخزّن الجمل في سنامه ____ وليس الماء.', 'الدهون'],
  ['الكوكب الذي يدور مائلاً على جنبه تقريباً هو ____.', 'أورانوس'], ['الطائر الذي يستطيع الطيران إلى الخلف هو ____.', 'الطنّان'], ['القارة الوحيدة التي لا يعيش فيها نمل هي ____.', 'أنتاركتيكا'], ['أطول عظمة في جسم الإنسان هي عظمة ____.', 'الفخذ'],
  ['الحيوان البري صاحب أطول مدة حمل (نحو 22 شهراً) هو ____.', 'الفيل'], ['الطعام الذي لا يفسد مهما طال تخزينه هو ____.', 'العسل'], ['عدد أسنان الإنسان البالغ مكتملةً هو ____.', '32'], ['العضو الذي يستهلك نحو خُمس طاقة الجسم هو ____.', 'الدماغ']];
  const FAKE = ['7', 'القمر', 'الحوت', 'الصين', '12', 'البطريق', 'قلبها', 'الماء', '100', 'النسر'];
  function blNext(st, H) { if (st.i + 1 >= st.qs.length) { st.over = { win: U.top(st.sc) }; return; } st.i++; st.sub = {}; st.pk = {}; st.err = {}; st.ph = 'write'; U.dl(st, H, 50000); }
  function blPick(st, H) {
    const q = st.qs[st.i], m = {}; for (const p in st.sub) { const k = U.norm(st.sub[p]); (m[k] = m[k] || { x: st.sub[p], by: [] }).by.push(p); }
    st.ch = U.shuf(Object.values(m).concat([{ x: q[1], by: [], ok: 1 }])); st.ph = 'pick'; U.dl(st, H, 30000);
  }
  function blRes(st, H) { for (const p in st.pk) { const c = st.ch[st.pk[p]]; if (c.ok) st.sc[p] += 200; else for (const a of c.by) st.sc[a] += 100; } st.ph = 'rev'; U.dl(st, H, 8000); }
  G.reg({
    id: 'bluff', n: 'الجواب المزيّف', cat: 'fun', em: '🎩', hue: 250, min: 3, max: 10, t: 10, modes: 'fp',
    d: 'اختلق جواباً مقنعاً لمعلومة غريبة واخدع أصدقاءك.',
    r: 'تظهر معلومة غريبة ينقصها جزء. يكتب كل لاعب جواباً مزيّفاً مقنعاً، ثم تُعرض كل الأجوبة مع الجواب الحقيقي. اختيار الحقيقة = 200 نقطة، وكل لاعب يخدعه جوابك يمنحك 100 نقطة.',
    opts: [{ k: 'rd', n: 'عدد الجولات', v: [4, 6, 8], d: 6 }],
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), qs: U.shuf(FACT).slice(0, o.rd || 6), i: -1 }; blNext(st, H); return st; },
    act(st, p, a, H) {
      if (st.ph === 'write' && a.t === 'w' && !(p in st.sub)) {
        const x = String(a.x || '').trim().slice(0, 40); if (!x) return;
        if (U.norm(x) === U.norm(st.qs[st.i][1])) { st.err[p] = 1; return; } delete st.err[p]; st.sub[p] = x; if (U.all(st.sub, st.ps)) blPick(st, H);
      } else if (st.ph === 'pick' && a.t === 'p' && st.ch[a.i] && !(p in st.pk) && !st.ch[a.i].by.includes(p)) { st.pk[p] = a.i; if (U.all(st.pk, st.ps)) blRes(st, H); }
    },
    tick(st, H) { if (H.now < st.dl + (st.ph === 'write' ? 1500 : 0)) return; if (st.ph === 'write') blPick(st, H); else if (st.ph === 'pick') blRes(st, H); else blNext(st, H); return true; },
    view(st, me, H) {
      const q = st.qs[st.i]; let h = `<p class="ctr mut">الجولة ${st.i + 1} من ${st.qs.length}</p><div class="pn ctr"><p class="big">${esc(q[0])}</p></div>`;
      if (st.ph === 'write') return h + (me in st.sub ? '<p class="ctr">تم! بانتظار البقية…</p>' : (st.err[me] ? '<p class="ctr warn">يا للصدفة، هذا الجواب الصحيح! اكتب جواباً مزيّفاً.</p>' : '') + U.form({ t: 'w' }, `${U.inp('x', 'اكتب جواباً مزيّفاً مقنعاً', 40)}${U.go('اعتمد')}`, 1)) + U.wait(st.sub, st.ps, H);
      const rev = st.ph === 'rev';
      return h + `<p class="ctr">${rev ? 'الحقيقة هي…' : 'أيها الجواب الحقيقي؟'}</p><div class="opts">${st.ch.map((c, i) => rev
        ? `<div class="opt res ${c.ok ? 'win' : ''}"><span>${esc(c.x)}</span><small>${c.ok ? 'الحقيقة ✅' : 'كذبة ' + c.by.map(p => esc(H.nm(p))).join(' و')} ${st.ps.filter(p => st.pk[p] === i).map(p => H.av(p)).join(' ')}</small></div>`
        : `<button class="opt ${st.pk[me] === i ? 'sel' : ''}" ${me in st.pk || c.by.includes(me) ? 'disabled' : U.A({ t: 'p', i })}>${esc(c.x)}</button>`).join('')}</div>${rev ? '' : U.wait(st.pk, st.ps, H)}`;
    },
    bot(st, p) {
      if (st.ph === 'write' && !(p in st.sub)) return { t: 'w', x: U.pick(FAKE) };
      if (st.ph === 'pick' && !(p in st.pk)) { const ok = st.ch.map((c, i) => i).filter(i => !st.ch[i].by.includes(p)); return { t: 'p', i: U.pick(ok) }; }
    },
  });

  /* ---------- إنسان حيوان نبات جماد بلاد ---------- */
  const CATS = ['إنسان', 'حيوان', 'نبات', 'جماد', 'بلاد'], LET = 'ابتجحخدرسشصطعفقكلمنهوي';
  const ltOk = (x, L) => { const n = U.norm(x); return n.length >= 2 && n[0] === L; };
  function ltRound(st, H) { st.rd++; st.L = U.pick([...LET].filter(l => !st.used.includes(l))); st.used.push(st.L); st.ans = {}; st.obj = {}; st.done = {}; st.ph = 'write'; U.dl(st, H, 80000); }
  function ltScore(st, H) {
    const need = Math.max(1, Math.ceil((st.ps.length - 1) / 2)); st.pts = {};
    for (const p of st.ps) st.pts[p] = [0, 0, 0, 0, 0];
    for (let c = 0; c < 5; c++) {
      const g = {}; for (const p of st.ps) { const x = (st.ans[p] || [])[c] || ''; if (ltOk(x, st.L) && Object.keys(st.obj[p + '|' + c] || {}).length < need) (g[U.norm(x)] = g[U.norm(x)] || []).push(p); }
      for (const k in g) for (const p of g[k]) { st.pts[p][c] = g[k].length > 1 ? 5 : 10; st.sc[p] += st.pts[p][c]; }
    }
    st.ph = 'rev'; U.dl(st, H, 9000);
  }
  G.reg({
    id: 'letters', n: 'إنسان حيوان نبات', cat: 'fun', em: '🔤', hue: 95, min: 2, max: 10, t: 10, modes: 'fp',
    d: 'حرف واحد وخمس خانات… ومن يصرخ «خلّصت!» أولاً يربك الجميع.',
    r: 'يُسحب حرف عشوائي وعلى كل لاعب كتابة: إنسان، حيوان، نبات، جماد، بلاد تبدأ به. أول من ينهي يضغط «خلّصت!» فيبقى للبقية 10 ثوانٍ فقط. الإجابة الفريدة = 10 نقاط، والمكررة = 5. في المراجعة يمكنكم الاعتراض على أي إجابة غير صحيحة، وتُلغى إذا اعترض نصف اللاعبين الآخرين.',
    opts: [{ k: 'rd', n: 'عدد الجولات', v: [2, 3, 5], d: 3 }],
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), rd: 0, n: o.rd || 3, used: [] }; ltRound(st, H); return st; },
    act(st, p, a, H) {
      if (st.ph === 'write' && a.t === 'w' && !st.ans[p]) {
        st.ans[p] = [0, 1, 2, 3, 4].map(i => String(a['c' + i] || '').trim().slice(0, 24));
        if (U.all(st.ans, st.ps)) { st.ph = 'review'; U.dl(st, H, 40000); } else if (st.dl - H.now > 10000) { st.dl = H.now + 10000; st.fin = p; }
      } else if (st.ph === 'review') {
        if (a.t === 'obj' && st.ps.includes(a.p) && a.p !== p && a.c >= 0 && a.c < 5) { const k = a.p + '|' + (a.c | 0), o = st.obj[k] = st.obj[k] || {}; if (o[p]) delete o[p]; else o[p] = 1; }
        else if (a.t === 'ok') { st.done[p] = 1; if (U.all(st.done, st.ps)) ltScore(st, H); }
      }
    },
    tick(st, H) {
      if (H.now < st.dl + (st.ph === 'write' ? 1500 : 0)) return;
      if (st.ph === 'write') { st.ph = 'review'; U.dl(st, H, 40000); } else if (st.ph === 'review') ltScore(st, H); else if (st.rd < st.n) { st.fin = null; ltRound(st, H); } else st.over = { win: U.top(st.sc) };
      return true;
    },
    view(st, me, H) {
      let h = `<p class="ctr mut">الجولة ${st.rd} من ${st.n}</p><p class="ctr letter">${st.L === 'ا' ? 'أ' : st.L}</p>`;
      if (st.ph === 'write') return h + (st.fin ? `<p class="ctr warn">${esc(H.nm(st.fin))} خلّص! أسرعوا!</p>` : '') + (st.ans[me] ? '<p class="ctr">وصلت إجاباتك ✅</p>' : U.form({ t: 'w' }, CATS.map((c, i) => `<label class="fld"><span>${c}</span>${U.inp('c' + i, c + ' بحرف ' + st.L, 24)}</label>`).join('') + U.go('خلّصت!'), 1)) + U.wait(st.ans, st.ps, H);
      const rev = st.ph === 'rev';
      h += `<div class="tblw"><table class="tbl"><tr><th></th>${CATS.map(c => `<th>${c}</th>`).join('')}${rev ? '<th>+</th>' : ''}</tr>${st.ps.map(p => `<tr><th>${H.av(p)} ${esc(H.nm(p))}</th>${[0, 1, 2, 3, 4].map(c => {
        const x = (st.ans[p] || [])[c] || '', ok = ltOk(x, st.L), ob = Object.keys(st.obj[p + '|' + c] || {}).length, mine = (st.obj[p + '|' + c] || {})[me];
        if (rev) return `<td class="${st.pts[p][c] ? 'good' : 'bad'}">${esc(x) || '—'} <b>${st.pts[p][c] || ''}</b></td>`;
        return `<td class="${ok ? '' : 'bad'}">${esc(x) || '—'}${ok && p !== me ? ` <button class="obj ${mine ? 'on' : ''}" ${U.A({ t: 'obj', p, c })} aria-label="اعتراض">✋${ob || ''}</button>` : ok && ob ? ` ✋${ob}` : ''}</td>`;
      }).join('')}${rev ? `<td><b>${st.pts[p].reduce((a, b) => a + b, 0)}</b></td>` : ''}</tr>`).join('')}</table></div>`;
      if (!rev) h += `<p class="ctr mut">اضغط ✋ للاعتراض على إجابة خاطئة</p><p class="ctr">${st.done[me] ? '<span class="mut">بانتظار البقية…</span>' : U.B('موافق على النتائج', { t: 'ok' }, 'pri')}</p>`;
      return h;
    },
    bot(st, p) {
      if (st.ph === 'write' && !st.ans[p] && Math.random() < .2) { const a = { t: 'w' }; for (let i = 0; i < 5; i++) a['c' + i] = Math.random() < .8 ? st.L + U.pick(['امر', 'ريم', 'وسن', 'بال']) : ''; return a; }
      if (st.ph === 'review' && !st.done[p]) return { t: 'ok' };
    },
  });
})();
