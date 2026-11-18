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
  const WLEN = { pistol: .22, smg: .4, shotgun: .56, rifle: .58, sniper: .66 };
  const WROT = { sniper: -Math.PI / 2 };
  /* أطوال منظور الشخص الأول (تطابق مقاس النموذج الإجرائي السابق) */
  const VLEN = { pistol: .2, smg: .44, shotgun: .64, rifle: .64, sniper: .72 };
  const TWOH = { smg: 1, shotgun: 1, rifle: 1, sniper: 1 };
  const SCALE = .64, HEADK = .8;
  const TEAMC = [0xff6a2a, 0x2f86ff], ALLY = 0x35a8ff, ENEMY = 0xff2a2a;
  /* إضاءة حافة (Fresnel) بلون الجانب: تُظهر الحليف والعدو بوضوح من بعيد */
  function addRim(m, uRim) {
    m.onBeforeCompile = sh => {
      sh.uniforms.uRim = uRim;
      sh.fragmentShader = 'uniform vec3 uRim;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n  totalEmissiveRadiance += uRim * pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), 4.0) * .6;');
    };
    m.customProgramCacheKey = () => 'rim2';
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
    Object.keys(VFILES).forEach(k => jobs.push(loadOne(VFILES[k]).then(g => { cache.v[k] = g.scene; }, () => { })));
    loading = Promise.all(jobs).then(() => (ready = true), () => (ready = false));
    return loading;
  }

  /* ---------- أسلحة واقعية مبنية برمجياً (أسود مطفي، معدن وبوليمر) ----------
     الأصل عند قبضة اليد، والفوهة نحو +z. الوحدات بالأمتار الحقيقية تقريباً، ثم يُعاد تحجيمها. */
  const RG = {};
  function realGun(name) {
    if (RG[name]) return RG[name];
    const parts = { metal: [], poly: [], dark: [], glass: [], tan: [] }, M4 = new T.Matrix4(), Q4 = new T.Quaternion(), E = new T.Euler(), V3 = new T.Vector3(), S3 = new T.Vector3();
    const put = (mat, geo, x, y, z, rx, ry, rz) => { E.set(rx || 0, ry || 0, rz || 0); Q4.setFromEuler(E); M4.compose(V3.set(x, y, z), Q4, S3.set(1, 1, 1)); const g = geo.index ? geo.toNonIndexed() : geo; g.applyMatrix4(M4); parts[mat].push(g); };
    const B = (mat, w, h, l, x, y, z, rx, ry, rz) => put(mat, new T.BoxGeometry(w, h, l), x, y, z, rx, ry, rz);
    const Cz = (mat, r1, r2, l, x, y, z, seg) => put(mat, new T.CylinderGeometry(r2, r1, l, seg || 12), x, y, z, Math.PI / 2, 0, 0);
    const rail = (x0, x1, y, w) => { B('metal', w || .026, .008, x1 - x0, 0, y, (x0 + x1) / 2); for (let z = x0 + .006; z < x1; z += .014) B('dark', (w || .026) + .006, .006, .006, 0, y + .006, z); };
    if (name === 'rifle') { /* M4 */
      B('metal', .05, .07, .2, 0, .005, .03); B('metal', .056, .062, .25, 0, .066, .05); rail(-.06, .19, .102);
      Cz('poly', .034, .034, .2, 0, .062, .28, 8); rail(.19, .38, .1, .022); B('dark', .006, .01, .19, .035, .062, .28); B('dark', .006, .01, .19, -.035, .062, .28);
      Cz('metal', .01, .01, .2, 0, .062, .47); B('metal', .012, .07, .014, 0, .1, .385); Cz('dark', .013, .013, .045, 0, .062, .585, 8);
      B('poly', .026, .15, .068, 0, -.08, .085, .28); B('poly', .03, .1, .042, 0, -.055, -.04, -.32); B('metal', .006, .006, .06, 0, -.025, .02);
      Cz('metal', .017, .017, .17, 0, .05, -.15); B('poly', .042, .085, .13, 0, .035, -.28); B('poly', .044, .03, .1, 0, -.015, -.27);
      B('dark', .032, .03, .05, 0, .13, .02); B('glass', .024, .02, .004, 0, .13, -.004); B('dark', .01, .012, .03, .03, .07, -.04);
    } else if (name === 'smg') { /* رشاش مدمج */
      B('metal', .046, .07, .26, 0, .04, .06); rail(-.03, .16, .081, .022); Cz('poly', .026, .028, .1, 0, .04, .24, 10); Cz('metal', .009, .009, .08, 0, .045, .32); Cz('dark', .012, .012, .03, 0, .045, .37);
      B('poly', .024, .16, .05, 0, -.08, .12, .35); B('poly', .03, .095, .04, 0, -.045, -.02, -.3); B('metal', .006, .006, .05, 0, -.01, .03);
      B('metal', .008, .04, .16, .02, .03, -.14); B('metal', .008, .04, .16, -.02, .03, -.14); B('poly', .04, .06, .02, 0, .03, -.22); B('dark', .01, .03, .015, 0, .09, .14);
    } else if (name === 'shotgun') { /* مضخة */
      B('metal', .05, .075, .24, 0, .03, .05); Cz('metal', .014, .014, .46, 0, .052, .4); Cz('metal', .012, .012, .38, 0, .018, .36); Cz('poly', .024, .024, .14, 0, .02, .3, 10);
      B('poly', .03, .1, .045, 0, -.05, -.05, -.32); B('poly', .045, .085, .26, 0, .02, -.24, .06); B('dark', .046, .09, .02, 0, .01, -.37); B('metal', .006, .006, .05, 0, -.02, .01); B('metal', .006, .016, .01, 0, .074, .62);
    } else if (name === 'sniper') { /* قناصة بمنظار */
      B('metal', .05, .065, .26, 0, .045, .06); Cz('metal', .012, .011, .62, 0, .05, .5); Cz('dark', .016, .016, .07, 0, .05, .84, 10);
      B('tan', .05, .055, .38, 0, .02, .2); B('tan', .046, .12, .26, 0, .0, -.22, .05); B('tan', .03, .1, .045, 0, -.05, -.02, -.35); B('dark', .048, .1, .02, 0, -.005, -.36); B('poly', .024, .07, .06, 0, -.04, .1);
      Cz('dark', .022, .022, .28, 0, .13, .07, 14); Cz('dark', .03, .022, .06, 0, .13, .24, 14); Cz('dark', .026, .022, .05, 0, .13, -.09, 14); B('glass', .036, .036, .004, 0, .13, .272); B('dark', .02, .03, .02, 0, .1, .0); B('dark', .02, .03, .02, 0, .1, .14);
      B('dark', .012, .012, .03, .035, .06, .02, 0, 0, .6); B('metal', .005, .1, .008, .015, -.03, .48, .3); B('metal', .005, .1, .008, -.015, -.03, .48, -.3);
    } else { /* مسدس */
      B('metal', .03, .036, .19, 0, .052, .05); B('dark', .031, .004, .19, 0, .071, .05); B('poly', .028, .03, .15, 0, .022, .06); B('poly', .028, .1, .045, 0, -.03, -.005, -.28);
      B('metal', .006, .006, .04, 0, .0, .045); B('dark', .006, .008, .006, 0, .074, .14); B('dark', .014, .008, .006, 0, .074, -.04); Cz('dark', .006, .006, .01, 0, .052, .147, 8);
    }
    const MAT = { metal: new T.MeshStandardMaterial({ color: 0x24272b, metalness: .75, roughness: .38 }), poly: new T.MeshStandardMaterial({ color: 0x1b1d20, metalness: .1, roughness: .72 }), dark: new T.MeshStandardMaterial({ color: 0x0e0f11, metalness: .5, roughness: .5 }), glass: new T.MeshStandardMaterial({ color: 0x2a4a7a, metalness: .9, roughness: .05, emissive: 0x0a1a33 }), tan: new T.MeshStandardMaterial({ color: 0x8a7650, metalness: .05, roughness: .8 }) };
    const meshes = [];
    for (const k in parts) { if (!parts[k].length) continue; let n = 0; for (const g of parts[k]) n += g.attributes.position.count; const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3); let o = 0; for (const g of parts[k]) { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; g.dispose(); } const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('normal', new T.BufferAttribute(nor, 3)); geo.computeBoundingBox(); meshes.push([geo, MAT[k]]); }
    const box = new T.Box3(); meshes.forEach(([g]) => box.union(g.boundingBox));
    return RG[name] = { meshes, box };
  }

  /* سلاح مُحجَّم. hold=true: الأصل عند المقبض (للإمساك)، وإلا يتمركز في الوسط (لمنظور الشخص الأول) */
  /* موضع اليد الثانية وارتفاع السبطانة لكل سلاح (بالأمتار في نموذج realGun) */
  const FORE = { rifle: .27, smg: .2, shotgun: .3, sniper: .24, pistol: .01 }, BORE = { rifle: .062, smg: .045, shotgun: .052, sniper: .05, pistol: .052 };
  function weapon(name, hold) {
    if (!ready) return null;
    if (!RG[name] && !['pistol', 'smg', 'shotgun', 'rifle', 'sniper'].includes(name)) name = 'rifle';
    const R = realGun(name), g = new T.Group(), h = new T.Group(), size = R.box.getSize(new T.Vector3()), c = R.box.getCenter(new T.Vector3());
    for (const [geo, mat] of R.meshes) { const me = new T.Mesh(geo, mat); me.castShadow = true; if (!hold) me.position.sub(c); h.add(me); }
    const s = ((hold ? WLEN : VLEN)[name] || .5) / size.z; h.scale.setScalar(s); g.add(h);
    const o = hold ? new T.Vector3() : c.clone().multiplyScalar(-1);
    g.userData = { len: size.z * s, name, mz: (R.box.max.z + o.z) * s, my: (BORE[name] + o.y) * s, fore: (FORE[name] + o.z) * s, grip: new T.Vector3(o.x * s, o.y * s, o.z * s), foreV: new T.Vector3(o.x * s, (BORE[name] - .045 + o.y) * s, (FORE[name] + o.z) * s) };
    return g;
  }


  const V = () => new T.Vector3(), Q = () => new T.Quaternion();
  let UP = null;
  const WALK_V = .8 * SCALE / .64, RUN_V = 1.16 * SCALE / .64;

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

  /* ---------- عتاد عسكري: خوذة وصدرية بجيوب، مقاسة من رؤوس النموذج نفسه ومثبتة على عظام الرأس والجذع ---------- */
  const GEAR = {}, GEARC = [[0x7b6a4c, 0x5e5038], [0x46523a, 0x343d2b]];
  /* groups: { عظمة التثبيت: [العظام التي تُقاس رؤوسها] } */
  function measure(def, model, groups) {
    model.updateMatrixWorld(true); const out = {};
    for (const bn in groups) {
      const bone = model.getObjectByName(bn); if (!bone) continue; const box = new T.Box3(), v = new T.Vector3();
      model.traverse(o => { if (!o.isSkinnedMesh) return; const ids = groups[bn].map(n => o.skeleton.bones.findIndex(b => b.name === n)).filter(i => i >= 0); if (!ids.length) return; const si = o.geometry.attributes.skinIndex, sw = o.geometry.attributes.skinWeight;
        for (let i = 0; i < si.count; i++) { let w = 0; for (let k = 0; k < 4; k++) if (ids.includes(si.getComponent(i, k))) w += sw.getComponent(i, k); if (w > .5) { o.getVertexPosition(i, v); v.applyMatrix4(o.matrixWorld); box.expandByPoint(v); } } });
      if (box.isEmpty()) continue;
      const inv = bone.matrixWorld.clone().invert(), bq = new T.Quaternion(), bs = new T.Vector3(); bone.matrixWorld.decompose(new T.Vector3(), bq, bs);
      out[bn] = { box, inv, q: bq.invert(), s: bs };
    }
    return out;
  }
  function addGear(def, model, team) {
    const G0 = GEAR[def.k] || (GEAR[def.k] = measure(def, model, { Head: ['Head'], Torso: ['Torso', 'Abdomen', 'ShoulderL', 'ShoulderR', 'Neck'] })), mats = [], cols = GEARC[team ? 1 : 0];
    const mat = c => { const m = new T.MeshStandardMaterial({ color: c, roughness: .78, metalness: .05 }); mats.push(m); return m; };
    const attach = (bn, build) => { const g0 = G0[bn], bone = model.getObjectByName(bn); if (!g0 || !bone) return; const wrap = new T.Group(), c = g0.box.getCenter(new T.Vector3()), sz = g0.box.getSize(new T.Vector3());
      build(wrap, c, sz); const holder = new T.Group(); holder.add(wrap); /* من فضاء العالم (وضع القياس) إلى فضاء العظمة */ const mW = new T.Matrix4().makeTranslation(0, 0, 0); holder.applyMatrix4(g0.inv); bone.add(holder); };
    /* خوذة: قبة بحافة وحامل أمامي */
    attach('Head', (w, c, sz) => { const r = Math.max(sz.x, sz.z) * .5, hm = mat(cols[0]);
      const dome = new T.Mesh(new T.SphereGeometry(r, 20, 12, 0, Math.PI * 2, 0, Math.PI * .56), hm); dome.scale.set(1, .78, 1.04); dome.position.set(c.x, c.y + sz.y * .5 - r * .66, c.z - r * .04); w.add(dome);
      const rim = new T.Mesh(new T.TorusGeometry(r * .99, r * .05, 6, 24), hm); rim.rotation.x = Math.PI / 2; rim.scale.set(1, 1.05, 1); rim.position.set(c.x, dome.position.y - r * .12, dome.position.z); w.add(rim);
      const nv = new T.Mesh(new T.BoxGeometry(r * .32, r * .22, r * .12), mat(0x15171a)); nv.position.set(c.x, dome.position.y + r * .38, dome.position.z + r * .93); w.add(nv);
      const strap = new T.Mesh(new T.BoxGeometry(r * 2.02, r * .1, r * .1), mat(0x2a2a2a)); strap.position.set(c.x, dome.position.y + r * .05, dome.position.z); w.add(strap); });
    /* صدرية: لوح أمامي وخلفي بجيوب للمخازن */
    attach('Torso', (w, c, sz) => { const vm = mat(cols[1]), pm = mat(cols[0]);
      const body = new T.Mesh(new T.BoxGeometry(sz.x * .78, sz.y * .78, sz.z * 1.16), vm); body.position.set(c.x, c.y - sz.y * .06, c.z + sz.z * .02); w.add(body);
      for (const sx of [-1, 1]) { const st = new T.Mesh(new T.BoxGeometry(sz.x * .13, sz.y * .2, sz.z * 1.12), vm); st.position.set(c.x + sx * sz.x * .22, c.y + sz.y * .4, c.z); w.add(st); }
      for (let k = -1; k <= 1; k++) { const p = new T.Mesh(new T.BoxGeometry(sz.x * .18, sz.y * .28, sz.z * .2), pm); p.position.set(c.x + k * sz.x * .21, c.y - sz.y * .2, c.z + sz.z * .66); w.add(p); }
      const rad = new T.Mesh(new T.BoxGeometry(sz.x * .1, sz.y * .26, sz.z * .14), mat(0x1c1e20)); rad.position.set(c.x + sz.x * .3, c.y + sz.y * .14, c.z + sz.z * .62); w.add(rad); });
    model.traverse(o => { if (o.isMesh && !o.isSkinnedMesh) o.castShadow = true; });
    return mats;
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
    model.scale.setScalar(SCALE); body.add(model); root.add(body); root.updateMatrixWorld(true);
    const gearMats = addGear(def, model, team);
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

    const S = { root, mixer, model, dead: 0, kick: 0, cr: 0, gunName: '', g: null, cur: null, tag: null, blob: null, band: ring, def,
      setGun(n) {
        if (S.gunName === n) return; S.gunName = n;
        if (S.g) holder.remove(S.g);
        S.g = weapon(n, true); if (S.g) holder.add(S.g);
        flash.position.set(0, S.g ? S.g.userData.my : .015, S.g ? S.g.userData.mz : .2);
      },
      setFace() { },
      side: null,
      /* ally=true حليف (أزرق)، false عدو (أحمر)، null لون الفريق */
      setSide(ally) { if (S.side === ally) return; S.side = ally; const c = new T.Color(ally === 'self' ? 0 : TEAMC[team]); /* لون الفريق في العالم مطابق للشريط العلوي (مهاجمون برتقالي، مدافعون أزرق) */ S.rimC = c.clone(); uRim.value.copy(S.dead ? new T.Color(0) : c); ring.material.color.copy(c); ring.material.opacity = ally === false || ally === 'self' ? 0 : .55; },
      hit() { st0.hitT = .32; },
      play(name, fade, ts) {
        const a = acts[name] || acts.Idle_Gun; if (!a) return;
        if (ts != null) a.setEffectiveTimeScale(ts);
        if (S.cur === a) return;
        const prev = S.cur; S.cur = a;
        a.enabled = true; a.reset(); a.setEffectiveWeight(1); if (ts == null) a.setEffectiveTimeScale(1); a.play();
        if (prev) prev.crossFadeTo(a, fade == null ? .18 : fade, false);
      },
      update(dtReal, st) {
        const dtv = Math.max(dtReal || .016, 1e-3), dt = Math.min(dtv, .1);
        /* السرعة والاتجاه من حركة الجذر الفعلية */
        const px = root.position.x, pz = root.position.z, py = root.position.y;
        if (st0.lx == null) { st0.lx = px; st0.lz = pz; st0.ly = py; }
        const ivx = (px - st0.lx) / dtv, ivz = (pz - st0.lz) / dtv, ivy = (py - st0.ly) / dtv;
        st0.lx = px; st0.lz = pz; st0.ly = py;
        const k = 1 - Math.exp(-dt * 10); st0.vx += (ivx - st0.vx) * k; st0.vz += (ivz - st0.vz) * k; st0.vy += (ivy - st0.vy) * Math.min(1, dt * 14);
        let spd = Math.hypot(st0.vx, st0.vz); if (spd > 14) { spd = 0; st0.vx = st0.vz = 0; }
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
        if (st.dead) { if (!S.dead) { uRim.value.setRGB(0, 0, 0); ring.visible = false; } S.dead = Math.min(1, S.dead + dt * 3); S.play('Death', .12); } /* الجثة بلا توهج ولا حلقة */
        else {
          if (S.dead) { if (S.rimC) uRim.value.copy(S.rimC); ring.visible = true; } S.dead = 0;
          if (st0.air > 0) S.play('Jump_Idle', .12);
          else if (st0.hitT > 0 && acts.HitReact) S.play('HitReact', .06);
          /* سرعة المقطع = السرعة الفعلية ÷ خطوة المقطع المقاسة (مشي 0.8، جري 1.16 وحدة/ث عند هذا المقاس) فلا تنزلق القدمان */
          else if (S.cr > .5) S.play(spd > .35 ? 'Walk_Gun' : 'Duck', .2, spd > .35 ? dir * Math.min(2.2, spd / WALK_V) : 1);
          else if (spd > 1.05) S.play('Run_Gun', .18, dir * Math.max(.8, Math.min(2.6, spd / RUN_V)));
          else if (spd > .3) S.play('Walk_Gun', .2, dir * Math.max(.5, Math.min(2.2, spd / WALK_V)));
          else S.play('Idle_Gun', .25);
        }
        mixer.update(dt); if (bone.head) bone.head.scale.setScalar(opt.headK || HEADK); /* رأس أصغر: نسب أقرب لجندي بالغ بدل طفل كرتوني */

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
            if (two) tmp.tg.copy(g.userData.foreV); else tmp.tg.set(0, -.025, -.01); holder.localToWorld(tmp.tg);
            ik([O.la, O.ua], O.h, tmp.tg, 3);
          }
          flash.visible = S.kick > .72; if (flash.visible) flash.scale.setScalar(.7 + Math.random() * .7);
        } else flash.visible = false;

        ring.visible = !st.dead;
      },
      dispose() {
        mixer.stopAllAction(); mixer.uncacheRoot(model);
        mats.forEach(m => m.dispose()); gearMats.forEach(m => m.dispose()); ring.geometry.dispose(); flash.geometry.dispose();
        if (root.parent) root.parent.remove(root);
      }
    };
    S.play('Idle_Gun', 0); S.setGun(opt.gun || 'pistol');
    return S;
  }

  /* ذراعا الشخص الأول: من نموذج الشخصية نفسها (الجلد والأكمام)، تمسكان السلاح باليدين عبر IK.
     المجموعة الناتجة تُوضع أمام كاميرا العرض كما كان النموذج الإجرائي (السلاح في الأصل، فوهته نحو -z). */
  /* قفازات وأكمام تكتيكية لذراعي المنظور الأول: الرؤوس المرتبطة بعظام الأصابع تصير قفازاً داكناً،
     وباقي الذراع كمّاً بلون الفريق، مع الإبقاء على تفاصيل الخامة كتظليل */
  function tactical(mat, mesh, team) {
    const bones = mesh.skeleton.bones, mask = new Float32Array(64); bones.forEach((b, i) => { if (i < 64 && /Index|Middle|Pinky|Ring|Thumb/.test(b.name)) mask[i] = 1; });
    const uM = { value: mask }, glove = new T.Color(0x1d1f22), sleeve = new T.Color(team ? 0x4a5640 : 0x7d6d50);
    mat.onBeforeCompile = sh => {
      sh.uniforms.uFing = uM; sh.uniforms.uGlove = { value: glove }; sh.uniforms.uSleeve = { value: sleeve };
      sh.vertexShader = 'uniform float uFing[64];\nvarying float vGl;\n' + sh.vertexShader.replace('#include <skinning_vertex>', '#include <skinning_vertex>\n  vGl = uFing[int(skinIndex.x)] * skinWeight.x + uFing[int(skinIndex.y)] * skinWeight.y + uFing[int(skinIndex.z)] * skinWeight.z + uFing[int(skinIndex.w)] * skinWeight.w;');
      sh.fragmentShader = 'uniform vec3 uGlove;\nuniform vec3 uSleeve;\nvarying float vGl;\n' + sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n  { float lum = dot(diffuseColor.rgb, vec3(.3, .59, .11)); vec3 tac = mix(uSleeve, uGlove, smoothstep(.25, .6, vGl)); diffuseColor.rgb = tac * (.62 + lum * .75); }');
    };
    mat.customProgramCacheKey = () => 'tac' + team; if ('roughness' in mat) mat.roughness = .85;
  }
  function viewArms(name, outfit, AS, team) {
    if (!ready) return null;
    const def = CHARS[(outfit | 0) % CHARS.length], src = cache.ch[def.k];
    const g = new T.Group(), gn = weapon(name, false); if (!gn) return null;
    const len = VLEN[name] || .5, pistol = name === 'pistol', zo = pistol ? .05 : -.07;
    gn.rotation.y = Math.PI; gn.position.z = zo; g.add(gn);
    const model = window.GLX.SkeletonUtils.clone(src.scene), mats = [];
    const junk = []; model.traverse(o => { if (o.isMesh && !o.isSkinnedMesh) junk.push(o); }); junk.forEach(o => o.parent && o.parent.remove(o));
    model.traverse(o => { if (o.isMesh) { o.frustumCulled = false; o.castShadow = false; o.material = o.material.clone(); if (o.isSkinnedMesh) tactical(o.material, o, team | 0); mats.push(o.material); } });
    const B = n => model.getObjectByName(n);
    ['Head', 'UpperLegL', 'UpperLegR', 'FootL', 'FootR', 'Neck'].forEach(n => { const b = B(n); if (b) b.scale.setScalar(.001); });
    /* الكف الكرتونية كبيرة: نصغّر الأصابع قليلاً */
    const fingers = []; model.traverse(o => { if (o.isBone && /^(Index1|Middle1|Pinky1|Ring1|Thumb1)/.test(o.name)) fingers.push(o); });
    const sc = AS || .4; model.scale.setScalar(sc); model.rotation.y = Math.PI;
    const holder = new T.Group(); holder.add(model); g.add(holder);
    const mixer = new T.AnimationMixer(model), clip = src.clips.find(c => c.name === 'Idle_Gun') || src.clips[0];
    const act = clip ? mixer.clipAction(clip) : null; if (act) act.play();
    const M = { ua: B('UpperArmL'), la: B('LowerArmL'), h: B('Middle1L') }, O = { ua: B('UpperArmR'), la: B('LowerArmR'), h: B('Middle1R') };
    gn.updateMatrix(); const chest = B('Torso') || B('Abdomen'), tg = new T.Vector3(), cw = new T.Vector3(), grip = gn.userData.grip.clone().applyMatrix4(gn.matrix), foreP = gn.userData.foreV.clone().applyMatrix4(gn.matrix);
    g.userData = {
      mz: gn.userData.mz, left: null, arms: holder,
      /* يُستدعى بعد تحديد موضع المجموعة أمام الكاميرا */
      tick(now, cam) {
        if (!act) return;
        mixer.setTime(((now || 0) / 1000) % clip.duration); for (const b of fingers) b.scale.setScalar(.84);
        /* الصدر خلف المقبض وأسفله، خارج مجال الرؤية، فتصل الذراعان إلى السلاح */
        g.updateMatrixWorld(true); holder.position.set(0, 0, 0); holder.updateMatrixWorld(true);
        chest.getWorldPosition(cw); g.worldToLocal(cw);
        holder.position.set(grip.x - cw.x - .015, grip.y - cw.y - (pistol ? .12 : .15), grip.z - cw.z + (pistol ? .16 : .1));
        holder.updateMatrixWorld(true);
        if (M.ua && M.la && M.h) { tg.copy(grip); g.localToWorld(tg); ik([M.la, M.ua], M.h, tg, 5); }
        if (O.ua && O.la && O.h) { if (pistol) tg.set(grip.x - .012, grip.y - .02, grip.z - .01); else tg.copy(foreP); g.localToWorld(tg); ik([O.la, O.ua], O.h, tg, 5); }
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
      const c = character({ outfit: i, team, gun: 'rifle', headK: w <= 100 ? 1 : 0 }); /* صور الواجهة الصغيرة مقصوصة على الوجه فتبقى بالرأس الأصلي؛ الصور الكاملة بالنسب الجديدة */
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

  /* أيقونة سلاح جانبية مرسومة من النموذج نفسه (للمتجر) */
  const GI = {};
  function gunIcon(name) {
    if (GI[name]) return GI[name]; if (!ready) return '';
    try { if (!TR) thumb(0, 0, 40, 40);
      const g = weapon(name, false), sc = new T.Scene(); sc.add(new T.HemisphereLight(0xffffff, 0x445566, 2.2)); const d = new T.DirectionalLight(0xffffff, 2.6); d.position.set(1, 2, 2); sc.add(d); const bk = new T.DirectionalLight(0xbfd8ff, 2); bk.position.set(-1, .5, -2); sc.add(bk); sc.add(g);
      /* أيقونة المتجر: صورة ظلية فاتحة مع الحفاظ على التظليل (السلاح الحقيقي أسود فلا يظهر على خلفية داكنة) */
      const own = []; const wt = new T.Color(0xe8edf3); g.traverse(o => { if (o.material && !Array.isArray(o.material)) { const k = o.material.clone(); k.metalness = Math.min(.25, k.metalness); k.roughness = Math.max(.5, k.roughness); if (k.color) k.color.lerp(wt, .62); if (k.map) k.map = null; k.emissive && k.emissive.setRGB(0, 0, 0); o.material = k; own.push(k); } });
      g.rotation.y = -Math.PI / 2; g.updateMatrixWorld(true); const box = new T.Box3().setFromObject(g), c = box.getCenter(new T.Vector3()), sz = box.getSize(new T.Vector3());
      const hh = Math.max(sz.x * .22, sz.y * .6), hw = hh * 2.5, cam = new T.OrthographicCamera(-hw, hw, hh, -hh, -5, 5); cam.position.set(c.x, c.y, c.z + 1); cam.lookAt(c);
      TR.r.setSize(240, 96, false); TR.r.render(sc, cam); GI[name] = TR.cv.toDataURL('image/png'); own.forEach(k => k.dispose()); return GI[name];
    } catch (e) { return ''; }
  }
  window.SKM = { load, ready: () => ready, character, weapon, viewArms, vehicle, thumb, gunIcon, CHARS };
})();
