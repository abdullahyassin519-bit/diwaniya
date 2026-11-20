/* SOULSTACK core — shared by browser and server (UMD).
   World: a vertical shaft 14 tiles wide (columns 0 and 13 are walls). y grows upward, 1 row = 1 metre.
   Platforms are one-way (land from above, jump through from below). Spikes kill. Saws sweep sideways on a global clock.
   A soul block (someone's body) is a one-way 1x1 platform that also covers a spike in its cell. */
(function (root, f) { if (typeof module === 'object' && module.exports) module.exports = f(); else root.SSC = f(); })(this, function () {
  'use strict';
  const W = 14, G = 32, VMAX = 16.8, PW = .66, PH = .86, SOULS = 25, CP_EVERY = 30;
  const APEX = VMAX * VMAX / (2 * G);              // ~4.41 rows of rise at full power
  const REACH = Math.floor(APEX - .05);            // highest platform you can land on alone (rows above your feet)

  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function hashStr(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const dayKey = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);
  const daySeed = day => hashStr('soulstack:' + day);

  /* ---------- world generation: a chain of reachable platforms, plus decoys, hazards and checkpoints ---------- */
  /* o: per-level tuning. Defaults reproduce the daily tower exactly (same random draws), so it never changes mid-day */
  function World(seed, o) {
    o = Object.assign({ d0: 0, chasm: 1, spike: 1, saw: 1, pad: 1, cpEvery: CP_EVERY, sawFrom: 20, chasmFrom: 14 }, o || {});
    const R = rng(seed), rows = new Map(), spikes = new Set(), nodes = [], saws = [], cps = [];
    const rowAdd = (y, seg) => { let a = rows.get(y); if (!a) rows.set(y, a = []); a.push(seg); };
    let top = 0, nextCp = o.cpEvery;
    // ground
    const g = { y: 0, x0: 1, x1: 12, cp: 0, chain: true }; rowAdd(0, g); nodes.push(g); cps.push({ y: 0, x: 6.5, i: 0 });
    let prev = g;
    function grow() {
      const y0 = prev.y, d = Math.min(1, y0 / 420 + o.d0);
      const chasm = y0 > o.chasmFrom && !prev.pad && R() < (.06 + .22 * d) * o.chasm; /* never a chasm right after a spike pad: a chasm always costs exactly one sacrifice */
      let dy = chasm ? 6 + Math.floor(R() * 3) : 2 + Math.floor(R() * (REACH - 1)); // 2..4 or 6..8
      let y = y0 + dy; const isCp = y >= nextCp;
      if (isCp) { y = Math.max(y0 + 2, Math.min(y, y0 + REACH)); nextCp += o.cpEvery; }
      const w = isCp ? 6 : Math.max(2, 5 - Math.floor(R() * (2 + 2 * d)));
      const pc = (prev.x0 + prev.x1 + 1) / 2, rise = y - y0, span = rise > REACH ? 3 : rise >= REACH ? 1 : rise === 3 ? 3.5 : 5; /* a full-height jump has almost no sideways drift */
      let cx = pc + (R() * 2 - 1) * span; cx = Math.max(1 + w / 2, Math.min(13 - w / 2, cx));
      const x0 = Math.round(cx - w / 2), x1 = x0 + w - 1;
      const n = { y, x0, x1, cp: isCp ? cps.length : 0, chain: true, chasm: y - y0 > REACH };
      rowAdd(y, n); nodes.push(n);
      if (isCp) cps.push({ y, x: (x0 + x1 + 1) / 2, i: cps.length });
      else {
        // spikes on chain platforms: always leave at least one safe tile, except rare "must-cover" pads
        if (R() < (.14 + .36 * d) * o.spike && w >= 3) { const k = 1 + Math.floor(R() * Math.min(2, w - 2)); for (let i = 0; i < k; i++) spikes.add((x0 + Math.floor(R() * w)) + ',' + (y + 1)); }
        else if (w <= 3 && R() < .06 * d * o.pad) { for (let x = x0; x <= x1; x++) spikes.add(x + ',' + (y + 1)); n.pad = 1; }
        if (y > o.sawFrom && R() < (.10 + .30 * d) * o.saw) { const per = 2.6 + R() * 2.4; saws.push({ y: y + 1.6, x0: 1.6, x1: 12.4, per: per - d * .8, ph: R() }); }
      }
      // decoy ledge with a heavier spike chance — rewards reading the tower
      if (!isCp && R() < .55) {
        const dw = 1 + Math.floor(R() * 3), dyy = y - 1 - Math.floor(R() * 2), dx0 = 1 + Math.floor(R() * (12 - dw));
        if (dyy > prev.y + 1 && (dx0 > x1 + 1 || dx0 + dw - 1 < x0 - 1)) { const dn = { y: dyy, x0: dx0, x1: dx0 + dw - 1, cp: 0, chain: false }; rowAdd(dyy, dn); if (R() < (.35 + .3 * d) * Math.min(1, o.spike)) spikes.add((dx0 + Math.floor(R() * dw)) + ',' + (dyy + 1)); }
      }
      prev = n; top = y;
    }
    function ensure(y) { while (top < y + 40) grow(); }
    ensure(60);
    const W_ = {
      seed, nodes, saws, cps, ensure,
      top: () => top,
      solidRow(y, x) { ensure(y); const a = rows.get(y); if (!a) return null; for (const s of a) if (x >= s.x0 && x <= s.x1) return s; return null; },
      segs(y) { return rows.get(y) || []; },
      spike: (x, y) => spikes.has(x + ',' + y),
      spikes,
      sawPos(s, t) { const k = .5 - .5 * Math.cos(2 * Math.PI * (t / s.per + s.ph)); return s.x0 + (s.x1 - s.x0) * k; },
      cpAt(y) { let c = cps[0]; for (const p of cps) if (p.y <= y + .01) c = p; return c; },
    };
    return W_;
  }

  /* ---------- physics ---------- */
  /* blocks: Map 'x,y' -> block; a block is a one-way 1x1 platform at cell (x,y) whose top is y+1 and which neutralises a spike in that cell */
  const bkey = (x, y) => x + ',' + y;
  function standable(w, blocks, x, row) { // is there something to stand on whose top surface is row+1, under horizontal position x?
    const c = Math.floor(x); if (c < 1 || c > 12) return null;
    if (blocks && blocks.has(bkey(c, row))) return blocks.get(bkey(c, row));
    return w.solidRow(row, c) ? 'p' : null;
  }
  function launch(P, dx, dy) { // dx,dy: desired launch direction & power in [0..1] units of VMAX
    let m = Math.hypot(dx, dy); if (m < .06) return false; const k = Math.min(1, m) * VMAX * (P.pow || 1) / m;
    P.vx = dx * k; P.vy = dy * k; P.gr = 0; P.air = 0; return true;
  }
  /* advance the player by dt. Returns 'spike'|'saw'|null (cause of death). t = world clock in seconds (saws) */
  function step(w, blocks, P, dt, t) {
    const n = Math.max(1, Math.ceil(dt / (1 / 240))), h = dt / n;
    for (let i = 0; i < n; i++) {
      if (P.gr) { // standing: check support still exists
        const row = Math.round(P.y) - 1;
        if (!standable(w, blocks, P.x - PW / 2 + .02, row) && !standable(w, blocks, P.x + PW / 2 - .02, row)) P.gr = 0;
        else { P.vx = 0; P.vy = 0; }
      }
      if (!P.gr) {
        P.vy = Math.max(-26, P.vy - G * h); P.air += h;
        const ny = P.y + P.vy * h; let nx = P.x + P.vx * h;
        if (nx - PW / 2 < 1) { nx = 1 + PW / 2; P.vx = Math.abs(P.vx) * .45; P.bonk = 1; }
        if (nx + PW / 2 > 13) { nx = 13 - PW / 2; P.vx = -Math.abs(P.vx) * .45; P.bonk = 1; }
        if (P.vy < 0) { // landing on a one-way top surface crossed this substep
          const r0 = Math.floor(P.y - 1e-6), r1 = Math.floor(ny);
          for (let top = r0; top > r1; top--) { // surfaces at integer heights 'top'
            const row = top - 1; const a = standable(w, blocks, nx - PW / 2 + .02, row) || standable(w, blocks, nx + PW / 2 - .02, row);
            if (a) { P.x = nx; P.y = top; P.vy = 0; P.vx = 0; P.gr = 1; P.land = P.air; P.on = a; break; }
          }
          if (P.gr) continue;
        }
        P.x = nx; P.y = ny;
      } else P.on = standable(w, blocks, P.x - PW / 2 + .02, Math.round(P.y) - 1) || standable(w, blocks, P.x + PW / 2 - .02, Math.round(P.y) - 1);
      if (P.y < -2) { P.y = 1; P.x = 6.5; P.vx = P.vy = 0; P.gr = 1; }
      // hazards: spikes only hurt when you come down on them (you can jump up through a ledge past its spikes)
      const cx0 = Math.floor(P.x - PW / 2 + .08), cx1 = Math.floor(P.x + PW / 2 - .08), cy0 = Math.floor(P.y + .02), cy1 = Math.floor(P.y + PH * .5);
      if (P.vy <= 0) for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) if (w.spike(cx, cy) && !(blocks && blocks.has(bkey(cx, cy)))) { const sy = cy + .55; if (P.y < sy) return { cause: 'spike', x: cx, y: cy }; }
      for (const s of w.saws) { if (Math.abs(s.y - (P.y + PH / 2)) > 1.3) continue; const sx = w.sawPos(s, t + i * h); const qx = Math.max(P.x - PW / 2, Math.min(sx, P.x + PW / 2)), qy = Math.max(P.y, Math.min(s.y, P.y + PH)); if ((qx - sx) ** 2 + (qy - s.y) ** 2 < .42 * .42) return { cause: 'saw', x: Math.floor(P.x), y: Math.floor(P.y) - 1 }; }
    }
    return null;
  }
  /* where a body becomes a block: on a spike it covers that spike's cell; otherwise it forms the step right under your feet. Moved up if occupied */
  const sacCell = P => ({ cause: 'sac', x: Math.floor(P.x), y: Math.floor(P.y) - 1 });
  function bodyCell(w, blocks, d) {
    let x = Math.max(1, Math.min(12, d.x)), y = Math.max(1, d.y);
    for (let k = 0; k < 6; k++, y++) if (!(blocks && blocks.has(bkey(x, y))) && !w.solidRow(y, x)) return { x, y };
    return { x, y };
  }
  /* predicted arc for the aim preview */
  function arc(P, dx, dy, n = 28, dt = .045) { let m = Math.hypot(dx, dy); if (m < .06) return []; const k = Math.min(1, m) * VMAX * (P.pow || 1) / m; let vx = dx * k, vy = dy * k, x = P.x, y = P.y; const out = []; for (let i = 0; i < n; i++) { vy -= G * dt; x += vx * dt; y += vy * dt; if (x < 1 + PW / 2) { x = 1 + PW / 2; vx = -vx * .45; } if (x > 13 - PW / 2) { x = 13 - PW / 2; vx = -vx * .45; } out.push([x, y]); } return out; }

  return { sacCell, W, G, VMAX, APEX, REACH, PW, PH, SOULS, CP_EVERY, rng, hashStr, dayKey, daySeed, World, step, launch, standable, bodyCell, bkey, arc };
});
