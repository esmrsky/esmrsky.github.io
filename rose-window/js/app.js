/* Rose Window: panels, sections and routing. The window itself is drawn by window.js. */
(function () {
  "use strict";
  const CH = window.CH, RW = CH.rose;
  const T = {}, P = {}, C = {}, D = {};
  CH.traditions.forEach(t => (T[t.id] = t));
  CH.people.forEach(p => (P[p.id] = p));
  CH.councils.forEach(c => (C[c.id] = c));
  CH.debates.forEach(d => (D[d.id] = d));
  CH.events.forEach(e => { e.people = e.people || []; e.tags = e.tags || []; });
  CH.debates.forEach(d => { d.people = d.people || []; d.councils = d.councils || []; });
  CH.images = CH.images || {};
  CH.verses = CH.verses || {};

  /* ───────── helpers ───────── */
  /* Fade a layer in. The class comes off on a timer, so a frozen animation clock can never leave it invisible. */
  function fade(el) { el.classList.add("fade"); clearTimeout(el._ft); el._ft = setTimeout(() => el.classList.remove("fade"), 320); }
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const smart = s => esc(s)
    .replace(/(^|[\s(\[“\u2014-])'/g, "$1‘").replace(/'/g, "’")
    .replace(/(^|[\s(\[])&quot;/g, "$1“").replace(/&quot;/g, "”");
  const col = id => RW.colorOf(id);
  const famCol = f => RW.GLASS[f];
  const years = t => (t.id === "early" ? "c. 30 to 1054" : t.end ? `${t.start} to ${t.end}` : `${t.start} to today`);
  const kids = id => CH.traditions.filter(t => t.parent === id).sort((a, b) => a.start - b.start);
  const ERA_FIX = { 1054: "early-medieval", 1648: "reformation" };
  const eraOf = y => CH.eras.find(e => e.id === ERA_FIX[y]) || CH.eras.find(e => y >= e.from && y < e.to) || CH.eras[CH.eras.length - 1];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  const wide = () => window.innerWidth >= 1080;

  /* Wikimedia serves fixed thumbnail steps; a 60px medallion should not pull a 500px file. */
  const thumb = (src, px) => (px ? src.replace(/\/(\d+)px-/, (m, n) => (+n > px ? `/${px}px-` : m)) : src);
  function pic(title, alt, big, px) {
    const im = CH.images[title];
    if (!im) return "";
    return `<img src="${esc(thumb(im.src, px))}" alt="${esc(alt || "")}" loading="lazy" decoding="async" width="${im.w}" height="${im.h}" onerror="this.parentNode.classList.add('noimg');this.remove()">`;
  }
  function credit(title) {
    const im = CH.images[title];
    if (!im) return "";
    const by = [im.by, im.lic].filter(Boolean).join(", ") || "Wikimedia Commons";
    return `<a class="credit" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">Image: ${esc(by)}</a>`;
  }
  const initials = n => n.replace(/\b(of|the|and|von|à)\b/g, "").split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("");
  const med = (p, cls) => `<span class="med ${cls || ""}${CH.images[p.w] ? "" : " noimg"}" style="--c:${p.t && T[p.t] ? col(p.t) : "#8f8672"}" data-i="${esc(initials(p.n))}">${pic(p.w, "", false, 120)}</span>`;
  const pBtn = id => (P[id] ? `<a class="pm" href="#/p/${id}">${med(P[id])}<span class="pm-n">${smart(P[id].n)}</span></a>` : "");
  const tBtn = (id, text) => (T[id] ? `<a class="tb" href="#/t/${id}" style="--c:${col(id)}"><i></i>${smart(text || RW.label(id))}</a>` : "");

  /* pointed arch: the top edge of every lancet. k is rise over width. */
  function archPath(k) {
    const c = (0.25 + k * k) * 100, K = k * 100;
    return `M0 ${K}A${c} ${c} 0 0 1 50 0A${c} ${c} 0 0 1 100 ${K}`;
  }
  function archPoly(k, frac) {
    frac = frac || 1;
    const c = 0.25 + k * k, fm = Math.acos((c - 0.5) / c), pts = [];
    for (let i = 0; i <= 14; i++) { const f = fm * i / 14; pts.push([(c - c * Math.cos(f)) * 100, frac * (1 - (c * Math.sin(f)) / k) * 100]); }
    const right = pts.slice(0, -1).reverse().map(p => [100 - p[0], p[1]]);
    const all = (frac < 1 ? [[0, 100]] : []).concat(pts, right, frac < 1 ? [[100, 100]] : []);
    return "polygon(" + all.map(p => p[0].toFixed(2) + "% " + Math.max(0, p[1]).toFixed(2) + "%").join(",") + ")";
  }
  const KH = 0.64, KS = 0.52;
  document.documentElement.style.setProperty("--arch", archPoly(KH));
  document.documentElement.style.setProperty("--arch-s", archPoly(KS));
  document.documentElement.style.setProperty("--arch-t", archPoly(KH, 0.5));
  const tall = inner => `<div class="lz-head tall">${inner}<svg class="arch-line" viewBox="0 0 100 ${KH * 200}" preserveAspectRatio="none" aria-hidden="true"><path d="M0 ${KH * 200}V${KH * 100}${archPath(KH).slice(archPath(KH).indexOf("A"))}V${KH * 200}Z" vector-effect="non-scaling-stroke"/></svg></div>`;
  const archLine = k => `<svg class="arch-line" viewBox="0 0 100 ${k * 100}" preserveAspectRatio="none" aria-hidden="true"><path d="${archPath(k)}" vector-effect="non-scaling-stroke"/></svg>`;
  const head = (inner, cls) => `<div class="lz-head ${cls || ""}">${inner}${archLine(KH)}</div>`;

  /* eased disclosure */
  let discN = 0;
  function disc(label, body, cls) {
    const id = "d" + (++discN);
    return `<div class="disc ${cls || ""}"><button type="button" class="disc-b" aria-expanded="false" aria-controls="${id}"><span>${label}</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="disc-w" id="${id}"><div class="disc-i" inert>${body}</div></div></div>`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest(".disc-b");
    if (!b) return;
    const d = b.parentNode, open = !d.classList.contains("open");
    d.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open);
    const inner = $(".disc-i", d);
    if (open) inner.removeAttribute("inert"); else inner.setAttribute("inert", "");
  });

  /* ───────── translations and verses ───────── */
  const TR = {
    NIV: ["NIV", "New International Version"], NASB: ["NASB", "New American Standard Bible, 1995"],
    NLT: ["NLT", "New Living Translation"], TPT: ["TPT", "The Passion Translation"],
    KJV: ["KJV", "King James Version"], DRA: ["Douay-Rheims", "Douay-Rheims Bible"]
  };
  const TR_ORDER = ["NIV", "NASB", "NLT", "TPT", "KJV"];
  const TR_HAVE = TR_ORDER.filter(t => Object.keys(CH.verses).some(k => CH.verses[k][t]));
  let curTr = store.get("vb.tr");
  if (TR_HAVE.indexOf(curTr) < 0) curTr = TR_HAVE[0];
  const prettyRef = r => esc(r.replace(/^Psalms /, "Psalm ").replace(/^Jude 1:/, "Jude ").replace(/-/g, "–"));
  function verse(p, cls) {
    const data = CH.verses[p.t ? p.ref + "|" + p.t : p.ref];
    if (!data) return `<figure class="verse ${cls || ""}"><figcaption><span class="ref">${prettyRef(p.ref)}</span></figcaption></figure>`;
    const have = p.t ? Object.keys(data) : TR_ORDER.filter(t => data[t]);
    const use = have.indexOf(curTr) >= 0 ? curTr : have[0];
    const tabs = have.length > 1
      ? `<span class="trs" role="group" aria-label="Translation">${have.map(t => `<button type="button" data-tr="${t}" class="${t === use ? "on" : ""}" title="${esc(TR[t][1])}" aria-pressed="${t === use}">${TR[t][0]}</button>`).join("")}</span>`
      : `<span class="trs"><span class="only" title="${esc(TR[use][1])}">${TR[use][0]}</span></span>`;
    const body = data[use].map(v => `<sup>${v[1]}</sup>${smart(v[2])}`).join(" ");
    const len = data[use].reduce((n, v) => n + v[2].length, 0);
    return `<figure class="verse ${cls || ""} ${len > 620 ? "long" : len > 330 ? "mid" : ""}"><blockquote>${body}</blockquote><figcaption><span class="ref">${prettyRef(p.ref)}</span>${tabs}</figcaption>${p.note ? `<p class="vnote">${smart(p.note)}</p>` : ""}</figure>`;
  }

  /* ───────── the window ───────── */
  const roseHost = $("#rose");
  let rose = null, selId = null, litFam = null, curYear = RW.NOW, roseWide = null;
  function drawRose() {
    roseWide = window.innerWidth >= 760;
    rose = RW.render(roseHost, { wide: roseWide });
    if (selId) rose.select(selId);
    rose.setYear(curYear);
  }
  drawRose();
  window.addEventListener("resize", () => { if ((window.innerWidth >= 760) !== roseWide) drawRose(); });

  roseHost.addEventListener("click", e => {
    const el = e.target.closest("[data-id]");
    if (!el) return;
    const id = el.dataset.id;
    location.hash = selId === id ? "#/" : "#/t/" + id;
  });
  const tip = $("#tip");
  roseHost.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const el = e.target.closest("[data-id]");
    if (!el) { tip.hidden = true; return; }
    const t = T[el.dataset.id];
    tip.innerHTML = `<b style="--c:${col(t.id)}">${smart(t.name)}</b><span>${years(t)}</span>`;
    tip.hidden = false;
    const x = Math.min(e.clientX + 16, window.innerWidth - tip.offsetWidth - 8);
    tip.style.left = x + "px"; tip.style.top = e.clientY + 18 + "px";
  });
  roseHost.addEventListener("pointerleave", () => (tip.hidden = true));

  /* time */
  const KEYS = CH.events.map((e, i) => ({ e: e, i: i })).filter(x => x.e.k).sort((a, b) => a.e.y - b.e.y);
  const time = $("#time"), yrNum = $("#yrNum"), yrEra = $("#yrEra"), yrCap = $("#yrCap"), playBtn = $("#play");
  let capIdx = -1;
  function onTime() {
    const v = +time.value;
    curYear = v >= 1000 ? RW.NOW : Math.round(RW.yearAt(RW.R0 + (RW.R - RW.R0) * v / 1000));
    rose.setYear(curYear);
    yrNum.textContent = curYear;
    yrEra.textContent = eraOf(Math.min(curYear, 2025)).name;
    let k = KEYS[0];
    KEYS.forEach(x => { if (x.e.y <= curYear) k = x; });
    capIdx = k.i;
    yrCap.innerHTML = `<b>${k.e.y}</b>${smart(k.e.t)}`;
    time.style.setProperty("--p", v / 10 + "%");
  }
  time.addEventListener("input", () => { stop(); onTime(); });
  yrCap.addEventListener("click", () => (location.hash = "#/e/" + capIdx));
  let timer = null;
  function stop() { if (timer) clearInterval(timer); timer = null; playBtn.classList.remove("on"); playBtn.setAttribute("aria-label", "Play the window from the year 30"); }
  playBtn.addEventListener("click", () => {
    if (timer) return stop();
    if (+time.value >= 1000) time.value = 0;
    playBtn.classList.add("on"); playBtn.setAttribute("aria-label", "Pause");
    onTime();
    timer = setInterval(() => { time.value = Math.min(1000, +time.value + 3); onTime(); if (+time.value >= 1000) stop(); }, 50);
  });
  onTime();

  /* zoom, for small screens */
  const zoomBtn = $("#zoom"), roseWrap = $("#roseWrap");
  zoomBtn.addEventListener("click", () => {
    const on = !roseWrap.classList.contains("zoomed");
    roseWrap.classList.toggle("zoomed", on);
    zoomBtn.textContent = on ? "Zoom out" : "Zoom in";
    zoomBtn.setAttribute("aria-pressed", on);
    if (on) { roseWrap.scrollLeft = (roseWrap.scrollWidth - roseWrap.clientWidth) / 2; roseWrap.scrollTop = (roseWrap.scrollHeight - roseWrap.clientHeight) / 2; }
  });

  /* ───────── intro lancet ───────── */
  $("#intro").innerHTML = `
    ${head(`<div class="lz-img scene">${pic("Chartres Cathedral", "Chartres Cathedral", true)}</div>`)}
    <div class="lz-body">
      <p class="kick">Church history in stained glass</p>
      <h1>Rose Window</h1>
      <p class="lede">Two thousand years, read from the center out.</p>
      <ol class="how">
        <li><i class="k1"></i><span>The gold center is the year 30. Each ring outward is later. The rim is today.</span></li>
        <li><i class="k2"></i><span>Each color is a family of churches. A pane begins on the ring where that church begins.</span></li>
        <li><i class="k3"></i><span>The line at the top is 1054. East falls to the right of it, West to the left.</span></li>
        <li><i class="k4"></i><span>Smoky glass is a branch that died out. Dashed gold threads show influence.</span></li>
      </ol>
      <p class="tap">Tap any pane to light its line back to the center.</p>
      <p class="fine">Pane widths show descent, not size. ${credit("Chartres Cathedral")}</p>
    </div>`;

  /* ───────── tradition panel ───────── */
  const panel = $("#panel"), intro = $("#intro"), scrim = $("#scrim");
  const sidesOf = id => CH.debates.map(d => { const p = d.positions.find(x => x.held.indexOf(id) >= 0); return p ? { d: d, p: p } : null; }).filter(Boolean);
  function tradHTML(t) {
    const line = RW.lineage(t.id), sides = sidesOf(t.id), ch = kids(t.id);
    const evs = CH.events.map((e, i) => ({ e: e, i: i })).filter(x => x.e.tags.indexOf(t.id) >= 0);
    const hasImg = t.w && CH.images[t.w];
    const more = `
      <dl class="facts"><div><dt>Begins</dt><dd>${smart(t.founded)}</dd></div><div><dt>Size</dt><dd>${smart(t.size)}</dd></div>${t.from ? `<div><dt>Breaks from its parent</dt><dd>${smart(t.from)}</dd></div>` : ""}</dl>
      ${t.marks.length > 3 ? `<h4>Also marks it</h4><ul class="marks">${t.marks.slice(3).map(m => `<li>${smart(m)}</li>`).join("")}</ul>` : ""}
      <h4>How it began</h4><p>${smart(t.origins)}</p>
      <h4>Who they are today</h4><p>${smart(t.bodies)}</p>
      ${ch.length ? `<h4>Branches from this pane</h4><p class="tbs">${ch.map(c => tBtn(c.id, RW.label(c.id) + ", " + c.start)).join("")}</p>` : ""}
      ${(t.links || []).length ? `<h4>Threads to other panes</h4><ul class="plain">${t.links.map(l => `<li>${tBtn(l.to)} <span>${l.year}. ${smart(l.note)}</span></li>`).join("")}</ul>` : ""}
      ${t.stance ? `<h4>Where it stands</h4><dl class="stance">${CH.stanceTopics.map(k => `<div><dt>${esc(k[1])}</dt><dd>${smart(t.stance[k[0]])}</dd></div>`).join("")}</dl>` : ""}
      ${evs.length ? `<h4>Moments</h4><p class="mos">${evs.map(x => `<a class="mo" href="#/e/${x.i}"><b>${x.e.y}</b>${smart(x.e.t)}</a>`).join("")}</p>` : ""}`;
    return `
      <button type="button" class="x" data-close aria-label="Close and show the whole window"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      ${head(hasImg ? `<div class="lz-img">${pic(t.w, t.name, true)}</div>` : `<div class="lz-rose">${RW.mini(line)}</div>`)}
      <div class="lz-body" style="--c:${col(t.id)}">
        <p class="kick"><i class="sw"></i>${esc(CH.families[t.family].name)}</p>
        <h2>${smart(t.name)}</h2>
        <p class="when">${years(t)}${t.end && t.id !== "early" ? " · no longer exists" : ""}</p>
        <p class="lede">${smart(t.blurb)}</p>
        ${line.length > 1 ? `<p class="line" aria-label="Line back to the center">${line.map((id, i) => `<span class="ln">${i ? '<b aria-hidden="true">›</b>' : ""}${tBtn(id)}</span>`).join("")}</p>` : t.id === "lds" ? `<p class="fine">Set apart from the window. It has no parent pane: it claims to be the original church restored, not a branch of a later one.</p>` : ""}
        <ul class="marks">${t.marks.slice(0, 3).map(m => `<li>${smart(m)}</li>`).join("")}</ul>
        ${t.people.length ? `<div class="pms">${t.people.map(pBtn).join("")}</div>` : ""}
        ${sides.length ? disc(`Texts where it takes a side <em>${sides.length}</em>`, `<ul class="sides">${sides.map(s => `<li><a href="#/text/${s.d.id}"><b>${smart(s.d.title)}</b><span>${smart(s.p.name)}</span></a></li>`).join("")}</ul>`) : ""}
        ${disc("More about this pane", more)}
        ${hasImg ? `<p class="fine">${credit(t.w)}</p>` : ""}
      </div>`;
  }
  function openTrad(id) {
    selId = id; litFam = null;
    rose.select(id);
    panel.innerHTML = tradHTML(T[id]);
    panel.hidden = false; panel.scrollTop = 0; fade(panel);
    intro.classList.add("gone");
    document.body.classList.add("has-sel");
    scrim.hidden = false;
    $$("#panes .fam").forEach(b => b.classList.remove("on"));
    $$("#panes .tb").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#/t/" + id));
    if (wide()) { if (window.scrollY > 240) window.scrollTo(0, 0); }
    else {
      /* On a phone the sheet takes the lower half, so bring the window to the top of the screen above it. */
      const top = Math.max(0, $("#roseWrap").getBoundingClientRect().top + window.scrollY - 6);
      if (Math.abs(window.scrollY - top) > 24) window.scrollTo(0, top);
      $(".x", panel).focus({ preventScroll: true });
    }
  }
  function closeTrad() {
    if (!selId && !litFam) return;
    selId = null; litFam = null;
    rose.select(null);
    panel.hidden = true; panel.innerHTML = "";
    intro.classList.remove("gone");
    document.body.classList.remove("has-sel");
    scrim.hidden = true;
    $$("#panes .on").forEach(b => b.classList.remove("on"));
  }
  scrim.addEventListener("click", () => (location.hash = "#/"));

  /* ───────── every pane by name ───────── */
  (function () {
    const fams = Object.keys(CH.families).map(f => ({ f: f, ts: CH.traditions.filter(t => t.family === f) })).filter(x => x.ts.length);
    $("#panes").innerHTML = `
      <div class="sec-h"><p class="kick">Every pane by name</p><h2 id="panesH">Forty panes, seventeen colors</h2><p class="sub">Tap a color to light its whole family on the window, or a name to open that pane.</p></div>
      <div class="famgrid">${fams.map(x => `<div class="famrow" style="--c:${famCol(x.f)}"><button type="button" class="fam" data-fam="${x.f}"><i></i>${esc(CH.families[x.f].name)}</button><p>${x.ts.map(t => tBtn(t.id, RW.label(t.id))).join("")}</p></div>`).join("")}</div>`;
  })();
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-fam]");
    if (!b) return;
    const f = b.dataset.fam, on = litFam !== f;
    if (selId) { history.replaceState(null, "", "#/"); closeTrad(); }
    litFam = on ? f : null;
    rose.light(on ? CH.traditions.filter(t => t.family === f).map(t => t.id) : null);
    $$("#panes .fam").forEach(x => x.classList.toggle("on", on && x === b));
    if (on) window.scrollTo(0, 0);
  });

  /* ───────── the lights: disputed texts ───────── */
  const CATCOL = { authority: "#f3b21f", god: "#2059dc", salvation: "#cc1230", sacraments: "#0f9862", church: "#8e44bd", last: "#10a79c", life: "#f5811f" };
  $("#lights").innerHTML = `
    <div class="sec-h"><p class="kick">The Lights</p><h2 id="lightsH">Twenty-nine texts the churches read differently</h2><p class="sub">Open a light to read the verse, then watch which part of the window reads it which way.</p></div>
    ${CH.debateCats.map(c => `<div class="catrow" style="--c:${CATCOL[c.id]}"><div class="cat-h"><h3>${esc(c.name)}</h3><p>${smart(c.line)}</p></div><div class="lights">${CH.debates.filter(d => d.cat === c.id).map(d => `<a class="lz light" href="#/text/${d.id}"><span class="lz-head glass">${archLine(KS)}</span><span class="lz-body"><b>${smart(d.title)}</b><i>${smart(d.q)}</i><em>${prettyRef(d.passages[0].ref)}</em></span></a>`).join("")}</div></div>`).join("")}`;

  const tview = $("#textview");
  let tv = null;
  const heldFams = p => { const out = []; p.held.forEach(id => { const f = T[id] && T[id].family; if (f && out.indexOf(f) < 0) out.push(f); }); return out; };
  function strips(p) {
    const f = heldFams(p);
    if (!f.length) return "linear-gradient(#4b4560,#2b2738)";
    const n = f.length;
    return "linear-gradient(90deg," + f.map((x, i) => `${famCol(x)} ${(i / n * 100).toFixed(2)}% ${((i + 1) / n * 100).toFixed(2)}%`).join(",") + ")";
  }
  function firstSentence(s) { const m = s.match(/^.*?(?:[a-z]{2}|[)\]”"’\d])[.!?](?=\s+[A-Z“"(])/); return m && m[0].length < s.length - 20 ? [m[0], s.slice(m[0].length).trim()] : [s, ""]; }
  function textHTML(d) {
    const i = CH.debates.indexOf(d), prev = CH.debates[(i + CH.debates.length - 1) % CH.debates.length], next = CH.debates[(i + 1) % CH.debates.length];
    const cat = CH.debateCats.find(c => c.id === d.cat);
    return `
      <div class="tv-bar"><a class="tv-back" href="#/s/lights"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>All the lights</a><span class="tv-cat" style="--c:${CATCOL[d.cat]}"><i></i>${esc(cat.name)}</span><span class="tv-step"><a href="#/text/${prev.id}" aria-label="Previous text: ${esc(prev.title)}"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg></a><a href="#/text/${next.id}" aria-label="Next text: ${esc(next.title)}"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M10 6l6 6-6 6"/></svg></a></span></div>
      <div class="tv-in">
        <header class="tv-head"><p class="kick">${smart(d.title)}</p><h2>${smart(d.q)}</h2><p class="sub">${smart(d.intro)}</p></header>
        <section class="tv-verse" aria-label="The passages">
          <div id="tvVerse"></div>
          <div class="pstep"><button type="button" class="arrow" data-pstep="-1" aria-label="Previous passage"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg></button><div class="prefs" id="tvRefs">${d.passages.map((p, k) => `<button type="button" data-pi="${k}">${prettyRef(p.ref)}</button>`).join("")}</div><button type="button" class="arrow" data-pstep="1" aria-label="Next passage"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M10 6l6 6-6 6"/></svg></button></div>
        </section>
        <section class="tv-read" aria-label="The readings">
          <div class="who"><div class="who-rose" id="tvMini"></div><p class="kick">Lit: who reads it this way</p><div class="who-list" id="tvWho"></div></div>
          <div class="reads-w"><p class="kick">${d.positions.length} readings. Pick one to light the window.</p><div class="reads">${d.positions.map((p, k) => { const s = firstSentence(p.text); return `<div class="lz rd" data-ri="${k}"><button type="button" class="rd-pick" data-ri="${k}" aria-pressed="false"><span class="lz-head glass" style="--g:${strips(p)}">${archLine(KS)}</span><span class="rd-n">${smart(p.name)}</span></button><div class="lz-body"><p>${smart(s[0])}</p>${s[1] ? disc("Read the rest", `<p>${smart(s[1])}</p>`, "sm") : ""}</div></div>`; }).join("")}</div></div>
        </section>
        <section class="tv-more">
          ${disc("Where exactly they part", `<p>${smart(d.crux)}</p>`)}
          ${disc("How the argument unfolded", `<p>${smart(d.history)}</p>${d.councils.length ? `<p class="mos">${d.councils.filter(c => C[c]).map(c => `<a class="mo" href="#/c/${c}"><b>${C[c].year}</b>${smart(C[c].name)}</a>`).join("")}</p>` : ""}`)}
          ${d.people.length ? disc(`The people in it <em>${d.people.filter(p => P[p]).length}</em>`, `<div class="pms">${d.people.map(pBtn).join("")}</div>`) : ""}
        </section>
        <nav class="tv-next"><a href="#/text/${next.id}"><span>Next light</span><b>${smart(next.title)}</b></a></nav>
      </div>`;
  }
  function drawVerse() {
    const d = D[tv.id];
    $("#tvVerse").innerHTML = verse(d.passages[tv.pi], "big");
    $$("#tvRefs button").forEach((b, k) => { b.classList.toggle("on", k === tv.pi); b.setAttribute("aria-pressed", k === tv.pi); });
    const on = $("#tvRefs .on"), box = $("#tvRefs");
    if (on) box.scrollLeft = on.offsetLeft - (box.clientWidth - on.offsetWidth) / 2;
  }
  function drawReading() {
    const d = D[tv.id], p = d.positions[tv.ri];
    $$(".rd", tview).forEach((el, k) => { el.classList.toggle("on", k === tv.ri); $(".rd-pick", el).setAttribute("aria-pressed", k === tv.ri); });
    $("#tvMini").innerHTML = RW.mini(p.held, { label: "The window with the panes that hold this reading lit" });
    $("#tvWho").innerHTML = p.held.length ? p.held.map(id => tBtn(id)).join("") : `<p class="fine">No pane on the window is listed for this reading.</p>`;
  }
  function openText(id) {
    if (!tv || tv.id !== id) {
      tv = { id: id, pi: 0, ri: 0 };
      tview.innerHTML = textHTML(D[id]);
      tview.scrollTop = 0;
      drawVerse(); drawReading();
    }
    if (tview.hidden) fade(tview);
    tview.hidden = false;
    lock(true);
  }
  function closeText() { if (tview.hidden) return; tview.hidden = true; tv = null; tview.innerHTML = ""; lock(!cardwrap.hidden); }
  tview.addEventListener("click", e => {
    if (!tv) return;
    const r = e.target.closest("[data-pi]"), s = e.target.closest("[data-pstep]"), pick = e.target.closest(".rd-pick");
    const n = D[tv.id].passages.length;
    if (r) { tv.pi = +r.dataset.pi; drawVerse(); }
    else if (s) { tv.pi = (tv.pi + +s.dataset.pstep + n) % n; drawVerse(); }
    else if (pick) { tv.ri = +pick.dataset.ri; drawReading(); }
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("button[data-tr]");
    if (!b) return;
    curTr = b.dataset.tr; store.set("vb.tr", curTr);
    if (tv) drawVerse();
  });

  /* ───────── cards: people and moments ───────── */
  const cardwrap = $("#cardwrap"), card = $("#card");
  let backHash = "#/", opener = null;
  const xBtn = `<button type="button" class="x" data-close aria-label="Close"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
  function personHTML(p) {
    const t = T[p.t], inTexts = CH.debates.filter(d => d.people.indexOf(p.id) >= 0);
    const evs = CH.events.map((e, i) => ({ e: e, i: i })).filter(x => x.e.people.indexOf(p.id) >= 0);
    return `${xBtn}${head(`<div class="lz-img face${CH.images[p.w] ? "" : " noimg"}" data-i="${esc(initials(p.n))}">${pic(p.w, p.n, true)}</div>`)}
      <div class="lz-body" style="--c:${t ? col(t.id) : "#8f8672"}">
        <p class="kick">${esc((CH.eras.find(e => e.id === p.e) || {}).name || "")}</p>
        <h2>${smart(p.n)}</h2>
        <p class="when">${esc(p.d)} · ${smart(p.r)}</p>
        <p class="lede">${smart(p.b)}</p>
        ${t ? `<div class="p-pane"><div class="p-rose">${RW.mini(RW.lineage(t.id))}</div><p><span class="kick">The pane</span>${tBtn(t.id, t.name)}</p></div>` : ""}
        ${inTexts.length ? `<h4>In the arguments over</h4><p class="mos">${inTexts.map(d => `<a class="mo" href="#/text/${d.id}">${smart(d.title)}</a>`).join("")}</p>` : ""}
        ${evs.length ? `<h4>Moments</h4><p class="mos">${evs.map(x => `<a class="mo" href="#/e/${x.i}"><b>${x.e.y}</b>${smart(x.e.t)}</a>`).join("")}</p>` : ""}
        ${CH.images[p.w] ? `<p class="fine">${credit(p.w)}</p>` : ""}
      </div>`;
  }
  function eventHTML(e) {
    const era = eraOf(e.y);
    return `${xBtn}${head(`<div class="lz-img dark">${pic(era.w, "", true)}</div><p class="bigyear">${e.y}</p>`)}
      <div class="lz-body">
        <p class="kick">${esc(era.name)}${e.d ? " · " + esc(e.d) : ""}</p>
        <h2>${smart(e.t)}</h2>
        <p class="lede">${smart(e.x)}</p>
        ${e.tags.length ? `<p class="tbs">${e.tags.map(id => tBtn(id)).join("")}</p>` : ""}
        ${e.people.length ? `<div class="pms">${e.people.map(pBtn).join("")}</div>` : ""}
        <p class="fine">${credit(era.w)}</p>
      </div>`;
  }
  function openCard(html, label) {
    card.innerHTML = html; card.setAttribute("aria-label", label);
    if (cardwrap.hidden) opener = document.activeElement;
    cardwrap.hidden = false; cardwrap.scrollTop = 0; card.scrollTop = 0; fade(cardwrap);
    lock(true);
    $(".x", card).focus({ preventScroll: true });
  }
  function closeCard() { if (cardwrap.hidden) return; cardwrap.hidden = true; card.innerHTML = ""; lock(!tview.hidden); }
  cardwrap.addEventListener("click", e => { if (e.target === cardwrap) location.hash = backHash; });
  function lock(on) { document.documentElement.classList.toggle("lock", !!on); }

  document.addEventListener("click", e => {
    const x = e.target.closest("[data-close]");
    if (!x) return;
    location.hash = x.closest("#card") ? backHash : "#/";
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!cardwrap.hidden) location.hash = backHash;
    else if (!tview.hidden) location.hash = "#/s/lights";
    else if (selId) location.hash = "#/";
    else if (litFam) { litFam = null; rose.light(null); $$("#panes .fam").forEach(x => x.classList.remove("on")); }
  });

  /* ───────── people wall ───────── */
  let pf = { era: null, fam: null };
  (function () {
    const fams = Object.keys(CH.families).filter(f => CH.people.some(p => p.t && T[p.t] && T[p.t].family === f));
    $("#people").innerHTML = `
      <div class="sec-h"><p class="kick">People</p><h2 id="peopleH">${CH.people.length} faces in the glass</h2><p class="sub">The ring around each face is the color of its pane. Filter by age or by color.</p></div>
      <div class="pfilt"><div class="pf-eras" role="group" aria-label="Filter by age"><button type="button" data-pe="" class="on">All ages</button>${CH.eras.map(e => `<button type="button" data-pe="${e.id}">${esc(e.name)}</button>`).join("")}</div>
      <div class="pf-fams" role="group" aria-label="Filter by color">${fams.map(f => `<button type="button" data-pf="${f}" style="--c:${famCol(f)}" title="${esc(CH.families[f].name)}" aria-label="${esc(CH.families[f].name)}"><i></i></button>`).join("")}<span class="pf-name" id="pfName"></span></div></div>
      <div class="wall" id="wall">${CH.people.map(p => `<a class="face" href="#/p/${p.id}" data-e="${p.e}" data-f="${p.t && T[p.t] ? T[p.t].family : ""}">${med(p, "lg")}<span>${smart(p.n)}</span></a>`).join("")}</div>
      <p class="fine" id="wallCount"></p>`;
  })();
  function filterWall() {
    let n = 0;
    $$("#wall .face").forEach(a => { const ok = (!pf.era || a.dataset.e === pf.era) && (!pf.fam || a.dataset.f === pf.fam); a.hidden = !ok; if (ok) n++; });
    $$("[data-pe]").forEach(b => b.classList.toggle("on", (b.dataset.pe || null) === pf.era));
    $$("[data-pf]").forEach(b => b.classList.toggle("on", b.dataset.pf === pf.fam));
    $("#pfName").textContent = pf.fam ? CH.families[pf.fam].name : "";
    $("#wallCount").textContent = n === CH.people.length ? "" : n ? `${n} of ${CH.people.length} shown.` : "No one matches both filters.";
  }
  $("#people").addEventListener("click", e => {
    const a = e.target.closest("[data-pe]"), f = e.target.closest("[data-pf]");
    if (a) pf.era = a.dataset.pe || null;
    else if (f) pf.fam = pf.fam === f.dataset.pf ? null : f.dataset.pf;
    else return;
    filterWall();
  });

  /* ───────── the years: an arcade of eight tall lancets ───────── */
  const AGE_EVS = CH.eras.map(era => CH.events.map((e, i) => ({ e: e, i: i })).filter(x => eraOf(x.e.y).id === era.id).sort((a, b) => a.e.y - b.e.y));
  const tallSpan = inner => tall(inner).replace(/^<div/, "<span").replace(/<\/div>$/, "</span>");
  $("#years").innerHTML = `
    <div class="sec-h"><p class="kick">The Years</p><h2 id="yearsH">Eight ages, ring by ring</h2><p class="sub">The moments that turned the story. Pick a bay of the arcade.</p></div>
    <div class="arcade">${CH.eras.map((era, i) => `<button type="button" class="bay" data-age="${i}" aria-pressed="false">${tallSpan(`<span class="lz-img">${pic(era.w, "")}</span>`)}<span class="bay-l">${esc(era.label)}</span><span class="bay-n">${esc(era.name)}</span></button>`).join("")}</div>
    <div class="agedetail" id="agedetail" aria-live="polite"></div>`;
  function showAge(i) {
    const era = CH.eras[i], evs = AGE_EVS[i], s = firstSentence(era.intro);
    const mo = x => `<a class="mo" href="#/e/${x.i}"><b>${x.e.y}</b>${smart(x.e.t)}</a>`;
    const keys = evs.filter(x => x.e.k);
    $$("#years .bay").forEach(b => { const on = +b.dataset.age === i; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    $("#agedetail").innerHTML = `
      <p class="kick">${esc(era.label)}</p><h3>${esc(era.name)}</h3>
      <p class="ad-intro">${smart(s[0])}</p>
      ${keys.length ? `<p class="mos">${keys.map(mo).join("")}</p>` : ""}
      ${disc(`The whole age <em>${evs.length} moments</em>`, `${s[1] ? `<p>${smart(s[1])}</p>` : ""}<p class="mos">${evs.map(mo).join("")}</p>`)}
      <p class="fine">${smart(era.cap)} ${credit(era.w)}</p>`;
  }
  $("#years .arcade").addEventListener("click", e => { const b = e.target.closest(".bay"); if (b) showAge(+b.dataset.age); });
  showAge(0);

  /* ───────── councils and the creed ───────── */
  const GCOL = { ecumenical: "#f3b21f", early: "#f1dc9c", western: "#cc1230", confession: "#2059dc", modern: "#0f9862" };
  const ECU = CH.councils.filter(c => c.g === "ecumenical").sort((a, b) => a.year - b.year);
  let curC = null;
  (function () {
    const cs = CH.councils.slice().sort((a, b) => a.year - b.year);
    $("#councils").innerHTML = `
      <div class="sec-h"><p class="kick">Councils and the creed</p><h2 id="councilsH">Where the lines were drawn</h2><p class="sub">Twenty-seven councils and confessions in order. Pick a year.</p></div>
      <p class="ckey">${CH.councilGroups.map(g => `<span style="--c:${GCOL[g.id]}"><i></i>${esc(g.name)}</span>`).join("")}</p>
      <div class="cbar">${cs.map(c => `<a class="cstone" href="#/c/${c.id}" data-c="${c.id}" style="--c:${GCOL[c.g]}" aria-label="${esc(c.name)}, ${c.year}"><i></i><b>${c.year}</b></a>`).join("")}</div>
      <div class="cdetail" id="cdetail"></div>
      <div class="accept"><div class="acc-h"><h3>Who accepts which of the first seven</h3><p class="fine">Bright glass: accepted. Pale glass: its teaching is widely held. Dark: not received.</p></div>
        <div class="acc-grid"><div class="acc-row acc-top"><span></span><span class="acc-seven">${ECU.map(c => `<a href="#/c/${c.id}" title="${esc(c.name)}">${c.year}</a>`).join("")}</span><span></span></div>
        ${CH.councilAcceptance.map(r => `<div class="acc-row"><b>${smart(r.who)}</b><span class="acc-seven" aria-label="${esc(r.note)}">${ECU.map((c, i) => `<i class="${i < r.upTo ? "yes" : r.soft && i < r.soft ? "soft" : ""}"></i>`).join("")}</span><em>${smart(r.note)}</em></div>`).join("")}</div></div>
      <div class="creed"><div class="acc-h"><h3>The Nicene Creed, line by line</h3><p class="fine">The wording of 381, in the English of the 1662 Book of Common Prayer. Tap a line to see what it was written against.</p></div>
        <div class="creed-lines">${CH.creed.map(l => `<div class="disc cl${l.mark ? " mark" : ""}"><button type="button" class="disc-b" aria-expanded="false"><span>${smart(l.t)}</span></button><div class="disc-w"><div class="disc-i" inert><p>${smart(l.n)}</p></div></div></div>`).join("")}</div></div>`;
  })();
  function showCouncil(id) {
    const c = C[id];
    curC = id;
    $$(".cstone").forEach(a => a.classList.toggle("on", a.dataset.c === id));
    const g = CH.councilGroups.find(x => x.id === c.g), texts = CH.debates.filter(d => d.councils.indexOf(id) >= 0);
    $("#cdetail").innerHTML = `<div class="cd-top" style="--c:${GCOL[c.g]}">${c.w && CH.images[c.w] ? `<div class="cd-pic"><div class="lz-head"><div class="lz-img">${pic(c.w, c.name)}</div>${archLine(KH)}</div></div>` : ""}<div><p class="kick"><i class="sw"></i>${esc(g.name)}</p><h3>${smart(c.name)}</h3><p class="when">${esc(c.when)} · ${smart(c.place)}</p></div></div>
      <div class="cd-cols"><div><h4>The question</h4><p>${smart(c.issue)}</p></div><div><h4>What was decided</h4><p>${smart(c.decided)}</p></div><div><h4>What followed</h4><p>${smart(c.after)}</p></div></div>
      ${texts.length ? `<p class="mos"><span class="kick">In the lights</span>${texts.map(d => `<a class="mo" href="#/text/${d.id}">${smart(d.title)}</a>`).join("")}</p>` : ""}
      ${c.w && CH.images[c.w] ? `<p class="fine">${credit(c.w)}</p>` : ""}`;
  }
  showCouncil(ECU[0].id);

  /* ───────── credits ───────── */
  (function () {
    const notices = {
      NIV: "Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.",
      NASB: "Scripture quotations taken from the New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995 by The Lockman Foundation. Used by permission. All rights reserved. lockman.org",
      NLT: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.",
      TPT: "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc. Used by permission. All rights reserved. ThePassionTranslation.com.",
      KJV: "King James Version, 1769 text. Public domain in the United States."
    };
    const kinds = { NIV: "Thought-for-thought and word-for-word in balance.", NASB: "Strictly word-for-word.", NLT: "Thought-for-thought, in everyday English.", TPT: "An expansive rendering by one translator. Many scholars class it as a paraphrase.", KJV: "The classic English Bible of 1611, in its 1769 spelling." };
    const imgs = Object.keys(CH.images).sort();
    $("#credits").innerHTML = `
      <div class="sec-h"><p class="kick">Credits</p><h2 id="creditsH">Where this comes from</h2></div>
      <div class="cr-grid">
        <div><h3>Bible translations</h3>
          <dl class="src">${TR_HAVE.map(t => `<div><dt>${TR[t][0]} · ${esc(TR[t][1])}</dt><dd>${kinds[t]}<br><span class="fine">${esc(notices[t])}</span></dd></div>`).join("")}
          <div><dt>Douay-Rheims</dt><dd>Used for 2 Maccabees, which is not in the other translations here, and for one comparison in Luke 1:28. Public domain.</dd></div></dl>
          <p class="fine">Where a translation has no text for a passage, its tab is left out. The Passion Translation does not cover every Old Testament book.</p></div>
        <div><h3>Method</h3>
          <p>Each position is stated the way its own confessions and teachers state it: the Catechism of the Catholic Church, the Orthodox councils and fathers, the Book of Concord, the Reformed and Westminster standards, the Thirty-Nine Articles, the Schleitheim and Baptist confessions, Wesley's sermons, and the statements of faith of Pentecostal, Adventist and Restoration churches. Where a tradition holds more than one view, the page says so.</p>
          <p>Dates before 400 are often approximate and are marked “c.” Membership numbers are rounded and labeled as estimates, or carry the name of the body that reports them. World totals follow the Center for the Study of Global Christianity and the Pew Research Center.</p>
          <p>The window is a diagram. A pane's width shows where it descends from, not how many people belong to it.</p>
          <h3>Further reading</h3>
          <ul class="reading">
            <li>Jaroslav Pelikan, <i>The Christian Tradition: A History of the Development of Doctrine</i>, 5 volumes (1971–1989)</li>
            <li>Diarmaid MacCulloch, <i>Christianity: The First Three Thousand Years</i> (2009) and <i>The Reformation</i> (2003)</li>
            <li>Justo L. González, <i>The Story of Christianity</i>, 2 volumes</li>
            <li>Henry Chadwick, <i>The Early Church</i> (1967)</li>
            <li>Timothy (Kallistos) Ware, <i>The Orthodox Church</i> (1963)</li>
            <li>Philip Jenkins, <i>The Lost History of Christianity</i> (2008), on the churches of Asia and Africa</li>
            <li>Mark Noll, <i>Turning Points: Decisive Moments in the History of Christianity</i></li>
            <li>Philip Schaff, <i>The Creeds of Christendom</i>, 3 volumes (1877), for the texts of the creeds and confessions</li>
          </ul></div>
      </div>
      ${disc(`Image credits <em>${imgs.length}</em>`, `<p class="fine">All images are served from Wikimedia Commons under the license shown. Tap a title for the file page.</p><ul class="imgcred">${imgs.map(k => { const im = CH.images[k]; return `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">${esc(k)}</a> <span>${esc([im.by, im.lic].filter(Boolean).join(", ") || "Wikimedia Commons")}</span></li>`; }).join("")}</ul>`)}
      ${disc(`Glossary <em>${CH.glossary.length} words</em>`, `<dl class="gloss">${CH.glossary.map(g => `<div><dt>${smart(g[0])}</dt><dd>${smart(g[1])}</dd></div>`).join("")}</dl>`)}`;
  })();

  /* ───────── router ───────── */
  let lastHash = "";
  const BASE_TITLE = "Rose Window: church history in stained glass";
  function route() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    const k = parts[0], id = parts[1];
    const overlay = k === "p" || k === "e";
    if (overlay && !/^#\/(p|e)\//.test(lastHash)) backHash = lastHash || "#/";
    let title = "";
    if (k === "t" && T[id]) { closeCard(); closeText(); openTrad(id); title = T[id].name; }
    else if (k === "text" && D[id]) { closeCard(); openText(id); title = D[id].title; }
    else if (k === "p" && P[id]) { openCard(personHTML(P[id]), P[id].n); title = P[id].n; }
    else if (k === "e" && CH.events[+id]) { openCard(eventHTML(CH.events[+id]), CH.events[+id].t); title = CH.events[+id].t; }
    else if (k === "c" && C[id]) {
      closeCard(); closeText(); if (!wide()) closeTrad();
      showCouncil(id);
      const r = $("#cdetail").getBoundingClientRect();
      if (r.top < 60 || r.top > window.innerHeight - 160) {
        const y = window.innerWidth < 760 ? r.top + window.scrollY - 76 : $(".cbar").getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo(0, y);
      }
      title = C[id].name;
    }
    else if (k === "s" && document.getElementById(id)) {
      closeCard(); closeText(); if (!wide()) closeTrad();
      window.scrollTo(0, document.getElementById(id).getBoundingClientRect().top + window.scrollY - 56);
    }
    else { closeCard(); closeText(); closeTrad(); }
    if (opener && cardwrap.hidden && opener.isConnected) { opener.focus({ preventScroll: true }); opener = null; }
    document.title = (title ? title + " · " : "") + (title ? "Rose Window" : BASE_TITLE);
    lastHash = hash;
  }
  window.addEventListener("hashchange", route);
  route();

  /* Motion is an extra. It switches on only where the browser really paints frames. */
  if (window.requestAnimationFrame) requestAnimationFrame(() => document.documentElement.classList.add("motion-ok"));
})();
