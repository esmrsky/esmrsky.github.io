/* Rose Window: the geometry and drawing of the window.
   Time runs outward from the year 30 at the center to today at the rim.
   Every tradition owns a slice of the circle from the ring of its first year.
   A parent keeps the whole of its span until a child begins; from that ring
   outward the child's slice is the child's. */
(function () {
  "use strict";
  const CH = window.CH, T = {};
  CH.traditions.forEach(t => (T[t.id] = t));

  const NOW = 2026, R0 = 40, R = 455;
  /* year → radius, piecewise, so the crowded centuries after 1500 get more room */
  const STOPS = [[30, R0], [325, 80], [1054, 150], [1500, 220], [1700, 315], [1900, 390], [NOW, R]];
  function rad(y) {
    y = Math.max(30, Math.min(NOW, y));
    for (let i = 1; i < STOPS.length; i++) {
      const a = STOPS[i - 1], b = STOPS[i];
      if (y <= b[0]) return a[1] + (y - a[0]) / (b[0] - a[0]) * (b[1] - a[1]);
    }
    return R;
  }
  function yearAt(r) {
    r = Math.max(R0, Math.min(R, r));
    for (let i = 1; i < STOPS.length; i++) {
      const a = STOPS[i - 1], b = STOPS[i];
      if (r <= b[1]) return a[0] + (r - a[1]) / (b[1] - a[1]) * (b[0] - a[0]);
    }
    return NOW;
  }
  const RINGS = [325, 451, 1054, 1517, 1648, 1906];

  /* Jewel glass, one color per family. */
  const GLASS = {
    early: "#f1dc9c", ancient: "#544d68", "east-syriac": "#10a79c", oriental: "#c9591b", orthodox: "#f3b21f",
    catholic: "#cc1230", dissent: "#c25a82", lutheran: "#2059dc", reformed: "#0f9862", anglican: "#8e44bd",
    radical: "#c4b820", baptist: "#1ba6dc", wesleyan: "#f5811f", pentecostal: "#e3318e", restoration: "#5f6ae8",
    global: "#66b82d", new: "#aeabbd"
  };
  function hsl(hex) {
    const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    let h = 0, s = 0;
    if (d) {
      s = d / (1 - Math.abs(2 * l - 1));
      h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    return [h, s * 100, l * 100];
  }
  const dead = t => !!t.end && t.id !== "early";
  function base(t) {
    const c = hsl(GLASS[t.family]);
    return dead(t) ? [c[0], Math.min(c[1], 22), Math.min(c[2] * 0.62, 30)] : c;   // smoky glass for branches that ended
  }
  const css = c => `hsl(${c[0].toFixed(0)} ${c[1].toFixed(0)}% ${c[2].toFixed(0)}%)`;
  const colorOf = id => (T[id] ? css(base(T[id])) : "#777");
  function rng(seed) {
    let a = 2166136261;
    for (let i = 0; i < seed.length; i++) a = Math.imul(a ^ seed.charCodeAt(i), 16777619);
    return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  /* ───────── layout ─────────
     Clockwise from the top. The line at the top is the parting of 1054: the East falls to
     the right of it, the West to the left. Numbers are the width of a tradition's own slice
     (descent, not size). */
  const OWN = "own";
  const TREE = ["early", 0, [
    ["orthodox", 44, [["eastern-catholic", 7], OWN, ["old-believers", 7]]],
    ["oriental", 20],
    ["church-east", 12],
    ["catholic", 53, [
      ["anglican", 15, [
        ["methodist", 12, [["aic", 9], ["holiness", 8, [["pentecostal", 19, [["charismatic", 9], OWN]], OWN]], OWN]],
        ["plymouth", 6], ["quaker", 6],
        ["congregationalist", 7, [["baptist", 17, [["adventist", 7, [["jw", 6], OWN]], OWN]], OWN]],
        OWN]],
      ["reformed", 15, [
        ["unitarian", 6],
        ["presbyterian", 11, [["restoration", 9], OWN]],
        OWN,
        ["anabaptist", 8, [OWN, ["hutterite", 5], ["amish", 5], ["brethren", 6]]]]],
      ["lutheran", 19], ["hussite", 7], ["waldensian", 6], ["old-catholic", 6],
      OWN]]
  ]];
  const weight = n => (n[2] ? n[2].reduce((s, k) => s + (k === OWN ? n[1] : weight(k)), 0) : n[1]);
  const node = {};
  (function place(n, a0, k) {
    const me = (node[n[0]] = { id: n[0], a0: a0, own: null, slices: [] });
    let a = a0;
    if (!n[2]) { me.own = [a0, a0 + n[1] * k]; a = me.own[1]; }
    else n[2].forEach(c => {
      if (c === OWN) { me.own = [a, a + n[1] * k]; a = me.own[1]; }
      else { const s = a; a = place(c, a, k); me.slices.push([s, a, c[0]]); }
    });
    me.a1 = a;
    return a;
  })(TREE, 0, 360 / weight(TREE));

  /* Branches that died out sit as islands of smoky glass on the pane they broke from. */
  const span = id => [node[id].a0, node[id].a1];
  const ISLE = {
    arian: [14, 44], gnostic: [98, 138], marcionite: [152, 192], montanist: [206, 246], donatist: [296, 336],
    bogomil: [2.5, 16], cathar: [346, 357.5],
    lollard: [span("anglican")[1] - 26, span("anglican")[1]]
  };
  const LDS = "lds";

  function region(id) {
    const t = T[id];
    if (ISLE[id]) return { ri: rad(t.start), segs: [{ a0: ISLE[id][0], a1: ISLE[id][1], ro: rad(t.end) }] };
    const n = node[id];
    if (!n) return null;
    const segs = [];
    if (n.own) segs.push({ a0: n.own[0], a1: n.own[1], ro: t.end ? rad(t.end) : R, own: true });
    n.slices.forEach(s => segs.push({ a0: s[0], a1: s[1], ro: rad(T[s[2]].start) }));
    segs.sort((x, y) => x.a0 - y.a0);
    return { ri: id === "early" ? R0 : rad(t.start), segs: segs };
  }
  const midAngle = id => (ISLE[id] ? (ISLE[id][0] + ISLE[id][1]) / 2 : node[id] && node[id].own ? (node[id].own[0] + node[id].own[1]) / 2 : 0);

  /* ───────── path helpers ───────── */
  const D2R = Math.PI / 180;
  const pt = (a, r) => (r * Math.sin(a * D2R)).toFixed(1) + " " + (-r * Math.cos(a * D2R)).toFixed(1);
  function arc(r, a0, a1) {
    let d = "";
    const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / 120));
    for (let i = 1; i <= n; i++) d += `A${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${a1 > a0 ? 1 : 0} ${pt(a0 + (a1 - a0) * i / n, r)}`;
    return d;
  }
  const sector = (a0, a1, r0, r1) => `M${pt(a0, r0)}${arc(r0, a0, a1)}L${pt(a1, r1)}${arc(r1, a1, a0)}Z`;
  function outline(reg) {
    const s = reg.segs;
    let d = `M${pt(s[0].a0, reg.ri)}${arc(reg.ri, s[0].a0, s[s.length - 1].a1)}`;
    for (let i = s.length - 1; i >= 0; i--) d += `L${pt(s[i].a1, s[i].ro)}${arc(s[i].ro, s[i].a1, s[i].a0)}`;
    return d + "Z";
  }
  const CUTS = [80, 150, 228, 290, 393];
  function bands(r0, r1) {
    const p = [r0].concat(CUTS.filter(x => x > r0 + 9 && x < r1 - 9), [r1]), out = [];
    for (let i = 1; i < p.length; i++) {
      const n = Math.max(1, Math.round((p[i] - p[i - 1]) / 40));
      for (let j = 0; j < n; j++) out.push([p[i - 1] + (p[i] - p[i - 1]) * j / n, p[i - 1] + (p[i] - p[i - 1]) * (j + 1) / n]);
    }
    return out;
  }
  const arcadeN = s => Math.max(1, Math.round((s.a1 - s.a0) / 6.2));

  /* the small pieces of glass that make up one tradition's pane */
  function cells(id, reg) {
    const b = base(T[id]), rnd = rng(id), isDead = dead(T[id]);
    let out = "";
    reg.segs.forEach(s => bands(reg.ri, s.ro).forEach(band => {
      const mid = (band[0] + band[1]) / 2, len = (s.a1 - s.a0) * D2R * mid;
      let k = Math.max(1, Math.ceil(len / (mid < 150 ? 30 : 46)));
      if (s.own && Math.abs(band[1] - R) < 0.01) k = arcadeN(s);
      for (let i = 0; i < k; i++) {
        const bright = rnd() < 0.14 ? 7 : 0, j = isDead ? 5 : 13;
        const c = [b[0] + (rnd() - 0.5) * 9, Math.max(0, Math.min(100, b[1] + (rnd() - 0.5) * 10)), Math.max(6, Math.min(88, b[2] + (rnd() - 0.5) * j + bright))];
        out += `<path d="${sector(s.a0 + (s.a1 - s.a0) * i / k, s.a0 + (s.a1 - s.a0) * (i + 1) / k, band[0], band[1])}" fill="${css(c)}"/>`;
      }
    }));
    return out;
  }

  const ORDER = CH.traditions.filter(t => node[t.id]).map(t => t.id);     // living tree, parents first
  const ISLES = Object.keys(ISLE);
  const LABEL = { "eastern-catholic": "Eastern Catholic", orthodox: "Eastern Orthodox", catholic: "Roman Catholic", hussite: "Moravian", anabaptist: "Mennonite", congregationalist: "Congregational", charismatic: "Charismatic", aic: "African-initiated", restoration: "Restoration Movement", quaker: "Quaker", unitarian: "Unitarian", waldensian: "Waldensian", hutterite: "Hutterite" };
  const label = id => LABEL[id] || T[id].short;
  const lineage = id => { const out = []; let n = T[id]; while (n) { out.unshift(n.id); n = T[n.parent]; } return out; };
  const descendants = id => { const out = []; (function go(x) { CH.traditions.forEach(t => { if (t.parent === x) { out.push(t.id); go(t.id); } }); })(id); return out; };

  function threads() {
    let out = "";
    CH.traditions.forEach(t => (t.links || []).forEach(l => {
      if (!T[l.to] || (!node[l.to] && !ISLE[l.to])) return;
      const a1 = midAngle(t.id), a2 = midAngle(l.to);
      const r1 = Math.max(rad(l.year), rad(t.start) + 5), r2 = Math.max(rad(l.year), rad(T[l.to].start) + 5);
      let da = a2 - a1; if (da > 180) da -= 360; if (da < -180) da += 360;
      const rc = Math.min(r1, r2) * (1 - Math.min(0.45, Math.abs(da) / 260));
      out += `<g class="thread" data-a="${t.id}" data-b="${l.to}"><path d="M${pt(a1, r1)}Q${pt(a1 + da / 2, rc)} ${pt(a2, r2)}"/><circle cx="${pt(a1, r1).split(" ")[0]}" cy="${pt(a1, r1).split(" ")[1]}" r="3"/><circle cx="${pt(a2, r2).split(" ")[0]}" cy="${pt(a2, r2).split(" ")[1]}" r="3"/></g>`;
    }));
    return out;
  }

  /* the stone rim: a ring whose inner edge is an arcade of small round arches, one or more per slice */
  function rim() {
    const rb = R - 15, rs = R - 8, g = 0.5;
    const owns = ORDER.filter(id => node[id].own && !T[id].end).map(id => node[id].own).sort((x, y) => x[0] - y[0]);
    let d = "", first = true;
    owns.forEach(o => {
      const n = arcadeN({ a0: o[0], a1: o[1] });
      for (let i = 0; i < n; i++) {
        const a = o[0] + (o[1] - o[0]) * i / n + g, b = o[0] + (o[1] - o[0]) * (i + 1) / n - g;
        const chord = 2 * rs * Math.sin((b - a) / 2 * D2R);
        d += (first ? "M" : "L") + pt(a, rb) + `L${pt(a, rs)}A${(chord / 2).toFixed(1)} 7 ${((a + b) / 2).toFixed(1)} 0 1 ${pt(b, rs)}L${pt(b, rb)}`;
        first = false;
      }
    });
    const ro = R + 12;
    return `<path class="stone" fill-rule="evenodd" d="M0 ${-ro}A${ro} ${ro} 0 1 1 0 ${ro}A${ro} ${ro} 0 1 1 0 ${-ro}Z${d}Z"/><circle class="rimline" r="${ro}"/><circle class="rimline thin" r="${ro + 5}"/>`;
  }

  let uid = 0;
  function render(host, opts) {
    opts = opts || {};
    const wide = !!opts.wide, half = wide ? 582 : R + 19, lx = wide ? 506 : 433, k = ++uid;
    let glass = "", lead = "", labels = "";
    ORDER.concat(ISLES).forEach(id => {
      const reg = region(id), isle = !!ISLE[id];
      glass += `<g class="pane${isle ? " isle" : ""}" data-pane="${id}">${cells(id, reg)}</g>`;
      lead += `<path class="lead${isle ? " isle" : ""}" data-id="${id}" d="${outline(reg)}" tabindex="-1"><title>${T[id].name}</title></path>`;
    });
    if (wide) ORDER.forEach(id => {
      const n = node[id];
      if (!n.own || T[id].end) return;
      const a = (n.own[0] + n.own[1]) / 2, left = a > 180, p = pt(a, R + 26).split(" ");
      labels += `<text class="lab" data-id="${id}" transform="translate(${p[0]} ${p[1]}) rotate(${(left ? a + 90 : a - 90).toFixed(1)})" text-anchor="${left ? "end" : "start"}" dy=".34em">${label(id)}</text>`;
    });
    const rings = RINGS.map(y => `<circle class="ring" r="${rad(y).toFixed(1)}"/>`).join("");
    const ringLabels = wide ? RINGS.map((y, i) => { const x = (i % 2 ? -1 : 1) * rad(y); return `<g class="ringlab" transform="translate(${x.toFixed(1)} 0) scale(1.42)"><rect x="-17" y="-8.5" width="34" height="17" rx="2"/><text dy=".35em" text-anchor="middle">${y}</text></g>`; }).join("") : "";
    const ldsC = base(T[LDS]);
    host.innerHTML = `<svg class="rose${wide ? " wide" : ""}" viewBox="${-half} ${-half} ${half * 2} ${half * 2}" role="img" aria-label="A rose window of church history. The center is the year 30 and the rim is today. Each colored pane is a tradition.">
      <defs>
        <radialGradient id="rwl${k}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${R}"><stop offset="0" stop-color="#fff3cf" stop-opacity=".62"/><stop offset=".3" stop-color="#ffe9b8" stop-opacity=".2"/><stop offset=".62" stop-color="#ffe9b8" stop-opacity="0"/><stop offset=".86" stop-color="#000010" stop-opacity="0"/><stop offset="1" stop-color="#000010" stop-opacity=".42"/></radialGradient>
        <radialGradient id="rwh${k}"><stop offset="0" stop-color="#fff6d8"/><stop offset=".55" stop-color="#f6c64a"/><stop offset="1" stop-color="#b9791a"/></radialGradient>
        <filter id="rwg${k}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0.03  0 0 0 -1.5 0.92"/></filter>
        <clipPath id="rwc${k}"><circle r="${R}"/></clipPath>
      </defs>
      <circle class="backing" r="${R + 2}"/>
      <g class="glass">${glass}</g>
      <g class="lightfx" clip-path="url(#rwc${k})"><rect x="${-R}" y="${-R}" width="${R * 2}" height="${R * 2}" filter="url(#rwg${k})" class="grain"/><circle r="${R}" fill="url(#rwl${k})" class="glow"/></g>
      <g class="rings">${rings}</g>
      <g class="leads">${lead}</g>
      <g class="threads">${threads()}</g>
      <circle class="shade" r="${R}" fill="none"/>
      <path class="hl hov" d=""/><path class="hl selp" d=""/>
      ${rim()}
      <g class="hub" data-id="early"><circle r="${R0 - 1.5}" fill="url(#rwh${k})"/><path d="M0 ${-R0 + 2}V${R0 - 2}M${-R0 + 2} 0H${R0 - 2}"/><circle r="15" class="eye"/><text dy=".36em" text-anchor="middle">30</text></g>
      <g class="ringlabs">${ringLabels}</g>
      <g class="labels">${labels}</g>
      <g class="lds" data-id="${LDS}" transform="translate(${lx} ${lx})"><circle r="33" class="lds-stone"/><g class="pane" data-pane="${LDS}"><path d="M0 -27A27 27 0 0 1 27 0H0Z" fill="${css([ldsC[0], ldsC[1], ldsC[2] + 5])}"/><path d="M27 0A27 27 0 0 1 0 27V0Z" fill="${css([ldsC[0], ldsC[1], ldsC[2] - 5])}"/><path d="M0 27A27 27 0 0 1 -27 0H0Z" fill="${css(ldsC)}"/><path d="M-27 0A27 27 0 0 1 0 -27V0Z" fill="${css([ldsC[0], ldsC[1], ldsC[2] - 9])}"/></g><circle r="27" class="lead" data-id="${LDS}"><title>Latter-day Saints</title></circle>${wide ? `<text class="lab" y="50" text-anchor="middle">Latter-day Saints</text>` : ""}</g>
    </svg>`;
    const svg = host.firstElementChild, shade = svg.querySelector(".shade");
    const paneEls = {}, leadEls = {};
    svg.querySelectorAll("[data-pane]").forEach(g => (paneEls[g.dataset.pane] = g));
    svg.querySelectorAll(".lead[data-id]").forEach(p => (leadEls[p.dataset.id] = p));
    const hov = svg.querySelector(".hov"), selp = svg.querySelector(".selp");
    svg.addEventListener("pointerover", e => { const l = e.target.closest && e.target.closest("path.lead"); hov.setAttribute("d", l && e.pointerType === "mouse" ? l.getAttribute("d") : ""); });
    svg.addEventListener("pointerleave", () => hov.setAttribute("d", ""));
    function light(on, anc, desc) {
      const any = on && on.length;
      selp.setAttribute("d", any && on.length === 1 && leadEls[on[0]] && leadEls[on[0]].getAttribute("d") || "");
      svg.classList.toggle("sel", !!any);
      const set = (els, cls, ids) => Object.keys(els).forEach(id => els[id].classList.toggle(cls, !!ids && ids.indexOf(id) >= 0));
      set(paneEls, "on", on); set(paneEls, "anc", anc); set(paneEls, "desc", desc);
      set(leadEls, "on", on);
      svg.querySelectorAll(".lab[data-id]").forEach(t => t.classList.toggle("on", !!any && on.indexOf(t.dataset.id) >= 0));
      svg.querySelectorAll(".thread").forEach(t => t.classList.toggle("on", !!any && (on.indexOf(t.dataset.a) >= 0 || on.indexOf(t.dataset.b) >= 0)));
      svg.querySelector(".hub").classList.toggle("off", !!any && (on.concat(anc || []).indexOf("early") < 0));
    }
    return {
      el: svg,
      select(id) { if (!id || !T[id]) return light(null); const l = lineage(id); light([id], l.slice(0, -1), descendants(id)); },
      light: ids => light(ids && ids.length ? ids : null),
      setYear(y) {
        const r = rad(y), full = y >= NOW;
        shade.style.display = full ? "none" : "";
        shade.setAttribute("r", ((r + R) / 2).toFixed(1));
        shade.setAttribute("stroke-width", (R - r).toFixed(1));
        svg.querySelector(".lds").classList.toggle("unlit", y < T[LDS].start);
      }
    };
  }

  /* A small window with only some panes lit. Used to show who holds a reading. */
  function mini(lit, opts) {
    opts = opts || {};
    lit = lit || [];
    const half = R + 16, is = id => lit.indexOf(id) >= 0;
    let panes = "";
    ORDER.concat(ISLES).forEach(id => {
      panes += `<path d="${outline(region(id))}" ${is(id) ? `class="lit" style="fill:${colorOf(id)}"` : `style="fill:color-mix(in srgb,${colorOf(id)} 15%,#14121c)"`}/>`;
    });
    const lx = 430;
    return `<svg class="minirose" viewBox="${-half} ${-half} ${half * 2} ${half * 2}" role="img" aria-label="${opts.label || "The window, with some panes lit"}"><circle r="${R + 10}" class="mr-stone"/><g>${panes}</g><circle r="${R0 - 3}" class="mr-hub${is("early") ? " lit" : ""}"/><circle cx="${lx}" cy="${lx}" r="26" class="mr-lds" ${is(LDS) ? `style="fill:${colorOf(LDS)}"` : ""}/></svg>`;
  }

  CH.rose = { R: R, R0: R0, NOW: NOW, rad: rad, yearAt: yearAt, GLASS: GLASS, colorOf: colorOf, label: label, lineage: lineage, descendants: descendants, render: render, mini: mini, node: node, isles: ISLES };
})();
