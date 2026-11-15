/* ألعاب الأصدقاء والمجموعات: الجاسوس، ماذا تفضل، من الأرجح، حقيقتان وكذبة، المافيا */
(function () {
  const { esc } = U;

  /* ---------- من الجاسوس؟ ---------- */
  const SPYW = {
    'أماكن': ['مطار', 'مستشفى', 'مدرسة', 'مطعم', 'ملعب', 'شاطئ', 'سوق', 'مكتبة'],
    'أكلات': ['كبسة', 'مندي', 'شاورما', 'بيتزا', 'فلافل', 'كنافة', 'سمبوسة', 'برجر'],
    'حيوانات': ['جمل', 'صقر', 'حصان', 'قط', 'دلفين', 'فيل', 'أسد', 'ببغاء'],
    'مهن': ['طبيب', 'طيار', 'معلم', 'طباخ', 'مهندس', 'شرطي', 'مصور', 'مزارع'],
  };
  function spyRound(st, H) { st.rd++; st.cat = U.pick(Object.keys(SPYW)); st.word = U.pick(SPYW[st.cat]); st.spy = U.pick(st.ps); st.ph = 'talk'; st.rdy = {}; st.votes = {}; st.res = ''; U.dl(st, H, (H.o.tm || 3) * 60000); }
  function spyEnd(st, H, res) { st.res = res; st.ph = 'end'; U.dl(st, H, 9000); }
  function spyVote(st, H) {
    const c = U.tally(st.votes), m = Math.max(0, ...Object.values(c)), top = Object.keys(c).filter(k => c[k] === m);
    if (top.length === 1 && top[0] === st.spy) { st.ph = 'guess'; U.dl(st, H, 20000); }
    else { st.sc[st.spy] += 3; spyEnd(st, H, 'نجا الجاسوس من التصويت! +3 له'); }
  }
  function spyGuess(st, H, w) {
    if (w === st.word) { st.sc[st.spy] += 2; spyEnd(st, H, 'انكشف الجاسوس لكنه عرف الكلمة! +2 له'); }
    else { for (const p of st.ps) if (p !== st.spy) st.sc[p] += 2 + (st.votes[p] === st.spy ? 1 : 0); spyEnd(st, H, 'انكشف الجاسوس ولم يعرف الكلمة! النقاط للبقية'); }
  }
  G.reg({
    id: 'spy', n: 'من الجاسوس؟', cat: 'party', em: '🕵️', hue: 265, min: 3, max: 12, t: 10, modes: 'p',
    d: 'الكل يعرف الكلمة إلا واحداً. اكشفوه قبل أن يكتشفها!',
    r: 'يحصل الجميع على كلمة سرية ما عدا الجاسوس الذي يعرف التصنيف فقط. تبادلوا الأسئلة والتلميحات (صوتياً أو بالدردشة) دون فضح الكلمة، ثم صوّتوا على المشتبه به. إن انكشف الجاسوس فله فرصة أخيرة لتخمين الكلمة.',
    opts: [{ k: 'rd', n: 'الجولات', v: [1, 2, 3], d: 2 }, { k: 'tm', n: 'دقائق النقاش', v: [2, 3, 5], d: 3 }],
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), rd: 0 }; spyRound(st, H); return st; },
    act(st, p, a, H) {
      if (st.ph === 'talk' && a.t === 'rdy') { st.rdy[p] = 1; if (Object.keys(st.rdy).length * 2 > st.ps.length) { st.ph = 'vote'; U.dl(st, H, 45000); } }
      else if (st.ph === 'vote' && a.t === 'v' && st.ps.includes(a.p) && a.p !== p) { st.votes[p] = a.p; if (U.all(st.votes, st.ps)) spyVote(st, H); }
      else if (st.ph === 'guess' && a.t === 'gs' && p === st.spy) spyGuess(st, H, a.w);
    },
    tick(st, H) {
      if (H.now < st.dl) return;
      if (st.ph === 'talk') { st.ph = 'vote'; U.dl(st, H, 45000); } else if (st.ph === 'vote') spyVote(st, H); else if (st.ph === 'guess') spyGuess(st, H, '');
      else if (st.rd < (H.o.rd || 2)) spyRound(st, H); else st.over = { win: U.top(st.sc) };
      return true;
    },
    view(st, me, H) {
      const spy = me === st.spy, list = `<div class="row ctr">${SPYW[st.cat].map(w => `<span class="chip">${w}</span>`).join('')}</div>`;
      let h = `<p class="ctr mut">الجولة ${st.rd} · التصنيف: ${st.cat}</p>`;
      if (st.ph === 'end') return h + `<div class="pn ctr"><p class="big">${st.res}</p><p>الجاسوس: ${U.who(H, st.spy)} · الكلمة: <b>${st.word}</b></p></div>`;
      h += `<div class="pn ctr role ${spy ? 'bad' : ''}">${spy ? '<p class="big">أنت الجاسوس 🕵️</p><p>لا تعرف الكلمة. جارِهم واكتشفها من كلامهم.</p>' : `<p class="mut">الكلمة السرية</p><p class="big">${st.word}</p>`}</div>`;
      if (st.ph === 'talk') h += `<p class="ctr">اسألوا بعضكم ولمّحوا دون فضح الكلمة.</p>${list}<p class="ctr">${st.rdy[me] ? '<span class="mut">بانتظار البقية…</span>' : U.B('جاهز للتصويت', { t: 'rdy' }, 'pri')}</p>${U.wait(st.rdy, st.ps, H)}`;
      else if (st.ph === 'vote') h += `<p class="ctr">من هو الجاسوس؟</p><div class="opts">${st.ps.filter(p => p !== me).map(p => `<button class="opt ${st.votes[me] === p ? 'sel' : ''}" ${U.A({ t: 'v', p })}>${H.av(p)} ${esc(H.nm(p))}</button>`).join('')}</div>${U.wait(st.votes, st.ps, H)}`;
      else h += spy ? `<p class="ctr">انكشفت! خمّن الكلمة لتنقذ نفسك:</p><div class="opts">${SPYW[st.cat].map(w => `<button class="opt" ${U.A({ t: 'gs', w })}>${w}</button>`).join('')}</div>` : `<p class="ctr">انكشف ${U.who(H, st.spy)}! يحاول الآن تخمين الكلمة…</p>`;
      return h;
    },
    bot(st, p) {
      if (st.ph === 'talk' && !st.rdy[p]) return { t: 'rdy' };
      if (st.ph === 'vote' && !st.votes[p]) return { t: 'v', p: U.pick(st.ps.filter(q => q !== p)) };
      if (st.ph === 'guess' && p === st.spy) return { t: 'gs', w: U.pick(SPYW[st.cat]) };
    },
  });

  /* ---------- محرك التصويت: ماذا تفضل / من الأرجح ---------- */
  function pollNext(st, H) { if (st.i + 1 >= st.qs.length) { st.over = { win: U.top(st.sc) }; return; } st.i++; st.sub = {}; st.ph = 'q'; U.dl(st, H, 25000); }
  function pollRes(st, H) {
    const c = U.tally(st.sub), m = Math.max(0, ...Object.values(c)), top = Object.keys(c).filter(k => c[k] === m);
    st.top = top; for (const p in st.sub) if (top.includes(String(st.sub[p]))) st.sc[p] += top.length === 1 ? 100 : 50;
    st.ph = 'rev'; U.dl(st, H, 6000);
  }
  function poll(def, qs, choices, label) {
    G.reg(Object.assign({
      opts: [{ k: 'rd', n: 'عدد الأسئلة', v: [5, 8, 12], d: 8 }],
      init(ps, o, H) { const st = { ps, sc: U.zero(ps), qs: U.shuf(qs).slice(0, o.rd || 8), i: -1 }; pollNext(st, H); return st; },
      act(st, p, a, H) { if (st.ph !== 'q' || p in st.sub || !choices(st).some(c => String(c.k) === String(a.c))) return; st.sub[p] = a.c; if (U.all(st.sub, st.ps)) pollRes(st, H); },
      tick(st, H) { if (H.now < st.dl) return; if (st.ph === 'q') pollRes(st, H); else pollNext(st, H); return true; },
      view(st, me, H) {
        const q = st.qs[st.i], ch = choices(st, H), n = Object.keys(st.sub).length || 1;
        let h = `<p class="ctr mut">السؤال ${st.i + 1} من ${st.qs.length}</p><div class="pn ctr"><p class="big">${label(q)}</p></div><div class="opts">`;
        for (const c of ch) {
          const vs = st.ps.filter(p => String(st.sub[p]) === String(c.k));
          h += st.ph === 'q' ? `<button class="opt ${String(st.sub[me]) === String(c.k) ? 'sel' : ''}" ${me in st.sub ? 'disabled' : U.A({ t: 'c', c: c.k })}>${c.l}</button>`
            : `<div class="opt res ${st.top.includes(String(c.k)) ? 'win' : ''}" style="--w:${Math.round(vs.length / n * 100)}%"><span>${c.l}</span><b>${vs.length}</b><small>${vs.map(p => H.av(p)).join(' ')}</small></div>`;
        }
        h += '</div>' + (st.ph === 'q' ? U.wait(st.sub, st.ps, H) + '<p class="ctr mut">تكسب النقاط إذا اخترت ما تختاره الأغلبية</p>' : '');
        return h;
      },
      bot(st, p, H) { if (st.ph === 'q' && !(p in st.sub)) return { t: 'c', c: U.pick(choices(st, H)).k }; },
    }, def));
  }
  const WYR = [['تطير كالصقر', 'تتنفس تحت الماء'], ['تعيش بلا إنترنت شهراً', 'تعيش بلا مكيّف شهراً في الصيف'], ['تعرف كل لغات العالم', 'تتكلم مع الحيوانات'], ['تسافر إلى الماضي', 'تسافر إلى المستقبل'], ['كبسة كل يوم لسنة', 'لا كبسة أبداً لسنة'], ['تكون أذكى شخص في العالم', 'تكون أسعد شخص في العالم'], ['تسكن على شاطئ البحر', 'تسكن في أعلى الجبل'], ['تقرأ أفكار الناس', 'تصبح غير مرئي متى شئت'], ['إجازة أسبوع في الفضاء', 'إجازة شهر في جزيرة'], ['تأكل الحلا قبل الغداء دائماً', 'لا تأكل الحلا إلا في العيد'], ['تنسى اسمك مرة كل يوم', 'تنسى أين وضعت جوالك كل يوم'], ['تلعب مع منتخبك في كأس العالم', 'تمثّل في فيلم عالمي'], ['شتاء طوال السنة', 'صيف طوال السنة'], ['تملك مطعماً مشهوراً', 'تملك نادي كرة قدم'], ['تعيش بلا قهوة وشاي', 'تعيش بلا حلويات'], ['تتكلم دائماً بالفصحى', 'تغنّي كلامك كله'], ['تصحو خمسة الفجر دائماً', 'تنام بعد منتصف الليل دائماً'], ['رحلة برّ مع الشلّة', 'سفرة خارجية مع العائلة']];
  poll({ id: 'wyr', n: 'ماذا تفضّل؟', cat: 'party', em: '🤔', hue: 190, min: 2, max: 12, t: 6, modes: 'fp', d: 'خياران أحلاهما محيّر. اختر وتوقّع رأي الأغلبية!', r: 'يظهر سؤال بخيارين ويختار الجميع سراً. من يقف مع الأغلبية يكسب 100 نقطة (50 عند التعادل). ثم تُكشف اختيارات الجميع… وتبدأ النقاشات!' },
    WYR, st => st.qs[st.i].map((l, k) => ({ k, l })), () => 'ماذا تفضّل؟');
  const LIK = ['يضيع في مول يعرفه', 'ينام في منتصف الفيلم', 'يصبح مشهوراً فجأة', 'ينسى عيد ميلاد صديقه', 'يأكل آخر قطعة بدون استئذان', 'يتأخر عن موعده دائماً', 'يضحك في موقف جدّي', 'يفوز ببرنامج مسابقات', 'يسافر فجأة بلا تخطيط', 'يردّ على الرسائل بعد أسبوع', 'يحرق الأكل وهو يطبخ', 'يحفظ كلمات كل الأغاني', 'يشتري شيئاً لا يحتاجه', 'يبكي في فيلم كرتون', 'يصير رائد فضاء', 'يتكلم وهو نائم', 'يكسب في أي لعبة جديدة', 'يضيّع مفاتيحه كل أسبوع'];
  poll({ id: 'likely', n: 'من الأرجح؟', cat: 'party', em: '👉', hue: 325, min: 3, max: 12, t: 6, modes: 'fp', d: 'من فيكم الأرجح أن يفعلها؟ صوّتوا واضحكوا.', r: 'يظهر موقف طريف ويصوّت كل لاعب سراً على الشخص الأرجح أن يفعله. من صوّت مع الأغلبية يكسب 100 نقطة، ثم يُكشف صاحب اللقب.' },
    LIK, (st, H) => st.ps.map(p => ({ k: p, l: H ? `${H.av(p)} ${esc(H.nm(p))}` : p })), q => `من الأرجح أن… ${q}؟`);

  /* ---------- حقيقتان وكذبة ---------- */
  function ttlNext(st, H) {
    let i = st.i; do i++; while (i < st.ps.length && !st.w[st.ps[i]]);
    if (i >= st.ps.length) { st.over = { win: U.top(st.sc) }; return; } st.i = i;
    st.ph = 'guess'; st.sub = {}; U.dl(st, H, 30000);
  }
  function ttlRes(st, H) { const a = st.ps[st.i], lie = st.w[a].lie; for (const p in st.sub) if (st.sub[p] === lie) st.sc[p] += 100; else st.sc[a] += 50; st.ph = 'rev'; U.dl(st, H, 7000); }
  G.reg({
    id: 'ttl', n: 'حقيقتان وكذبة', cat: 'party', em: '🤥', hue: 20, min: 3, max: 10, t: 10, modes: 'fp',
    d: 'اكتب حقيقتين وكذبة عن نفسك، ودع الجميع يخمّن الكذبة.',
    r: 'يكتب كل لاعب حقيقتين وكذبة واحدة عن نفسه. ثم تُعرض عبارات كل لاعب بترتيب عشوائي ويخمّن الباقون أيها الكذبة. التخمين الصحيح = 100 نقطة، وصاحب العبارات يكسب 50 عن كل من خدعه.',
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), w: {}, ph: 'write', i: -1 }; U.dl(st, H, 150000); return st; },
    act(st, p, a, H) {
      if (st.ph === 'write' && a.t === 'w' && !st.w[p]) {
        const s = [a.t1, a.t2, a.lie].map(x => String(x || '').trim().slice(0, 90)); if (s.some(x => !x)) return;
        const ord = U.shuf([0, 1, 2]); st.w[p] = { s: ord.map(i => s[i]), lie: ord.indexOf(2) }; if (U.all(st.w, st.ps)) ttlNext(st, H);
      } else if (st.ph === 'guess' && a.t === 'g' && p !== st.ps[st.i] && !(p in st.sub) && [0, 1, 2].includes(a.i)) { st.sub[p] = a.i; if (st.ps.every(q => q === st.ps[st.i] || q in st.sub)) ttlRes(st, H); }
    },
    tick(st, H) { if (H.now < st.dl) return; if (st.ph === 'write') { if (Object.keys(st.w).length) ttlNext(st, H); else st.over = { win: [], msg: 'لم يكتب أحد' }; } else if (st.ph === 'guess') ttlRes(st, H); else ttlNext(st, H); return true; },
    view(st, me, H) {
      if (st.ph === 'write') return st.w[me] ? `<p class="ctr">تم! بانتظار البقية…</p>${U.wait(st.w, st.ps, H)}` : `<div class="pn"><p class="big ctr">اكتب عن نفسك</p>${U.form({ t: 'w' }, `${U.inp('t1', 'حقيقة أولى', 90)}${U.inp('t2', 'حقيقة ثانية', 90)}${U.inp('lie', 'كذبة مقنعة 🤫', 90)}${U.go('اعتمد')}`)}</div>${U.wait(st.w, st.ps, H)}`;
      const a = st.ps[st.i], w = st.w[a], rev = st.ph === 'rev'; if (!w) return '';
      return `<p class="ctr">عبارات ${U.who(H, a)} — أيها الكذبة؟</p><div class="opts one">${w.s.map((s, i) => rev
        ? `<div class="opt res ${i === w.lie ? 'win' : ''}"><span>${i === w.lie ? '🤥 ' : '✅ '}${esc(s)}</span><small>${st.ps.filter(p => st.sub[p] === i).map(p => H.av(p)).join(' ')}</small></div>`
        : `<button class="opt ${st.sub[me] === i ? 'sel' : ''}" ${me === a || me in st.sub ? 'disabled' : U.A({ t: 'g', i })}>${esc(s)}</button>`).join('')}</div>${rev ? '' : U.wait(Object.assign({ [a]: 1 }, st.sub), st.ps, H)}`;
    },
    bot(st, p) {
      if (st.ph === 'write' && !st.w[p]) return { t: 'w', t1: 'أحب القهوة العربية', t2: 'زرت ثلاث دول', lie: 'عندي تمساح في البيت' };
      if (st.ph === 'guess' && p !== st.ps[st.i] && !(p in st.sub)) return { t: 'g', i: U.rnd(3) };
    },
  });

  /* ---------- المافيا ---------- */
  const MR = { m: ['مافيا', '🔪', 'اتفق مع رفاقك ليلاً على ضحية، وتظاهر بالبراءة نهاراً.'], d: ['الطبيب', '💉', 'اختر كل ليلة لاعباً تحميه من المافيا (يمكنك حماية نفسك).'], i: ['المحقق', '🔎', 'تحرَّ كل ليلة عن لاعب لتعرف هل هو من المافيا.'], v: ['مواطن', '🏠', 'ناقش وصوّت نهاراً لطرد المافيا.'] };
  const mAlive = st => st.ps.filter(p => st.alive[p]);
  function mWin(st) {
    const al = mAlive(st), m = al.filter(p => st.roles[p] === 'm').length; let w = null;
    if (!m) w = 'town'; else if (m * 2 >= al.length) w = 'm'; else if (st.n > 12) w = 'town';
    if (!w) return false;
    const win = st.ps.filter(p => (st.roles[p] === 'm') === (w === 'm')); for (const p of win) st.sc[p] = 3 + (st.alive[p] ? 1 : 0);
    st.ph = 'end'; st.over = { win, msg: w === 'm' ? 'سيطرت المافيا على المدينة 🔪' : 'انتصر أهل المدينة 🎉' }; return true;
  }
  function mNight(st, H) { st.n++; st.ph = 'night'; st.nt = { kill: {}, save: null, chk: null }; U.dl(st, H, 45000); }
  function mDawn(st, H) {
    const c = U.tally(st.nt.kill), m = Math.max(0, ...Object.values(c)), t = Object.keys(c).find(k => c[k] === m);
    if (t && t !== st.nt.save) { st.alive[t] = false; st.news = `طلع الصباح… وجدنا ${H.nm(t)} ضحية للمافيا 💀`; } else st.news = t ? 'طلع الصباح… حاولت المافيا القتل لكن الطبيب أنقذ الضحية! 💉' : 'طلع الصباح… ليلة هادئة بلا ضحايا.';
    if (st.nt.chk) st.inv.push({ t: st.nt.chk, m: st.roles[st.nt.chk] === 'm' });
    if (mWin(st)) return; st.ph = 'day'; st.rdy = {}; st.votes = {}; U.dl(st, H, 120000);
  }
  function mLynch(st, H) {
    const c = U.tally(st.votes), m = Math.max(0, ...Object.values(c)), top = Object.keys(c).filter(k => c[k] === m && k !== '-');
    if (top.length === 1 && (c['-'] || 0) < m) { st.alive[top[0]] = false; st.news = `قررت المدينة طرد ${H.nm(top[0])} — وكان ${MR[st.roles[top[0]]][0]} ${MR[st.roles[top[0]]][1]}`; } else st.news = 'لم تتفق المدينة على أحد، ولم يُطرد أي لاعب.';
    if (mWin(st)) return; mNight(st, H);
  }
  const mNightDone = st => mAlive(st).every(p => { const r = st.roles[p]; return r === 'v' || (r === 'm' ? p in st.nt.kill : r === 'd' ? st.nt.save : st.nt.chk); });
  G.reg({
    id: 'mafia', n: 'المافيا', cat: 'party', em: '🎭', hue: 0, min: 5, max: 12, t: 20, modes: 'ps',
    d: 'أدوار سرية، ليلٌ غادر ونهارٌ من الاتهامات. من تصدّق؟',
    r: 'تُوزَّع الأدوار سراً: مافيا، طبيب، محقق، ومواطنون. في الليل تختار المافيا ضحية، والطبيب يحمي لاعباً، والمحقق يتحرّى عن لاعب. في النهار يتناقش الأحياء ثم يصوّتون لطرد مشتبه به. يفوز أهل المدينة بطرد كل المافيا، وتفوز المافيا إذا ساوى عددها عدد البقية.',
    init(ps, o, H) {
      const n = ps.length, nm = n >= 9 ? 3 : n >= 6 ? 2 : 1, r = U.shuf(ps), st = { ps, sc: U.zero(ps), roles: {}, alive: {}, inv: [], n: 0, news: 'هبط الليل على المدينة… كلٌّ يعرف دوره.' };
      r.forEach((p, i) => { st.roles[p] = i < nm ? 'm' : i === nm ? 'd' : i === nm + 1 ? 'i' : 'v'; st.alive[p] = true; });
      mNight(st, H); return st;
    },
    act(st, p, a, H) {
      if (st.over || !st.alive[p]) return; const r = st.roles[p], ok = t => st.alive[t];
      if (st.ph === 'night') {
        if (a.t === 'kill' && r === 'm' && ok(a.p) && st.roles[a.p] !== 'm') st.nt.kill[p] = a.p;
        else if (a.t === 'save' && r === 'd' && ok(a.p) && !st.nt.save) st.nt.save = a.p;
        else if (a.t === 'chk' && r === 'i' && ok(a.p) && a.p !== p && !st.nt.chk) st.nt.chk = a.p; else return;
        if (mNightDone(st)) mDawn(st, H);
      } else if (st.ph === 'day' && a.t === 'rdy') { st.rdy[p] = 1; if (Object.keys(st.rdy).length * 2 > mAlive(st).length) { st.ph = 'vote'; U.dl(st, H, 45000); } }
      else if (st.ph === 'vote' && a.t === 'v' && (a.p === '-' || (ok(a.p) && a.p !== p)) && !(p in st.votes)) { st.votes[p] = a.p; if (U.all(st.votes, mAlive(st))) mLynch(st, H); }
    },
    tick(st, H) { if (st.over || H.now < st.dl) return; if (st.ph === 'night') mDawn(st, H); else if (st.ph === 'day') { st.ph = 'vote'; U.dl(st, H, 45000); } else mLynch(st, H); return true; },
    view(st, me, H) {
      const r = st.roles[me], R = MR[r] || MR.v, al = mAlive(st), dead = !st.alive[me], end = st.ph === 'end';
      const pick = (t, ps, sel) => `<div class="opts">${ps.map(p => `<button class="opt ${sel === p ? 'sel' : ''}" ${U.A({ t, p })}>${H.av(p)} ${esc(H.nm(p))}</button>`).join('')}</div>`;
      let h = `<div class="pn ctr role ${r === 'm' ? 'bad' : ''}"><p class="mut">دورك</p><p class="big">${R[1]} ${R[0]}</p><small>${R[2]}</small>${r === 'm' ? `<p>رفاقك: ${st.ps.filter(p => st.roles[p] === 'm' && p !== me).map(p => esc(H.nm(p))).join('، ') || 'أنت وحدك'}</p>` : ''}${r === 'i' && st.inv.length ? `<p>${st.inv.map(x => `${esc(H.nm(x.t))}: ${x.m ? 'مافيا 🔪' : 'بريء ✅'}`).join(' · ')}</p>` : ''}</div>
        <p class="ctr">${esc(st.news)}</p><div class="row ctr">${st.ps.map(p => `<span class="chip ${st.alive[p] ? '' : 'off'}">${H.av(p)} ${esc(H.nm(p))}${end || !st.alive[p] ? ' ' + MR[st.roles[p]][1] : ''}</span>`).join('')}</div>`;
      if (end) return h;
      if (dead) return h + '<p class="ctr mut">خرجتَ من اللعبة 👻 تابع بصمت ولا تكشف شيئاً.</p>';
      if (st.ph === 'night') {
        h += `<p class="ctr big">🌙 الليلة ${st.n}</p>`;
        if (r === 'm') h += '<p class="ctr">اختاروا الضحية:</p>' + pick('kill', al.filter(p => st.roles[p] !== 'm'), st.nt.kill[me]);
        else if (r === 'd') h += st.nt.save ? '<p class="ctr mut">اخترت من تحميه. نم قرير العين.</p>' : '<p class="ctr">من تحمي الليلة؟</p>' + pick('save', al);
        else if (r === 'i') h += st.nt.chk ? '<p class="ctr mut">ستعرف النتيجة مع الصباح.</p>' : '<p class="ctr">عمّن تتحرّى؟</p>' + pick('chk', al.filter(p => p !== me));
        else h += '<p class="ctr mut">المدينة نائمة… انتظر الصباح.</p>';
      } else if (st.ph === 'day') h += `<p class="ctr big">☀️ النهار ${st.n}</p><p class="ctr">تناقشوا: من تشكّون فيه؟</p><p class="ctr">${st.rdy[me] ? '<span class="mut">بانتظار البقية…</span>' : U.B('جاهز للتصويت', { t: 'rdy' }, 'pri')}</p>`;
      else h += `<p class="ctr big">🗳️ التصويت</p>` + (me in st.votes ? '<p class="ctr mut">صوّتَّ. بانتظار البقية…</p>' : pick('v', al.filter(p => p !== me)) + `<p class="ctr">${U.B('لا أطرد أحداً', { t: 'v', p: '-' }, 'ghost')}</p>`) + U.wait(st.votes, al, H);
      return h;
    },
    bot(st, p) {
      if (st.over || !st.alive[p]) return; const r = st.roles[p], al = mAlive(st);
      if (st.ph === 'night') { if (r === 'm' && !(p in st.nt.kill)) return { t: 'kill', p: U.pick(al.filter(q => st.roles[q] !== 'm')) }; if (r === 'd' && !st.nt.save) return { t: 'save', p: U.pick(al) }; if (r === 'i' && !st.nt.chk) return { t: 'chk', p: U.pick(al.filter(q => q !== p)) }; }
      else if (st.ph === 'day' && !st.rdy[p]) return { t: 'rdy' };
      else if (st.ph === 'vote' && !(p in st.votes)) return { t: 'v', p: U.pick(al.filter(q => q !== p)) };
    },
  });
})();
