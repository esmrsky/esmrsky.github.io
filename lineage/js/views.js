/* Lineage: the five views. Each one draws the same 40 traditions from /data in a different way.
   A view is built once as a string; selection only switches classes on it afterward. */
(function () {
  "use strict";
  const CH = window.CH, LN = window.LN;
  const { NOW, T, esc, col, tiny, tf, MARKS, kids, alive, living, PY, peopleOf, READ, share, fmtSize, bins, BIN } = LN;
  const V = (LN.views = {});
  const f = n => Math.round(n * 10) / 10;
  const byStart = CH.traditions.slice().sort((a, b) => a.start - b.start);
  const span = t => t.start + (t.end ? " to " + t.end : " to today");
  const tipT = t => `${t.short} · ${span(t)}${LN.size[t.id] ? " · " + fmtSize(t.id) : ""}`;
  const btn = (open, label) => `data-open="${open}" tabindex="0" role="button" aria-label="${esc(label)}"`;
  const logw = v => (Math.log10(v) + 1.4) / 4.55; // 40 thousand maps to 0, 1.4 billion to 1
  const diamond = (x, y, s) => `M${f(x)},${f(y - s)}L${f(x + s)},${f(y)}L${f(x)},${f(y + s)}L${f(x - s)},${f(y)}Z`;

  /* ═════ FLOW: streams left to right ═════ */
  V.flow = function () {
    const W = 1060, top = 78, rowH = 20, L = 26, R = W - 204, minLane = -7, nL = 34;
    const base = top + nL * rowH, H = base + 80;
    const X = y => L + tf(y) * (R - L), Y = lane => top + (lane - minLane + 0.5) * rowH;
    const wOf = t => (t.end ? 2 : LN.size[t.id] ? 3 + 15 * logw(LN.size[t.id]) : 4);
    let defs = "", grid = "", links = "", ribs = "", caps = "", labels = "", hits = "", axis = "";

    LN.eraStops.forEach((s, i) => {
      const x = X(s.e.from);
      grid += `<line class="era" x1="${f(x)}" y1="${top - 20}" x2="${f(x)}" y2="${base + 8}"/><text class="eral" x="${f(x + 6)}" y="${i % 2 ? 26 : 14}">${esc(LN.eraShort[s.e.id].toUpperCase())}</text>`;
      axis += `<text class="yr" x="${f(x)}" y="${base + 24}" text-anchor="middle">${s.e.from}</text>`;
    });
    axis += `<text class="yr" x="${R}" y="${base + 24}" text-anchor="middle">${NOW}</text><line class="base" x1="${L}" y1="${base + 8}" x2="${R}" y2="${base + 8}"/>`;
    MARKS.forEach(m => {
      const x = m === NOW ? R : X(m), n = alive(m);
      grid += `<g class="pill" data-tip="${n} bodies on the map in ${m}"><rect x="${f(x - 17)}" y="34" width="34" height="20" rx="10"/><text x="${f(x)}" y="48" text-anchor="middle">${n}</text></g>`;
    });
    if (MARKS.indexOf(NOW) >= 0) grid += `<line class="era" x1="${R}" y1="${top - 20}" x2="${R}" y2="${base + 8}"/>`;

    byStart.forEach(t => {
      const y = Y(t.lane), c = col(t), x0 = X(t.start), w = wOf(t);
      let x1 = t.end ? X(t.end) : R, xa = x0, xb = x0, d, pc = c, dy = 0;
      if (t.parent) {
        const p = T[t.parent], py = Y(p.lane); dy = Math.abs(y - py);
        const bx = Math.max(20, Math.min(60, 16 + dy * 0.16));
        xa = Math.max(X(p.start), x0 - bx); xb = x0 + bx * 0.45; x1 = Math.max(x1, xb + 8);
        const k = (xb - xa) * 0.55; pc = col(p);
        d = `M${f(xa)},${f(py)}C${f(xa + k)},${f(py)} ${f(xb - k)},${f(y)} ${f(xb)},${f(y)}L${f(x1)},${f(y)}`;
      } else { d = `M${f(x0)},${f(y)}L${f(x1)},${f(y)}`; if (t.id !== "early") caps += `<circle class="cap" data-t="${t.id}" cx="${f(x0)}" cy="${f(y)}" r="${f(Math.max(4, w / 2 + 2))}" fill="${c}"/>`; }
      const fade = t.end && t.id !== "early";
      const o1 = Math.max(0.02, Math.min(0.9, (xb - xa) / Math.max(1, x1 - xa)));
      defs += `<linearGradient id="fg-${t.id}" gradientUnits="userSpaceOnUse" x1="${f(xa)}" y1="0" x2="${f(x1)}" y2="0"><stop offset="0" stop-color="${pc}"/><stop offset="${f(o1)}" stop-color="${c}"/>${fade ? `<stop offset="${f(Math.max(o1, 0.62))}" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/>` : `<stop offset="1" stop-color="${c}"/>`}</linearGradient>`;
      const len = Math.ceil(x1 - xa + dy + 12);
      ribs += `<g class="rb" data-t="${t.id}" style="--L:${len};--d:${Math.round(tf(t.start) * 1100)}ms"><path class="gl" d="${d}" stroke="url(#fg-${t.id})" stroke-width="${f(w + 9)}"/><path class="ln" d="${d}" stroke="url(#fg-${t.id})" stroke-width="${f(w)}"/></g>`;
      hits += `<path class="hit" d="${d}" ${btn("t/" + t.id, t.name)} data-tip="${esc(tipT(t))}"/>`;
      if (!t.end) {
        const h = Math.max(w, 7);
        caps += `<rect class="cap" data-t="${t.id}" x="${R + 3}" y="${f(y - h / 2)}" width="7" height="${f(h)}" rx="2.5" fill="${c}"/>`;
        labels += `<g class="lb" data-t="${t.id}" data-open="t/${t.id}" data-tip="${esc(tipT(t))}"><text x="${R + 19}" y="${f(y + 4)}" fill="${c}">${esc(tiny(t))}</text><text class="num" x="${W - 4}" y="${f(y + 4)}" text-anchor="end">${LN.soft[t.id] ? "" : esc(fmtSize(t.id))}</text></g>`;
      } else {
        labels += `<text class="xl" data-t="${t.id}" x="${f((t.parent ? xb : x0) + 5)}" y="${f(y - 6)}">${esc(t.short)}</text>`;
      }
      (t.links || []).forEach(l => {
        const xl = X(l.year), yb = Y(T[l.to].lane), bend = 26;
        links += `<path class="lk" data-t="${t.id}" data-to="${l.to}" d="M${f(xl)},${f(y)}C${f(xl - bend)},${f(y)} ${f(xl - bend)},${f(yb)} ${f(xl)},${f(yb)}" stroke="${c}"><title>${esc(l.note)}</title></path>`;
      });
    });

    // Councils and confessions sit under the time axis, stepped down where they crowd.
    let dots = ""; const last = [-99, -99, -99];
    CH.councils.slice().sort((a, b) => a.year - b.year).forEach(c => {
      const x = X(c.year); let row = last.findIndex(v => x - v > 13); if (row < 0) row = 0; last[row] = x;
      dots += `<path class="cd" data-c="${c.id}" ${btn("c/" + c.id, c.name)} data-tip="${esc(c.name + " · " + c.when)}" d="${diamond(x, base + 42 + row * 12, 5)}" fill="${LN.councilColor[c.g]}"/>`;
    });
    axis += `<text class="trk" x="${L}" y="${H - 4}">COUNCILS AND CONFESSIONS</text>`;

    return `<div class="scroll"><svg class="vz flow" viewBox="0 0 ${W} ${H}" style="--mw:980px" role="img" aria-label="Flow view: every tradition as a stream from the year 30 to today"><defs>${defs}</defs><g class="grid">${grid}</g>${axis}<g class="links">${links}</g><g class="ribs">${ribs}</g>${caps}<g class="labels">${labels}</g><g class="hits">${hits}</g>${dots}</svg></div>`;
  };

  /* ═════ RADIAL: the tree grown outward, people as dots ═════ */
  V.radial = function () {
    const W = 1040, H = 950, cx = 520, cy = 475, R0 = 22, R1 = 322;
    const rr = y => R0 + tf(y) * (R1 - R0);
    const pol = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    // The early church is the core disc, not a spoke: every body that left it starts at its own angle.
    // Below that, each tradition gets a spoke placed in the middle of its own branches.
    const order = [], byLane = (a, b) => T[a].lane - T[b].lane || T[a].start - T[b].start;
    const sz = id => 1 + (kids[id] || []).reduce((n, k) => n + sz(k), 0);
    const walk = id => {
      const ks = (kids[id] || []).slice().sort(byLane), tot = ks.reduce((n, k) => n + sz(k), 0);
      let best = 0, gap = Infinity, run = 0;
      for (let k = 0; k <= ks.length; k++) { const g = Math.abs(2 * run - tot); if (g < gap) { gap = g; best = k; } if (k < ks.length) run += sz(ks[k]); }
      ks.slice(0, best).forEach(walk); order.push(id); ks.slice(best).forEach(walk);
    };
    (kids.early || []).slice().sort(byLane).forEach(walk);
    CH.traditions.filter(t => !t.parent && t.id !== "early").forEach(t => walk(t.id));
    const N = order.length, step = 360 / (N + 3), A = {};
    order.forEach((id, i) => (A[id] = (-90 + (i - (N - 1) / 2) * step) * Math.PI / 180));

    let rings = "", lines = "", ppl = "", labels = "", hits = "", ends = "";
    const early = T.early, rE = rr(early.end), cE = col(early);
    rings += `<g class="rb disc" data-t="early"><circle class="discf" cx="${cx}" cy="${cy}" r="${f(rE)}" fill="${cE}"/><circle class="discl" cx="${cx}" cy="${cy}" r="${f(rE)}" stroke="${cE}"/></g>`;
    MARKS.forEach(m => {
      const r = rr(m);
      rings += `<circle class="ring" cx="${cx}" cy="${cy}" r="${f(r)}"/><text class="ringl" x="${cx}" y="${f(cy + r + 3.5)}" text-anchor="middle">${m}</text>`;
    });
    rings += `<circle class="core" cx="${cx}" cy="${cy}" r="${R0}"/><text class="corel" x="${cx}" y="${cy + 4}" text-anchor="middle">30</text>`;
    hits += `<circle class="hit" cx="${cx}" cy="${cy}" r="${f(rE)}" ${btn("t/early", early.name)} data-tip="${esc(tipT(early))}"/>`;
    labels += `<text class="rl core-l" data-t="early" data-open="t/early" x="${cx}" y="${f(cy - R0 - 9)}" text-anchor="middle" fill="${cE}">${esc(tiny(early))}</text>`;
    peopleOf("early").forEach((p, i) => {
      const a = (-58 + i * 137.5) * Math.PI / 180, rp = Math.max(R0 + 9, Math.min(rE - 7, rr(PY[p.id]))), e = pol(a, rp), s = pol(a, Math.max(R0, rp - 11));
      ppl += `<g class="pp" data-p="${p.id}" data-t="early" data-open="p/${p.id}" data-tip="${esc(p.n + " · " + p.d)}"><path class="fil" d="M${f(s[0])},${f(s[1])}L${f(e[0])},${f(e[1])}" stroke="${cE}"/><circle class="pd" cx="${f(e[0])}" cy="${f(e[1])}" r="3.1" fill="${cE}"/><circle class="ph" cx="${f(e[0])}" cy="${f(e[1])}" r="8"/></g>`;
    });

    byStart.filter(t => t.id !== "early").forEach(t => {
      const a = A[t.id], c = col(t), rs = rr(t.start), re = Math.max(rs + 6, rr(t.end || NOW));
      const pts = []; let len = 0, stem = "";
      if (t.parent && t.parent !== "early") {
        const p = T[t.parent], ap = A[t.parent], sweep = Math.abs(a - ap) * 180 / Math.PI;
        const rf = Math.max(rr(p.start) + 2, rs - Math.min(84, 8 + sweep * 0.5));
        for (let i = 0; i <= 28; i++) { const u = i / 28, e = u * u * (3 - 2 * u); pts.push(pol(ap + (a - ap) * e, rf + (rs - rf) * u)); }
      } else {
        pts.push(pol(a, rs));
        if (t.parent) { const s0 = pol(a, R0), s1 = pol(a, rs); stem = `<path class="stem" d="M${f(s0[0])},${f(s0[1])}L${f(s1[0])},${f(s1[1])}"/>`; }
      }
      const nb = pts.length; pts.push(pol(a, re));
      for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const d = pts.map((q, i) => (i ? "L" : "M") + f(q[0]) + "," + f(q[1])).join("");
      const own = "M" + pts.slice(nb - 1).map(q => f(q[0]) + "," + f(q[1])).join("L");
      const w = t.end ? 1.2 : LN.size[t.id] ? 1.4 + 2.8 * logw(LN.size[t.id]) : 1.8;
      lines += `<g class="rb" data-t="${t.id}" style="--L:${Math.ceil(len + 6)};--d:${Math.round(tf(t.start) * 1100)}ms">${stem}<path class="br" d="${d}" stroke="${c}" stroke-width="${f(w)}"/><path class="gl" d="${own}" stroke="${c}" stroke-width="${f(w + 6)}"/></g>`;
      hits += `<path class="hit" d="${d}" ${btn("t/" + t.id, t.name)} data-tip="${esc(tipT(t))}"/>`;

      const perp = [-Math.sin(a), Math.cos(a)];
      peopleOf(t.id).forEach((p, i) => {
        const rp = Math.max(rs + 5, Math.min(re - 4, rr(PY[p.id]))), side = i % 2 ? 1 : -1, q = side * (9 + 6 * ((i >> 1) % 2));
        const s = pol(a, rp), m = pol(a, rp + 7), e = [m[0] + perp[0] * q, m[1] + perp[1] * q];
        ppl += `<g class="pp" data-p="${p.id}" data-t="${t.id}" data-open="p/${p.id}" data-tip="${esc(p.n + " · " + p.d)}"><path class="fil" d="M${f(s[0])},${f(s[1])}Q${f(m[0])},${f(m[1])} ${f(e[0])},${f(e[1])}" stroke="${c}"/><circle class="pd" cx="${f(e[0])}" cy="${f(e[1])}" r="3.1" fill="${c}"/><circle class="ph" cx="${f(e[0])}" cy="${f(e[1])}" r="8"/></g>`;
      });

      const lr = t.end ? re + 9 : R1 + 16, lp = pol(a, lr), deg = a * 180 / Math.PI, flip = Math.cos(a) < 0;
      labels += `<text class="rl${t.end ? " gone" : ""}" data-t="${t.id}" ${btn("t/" + t.id, t.name)} data-tip="${esc(tipT(t))}" transform="translate(${f(lp[0])},${f(lp[1])}) rotate(${f(flip ? deg + 180 : deg)})" text-anchor="${flip ? "end" : "start"}" dy="4" fill="${c}">${esc(tiny(t))}</text>`;
      if (!t.end) { const e = pol(a, R1); ends += `<circle class="end" data-t="${t.id}" cx="${f(e[0])}" cy="${f(e[1])}" r="${f(LN.size[t.id] ? 2.6 + 4.4 * logw(LN.size[t.id]) : 3)}" fill="${c}"/>`; }
    });

    return `<div class="scroll center"><svg class="vz radial" viewBox="0 0 ${W} ${H}" style="--mw:820px" role="img" aria-label="Radial view: the family tree grown outward from the year 30, with people as dots">${rings}<g class="ribs">${lines}</g>${ends}<g class="hits">${hits}</g><g class="people">${ppl}</g><g class="labels">${labels}</g></svg></div>`;
  };

  /* ═════ MATRIX: texts by traditions ═════ */
  V.matrix = function () {
    const cols = LN.matrixCols, P = 22, x0 = 276, head = 134, r = 9.4, k = 0.866 * r;
    const hex = (x, y) => `M${f(x)},${f(y - r)}L${f(x + k)},${f(y - r / 2)}L${f(x + k)},${f(y + r / 2)}L${f(x)},${f(y + r)}L${f(x - k)},${f(y + r / 2)}L${f(x - k)},${f(y - r / 2)}Z`;
    const W = x0 + cols.length * P + 84;
    let y = head, body = "", heads = "";
    cols.forEach((t, j) => {
      const x = x0 + j * P + P / 2;
      heads += `<text class="mcl" data-t="${t.id}" ${btn("t/" + t.id, t.name)} data-tip="${esc(tipT(t))}" transform="translate(${f(x + 3)},${head - 12}) rotate(-52)" fill="${col(t)}">${esc(tiny(t))}</text>`;
    });
    CH.debateCats.forEach(cat => {
      y += 22;
      body += `<text class="mcat" x="0" y="${y - 9}">${esc(cat.name.toUpperCase())}</text><line class="mrule" x1="0" y1="${y - 4}" x2="${W - 84}" y2="${y - 4}"/>`;
      y += 10;
      CH.debates.filter(d => d.cat === cat.id).forEach(d => {
        let cells = "";
        cols.forEach((t, j) => {
          const x = x0 + j * P + P / 2, mine = READ[d.id][t.id];
          if (!mine) { cells += `<path class="hx none" data-t="${t.id}" d="${hex(x, y)}"/>`; return; }
          cells += `<path class="hx" data-d="${d.id}" data-t="${t.id}" data-open="text/${d.id}" data-focus="${t.id}" data-tip="${esc(tiny(t) + " · " + d.title + " · " + mine.map(i => d.positions[i].name).join(" / "))}" d="${hex(x, y)}"/>`;
          if (mine.length > 1) cells += `<circle class="hx2" data-d="${d.id}" data-t="${t.id}" cx="${f(x)}" cy="${f(y)}" r="3.2" fill="${LN.readPal[mine[1] % 6]}"/>`;
        });
        body += `<g class="mr" data-d="${d.id}"><text class="mrl" x="${x0 - 14}" y="${y + 4}" text-anchor="end" ${btn("text/" + d.id, d.title)}>${esc(d.title)}</text>${cells}</g>`;
        y += P;
      });
    });
    return `<div class="scroll"><svg class="vz matrix" viewBox="0 0 ${W} ${y + 8}" style="--mw:${Math.round(W * 0.86)}px" role="img" aria-label="Matrix view: 29 disputed texts by tradition, colored by the reading each one takes">${heads}${body}</svg></div>`;
  };
  // Color the cells: by reading when nothing is picked, or by agreement with the picked tradition.
  V.paintMatrix = function (root, focus) {
    const on = focus && LN.matrixCols.some(t => t.id === focus);
    root.querySelectorAll(".hx[data-d]").forEach(el => {
      const d = el.dataset.d, t = el.dataset.t, mine = READ[d][t]; let fill;
      if (!on) fill = LN.readPal[mine[0] % 6];
      else if (t === focus) fill = "#F2F5FA";
      else { const fr = READ[d][focus]; fill = !fr ? "#3A4558" : share(fr, mine) ? "#4D7CFE" : "#FF4D4D"; }
      el.setAttribute("fill", fill);
    });
    root.querySelectorAll(".hx2").forEach(el => (el.style.display = on ? "none" : ""));
    return on;
  };

  /* ═════ SCALE: size today ═════ */
  V.scale = function () {
    const W = 720, H = 600, cx = 372, cy = 300, k = 150 / Math.sqrt(1400);
    const items = living.filter(t => LN.size[t.id]).map(t => ({ t, v: LN.size[t.id], r: Math.max(3.4, k * Math.sqrt(LN.size[t.id])) })).sort((a, b) => b.v - a.v);
    const placed = [];
    items.forEach((it, n) => {
      let done = false;
      for (let rad = 0; rad < 700 && !done; rad += 3) {
        for (let i = 0; i < 72 && !done; i++) {
          const ang = (i * 5 + n * 37) * Math.PI / 180, x = cx + Math.cos(ang) * rad * 1.1, y = cy + Math.sin(ang) * rad * 0.95;
          if (x - it.r < 6 || x + it.r > W - 6 || y - it.r < 6 || y + it.r > H - 6) continue;
          if (placed.every(o => Math.hypot(o.x - x, o.y - y) >= o.r + it.r + 5)) { it.x = x; it.y = y; placed.push(it); done = true; }
          if (!rad) break;
        }
      }
    });
    const mix = (hexc, to, p) => { const a = parseInt(hexc.slice(1), 16), b = parseInt(to.slice(1), 16); const ch = s => Math.round(((a >> s) & 255) * (1 - p) + ((b >> s) & 255) * p); return "#" + ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1); };
    let defs = "", circles = "";
    Object.keys(LN.color).forEach(fam => { const c = LN.color[fam]; defs += `<radialGradient id="bg-${fam}" cx="0.34" cy="0.28" r="0.95"><stop offset="0" stop-color="${mix(c, "#ffffff", 0.3)}"/><stop offset="0.5" stop-color="${c}"/><stop offset="1" stop-color="${mix(c, "#05070b", 0.72)}"/></radialGradient>`; });
    placed.forEach(it => {
      const t = it.t, c = col(t), soft = LN.soft[t.id], name = tiny(t), num = soft ? soft.toLowerCase() : fmtSize(t.id);
      let text = "";
      const fs = it.r > 90 ? 17 : it.r > 50 ? 13.5 : 11.5, room = it.r * 2 - 12, wide = s => s.length * fs * 0.56, words = name.split(" ");
      const two = [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")];
      const l1 = wide(name) < room ? [name] : words.length > 1 && wide(two[0]) < room && wide(two[1]) < room ? two : null;
      if (it.r >= 27 && l1) {
        const y0 = it.y - (l1.length - 1) * fs * 0.6 - 3;
        text = l1.map((s, i) => `<text class="bn" x="${f(it.x)}" y="${f(y0 + i * fs * 1.15)}" font-size="${fs}" text-anchor="middle">${esc(s)}</text>`).join("") +
          `<text class="bv" x="${f(it.x)}" y="${f(y0 + l1.length * fs * 1.15 + 3)}" font-size="${f(Math.max(10, fs * 0.82))}" text-anchor="middle">${esc(num)}</text>`;
      } else if (it.r >= 16 && !soft) text = `<text class="bv" x="${f(it.x)}" y="${f(it.y + 3.5)}" font-size="9.5" text-anchor="middle">${esc(num)}</text>`;
      circles += `<g class="bb${soft ? " soft" : ""}" data-t="${t.id}" ${btn("t/" + t.id, t.name)} data-tip="${esc(t.short + " · " + t.size)}"><circle cx="${f(it.x)}" cy="${f(it.y)}" r="${f(it.r)}" fill="url(#bg-${t.family})" stroke="${c}"/>${text}</g>`;
    });
    const rank = items.map(it => `<a class="rk" href="#/scale/t/${it.t.id}" data-t="${it.t.id}"><span class="rk-n">${esc(tiny(it.t))}</span><span class="rk-b"><i style="width:${f(Math.max(2, logw(it.v) * 100))}%;background:${col(it.t)}"></i></span><span class="rk-v">${esc(LN.soft[it.t.id] ? "no figure" : fmtSize(it.t.id))}</span></a>`).join("");
    const chip = t => `<a class="chip" href="#/scale/t/${t.id}" data-t="${t.id}" style="--c:${col(t)}"><i></i>${esc(tiny(t))}</a>`;
    const inside = living.filter(t => !LN.size[t.id]), gone = CH.traditions.filter(t => t.end);
    return `<div class="scale-wrap"><div class="scroll"><svg class="vz scale" viewBox="0 0 ${W} ${H}" style="--mw:560px" role="img" aria-label="Scale view: living traditions as circles sized by their estimated membership today"><defs>${defs}</defs>${circles}</svg></div>
      <div class="rank"><h3 class="mono">Ranked, log scale</h3>${rank}
        <h3 class="mono">Counted inside another figure</h3><div class="chips">${inside.map(chip).join("")}</div>
        <h3 class="mono">No longer a living body</h3><div class="chips">${gone.map(chip).join("")}</div></div></div>`;
  };

  /* ═════ PULSE: the record in 50-year steps ═════ */
  V.pulse = function () {
    const W = 1040, L = 40, R = W - 14, END = 2050, X = y => L + (y / END) * (R - L), bw = X(BIN) - X(0);
    const yE = 262, yP = 418, yC = 462, yA0 = 500, yA1 = 650, H = 700;
    let bg = "", ev = "", pp = "", cc = "", hit = "", axis = "";
    CH.eras.forEach((e, i) => {
      const xa = X(e.from), xb = X(e.to);
      bg += `<rect class="band${i % 2 ? " alt" : ""}" x="${f(xa)}" y="30" width="${f(xb - xa)}" height="${yA1 - 30}"/>` + (xb - xa > 60 ? `<text class="eral" x="${f(xa + 6)}" y="${i % 2 ? 24 : 12}">${esc(LN.eraShort[e.id].toUpperCase())}</text>` : "");
    });
    Object.keys(bins).map(Number).sort((a, b) => a - b).forEach(b => {
      const B = bins[b], x = X(b) + 2, w = bw - 4;
      B.events.forEach((e, i) => { ev += `<rect class="eb${e.k ? " key" : ""}" x="${f(x)}" y="${yE - (i + 1) * 15}" width="${f(w)}" height="12" rx="2.5" fill="${col(e.tags[0])}"/>`; });
      B.people.slice().sort((p, q) => PY[p.id] - PY[q.id]).forEach((p, i) => {
        const px = x + w / 2 + (i % 2 ? 5.5 : -5.5), py = yP - 7 - Math.floor(i / 2) * 12;
        pp += `<circle class="pd" data-p="${p.id}" data-open="p/${p.id}" data-tip="${esc(p.n + " · " + p.d)}" cx="${f(px)}" cy="${py}" r="4.3" fill="${p.t && T[p.t] ? col(p.t) : "#9AA3B2"}"/>`;
      });
      const n = B.events.length + B.people.length + B.councils.length;
      if (n) hit += `<rect class="bin" data-bin="${b}" ${btn("y/" + b, b + " to " + (b + BIN - 1))} data-tip="${b} to ${b + BIN - 1} · ${B.events.length} events · ${B.people.length} people · ${B.councils.length} councils" x="${f(X(b))}" y="30" width="${f(bw)}" height="${yC + 14 - 30}"/>`;
    });
    const last = [-99, -99];
    CH.councils.slice().sort((a, b) => a.year - b.year).forEach(c => {
      const x = X(c.year); let row = last.findIndex(v => x - v > 12); if (row < 0) row = 0; last[row] = x;
      cc += `<path class="cd" data-c="${c.id}" ${btn("c/" + c.id, c.name)} data-tip="${esc(c.name + " · " + c.when)}" d="${diamond(x, yC + row * 12 - 4, 5)}" fill="${LN.councilColor[c.g]}"/>`;
    });
    // Bodies alive, stepped every 10 years.
    const max = Math.max.apply(null, MARKS.map(alive).concat(alive(1700), alive(1850))), ya = n => yA1 - (n / (max + 2)) * (yA1 - yA0);
    let line = `M${f(X(30))},${f(ya(alive(30)))}`;
    for (let y = 40; y <= NOW; y += 10) line += `H${f(X(y))}V${f(ya(alive(y)))}`;
    line += `H${f(X(NOW))}`;
    let marks = "";
    MARKS.forEach(m => { const n = alive(m); marks += `<circle class="am" cx="${f(X(m))}" cy="${f(ya(n))}" r="3.4"/><text class="an" x="${f(X(m))}" y="${f(ya(n) - 9)}" text-anchor="middle">${n}</text>`; });
    for (let y = 250; y <= 2000; y += 250) axis += `<line class="tick" x1="${f(X(y))}" y1="${yA1}" x2="${f(X(y))}" y2="${yA1 + 6}"/><text class="yr" x="${f(X(y))}" y="${yA1 + 22}" text-anchor="middle">${y}</text>`;
    const trk = (y, s) => `<text class="trk" x="${L + 4}" y="${y}">${s}</text>`;
    return `<div class="scroll"><svg class="vz pulse" viewBox="0 0 ${W} ${H}" style="--mw:940px" role="img" aria-label="Pulse view: events, people, councils and living bodies in 50-year steps">
      <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4D7CFE" stop-opacity=".42"/><stop offset="1" stop-color="#4D7CFE" stop-opacity="0"/></linearGradient></defs>
      ${bg}<line class="base" x1="${L}" y1="${yE}" x2="${R}" y2="${yE}"/><line class="base" x1="${L}" y1="${yP}" x2="${R}" y2="${yP}"/><line class="base" x1="${L}" y1="${yA1}" x2="${R}" y2="${yA1}"/>
      ${trk(48, CH.events.length + " EVENTS")}${trk(yE + 22, CH.people.length + " PEOPLE")}${trk(yC - 20, CH.councils.length + " COUNCILS AND CONFESSIONS")}${trk(yA0 + 4, "BODIES ALIVE")}
      ${ev}<path class="area" d="${line}V${yA1}H${f(X(30))}Z" fill="url(#ag)"/><path class="aline" d="${line}"/>${marks}${axis}
      <g class="hits">${hit}</g><g class="people">${pp}</g>${cc}</svg></div>`;
  };
})();
