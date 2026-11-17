/* نماذج ثلاثية الأبعاد جاهزة (glTF/GLB) من حزم Quaternius بترخيص CC0 (انظر public/assets/strike/LICENSE-*.txt).
   تُحمَّل مرة واحدة، وتبقى الصناعة الإجرائية في strike-world.js احتياطاً إن فشل التحميل.

   الشخصية:
   - مقاطع حركة حقيقية (وقوف، مشي، جري، انحناء، قفز، إصابة، موت) مع مزج سلس بينها.
   - الساقان تتجهان نحو اتجاه الحركة (جانبي/خلفي) والجذع يبقى نحو التصويب.
   - الجذع يميل مع زاوية التصويب للأعلى والأسفل.
   - السلاح مثبت في اليد الرئيسية ومصوَّب للأمام، واليد الثانية تمسك مقدمة السلاح (IK).
   - ارتداد عند الإطلاق وومضة فوهة.
   - لون الفريق: صدرية وشارة على الكتف، وتلوين خفيف للزي. */
(function () {
  'use strict';
  const BASE = 'assets/strike/';
  const CHARS = [
    { k: 'matt', f: 'characters/Matt.glb', n: 'فهد', d: 'قائد هادئ الأعصاب' },
    { k: 'sam', f: 'characters/Sam.glb', n: 'صقر', d: 'خفيف وسريع' },
    { k: 'lis', f: 'characters/Lis.glb', n: 'زياد', d: 'مهاجم جريء' },
    { k: 'shaun', f: 'characters/Shaun.glb', n: 'أبو سعد', d: 'خبير ميداني' }
  ];
  const WFILES = { pistol: 'weapons/Pistol.glb', smg: 'weapons/SMG.glb', shotgun: 'weapons/Shotgun.glb', rifle: 'weapons/Rifle.glb', sniper: 'weapons/Sniper.glb' };
  const VFILES = { car: 'vehicles/Sports.glb', truck: 'vehicles/Truck.glb', pickup: 'vehicles/Pickup.glb' };
  // أطوال الأسلحة بالوحدات (تطابق مقاس الشخصية ≈ 0.9)
  const WLEN = { pistol: .3, smg: .4, shotgun: .56, rifle: .58, sniper: .66 };
  const WROT = { sniper: -Math.PI / 2 };
  /* أطوال منظور الشخص الأول (تطابق مقاس النموذج الإجرائي السابق) */
  const VLEN = { pistol: .22, smg: .36, shotgun: .52, rifle: .52, sniper: .58 };
  const TWOH = { smg: 1, shotgun: 1, rifle: 1, sniper: 1 };
  const SCALE = .64;
  const TEAMC = [0xff6a2a, 0x2f86ff], ALLY = 0x35a8ff, ENEMY = 0xff2a2a;
  /* إضاءة حافة (Fresnel) بلون الجانب: تُظهر الحليف والعدو بوضوح من بعيد */
  function addRim(m, uRim) {
    m.onBeforeCompile = sh => {
      sh.uniforms.uRim = uRim;
      sh.fragmentShader = 'uniform vec3 uRim;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n  totalEmissiveRadiance += uRim * (pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 2.4) * 1.25 + .04);');
    };
    m.customProgramCacheKey = () => 'rim1';
  }
  const cache = { ch: {}, w: {}, v: {} };
  let T = null, ready = false, loading = null;

  const loadOne = url => new Promise((ok, no) => new window.GLX.GLTFLoader().load(BASE + url, ok, undefined, no));

  /* يحمّل كل الملفات مرة واحدة ويعيد true عند الاكتمال */
  function load(THREE_) {
    T = THREE_ || window.THREE; UP = new T.Vector3(0, 1, 0);
    if (ready) return Promise.resolve(true);
    if (loading) return loading;
    if (!window.GLX || !window.GLX.GLTFLoader || !window.GLX.SkeletonUtils) return Promise.resolve(false);
    const jobs = [];
    CHARS.forEach(c => jobs.push(loadOne(c.f).then(g => { cache.ch[c.k] = { scene: g.scene, clips: g.animations }; })));
    Object.keys(WFILES).forEach(k => jobs.push(loadOne(WFILES[k]).then(g => { cache.w[k] = g.scene; }, () => { })));
    Object.keys(VFILES).forEach(k => jobs.push(loadOne(VFILES[k]).then(g => { cache.v[k] = g.scene; }, () => { })));
    loading = Promise.all(jobs).then(() => (ready = true), () => (ready = false));
    return loading;
  }

  /* سلاح مُحجَّم. hold=true: الأصل عند المقبض (للإمساك)، وإلا يتمركز في الوسط (لمنظور الشخص الأول) */
  function weapon(name, hold) {
    if (!ready) return null;
    const src = cache.w[name] || cache.w[name === 'sniper' ? 'rifle' : 'rifle'];
    if (!src) return null;
    const m0 = src.clone(true), m = new T.Group(), g = new T.Group(), h = new T.Group(); m.add(m0); if (WROT[name]) { m0.rotation.y = WROT[name]; } m.updateMatrixWorld(true);
    const box = new T.Box3().setFromObject(m), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3());
    const len = Math.max(size.x, size.y, size.z), s = ((hold ? WLEN : VLEN)[name] || .5) / len;
    if (hold) m.position.set(-center.x, -box.min.y - size.y * .18, -box.min.z - size.z * (name === 'pistol' ? .12 : .3)); else m.position.sub(center);
    h.add(m); h.scale.setScalar(s); g.add(h);
    g.userData.len = size.z * s; g.userData.name = name;
    g.userData.fore = (hold ? size.z * s * (name === 'pistol' ? .05 : .38) : 0);
    g.userData.mz = hold ? size.z * s * (name === 'pistol' ? .9 : .72) : size.z * s / 2 + .02;
    g.traverse(c => { if (c.isMesh) { c.castShadow = true; } });
    return g;
  }

  const V = () => new T.Vector3(), Q = () => new T.Quaternion();
  let UP = null;

  /* دوران عظمة حول محور في الإحداثيات العالمية */
  function rotWorld(bone, axisW, ang) {
    if (!bone || !ang) return;
    const pq = Q(); bone.parent.getWorldQuaternion(pq);
    const ax = axisW.clone().applyQuaternion(pq.invert()).normalize();
    bone.quaternion.premultiply(Q().setFromAxisAngle(ax, ang));
    bone.updateMatrixWorld(true);
  }
  /* IK بسيط (CCD) لذراع من عظمتين: يقرّب نهاية الذراع من الهدف */
  function ik(chain, eff, target, iters) {
    const pe = V(), pb = V(), a = V(), b = V(), bq = Q(), pq = Q(), q = Q();
    for (let it = 0; it < (iters || 4); it++) {
      for (const bone of chain) {
        eff.getWorldPosition(pe); bone.getWorldPosition(pb);
        a.subVectors(pe, pb); b.subVectors(target, pb);
        if (a.lengthSq() < 1e-8 || b.lengthSq() < 1e-8) continue;
        a.normalize(); b.normalize(); q.setFromUnitVectors(a, b);
        bone.getWorldQuaternion(bq); bone.parent.getWorldQuaternion(pq);
        bone.quaternion.copy(pq.invert().multiply(q.multiply(bq)));
        bone.updateMatrixWorld(true);
      }
    }
  }

  /* شخصية بالواجهة التي تستخدمها اللعبة: root, setGun, setFace, update, hit, dispose, dead, kick */
  function character(opt) {
    if (!ready) return null;
    const def = CHARS[(opt.outfit | 0) % CHARS.length], src = cache.ch[def.k];
    const root = new T.Group(), body = new T.Group(), model = window.GLX.SkeletonUtils.clone(src.scene);
    const junk = []; model.traverse(o => { if (o.isMesh && !o.isSkinnedMesh) junk.push(o); }); junk.forEach(o => o.parent && o.parent.remove(o));
    const team = opt.team | 0, tcol = new T.Color(TEAMC[team]), mats = [], uRim = { value: tcol.clone() };
    model.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = true; o.frustumCulled = false;
      const m = o.material.clone(); addRim(m, uRim); o.material = m; mats.push(m);
    });
    model.scale.setScalar(SCALE); body.add(model); root.add(body);
    const B = n => model.getObjectByName(n);
    const bone = { hips: B('Hips'), abd: B('Abdomen'), torso: B('Torso'), head: B('Head'),
      /* اليد الرئيسية هي التي كان المسدس مثبتاً فيها في الملف الأصلي */
      main: { ua: B('UpperArmL'), la: B('LowerArmL'), h: B('Middle1L') || B('LowerArmL') },
      off: { ua: B('UpperArmR'), la: B('LowerArmR'), h: B('Middle1R') || B('LowerArmR') } };
    let side = 0;

    /* حلقة على الأرض بلون الجانب */
    const ring = new T.Mesh(new T.RingGeometry(.2, .25, 28), new T.MeshBasicMaterial({ color: tcol, transparent: true, opacity: .55, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = .015; root.add(ring); mats.push(ring.material);

    /* الحركات */
    const mixer = new T.AnimationMixer(model), acts = {};
    for (const clip of src.clips) acts[clip.name] = mixer.clipAction(clip);
    ['Death', 'HitReact', 'Jump_Land'].forEach(n => { if (acts[n]) { acts[n].setLoop(T.LoopOnce, 1); acts[n].clampWhenFinished = n === 'Death'; } });
    const holder = new T.Group(); root.add(holder);
    const flash = new T.Mesh(new T.SphereGeometry(.045, 8, 6), new T.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: .95 }));
    flash.visible = false; holder.add(flash); mats.push(flash.material);

    const tmp = { hp: V(), lp: V(), fwd: V(), right: V(), tg: V() };
    const st0 = { lx: null, lz: null, ly: 0, vx: 0, vz: 0, vy: 0, yaw: 0, dir: 1, hitT: 0, landT: 0, air: 0 };

    const S = { root, dead: 0, kick: 0, cr: 0, gunName: '', g: null, cur: null, tag: null, blob: null, band: ring, def,
      setGun(n) {
        if (S.gunName === n) return; S.gunName = n;
        if (S.g) holder.remove(S.g);
        S.g = weapon(n, true); if (S.g) holder.add(S.g);
        flash.position.set(0, .015, S.g ? S.g.userData.mz : .2);
      },
      setFace() { },
      side: null,
      /* ally=true حليف (أزرق)، false عدو (أحمر)، null لون الفريق */
      setSide(ally) { if (S.side === ally) return; S.side = ally; const c = new T.Color(ally === 'self' ? 0 : ally == null ? TEAMC[team] : ally ? ALLY : ENEMY); uRim.value.copy(c); ring.material.color.copy(c); ring.material.opacity = ally === false || ally === 'self' ? 0 : .55; },
      hit() { st0.hitT = .32; },
      play(name, fade, ts) {
        const a = acts[name] || acts.Idle_Gun; if (!a) return;
        if (ts != null) a.setEffectiveTimeScale(ts);
        if (S.cur === a) return;
        const prev = S.cur; S.cur = a;
        a.enabled = true; a.reset(); a.setEffectiveWeight(1); if (ts == null) a.setEffectiveTimeScale(1); a.play();
        if (prev) prev.crossFadeTo(a, fade == null ? .18 : fade, false);
      },
      update(dt, st) {
        dt = Math.min(dt, .1);
        /* السرعة والاتجاه من حركة الجذر الفعلية */
        const px = root.position.x, pz = root.position.z, py = root.position.y;
        if (st0.lx == null) { st0.lx = px; st0.lz = pz; st0.ly = py; }
        const ivx = (px - st0.lx) / Math.max(dt, 1e-3), ivz = (pz - st0.lz) / Math.max(dt, 1e-3), ivy = (py - st0.ly) / Math.max(dt, 1e-3);
        st0.lx = px; st0.lz = pz; st0.ly = py;
        const k = 1 - Math.exp(-dt * 10); st0.vx += (ivx - st0.vx) * k; st0.vz += (ivz - st0.vz) * k; st0.vy += (ivy - st0.vy) * Math.min(1, dt * 14);
        let spd = Math.hypot(st0.vx, st0.vz); if (spd > 9) spd = 0;
        S.cr += ((st.cr ? 1 : 0) - S.cr) * Math.min(1, dt * 10);

        /* اختيار المقطع */
        const ry = root.rotation.y;
        let yawT = 0, dir = 1;
        if (spd > .35) {
          let d = Math.atan2(st0.vx, st0.vz) - ry; d = Math.atan2(Math.sin(d), Math.cos(d));
          if (Math.abs(d) > 1.75) { dir = -1; d = Math.atan2(Math.sin(d - Math.PI), Math.cos(d - Math.PI)); }
          yawT = Math.max(-1.1, Math.min(1.1, d));
        }
        st0.yaw += (yawT - st0.yaw) * Math.min(1, dt * 9);
        const air = Math.abs(st0.vy) > 1.4 && !st.dead; if (air) st0.air = .12; else st0.air = Math.max(0, st0.air - dt);
        if (st0.hitT > 0) st0.hitT -= dt;
        if (st.dead) { S.dead = Math.min(1, S.dead + dt * 3); S.play('Death', .12); }
        else {
          S.dead = 0;
          if (st0.air > 0) S.play('Jump_Idle', .12);
          else if (st0.hitT > 0 && acts.HitReact) S.play('HitReact', .06);
          else if (S.cr > .5) S.play(spd > .35 ? 'Walk_Gun' : 'Duck', .2, spd > .35 ? dir * .7 : 1);
          else if (spd > 2.5) S.play('Run_Gun', .2, dir * Math.max(.75, Math.min(1.35, spd / 4)));
          else if (spd > .35) S.play('Walk_Gun', .2, dir * Math.max(.7, Math.min(1.5, spd / 1.7)));
          else S.play('Idle_Gun', .25);
        }
        mixer.update(dt);

        /* الساقان باتجاه الحركة، الجذع باتجاه التصويب */
        body.rotation.y = st.dead ? 0 : st0.yaw;
        body.position.y = st.cr && !st.dead && S.cur !== acts.Duck ? -.12 * S.cr : 0;
        root.updateMatrixWorld(true);
        if (!st.dead && bone.abd && bone.torso) {
          rotWorld(bone.abd, UP, -st0.yaw * .55);
          rotWorld(bone.torso, UP, -st0.yaw * .45);
          tmp.right.set(Math.cos(ry), 0, -Math.sin(ry));
          const pi = Math.max(-.9, Math.min(.9, st.pitch || 0));
          rotWorld(bone.torso, tmp.right, -pi * .7);
          if (bone.head) rotWorld(bone.head, tmp.right, -pi * .3);
        }

        /* السلاح أمام الصدر ومصوَّب مع النظر، واليدان عليه (IK) */
        const g = S.g, M = bone.main, O = bone.off;
        holder.visible = !!g && !st.dead;
        if (g && !st.dead && bone.torso && M.ua && M.la && M.h) {
          if (!side) { M.ua.getWorldPosition(tmp.hp); root.worldToLocal(tmp.hp); side = tmp.hp.x >= 0 ? 1 : -1; }
          S.kick = Math.max(0, S.kick - dt * 7);
          const p = Math.max(-1, Math.min(1, st.pitch || 0)), two = !!TWOH[S.gunName], cp = Math.cos(p), sp = Math.sin(p);
          bone.torso.getWorldPosition(tmp.lp); root.worldToLocal(tmp.lp);
          const reach = (two ? .2 : .3) - S.kick * .04;
          holder.position.set(tmp.lp.x + side * (two ? .055 : .03), tmp.lp.y + (two ? .02 : .06) + sp * reach, tmp.lp.z + cp * reach);
          holder.rotation.set(-p - S.kick * .14, 0, 0, 'YXZ');
          holder.updateMatrixWorld(true);
          tmp.tg.set(0, 0, 0); holder.localToWorld(tmp.tg);
          ik([M.la, M.ua], M.h, tmp.tg, 3);
          if (O.ua && O.la && O.h) {
            tmp.tg.set(0, two ? -.015 : -.025, two ? g.userData.fore : -.01); holder.localToWorld(tmp.tg);
            ik([O.la, O.ua], O.h, tmp.tg, 3);
          }
          flash.visible = S.kick > .72; if (flash.visible) flash.scale.setScalar(.7 + Math.random() * .7);
        } else flash.visible = false;

        ring.visible = !st.dead;
      },
      dispose() {
        mixer.stopAllAction(); mixer.uncacheRoot(model);
        mats.forEach(m => m.dispose()); ring.geometry.dispose(); flash.geometry.dispose();
        if (root.parent) root.parent.remove(root);
      }
    };
    S.play('Idle_Gun', 0); S.setGun(opt.gun || 'pistol');
    return S;
  }

  /* ذراعا الشخص الأول: من نموذج الشخصية نفسها (الجلد والأكمام)، تمسكان السلاح باليدين عبر IK.
     المجموعة الناتجة تُوضع أمام كاميرا العرض كما كان النموذج الإجرائي (السلاح في الأصل، فوهته نحو -z). */
  function viewArms(name, outfit, AS) {
    if (!ready) return null;
    const def = CHARS[(outfit | 0) % CHARS.length], src = cache.ch[def.k];
    const g = new T.Group(), gn = weapon(name, false); if (!gn) return null;
    const len = VLEN[name] || .5, pistol = name === 'pistol', zo = pistol ? .02 : -.15;
    gn.rotation.y = Math.PI; gn.position.z = zo; g.add(gn);
    const model = window.GLX.SkeletonUtils.clone(src.scene), mats = [];
    const junk = []; model.traverse(o => { if (o.isMesh && !o.isSkinnedMesh) junk.push(o); }); junk.forEach(o => o.parent && o.parent.remove(o));
    model.traverse(o => { if (o.isMesh) { o.frustumCulled = false; o.castShadow = false; o.material = o.material.clone(); mats.push(o.material); } });
    const B = n => model.getObjectByName(n);
    ['Head', 'UpperLegL', 'UpperLegR', 'FootL', 'FootR', 'Neck'].forEach(n => { const b = B(n); if (b) b.scale.setScalar(.001); });
    const sc = AS || .4; model.scale.setScalar(sc); model.rotation.y = Math.PI;
    const holder = new T.Group(); holder.add(model); g.add(holder);
    const mixer = new T.AnimationMixer(model), clip = src.clips.find(c => c.name === 'Idle_Gun') || src.clips[0];
    const act = clip ? mixer.clipAction(clip) : null; if (act) act.play();
    const M = { ua: B('UpperArmL'), la: B('LowerArmL'), h: B('Middle1L') }, O = { ua: B('UpperArmR'), la: B('LowerArmR'), h: B('Middle1R') };
    const chest = B('Torso') || B('Abdomen'), tg = new T.Vector3(), cw = new T.Vector3(), grip = new T.Vector3(0, -.035, zo + len * (pistol ? .3 : .16));
    g.userData = {
      mz: gn.userData.mz, left: null, arms: holder,
      /* يُستدعى بعد تحديد موضع المجموعة أمام الكاميرا */
      tick(now, cam) {
        if (!act) return;
        mixer.setTime(((now || 0) / 1000) % clip.duration);
        /* الصدر خلف المقبض وأسفله، خارج مجال الرؤية، فتصل الذراعان إلى السلاح */
        g.updateMatrixWorld(true); holder.position.set(0, 0, 0); holder.updateMatrixWorld(true);
        chest.getWorldPosition(cw); g.worldToLocal(cw);
        holder.position.set(grip.x - cw.x - .015, grip.y - cw.y - (pistol ? .085 : .1), grip.z - cw.z + (pistol ? .15 : .12));
        holder.updateMatrixWorld(true);
        if (M.ua && M.la && M.h) { tg.copy(grip); g.localToWorld(tg); ik([M.la, M.ua], M.h, tg, 5); }
        if (O.ua && O.la && O.h) { tg.set(pistol ? -.012 : 0, pistol ? -.05 : -.025, zo + (pistol ? len * .27 : -len * .22)); g.localToWorld(tg); ik([O.la, O.ua], O.h, tg, 5); }
      },
      dispose() { mixer.stopAllAction(); mats.forEach(m => m.dispose()); }
    };
    return g;
  }

  /* مركبة مُحجّمة لتملأ الخلية */
  function vehicle(kind, footprint, horiz) {
    if (!ready) return null;
    const src = cache.v[kind] || cache.v.car; if (!src) return null;
    const m = src.clone(true), g = new T.Group(), h = new T.Group();
    const box = new T.Box3().setFromObject(m), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3());
    m.position.set(-center.x, -box.min.y, -center.z); const len = Math.max(size.x, size.z), s = (footprint * .92) / len; h.add(m); h.scale.setScalar(s); g.add(h);
    if (horiz) h.rotation.y = Math.PI / 2;
    g.userData.height = size.y * s;
    g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    return g;
  }

  /* صورة مصغّرة لشخصية (للوبي) */
  let TR = null; const THUMB = {};
  function thumb(i, team, w, h) {
    const key = i + '|' + team + '|' + w;
    if (THUMB[key]) return THUMB[key];
    if (!ready) return '';
    try {
      w = w || 180; h = h || 240;
      if (!TR) {
        const cv = document.createElement('canvas'), r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
        r.setClearColor(0, 0); r.toneMapping = T.ACESFilmicToneMapping; r.outputColorSpace = T.SRGBColorSpace;
        const sc = new T.Scene(); sc.add(new T.HemisphereLight(0xffffff, 0x4a4f55, 2.4));
        const k1 = new T.DirectionalLight(0xfff3dc, 2.4); k1.position.set(-2, 3, 3); sc.add(k1);
        const k2 = new T.DirectionalLight(0x9fc4ff, 1.3); k2.position.set(3, 2, -3); sc.add(k2);
        TR = { cv, r, sc, cam: new T.PerspectiveCamera(26, 1, .05, 30) };
      }
      TR.r.setSize(w, h, false); TR.cam.aspect = w / h; TR.cam.updateProjectionMatrix();
      const c = character({ outfit: i, team, gun: 'rifle' });
      c.root.rotation.y = .5; TR.sc.add(c.root);
      for (let k = 0; k < 6; k++) c.update(.12, { pitch: 0 });
      c.root.updateMatrixWorld(true);
      const box = new T.Box3().setFromObject(c.root), ctr = box.getCenter(new T.Vector3()), hh = box.max.y - box.min.y;
      const d = (hh / 2) / Math.tan(T.MathUtils.degToRad(TR.cam.fov / 2)) * 1.12;
      TR.cam.position.set(ctr.x, ctr.y + .05, ctr.z + d); TR.cam.lookAt(ctr.x, ctr.y, ctr.z);
      TR.r.render(TR.sc, TR.cam);
      const url = TR.cv.toDataURL('image/png');
      c.dispose();
      return THUMB[key] = url;
    } catch (e) { return ''; }
  }

  window.SKM = { load, ready: () => ready, character, weapon, viewArms, vehicle, thumb, CHARS };
})();
