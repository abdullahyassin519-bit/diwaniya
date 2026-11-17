/* نماذج ثلاثية الأبعاد جاهزة (glTF) من حزم Quaternius بترخيص CC0 (انظر public/assets/strike/LICENSE-*.txt).
   تُحمَّل مرة واحدة قبل المباراة، وتبقى الصناعة الإجرائية في strike-world.js احتياطاً إن فشل التحميل. */
(function () {
  'use strict';
  const BASE = 'assets/strike/';
  const FILES = {
    matt: 'characters/Characters_Matt_SingleWeapon.gltf',
    sam: 'characters/Characters_Sam_SingleWeapon.gltf',
    pistol: 'weapons/Pistol.gltf', smg: 'weapons/SMG.gltf', shotgun: 'weapons/Shotgun.gltf', rifle: 'weapons/Rifle.gltf',
    car: 'vehicles/Vehicle_Sports.gltf', truck: 'vehicles/Vehicle_Truck.gltf', pickup: 'vehicles/Vehicle_Pickup.gltf'
  };
  // أطوال الأسلحة المستهدفة بالوحدات (تطابق المجسّمات الإجرائية في strike-world.js)
  const WLEN = { pistol: .22, smg: .34, shotgun: .66, rifle: .62, sniper: .66 };
  const WMAP = { pistol: 'pistol', smg: 'smg', shotgun: 'shotgun', rifle: 'rifle', sniper: 'rifle' };
  // أجزاء من الشخصية تُحذف لأنها أسلحة بيضاء مرفقة في الملف الأصلي
  const DROP = /^(Knife|WoodenBat|Axe|Spear|Guitar)/;
  const SCALE = .64;             // الطول الكلي ≈ 0.9 وحدة، ويطابق ارتفاع الصناديق في النواة
  const cache = {};
  let T = null, ready = false;

  function loadOne(url) {
    return new Promise((ok, no) => {
      new window.GLX.GLTFLoader().load(BASE + url, g => ok(g), undefined, no);
    });
  }
  /* يحمّل كل الملفات مرة واحدة. يعيد true إذا اكتمل التحميل كله. */
  async function load(THREE_) {
    T = THREE_;
    if (ready) return true;
    if (!window.GLX || !window.GLX.GLTFLoader || !window.GLX.SkeletonUtils) return false;
    try {
      const keys = Object.keys(FILES);
      const res = await Promise.all(keys.map(k => loadOne(FILES[k])));
      keys.forEach((k, i) => { cache[k] = res[i].scene; });
      ready = true;
    } catch (e) { ready = false; }
    return ready;
  }
  const isReady = () => ready;

  /* نسخة من ملف مُحمَّل مع تحديد اسم مميّز للتحديد لاحقاً */
  function cloneScene(key) { return window.GLX.SkeletonUtils.clone(cache[key]); }

  /* سلاح واحد جاهز للإمساك، طوله مضبوط، ومركزه عند الأصل */
  function weapon(name) {
    if (!ready) return null;
    const key = WMAP[name] || 'rifle', g = new T.Group(), m = cloneScene(key);
    const box = new T.Box3().setFromObject(m), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3());
    const len = Math.max(size.x, size.y, size.z), s = (WLEN[name] || .6) / len;
    m.position.sub(center); const holder = new T.Group(); holder.add(m); holder.scale.setScalar(s); g.add(holder);
    g.userData.mz = (size.z * s) / 2 + .02; g.userData.name = name;
    g.traverse(c => { if (c.isMesh) c.castShadow = true; });
    return g;
  }

  /* شخصية متحركة بالواجهة نفسها التي تستخدمها اللعبة (setGun / update / dead / root) */
  function character(opt) {
    if (!ready) return null;
    const key = (opt.outfit | 0) % 2 ? 'sam' : 'matt', root = new T.Group(), model = cloneScene(key);
    const junk = []; model.traverse(o => { if (DROP.test(o.name)) junk.push(o); }); junk.forEach(o => o.parent && o.parent.remove(o));
    model.scale.setScalar(SCALE); root.add(model);
    const band = new T.Mesh(new T.TorusGeometry(.19, .02, 6, 18), new T.MeshBasicMaterial({ color: opt.team ? 0x3b82f6 : 0xe8662a }));
    band.rotation.x = Math.PI / 2; band.position.y = .72; band.visible = false; root.add(band);
    const mixer = new T.AnimationMixer(model), acts = {};
    for (const clip of model.animations || []) acts[clip.name] = mixer.clipAction(clip);
    const hand = model.getObjectByName('LowerArmR') || model;
    const S = { root, dead: 0, kick: 0, gunName: '', cur: null, g: null, tag: null, band,
      _hold: hand,
      setGun(n) {
        if (S.gunName === n) return; S.gunName = n;
        if (S.g) hand.remove(S.g);
        S.g = weapon(n); if (S.g) { S.g.position.set(0, .06, .1); S.g.rotation.set(-1.4, 0, 0); S.g.scale.setScalar(1 / SCALE); hand.add(S.g); }
      },
      setFace() { },
      play(name, fade) {
        const a = acts[name]; if (!a || S.cur === a) return; const prev = S.cur; S.cur = a;
        a.reset().setEffectiveTimeScale(1).setEffectiveWeight(1); if (name === 'Death') { a.setLoop(T.LoopOnce, 1); a.clampWhenFinished = true; } else a.setLoop(T.LoopRepeat, Infinity);
        a.play(); if (prev) prev.crossFadeTo(a, fade || .15, false);
      },
      update(dt, st) {
        S.dead = st.dead ? Math.min(1, S.dead + dt * 3) : 0;
        if (st.dead) S.play('Death', .05);
        else if (st.cr && !st.moving) S.play('Duck', .12);
        else if (st.moving) S.play((st.spd || 0) > 2.2 ? 'Run_Gun' : 'Walk_Gun', .18);
        else S.play('Idle_Gun', .2);
        mixer.update(dt);
        if (S.kick > 0) S.kick = Math.max(0, S.kick - dt * 8);
      },
      dispose() { mixer.stopAllAction(); root.parent && root.parent.remove(root); }
    };
    S.play('Idle_Gun'); S.setGun(opt.gun || 'pistol');
    return S;
  }

  /* مركبة (جانبية أو شاحنة أو بيك أب) مُحجّمة لتملأ الخلية */
  function vehicle(kind, footprint, horiz) {
    if (!ready) return null;
    const key = kind === 'truck' ? 'truck' : kind === 'pickup' ? 'pickup' : 'car', m = cloneScene(key), g = new T.Group();
    const box = new T.Box3().setFromObject(m), size = box.getSize(new T.Vector3()), center = box.getCenter(new T.Vector3());
    m.position.sub(center); const len = Math.max(size.x, size.z), s = (footprint * .92) / len; const h = new T.Group(); h.add(m); h.scale.setScalar(s); g.add(h);
    if (horiz) h.rotation.y = Math.PI / 2;
    g.userData.height = size.y * s;
    g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
    return g;
  }

  window.SKM = { load, ready: isReady, character, weapon, vehicle, FILES };
})();
