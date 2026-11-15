/* ألعاب الطاولة 1: أربعة تربح، شطرنج، داما، ذاكرة الأزواج */
(function () {
  const { esc } = U;
  const turnLine = (st, H) => st.over ? '' : `<p class="ctr">الدور على ${U.who(H, st.ps[st.k])}</p>`;

  /* ---------- أربعة تربح ---------- */
  const C4D = [[0, 1], [1, 0], [1, 1], [1, -1]];
  function c4win(b, r, c, v) {
    for (const [dr, dc] of C4D) {
      const L = [r * 7 + c];
      for (const s of [1, -1]) { let rr = r + dr * s, cc = c + dc * s; while (rr >= 0 && rr < 6 && cc >= 0 && cc < 7 && b[rr * 7 + cc] === v) { L.push(rr * 7 + cc); rr += dr * s; cc += dc * s; } }
      if (L.length >= 4) return L;
    }
    return null;
  }
  G.reg({
    id: 'c4', n: 'أربعة تربح', cat: 'board', em: '🔴', hue: 8, min: 2, max: 2, t: 5, modes: 'fs', local: 1,
    d: 'أسقط أقراصك وكوّن صفاً من أربعة قبل خصمك.',
    r: 'يتناوب اللاعبان على إسقاط قرص في أحد الأعمدة السبعة. أول من يصفّ أربعة أقراص أفقياً أو عمودياً أو قطرياً يفوز. إذا امتلأت اللوحة فالنتيجة تعادل.',
    init(ps) { return { ps, b: Array(42).fill(0), k: 0, sc: U.zero(ps), last: -1 }; },
    turn: st => st.ps[st.k],
    act(st, p, a) {
      if (st.over || p !== st.ps[st.k]) return; const c = a.c | 0; if (c < 0 || c > 6) return;
      let r = 5; while (r >= 0 && st.b[r * 7 + c]) r--; if (r < 0) return;
      const v = st.k + 1; st.b[r * 7 + c] = v; st.last = r * 7 + c;
      const w = c4win(st.b, r, c, v);
      if (w) { st.w = w; st.sc[p] = 1; st.over = { win: [p] }; }
      else if (st.b.every(x => x)) st.over = { win: [], msg: 'تعادل: امتلأت اللوحة' };
      else st.k ^= 1;
    },
    view(st, me, H) {
      const my = !st.over && st.ps[st.k] === me; let h = turnLine(st, H) + '<div class="c4 ltr">';
      for (let c = 0; c < 7; c++) {
        h += `<button class="c4c" ${my && !st.b[c] ? U.A({ c }) : 'disabled'} aria-label="عمود ${c + 1}">`;
        for (let r = 0; r < 6; r++) { const i = r * 7 + c; h += `<i class="d${st.b[i]}${st.w && st.w.includes(i) ? ' win' : ''}${st.last === i ? ' last' : ''}"></i>`; }
        h += '</button>';
      }
      return h + '</div>';
    },
    bot(st, p) { if (st.ps[st.k] !== p) return; return { c: U.pick([0, 1, 2, 3, 4, 5, 6].filter(c => !st.b[c])) }; },
  });

  /* ---------- شطرنج ---------- */
  const isW = c => c >= 'A' && c <= 'Z';
  const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
  const D8 = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  const GL = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
  function chAtk(b, sq, byW) {
    const r = sq >> 3, f = sq & 7, at = (rr, ff) => rr < 0 || rr > 7 || ff < 0 || ff > 7 ? '' : b[rr * 8 + ff];
    const pr = r + (byW ? 1 : -1);
    if (at(pr, f - 1) === (byW ? 'P' : 'p') || at(pr, f + 1) === (byW ? 'P' : 'p')) return true;
    for (const [dr, df] of KN) if (at(r + dr, f + df) === (byW ? 'N' : 'n')) return true;
    for (const [dr, df] of D8) {
      if (at(r + dr, f + df) === (byW ? 'K' : 'k')) return true;
      let rr = r + dr, ff = f + df;
      while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) {
        const c = b[rr * 8 + ff];
        if (c !== '.') { if (isW(c) === byW) { const t = c.toUpperCase(); if (t === 'Q' || (dr && df ? t === 'B' : t === 'R')) return true; } break; }
        rr += dr; ff += df;
      }
    }
    return false;
  }
  function chGen(s) {
    const b = s.b, W = s.k === 0, M = [], own = c => c !== '.' && isW(c) === W, en = c => c !== '.' && isW(c) !== W;
    for (let f = 0; f < 64; f++) {
      const c = b[f]; if (!own(c)) continue; const r = f >> 3, fl = f & 7, t = c.toUpperCase();
      if (t === 'P') {
        const d = W ? -1 : 1, r1 = r + d; if (r1 < 0 || r1 > 7) continue; const pr = r1 === (W ? 0 : 7) ? 'p' : '';
        if (b[r1 * 8 + fl] === '.') { M.push({ f, t: r1 * 8 + fl, fl: pr }); if (r === (W ? 6 : 1) && b[(r + 2 * d) * 8 + fl] === '.') M.push({ f, t: (r + 2 * d) * 8 + fl, fl: '2' }); }
        for (const df of [-1, 1]) { const ff = fl + df; if (ff < 0 || ff > 7) continue; const q = r1 * 8 + ff; if (en(b[q])) M.push({ f, t: q, fl: pr }); else if (q === s.ep) M.push({ f, t: q, fl: 'e' }); }
      } else if (t === 'N' || t === 'K') {
        for (const [dr, df] of (t === 'N' ? KN : D8)) { const rr = r + dr, ff = fl + df; if (rr < 0 || rr > 7 || ff < 0 || ff > 7) continue; const q = rr * 8 + ff; if (!own(b[q])) M.push({ f, t: q, fl: '' }); }
      } else {
        for (const [dr, df] of D8) {
          if (t === 'B' && !(dr && df)) continue; if (t === 'R' && dr && df) continue;
          let rr = r + dr, ff = fl + df;
          while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const q = rr * 8 + ff; if (own(b[q])) break; M.push({ f, t: q, fl: '' }); if (b[q] !== '.') break; rr += dr; ff += df; }
        }
      }
    }
    const K = W ? 60 : 4;
    if (b[K] === (W ? 'K' : 'k') && !chAtk(b, K, !W)) {
      const R = W ? 'R' : 'r';
      if (s.cas.includes(W ? 'K' : 'k') && b[K + 1] === '.' && b[K + 2] === '.' && b[K + 3] === R && !chAtk(b, K + 1, !W) && !chAtk(b, K + 2, !W)) M.push({ f: K, t: K + 2, fl: 'c' });
      if (s.cas.includes(W ? 'Q' : 'q') && b[K - 1] === '.' && b[K - 2] === '.' && b[K - 3] === '.' && b[K - 4] === R && !chAtk(b, K - 1, !W) && !chAtk(b, K - 2, !W)) M.push({ f: K, t: K - 2, fl: 'c' });
    }
    return M;
  }
  function chApply(s, m) {
    const b = s.b, p = b[m.f], W = isW(p); let cas = s.cas; b[m.t] = p; b[m.f] = '.';
    if (m.fl === 'e') b[(m.f >> 3) * 8 + (m.t & 7)] = '.';
    if (m.fl === 'p') b[m.t] = W ? 'Q' : 'q';
    if (m.fl === 'c') { if (m.t === 62) { b[61] = 'R'; b[63] = '.'; } else if (m.t === 58) { b[59] = 'R'; b[56] = '.'; } else if (m.t === 6) { b[5] = 'r'; b[7] = '.'; } else if (m.t === 2) { b[3] = 'r'; b[0] = '.'; } }
    s.ep = m.fl === '2' ? (m.f + m.t) / 2 : -1;
    if (p === 'K') cas = cas.replace(/[KQ]/g, ''); if (p === 'k') cas = cas.replace(/[kq]/g, '');
    for (const [sq, ch] of [[63, 'K'], [56, 'Q'], [7, 'k'], [0, 'q']]) if (m.f === sq || m.t === sq) cas = cas.replace(ch, '');
    s.cas = cas; s.k ^= 1;
  }
  function chLegal(s) {
    const W = s.k === 0;
    return chGen(s).filter(m => { const c = { b: s.b.slice(), cas: s.cas, ep: s.ep, k: s.k }; chApply(c, m); return !chAtk(c.b, c.b.indexOf(W ? 'K' : 'k'), !W); });
  }
  const chCheck = s => chAtk(s.b, s.b.indexOf(s.k === 0 ? 'K' : 'k'), s.k !== 0);
  G.reg({
    _t: { chLegal, chApply }, id: 'chess', n: 'شطرنج', cat: 'board', em: '♞', hue: 215, min: 2, max: 2, t: 20, modes: 's', local: 1,
    d: 'لعبة الملوك الكلاسيكية بكامل قواعدها.',
    r: 'الأبيض يبدأ. حرّك قطعك لتحاصر ملك الخصم (كش مات). التبييت والأخذ بالمرور مدعومان، والبيدق الذي يصل آخر صف يترقّى إلى وزير تلقائياً. تنتهي المباراة بالتعادل عند انعدام النقلات (بات) أو بعد 150 نقلة لكل لاعب. يمكنك الانسحاب في أي وقت.',
    init(ps) { return { ps, b: 'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR'.split(''), k: 0, cas: 'KQkq', ep: -1, n: 0, sc: U.zero(ps) }; },
    turn: st => st.ps[st.k],
    act(st, p, a) {
      if (st.over) return;
      if (a.t === 'res' && st.ps.includes(p)) { const w = st.ps.find(q => q !== p); st.sc[w] = 1; st.over = { win: [w], msg: 'انسحاب' }; return; }
      if (p !== st.ps[st.k]) return;
      const m = chLegal(st).find(m => m.f === a.f && m.t === a.t); if (!m) return;
      chApply(st, m); st.lm = [m.f, m.t]; st.n++; st.chk = chCheck(st);
      if (!chLegal(st).length) { if (st.chk) { st.sc[p] = 1; st.over = { win: [p], msg: 'كش مات' }; } else st.over = { win: [], msg: 'تعادل (بات)' }; }
      else if (st.n >= 300) st.over = { win: [], msg: 'تعادل بطول المباراة' };
    },
    view(st, me, H) {
      const flip = me === st.ps[1], my = !st.over && st.ps[st.k] === me, sel = my ? H.ui.sel : undefined;
      const lm = my ? chLegal(st) : [], tg = sel != null ? lm.filter(m => m.f === sel) : [];
      let h = turnLine(st, H) + (st.chk && !st.over ? '<p class="ctr warn">كش!</p>' : '') + '<div class="chess ltr">';
      for (let i = 0; i < 64; i++) {
        const q = flip ? 63 - i : i, c = st.b[q], dark = ((q >> 3) + (q & 7)) & 1, t = tg.find(m => m.t === q);
        let at = 'disabled'; if (t) at = U.A({ f: sel, t: q }); else if (my && lm.some(m => m.f === q)) at = U.UI({ sel: q });
        h += `<button class="sq ${dark ? 'dk' : 'lt'}${q === sel ? ' sel' : ''}${t ? ' tg' : ''}${st.lm && st.lm.includes(q) ? ' lm' : ''}" ${at}>${c === '.' ? '' : `<span class="${isW(c) ? 'pw' : 'pb'}">${GL[c.toLowerCase()]}︎</span>`}</button>`;
      }
      h += '</div>';
      if (!st.over && st.ps.includes(me)) h += `<p class="ctr">${U.B('انسحاب', { t: 'res' }, 'ghost sm')}</p>`;
      return h;
    },
    bot(st, p) { if (st.ps[st.k] !== p) return; const L = chLegal(st), cap = L.filter(m => st.b[m.t] !== '.'); const m = U.pick(cap.length && Math.random() < .7 ? cap : L); return { f: m.f, t: m.t }; },
  });

  /* ---------- داما ---------- */
  function ckMoves(st) {
    const W = st.k === 0, b = st.b, J = [], S = [];
    for (let f = 0; f < 64; f++) {
      const c = b[f]; if (c === '.' || (c.toLowerCase() === 'w') !== W) continue; if (st.ch != null && st.ch !== f) continue;
      const r = f >> 3, fl = f & 7, king = c === c.toUpperCase();
      const ds = king ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] : W ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
      for (const [dr, df] of ds) {
        const r1 = r + dr, f1 = fl + df; if (r1 < 0 || r1 > 7 || f1 < 0 || f1 > 7) continue; const m = b[r1 * 8 + f1];
        if (m === '.') S.push({ f, t: r1 * 8 + f1 });
        else if ((m.toLowerCase() === 'w') !== W) { const r2 = r1 + dr, f2 = f1 + df; if (r2 >= 0 && r2 < 8 && f2 >= 0 && f2 < 8 && b[r2 * 8 + f2] === '.') J.push({ f, t: r2 * 8 + f2, x: r1 * 8 + f1 }); }
      }
    }
    return J.length ? J : (st.ch != null ? [] : S);
  }
  const ckCount = (st, w) => st.b.filter(c => c !== '.' && (c.toLowerCase() === 'w') === w).length;
  G.reg({
    id: 'dama', n: 'داما', cat: 'board', em: '⚫', hue: 28, min: 2, max: 2, t: 12, modes: 'fs', local: 1,
    d: 'اقفز فوق قطع خصمك والتهمها كلها.',
    r: 'تتحرك القطع قطرياً للأمام خانة واحدة. إذا أمكنك القفز فوق قطعة للخصم فالأكل إجباري، ويستمر القفز المتتالي بالقطعة نفسها. القطعة التي تبلغ آخر صف تصبح ملكاً يتحرك للأمام والخلف. يخسر من تنتهي قطعه أو لا يجد نقلة. بعد 150 نقلة لكل لاعب يفوز صاحب القطع الأكثر.',
    init(ps) {
      const b = Array(64).fill('.');
      for (let i = 0; i < 64; i++) { const r = i >> 3; if (((r + (i & 7)) & 1)) { if (r < 3) b[i] = 'b'; else if (r > 4) b[i] = 'w'; } }
      return { ps, b, k: 0, ch: null, n: 0, sc: U.zero(ps) };
    },
    turn: st => st.ps[st.k],
    act(st, p, a) {
      if (st.over || p !== st.ps[st.k]) return;
      const m = ckMoves(st).find(m => m.f === a.f && m.t === a.t); if (!m) return;
      const b = st.b, W = st.k === 0; let c = b[m.f]; b[m.f] = '.'; let crowned = false;
      if ((m.t >> 3) === (W ? 0 : 7) && c === c.toLowerCase()) { c = c.toUpperCase(); crowned = true; }
      b[m.t] = c; st.lm = [m.f, m.t]; st.n++;
      if (m.x != null) { b[m.x] = '.'; st.ch = m.t; if (!crowned && ckMoves(st).length) return; }
      st.ch = null; st.k ^= 1;
      st.sc[st.ps[0]] = 12 - ckCount(st, false); st.sc[st.ps[1]] = 12 - ckCount(st, true);
      if (!ckMoves(st).length) st.over = { win: [p] };
      else if (st.n >= 300) { const d = ckCount(st, true) - ckCount(st, false); st.over = { win: d ? [st.ps[d > 0 ? 0 : 1]] : [], msg: 'انتهى عدد النقلات' }; }
    },
    view(st, me, H) {
      const flip = me === st.ps[1], my = !st.over && st.ps[st.k] === me, lm = my ? ckMoves(st) : [];
      const sel = my ? (st.ch != null ? st.ch : H.ui.sel) : undefined, tg = sel != null ? lm.filter(m => m.f === sel) : [];
      let h = turnLine(st, H) + (my && lm[0] && lm[0].x != null ? '<p class="ctr warn">الأكل إجباري</p>' : '') + '<div class="chess ltr">';
      for (let i = 0; i < 64; i++) {
        const q = flip ? 63 - i : i, c = st.b[q], dark = ((q >> 3) + (q & 7)) & 1, t = tg.find(m => m.t === q);
        let at = 'disabled'; if (t) at = U.A({ f: sel, t: q }); else if (my && lm.some(m => m.f === q)) at = U.UI({ sel: q });
        h += `<button class="sq ${dark ? 'dk' : 'lt'}${q === sel ? ' sel' : ''}${t ? ' tg' : ''}${st.lm && st.lm.includes(q) ? ' lm' : ''}" ${at}>${c === '.' ? '' : `<i class="ck ${c.toLowerCase() === 'w' ? 'cw' : 'cb'}${c === c.toUpperCase() ? ' kg' : ''}"></i>`}</button>`;
      }
      return h + '</div>';
    },
    bot(st, p) { if (st.ps[st.k] !== p) return; const m = U.pick(ckMoves(st)); return m && { f: m.f, t: m.t }; },
  });

  /* ---------- ذاكرة الأزواج ---------- */
  const MEM = '🐪🦅🌴☕🕌🏜️🐎🌙⭐🦊🐢🦋🍉🍇🥭🚀🎈🎁🪁🔑'.match(/\p{Extended_Pictographic}️?/gu);
  G.reg({
    id: 'mem', n: 'ذاكرة الأزواج', cat: 'board', em: '🃏', hue: 290, min: 2, max: 6, t: 8, modes: 'fp', local: 1,
    d: 'اقلب بطاقتين وتذكّر أماكن الأزواج المتطابقة.',
    r: 'في دورك اقلب بطاقتين. إن تطابقتا تكسب نقطة وتلعب مرة أخرى، وإلا تُقلبان وينتقل الدور. يفوز من يجمع أكثر الأزواج.',
    opts: [{ k: 'n', n: 'عدد الأزواج', v: [8, 12, 18], d: 12 }],
    init(ps, o) { const e = U.shuf(MEM).slice(0, o.n || 12); return { ps, cards: U.shuf(e.concat(e)), up: [], got: {}, k: 0, sc: U.zero(ps) }; },
    turn: st => st.ps[st.k],
    act(st, p, a, H) {
      if (st.over || p !== st.ps[st.k] || st.up.length >= 2) return; const i = a.i | 0;
      if (!(i >= 0 && i < st.cards.length) || i in st.got || st.up.includes(i)) return;
      st.up.push(i); if (st.up.length < 2) return;
      const [x, y] = st.up;
      if (st.cards[x] === st.cards[y]) { st.got[x] = st.got[y] = p; st.sc[p]++; st.up = []; if (Object.keys(st.got).length === st.cards.length) st.over = { win: U.top(st.sc) }; }
      else st.flip = H.now + 1300;
    },
    tick(st, H) { if (st.flip && H.now >= st.flip) { st.flip = 0; st.up = []; st.k = (st.k + 1) % st.ps.length; return true; } },
    view(st, me, H) {
      const my = !st.over && st.ps[st.k] === me && st.up.length < 2;
      return turnLine(st, H) + `<div class="mem ltr n${st.cards.length}">` + st.cards.map((c, i) => {
        const open = i in st.got || st.up.includes(i);
        return `<button class="mc${open ? ' op' : ''}${i in st.got ? ' gt' : ''}" ${my && !open ? U.A({ i }) : 'disabled'}>${open ? c : ''}</button>`;
      }).join('') + '</div>';
    },
    bot(st, p) { if (st.ps[st.k] !== p || st.up.length >= 2) return; return { i: U.pick(st.cards.map((_, i) => i).filter(i => !(i in st.got) && !st.up.includes(i))) }; },
  });
})();
