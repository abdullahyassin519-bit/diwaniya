/* طخطخة — لعبة تصويب ثلاثية الأبعاد بين فريقين (حتى 6 ضد 6). الخادم يحكم المباراة (strike-core.js)، وهذا الملف: العرض، الإدخال، الصوت، والواجهة. */
(function () {
  const { esc } = U, C = window.SKC, WP = C.WP, TN = ['المهاجمون', 'المدافعون'], TC = ['#ff7a3d', '#4d9bff'], WK = ['pistol', 'smg', 'shotgun', 'rifle', 'sniper'];
  const LS = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  const coarse = () => matchMedia('(pointer:coarse)').matches;
  const CFG = Object.assign({ sens: 1, vol: .8, sfx: 1, stepv: 1, ambv: .7, uiv: .8, fov: 78, q: coarse() ? ((navigator.deviceMemory || 4) < 4 ? 0 : 1) : 2, btn: 1, lefty: 0, skin: 0 }, LS.get('dw_sk', {})), saveCfg = () => LS.set('dw_sk', CFG);
  const addScript = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  let postP; const loadPost = () => postP || (postP = window.GLP ? Promise.resolve() : addScript('js/vendor/post.js').catch(() => { postP = null; }));
  let threeP; const loadThree = () => threeP || (threeP = (window.THREE ? Promise.resolve() : addScript('js/vendor/three.min.js')).then(() => Promise.resolve(window.GLX ? 0 : addScript('js/vendor/gltf-loader.js')).catch(() => { })).then(() => Promise.resolve(window.SKM ? SKM.load(window.THREE) : false).catch(() => { })));

  /* ---------- الصوت: مُولَّد برمجياً بالكامل، موضعي ثلاثي الأبعاد، بقنوات منفصلة وصدى حسب المكان ---------- */
  const AU = { ac: null, out: null, nb: null, amb: null, bus: {}, wet: null, m: null, lx: 0, ly: 0, ind: 0, ambT: 0,
    init() {
      if (AU.ac) { if (AU.ac.state === 'suspended') AU.ac.resume(); return; }
      try {
        const A = window.AudioContext || window.webkitAudioContext, ac = AU.ac = new A();
        const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 4; comp.attack.value = .003; comp.release.value = .22; comp.connect(ac.destination);
        AU.out = ac.createGain(); AU.out.connect(comp);
        for (const k of ['sfx', 'step', 'amb', 'ui']) { AU.bus[k] = ac.createGain(); AU.bus[k].connect(AU.out); }
        const n = ac.sampleRate; AU.nb = ac.createBuffer(1, n, n); const d = AU.nb.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        /* صدى: استجابة نبضية مولّدة (ضجيج متناقص، أنعم مع الوقت) */
        const L = Math.floor(n * 1.8), ir = ac.createBuffer(2, L, n);
        for (let c = 0; c < 2; c++) { const b = ir.getChannelData(c); let lp = 0; for (let i = 0; i < L; i++) { const t = i / L, k = .25 + t * .7; lp = lp * k + (Math.random() * 2 - 1) * (1 - k); b[i] = lp * Math.pow(1 - t, 3.2) * (i < n * .012 ? i / (n * .012) : 1) * 2.2; } }
        const cv = ac.createConvolver(); cv.buffer = ir; AU.wet = ac.createGain(); AU.wet.gain.value = .15; AU.wet.connect(cv).connect(AU.bus.sfx);
        AU.setVol();
      } catch (e) { }
    },
    setVol() { if (!AU.out) return; AU.out.gain.value = CFG.vol; AU.bus.sfx.gain.value = CFG.sfx; AU.bus.step.gain.value = CFG.stepv; AU.bus.amb.gain.value = CFG.ambv * (AU.ind ? .5 : 1); AU.bus.ui.gain.value = CFG.uiv; },
    on() { return AU.ac && window.DW && DW.P.snd && CFG.vol > 0; },
    cell(x, y) { const m = AU.m; if (!m || x == null) return 0; const cx = x | 0, cy = y | 0; return cx >= 0 && cy >= 0 && cx < m.w && cy < m.h ? m.ind[cy * m.w + cx] || (m.theme === 'depot' ? 1 : 0) : 0; },
    /* مسار صوت: (مرشح المسافة) ← موضع ثلاثي الأبعاد ← قناة، مع إرسال للصدى */
    dest(x, y, z, bus, send) {
      const ac = AU.ac, b = AU.bus[bus || 'sfx'];
      if (x == null) { if (send) { const s = ac.createGain(); s.gain.value = send; const g = ac.createGain(); g.connect(b); g.connect(s); s.connect(AU.wet); return g; } return b; }
      const dd = Math.hypot(x - AU.lx, y - AU.ly), f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = Math.max(900, 18000 * Math.exp(-dd / 13));
      const p = ac.createPanner(); p.panningModel = 'HRTF'; p.distanceModel = 'inverse'; p.refDistance = 2.2; p.rolloffFactor = 1.15; p.maxDistance = 70;
      if (p.positionX) { p.positionX.value = x; p.positionY.value = z || .7; p.positionZ.value = y; } else p.setPosition(x, z || .7, y);
      f.connect(p).connect(b); if (send) { const s = ac.createGain(); s.gain.value = send * (1 + Math.min(1, dd / 25)); f.connect(s).connect(AU.wet); }
      return f;
    },
    listen(x, y, z, a) {
      if (!AU.ac) return; AU.lx = x; AU.ly = y; const l = AU.ac.listener, fx = Math.cos(a), fz = Math.sin(a), t = AU.ac.currentTime;
      if (l.positionX) { l.positionX.value = x; l.positionY.value = z; l.positionZ.value = y; l.forwardX.value = fx; l.forwardY.value = 0; l.forwardZ.value = fz; l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0; } else { l.setPosition(x, z, y); l.setOrientation(fx, 0, fz, 0, 1, 0); }
      const ind = AU.cell(x, y); if (ind !== AU.ind) { AU.ind = ind; AU.wet.gain.setTargetAtTime(ind ? .42 : .15, t, .25); AU.bus.amb.gain.setTargetAtTime(CFG.ambv * (ind ? .5 : 1), t, .4); }
    },
    /* ضجيج مرشَّح مع غلاف، ويمكن أن يكنس المرشح من f إلى f1 */
    nz(d, f, dur, g, type, f1, delay, q) { const ac = AU.ac, t = ac.currentTime + (delay || 0), s = ac.createBufferSource(), fl = ac.createBiquadFilter(), gn = ac.createGain(); s.buffer = AU.nb; s.loop = true; fl.type = type || 'lowpass'; fl.frequency.setValueAtTime(f, t); if (f1) fl.frequency.exponentialRampToValueAtTime(f1, t + dur); if (q) fl.Q.value = q; gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .003); gn.gain.exponentialRampToValueAtTime(.0001, t + dur); s.connect(fl).connect(gn).connect(d); s.start(t, Math.random() * .8); s.stop(t + dur + .03); },
    tn(d, f0, f1, dur, g, type, delay) { const ac = AU.ac, t = ac.currentTime + (delay || 0), o = ac.createOscillator(), gn = ac.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur); gn.gain.setValueAtTime(.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + .004); gn.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(gn).connect(d); o.start(t); o.stop(t + dur + .03); },
    /* وصفات الأسلحة: [طقة عالية، جسم (من→إلى، مدة)، دفعة منخفضة (من→إلى، مدة)، قوة] */
    GUN: { pistol: [2600, 3200, 480, .12, 160, 55, .1, .8], smg: [3000, 3600, 650, .08, 175, 70, .07, .65], shotgun: [1500, 2000, 240, .3, 95, 36, .24, 1.15], rifle: [2300, 2800, 380, .17, 125, 45, .15, 1], sniper: [1900, 2400, 230, .45, 82, 32, .4, 1.25] },
    play(type, x, y, vol, extra) {
      if (!AU.on()) return; try {
        const v = vol == null ? 1 : vol, G = AU.GUN[type], far = x != null ? Math.hypot(x - AU.lx, y - AU.ly) : 0;
        if (G) {
          const d = AU.dest(x, y, .8, 'sfx', .55), k = G[7] * v, r = .92 + Math.random() * .16;
          AU.nz(d, G[0] * r, .022 + G[3] * .1, k * .9, 'highpass');
          AU.nz(d, G[1] * r, G[3], k * .85, 'lowpass', G[2]);
          AU.tn(d, G[4] * r, G[5], G[6], k * .75, 'sine');
          AU.tn(d, G[4] * 2.1 * r, G[5] * 1.6, G[6] * .5, k * .22, 'triangle');
          if (far > 18) AU.nz(d, 420, .5 + G[3], k * .35, 'lowpass', 120, .03);
          if (x == null) {
            AU.tn(d, 3400, 0, .008, .1, 'square');
            if (type === 'shotgun') { AU.nz(d, 1800, .07, .3, 'bandpass', 900, .45, 2); AU.tn(d, 1300, 0, .02, .12, 'square', .52); AU.nz(d, 1500, .06, .25, 'bandpass', 2400, .6, 2); }
            if (type === 'sniper') { AU.tn(d, 2200, 0, .015, .12, 'square', .6); AU.nz(d, 2600, .09, .2, 'bandpass', 1400, .66, 2); AU.tn(d, 1500, 0, .02, .14, 'square', .82); }
            if (type !== 'shotgun') { const c = AU.dest(null, null, null, 'sfx'); [.34, .43, .5].forEach((t, i) => AU.tn(c, 4300 + Math.random() * 1600, 0, .045, .035 / (i + 1), 'sine', t + Math.random() * .04)); }
          }
          return;
        }
        if (type.startsWith('step_')) {
          let s = type.slice(5); if (AU.cell(x == null ? AU.lx : x, x == null ? AU.ly : y)) s = 'tile';
          const F = { stone: [520, 85], conc: [900, 95], metal: [2300, 140], tile: [1500, 110] }[s] || [700, 90], d = AU.dest(x, y, .05, 'step', .2), r = .85 + Math.random() * .3;
          AU.nz(d, F[0] * r, .055, .2 * v, 'bandpass', F[0] * .6, 0, 1.2); AU.tn(d, F[1] * r, 50, .05, .14 * v); AU.nz(d, F[0] * 1.6 * r, .035, .08 * v, 'bandpass', 0, .045, 1.5);
          return;
        }
        const d = AU.dest(x, y, .8, ['beep', 'buy', 'win', 'lose', 'plant', 'defuse'].includes(type) ? 'ui' : 'sfx', type === 'boom' ? .9 : .25);
        switch (type) {
          case 'rel': { const T0 = (extra || 2000) / 1000; AU.tn(d, 2200, 0, .01, .12 * v, 'square'); AU.nz(d, 1400, .14, .14 * v, 'bandpass', 900, .12, 2); AU.nz(d, 900, .05, .28 * v, 'bandpass', 0, T0 * .55, 3); AU.tn(d, 1800, 0, .012, .16 * v, 'square', T0 * .55); AU.tn(d, 2600, 0, .01, .14 * v, 'square', T0 * .8); AU.nz(d, 3000, .07, .12 * v, 'highpass', 0, T0 * .82); AU.tn(d, 1400, 0, .014, .16 * v, 'square', T0 * .9); break; }
          case 'sw': AU.nz(d, 2600, .05, .08 * v, 'highpass'); AU.tn(d, 1700, 0, .012, .08 * v, 'square', .06); break;
          case 'whiz': AU.nz(d, 2600, .16, .45 * v, 'bandpass', 700, 0, 4); AU.tn(d, 3200, 900, .08, .06 * v, 'sine'); break;
          case 'land': AU.nz(d, 500, .1, .35 * v, 'lowpass', 160); AU.tn(d, 85, 40, .1, .3 * v); break;
          case 'jump': AU.nz(d, 900, .06, .12 * v, 'bandpass', 500, 0, 1.2); break;
          case 'imp_conc': AU.nz(d, 1800, .05, .3 * v, 'lowpass', 600); AU.nz(d, 4200, .12, .07 * v, 'highpass', 0, .02); break;
          case 'imp_metal': AU.tn(d, 1700 + Math.random() * 600, 0, .16, .12 * v); AU.tn(d, 2900 + Math.random() * 500, 0, .1, .06 * v); AU.nz(d, 5000, .04, .12 * v, 'highpass'); break;
          case 'imp_wood': AU.nz(d, 700, .07, .3 * v, 'bandpass', 400, 0, 1.5); AU.tn(d, 230, 120, .06, .14 * v); break;
          case 'imp_dirt': AU.nz(d, 600, .09, .25 * v, 'lowpass', 200); break;
          case 'beep': AU.tn(d, 1500, 0, .07, .16 * v); break;
          case 'plant': AU.tn(d, 900, 0, .06, .15 * v, 'square'); AU.tn(d, 1200, 0, .06, .15 * v, 'square', .1); AU.tn(d, 1600, 0, .1, .15 * v, 'square', .2); break;
          case 'defuse': AU.tn(d, 1600, 500, .35, .16 * v, 'square'); break;
          case 'boom': AU.nz(d, 380, 1.8, 1.6 * v, 'lowpass', 90); AU.tn(d, 70, 26, 1.3, 1.3 * v, 'sine'); AU.nz(d, 3000, .5, .35 * v, 'highpass', 0, .05); for (let i = 0; i < 8; i++) AU.nz(d, 1500 + Math.random() * 2000, .03, .2 * v, 'bandpass', 0, .15 + Math.random() * .9, 3); break;
          case 'hit': AU.tn(d, 950, 520, .05, .18 * v, 'triangle'); AU.nz(d, 600, .05, .18 * v, 'lowpass'); break;
          case 'head': AU.tn(d, 2400, 0, .28, .14 * v); AU.tn(d, 3600, 0, .2, .08 * v, 'sine', .01); AU.tn(d, 1200, 700, .05, .12 * v, 'triangle'); break;
          case 'hurt': AU.nz(d, 320, .2, .5 * v, 'lowpass', 120); AU.tn(d, 110, 60, .18, .3 * v); break;
          case 'buy': AU.tn(d, 1200, 0, .06, .1 * v, 'square'); AU.tn(d, 1800, 0, .1, .1 * v, 'square', .07); break;
          case 'win': [523, 659, 784, 1047].forEach((f, i) => AU.tn(d, f, 0, .26, .13 * v, 'triangle', i * .12)); break;
          case 'lose': [440, 370, 311, 247].forEach((f, i) => AU.tn(d, f, 0, .3, .12 * v, 'triangle', i * .15)); break;
          case 'wall': AU.nz(d, 3500, .04, .12 * v, 'highpass'); break;
        }
      } catch (e) { }
    },
    /* أجواء الخريطة: رياح وطيور، بحر ونوارس، أو طنين المستودع */
    ambient(kind) {
      AU.stopAmb(); if (!AU.ac) return; try {
        const ac = AU.ac, b = AU.bus.amb, nodes = [], src = (f, g, lfoF, lfoD) => { const s = ac.createBufferSource(), fl = ac.createBiquadFilter(), gn = ac.createGain(), l = ac.createOscillator(), lg = ac.createGain(); s.buffer = AU.nb; s.loop = true; fl.type = 'lowpass'; fl.frequency.value = f; gn.gain.value = g; l.frequency.value = lfoF; lg.gain.value = lfoD; l.connect(lg).connect(gn.gain); s.connect(fl).connect(gn).connect(b); s.start(0, Math.random()); l.start(); nodes.push(s, l); };
        if (kind === 'hum') { src(140, .1, .13, .01); const o = ac.createOscillator(), og = ac.createGain(); o.frequency.value = 60; og.gain.value = .016; o.connect(og).connect(b); o.start(); nodes.push(o); }
        else if (kind === 'sea') { src(520, .09, .07, .06); src(1600, .02, .11, .015); }
        else src(420, .05, .13, .03);
        AU.amb = nodes; AU.ambK = kind; AU.ambT = ac.currentTime + 3;
      } catch (e) { }
    },
    /* أصوات متفرقة للأجواء (طيور، نوارس) تُستدعى من حلقة الرسم */
    tickAmb() {
      if (!AU.amb || !AU.on() || AU.ac.currentTime < AU.ambT) return; const d = AU.bus.amb, k = AU.ambK;
      AU.ambT = AU.ac.currentTime + 4 + Math.random() * 7; if (AU.ind) return;
      if (k === 'sea') { for (let i = 0; i < 2 + (Math.random() * 2 | 0); i++) AU.tn(d, 1900 + Math.random() * 400, 1100, .32, .03, 'sine', i * .4); }
      else if (k === 'wind') { const f = 2800 + Math.random() * 1500; for (let i = 0; i < 3 + (Math.random() * 3 | 0); i++) AU.tn(d, f * (1 + Math.random() * .2), f * .8, .07, .025, 'sine', i * .12); }
    },
    stopAmb() { if (AU.amb) for (const n of AU.amb) try { n.stop(); } catch (e) { } AU.amb = null; },
  };

  const CSS = `.sk{position:relative;width:100%;aspect-ratio:16/9;max-height:max(260px,calc(100vh - 215px));background:#05090b;border-radius:12px;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;margin:auto;direction:ltr;font-family:'Readex Pro',sans-serif;color:#fff;--bs:1}
.sk-quit{color:#ff8a8a!important}body:has(.sk.fs){overflow:hidden}
.sk.fs{position:fixed;inset:0;z-index:200;max-height:none;border-radius:0;aspect-ratio:auto;width:100vw;height:100vh;height:100dvh}
.sk canvas.sk-cv{width:100%;height:100%;display:block}.sk [hidden]{display:none!important}.sk-hud{position:absolute;inset:0;pointer-events:none;text-shadow:0 1px 3px #000}
.sk-scope{position:absolute;inset:0;display:none;background:radial-gradient(circle at 50% 50%,transparent 0 33vh,#000 33.6vh)}.sk.scoped .sk-scope{display:block}.sk-scope:before,.sk-scope:after{content:"";position:absolute;background:#000}.sk-scope:before{left:50%;top:0;bottom:0;width:1.5px}.sk-scope:after{top:50%;left:0;right:0;height:1.5px}
.sk-vig{position:absolute;inset:0;box-shadow:inset 0 0 90px 30px rgba(220,0,0,.8);opacity:0;transition:opacity .25s}.sk-dmg{position:absolute;left:50%;top:50%;width:220px;height:220px;margin:-110px;border-radius:50%;border:8px solid transparent;border-top-color:rgba(255,60,60,.9);opacity:0;transition:opacity .4s}
.sk-x{position:absolute;left:50%;top:50%;--g:7px}.sk-x.en i{background:#ff3b3b!important}.sk-x i{position:absolute;background:#eaffea;box-shadow:0 0 2px #000}.sk-x i:nth-child(1){width:9px;height:2px;left:var(--g);top:-1px}.sk-x i:nth-child(2){width:9px;height:2px;right:var(--g);top:-1px}.sk-x i:nth-child(3){width:2px;height:9px;top:var(--g);left:-1px}.sk-x i:nth-child(4){width:2px;height:9px;bottom:var(--g);left:-1px}
.sk-x b{position:absolute;left:-13px;top:-13px;width:26px;height:26px;opacity:0;background:linear-gradient(45deg,transparent 45%,#fff 45% 55%,transparent 55%),linear-gradient(-45deg,transparent 45%,#fff 45% 55%,transparent 55%);-webkit-mask:radial-gradient(circle,transparent 5px,#000 6px);mask:radial-gradient(circle,transparent 5px,#000 6px)}.sk-x b.hs{filter:drop-shadow(0 0 3px #f33) hue-rotate(0deg);background:linear-gradient(45deg,transparent 43%,#ff4d4d 43% 57%,transparent 57%),linear-gradient(-45deg,transparent 43%,#ff4d4d 43% 57%,transparent 57%)}.sk.scoped .sk-x i{display:none}
.sk-mm{position:absolute;left:8px;top:8px;width:132px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.55))}
.sk-team{position:absolute;left:8px;top:112px;font-size:11px;display:grid;gap:3px;direction:rtl;min-width:118px}.sk-team div{background:rgba(5,12,15,.55);border-inline-start:3px solid var(--c);padding:1px 6px;display:flex;justify-content:space-between;gap:8px}.sk-team .dead{opacity:.45;text-decoration:line-through}
.sk-score{position:absolute;top:6px;left:50%;transform:translateX(-50%);display:flex;align-items:stretch;font-weight:600;border-radius:8px;overflow:hidden;background:rgba(5,12,15,.7)}.sk-score span{padding:2px 14px;font-size:24px;min-width:52px;text-align:center}.sk-score span small{display:block;font-size:9px;font-weight:400;opacity:.9;margin-top:-4px}
.sk-score div{padding:2px 14px;text-align:center;border-inline:1px solid rgba(255,255,255,.15)}.sk-score div b{font-size:18px;font-variant-numeric:tabular-nums;display:block}.sk-score div small{font-size:9px;opacity:.75;display:block;margin-top:-3px}.sk-score .bomb b{color:#ff5a5a}
.sk-feed{position:absolute;right:8px;top:48px;display:grid;gap:3px;justify-items:end;font-size:12px;direction:rtl}.sk-feed div{background:rgba(5,12,15,.6);padding:1px 8px;border-radius:4px}.sk-feed .me{outline:1px solid #f5b62e}
.sk-ban{position:absolute;left:0;right:0;top:20%;text-align:center;direction:rtl}.sk-ban b{display:block;font:400 34px 'Lalezar','Readex Pro',sans-serif;letter-spacing:.5px}.sk-ban span{font-size:14px}
.sk-hint{position:absolute;left:0;right:0;top:62%;text-align:center;font-size:14px;color:#f5b62e;direction:rtl}
.sk-prog{position:absolute;left:50%;top:57%;width:200px;margin-left:-100px;height:10px;background:rgba(0,0,0,.6);border-radius:6px;overflow:hidden}.sk-prog i{display:block;height:100%;background:#f5b62e;width:0}
.sk-vit{position:absolute;left:10px;bottom:8px;display:flex;gap:8px;align-items:flex-end;font-weight:600}.sk-vit div{background:rgba(5,12,15,.6);padding:2px 10px;border-radius:6px;font-size:13px}.sk-vit b{font-size:24px;font-variant-numeric:tabular-nums}.sk-vit .low{color:#ff6b6b}
.sk-vit{left:14px;bottom:14px;gap:10px;--hp:100%;--hc:#5fd38a}
.sk-vit div{background:linear-gradient(180deg,rgba(20,28,34,.72),rgba(6,10,13,.78));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:10px;padding:4px 14px 7px;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.sk-vit .hp{position:relative;min-width:96px;color:var(--hc)}.sk-vit .hp b{color:#fff}
.sk-vit .hp::after{content:"";position:absolute;left:10px;right:10px;bottom:4px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--hc) var(--hp),rgba(255,255,255,.12) var(--hp))}
.sk-vit .ar{color:#8fc7ff}.sk-vit .cash{color:#8fe3a6;font-size:16px!important;padding-top:8px!important}
.sk-ammo{background:linear-gradient(180deg,rgba(20,28,34,.72),rgba(6,10,13,.78));border:1px solid rgba(255,255,255,.08);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.sk-feed div{background:linear-gradient(90deg,rgba(6,10,13,.35),rgba(6,10,13,.78));border-inline-end:3px solid rgba(255,255,255,.25);padding:3px 10px;border-radius:6px;font-size:12.5px;backdrop-filter:blur(4px)}
.sk-feed .me{outline:none;border-inline-end-color:#f5b62e;background:linear-gradient(90deg,rgba(60,40,5,.35),rgba(60,40,5,.8))}
.sk-score{filter:drop-shadow(0 4px 12px rgba(0,0,0,.4))}.sk-vit .cash{color:#9be28f;font-size:14px;align-self:center}
.sk-ammo{position:absolute;right:10px;bottom:8px;text-align:right;background:rgba(5,12,15,.6);padding:2px 12px;border-radius:6px}.sk-ammo b{font-size:28px;font-variant-numeric:tabular-nums}.sk-ammo small{opacity:.7;font-size:14px}.sk-ammo em{display:block;font-style:normal;font-size:11px;opacity:.85;direction:rtl;margin-top:-4px}.sk.touch .sk-ammo{bottom:auto;top:52px;right:auto;left:150px}
.sk-spec{position:absolute;left:0;right:0;bottom:16%;text-align:center;font-size:14px;direction:rtl}
.sk-z{position:absolute;top:0;bottom:0;display:none}.sk.touch .sk-z{display:block}.sk-joy{left:0;width:40%}.sk-look{right:0;width:60%}.sk.lefty .sk-joy{left:auto;right:0}.sk.lefty .sk-look{right:auto;left:0}
.sk-stick{position:absolute;width:96px;height:96px;margin:-48px;border-radius:50%;border:2px solid rgba(255,255,255,.35);display:none;pointer-events:none}.sk-stick i{position:absolute;left:28px;top:28px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.4)}
.sk button{font:600 14px 'Readex Pro',sans-serif;color:#fff;background:rgba(10,20,25,.5);border:1.5px solid rgba(255,255,255,.35);border-radius:10px;padding:5px 9px;-webkit-tap-highlight-color:transparent;cursor:pointer}
.sk-top{position:absolute;top:6px;right:6px;display:flex;gap:5px}.sk-top button{padding:3px 8px}
.sk-btns{position:absolute;right:10px;bottom:10px;display:none;gap:calc(8px*var(--bs));align-items:flex-end;flex-wrap:wrap-reverse;justify-content:flex-end;width:calc(190px*var(--bs))}.sk.touch .sk-btns{display:flex}.sk.lefty .sk-btns{right:auto;left:10px;flex-direction:row-reverse}.sk.lefty .sk-vit{left:auto;right:10px}
.sk-btns button{width:calc(46px*var(--bs));height:calc(46px*var(--bs));border-radius:50%;padding:0;font-size:calc(17px*var(--bs))}.sk .sk-fire{width:calc(76px*var(--bs));height:calc(76px*var(--bs));font-size:calc(28px*var(--bs));background:rgba(210,45,45,.42)}.sk-hm{position:absolute;left:50%;top:50%;width:30px;height:30px;transform:translate(-50%,-50%);pointer-events:none;opacity:0}.sk-hm i{position:absolute;left:50%;top:50%;width:3px;height:9px;margin:-4.5px 0 0 -1.5px;background:#fff;box-shadow:0 0 2px rgba(0,0,0,.6)}.sk-hm i:nth-child(1){transform:translateY(-11px)}.sk-hm i:nth-child(2){transform:translateY(11px)}.sk-hm i:nth-child(3){transform:translateX(-11px) rotate(90deg)}.sk-hm i:nth-child(4){transform:translateX(11px) rotate(90deg)}.sk-hm.hd i{background:#ff4d4d}.sk-jmp{width:calc(58px*var(--bs));height:calc(58px*var(--bs));font-size:calc(24px*var(--bs));background:rgba(60,140,220,.42)}.sk .sk-actb{width:auto;border-radius:12px;background:rgba(224,160,8,.8);color:#221700;padding:0 12px;font-size:13px}.sk-btns .on{background:rgba(245,182,46,.7);color:#221700}
.sk-pan{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(8,16,20,.93);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:12px 14px;direction:rtl;max-width:94%;max-height:92%;overflow:auto;pointer-events:auto;font-size:13px}.sk-pan h4{margin:0 0 8px;font:400 22px 'Lalezar','Readex Pro',sans-serif;display:flex;justify-content:space-between;gap:20px;align-items:center}.sk-pan h4 em{font:600 14px 'Readex Pro';color:#9be28f;font-style:normal}
.sk-buy .g{display:grid;grid-template-columns:repeat(3,minmax(104px,1fr));gap:8px}.sk-buy button{display:grid;gap:2px;text-align:right;padding:7px 10px;line-height:1.3}.sk-buy button small{font-weight:400;opacity:.8;font-size:11px}.sk-buy button i{display:block;height:4px;border-radius:3px;background:linear-gradient(to left,#f5b62e var(--w),rgba(255,255,255,.15) 0)}.sk-buy button.own{border-color:#f5b62e;background:rgba(245,182,46,.2)}.sk-buy button:disabled{opacity:.42}
.sk-set label{display:grid;grid-template-columns:8.5em 1fr 3em;gap:8px;align-items:center;margin:6px 0}.sk-set input[type=range]{width:100%}.sk-set .row{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.sk-set .row button.on{background:#e0a008;color:#221700}
.sk-tab table{border-collapse:collapse;min-width:min(560px,86vw)}.sk-tab td,.sk-tab th{padding:3px 10px;text-align:center;border-bottom:1px solid rgba(255,255,255,.1)}.sk-tab td:first-child,.sk-tab th:first-child{text-align:right}.sk-tab tr.me td{color:#ffe27a}.sk-tab tr.dead td:first-child{opacity:.5}.sk-tab .hd th{font:400 18px 'Lalezar';padding-top:8px}
.sk-lock{position:absolute;inset:0;display:none;place-items:center;background:rgba(0,0,0,.45);font-size:18px;direction:rtl;cursor:pointer}.sk.unlocked:not(.touch) .sk-lock{display:grid}
.sk-rot{position:absolute;inset:0;display:none;place-items:center;background:rgba(0,0,0,.85);font-size:20px;text-align:center;direction:rtl;pointer-events:none}@media (orientation:portrait){.sk.fs.touch .sk-rot{display:grid}}
.sk-load{position:absolute;inset:0;display:grid;place-items:center;background:#05090b;font-size:18px;direction:rtl}`;

  function Engine() {
    if (!document.getElementById('sk-css')) { const s = document.createElement('style'); s.id = 'sk-css'; s.textContent = CSS; document.head.appendChild(s); }
    Object.assign(CFG, LS.get('dw_sk', {})); const touch0 = coarse(), wrap = document.createElement('div'); wrap.className = 'sk fs' + (touch0 ? ' touch' : ' unlocked');
    wrap.innerHTML = `<canvas class="sk-cv"></canvas><div class="sk-hud"><div class="sk-scope"></div><div class="sk-vig"></div><div class="sk-dmg"></div><div class="sk-x"><i></i><i></i><i></i><i></i><b></b></div>
      <div class="sk-hm" aria-hidden="true"><i></i><i></i><i></i><i></i></div><canvas class="sk-mm" width="132" height="96"></canvas><div class="sk-team"></div><div class="sk-score"><span style="color:${TC[0]}"><em style="font-style:normal">0</em><small>مهاجمون</small></span><div><b>0:00</b><small></small></div><span style="color:${TC[1]}"><em style="font-style:normal">0</em><small>مدافعون</small></span></div>
      <div class="sk-feed"></div><div class="sk-ban"></div><div class="sk-hint"></div><div class="sk-prog" hidden><i></i></div><div class="sk-vit"><div class="hp">❤ <b>100</b></div><div class="ar">🛡 <b>0</b></div><div class="cash">$800</div></div><div class="sk-ammo"><b>12</b><small>/12</small><em></em></div><div class="sk-spec"></div></div>
      <div class="sk-z sk-joy" data-tc="joy"></div><div class="sk-z sk-look" data-tc="look"></div><div class="sk-stick"><i></i></div>
      <div class="sk-btns"><button class="sk-fire" data-tc="fire">🔥</button><button class="sk-jmp" data-tc="jump" aria-label="قفز">⤴</button><button data-k="tpv" aria-label="منظور الكتف">🎥</button><button data-k="rel" aria-label="تلقيم">🔄</button><button data-k="sw" aria-label="تبديل السلاح">🔁</button><button data-k="cr" aria-label="انحناء">🧎</button><button data-k="zoom" hidden aria-label="منظار">🔭</button><button data-k="buy" hidden aria-label="المتجر">🛒</button><button class="sk-actb" data-tc="act" hidden></button></div>
      <div class="sk-top"><button data-k="tab" aria-label="النتائج">📋</button><button data-k="set" aria-label="الإعدادات">⚙</button><button data-k="fs" aria-label="ملء الشاشة">⛶</button><button data-k="quit" aria-label="خروج من المباراة" class="sk-quit">✕</button></div>
      <div class="sk-pan sk-buy" hidden></div><div class="sk-pan sk-set" hidden></div><div class="sk-pan sk-tab" hidden></div><div class="sk-lock">انقر للتحكم بالتصويب · Esc لتحرير الفأرة</div><div class="sk-rot">أدِر جوالك أفقياً 🔄</div><div class="sk-load">جارٍ تجهيز الساحة…</div><input type="file" accept="image/*" hidden>`;
    const $ = s => wrap.querySelector(s), cv = $('.sk-cv'), el = { hm: $('.sk-hm'), buy: $('.sk-buy'), set: $('.sk-set'), tab: $('.sk-tab'), act: $('[data-tc=act]'), zoom: $('[data-k=zoom]'), buyB: $('[data-k=buy]'), crB: $('[data-k=cr]'), file: $('input[type=file]'), mm: $('.sk-mm'), team: $('.sk-team'), sc: $('.sk-score'), feed: $('.sk-feed'), ban: $('.sk-ban'), hint: $('.sk-hint'), prog: $('.sk-prog'), vit: $('.sk-vit'), ammo: $('.sk-ammo'), spec: $('.sk-spec'), x: $('.sk-x'), vig: $('.sk-vig'), dmg: $('.sk-dmg'), load: $('.sk-load'), stick: $('.sk-stick') };
    let T, X = null, m = null, me = null, S = null, sim = null, simIv = 0, ws = null, dead = false, gone = 0, lastF = 0, posT = 0, lastSent = '', initT = 0, overSent = false, started = false, tab = false, spec = 0, hudT = 0, fpsN = 0, fpsT = 0, fpsLow = 0, liveBan = 0, deathT = 0, beepT = 0, viewId = null, shadowKick = 3, tpv = false;
    let comp = null, compKey = '', R, cam, vmScene, vmCam, world, vm = null, vmKey = '', bombMesh, boom = null, flashL, holeI = 0, puffI = 0, trI = 0, mmBase = null;
    const Ppos = {}, faces = {}, skins = {}, chars = {}, feed = [], holes = [], puffs = [], tracers = [], inp = { f: 0, s: 0, fire: 0, act: 0, held: 0, k: {}, cr: 0, jq: 0, jp: 0 }, cache = {};
    const self = { x: 2, y: 2, a: 0, pi: 0, rp: 0, ry: 0, heat: 0, ammo: [12, 0], slot: 0, rel: 0, relD: 1, sw: 0, last: 0, zoom: 0, act: 0, rd: -1, w: '', bob: 0, kick: 0, hitT: 0, hs: 0, hurtT: 0, hp: 100, mvT: 0, mvS: 0, cr: 0, eye: .8, z: 0, vz: 0, gr: 1, stepT: 0, swayX: 0, swayY: 0, la: 0, lp: 0 };
    const AB = new AbortController(), on = (t, ev, fn, o) => t.addEventListener(ev, fn, Object.assign({ signal: AB.signal }, o)), my = () => S && S.pl[me], online = () => !(X.H.offline || X.H.code === 'LOCAL');
    const curW = () => self.slot && self.w ? self.w : 'pistol', setT = (k, node, v) => { if (cache[k] !== v) { cache[k] = v; node.textContent = v; } }, setH = (k, node, v) => { if (cache[k] !== v) { cache[k] = v; node.innerHTML = v; } };

    /* ---- الشبكة ---- */
    const send = q => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(q)); };
    const toHost = q => { if (sim) { if (q[0] === 'f') sim.heard(me); else sim.msg(me, q); } else send(q); };
    function sendInit() { if (!online() || !X.H.isHost() || (S && S.ph !== 'over')) return; const bots = {}; for (const id of X.st.ps) if (X.H.isBot(id)) bots[id] = 1; send(['init', { gk: X.H.code + ':' + X.H.gk, ps: X.st.ps, tm: X.st.tm, bots, map: X.st.map, target: X.H.o.w || 5, diff: ['سهل', 'متوسط', 'صعب'].indexOf(X.H.o.bot || 'متوسط') }]); }
    function connect() {
      if (dead) return;
      if (!online()) { const bots = {}; for (const id of X.st.ps) if (id !== me) bots[id] = 1; sim = C.Sim({ gk: 1, ps: X.st.ps.slice(), tm: X.st.tm, bots, map: X.st.map, target: X.H.o.w || 5, diff: ['سهل', 'متوسط', 'صعب'].indexOf(X.H.o.bot || 'متوسط'), now: () => performance.now(), connected: () => true, emit: (q, to) => { if (!to || to === me) onMsg('*', q); } }); sim.join(me); simIv = setInterval(() => { try { sim.tick(); } catch (e) { console.error(e); } }, 50); return; }
      try { ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + location.pathname.replace(/[^/]*$/, '') + 'ws?c=' + X.H.code + '&t=' + DW.P.tok); } catch (e) { return; }
      ws.onopen = () => { sendInit(); sendLook(); };
      ws.onmessage = e => { let d; try { d = JSON.parse(e.data); } catch (er) { return; } if (d && Array.isArray(d.m) && typeof d.f === 'string') onMsg(d.f, d.m); };
      ws.onclose = () => { ws = null; if (!dead) setTimeout(connect, 1500); };
    }
    function sendLook() { send(['sk', CFG.skin | 0]); const f = window.DW && DW.P.face; if (f) send(['fc', f]); }
    function setFaceImg(id, src) { if (typeof src !== 'string' || !/^data:image\/(jpeg|png);base64,/.test(src) || src.length > 20000) return; const im = new Image(); im.onload = () => { faces[id] = im; if (chars[id]) chars[id].setFace(im); }; im.src = src; }
    function setS(s) { S = s; S._dl = performance.now() + (s.r || 0); if (s.bomb) s.bomb._dl = performance.now() + (s.bomb.r || 0); }
    function onMsg(f, q) {
      const t = q[0], auth = f === '*';
      if (auth) {
        if (t === 'S') { if (q[1] && q[1].pl) setS(q[1]); }
        else if (t === 'b') { for (const b of q[1]) { const P = Ppos[b[0]] || (Ppos[b[0]] = { x: b[1], y: b[2], a: b[3], pi: 0 }); P.tx = b[1]; P.ty = b[2]; P.ta = b[3]; P.tpi = b[4]; P.fl = b[5]; } }
        else if (t === 'f') shotFx(q[4], q[1], q[2], q[3]);
        else if (t === 'k') { feed.push({ a: q[1], v: q[2], w: q[3], hs: q[4], t: performance.now() }); if (feed.length > 5) feed.shift(); cache.feed = null; if (q[2] === me) { deathT = performance.now(); self.zoom = 0; } if (q[1] === me) AU.play('win', null, null, .35); }
        else if (t === 'dm') { if (chars[q[1]] && chars[q[1]].hit) chars[q[1]].hit(); if (q[2] === me) { self.hmT = performance.now(); self.hmH = q[4] | 0; } if (q[1] === me) { self.hurtT = performance.now(); AU.play('hurt'); const A = Ppos[q[2]]; if (A) { self.dmgA = Math.atan2(A.y - self.y, A.x - self.x); self.dmgT = performance.now(); } } if (q[2] === me) AU.play(q[4] ? 'head' : 'hit'); }
        else if (t === 'e') { if (q[1] === 'boom') explode(q[2], q[3]); else AU.play(q[1] === 'pl' ? 'plant' : 'defuse', q[2], q[3], 1.5); }
        else if (t === 'tp') { self.x = +q[1]; self.y = +q[2]; self.a = +q[3]; self.rd = q[4]; }
        return;
      }
      if (t === 'p') { if (f !== me && S && S.pl[f]) { const P = Ppos[f] || (Ppos[f] = { x: +q[1], y: +q[2], a: +q[3], pi: 0 }); if (P.tx == null) setTimeout(sendLook, 300 + Math.random() * 500); const nx = +q[1], ny = +q[2], tn = performance.now(); if (P.tx != null && P.rt) { const dtr = Math.max(.03, (tn - P.rt) / 1000), vx = (nx - P.rx) / dtr, vy = (ny - P.ry) / dtr; if (Math.hypot(vx, vy) < 8) { P.vx = vx; P.vy = vy; } else P.vx = P.vy = 0; } P.rx = nx; P.ry = ny; P.rt = tn; P.tx = nx; P.ty = ny; P.ta = +q[3]; P.tpi = +q[4] || 0; P.fl = q[5] | 0; P.tz = +q[6] || 0; if (P.z == null) P.z = P.tz; } }
      else if (t === 'f') { if (f !== me) shotFx(f, q[1], +q[2], +q[3]); }
      else if (t === 'fc') { if (f !== me) setFaceImg(f, q[1]); }
      else if (t === 'sk') { if (f !== me && skins[f] !== (q[1] | 0)) { skins[f] = q[1] | 0; dropChar(f); } }
    }
    /* ---- الإدخال ---- */
    const typing = e => /INPUT|TEXTAREA|SELECT/.test(e.target.tagName), panelOpen = () => !el.set.hidden || (!el.buy.hidden && !wrap.classList.contains('touch') && document.pointerLockElement !== wrap && false);
    on(document, 'keydown', e => {
      if (typing(e) || !document.body.contains(wrap)) return; AU.init(); const k = e.code; if (e.repeat) { if (/^(Space|Arrow|Tab)/.test(k)) e.preventDefault(); return; } inp.k[k] = 1; if (k === 'Space') inp.jq = 1; if (k === 'KeyV') tpv = !tpv;
      if (k === 'KeyR') reload(); else if (k === 'KeyQ') swap(); else if (k === 'Digit1') swap(1); else if (k === 'Digit2') swap(0); else if (k === 'Tab') tab = true; else if (k === 'KeyF') fs(); else if (k === 'KeyB') toggleBuy(); else if (k === 'KeyM') toggleSet();
      if (/^(Space|Arrow|Tab)/.test(k)) e.preventDefault();
    });
    on(document, 'keyup', e => { inp.k[e.code] = 0; if (e.code === 'Tab') tab = false; });
    on(document, 'mousemove', e => { if (document.pointerLockElement !== wrap) return; const s = .0022 * CFG.sens * (self.zoom ? .28 : 1); self.a = C.nrm(self.a + e.movementX * s); self.pi = Math.max(-1.45, Math.min(1.45, self.pi - e.movementY * s)); });
    on(cv, 'mousedown', e => { AU.init(); if (wrap.classList.contains('touch')) return; if (document.pointerLockElement !== wrap) return lock(); if (e.button === 2) toggleZoom(); else if (e.button === 0) { inp.fire = 1; inp.held = 0; } });
    on($('.sk-lock'), 'click', () => { AU.init(); lock(); });
    function lock() { if (wrap.classList.contains('fs') && !document.fullscreenElement && wrap.requestFullscreen) { try { const fp = wrap.requestFullscreen({ navigationUI: 'hide' }); if (fp && fp.then) fp.then(() => { try { screen.orientation.lock('landscape').catch(() => { }); } catch (e) { } }, () => { }); } catch (e) { } } try { const p = wrap.requestPointerLock(); if (p && p.catch) p.catch(() => { }); } catch (er) { } }
    on(document, 'pointerlockchange', () => { wrap.classList.toggle('unlocked', document.pointerLockElement !== wrap); if (document.pointerLockElement !== wrap) inp.fire = 0; });
    on(document, 'mouseup', () => { inp.fire = 0; }); on(wrap, 'contextmenu', e => e.preventDefault()); on(wrap, 'wheel', e => { if (document.pointerLockElement === wrap) { e.preventDefault(); swap(); } }, { passive: false });
    const tch = {};
    on(wrap, 'touchstart', e => {
      AU.init(); if (!wrap.classList.contains('touch')) { wrap.classList.add('touch', 'fs'); wrap.classList.remove('unlocked'); }
      for (const t of e.changedTouches) { const z = t.target.closest && t.target.closest('[data-tc]'); if (!z) continue; e.preventDefault(); const r = z.dataset.tc; tch[t.identifier] = { r, x: t.clientX, y: t.clientY, ox: t.clientX, oy: t.clientY }; if (r === 'fire') { inp.fire = 1; inp.held = 0; } if (r === 'jump') inp.jp = 1; if (r === 'act') inp.act = 1; if (r === 'look' && my() && !my().al) spec++; if (r === 'joy') { const b = wrap.getBoundingClientRect(); el.stick.style.display = 'block'; el.stick.style.left = (t.clientX - b.left) + 'px'; el.stick.style.top = (t.clientY - b.top) + 'px'; } }
    }, { passive: false });
    on(wrap, 'touchmove', e => {
      for (const t of e.changedTouches) { const c = tch[t.identifier]; if (!c) continue; e.preventDefault();
        if (c.r === 'joy') { const dx = (t.clientX - c.ox) / 44, dy = (t.clientY - c.oy) / 44, l = Math.max(1, Math.hypot(dx, dy)); inp.s = dx / l; inp.f = -dy / l; el.stick.firstChild.style.transform = `translate(${inp.s * 28}px,${-inp.f * 28}px)`; }
        else if (c.r === 'look' || c.r === 'fire') { const s = .0052 * CFG.sens * (self.zoom ? .3 : 1); self.a = C.nrm(self.a + (t.clientX - c.x) * s); self.pi = Math.max(-1.45, Math.min(1.45, self.pi - (t.clientY - c.y) * s)); c.x = t.clientX; c.y = t.clientY; } }
    }, { passive: false });
    const tend = e => { for (const t of e.changedTouches) { const c = tch[t.identifier]; if (!c) continue; delete tch[t.identifier]; if (c.r === 'joy') { inp.f = inp.s = 0; el.stick.style.display = 'none'; el.stick.firstChild.style.transform = ''; } if (c.r === 'fire') inp.fire = 0; if (c.r === 'jump') inp.jp = 0; if (c.r === 'act') inp.act = 0; } };
    on(wrap, 'touchend', tend); on(wrap, 'touchcancel', tend);
    on(wrap, 'click', e => {
      const b = e.target.closest('[data-k],[data-w],[data-sk],[data-q]'); if (!b || b.disabled) return; e.stopPropagation(); AU.init();
      if (b.dataset.w) { toHost(['buy', b.dataset.w]); AU.play('buy'); return; }
      if (b.dataset.sk != null) { CFG.skin = +b.dataset.sk; saveCfg(); sendLook(); if (chars[me]) dropChar(me); vmKey = ''; cache.set = null; drawSet(); return; }
      if (b.dataset.q != null) { CFG.q = +b.dataset.q; saveCfg(); applyQ(); cache.set = null; drawSet(); return; }
      const k = b.dataset.k; if (k === 'quit') { try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { } wrap.classList.remove('fs'); const lv = document.querySelector('[data-act="leave"]'); if (lv && confirm('الخروج من المباراة؟')) lv.click(); return; } if (k === 'fs') fs(); else if (k === 'face') el.file.click(); else if (k === 'tab') tab = !tab; else if (k === 'rel') reload(); else if (k === 'zoom') toggleZoom(); else if (k === 'sw') swap(); else if (k === 'tpv') { tpv = !tpv; } else if (k === 'cr') { inp.cr = inp.cr ? 0 : 1; el.crB.classList.toggle('on', !!inp.cr); } else if (k === 'buy' || k === 'buyx') toggleBuy(); else if (k === 'set' || k === 'setx') toggleSet(); else if (k === 'lefty') { CFG.lefty = CFG.lefty ? 0 : 1; saveCfg(); applyQ(); cache.set = null; drawSet(); }
    });
    on(el.set, 'input', e => { const k = e.target.dataset.c; if (!k) return; CFG[k] = +e.target.value; saveCfg(); applyQ(); const o = e.target.nextElementSibling; if (o) o.textContent = k === 'fov' ? CFG.fov : Math.round(CFG[k] * 100) + '%'; });
    on(el.file, 'change', () => { const f = el.file.files[0]; el.file.value = ''; if (f && window.DW && DW.setFace) DW.setFace(f).then(() => { setFaceImg(me, DW.P.face); sendLook(); }, () => { }); });
    on(window, 'dw-face', () => sendLook());
    function fs() { const onNow = wrap.classList.toggle('fs'); try { if (onNow) { const p = wrap.requestFullscreen && wrap.requestFullscreen(); if (p && p.then) p.then(() => { try { screen.orientation.lock('landscape').catch(() => { }); } catch (e) { } }, () => { }); } else if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { } }
    on(document, 'fullscreenchange', () => { });
    let buyOpen = true, setOpen = false;
    function toggleBuy() { buyOpen = !buyOpen; cache.buy = null; } function toggleSet() { setOpen = !setOpen; el.set.hidden = !setOpen; if (setOpen) { drawSet(); if (document.pointerLockElement === wrap) document.exitPointerLock(); } }
    function drawSet() {
      setH('set', el.set, `<h4>الإعدادات <button data-k="setx">✕</button></h4>
        <label>حساسية التصويب <input type="range" min=".3" max="3" step=".05" value="${CFG.sens}" data-c="sens" id="sk_sens"><span>${Math.round(CFG.sens * 100)}%</span></label>
        <label>الصوت العام <input type="range" min="0" max="1" step=".05" value="${CFG.vol}" data-c="vol" id="sk_vol"><span>${Math.round(CFG.vol * 100)}%</span></label>
        <label>المؤثرات والطلقات <input type="range" min="0" max="1.5" step=".05" value="${CFG.sfx}" data-c="sfx"><span>${Math.round(CFG.sfx * 100)}%</span></label>
        <label>الخطوات <input type="range" min="0" max="1.5" step=".05" value="${CFG.stepv}" data-c="stepv"><span>${Math.round(CFG.stepv * 100)}%</span></label>
        <label>الأجواء <input type="range" min="0" max="1" step=".05" value="${CFG.ambv}" data-c="ambv"><span>${Math.round(CFG.ambv * 100)}%</span></label>
        <label>التنبيهات <input type="range" min="0" max="1" step=".05" value="${CFG.uiv}" data-c="uiv"><span>${Math.round(CFG.uiv * 100)}%</span></label>
        <label>مجال الرؤية <input type="range" min="60" max="100" step="1" value="${CFG.fov}" data-c="fov" id="sk_fov"><span>${CFG.fov}</span></label>
        <label>حجم أزرار اللمس <input type="range" min=".7" max="1.5" step=".05" value="${CFG.btn}" data-c="btn" id="sk_btn"><span>${Math.round(CFG.btn * 100)}%</span></label>
        <div class="row">جودة الرسم: ${['منخفضة', 'متوسطة', 'عالية', 'فائقة'].map((n, i) => `<button data-q="${i}" class="${CFG.q === i ? 'on' : ''}">${n}</button>`).join('')}</div>
        <div class="row">الشخصية: ${(window.SKM && SKM.ready() ? SKM.CHARS : SKW.OUTFITS).map((o, i) => `<button data-sk="${i}" class="${CFG.skin === i ? 'on' : ''}">${o.n}</button>`).join('')}</div>
        <div class="row"><button data-k="face">📷 صورة وجهي على الشخصية</button><button data-k="lefty" class="${CFG.lefty ? 'on' : ''}">أزرار لليد اليسرى</button></div>`);
    }
    function applyQ() {
      wrap.style.setProperty('--bs', CFG.btn); wrap.classList.toggle('lefty', !!CFG.lefty); AU.setVol(); if (!R) return;
      R.setPixelRatio(Math.min(window.devicePixelRatio || 1, [1, 1.5, 2, 2][CFG.q] || 2) * (CFG.q ? 1 : .8)); world.sun.castShadow = CFG.q > 0; R.shadowMap.autoUpdate = CFG.q > 1; shadowKick = 3; cache.size = null;
      const ms = CFG.q > 2 ? 4096 : CFG.q > 1 ? 2048 : 1024; if (world.sun.shadow.mapSize.x !== ms) { world.sun.shadow.mapSize.set(ms, ms); if (world.sun.shadow.map) { world.sun.shadow.map.dispose(); world.sun.shadow.map = null; } }
      if (CFG.q >= 2) loadPost().then(() => { compKey = ''; }); else compKey = '';
    }
    function reload() { const w = WP[curW()], p = my(); if (w && !self.rel && !self.sw && self.ammo[self.slot] < w.mag && p && p.al) { self.rel = performance.now() + w.rel; self.relD = w.rel; self.zoom = 0; AU.play('rel', null, null, 1, w.rel); } }
    function toggleZoom() { if (WP[curW()].zoom && !self.rel && !self.sw) self.zoom = self.zoom ? 0 : 1; }
    function swap(to) { const p = my(); if (!p || !p.al || !self.w) return; const n = to == null ? (self.slot ? 0 : 1) : to; if (n === self.slot) return; self.slot = n; self.sw = performance.now() + 320; self.rel = 0; self.zoom = 0; self.heat = 0; AU.play('sw'); }
    /* ---- مؤثرات ---- */
    function addHole(x, y, z, kind, side) {
      const h = holes[holeI++ % holes.length]; h.visible = true; h.material.opacity = .9; h.userData.t = performance.now();
      if (kind === 'w') { if (side === 0) { h.position.set(x - C.R3.sx * .006, z, y); h.rotation.set(0, C.R3.sx > 0 ? -Math.PI / 2 : Math.PI / 2, 0); } else { h.position.set(x, z, y - C.R3.sy * .006); h.rotation.set(0, C.R3.sy > 0 ? Math.PI : 0, 0); } } else if (kind === 'c') { h.position.set(x, z - .006, y); h.rotation.set(Math.PI / 2, 0, 0); } else { h.position.set(x, z + .006, y); h.rotation.set(-Math.PI / 2, 0, 0); }
    }
    /* ---- جسيمات: شرر مضيء (جمع ضوئي) وحطام يسقط بالجاذبية (شظايا، نشارة، دم)، وأغلفة رصاص ---- */
    const FX = { spk: null, deb: null, shells: [], shI: 0 };
    function mkPts(n, add, size, map) {
      const g = new T.BufferGeometry(), pos = new Float32Array(n * 3), col = new Float32Array(n * 3); for (let i = 0; i < n; i++) pos[i * 3 + 1] = -99;
      g.setAttribute('position', new T.BufferAttribute(pos, 3)); g.setAttribute('color', new T.BufferAttribute(col, 3));
      const p = new T.Points(g, new T.PointsMaterial({ size, vertexColors: true, transparent: true, depthWrite: false, blending: add ? T.AdditiveBlending : T.NormalBlending, map, alphaTest: add ? 0 : .3 }));
      p.frustumCulled = false; world.scene.add(p);
      return { p, n, i: 0, add, v: new Float32Array(n * 3), life: new Float32Array(n), max: new Float32Array(n), base: new Float32Array(n * 3) };
    }
    function emit(P, x, y, z, n, sp, up, life, r, g, b, nx, ny) {
      if (!P) return; const pos = P.p.geometry.attributes.position.array, col = P.p.geometry.attributes.color.array;
      for (let k = 0; k < n; k++) { const i = P.i++ % P.n, j = i * 3, jit = .7 + Math.random() * .6; pos[j] = x; pos[j + 1] = z; pos[j + 2] = y;
        P.v[j] = ((Math.random() - .5) * sp + (nx || 0) * sp * .8); P.v[j + 1] = (Math.random() * up + up * .3); P.v[j + 2] = ((Math.random() - .5) * sp + (ny || 0) * sp * .8);
        P.life[i] = P.max[i] = life * jit; P.base[j] = r * jit; P.base[j + 1] = g * jit; P.base[j + 2] = b * jit; col[j] = r; col[j + 1] = g; col[j + 2] = b; }
    }
    function stepPts(P, dt, grav) {
      if (!P) return; const pos = P.p.geometry.attributes.position.array, col = P.p.geometry.attributes.color.array; let any = false;
      for (let i = 0; i < P.n; i++) { if (P.life[i] <= 0) continue; any = true; const j = i * 3; P.life[i] -= dt; if (P.life[i] <= 0) { pos[j + 1] = -99; continue; }
        P.v[j + 1] -= grav * dt; pos[j] += P.v[j] * dt; pos[j + 1] += P.v[j + 1] * dt; pos[j + 2] += P.v[j + 2] * dt;
        if (pos[j + 1] < .01) { pos[j + 1] = .01; P.v[j + 1] *= -.3; P.v[j] *= .5; P.v[j + 2] *= .5; }
        if (P.add) { const f = P.life[i] / P.max[i]; col[j] = P.base[j] * f; col[j + 1] = P.base[j + 1] * f * f; col[j + 2] = P.base[j + 2] * f * f; } }
      if (any) { P.p.geometry.attributes.position.needsUpdate = true; P.p.geometry.attributes.color.needsUpdate = true; }
    }
    /* شرر/حطام حسب السطح عند ارتطام الرصاصة */
    function sparks(x, y, z, k, hx, hy) {
      const s = surf(hx, hy, k), nx = (x - hx) * 30, ny = (y - hy) * 30;
      if (s === 'metal') { emit(FX.spk, x, y, z, 12, 3.2, 1.6, .38, 1, .75, .35, nx, ny); emit(FX.deb, x, y, z, 3, 1.2, 1, .5, .2, .2, .22, nx, ny); }
      else if (s === 'wood') { emit(FX.deb, x, y, z, 8, 1.6, 1.4, .7, .55, .38, .2, nx, ny); }
      else if (s === 'dirt') { emit(FX.deb, x, y, z, 7, 1.1, 1.5, .55, .5, .44, .34, nx, ny); }
      else { emit(FX.deb, x, y, z, 6, 1.5, 1.3, .6, .62, .6, .56, nx, ny); if (Math.random() < .5) emit(FX.spk, x, y, z, 3, 2.4, 1, .14, 1, .7, .3, nx, ny); }
    }
    /* أغلفة الطلقات: تُقذف من يمين السلاح وترتد على الأرض */
    function shell(wn) {
      const sh = FX.shells[FX.shI++ % FX.shells.length]; if (!sh) return; const ca = Math.cos(self.a), sa = Math.sin(self.a), ez = (self.z || 0) + self.eye;
      sh.visible = true; sh.material = wn === 'shotgun' ? FX.shellM[1] : FX.shellM[0]; sh.position.set(self.x + ca * .28 - sa * .16, ez - .1, self.y + sa * .28 + ca * .16);
      sh.userData = { v: [-sa * 1.6 + (Math.random() - .5) * .5, 1.3 + Math.random() * .6, ca * 1.6 + (Math.random() - .5) * .5], w: [Math.random() * 20, Math.random() * 20], life: 2.2, fl: self.z || 0 };
    }
    function stepShells(dt) { for (const sh of FX.shells) { if (!sh.visible) continue; const u = sh.userData; u.life -= dt; if (u.life <= 0) { sh.visible = false; continue; } u.v[1] -= 12 * dt; sh.position.x += u.v[0] * dt; sh.position.y += u.v[1] * dt; sh.position.z += u.v[2] * dt; sh.rotation.x += u.w[0] * dt; sh.rotation.z += u.w[1] * dt; if (sh.position.y < u.fl + .01) { sh.position.y = u.fl + .01; u.v[1] *= -.35; u.v[0] *= .55; u.v[2] *= .55; u.w[0] *= .5; u.w[1] *= .5; } } }
    function puff(x, y, z, col, n, sp, life, size) { for (let i = 0; i < n; i++) { const p = puffs[puffI++ % puffs.length]; p.visible = true; p.position.set(x, z, y); p.material.color.setHex(col); p.userData = { t: performance.now(), life: life * (.7 + Math.random() * .6), vx: (Math.random() - .5) * sp, vy: Math.random() * sp * .8, vz: (Math.random() - .5) * sp, s: size }; p.scale.setScalar(size * .4); } }
    function tracer(x0, y0, z0, x1, y1, z1) { const tr = tracers[trI++ % tracers.length], a = tr.geometry.attributes.position; a.setXYZ(0, x0, z0, y0); a.setXYZ(1, x1, z1, y1); a.needsUpdate = true; tr.visible = true; tr.material.opacity = .85; tr.userData.t = performance.now(); }
    /* صوت الارتطام حسب نوع السطح */
    function surf(x, y, k) { const M = AU.m; if (!M) return 'conc'; const c = M.ch[(y | 0) * M.w + (x | 0)] || '.'; if (k === 'f') return M.ind[(y | 0) * M.w + (x | 0)] ? 'conc' : 'dirt'; if ('KSv'.includes(c)) return 'metal'; if (c === 'c' || c === 'p') return 'wood'; if (c === 'x') return 'dirt'; return 'conc'; }
    function impactSound(x, y, z, k) { if (Math.hypot(x - AU.lx, y - AU.ly) < 28) AU.play('imp_' + surf(x, y, k), x, y, .8); }
    function impact(ox, oy, oz, dx, dy, dz, t) { const k = C.R3.kind, sd = C.R3.side, x = ox + dx * t, y = oy + dy * t, z = oz + dz * t; if (!k) return; addHole(x, y, z, k, sd); impactSound(x + dx * .03, y + dy * .03, z, k); sparks(x - dx * .02, y - dy * .02, z - dz * .02, k, x + dx * .03, y + dy * .03); puff(x - dx * .03, y - dy * .03, z - dz * .03, world.theme.floor === 'cobble' ? 0xb9b2a2 : 0xcbb894, 3, .6, 420, .16); }
    function shotFx(id, slot, yaw, pitch) {
      const P = Ppos[id], p = S && S.pl[id]; if (!P || !p || id === me) return; const w = slot && p.w ? p.w : 'pistol', ez = C.BODY[P.fl & 1 ? 1 : 0].head - .06, cp = Math.cos(pitch), dx = Math.cos(yaw) * cp, dy = Math.sin(yaw) * cp, dz = Math.sin(pitch), t = C.ray3(m, P.x, P.y, ez, dx, dy, dz, 60);
      impact(P.x, P.y, ez, dx, dy, dz, t); tracer(P.x + dx * .35, P.y + dy * .35, ez - .03, P.x + dx * t, P.y + dy * t, ez + dz * t); if (chars[id]) chars[id].kick = 1; AU.play(w, P.x, P.y, 1);
      { const mp = S.pl[me]; if (mp && mp.al && mp.tm !== p.tm) { const ex = self.x - P.x, ey = self.y - P.y, ep = ex * dx + ey * dy; if (ep > .5 && ep < t) { const cx = P.x + dx * ep, cy = P.y + dy * ep, md = Math.hypot(self.x - cx, self.y - cy); if (md < 1.1 && md > .15) AU.play('whiz', cx, cy, 1 - md * .5); } } }
    }
    function explode(x, y) { AU.play('boom', x, y, 2.5); puff(x, y, .4, 0x3a3530, 16, 2.6, 2200, 1.6); puff(x, y, .5, 0xff9a3c, 10, 3.5, 600, 1.1); boom = { t: performance.now(), x, y }; if (Math.hypot(x - self.x, y - self.y) < 12) self.shake = performance.now(); }
    function dropChar(id) { const c = chars[id]; if (!c) return; world.scene.remove(c.root); c.dispose(); if (c.tag) { c.tag.material.map.dispose(); c.tag.material.dispose(); } delete chars[id]; }
    function getChar(id) {
      if (chars[id]) return chars[id]; const p = S.pl[id], so = { outfit: id === me ? CFG.skin : skins[id] != null ? skins[id] : (X.H.isBot(id) ? (id.charCodeAt(id.length - 1) % 4) : 0), team: p.tm, face: faces[id] }, c = (window.SKM && SKM.ready() && SKM.character(so)) || SKW.soldier(T, so); world.scene.add(c.root);
      const tc = document.createElement('canvas'); tc.width = 256; tc.height = 48; const x = tc.getContext('2d'); x.font = '700 34px "Readex Pro",sans-serif'; x.textAlign = 'center'; x.lineWidth = 5; x.strokeStyle = 'rgba(0,0,0,.8)'; x.strokeText(X.H.nm(id), 128, 32); x.fillStyle = '#fff'; x.fillText(X.H.nm(id), 128, 32);
      const tx = new T.CanvasTexture(tc); tx.colorSpace = T.SRGBColorSpace; c.tag = new T.Sprite(new T.SpriteMaterial({ map: tx, transparent: true, depthTest: false, fog: false, sizeAttenuation: false })); c.tag.scale.set(.3, .056, 1); c.tag.position.y = 1.05; c.tag.renderOrder = 5; c.root.add(c.tag); return chars[id] = c;
    }
    /* ---- إطلاق النار: مسار ثلاثي الأبعاد حقيقي مع صناديق إصابة للرأس والجسم ---- */
    function shoot(now) {
      const wn = curW(), w = WP[wn], p = my(), moving = now - self.mvT < 120, pad = wrap.classList.contains('touch') ? .05 : 0, hits = {};
      const sp = (w.zoom ? (self.zoom ? .0008 : .06) : w.sp) * (1 + self.heat * 2.2) * (moving ? 2.2 : 1) * (self.cr > .5 ? .7 : 1), ez = (self.z || 0) + self.eye, ay = self.a + self.ry, ap = self.pi + self.rp; let cx = 0, cy = 0, cz = 0;
      for (let i = 0; i < (w.pel || 1); i++) {
        const a = ay + (Math.random() - .5) * 2 * sp, pp = ap + (Math.random() - .5) * 2 * sp, cp = Math.cos(pp), dx = Math.cos(a) * cp, dy = Math.sin(a) * cp, dz = Math.sin(pp); let t = C.ray3(m, self.x, self.y, ez, dx, dy, dz, 70), best = null, part = 0; const kind = C.R3.kind, side = C.R3.side, sx = C.R3.sx, sy = C.R3.sy;
        for (const id in S.pl) { const q = S.pl[id], Q = Ppos[id]; if (id === me || !q.al || q.tm === p.tm || !Q) continue; if (C.hitPlayer(self.x, self.y, ez, dx, dy, dz, Q.x, Q.y, Q.fl & 1, pad) && C.H3.t < t) { t = C.H3.t; best = id; part = C.H3.part; } }
        if (best) { const h = hits[best] || (hits[best] = [0, 0]); h[0]++; h[1] = h[1] || part; puff(self.x + dx * t, self.y + dy * t, ez + dz * t, 0x8a1010, part ? 5 : 3, 1.1, 300, part ? .16 : .12); emit(FX.deb, self.x + dx * t, self.y + dy * t, ez + dz * t, part ? 12 : 7, 1.4, 1.2, .6, .5, .04, .04, dx, dy); }
        else { C.R3.kind = kind; C.R3.side = side; C.R3.sx = sx; C.R3.sy = sy; impact(self.x, self.y, ez, dx, dy, dz, t); }
        if (!i) { cx = dx * t; cy = dy * t; cz = dz * t; }
      }
      const ca = Math.cos(self.a), sa = Math.sin(self.a); tracer(self.x + ca * .4 - sa * .09, self.y + sa * .4 + ca * .09, ez - .07, self.x + cx, self.y + cy, ez + cz);
      for (const id in hits) { toHost(['h', id, hits[id][1], self.slot && self.w ? 1 : 0, hits[id][0]]); self.hitT = now; self.hs = hits[id][1]; }
      toHost(['f', self.slot && self.w ? 1 : 0, C.r2(ay), C.r2(ap)]); AU.play(wn); shell(wn); if (world && flashL) emit(FX.spk, self.x + Math.cos(ay) * .55, self.y + Math.sin(ay) * .55, ez - .06, 4, 1.2, .3, .06, 1, .8, .45, Math.cos(ay), Math.sin(ay)); self.kick = 1; if (chars[me]) chars[me].kick = 1; self.last = now; self.ammo[self.slot]--; self.rp += w.rec * (.7 + Math.random() * .6); self.ry += (Math.random() - .5) * w.rec * .9; self.heat = Math.min(1, self.heat + (w.auto ? .13 : .3)); flashL.intensity = 5; if (w.zoom) self.zoom = 0;
    }
    /* ---- التهيئة ثلاثية الأبعاد ---- */
    function init3() {
      T = window.THREE; R = new T.WebGLRenderer({ canvas: cv, antialias: CFG.q > 0, powerPreference: 'high-performance' }); R.autoClear = false; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 1.12; R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
      cam = new T.PerspectiveCamera(CFG.fov, 16 / 9, .03, 140); cam.rotation.order = 'YXZ'; world = SKW.build(T, m, CFG.q); AU.m = m; world.scene.add(cam); if (SKW.envMap && CFG.q > 0) { try { world.scene.environment = SKW.envMap(T, R, m.theme); } catch (e) { } }
      vmScene = new T.Scene(); vmScene.add(new T.HemisphereLight(0xffffff, 0x77705f, 2.2)); const dl = new T.DirectionalLight(0xffffff, 1.6); dl.position.set(-1, 2, 1); vmScene.add(dl); vmCam = new T.PerspectiveCamera(58, 16 / 9, .01, 4);
      flashL = new T.PointLight(0xffc56a, 0, 7, 1.5); world.scene.add(flashL);
      const ht = SKW.tex('hole', 32, 32, (x) => { const g = x.createRadialGradient(16, 16, 1, 16, 16, 15); g.addColorStop(0, 'rgba(10,8,6,1)'); g.addColorStop(.4, 'rgba(30,25,20,.8)'); g.addColorStop(1, 'rgba(30,25,20,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); }, true), pt = SKW.tex('puff', 32, 32, (x) => { const g = x.createRadialGradient(16, 16, 1, 16, 16, 15); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); }, true), hg = new T.PlaneGeometry(.075, .075);
      for (let i = 0; i < 70; i++) { const h = new T.Mesh(hg, new T.MeshBasicMaterial({ map: ht, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 })); h.visible = false; world.scene.add(h); holes.push(h); }
      for (let i = 0; i < 48; i++) { const s = new T.Sprite(new T.SpriteMaterial({ map: pt, transparent: true, depthWrite: false })); s.visible = false; world.scene.add(s); puffs.push(s); }
      FX.spk = mkPts(220, true, .075, pt); FX.deb = mkPts(260, false, .035, pt); FX.shellM = [new T.MeshStandardMaterial({ color: 0xc9a13b, metalness: .8, roughness: .35 }), new T.MeshStandardMaterial({ color: 0xa3261f, roughness: .6 })]; const sg = new T.CylinderGeometry(.009, .009, .034, 6); for (let i = 0; i < 18; i++) { const sh = new T.Mesh(sg, FX.shellM[0]); sh.visible = false; world.scene.add(sh); FX.shells.push(sh); }
      for (let i = 0; i < 20; i++) { const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3)); const l = new T.Line(g, new T.LineBasicMaterial({ color: 0xfff0b0, transparent: true })); l.visible = false; l.frustumCulled = false; world.scene.add(l); tracers.push(l); }
      bombMesh = new T.Group(); const bb = new T.Mesh(new T.BoxGeometry(.2, .1, .14), new T.MeshLambertMaterial({ color: 0x2a2d31 })); bb.position.y = .05; bombMesh.add(bb); for (const s of [-.05, 0, .05]) { const c = new T.Mesh(new T.CylinderGeometry(.02, .02, .19, 8), new T.MeshLambertMaterial({ color: 0xb23a2a })); c.rotation.z = Math.PI / 2; c.position.set(0, .12, s); bombMesh.add(c); } const led = new T.Mesh(new T.SphereGeometry(.018, 8, 6), new T.MeshBasicMaterial({ color: 0xff2020 })); led.position.set(.06, .11, .075); bombMesh.add(led); bombMesh.userData.led = led; bombMesh.visible = false; world.scene.add(bombMesh);
      boomMesh = new T.Mesh(new T.SphereGeometry(1, 16, 12), new T.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: .8, fog: false })); boomMesh.visible = false; world.scene.add(boomMesh);
      applyQ(); AU.init(); AU.ambient(world.theme.amb); el.load.hidden = true; started = true;
    }
    let boomMesh;
    /* المعالجة اللاحقة (عالية/فائقة): توهّج للأضواء والومضات، وظلال محيطة في الزوايا (فائقة)، ونعومة حواف متعددة العينات */
    function postSetup() {
      const key = CFG.q >= 2 && window.GLP ? CFG.q + '|' + world.scene.uuid : '';
      if (key === compKey) return; compKey = key;
      if (comp) { comp.passes.forEach(p => p.dispose && p.dispose()); comp.renderTarget1.dispose(); comp.renderTarget2.dispose(); comp = null; }
      if (!key) return;
      try {
        const sz = R.getSize(new T.Vector2()), rt = new T.WebGLRenderTarget(sz.x * R.getPixelRatio(), sz.y * R.getPixelRatio(), { type: T.HalfFloatType, samples: 4 });
        comp = new GLP.EffectComposer(R, rt); comp.setPixelRatio(R.getPixelRatio()); comp.setSize(sz.x, sz.y);
        comp.addPass(new GLP.RenderPass(world.scene, cam));
        if (CFG.q > 2 && GLP.GTAOPass) { const ao = new GLP.GTAOPass(world.scene, cam, sz.x, sz.y); ao.updateGtaoMaterial({ radius: .5, distanceExponent: 1.5, thickness: 1, scale: 1.1 }); ao.blendIntensity = .85; comp.addPass(ao); }
        comp.addPass(new GLP.UnrealBloomPass(new T.Vector2(sz.x, sz.y), CFG.q > 2 ? .32 : .24, .5, .93));
        comp.addPass(new GLP.OutputPass());
      } catch (e) { comp = null; }
    }
    function resize() { const r = wrap.getBoundingClientRect(), k = (r.width | 0) + 'x' + (r.height | 0); if (!r.height || cache.size === k) return; cache.size = k; R.setSize(r.width, r.height, false); if (comp) { comp.setPixelRatio(R.getPixelRatio()); comp.setSize(r.width, r.height); } cam.aspect = vmCam.aspect = r.width / r.height; cam.updateProjectionMatrix(); vmCam.updateProjectionMatrix(); }
    function setVM(now) {
      const key = curW() + '|' + CFG.skin; if (key !== vmKey) { if (vm) { vmScene.remove(vm); if (vm.userData.dispose) vm.userData.dispose(); else vm.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); }); } vmKey = key; vm = SKW.viewModel(T, curW(), CFG.skin); vmScene.add(vm); }
      if (vm) vm.visible = !tpv;
      const long = curW() !== 'pistol', swp = self.sw ? Math.max(0, (self.sw - now) / 320) : 0, relp = self.rel ? 1 - Math.max(0, (self.rel - now) / self.relD) : 0, rl = self.rel ? Math.sin(relp * Math.PI) : 0, k = self.kick, mvb = Math.min(1, self.mvS);
      vm.position.set((long ? .1 : .115) + Math.sin(self.bob) * .006 * mvb - self.swayX, (long ? -.105 : -.115) - Math.abs(Math.cos(self.bob)) * .006 * mvb - swp * .25 - rl * .1 + self.swayY, (long ? -.3 : -.4) + k * .04);
      vm.rotation.set(k * .1 - rl * .7 + swp * .8, .07 - self.swayX * 1.5 + rl * .25, rl * .35); if (vm.userData.left) vm.userData.left.position.y = (long ? 0 : -.04) - rl * .12; if (vm.userData.tick) vm.userData.tick(now, vmCam);
    }
    /* ---- الواجهة ---- */
    const fmt = ms => { const s = Math.ceil(Math.max(0, ms) / 1000); return (s / 60 | 0) + ':' + String(s % 60).padStart(2, '0'); };
    function hud(now, p, watching) {
      const tm = p ? p.tm : 0, bombOn = S.bomb && S.ph === 'live', tl = (bombOn ? S.bomb._dl : S._dl) - performance.now(), sc = el.sc.children;
      setT('s0', sc[0].firstChild, S.sc[0]); setT('s1', sc[2].firstChild, S.sc[1]); setT('tm', sc[1].firstChild, (bombOn ? '💣 ' : '') + fmt(tl)); setT('rdn', sc[1].lastChild, `الجولة ${S.rd} · الفوز بـ ${S.tg}`); sc[1].className = bombOn ? 'bomb' : '';
      const alive = p && p.al && !watching; el.x.style.display = alive ? '' : 'none'; el.vit.style.display = el.ammo.style.display = p && !watching && p.al ? '' : 'none';
      if (alive) {
        const g = 5 + self.heat * 14 + (now - self.mvT < 120 ? 7 : 0) + (self.cr > .5 ? -1 : 0); el.x.style.setProperty('--g', g.toFixed(0) + 'px'); const hb = el.x.lastChild, ht = now - self.hitT; hb.style.opacity = ht < 160 ? 1 : 0; hb.className = self.hs ? 'hs' : '';
        setT('hp', el.vit.children[0].lastChild, p.hp); el.vit.children[0].className = 'hp' + (p.hp <= 35 ? ' low' : ''); if (cache.hpv !== p.hp) { cache.hpv = p.hp; el.vit.style.setProperty('--hp', Math.max(0, p.hp) + '%'); el.vit.style.setProperty('--hc', p.hp > 60 ? '#5fd38a' : p.hp > 30 ? '#f5c043' : '#ff5a5a'); } setT('ar', el.vit.children[1].lastChild, p.ar); el.vit.children[1].style.display = p.ar ? '' : 'none'; setT('$', el.vit.children[2], '$' + p.$);
        const w = WP[curW()]; setT('am', el.ammo.children[0], self.rel ? '…' : self.ammo[self.slot]); setT('mg', el.ammo.children[1], '/' + w.mag); setT('wn', el.ammo.children[2], w.n + (self.w ? (self.slot ? '  [2: مسدس]' : `  [1: ${WP[self.w].n}]`) : '')); el.ammo.children[0].style.color = self.ammo[self.slot] ? '' : '#ff6b6b';
      }
      el.vig.style.opacity = now - self.hurtT < 260 ? .8 : 0; if (self.dmgT && now - self.dmgT < 900) { el.dmg.style.opacity = 1; el.dmg.style.transform = `rotate(${C.nrm(self.dmgA - self.a) }rad)`; } else el.dmg.style.opacity = 0;
      wrap.classList.toggle('scoped', !!(self.zoom && alive));
      let ban = '', hint = '';
      if (S.ph === 'freeze') ban = `<b>الجولة ${S.rd}</b><span style="color:${TC[tm]}">أنت مع ${TN[tm]} — ${tm ? 'احموا الموقعين A و B وأبطلوا القنبلة' : 'ازرعوا القنبلة في A أو B'}</span><br><span>تبدأ بعد ${Math.ceil(tl / 1000)}</span>`;
      else if (S.ph === 'end' || S.ph === 'over') ban = `<b style="color:${TC[S.lw]}">${S.ph === 'over' ? 'انتهت المباراة — ' : ''}فاز ${TN[S.lw]}</b><span>${esc(S.msg || '')}</span>`;
      else if (now < liveBan) ban = '<b>انطلقوا!</b>'; else if (bombOn && now - (S.bomb._seen || (S.bomb._seen = now)) < 2500) ban = `<b style="color:#ff5a5a">زُرعت القنبلة!</b><span>${tm ? 'أبطلوها قبل الانفجار' : 'احموها حتى تنفجر'}</span>`;
      setH('ban', el.ban, ban);
      if (p && p.al && X.can && !wrap.classList.contains('touch')) hint = tm ? 'اضغط E مطوّلاً لإبطال القنبلة' : 'اضغط E مطوّلاً لزرع القنبلة'; setT('hint', el.hint, hint);
      const need = tm ? C.DEFUSE : C.PLANT; el.prog.hidden = !(self.act > 0); if (self.act > 0) el.prog.firstChild.style.width = Math.min(100, self.act * 1000 / need * 100) + '%';
      setT('spec', el.spec, p && !p.al ? (watching ? `تشاهد: ${X.H.nm(watching)} — ${wrap.classList.contains('touch') ? 'المس' : 'انقر'} للتبديل` : 'خرجتَ من الجولة') : '');
      if (now - hudT < 120) return; hudT = now;
      const fk = feed.filter(f => now - f.t < 6500).map(f => `<div class="${f.a === me || f.v === me ? 'me' : ''}"><b style="color:${TC[S.pl[f.a] ? S.pl[f.a].tm : 0]}">${esc(X.H.nm(f.a))}</b> ${f.hs ? '🎯' : '▸'} <small>${WP[f.w] ? WP[f.w].n : ''}</small> <b style="color:${TC[S.pl[f.v] ? S.pl[f.v].tm : 0]}">${esc(X.H.nm(f.v))}</b></div>`).join(''); setH('feed', el.feed, fk);
      setH('team', el.team, Object.keys(S.pl).filter(i => S.pl[i].tm === tm && i !== me).map(i => `<div class="${S.pl[i].al ? '' : 'dead'}" style="--c:${TC[tm]}"><span>${esc(X.H.nm(i))}</span><b>${S.pl[i].al ? S.pl[i].hp : '✕'}</b></div>`).join(''));
      /* الخريطة المصغرة */
      const mc = el.mm, k = mc.width / m.w; if (mc.height !== Math.round(m.h * k)) { mc.height = Math.round(m.h * k); mmBase = null; } const x = mc.getContext('2d');
      if (!mmBase) { mmBase = document.createElement('canvas'); mmBase.width = mc.width; mmBase.height = mc.height; const b = mmBase.getContext('2d'); for (let i = 0; i < m.w * m.h; i++) { const cx = i % m.w, cy = i / m.w | 0; b.fillStyle = m.g[i] === 1 ? 'rgba(235,240,245,.62)' : m.g[i] === 2 ? 'rgba(235,240,245,.28)' : m.st[i] ? 'rgba(245,182,46,.35)' : m.ind[i] ? 'rgba(120,150,190,.22)' : 'rgba(0,0,0,0)'; b.fillRect(cx * k, cy * k, k + .4, k + .4); } b.fillStyle = '#f5b62e'; b.font = 'bold 11px sans-serif'; b.textAlign = 'center'; b.fillText('A', m.sc.a[0] * k, m.sc.a[1] * k + 4); b.fillText('B', m.sc.b[0] * k, m.sc.b[1] * k + 4); }
      x.clearRect(0, 0, mc.width, mc.height); x.save(); x.beginPath(); x.arc(mc.width / 2, mc.height / 2, Math.min(mc.width, mc.height) / 2 - 1, 0, Math.PI * 2); x.clip(); x.fillStyle = "rgba(5,12,15,.6)"; x.fillRect(0, 0, mc.width, mc.height); x.drawImage(mmBase, 0, 0); x.restore(); x.beginPath(); x.arc(mc.width / 2, mc.height / 2, Math.min(mc.width, mc.height) / 2 - 1, 0, Math.PI * 2); x.lineWidth = 2; x.strokeStyle = "rgba(255,255,255,.4)"; x.stroke();
      for (const id in S.pl) { const q = S.pl[id], P = id === me ? self : Ppos[id]; if (!P || !q.al || (q.tm !== tm && id !== me)) continue; x.fillStyle = id === me ? '#fff' : TC[q.tm]; x.beginPath(); x.arc(P.x * k, P.y * k, id === me ? 3 : 2.5, 0, 7); x.fill(); if (id === me) { x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(P.x * k, P.y * k); x.lineTo((P.x + Math.cos(P.a) * 2.4) * k, (P.y + Math.sin(P.a) * 2.4) * k); x.stroke(); } }
      if (S.bomb && now % 600 < 400) { x.fillStyle = '#ff3b3b'; x.fillRect(S.bomb.x * k - 3, S.bomb.y * k - 3, 6, 6); }
      /* المتجر */
      const showBuy = !!(p && p.al && S.ph === 'freeze' && buyOpen && !setOpen), bk = showBuy ? [p.$, p.w, p.ar].join('|') : 'x'; el.buyB.hidden = !(p && p.al && S.ph === 'freeze'); el.buy.hidden = !showBuy;
      if (showBuy && cache.buy !== bk) { cache.buy = bk; const bar = (v, mx) => `<i style="--w:${Math.round(Math.min(1, v / mx) * 100)}%"></i>`; el.buy.innerHTML = `<h4>المتجر <em>$${p.$}</em><button data-k="buyx">✕ (B)</button></h4><div class="g">` + WK.slice(1).map(w => `<button data-w="${w}" class="${p.w === w ? 'own' : ''}" ${p.w === w || p.$ < WP[w].$ ? 'disabled' : ''}><b>${WP[w].n}</b><small>$${WP[w].$} · ${WP[w].mag} طلقة</small>${bar(WP[w].dmg * (WP[w].pel || 1), 110)}${bar(1000 / WP[w].rate, 13.5)}</button>`).join('') + `<button data-w="armor" class="${p.ar >= 100 ? 'own' : ''}" ${p.ar >= 100 || p.$ < C.ARMOR ? 'disabled' : ''}><b>🛡 درع واقٍ</b><small>$${C.ARMOR} · يمتص ثلث الضرر</small></button></div><p style="margin:8px 0 0;opacity:.75;font-size:11px">الشريطان: قوة الضرر ثم سرعة الإطلاق · المسدس معك دائماً</p>`; }
      const showTab = (tab || S.ph === 'over') && !setOpen; el.tab.hidden = !showTab;
      if (showTab) { const row = id => { const q = S.pl[id]; return `<tr class="${id === me ? 'me' : ''} ${q.al ? '' : 'dead'}"><td>${S.mvp === id ? '⭐ ' : ''}${esc(X.H.nm(id))}</td><td>${q.k}</td><td>${q.d}</td><td>${q.as}</td><td>${q.hs}</td><td>$${q.$}</td></tr>`; }; setH('tabh', el.tab, '<table>' + [0, 1].map(t => `<tr class="hd"><th style="color:${TC[t]}">${TN[t]} — ${S.sc[t]}</th><th>قتل</th><th>سقوط</th><th>مساعدة</th><th>رأس</th><th>رصيد</th></tr>` + Object.keys(S.pl).filter(i => S.pl[i].tm === t).sort((a, b) => S.pl[b].k - S.pl[a].k).map(row).join('')).join('') + '</table>'); }
      const sn = WP[curW()].zoom; el.zoom.hidden = !sn; el.act.hidden = !X.can; if (X.can) setT('actb', el.act, tm ? '✂️ أبطِل' : '💣 ازرع');
    }
    function frame() {
      if (dead) return; requestAnimationFrame(frame);
      if (!document.body.contains(wrap)) { if (++gone > 90) destroy(); return; } gone = 0; if (!started) return;
      const now = performance.now(), dt = Math.min(.05, (now - lastF) / 1000 || 0); lastF = now; resize();
      if (!S || !S.pl) { if (now - initT > 2500) { initT = now; sendInit(); } R.clear(); return; }
      if (S.ph === 'over' && !overSent && X.H.isHost()) { overSent = true; const fin = {}; for (const id in S.pl) { const q = S.pl[id]; fin[id] = [q.k, q.d, q.as, q.hs]; } X.send({ t: 'over', win: S.lw, fin, rs: S.sc.slice(), mvp: S.mvp }); }
      const p = S.pl[me], K = inp.k;
      if (p) {
        if (self.rd !== S.rd) { self.rd = S.rd; self.x = p.sp[0]; self.y = p.sp[1]; self.a = p.sp[2]; self.pi = 0; self.z = 0; self.vz = 0; self.gr = 1; for (const h of holes) h.visible = false; }
        if (cache.ph !== S.ph) { if (S.ph === 'freeze') { self.rel = 0; self.zoom = 0; self.act = 0; self.w = p.w; self.slot = p.w ? 1 : 0; self.ammo = [WP.pistol.mag, p.w ? WP[p.w].mag : 0]; buyOpen = true; inp.cr = 0; el.crB.classList.remove('on'); } else if (S.ph === 'live') liveBan = now + 1300; else if (S.ph === 'end' || S.ph === 'over') AU.play(S.lw === p.tm ? 'win' : 'lose'); cache.ph = S.ph; }
        if (self.w !== p.w) { self.w = p.w; if (p.w) { self.ammo[1] = WP[p.w].mag; self.slot = 1; self.sw = now + 320; } else self.slot = 0; self.rel = 0; self.zoom = 0; }
        self.hp = p.hp; const f = inp.f + (K.KeyW || K.ArrowUp ? 1 : 0) - (K.KeyS || K.ArrowDown ? 1 : 0), s = inp.s + (K.KeyD ? 1 : 0) - (K.KeyA ? 1 : 0), l = Math.hypot(f, s), tile = m.st[(self.y | 0) * m.w + (self.x | 0)], crouch = !!(inp.cr || K.KeyC || K.ControlLeft), walk = !!K.ShiftLeft;
        if (K.ArrowLeft) self.a = C.nrm(self.a - 2.4 * dt); if (K.ArrowRight) self.a = C.nrm(self.a + 2.4 * dt);
        X.can = !!(p.al && S.ph === 'live' && (p.tm === 0 ? tile && !S.bomb : S.bomb && Math.hypot(self.x - S.bomb.x, self.y - S.bomb.y) < 1.1)); const acting = X.can && (inp.act || K.KeyE) && l <= .05;
        self.cr += ((crouch || acting ? 1 : 0) - self.cr) * Math.min(1, dt * 12); self.eye = C.BODY[0].head - .02 - self.cr * (C.BODY[0].head - C.BODY[1].head); let run = false;
        if (p.al && S.ph !== 'freeze') {
          if (l > .05) { const sp = (self.zoom ? 1 : crouch ? 1.2 : walk ? 1.3 : 2.6) * (curW() === 'sniper' ? .88 : curW() === 'rifle' ? .95 : 1), v = sp * dt / Math.max(1, l), ca = Math.cos(self.a), sa = Math.sin(self.a); C.mv(m, self, (ca * f - sa * s) * v, (sa * f + ca * s) * v); self.bob += dt * sp * 3.6; self.mvT = now; self.mvS += (1 - self.mvS) * Math.min(1, dt * 8); run = sp > 2;
            if (run && (self.stepT -= dt) <= 0) { self.stepT = .34; AU.play('step_' + world.theme.step, null, null, .5); } } else self.mvS += (0 - self.mvS) * Math.min(1, dt * 8);
          if (acting) { if (!self.act) AU.play('beep'); self.act += dt; if (self.act * 1000 >= (p.tm ? C.DEFUSE : C.PLANT)) { toHost([p.tm ? 'df' : 'pl']); self.act = 0; } } else self.act = 0;
          const w = WP[curW()]; if (self.rel && now >= self.rel) { self.rel = 0; self.ammo[self.slot] = w.mag; } if (self.sw && now >= self.sw) self.sw = 0;
          const firing = inp.fire && !setOpen; if (!firing) inp.held = 0;
          if (firing && S.ph === 'live' && !self.rel && !self.sw && !acting && now - self.last >= w.rate && (w.auto || !inp.held)) { inp.held = 1; if (self.ammo[self.slot] > 0) shoot(now); else reload(); }
        } else { self.act = 0; self.mvS = 0; }
        if (el.hm) { const a = Math.max(0, 1 - (performance.now() - (self.hmT || 0)) / 260); el.hm.style.opacity = a.toFixed(3); el.hm.classList.toggle('hd', !!self.hmH && a > 0); }
        const jumpNow = !!(inp.jq || inp.jp) && S.ph === 'live' && !setOpen; inp.jq = 0;
        const wasAir = !self.gr, vz0 = self.vz || 0; if (p.al) { if (jumpNow && self.gr) AU.play('jump', null, null, .6); C.vert(m, self, dt, jumpNow); if (wasAir && self.gr && vz0 < -2.5) { AU.play('land', null, null, Math.min(1.2, -vz0 / 6)); self.land = performance.now(); } } else self.vz = 0;
        self.kick = Math.max(0, self.kick - dt * 8); self.rp *= Math.exp(-dt * 6); self.ry *= Math.exp(-dt * 6); self.heat = Math.max(0, self.heat - dt * 1.6);
        const fl = (self.cr > .5 ? 1 : 0) | (run ? 2 : 0) | (self.slot && self.w ? 4 : 0) | (acting ? 8 : 0);
        if (now - posT >= 66) { const q = `${C.r2(self.x)},${C.r2(self.y)},${C.r2(self.a)},${C.r2(self.pi)},${fl},${C.r2(self.z)}`; if (q !== lastSent || now - posT >= 700) { posT = now; lastSent = q; const msg = ['p', C.r2(self.x), C.r2(self.y), C.r2(self.a), C.r2(self.pi), fl, C.r2(self.z)]; if (sim) sim.msg(me, msg); else send(msg); } }
        const Me = Ppos[me] || (Ppos[me] = {}); Me.x = Me.tx = self.x; Me.y = Me.ty = self.y; Me.a = Me.ta = self.a; Me.pi = self.pi; Me.fl = fl; Me.z = self.z || 0;
      }
      /* اللاعبون الآخرون */
      const kk = 1 - Math.exp(-dt * 13); let vx = self.x, vy = self.y, va = self.a + self.ry, vp = self.pi + self.rp, vz = (self.z || 0) + self.eye, watching = null; viewId = me;
      if (p && !p.al && now - deathT > 1400) { const mates = Object.keys(S.pl).filter(i => i !== me && S.pl[i].al && Ppos[i] && S.pl[i].tm === p.tm); if (mates.length) { watching = mates[spec % mates.length]; const P = Ppos[watching]; vx = P.x; vy = P.y; va = P.a; vp = P.pi || 0; vz = (P.z || 0) + C.BODY[P.fl & 1 ? 1 : 0].head - .02; viewId = watching; } if (inp.fire && !inp.held) { inp.held = 1; spec++; } }
      else if (p && !p.al) { vz = Math.max(.15, self.eye - (now - deathT) / 1400 * .6); vp = self.pi - Math.min(.5, (now - deathT) / 1400 * .5); viewId = null; }
      let aimEn = false;
      for (const id in S.pl) {
        const q = S.pl[id], P = id === me ? Ppos[me] : Ppos[id]; if (!P) continue;
        if (id !== me && P.tx != null) { const ox = P.x, oy = P.y; const age = (now - (P.rt || now)) / 1000; if (age < .15 && P.vx != null && !C.cellSolid(m, P.tx + P.vx * dt, P.ty + P.vy * dt, P.tz || 0)) { P.tx += P.vx * dt; P.ty += P.vy * dt; } if (Math.hypot(P.tx - P.x, P.ty - P.y) > 4) { P.x = P.tx; P.y = P.ty; } P.x += (P.tx - P.x) * kk; P.y += (P.ty - P.y) * kk; if (P.tz != null) P.z = (P.z || 0) + (P.tz - (P.z || 0)) * Math.min(1, dt * 18); P.a = C.nrm(P.a + C.nrm(P.ta - P.a) * kk); P.pi = (P.pi || 0) + ((P.tpi || 0) - (P.pi || 0)) * kk; P.spd = Math.hypot(P.x - ox, P.y - oy) / Math.max(dt, .001); }
        const c = getChar(id), hide = id === me ? !(tpv && p && p.al && !watching) : id === viewId; c.root.visible = !hide; if (hide) continue;
        if (q.al || !c.dead) c.root.position.set(P.x, P.z || 0, P.y); c.root.rotation.y = Math.PI / 2 - P.a; const moving = id === me ? false : (P.spd || 0) > .35; c.setGun(P.fl & 4 && q.w ? q.w : 'pistol'); c.update(dt, { dead: !q.al, cr: P.fl & 1, moving, spd: P.spd || 0, pitch: P.pi || 0, acting: P.fl & 8 }); if (c.blob) c.blob.visible = q.al && CFG.q < 2;
        const ally = !!p && q.tm === p.tm; if (c.setSide) c.setSide(id === me ? 'self' : ally);
        let seen = false; if (q.al && id !== me && !ally && p) { const ez = (P.z || 0) + .55, dd = Math.hypot(P.x - vx, P.y - vy); if (dd < 30 && C.los3(m, vx, vy, vz, P.x, P.y, ez)) { seen = true; const da = C.nrm(Math.atan2(P.y - vy, P.x - vx) - va), dp = Math.atan2(ez - vz, dd) - vp, r = Math.atan2(.24, Math.max(dd, .5)); if (Math.abs(da) < r && Math.abs(dp) < r * 1.6) aimEn = true; } }
        c.tag.visible = q.al && id !== me && (ally || seen || (p && !p.al)); if (c.tag.visible) c.tag.material.color.set(ally ? 0x8fd0ff : 0xff6060); c.tag.position.y = 1.05 - (c.cr || 0) * .28;
        if (q.al && id !== me && P.fl & 2 && !(P.fl & 1)) { P.st = (P.st || 0) - dt; if (P.st <= 0) { P.st = .34; AU.play('step_' + world.theme.step, P.x, P.y, .9); } }
      }
      if (aimEn !== cache.aimEn) { cache.aimEn = aimEn; const xh = wrap.querySelector('.sk-x'); if (xh) xh.classList.toggle('en', aimEn); }
      /* الكاميرا والمؤثرات */
      const zoomOn = self.zoom && p && p.al && !watching, shake = self.shake && now - self.shake < 600 ? (1 - (now - self.shake) / 600) * .05 : 0; cam.fov += ((zoomOn ? 18 : CFG.fov) - cam.fov) * Math.min(1, dt * 14); cam.updateProjectionMatrix();
      let camX = vx, camY = vz, camZ = vy; if (tpv && p && p.al && !watching) { const D = 2.6, cA = Math.cos(va), sA = Math.sin(va); camX = vx - cA * D; camZ = vy - sA * D; camY = vz + .55; }
      const landDip = self.land && !watching ? -.075 * Math.max(0, 1 - (now - self.land) / 260) * Math.sin(Math.min(1, (now - self.land) / 260) * Math.PI) : 0; cam.position.set(camX + (Math.random() - .5) * shake, camY + landDip + Math.abs(Math.cos(self.bob)) * .012 * self.mvS * (watching ? 0 : 1) + (Math.random() - .5) * shake, camZ); cam.rotation.set(vp, -va - Math.PI / 2, 0); AU.listen(vx, vy, vz, va);
      self.swayX += ((C.nrm(self.a - self.la)) * .25 - self.swayX) * Math.min(1, dt * 10); self.swayY += ((self.pi - self.lp) * .25 - self.swayY) * Math.min(1, dt * 10); self.swayX = Math.max(-.03, Math.min(.03, self.swayX)); self.swayY = Math.max(-.03, Math.min(.03, self.swayY)); self.la = self.a; self.lp = self.pi;
      flashL.position.set(vx + Math.cos(va) * .5, vz, vy + Math.sin(va) * .5); flashL.intensity = Math.max(0, flashL.intensity - dt * 60);
      for (const h of holes) if (h.visible && now - h.userData.t > 14000) h.visible = false;
      for (const s of puffs) if (s.visible) { const u = s.userData, a = (now - u.t) / u.life; if (a >= 1) { s.visible = false; continue; } s.position.x += u.vx * dt; s.position.y += u.vy * dt; s.position.z += u.vz * dt; u.vy -= dt * .6; s.scale.setScalar(u.s * (.4 + a)); s.material.opacity = (1 - a) * .8; }
      for (const tr of tracers) if (tr.visible) { const a = (now - tr.userData.t) / 70; if (a >= 1) tr.visible = false; else tr.material.opacity = .85 * (1 - a); }
      if (S.bomb && S.ph !== 'freeze') { bombMesh.visible = true; bombMesh.position.set(S.bomb.x, 0, S.bomb.y); const left = Math.max(0, S.bomb._dl - performance.now()), iv = S.ph === 'live' ? Math.max(130, left / 40000 * 950) : 1e9; bombMesh.userData.led.visible = now % iv < iv * .4; if (S.ph === 'live' && now - beepT > iv) { beepT = now; AU.play('beep', S.bomb.x, S.bomb.y, 1.6); } } else bombMesh.visible = false;
      if (boom) { const a = (now - boom.t) / 650; if (a >= 1) { boom = null; boomMesh.visible = false; } else { boomMesh.visible = true; boomMesh.position.set(boom.x, .5, boom.y); boomMesh.scale.setScalar(.4 + a * 4.5); boomMesh.material.opacity = .85 * (1 - a); flashL.position.set(boom.x, 1, boom.y); flashL.intensity = 40 * (1 - a); } }
      if (shadowKick > 0) { shadowKick--; R.shadowMap.needsUpdate = true; }
      AU.tickAmb(); stepPts(FX.spk, dt, 6); stepPts(FX.deb, dt, 9); stepShells(dt); postSetup(); if (world.scene.userData.clouds) world.scene.userData.clouds.rotation.y += world.scene.userData.clouds.userData.spin * dt;
      if (comp) comp.render(dt); else { R.clear(); R.render(world.scene, cam); }
      if (p && p.al && !watching && !zoomOn) { setVM(now); R.clearDepth(); R.render(vmScene, vmCam); }
      hud(now, p, watching);
      if (++fpsN, now - fpsT > 2000) { const fps = fpsN * 1000 / (now - fpsT); fpsN = 0; fpsT = now; self.fps = fps; if (fps < 26 && CFG.q > 0 && !CFG.lock && ++fpsLow >= 2) { fpsLow = 0; CFG.q--; applyQ(); } else if (fps >= 26) fpsLow = 0; }
    }
    function destroy() {
      if (dead) return; dead = true; clearInterval(simIv); AB.abort(); AU.stopAmb(); try { ws && ws.close(); } catch (e) { } try { if (document.pointerLockElement === wrap) document.exitPointerLock(); } catch (e) { }
      if (R) { for (const id in chars) dropChar(id); for (const a of [holes, puffs, tracers]) for (const o of a) { if (o.geometry && o.geometry !== holes[0].geometry) o.geometry.dispose(); o.material.dispose(); } if (holes[0]) holes[0].geometry.dispose(); world.dispose(); if (vm) vm.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); }); R.dispose(); try { R.forceContextLoss(); } catch (e) { } }
    }
    function set(st, id, sendFn, H) {
      const first = !X; X = Object.assign(X || {}, { st, send: sendFn, H }); me = id; if (!first) return; m = C.parseMap(st.map); const f = window.DW && DW.P.face; if (f) setFaceImg(me, f); applyQ();
      loadThree().then(() => { if (dead) return; try { init3(); } catch (e) { console.error(e); el.load.textContent = 'تعذر تشغيل الرسم ثلاثي الأبعاد على هذا الجهاز (WebGL غير متاح)'; return; } connect(); lastF = performance.now(); requestAnimationFrame(frame); }, () => { el.load.textContent = 'تعذر تحميل محرك الرسم. تحقق من الاتصال'; });
    }
    return { wrap, set, destroy, dbg: { S: () => S, self, Ppos, toHost, faces, chars, cfg: CFG, shoot: () => shoot(performance.now()), fx: () => FX, au: () => AU, info: () => R && R.info.render, started: () => started, cam: () => cam } };
  }

  /* معاينة الجندي الدوّارة في قائمة اللعبة */
  let PV = null;
  function preview(host) {
    if (!host) return; if (PV && PV.host === host && document.body.contains(PV.cv)) return; if (PV) PV.stop(); host.textContent = ''; host.style.cssText = 'height:210px;background:linear-gradient(#2f6fc4,#f3dcb4);display:block;position:relative;overflow:hidden';
    const cv = document.createElement('canvas'); cv.style.cssText = 'width:100%;height:100%;display:block'; host.appendChild(cv); const pv = PV = { host, cv, dead: false, skin: -1, gun: 0, stop() { pv.dead = true; if (pv.R) { pv.R.dispose(); try { pv.R.forceContextLoss(); } catch (e) { } } } };
    loadThree().then(() => {
      if (pv.dead) return; const T = window.THREE; let R; try { R = pv.R = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { return; } const sc = new T.Scene(), cam = new T.PerspectiveCamera(30, 2, .1, 20); cam.position.set(0, .6, 1.9); cam.lookAt(0, .48, 0); sc.add(new T.HemisphereLight(0xffffff, 0x8a7a5a, 2)); const d = new T.DirectionalLight(0xfff0d0, 2.4); d.position.set(2, 3, 2); sc.add(d);
      const fl = new T.Mesh(new T.CircleGeometry(.8, 24), new T.MeshLambertMaterial({ color: 0xb7a68c })); fl.rotation.x = -Math.PI / 2; sc.add(fl); let sol = null, t0 = performance.now(), gt = 0;
      const mk = () => { if (sol) { sc.remove(sol.root); sol.dispose(); } pv.skin = CFG.skin; const img = new Image(), f = window.DW && DW.P.face; sol = SKW.soldier(T, { outfit: CFG.skin, team: 0, gun: WK[pv.gun % 5] }); sc.add(sol.root); if (f) { img.onload = () => sol && sol.setFace(img); img.src = f; pv.face = f; } };
      (function loop() { if (pv.dead) return; if (!document.body.contains(cv)) { pv.stop(); PV = null; return; } requestAnimationFrame(loop); const r = host.getBoundingClientRect(), now = performance.now(); if (r.width && (cv.width !== Math.round(r.width * 1.5))) { R.setPixelRatio(1.5); R.setSize(r.width, r.height, false); cam.aspect = r.width / r.height; cam.updateProjectionMatrix(); }
        if (pv.skin !== CFG.skin || pv.face !== (window.DW && DW.P.face || undefined) && (pv.face = window.DW && DW.P.face || undefined, true)) mk(); if (now - gt > 2600) { gt = now; sol.setGun(WK[++pv.gun % 5]); } sol.root.rotation.y = (now - t0) / 1400; sol.update(.016, { moving: true, cr: 0, pitch: 0 }); R.render(sc, cam); })();
    }, () => { });
  }

  G.reg({
    id: 'strike', n: 'طخطخة', cat: 'act', em: '🔫', hue: 12, min: 2, max: 12, t: 15, modes: 'ps', rt: 1, solo: 6, teams: 1, teamNames: ['مهاجم', 'مدافع'],
    d: 'تصويب ثلاثي الأبعاد بين فريقين حتى 6 ضد 6: ثلاث خرائط، قنبلة، متجر أسلحة، ووجهك على جنديّك.',
    r: 'المهاجمون يزرعون القنبلة في الموقع A أو B، والمدافعون يمنعونهم أو يبطلونها. تُحسم الجولة بالقضاء على الفريق الآخر أو بانفجار القنبلة أو إبطالها أو انتهاء الوقت. قبل كل جولة 10 ثوانٍ للشراء بأموال افتراضية من نتائج الجولات. إصابة الرأس تضاعف الضرر، والسواتر المنخفضة تحميك إذا انحنيت خلفها. الكمبيوتر: WASD حركة · الفأرة تصويب · C انحناء · Shift مشي صامت · R تلقيم · 1/2/Q تبديل السلاح · الزر الأيمن منظار القناصة · E زرع وإبطال · B المتجر · Tab النتائج · M الإعدادات. الجوال: يسار الشاشة للحركة ويمينها للتصويب، والأزرار للإطلاق والتلقيم والتبديل والانحناء.',
    opts: [{ k: 'map', n: 'الخريطة', v: ['عشوائي', ...Object.keys(C.RAW)], d: 'عشوائي' }, { k: 'w', n: 'جولات الفوز', v: [3, 5, 8], d: 5 }, { k: 'bot', n: 'مستوى الآليين', v: ['سهل', 'متوسط', 'صعب'], d: 'متوسط' }],
    init(ps, o, H) {
      const maps = Object.keys(C.RAW), st = { ps, sc: U.zero(ps), tm: {}, map: C.RAW[o.map] ? o.map : U.pick(maps) }; let a = [], b = [];
      if (H.teamsOn && H.team) for (const id of ps) (H.team(id) === 2 ? b : a).push(id);
      if (!a.length || !b.length) { a = []; b = []; ps.forEach((id, i) => (i % 2 ? b : a).push(id)); }
      a.forEach(id => st.tm[id] = 0); b.forEach(id => st.tm[id] = 1); return st;
    },
    act(st, p, a, H) {
      if (st.over || a.t !== 'over' || (H.hostId && p !== H.hostId())) return; const win = a.win ? 1 : 0, rs = [0, 1].map(i => (a.rs && a.rs[i]) | 0); st.fin = {};
      for (const id of st.ps) { const f = (a.fin && a.fin[id]) || []; st.fin[id] = [f[0] | 0, f[1] | 0, f[2] | 0, f[3] | 0]; st.sc[id] = f[0] | 0; }
      st.rs = rs; st.mvp = st.ps.includes(a.mvp) ? a.mvp : null; st.over = { win: st.ps.filter(id => st.tm[id] === win), msg: `فاز ${TN[win]} ${rs[win]} – ${rs[1 - win]}` };
    },
    resView(st, H) { if (!st.fin) return ''; return `<div class="tblw"><table class="tbl"><tr><th>اللاعب</th><th>الفريق</th><th>قتل</th><th>سقوط</th><th>مساعدة</th><th>إصابات رأس</th></tr>${st.ps.slice().sort((a, b) => st.fin[b][0] - st.fin[a][0]).map(id => `<tr><td>${st.mvp === id ? '⭐ ' : ''}${H.av(id)} ${esc(H.nm(id))}</td><td style="color:${TC[st.tm[id]]}">${TN[st.tm[id]]}</td><td>${st.fin[id][0]}</td><td>${st.fin[id][1]}</td><td>${st.fin[id][2]}</td><td>${st.fin[id][3]}</td></tr>`).join('')}</table></div>${st.mvp ? `<p>⭐ أفضل لاعب: <b>${esc(H.nm(st.mvp))}</b></p>` : ''}`; },
    view(st, me, H) {
      if (st.over) return `<div class="pn"><p class="big ctr">${esc(st.over.msg)}</p>${this.resView(st, H)}</div>`;
      return `<p class="ctr mut">الخريطة: ${esc(st.map)} · أنت مع <b style="color:${TC[st.tm[me]]}">${TN[st.tm[me]]}</b> · ⚙ للإعدادات والزي وصورة الوجه</p><div data-keep="strike"></div>`;
    },
    bind(el, st, me, send, H) { const s = el.querySelector('[data-keep=strike]'); if (!s) return; const e = H.keep('strike', Engine); e.set(st, me, send, H); if (e.wrap.parentNode !== s) s.appendChild(e.wrap); window.SK = e; },
    preview,
    menuHTML() { return `<p class="row"><b>الزي:</b> ${(window.SKW ? SKW.OUTFITS : []).map((o, i) => `<button class="btn sm ${CFG.skin === i ? 'pri' : ''}" data-act="skin:${i}">${o.n}</button>`).join('')}<button class="btn sm" data-act="profile">📷 صورة الوجه</button></p><details><summary><b>مستودع الأسلحة</b></summary><div class="tblw"><table class="tbl"><tr><th>السلاح</th><th>السعر</th><th>الضرر</th><th>الرأس ×</th><th>طلقة/ث</th><th>المخزن</th><th>التلقيم</th></tr>${WK.map(w => `<tr><td>${WP[w].n}</td><td>${WP[w].$ ? '$' + WP[w].$ : 'مجاني'}</td><td>${WP[w].dmg}${WP[w].pel ? '×' + WP[w].pel : ''}</td><td>${WP[w].hs}</td><td>${(1000 / WP[w].rate).toFixed(1)}</td><td>${WP[w].mag}</td><td>${(WP[w].rel / 1000).toFixed(1)}ث</td></tr>`).join('')}</table></div></details>`; },
    setSkin(n) { CFG.skin = n | 0; saveCfg(); },
  });
})();
