/* Interchange: the system map. Time runs left to right on a piecewise scale.
   Every tradition is a line that leaves its parent at 45 degrees and then runs level.
   Drawn once as a still SVG; every later change is a class toggle or an overlay path. */
(function () {
  "use strict";
  const CH = window.CH, X = CH.x, T = X.T, esc = X.esc, END = X.END;
  const LW = 7;                       // line width
  const f = n => (Math.round(n * 10) / 10).toString();

  function span(y) {
    let x = 0;
    for (const [a, b, r] of X.SEGS) { if (y <= a) break; x += (Math.min(y, b) - a) * r; }
    return x;
  }
  function yearAt(px) {
    let lo = 30, hi = END;
    for (let i = 0; i < 26; i++) { const m = (lo + hi) / 2; if (span(m) < px) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }

  /* ───────── geometry ───────── */
  function layout(LH) {
    const padL = 64, padR = 232, top = 56, bottom = 30;
    const vals = CH.traditions.map(t => X.lanes[t.id]);
    const minLane = Math.min.apply(null, vals), maxLane = Math.max.apply(null, vals);
    const PX = y => padL + span(y);
    const LY = lane => top + LH * 0.9 + (lane - minLane) * LH;
    const W = Math.round(PX(END) + padR), H = Math.round(LY(maxLane) + LH * 0.9 + bottom);
    const order = CH.traditions.slice().sort((a, b) => X.lineage(a.id).length - X.lineage(b.id).length || a.start - b.start);
    const L = {};
    order.forEach(t => {
      const y = LY(X.lanes[t.id]), p = t.parent && L[t.parent];
      let xs = PX(t.start), ys = y, xe = xs;
      if (p) { xs = Math.min(Math.max(xs, p.xe + 10), p.xEnd); ys = p.y; xe = xs + Math.abs(y - ys); }
      const xEnd = Math.max(PX(t.end || END), xe + 26);
      L[t.id] = { id: t.id, t, y, xs, ys, xe, xEnd, c: X.colorOf(t.id) };
    });
    return { LH, padL, padR, top, bottom, PX, LY, W, H, L, order };
  }
  const bulletSvg = (id, x, y) => {
    const code = X.code[id], fs = code.length > 1 ? 8.6 : 11, c = X.colorOf(id);
    return `<circle class="bl" cx="${f(x)}" cy="${f(y)}" r="8.6" style="--c:${c}"/><text class="bc" x="${f(x)}" y="${f(y + fs * 0.36)}" text-anchor="middle" font-size="${fs}" fill="${X.ink(c)}">${code}</text>`;
  };
  // The title block and key, drawn in the empty quarter below the medieval West.
  function poster(G) {
    const x = G.PX(1078), y = G.LY(8.4), n = [[CH.traditions.length, "Lines"], [CH.events.length, "Stations"], [CH.debates.length, "Junctions"], [CH.people.length, "People"], [CH.councils.length, "Councils"]];
    let s = `<g class="poster" aria-hidden="true"><text class="pk" x="${f(x)}" y="${f(y)}">SYSTEM MAP · THE YEAR 30 TO ${END}</text>`;
    s += `<text class="ph" x="${f(x - 2)}" y="${f(y + 50)}">Church history,</text><text class="ph" x="${f(x - 2)}" y="${f(y + 95)}">drawn as a transit map.</text>`;
    n.forEach((k, i) => (s += `<text class="pn" x="${f(x + i * 98)}" y="${f(y + 152)}">${k[0]}</text><text class="pl" x="${f(x + 1 + i * 98)}" y="${f(y + 168)}">${k[1].toUpperCase()}</text>`));
    const ky = y + 204, kx = [x, x + 172, x + 344];
    s += `<line class="rule" x1="${f(x)}" x2="${f(x + 490)}" y1="${f(y + 184)}" y2="${f(y + 184)}"/>`;
    // row 1
    s += `<path class="ks" d="M${f(kx[0])},${f(ky)}h30"/><circle class="dot" cx="${f(kx[0] + 15)}" cy="${f(ky)}" r="5.4"/><text class="kt" x="${f(kx[0] + 38)}" y="${f(ky + 4)}">Key moment</text>`;
    s += `<path class="ks" d="M${f(kx[1])},${f(ky - 5)}h30M${f(kx[1])},${f(ky + 7)}h30"/><path class="cn" d="M${f(kx[1] + 15)},${f(ky - 5)}v12"/><circle class="dot" cx="${f(kx[1] + 15)}" cy="${f(ky - 5)}" r="4.4"/><circle class="dot" cx="${f(kx[1] + 15)}" cy="${f(ky + 7)}" r="4.4"/><text class="kt" x="${f(kx[1] + 38)}" y="${f(ky + 4)}">Shared by lines</text>`;
    s += `<path class="ks" d="M${f(kx[2])},${f(ky)}h30"/><circle class="pip" cx="${f(kx[2] + 15)}" cy="${f(ky)}" r="2.4"/><text class="kt" x="${f(kx[2] + 38)}" y="${f(ky + 4)}">Other stop</text>`;
    // row 2
    const k2 = ky + 28;
    s += `<path class="ks" d="M${f(kx[0])},${f(k2)}h24"/><path class="ke" d="M${f(kx[0] + 24)},${f(k2 - 8)}v16"/><text class="kt" x="${f(kx[0] + 38)}" y="${f(k2 + 4)}">End of a line</text>`;
    s += `<g class="wk"><path d="M${f(kx[1] + 4)},${f(k2)}h22"/><circle cx="${f(kx[1] + 2)}" cy="${f(k2)}" r="3"/><circle cx="${f(kx[1] + 28)}" cy="${f(k2)}" r="3"/></g><text class="kt" x="${f(kx[1] + 38)}" y="${f(k2 + 4)}">Influence, not descent</text>`;
    s += `<g class="zone-lb"><rect x="${f(kx[2] + 6)}" y="${f(k2 - 8.5)}" width="17" height="17" rx="2"/><text class="zn" x="${f(kx[2] + 14.5)}" y="${f(k2 + 4.5)}" text-anchor="middle">1</text></g><text class="kt" x="${f(kx[2] + 38)}" y="${f(k2 + 4)}">Era</text>`;
    s += `<text class="pt" x="${f(x)}" y="${f(k2 + 34)}">Pick a line to trace it back to the year 30. Pick a station to see what happened there.</text></g>`;
    return s;
  }
  const yAt = (l, x) => (x < l.xs - 0.5 || x > l.xEnd + 0.5) ? null : x >= l.xe ? l.y : l.ys + (l.y - l.ys) * (x - l.xs) / (l.xe - l.xs);
  // From where the line leaves its parent to xb (level part).
  function startPiece(l, xb) {
    if (l.xe === l.xs) return `M${f(l.xs)},${f(l.y)}H${f(xb)}`;
    const dir = Math.sign(l.y - l.ys), r = Math.min(10, (l.xe - l.xs) / 2), k = r * 0.7071;
    return `M${f(l.xs)},${f(l.ys)}L${f(l.xe - k)},${f(l.y - dir * k)}Q${f(l.xe)},${f(l.y)} ${f(l.xe + r)},${f(l.y)}H${f(Math.max(xb, l.xe + r))}`;
  }
  const levelPiece = (l, xa, xb) => `M${f(xa)},${f(l.y)}H${f(xb)}`;

  /* ───────── render ───────── */
  function render(host, opts) {
    opts = opts || {};
    const scrollerH = Math.max(320, host.clientHeight - (opts.footH || 48));
    const LH = Math.max(19, Math.min(29, Math.floor((scrollerH - 87) / 32.8 * 10) / 10));
    const G = layout(LH), L = G.L, PX = G.PX, W = G.W, H = G.H;
    const ids = G.order.map(t => t.id);

    /* stations */
    const stations = [];
    const resolve = (tags, x) => {
      const pts = [], seen = {};
      tags.forEach(tag => {
        let l = L[tag];
        while (l && x < l.xs - 0.5) l = L[l.t.parent];
        if (!l || x > l.xEnd + 0.5) return;
        const y = yAt(l, x), k = Math.round(y);
        if (seen[k]) return;
        seen[k] = 1; pts.push({ id: l.id, y });
      });
      return pts.sort((a, b) => a.y - b.y);
    };
    CH.events.forEach((e, i) => {
      let x = PX(e.y);
      e.tags.forEach(tag => { const l = L[tag]; if (l && l.xs > x && l.xs - x <= 16) x = l.xs; });
      let pts = resolve(e.tags, x);
      const off = !pts.length;
      if (off) pts = [{ id: null, y: G.top - 12 }];   // no line left to sit on: it stops on the ruler
      const name = X.stationName[i];
      stations.push({ key: "e" + i, x, pts, off, year: e.y, title: e.t, label: name || (e.k ? e.t : ""), kind: e.k ? "key" : name ? "named" : "tick", tags: e.tags });
    });
    Object.keys(X.councilStation).forEach(id => {
      const c = CH.councils.find(k => k.id === id), cs = X.councilStation[id], x = PX(c.year);
      stations.push({ key: "c" + id, x, pts: resolve(cs[1], x), year: c.year, title: c.name, label: cs[0], kind: "named", tags: cs[1] });
    });

    /* walkways (influence between lines): worked out first so labels can keep clear of them */
    const walks = [];
    ids.forEach(id => {
      const a = L[id];
      let lastX = -99;
      (a.t.links || []).forEach(lk => {
        const b = L[lk.to]; if (!b) return;
        let x = Math.min(Math.max(PX(lk.year), a.xe + 12), a.xEnd);
        if (x < b.xs) x = b.xs;
        if (Math.abs(x - lastX) < 12) x = lastX + 14;
        lastX = x;
        const ya = yAt(a, x) == null ? a.y : yAt(a, x), yb = yAt(b, x) == null ? b.y : yAt(b, x);
        walks.push({ a: id, b: lk.to, x, ya, yb, lo: Math.min(ya, yb), hi: Math.max(ya, yb), note: lk.note });
      });
    });

    /* label placement: labels sit in the gap between two rows, never on a line */
    const hsegs = ids.map(id => ({ x1: L[id].xe, x2: L[id].xEnd, y: L[id].y }));
    const dsegs = ids.filter(id => L[id].xe > L[id].xs).map(id => L[id]);
    const placed = [];
    const tw = (s, size) => s.length * size * 0.468 + 2;
    function cost(r, own) {
      let c = 0;
      if (r.x < 6 || r.x + r.w > W - 6 || r.y < G.top + 2 || r.y + r.h > H - G.bottom) c += 600;
      for (const o of placed) if (o.own !== own && r.x < o.x + o.w + 4 && o.x < r.x + r.w + 4 && r.y < o.y + o.h && o.y < r.y + r.h) c += o.heavy || 1000;
      for (const s of hsegs) if (s.y > r.y - 2.5 && s.y < r.y + r.h + 2.5 && s.x1 < r.x + r.w && s.x2 > r.x) c += 320;
      for (const l of dsegs) {
        if (l.xe < r.x - 4 || l.xs > r.x + r.w + 4) continue;
        for (let x = Math.max(l.xs, r.x - 4); x <= Math.min(l.xe, r.x + r.w + 4); x += 3) {
          const y = yAt(l, x);
          if (y > r.y - 4 && y < r.y + r.h + 4) { c += 320; break; }
        }
      }
      return c;
    }
    // a leader is the thin rule from a station to a label that could not sit beside it
    function leaderCost(x, y0, y1) {
      let c = 0;
      const lo = Math.min(y0, y1), hi = Math.max(y0, y1);
      for (const s of hsegs) if (s.y > lo + 1 && s.y < hi - 1 && s.x1 <= x && s.x2 >= x) c += 260;
      for (const l of dsegs) { if (x > l.xs && x < l.xe) { const y = yAt(l, x); if (y > lo && y < hi) c += 260; } }
      for (const o of placed) if (!o.soft && x > o.x - 2 && x < o.x + o.w + 2 && lo < o.y + o.h && o.y < hi) c += o.heavy ? 200 : 500;
      return c;
    }
    const LBH = 12, BASE = 3.5;
    // bullets, station dots, connectors and walkways are obstacles
    ids.forEach(id => {
      const l = L[id], first = (l.xe === l.xs ? l.xs : l.xe) + 18;
      l.bx = [first];
      for (let x = first + 760; x < l.xEnd - 240; x += 760) l.bx.push(x);
      l.alive = !l.t.end;
    });
    stations.forEach(s => {
      const named = s.kind !== "tick";
      s.pts.forEach(p => {
        if (named) placed.push({ x: s.x - 6, y: p.y - 4, w: 12, h: 8, heavy: 450, own: s.key }, { x: s.x - 7, y: p.y - 7, w: 14, h: 14, heavy: 45, own: s.key, soft: 1 });
        else placed.push({ x: s.x - 3, y: p.y - 3, w: 6, h: 6, heavy: 140, soft: 1 });
      });
      if (s.pts.length > 1) placed.push({ x: s.x - 4, y: s.pts[0].y + 6, w: 8, h: s.pts[s.pts.length - 1].y - s.pts[0].y - 12, heavy: named ? 450 : 220, soft: !named });
    });
    walks.forEach(w => placed.push({ x: w.x - 3, y: w.lo + 4, w: 6, h: w.hi - w.lo - 8, heavy: 220, soft: 1 }));
    // keep repeat bullets off stations
    ids.forEach(id => {
      const l = L[id];
      l.bx = l.bx.map(x => {
        let guard = 0;
        while (guard++ < 8 && stations.some(s => s.kind !== "tick" && Math.abs(s.x - x) < 22 && s.pts.some(p => Math.abs(p.y - l.y) < LH * 1.1))) x += 26;
        return x;
      }).filter(x => x < l.xEnd - 14);
      if (!l.bx.length) l.bx = [Math.min(l.xEnd - 12, (l.xe === l.xs ? l.xs : l.xe) + 18)];
      l.bx.forEach((x, n) => placed.push({ x: x - 10, y: l.y - 10, w: 20, h: 20, heavy: 450, own: n ? undefined : id }));
    });
    // line names at the start of each line
    ids.forEach(id => {
      const l = L[id], name = X.head(id), yr = id === "early" ? "c. 30" : String(l.t.start);
      const w = tw(name, 12.5) + tw(yr, 11) + 6, x = l.bx[0] + 13;
      let best = null;
      [0, 26, 52, 84, 120, 165, 215].forEach((dx, n) => [-1, 1].forEach(side => {
        if (x + dx + w > Math.max(l.xEnd, x + w + 1) && dx) return;
        const r = { x: x + dx, y: l.y + side * LH / 2 - LBH / 2, w, h: LBH }, k = cost(r, id) + n * 7 + (side > 0 ? 5 : 0);
        if (!best || k < best.k) best = { r, k };
      }));
      l.lb = { x: best.r.x, y: best.r.y + LBH / 2 + BASE, name, yr, k: best.k };
      placed.push(best.r);
    });
    // station names
    stations.filter(s => s.kind !== "tick").sort((a, b) => (a.kind === "key" ? 0 : 1) - (b.kind === "key" ? 0 : 1) || a.year - b.year).forEach(s => {
      const yr = String(s.year), w = tw(s.label, 12) + tw(yr, 10.5) + 5;
      const topY = s.pts[0].y, botY = s.pts[s.pts.length - 1].y;
      let best = null;
      // an interchange can carry its name beside the connector, between the lines it joins
      for (let g = 1; s.pts.length > 1 && g <= Math.round((botY - topY) / LH); g++) {
        [[s.x + 10, 2], [s.x - 10 - w, 9]].forEach(c => {
          const r = { x: c[0], y: topY + LH * (g - 0.5) - LBH / 2, w, h: LBH }, k = cost(r, s.key) + c[1] + g;
          if (!best || k < best.k) best = { r, k, g: 1, below: 0, left: c[0] < s.x };
        });
      }
      for (let g = 1; g <= 5 && !(best && best.k < 40); g++) {
        [[s.x + 9, topY - LH * (g - 0.5), 0, 0], [s.x + 9, botY + LH * (g - 0.5), 4, 1], [s.x - 9 - w, topY - LH * (g - 0.5), 8, 0], [s.x - 9 - w, botY + LH * (g - 0.5), 10, 1]].forEach(c => {
          const r = { x: c[0], y: c[1] - LBH / 2, w, h: LBH };
          let k = cost(r, s.key) + c[2] + (g - 1) * 40;
          if (g > 1) k += leaderCost(s.x, c[3] ? botY + 7 : topY - 7, c[1] + (c[3] ? -6 : 6));
          if (!best || k < best.k) best = { r, k, g, below: c[3], left: c[0] < s.x };
        });
        if (best.k < 40) break;
      }
      s.lb = { x: best.left ? best.r.x + w : best.r.x, y: best.r.y + LBH / 2 + BASE, end: best.left, g: best.g, below: best.below, cy: best.r.y + LBH / 2, k: best.k };
      placed.push(best.r);
      if (best.g > 1) { const y0 = best.below ? botY + 7 : topY - 7, y1 = s.lb.cy + (best.below ? -6 : 6); placed.push({ x: s.x - 2, y: Math.min(y0, y1), w: 4, h: Math.abs(y1 - y0), heavy: 300 }); }
    });

    /* draw */
    let s = "";
    // zones
    CH.eras.forEach((e, i) => {
      const x0 = i ? PX(e.from) : 0, x1 = i === CH.eras.length - 1 ? W : PX(e.to);
      s += `<rect class="zone z${i % 2}" x="${f(x0)}" y="0" width="${f(x1 - x0)}" height="${H}"/>`;
      const lx = Math.max(x0, PX(e.from)) + 8, room = x1 - lx, yrs = e.label.replace(/\s*–\s*/g, "–");
      const full = `${e.name} · ${yrs}`;
      s += `<g class="zone-lb"><rect x="${f(lx)}" y="9" width="17" height="17" rx="2"/><text class="zn" x="${f(lx + 8.5)}" y="22" text-anchor="middle">${i + 1}</text>`;
      if (room > tw(full.toUpperCase(), 12.5) + 40) s += `<text class="zt" x="${f(lx + 24)}" y="22">${esc(e.name.toUpperCase())}<tspan class="zy" dx="7">${esc(yrs)}</tspan></text>`;
      else if (room > tw(yrs, 12) + 36) s += `<text class="zt" x="${f(lx + 24)}" y="22"><tspan class="zy">${esc(yrs)}</tspan></text>`;
      s += `</g>`;
    });
    // rulers
    X.SEGS.forEach(([a, b, r]) => {
      const step = [5, 10, 20, 25, 50, 100, 200].find(st => st * r >= 52) || 200;
      for (let y = Math.ceil(a / step) * step; y < b || (b === END && y <= 2020); y += step) {
        if (y < 50) continue;
        const x = f(PX(y));
        s += `<line class="grid" x1="${x}" x2="${x}" y1="${G.top - 12}" y2="${H - G.bottom + 6}"/><text class="tick" x="${x}" y="${G.top - 17}" text-anchor="middle">${y}</text><text class="tick" x="${x}" y="${H - G.bottom + 19}" text-anchor="middle">${y}</text>`;
      }
    });
    s += `<line class="rule" x1="0" x2="${W}" y1="${G.top - 12}" y2="${G.top - 12}"/><line class="rule" x1="0" x2="${W}" y1="${H - G.bottom + 6}" y2="${H - G.bottom + 6}"/>`;

    // walkways
    const wk = walks.map(w => `<g class="wk" data-a="${w.a}" data-b="${w.b}"><path d="M${f(w.x)},${f(w.lo + 5)}V${f(w.hi - 5)}"/><circle cx="${f(w.x)}" cy="${f(w.ya)}" r="3"/><circle cx="${f(w.x)}" cy="${f(w.yb)}" r="3"/><text x="${f(w.x + 7)}" y="${f((w.ya + w.yb) / 2 + 4)}">${esc(w.note)}</text></g>`).join("");
    s += `<g class="walks">${wk}</g>`;

    // interchange connectors run under the lines, so a line that is not served passes over
    s += `<g class="conns">` + stations.filter(st => st.pts.length > 1).map(st =>
      `<path class="cn${st.kind === "tick" ? " minor" : ""}" data-key="${st.key}" d="M${f(st.x)},${f(st.pts[0].y)}V${f(st.pts[st.pts.length - 1].y)}"/>`).join("") + `</g>`;

    // lines: deepest first, so a branch tucks under the line it leaves
    const drawOrder = ids.slice().reverse();
    s += `<g class="lines">`;
    drawOrder.forEach(id => {
      const l = L[id], d = startPiece(l, l.xEnd), t = l.t, kc = X.ink(l.c);
      const yrs = id === "early" ? "about 30 to 1054" : t.end ? `${t.start} to ${t.end}` : `${t.start} to today`;
      s += `<g class="ln" data-id="${id}" style="--c:${l.c}" tabindex="0" role="button" aria-label="${esc(t.name)} line, ${yrs}">`;
      s += `<path class="hit" d="${d}"/><path class="tr" d="${d}"/>`;
      if (t.end) s += `<path class="cap" d="M${f(l.xEnd)},${f(l.y - 8)}V${f(l.y + 8)}"/>`;
      if (!t.parent) s += `<path class="cap" d="M${f(l.xs)},${f(l.y - 8)}V${f(l.y + 8)}"/>`;
      const bullet = (x, y) => bulletSvg(id, x, y);
      l.bx.forEach(x => (s += bullet(x, l.y)));
      s += `<text class="lb" x="${f(l.lb.x)}" y="${f(l.lb.y)}">${esc(l.lb.name)}<tspan class="yr" dx="5">${l.lb.yr}</tspan></text>`;
      if (l.alive) s += bullet(l.xEnd + 17, l.y) + `<text class="lb end" x="${f(l.xEnd + 31)}" y="${f(l.y + 4.3)}">${esc(X.dest(id))}</text>`;
      s += `</g>`;
    });
    s += `</g>` + poster(G) + `<g class="route"></g>`;

    // stations on top
    s += `<g class="stations">`;
    stations.forEach(st => {
      const named = st.kind !== "tick";
      s += `<g class="st ${st.kind}${st.off ? " off" : ""}" data-key="${st.key}" tabindex="0" role="button" aria-label="${st.year}, ${esc(st.title)}">`;
      st.pts.forEach(p => {
        s += `<circle class="hit" cx="${f(st.x)}" cy="${f(p.y)}" r="${named ? 20 : 13}"/>`;
        s += named ? `<circle class="dot" cx="${f(st.x)}" cy="${f(p.y)}" r="5.4"/>` : `<circle class="pip" cx="${f(st.x)}" cy="${f(p.y)}" r="2.4"/>`;
      });
      if (named) {
        const lb = st.lb;
        if (lb.g > 1) s += `<path class="lead" d="M${f(st.x)},${f(lb.below ? st.pts[st.pts.length - 1].y + 7 : st.pts[0].y - 7)}V${f(lb.cy + (lb.below ? -6 : 6))}"/>`;
        s += `<text class="sl" x="${f(lb.x)}" y="${f(lb.y)}"${lb.end ? ' text-anchor="end"' : ""}>${esc(st.label)}<tspan class="yr" dx="4">${st.year}</tspan></text>`;
      }
      s += `</g>`;
    });
    s += `</g>`;

    const mini = `<svg class="mini-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">` +
      CH.eras.map((e, i) => `<rect class="zone z${i % 2}" x="${f(i ? PX(e.from) : 0)}" y="0" width="${f((i === CH.eras.length - 1 ? W : PX(e.to)) - (i ? PX(e.from) : 0))}" height="${H}"/>`).join("") +
      drawOrder.map(id => `<path d="${startPiece(L[id], L[id].xEnd)}" stroke="${L[id].c}"/>`).join("") + `</svg>`;

    host.innerHTML = `<div class="map-scroll" tabindex="-1"><svg class="map-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="System map: every Christian tradition as a transit line, from the year 30 to today">${s}</svg><div class="map-pad"></div></div>
      <div class="map-foot">
        <div class="zones" role="group" aria-label="Jump to an era">${CH.eras.map((e, i) => `<button type="button" data-era="${i}" title="${esc(e.name)}, ${esc(e.label)}"><b>${i + 1}</b><span>${esc(e.name)}</span><i>${e.from === 30 ? "30" : e.from}</i></button>`).join("")}</div>
        <div class="mini" role="presentation">${mini}<span class="mini-view"></span></div>
        <div class="zoom" role="group" aria-label="Zoom"><button type="button" data-z="-1" aria-label="Zoom out">−</button><button type="button" data-z="1" aria-label="Zoom in">+</button></div>
      </div><div class="tip" aria-hidden="true"></div>`;

    const scroller = host.querySelector(".map-scroll"), svg = scroller.firstChild, routeG = svg.querySelector(".route");
    const miniEl = host.querySelector(".mini"), miniView = host.querySelector(".mini-view"), tip = host.querySelector(".tip");
    let z = opts.zoom || 1;
    const ZS = [0.55, 0.75, 1, 1.3];
    function applyZoom(nz, keep) {
      const cx = (scroller.scrollLeft + scroller.clientWidth / 2) / z, cy = (scroller.scrollTop + scroller.clientHeight / 2) / z;
      z = nz;
      svg.style.width = W * z + "px"; svg.style.height = H * z + "px";
      if (keep) { scroller.scrollLeft = cx * z - scroller.clientWidth / 2; scroller.scrollTop = cy * z - scroller.clientHeight / 2; }
      syncMini();
    }
    function syncMini() {
      const full = W * z, l = scroller.scrollLeft / full, w = Math.min(1, scroller.clientWidth / full);
      miniView.style.left = l * 100 + "%"; miniView.style.width = w * 100 + "%";
      const yr = yearAt(scroller.scrollLeft / z + scroller.clientWidth / z / 2 - G.padL);
      host.querySelectorAll(".zones button").forEach((b, i) => b.classList.toggle("cur", yr >= CH.eras[i].from && (yr < CH.eras[i].to || i === CH.eras.length - 1)));
    }
    scroller.addEventListener("scroll", syncMini, { passive: true });
    host.querySelector(".zoom").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const i = Math.max(0, Math.min(ZS.length - 1, ZS.indexOf(z) + +b.dataset.z));
      applyZoom(ZS[i], true);
    });
    const goX = (x, frac) => { scroller.scrollLeft = Math.max(0, x * z - visW() * (frac == null ? 0.5 : frac)); syncMini(); };
    const visW = () => scroller.clientWidth - (opts.inset ? opts.inset() : 0);
    const visH = () => scroller.clientHeight - (opts.insetY ? opts.insetY() : 0);
    host.querySelector(".zones").addEventListener("click", e => { const b = e.target.closest("button"); if (b) goX(PX(CH.eras[+b.dataset.era].from) - 30, 0); });
    // mini-map: click or drag to move
    let miniDrag = false;
    const miniGo = e => { const r = miniEl.getBoundingClientRect(); scroller.scrollLeft = (e.clientX - r.left) / r.width * W * z - scroller.clientWidth / 2; syncMini(); };
    miniEl.addEventListener("pointerdown", e => { miniDrag = true; miniEl.setPointerCapture && miniEl.setPointerCapture(e.pointerId); miniGo(e); });
    miniEl.addEventListener("pointermove", e => { if (miniDrag) miniGo(e); });
    miniEl.addEventListener("pointerup", () => (miniDrag = false));
    miniEl.addEventListener("pointercancel", () => (miniDrag = false));

    /* state: which parts of the map are lit */
    const lnEl = {}; svg.querySelectorAll(".ln").forEach(g => (lnEl[g.dataset.id] = g));
    const stEl = {}; svg.querySelectorAll(".st").forEach(g => (stEl[g.dataset.key] = g));
    function clear() {
      svg.classList.remove("dim");
      routeG.innerHTML = "";
      svg.querySelectorAll(".on,.kid").forEach(el => el.classList.remove("on", "kid"));
    }
    // pieces: [{id, d}]; reach: {lineId: [xFrom, xTo]} for lighting stations
    function light(on, pieces, reach, kids) {
      clear();
      svg.classList.add("dim");
      on.forEach(id => lnEl[id] && lnEl[id].classList.add("on"));
      (kids || []).forEach(id => lnEl[id] && lnEl[id].classList.add("kid"));
      routeG.innerHTML = (pieces || []).map(p => `<path class="rc" d="${p.d}"/>`).join("") + (pieces || []).map(p => `<path class="rt" d="${p.d}" stroke="${L[p.id].c}"/>`).join("") +
        Object.keys(reach).map(id => L[id].bx.filter(x => x >= reach[id][0] && x <= reach[id][1]).map(x => bulletSvg(id, x, L[id].y)).join("")).join("");
      stations.forEach(st => {
        const hit = st.pts.some(p => p.id && reach[p.id] && st.x >= reach[p.id][0] - 1 && st.x <= reach[p.id][1] + 1);
        if (hit) stEl[st.key].classList.add("on");
        const cn = svg.querySelector(`.cn[data-key="${st.key}"]`); if (cn) cn.classList.toggle("on", hit);
      });
      svg.querySelectorAll(".wk").forEach(w => { if (on.indexOf(w.dataset.a) >= 0 || on.indexOf(w.dataset.b) >= 0) w.classList.add("on"); });
    }
    // the way from one line back to the year 30
    function back(id) {
      const pieces = [], reach = {}, chain = X.lineage(id);
      chain.forEach((cid, i) => {
        const l = L[cid], to = i === 0 ? l.xEnd : L[chain[i - 1]].xs;
        pieces.push({ id: cid, d: startPiece(l, to) });
        reach[cid] = [l.xs, to];
      });
      return { pieces, reach, chain };
    }
    const kidsOf = id => ids.filter(k => k !== id && X.lineage(k).indexOf(id) >= 0);
    function fit(x0, x1, y0, y1) {
      const vw = visW() / z, span = x1 - x0;
      scroller.scrollLeft = Math.max(0, (span + 120 <= vw ? x0 - (vw - span) / 2 : x0 - 70) * z);
      if (y0 != null) scroller.scrollTop = Math.max(0, ((y0 + y1) / 2) * z - visH() / 2);
      syncMini();
    }
    const api = {
      zoom: () => z, L, stations, PX,
      clear() { clear(); },
      line(id, noScroll) {
        const b = back(id); light([id], b.pieces, b.reach, kidsOf(id));
        if (!noScroll) { const l = L[id]; fit(l.xs - 40, Math.min(l.xEnd, l.xs + 760), Math.min(l.y, l.ys), Math.max(l.y, l.ys)); }
      },
      trip(a, b) {
        const ca = X.lineage(a), cb = X.lineage(b), lca = ca.find(id => cb.indexOf(id) >= 0);
        if (!lca) { // no shared track
          const pa = back(a), pb = back(b);
          light([a, b], pa.pieces.concat(pb.pieces), Object.assign({}, pa.reach, pb.reach));
          fit(Math.min(L[a].xs, L[b].xs) - 60, W, null);
          return;
        }
        const pieces = [], reach = {};
        const side = chain => {
          const up = chain.slice(0, chain.indexOf(lca));
          up.forEach((cid, i) => { const l = L[cid], to = i === 0 ? l.xEnd : L[up[i - 1]].xs; pieces.push({ id: cid, d: startPiece(l, to) }); reach[cid] = [l.xs, to]; });
          return up.length ? L[up[up.length - 1]].xs : null;
        };
        const xa = side(ca), xb = side(cb), l = L[lca];
        const from = xa == null ? xb : xb == null ? xa : Math.min(xa, xb), to = xa == null || xb == null ? l.xEnd : Math.max(xa, xb);
        if (to > from) { pieces.push({ id: lca, d: levelPiece(l, from, to) }); reach[lca] = [from, to]; }
        light([a, b], pieces, reach);
        fit(from - 90, from + 700, l.y, l.y);
      },
      lit(list) {
        const reach = {}; list.forEach(id => (reach[id] = [L[id].xs, L[id].xEnd]));
        light(list, list.map(id => ({ id, d: startPiece(L[id], L[id].xEnd) })), reach);
        // Show the stretch where every lit line is running: just after the last of them starts.
        const xs = Math.max.apply(null, list.map(id => L[id].xs)), ys = list.map(id => L[id].y);
        goX(xs, 0.3);
        scroller.scrollTop = Math.max(0, (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2 * z - visH() / 2 - (scroller.clientWidth < 600 ? 50 : 0));
      },
      station(key, noScroll) {
        const st = stations.find(k => k.key === key); if (!st) return;
        svg.querySelectorAll(".st.sel").forEach(el => el.classList.remove("sel"));
        stEl[key].classList.add("sel");
        if (!noScroll) { goX(st.x, 0.45); scroller.scrollTop = Math.max(0, st.pts[0].y * z - visH() / 2); }
      },
      unsel() { svg.querySelectorAll(".st.sel").forEach(el => el.classList.remove("sel")); },
      toYear(y) { goX(PX(y) - 30, 0); },
      sync: syncMini
    };

    /* pointer: click, keyboard, hover tip, drag to pan */
    let dragged = false, drag = null;
    const act = el => {
      const st = el.closest(".st"), ln = el.closest(".ln");
      if (st) opts.onStation && opts.onStation(st.dataset.key);
      else if (ln) opts.onLine && opts.onLine(ln.dataset.id);
      else opts.onClear && opts.onClear();
    };
    svg.addEventListener("click", e => { if (!dragged) act(e.target); });
    svg.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.closest(".st,.ln")) { e.preventDefault(); act(e.target); } });
    svg.addEventListener("mousemove", e => {
      const st = e.target.closest(".st"), ln = !st && e.target.closest(".ln");
      if (!st && !ln) { tip.classList.remove("show"); return; }
      const r = host.getBoundingClientRect();
      if (st) { const o = stations.find(k => k.key === st.dataset.key); tip.innerHTML = `<b>${o.year}</b> ${esc(o.title)}`; }
      else { const t = T[ln.dataset.id]; tip.innerHTML = `<span class="bl sm${X.code[t.id].length > 1 ? " two" : ""}" style="--c:${X.colorOf(t.id)};--k:${X.ink(X.colorOf(t.id))}">${X.code[t.id]}</span> ${esc(t.name)} <i>${esc(X.years(t))}</i>`; }
      tip.style.left = Math.min(r.width - 260, Math.max(8, e.clientX - r.left + 14)) + "px";
      tip.style.top = Math.max(8, e.clientY - r.top - 38) + "px";
      tip.classList.add("show");
    });
    svg.addEventListener("mouseleave", () => tip.classList.remove("show"));
    scroller.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button) return; drag = { x: e.clientX, y: e.clientY, left: scroller.scrollLeft, top: scroller.scrollTop }; dragged = false; });
    window.addEventListener("pointermove", e => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) { dragged = true; scroller.classList.add("dragging"); }
      if (dragged) { scroller.scrollLeft = drag.left - dx; scroller.scrollTop = drag.top - dy; }
    });
    window.addEventListener("pointerup", () => { if (drag) { drag = null; scroller.classList.remove("dragging"); setTimeout(() => (dragged = false), 0); } });

    applyZoom(z, false);
    // first frame: the 1054 fork on the left, the Reformation fanning out on the right
    scroller.scrollLeft = Math.max(0, (PX(opts.startYear || 1040) - 24) * z);
    syncMini();
    CH.map.live = api;
    return api;
  }

  CH.map = { render, span, yearAt };
})();
