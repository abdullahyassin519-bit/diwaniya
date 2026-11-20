/* SOULSTACK trials: 12 levels that unlock in order. Each level introduces one thing safely, then develops, twists and combines it
   (level-design: introduce → develop → twist → combine). Shared by the game, the race server and the tests (UMD). */
(function (root, f) { if (typeof module === 'object' && module.exports) module.exports = f(require('./core.js')); else root.SSL = f(root.SSC); })(this, function (C) {
  'use strict';
  /* H: goal height (m). T: time limit (s). w: tower tuning. crawl: chance a platform carries a crawler. wraith: metres between wraiths (0 = none).
     fast: monster speed. dark: limited light. power: power-ups placed along the way (risk/reward: often on side ledges). */
  const LEVELS = [
    { id: 1, n: ['First Light', 'أول ضوء'], H: 20, T: 45, w: { chasm: 0, spike: .25, saw: 0, pad: 0 }, crawl: 0, wraith: 0, power: [],
      intro: ['Leap from ledge to ledge. Reach the golden line before time runs out.', 'اقفز من حافة لحافة. اصل للخط الذهبي قبل انتهاء الوقت.'] },
    { id: 2, n: ['Thorns', 'الأشواك'], H: 28, T: 50, w: { d0: .1, chasm: 0, spike: 1.7, saw: 0, pad: 0 }, crawl: 0, wraith: 0, power: [],
      intro: ['Spikes kill when you land on them. Read the ledge before you leap.', 'الأشواك تقتلك إن هبطت عليها. اقرأ الحافة قبل أن تقفز.'] },
    { id: 3, n: ['The Gap', 'الفجوة'], H: 34, T: 65, w: { d0: .1, chasm: 2.6, chasmFrom: 6, spike: .7, saw: 0, pad: 0, cpEvery: 12 }, crawl: 0, wraith: 0, power: [],
      intro: ['Some gaps are too high. Leap, press ☠ at the top, then climb onto yourself.', 'بعض الفجوات عالية جداً. اقفز، اضغط ☠ في القمة، ثم اصعد فوق نفسك.'] },
    { id: 4, n: ['Crawlers', 'الزواحف'], H: 40, T: 65, w: { d0: .15, chasm: .7, spike: .8, saw: 0, pad: 0, cpEvery: 15 }, crawl: .32, wraith: 0, power: ['spring'],
      intro: ['Crawlers patrol the ledges. Touch one and you die — land on top to crush it.', 'الزواحف تتجوّل على الحواف. لمسها يقتلك — اهبط فوقها لتسحقها.'] },
    { id: 5, n: ['Blades', 'الشفرات'], H: 46, T: 90, w: { d0: .2, chasm: .7, spike: .8, saw: 2.2, sawFrom: 5, pad: 0, cpEvery: 15 }, crawl: .14, wraith: 0, power: ['shield'],
      intro: ['Saws sweep the air on a clock. Wait for the gap, then go.', 'المناشير تمسح الهواء بإيقاع ثابت. انتظر الفرجة ثم انطلق.'] },
    { id: 6, n: ['Wraiths', 'الأشباح'], H: 52, T: 95, w: { d0: .25, chasm: .7, spike: .9, saw: .6, sawFrom: 5, cpEvery: 15 }, crawl: .1, wraith: 13, power: ['bolts', 'bolts'],
      intro: ['Wraiths hunt you through the air. Grab soul bolts and press ⚡ to strike them.', 'الأشباح تطاردك في الهواء. التقط سهام الروح واضغط ⚡ لتصيبها.'] },
    { id: 7, n: ['The Hunt', 'المطاردة'], H: 60, T: 95, w: { d0: .3, chasm: 1, spike: 1, saw: 1, sawFrom: 5, cpEvery: 15 }, crawl: .2, wraith: 10, power: ['double', 'bolts'],
      intro: ['Double leap: once per jump you can leap again in mid-air.', 'القفزة المزدوجة: مرة في كل قفزة تستطيع القفز من الهواء.'] },
    { id: 8, n: ['Gauntlet', 'الممر القاتل'], H: 70, T: 130, w: { d0: .4, chasm: 1.2, spike: 1.1, saw: 1.2, sawFrom: 5, pad: 3, cpEvery: 18 }, crawl: .24, wraith: 9, power: ['shield', 'bolts', 'spring'],
      intro: ['Everything at once. Spike pads must be covered by a body first.', 'كل شيء معاً. منصّات الأشواك يجب أن يغطيها جسد أولاً.'] },
    { id: 9, n: ['Storm', 'العاصفة'], H: 80, T: 160, w: { d0: .5, chasm: 1.2, spike: 1.1, saw: 1.7, sawFrom: 5, pad: 2, cpEvery: 18 }, crawl: .26, wraith: 8, fast: 1.25, power: ['bolts', 'double', 'shield'],
      intro: ['Faster blades, faster wraiths.', 'شفرات أسرع، أشباح أسرع.'] },
    { id: 10, n: ['Night Climb', 'تسلّق الليل'], H: 90, T: 175, dark: 1, w: { d0: .5, chasm: 1.1, spike: 1.1, saw: 1.2, sawFrom: 5, pad: 2, cpEvery: 18 }, crawl: .24, wraith: 9, power: ['bolts', 'spring', 'shield'],
      intro: ['The light is gone. Your spirit is the only lamp.', 'انطفأ النور. روحك هي المصباح الوحيد.'] },
    { id: 11, n: ['The Long Dark', 'الظلام الطويل'], H: 105, T: 195, dark: 1, w: { d0: .6, chasm: 1.3, spike: 1.2, saw: 1.6, sawFrom: 5, pad: 3, cpEvery: 20 }, crawl: .28, wraith: 7, fast: 1.3, power: ['bolts', 'double', 'shield', 'bolts'],
      intro: ['Darkness and every danger you know.', 'ظلام وكل خطر تعرفه.'] },
    { id: 12, n: ['Summit of Souls', 'قمّة الأرواح'], H: 125, T: 275, w: { d0: .75, chasm: 1.4, spike: 1.3, saw: 1.9, sawFrom: 5, pad: 3, cpEvery: 20 }, crawl: .32, wraith: 6, fast: 1.45, power: ['shield', 'bolts', 'double', 'bolts', 'spring'],
      intro: ['The final climb. The tower fights back.', 'التسلّق الأخير. البرج يقاوم.'] },
  ];
  LEVELS.forEach(L => { L.seed = C.hashStr('soulstack-trial-' + L.id); L.w = Object.assign({ cpEvery: 15 }, L.w); L.fast = L.fast || 1; });
  const stars = (L, t) => t <= L.T * .5 ? 3 : t <= L.T * .72 ? 2 : 1;
  const world = L => C.World(L.seed, L.w);

  /* ---------- entities: monsters and pickups, deterministic per level so every racer meets the same ones ---------- */
  function entities(L, w) {
    w = w || world(L); w.ensure(L.H + 20); const R = C.rng(L.seed ^ 0x5eed), crawlers = [], wraiths = [], picks = [];
    const chain = w.nodes.filter(n => n.chain && n.y > 0 && n.y <= L.H + 2);
    for (const n of chain) {
      const wd = n.x1 - n.x0 + 1;
      if (L.crawl && !n.cp && wd >= 3 && n.y > 3 && R() < L.crawl) crawlers.push({ k: 'crawl', x0: n.x0 + .45, x1: n.x1 + .55, y: n.y + 1, sp: (1 + R() * .8) * L.fast, ph: R(), alive: 1 });
      else R();
      if (R() < .4) picks.push({ k: 'shard', x: n.x0 + .5 + Math.floor(R() * wd), y: n.y + 1.7, got: 0 }); else R();
    }
    if (L.wraith) for (let y = 12; y < L.H; y += L.wraith) wraiths.push({ k: 'wraith', x: 2 + R() * 10, y: y + R() * 3, hx: 0, hy: 0, on: 0, alive: 1, sp: 1.7 * L.fast, ph: R() * 6, life: 14 });
    // power-ups spread over the climb; preferring side ledges (optional risk) over the main path
    L.power.forEach((k, i) => {
      const target = L.H * (i + 1) / (L.power.length + 1); let best = null;
      for (let y = Math.floor(target) - 3; y <= Math.floor(target) + 3 && !best; y++) for (const s of w.segs(y)) if (!s.chain && !s.cp) { best = s; break; }
      if (!best) best = chain.reduce((a, n) => (Math.abs(n.y - target) < Math.abs(a.y - target) ? n : a), chain[0]);
      picks.push({ k, x: (best.x0 + best.x1 + 1) / 2, y: best.y + 1.6, got: 0 });
    });
    return { crawlers, wraiths, picks, bolts: [] };
  }
  const crawlX = (m, t) => { const span = m.x1 - m.x0, u = ((t * m.sp / Math.max(.5, span)) + m.ph) % 2; return m.x0 + span * (u < 1 ? u : 2 - u); };
  /* advance monsters; return what touched the player. P: player (feet at y, width C.PW, height C.PH) */
  function stepEntities(E, P, dt, t, alive) {
    const out = { hit: null, stomp: null, picked: [], killed: [] }, cx = P.x, cy = P.y + C.PH / 2;
    for (const m of E.crawlers) {
      if (!m.alive) continue; m.x = crawlX(m, t);
      if (!alive) continue;
      const dx = Math.abs(m.x - cx), top = m.y + .5;
      if (dx < .62 && P.y < top + .05 && P.y + C.PH > m.y) {
        if (Math.min(P.vy, P.pvy == null ? 0 : P.pvy) < -1 && Math.max(P.y, P.py == null ? P.y : P.py) > m.y + .05) { m.alive = 0; out.stomp = m; out.killed.push(m); } else out.hit = out.hit || m;
      }
    }
    for (const m of E.wraiths) {
      if (!m.alive) continue;
      if (!m.on && Math.abs(m.y - cy) < 6.5) { m.on = 1; out.woke = m; }
      if (m.on) {
        m.life -= dt; if (m.life <= 0) { m.alive = 0; out.faded = m; continue; }
        const dx = cx - m.x, dy = cy - m.y, d = Math.hypot(dx, dy) || 1, wob = Math.sin(t * 3 + m.ph) * .9;
        m.x += (dx / d * m.sp + (-dy / d) * wob) * dt; m.y += (dy / d * m.sp + (dx / d) * wob) * dt;
        m.x = Math.max(1.4, Math.min(12.6, m.x));
        if (alive && d < .62) out.hit = out.hit || m;
      }
    }
    for (const b of E.bolts) {
      const tg = b.tg; if (!tg.alive) { b.dead = 1; continue; }
      const tx = tg.k === 'crawl' ? tg.x : tg.x, ty = tg.k === 'crawl' ? tg.y + .3 : tg.y, dx = tx - b.x, dy = ty - b.y, d = Math.hypot(dx, dy);
      if (d < .45) { tg.alive = 0; b.dead = 1; out.killed.push(tg); continue; }
      const sp = 16; b.x += dx / d * sp * dt; b.y += dy / d * sp * dt; b.l -= dt; if (b.l <= 0) b.dead = 1;
    }
    E.bolts = E.bolts.filter(b => !b.dead);
    if (alive) for (const p of E.picks) if (!p.got && Math.abs(p.x - cx) < .7 && Math.abs(p.y - cy) < .9) { p.got = 1; out.picked.push(p); }
    return out;
  }
  function nearestMonster(E, P, range = 8) {
    let best = null, bd = range; const cx = P.x, cy = P.y + C.PH / 2;
    for (const m of E.crawlers) if (m.alive && m.x != null) { const d = Math.hypot(m.x - cx, m.y + .3 - cy); if (d < bd) { bd = d; best = m; } }
    for (const m of E.wraiths) if (m.alive && m.on) { const d = Math.hypot(m.x - cx, m.y - cy); if (d < bd) { bd = d; best = m; } }
    return best;
  }
  function fire(E, P) { const tg = nearestMonster(E, P); if (!tg) return null; E.bolts.push({ x: P.x, y: P.y + .5, tg, l: 1.2 }); return tg; }

  /* permanent upgrades bought at the shrine with embers */
  const SHRINE = [
    { k: 'pow', n: ['Leap power', 'قوة القفزة'], max: 3, cost: [40, 90, 160], d: ['+5% leap height per level', '+5% ارتفاع القفزة لكل مستوى'] },
    { k: 'shield', n: ['Starting shield', 'درع البداية'], max: 1, cost: [120], d: ['Begin every trial with a shield', 'ابدأ كل تحدٍّ بدرع'] },
    { k: 'bolts', n: ['Bolt quiver', 'جعبة السهام'], max: 2, cost: [60, 130], d: ['Start with +2 soul bolts per level', 'ابدأ بسهمين إضافيين لكل مستوى'] },
    { k: 'double', n: ['Second wind', 'النفَس الثاني'], max: 1, cost: [200], d: ['Double leap always available', 'القفزة المزدوجة متاحة دائماً'] },
  ];
  return { LEVELS, stars, world, entities, stepEntities, nearestMonster, fire, crawlX, SHRINE };
});
