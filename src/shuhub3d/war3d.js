/* شُهُب — 3D battlefield renderer (Three.js).
   The battle rules stay in war-core.js (deterministic, shared with the server and tests); this module only draws them.
   Coordinates: one sim unit = one world unit. World X = view x (the root group mirrors for the right-hand player),
   world Y = -sim y (sim y grows downward), Z points at the camera; the battle line is the plane z = 0.
   The camera never rotates during play — it looks straight down -Z with an off-axis frustum — so the 2D overlay
   (aim arc, damage numbers, placement hints) and touch input keep mapping 1:1 onto the battle line. */
import * as THREE from 'three';

const W = 300, GY = 130, CS = 3;
const POSTS = [[0, 0], [8, 0], [3, 2], [5, 2]];
const rnd = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const col = c => new THREE.Color(c);
const V3 = new THREE.Vector3(), Q = new THREE.Quaternion(), S3 = new THREE.Vector3(), M4 = new THREE.Matrix4(), E = new THREE.Euler(), TMPC = new THREE.Color();

let ren = null, scene, cam, root, canvas, B = null, O = null, LOW = false, built = false;
let parts = [], castles = [], cannons = [], soldiers = [], arrows = [], debris, flash, sun, hemi, terrain, rain = null, motes = null, gates3 = [], jars3 = new Map(), balloon = null, rings = [], bolts3 = [], heavies = new Map(), lightP, starMarks = [];
let tPrev = 0, clockT = 0, endCam = null, stormT = 0, lastV = null;

/* ---------- procedural textures (no external assets: everything is drawn at load) ---------- */
function ctex(w, h, draw, repeat, srgb = true) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t; }
const TX = {};
function textures() {
  if (TX.stone) return;
  TX.stone = ctex(128, 128, (g, w, h) => { g.fillStyle = '#6f6a64'; g.fillRect(0, 0, w, h);
    for (let r = 0; r < 2; r++) for (let c = -1; c < 3; c++) { const x = c * 64 + (r ? 32 : 0) + 3, y = r * 64 + 3, v = 200 + Math.random() * 40 | 0; g.fillStyle = `rgb(${v},${v - 4},${v - 10})`; g.fillRect(x, y, 58, 58);
      for (let k = 0; k < 140; k++) { const s = Math.random() * 22 - 11 | 0; g.fillStyle = `rgba(${s > 0 ? 255 : 0},${s > 0 ? 250 : 0},${s > 0 ? 240 : 0},${Math.abs(s) / 120})`; g.fillRect(x + Math.random() * 58, y + Math.random() * 58, 2 + Math.random() * 3, 2 + Math.random() * 3); }
      g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(x, y, 58, 4); g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(x, y + 54, 58, 4); } });
  TX.crack = ctex(128, 128, (g, w, h) => { g.clearRect(0, 0, w, h); g.strokeStyle = 'rgba(20,10,8,.9)'; g.lineWidth = 3; for (let k = 0; k < 3; k++) { let x = 64 + rnd(-30, 30), y = 64 + rnd(-30, 30); g.beginPath(); g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += rnd(-22, 22); y += rnd(-22, 22); g.lineTo(x, y); } g.stroke(); } });
  TX.noise = ctex(128, 128, (g, w, h) => { const d = g.createImageData(w, h); for (let i = 0; i < d.data.length; i += 4) { const v = 200 + Math.random() * 55; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } g.putImageData(d, 0, 0); }, true);
  TX.wood = ctex(64, 128, (g, w, h) => { g.fillStyle = '#6a4024'; g.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 16) { g.fillStyle = `rgba(0,0,0,${.15 + Math.random() * .2})`; g.fillRect(x, 0, 2, h); for (let k = 0; k < 20; k++) { g.fillStyle = 'rgba(255,220,170,.08)'; g.fillRect(x + rnd(14), rnd(h), 1, rnd(10, 30)); } } g.fillStyle = '#2a1a10'; g.fillRect(0, 24, w, 6); g.fillRect(0, 98, w, 6); });
  TX.glow = ctex(64, 64, (g, w) => { const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.25, 'rgba(255,255,255,.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, w); }, false, false);
  TX.smoke = ctex(64, 64, (g, w) => { for (let k = 0; k < 10; k++) { const x = 32 + rnd(-9, 9), y = 32 + rnd(-9, 9), r = rnd(10, 20), gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, w); } }, false, false);
  TX.balloon = ctex(128, 64, (g, w, h) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#f4e2b8' : '#d8452e'; g.fillRect(i * 16, 0, 16, h); } g.fillStyle = '#ffd36b'; g.fillRect(0, 26, w, 10); });
}
function labelTex(txt, color) { return ctex(128, 64, (g, w, h) => { g.font = '900 44px Tajawal, system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 8; g.strokeStyle = 'rgba(20,10,30,.85)'; g.strokeText(txt, w / 2, h / 2 + 2); g.fillStyle = color; g.fillText(txt, w / 2, h / 2 + 2); }); }
function skyTex(m) { return ctex(4, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); m.sky.forEach((c, i) => gr.addColorStop(i / (m.sky.length - 1), c)); g.fillStyle = gr; g.fillRect(0, 0, w, h); }); }

/* ---------- particles: one additive pool (fire, sparks, glow) and one normal pool (smoke, dust) ---------- */
class Particles {
  constructor(n, additive, map) {
    this.n = n; this.a = new Float32Array(n * 16); this.free = []; for (let i = n - 1; i >= 0; i--) this.free.push(i);
    this.live = new Uint8Array(n); const g = new THREE.BufferGeometry(); this.pos = new Float32Array(n * 3); this.col = new Float32Array(n * 4); this.size = new Float32Array(n);
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3)); g.setAttribute('pc', new THREE.BufferAttribute(this.col, 4)); g.setAttribute('ps', new THREE.BufferAttribute(this.size, 1));
    this.mat = new THREE.ShaderMaterial({ uniforms: { map: { value: map }, scale: { value: 1 } }, transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: 'attribute vec4 pc; attribute float ps; uniform float scale; varying vec4 vC; void main(){ vC = pc; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = ps * scale / max(1.0, -mv.z); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform sampler2D map; varying vec4 vC; void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC.rgb, vC.a * t.a); if (gl_FragColor.a < .01) discard;\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}' });
    this.pts = new THREE.Points(g, this.mat); this.pts.frustumCulled = false; this.pts.renderOrder = additive ? 3 : 2;
  }
  // x,y,z, vx,vy,vz, life, size0, size1, color, alpha, gravity, drag
  emit(x, y, z, vx, vy, vz, life, s0, s1, c, al, gr = 0, drag = 0) { const i = this.free.pop(); if (i === undefined) return; const a = this.a, o = i * 16; a[o] = x; a[o + 1] = y; a[o + 2] = z; a[o + 3] = vx; a[o + 4] = vy; a[o + 5] = vz; a[o + 6] = life; a[o + 7] = life; a[o + 8] = s0; a[o + 9] = s1; a[o + 10] = c.r; a[o + 11] = c.g; a[o + 12] = c.b; a[o + 13] = al; a[o + 14] = gr; a[o + 15] = drag; this.live[i] = 1; }
  update(dt) {
    const a = this.a; let k = 0;
    for (let i = 0; i < this.n; i++) { if (!this.live[i]) continue; const o = i * 16; a[o + 6] -= dt; if (a[o + 6] <= 0) { this.live[i] = 0; this.free.push(i); continue; }
      const dr = Math.max(0, 1 - a[o + 15] * dt); a[o + 3] *= dr; a[o + 4] = a[o + 4] * dr - a[o + 14] * dt; a[o + 5] *= dr; a[o] += a[o + 3] * dt; a[o + 1] += a[o + 4] * dt; a[o + 2] += a[o + 5] * dt;
      const f = a[o + 6] / a[o + 7]; this.pos[k * 3] = a[o]; this.pos[k * 3 + 1] = a[o + 1]; this.pos[k * 3 + 2] = a[o + 2]; this.size[k] = a[o + 9] + (a[o + 8] - a[o + 9]) * f;
      this.col[k * 4] = a[o + 10]; this.col[k * 4 + 1] = a[o + 11]; this.col[k * 4 + 2] = a[o + 12]; this.col[k * 4 + 3] = a[o + 13] * Math.min(1, f * 2.2); k++; }
    const g = this.pts.geometry; g.setDrawRange(0, k); g.attributes.position.needsUpdate = g.attributes.pc.needsUpdate = g.attributes.ps.needsUpdate = true;
  }
  clear() { this.live.fill(0); this.free.length = 0; for (let i = this.n - 1; i >= 0; i--) this.free.push(i); }
}
let FX = null, SM = null; // additive & smoke pools
const C_ = { fire: col('#ff8a2a'), ember: col('#ffd38a'), spark: col('#fff1c4'), smoke: col('#5a5258'), dark: col('#2a2228'), dust: col('#b08060'), sand: col('#e6c48a'), gold: col('#ffd36b'), cyan: col('#8fe8ff'), white: col('#ffffff'), blood: col('#c03a30'), foe: col('#ffb48a') };

/* ---------- debris: instanced stone chunks with simple physics against the terrain ---------- */
class Debris {
  constructor(n) { this.n = n; this.m = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ map: TX.stone, roughness: .95 }), n); this.m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.m.frustumCulled = false; this.d = []; this.m.count = 0; for (let i = 0; i < n; i++) this.m.setColorAt(i, C_.white); }
  add(x, y, z, sx, sy, sz, vx, vy, vz, color, life = 4) { if (this.d.length >= this.n) this.d.shift(); this.d.push({ x, y, z, sx, sy, sz, vx, vy, vz, rx: rnd(6), ry: rnd(6), wx: rnd(-8, 8), wy: rnd(-8, 8), c: color, l: life, m: life, rest: 0 }); }
  update(dt) {
    let k = 0;
    for (let i = this.d.length - 1; i >= 0; i--) { const p = this.d[i]; p.l -= dt; if (p.l <= 0) { this.d.splice(i, 1); continue; } }
    for (const p of this.d) {
      if (!p.rest) { p.vy -= 62 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.rx += p.wx * dt; p.ry += p.wy * dt; const gy = groundAt(p.x, p.z) + p.sy * .45;
        if (p.y < gy) { p.y = gy; if (Math.abs(p.vy) < 6) { p.rest = 1; } p.vy = -p.vy * .32; p.vx *= .6; p.vz *= .6; p.wx *= .5; p.wy *= .5; } }
      const f = Math.min(1, p.l / Math.min(1, p.m)); E.set(p.rx, p.ry, 0); Q.setFromEuler(E); M4.compose(V3.set(p.x, p.y, p.z), Q, S3.set(p.sx * f, p.sy * f, p.sz * f)); this.m.setMatrixAt(k, M4); this.m.setColorAt(k, p.c); k++; }
    this.m.count = k; this.m.instanceMatrix.needsUpdate = true; if (this.m.instanceColor) this.m.instanceColor.needsUpdate = true;
  }
}

/* ---------- terrain: the sim's height line extruded into a 3D mountain range ---------- */
let XS = [], ZS = [-150, -110, -80, -62, -48, -38, -30, -23, -17, -12, -8, -5, -3, -1.5, 0, 1.5, 3, 5, 8, 12, 17, 24, 34, 48, 70, 100, 150, 230, 340], h0 = null, hSeen = null, noiseZ = [];
const hx = (h, x) => h[clamp(Math.round(x), 0, W)];
function prom(x) { return GY - hx(h0, x); } // original mountain height above the plain
function ridge(z, x) { if (z < 0) return Math.exp(-((z / 30) ** 2)) * (1 + .25 * Math.sin(x * .05 + z * .13)) + .55 * Math.exp(-(((z + 70) / 30) ** 2)) * (.6 + .4 * Math.sin(x * .021 + 1.3)); return Math.exp(-((z / 11) ** 2)); }
function backHills(x, z) { if (z > -20) return 0; const k = Math.min(1, (-z - 20) / 40); return k * (14 + 12 * Math.sin(x * .017 + 2) + 8 * Math.sin(x * .043 + z * .05)); }
function baseY(x, z) { return -GY + prom(x) * ridge(z, x) + backHills(x, z) + (Math.abs(z) > 3 ? (Math.sin(x * .31 + z * .7) + Math.sin(x * .13 - z * .4)) * .35 : 0); }
function groundAt(x, z) { const h = B && B.st.h; if (!h || x < 0 || x > W) return -GY; const dz = Math.exp(-((z / 6) ** 2)); return baseY(x, z) * (1 - dz) + (-hx(h, x)) * dz; }
function buildTerrain(mood) {
  XS = []; for (const x of [-260, -170, -110, -70, -40, -20, -8]) XS.push(x); for (let x = 0; x <= W; x++) XS.push(x); for (const x of [308, 320, 340, 370, 410, 470, 560]) XS.push(x);
  const nx = XS.length, nz = ZS.length, pos = new Float32Array(nx * nz * 3), colA = new Float32Array(nx * nz * 3), idx = [];
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { const o = (j * nx + i) * 3; pos[o] = XS[i]; pos[o + 2] = ZS[j]; }
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) { const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(colA, 3)); g.setIndex(idx);
  const uv = new Float32Array(nx * nz * 2); for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { uv[(j * nx + i) * 2] = XS[i] / 14; uv[(j * nx + i) * 2 + 1] = ZS[j] / 14; } g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: TX.noise, roughness: 1, metalness: 0, flatShading: true });
  terrain = new THREE.Mesh(g, mat); terrain.receiveShadow = true; terrain.userData.pal = mood.rock.map(c => col(c)); terrain.userData.sandC = col('#e8c890'); terrain.userData.scorch = new Float32Array(W + 1);
  hSeen = new Float32Array(W + 1).fill(-999); updateTerrain(0, W, true); return terrain;
}
function updateTerrain(x0, x1, all) {
  const g = terrain.geometry, pos = g.attributes.position.array, cA = g.attributes.color.array, nx = XS.length, h = B.st.h, pal = terrain.userData.pal, sc = terrain.userData.scorch;
  for (let i = 0; i < nx; i++) { const x = XS[i]; if (!all && (x < x0 - 1 || x > x1 + 1)) continue; const inside = x >= 0 && x <= W, d = inside ? h0[clamp(Math.round(x), 0, W)] - hx(h, x) : 0;
    for (let j = 0; j < ZS.length; j++) { const z = ZS[j], o = (j * nx + i) * 3, dz = Math.exp(-((z / 6) ** 2)); let y = baseY(x, z); if (inside) y = y * (1 - dz) + (-hx(h, x)) * dz + (Math.abs(z) > 1 ? d * dz * .25 : 0);
      pos[o + 1] = y; const ht = (y + GY) / 80, rock = clamp(ht, 0, 1); TMPC.copy(pal[0]).lerp(pal[1], clamp(rock * 1.6, 0, 1)).lerp(pal[2], clamp((rock - .6) * 1.5, 0, 1));
      if (z > 10) TMPC.lerp(pal[0], .25); if (inside && d > .5) TMPC.lerp(terrain.userData.sandC, clamp(d / 8, 0, .8) * dz); if (inside && sc[Math.round(x)] > 0) TMPC.multiplyScalar(1 - clamp(sc[Math.round(x)], 0, .55) * dz);
      const n = .92 + ((Math.sin(x * 12.9898 + z * 78.233) * 43758.5453) % 1 + 1) % 1 * .12; cA[o] = TMPC.r * n; cA[o + 1] = TMPC.g * n; cA[o + 2] = TMPC.b * n; } }
  g.attributes.position.needsUpdate = g.attributes.color.needsUpdate = true; g.computeBoundingSphere();
}
function syncTerrain() { const h = B.st.h; let a = 999, b = -1; for (let x = 0; x <= W; x++) if (hSeen[x] !== h[x]) { if (x < a) a = x; b = x; hSeen[x] = h[x]; } if (b >= 0) updateTerrain(a, b); }
function scorchAt(x, r, k = .5) { const sc = terrain.userData.scorch; for (let i = Math.max(0, Math.floor(x - r)); i <= Math.min(W, Math.ceil(x + r)); i++) sc[i] = Math.min(.6, sc[i] + k * (1 - Math.abs(i - x) / (r + 1))); updateTerrain(x - r, x + r); }

function farRange(z, base, amp, color, seed) {
  const sh = new THREE.Shape(); sh.moveTo(-900, -260); for (let x = -900; x <= 1200; x += 12) { const y = base + amp * (.5 + .3 * Math.sin(x * .007 + seed) + .2 * Math.sin(x * .021 + seed * 3) + .1 * Math.sin(x * .07 + seed)); sh.lineTo(x, y); } sh.lineTo(1200, -260); sh.closePath();
  const m = new THREE.Mesh(new THREE.ShapeGeometry(sh, 1), new THREE.MeshBasicMaterial({ color, fog: true })); m.position.z = z; return m;
}

/* ---------- decorations ---------- */
function decorate(mood) {
  const g = new THREE.Group(), desert = mood.fx === 'motes' || mood.fx === 'haze';
  const rk = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: mood.rock[1], roughness: 1, flatShading: true }), 70); let k = 0;
  for (let i = 0; i < 70; i++) { const x = rnd(-60, 360), z = rnd() < .5 ? rnd(5, 40) : rnd(-60, -6); if (Math.abs(x - 32) < 22 && Math.abs(z) < 14 || Math.abs(x - 268) < 22 && Math.abs(z) < 14) continue; const s = rnd(.6, 2.6); E.set(rnd(3), rnd(3), rnd(3)); Q.setFromEuler(E); M4.compose(V3.set(x, baseY(x, z) + s * .3, z), Q, S3.set(s, s * rnd(.5, 1), s)); rk.setMatrixAt(k++, M4); }
  rk.count = k; rk.castShadow = !LOW; rk.receiveShadow = true; g.add(rk);
  const n = LOW ? 18 : 40, trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(.25, .4, 1, 5).translate(0, .5, 0), new THREE.MeshStandardMaterial({ color: '#5a3a22', roughness: 1 }), n),
    crownGeo = desert ? new THREE.ConeGeometry(1, .55, 7).rotateX(Math.PI) : new THREE.ConeGeometry(1, 1, 7), crown = new THREE.InstancedMesh(crownGeo, new THREE.MeshStandardMaterial({ color: desert ? '#3f7a3a' : mood.night ? '#1d3a34' : '#2f5a3a', roughness: .9, flatShading: true }), n); k = 0;
  for (let i = 0; i < n * 3 && k < n; i++) { const x = rnd(-40, 340), z = rnd() < .45 ? rnd(8, 36) : rnd(-50, -10); if (x > 8 && x < 58 && z > -18 && z < 18 || x > 242 && x < 292 && z > -18 && z < 18) continue; const y = baseY(x, z); if (y > -GY + 45) continue; const hgt = desert ? rnd(7, 11) : rnd(6, 12);
    M4.compose(V3.set(x, y, z), Q.identity(), S3.set(1, hgt, 1)); trunk.setMatrixAt(k, M4); M4.compose(V3.set(x, y + hgt + (desert ? 0 : hgt * .1), z), Q.setFromEuler(E.set(0, rnd(3), 0)), desert ? S3.set(3.2, 2.2, 3.2) : S3.set(2.2, hgt * .9, 2.2)); crown.setMatrixAt(k, M4); k++; }
  trunk.count = crown.count = k; trunk.castShadow = crown.castShadow = !LOW; g.add(trunk, crown); return g;
}

/* ---------- castles ---------- */
const STYLE = { sand: { a: '#e0a464', b: '#a7adba', roof: null }, granite: { a: '#b8b4ae', b: '#7b8190', roof: '#4a5a7a' }, royal: { a: '#f2ead8', b: '#c9d2e0', roof: '#2f5fb8' }, obsidian: { a: '#5c5468', b: '#2e2a38', roof: '#8a1f2c' } };
const BOXG = (() => { const g = new THREE.BoxGeometry(CS * .985, CS * .985, 1); const uv = g.attributes.uv; for (let f = 0; f < 6; f++) { if (f === 4 || f === 5) continue; for (let v = 0; v < 4; v++) { const i = f * 4 + v; if (f < 2) uv.setX(i, uv.getX(i) * 2.5); else uv.setY(i, uv.getY(i) * 2.5); } } return g; })();
function depthOf(c, r) { return c <= 1 || c >= 7 ? 9 : r >= 4 ? 7 : 5.5; }
function cellPos(Cs, i) { const c = i % Cs.cols, r = (i / Cs.cols) | 0; return [Cs.x0 + (c + .5) * CS, -(Cs.y0 + (r + .5) * CS)]; }
function buildCastle(s) {
  const Cs = B.st.castles[s], mine = s === O.home, sty = STYLE[mine ? O.fort || 'sand' : (O.foeFort || 'sand')] || STYLE.sand, n = Cs.t.length, g = new THREE.Group(), V = { s, C: Cs, g, shake: 0, prevT: new Uint8Array(n).fill(255), prevB: new Uint8Array(n).fill(255), anim: new Float32Array(n), collapse: null, smokeT: 0 };
  const mat = new THREE.MeshStandardMaterial({ map: TX.stone, roughness: .92 });
  V.bricks = new THREE.InstancedMesh(BOXG, mat, n); V.bricks.castShadow = V.bricks.receiveShadow = true; V.bricks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  V.base = []; for (let i = 0; i < n; i++) { const c = i % Cs.cols, r = (i / Cs.cols) | 0, k = Cs.t[i]; const cc = col(k === 9 ? '#2a1a14' : k === 2 ? sty.b : sty.a); cc.multiplyScalar(.86 + ((c * 7 + r * 13) % 5) * .05); V.base.push(cc); V.bricks.setColorAt(i, cc); }
  V.cracks = new THREE.InstancedMesh(new THREE.PlaneGeometry(CS * .95, CS * .95), new THREE.MeshBasicMaterial({ map: TX.crack, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }), n); V.cracks.count = 0;
  V.merl = new THREE.InstancedMesh(new THREE.BoxGeometry(1.1, 1.3, 1.1), new THREE.MeshStandardMaterial({ map: TX.stone, roughness: .95, color: sty.a }), n * 4); V.merl.castShadow = true; V.merl.count = 0;
  V.win = new THREE.InstancedMesh(new THREE.BoxGeometry(.8, 1.7, .3), new THREE.MeshStandardMaterial({ color: '#140c10', emissive: O.mood.night || O.mood.fx === 'motes' ? '#ffb45a' : '#000000', emissiveIntensity: O.mood.night ? 1.6 : .5, roughness: 1 }), 16); V.win.count = 0;
  g.add(V.bricks, V.cracks, V.merl, V.win);
  // roofs & flags on the two towers
  const team = col(mine ? '#3fe0c5' : '#ff4d6d'), roofC = sty.roof || (mine ? '#2a8a7e' : '#a8323e'); V.towers = [];
  for (const [c0] of [[0], [7]]) { const x = Cs.x0 + (c0 + 1) * CS, y = -Cs.y0, roof = new THREE.Mesh(new THREE.ConeGeometry(3.3, 7, 8), new THREE.MeshStandardMaterial({ color: roofC, roughness: .7, flatShading: true })); roof.position.set(x, y + 3.5, -2.2); roof.castShadow = true; /* roofs sit at the back so archers can stand at the front of the tower */
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, 6, 5), new THREE.MeshStandardMaterial({ color: '#3b2615' })); pole.position.set(0, 6.5, 0); roof.add(pole);
    const fg = new THREE.PlaneGeometry(5, 3, 10, 4).translate(2.5, 0, 0), flag = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(B.hues[s] / 360, .75, .55), side: THREE.DoubleSide, roughness: .8 })); flag.position.set(0, 8, 0); flag.userData.x0 = Float32Array.from(fg.attributes.position.array); roof.add(flag);
    g.add(roof); V.towers.push({ c0, roof, flag, alive: 1 }); }
  // the gate: two wooden leaves that swing open when the masons go out
  const gi = Cs.gate[0], [gx, gy] = cellPos(Cs, gi), dz = depthOf(gi % Cs.cols, Cs.rows - 1) / 2 + .2, leafG = new THREE.BoxGeometry(1.45, 5.6, .35); const lm = new THREE.MeshStandardMaterial({ map: TX.wood, roughness: .9 });
  V.door = { l: new THREE.Group(), r: new THREE.Group(), open: 0, alive: 1 }; for (const [sd, grp] of [[-1, V.door.l], [1, V.door.r]]) { const leaf = new THREE.Mesh(leafG, lm); leaf.position.x = -sd * .72; leaf.castShadow = true; grp.add(leaf); grp.position.set(gx + sd * 1.45, gy + 1.3, dz); g.add(grp); }
  const arch = new THREE.Mesh(new THREE.PlaneGeometry(3, 5.8), new THREE.MeshBasicMaterial({ color: '#0c0606' })); arch.position.set(gx, gy + 1.4, dz - .25); g.add(arch); V.arch = arch;
  // torches beside the gate
  V.torches = [[gx - 2.6, gy + 3.6, dz + .3], [gx + 2.6, gy + 3.6, dz + .3]];
  // the heart: a golden gem in a dark alcove
  const hx_ = Cs.x0 + (Cs.cc + 1) * CS, hy = -(Cs.y0 + (Cs.cr + 1) * CS); V.gem = new THREE.Mesh(new THREE.OctahedronGeometry(2.1, 0), new THREE.MeshStandardMaterial({ color: '#ffcf5a', emissive: '#ff9a20', emissiveIntensity: 1.4, roughness: .25, metalness: .4, flatShading: true })); V.gem.position.set(hx_, hy, 2.2); g.add(V.gem);
  V.gemGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: TX.glow, color: '#ffc14a', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); V.gemGlow.scale.set(12, 12, 1); V.gemGlow.position.copy(V.gem.position); g.add(V.gemGlow);
  V.dome = new THREE.Mesh(new THREE.SphereGeometry(9, 24, 16), new THREE.MeshBasicMaterial({ color: '#7fd8ff', transparent: true, opacity: .2, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); V.dome.position.copy(V.gem.position); V.dome.visible = false; V.shieldWas = 0; g.add(V.dome);
  root.add(g); return V;
}
function syncCastle(V, dt, T) {
  const Cs = V.C, n = Cs.t.length; let changed = false, any = false;
  if (B.st.castles[V.s] !== Cs) { root.remove(V.g); const nv = buildCastle(V.s); Object.assign(V, nv); return; } // practice range rebuilt the fort
  for (let i = 0; i < n; i++) { const k = V.collapse ? (V.collapse.gone[i] ? 0 : Cs.orig[i] && V.collapse.had[i] ? Cs.orig[i] : 0) : Cs.t[i], hp0 = (k === 1 ? 18 : 48) * Cs.hm, hb = k && k !== 9 ? clamp(Math.floor(Cs.hp[i] / hp0 * 4), 0, 4) : 4, bb = k ? (Cs.burn[i] ? 1 : 0) : 0, key = hb + bb * 8;
    if (k && !V.prevT[i] && V.prevT[i] !== 255) V.anim[i] = .001; // rebuilt: grow back in
    if (V.anim[i] > 0) { V.anim[i] = Math.min(1, V.anim[i] + dt * 2.5); if (V.anim[i] >= 1) V.anim[i] = 0; any = true; }
    if (V.prevT[i] === k && V.prevB[i] === key && !V.anim[i]) continue; changed = true; V.prevT[i] = k; V.prevB[i] = key;
    const c = i % Cs.cols, r = (i / Cs.cols) | 0, [x, y] = cellPos(Cs, i), d = k === 9 ? 3 : depthOf(c, r), sc = V.anim[i] ? V.anim[i] : 1;
    M4.compose(V3.set(x, y, k === 9 ? -2.6 : 0), Q.identity(), S3.set(k ? sc : 0, k ? sc : 0, k ? d * sc : 0)); V.bricks.setMatrixAt(i, M4);
    TMPC.copy(V.base[i]).multiplyScalar(.55 + .45 * hb / 4); if (bb) TMPC.lerp(C_.dark, .35); V.bricks.setColorAt(i, TMPC); }
  if (changed || any) { V.bricks.instanceMatrix.needsUpdate = true; V.bricks.instanceColor.needsUpdate = true; rebuildDetails(V); }
  // the heart pulses faster as it weakens
  const f = Math.max(0, Cs.coreHp / Cs.core0), alive = Cs.coreHp > 0 && !V.collapse; V.gem.visible = V.gemGlow.visible = alive; if (alive) { V.gem.rotation.y += dt * (1 + (1 - f) * 4); const pu = 1 + Math.sin(T * (5 + (1 - f) * 9)) * .12; V.gem.scale.setScalar(pu); V.gemGlow.material.opacity = .55 + .3 * Math.sin(T * (5 + (1 - f) * 9)); V.gem.material.emissive.setHSL((40 - (1 - f) * 34) / 360, 1, .5); }
  // boss rune shield: a shimmering dome while both tower tops stand; it shatters when one falls
  const sh = !!(Cs.shield && Cs.t[POSTS[0][1] * Cs.cols + POSTS[0][0]] && Cs.t[POSTS[1][1] * Cs.cols + POSTS[1][0]]) && !V.collapse;
  V.dome.visible = sh; if (sh) { V.dome.material.opacity = .14 + .08 * Math.sin(T * 3); V.dome.rotation.y += dt * .5; V.dome.scale.setScalar(1 + Math.sin(T * 2) * .03); V.shieldWas = 1; }
  else if (V.shieldWas) { V.shieldWas = 0; const p = V.gem.position; for (let i = 0; i < (LOW ? 30 : 90); i++) { const a = rnd(6.28), b = rnd(-1.5, 1.5), v = rnd(8, 22); FX.emit(p.x + Math.cos(a) * 8, p.y + b * 5, p.z + Math.sin(a) * 4, Math.cos(a) * v, b * v * .5, Math.sin(a) * v * .4, rnd(.4, .9), 2, .3, C_.cyan, 1, 10); } lightFlash(p.x, p.y, 4, '#8fe8ff', 160); }
  // shake when hit
  V.shake = Math.max(0, V.shake - dt * 3); V.g.position.set((Math.random() - .5) * V.shake * .9, (Math.random() - .5) * V.shake * .4, 0);
  // flags ripple with the wind (they stream downwind)
  const wind = B.st.wind || 0, wdir = wind >= 0 ? 1 : -1, amp = .25 + Math.min(1, Math.abs(wind) / 8) * .55;
  for (const tw of V.towers) { if (!tw.alive) continue; const p = tw.flag.geometry.attributes.position, x0 = tw.flag.userData.x0; for (let i = 0; i < p.count; i++) { const x = x0[i * 3]; p.setZ(i, Math.sin(x * 1.3 - T * (5 + Math.abs(wind) * .5) + V.s) * amp * (x / 5)); p.setY(i, x0[i * 3 + 1] - (1 - amp) * x * .18); } p.needsUpdate = true; tw.flag.scale.x = wdir; }
  // the gate swings open while the masons are out
  const wantOpen = (Cs.rep || V.crewOut > 0) && V.door.alive ? 1 : 0; V.door.open += (wantOpen - V.door.open) * Math.min(1, dt * 4); V.door.l.rotation.y = V.door.open * 1.4; V.door.r.rotation.y = -V.door.open * 1.4;
  // smoke from wounded stone, flames from burning stone
  V.smokeT -= dt; if (V.smokeT <= 0) { V.smokeT = LOW ? .2 : .08;
    for (let i = 0; i < n; i++) if (Cs.burn[i] && Cs.t[i] && Math.random() < .35) { const [x, y] = cellPos(Cs, i), dz = depthOf(i % Cs.cols, (i / Cs.cols) | 0) / 2; FX.emit(x + rnd(-1, 1), y + rnd(-1, 1), dz + .2, rnd(-.5, .5), rnd(6, 10), 0, rnd(.4, .7), rnd(4, 6), 1, C_.fire, .9, -3, .4); }
    for (let tries = 0; tries < 3; tries++) { const i = Math.random() * n | 0; if (!Cs.t[i] || Cs.t[i] === 9) continue; const hp0 = (Cs.t[i] === 1 ? 18 : 48) * Cs.hm, [x, y] = cellPos(Cs, i), dz = depthOf(i % Cs.cols, (i / Cs.cols) | 0) / 2;
      if (Cs.burn[i]) { for (let q = 0; q < (LOW ? 3 : 6); q++) FX.emit(x + rnd(-1.4, 1.4), y + rnd(-1.2, 1), dz + rnd(-.3, .6), rnd(-1, 1), rnd(5, 11), rnd(-.5, .5), rnd(.5, .9), rnd(4, 6.5), .8, q % 3 ? C_.fire : C_.ember, .95, -4, .5); SM.emit(x, y + 1.5, dz * .5, rnd(-1, 1), rnd(5, 8), 0, rnd(1.6, 2.6), 2.5, 7, C_.dark, .45, -1, .3); }
      else if (Cs.hp[i] < hp0 * .5 && Math.random() < .5) SM.emit(x, y + 1, dz * .6, rnd(-.6, .6) + wind * .3, rnd(3, 6), 0, rnd(1.5, 2.5), 2, 6, C_.smoke, .3, -.5, .2); } }
  // torches flicker at dusk and night
  if ((O.mood.night || O.mood.fx === 'motes') && V.door.alive && Math.random() < .5) for (const [x, y, z] of V.torches) FX.emit(x + rnd(-.2, .2), y, z, rnd(-.3, .3), rnd(2, 4), 0, rnd(.2, .4), rnd(1.4, 2.2), .4, C_.fire, .9, -2);
  if (V.collapse) collapseStep(V, dt);
}
function rebuildDetails(V) {
  const Cs = V.C, cols = Cs.cols, has = i => V.prevT[i] && V.prevT[i] !== 255 && V.prevT[i] !== 9; let m = 0, w = 0, cr = 0;
  for (let i = 0; i < Cs.t.length; i++) { if (!has(i)) continue; const c = i % cols, r = (i / cols) | 0, [x, y] = cellPos(Cs, i), d = depthOf(c, r);
    if (r === 0 || !V.prevT[i - cols] || V.prevT[i - cols] === 255) { const isRoof = r === 0 && (c <= 1 || c >= 7); for (const ox of [-.8, .8]) for (const oz of isRoof ? [d / 2 - .55] : [d / 2 - .55, -d / 2 + .55]) { M4.compose(V3.set(x + ox, y + CS / 2 + .65, oz), Q.identity(), S3.set(1, 1, 1)); V.merl.setMatrixAt(m++, M4); } }
    if ((r === 2 || r === 5) && (c === 1 || c === 7 || c === 4) && w < 16) { M4.compose(V3.set(x, y, d / 2 + .05), Q.identity(), S3.set(1, 1, 1)); V.win.setMatrixAt(w++, M4); }
    const hp0 = (V.prevT[i] === 1 ? 18 : 48) * Cs.hm; if (Cs.hp[i] < hp0 * .6) { M4.compose(V3.set(x, y, d / 2 + .02), Q.identity(), S3.set(1, 1, 1)); V.cracks.setMatrixAt(cr++, M4); } }
  V.merl.count = m; V.win.count = w; V.cracks.count = cr; V.merl.instanceMatrix.needsUpdate = V.win.instanceMatrix.needsUpdate = V.cracks.instanceMatrix.needsUpdate = true;
  // towers lose their roofs (they fall as debris) when the top bricks go
  for (const tw of V.towers) { if (!tw.alive) continue; if (!has(tw.c0) || !has(tw.c0 + 1)) { tw.alive = 0; tw.roof.visible = false; const p = tw.roof.position; debris.add(p.x, p.y, 0, 5, 5, 5, rnd(-8, 8), rnd(6, 14), rnd(2, 6), col(STYLE.sand.roof || '#a8323e'), 3.5); for (let q = 0; q < 10; q++) SM.emit(p.x + rnd(-3, 3), p.y, rnd(-2, 2), rnd(-3, 3), rnd(2, 6), 0, 1.6, 3, 8, C_.dust, .5, 0, .5); } }
  const gateUp = has(Cs.gate[0]) && has(Cs.gate[1]); if (V.door.alive && !gateUp) { V.door.alive = 0; V.door.l.visible = V.door.r.visible = false; V.arch.visible = false; for (let q = 0; q < 8; q++) debris.add(V.door.l.position.x + 1.4, V.door.l.position.y, V.door.l.position.z, .4, rnd(1, 2.5), .3, rnd(-10, 10), rnd(4, 12), rnd(2, 8), col('#6a4024'), 3); }
}
/* the destruction cinematic: the beaten fort comes down from the top, row by row */
function collapseCastle(s) { const V = castles[s]; if (!V || V.collapse) return; const Cs = V.C, had = Uint8Array.from(Cs.t), gone = new Uint8Array(Cs.t.length), order = []; for (let i = 0; i < Cs.t.length; i++) if (had[i]) order.push([.35 + ((i / Cs.cols) | 0) * .16 + rnd(.3), i]); order.sort((a, b) => a[0] - b[0]); V.collapse = { t: 0, order, had, gone, k: 0 }; }
function collapseStep(V, dt) {
  const K = V.collapse; K.t += dt; const Cs = V.C;
  while (K.k < K.order.length && K.order[K.k][0] < K.t) { const i = K.order[K.k++][1]; K.gone[i] = 1; V.prevT[i] = 254; const [x, y] = cellPos(Cs, i), d = depthOf(i % Cs.cols, (i / Cs.cols) | 0), cx = Cs.x0 + Cs.cols * CS / 2;
    debris.add(x, y, 0, CS * .9, CS * .9, Math.min(d, 4), (x - cx) * rnd(.6, 1.8) + rnd(-3, 3), rnd(2, 12), rnd(-4, 9), V.base[i], rnd(3, 5)); if (Math.random() < (LOW ? .3 : .7)) SM.emit(x, y, rnd(-2, 3), rnd(-3, 3), rnd(1, 5), rnd(0, 3), rnd(1.8, 3), 3, 11, C_.dust, .5, 0, .4); }
  if (K.k >= K.order.length && !K.done) { K.done = 1; for (let q = 0; q < (LOW ? 20 : 60); q++) SM.emit(Cs.x0 + rnd(0, 27), -GY + rnd(0, 10), rnd(-6, 8), rnd(-8, 8), rnd(2, 10), rnd(-2, 4), rnd(2.5, 4), 4, 16, C_.dust, .45, 0, .35); for (const tw of V.towers) if (tw.alive) { tw.alive = 0; tw.roof.visible = false; } V.door.alive = 0; V.door.l.visible = V.door.r.visible = V.arch.visible = false; }
}

/* ---------- cannons (cosmetic models; every model fires the same) ---------- */
const CANNON = { bronze: { barrel: '#c9953a', metal: .7, len: 7.2, r0: .95, r1: .7, rings: '#7a5a20' }, iron: { barrel: '#4a4e58', metal: .6, len: 6.2, r0: 1.2, r1: 1.05, rings: '#22252c' }, dragon: { barrel: '#3a7a52', metal: .4, len: 7.6, r0: .9, r1: 1.25, rings: '#c9a030', dragon: 1 }, royal: { barrel: '#f2d27a', metal: .9, len: 7.8, r0: .95, r1: .75, rings: '#fff4c8' } };
function buildCannon(s) {
  const L = s ? { x: W - 52, y: GY - 6 } : { x: 52, y: GY - 6 }, mine = s === O.home, kind = CANNON[mine ? O.cannon || 'bronze' : 'iron'] || CANNON.bronze, g = new THREE.Group(); g.position.set(L.x, -GY, 0); g.scale.x = s ? -1 : 1;
  const wood = new THREE.MeshStandardMaterial({ map: TX.wood, roughness: .9 }); const car = new THREE.Mesh(new THREE.BoxGeometry(6, 1.8, 3.2), wood); car.position.set(-.8, 2, 0); car.castShadow = true; g.add(car);
  const cheek = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, .5), wood); for (const z of [-1.4, 1.4]) { const c2 = cheek.clone(); c2.position.set(-.2, 3.6, z); c2.castShadow = true; g.add(c2); }
  const wheelG = new THREE.CylinderGeometry(1.7, 1.7, .55, 12).rotateX(Math.PI / 2), wm = new THREE.MeshStandardMaterial({ color: '#3a2414', roughness: .9 }), wheels = []; for (const [x, z] of [[-2.6, 2.1], [-2.6, -2.1], [1.8, 2.1], [1.8, -2.1]]) { const w = new THREE.Mesh(wheelG, wm); w.position.set(x, 1.7, z); w.castShadow = true; g.add(w); wheels.push(w); }
  const piv = new THREE.Group(); piv.position.set(0, 6 - 0, 0); g.add(piv); // trunnion at the launcher height
  const prof = [new THREE.Vector2(0, -1.6), new THREE.Vector2(kind.r0 * 1.15, -1.6), new THREE.Vector2(kind.r0 * 1.2, -1.1), new THREE.Vector2(kind.r0, -.9), new THREE.Vector2(kind.r1, kind.len - 1.2), new THREE.Vector2(kind.r1 * 1.25, kind.len - .9), new THREE.Vector2(kind.r1 * 1.25, kind.len - .5), new THREE.Vector2(kind.r1 * .55, kind.len - .5), new THREE.Vector2(kind.r1 * .55, kind.len - 2)];
  const bm = new THREE.MeshStandardMaterial({ color: kind.barrel, metalness: kind.metal, roughness: .35 }), barrel = new THREE.Mesh(new THREE.LatheGeometry(prof, 14).rotateZ(-Math.PI / 2), bm); barrel.castShadow = true;
  const bar = new THREE.Group(); bar.add(barrel); for (const x of [.4, 2.6, kind.len - 2.2]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(kind.r0 * 1.02 - x * .02, .13, 6, 14).rotateY(Math.PI / 2), new THREE.MeshStandardMaterial({ color: kind.rings, metalness: .8, roughness: .3 })); ring.position.x = x; bar.add(ring); }
  if (kind.dragon) for (const a of [0, 1, 2, 3]) { const sp = new THREE.Mesh(new THREE.ConeGeometry(.3, 1.4, 5), new THREE.MeshStandardMaterial({ color: '#c9a030', metalness: .8, roughness: .3 })); sp.position.set(kind.len - .6, Math.cos(a * Math.PI / 2) * kind.r1 * 1.3, Math.sin(a * Math.PI / 2) * kind.r1 * 1.3); sp.rotation.z = -Math.PI / 2 + Math.cos(a * Math.PI / 2) * .5; bar.add(sp); }
  piv.add(bar);
  const flashS = new THREE.Sprite(new THREE.SpriteMaterial({ map: TX.glow, color: '#ffcf80', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 })); flashS.position.set(kind.len + .6, 0, 0); flashS.scale.set(7, 7, 1); bar.add(flashS);
  root.add(g); return { s, g, piv, bar, flash: flashS, len: kind.len, wheels, rec: 0, fl: 0 };
}
function syncCannon(Cn, dt, ang, rec) { Cn.piv.rotation.z = ang; Cn.bar.position.x = -rec * 1.6; Cn.g.position.x = (Cn.s ? W - 52 : 52) + (Cn.s ? 1 : -1) * rec * .35; for (const w of Cn.wheels) w.rotation.z = rec * .8 * (Cn.s ? -1 : 1); Cn.fl = Math.max(0, Cn.fl - dt * 6); Cn.flash.material.opacity = Cn.fl; Cn.flash.scale.setScalar(4 + Cn.fl * 6); }
function muzzle(s) { const Cn = cannons[s]; if (!Cn) return; Cn.fl = 1; const a = Cn.piv.rotation.z, dir = s ? -1 : 1, mx = Cn.g.position.x + Math.cos(a) * Cn.len * dir, my = -GY + 6 + Math.sin(a) * Cn.len;
  for (let i = 0; i < (LOW ? 6 : 16); i++) { const v = rnd(4, 16); SM.emit(mx, my, rnd(-.5, .5), Math.cos(a) * v * dir + rnd(-2, 2), Math.sin(a) * v + rnd(-1, 2), rnd(-2, 2), rnd(.8, 1.6), 1.5, 7, C_.smoke, .55, -1, 1.6); }
  for (let i = 0; i < 8; i++) FX.emit(mx, my, 0, Math.cos(a) * rnd(10, 30) * dir, Math.sin(a) * rnd(10, 30), rnd(-3, 3), rnd(.1, .25), 2.5, .5, C_.ember, 1, 0, 2);
  lightFlash(mx, my, 3, '#ffc070', 60); }

/* ---------- soldiers: tiny figures with procedural animation and simple behaviours ---------- */
const SG = {};
function soldierGeo() { if (SG.leg) return; SG.leg = new THREE.BoxGeometry(.36, 1.05, .36).translate(0, -.52, 0); SG.arm = new THREE.BoxGeometry(.28, .95, .28).translate(0, -.45, 0); SG.body = new THREE.BoxGeometry(1, 1.2, .62); SG.head = new THREE.SphereGeometry(.36, 8, 6); SG.helm = new THREE.ConeGeometry(.44, .55, 8);
  SG.bow = new THREE.TorusGeometry(.75, .05, 4, 12, Math.PI).rotateZ(-Math.PI / 2); SG.spear = new THREE.CylinderGeometry(.05, .05, 3, 5); SG.hammer = new THREE.BoxGeometry(.5, .35, .35).translate(0, -1, 0); SG.stone = new THREE.BoxGeometry(1, .7, .7);
  SG.skin = new THREE.MeshStandardMaterial({ color: '#c08a5e', roughness: .8 }); SG.steel = new THREE.MeshStandardMaterial({ color: '#9aa0ab', metalness: .7, roughness: .4 }); SG.dark = new THREE.MeshStandardMaterial({ color: '#2e2620', roughness: .9 }); SG.wood = new THREE.MeshStandardMaterial({ color: '#6a4024', roughness: .9 }); }
class Soldier {
  constructor(side, kind, team) {
    soldierGeo(); this.side = side; this.kind = kind; this.g = new THREE.Group(); const tm = new THREE.MeshStandardMaterial({ color: team, roughness: .8 });
    this.legL = new THREE.Mesh(SG.leg, SG.dark); this.legR = new THREE.Mesh(SG.leg, SG.dark); this.legL.position.set(-.24, 1.05, 0); this.legR.position.set(.24, 1.05, 0);
    this.body = new THREE.Mesh(SG.body, tm); this.body.position.y = 1.65; this.head = new THREE.Mesh(SG.head, SG.skin); this.head.position.y = 2.6; this.helm = new THREE.Mesh(SG.helm, kind === 'mason' ? SG.dark : SG.steel); this.helm.position.y = 2.95;
    this.armL = new THREE.Mesh(SG.arm, tm); this.armR = new THREE.Mesh(SG.arm, tm); this.armL.position.set(-.66, 2.15, 0); this.armR.position.set(.66, 2.15, 0);
    this.g.add(this.legL, this.legR, this.body, this.head, this.helm, this.armL, this.armR);
    if (kind === 'archer') { this.tool = new THREE.Mesh(SG.bow, SG.wood); this.tool.position.set(0, -.8, .35); this.armL.add(this.tool); }
    else if (kind === 'guard') { this.tool = new THREE.Mesh(SG.spear, SG.wood); this.tool.position.set(0, -.6, .2); this.armR.add(this.tool); }
    else if (kind === 'mason') { this.tool = new THREE.Mesh(SG.hammer, SG.steel); this.armR.add(this.tool); this.stone = new THREE.Mesh(SG.stone, new THREE.MeshStandardMaterial({ map: TX.stone, color: '#d8a868' })); this.stone.position.set(0, 3.5, 0); this.g.add(this.stone); }
    this.g.scale.setScalar(1.55); /* toy-soldier scale: readable on a phone */ this.x = 0; this.y = -GY; this.z = 0; this.face = side ? -1 : 1; this.st = 'idle'; this.t = 0; this.ph = rnd(6); this.vx = 0; this.vy = 0; this.alive = 1; this.wp = null;
    root.add(this.g);
  }
  set(st, t = 0) { this.st = st; this.t = t; }
  update(dt, T) {
    const g = this.g; this.t += dt; let walk = 0, lift = 0, armsUp = 0, crouch = 0, aim = 0, hammer = 0;
    if (this.st === 'dead') { this.vy -= 50 * dt; this.x += this.vx * dt; this.y += this.vy * dt; const gy = groundAt(this.x, this.z); if (this.y < gy) { this.y = gy; this.vy = 0; this.vx *= .5; } g.rotation.z += (Math.PI / 2 * Math.sign(this.vx || 1) - g.rotation.z) * Math.min(1, dt * 6); if (this.t > 4) { g.visible = false; } }
    else if (this.st === 'walk' || this.st === 'run' || this.st === 'flee') { const sp = this.st === 'walk' ? 4.5 : 11, wp = this.wp; if (wp) { const dx = wp[0] - this.x, dz = wp[2] - this.z, d = Math.hypot(dx, dz); if (d < .4) { this.x = wp[0]; this.z = wp[2]; this.wp = null; this.onArrive && this.onArrive(); } else { this.x += dx / d * sp * dt; this.z += dz / d * sp * dt; if (Math.abs(dx) > .1) this.face = Math.sign(dx); } this.y = wp[1] != null ? wp[1] : groundAt(this.x, this.z); } walk = sp; }
    else if (this.st === 'shoot') { aim = this.t < .25 ? this.t / .25 : this.t < .45 ? 1 : Math.max(0, 1 - (this.t - .45) * 3); if (this.t > .8) this.st = 'idle'; }
    else if (this.st === 'cower') { crouch = 1; armsUp = .6; if (this.t > 1.3) this.st = this.back || 'idle'; }
    else if (this.st === 'cheer') { armsUp = 1; lift = Math.abs(Math.sin(this.t * 7 + this.ph)) * .9; }
    else if (this.st === 'rally') { armsUp = .8 + Math.sin(this.t * 12) * .2; if (this.t > 1.6) this.st = this.back || 'idle'; }
    else if (this.st === 'work') { hammer = Math.sin(this.t * 10) * .5 + .5; }
    else if (this.st === 'load') { aim = Math.min(1, this.t * 3); if (this.t > .6) this.st = 'idle'; }
    if (this.st !== 'dead') { g.rotation.z = 0; }
    const ph = this.ph + T * (walk ? walk * 1.4 : 2), sw = walk ? Math.sin(ph) * .8 : 0;
    this.legL.rotation.x = sw; this.legR.rotation.x = -sw; this.armL.rotation.x = -sw * .7 - armsUp * 2.6 - aim * 1.5; this.armR.rotation.x = sw * .7 - armsUp * 2.6 - aim * 1.1 - hammer * 1.8;
    this.armR.rotation.z = aim ? -aim * .4 : 0; this.body.position.y = 1.65 - crouch * .5; this.head.position.y = 2.6 - crouch * .55; this.helm.position.y = 2.95 - crouch * .55; this.armL.position.y = this.armR.position.y = 2.15 - crouch * .5; this.legL.scale.y = this.legR.scale.y = 1 - crouch * .45;
    if (!walk && this.st !== 'dead') this.body.position.y += Math.sin(T * 2 + this.ph) * .03;
    g.position.set(this.x, this.y + lift, this.z); g.rotation.y = this.face > 0 ? Math.PI / 2 : -Math.PI / 2; if (this.st === 'work' || this.kind === 'mason' && this.st === 'idle') g.rotation.y = 0; if (this.stone) this.stone.visible = !!this.carry;
  }
  die(vx = rnd(-6, 6), vy = rnd(4, 12)) { if (this.st === 'dead') return; this.alive = 0; this.st = 'dead'; this.t = 0; this.vx = vx; this.vy = vy; }
}
function buildSoldiers(V) {
  const Cs = V.C, s = V.s, team = s === O.home ? '#1f9e8c' : '#b83246', list = [];
  POSTS.forEach(([c, r], k) => { const a = new Soldier(s, 'archer', team); a.post = r * Cs.cols + c; a.k = k; a.x = Cs.x0 + (c + .5) * CS; a.y = -(Cs.y0 + r * CS); a.z = c <= 1 || c >= 7 ? 2.6 : 1.2; a.face = s ? -1 : 1; a.home = 'idle'; list.push(a); });
  if (!LOW) for (let j = 0; j < 2; j++) { const gd = new Soldier(s, 'guard', team); gd.x = Cs.x0 + (2.5 + j * 3) * CS; gd.y = -(Cs.y0 + 4 * CS); gd.z = -1.5; gd.patrol = [Cs.x0 + 2.4 * CS, Cs.x0 + 6.6 * CS]; gd.dir = j ? 1 : -1; gd.st = 'walk'; gd.floor = r => 4; list.push(gd); }
  const L = s ? W - 52 : 52, dir = s ? -1 : 1; for (const [dx, dz] of [[-5.5, 2.6], [-3, -3.2]]) { const cw = new Soldier(s, 'crew', team); cw.x = L + dx * dir; cw.y = -GY; cw.z = dz; cw.face = dir; cw.crew = 1; list.push(cw); }
  for (let j = 0; j < 2; j++) { const m = new Soldier(s, 'mason', team); m.g.visible = false; m.mason = 1; m.st = 'hidden'; list.push(m); }
  V.crewOut = 0; return list;
}
function syncSoldiers(dt, T) {
  for (const so of soldiers) { const V = castles[so.side]; if (!V) continue; const Cs = V.C;
    if (so.st === 'hidden') { so.g.visible = false; continue; }
    if (so.alive && so.post != null && !Cs.t[so.post] && !V.collapse) so.die(rnd(-6, 6) * (so.side ? -1 : 1), rnd(2, 8)); // the tower top under the archer is gone
    if (so.alive && V.collapse && so.post != null && V.collapse.gone[so.post]) so.die(rnd(-8, 8), rnd(4, 10));
    if (so.alive && so.patrol) { const r = 4, c = clamp(Math.floor((so.x - Cs.x0) / CS), 0, Cs.cols - 1); if (!Cs.t[r * Cs.cols + c] || V.collapse) so.die(rnd(-5, 5), rnd(2, 6)); else if (so.st === 'walk' && !so.wp) { so.dir = -so.dir; so.wp = [so.dir > 0 ? so.patrol[1] : so.patrol[0], -(Cs.y0 + 4 * CS), -1.5]; } }
    so.update(dt, T); }
}
function soldiersOf(s, f) { return soldiers.filter(so => so.side === s && so.alive && (!f || f(so))); }

/* ---------- arrows (visual: the sim already decided whether they hit) ---------- */
function shootArrow(e) {
  const V = castles[e.side]; if (!V) return; const ar = soldiersOf(e.side, so => so.k === e.k)[0]; if (ar) { ar.set('shoot'); ar.face = e.x > ar.x ? 1 : -1; }
  let m = arrows.find(a => !a.on); if (!m) { if (arrows.length > 30) return; const g = new THREE.Group(), sh = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 2.2, 4).rotateZ(Math.PI / 2), SG.wood), hd = new THREE.Mesh(new THREE.ConeGeometry(.16, .5, 4).rotateZ(-Math.PI / 2), SG.steel); hd.position.x = 1.25; g.add(sh, hd); root.add(g); m = { g }; arrows.push(m); }
  const sx = e.ax, sy = -e.ay + 1.5, tx = e.x, ty = -e.y; Object.assign(m, { on: 1, t: 0, T: .28 + Math.hypot(tx - sx, ty - sy) / 160, sx, sy, tx, ty, hit: e.hit, vx: 0, vy: 0 }); m.g.visible = true; G_sfx('arrow', e.side);
}
function syncArrows(dt) { for (const a of arrows) { if (!a.on) continue; a.t += dt; const f = Math.min(1, a.t / a.T), x = a.sx + (a.tx - a.sx) * f, y = a.sy + (a.ty - a.sy) * f + Math.sin(f * Math.PI) * 4, dx = (a.tx - a.sx), dy = (a.ty - a.sy) + Math.cos(f * Math.PI) * 4 * Math.PI;
    a.g.position.set(x, y, .5); a.g.rotation.z = Math.atan2(dy, dx); if (f >= 1) { a.on = 0; a.g.visible = false; if (a.hit) { for (let i = 0; i < 10; i++) FX.emit(a.tx, a.ty, .5, rnd(-12, 12), rnd(-12, 12), rnd(-4, 4), rnd(.15, .35), 1.6, .3, C_.spark, 1, 10); SM.emit(a.tx, a.ty, .5, 0, 2, 0, .8, 1.5, 4, C_.smoke, .45); } } } }

/* ---------- projectiles ---------- */
let lightInst = null;
const HEAVY = { ball: () => new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), new THREE.MeshStandardMaterial({ color: '#2a2a30', metalness: .8, roughness: .35 })),
  boulder: () => { const g = new THREE.IcosahedronGeometry(2.1, 1); const p = g.attributes.position; for (let i = 0; i < p.count; i++) { V3.fromBufferAttribute(p, i).multiplyScalar(.82 + Math.random() * .3); p.setXYZ(i, V3.x, V3.y, V3.z); } g.computeVertexNormals(); return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: '#7a6a62', roughness: 1, flatShading: true })); },
  star: () => { const m = HEAVY.boulder(); m.scale.setScalar(1.7); m.material = new THREE.MeshStandardMaterial({ color: '#5a3a2a', emissive: '#ff7a2a', emissiveIntensity: 1.6, roughness: 1, flatShading: true }); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: TX.glow, color: '#ffb060', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); s.scale.set(9, 9, 1); m.add(s); return m; },
  cluster: () => { const m = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, 2.4, 10).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#3a3430', metalness: .5, roughness: .5 })); const band = new THREE.Mesh(new THREE.TorusGeometry(.82, .14, 5, 12).rotateY(Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#c0392b' })); m.add(band); return m; },
  bolt: () => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(.9, 0), new THREE.MeshBasicMaterial({ color: '#dff8ff' })); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: TX.glow, color: '#6fd8ff', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); s.scale.set(6, 6, 1); m.add(s); return m; } };
const pools = {};
function getHeavy(kind) { const p = pools[kind] || (pools[kind] = []); let m = p.find(q => !q.userData.on); if (!m) { m = HEAVY[kind](); m.castShadow = kind !== 'bolt'; p.push(m); root.add(m); } m.userData.on = 1; m.visible = true; return m; }
function syncProjectiles(dt, T) {
  const st = B.st, trail = O.trail, seen = new Set(); let n = 0;
  for (const p of st.R) {
    const kind = p.big === 2 ? 'star' : p.big ? 'boulder' : p.wk === 'ball' && !p.neutral ? 'ball' : p.wk === 'cluster' && !p.split ? 'cluster' : p.wk === 'bolt' ? 'bolt' : null, x = p.x, y = -p.y;
    if (kind) { let m = heavies.get(p); if (!m) { m = getHeavy(kind); heavies.set(p, m); } seen.add(p); m.position.set(x, y, 0); if (kind === 'boulder' || kind === 'star') { if (p.roll) m.rotation.z -= p.vx * dt / 2.1; else { m.rotation.x += dt * 3; m.rotation.z += dt * 4; } } else if (kind === 'cluster') m.rotation.z = Math.atan2(-p.vy, p.vx); else if (kind === 'bolt') m.rotation.set(T * 9, T * 7, 0);
      if (kind === 'star') { for (let i = 0; i < (LOW ? 3 : 8); i++) FX.emit(x + rnd(-2, 2), y + rnd(-2, 2), rnd(-1, 1), -p.vx * .2 + rnd(-3, 3), -(-p.vy) * .2 + rnd(-3, 3), rnd(-2, 2), rnd(.4, .9), rnd(5, 8), 1, C_.fire, .9, 0, 1); SM.emit(x, y, 0, rnd(-2, 2), rnd(-2, 2), 0, 2, 4, 12, C_.dark, .5, -1, .4); }
      else if (kind === 'ball' && Math.random() < .6) SM.emit(x, y, 0, rnd(-1, 1), rnd(-1, 1), 0, rnd(.8, 1.4), 1, 3.5, C_.smoke, .35, -.5, .4);
      else if (kind === 'bolt') { if (Math.random() < .8) FX.emit(x + rnd(-1, 1), y + rnd(-1, 1), rnd(-.5, .5), rnd(-6, 6), rnd(-6, 6), rnd(-2, 2), .2, 1.6, .2, C_.cyan, 1); }
      else if (kind === 'boulder' && p.roll && Math.random() < .6) SM.emit(x, y - 1.5, rnd(-1, 1), rnd(-2, 2), rnd(1, 3), 0, 1.2, 2, 5, C_.dust, .45, 0, .5);
      else if (kind === 'cluster' && Math.random() < .5) SM.emit(x, y, 0, 0, 1, 0, 1, 1, 3, C_.smoke, .3);
      continue; }
    // light shots: glowing meteors (instanced)
    if (n < 380) { const c = p.o < 0 ? C_.fire : p.f ? C_.fire : p.wk === 'cluster' ? C_.dark : p.o === O.me ? (trail ? trail[0] : TMPC.setHSL(((T * 120 + p.x * 3) % 360) / 360, .9, .65)) : C_.foe; const sz = .55 + Math.min(1.4, Math.log2(1 + p.w) * .35);
      M4.compose(V3.set(x, y, 0), Q.identity(), S3.set(sz, sz, sz)); lightInst.setMatrixAt(n, M4); lightInst.setColorAt(n, c); n++;
      if (Math.random() < (LOW ? .25 : .55)) FX.emit(x, y, rnd(-.3, .3), -p.vx * .05 + rnd(-1, 1), p.vy * .05 + rnd(-1, 1), 0, p.f ? .5 : .35, p.f ? 3 : 2.2, .3, c, .85, -2, 1);
      if (p.f && Math.random() < .3) SM.emit(x, y, 0, 0, 2, 0, 1, 1.5, 4, C_.dark, .3, -1); } }
  lightInst.count = n; lightInst.instanceMatrix.needsUpdate = true; if (lightInst.instanceColor) lightInst.instanceColor.needsUpdate = true;
  for (const [p, m] of heavies) if (!seen.has(p)) { m.userData.on = 0; m.visible = false; heavies.delete(p); }
}

/* ---------- impact effects ---------- */
let flashL = 0;
function lightFlash(x, y, z, c, power) { lightP.position.set(x, y, z + 6); lightP.color.set(c); flashL = Math.max(flashL, power); }
function shock(x, y, r, c = '#ffe0b0') { let m = rings.find(q => !q.userData.on); if (!m) { m = new THREE.Mesh(new THREE.RingGeometry(.8, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); rings.push(m); root.add(m); } m.userData = { on: 1, t: 0, r }; m.material.color.set(c); m.position.set(x, y + .3, 0); m.visible = true; }
function syncRings(dt) { for (const m of rings) { if (!m.userData.on) continue; const u = m.userData; u.t += dt; const f = u.t / .6; m.scale.setScalar(1 + f * u.r); m.material.opacity = Math.max(0, 1 - f); if (f >= 1) { u.on = 0; m.visible = false; } } }
function chunks(x, y, n, c, sp = 14, sz = .8) { for (let i = 0; i < n; i++) { const s = sz * rnd(.5, 1.3); debris.add(x + rnd(-1, 1), y + rnd(0, 1), rnd(-2, 2), s, s, s, rnd(-sp, sp), rnd(sp * .4, sp * 1.3), rnd(-sp * .4, sp * .7), c, rnd(2, 3.5)); } }
function explode(x, y, size, kind) {
  const L = LOW ? .4 : 1, nF = Math.ceil(size * 10 * L);
  for (let i = 0; i < nF; i++) { const a = rnd(Math.PI * 2), v = rnd(2, 9) * size; FX.emit(x, y, rnd(-1, 1) * size, Math.cos(a) * v, Math.abs(Math.sin(a)) * v * .8 + 2, rnd(-v, v) * .5, rnd(.25, .55), rnd(3, 6) * size, .6, kind === 'cyan' ? C_.cyan : i % 3 ? C_.fire : C_.ember, .9, -2, 2.5); }
  for (let i = 0; i < Math.ceil(size * 6 * L); i++) SM.emit(x + rnd(-1, 1) * size, y + rnd(0, 1) * size, rnd(-1, 1) * size, rnd(-3, 3) * size, rnd(2, 6) * size * .6, rnd(-2, 2), rnd(1.2, 2.4), 2 * size, 7 * size, kind === 'dirt' ? C_.dust : C_.smoke, .55, -1, .8);
  for (let i = 0; i < Math.ceil(size * 8 * L); i++) FX.emit(x, y, 0, rnd(-25, 25) * size * .6, rnd(5, 30) * size * .6, rnd(-10, 10), rnd(.3, .7), .9, .3, C_.spark, 1, 30, .5);
  lightFlash(x, y, 0, kind === 'cyan' ? '#8fe8ff' : '#ffb060', 40 + size * 90);
}
function onEvent(e) {
  if (!built) return; const st = B.st;
  switch (e.e) {
    case 'launch': muzzle(e.side); { const crew = soldiersOf(e.side, s => s.crew); if (crew[0]) crew[0].set('load'); if (crew[1]) crew[1].set('cower', 0), crew[1].back = 'idle'; } break;
    case 'boom': { const big = e.r > 3, pal = terrain.userData.pal; if (e.ball) { explode(e.x, -e.y, 1.6, 'dirt'); shock(e.x, -e.y, 7); chunks(e.x, -e.y, LOW ? 4 : 10, pal[1], 16, .9); if (e.dirt) scorchAt(e.x, 4, .35); }
      else if (e.dirt) { explode(e.x, -e.y, big ? 1.3 : .5, 'dirt'); chunks(e.x, -e.y, big ? 8 : 2, pal[1], 12, .6); if (big) shock(e.x, -e.y, 5); scorchAt(e.x, Math.min(5, e.r * 1.2), .25); } else explode(e.x, -e.y, big ? 1.2 : .45); nearCastle(e.x, e.y, big ? 1 : .35); break; }
    case 'thud': explode(e.x, -e.y, e.land ? .6 : 1.4, 'dirt'); chunks(e.x, -e.y, e.land ? 4 : 12, terrain.userData.pal[1], 14, 1); if (!e.land) shock(e.x, -e.y, 8); nearCastle(e.x, e.y, 1); break;
    case 'jar': explode(e.x, -e.y + 2, 2.4); shock(e.x, -e.y, 12, '#ffb070'); for (let i = 0; i < (LOW ? 10 : 30); i++) SM.emit(e.x + rnd(-2, 2), -e.y + rnd(0, 4), rnd(-2, 2), rnd(-2, 2), rnd(6, 14), 0, rnd(2.5, 4), 4, 14, C_.dark, .6, -1, .3); chunks(e.x, -e.y, 10, col('#8a4a22'), 18, .7); scorchAt(e.x, 10, .5); { const m = jars3.get(e.x); if (m) m.visible = false; } break;
    case 'star': explode(e.x, -e.y, 3.2); shock(e.x, -e.y, 22, '#ffe2a0'); shock(e.x, -e.y, 14, '#ff9a4a'); chunks(e.x, -e.y, LOW ? 12 : 30, terrain.userData.pal[1], 26, 1.3); scorchAt(e.x, 18, .6); nearCastle(e.x, e.y, 3); break;
    case 'bolt': strike(e.x, -e.y); break;
    case 'brk': { const V = castles[e.side]; if (!V) break; const [x, y] = cellPos(V.C, e.i); chunks(x, y, LOW ? 3 : 6, V.base[e.i] || C_.dust, 10, .7); SM.emit(x, y, 2, 0, 2, 1, 1.4, 3, 7, C_.dust, .5); V.shake = Math.min(1.2, V.shake + .35); break; }
    case 'fall': { const V = castles[e.side]; if (!V) break; const [x, y] = cellPos(V.C, e.i); debris.add(x, y, 0, CS * .92, CS * .92, 3.5, rnd(-4, 4), rnd(0, 3), rnd(-1, 4), V.base[e.i] || C_.dust, 4.5); V.shake = Math.min(1.5, V.shake + .5); break; }
    case 'core': { const V = castles[e.side]; if (!V) break; const p = V.gem.position; for (let i = 0; i < 8; i++) FX.emit(p.x, p.y, p.z, rnd(-14, 14), rnd(-6, 14), rnd(0, 8), .4, 1.6, .3, C_.gold, 1, 20); V.shake = Math.min(1.5, V.shake + .3); break; }
    case 'dune': for (let i = 0; i < (LOW ? 14 : 40); i++) SM.emit(e.x + rnd(-8, 8), -GY + rnd(0, 6), rnd(-6, 6), rnd(-4, 4), rnd(6, 16), rnd(-3, 3), rnd(1, 2), 3, 8, C_.sand, .55, 10, .3); break;
    case 'starcall': starMarks.push({ x: e.x, side: e.side, t: 0, T: 70 / 60 + .2 }); break;
    case 'split': for (let i = 0; i < 10; i++) FX.emit(e.x, -e.y, 0, rnd(-10, 10), rnd(-10, 10), rnd(-4, 4), .25, 2.5, .3, C_.ember, 1); SM.emit(e.x, -e.y, 0, 0, 1, 0, 1, 2, 6, C_.smoke, .5); break;
    case 'arrow': shootArrow(e); break;
    case 'gate': { const g = B.st.gates[e.g]; if (!g) break; const c = e.k >= 10 ? C_.gold : C_.cyan; for (let i = 0; i < (LOW ? 4 : 10); i++) FX.emit(g.x + rnd(-1, 1), -g.y + rnd(-g.h / 2, g.h / 2), rnd(-1, 1), rnd(6, 16), rnd(-6, 6), rnd(-4, 4), rnd(.25, .5), 2.4, .3, c, 1, 0, 2); const grp = gates3[e.g]; if (grp) grp.userData.kick = 1; break; }
    case 'sortie': { const V = castles[e.side]; if (!V) break; const [tx] = cellPos(V.C, e.i), [gx] = cellPos(V.C, V.C.gate[0]); V.crewOut = 2; soldiersOf(e.side, s => s.mason).forEach((m, j) => { m.g.visible = true; m.x = gx; m.z = -1; m.y = -GY; m.carry = 1; m.set('walk'); m.wp = [tx + (j ? 1.6 : -1.6), null, 5.5 + j]; m.onArrive = () => { m.set('work'); m.face = 1; }; m.job = e.i; }); G_sfx('steps', e.side); break; }
    case 'repair': { const V = castles[e.side]; if (!V) break; const [x, y] = cellPos(V.C, e.i); for (let i = 0; i < 12; i++) SM.emit(x + rnd(-1.5, 1.5), y + rnd(-1.5, 1.5), 3, rnd(-2, 2), rnd(0, 3), 1, 1, 2, 5, C_.dust, .5); masonsHome(e.side); break; }
    case 'laststand': { const V = castles[e.side]; if (!V) break; soldiersOf(e.side).forEach(so => { so.back = so.st === 'walk' ? 'walk' : 'idle'; so.set('rally'); }); for (let i = 0; i < 40; i++) FX.emit(V.C.x0 + rnd(0, 27), -V.C.y0 + rnd(-30, 0), rnd(-4, 4), 0, rnd(4, 10), 0, rnd(.6, 1.2), 3, .5, C_.blood, .8, -3); break; }
    case 'cratepop': if (balloon) { const p = balloon.position; for (let i = 0; i < (LOW ? 20 : 60); i++) FX.emit(p.x, p.y, p.z, rnd(-14, 14), rnd(-6, 16), rnd(-8, 8), rnd(.5, 1), 2, .4, i % 2 ? C_.gold : C_.spark, 1, 12); debris.add(p.x, p.y - 3, 0, 2, 1.6, 2, rnd(-3, 3), 2, 0, col('#8a5a2a'), 3); } break;
    case 'slide': for (let i = 0; i < (LOW ? 8 : 24); i++) SM.emit(e.x + rnd(-4, 4), -e.y + rnd(-1, 2), rnd(-6, 6), e.dir * rnd(2, 8), rnd(1, 4), 0, rnd(1.4, 2.4), 3, 9, C_.dust, .5, 0, .4); chunks(e.x, -e.y, 8, terrain.userData.pal[1], 8, .6); break;
    case 'win': collapseCastle(1 - e.winner); soldiersOf(e.winner).forEach(so => { so.back = 'cheer'; so.set('cheer'); }); break;
  }
}
function nearCastle(x, y, power) { for (const V of castles) { const C2 = V.C; if (x > C2.x0 - 14 && x < C2.x0 + C2.cols * CS + 14) { V.shake = Math.min(1.5, V.shake + power * .4); for (const so of soldiersOf(V.s)) { if (so.st === 'walk' || so.st === 'idle') { if (Math.random() < .7) { so.back = so.st; so.set('cower'); } } if (Math.hypot(so.x - x, so.y + y) < 3 + power * 2) so.die(Math.sign(so.x - x) * rnd(6, 14), rnd(6, 14)); } } } }
function masonsHome(s) { const V = castles[s]; if (!V) return; const [gx] = cellPos(V.C, V.C.gate[0]); soldiersOf(s, m => m.mason).forEach(m => { m.carry = 0; m.set('walk'); m.wp = [gx, null, -1]; m.onArrive = () => { m.set('hidden'); m.g.visible = false; V.crewOut = Math.max(0, V.crewOut - 1); }; }); }
function strike(x, y) {
  // a jagged bolt from the clouds to the impact, a white flash, sparks
  let b = bolts3.find(q => !q.userData.on); if (!b) { b = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ color: '#e8fbff', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); bolts3.push(b); root.add(b); }
  const pts = []; let px = x + rnd(-10, 10); for (let k = 0; k <= 14; k++) { const yy = 60 - (60 - y) * k / 14; pts.push([k === 14 ? x : px, yy]); px += rnd(-4, 4) + (x - px) * .25; }
  const pos = []; for (let k = 0; k < pts.length - 1; k++) { const [x1, y1] = pts[k], [x2, y2] = pts[k + 1], w = .7; pos.push(x1 - w, y1, 1, x1 + w, y1, 1, x2 + w, y2, 1, x1 - w, y1, 1, x2 + w, y2, 1, x2 - w, y2, 1); }
  b.geometry.dispose(); b.geometry = new THREE.BufferGeometry(); b.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); b.userData = { on: 1, t: 0 }; b.visible = true;
  explode(x, y, 1.3, 'cyan'); shock(x, y, 9, '#9ff0ff'); hemiFlash = 1.2; scorchAt(x, 3, .5);
}
let hemiFlash = 0;
function syncBolts(dt) { for (const b of bolts3) { if (!b.userData.on) continue; b.userData.t += dt; b.material.opacity = Math.max(0, 1 - b.userData.t / .45) * (Math.random() < .3 ? .4 : 1); if (b.userData.t > .45) { b.userData.on = 0; b.visible = false; } } }

/* ---------- gates, jars, balloon ---------- */
function buildGates() {
  gates3 = B.st.gates.map(gt => { const gold = gt.v >= 10, c = gold ? '#ffcf6b' : '#3fe0c5', grp = new THREE.Group(), fm = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.2, metalness: .5, roughness: .3 });
    const h = gt.h, w = 7; for (const [x, y, sx, sy] of [[-w / 2, 0, .5, h], [w / 2, 0, .5, h], [0, h / 2, w + .5, .5], [0, -h / 2, w + .5, .5]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, .7), fm); b.position.set(x, y, 0); grp.add(b); }
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: .16, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })); grp.add(pane);
    const lab = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex('×' + gt.v, '#ffffff'), transparent: true, depthWrite: false })); lab.scale.set(7, 3.5, 1); lab.position.set(0, 0, 1); grp.add(lab);
    grp.userData = { pane, fm, g: gt }; root.add(grp); return grp; });
}
function syncGates(T) { for (const grp of gates3) { const g = grp.userData.g; grp.position.set(g.x, -g.y, 0); grp.userData.pane.material.opacity = .14 + g.flash * .4 + Math.sin(T * 3 + g.i) * .03; grp.userData.fm.emissiveIntensity = 1 + g.flash * 2; grp.rotation.y = Math.sin(T * .8 + g.i) * .25; const k = grp.userData.kick || 0; grp.scale.setScalar(1 + k * .25); grp.userData.kick = Math.max(0, k - .06); } }
function buildJars() {
  jars3 = new Map(); const prof = []; for (let i = 0; i <= 12; i++) { const t = i / 12; prof.push(new THREE.Vector2(.25 + Math.sin(t * Math.PI) * 1.25 + (t > .85 ? (t - .85) * 2 : 0), t * 4.2)); }
  const geo = new THREE.LatheGeometry(prof, 12), mat = new THREE.MeshStandardMaterial({ color: '#a85a2a', roughness: .8 }), band = new THREE.MeshStandardMaterial({ color: '#e8c370', roughness: .6 });
  for (const j of B.st.jars) { const m = new THREE.Mesh(geo, mat); const b2 = new THREE.Mesh(new THREE.TorusGeometry(1.42, .12, 4, 14).rotateX(Math.PI / 2), band); b2.position.y = 2; m.add(b2); m.castShadow = true; m.userData.j = j; root.add(m); jars3.set(j.x, m); }
}
function syncJars() { for (const m of jars3.values()) { const j = m.userData.j; m.visible = !!j.alive; if (!j.alive) continue; m.position.set(j.x, -j.y - .2, 1); if (j.fuse && Math.random() < .7) FX.emit(j.x, -j.y + 4.6, 1, rnd(-2, 2), rnd(3, 8), rnd(-1, 1), .3, 1.6, .3, C_.ember, 1, 5); } }
function buildBalloon() { const g = new THREE.Group(), env = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 12), new THREE.MeshStandardMaterial({ map: TX.balloon, roughness: .7 })); env.scale.y = 1.2; const bk = new THREE.Mesh(new THREE.BoxGeometry(2, 1.6, 2), new THREE.MeshStandardMaterial({ map: TX.wood })); bk.position.y = -5.4; const crate = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 1.4), new THREE.MeshStandardMaterial({ color: '#ffd36b', emissive: '#a87a10', emissiveIntensity: .6 })); crate.position.y = -4.4; g.add(env, bk, crate); g.visible = false; root.add(g); return g; }
function syncBalloon(T) { const c = B.st.crate; balloon.visible = !!c; if (c) { balloon.position.set(c.x, -c.y + 4.5, 0); balloon.rotation.y = T * .6; } }

/* ---------- star telegraph ---------- */
let markMesh = null;
function syncMarks(dt) { if (!markMesh) { markMesh = new THREE.Mesh(new THREE.RingGeometry(10, 12, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffd36b', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); root.add(markMesh); }
  markMesh.visible = false; for (let i = starMarks.length - 1; i >= 0; i--) { const m = starMarks[i]; m.t += dt; if (m.t > m.T) { starMarks.splice(i, 1); continue; } const f = m.t / m.T; markMesh.visible = true; markMesh.position.set(m.x, -B.st.h[clamp(Math.round(m.x), 0, W)] + .4, 0); markMesh.scale.setScalar(1.2 - f * .5); markMesh.material.color.set(m.side === O.me ? '#ffd36b' : '#ff4d6d'); markMesh.material.opacity = .5 + .5 * Math.sin(m.t * 18); } }

/* ---------- weather ---------- */
function buildWeather(mood) {
  if (mood.fx === 'rain') { const n = LOW ? 250 : 700, pos = new Float32Array(n * 6); for (let i = 0; i < n; i++) { const x = rnd(-200, 500), y = rnd(-150, 60), z = rnd(-40, 60); pos.set([x, y, z, x, y - 3, z], i * 6); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: '#b8c4e0', transparent: true, opacity: .45 })); rain.frustumCulled = false; scene.add(rain); }
  if (mood.fx === 'fireflies' || mood.fx === 'motes' || mood.stars) { const n = mood.fx === 'fireflies' ? 60 : 40, pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) pos.set([rnd(-40, 340), -GY + rnd(4, 60), rnd(-30, 30)], i * 3); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    motes = new THREE.Points(g, new THREE.PointsMaterial({ color: mood.fx === 'fireflies' ? '#c8ff96' : '#ffe6be', size: 1.1, map: TX.glow, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 })); root.add(motes); }
  if (mood.stars) { const n = 400, pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const a = rnd(-1.4, 1.4), b = rnd(.05, 1.2); pos.set([150 + Math.sin(a) * 900, -40 + Math.sin(b) * 700, -900 + Math.cos(a) * 100], i * 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: '#ffffff', size: 2.2, sizeAttenuation: false, transparent: true, opacity: Math.min(1, mood.stars * .7), fog: false })); scene.add(stars); }
}
function syncWeather(dt, T, camX) {
  const wind = B.st.wind || 0;
  if (rain) { const p = rain.geometry.attributes.position.array; for (let i = 0; i < p.length; i += 6) { p[i + 1] -= 110 * dt; p[i] += wind * 2 * dt; if (p[i + 1] < -150) { p[i + 1] = 60; p[i] = camX + rnd(-250, 250); } p[i + 3] = p[i] - wind * .5; p[i + 4] = p[i + 1] - 3.5; p[i + 5] = p[i + 2]; } rain.geometry.attributes.position.needsUpdate = true;
    stormT -= dt; if (stormT <= 0) { stormT = rnd(6, 13); hemiFlash = 1.4; G_sfx('thunder'); } }
  if (motes) { const p = motes.geometry.attributes.position.array; for (let i = 0; i < p.length; i += 3) { p[i] += (wind * .5 + Math.sin(T * .7 + i) * 1.5) * dt; p[i + 1] += Math.cos(T * .9 + i) * dt * 1.2; if (p[i] > 340) p[i] = -40; if (p[i] < -40) p[i] = 340; } motes.geometry.attributes.position.needsUpdate = true; motes.material.opacity = .5 + .3 * Math.sin(T * 2); }
}

let G_sfx = () => {};

/* ---------- public API ---------- */
function init(cv) {
  if (ren) return true; canvas = cv;
  try { ren = new THREE.WebGLRenderer({ canvas, antialias: (devicePixelRatio || 1) < 2.5, powerPreference: 'high-performance', alpha: false }); } catch (e) { ren = null; return false; }
  if (!ren.getContext()) { ren = null; return false; }
  ren.toneMapping = THREE.ACESFilmicToneMapping; ren.toneMappingExposure = 1.05; ren.shadowMap.enabled = true; ren.shadowMap.type = THREE.PCFShadowMap;
  textures(); scene = new THREE.Scene(); cam = new THREE.PerspectiveCamera(40, 1, .5, 3000); root = new THREE.Group(); scene.add(root);
  hemi = new THREE.HemisphereLight('#ffffff', '#553322', 1.2); scene.add(hemi); sun = new THREE.DirectionalLight('#fff0d8', 2.6); sun.castShadow = true; sun.shadow.mapSize.set(1536, 1536); Object.assign(sun.shadow.camera, { left: -180, right: 180, top: 120, bottom: -120, near: 10, far: 800 }); sun.shadow.bias = -.0006; sun.shadow.normalBias = .4; scene.add(sun, sun.target);
  lightP = new THREE.PointLight('#ffb060', 0, 120, 1.6); scene.add(lightP);
  return true;
}
function begin(battle, opts) {
  if (!ren) return false; end(); B = battle; O = opts; LOW = !!opts.low; G_sfx = opts.sfx || (() => {}); O.home = opts.home != null ? opts.home : opts.me; O.trail = opts.trail ? opts.trail.map(t => col('rgb(' + t + ')')) : null; clockT = 0; endCam = null; stormT = rnd(3, 6);
  ren.setPixelRatio(Math.min(devicePixelRatio || 1, LOW ? 1.25 : 2)); ren.shadowMap.enabled = !LOW; sun.castShadow = !LOW;
  const m = opts.mood; scene.background = skyTex(m); scene.fog = new THREE.Fog(col(m.sky[2]).lerp(col(m.far), .35), 260, 1500);
  hemi.color.set(m.sky[3]); hemi.groundColor.set(m.rock[2]); hemi.intensity = m.night ? .95 : m.fx === 'rain' ? .85 : 1.15; sun.color.set(m.night ? '#9fb4ff' : m.sun === 1 ? '#ffd2b0' : m.sun === 2 ? '#fff4e0' : '#ffc890'); sun.intensity = m.night ? 1.6 : m.fx === 'rain' ? 1.2 : m.sun === 2 ? 3 : 2.5;
  const sx = m.sun === 1 ? -120 : 120; sun.position.set(150 + sx, 60, 160); sun.target.position.set(150, -GY, 0);
  h0 = Float32Array.from(B.st.h); root.add(buildTerrain(m)); root.add(farRange(-260, -150, 150, m.far, 1.3), farRange(-170, -150, 95, col(m.near).lerp(col(m.far), .3), 4.1)); root.add(decorate(m));
  FX = new Particles(LOW ? 900 : 2200, true, TX.glow); SM = new Particles(LOW ? 500 : 1300, false, TX.smoke); root.add(FX.pts, SM.pts);
  debris = new Debris(LOW ? 120 : 280); root.add(debris.m);
  lightInst = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.6, 1), new THREE.MeshBasicMaterial({ color: '#ffffff' }), 380); lightInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage); lightInst.frustumCulled = false; lightInst.count = 0; for (let i = 0; i < 380; i++) lightInst.setColorAt(i, C_.white); root.add(lightInst);
  castles = [0, 1].map(buildCastle); cannons = [0, 1].map(buildCannon); soldiers = castles.flatMap(buildSoldiers); buildGates(); buildJars(); balloon = buildBalloon(); buildWeather(m);
  built = true; canvas.style.display = 'block'; return true;
}
function end() {
  built = false; if (!scene) return; for (const c of [...root.children]) { root.remove(c); c.traverse(o => { if (o.geometry && !Object.values(SG).includes(o.geometry) && o.geometry !== BOXG) o.geometry.dispose(); }); }
  if (rain) { scene.remove(rain); rain = null; } motes = null; for (const o of [...scene.children]) if (o.isPoints) scene.remove(o);
  castles = []; cannons = []; soldiers = []; arrows = []; gates3 = []; rings = []; bolts3 = []; heavies = new Map(); for (const k in pools) delete pools[k]; starMarks = []; markMesh = null; lightInst = null; endCam = null; if (canvas) canvas.style.display = 'none';
}
/* V: { L, viewW, K, OY, VW, VH, shake, side, aim: {mine, foe, rec, foeRec}, endT (s since the end or -1), loser } */
function frame(V, dtr) {
  if (!built || !B) return; lastV = V; const dt = Math.min(.05, dtr), T = (clockT += dt), tA = performance.now();
  root.scale.x = V.side ? -1 : 1; root.position.x = V.side ? W : 0; O.me = V.side;
  syncTerrain(); for (const Cv of castles) syncCastle(Cv, dt, T);
  syncCannon(cannons[V.side], dt, V.aim.mine, V.aim.rec); syncCannon(cannons[1 - V.side], dt, V.aim.foe, V.aim.foeRec);
  syncSoldiers(dt, T); syncArrows(dt); syncProjectiles(dt, T); syncGates(T); syncJars(); syncBalloon(T); syncMarks(dt); syncRings(dt); syncBolts(dt);
  FX.update(dt); SM.update(dt); debris.update(dt);
  flashL = Math.max(0, flashL - dt * 220); lightP.intensity = flashL * 60; hemiFlash = Math.max(0, hemiFlash - dt * 3); hemi.intensity = (O.mood.night ? .95 : O.mood.fx === 'rain' ? .85 : 1.15) + hemiFlash * 2.5;
  // camera: an off-axis perspective that maps the battle line exactly like the 2D overlay
  const sh = V.shake ? V.shake * 1.4 : 0, camX0 = V.L + V.viewW / 2, D = V.viewW * 1.15, n = .5;
  if (V.endT >= .15 && !endCam) { const Cs = B.st.castles[V.loser]; const cxw = Cs.x0 + Cs.cols * CS / 2, vxw = V.side ? W - cxw : cxw; endCam = { x: vxw, y: -GY + 12, t: 0, dir: vxw < 150 ? -1 : 1 }; /* orbit from the open plain side, never from inside the mountain */ }
  if (V.intro > 0 && !endCam) { // battle intro: sweep from the enemy fort, over the mountain, down to your cannon
    const u = clamp((1 - V.intro / 2.6 - .35) / .65, 0, 1), e = u * u * (3 - 2 * u), /* hold on the enemy fort, then sweep */ fx = W - 32, H0 = V.VH / V.K, camYp = (V.OY / V.K) - H0 / 2 + V.viewW * .16;
    const px = fx + (camX0 - fx) * e, py = (-GY + 58) + (camYp - (-GY + 58)) * e, pz = 105 + (D - 105) * e, tx = fx + (camX0 - fx) * e, ty = (-GY + 12) + (camYp - V.viewW * .16 - (-GY + 12)) * e;
    cam.position.set(px + Math.sin(u * 3) * 6 * (1 - e), py, pz); cam.lookAt(V3.set(tx, ty, 0)); cam.fov = 2 * Math.atan(H0 / 2 / D) * 180 / Math.PI; cam.aspect = V.VW / V.VH; cam.updateProjectionMatrix(); }
  else if (endCam) { endCam.t += dt; const asp = V.VW / V.VH, R0 = clamp(38 / (Math.tan(27.5 * Math.PI / 180) * asp), 62, 170), a = .9 - endCam.t * .12, R = R0 - Math.min(R0 * .2, endCam.t * 4), tgt = V3.set(endCam.x, endCam.y + 4, 0); /* portrait screens are narrow: pull back so the whole fort stays in frame */ cam.position.set(endCam.x + Math.sin(a) * R * endCam.dir, Math.max(endCam.y + 26 + endCam.t * 1.5, groundAt(clamp(endCam.x + Math.sin(a) * R * endCam.dir, 0, W), Math.cos(a) * R) + 8), Math.cos(a) * R); cam.lookAt(tgt); cam.fov = 55; cam.aspect = V.VW / V.VH; cam.updateProjectionMatrix(); }
  else { const camY = (V.OY / V.K) - V.VH / V.K / 2 + V.viewW * .16; cam.position.set(camX0 + (Math.random() - .5) * sh, camY + (Math.random() - .5) * sh, D); cam.rotation.set(0, 0, 0);
    const k = n / D, left = (V.L - camX0) * k, right = (V.L + V.VW / V.K - camX0) * k, topW = V.OY / V.K, top = (topW - camY) * k, bottom = (topW - V.VH / V.K - camY) * k;
    cam.projectionMatrix.makePerspective(left, right, top, bottom, n, 3000); cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert(); }
  const pr = ren.getPixelRatio(), pxPerUnit = endCam || V.intro > 0 ? V.VH / (2 * Math.tan(cam.fov * Math.PI / 360)) : V.K * D; FX.mat.uniforms.scale.value = SM.mat.uniforms.scale.value = pxPerUnit * pr;
  syncWeather(dt, T, camX0);
  const w = canvas.clientWidth | 0, h = canvas.clientHeight | 0; if (canvas.width !== Math.floor(w * pr) || canvas.height !== Math.floor(h * pr)) ren.setSize(w, h, false);
  const tB = performance.now(); ren.render(scene, cam); const tC = performance.now(); perfA.u = perfA.u * .95 + (tB - tA) * .05; perfA.r = perfA.r * .95 + (tC - tB) * .05;
}
const perfA = { u: 0, r: 0 };
function defenders(s) { const Cs = B && B.st.castles[s]; if (!Cs) return 0; let n = 0; for (const [c, r] of POSTS) if (Cs.t[r * Cs.cols + c]) n++; return n; }
function stats() { return ren ? { calls: ren.info.render.calls, tris: ren.info.render.triangles, geos: ren.info.memory.geometries, tex: ren.info.memory.textures, fx: FX ? FX.n - FX.free.length : 0, updateMs: +perfA.u.toFixed(2), renderCallMs: +perfA.r.toFixed(2), smoke: SM ? SM.n - SM.free.length : 0 } : null; }
window.SH3D = { _dbg: () => ({ lightInst, FX, SM, debris, scene, cam, ren }), init, begin, end, frame, ev: onEvent, collapse: collapseCastle, defenders, stats, get ready() { return built; } };
