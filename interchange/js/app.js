/* Interchange: routing, panels and pages. Content lives in /data; map drawing in map.js. */
(function () {
  "use strict";
  const CH = window.CH, X = CH.x, T = X.T, esc = X.esc, smart = X.smart, END = X.END;
  const P = {}, C = {}, D = {};
  CH.people.forEach(p => (P[p.id] = p));
  CH.councils.forEach(c => (C[c.id] = c));
  CH.debates.forEach(d => (D[d.id] = d));
  CH.events.forEach(e => { if (!e.people) e.people = []; });
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  if (/[?&]still\b/.test(location.search)) document.documentElement.classList.add("still");

  /* ───────── small pieces ───────── */
  const col = id => X.colorOf(id);
  const bl = (id, cls) => `<span class="bl ${cls || ""}${X.code[id].length > 1 ? " two" : ""}" style="--c:${col(id)};--k:${X.ink(col(id))}" aria-hidden="true">${X.code[id]}</span>`;
  const blLink = (id, cls) => T[id] ? `<a class="bl-a" href="#/line/${id}" title="${esc(T[id].name)}" aria-label="${esc(T[id].name)} line">${bl(id, cls)}</a>` : "";
  const lineChip = id => T[id] ? `<a class="chip" href="#/line/${id}">${bl(id, "sm")}<span>${smart(X.tail(id))}</span></a>` : "";
  const list = (arr, sep) => arr.filter(Boolean).join(sep || ", ");
  const eraOf = id => CH.eras.find(e => e.id === id);
  const prettyRef = r => esc(r.replace(/^Psalms /, "Psalm ").replace(/^Jude 1:/, "Jude ").replace(/-/g, "–"));
  // First sentence and the rest. A period after an initial ("E. P. Sanders"), an abbreviation
  // ("c.", "St.") or inside brackets is not the end of a sentence.
  const firstSentence = s => {
    const re = /[.!?][)’”"']*(?=\s|$)/g; let m;
    while ((m = re.exec(s))) {
      const end = m.index + m[0].length, before = s.slice(0, m.index), word = (before.match(/(\S+)$/) || ["", ""])[1].replace(/^[(“‘"']+/, "");
      if (m[0][0] === "." && (/^[A-Z]$/.test(word) || /^(c|ca|St|Sts|Dr|Mr|Mrs|vs|cf|e\.g|i\.e|etc|d|b|r|vol|no|ch|v|vv)$/i.test(word))) continue;
      if ((before.match(/\(/g) || []).length > (s.slice(0, end).match(/\)/g) || []).length) continue;
      return [s.slice(0, end), s.slice(end).trim()];
    }
    return [s, ""];
  };
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  /* Wikimedia serves fixed thumbnail steps; a 56px face should not pull a 500px file. */
  const thumb = (src, px) => (px ? src.replace(/\/(\d+)px-/, (m, n) => (+n > px ? `/${px}px-` : m)) : src);
  function img(title, alt, cls, px) {
    const im = CH.images[title];
    if (!im) return "";
    return `<img class="${cls || ""}" src="${esc(thumb(im.src, px))}" alt="${esc(alt || "")}" loading="lazy" decoding="async" width="${im.w}" height="${im.h}" onerror="this.parentNode.classList.add('noimg');this.remove()">`;
  }
  function credit(title) {
    const im = CH.images[title];
    if (!im) return "";
    return `<a class="credit" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">Image: ${esc(list([im.by, im.lic]) || "Wikimedia Commons")}</a>`;
  }
  const initials = n => n.replace(/\b(of|the|and|von|à)\b/g, "").split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("");
  function face(p, cls) {
    const c = p.t && T[p.t] ? col(p.t) : "#141414";
    return `<span class="face ${cls || ""}${CH.images[p.w] ? "" : " noimg"}" style="--c:${c};--k:${X.ink(c)}" data-i="${esc(initials(p.n))}">${img(p.w, "", "", cls === "xl" ? 0 : cls === "sq" ? 250 : 120)}</span>`;
  }
  const personChip = id => P[id] ? `<a class="pchip" href="#/p/${id}">${face(P[id], "sm")}<span><b>${smart(P[id].n)}</b><i>${esc(P[id].d)}</i></span></a>` : "";
  const more = (label, html, open) => `<div class="dz${open ? " open" : ""}"><button type="button" class="dz-b" aria-expanded="${open ? "true" : "false"}"><span>${label}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg></button><div class="dz-c"><div class="dz-i">${html}</div></div></div>`;

  /* ───────── translations ───────── */
  const TR = {
    NIV: ["NIV", "New International Version"], NASB: ["NASB", "New American Standard Bible, 1995"],
    NLT: ["NLT", "New Living Translation"], TPT: ["TPT", "The Passion Translation"],
    KJV: ["KJV", "King James Version"], DRA: ["Douay-Rheims", "Douay-Rheims Bible"]
  };
  const TR_ORDER = ["NIV", "NASB", "NLT", "TPT", "KJV"];
  const TR_HAVE = TR_ORDER.filter(t => Object.keys(CH.verses).some(k => CH.verses[k][t]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  let curTr = store.get("vb.tr");
  if (TR_HAVE.indexOf(curTr) < 0) curTr = TR_HAVE[0];
  function verse(p) {
    const data = CH.verses[p.t ? p.ref + "|" + p.t : p.ref];
    if (!data) return { tabs: "", body: "" };
    const have = p.t ? Object.keys(data) : TR_ORDER.filter(t => data[t]);
    const use = have.indexOf(curTr) >= 0 ? curTr : have[0];
    const tabs = have.length > 1
      ? `<span class="seg" role="group" aria-label="Translation">${have.map(t => `<button type="button" data-tr="${t}" class="${t === use ? "on" : ""}" title="${esc(TR[t][1])}" aria-pressed="${t === use}">${TR[t][0]}</button>`).join("")}</span>`
      : `<span class="seg one"><span title="${esc(TR[use][1])}">${TR[use][0]}</span></span>`;
    return { tabs, body: data[use].map(v => `<sup>${v[1]}</sup>${smart(v[2])}`).join(" ") };
  }

  /* ───────── the map view ───────── */
  const viewMap = $("#view-map"), pageHost = $("#page"), panel = $("#panel"), panelBody = $("#panel-body"), banner = $("#banner");
  const modal = $("#modal"), modalBody = $("#modal-body");
  let map = null, mapKey = "", panelOpen = false;
  const wide = () => window.matchMedia("(min-width: 900px)").matches;
  function ensureMap() {
    if (map) return;
    map = CH.map.render($("#map"), {
      footH: wide() ? 48 : 76,
      inset: () => (panelOpen && wide() ? 430 : 0),
      // On a phone the panel is a bottom sheet: keep the selection in the strip of map above it.
      insetY: () => { const sc = $("#map .map-scroll"); return panelOpen && !wide() && sc ? Math.max(0, sc.getBoundingClientRect().bottom - panel.getBoundingClientRect().top) : 0; },
      onLine: id => go("#/line/" + id),
      onStation: key => go("#/station/" + key),
      onClear: () => { if (location.hash.replace(/^#\/?/, "")) go("#/"); }
    });
  }
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  function openPanel(html, kind) {
    panelBody.innerHTML = html;
    panel.className = "panel open " + (kind || "");
    panel.scrollTop = 0; panelBody.scrollTop = 0;
    panelOpen = true;
    viewMap.classList.add("has-panel");
  }
  function closePanel() { panel.classList.remove("open"); panelOpen = false; viewMap.classList.remove("has-panel"); }
  function setBanner(html) { banner.innerHTML = html || ""; banner.classList.toggle("open", !!html); }

  /* line panel */
  function linePanel(id) {
    const t = T[id], chain = X.lineage(id).reverse(), kids = CH.traditions.filter(k => k.parent === id).sort((a, b) => a.start - b.start);
    const stops = CH.events.map((e, i) => ({ e, i })).filter(o => o.e.tags.indexOf(id) >= 0);
    const ppl = Array.from(new Set((t.people || []).concat(CH.people.filter(p => p.t === id).map(p => p.id)))).filter(pid => P[pid]);
    const sides = [];
    CH.debates.forEach(d => d.positions.forEach(pos => { if (pos.held.indexOf(id) >= 0) sides.push([d, pos]); }));
    const links = (t.links || []).map(l => `<li>${blLink(l.to, "sm")}<span><b>${l.year}</b> ${smart(l.note)}</span></li>`)
      .concat(CH.traditions.filter(o => (o.links || []).some(l => l.to === id)).map(o => o.links.filter(l => l.to === id).map(l => `<li>${blLink(o.id, "sm")}<span><b>${l.year}</b> ${smart(l.note)}</span></li>`).join("")));
    const deep = [
      t.origins ? `<h4>How it began</h4><p>${smart(t.origins)}</p>` : "",
      t.bodies ? `<h4>Who they are today</h4><p>${smart(t.bodies)}</p>` : "",
      t.stance ? `<h4>Where it stands</h4><dl class="stance">${CH.stanceTopics.map(k => `<div><dt>${esc(k[1])}</dt><dd>${smart(t.stance[k[0]])}</dd></div>`).join("")}</dl><p><a class="go" href="#/timetable/${id}">Compare on the timetable</a></p>` : ""
    ].join("");
    return `<header class="p-head" style="--c:${col(id)};--k:${X.ink(col(id))}">
        ${bl(id, "xl")}
        <div><p class="kick">${esc(CH.families[t.family].name)} · ${t.end ? "Closed line" : "In service"}</p><h2>${smart(t.name)}</h2><p class="when">${esc(X.years(t))}</p></div>
      </header>
      ${t.w && CH.images[t.w] ? `<figure class="p-fig">${img(t.w, t.w)}<figcaption>${esc(t.w)} ${credit(t.w)}</figcaption></figure>` : ""}
      <p class="lede">${smart(t.blurb)}</p>
      <div class="route-row" aria-label="Route back to the year 30">${chain.map(cid => cid === id ? bl(cid) : blLink(cid)).join('<i class="arr"></i>')}</div>
      ${t.from ? `<p class="from"><b>Leaves ${t.parent ? "the " + esc(X.tail(t.parent)) + " line" : "the depot"}:</b> ${smart(t.from)}</p>` : ""}
      ${t.size ? `<p class="from"><b>Riders today:</b> ${smart(t.size)}</p>` : ""}
      <ul class="marks">${t.marks.map(m => `<li>${smart(m)}</li>`).join("")}</ul>
      <div class="p-acts"><a class="btn" href="#/trip/${id}/${id === "orthodox" ? "baptist" : "orthodox"}">Plan a trip from here</a></div>
      ${stops.length ? `<h3>Stops <i>${stops.length}</i></h3><ol class="strip" style="--c:${col(id)}">${stops.map(o => `<li><a href="#/station/e${o.i}"><b>${o.e.y}</b><span>${smart(o.e.t)}</span></a></li>`).join("")}</ol>` : ""}
      ${ppl.length ? `<h3>People <i>${ppl.length}</i></h3><div class="faces">${ppl.map(pid => `<a href="#/p/${pid}" title="${esc(P[pid].n)}">${face(P[pid])}<span>${smart(P[pid].n)}</span></a>`).join("")}</div>` : ""}
      ${sides.length ? `<h3>Takes a side at <i>${sides.length}</i></h3><ul class="sides">${sides.map(s => `<li><a href="#/text/${s[0].id}"><b>${smart(s[0].title)}</b><span>${smart(s[1].name)}</span></a></li>`).join("")}</ul>` : ""}
      ${kids.length ? `<h3>Lines that leave here</h3><div class="chips">${kids.map(k => lineChip(k.id)).join("")}</div>` : ""}
      ${links.length ? `<h3>Walkways</h3><ul class="walks-l">${links.join("")}</ul>` : ""}
      ${deep ? more("More about this line", deep) : ""}`;
  }

  /* station card */
  function stationPanel(key) {
    if (key[0] === "c") {
      const c = C[key.slice(1)]; if (!c) return "";
      const cs = X.councilStation[c.id];
      return `<header class="s-head"><p class="kick">Station · ${esc(c.place)}</p><p class="big">${esc(c.when)}</p><h2>${smart(c.name)}</h2></header>
        <div class="served">${cs[1].map(id => lineChip(id)).join("")}</div>
        <dl class="council-dl"><div><dt>The question</dt><dd>${smart(c.issue)}</dd></div><div><dt>Decided</dt><dd>${smart(c.decided)}</dd></div><div><dt>What followed</dt><dd>${smart(c.after)}</dd></div></dl>
        <p><a class="go" href="#/council/${c.id}">All councils</a></p>`;
    }
    const i = +key.slice(1), e = CH.events[i]; if (!e) return "";
    const cid = Object.keys(X.councilEvent).find(k => X.councilEvent[k] === i);
    const [one, rest] = firstSentence(e.x);
    const prev = CH.events[i - 1], next = CH.events[i + 1];
    return `<header class="s-head"><p class="kick">${e.k ? "Key station" : "Station"}${e.tags.length > 1 ? " · Interchange" : ""}</p><p class="big">${esc(e.d)}</p><h2>${smart(e.t)}</h2></header>
      <div class="served">${e.tags.map(id => lineChip(id)).join("")}</div>
      <p class="lede">${smart(one)}</p>${rest ? `<p>${smart(rest)}</p>` : ""}
      ${e.people.length ? `<div class="pchips">${e.people.map(personChip).join("")}</div>` : ""}
      ${cid ? `<p><a class="go" href="#/council/${cid}">What the ${smart(C[cid].name)} decided</a></p>` : ""}
      <nav class="prevnext">${prev ? `<a href="#/station/e${i - 1}"><i>Previous stop</i><b>${prev.y}</b> ${smart(prev.t)}</a>` : "<span></span>"}${next ? `<a href="#/station/e${i + 1}"><i>Next stop</i><b>${next.y}</b> ${smart(next.t)}</a>` : "<span></span>"}</nav>`;
  }

  /* trip planner */
  const alive = CH.traditions.slice().sort((a, b) => X.tail(a.id).localeCompare(X.tail(b.id)));
  const optList = sel => alive.map(t => `<option value="${t.id}"${t.id === sel ? " selected" : ""}>${esc(X.tail(t.id))}${t.end ? " (closed " + t.end + ")" : ""}</option>`).join("");
  function trip(a, b) {
    const ca = X.lineage(a), cb = X.lineage(b), lca = ca.find(id => cb.indexOf(id) >= 0);
    if (a === b) return { same: true };
    if (!lca) return { none: true };
    const up = ca.slice(0, ca.indexOf(lca)), down = cb.slice(0, cb.indexOf(lca)).reverse();
    const parted = up.length && down.length ? Math.min(T[up[up.length - 1]].start, T[down[0]].start) : up.length ? T[up[up.length - 1]].start : T[down[0]].start;
    const through = !up.length || !down.length || T[up[up.length - 1]].start !== T[down[0]].start;
    return { up, down, lca, parted, changes: up.length + down.length + (through ? 1 : 0) - 1 };
  }
  function tripTeaser(a, b) {
    const r = trip(a, b);
    if (r.same) return "Pick two different lines.";
    if (r.none) return "No shared track between these two.";
    return `Parted in <b>${r.parted}</b>. <b>${fmt(END - r.parted)}</b> years ago. ${r.changes} ${r.changes === 1 ? "change" : "changes"}.`;
  }
  function tripPanel(a, b) {
    const r = trip(a, b);
    const pick = `<form class="trip-form" data-trip><label><span>From</span><select name="a" aria-label="From line">${optList(a)}</select></label><button type="button" class="swap" data-swap aria-label="Swap from and to"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3v12M5 3L2 6M5 3l3 3M15 17V5M15 17l-3-3M15 17l3-3"/></svg></button><label><span>To</span><select name="b" aria-label="To line">${optList(b)}</select></label></form>`;
    const head = `<header class="t-head"><p class="kick">Trip planner</p><h2>${bl(a)} ${smart(X.tail(a))} <i class="to">to</i> ${bl(b)} ${smart(X.tail(b))}</h2></header>${pick}`;
    if (r.same) return head + `<p class="lede">Pick two different lines and the map will show how they are related.</p>`;
    if (r.none) {
      const solo = !T[a].parent && a !== "early" ? a : b;
      return head + `<div class="t-sum"><p class="big">No shared track</p></div><p class="lede">The ${smart(X.tail(solo))} line starts on its own in ${T[solo].start}. It does not branch from any other line on this map.</p><p class="from">${smart(T[solo].from || "")}</p><p><a class="go" href="#/line/${solo}">Open the ${smart(X.tail(solo))} line</a></p>`;
    }
    const rows = [];
    const split = id => {
      const txt = X.splitText[id] && D[X.splitText[id]];
      return `${T[id].from ? `<p class="why">${smart(T[id].from)}</p>` : ""}${txt ? `<a class="jx-link" href="#/text/${txt.id}"><svg viewBox="0 0 22 14" aria-hidden="true"><path d="M1 7h8l5-5h7M9 7l5 5h7"/></svg>Junction: ${smart(txt.title)}</a>` : ""}`;
    };
    const nm = id => `${blLink(id, "sm")} <b>${smart(X.tail(id))}</b>`;
    rows.push({ seg: a, y: T[a].end || END, lab: T[a].end || "Today", h: `Board the ${bl(a, "sm")} <b>${smart(X.tail(a))}</b> line${T[a].end ? " at its last stop" : ""}.` });
    const up = r.up.slice(), down = r.down.slice();
    const pair = up.length && down.length && T[up[up.length - 1]].start === T[down[0]].start ? [up.pop(), down.shift()] : null;
    up.forEach(id => rows.push({ seg: T[id].parent, y: T[id].start, h: `${nm(id)} leaves ${nm(T[id].parent)} here. Change.`, x: split(id) }));
    if (pair) rows.push({ seg: pair[1], y: T[pair[0]].start, h: `${nm(pair[0])} and ${nm(pair[1])} part here. Change.`, x: split(pair[0]) + (T[pair[1]].from && T[pair[1]].from !== T[pair[0]].from ? `<p class="why">${smart(T[pair[1]].from)}</p>` : "") });
    down.forEach(id => rows.push({ seg: id, y: T[id].start, h: `${nm(id)} leaves ${nm(T[id].parent)} here. Change.`, x: split(id) }));
    rows.push({ y: T[b].end || END, lab: T[b].end || "Today", h: `Arrive on the ${bl(b, "sm")} <b>${smart(X.tail(b))}</b> line${T[b].end ? ", which closed in " + T[b].end : ""}.` });
    const ride = i => { const d = rows[i + 1].y - rows[i].y; return d ? `<p class="ride">Ride ${d < 0 ? "back" : "forward"} ${fmt(Math.abs(d))} ${Math.abs(d) === 1 ? "year" : "years"} on ${bl(rows[i].seg, "sm")}</p>` : ""; };
    return head + `<div class="t-sum"><p class="big">${fmt(END - r.parted)}<small>years since they parted</small></p><p class="mid">${r.parted}<small>last shared year</small></p><p class="mid">${r.changes}<small>${r.changes === 1 ? "change" : "changes"}</small></p></div>
      <ol class="legs">${rows.map((row, i) => `<li style="--c:${row.seg ? col(row.seg) : "transparent"}"><b class="yr">${row.lab || row.y}</b><div><p>${row.h}</p>${row.x || ""}${rows[i + 1] ? ride(i) : ""}</div></li>`).join("")}</ol>
      <p class="fine">The route follows each line back to where it left its parent, then forward again.</p>`;
  }

  /* ───────── pages ───────── */
  const V = {};
  const pageHead = (kick, h1, lede) => `<header class="pg-head"><p class="kick">${kick}</p><h1>${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}</header>`;

  V.lines = function () {
    const fams = Object.keys(CH.families);
    return `<div class="pg">${pageHead("Lines", "Every line on the map", "Forty lines in seventeen colors. Pick one to see its route, its stops and its people.")}
      ${fams.map(fid => {
        const ls = CH.traditions.filter(t => t.family === fid).sort((a, b) => a.start - b.start);
        if (!ls.length) return "";
        return `<section class="fam" style="--c:${X.pal[fid]}"><h2>${esc(CH.families[fid].name)}</h2><ul class="line-list">${ls.map(t => `<li><a href="#/line/${t.id}">${bl(t.id, "lg")}<span class="ll-n"><b>${smart(t.name)}</b><i>${esc(X.years(t))}</i></span><span class="ll-b">${smart(t.blurb)}</span></a></li>`).join("")}</ul></section>`;
      }).join("")}</div>`;
  };

  const ERA_FIX = { 1054: "early-medieval", 1648: "reformation" };
  const eraOfYear = y => ERA_FIX[y] || (CH.eras.find(e => y >= e.from && y < e.to) || CH.eras[CH.eras.length - 1]).id;
  V.stations = function () {
    return `<div class="pg">${pageHead("Stations", "Every stop, in order", `${CH.events.length} moments from the year 30 to today. The ones in bold are named on the map.`)}
      ${CH.eras.map((era, n) => { const ev = CH.events.map((e, i) => ({ e, i })).filter(o => eraOfYear(o.e.y) === era.id);
        return `<section class="zone-sec"><div class="zone-h"><b class="zsq">${n + 1}</b><div><h2>${esc(era.name)}</h2><p>${esc(era.label)}</p></div></div>
        <ol class="st-list">${ev.map(o => `<li class="${o.e.k ? "key" : ""}"><a href="#/station/e${o.i}"><b>${esc(o.e.d)}</b><span>${smart(o.e.t)}</span><em>${o.e.tags.map(id => bl(id, "sm")).join("")}</em></a></li>`).join("")}</ol></section>`; }).join("")}</div>`;
  };

  // little track diagram: one track in, one per reading out
  function glyph(d, w, h) {
    const n = d.positions.length, x0 = 4, xj = w * 0.36, x1 = w - 4, gap = Math.min(9, (h - 8) / (n - 1 || 1)), mid = h / 2;
    let s = "";
    d.positions.forEach((p, i) => {
      const y = mid + (i - (n - 1) / 2) * gap, dy = y - mid, c = p.held[0] && T[p.held[0]] ? col(p.held[0]) : "#141414";
      s += `<path d="M${xj},${mid}L${xj + Math.abs(dy)},${y}H${x1}" stroke="${c}"/>`;
    });
    return `<svg class="glyph" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${s}<path d="M${x0},${mid}H${xj}" stroke="#141414"/><circle cx="${xj}" cy="${mid}" r="3.4"/></svg>`;
  }
  V.junctions = function () {
    return `<div class="pg">${pageHead("Junctions", "Where one text sends readers down different tracks", "Twenty-nine disputed texts. Each one shows the verses written out, and every way the churches read them.")}
      ${CH.debateCats.map(cat => `<section class="jx-cat"><div class="jx-cat-h"><h2>${esc(cat.name)}</h2><p>${smart(cat.line)}</p></div><div class="jx-grid">${CH.debates.filter(d => d.cat === cat.id).map(d => `<a class="jx-tile" href="#/text/${d.id}">${glyph(d, 86, 52)}<span><b>${smart(d.title)}</b><i>${smart(d.q)}</i></span><em>${d.positions.length} readings</em></a>`).join("")}</div></section>`).join("")}</div>`;
  };

  let passageN = 0;
  function signHTML(d) {
    const p = d.passages[passageN], v = verse(p), n = d.passages.length;
    return `<div class="sign-top"><span class="ref">${prettyRef(p.ref)}</span>${v.tabs}</div>
      <blockquote>${v.body}</blockquote>
      ${p.note ? `<p class="note">${smart(p.note)}</p>` : ""}
      <div class="sign-foot"><button type="button" data-step="-1" aria-label="Previous passage"${passageN ? "" : " disabled"}><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M8 2L4 6l4 4"/></svg></button><span>Passage ${passageN + 1} of ${n}</span><button type="button" data-step="1" aria-label="Next passage"${passageN < n - 1 ? "" : " disabled"}><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4"/></svg></button>
      <span class="refs">${d.passages.map((q, i) => `<button type="button" data-pass="${i}" class="${i === passageN ? "on" : ""}">${prettyRef(q.ref)}</button>`).join("")}</span></div>`;
  }
  V.text = function (id, n) {
    const d = D[id]; if (!d) return V.notFound();
    passageN = Math.max(0, Math.min(d.passages.length - 1, +n || 0));
    const idx = CH.debates.indexOf(d), cat = CH.debateCats.find(c => c.id === d.cat), prev = CH.debates[idx - 1], next = CH.debates[idx + 1];
    const rows = d.positions.map((pos, i) => {
      const c = pos.held[0] && T[pos.held[0]] ? col(pos.held[0]) : "#141414", [one, rest] = firstSentence(pos.text);
      return `<li class="rd" style="--c:${c}"><svg class="br" viewBox="0 0 64 44" aria-hidden="true"><path d="M4,0V4L34,34H64"/><circle cx="56" cy="34" r="5.2"/></svg>
        <div class="rd-b"><h3>${smart(pos.name)}</h3>
        <div class="held">${pos.held.map(h => blLink(h)).join("")}${pos.held.length ? `<a class="lit" href="#/lit/${d.id}/${i}">Light these lines on the map</a>` : ""}</div>
        <p>${smart(one)}</p>${rest ? more("More", `<p>${smart(rest)}</p>`) : ""}</div></li>`;
    }).join("");
    return `<div class="pg jx" data-text="${d.id}">
      <a class="back" href="#/junctions"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M8 2L4 6l4 4"/></svg>All junctions</a>
      <header class="jx-head"><p class="kick">${esc(cat.name)} · Junction ${idx + 1} of ${CH.debates.length}</p><h1>${smart(d.q)}</h1><p class="lede"><b>${smart(d.title)}.</b> ${smart(d.intro)}</p></header>
      <section class="sign" aria-label="The text">${signHTML(d)}</section>
      <section class="tracks"><p class="tracks-h"><b>${d.positions.length} readings</b> leave this text</p><ol class="rds">${rows}</ol></section>
      <section class="jx-more">
        ${more("Where the readings part", `<p>${smart(d.crux)}</p>`, true)}
        ${more("How it played out", `<p>${smart(d.history)}</p>`)}
        ${d.people.length ? more(`People in this dispute <i>${d.people.length}</i>`, `<div class="pchips">${d.people.map(personChip).join("")}</div>`) : ""}
        ${d.councils.length ? more(`Councils and confessions <i>${d.councils.length}</i>`, `<ul class="c-links">${d.councils.filter(cid => C[cid]).sort((x, y) => C[x].year - C[y].year).map(cid => C[cid] ? `<li><a href="#/council/${cid}"><b>${C[cid].year}</b> ${smart(C[cid].name)}</a></li>` : "").join("")}</ul>`) : ""}
      </section>
      <nav class="prevnext wide">${prev ? `<a href="#/text/${prev.id}"><i>Previous junction</i>${smart(prev.title)}</a>` : "<span></span>"}${next ? `<a href="#/text/${next.id}"><i>Next junction</i>${smart(next.title)}</a>` : "<span></span>"}</nav></div>`;
  };

  let pplEra = "", pplLine = "";
  V.people = function () {
    const withP = CH.traditions.filter(t => CH.people.some(p => p.t === t.id));
    const shown = CH.people.filter(p => (!pplEra || p.e === pplEra) && (!pplLine || p.t === pplLine));
    return `<div class="pg">${pageHead("People", "Who rode which line", `${CH.people.length} people, from Peter to the present. Filter by era or by line.`)}
      <div class="filters"><div class="f-row" role="group" aria-label="Era"><button type="button" data-era="" class="${pplEra ? "" : "on"}">All eras</button>${CH.eras.map((e, i) => `<button type="button" data-era="${e.id}" class="${pplEra === e.id ? "on" : ""}"><b>${i + 1}</b> ${esc(e.name)}</button>`).join("")}</div>
      <div class="f-row bl-row" role="group" aria-label="Line"><button type="button" data-line="" class="all ${pplLine ? "" : "on"}">All lines</button>${withP.map(t => `<button type="button" data-line="${t.id}" class="${pplLine === t.id ? "on" : ""}" title="${esc(t.name)}" aria-label="${esc(t.name)}">${bl(t.id)}</button>`).join("")}</div></div>
      <p class="count"><b>${shown.length}</b> ${shown.length === 1 ? "person" : "people"}${pplLine ? " on the " + smart(X.tail(pplLine)) + " line" : ""}${pplEra ? " in " + esc(eraOf(pplEra).name) : ""}</p>
      <div class="sheet">${shown.map(p => `<a class="tile" href="#/p/${p.id}">${face(p, "sq")}<b>${smart(p.n)}</b><i>${esc(p.d)}</i></a>`).join("") || `<p class="empty">Nobody matches both filters. Clear one of them.</p>`}</div></div>`;
  };
  function personCard(id) {
    const p = P[id]; if (!p) return "";
    const ev = CH.events.map((e, i) => ({ e, i })).filter(o => o.e.people.indexOf(id) >= 0);
    const tx = CH.debates.filter(d => d.people.indexOf(id) >= 0);
    return `<div class="pc"><div class="pc-fig">${face(p, "xl")}${credit(p.w)}</div>
      <div class="pc-b"><p class="kick">${esc(eraOf(p.e) ? eraOf(p.e).name : "")}</p><h2 id="modal-title">${smart(p.n)}</h2><p class="when">${esc(p.d)} · ${smart(p.r)}</p>
      ${p.t && T[p.t] ? `<div class="served">${lineChip(p.t)}</div>` : ""}
      <p class="lede">${smart(p.b)}</p>
      ${ev.length ? `<h3>Stops</h3><ol class="strip" style="--c:${p.t && T[p.t] ? col(p.t) : "#141414"}">${ev.map(o => `<li><a href="#/station/e${o.i}"><b>${o.e.y}</b><span>${smart(o.e.t)}</span></a></li>`).join("")}</ol>` : ""}
      ${tx.length ? `<h3>Junctions</h3><ul class="sides">${tx.map(d => `<li><a href="#/text/${d.id}"><b>${smart(d.title)}</b><span>${smart(d.q)}</span></a></li>`).join("")}</ul>` : ""}</div></div>`;
  }

  V.councils = function (openId) {
    const ecu = CH.councils.filter(c => c.g === "ecumenical").sort((a, b) => a.year - b.year);
    const grid = `<div class="acc" style="--n:${ecu.length}"><div class="acc-h"><span></span>${ecu.map((c, i) => `<a href="#/council/${c.id}" title="${esc(c.name)}"><b>${i + 1}</b><span>${smart(c.name.replace(/^(?:(First|Second|Third) )?Council of (.+)$/, (m, o, city) => city + (o ? " " + { First: "I", Second: "II", Third: "III" }[o] : "")))}</span><i>${c.year}</i></a>`).join("")}<span></span></div>
      ${CH.councilAcceptance.map((row, r) => { const lines = X.acceptLines[r] || [], c = lines[0] ? col(lines[0]) : "#141414";
        return `<div class="acc-r" style="--c:${c}"><span class="who">${lines.map(l => blLink(l, "sm")).join("")}<b>${smart(row.who)}</b></span>${ecu.map((k, i) => { const st = i < row.upTo ? "full" : i < (row.soft || 0) ? "soft" : "none"; return `<span class="cell ${st}${st === "full" && i === row.upTo - 1 && row.upTo < ecu.length && !(row.soft > row.upTo) ? " last" : ""}" title="${st === "full" ? "Accepts" : st === "soft" ? "Agrees in substance" : "Does not accept"}"><i></i></span>`; }).join("")}<p>${smart(row.note)}</p></div>`; }).join("")}
      <p class="acc-key"><span class="cell full"><i></i></span>Stops here: accepts as binding <span class="cell soft"><i></i></span>Passes through: agrees with the teaching, does not treat the council as binding <span class="cell none"><i></i></span>No service: does not accept</p></div>`;
    const groups = CH.councilGroups.map(g => {
      const cs = CH.councils.filter(c => c.g === g.id).sort((a, b) => a.year - b.year);
      return `<section class="cg"><div class="cg-h"><h2>${esc(g.name)}</h2><p>${smart(g.line)}</p></div><ol class="c-strip">${cs.map(c => {
        const ev = X.councilEvent[c.id], lines = ev != null ? CH.events[ev].tags : (X.councilStation[c.id] || [0, []])[1];
        const tx = CH.debates.filter(d => d.councils.indexOf(c.id) >= 0);
        const body = `<dl class="council-dl"><div><dt>The question</dt><dd>${smart(c.issue)}</dd></div><div><dt>Decided</dt><dd>${smart(c.decided)}</dd></div><div><dt>What followed</dt><dd>${smart(c.after)}</dd></div></dl>
          ${lines.length ? `<div class="served">${lines.map(lineChip).join("")}</div>` : ""}${tx.length ? `<ul class="sides">${tx.map(d => `<li><a href="#/text/${d.id}"><b>${smart(d.title)}</b><span>${smart(d.q)}</span></a></li>`).join("")}</ul>` : ""}
          <p><a class="go" href="#/station/${ev != null ? "e" + ev : "c" + c.id}">Find it on the map</a></p>`;
        return `<li id="c-${c.id}" class="dz${c.id === openId ? " open" : ""}"><button type="button" class="dz-b c-b" aria-expanded="${c.id === openId}"><b>${esc(c.when)}</b><span>${smart(c.name)}<i>${esc(c.place)}</i></span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg></button><div class="dz-c"><div class="dz-i">${body}</div></div></li>`;
      }).join("")}</ol></section>`;
    }).join("");
    const creed = `<section class="creed"><div class="cg-h"><h2>The Nicene Creed</h2><p>The one statement nearly every line on the map still recites. Tap a line of it for what it was written against.</p></div>
      <ol>${CH.creed.map(l => `<li class="dz${l.mark ? " open fq" : ""}"><button type="button" class="dz-b cr-b" aria-expanded="${l.mark ? "true" : "false"}">${smart(l.t)}${l.mark ? `<em>Added in the West</em>` : ""}</button><div class="dz-c"><div class="dz-i"><p>${smart(l.n)}</p>${l.mark ? `<p><a class="go" href="#/text/filioque">Junction: The Filioque</a></p>` : ""}</div></div></li>`).join("")}</ol></section>`;
    return `<div class="pg">${pageHead("Councils", "Where the routes were decided", "Twenty-seven councils, confessions and declarations. The first seven are shared by more lines than any that came after.")}
      <section class="cg"><div class="cg-h"><h2>Which lines stop at which council</h2><p>The seven ecumenical councils, 325 to 787.</p></div>${grid}</section>${groups}${creed}</div>`;
  };

  const rowText = { authority: "scripture-tradition", salvation: "justification", baptism: "baptism-who", eucharist: "eucharist", sacraments: "confession", polity: "church-government", clergy: "celibacy", saints: "mary" };
  let cmp = ["orthodox", "catholic", "lutheran", "baptist"];
  V.timetable = function () {
    const have = CH.traditions.filter(t => t.stance), order = have.filter(t => cmp.indexOf(t.id) >= 0);
    return `<div class="pg">${pageHead("Timetable", "Eight questions, line by line", "Pick the lines to compare. Each cell is that tradition's answer in a sentence.")}
      <div class="f-row tt-pick" role="group" aria-label="Lines to compare">${have.map(t => `<button type="button" data-cmp="${t.id}" class="${cmp.indexOf(t.id) >= 0 ? "on" : ""}" aria-pressed="${cmp.indexOf(t.id) >= 0}">${bl(t.id, "sm")}<span>${smart(X.tail(t.id))}</span></button>`).join("")}</div>
      ${order.length ? `${order.length > 1 ? `<p class="tt-hint">Swipe sideways for the other lines</p>` : ""}<div class="tt-wrap"><table class="tt" style="--n:${order.length}"><thead><tr><th></th>${order.map(t => `<th style="--c:${col(t.id)}"><a href="#/line/${t.id}">${bl(t.id)}<b>${smart(X.tail(t.id))}</b></a></th>`).join("")}</tr></thead>
      <tbody>${CH.stanceTopics.map(k => `<tr><th><b>${esc(k[1])}</b><a href="#/text/${rowText[k[0]]}">The texts</a></th>${order.map(t => `<td>${smart(t.stance[k[0]])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : `<p class="empty">Pick at least one line above.</p>`}</div>`;
  };

  V.glossary = function () {
    return `<div class="pg">${pageHead("Glossary", "Words on the signs", "Short definitions for the terms used across the map.")}
      <dl class="gloss">${CH.glossary.map(g => `<div><dt>${smart(g[0])}</dt><dd>${smart(g[1])}</dd></div>`).join("")}</dl></div>`;
  };

  V.credits = function () {
    // Notices, descriptions, method and reading list are carried over word for word from version 1.
    const notices = {
      NIV: "Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.",
      NASB: "Scripture quotations taken from the New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995 by The Lockman Foundation. Used by permission. All rights reserved. lockman.org",
      NLT: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.",
      TPT: "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc. Used by permission. All rights reserved. ThePassionTranslation.com.",
      KJV: "King James Version, 1769 text. Public domain in the United States."
    };
    const kinds = { NIV: "Thought-for-thought and word-for-word in balance.", NASB: "Strictly word-for-word.", NLT: "Thought-for-thought, in everyday English.", TPT: "An expansive rendering by one translator. Many scholars class it as a paraphrase.", KJV: "The classic English Bible of 1611, in its 1769 spelling." };
    const imgs = Object.keys(CH.images).sort();
    return `<div class="pg">${pageHead("Credits", "Where this comes from", "Translations, method, reading and image credits.")}
      <section class="cr"><h2>Bible translations</h2>
        <dl class="src">${TR_HAVE.map(t => `<div><dt>${TR[t][0]} · ${esc(TR[t][1])}</dt><dd>${kinds[t]}<br><span class="sub">${esc(notices[t])}</span></dd></div>`).join("")}
        <div><dt>Douay-Rheims</dt><dd>Used for 2 Maccabees, which is not in the other translations here, and for one comparison in Luke 1:28. Public domain.</dd></div></dl>
      </section>
      <section class="cr"><h2>Method</h2>
        <p>Each position is stated the way its own confessions and teachers state it: the Catechism of the Catholic Church, the Orthodox councils and fathers, the Book of Concord, the Reformed and Westminster standards, the Thirty-Nine Articles, the Schleitheim and Baptist confessions, Wesley's sermons, and the statements of faith of Pentecostal, Adventist and Restoration churches. Where a tradition holds more than one view, the page says so.</p>
        <p>Dates before 400 are often approximate and are marked “c.” Membership numbers are rounded and labeled as estimates, or carry the name of the body that reports them. World totals follow the Center for the Study of Global Christianity and the Pew Research Center.</p>
        <p>The map is a diagram. A line is placed where it reads clearly, and a branch may be drawn a year or two after the date printed beside it so that it clears the line it leaves. The printed years are the ones to trust.</p>
      </section>
      <section class="cr"><h2>Further reading</h2>
        <ul class="reading">
          <li>Jaroslav Pelikan, <i>The Christian Tradition: A History of the Development of Doctrine</i>, 5 volumes (1971–1989)</li>
          <li>Diarmaid MacCulloch, <i>Christianity: The First Three Thousand Years</i> (2009) and <i>The Reformation</i> (2003)</li>
          <li>Justo L. González, <i>The Story of Christianity</i>, 2 volumes</li>
          <li>Henry Chadwick, <i>The Early Church</i> (1967)</li>
          <li>Timothy (Kallistos) Ware, <i>The Orthodox Church</i> (1963)</li>
          <li>Philip Jenkins, <i>The Lost History of Christianity</i> (2008), on the churches of Asia and Africa</li>
          <li>Mark Noll, <i>Turning Points: Decisive Moments in the History of Christianity</i></li>
          <li>Philip Schaff, <i>The Creeds of Christendom</i>, 3 volumes (1877), for the texts of the creeds and confessions</li>
        </ul>
      </section>
      <section class="cr"><h2>Image credits</h2><p>All images are served from Wikimedia Commons under the license shown. Pick a title for the file page.</p>
        <ul class="credits">${imgs.map(k => { const im = CH.images[k]; return `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">${esc(k)}</a> <span>${esc(list([im.by, im.lic]) || "Wikimedia Commons")}</span></li>`; }).join("")}</ul>
      </section></div>`;
  };
  V.notFound = () => `<div class="pg">${pageHead("Out of service", "No such stop", "That link does not lead anywhere on this map.")}<p><a class="btn" href="#/">Back to the map</a></p></div>`;

  /* ───────── router ───────── */
  let rendered = null, lastBase = "#/people", dockA = "baptist", dockB = "orthodox";
  const TABS = { "": "map", line: "map", station: "map", trip: "trip", lit: "map", lines: "lines", stations: "stations", junctions: "junctions", text: "junctions", people: "people", p: "people", councils: "councils", council: "councils", timetable: "timetable", glossary: "", credits: "" };
  function setTab(name) { $$(".tabs a").forEach(a => { const on = a.dataset.tab === name; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }); }
  function showMap() { viewMap.hidden = false; pageHost.hidden = true; document.body.classList.add("on-map"); ensureMap(); }
  function showPage(html) { viewMap.hidden = true; pageHost.hidden = false; document.body.classList.remove("on-map"); pageHost.innerHTML = html; window.scrollTo(0, 0); }
  function syncDock() {
    const f = $("#dock-form"); if (!f) return;
    f.elements.a.value = dockA; f.elements.b.value = dockB;
    $("#dock-out").innerHTML = tripTeaser(dockA, dockB);
    $("#dock-go").setAttribute("href", `#/trip/${dockA}/${dockB}`);
    const r = trip(dockA, dockB);
    $("#dock-toggle").innerHTML = `<b>Trip planner</b><span>${esc(X.tail(dockA))} to ${esc(X.tail(dockB))}</span><i>${r.parted ? "Parted " + r.parted : ""}</i>`;
  }
  function closeModal() { modal.classList.remove("open"); document.body.classList.remove("modal-open"); }
  function route() {
    const hash = location.hash || "#/", a = hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent), r = a[0];
    if (!(r in TABS)) { closeModal(); showPage(V.notFound()); setTab(""); rendered = hash; return; }
    if (r === "p") {
      if (!P[a[1]]) { showPage(V.notFound()); rendered = hash; return; }
      if (rendered == null) { showPage(V.people()); setTab("people"); rendered = "#/people"; lastBase = "#/people"; }
      modalBody.innerHTML = personCard(a[1]);
      modal.classList.add("open"); document.body.classList.add("modal-open"); modal.scrollTop = 0;
      $("#modal-x").focus({ preventScroll: true });
      return;
    }
    const wasModal = modal.classList.contains("open");
    closeModal();
    lastBase = hash;
    if (wasModal && rendered === hash) return;
    rendered = hash;
    setTab(TABS[r]);
    if (TABS[r] === "map" || r === "trip") {
      showMap(); setBanner("");
      if (r === "line" && T[a[1]]) { openPanel(linePanel(a[1]), "k-line"); map.unsel(); map.line(a[1]); }
      else if (r === "station" && stationPanel(a[1])) {
        openPanel(stationPanel(a[1]), "k-station"); map.clear(); map.station(a[1]);
      }
      else if (r === "trip" && T[a[1]] && T[a[2]]) { dockA = a[1]; dockB = a[2]; openPanel(tripPanel(a[1], a[2]), "k-trip"); map.unsel(); if (a[1] !== a[2]) map.trip(a[1], a[2]); else map.clear(); syncDock(); }
      else if (r === "lit" && D[a[1]] && D[a[1]].positions[+a[2]]) {
        const d = D[a[1]], pos = d.positions[+a[2]], held = pos.held.filter(h => T[h]);
        closePanel(); map.unsel(); map.lit(held);
        setBanner(`<span><i>${smart(d.title)}</i><b>${smart(pos.name)}</b><span class="bn-bl">${held.map(h => blLink(h, "sm")).join("")}</span></span><a class="btn sm" href="#/text/${d.id}">Back to the junction</a><a class="x" href="#/" aria-label="Clear">Clear</a>`);
      }
      else { closePanel(); map.unsel(); map.clear(); }
      return;
    }
    if (r === "lines") showPage(V.lines());
    else if (r === "stations") showPage(V.stations());
    else if (r === "junctions") showPage(V.junctions());
    else if (r === "text") showPage(V.text(a[1], a[2]));
    else if (r === "people") { showPage(V.people()); }
    else if (r === "councils") showPage(V.councils());
    else if (r === "council") { showPage(V.councils(a[1])); const el = document.getElementById("c-" + a[1]); if (el) el.scrollIntoView({ block: "center" }); }
    else if (r === "timetable") { if (a[1] && T[a[1]] && T[a[1]].stance && cmp.indexOf(a[1]) < 0) cmp.unshift(a[1]); showPage(V.timetable()); }
    else if (r === "glossary") showPage(V.glossary());
    else if (r === "credits") showPage(V.credits());
  }

  /* ───────── events ───────── */
  document.addEventListener("click", e => {
    const t = e.target;
    const dz = t.closest(".dz-b");
    if (dz) { const box = dz.parentNode, open = !box.classList.contains("open"); box.classList.toggle("open", open); dz.setAttribute("aria-expanded", open); return; }
    const tr = t.closest("button[data-tr]");
    if (tr) { curTr = tr.dataset.tr; store.set("vb.tr", curTr); const pg = $(".jx"); if (pg) $(".sign", pg).innerHTML = signHTML(D[pg.dataset.text]); return; }
    const step = t.closest("button[data-step],button[data-pass]");
    if (step) { const pg = $(".jx"), d = D[pg.dataset.text]; passageN = step.dataset.pass != null ? +step.dataset.pass : Math.max(0, Math.min(d.passages.length - 1, passageN + +step.dataset.step)); $(".sign", pg).innerHTML = signHTML(d); return; }
    const era = t.closest(".filters button[data-era]"), ln = t.closest(".filters button[data-line]");
    if (era || ln) { if (era) pplEra = era.dataset.era; else pplLine = ln.dataset.line; const y = window.scrollY; pageHost.innerHTML = V.people(); window.scrollTo(0, y); return; }
    const c = t.closest("button[data-cmp]");
    if (c) { const i = cmp.indexOf(c.dataset.cmp); if (i >= 0) cmp.splice(i, 1); else cmp.push(c.dataset.cmp); const y = window.scrollY; pageHost.innerHTML = V.timetable(); window.scrollTo(0, y); return; }
    if (t.closest("[data-swap]")) { const f = t.closest("form"); const a = f.elements.a.value; f.elements.a.value = f.elements.b.value; f.elements.b.value = a; f.dispatchEvent(new Event("change", { bubbles: true })); return; }
    if (t.closest("#panel-x")) { go("#/"); return; }
    if (t.closest("#modal-x") || t === modal) { go(lastBase); return; }
    if (t.closest("#dock-toggle")) { go(`#/trip/${dockA}/${dockB}`); return; }
  });
  document.addEventListener("change", e => {
    const f = e.target.closest("form[data-trip]");
    if (!f) return;
    dockA = f.elements.a.value; dockB = f.elements.b.value;
    if (f.id === "dock-form" && !panel.classList.contains("k-trip")) syncDock(); else go(`#/trip/${dockA}/${dockB}`);
    if (f.id === "dock-form" && panel.classList.contains("k-trip") && panelOpen) go(`#/trip/${dockA}/${dockB}`);
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (modal.classList.contains("open")) go(lastBase);
    else if (panelOpen || banner.classList.contains("open")) go("#/");
  });
  let rz = null, lastH = window.innerHeight, lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      if (!map) return;
      if (Math.abs(window.innerHeight - lastH) < 90 && Math.abs(window.innerWidth - lastW) < 40) { map.sync(); return; }
      lastH = window.innerHeight; lastW = window.innerWidth;
      if (viewMap.hidden) { map = null; $("#map").innerHTML = ""; return; }
      map = null; ensureMap(); rendered = null; route();
    }, 200);
  });
  window.addEventListener("hashchange", route);

  $("#dock-form").innerHTML = `<label><span>From</span><select name="a" aria-label="From line">${optList(dockA)}</select></label><button type="button" class="swap" data-swap aria-label="Swap from and to"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3v12M5 3L2 6M5 3l3 3M15 17V5M15 17l-3-3M15 17l3-3"/></svg></button><label><span>To</span><select name="b" aria-label="To line">${optList(dockB)}</select></label>`;
  syncDock();
  route();
})();
