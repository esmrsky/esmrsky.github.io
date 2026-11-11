/* The family tree: time runs left to right, every tradition is a line that
   leaves its parent at the year of the split. Drawn as one SVG. */
(function () {
  const CH = window.CH;
  const END = 2026;
  // [from, to, pixels per year]. The crowded centuries get more room.
  const SEGS = [[30, 1000, 1.15], [1000, 1500, 1.3], [1500, 1700, 5], [1700, 1900, 3.6], [1900, END, 5]];
  const MARKS = [[325, "Nicaea"], [451, "Chalcedon"], [1054, "East–West Schism"], [1517, "Ninety-five Theses"], [1648, "Peace of Westphalia"], [1906, "Azusa Street"]];

  function span(y, k) {
    let x = 0;
    for (const [a, b, r] of SEGS) { if (y <= a) break; x += (Math.min(y, b) - a) * r * k; }
    return x;
  }
  function yearAt(px, k) {
    let lo = 30, hi = END;
    for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2; if (span(m, k) < px) lo = m; else hi = m; }
    return (lo + hi) / 2;
  }
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function render(host, opts) {
    opts = opts || {};
    const mini = !!opts.mini;
    const nodes = CH.traditions.slice().sort((a, b) => a.start - b.start);
    const byId = {}; nodes.forEach(n => (byId[n.id] = n));
    const lanes = nodes.map(n => n.lane), minLane = Math.min.apply(null, lanes), maxLane = Math.max.apply(null, lanes);
    const LH = mini ? 9 : 28, padL = mini ? 6 : 44, padR = mini ? 6 : 270, top = mini ? 22 : 70, bottom = mini ? 6 : 62;
    const k = mini ? Math.max(0.12, (host.clientWidth - padL - padR) / span(END, 1)) : (opts.zoom || 1);
    const X = y => padL + span(y, k), Y = lane => top + (lane - minLane) * LH;
    const W = X(END) + padR, H = Y(maxLane) + bottom;
    const color = n => CH.families[n.family].color;

    // Layout: where each line leaves its parent (xs) and where it settles on its own row (xe).
    const L = {};
    nodes.forEach(n => {
      const y = Y(n.lane), p = n.parent && L[n.parent];
      let xs = X(n.start), xe = xs;
      if (p) {
        const dl = Math.abs(n.lane - byId[n.parent].lane);
        xs = Math.max(xs, p.xe + (mini ? 1 : 3));
        xe = xs + (mini ? Math.min(4 + dl * 1.2, 24) : Math.min(18 + dl * 5, 120));
      }
      const xEnd = Math.max(X(n.end || END), xe + (mini ? 4 : 14));
      L[n.id] = { n, y, xs, xe, xEnd, py: p ? p.y : y };
    });
    const curve = (x0, y0, x1, y1) => { const m = (x0 + x1) / 2; return `M${x0.toFixed(1)},${y0}C${m.toFixed(1)},${y0} ${m.toFixed(1)},${y1} ${x1.toFixed(1)},${y1}`; };

    let s = "";
    // Era bands and names
    CH.eras.forEach((e, i) => {
      const x0 = X(e.from), x1 = X(e.to);
      s += `<rect class="band b${i % 2}" x="${x0.toFixed(1)}" y="0" width="${(x1 - x0).toFixed(1)}" height="${H}"/>`;
      if (!mini) s += `<text class="era-name" x="${(x0 + 10).toFixed(1)}" y="${H - 10}">${esc(e.name)}</text>`;
    });
    // Year grid
    const ticks = [];
    if (mini) ticks.push(30, 451, 1054, 1517, 1700, 1900, END);
    else { for (let y = 100; y <= 1500; y += 100) ticks.push(y); for (let y = 1550; y <= 2000; y += 50) ticks.push(y); }
    ticks.forEach(y => {
      const x = X(y).toFixed(1);
      s += `<line class="grid" x1="${x}" x2="${x}" y1="${mini ? 14 : top - 20}" y2="${H - (mini ? 2 : bottom - 12)}"/>`;
      s += `<text class="tick" x="${x}" y="${mini ? 10 : top - 27}" text-anchor="${mini && y === END ? "end" : mini && y === 30 ? "start" : "middle"}">${y}</text>`;
      if (!mini) s += `<text class="tick" x="${x}" y="${H - bottom + 30}" text-anchor="middle">${y}</text>`;
    });
    if (!mini) MARKS.forEach(([y, label]) => {
      const x = X(y);
      s += `<line class="mark-line" x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="22" y2="${H - bottom + 12}"/>`;
      s += `<text class="mark-text" x="${(x + 5).toFixed(1)}" y="17">${y} · ${esc(label)}</text>`;
    });
    // Dashed ties between branches
    nodes.forEach(n => (n.links || []).forEach(l => {
      const a = L[n.id], b = L[l.to]; if (!b) return;
      let d;
      if (l.year <= n.start) d = curve(a.xs, b.y, a.xe, a.y);
      else { const x = X(l.year), dl = Math.abs(n.lane - b.n.lane); d = curve(x, a.y, x + (mini ? 8 : Math.min(18 + dl * 5, 120)), b.y); }
      s += `<path class="lk" data-own="${n.id}" data-to="${l.to}" style="--c:${color(n)}" d="${d}"><title>${esc(l.note)}</title></path>`;
    }));
    // Branches
    nodes.forEach(n => {
      const a = L[n.id];
      const d = (n.parent ? curve(a.xs, a.py, a.xe, a.y) : `M${a.xs.toFixed(1)},${a.y}`) + `H${a.xEnd.toFixed(1)}`;
      const yrs = n.id === "early" ? "c. 30" : n.end ? `${n.start}–${n.end}` : `${n.start}`;
      s += `<g class="br k-${n.kind}" data-id="${n.id}" style="--c:${color(n)}"${mini ? "" : ` tabindex="0" role="button" aria-label="${esc(n.name)}, ${yrs}"`}>`;
      if (!mini) s += `<path class="hit" d="${d}"/>`;
      s += `<path class="ln" d="${d}"/>`;
      if (!mini) {
        s += n.parent ? `<circle class="dot" cx="${a.xs.toFixed(1)}" cy="${a.py}" r="3.2"/>` : `<circle class="dot open" cx="${a.xs.toFixed(1)}" cy="${a.y}" r="4"/>`;
        s += n.end ? `<path class="cap" d="M${a.xEnd.toFixed(1)},${a.y - 4}v8"/>` : `<circle class="dot" cx="${a.xEnd.toFixed(1)}" cy="${a.y}" r="2.6"/>`;
        s += `<text class="lb" x="${(a.xe + 7).toFixed(1)}" y="${a.y - 7}">${esc(n.short)} <tspan class="yr">${yrs}</tspan></text>`;
        // Long lines repeat their name so you never lose track while scrolling.
        const tail = n.short.replace(/^.*\u2192 /, "");
        for (let x = a.xe + 820; x < a.xEnd - 260; x += 820) s += `<text class="lb again" x="${x.toFixed(1)}" y="${a.y - 7}">${esc(tail)}</text>`;
        if (!n.end) s += `<text class="lb at-end" x="${(a.xEnd + 10).toFixed(1)}" y="${a.y + 4}">${esc(tail)}</text>`;
      }
      s += `</g>`;
    });

    host.innerHTML = `<div class="tree-scroll${mini ? " mini" : ""}"><svg class="tree-svg" width="${W.toFixed(0)}" height="${H}" viewBox="0 0 ${W.toFixed(0)} ${H}" role="${mini ? "img" : "group"}" aria-label="Family tree of Christian traditions from the year 30 to today">${s}</svg></div>`;
    const scroller = host.firstChild, svg = scroller.firstChild;
    if (mini) return {};

    const lineage = id => { const out = []; let n = byId[id]; while (n) { out.push(n.id); n = byId[n.parent]; } return out; };
    const descendants = id => { const out = [], walk = p => nodes.forEach(c => { if (c.parent === p) { out.push(c.id); walk(c.id); } }); walk(id); return out; };
    let selected = null;
    function paint(id) {
      svg.classList.toggle("dim", !!id);
      const up = id ? lineage(id) : [], down = id ? descendants(id) : [];
      svg.querySelectorAll(".br").forEach(g => {
        const gid = g.dataset.id;
        g.classList.toggle("hl", up.indexOf(gid) >= 0);
        g.classList.toggle("hl2", down.indexOf(gid) >= 0);
        g.classList.toggle("sel", gid === id);
      });
      svg.querySelectorAll(".lk").forEach(p => p.classList.toggle("hl", !!id && (p.dataset.own === id || p.dataset.to === id)));
    }
    let dragged = false;
    svg.addEventListener("mouseover", e => { const g = e.target.closest(".br"); if (g) paint(g.dataset.id); });
    svg.addEventListener("mouseleave", () => paint(selected));
    svg.addEventListener("mouseout", e => { if (e.target.closest(".br") && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".br"))) paint(selected); });
    function pick(id) { selected = id; paint(id); if (opts.onSelect) opts.onSelect(id); }
    svg.addEventListener("click", e => { if (dragged) return; const g = e.target.closest(".br"); pick(g ? g.dataset.id : null); });
    svg.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.closest(".br")) { e.preventDefault(); pick(e.target.closest(".br").dataset.id); } });

    // Drag to pan with a mouse; touch and trackpads scroll natively.
    let drag = null;
    scroller.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button) return; drag = { x: e.clientX, left: scroller.scrollLeft }; dragged = false; });
    window.addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) { dragged = true; scroller.classList.add("dragging"); } if (dragged) scroller.scrollLeft = drag.left - dx; });
    window.addEventListener("pointerup", () => { drag = null; scroller.classList.remove("dragging"); setTimeout(() => (dragged = false), 0); });

    return {
      zoom: k,
      select(id) { selected = id; paint(id); },
      toYear(y, smooth) { scroller.scrollTo({ left: Math.max(0, X(y) - 60), behavior: smooth ? "smooth" : "auto" }); },
      centerYear() { return yearAt(scroller.scrollLeft + scroller.clientWidth / 2 - padL, k); },
      centerOn(y) { scroller.scrollLeft = Math.max(0, X(y) - scroller.clientWidth / 2); },
      reveal(id) { const a = L[id]; if (a) scroller.scrollLeft = Math.max(0, a.xs - scroller.clientWidth * 0.35); }
    };
  }

  CH.tree = { render };
})();
