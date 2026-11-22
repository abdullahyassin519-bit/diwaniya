/* شُهُب — the game around the battles: home, modes (campaign · quick · ranked · friends · survival · daily challenge · practice), progression
   (levels, XP, dinars), daily missions, achievements, armory (cosmetic only — never stats), profile, leaderboard and settings. Window.SHM. */
(() => {
  'use strict';
  const G = window.SHG, C = window.SHW_C, $ = G.$, tr = G.tr, esc = G.esc;
  const AR = () => G.LANG === 'ar', nm = o => o.n[AR() ? 0 : 1];
  /* ---------------- words ---------------- */
  Object.assign(G.TXT.ar, {
    tagline: 'حرب المدافع فوق الجبال', quick: 'معركة سريعة', quickS: 'ضد الآلي · اختر الشخصية والخريطة', ranked: 'المصنّفة', rankedS: 'لاعبون حقيقيون · دوري ونقاط', friends: 'ضد صديق', friendsS: 'رابط واتساب', campaign: 'الحملة', survival: 'البقاء', daily: 'تحدي اليوم', practice: 'التدريب', practiceS: 'تعلّم واختبر الأسلحة', trials: 'تجارب الشهب', trialsS: 'اللعبة الكلاسيكية',
    missions: 'المهام', armory: 'المخزن', profile: 'الملف', board: 'الترتيب', settings: 'الإعدادات', back: 'رجوع', start: 'ابدأ', lv: 'مستوى {0}',
    campT: 'الحملة: قادة الجبل', campS: '{0}/10 · ★ {1}/30', survT: 'البقاء', survS: 'أفضل موجة: {0}', survHow: 'موجات لا تنتهي من القادة. قلبك لا يُشفى إلا قليلاً بين الموجات. إلى أين تصل؟', dailyT: 'تحدي اليوم', dailyS: '{0}', dailyDone: '✓ أنجزته اليوم', streak: 'سلسلة: {0} يوم',
    quickT: 'معركة سريعة', pers: 'الشخصية', map: 'الخريطة', randomMap: '🎲 عشوائية', go: 'إلى المعركة',
    rkT: 'المصنّفة', rkSeason: 'الموسم {0}', rkFind: '🔍 ابحث عن خصم', rkCancel: 'إلغاء البحث', rkSearching: 'نبحث عن لاعب حقيقي بتصنيف قريب… ({0} في الطابور)', rkAlone: 'لا يوجد لاعبون آخرون في الطابور الآن. أبقِ البحث مفتوحاً، أو ادعُ صديقاً عبر «ضد صديق».', rkFound: 'وُجد خصم: {0} ({1})', rkNote: 'نتائج المصنّفة تُحفظ على الخادم. الخادم المجاني قد يُعاد تشغيله فتُمسح النقاط؛ قاعدة بيانات دائمة ستحل ذلك.', rkOffline: 'تعذّر الاتصال بالخادم',
    lg_bronze: 'برونزي', lg_silver: 'فضي', lg_gold: 'ذهبي', lg_platinum: 'بلاتيني', lg_diamond: 'ماسي', lg_star: 'نجمي', wl: '{0} فوز · {1} خسارة', boardT: 'ترتيب الموسم', boardEmpty: 'لا أحد في الترتيب بعد هذا الموسم — كن الأول!', you: 'أنت',
    msT: 'مهام اليوم', msNew: 'تتجدد المهام كل يوم', claim: 'استلم', claimed: '✓', achT: 'الإنجازات', profT: 'الملف الشخصي',
    st_battles: 'معارك', st_wins: 'انتصارات', st_rate: 'نسبة الفوز', st_dmg: 'ضرر كلّي', st_gates: 'بوابات', st_stars: 'شُهب عظمى', st_best: 'أكبر سرب', st_acc: 'متوسط الدقة',
    arT: 'المخزن', arNote: 'كل ما هنا شكلي فقط — لا يمنح أي أفضلية في القتال.', skins: 'هيكل المدفع', trails: 'أثر القذائف', equip: 'تجهيز', equipped: 'مُجهّز', buy: 'شراء · {0}', needLv: 'مستوى {0}', banner: 'لون الراية',
    setT: 'الإعدادات', sSfx: 'المؤثرات', sMusic: 'الموسيقى', sVib: 'الاهتزاز', sFx: 'جودة المؤثرات', high: 'عالية', low: 'موفّرة', on: 'تشغيل', off: 'إيقاف', sLang: 'اللغة', sName: 'الاسم', sTut: 'أعد الدرس التعليمي', sAbout: 'شُهُب — صُنعت بالعربية أولاً.',
    resWin: 'انتصرت! 🏆', resLose: 'سقطت قلعتك', resWave: 'صمدت الموجة {0}!', resWaveEnd: 'سقطت في الموجة {0}', xp: '+{0} خبرة', coins: '+{0} دينار', lvUp: '🎉 المستوى {0}!', newAch: '🏅 إنجاز: {0}', msDone: '✅ مهمة: {0}', rkDelta: '{0} نقطة · {1}',
    next: 'التالي', retry: 'أعد', again: 'معركة أخرى', nextWave: 'الموجة التالية ⚔️', rematch: 'جولة أخرى', queueAgain: 'ابحث مجدداً', home: 'الرئيسية', dcGoal: 'الهدف: {0}', dcPassed: '✓ أُنجز التحدي', dcFailed: '✗ لم يتحقق الهدف', tutT: 'الدرس التعليمي', tutS: '٦ خطوات · دقيقتان', range: 'ميدان حر',
    w_swarm: 'سرب', w_fire: 'نار', w_boulder: 'صخرة', fired0: '', acc: 'الدقة', dmg: 'ضرر', time: 'الوقت', home: 'الرئيسية', warLobby: 'غرفة الحرب', warLobbyS: 'أرسل الرابط لصديقك. أنت على يسار الجبل وهو على يمينه، وكلٌّ يرى نفسه على اليسار.', warStart: 'ابدأ الحرب', need2: 'بانتظار صديقك…', mapN: 'الخريطة: {0}', fair: 'نفس القلعة ونفس الأسلحة للطرفين.', foeGone: 'لم يصل خصمك' },
  );
  Object.assign(G.TXT.en, {
    tagline: 'Cannon wars over the mountains', quick: 'Quick battle', quickS: 'vs computer · pick a personality and map', ranked: 'Ranked', rankedS: 'real players · leagues & points', friends: 'Vs a friend', friendsS: 'WhatsApp link', campaign: 'Campaign', survival: 'Survival', daily: 'Daily challenge', practice: 'Practice', practiceS: 'learn & test weapons', trials: 'Meteor Trials', trialsS: 'the classic game',
    missions: 'Missions', armory: 'Armory', profile: 'Profile', board: 'Leaderboard', settings: 'Settings', back: 'Back', start: 'Start', lv: 'Level {0}',
    campT: 'Campaign: the mountain lords', campS: '{0}/10 · ★ {1}/30', survT: 'Survival', survS: 'Best wave: {0}', survHow: 'Endless waves of lords. Your heart only heals a little between waves. How far can you go?', dailyT: 'Daily challenge', dailyS: '{0}', dailyDone: '✓ Done today', streak: 'Streak: {0} days',
    quickT: 'Quick battle', pers: 'Personality', map: 'Map', randomMap: '🎲 Random', go: 'To battle',
    rkT: 'Ranked', rkSeason: 'Season {0}', rkFind: '🔍 Find an opponent', rkCancel: 'Cancel search', rkSearching: 'Looking for a real player near your rating… ({0} in queue)', rkAlone: 'Nobody else is in the queue right now. Keep searching, or invite a friend with “Vs a friend”.', rkFound: 'Opponent found: {0} ({1})', rkNote: 'Ranked results are stored on the server. The free server can restart and wipe points; a permanent database would fix that.', rkOffline: 'Could not reach the server',
    lg_bronze: 'Bronze', lg_silver: 'Silver', lg_gold: 'Gold', lg_platinum: 'Platinum', lg_diamond: 'Diamond', lg_star: 'Star', wl: '{0} W · {1} L', boardT: 'Season ranking', boardEmpty: 'Nobody is ranked yet this season — be the first!', you: 'you',
    msT: "Today's missions", msNew: 'Missions refresh every day', claim: 'Claim', claimed: '✓', achT: 'Achievements', profT: 'Profile',
    st_battles: 'battles', st_wins: 'wins', st_rate: 'win rate', st_dmg: 'total damage', st_gates: 'gates', st_stars: 'great stars', st_best: 'biggest volley', st_acc: 'avg accuracy',
    arT: 'Armory', arNote: 'Everything here is cosmetic — it never gives a combat advantage.', skins: 'Cannon finish', trails: 'Projectile trail', equip: 'Equip', equipped: 'Equipped', buy: 'Buy · {0}', needLv: 'Level {0}', banner: 'Banner colour',
    setT: 'Settings', sSfx: 'Effects', sMusic: 'Music', sVib: 'Vibration', sFx: 'Effects quality', high: 'High', low: 'Battery saver', on: 'On', off: 'Off', sLang: 'Language', sName: 'Name', sTut: 'Replay the tutorial', sAbout: 'SHUHUB — made Arabic-first.',
    resWin: 'Victory! 🏆', resLose: 'Your fort fell', resWave: 'Wave {0} survived!', resWaveEnd: 'You fell on wave {0}', xp: '+{0} XP', coins: '+{0} dinars', lvUp: '🎉 Level {0}!', newAch: '🏅 Achievement: {0}', msDone: '✅ Mission: {0}', rkDelta: '{0} pts · {1}',
    next: 'Next', retry: 'Retry', again: 'Another battle', nextWave: 'Next wave ⚔️', rematch: 'Rematch', queueAgain: 'Search again', home: 'Home', dcGoal: 'Goal: {0}', dcPassed: '✓ Challenge complete', dcFailed: '✗ Goal not met', tutT: 'Tutorial', tutS: '6 steps · 2 minutes', range: 'Free range',
    w_swarm: 'Swarm', w_fire: 'Fire', w_boulder: 'Boulder', fired0: '', acc: 'accuracy', dmg: 'damage', time: 'time', home: 'Home', warLobby: 'War room', warLobbyS: "Send the link to a friend. You're left of the mountain, they're right — each of you sees yourself on the left.", warStart: 'Start the war', need2: 'Waiting for your friend…', mapN: 'Map: {0}', fair: 'Same fort and weapons for both sides.', foeGone: 'Your opponent did not arrive' });
  /* ---------------- saved state ---------------- */
  const P = Object.assign({ xp: 0, lv: 1, coins: 0, camp: {}, campUn: 1, survBest: 0, daily: {}, streak: 0, lastDaily: '', ms: {}, ach: {}, stats: { battles: 0, wins: 0, dmg: 0, gates: 0, stars: 0, best: 0, accSum: 0, accN: 0, chains: 0, dunes: 0, thuds: 0, rankedWins: 0 }, cos: { skin: 'bronze', trail: 'ember', own: { bronze: 1, ember: 1 } }, set: { sfx: .9, music: .6, vib: 1, fx: 'high' }, fired: 0, tut: 0, quickP: 'tactical', quickMap: -1 }, G.LS.get('sh2_prog', {}));
  for (const k of ['stats', 'cos', 'set']) P[k] = Object.assign({}, { stats: { battles: 0, wins: 0, dmg: 0, gates: 0, stars: 0, best: 0, accSum: 0, accN: 0, chains: 0, dunes: 0, thuds: 0, rankedWins: 0 }, cos: { skin: 'bronze', trail: 'ember', own: { bronze: 1, ember: 1 } }, set: { sfx: .9, music: .6, vib: 1, fx: 'high' } }[k], P[k] || {});
  const save = () => G.LS.set('sh2_prog', P);
  const today = () => new Date().toISOString().slice(0, 10);
  const xpNeed = lv => 200 + 90 * (lv - 1);
  /* ---------------- content ---------------- */
  const MISSIONS = [
    { id: 'gates', t: ['مرّر قذائفك عبر البوابات {0} مرات', 'Thread gates {0} times'], n: 6, k: 'gates', r: 50 },
    { id: 'win', t: ['انتصر في {0} معارك', 'Win {0} battles'], n: 2, k: 'wins', r: 60 },
    { id: 'dmg', t: ['أوقع {0} ضرر', 'Deal {0} damage'], n: 3000, k: 'dmg', r: 50 },
    { id: 'chain', t: ['فجّر {0} جرار زيت', 'Blow up {0} oil jars'], n: 2, k: 'chains', r: 60 },
    { id: 'star', t: ['استدعِ الشهاب الأعظم {0} مرة', 'Call the Great Star {0} time(s)'], n: 1, k: 'stars', r: 70 },
    { id: 'roll', t: ['حطّم الجدار بصخرة متدحرجة {0} مرات', 'Smash a wall with a rolling boulder {0} times'], n: 2, k: 'thuds', r: 60 },
    { id: 'dune', t: ['ارفع {0} كثبان', 'Raise {0} dunes'], n: 3, k: 'dunes', r: 40 },
    { id: 'battles', t: ['العب {0} معارك', 'Play {0} battles'], n: 3, k: 'battles', r: 40 },
    { id: 'falls', t: ['أسقط {0} طوبة بالانهيار', 'Topple {0} bricks by collapse'], n: 15, k: 'falls', r: 50 },
  ];
  const ACH = [
    { id: 'first', i: '🏆', t: ['أول نصر', 'First victory'], r: 50 }, { id: 'campaign', i: '🗺️', t: ['هزمت الصقر الأسود', 'Beat the Black Falcon'], r: 200 }, { id: 'stars30', i: '⭐', t: ['30 نجمة في الحملة', '30 campaign stars'], r: 250 },
    { id: 'ranked', i: '🥇', t: ['أول نصر مصنّف', 'First ranked win'], r: 100 }, { id: 'wave5', i: '🌊', t: ['الموجة 5 في البقاء', 'Survival wave 5'], r: 100 }, { id: 'wave10', i: '🌊', t: ['الموجة 10 في البقاء', 'Survival wave 10'], r: 200 },
    { id: 'gates100', i: '✨', t: ['50 مرور عبر البوابات', '50 gate threads'], r: 80 }, { id: 'flawless', i: '🛡️', t: ['انتصار دون أن يُمسّ قلبك', 'Win with an untouched heart'], r: 120 }, { id: 'comeback', i: '🔥', t: ['انتصار وقلبك تحت 15%', 'Win with your heart under 15%'], r: 120 },
    { id: 'finisher', i: '🌠', t: ['أنهِ معركة بالشهاب الأعظم', 'Finish a battle with the Great Star'], r: 100 }, { id: 'chain3', i: '🏺', t: ['3 جرار في معركة واحدة', '3 jars in one battle'], r: 100 }, { id: 'demolisher', i: '💥', t: ['5000 ضرر في معركة', '5000 damage in a battle'], r: 100 },
    { id: 'sniper', i: '🎯', t: ['دقة 80% بثماني طلقات أو أكثر', '80% accuracy over 8+ volleys'], r: 100 }, { id: 'architect', i: '🏜️', t: ['20 كثيباً', '20 dunes raised'], r: 80 }, { id: 'lv10', i: '👑', t: ['المستوى 10', 'Reach level 10'], r: 150 }, { id: 'streak7', i: '📅', t: ['سلسلة 7 أيام من التحديات', '7-day challenge streak'], r: 200 },
  ];
  const SKINS = [{ k: 'bronze', c: 0, lv: 1 }, { k: 'obsidian', c: 250, lv: 3 }, { k: 'jade', c: 400, lv: 5 }, { k: 'royal', c: 700, lv: 8 }, { k: 'crystal', c: 1000, lv: 12 }];
  const TRAILS = [{ k: 'ember', c: 0, lv: 1 }, { k: 'frost', c: 200, lv: 2 }, { k: 'emerald', c: 300, lv: 4 }, { k: 'violet', c: 500, lv: 6 }, { k: 'rainbow', c: 900, lv: 10 }];
  const COSN = { bronze: ['برونز', 'Bronze'], obsidian: ['سَبَج', 'Obsidian'], jade: ['يشم', 'Jade'], royal: ['ملكي', 'Royal gold'], crystal: ['بلّور', 'Crystal'], ember: ['جمر', 'Ember'], frost: ['صقيع', 'Frost'], emerald: ['زمرد', 'Emerald'], violet: ['بنفسج', 'Violet'], rainbow: ['قوس قزح', 'Rainbow'] };
  const COSC = { bronze: '#c9963e', obsidian: '#3a3550', jade: '#3fbf8f', royal: '#e8b830', crystal: '#9ad0ff', ember: '#ff9a4a', frost: '#9adfff', emerald: '#4fe0a0', violet: '#b07aff', rainbow: 'linear-gradient(90deg,#ff5a5a,#ffd36b,#5aff9a,#5ab4ff,#c05aff)' };
  /* daily challenge: one rule set per date, the same for everyone */
  const DC = [
    { id: 'boulders', t: ['المدحرج: انتصر بالصخور فقط', 'The Roller: win with boulders only'], rules: { only: ['boulder', 'dune', 'star'] }, per: 'defensive', map: 1 },
    { id: 'sniper', t: ['القنّاص: انتصر بـ 14 طلقة أو أقل', 'Sniper: win in 14 volleys or fewer'], rules: { maxVolleys: 14 }, per: 'tactical', map: 2 },
    { id: 'storm', t: ['العاصفة: انتصر والريح في أقصاها', 'Storm: win in a raging wind'], rules: { windMax: 16 }, per: 'tactical', map: 4 },
    { id: 'nodune', t: ['بلا دروع: انتصر دون كثبان', 'No shields: win without dunes'], rules: { only: ['swarm', 'fire', 'boulder', 'star'] }, per: 'aggressive', map: 0 },
    { id: 'fire', t: ['المحرقة: انتصر بالنار فقط', 'Inferno: win with fire only'], rules: { only: ['fire', 'dune', 'star'] }, per: 'tactical', map: 3 },
    { id: 'swarm', t: ['السرب: انتصر بالسرب فقط', 'The Swarm: win with swarms only'], rules: { only: ['swarm', 'dune', 'star'] }, per: 'defensive', map: 2 },
    { id: 'grand', t: ['المعلّم: اهزم الخبير على العاصفة', 'Master: beat the Grandmaster in the Storm'], rules: {}, per: 'expert', map: 4 },
  ];
  const dcToday = () => { const d = today(), i = C.hashStr('dc' + d) % DC.length; return Object.assign({ date: d }, DC[i]); };
  const msToday = () => { const d = today(); if (!P.ms || P.ms.date !== d) { const r = C.rng(C.hashStr('ms' + d)), pool = MISSIONS.slice(), pick = []; while (pick.length < 3) pick.push(pool.splice(Math.floor(r() * pool.length), 1)[0]); P.ms = { date: d, list: pick.map(m => ({ id: m.id, p: 0, done: 0, claimed: 0 })) }; save(); } return P.ms; };
  const leagueName = lg => tr('lg_' + lg), LGI = { bronze: '🥉', silver: '🥈', gold: '🥇', platinum: '💠', diamond: '💎', star: '🌟' };
  /* ---------------- API for the battle client ---------------- */
  window.SHM = {
    cos: () => P.cos, set: () => P.set, fired: () => P.fired, onFire() { P.fired++; if (P.fired % 10 === 0) save(); }, onAct() { }, onTutDone() { P.tut = 1; save(); },
    result, home,
  };
  /* audio & vibration settings */
  function applySet() { if (G.setVol) G.setVol(P.set.sfx, P.set.music); G.vib = !!P.set.vib; }
  /* ---------------- screens ---------------- */
  function home() {
    if (window.SHW) SHW.leave(); G.show('home'); msToday(); const need = xpNeed(P.lv);
    $('pcAv').style.background = `hsl(${G.HUE},70%,55%)`; $('pcAv').textContent = (G.NAME || (AR() ? 'ر' : 'A')).trim().slice(0, 1); $('pcLv').textContent = P.lv; $('pcName').textContent = G.NAME || (AR() ? 'رامي' : 'Archer');
    $('pcXp').style.width = Math.min(100, P.xp / need * 100).toFixed(0) + '%'; $('pcXpT').textContent = P.xp + ' / ' + need; $('pcCoins').textContent = '🪙 ' + P.coins;
    const stars = Object.values(P.camp).reduce((a, b) => a + b, 0); $('hCampS').textContent = tr('campS', Math.min(10, Object.keys(P.camp).length), stars); $('hSurvS').textContent = tr('survS', P.survBest);
    const dc = dcToday(); $('hDailyS').textContent = P.daily[dc.date] ? tr('dailyDone') : nm({ n: dc.t }); const open = msToday().list.filter(m => m.done && !m.claimed).length; $('hMisB').textContent = open || ''; $('hMisB').classList.toggle('hide', !open);
    fetchBoard().then(b => { if (b && b.me) { $('pcLeague').textContent = LGI[b.me.lg] + ' ' + b.me.r; } }).catch(() => { });
  }
  let boardCache = null; async function fetchBoard() { try { const r = await fetch('/sh/api/board?t=' + G.TOK, { cache: 'no-store' }); boardCache = await r.json(); return boardCache; } catch (e) { return null; } }
  function quick() { G.show('quick'); const ps = ['beginner', 'tactical', 'aggressive', 'defensive', 'expert'];
    $('qPers').innerHTML = ps.map(k => `<button data-p="${k}" class="${P.quickP === k ? 'on' : ''}">${{ beginner: '🐣', tactical: '🧠', aggressive: '🔥', defensive: '🛡️', expert: '👑' }[k]} ${nm(C.P[k])}</button>`).join('');
    $('qMap').innerHTML = [`<button data-m="-1" class="${P.quickMap === -1 ? 'on' : ''}">${tr('randomMap')}</button>`].concat(C.MAPS.map((m, i) => `<button data-m="${i}" class="${P.quickMap === i ? 'on' : ''}">⛰️ ${esc(nm(m))}</button>`)).join('');
    $('qPers').querySelectorAll('button').forEach(b => b.onclick = () => { G.SFX.click(); P.quickP = b.dataset.p; save(); quick(); }); $('qMap').querySelectorAll('button').forEach(b => b.onclick = () => { G.SFX.click(); P.quickMap = +b.dataset.m; save(); quick(); });
    $('qDesc').textContent = { beginner: AR() ? 'يتعلّم التصويب ويخطئ كثيراً.' : 'Still learning to aim; misses a lot.', tactical: AR() ? 'يقرأ الأرض والبوابات ويصحّح بدقة.' : 'Reads terrain and gates, corrects precisely.', aggressive: AR() ? 'يطلق بلا توقف ويستدعي الشهاب فوراً.' : 'Fires nonstop and calls the star at once.', defensive: AR() ? 'يبني الكثبان كلما اقتربت قذائفك.' : 'Raises dunes whenever you get close.', expert: AR() ? 'يتكيّف معك: يلتف حول دروعك ويصطاد جرارك.' : 'Adapts: lobs over your shields, hunts your jars.' }[P.quickP];
  }
  function startQuick() { const B0 = C.P[P.quickP] || C.P.tactical, map = P.quickMap >= 0 ? P.quickMap : Math.floor(Math.random() * C.MAPS.length); SHW.start({ mode: 'bot', kind: 'quick', diff: P.quickP, map, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: B0, names: [myName(), '🤖 ' + nm(B0)], hues: [G.HUE, 8] }); }
  const myName = () => G.NAME || (AR() ? 'أنت' : 'You');
  const ICON = ['🐑', '🛡️', '🐺', '🧱', '🐎', '🌪️', '🌴', '⚔️', '👑', '🦅'];
  function campaign() { G.show('campaign'); const stars = Object.values(P.camp).reduce((a, b) => a + b, 0); $('cmHead').textContent = tr('campS', Object.keys(P.camp).length, stars);
    $('cmList').innerHTML = C.BOTS.map((b, i) => { const lock = i + 1 > P.campUn, s = P.camp[i] || 0; return `<button class="bot ${lock ? 'lock' : ''} ${i + 1 === P.campUn && !s ? 'next' : ''}" data-b="${i}" ${lock ? 'disabled' : ''}><i>${lock ? '🔒' : ICON[i]}</i><div>${i + 1}. ${esc(nm(b))}<small>${esc(nm(C.P[b.per]))} · ⛰️ ${esc(nm(C.MAPS[b.map]))}</small></div><b>${'★'.repeat(s)}${'☆'.repeat(3 - s)}</b></button>`; }).join('');
    $('cmList').querySelectorAll('[data-b]').forEach(b => b.onclick = () => { G.SFX.click(); startCamp(+b.dataset.b); }); }
  function startCamp(i) { const Bt = C.BOTS[i]; SHW.start({ mode: 'bot', kind: 'campaign', botIdx: i, map: Bt.map, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: Bt, names: [myName(), nm(Bt)], hues: [G.HUE, 8] }); }
  const SURV = ['beginner', 'aggressive', 'tactical', 'defensive', 'aggressive', 'tactical', 'expert', 'defensive', 'expert'];
  function startSurvival(wave, carry) { const per = SURV[Math.min(SURV.length - 1, wave - 1)], B0 = Object.assign({}, C.P[per], { err: Math.max(1.5, C.P[per].err - wave * .3), slow: Math.max(.75, C.P[per].slow - wave * .03) });
    SHW.start({ mode: 'bot', kind: 'survival', wave, carry, map: (wave - 1) % C.MAPS.length, seed: (Math.random() * 4e9) >>> 0, side: 0, bot: B0, hpMul: .8 + wave * .08, names: [myName(), (AR() ? 'الموجة ' : 'Wave ') + wave + ' · ' + nm(B0)], hues: [G.HUE, (wave * 47) % 360] }); }
  function daily() { G.show('daily'); const dc = dcToday(); $('dcName').textContent = nm({ n: dc.t }); $('dcFoe').textContent = '🤖 ' + nm(C.P[dc.per]) + ' · ⛰️ ' + nm(C.MAPS[dc.map]); $('dcState').textContent = P.daily[dc.date] ? tr('dailyDone') : ''; $('dcStreak').textContent = tr('streak', P.streak); }
  function startDaily() { const dc = dcToday(), B0 = C.P[dc.per]; SHW.start({ mode: 'bot', kind: 'daily', challenge: dc.id, rules: dc.rules, map: dc.map, seed: C.hashStr(dc.date), side: 0, bot: B0, names: [myName(), '📅 ' + nm(B0)], hues: [G.HUE, 280] }); }
  function startPractice(tutorial) { SHW.start({ mode: 'practice', kind: tutorial ? 'tutorial' : 'practice', tut: tutorial, map: tutorial ? 1 : (P.quickMap >= 0 ? P.quickMap : 0), seed: 12345, side: 0, bot: C.P.beginner, names: [myName(), tutorial ? tr('tutT') : tr('range')], hues: [G.HUE, 8] }); }
  /* ---------------- ranked queue (real players only) ---------------- */
  let RQ = null;
  async function ranked() { G.show('ranked'); $('rkStatus').textContent = ''; $('rkFind').classList.remove('hide'); $('rkCancel').classList.add('hide'); const b = await fetchBoard();
    if (!b) { $('rkCard').innerHTML = `<b>${tr('rkOffline')}</b>`; return; } const m = b.me || { r: 1000, lg: 'bronze', w: 0, l: 0 };
    $('rkCard').innerHTML = `<div class="lgbig">${LGI[m.lg]}</div><b>${leagueName(m.lg)} · ${m.r}</b><small>${tr('wl', m.w, m.l)} · ${tr('rkSeason', b.season)}</small>`; }
  function rkFind() { if (RQ) return; $('rkFind').classList.add('hide'); $('rkCancel').classList.remove('hide'); $('rkStatus').textContent = tr('rkSearching', 1);
    const ws = new WebSocket(location.origin.replace(/^http/, 'ws') + '/sh/ws?m=ranked&t=' + G.TOK + '&n=' + encodeURIComponent(G.NAME || (AR() ? 'رامي' : 'Archer')) + '&h=' + G.HUE); RQ = ws; let t0 = Date.now();
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.t === 'queued') $('rkStatus').textContent = m.n <= 1 && Date.now() - t0 > 6000 ? tr('rkAlone') : tr('rkSearching', m.n);
      if (m.t === 'match') { RQ = null; G.SFX.ready && G.SFX.ready(); $('rkStatus').textContent = tr('rkFound', m.foe.n, leagueName(m.foe.lg) + ' ' + m.foe.r); setTimeout(() => SHW.startNet(m.code, { ranked: 1 }), 700); } };
    ws.onerror = () => { $('rkStatus').textContent = tr('rkOffline'); }; ws.onclose = () => { if (RQ === ws) { RQ = null; $('rkFind').classList.remove('hide'); $('rkCancel').classList.add('hide'); } }; }
  function rkCancel() { const ws = RQ; RQ = null; if (ws) try { ws.close(); } catch (e) { } $('rkFind').classList.remove('hide'); $('rkCancel').classList.add('hide'); $('rkStatus').textContent = ''; }
  async function board() { G.show('board'); $('bdList').innerHTML = '<li>…</li>'; const b = await fetchBoard(); if (!b) { $('bdList').innerHTML = `<li>${tr('rkOffline')}</li>`; return; }
    $('bdSeason').textContent = tr('rkSeason', b.season); $('bdList').innerHTML = b.top.length ? b.top.map(x => `<li class="${x.me ? 'mine' : ''}"><small>${x.rank}</small><i style="background:hsl(${x.h},70%,55%)"></i>${esc(x.n)}${x.me ? ' (' + tr('you') + ')' : ''}<b>${LGI[x.lg]} ${x.r}</b></li>`).join('') : `<li>${tr('boardEmpty')}</li>`;
    if (b.me && b.me.rank > 20) $('bdList').innerHTML += `<li class="mine"><small>${b.me.rank}</small>${tr('you')}<b>${LGI[b.me.lg]} ${b.me.r}</b></li>`; }
  /* ---------------- missions, achievements, profile, armory, settings ---------------- */
  function missions() { G.show('missions'); const L = msToday().list; $('msList').innerHTML = L.map((x, i) => { const d = MISSIONS.find(m => m.id === x.id), pct = Math.min(1, x.p / d.n); return `<div class="ms ${x.done ? 'done' : ''}"><div><b>${esc(nm({ n: d.t }).replace('{0}', d.n))}</b><i><u style="width:${(pct * 100).toFixed(0)}%"></u></i><small>${Math.min(x.p, d.n)} / ${d.n} · 🪙 ${d.r}</small></div><button data-c="${i}" ${!x.done || x.claimed ? 'disabled' : ''}>${x.claimed ? tr('claimed') : tr('claim')}</button></div>`; }).join('');
    $('msList').querySelectorAll('[data-c]').forEach(b => b.onclick = () => { const x = L[+b.dataset.c], d = MISSIONS.find(m => m.id === x.id); if (!x.done || x.claimed) return; x.claimed = 1; P.coins += d.r; save(); G.SFX.coin(); missions(); });
    $('msAch').innerHTML = ACH.map(a => `<div class="ach ${P.ach[a.id] ? 'got' : ''}" title="${esc(nm({ n: a.t }))}"><i>${a.i}</i><small>${esc(nm({ n: a.t }))}</small></div>`).join(''); }
  function profile() { G.show('profile'); const S = P.stats; const rate = S.battles ? Math.round(S.wins / S.battles * 100) : 0;
    $('prHead').innerHTML = `<div class="pav" style="background:hsl(${G.HUE},70%,55%)">${esc((G.NAME || '؟').slice(0, 1))}</div><b>${esc(G.NAME || (AR() ? 'رامي' : 'Archer'))}</b><small>${tr('lv', P.lv)} · 🪙 ${P.coins}</small>`;
    const items = [['st_battles', S.battles], ['st_wins', S.wins], ['st_rate', rate + '%'], ['st_acc', (S.accN ? Math.round(S.accSum / S.accN) : 0) + '%'], ['st_dmg', S.dmg], ['st_gates', S.gates], ['st_stars', S.stars], ['st_best', S.best]];
    $('prStats').innerHTML = items.map(([k, v]) => `<div><b>${v}</b><span>${tr(k)}</span></div>`).join('');
    $('prAch').innerHTML = ACH.map(a => `<div class="ach ${P.ach[a.id] ? 'got' : ''}"><i>${a.i}</i><small>${esc(nm({ n: a.t }))}</small></div>`).join(''); }
  function armory() { G.show('armory'); $('arCoins').textContent = '🪙 ' + P.coins;
    const row = (list, slot) => list.map(o => { const own = P.cos.own[o.k], eq = P.cos[slot] === o.k, lock = P.lv < o.lv; return `<div class="cos ${eq ? 'eq' : ''}"><span class="sw" style="background:${COSC[o.k]}"></span><b>${esc(nm({ n: COSN[o.k] }))}</b><button data-k="${o.k}" data-s="${slot}" ${eq || (lock && !own) || (!own && P.coins < o.c) ? 'disabled' : ''}>${eq ? tr('equipped') : own ? tr('equip') : lock ? tr('needLv', o.lv) : tr('buy', o.c)}</button></div>`; }).join('');
    $('arSkins').innerHTML = row(SKINS, 'skin'); $('arTrails').innerHTML = row(TRAILS, 'trail');
    $('armory').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { const k = b.dataset.k, s = b.dataset.s, o = (s === 'skin' ? SKINS : TRAILS).find(x => x.k === k); if (!P.cos.own[k]) { if (P.coins < o.c || P.lv < o.lv) return; P.coins -= o.c; P.cos.own[k] = 1; G.SFX.coin(); } P.cos[s] = k; save(); armory(); });
    $('arHue').innerHTML = [0, 30, 50, 130, 175, 200, 260, 300, 340].map(h => `<button data-h="${h}" style="background:hsl(${h},75%,58%)" class="${G.HUE === h ? 'on' : ''}"></button>`).join(''); $('arHue').querySelectorAll('[data-h]').forEach(b => b.onclick = () => { G.setHue(+b.dataset.h); armory(); }); }
  function settings() { G.show('settings'); $('stSfx').value = P.set.sfx; $('stMusic').value = P.set.music; $('stVib').textContent = P.set.vib ? tr('on') : tr('off'); $('stFx').textContent = P.set.fx === 'low' ? tr('low') : tr('high'); $('stName').value = G.NAME; $('stLang').textContent = AR() ? 'English' : 'العربية'; }
  $('stSfx').oninput = e => { P.set.sfx = +e.target.value; applySet(); save(); }; $('stMusic').oninput = e => { P.set.music = +e.target.value; applySet(); save(); };
  $('stVib').onclick = () => { P.set.vib = P.set.vib ? 0 : 1; applySet(); save(); settings(); }; $('stFx').onclick = () => { P.set.fx = P.set.fx === 'low' ? 'high' : 'low'; save(); settings(); };
  $('stName').oninput = e => G.setName(e.target.value); $('stLang').onclick = () => { $('lang').click(); settings(); }; $('stTut').onclick = () => startPractice(true);
  /* ---------------- results: rewards, progress, next step ---------------- */
  function bumpMission(key, v) { if (!v) return []; const out = []; for (const x of msToday().list) { const d = MISSIONS.find(m => m.id === x.id); if (d.k !== key || x.done) continue; x.p += v; if (x.p >= d.n) { x.done = 1; out.push(nm({ n: d.t }).replace('{0}', d.n)); } } return out; }
  function grant(id, notes) { if (P.ach[id]) return; P.ach[id] = 1; const a = ACH.find(x => x.id === id); P.coins += a.r; notes.push(tr('newAch', nm({ n: a.t }))); }
  function result(o) {
    const S = o.stats || {}, won = !!o.won, notes = [], kind = o.kind || (o.mode === 'practice' ? 'practice' : 'quick');
    if (kind === 'practice' || kind === 'tutorial') return home();
    // statistics
    const st = P.stats; st.battles++; if (won) st.wins++; st.dmg += S.dmg || 0; st.gates += S.gates || 0; st.stars += S.stars || 0; st.best = Math.max(st.best, S.peak || 0); if (S.volleys) { st.accSum += S.acc || 0; st.accN++; } st.chains += S.chains || 0; st.dunes += S.dunes || 0; st.thuds += S.thuds || 0; if (won && kind === 'ranked') st.rankedWins++;
    // XP and dinars
    const mult = { ranked: 1.5, campaign: 1.25, survival: 1.2, daily: 1.4, friends: 1.1, quick: 1 }[kind] || 1; let xp = Math.round(((won ? 120 : 40) + Math.min(80, (S.dmg || 0) / 40) + (S.acc || 0) * .3) * mult), coins = Math.round((won ? 30 : 10) * mult);
    // mode-specific
    let title = won ? tr('resWin') : tr('resLose'), sub = o.foeName || '', mainT = tr('again'), mainF = () => startQuick(), extra = '';
    if (kind === 'campaign') { const i = o.botIdx, Bt = C.BOTS[i]; sub = nm(Bt); if (won) { const s = S.heart > .66 ? 3 : S.heart > .33 ? 2 : 1; P.camp[i] = Math.max(P.camp[i] || 0, s); if (i + 1 >= P.campUn && i + 1 < C.BOTS.length) P.campUn = i + 2; if (i === 9) grant('campaign', notes); extra = '★'.repeat(s) + '☆'.repeat(3 - s); xp += 40 * s; }
      const nxt = won && i + 1 < C.BOTS.length; mainT = nxt ? tr('next') + ' ' + ICON[i + 1] : tr('retry'); mainF = () => startCamp(nxt ? i + 1 : i); if (Object.values(P.camp).reduce((a, b) => a + b, 0) >= 30) grant('stars30', notes); }
    else if (kind === 'quick') { sub = '🤖 ' + nm(C.P[o.diff] || C.P.tactical); }
    else if (kind === 'survival') { const w = o.wave; if (won) { title = tr('resWave', w); P.survBest = Math.max(P.survBest, w); if (w >= 5) grant('wave5', notes); if (w >= 10) grant('wave10', notes); xp += 50 * w; coins += 10 * w; mainT = tr('nextWave'); mainF = () => startSurvival(w + 1, Math.min(1, S.heart + .25)); }
      else { title = tr('resWaveEnd', w); mainT = tr('retry'); mainF = () => startSurvival(1); } sub = tr('survS', P.survBest); }
    else if (kind === 'daily') { const dc = dcToday(); let pass = won; if (dc.id === 'boulders' || dc.id === 'fire' || dc.id === 'swarm' || dc.id === 'nodune') { /* enforced by rules */ } if (dc.id === 'sniper') pass = won && S.volleys <= 14;
      extra = pass ? tr('dcPassed') : tr('dcFailed'); if (pass && !P.daily[dc.date]) { P.daily[dc.date] = 1; const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10); P.streak = P.lastDaily === y ? P.streak + 1 : 1; P.lastDaily = dc.date; coins += 120; xp += 150; if (P.streak >= 7) grant('streak7', notes); } mainT = tr('retry'); mainF = startDaily; sub = nm({ n: dc.t }); }
    else if (kind === 'ranked') { mainT = tr('queueAgain'); mainF = () => { ranked(); rkFind(); }; if (o.delta) extra = tr('rkDelta', (o.delta.d > 0 ? '+' : '') + o.delta.d, LGI[o.delta.lg] + ' ' + leagueName(o.delta.lg) + ' ' + o.delta.r); if (won) grant('ranked', notes); }
    else if (kind === 'friends') { mainT = tr('rematch'); mainF = o.host ? o.rematch : null; }
    // achievements from the battle
    if (won) { grant('first', notes); if (S.minHp >= .999) grant('flawless', notes); if (S.minHp < .15) grant('comeback', notes); if (S.starHit && S.foeHeart <= 0) grant('finisher', notes); }
    if (S.chains >= 3) grant('chain3', notes); if (S.dmg >= 5000) grant('demolisher', notes); if (S.volleys >= 8 && S.acc >= 80) grant('sniper', notes); if (st.gates >= 50) grant('gates100', notes); if (st.dunes >= 20) grant('architect', notes);
    // missions
    for (const [k, v] of [['gates', S.gates], ['wins', won ? 1 : 0], ['dmg', S.dmg], ['chains', S.chains], ['stars', S.stars], ['thuds', S.thuds], ['dunes', S.dunes], ['battles', 1], ['falls', S.falls]]) for (const t of bumpMission(k, v)) notes.push(tr('msDone', t));
    // level
    P.xp += xp; P.coins += coins; let lvUp = 0; while (P.xp >= xpNeed(P.lv)) { P.xp -= xpNeed(P.lv); P.lv++; P.coins += 50; lvUp = P.lv; } if (lvUp) { notes.unshift(tr('lvUp', lvUp)); if (P.lv >= 10) grant('lv10', notes); }
    save();
    G.show('wres'); $('wrT').textContent = title; $('wrT').className = won ? 'win' : 'lose'; $('wrSub').textContent = sub; $('wrExtra').textContent = extra;
    $('wrPeak').textContent = S.peak || 0; $('wrAcc').textContent = (S.acc || 0) + '%'; $('wrDmg').textContent = S.dmg || 0; $('wrTime').textContent = Math.floor((S.secs || 0) / 60) + ':' + String((S.secs || 0) % 60).padStart(2, '0');
    $('wrXpT').textContent = tr('xp', xp) + ' · ' + tr('coins', coins); const need = xpNeed(P.lv); $('wrXp').style.width = '0%'; setTimeout(() => $('wrXp').style.width = Math.min(100, P.xp / need * 100).toFixed(0) + '%', 60); $('wrLv').textContent = tr('lv', P.lv);
    $('wrNotes').innerHTML = notes.map(n => `<li>${esc(n)}</li>`).join(''); if (notes.length) G.SFX.coin();
    $('wrMain').textContent = mainT; $('wrMain').classList.toggle('hide', !mainF); $('wrMain').onclick = () => { G.SFX.click(); mainF && mainF(); };
    $('wrWait').textContent = kind === 'friends' && !o.host ? tr('waitHost', '') : ''; $('wrBack').onclick = () => { if (window.SHW) SHW.leave(); home(); };
  }
  /* ---------------- wiring ---------------- */
  const on = (id, f) => { const e = $(id); if (e) e.onclick = () => { G.audio(); G.SFX.click(); f(); }; };
  on('hQuick', quick); on('qGo', startQuick); on('hCampaign', campaign); on('hSurvival', () => { G.show('survival'); }); on('svGo', () => startSurvival(1)); on('hDaily', daily); on('dcGo', startDaily);
  on('hPractice', () => G.show('practice')); on('prTut', () => startPractice(true)); on('prFree', () => startPractice(false)); on('hRanked', ranked); on('rkFind', rkFind); on('rkCancel', rkCancel); on('rkBoard', board);
  on('hFriends', () => SHW.startNet(null)); on('hTrials', () => { G.show('menu'); G.refreshMenu(); }); on('hMissions', missions); on('hArmory', armory); on('hProfile', profile); on('hBoard', board); on('hSettings', settings);
  document.querySelectorAll('[data-home]').forEach(b => b.onclick = () => { G.SFX.click(); rkCancel(); home(); });
  G.onLang = () => { if (document.getElementById('home').classList.contains('hide')) return; home(); };
  applySet(); G.applyLang();
  window.SHM_DEBUG = { P, home, result, startQuick, startCamp, startSurvival, startDaily, startPractice, ranked, rkFind, rkCancel, board, missions, profile, armory, settings, quick, campaign, daily, dcToday, msToday, save };
  // first visit: offer the tutorial; links: ?w= (friend war) is handled by war.js, ?r= by the trials
  const q = new URLSearchParams(location.search); if (!q.get('w') && !q.get('r')) { home(); if (!P.tut && !P.stats.battles) setTimeout(() => { if (!document.getElementById('home').classList.contains('hide')) $('hTutPop').classList.remove('hide'); }, 600); }
  on('tpYes', () => { $('hTutPop').classList.add('hide'); startPractice(true); }); on('tpNo', () => { $('hTutPop').classList.add('hide'); P.tut = 1; save(); });
})();
