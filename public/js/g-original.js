/* ألعاب ديوانية الأصلية: المزاد المجنون، جزيرة الكوارث، برج الطمع، صدى، سوق القوافل */
(function () {
  const { esc } = U;

  /* ---------- المزاد المجنون ---------- */
  const AUC = [['جورب أينشتاين الأيسر', '🧦'], ['مصباح علاء الدين (مستعمل)', '🪔'], ['خريطة كنز ناقصة الزاوية', '🗺️'], ['دلّة تصبّ القهوة وحدها', '☕'], ['بيضة ديناصور دافئة', '🥚'], ['نظارة ترى المستقبل بخمس ثوانٍ', '🕶️'], ['سجادة طائرة برخصة منتهية', '🧞'], ['صندوق مقفل يُسمع منه مواء', '📦'], ['مفتاح لا يُعرف بابه', '🗝️'], ['ساعة تمشي بالعكس', '⏰'], ['ناقة تجيد الحساب الذهني', '🐪'], ['كرسي هزّاز لملك منسي', '🪑'], ['مرآة تجامل صاحبها', '🪞'], ['حذاء يقفز مترين', '👟'], ['قبعة تخفي نصف الرأس فقط', '🎩'], ['زجاجة رمل من كوكب المريخ', '🏺']];
  function auClue(v) {
    if (v < 0) return Math.random() < .5 ? 'تحذير: تفوح منها رائحة لعنة! 👻' : 'لا معلومات مؤكدة… ثق بحدسك.';
    const t = U.rnd(3); if (t === 0) { const lo = Math.max(0, Math.floor((v - U.rnd(200)) / 50) * 50); return `الخبير يقدّرها بين ${lo} و ${lo + 250}`; }
    if (t === 1) return v > 300 ? 'همس لك السمسار: قيمتها فوق 300' : 'همس لك السمسار: قيمتها 300 أو أقل';
    return 'لا معلومات مؤكدة… ثق بحدسك.';
  }
  function auNext(st, H) {
    if (st.i + 1 >= st.items.length) { st.over = { win: U.top(st.sc) }; return; } st.i++;
    st.sub = {}; st.clue = {}; for (const p of st.ps) st.clue[p] = auClue(st.items[st.i].v); st.ph = 'bid'; U.dl(st, H, 35000);
  }
  function auRes(st, H) {
    const it = st.items[st.i], m = Math.max(0, ...Object.values(st.sub)); st.res = null;
    if (m > 0) { const w = U.pick(st.ps.filter(p => st.sub[p] === m)); st.cash[w] -= m; st.won[w].push(st.i); st.res = { w, b: m }; }
    for (const p of st.ps) st.sc[p] = st.cash[p] + st.won[p].reduce((s, i) => s + st.items[i].v, 0);
    st.ph = 'rev'; U.dl(st, H, 7500);
  }
  G.reg({
    id: 'auction', n: 'المزاد المجنون', cat: 'orig', em: '🔨', hue: 38, min: 2, max: 10, t: 10, modes: 'ps',
    d: 'مزايدات سرية على أغراض عجيبة لا يعرف قيمتها الحقيقية أحد… تقريباً.',
    r: 'يبدأ كل لاعب بـ 1000 قطعة ذهبية افتراضية. يُعرض غرض غريب ويحصل كل لاعب على تلميح سرّي مختلف عن قيمته. يكتب الجميع مزايداتهم سراً، والأعلى يدفع ويأخذ الغرض ثم تُكشف قيمته الحقيقية — وقد يكون ملعوناً بقيمة سالبة! الفائز صاحب أعلى ثروة (النقد + قيم الأغراض).',
    opts: [{ k: 'n', n: 'عدد الأغراض', v: [5, 7, 10], d: 7 }],
    init(ps, o, H) {
      const st = { ps, sc: {}, cash: {}, won: {}, i: -1, items: U.shuf(AUC).slice(0, o.n || 7).map(a => ({ n: a[0], e: a[1], v: Math.random() < .18 ? -50 * (1 + U.rnd(6)) : 50 * (1 + U.rnd(12)) })) };
      for (const p of ps) { st.cash[p] = st.sc[p] = 1000; st.won[p] = []; } auNext(st, H); return st;
    },
    act(st, p, a, H) { if (st.ph !== 'bid' || a.t !== 'b' || p in st.sub) return; st.sub[p] = Math.max(0, Math.min(st.cash[p], Math.round((+a.x || 0) / 10) * 10)); if (U.all(st.sub, st.ps)) auRes(st, H); },
    tick(st, H) { if (H.now < st.dl + (st.ph === 'bid' ? 1200 : 0)) return; if (st.ph === 'bid') auRes(st, H); else auNext(st, H); return true; },
    view(st, me, H) {
      const it = st.items[st.i]; let h = `<p class="ctr mut">الغرض ${st.i + 1} من ${st.items.length} · رصيدك ${st.cash[me] ?? 0} 🪙</p><div class="pn ctr lot"><p class="pic">${it.e}</p><p class="big">${it.n}</p></div>`;
      if (st.ph === 'bid') return h + `<div class="pn ctr hint"><small class="mut">تلميحك السرّي</small><p>${st.clue[me] || ''}</p></div>` + (me in st.sub ? `<p class="ctr">مزايدتك: <b>${st.sub[me]}</b> — بانتظار البقية…</p>` : U.form({ t: 'b' }, `${U.inp('x', 'مبلغ المزايدة', 5, 'number')}${U.go('زايِد')}`, 1) + `<p class="ctr">${U.B('لا أريده (0)', { t: 'b', x: 0 }, 'ghost sm')}</p>`) + U.wait(st.sub, st.ps, H);
      const r = st.res;
      return h + `<div class="pn ctr"><p class="big ${it.v < 0 ? 'warn' : ''}">القيمة الحقيقية: ${it.v} 🪙 ${it.v < 0 ? '👻 ملعون!' : ''}</p><p>${r ? `رسا المزاد على ${U.who(H, r.w)} بمبلغ ${r.b} — ${it.v - r.b >= 0 ? `ربح ${it.v - r.b}` : `خسر ${r.b - it.v}`}` : 'لم يزايد أحد. عاد الغرض إلى المخزن.'}</p></div><div class="row ctr">${st.ps.map(p => `<span class="chip">${H.av(p)} ${st.sub[p] ?? 0}</span>`).join('')}</div>`;
    },
    bot(st, p) { if (st.ph === 'bid' && !(p in st.sub)) return { t: 'b', x: Math.random() < .25 ? 0 : U.rnd(Math.min(st.cash[p], 400) / 10 + 1) * 10 }; },
  });

  /* ---------- جزيرة الكوارث (تعاونية) ---------- */
  const ISR = [['صيّاد', '🎣', 'f'], ['سقّاء', '💧', 'w'], ['بنّاء', '🔨', 's'], ['كشّاف', '🔥', 'g']];
  const ISA = { f: ['اصطد سمكاً', '🎣', 3], w: ['اجلب ماءً', '💧', 3], s: ['قوِّ المأوى', '🔨', 2], g: ['أشعل نار الإشارة', '🔥', 1] };
  const ISE = { calm: 'يوم هادئ 🌤', storm: 'عاصفة هوجاء 🌪', heat: 'موجة حرّ ☀️', rats: 'فئران في المخزن 🐀', rain: 'مطر غزير 🌧', fish: 'سرب أسماك قرب الشاطئ 🐟', ship: 'سفينة في الأفق 🚢', wind: 'رياح تهدد النار 💨' };
  function isDay(st, H) { st.day++; st.sub = {}; st.ev = st.nx; st.nx = U.pick(Object.keys(ISE)); st.ph = 'day'; U.dl(st, H, 45000); }
  function isRes(st, H) {
    const n = st.ps.length, L = [], c = { f: 0, w: 0, s: 0, g: 0 };
    for (const p of st.ps) { const a = st.sub[p]; if (!a) continue; c[a]++; const v = ISA[a][2] + (st.role[p] === a ? 1 : 0) + (a === 'f' && st.ev === 'fish' ? 1 : 0); if (a === 'f') st.food += v; else if (a === 'w') st.water += v; else if (a === 's') st.shel = Math.min(10, st.shel + v); else st.sig += v; }
    L.push(`حدث اليوم: ${ISE[st.ev]}`); const h = Math.ceil(n / 2);
    if (st.ev === 'storm') { if (st.shel >= 3) { st.shel--; L.push('صمد المأوى أمام العاصفة (−1 مأوى).'); } else { st.hp--; st.food = Math.max(0, st.food - 2); L.push('المأوى ضعيف! أُصيب الفريق وضاع بعض الطعام.'); } }
    else if (st.ev === 'heat') { st.water = Math.max(0, st.water - h); L.push(`تبخّر ${h} من الماء.`); }
    else if (st.ev === 'rats') { if (st.shel >= 4) L.push('المأوى المتين حمى المخزن.'); else { st.food = Math.max(0, st.food - h); L.push(`أكلت الفئران ${h} من الطعام.`); } }
    else if (st.ev === 'rain') { st.water += n; L.push(`جمعتم ${n} من ماء المطر.`); }
    else if (st.ev === 'ship') { if (c.g) { st.sig += 2; L.push('رأت السفينة ناركم! (+2 إشارة)'); } else L.push('مرّت سفينة ولم يكن أحد عند النار…'); }
    else if (st.ev === 'wind') { if (st.shel >= 2) L.push('حمى المأوى النار من الرياح.'); else { st.sig = Math.max(0, st.sig - 1); L.push('أطفأت الرياح جزءاً من النار (−1 إشارة).'); } }
    for (const [k, nm] of [['food', 'الطعام'], ['water', 'الماء']]) { if (st[k] >= n) st[k] -= n; else { st[k] = 0; st.hp--; L.push(`لم يكفِ ${nm}! ضعف الفريق.`); } }
    st.log = L; st.ph = 'rev'; U.dl(st, H, 8000);
    if (st.sig >= st.tgt) st.end = 'win'; else if (st.hp <= 0 || st.day >= st.days) st.end = 'lose';
  }
  G.reg({
    id: 'island', n: 'جزيرة الكوارث', cat: 'orig', em: '🏝️', hue: 175, min: 2, max: 8, t: 12, modes: 'fps',
    d: 'فريق واحد عالق على جزيرة. وزّعوا المهام بحكمة لتنجوا قبل فوات الأوان.',
    r: 'لعبة تعاونية: إمّا تنجون معاً أو تخسرون معاً. كل يوم يختار كل لاعب سراً مهمة واحدة: صيد، ماء، مأوى، أو نار الإشارة. لكل لاعب تخصص يمنحه +1 في مهمته، والكشّاف وحده يرى كارثة الغد مسبقاً. يستهلك الفريق يومياً طعاماً وماءً بعدد اللاعبين، وأي نقص يضعف صحة الفريق. ارفعوا نار الإشارة إلى الهدف قبل انتهاء الأيام لتلتقطكم سفينة الإنقاذ.',
    opts: [{ k: 'lv', n: 'الصعوبة', v: ['سهل', 'متوسط', 'صعب'], d: 'متوسط' }],
    init(ps, o, H) {
      const n = ps.length, lv = ['سهل', 'متوسط', 'صعب'].indexOf(o.lv || 'متوسط'), st = { ps, sc: U.zero(ps), role: {}, day: 0, days: 8, food: 2 * n, water: 2 * n, shel: 1, sig: 0, hp: 4 - (lv === 2 ? 1 : 0), tgt: 2 * n + 2 + lv * 2, nx: 'calm', log: [] };
      U.shuf(ps).forEach((p, i) => st.role[p] = ISR[i % 4][2]); isDay(st, H); return st;
    },
    act(st, p, a, H) { if (st.ph !== 'day' || !ISA[a.x] || p in st.sub) return; st.sub[p] = a.x; if (U.all(st.sub, st.ps)) isRes(st, H); },
    tick(st, H) {
      if (H.now < st.dl) return;
      if (st.ph === 'day') isRes(st, H); else if (st.end) { const w = st.end === 'win'; if (w) for (const p of st.ps) st.sc[p] = 100 + st.hp * 10; st.over = { win: w ? st.ps.slice() : [], msg: w ? 'وصلت سفينة الإنقاذ! نجوتم جميعاً 🚢' : 'لم تصمدوا هذه المرة… الجزيرة انتصرت 🏝️', coop: 1 }; } else isDay(st, H);
      return true;
    },
    view(st, me, H) {
      const n = st.ps.length, R = ISR.find(r => r[2] === st.role[me]) || ISR[0], bar = (l, v, m, e) => `<div class="meter"><span>${e} ${l}</span><i style="--w:${Math.min(100, v / m * 100)}%"></i><b>${v}${m ? '/' + m : ''}</b></div>`;
      let h = `<p class="ctr mut">اليوم ${st.day} من ${st.days} · دورك: ${R[1]} ${R[0]}</p><div class="pn meters">${bar('الطعام', st.food, n * 3, '🐟')}${bar('الماء', st.water, n * 3, '💧')}${bar('المأوى', st.shel, 10, '⛺')}${bar('نار الإشارة', st.sig, st.tgt, '🔥')}<div class="meter"><span>صحة الفريق</span><b>${'❤️'.repeat(Math.max(0, st.hp)) || '💔'}</b></div></div>`;
      if (st.ph === 'rev') return h + `<div class="pn">${st.log.map(l => `<p>${l}</p>`).join('')}</div><div class="row ctr">${st.ps.map(p => `<span class="chip">${H.av(p)} ${st.sub[p] ? ISA[st.sub[p]][1] : '💤'}</span>`).join('')}</div>`;
      if (R[2] === 'g') h += `<div class="pn ctr hint"><small class="mut">أنت الكشّاف — ترى ما لا يراه غيرك</small><p>كارثة اليوم: <b>${ISE[st.ev]}</b></p></div>`;
      h += `<p class="ctr">يحتاج الفريق اليوم ${n} طعاماً و${n} ماءً. ماذا ستفعل؟</p><div class="opts">${Object.keys(ISA).map(k => `<button class="opt ${st.sub[me] === k ? 'sel' : ''}" ${me in st.sub ? 'disabled' : U.A({ x: k })}>${ISA[k][1]} ${ISA[k][0]} <small>+${ISA[k][2] + (R[2] === k ? 1 : 0)}</small></button>`).join('')}</div>`;
      return h + U.wait(st.sub, st.ps, H);
    },
    bot(st, p) { if (st.ph === 'day' && !(p in st.sub)) { const n = st.ps.length; return { x: st.food < n * 2 && Math.random() < .5 ? 'f' : st.water < n * 2 && Math.random() < .5 ? 'w' : U.pick(['f', 'w', 's', 'g', 'g']) }; } },
  });

  /* ---------- برج الطمع ---------- */
  function twRound(st, H) { st.rd++; st.sub = {}; st.ph = 'pick'; U.dl(st, H, 25000); }
  function twRes(st, H) {
    const by = {}; for (const p in st.sub) (by[st.sub[p]] = by[st.sub[p]] || []).push(p);
    const uq = Object.keys(by).filter(f => by[f].length === 1).map(Number).sort((a, b) => a - b); st.gain = {}; st.thief = null;
    for (const f of uq) { const p = by[f][0]; st.gain[p] = f; st.sc[p] += f; }
    if (uq.length >= 2) { const t = by[uq[0]][0], v = by[uq[uq.length - 1]][0], x = Math.min(2, st.sc[v]); st.sc[v] -= x; st.sc[t] += x; st.thief = { t, v, x }; }
    st.ph = 'rev'; U.dl(st, H, 7000);
  }
  G.reg({
    id: 'tower', n: 'برج الطمع', cat: 'orig', em: '🗼', hue: 330, min: 3, max: 10, t: 6, modes: 'fps',
    d: 'اختر طابقك سراً: الأعلى أغنى… إن لم يزاحمك عليه أحد.',
    r: 'في كل جولة يختار الجميع سراً طابقاً من البرج. من ينفرد بطابقه يكسب عملات بعدد رقم الطابق، ومن يتزاحم مع غيره على طابق واحد لا يكسب شيئاً. وصاحب أدنى طابق منفرد هو «اللص»: يسرق عملتين من صاحب أعلى طابق منفرد. سبع جولات والأغنى يفوز.',
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), rd: 0, n: 7, F: Math.min(9, ps.length + 2) }; twRound(st, H); return st; },
    act(st, p, a, H) { const f = a.f | 0; if (st.ph !== 'pick' || p in st.sub || f < 1 || f > st.F) return; st.sub[p] = f; if (U.all(st.sub, st.ps)) twRes(st, H); },
    tick(st, H) { if (H.now < st.dl) return; if (st.ph === 'pick') twRes(st, H); else if (st.rd < st.n) twRound(st, H); else st.over = { win: U.top(st.sc) }; return true; },
    view(st, me, H) {
      const rev = st.ph === 'rev'; let h = `<p class="ctr mut">الجولة ${st.rd} من ${st.n}</p><div class="tower">`;
      for (let f = st.F; f >= 1; f--) {
        const who = rev ? st.ps.filter(p => st.sub[p] === f) : [];
        h += rev ? `<div class="fl ${who.length === 1 ? 'win' : who.length ? 'lose' : ''}"><b>${f}</b><span>${who.map(p => `${H.av(p)} ${esc(H.nm(p))}`).join(' ، ')}</span><small>${who.length === 1 ? '+' + f : who.length ? 'تزاحم!' : ''}</small></div>`
          : `<button class="fl ${st.sub[me] === f ? 'sel' : ''}" ${me in st.sub ? 'disabled' : U.A({ f })}><b>${f}</b><span>${'🪙'.repeat(Math.min(f, 9))}</span></button>`;
      }
      h += '</div>';
      if (rev && st.thief && st.thief.x) h += `<p class="ctr">🥷 ${esc(H.nm(st.thief.t))} تسلل من الأسفل وسرق ${st.thief.x} من ${esc(H.nm(st.thief.v))}!</p>`;
      return h + (rev ? '' : U.wait(st.sub, st.ps, H));
    },
    bot(st, p) { if (st.ph === 'pick' && !(p in st.sub)) return { f: 1 + U.rnd(st.F) }; },
  });

  /* ---------- صدى ---------- */
  const ECH = ['شيء تجده في المطبخ', 'حيوان يعيش في الصحراء', 'أكلة لا تُقاوَم', 'شيء تأخذه معك إلى البرّ', 'مدينة تتمنى زيارتها', 'شيء لونه أحمر', 'شيء يوقظك من النوم', 'هدية يحبها الجميع', 'شيء موجود في كل سيارة', 'لعبة من أيام الطفولة', 'شيء تشتريه من البقالة', 'مهنة يحلم بها الأطفال', 'فاكهة صيفية', 'شيء تراه في السماء', 'مشروب ساخن', 'شيء يُلبس في الشتاء', 'مادة دراسية', 'شيء في غرفة الجلوس'];
  function ecRound(st, H) { if (st.i + 1 >= st.qs.length) { st.over = { win: U.top(st.sc) }; return; } st.i++; st.sub = {}; st.ph = 'write'; U.dl(st, H, 35000); }
  function ecRes(st, H) {
    const g = {}; for (const p in st.sub) (g[U.norm(st.sub[p])] = g[U.norm(st.sub[p])] || []).push(p);
    st.grp = Object.values(g).sort((a, b) => b.length - a.length); st.gain = {};
    for (const ps of st.grp) for (const p of ps) { st.gain[p] = ps.length === 2 ? 3 : ps.length > 2 ? 1 : 0; st.sc[p] += st.gain[p]; }
    st.ph = 'rev'; U.dl(st, H, 7500);
  }
  G.reg({
    id: 'echo', n: 'صدى', cat: 'orig', em: '🔊', hue: 200, min: 3, max: 12, t: 7, modes: 'fp',
    d: 'اكتب كلمة يكررها لاعب واحد فقط غيرك. اثنان = صدى مثالي، ثلاثة = زحمة!',
    r: 'يظهر وصف (مثل: «شيء في المطبخ») ويكتب كل لاعب كلمة واحدة سراً. إن طابقت كلمتك كلمة لاعب واحد بالضبط فهذا «صدى مثالي» ولكلٍّ منكما 3 نقاط. إن تطابق ثلاثة أو أكثر فنقطة واحدة فقط، ومن ينفرد بكلمته لا يكسب شيئاً. لا تكن متوقَّعاً جداً… ولا غريباً جداً!',
    opts: [{ k: 'rd', n: 'عدد الجولات', v: [5, 7, 10], d: 7 }],
    init(ps, o, H) { const st = { ps, sc: U.zero(ps), qs: U.shuf(ECH).slice(0, o.rd || 7), i: -1 }; ecRound(st, H); return st; },
    act(st, p, a, H) { if (st.ph !== 'write' || a.t !== 'w' || p in st.sub) return; const x = String(a.x || '').trim().slice(0, 24); if (!U.norm(x)) return; st.sub[p] = x; if (U.all(st.sub, st.ps)) ecRes(st, H); },
    tick(st, H) { if (H.now < st.dl + (st.ph === 'write' ? 1500 : 0)) return; if (st.ph === 'write') ecRes(st, H); else ecRound(st, H); return true; },
    view(st, me, H) {
      let h = `<p class="ctr mut">الجولة ${st.i + 1} من ${st.qs.length}</p><div class="pn ctr"><p class="big">${st.qs[st.i]}</p></div>`;
      if (st.ph === 'write') return h + (me in st.sub ? `<p class="ctr">كلمتك: <b>${esc(st.sub[me])}</b> — هل سيرتدّ الصدى؟</p>` : U.form({ t: 'w' }, `${U.inp('x', 'كلمة واحدة', 24)}${U.go('أرسل')}`, 1)) + U.wait(st.sub, st.ps, H);
      return h + `<div class="opts one">${st.grp.map(ps => `<div class="opt res ${ps.length === 2 ? 'win' : ps.length > 2 ? '' : 'lose'}"><span>${esc(st.sub[ps[0]])}</span><small>${ps.map(p => `${H.av(p)} ${esc(H.nm(p))}`).join(' ، ')} · ${ps.length === 2 ? 'صدى مثالي +3' : ps.length > 2 ? 'زحمة +1' : 'بلا صدى'}</small></div>`).join('')}</div>`;
    },
    bot(st, p) { if (st.ph === 'write' && !(p in st.sub)) return { t: 'w', x: U.pick(['قهوة', 'شاي', 'جمل', 'ملعقة', 'تفاح']) }; },
  });

  /* ---------- سوق القوافل ---------- */
  const GD = [['تمر', '🌴'], ['قهوة', '☕'], ['بخور', '🪔'], ['لؤلؤ', '💎']];
  const cvMatch = (st, p) => st.hand[p].reduce((s, h, i) => s + Math.min(h, st.tgt[p][i]), 0);
  function cvEnd(st, H) { for (const p of st.ps) { const m = cvMatch(st, p); st.sc[p] = m * 10 + (m === 6 ? 40 : 0); } st.ph = 'rev'; U.dl(st, H, 9000); }
  G.reg({
    id: 'caravan', n: 'سوق القوافل', cat: 'orig', em: '🐫', hue: 25, min: 3, max: 8, t: 6, modes: 'ps',
    d: 'لكل تاجر طلبية سرية. فاوِض وبادِل البضائع قبل أن يغلق السوق.',
    r: 'يحمل كل تاجر 6 بضائع ولديه طلبية سرية من 6 بضائع عليه تجميعها. اعرض مبادلة («أعطي تمراً وأريد لؤلؤاً») ليقبلها أي تاجر، أو اقبل عروض غيرك، وتفاوضوا بالكلام والدردشة كما تشاؤون. عند إغلاق السوق تكسب 10 نقاط عن كل بضاعة مطابقة لطلبيتك و40 إضافية إذا اكتملت. البضائع في السوق تكفي الجميع تماماً… إن أحسنتم التفاوض!',
    opts: [{ k: 'tm', n: 'مدة السوق (ث)', v: [90, 150, 240], d: 150 }],
    init(ps, o, H) {
      const st = { ps, sc: U.zero(ps), hand: {}, tgt: {}, off: {}, done: {}, log: [], ph: 'trade' }, pool = [];
      for (const p of ps) { st.tgt[p] = [0, 0, 0, 0]; st.hand[p] = [0, 0, 0, 0]; for (let i = 0; i < 6; i++) { const g = U.rnd(4); st.tgt[p][g]++; pool.push(g); } }
      const d = U.shuf(pool); ps.forEach((p, i) => d.slice(i * 6, i * 6 + 6).forEach(g => st.hand[p][g]++)); U.dl(st, H, (o.tm || 150) * 1000); return st;
    },
    act(st, p, a, H) {
      if (st.ph !== 'trade') return;
      if (a.t === 'of' && a.g !== a.w && GD[a.g] && GD[a.w] && st.hand[p][a.g] > 0) st.off[p] = { g: a.g, w: a.w };
      else if (a.t === 'cx') delete st.off[p];
      else if (a.t === 'ac') {
        const q = a.p, o = st.off[q]; if (!o || q === p || st.hand[p][o.w] < 1 || st.hand[q][o.g] < 1) return;
        st.hand[q][o.g]--; st.hand[q][o.w]++; st.hand[p][o.w]--; st.hand[p][o.g]++; delete st.off[q];
        if (st.off[p] && st.hand[p][st.off[p].g] < 1) delete st.off[p];
        st.log.push(`${H.nm(q)} ⇄ ${H.nm(p)}: ${GD[o.g][1]} مقابل ${GD[o.w][1]}`); if (st.log.length > 4) st.log.shift(); delete st.done[p]; delete st.done[q];
      } else if (a.t === 'done') { st.done[p] = 1; delete st.off[p]; if (U.all(st.done, st.ps)) cvEnd(st, H); }
    },
    tick(st, H) { if (H.now < st.dl) return; if (st.ph === 'trade') cvEnd(st, H); else st.over = { win: U.top(st.sc) }; return true; },
    view(st, me, H) {
      const hd = st.hand[me] || [0, 0, 0, 0], tg = st.tgt[me] || [0, 0, 0, 0], rev = st.ph === 'rev';
      const row = p => GD.map((g, i) => `<div class="good ${st.hand[p][i] >= st.tgt[p][i] ? 'ok' : ''}"><span>${g[1]}</span><b>${st.hand[p][i]}<small>/${st.tgt[p][i]}</small></b><em>${g[0]}</em></div>`).join('');
      if (rev) return `<p class="ctr big">أُغلق السوق!</p>${st.ps.map(p => `<div class="pn"><p>${U.who(H, p)} — ${cvMatch(st, p)} من 6 ${cvMatch(st, p) === 6 ? '🏆 طلبية مكتملة' : ''}</p><div class="goods">${row(p)}</div></div>`).join('')}`;
      let h = `<div class="pn"><p class="mut ctr">بضاعتك / طلبيتك السرية (${cvMatch(st, me)} من 6)</p><div class="goods">${row(me)}</div></div>`;
      const my = st.off[me];
      if (st.done[me]) h += '<p class="ctr mut">اكتفيتَ من السوق. بانتظار البقية…</p>';
      else if (my) h += `<p class="ctr">عرضك: أعطي ${GD[my.g][1]} وأريد ${GD[my.w][1]} ${U.B('إلغاء', { t: 'cx' }, 'ghost sm')}</p>`;
      else {
        const g = H.ui.g, w = H.ui.w;
        h += `<div class="pn"><p class="ctr">أعطي:</p><div class="row ctr">${GD.map((x, i) => `<button class="btn sm ${g === i ? 'pri' : 'ghost'}" ${hd[i] ? U.UI({ g: i }) : 'disabled'}>${x[1]} ${x[0]}</button>`).join('')}</div><p class="ctr">وأريد:</p><div class="row ctr">${GD.map((x, i) => `<button class="btn sm ${w === i ? 'pri' : 'ghost'}" ${U.UI({ w: i })}>${x[1]} ${x[0]}</button>`).join('')}</div><p class="ctr">${g != null && w != null && g !== w ? U.B('اعرض المبادلة', { t: 'of', g, w }, 'pri') : '<span class="mut">اختر ما تعطيه وما تريده</span>'}</p></div>`;
      }
      const offs = st.ps.filter(p => p !== me && st.off[p]);
      h += `<p class="ctr mut">عروض السوق</p><div class="opts one">${offs.map(p => { const o = st.off[p]; return `<div class="opt res"><span>${H.av(p)} ${esc(H.nm(p))}: يعطي ${GD[o.g][1]} ${GD[o.g][0]} ويريد ${GD[o.w][1]} ${GD[o.w][0]}</span>${!st.done[me] && hd[o.w] > 0 ? U.B('اقبل', { t: 'ac', p }, 'pri sm') : ''}</div>`; }).join('') || '<p class="ctr mut">لا عروض بعد.</p>'}</div>`;
      h += `<div class="row ctr">${st.log.map(l => `<span class="chip">${esc(l)}</span>`).join('')}</div>`;
      if (!st.done[me]) h += `<p class="ctr">${U.B('اكتفيت', { t: 'done' }, 'ghost')}</p>`;
      return h + U.wait(st.done, st.ps, H);
    },
    bot(st, p) {
      if (st.ph !== 'trade' || st.done[p]) return; const h = st.hand[p], t = st.tgt[p], sur = [0, 1, 2, 3].filter(i => h[i] > t[i]), def = [0, 1, 2, 3].filter(i => h[i] < t[i]);
      for (const q of st.ps) { const o = st.off[q]; if (o && q !== p && def.includes(o.g) && sur.includes(o.w)) return { t: 'ac', p: q }; }
      if (!def.length || Math.random() < .03) return { t: 'done' };
      if (!st.off[p] && sur.length && Math.random() < .3) return { t: 'of', g: U.pick(sur), w: U.pick(def) };
    },
  });
})();
