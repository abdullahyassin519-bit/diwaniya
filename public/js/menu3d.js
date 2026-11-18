/* خلفية ثلاثية الأبعاد حيّة للقائمة الرئيسية وغرفة الانتظار:
   مشهد حقيقي من خريطة الحارة (السماء، المباني، الدخان، المروحية) وشخصيتك المختارة مع فريقها بحركات حقيقية.
   تُرسم بـ 30 إطاراً في الثانية كحد أقصى، وتتوقف حين تُخفى الصفحة أو تُغادر القائمة. */
(function () {
  'use strict';
  const add = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  let bootP = null;
  /* أجهزة بلا تسريع رسومي (عرض برمجي): نكتفي بالقائمة الخفيفة حتى لا تتجمد الصفحة. يمكن فرضها بـ dw_m3d=1 */
  let liteV = null;
  function lite() {
    if (liteV !== null) return liteV;
    try { if (localStorage.getItem('dw_m3d') === '1') return liteV = false; if (localStorage.getItem('dw_m3d') === '0') return liteV = true; } catch (e) { }
    try {
      const g = document.createElement('canvas').getContext('webgl'); if (!g) return liteV = true;
      const x = g.getExtension('WEBGL_debug_renderer_info'), r = x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER);
      liteV = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(String(r));
      const l = g.getExtension('WEBGL_lose_context'); l && l.loseContext();
    } catch (e) { liteV = true; }
    return liteV;
  }
  const loaded = () => document.readyState === 'complete' ? Promise.resolve() : new Promise(r => addEventListener('load', r, { once: true }));
  /* تحميل المحرك والنماذج مرة واحدة (مشترك مع اللوبي) */
  function boot() {
    return bootP || (bootP = (window.THREE ? Promise.resolve() : add('js/vendor/three.min.js'))
      .then(() => (window.GLX ? 0 : add('js/vendor/gltf-loader.js')))
      .then(() => (window.SKM ? SKM.load(window.THREE) : false)));
  }
  /* تشكيلة الوقوف: الشخصية المختارة في المقدمة، والبقية خلفها */
  const SPOT = { cam: [29.4, .92, 19.95], look: [24.6, .56, 19.75], lineup: [[25.7, 19.85, 0], [24.75, 19.15, 1], [24.7, 20.55, 2], [23.85, 19.9, 3]] };
  let S = null;

  function mount(host, opt) {
    opt = opt || {};
    if (S && S.dead) S = null;
    if (S) { if (S.cv.parentNode !== host) { host.appendChild(S.cv); S.host = host; } if (S.ready) host.classList.add('on'); if (S.setSkin) { S.setSkin(opt.skin | 0); S.resume(); } return S.p || Promise.resolve(true); }
    const st = S = { host, dead: false, paused: false, cv: document.createElement('canvas'), skin: -1, chars: [] };
    st.cv.className = 'm3d-cv'; host.appendChild(st.cv);
    if (lite()) { host.classList.add('lite'); return st.p = Promise.resolve(false); }
    return st.p = loaded().then(boot).then(ok => {
      if (st.dead || !ok) return false;
      const T = window.THREE, C = window.SKC, W = window.SKW;
      let R; try { R = new T.WebGLRenderer({ canvas: st.cv, antialias: true, powerPreference: 'high-performance' }); } catch (e) { return false; }
      const mobile = matchMedia('(pointer:coarse)').matches, q = mobile ? 1 : 2;
      R.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5)); R.outputColorSpace = T.SRGBColorSpace; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 1.02;
      R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
      const m = C.parseMap('الحارة'), world = W.build(T, m, q); try { world.scene.environment = W.envMap(T, R, m.theme); } catch (e) { }
      world.sun.castShadow = true;
      const cam = new T.PerspectiveCamera(38, 1, .05, 120);
      Object.assign(st, { T, R, world, cam, mobile, t: 0, last: performance.now() });
      st.setSkin = skin => {
        if (st.skin === skin) return; st.skin = skin;
        st.chars.forEach(c => c.dispose()); st.chars = [];
        const order = [skin, (skin + 1) % 4, (skin + 2) % 4, (skin + 3) % 4], guns = ['rifle', 'smg', 'sniper', 'shotgun'];
        SPOT.lineup.forEach(([x, y, k], i) => {
          const c = SKM.character({ outfit: order[i], team: 0, gun: guns[i] }); if (!c) return; c.setSide('self');
          c.root.position.set(x, 0, y); c.root.rotation.y = Math.atan2(SPOT.cam[0] - x, SPOT.cam[2] - y) + (i ? (i % 2 ? -.35 : .35) : -.15);
          c.root.scale.setScalar(i ? 1 : 1.04); world.scene.add(c.root); c.update(.3 + i * .37, { pitch: -.05 }); st.chars.push(c);
        });
      };
      st.setSkin(opt.skin | 0);
      const size = () => { const w = st.cv.clientWidth || host.clientWidth || 800, h = st.cv.clientHeight || host.clientHeight || 450; if (st.w === w && st.h === h) return; st.w = w; st.h = h; R.setSize(w, h, false); cam.aspect = w / h; /* إزاحة المنظور: الشخصيات يسار الشاشة، والقائمة يمينها */ if (w > 700) cam.setViewOffset(w, h, w * (opt.shift == null ? .18 : opt.shift), 0, w, h); else cam.clearViewOffset(); cam.updateProjectionMatrix(); };
      const frame = now => {
        if (st.dead) return; st.raf = requestAnimationFrame(frame);
        if (st.paused || document.hidden || now - st.last < 32) return;
        const dt = Math.min(.1, (now - st.last) / 1000); st.last = now; st.t += dt; size();
        /* حركة كاميرا بطيئة (تنفّس) وانحراف خفيف مع مؤشر الفأرة */
        const mx = st.mx || 0, my = st.my || 0, a = st.t * .18;
        const tall = st.h > st.w, back = tall ? .7 : 0; cam.fov = tall ? 62 : 38;
        cam.position.set(SPOT.cam[0] + back + Math.sin(a) * .18 + mx * .25, SPOT.cam[1] + (tall ? 1.05 : 0) + Math.sin(a * 1.3) * .04 - my * .08, SPOT.cam[2] + Math.cos(a * .7) * .12);
        cam.lookAt(SPOT.look[0] + mx * .2, SPOT.look[1] + (tall ? -1.9 : 0), SPOT.look[2] + Math.sin(a * .5) * .05); cam.updateProjectionMatrix();
        st.chars.forEach(c => c.update(dt, { pitch: -.05 }));
        if (world.tick) world.tick(dt);
        R.render(world.scene, cam);
        if (!st.ready) st.ready = true; if (!st.host.classList.contains('on')) st.host.classList.add('on');
      };
      st.onMove = e => { const r = st.cv.getBoundingClientRect(); st.mx = ((e.clientX - r.left) / r.width - .5) * 2; st.my = ((e.clientY - r.top) / r.height - .5) * 2; };
      window.addEventListener('pointermove', st.onMove, { passive: true });
      st.resume = () => { st.paused = false; }; st.pause = () => { st.paused = true; };
      st.raf = requestAnimationFrame(frame);
      return true;
    }).catch(() => false);
  }
  function unmount() {
    if (!S) return; const st = S; S = null; st.dead = true; cancelAnimationFrame(st.raf);
    if (st.onMove) window.removeEventListener('pointermove', st.onMove);
    try { st.chars.forEach(c => c.dispose()); if (st.world && st.world.dispose) st.world.dispose(); if (st.R) { st.R.dispose(); st.R.forceContextLoss(); } } catch (e) { }
    if (st.cv.parentNode) st.cv.parentNode.removeChild(st.cv);
  }
  function setSkin(k) { if (S && S.setSkin) S.setSkin(k | 0); }

  /* لقطة جوية حقيقية للخريطة (تُرسم مرة وتُحفظ): تُستخدم في اختيار الخريطة وشاشة التحميل */
  const SHOTS = {}, queue = []; let busy = false;
  function mapShot(name, cb) {
    if (SHOTS[name]) return SHOTS[name];
    if (lite()) return '';
    if (!queue.find(q => q.name === name)) queue.push({ name, cb });
    pump(); return '';
  }
  function pump() {
    if (busy || !queue.length) return; busy = true;
    boot().then(ok => {
      const job = queue.shift(); if (!ok) { busy = false; return; }
      setTimeout(() => {
        try {
          const T = window.THREE, m = window.SKC.parseMap(job.name), cv = document.createElement('canvas'), R = new T.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true });
          R.setSize(640, 360, false); R.outputColorSpace = T.SRGBColorSpace; R.toneMapping = T.ACESFilmicToneMapping; R.shadowMap.enabled = true;
          const w = window.SKW.build(T, m, 1); w.sun.castShadow = true; try { w.scene.environment = window.SKW.envMap(T, R, m.theme); } catch (e) { }
          const cam = new T.PerspectiveCamera(34, 640 / 360, .1, 200), cx = m.w / 2, cz = m.h / 2, d = Math.max(m.w, m.h);
          cam.position.set(cx + d * .02, d * .78, cz + d * .82); cam.lookAt(cx, 0, cz + d * .05);
          if (w.scene.fog) w.scene.fog.far *= 3;
          R.render(w.scene, cam); SHOTS[job.name] = cv.toDataURL('image/jpeg', .82);
          if (w.dispose) w.dispose(); R.dispose(); R.forceContextLoss();
          if (job.cb) job.cb(job.name, SHOTS[job.name]);
        } catch (e) { SHOTS[job.name] = ''; }
        busy = false; pump();
      }, 30);
    });
  }

  function pause(on) { if (S) S.paused = !!on; }
  window.MENU3D = { lite, pause, boot, mount, unmount, setSkin, mapShot, shots: SHOTS };
})();
