/* SOULSTACK modes: Trials (12 unlockable levels with goals and timers), monsters, pickups and weapons, the Shrine (permanent upgrades),
   and Races with friends by link. Plugs into game.js through its hooks. */
(() => {
  'use strict';
  const G = window.SSG, L = window.SSL, C = G.C, S = G.S, $ = G.$, tr = G.tr, SFX = G.SFX, LS = G.LS;
  /* ---------------- strings ---------------- */
  Object.assign(G.TXT.en, {
    trials: 'Trials', race: 'Race friends', raceS: 'send a link · first to the top wins', shrine: 'Shrine', newHere: 'New here', go2: 'Climb', cleared: 'Trial cleared!',
    time: 'time', embers: 'embers', kills: 'monsters', nextLv: 'Next trial', retry: 'Retry', timeUp: "Time's up", failS: 'So close. Every attempt teaches the tower.',
    lobbyT: 'Race lobby', lobbyS: 'Send this link to your friends. Everyone climbs the same trial; first to the top wins.', invite: 'Invite', copy: 'Copy link', startRace: 'Start race',
    leave: 'Leave', again: 'Rematch', trSub: 'Trial {0} · ★ {1}/36', trHead: '★ {0}/36 · {1} embers', shSub: '{0} embers', locked: 'locked', lvl: 'Trial {0}',
    goalT: 'Reach {0} m in {1}', s1: '★ finish', s2: '★★ under {0}', s3: '★★★ under {0}', newBestLv: 'New best time!', firstClear: 'First clear: +20 embers. Trial {0} unlocked.',
    hostPicks: 'Waiting for {0} to start…', youHost: 'You are the host: pick a trial and start.', connecting: 'Connecting…', noroom: 'That race no longer exists', full: 'That race is full',
    youWin: 'You win! 🏆', place: 'You finished #{0}', dnf: 'did not finish', finWait: 'You finished #{0} — waiting for the others', finOther: '{0} finished #{1}', waitHost: 'Waiting for the host…',
    pkShard: '+1 ember', pkSpring: 'Spring boots: higher leaps', pkShield: 'Shield: survive one hit', pkBolts: '+4 soul bolts — press ⚡', pkDouble: 'Double leap: leap again in mid-air',
    shieldUsed: 'Shield broke!', noTarget: 'No monster in range', stomp: 'Crushed!', buy: 'Buy', maxed: 'MAX', copied2: 'Link copied — send it to your friends', inviteText: 'Race me up the SOULSTACK tower! Join my room {0}:', wonBy: '{0} reached the top first', you2: 'you', yourName: 'Your name',
  });
  Object.assign(G.TXT.ar, {
    trials: 'التحديات', race: 'سباق مع الأصحاب', raceS: 'أرسل رابطاً · أول من يصل للقمة يفوز', shrine: 'المعبد', newHere: 'الجديد هنا', go2: 'ابدأ التسلّق', cleared: 'اجتزت التحدي!',
    time: 'الوقت', embers: 'جمرات', kills: 'وحوش', nextLv: 'التحدي التالي', retry: 'أعد المحاولة', timeUp: 'انتهى الوقت', failS: 'كنتَ قريباً. كل محاولة تعلّمك البرج.',
    lobbyT: 'غرفة السباق', lobbyS: 'أرسل هذا الرابط لأصحابك. الكل يتسلّق نفس التحدي، وأول من يصل للقمة يفوز.', invite: 'ادعُ', copy: 'انسخ الرابط', startRace: 'ابدأ السباق',
    leave: 'غادر', again: 'جولة أخرى', trSub: 'التحدي {0} · ★ {1}/36', trHead: '★ {0}/36 · {1} جمرة', shSub: '{0} جمرة', locked: 'مقفل', lvl: 'التحدي {0}',
    goalT: 'اصل إلى {0} م خلال {1}', s1: '★ إنهاء', s2: '★★ أقل من {0}', s3: '★★★ أقل من {0}', newBestLv: 'أفضل وقت جديد!', firstClear: 'أول إنهاء: +20 جمرة. فُتح التحدي {0}.',
    hostPicks: 'بانتظار {0} ليبدأ…', youHost: 'أنت المضيف: اختر التحدي وابدأ.', connecting: 'جارٍ الاتصال…', noroom: 'هذا السباق لم يعد موجوداً', full: 'هذا السباق ممتلئ',
    youWin: 'فزت! 🏆', place: 'أنهيت في المركز {0}', dnf: 'لم يُنهِ', finWait: 'أنهيت في المركز {0} — بانتظار الباقين', finOther: '{0} أنهى في المركز {1}', waitHost: 'بانتظار المضيف…',
    pkShard: '+1 جمرة', pkSpring: 'حذاء نابض: قفزات أعلى', pkShield: 'درع: تنجو من ضربة', pkBolts: '+4 سهام روح — اضغط ⚡', pkDouble: 'قفزة مزدوجة: اقفز مجدداً من الهواء',
    shieldUsed: 'انكسر الدرع!', noTarget: 'لا وحش في المدى', stomp: 'سحقته!', buy: 'شراء', maxed: 'الحد الأقصى', copied2: 'نُسخ الرابط — أرسله لأصحابك', inviteText: 'سابقني إلى قمة برج SOULSTACK! ادخل غرفتي {0}:', wonBy: '{0} وصل للقمة أولاً', you2: 'أنت', yourName: 'اسمك',
  });
  const AR = () => G.LANG === 'ar', nm = lv => lv.n[AR() ? 1 : 0], intro = lv => lv.intro[AR() ? 1 : 0];
  const fmt = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const fmt2 = s => (s < 60 ? s.toFixed(1) + 's' : fmt(s));
  const ICON = ['🌅', '🌵', '🕳️', '🐛', '🪚', '👻', '⚔️', '🔥', '⛈️', '🌑', '🌌', '👑'];

  /* ---------------- progress (saved on this device) ---------------- */
  const PG = Object.assign({ un: 1, st: {}, bt: {}, em: 0, up: {}, wins: 0 }, LS.get('ss_prog', {})); PG.up = PG.up || {};
  const saveP = () => LS.set('ss_prog', PG); const starsTotal = () => Object.values(PG.st).reduce((a, b) => a + b, 0);

  /* ---------------- extra sound design ---------------- */
  const t = G.tone, nz = G.noise;
  Object.assign(SFX, {
    aim: st => t(300 + st * 140, .07, 'triangle', .035, 1.3),
    shard: () => { t(1318.5, .25, 'sine', .06); t(1975.5, .3, 'sine', .04, 1, .06); },
    power: () => { [392, 523.3, 659.3, 784, 1046.5].forEach((f, i) => t(f, .35, 'triangle', .05, 1, i * .05)); nz(.5, 600, 4000, .06); },
    stomp: () => { nz(.12, 900, 200, .3, 1); t(160, .14, 'square', .06, .5); t(660, .12, 'sine', .05, 1.6, .05); },
    wraith: () => { t(520, .9, 'sawtooth', .025, .55); t(530, .9, 'sawtooth', .02, .5); nz(.8, 1400, 500, .05, 4); },
    zap: () => { t(1400, .18, 'sawtooth', .05, .25); nz(.15, 4000, 1500, .08, 2); },
    boom: () => { nz(.35, 1200, 120, .3, .8); t(110, .3, 'sine', .1, .5); },
    shield: () => { t(880, .5, 'triangle', .07, .98); t(1320, .45, 'sine', .05, .98, .02); nz(.08, 3000, 3000, .1, 6); },
    dbl: () => { nz(.25, 1200, 5000, .16); t(660, .2, 'triangle', .05, 1.8); },
    beep: hi => t(hi ? 1046.5 : 523.3, hi ? .45 : .14, 'square', .05),
    win: () => { [523.3, 659.3, 784, 1046.5, 1318.5].forEach((f, i) => t(f, .6, 'triangle', .07, 1, i * .11)); [261.6, 329.6, 392].forEach(f => t(f, 1.6, 'sine', .04, 1, .5)); },
    fail: () => { [392, 349.2, 311.1, 261.6].forEach((f, i) => t(f, .5, 'triangle', .06, 1, i * .16)); },
    buy: () => { t(784, .15, 'triangle', .06); t(1046.5, .3, 'triangle', .06, 1, .08); },
    warn: () => t(1760, .06, 'square', .035),
    monKill: () => { t(90, .4, 'sawtooth', .07, .5); },
  });

  /* ---------------- a run: one trial or one race ---------------- */
  let R = null; const NET = { ws: null, code: null, me: null, room: null, ghosts: new Map(), last: 0, skew: 0, want: null };
  function startRun(lv, kind, room) {
    const LV = L.LEVELS[lv - 1]; G.audio();
    if (!S.practice) S.saved = { blocks: S.blocks, byRow: S.byRow, byId: S.byId };
    S.practice = true; S.tut = 0; S.world = L.world(LV); S.blocks = new Map(); S.byRow = new Map(); S.byId = new Map(); S.cp = S.world.cps[0];
    const E = L.entities(LV, S.world); E.wraiths.forEach(m => { m.hx = m.x; m.hy = m.y; m.life0 = m.life; });
    R = { LV, lv, kind, E, t0: 0, el: 0, done: 0, shield: PG.up.shield ? 1 : 0, bolts: (PG.up.bolts || 0) * 2, dbl: !!PG.up.double, spring: 0, emb: 0, kills: 0, inv: 0, warned: 0, cd: -1 };
    G.enterGame(); G.spawn(); S.mode = 'cd'; G.hint(null);
    const lead = kind === 'race' && room ? Math.max(500, room.at - room.now) : 2600; R.t0 = G.now() + lead;
    $('hMid').classList.remove('hide'); $('hGoal').classList.remove('hide'); $('emo').classList.toggle('hide', kind !== 'race');
    if (room) for (const b of room.bodies || []) netBody(b);
    G.updHud();
  }
  function endRun() { R = null; for (const id of ['hMid', 'hGoal', 'emo', 'bFire', 'cd']) $(id).classList.add('hide'); NET.ghosts.clear(); }
  function finish() {
    if (R.done) return; R.done = 1; const el = R.el; SFX.win(); G.buzz([20, 40, 60]);
    if (!G.RM()) for (let i = 0; i < 4; i++) G.burst(S.P.x, S.P.y + 1, 40, [45, 192, 330, 120][i], 9, 1.8, 5);
    if (R.kind === 'race') { netSend({ t: 'fin' }); G.toast(tr('finWait', '…')); return; }
    const st = L.stars(R.LV, el), first = !PG.st[R.lv], prevBest = PG.bt[R.lv];
    let emb = R.emb + st * 5 + (first ? 20 : 0); PG.em += emb; PG.st[R.lv] = Math.max(PG.st[R.lv] || 0, st); PG.bt[R.lv] = Math.min(prevBest || 1e9, el); if (R.lv >= PG.un && R.lv < 12) PG.un = R.lv + 1; saveP();
    setTimeout(() => {
      const lv = R ? R.lv : 1, kills = R ? R.kills : 0; S.mode = 'over'; $('hud').classList.add('hide'); endRun(); G.show('done'); $('lang').classList.remove('hide');
      $('dStars').innerHTML = [1, 2, 3].map(i => `<span class="${i <= st ? 'on' : ''}" style="animation-delay:${i * .25}s">★</span>`).join('');
      $('dTime').textContent = fmt2(el); $('dEmb').textContent = '+' + emb; $('dKills').textContent = kills;
      $('dNote').textContent = first && lv < 12 ? tr('firstClear', lv + 1) : prevBest && el < prevBest ? tr('newBestLv') : '';
      $('bNext').classList.toggle('hide', lv >= 12); $('bNext').onclick = () => showIntro(lv + 1); $('bRetry').onclick = () => startRun(lv, 'trial');
      for (const [i, on] of [1, 2, 3].map(i => [i, i <= st])) if (on) setTimeout(() => SFX.shard(), 250 * i + 200);
    }, 1400);
  }
  function timeUp() {
    if (R.done) return; R.done = 1; SFX.fail(); G.buzz(80);
    if (R.kind === 'race') return; // the server ends the race for everyone
    const h = Math.max(0, Math.floor(S.P.y - 1)), H = R.LV.H, lv = R.lv; setTimeout(() => { S.mode = 'over'; $('hud').classList.add('hide'); endRun(); G.show('fail'); $('lang').classList.remove('hide'); $('fH').textContent = h + ' ' + tr('m'); $('fGoal').textContent = H + ' ' + tr('m'); $('bRetry2').onclick = () => startRun(lv, 'trial'); }, 900);
  }

  /* ---------------- hooks into the game ---------------- */
  G.HK.spawn.push(P => { P.pow = R ? (1 + .05 * (PG.up.pow || 0)) * (R.spring ? 1.15 : 1) : 1; P.usedDbl = 0; });
  G.HK.land.push(P => { P.usedDbl = 0; });
  G.HK.airLeap.push((dx, dy) => { const P = S.P; if (!R || !R.dbl || P.usedDbl || S.mode !== 'play') return; P.usedDbl = 1; C.launch(P, dx, dy); SFX.dbl(); G.buzz(10); S.rings.push({ x: P.x, y: P.y, l: .45 }); G.burst(P.x, P.y, 16, 50, 3, .6, -1); return true; });
  G.HK.respawn.push(() => { if (!R) return; for (const m of R.E.wraiths) if (m.alive && m.on) { m.on = 0; m.x = m.hx; m.y = m.hy; m.life = m.life0; } R.inv = 1; });
  G.HK.die.push((cause, cell) => { if (R && R.kind === 'race') netSend({ t: 'die', x: cell.x, y: cell.y, c: cause }); });
  G.HK.menu.push(() => { if (R) endRun(); });
  G.HK.tick.push(dt => {
    if (!R) return; const tnow = G.now();
    if (S.mode === 'cd') { const left = (R.t0 - tnow) / 1000, n = Math.ceil(left); $('cd').classList.remove('hide');
      if (n !== R.cd) { R.cd = n; if (n > 0 && n <= 3) { $('cd').textContent = n; SFX.beep(0); } }
      if (left <= 0) { $('cd').textContent = tr('go2') + '!'; SFX.beep(1); G.buzz(30); S.mode = 'play'; setTimeout(() => $('cd').classList.add('hide'), 700); } return; }
    if (!R.done) { R.el = (tnow - R.t0) / 1000; const left = R.LV.T - R.el; if (left <= 10 && left > 0 && Math.ceil(left) !== R.warned) { R.warned = Math.ceil(left); SFX.warn(); } if (left <= 0) timeUp(); }
    R.inv = Math.max(0, R.inv - dt);
    if (R.kind === 'race' && NET.ws && NET.ws.readyState === 1 && tnow - NET.last > 100 && S.P) { NET.last = tnow; const P = S.P; NET.ws.send(JSON.stringify({ t: 'p', x: +P.x.toFixed(2), y: +P.y.toFixed(2), vx: +(P.vx || 0).toFixed(1), vy: +(P.vy || 0).toFixed(1), g: P.gr ? 1 : 0, s: S.mode === 'dead' ? 1 : 0 })); }
  });
  G.HK.step.push((dt, P) => {
    if (!R || R.done) return;
    const r = L.stepEntities(R.E, P, dt, R.el, R.inv <= 0);
    if (r.woke) SFX.wraith();
    for (const m of r.killed) { R.kills++; R.emb += 2; SFX.boom(); G.burst(m.x, (m.k === 'crawl' ? m.y + .3 : m.y), G.RM() ? 10 : 34, m.k === 'crawl' ? 10 : 280, 6, 1, 1); }
    if (r.stomp) { P.vy = 11; P.gr = 0; SFX.stomp(); G.buzz(15); G.toast(tr('stomp')); S.cam.shake = G.RM() ? 0 : .2; }
    for (const p of r.picked) {
      G.burst(p.x, p.y, G.RM() ? 8 : 22, 45, 4, .8, 1);
      if (p.k === 'shard') { R.emb++; SFX.shard(); G.floatText(p.x, p.y + .4, '+1', 45); continue; }
      SFX.power(); G.buzz(20);
      if (p.k === 'spring') { R.spring = 1; P.pow = (1 + .05 * (PG.up.pow || 0)) * 1.15; G.toast('🦘', tr('pkSpring')); }
      else if (p.k === 'shield') { R.shield = 1; G.toast('🛡', tr('pkShield')); }
      else if (p.k === 'bolts') { R.bolts += 4; G.toast('⚡', tr('pkBolts')); }
      else if (p.k === 'double') { R.dbl = true; G.toast('✦', tr('pkDouble')); }
    }
    if (r.hit && S.mode === 'play') {
      if (R.shield) { R.shield = 0; R.inv = 1.2; P.vy = 9; P.gr = 0; P.vx = -(P.vx || 0) * .5; SFX.shield(); G.toast('🛡', tr('shieldUsed')); G.burst(P.x, P.y + .5, 30, 200, 6, .8, 1); }
      else G.die('mon', C.sacCell(P));
    }
    if (S.mode === 'play' && P.y - 1 >= R.LV.H) finish();
  });
  G.HK.hud.push(() => {
    if (!R) return; const P = S.P, left = R.LV.T - R.el;
    $('hT').textContent = fmt(S.mode === 'cd' ? R.LV.T : left); $('hT').classList.toggle('warn', left <= 10 && !R.done && S.mode !== 'cd');
    $('hB').textContent = tr('lvl', R.lv) + ' · ' + nm(R.LV); $('hSn').textContent = '∞';
    const f = Math.max(0, Math.min(1, (P.y - 1) / R.LV.H)); $('hGf').style.height = (f * 100).toFixed(1) + '%'; $('hGl').textContent = R.LV.H + ' ' + tr('m');
    $('hGr').innerHTML = [...NET.ghosts.values()].map(g => `<span style="bottom:${(Math.max(0, Math.min(1, (g.y - 1) / R.LV.H)) * 100).toFixed(1)}%;background:hsl(${g.h},85%,62%)"></span>`).join('');
    $('hPow').innerHTML = (R.shield ? '<span>🛡</span>' : '') + (R.spring ? '<span>🦘</span>' : '') + (R.dbl ? '<span>✦</span>' : '');
    $('bFire').classList.toggle('hide', !R.bolts); $('hBolts').textContent = R.bolts;
  });
  /* ---------------- drawing monsters, pickups, bolts, the goal and your friends ---------------- */
  G.HK.drawWorld.push((c, v, sx, sy, y0, y1, opt) => {
    if (!R || opt.card) return; const t = v.t, T = G.now() / 1000;
    // the goal line
    const gy = sy(R.LV.H + 1); if (gy > -t && gy < v.H + t) { c.fillStyle = 'rgba(255,207,107,.16)'; c.fillRect(sx(1), gy - t * 1.2, 12 * t, t * 1.2); c.strokeStyle = '#ffcf6b'; c.lineWidth = Math.max(2, t * .08); c.beginPath(); c.moveTo(sx(1), gy); c.lineTo(sx(13), gy); c.stroke(); c.fillStyle = '#ffcf6b'; c.font = `900 ${t * .42}px system-ui`; c.textAlign = 'center'; c.fillText('✦ ' + R.LV.H + ' ' + tr('m') + ' ✦', sx(7), gy - t * .35); }
    // pickups (gold = something to grab)
    for (const p of R.E.picks) { if (p.got || p.y < y0 - 1 || p.y > y1 + 1) continue; const X = sx(p.x), Y = sy(p.y + Math.sin(T * 3 + p.x) * .12), r = t * (p.k === 'shard' ? .2 : .36);
      const gl = c.createRadialGradient(X, Y, 0, X, Y, r * 3); gl.addColorStop(0, 'rgba(255,215,120,.55)'); gl.addColorStop(1, 'rgba(255,215,120,0)'); c.fillStyle = gl; c.fillRect(X - r * 3, Y - r * 3, r * 6, r * 6);
      if (p.k === 'shard') { c.fillStyle = '#ffd67a'; c.beginPath(); c.moveTo(X, Y - r * 1.4); c.lineTo(X + r, Y); c.lineTo(X, Y + r * 1.4); c.lineTo(X - r, Y); c.fill(); c.fillStyle = '#fff6d6'; c.beginPath(); c.moveTo(X, Y - r * 1.4); c.lineTo(X + r * .4, Y - r * .2); c.lineTo(X - r * .2, Y); c.fill(); }
      else { c.fillStyle = '#2a1d10'; c.beginPath(); c.arc(X, Y, r * 1.15, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#ffd67a'; c.lineWidth = t * .07; c.stroke(); c.font = `${r * 1.25}px system-ui`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText({ spring: '🦘', shield: '🛡', bolts: '⚡', double: '✦' }[p.k], X, Y + r * .05); c.textBaseline = 'alphabetic'; } }
    // crawlers: dark spiky slugs with red eyes
    for (const m of R.E.crawlers) { if (!m.alive || m.x == null || m.y < y0 - 1 || m.y > y1 + 1) continue; const X = sx(m.x), Y = sy(m.y), w = t * .78, h = t * .46, sq = 1 + Math.sin(T * 10 + m.ph * 9) * .06, dir = Math.cos((T * m.sp / Math.max(.5, m.x1 - m.x0) + m.ph) * Math.PI) >= 0 ? 1 : -1;
      c.fillStyle = '#1b1022'; c.beginPath(); c.ellipse(X, Y - h * .5 * sq, w / 2 * (2 - sq), h * .5 * sq, 0, Math.PI, 0); c.lineTo(X + w / 2, Y); c.lineTo(X - w / 2, Y); c.fill();
      c.fillStyle = '#3d2348'; for (let k = 0; k < 4; k++) { const bx = X - w * .3 + k * w * .2; c.beginPath(); c.moveTo(bx - t * .06, Y - h * .8 * sq); c.lineTo(bx, Y - h * 1.25 * sq); c.lineTo(bx + t * .06, Y - h * .8 * sq); c.fill(); }
      c.fillStyle = '#ff3b55'; c.shadowColor = '#ff3b55'; c.shadowBlur = t * .3; for (const e of [-.08, .1]) { c.beginPath(); c.arc(X + dir * w * .25 + e * t, Y - h * .55, t * .055, 0, Math.PI * 2); c.fill(); } c.shadowBlur = 0; }
    // wraiths: tattered ghosts
    for (const m of R.E.wraiths) { if (!m.alive || m.y < y0 - 2 || m.y > y1 + 2) continue; const X = sx(m.x), Y = sy(m.y), r = t * .45, a = m.on ? .92 : .45;
      const gl = c.createRadialGradient(X, Y, 0, X, Y, r * 2.4); gl.addColorStop(0, `rgba(170,120,255,${a * .45})`); gl.addColorStop(1, 'rgba(170,120,255,0)'); c.fillStyle = gl; c.fillRect(X - r * 2.4, Y - r * 2.4, r * 4.8, r * 4.8);
      c.fillStyle = `rgba(222,214,255,${a})`; c.beginPath(); c.arc(X, Y - r * .2, r * .8, Math.PI, 0); for (let k = 0; k <= 5; k++) { const xx = X + r * .8 - k * r * .32, yy = Y + r * (.7 + (k % 2 ? .25 : 0) + Math.sin(T * 8 + k + m.ph) * .12); c.lineTo(xx, yy); } c.fill();
      c.fillStyle = '#1a0f2e'; for (const e of [-1, 1]) { c.beginPath(); c.ellipse(X + e * r * .3, Y - r * .25, r * .14, r * (m.on ? .24 : .1), 0, 0, Math.PI * 2); c.fill(); } }
    // bolts
    for (const b of R.E.bolts) { const X = sx(b.x), Y = sy(b.y); c.fillStyle = '#fff3b0'; c.shadowColor = '#ffd06a'; c.shadowBlur = t * .5; c.beginPath(); c.arc(X, Y, t * .14, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0; }
    // friends in the race (interpolated 120 ms in the past so their motion is smooth)
    const at = G.now() - 120;
    for (const g of NET.ghosts.values()) { const s = ghostAt(g, at); if (!s) continue; g.y = s.y; const X = sx(s.x), Y = sy(s.y), w = t * .62, h = t * .86;
      c.globalAlpha = s.s ? .25 : .62; c.fillStyle = `hsl(${g.h},80%,62%)`; c.beginPath(); c.moveTo(X, Y - h); c.quadraticCurveTo(X + w * .66, Y - h * .58, X + w * .5, Y); c.lineTo(X - w * .5, Y); c.quadraticCurveTo(X - w * .66, Y - h * .58, X, Y - h); c.fill();
      c.fillStyle = '#fff'; for (const e of [-1, 1]) { c.beginPath(); c.arc(X + e * w * .13, Y - h * .53, t * .05, 0, Math.PI * 2); c.fill(); } c.globalAlpha = 1;
      c.font = `800 ${t * .3}px system-ui`; c.textAlign = 'center'; c.fillStyle = `hsl(${g.h},90%,82%)`; c.fillText(g.n, X, Y - h - t * .18); }
  });
  G.HK.drawTop.push((c, v, sx, sy, opt) => { // darkness: your spirit is the only lamp
    if (!R || !R.LV.dark || opt.card || !S.P) return; const P = S.P, X = sx(P.x), Y = sy(P.y + .45), rr = v.t * 4.6;
    const g = c.createRadialGradient(X, Y, rr * .35, X, Y, rr); g.addColorStop(0, 'rgba(3,2,10,0)'); g.addColorStop(1, 'rgba(3,2,10,.94)'); c.fillStyle = g; c.fillRect(0, 0, v.W, v.H);
  });

  /* ---------------- fire ---------------- */
  function fireBolt() { if (!R || !R.bolts || S.mode !== 'play') return; const tg = L.fire(R.E, S.P); if (!tg) { G.toast(tr('noTarget')); return; } R.bolts--; SFX.zap(); G.buzz(12); G.updHud(); }
  $('bFire').addEventListener('click', fireBolt);
  addEventListener('keydown', e => { if ((e.key === 'f' || e.key === 'F') && R) fireBolt(); });

  /* ---------------- screens: trials map, level intro, shrine ---------------- */
  function showTrials() {
    G.show('trials'); $('trHead').textContent = tr('trHead', starsTotal(), PG.em);
    $('tgrid').innerHTML = L.LEVELS.map(lv => { const lock = lv.id > PG.un, st = PG.st[lv.id] || 0, bt = PG.bt[lv.id];
      return `<button class="tcard ${lock ? 'lock' : ''} ${lv.id === PG.un && !st ? 'next' : ''}" data-lv="${lv.id}" ${lock ? 'disabled' : ''}><i>${lock ? '🔒' : ICON[lv.id - 1]}</i><b>${lv.id}</b><em>${'★'.repeat(st)}${'☆'.repeat(3 - st)}</em><span>${lock ? tr('locked') : G.esc(nm(lv))}${bt ? ' · ' + fmt2(bt) : ''}</span></button>`; }).join('');
    $('tgrid').querySelectorAll('[data-lv]').forEach(b => b.onclick = () => showIntro(+b.dataset.lv));
  }
  function showIntro(n) {
    const lv = L.LEVELS[n - 1]; if (!lv || n > PG.un) return showTrials(); G.show('intro');
    $('iNum').textContent = n; $('iName').textContent = nm(lv); $('iGoal').textContent = tr('goalT', lv.H, fmt(lv.T)); $('iText').textContent = intro(lv); $('iIcon').textContent = ICON[n - 1];
    $('iStars').innerHTML = `<span>${tr('s1')}</span><span>${tr('s2', fmt(lv.T * .72))}</span><span>${tr('s3', fmt(lv.T * .5))}</span>`;
    $('bGo').onclick = () => startRun(n, 'trial');
  }
  function showShrine() {
    G.show('shrine'); $('shEmb').textContent = '🔥 ' + PG.em + ' ' + tr('embers');
    $('shList').innerHTML = L.SHRINE.map(u => { const lvl = PG.up[u.k] || 0, max = lvl >= u.max, cost = u.cost[lvl];
      return `<div class="up"><div><b>${G.esc(u.n[AR() ? 1 : 0])} ${'●'.repeat(lvl)}${'○'.repeat(u.max - lvl)}</b><span>${G.esc(u.d[AR() ? 1 : 0])}</span></div><button data-up="${u.k}" ${max || PG.em < cost ? 'disabled' : ''}>${max ? tr('maxed') : tr('buy') + ' · ' + cost}</button></div>`; }).join('');
    $('shList').querySelectorAll('[data-up]').forEach(b => b.onclick = () => { const u = L.SHRINE.find(x => x.k === b.dataset.up), lvl = PG.up[u.k] || 0, cost = u.cost[lvl]; if (lvl >= u.max || PG.em < cost) return; PG.em -= cost; PG.up[u.k] = lvl + 1; saveP(); SFX.buy(); showShrine(); });
  }
  $('bTrials').onclick = () => { G.audio(); showTrials(); }; $('bTrialsX').onclick = () => G.show('menu'); $('bIntroX').onclick = showTrials;
  $('bDoneX').onclick = showTrials; $('bFailX').onclick = showTrials; $('bShrine').onclick = showShrine; $('bShrineX').onclick = () => { G.show('menu'); refresh(); };
  function refresh() { $('trSub').textContent = tr('trSub', PG.un, starsTotal()); $('shSub').textContent = tr('shSub', PG.em); }
  G.HK.menu.push(refresh); const _apply = $('lang').onclick; $('lang').addEventListener('click', () => setTimeout(refresh, 0)); refresh();

  /* ---------------- races with friends ---------------- */
  const link = code => location.origin + location.pathname.replace(/[^/]*$/, '') + '?r=' + code;
  function netSend(m) { if (NET.ws && NET.ws.readyState === 1) NET.ws.send(JSON.stringify(m)); }
  function netBody(b) { if (b.o === NET.me) return; const k = C.bkey(b.x, b.y); if (S.blocks.has(k)) return; G.addBlock({ i: 'R' + b.i + b.o, x: b.x, y: b.y, n: b.n, h: b.h, s: 0, c: b.c, o: b.o, born: G.now() }, true); }
  function ghostAt(g, at) { const q = g.buf; if (!q.length) return null; if (at <= q[0].t) return q[0]; for (let i = q.length - 1; i >= 0; i--) if (q[i].t <= at) { const a = q[i], b = q[i + 1]; if (!b) return a; const u = (at - a.t) / Math.max(1, b.t - a.t); return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, s: b.s }; } return q[0]; }
  function connect(code) {
    if (NET.ws) try { NET.ws.close(); } catch (e) { } G.audio();
    G.show('lobby'); $('lbCode').textContent = code || '·····'; $('lbWait').textContent = tr('connecting'); $('lbPlayers').innerHTML = '';
    const u = location.origin.replace(/^http/, 'ws') + '/ss/ws?t=' + G.TOK + '&n=' + encodeURIComponent(G.NAME) + '&h=' + G.HUE + '&lv=' + PG.un + (code ? '&r=' + code : '');
    const ws = new WebSocket(u); NET.ws = ws; NET.code = code || null;
    ws.onmessage = e => { let m; try { m = JSON.parse(e.data); } catch (x) { return; } onNet(m); };
    ws.onclose = () => { if (NET.ws === ws) { NET.ws = null; } };
  }
  function leaveRace() { const ws = NET.ws; NET.ws = null; NET.room = null; NET.code = null; if (ws) try { ws.close(); } catch (e) { } history.replaceState(null, '', location.pathname); if (R) endRun(); G.toMenu(); }
  function onNet(m) {
    if (m.t === 'hello') { NET.me = m.me; NET.code = m.code; history.replaceState(null, '', '?r=' + m.code); $('lbCode').textContent = m.code; return; }
    if (m.t === 'err') { if (m.e === 'noroom' || m.e === 'full') { G.toast(tr(m.e)); leaveRace(); } return; }
    if (m.t === 'room') { const prev = NET.room; NET.room = m; NET.skew = m.now - Date.now();
      if (m.state === 'race' && (!R || R.kind !== 'race' || (prev && prev.at !== m.at))) { startRun(m.lv, 'race', m); return; }
      if (m.state === 'lobby' && (!prev || prev.state !== 'lobby' || !R)) { if (R) { S.mode = 'over'; $('hud').classList.add('hide'); endRun(); if (S.practice) G.leavePractice(); } }
      if (m.state === 'lobby') renderLobby(); else if (m.state === 'done' && !R) renderResults(NET.res); return; }
    if (m.t === 'p') { let g = NET.ghosts.get(m.id); const pl = NET.room && NET.room.players.find(p => p.id === m.id); if (!g) NET.ghosts.set(m.id, g = { buf: [], n: pl ? pl.n : '?', h: pl ? pl.h : 200, y: m.y }); g.buf.push({ t: G.now(), x: m.x, y: m.y, s: m.s }); if (g.buf.length > 30) g.buf.shift(); return; }
    if (m.t === 'body') { if (R && R.kind === 'race') netBody(m.b); return; }
    if (m.t === 'emo') { const pl = NET.room && NET.room.players.find(p => p.id === m.id), d = document.createElement('div'); d.innerHTML = m.e + '<small>' + G.esc(pl ? pl.n : '') + '</small>'; d.style.left = (15 + Math.random() * 70) + '%'; $('emof').appendChild(d); setTimeout(() => d.remove(), 2500); return; }
    if (m.t === 'fin') { if (m.id === NET.me) G.toast(tr('finWait', m.place)); else { G.toast(tr('finOther', m.n, m.place)); SFX.chime(); } return; }
    if (m.t === 'res') { NET.res = m.res; setTimeout(() => { if (R) { S.mode = 'over'; $('hud').classList.add('hide'); endRun(); if (S.practice) G.leavePractice(); } renderResults(m.res); }, R && R.done ? 900 : 200); }
  }
  function renderLobby() {
    const r = NET.room; if (!r) return; G.show('lobby'); $('lang').classList.remove('hide'); const host = r.host === NET.me, hn = (r.players.find(p => p.id === r.host) || {}).n || '';
    $('lbCode').textContent = r.code; $('lbPlayers').innerHTML = r.players.map(p => `<li class="${p.id === NET.me ? 'me' : ''}"><i style="background:hsl(${p.h},80%,62%)"></i>${G.esc(p.n)}${p.id === NET.me ? ' (' + tr('you2') + ')' : ''}${p.id === r.host ? ' <span class="crown">👑</span>' : ''}<b>${p.on ? '●' : '○'}</b></li>`).join('');
    const lv = L.LEVELS[r.lv - 1]; $('lbLevel').innerHTML = `${ICON[r.lv - 1]} ${tr('lvl', r.lv)} · ${G.esc(nm(lv))}<small>${tr('goalT', lv.H, fmt(lv.T))}</small>`;
    $('lvPrev').disabled = $('lvNext').disabled = !host; $('bStart').classList.toggle('hide', !host); $('lbWait').textContent = host ? tr('youHost') : tr('hostPicks', hn);
  }
  function renderResults(res) {
    if (!res) return; G.show('rres'); $('lang').classList.remove('hide'); const mine = res.find(x => x.id === NET.me), host = NET.room && NET.room.host === NET.me;
    $('rrT').textContent = mine && mine.place === 1 && mine.time ? tr('youWin') : mine && mine.time ? tr('place', mine.place) : (res.find(x => x.place === 1 && x.time) ? tr('wonBy', res.find(x => x.place === 1 && x.time).n) : tr('timeUp'));
    if (mine && mine.place === 1 && mine.time) { PG.wins++; PG.em += 15; saveP(); }
    $('rrList').innerHTML = res.map(x => `<li class="${x.id === NET.me ? 'me' : ''}"><small>${x.place}</small><i style="background:hsl(${x.h},80%,62%)"></i>${G.esc(x.n)}<b>${x.time ? fmt2(x.time) : x.y + ' ' + tr('m') + ' · ' + tr('dnf')}</b></li>`).join('');
    $('bAgain').classList.toggle('hide', !host); $('rrWait').textContent = host ? '' : tr('waitHost');
  }
  $('bRace').onclick = () => connect(null);
  $('lvPrev').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv > 1 ? r.lv - 1 : 12 }); };
  $('lvNext').onclick = () => { const r = NET.room; if (r) netSend({ t: 'lv', lv: r.lv < 12 ? r.lv + 1 : 1 }); };
  $('bStart').onclick = () => netSend({ t: 'go' }); $('bAgain').onclick = () => netSend({ t: 'again' });
  $('bLeave').onclick = leaveRace; $('bRLeave').onclick = leaveRace;
  const inviteText = () => tr('inviteText', NET.code || '');
  $('bShareRoom').onclick = async () => { const url = link(NET.code); try { if (navigator.share) { await navigator.share({ title: 'SOULSTACK', text: inviteText(), url }); return; } } catch (e) { return; } try { await navigator.clipboard.writeText(inviteText() + ' ' + url); G.toast(tr('copied2')); } catch (e) { } };
  $('bWa').onclick = () => window.open('https://wa.me/?text=' + encodeURIComponent(inviteText() + ' ' + link(NET.code)), '_blank');
  $('bCopy').onclick = async () => { try { await navigator.clipboard.writeText(link(NET.code)); G.toast(tr('copied2')); } catch (e) { prompt(tr('copy'), link(NET.code)); } };
  document.querySelectorAll('#emo button').forEach(b => b.onclick = () => { netSend({ t: 'emo', e: b.textContent }); });
  // the leave button in the HUD menu during a race leaves the room
  $('bMenu').addEventListener('click', () => { if (NET.ws) leaveRace(); }, true);

  /* opened from a friend's link: straight into the lobby */
  const qr = new URLSearchParams(location.search).get('r'); if (qr) setTimeout(() => connect(qr.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5)), 50);

  G.applyLang();
  Object.assign(window.SS_DEBUG, { PG, run: () => R, NET, startRun, showTrials, showIntro, showShrine, connect, leaveRace, fireBolt });
})();
