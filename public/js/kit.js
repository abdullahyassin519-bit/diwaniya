/* ديوانية — عُدّة الألعاب: السجل والأدوات المشتركة (بلا DOM، تعمل في المتصفح و Node) */
(function (g) {
  const G = { list: [], by: {}, reg(d) { G.list.push(d); G.by[d.id] = d; } };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const U = {
    esc,
    rnd: n => Math.floor(Math.random() * n),
    pick: a => a[Math.floor(Math.random() * a.length)],
    shuf(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = U.rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    zero: ps => Object.fromEntries(ps.map(p => [p, 0])),
    all: (sub, ps) => ps.every(p => p in sub),
    /* توحيد الكتابة العربية للمقارنة */
    norm(s) {
      return String(s ?? '').replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
        .replace(/[^ء-ي0-9a-zA-Z ]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().replace(/^ال(?=..)/, '');
    },
    dl(st, H, ms) { st.dl = H.now + ms; st.dlT = ms; },
    A: o => `data-a="${esc(JSON.stringify(o))}"`,
    UI: o => `data-ui="${esc(JSON.stringify(o))}"`,
    B: (label, a, cls = '', dis = false) => `<button class="btn ${cls}" ${dis ? 'disabled' : ''} ${U.A(a)}>${label}</button>`,
    who: (H, id) => `<span class="who"><i>${H.av(id)}</i>${esc(H.nm(id))}</span>`,
    wait: (sub, ps, H) => `<div class="row ctr">${ps.map(p => `<span class="chip ${p in sub ? 'ok' : ''}">${H.av(p)} ${esc(H.nm(p))}</span>`).join('')}</div>`,
    form: (a, inner, auto) => `<div class="form" ${auto ? 'data-auto' : ''} data-form="${esc(JSON.stringify(a))}">${inner}</div>`,
    inp: (name, ph, max = 60, type = 'text') => `<input class="inp" type="${type}" name="${name}" id="f_${name}" maxlength="${max}" placeholder="${esc(ph)}" autocomplete="off">`,
    go: label => `<button class="btn pri" data-go>${label}</button>`,
    top(sc) { const m = Math.max(...Object.values(sc)); return Object.keys(sc).filter(p => sc[p] === m); },
    tally(votes) { const c = {}; for (const v of Object.values(votes)) c[v] = (c[v] || 0) + 1; return c; },
    dice: d => `<span class="die">${d ? '⚀⚁⚂⚃⚄⚅'[d - 1] : '🎲'}</span>`,
  };
  g.G = G; g.U = U;
})(typeof window !== 'undefined' ? window : globalThis);
