/* طخطخة — بناء العالم ثلاثي الأبعاد: خامات مرسومة برمجياً، مبانٍ وعوائق لكل خريطة، مجسمات الجنود والأسلحة. يحتاج THREE عند الاستدعاء فقط. */
(function () {
  let T, TX = {};
  const hash = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + (s || 0) * 1442695041) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const cvs = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return c; };
  function tex(key, w, h, draw, clamp) { if (TX[key]) return TX[key]; const t = new T.CanvasTexture(cvs(w, h, draw)); if (!clamp) t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; return TX[key] = t; }
  function speck(x, w, h, n, a, sz) { for (let i = 0; i < n; i++) { x.fillStyle = `rgba(${Math.random() < .5 ? '0,0,0' : '255,255,255'},${Math.random() * a})`; x.fillRect(Math.random() * w, Math.random() * h, Math.random() * (sz || 2) + 1, Math.random() * (sz || 2) + 1); } }
  const plaster = (x, w, h) => { x.fillStyle = '#ebe6dc'; x.fillRect(0, 0, w, h); speck(x, w, h, 1500, .07); for (let i = 0; i < 7; i++) { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(90,70,50,.10)'); g.addColorStop(1, 'rgba(90,70,50,0)'); x.fillStyle = g; x.fillRect(Math.random() * w, 0, 6 + Math.random() * 14, h * (.4 + Math.random() * .6)); } };
  const DRAW = {
    plaster,
    gPlain(x, w, h) { plaster(x, w, h); x.fillStyle = 'rgba(70,60,50,.28)'; x.fillRect(0, h * .8, w, h * .2); x.strokeStyle = 'rgba(60,50,40,.35)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(40, 30); x.lineTo(70, 90); x.lineTo(60, 150); x.stroke(); },
    gDoor(x, w, h) { DRAW.gPlain(x, w, h); x.fillStyle = '#4a3220'; x.beginPath(); x.moveTo(78, h); x.lineTo(78, 100); x.quadraticCurveTo(128, 50, 178, 100); x.lineTo(178, h); x.fill(); x.fillStyle = '#6d4a2e'; x.fillRect(86, 110, 38, 60); x.fillRect(132, 110, 38, 60); x.fillRect(86, 180, 38, 66); x.fillRect(132, 180, 38, 66); x.fillStyle = '#d9b24a'; x.beginPath(); x.arc(126, 178, 4, 0, 7); x.fill(); },
    gShop(x, w, h, txt, col) { plaster(x, w, h); x.fillStyle = col; x.fillRect(10, 22, w - 20, 54); x.fillStyle = '#fff'; x.font = 'bold 40px Tahoma,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, 50); for (let y = 84; y < h; y += 10) { x.fillStyle = y / 10 % 2 ? '#8c9197' : '#767b82'; x.fillRect(22, y, w - 44, 10); } x.fillStyle = '#3d4146'; x.fillRect(22, h - 12, w - 44, 12); },
    win1(x, w, h) { plaster(x, w, h); x.fillStyle = '#c9c1b2'; x.fillRect(66, 52, 124, 150); const g = x.createLinearGradient(0, 60, 0, 195); g.addColorStop(0, '#22344a'); g.addColorStop(1, '#4f6b85'); x.fillStyle = g; x.fillRect(74, 60, 108, 134); x.fillStyle = 'rgba(255,255,255,.14)'; x.beginPath(); x.moveTo(74, 150); x.lineTo(150, 60); x.lineTo(176, 60); x.lineTo(74, 185); x.fill(); x.fillStyle = '#c9c1b2'; x.fillRect(125, 60, 6, 134); x.fillRect(74, 122, 108, 6); x.fillStyle = '#b3aa98'; x.fillRect(58, 200, 140, 10); },
    win2(x, w, h) { plaster(x, w, h); x.fillStyle = '#5b3d25'; x.fillRect(62, 46, 132, 162); x.strokeStyle = '#8a6238'; x.lineWidth = 3; for (let i = -160; i < 160; i += 14) { x.beginPath(); x.moveTo(62 + i, 46); x.lineTo(62 + i + 162, 208); x.stroke(); x.beginPath(); x.moveTo(194 - i, 46); x.lineTo(194 - i - 162, 208); x.stroke(); } x.clearRect(0, 0, 62, h); x.clearRect(194, 0, 62, h); x.clearRect(0, 0, w, 46); x.clearRect(0, 208, w, 48); x.globalCompositeOperation = 'destination-over'; plaster(x, w, h); x.globalCompositeOperation = 'source-over'; x.strokeStyle = '#3d2817'; x.lineWidth = 6; x.strokeRect(62, 46, 132, 162); },
    win3(x, w, h) { DRAW.win1(x, w, h); x.fillStyle = '#d7d9db'; x.fillRect(150, 206, 70, 40); x.strokeStyle = '#8e9296'; x.lineWidth = 2; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(156, 214 + i * 7); x.lineTo(214, 214 + i * 7); x.stroke(); } x.fillStyle = 'rgba(232,193,112,.75)'; x.fillRect(74, 60, 51, 62); },
    stone(x, w, h) { x.fillStyle = '#6f695e'; x.fillRect(0, 0, w, h); for (let r = 0; r < 4; r++) for (let c = -1; c < 3; c++) { const v = 150 + Math.random() * 50 | 0; x.fillStyle = `rgb(${v + 8},${v + 2},${v - 12})`; x.fillRect(c * 128 + (r % 2 ? 64 : 0) + 3, r * 64 + 3, 122, 58); } speck(x, w, h, 1400, .1, 3); },
    conc(x, w, h) { x.fillStyle = '#a3a6aa'; x.fillRect(0, 0, w, h); speck(x, w, h, 1800, .06); x.strokeStyle = 'rgba(40,40,45,.45)'; x.lineWidth = 2; x.strokeRect(1, 1, w - 2, h - 2); x.fillStyle = 'rgba(40,40,45,.4)'; for (const [a, b] of [[20, 20], [w - 20, 20], [20, h - 20], [w - 20, h - 20]]) { x.beginPath(); x.arc(a, b, 5, 0, 7); x.fill(); } x.fillStyle = 'rgba(60,50,40,.12)'; x.fillRect(0, h * .7, w, h * .3); },
    concHaz(x, w, h) { DRAW.conc(x, w, h); for (let i = -h; i < w; i += 40) { x.fillStyle = '#e2b616'; x.beginPath(); x.moveTo(i, h); x.lineTo(i + 20, h); x.lineTo(i + 52, h - 32); x.lineTo(i + 32, h - 32); x.fill(); } x.fillStyle = 'rgba(20,20,20,.75)'; x.globalCompositeOperation = 'destination-over'; x.fillRect(0, h - 32, w, 32); x.globalCompositeOperation = 'source-over'; },
    corr(x, w, h) { for (let i = 0; i < w; i += 16) { const g = x.createLinearGradient(i, 0, i + 16, 0); g.addColorStop(0, '#9c9c9c'); g.addColorStop(.5, '#f2f2f2'); g.addColorStop(1, '#a8a8a8'); x.fillStyle = g; x.fillRect(i, 0, 16, h); } x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(60, 96, 136, 44); x.fillStyle = 'rgba(30,30,30,.8)'; x.font = 'bold 26px sans-serif'; x.textAlign = 'center'; x.fillText('DIWAN', 128, 128); for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(110,60,25,${Math.random() * .35})`; x.fillRect(Math.random() * w, Math.random() * h, 3 + Math.random() * 10, 2 + Math.random() * 14); } x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, 0, w, 8); x.fillRect(0, h - 8, w, 8); },
    crate(x, w, h) { for (let i = 0; i < 5; i++) { const v = 150 + Math.random() * 30 | 0; x.fillStyle = `rgb(${v + 30},${v - 8},${v - 70})`; x.fillRect(0, i * h / 5, w, h / 5 - 2); } speck(x, w, h, 500, .1); x.strokeStyle = '#6a4a22'; x.lineWidth = 22; x.strokeRect(11, 11, w - 22, h - 22); x.lineWidth = 16; x.beginPath(); x.moveTo(20, 20); x.lineTo(w - 20, h - 20); x.stroke(); x.fillStyle = 'rgba(30,20,10,.6)'; for (const [a, b] of [[12, 12], [w - 12, 12], [12, h - 12], [w - 12, h - 12]]) { x.beginPath(); x.arc(a, b, 4, 0, 7); x.fill(); } },
    metal(x, w, h) { x.fillStyle = '#767c84'; x.fillRect(0, 0, w, h); for (let i = 0; i < 300; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * .08})`; x.fillRect(0, Math.random() * h, w, 1); } },
    paver(x, w, h) { x.fillStyle = '#8f8372'; x.fillRect(0, 0, w, h); for (let r = 0; r < 8; r++) for (let c = -1; c < 5; c++) { const v = 168 + Math.random() * 30 | 0; x.fillStyle = `rgb(${v + 14},${v},${v - 22})`; x.fillRect(c * 64 + (r % 2 ? 32 : 0) + 2, r * 32 + 2, 60, 28); } speck(x, w, h, 1200, .08); },
    conFloor(x, w, h) { x.fillStyle = '#878a8e'; x.fillRect(0, 0, w, h); speck(x, w, h, 2500, .06, 3); x.strokeStyle = 'rgba(30,30,35,.5)'; x.lineWidth = 3; x.strokeRect(0, 0, w, h); for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(30,30,30,.1)'; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, 20 + Math.random() * 30, 10 + Math.random() * 20, Math.random() * 3, 0, 7); x.fill(); } },
    cobble(x, w, h) { x.fillStyle = '#5d5a50'; x.fillRect(0, 0, w, h); for (let r = 0; r < 8; r++) for (let c = -1; c < 9; c++) { const v = 140 + Math.random() * 50 | 0; x.fillStyle = `rgb(${v + 6},${v + 4},${v - 10})`; x.beginPath(); x.ellipse(c * 32 + (r % 2 ? 16 : 0) + 16, r * 32 + 16, 14, 13, 0, 0, 7); x.fill(); } speck(x, w, h, 600, .08); },
    roof(x, w, h) { x.fillStyle = '#9a9384'; x.fillRect(0, 0, w, h); speck(x, w, h, 3000, .12); },
    ceil(x, w, h) { for (let i = 0; i < w; i += 32) { const g = x.createLinearGradient(i, 0, i + 32, 0); g.addColorStop(0, '#2b3036'); g.addColorStop(.5, '#4a5059'); g.addColorStop(1, '#2b3036'); x.fillStyle = g; x.fillRect(i, 0, 32, h); } x.fillStyle = '#1d2126'; x.fillRect(0, 0, w, 14); x.fillRect(0, h / 2, w, 10); },
    sack(x, w, h) { x.fillStyle = '#b8a577'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(80,65,30,.25)'; for (let i = 0; i < w; i += 6) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); } x.strokeStyle = 'rgba(60,45,20,.6)'; x.lineWidth = 5; for (let r = 0; r <= 3; r++) { x.beginPath(); x.moveTo(0, r * h / 3); x.lineTo(w, r * h / 3); x.stroke(); for (let c = 0; c < 3; c++) { x.beginPath(); x.moveTo(c * w / 2 + (r % 2 ? w / 4 : 0), r * h / 3); x.lineTo(c * w / 2 + (r % 2 ? w / 4 : 0), (r + 1) * h / 3); x.stroke(); } } },
    wood(x, w, h) { x.fillStyle = '#7a5733'; x.fillRect(0, 0, w, h); for (let i = 0; i < 200; i++) { x.fillStyle = `rgba(40,25,10,${Math.random() * .2})`; x.fillRect(Math.random() * w, 0, 1 + Math.random() * 2, h); } },
    car(x, w, h) { x.fillStyle = '#f0f0f0'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(0,0,0,.2)'; x.fillRect(0, h * .55, w, 4); speck(x, w, h, 300, .05); },
    glass(x, w, h) { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#1b2836'); g.addColorStop(.5, '#3d5670'); g.addColorStop(1, '#1b2836'); x.fillStyle = g; x.fillRect(0, 0, w, h); },
    cloth(x, w, h) { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(0,0,0,.12)'; for (let i = 0; i < w; i += 16) x.fillRect(i, 0, 6, h); },
    shemagh(x, w, h) { x.fillStyle = '#f4f0ea'; x.fillRect(0, 0, w, h); x.fillStyle = '#b3202c'; for (let r = 0; r < 16; r++) for (let c = 0; c < 16; c++) if ((r + c) % 2) x.fillRect(c * 8 + 1, r * 8 + 1, 6, 6); },
    camo(x, w, h) { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(0,0,0,${.1 + Math.random() * .25})`; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, 6 + Math.random() * 18, 4 + Math.random() * 10, Math.random() * 3, 0, 7); x.fill(); } },
  };
  const SHOPS = [['بقالة', '#1f7a4d'], ['مخبز', '#b5651d'], ['حلّاق', '#2a5db0'], ['خيّاط', '#8a2d5c']];
  /* مُجمِّع الهندسة: كل خامة شبكة واحدة مدموجة */
  function Geo() { this.b = {}; }
  Geo.prototype.q = function (mat, p, n, uv, col) { const g = this.b[mat] || (this.b[mat] = { p: [], n: [], u: [], c: [], i: [] }), k = g.p.length / 3; for (let j = 0; j < 12; j++) g.p.push(p[j]); for (let j = 0; j < 4; j++) { g.n.push(n[0], n[1], n[2]); g.c.push(col[0], col[1], col[2]); } g.u.push(uv[0], uv[1], uv[2], uv[1], uv[2], uv[3], uv[0], uv[3]); g.i.push(k, k + 1, k + 2, k, k + 2, k + 3); };
  /* وجه عمودي: dir من 0..3 = +Z, -Z, +X, -X */
  Geo.prototype.face = function (mat, dir, cx, cz, hw, y0, y1, uv, col, off) {
    const o = off || 0; let p, n;
    if (dir === 0) { p = [cx - hw, y0, cz + o, cx + hw, y0, cz + o, cx + hw, y1, cz + o, cx - hw, y1, cz + o]; n = [0, 0, 1]; }
    else if (dir === 1) { p = [cx + hw, y0, cz - o, cx - hw, y0, cz - o, cx - hw, y1, cz - o, cx + hw, y1, cz - o]; n = [0, 0, -1]; }
    else if (dir === 2) { p = [cx + o, y0, cz + hw, cx + o, y0, cz - hw, cx + o, y1, cz - hw, cx + o, y1, cz + hw]; n = [1, 0, 0]; }
    else { p = [cx - o, y0, cz - hw, cx - o, y0, cz + hw, cx - o, y1, cz + hw, cx - o, y1, cz - hw]; n = [-1, 0, 0]; }
    this.q(mat, p, n, uv, col);
  };
  Geo.prototype.top = function (mat, x0, z0, x1, z1, y, uv, col, down) { if (down) this.q(mat, [x0, y, z0, x1, y, z0, x1, y, z1, x0, y, z1], [0, -1, 0], uv, col); else this.q(mat, [x0, y, z1, x1, y, z1, x1, y, z0, x0, y, z0], [0, 1, 0], uv, col); };
  Geo.prototype.box = function (mat, cx, cy, cz, sx, sy, sz, col, us, topMat) {
    const s = us == null ? 1 : us, y0 = cy - sy / 2, y1 = cy + sy / 2;
    this.face(mat, 0, cx, cz + sz / 2, sx / 2, y0, y1, [0, 0, sx * s, sy * s], col); this.face(mat, 1, cx, cz - sz / 2, sx / 2, y0, y1, [0, 0, sx * s, sy * s], col);
    this.face(mat, 2, cx + sx / 2, cz, sz / 2, y0, y1, [0, 0, sz * s, sy * s], col); this.face(mat, 3, cx - sx / 2, cz, sz / 2, y0, y1, [0, 0, sz * s, sy * s], col);
    this.top(topMat || mat, cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, y1, [0, 0, sx * s, sz * s], col); if (y0 > .01) this.top(topMat || mat, cx - sx / 2, cz - sz / 2, cx + sx / 2, cz + sz / 2, y0, [0, 0, sx * s, sz * s], col, true);
  };
  Geo.prototype.cyl = function (mat, cx, y0, cz, r, h, col, seg) {
    const n = seg || 10; for (let i = 0; i < n; i++) { const a0 = i / n * 6.2832, a1 = (i + 1) / n * 6.2832, x0 = cx + Math.sin(a0) * r, z0 = cz + Math.cos(a0) * r, x1 = cx + Math.sin(a1) * r, z1 = cz + Math.cos(a1) * r, am = (a0 + a1) / 2;
      this.q(mat, [x0, y0, z0, x1, y0, z1, x1, y0 + h, z1, x0, y0 + h, z0], [Math.sin(am), 0, Math.cos(am)], [i / n * 2, 0, (i + 1) / n * 2, h * 2], col); this.q(mat, [cx, y0 + h, cz, x0, y0 + h, z0, x1, y0 + h, z1, cx, y0 + h, cz], [0, 1, 0], [0, 0, .2, .2], col); }
  };
  const THEMES = {
    hara: { sky: ['#2f6fc4', '#9cc3ea', '#f3dcb4'], fog: 0xe9d6b3, far: 52, sun: [0xfff1d6, 3.1, -9, 18, 7], hemi: [0xcfe3ff, 0xb8a078, 1.5], floor: 'paver', amb: 'wind', step: 'stone' },
    depot: { sky: ['#14181d', '#1d232a', '#2a3038'], fog: 0x1e242b, far: 44, sun: [0xdfe9ff, 1.5, -4, 20, 3], hemi: [0xaebbd0, 0x3a3f46, 1.7], floor: 'conFloor', roofH: 3, amb: 'hum', step: 'conc' },
    castle: { sky: ['#3f86db', '#a9d0f5', '#e6f1fa'], fog: 0xd3e4f2, far: 60, sun: [0xffffff, 3.2, 10, 20, -6], hemi: [0xd6e8ff, 0x7c8f6a, 1.5], floor: 'cobble', amb: 'wind', step: 'stone' },
  };
  function build(THREE_, m, quality) {
    T = THREE_; const th = THEMES[m.theme], scene = new T.Scene(), G = new Geo(), W = m.w, H = m.h, mats = {}, disposables = [], wht = [1, 1, 1];
    const M = (key, o) => mats[key] || (mats[key] = new T.MeshLambertMaterial(Object.assign({ vertexColors: true }, o)));
    const mt = (key, w, h, o) => M(key, Object.assign({ map: tex(key, w || 256, h || 256, DRAW[key]) }, o));
    mt('plaster'); mt('gPlain'); mt('gDoor'); mt('win1'); mt('win2'); mt('win3'); mt('stone'); mt('conc'); mt('concHaz'); mt('corr'); mt('crate'); mt('metal'); mt('paver'); mt('conFloor'); mt('cobble'); mt('roof'); mt('ceil'); mt('sack'); mt('wood'); mt('car'); mt('glass'); mt('cloth', 64, 64, { side: T.DoubleSide });
    SHOPS.forEach((s, i) => M('shop' + i, { map: tex('shop' + i, 256, 256, (x, w, h) => DRAW.gShop(x, w, h, s[0], s[1])) })); M('flat', {}); M('leaf', { side: T.DoubleSide }); M('glow', { emissive: 0xffffff, emissiveIntensity: 1 });
    const at = (x, y) => x < 0 || y < 0 || x >= W || y >= H ? '#' : m.ch[y * W + x], full = (x, y) => x < 0 || y < 0 || x >= W || y >= H || m.g[y * W + x] === 1;
    const TINT = [[1, .97, .9], [.99, .9, .76], [.96, .84, .74], [.9, .88, .82], [1, .92, .84], [.85, .9, .93]], CCOL = [[.75, .22, .18], [.2, .4, .68], [.22, .5, .3], [.85, .5, .15], [.5, .5, .52]];
    const wallH = (x, y) => { const c = at(x, y); if (c === 'W') return 3.6; if (c === 'P') return 2.9; if (c === 'K') return 1.3; if (c === 'S') return 1.7; if (c === 'o' || c === 'p') return 0; if (m.theme === 'depot') return 3; if (m.theme === 'castle') return (!x || !y || x === W - 1 || y === H - 1) ? 2.6 : 2; return 1.3 + 1.2 * (1 + Math.floor(hash(x >> 2, y >> 2, 7) * 3)); };
    const NB = [[0, 1, 0], [0, -1, 1], [1, 0, 2], [-1, 0, 3]];
    G.top(th.floor, 0, 0, W, H, 0, [0, 0, W * (m.theme === 'depot' ? 1 : m.theme === 'castle' ? 3 : 2), H * (m.theme === 'depot' ? 1 : m.theme === 'castle' ? 3 : 2)], wht);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = at(x, y), i = y * W + x, cx = x + .5, cz = y + .5, r = hash(x, y, 1);
      if (c === '#' || c === 'W' || c === 'P') {
        const hgt = wallH(x, y), tint = m.theme === 'hara' ? TINT[Math.floor(hash(x >> 2, y >> 2, 3) * TINT.length)] : c === 'W' ? [.92, .9, .86] : wht, floors = Math.round((hgt - 1.3) / 1.2);
        for (const [dx, dy, d] of NB) {
          const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue; const nf = full(nx, ny), nh = nf ? wallH(nx, ny) : 0; if (nh >= hgt) continue; const fx = cx + dx * .5, fz = cz + dy * .5, hr = hash(x * 4 + d, y, 5);
          if (m.theme === 'hara') {
            if (nh < 1.3) G.face(hr < .16 ? 'shop' + (Math.floor(hr * 100) % 4) : hr < .32 ? 'gDoor' : 'gPlain', d, fx, fz, .5, nh, 1.3, [0, nh / 1.3, 1, 1], tint);
            if (hgt > 1.3) G.face(['win1', 'win2', 'win3', 'win1'][Math.floor(hash(x, y * 4 + d, 9) * 4)], d, fx, fz, .5, Math.max(1.3, nh), hgt, [0, Math.max(0, (nh - 1.3) / 1.2), 1, floors], tint);
            if (!nf) {
              if (hr < .16) { const col = [[.8, .2, .2], [.15, .5, .35], [.2, .35, .7], [.85, .6, .15]][Math.floor(hr * 100) % 4], o = .34; const p = d === 0 ? [cx - .5, 1.02, fz + o, cx + .5, 1.02, fz + o, cx + .5, 1.22, fz, cx - .5, 1.22, fz] : d === 1 ? [cx + .5, 1.02, fz - o, cx - .5, 1.02, fz - o, cx - .5, 1.22, fz, cx + .5, 1.22, fz] : d === 2 ? [fx + o, 1.02, cz + .5, fx + o, 1.02, cz - .5, fx, 1.22, cz - .5, fx, 1.22, cz + .5] : [fx - o, 1.02, cz - .5, fx - o, 1.02, cz + .5, fx, 1.22, cz + .5, fx, 1.22, cz - .5]; G.q('cloth', p, [dx * .5, .86, dy * .5], [0, 0, 4, 1], col); }
              else if (hgt > 2 && hr > .72) { const bx = fx + dx * .17, bz = fz + dy * .17, sx = dx ? .34 : .9, sz = dy ? .34 : .9; G.box('conc', bx, 1.33, bz, sx, .06, sz, tint, 1); G.box('metal', fx + dx * .33, 1.6, fz + dy * .33, dx ? .03 : .9, .03, dy ? .03 : .9, [.25, .25, .27]); for (let k = -1; k <= 1; k++) G.box('metal', fx + dx * .33 + (dx ? 0 : k * .43), 1.48, fz + dy * .33 + (dy ? 0 : k * .43), .025, .24, .025, [.25, .25, .27]); }
              else if (hgt > 2 && hr > .6) G.box('metal', fx + dx * .09, 1.75, fz + dy * .09, dx ? .18 : .4, .22, dy ? .18 : .4, [.86, .87, .88]);
            }
          } else if (m.theme === 'depot') { if (nh < 1.5) G.face('concHaz', d, fx, fz, .5, nh, 1.5, [0, nh / 1.5, 1, 1], wht); G.face('conc', d, fx, fz, .5, Math.max(1.5, nh), hgt, [0, 0, 1, 1], [.82, .84, .88]); }
          else { G.face('stone', d, fx, fz, .5, nh, hgt, [x + y, nh, x + y + 1, hgt], tint); if (!nf && hr > .86 && hgt < 3) { G.face('cloth', d, fx, fz, .22, .95, 1.75, [0, 0, 1, 1], hash(x, y, 11) < .5 ? [.7, .12, .12] : [.15, .25, .6], .012); } }
        }
        G.top(m.theme === 'castle' ? 'stone' : 'roof', x, y, x + 1, y + 1, hgt, [0, 0, .5, .5], m.theme === 'castle' ? tint : [.8, .8, .8]);
        if (m.theme === 'castle') { for (const [dx, dy] of NB) { if (full(x + dx, y + dy) && wallH(x + dx, y + dy) >= hgt) continue; G.box('stone', cx + dx * .36 + (dx ? 0 : -.25), hgt + .13, cz + dy * .36 + (dy ? 0 : -.25), .26, .26, .26, tint, .5); G.box('stone', cx + dx * .36 + (dx ? 0 : .25), hgt + .13, cz + dy * .36 + (dy ? 0 : .25), .26, .26, .26, tint, .5); } if (c === 'W') { G.box('wood', cx, hgt + .55, cz, .05, 1.1, .05, [.5, .4, .3]); G.q('cloth', [cx, hgt + .75, cz, cx + .5, hgt + .8, cz + .05, cx + .5, hgt + 1.08, cz + .05, cx, hgt + 1.08, cz], [0, 0, 1], [0, 0, 1, 1], [.75, .12, .12]); } }
        else if (m.theme === 'hara' && r < .07) G.cyl('flat', cx, hgt, cz, .28, .5, [.93, .93, .9], 10);
        else if (m.theme === 'hara' && r < .22) G.box('conc', cx, hgt + .09, cz, 1, .18, 1, tint, 1);
      } else if (c === 'y' || c === 'z' || c === 'w') { const sh = m.fh[i], sm = m.theme === 'depot' ? 'conc' : 'stone'; G.box(sm, cx, sh / 2, cz, 1, sh, 1, m.theme === 'depot' ? [.62, .64, .66] : [.9, .86, .8], 1); }
      else if (c === 'Q') { G.box(m.theme === 'depot' ? 'conc' : 'stone', cx, 1.3, cz, 1, 2.6, 1, [.8, .78, .74], 1); }
      else if (c === 'K') { const col = CCOL[Math.floor(hash(x >> 1, y >> 1, 4) * CCOL.length)]; for (const [dx, dy, d] of NB) if (at(x + dx, y + dy) !== 'K') G.face('corr', d, cx + dx * .5, cz + dy * .5, .5, 0, 1.3, [0, 0, 1, 1], col); G.top('metal', x, y, x + 1, y + 1, 1.3, [0, 0, 1, 1], col); }
      else if (c === 'S') { for (const [a, b] of [[-.42, -.42], [.42, -.42], [-.42, .42], [.42, .42]]) G.box('metal', cx + a, .85, cz + b, .05, 1.7, .05, [.25, .35, .6]); for (let k = 0; k < 4; k++) { G.box('metal', cx, .12 + k * .5, cz, .94, .04, .94, [.7, .45, .15]); if (k < 3) for (let j = 0; j < 2; j++) { const s = .25 + hash(x * 3 + j, y * 5 + k, 2) * .14; G.box('crate', cx - .22 + j * .44, .14 + k * .5 + s / 2, cz + (hash(x + j, y + k, 8) - .5) * .3, s, s, s + .1, [.95, .9, .8], 1 / s); } } }
      else if (c === 'o') { G.cyl('stone', cx, 0, cz, .3, 2, [.95, .93, .88], 12); G.box('stone', cx, 2.07, cz, .8, .14, .8, wht, .5); G.box('stone', cx, .06, cz, .76, .12, .76, wht, .5); }
      else if (c === 'p') { G.cyl('wood', cx, 0, cz, .1, 1.7, [.75, .65, .5], 7); for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283 + r, ex = Math.sin(a), ez = Math.cos(a), px = -ez * .09, pz = ex * .09; G.q('leaf', [cx - px, 1.7, cz - pz, cx + px, 1.7, cz + pz, cx + ex * .85 + px, 1.45 + (k % 3) * .12, cz + ez * .85 + pz, cx + ex * .85 - px, 1.45 + (k % 3) * .12, cz + ez * .85 - pz], [0, 1, 0], [0, 0, 1, 1], [.2, .5 + (k % 2) * .08, .18]); } G.box('paver', cx, .04, cz, .9, .08, .9, [.7, .7, .7], 1); }
      else if (c === 'c') { G.box('crate', cx + (r - .5) * .08, .275, cz + (hash(x, y, 2) - .5) * .08, .86, .55, .86, wht, 1.16); }
      else if (c === 'r') { const col = r < .5 ? [.7, .15, .12] : [.15, .3, .6]; G.cyl('flat', cx, 0, cz, .25, .5, col, 12); G.cyl('flat', cx, .16, cz, .26, .03, [.2, .2, .2], 12); G.cyl('flat', cx, .34, cz, .26, .03, [.2, .2, .2], 12); G.cyl('flat', cx + .34, 0, cz + .25, .2, .42, [.2, .45, .3], 10); }
      else if (c === 'x') { for (let k = 0; k < 3; k++) for (let j = -1; j <= 1; j += 2) G.box('sack', cx + j * .23 + (k % 2 ? .08 : -.08), .085 + k * .166, cz, .44, .16, .52 - k * .04, [1, .97, .9], 2); }
      else if (c === 'v') {
        const horiz = !full(x - 1, y) || !full(x + 1, y) ? hash(x, y, 6) < .5 : false, L = horiz ? [.96, .5] : [.5, .96];
        if (window.SKM && SKM.ready()) { const v = SKM.vehicle(['car', 'pickup', 'truck'][Math.floor(r * 3)], 1, horiz); if (v) { v.position.set(cx, 0, cz); v.rotation.y = (r * 7 % 1) < .5 ? 0 : Math.PI; scene.add(v); } }
        else if (m.theme === 'depot') { G.box('flat', cx, .22, cz, .6, .3, .8, [.9, .7, .1]); G.box('flat', cx, .45, cz - .12, .5, .16, .4, [.15, .15, .15]); for (const s of [-.2, .2]) { G.box('metal', cx + s, .5, cz + .42, .05, 1, .05, [.3, .3, .3]); G.box('metal', cx + s, .08, cz + .62, .06, .04, .4, [.6, .6, .6]); } for (const [a, b] of [[-.3, -.25], [.3, -.25], [-.3, .25], [.3, .25]]) G.box('flat', cx + a, .09, cz + b, .08, .18, .2, [.08, .08, .08]); }
        else { const col = [[.75, .75, .78], [.6, .12, .12], [.15, .25, .45], [.9, .9, .88], [.2, .2, .22]][Math.floor(r * 5)]; G.box('car', cx, .27, cz, L[0], .24, L[1], col, 1); G.box('glass', cx, .47, cz, L[0] * (horiz ? .55 : .86), .2, L[1] * (horiz ? .86 : .55), [.9, .95, 1], 1, 'car'); for (const a of [-1, 1]) for (const b of [-1, 1]) G.box('flat', cx + a * L[0] * (horiz ? .3 : .47), .09, cz + b * L[1] * (horiz ? .47 : .3), horiz ? .2 : .08, .18, horiz ? .08 : .2, [.07, .07, .07]); G.box('glow', cx + (horiz ? .485 : 0), .26, cz + (horiz ? 0 : .485), horiz ? .01 : .4, .05, horiz ? .4 : .01, [1, .95, .7]); }
      }
      if (m.cov[i]) { const sm = m.theme === 'depot' ? 'conc' : m.theme === 'castle' ? 'stone' : 'plaster'; G.box(sm, cx, 1.36, cz, 1, .22, 1, m.theme === 'hara' ? TINT[Math.floor(hash(x >> 2, y >> 2, 3) * TINT.length)] : wht, .5); }
      if (m.theme === 'hara' && !m.g[i] && full(x - 1, y) && full(x + 1, y) && wallH(x - 1, y) > 2 && wallH(x + 1, y) > 2 && r < .3 && !m.cov[i]) { G.box('flat', cx, 1.72, cz, 1, .012, .012, [.2, .2, .2]); for (let k = 0; k < 3; k++) { const col = [[.9, .9, .92], [.8, .25, .2], [.2, .45, .7], [.9, .75, .2], [.3, .6, .4]][Math.floor(hash(x + k, y, 12) * 5)], px = x + .2 + k * .3; G.q('cloth', [px - .1, 1.42, cz, px + .1, 1.42, cz, px + .1, 1.72, cz, px - .1, 1.72, cz], [0, 0, 1], [0, 0, 1, 1], col); } }
    }
    if (th.roofH) { G.top('ceil', 0, 0, W, H, th.roofH, [0, 0, W / 3, H / 3], [.9, .9, .95], true); for (let y = 3; y < H; y += 6) for (let x = 3; x < W; x += 6) { G.top('glow', x - 1.2, y - .25, x + 1.2, y + .25, th.roofH - .02, [0, 0, 1, 1], [1, 1, .95], true); } }
    for (const key in G.b) { const g = G.b[key], geo = new T.BufferGeometry(); geo.setAttribute('position', new T.Float32BufferAttribute(g.p, 3)); geo.setAttribute('normal', new T.Float32BufferAttribute(g.n, 3)); geo.setAttribute('uv', new T.Float32BufferAttribute(g.u, 2)); geo.setAttribute('color', new T.Float32BufferAttribute(g.c, 3)); geo.setIndex(g.i); const mesh = new T.Mesh(geo, mats[key]); mesh.castShadow = key !== 'glow' && key !== 'ceil'; mesh.receiveShadow = true; mesh.matrixAutoUpdate = false; scene.add(mesh); disposables.push(geo); }
    for (const k of ['a', 'b']) { const t = tex('site' + k, 256, 256, (x, w, h) => { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 10; x.setLineDash([26, 14]); x.beginPath(); x.arc(128, 128, 112, 0, 7); x.stroke(); x.fillStyle = 'rgba(245,182,46,.9)'; x.font = 'bold 170px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(k.toUpperCase(), 128, 138); }, true), d = new T.Mesh(new T.PlaneGeometry(2.6, 2.6), new T.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 })); d.rotation.x = -Math.PI / 2; d.rotation.z = Math.PI; d.position.set(m.sc[k][0], .012, m.sc[k][1]); scene.add(d); disposables.push(d.geometry, d.material); }
    const sky = new T.Mesh(new T.SphereGeometry(90, 16, 12), new T.MeshBasicMaterial({ side: T.BackSide, fog: false, map: tex('sky' + m.theme, 8, 256, (x, w, h) => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, th.sky[0]); g.addColorStop(.42, th.sky[1]); g.addColorStop(.52, th.sky[2]); g.addColorStop(1, th.sky[2]); x.fillStyle = g; x.fillRect(0, 0, w, h); }, true) })); sky.position.set(W / 2, 0, H / 2); scene.add(sky); disposables.push(sky.geometry, sky.material);
    scene.fog = new T.Fog(th.fog, th.far * .35, th.far);
    const hemi = new T.HemisphereLight(th.hemi[0], th.hemi[1], th.hemi[2]); scene.add(hemi);
    const sun = new T.DirectionalLight(th.sun[0], th.sun[1]); sun.position.set(W / 2 + th.sun[2], th.sun[3], H / 2 + th.sun[4]); sun.target.position.set(W / 2, 0, H / 2); scene.add(sun, sun.target);
    const sc = sun.shadow.camera, ext = Math.max(W, H) * .62; sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext; sc.near = 1; sc.far = 60; sun.shadow.bias = -.0006; sun.shadow.normalBias = .03; sun.shadow.mapSize.set(quality > 1 ? 2048 : 1024, quality > 1 ? 2048 : 1024); sun.castShadow = quality > 0;
    const lamps = []; if (th.roofH && quality > 1) for (const [fx, fy] of [[.25, .3], [.75, .3], [.25, .75], [.75, .75]]) { const l = new T.PointLight(0xffe2b0, 14, 13, 1.6); l.position.set(W * fx, 2.6, H * fy); scene.add(l); lamps.push(l); }
    return { scene, sun, theme: th, dispose() { for (const d of disposables) d.dispose(); for (const k in mats) mats[k].dispose(); } };
  }

  /* ---------- الأسلحة: مجسمات مركّبة، السبطانة باتجاه +Z والأصل عند القبضة ---------- */
  function gun(THREE_, name) {
    T = THREE_; const g = new T.Group(), dark = new T.MeshLambertMaterial({ color: 0x1c1f23 }), steel = new T.MeshLambertMaterial({ color: 0x3a3f46 }), wood = new T.MeshLambertMaterial({ color: 0x7a4b25 });
    const bx = (mat, sx, sy, sz, x, y, z, rx) => { const b = new T.Mesh(new T.BoxGeometry(sx, sy, sz), mat); b.position.set(x, y, z); if (rx) b.rotation.x = rx; g.add(b); return b; }, cy = (mat, r, l, y, z) => { const c = new T.Mesh(new T.CylinderGeometry(r, r, l, 8), mat); c.rotation.x = Math.PI / 2; c.position.set(0, y, z); g.add(c); return c; };
    let mz = .2;
    if (name === 'pistol') { bx(steel, .03, .036, .17, 0, .03, .06); bx(dark, .028, .085, .042, 0, -.025, 0, -.2); bx(dark, .012, .02, .03, 0, .005, .05); mz = .15; }
    else if (name === 'smg') { bx(dark, .042, .06, .26, 0, .03, .08); cy(steel, .012, .12, .035, .26); bx(steel, .026, .13, .036, 0, -.06, .12); bx(dark, .03, .08, .04, 0, -.03, -.01, -.25); bx(steel, .022, .03, .15, 0, .035, -.12); bx(dark, .014, .022, .05, 0, .07, .02); mz = .32; }
    else if (name === 'shotgun') { cy(steel, .017, .52, .04, .36); cy(dark, .015, .34, .008, .3); bx(wood, .045, .04, .15, 0, .012, .3); bx(dark, .045, .065, .22, 0, .03, .02); bx(wood, .038, .075, .24, 0, -.005, -.2, .22); bx(dark, .028, .07, .04, 0, -.03, -.04, -.3); mz = .62; }
    else if (name === 'rifle') { bx(dark, .044, .06, .25, 0, .03, .03); bx(wood, .046, .048, .17, 0, .028, .24); cy(steel, .011, .26, .036, .45); cy(steel, .009, .16, .062, .25); bx(dark, .01, .04, .012, 0, .07, .52); bx(steel, .028, .1, .045, 0, -.045, .09, .25); bx(steel, .028, .08, .045, 0, -.115, .125, .6); bx(dark, .03, .08, .04, 0, -.03, -.05, -.3); bx(wood, .036, .07, .25, 0, .0, -.22, .16); bx(dark, .012, .018, .03, 0, .068, .0); mz = .58; }
    else { bx(dark, .044, .06, .3, 0, .03, .02); cy(steel, .013, .56, .04, .44); cy(dark, .019, .08, .04, .74); cy(dark, .028, .24, .095, .06); cy(steel, .034, .03, .095, .185); cy(steel, .034, .03, .095, -.065); bx(dark, .014, .03, .02, 0, .068, .0); bx(dark, .014, .03, .02, 0, .068, .12); bx(steel, .026, .07, .05, 0, -.035, .1); bx(dark, .03, .08, .04, 0, -.03, -.08, -.3); bx(new T.MeshLambertMaterial({ color: 0x3d4a2f }), .04, .08, .28, 0, .005, -.26, .1); mz = .78; }
    g.userData.mz = mz; return g;
  }
  /* ---------- الجندي: ارتفاع الرأس والجسم يطابق صناديق الإصابة في النواة ---------- */
  const OUTFITS = [{ n: 'صحراوي', u: 0xb99a66, v: 0x6e5a3a, h: 0xa58a5a, head: 'helmet' }, { n: 'غابة', u: 0x55693c, v: 0x2f3b22, h: 0x48592f, head: 'goggles' }, { n: 'حضري', u: 0x5b6672, v: 0x2c3138, h: 0x30353c, head: 'beret' }, { n: 'شماغ', u: 0x8c7a5a, v: 0x3a3226, h: 0xf4f0ea, head: 'shemagh' }];
  const TEAMC = [0xe8662a, 0x3b82f6];
  function faceTex(THREE_, img) { T = THREE_; const t = new T.CanvasTexture(cvs(128, 128, (x) => { x.fillStyle = '#e0b48f'; x.fillRect(0, 0, 128, 128); if (img) x.drawImage(img, 24, 14, 80, 100); else { x.fillStyle = '#2b1d14'; x.fillRect(40, 50, 14, 8); x.fillRect(74, 50, 14, 8); x.fillRect(36, 40, 22, 4); x.fillRect(70, 40, 22, 4); x.fillStyle = '#b88465'; x.fillRect(60, 56, 8, 22); x.fillStyle = '#8a4b3c'; x.fillRect(50, 90, 28, 5); } })); t.colorSpace = T.SRGBColorSpace; return t; }
  function soldier(THREE_, opt) {
    T = THREE_; const o = OUTFITS[opt.outfit | 0] || OUTFITS[0], tc = TEAMC[opt.team | 0], L = c => new T.MeshLambertMaterial({ color: c }), camo = tex('camo', 128, 128, DRAW.camo);
    const uni = new T.MeshLambertMaterial({ color: o.u, map: camo }), vest = L(o.v), skin = L(0xe0b48f), boot = L(0x1b1b1d), team = L(tc), root = new T.Group(), body = new T.Group(), mats = [uni, vest, skin, boot, team];
    const bx = (par, mat, sx, sy, sz, x, y, z) => { const b = new T.Mesh(new T.BoxGeometry(sx, sy, sz), mat); b.position.set(x, y, z); b.castShadow = true; par.add(b); return b; };
    const leg = s => { const p = new T.Group(); p.position.set(s * .06, .4, 0); bx(p, uni, .085, .3, .095, 0, -.15, 0); bx(p, boot, .09, .1, .13, 0, -.35, .015); bx(p, vest, .09, .06, .1, 0, -.2, .01); root.add(p); return p; }, legL = leg(-1), legR = leg(1);
    body.position.y = .4; root.add(body); bx(body, uni, .25, .3, .13, 0, .16, 0); bx(body, vest, .27, .2, .16, 0, .19, 0); bx(body, vest, .08, .07, .05, -.07, .12, .1); bx(body, vest, .08, .07, .05, .07, .12, .1); bx(body, vest, .2, .16, .06, 0, .2, -.1); bx(body, boot, .26, .035, .14, 0, .02, 0);
    const arm = s => { const p = new T.Group(); p.position.set(s * .155, .29, 0); bx(p, uni, .07, .2, .075, 0, -.08, 0); bx(p, team, .078, .04, .082, 0, -.05, 0); const f = new T.Group(); f.position.set(0, -.17, 0); bx(f, uni, .062, .19, .065, 0, -.08, 0); bx(f, L(0x25272a), .055, .05, .06, 0, -.19, 0); p.add(f); body.add(p); p.userData.f = f; return p; }, armL = arm(-1), armR = arm(1);
    armR.rotation.set(-1.15, 0, -.25); armR.userData.f.rotation.x = -.45; armL.rotation.set(-1.3, 0, .55); armL.userData.f.rotation.x = -.3;
    const head = new T.Group(); head.position.y = .42; body.add(head); bx(head, skin, .05, .05, .05, 0, -.07, 0);
    const sk = new T.Mesh(new T.SphereGeometry(.082, 14, 10), skin); sk.castShadow = true; head.add(sk);
    const fm = new T.MeshLambertMaterial({ map: faceTex(T, opt.face) }), face = new T.Mesh(new T.SphereGeometry(.0835, 14, 10, Math.PI * .5 - .95, 1.9, .55, 1.75), fm); face.rotation.y = -Math.PI / 2; head.add(face); mats.push(fm);
    if (o.head === 'shemagh') { const sm = new T.MeshLambertMaterial({ map: tex('shemagh', 128, 128, DRAW.shemagh) }); const s1 = new T.Mesh(new T.SphereGeometry(.092, 14, 10, 0, 6.3, 0, 1.25), sm); head.add(s1); const s2 = new T.Mesh(new T.SphereGeometry(.094, 14, 8, Math.PI * .5 + 1.0, 6.283 - 2.0, 1.0, 1.6), sm); s2.rotation.y = -Math.PI / 2; head.add(s2); bx(head, L(0x15151a), .2, .018, .2, 0, .052, 0).geometry = new T.TorusGeometry(.078, .012, 6, 16); head.children[head.children.length - 1].rotation.x = Math.PI / 2; mats.push(sm); }
    else if (o.head === 'beret') { const b = new T.Mesh(new T.SphereGeometry(.095, 14, 8, 0, 6.3, 0, 1.2), L(0x7a1f1f)); b.scale.y = .55; b.position.set(.015, .045, 0); b.rotation.z = -.25; head.add(b); }
    else { const hm = new T.Mesh(new T.SphereGeometry(.096, 14, 10, 0, 6.3, 0, 1.45), L(o.h)); hm.position.y = .012; hm.castShadow = true; head.add(hm); const band = new T.Mesh(new T.TorusGeometry(.094, .009, 6, 18), team); band.rotation.x = Math.PI / 2; band.position.y = .02; head.add(band); if (o.head === 'goggles') { bx(head, L(0x111316), .13, .035, .03, 0, .055, .078); } }
    const hold = new T.Group(); hold.position.set(.07, .2, .2); body.add(hold);
    const flash = new T.Mesh(new T.SphereGeometry(.06, 6, 4), new T.MeshBasicMaterial({ color: 0xffd76a })); flash.visible = false; hold.add(flash);
    const blob = new T.Mesh(new T.CircleGeometry(.24, 12), new T.MeshBasicMaterial({ color: 0, transparent: true, opacity: .32, depthWrite: false })); blob.rotation.x = -Math.PI / 2; blob.position.y = .011; root.add(blob);
    const S = { root, body, head, legL, legR, armL, armR, hold, flash, blob, ph: 0, cr: 0, dead: 0, gunName: '', fm,
      setGun(n) { if (S.gunName === n) return; S.gunName = n; if (S.g) hold.remove(S.g); S.g = gun(T, n); S.g.scale.setScalar(1.05); S.g.traverse(c => { c.castShadow = true; }); hold.add(S.g); flash.position.set(0, .035, S.g.userData.mz + .05); },
      setFace(img) { fm.map.dispose(); fm.map = faceTex(T, img); fm.needsUpdate = true; },
      update(dt, st) {
        if (st.dead) { S.dead = Math.min(1, S.dead + dt * 2.6); const e = S.dead * S.dead; root.rotation.x = -e * 1.5; root.position.y = e * .12; blob.visible = false; return; }
        if (S.dead) { S.dead = 0; root.rotation.x = 0; root.position.y = 0; blob.visible = true; }
        S.cr += ((st.cr ? 1 : 0) - S.cr) * Math.min(1, dt * 10); const mvA = st.moving ? 1 : 0; S.mv = (S.mv || 0) + (mvA - (S.mv || 0)) * Math.min(1, dt * 8); S.ph += dt * (st.cr ? 7 : 11) * S.mv;
        const sw = Math.sin(S.ph) * .75 * S.mv, c = S.cr; body.position.y = .4 - c * .2 + Math.abs(Math.cos(S.ph)) * .012 * S.mv; body.rotation.x = c * .28 - (st.pitch || 0) * .45;
        legL.position.y = legR.position.y = .4 - c * .2; legL.rotation.x = sw - c * 1.15; legR.rotation.x = -sw - c * .2; legL.scale.y = 1 - c * .25; legR.scale.y = 1 - c * .45; legR.position.z = -c * .12;
        head.rotation.x = -(st.pitch || 0) * .35 - c * .2; const k = S.kick = Math.max(0, (S.kick || 0) - dt * 9); hold.position.z = .2 - k * .04; flash.visible = k > .55; if (st.acting) { armL.rotation.x = -.6 + Math.sin(S.ph2 = (S.ph2 || 0) + dt * 14) * .2; body.rotation.x += .35; } else armL.rotation.x = -1.3;
      },
      dispose() { root.traverse(c => { if (c.geometry) c.geometry.dispose(); }); for (const m of mats) { if (m.map && m === fm) m.map.dispose(); m.dispose(); } } };
    S.setGun(opt.gun || 'pistol'); return S;
  }
  /* سلاح منظور الشخص الأول مع الذراعين */
  function viewModel(THREE_, name, outfit) {
    if (window.SKM && SKM.ready()) { const va = SKM.viewArms(name, outfit); if (va) return va; }
    T = THREE_; const o = OUTFITS[outfit | 0] || OUTFITS[0], g = new T.Group(), gn = (window.SKM && SKM.ready() && SKM.weapon(name)) || gun(T, name), sl = new T.MeshLambertMaterial({ color: o.u, map: tex('camo', 128, 128, DRAW.camo) }), gl = new T.MeshLambertMaterial({ color: 0x25272a });
    gn.rotation.y = Math.PI; g.add(gn); const long = name !== 'pistol';
    const arm = (x, y, z, rx, ry, len) => { const p = new T.Group(); p.position.set(x, y, z); p.rotation.set(rx, ry, 0); const a = new T.Mesh(new T.BoxGeometry(.044, .044, len), sl); a.position.z = len / 2 + .03; p.add(a); const h = new T.Mesh(new T.BoxGeometry(.04, .05, .065), gl); h.position.z = -.005; p.add(h); g.add(p); return p; };
    arm(.0, -.04, .0, .42, -.1, .4); const l = arm(long ? -.005 : -.012, long ? -.005 : -.045, long ? -.2 : -.0, .34, .6, .42);
    g.userData = { mz: gn.userData.mz, left: l }; return g;
  }
    /* إضاءة مصوّرة (IBL) إجرائية: سماء متدرجة تُحوَّل إلى خريطة انعكاس عبر PMREM، فتلمع الخامات وتتلون بمحيطها. */
  function envMap(THREE_, renderer, theme) {
    const th = THEMES[theme] || {}, sky = (th.sky || ['#2f6fc4', '#9cc3ea', '#f3dcb4']);
    const sc = new THREE_.Scene();
    const geo = new THREE_.SphereGeometry(50, 32, 16);
    const mat = new THREE_.ShaderMaterial({ side: THREE_.BackSide, depthWrite: false, uniforms: { top: { value: new THREE_.Color(sky[0]) }, mid: { value: new THREE_.Color(sky[1]) }, low: { value: new THREE_.Color(sky[2]) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 low; varying vec3 vP; void main(){ float h = vP.y; vec3 c = h > 0.0 ? mix(mid, top, smoothstep(0.0, 0.7, h)) : mix(low * 0.45, low, smoothstep(-0.4, 0.0, h)); gl_FragColor = vec4(c * 1.0, 1.0); }' });
    sc.add(new THREE_.Mesh(geo, mat));
    const pm = new THREE_.PMREMGenerator(renderer);
    const tex = pm.fromScene(sc, 0.02).texture;
    geo.dispose(); mat.dispose(); pm.dispose();
    return tex;
  }
window.SKW = { build, envMap, gun, soldier, viewModel, faceTex, OUTFITS, TEAMC, tex, DRAW, dispose() { for (const k in TX) TX[k].dispose(); } };
})();
