/* Vine & Branches: routing and page rendering. All content lives in /data. */
(function () {
  "use strict";
  const CH = window.CH;
  const app = document.getElementById("app");
  const T = {}, P = {}, C = {}, D = {};
  CH.traditions.forEach(t => (T[t.id] = t));
  CH.people.forEach(p => (P[p.id] = p));
  CH.councils.forEach(c => (C[c.id] = c));
  CH.debates.forEach(d => (D[d.id] = d));
  CH.images = CH.images || {};
  CH.verses = CH.verses || {};

  /* ───────── helpers ───────── */
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // Escape, then turn straight quotes into curly ones.
  const smart = s => esc(s)
    .replace(/(^|[\s(\[“—-])'/g, "$1‘").replace(/'/g, "’")
    .replace(/(^|[\s(\[])&quot;/g, "$1“").replace(/&quot;/g, "”");
  const color = t => CH.families[t.family].color;
  const ERA_FIX = { 1054: "early-medieval", 1648: "reformation" };
  const eraOf = y => CH.eras.find(e => e.id === ERA_FIX[y]) || CH.eras.find(e => y >= e.from && y < e.to) || CH.eras[CH.eras.length - 1];
  const tLink = (id, label) => T[id] ? `<a class="tl" href="#/tradition/${id}" style="--c:${color(T[id])}">${smart(label || T[id].short.replace(/^.*→ /, ""))}</a>` : "";
  const pLink = id => P[id] ? `<a href="#/person/${id}">${smart(P[id].n)}</a>` : "";
  const list = (arr, sep) => arr.filter(Boolean).join(sep || ", ");
  const years = t => t.id === "early" ? "c. 30 – 1054" : t.end ? `${t.start} – ${t.end}` : `${t.start} – today`;
  const lineage = id => { const out = []; let n = T[id]; while (n) { out.unshift(n); n = T[n.parent]; } return out; };
  const children = id => CH.traditions.filter(t => t.parent === id).sort((a, b) => a.start - b.start);

  function pic(title, alt) {
    const im = CH.images[title];
    if (!im) return "";
    return `<img src="${esc(im.src)}" alt="${esc(alt || "")}" loading="lazy" decoding="async" width="${im.w}" height="${im.h}" onerror="this.parentNode.classList.add('noimg');this.remove()">`;
  }
  function credit(title) {
    const im = CH.images[title];
    if (!im) return "";
    const by = list([im.by, im.lic]) || "Wikimedia Commons";
    return `<a class="credit" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">Image: ${esc(by)}</a>`;
  }
  function portrait(p, cls) {
    const ini = p.n.replace(/\b(of|the|and|von|à)\b/g, "").split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("");
    return `<span class="portrait ${cls || ""}" data-i="${esc(ini)}">${pic(p.w, p.n)}</span>`;
  }
  const personCard = p => `<a class="pcard" href="#/person/${p.id}">${portrait(p)}<span class="pcard-n">${smart(p.n)}</span><span class="pcard-d">${esc(p.d)}</span><span class="pcard-r">${smart(p.r)}</span></a>`;
  const personChip = id => P[id] ? `<a class="chip" href="#/person/${id}">${portrait(P[id], "sm")}<span><b>${smart(P[id].n)}</b><i>${esc(P[id].d)}</i></span></a>` : "";

  /* ───────── translations and verses ───────── */
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
  let VB = [];
  const prettyRef = r => esc(r.replace(/^Psalms /, "Psalm ").replace(/^Jude 1:/, "Jude ").replace(/-/g, "–"));
  function verseBody(i) {
    const p = VB[i], data = CH.verses[p.t ? p.ref + "|" + p.t : p.ref];
    if (!data) return `<figcaption><span class="ref">${prettyRef(p.ref)}</span></figcaption>`;
    const have = p.t ? Object.keys(data) : TR_ORDER.filter(t => data[t]);
    const use = have.indexOf(curTr) >= 0 ? curTr : have[0];
    const tabs = have.length > 1
      ? `<span class="trs" role="group" aria-label="Translation">${have.map(t => `<button type="button" data-tr="${t}" class="${t === use ? "on" : ""}" title="${esc(TR[t][1])}" aria-pressed="${t === use}">${TR[t][0]}</button>`).join("")}</span>`
      : `<span class="trs"><span class="only" title="${esc(TR[use][1])}">${TR[use][0]}</span></span>`;
    const body = data[use].map(v => `<sup class="vn">${v[1]}</sup>${smart(v[2])}`).join(" ");
    return `<figcaption><span class="ref">${prettyRef(p.ref)}</span>${tabs}</figcaption><blockquote>${body}</blockquote>${p.note ? `<p class="vnote">${smart(p.note)}</p>` : ""}`;
  }
  function verseBlock(p, cls) { VB.push(p); const i = VB.length - 1; return `<figure class="verse ${cls || ""}" data-vb="${i}">${verseBody(i)}</figure>`; }
  function verseText(ref, n) { const d = CH.verses[ref]; if (!d) return ""; const rows = d[curTr] || d[TR_ORDER.find(t => d[t])]; const v = rows.find(r => r[1] === n) || rows[0]; return v ? v[2] : ""; }
  app.addEventListener("click", e => {
    const b = e.target.closest("button[data-tr]");
    if (!b) return;
    curTr = b.dataset.tr; store.set("vb.tr", curTr);
    document.querySelectorAll("figure.verse").forEach(f => (f.innerHTML = verseBody(+f.dataset.vb)));
    document.querySelectorAll("[data-vline]").forEach(el => { const a = el.dataset.vline.split("|"); el.innerHTML = smart(verseText(a[0], +a[1])); });
  });

  /* ───────── views ───────── */
  const V = {};
  const head = (eyebrow, h1, lede) => `<header class="page-head"><p class="eyebrow">${eyebrow}</p><h1>${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}</header>`;

  V.home = function () {
    const partings = [
      ["431 · 451", "The East divides over Christ", "Two councils define how Jesus is both God and man. The churches of Persia, then of Egypt, Syria, Armenia and Ethiopia, refuse the wording and go their own way.", ["church-east", "oriental"], "christology"],
      ["1054", "Greek East and Latin West", "After centuries of drift over language, the pope's claims and one word in the creed, Rome and Constantinople excommunicate each other.", ["orthodox", "catholic"], "filioque"],
      ["1517", "The Reformation", "A protest about indulgences becomes a break over how sinners are made right with God and who has the last word. Lutheran, Reformed and Anglican churches emerge.", ["lutheran", "reformed", "anglican"], "justification"],
      ["1525 · 1609", "The believers' churches", "Anabaptists and then Baptists baptize only those who profess faith and cut the tie between church and state.", ["anabaptist", "baptist"], "baptism-who"],
      ["1738 · 1906", "Revival and the Spirit", "Wesley's warmed heart starts Methodism. Its Holiness heirs gather at Azusa Street, and Pentecostalism goes around the world.", ["methodist", "pentecostal"], "gifts"]
    ];
    const feat = [["peter-rock", "Matthew 16:18-19", 18], ["eucharist", "Matthew 26:26-28", 26], ["justification", "James 2:20-24", 24], ["baptism-what", "1 Peter 3:20-21", 21], ["predestination", "1 Timothy 2:3-6", 4], ["gifts", "1 Corinthians 13:8-10", 10]];
    const living = CH.traditions.filter(t => !t.end).length;
    return `
    <section class="hero">
      <div class="hero-img">${pic("Disputation of the Holy Sacrament", "")}</div>
      <div class="hero-in">
        <p class="eyebrow">A map of church history, AD 30 to today</p>
        <h1>One vine.<br>Two thousand years <i>of branches.</i></h1>
        <p class="lede">Who split from whom, when, and over which words of Scripture. Every major tradition, the people and councils that shaped it, and the passages Christians still read differently.</p>
        <p class="hero-links"><a class="go" href="#/tree">Trace the family tree</a><a class="go" href="#/texts">Read the disputed texts</a></p>
      </div>
      <p class="hero-credit">Raphael, <i>Disputation of the Holy Sacrament</i>, 1509–1510. ${credit("Disputation of the Holy Sacrament")}</p>
    </section>

    <section class="counts" aria-label="What is on this site">
      <a href="#/tree"><b>${CH.traditions.length}</b><span>branches traced, ${living} of them alive today</span></a>
      <a href="#/story"><b>${CH.events.length}</b><span>turning points from Pentecost to 2025</span></a>
      <a href="#/people"><b>${CH.people.length}</b><span>people who shaped the church</span></a>
      <a href="#/texts"><b>${CH.debates.length}</b><span>disputed texts, with ${Object.keys(CH.verses).length} passages written out</span></a>
      <a href="#/councils"><b>${CH.councils.length}</b><span>councils and confessions</span></a>
    </section>

    <section class="band">
      <div class="band-in split">
        <div>
          <p class="eyebrow">The family tree</p>
          <h2>Every branch, back to the trunk</h2>
          <p>About 2.6 billion people call themselves Christian today (estimate, Center for the Study of Global Christianity). They belong to thousands of church bodies, and nearly all of them trace back to a handful of partings.</p>
          <p>The tree shows each tradition as a line that leaves its parent in the year of the split. Follow any line to the left and you arrive at the same place.</p>
          <p><a class="go" href="#/tree">Open the full tree</a></p>
        </div>
        <a class="mini-tree" href="#/tree" id="miniTree" aria-label="Open the family tree"></a>
      </div>
    </section>

    <section class="block">
      <p class="eyebrow">Start here</p>
      <h2>Five partings that drew the map</h2>
      <ol class="partings">
        ${partings.map(p => `<li><div class="pt-year">${p[0]}</div><div><h3>${p[1]}</h3><p>${p[2]}</p><p class="pt-links">${p[3].map(id => tLink(id)).join("")}<a class="more" href="#/text/${p[4]}">The text behind it: ${smart(D[p[4]].title)}</a></p></div></li>`).join("")}
      </ol>
    </section>

    <section class="band dark">
      <div class="band-in">
        <p class="eyebrow">Disputed texts</p>
        <h2>Same words, different readings</h2>
        <p class="lede">Most church divisions come down to a sentence. Each page sets out the passages in full, the exact point where readers part, and how each tradition reads them.</p>
        <div class="feat">
          ${feat.map(f => `<a class="feat-card" href="#/text/${f[0]}"><span class="feat-ref">${prettyRef(f[1].replace(/:.*/, "") + ":" + f[2])}</span><q data-vline="${f[1]}|${f[2]}">${smart(verseText(f[1], f[2]))}</q><span class="feat-t">${smart(D[f[0]].title)}</span><span class="feat-q">${smart(D[f[0]].q)}</span></a>`).join("")}
        </div>
        <p><a class="go" href="#/texts">All ${CH.debates.length} disputed texts</a></p>
      </div>
    </section>

    <section class="block">
      <p class="eyebrow">The story</p>
      <h2>Eight chapters</h2>
      <div class="eras">
        ${CH.eras.map((e, i) => `<a class="era-tile" href="#/story/${e.id}"><span class="era-img">${pic(e.w, "")}</span><span class="era-n">${i + 1}</span><b>${smart(e.name)}</b><i>${esc(e.label)}</i></a>`).join("")}
      </div>
    </section>

    <section class="closing">
      ${verseBlock({ ref: "John 17:20-21" }, "big")}
      <p>Jesus's prayer on the night before he died. Every tradition on this site prays it.</p>
    </section>`;
  };
  V.home.after = function () {
    const host = document.getElementById("miniTree");
    if (host) CH.tree.render(host, { mini: true });
  };

  V.story = function (eraId) {
    const eras = CH.eras.map(e => ({ e, ev: CH.events.filter(x => eraOf(x.y).id === e.id).sort((a, b) => a.y - b.y) }));
    return `<div class="page">
      ${head("The Story", "Twenty centuries in eight chapters", "From a room in Jerusalem to every country on earth. The moments in red changed the direction of the whole church.")}
      <label class="toggle"><input type="checkbox" id="keyOnly"> Show key moments only</label>
      <div class="story-grid">
        <nav class="era-nav" aria-label="Chapters">${eras.map((x, i) => `<a href="#/story/${x.e.id}" data-era="${x.e.id}"><span>${i + 1}</span>${smart(x.e.name)}<i>${esc(x.e.label)}</i></a>`).join("")}</nav>
        <div class="story-main">
          ${eras.map((x, i) => `<section class="era" id="era-${x.e.id}">
            <figure class="era-fig">${pic(x.e.w, "")}<figcaption>${smart(x.e.cap)} ${credit(x.e.w)}</figcaption></figure>
            <p class="eyebrow">Chapter ${i + 1} · ${esc(x.e.label)}</p>
            <h2>${smart(x.e.name)}</h2>
            <p class="era-intro">${smart(x.e.intro)}</p>
            <div class="evs">
              ${x.ev.map(ev => `<article class="ev${ev.k ? " key" : ""}">
                <div class="ev-date">${esc(ev.d)}</div>
                <div class="ev-body"><h3>${smart(ev.t)}</h3><p>${smart(ev.x)}</p>
                <p class="ev-tags">${(ev.tags || []).map(t => tLink(t)).join("")}${(ev.people || []).map(pLink).join("")}</p></div>
              </article>`).join("")}
            </div>
          </section>`).join("")}
        </div>
      </div>
    </div>`;
  };
  V.story.after = function (eraId) {
    const box = document.getElementById("keyOnly");
    box.addEventListener("change", () => app.classList.toggle("key-only", box.checked));
    app.classList.remove("key-only");
    if (eraId) { const el = document.getElementById("era-" + eraId); if (el) el.scrollIntoView(); }
    const links = [].slice.call(document.querySelectorAll(".era-nav a"));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle("on", "era-" + a.dataset.era === en.target.id)); }), { rootMargin: "-20% 0px -70% 0px" });
      document.querySelectorAll("section.era").forEach(s => io.observe(s));
    }
  };

  let treeApi = null, treeZoom = 1;
  V.tree = function () {
    const fams = Object.keys(CH.families).filter(f => CH.traditions.some(t => t.family === f));
    return `<div class="page wide">
      ${head("Family Tree", "How one church became many", "Time runs left to right. Each line is a tradition, and it leaves its parent in the year of the split. Dashed lines mark other ties. Point at a line to trace it back to the apostles, and click it for the story.")}
      <div class="tree-tools">
        <div class="jump"><span>Jump to</span>${CH.eras.map(e => `<button type="button" data-year="${e.from}">${esc(e.label.replace("c. ", ""))}</button>`).join("")}</div>
        <div class="zoom"><button type="button" data-z="-1" aria-label="Zoom out">−</button><span>Zoom</span><button type="button" data-z="1" aria-label="Zoom in">+</button></div>
      </div>
      <div id="treeHost" class="tree-host"></div>
      <ul class="legend">${fams.map(f => `<li style="--c:${CH.families[f].color}">${smart(CH.families[f].name)}</li>`).join("")}</ul>
      <div class="tree-notes">
        <p><b>Reading it fairly.</b> Catholics and Orthodox each hold that they are the trunk continued, so the diagram splits it evenly in 1054. The Oriental Orthodox and the Church of the East make the same claim for the 400s. Protestants see themselves as reforming the one church, not founding new ones.</p>
        <p><b>What it leaves out.</b> A line shows when a tradition began, not how large it is or whether it is right. Movements that cross many churches, such as Pietism, evangelicalism and the ecumenical movement, appear in <a href="#/story">The Story</a>.</p>
      </div>
      <aside class="tree-panel" id="treePanel" hidden aria-live="polite"></aside>
    </div>`;
  };
  function treePanel(id) {
    const el = document.getElementById("treePanel");
    if (!el) return;
    if (!id) { el.hidden = true; return; }
    const t = T[id], kids = children(id), par = T[t.parent];
    el.hidden = false;
    el.style.setProperty("--c", color(t));
    el.innerHTML = `<button type="button" class="x" aria-label="Close">Close</button>
      <p class="fam">${smart(CH.families[t.family].name)}</p>
      <h2>${smart(t.name)}</h2>
      <p class="meta">${esc(years(t))}${t.size ? " · " + smart(t.size) : ""}</p>
      <p>${smart(t.blurb)}</p>
      <dl>
        ${par ? `<dt>Came out of</dt><dd>${tLink(par.id, par.name)}<br>${smart(t.from || "")}</dd>` : t.from ? `<dt>Began</dt><dd>${smart(t.from)}</dd>` : ""}
        ${(t.links || []).length ? `<dt>Other ties</dt><dd>${t.links.map(l => `${tLink(l.to, T[l.to].name)}: ${smart(l.note)}`).join("<br>")}</dd>` : ""}
        ${kids.length ? `<dt>Branches from it</dt><dd>${kids.map(k => `${tLink(k.id)} <span class="yr">${k.start}</span>`).join("")}</dd>` : ""}
      </dl>
      <a class="go" href="#/tradition/${t.id}">Open the full page</a>`;
  }
  V.tree.after = function (focus) {
    const host = document.getElementById("treeHost");
    const draw = keep => {
      treeApi = CH.tree.render(host, { zoom: treeZoom, onSelect: treePanel });
      if (keep != null) treeApi.centerOn(keep);
    };
    draw();
    if (focus && T[focus]) { treeApi.select(focus); treePanel(focus); treeApi.reveal(focus); }
    document.querySelector(".tree-tools").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.year) treeApi.toYear(+b.dataset.year, true);
      if (b.dataset.z) { const c = treeApi.centerYear(); treeZoom = Math.min(1.6, Math.max(0.5, +(treeZoom + 0.25 * +b.dataset.z).toFixed(2))); draw(c); treePanel(null); }
    });
    document.getElementById("treePanel").addEventListener("click", e => { if (e.target.closest(".x")) { treePanel(null); treeApi.select(null); } });
  };

  V.traditions = function () {
    const fams = Object.keys(CH.families);
    return `<div class="page">
      ${head("Traditions", "The branches, one by one", "Forty traditions grouped by family. Each page covers where it came from, what marks it out, who shaped it and which texts it reads differently from its neighbors.")}
      ${fams.map(f => {
        const ts = CH.traditions.filter(t => t.family === f).sort((a, b) => a.start - b.start);
        if (!ts.length) return "";
        return `<section class="fam-group" style="--c:${CH.families[f].color}"><h2>${smart(CH.families[f].name)}</h2>
          ${ts.map(t => `<a class="trow" href="#/tradition/${t.id}"><span class="trow-y">${t.id === "early" ? "c. 30" : t.start}${t.end ? "–" + t.end : ""}</span><span class="trow-b"><b>${smart(t.name)}</b><span>${smart(t.blurb)}</span></span><span class="trow-s">${smart((t.size || "").replace(/ \(.*/, ""))}</span></a>`).join("")}
        </section>`;
      }).join("")}
      <p class="fineprint">Membership counts are rounded estimates. Churches count their members in different ways, so the figures are not strictly comparable.</p>
    </div>`;
  };

  V.tradition = function (id) {
    const t = T[id]; if (!t) return V.notFound();
    const line = lineage(id), kids = children(id), par = T[t.parent];
    const texts = CH.debates.map(d => ({ d, pos: d.positions.filter(o => o.held.indexOf(id) >= 0) })).filter(x => x.pos.length);
    const evs = CH.events.filter(e => (e.tags || []).indexOf(id) >= 0).sort((a, b) => a.y - b.y);
    const people = (t.people || []).concat(CH.people.filter(p => p.t === id && (t.people || []).indexOf(p.id) < 0).map(p => p.id));
    return `<div class="page trad" style="--c:${color(t)}">
      <nav class="crumbs" aria-label="Lineage">${line.map((n, i) => i === line.length - 1 ? `<span>${smart(n.short.replace(/^.*→ /, ""))}</span>` : `${tLink(n.id)}<i>${line[i + 1].start}</i>`).join("")}</nav>
      <header class="page-head"><p class="eyebrow">${smart(CH.families[t.family].name)}</p><h1>${smart(t.name)}</h1><p class="lede">${smart(t.blurb)}</p></header>
      <div class="trad-grid">
        <div class="trad-main">
          ${t.w && CH.images[t.w] ? `<figure class="trad-fig">${pic(t.w, "")}<figcaption>${esc(t.w)}. ${credit(t.w)}</figcaption></figure>` : ""}
          <h2>Where it came from</h2>
          <p>${smart(t.origins)}</p>
          <h2>What marks it out</h2>
          <ul class="marks">${t.marks.map(m => `<li>${smart(m)}</li>`).join("")}</ul>
          ${t.stance ? `<h2>Where it stands</h2><table class="stance"><tbody>${CH.stanceTopics.map(k => `<tr><th>${k[1]}</th><td>${smart(t.stance[k[0]])}</td></tr>`).join("")}</tbody></table><p><a class="go" href="#/compare/${id}">Compare with other traditions</a></p>` : ""}
          ${texts.length ? `<h2>Texts it reads its own way</h2><div class="reads">${texts.map(x => `<a href="#/text/${x.d.id}"><b>${smart(x.d.title)}</b><span>${x.pos.map(o => smart(o.name)).join(" · ")}</span></a>`).join("")}</div>` : ""}
          ${evs.length ? `<h2>On the timeline</h2><ul class="mini-ev">${evs.map(e => `<li><a href="#/story/${eraOf(e.y).id}"><span>${esc(e.d)}</span>${smart(e.t)}</a></li>`).join("")}</ul>` : ""}
        </div>
        <aside class="trad-side">
          <dl class="facts">
            <dt>Active</dt><dd>${esc(years(t))}</dd>
            <dt>Began</dt><dd>${smart(t.founded)}</dd>
            ${t.size ? `<dt>Size today</dt><dd>${smart(t.size)}</dd>` : ""}
            ${par ? `<dt>Came out of</dt><dd>${tLink(par.id, par.name)}<br><span class="sub">${smart(t.from || "")}</span></dd>` : ""}
            ${(t.links || []).length ? `<dt>Other ties</dt><dd>${t.links.map(l => `${tLink(l.to, T[l.to].name)}<br><span class="sub">${smart(l.note)}</span>`).join("<br>")}</dd>` : ""}
            ${kids.length ? `<dt>Branches from it</dt><dd class="kids">${kids.map(k => `${tLink(k.id)} <span class="sub">${k.start}</span>`).join("<br>")}</dd>` : ""}
            ${t.bodies ? `<dt>${t.end ? "Legacy" : "Church bodies today"}</dt><dd>${smart(t.bodies)}</dd>` : ""}
          </dl>
          <a class="go" href="#/tree/${id}">See it on the tree</a>
          ${people.length ? `<h3>Key people</h3><div class="chips">${people.map(personChip).join("")}</div>` : ""}
        </aside>
      </div>
    </div>`;
  };

  V.texts = function () {
    return `<div class="page">
      ${head("Disputed Texts", "Same words, different readings", "Twenty-nine questions that divide the churches. Each page writes out the passages, names the exact point where readers part, and sets the readings side by side.")}
      ${trNote()}
      ${CH.debateCats.map(c => `<section class="cat"><div class="cat-h"><h2>${smart(c.name)}</h2><p>${smart(c.line)}</p></div>
        <div class="cat-list">${CH.debates.filter(d => d.cat === c.id).map(d => `<a class="drow" href="#/text/${d.id}"><b>${smart(d.title)}</b><span>${smart(d.q)}</span><i>${d.passages.slice(0, 3).map(p => prettyRef(p.ref)).join(" · ")}${d.passages.length > 3 ? " +" + (d.passages.length - 3) : ""}</i></a>`).join("")}</div>
      </section>`).join("")}
    </div>`;
  };
  function trNote() {
    return `<p class="tr-note">Verse text is shown in ${list(TR_HAVE.map(t => `<abbr title="${esc(TR[t][1])}">${TR[t][0]}</abbr>`))}. Switch translation on any passage and the whole site follows. <a href="#/sources">About the translations</a></p>`;
  }

  V.text = function (id) {
    const d = D[id]; if (!d) return V.notFound();
    const all = CH.debates, i = all.indexOf(d), prev = all[i - 1], next = all[i + 1];
    const cat = CH.debateCats.find(c => c.id === d.cat);
    return `<div class="page text">
      <nav class="crumbs"><a href="#/texts">Disputed Texts</a><i>›</i><span>${smart(cat.name)}</span></nav>
      <header class="page-head"><p class="eyebrow">${smart(cat.name)}</p><h1>${smart(d.title)}</h1><p class="q">${smart(d.q)}</p><p class="lede">${smart(d.intro)}</p></header>
      <section class="t-sec"><div class="t-h"><h2>The passages</h2>${trNote()}</div>
        <div class="passages">${d.passages.map(p => verseBlock(p)).join("")}</div>
      </section>
      <section class="t-sec crux"><div class="t-h"><h2>Where the reading splits</h2></div><p>${smart(d.crux)}</p></section>
      <section class="t-sec"><div class="t-h"><h2>How each tradition reads it</h2></div>
        <div class="positions">${d.positions.map(o => `<article class="pos" style="--c:${o.held.length ? color(T[o.held[0]]) : "var(--muted)"}">
          <h3>${smart(o.name)}</h3>
          ${o.held.length ? `<p class="held">${o.held.map(h => tLink(h)).join("")}</p>` : ""}
          <p>${smart(o.text)}</p></article>`).join("")}</div>
      </section>
      <section class="t-sec"><div class="t-h"><h2>How it played out</h2></div><p>${smart(d.history)}</p>
        ${(d.councils || []).length ? `<p class="rel"><span>Councils and confessions</span>${d.councils.filter(c => C[c]).map(c => `<a href="#/councils/${c}">${smart(C[c].name)} <i>${esc(C[c].when)}</i></a>`).join("")}</p>` : ""}
        ${(d.people || []).length ? `<div class="chips">${d.people.map(personChip).join("")}</div>` : ""}
      </section>
      <nav class="pager">${prev ? `<a href="#/text/${prev.id}"><i>Previous</i>${smart(prev.title)}</a>` : "<span></span>"}${next ? `<a class="nx" href="#/text/${next.id}"><i>Next</i>${smart(next.title)}</a>` : ""}</nav>
    </div>`;
  };

  V.councils = function () {
    const seven = CH.councils.filter(c => c.n).sort((a, b) => a.n - b.n);
    return `<div class="page">
      ${head("Councils &amp; Creeds", "Where the church put it in writing", "When a dispute could not be settled any other way, bishops met and voted. Later, Protestant churches wrote confessions. These texts are the fixed points that every later argument refers back to.")}
      <section class="t-sec"><div class="t-h"><h2>Who accepts which councils</h2><p>The seven councils of the first millennium, and how far each family of churches follows them.</p></div>
        <div class="accept-wrap"><table class="accept"><thead><tr><th></th>${seven.map(c => `<th><a href="#/councils/${c.id}">${esc(c.name.replace(/ Council of|Council of /, " ").trim())}<i>${esc(c.when)}</i></a></th>`).join("")}</tr></thead>
        <tbody>${CH.councilAcceptance.map(r => `<tr><th>${smart(r.who)}<i>${smart(r.note)}</i></th>${seven.map(c => `<td class="${c.n <= r.upTo ? "yes" : c.n <= (r.soft || 0) ? "soft" : "no"}"><span>${c.n <= r.upTo ? "Accepts" : c.n <= (r.soft || 0) ? "Agrees in substance" : "Does not accept"}</span></td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <p class="dotkey"><span class="yes"></span>Accepts as binding <span class="soft"></span>Agrees with the teaching, does not treat the council as binding <span class="no"></span>Does not accept</p>
      </section>
      <section class="t-sec"><div class="t-h"><h2>The Nicene Creed, line by line</h2><p>The one statement of faith shared by Catholic, Orthodox and most Protestant churches. Nearly every phrase was written to shut out a particular teaching. Text of 381 in the English of the 1662 Book of Common Prayer.</p></div>
        <div class="creed">${CH.creed.map(l => `<div class="creed-row${l.mark ? " mark" : ""}"><p class="creed-t">${smart(l.t)}</p><p class="creed-n">${smart(l.n)}</p></div>`).join("")}</div>
      </section>
      ${CH.councilGroups.map(g => `<section class="t-sec"><div class="t-h"><h2>${smart(g.name)}</h2><p>${smart(g.line)}</p></div>
        <div class="councils">${CH.councils.filter(c => c.g === g.id).sort((a, b) => a.year - b.year).map(c => `<article class="council" id="c-${c.id}">
          <div class="council-y">${esc(c.when)}<i>${smart(c.place)}</i></div>
          <div><h3>${smart(c.name)}</h3>
            <dl><dt>The question</dt><dd>${smart(c.issue)}</dd><dt>What it decided</dt><dd>${smart(c.decided)}</dd><dt>What followed</dt><dd>${smart(c.after)}</dd></dl>
            ${(() => { const ds = CH.debates.filter(d => (d.councils || []).indexOf(c.id) >= 0); return ds.length ? `<p class="rel"><span>Disputed texts</span>${ds.map(d => `<a href="#/text/${d.id}">${smart(d.title)}</a>`).join("")}</p>` : ""; })()}
          </div></article>`).join("")}</div>
      </section>`).join("")}
    </div>`;
  };
  V.councils.after = function (id) { if (id) { const el = document.getElementById("c-" + id); if (el) { el.scrollIntoView(); el.classList.add("flash"); } } };

  let peopleEra = "all", peopleQ = "";
  V.people = function () {
    return `<div class="page wide">
      ${head("People", "The ones who shaped it", "Apostles, bishops, monks, reformers, preachers and a few emperors. Portraits are historical paintings and photographs from Wikimedia Commons.")}
      <div class="ptools"><div class="tabs" id="ptabs"><button type="button" data-era="all">All</button>${CH.eras.map(e => `<button type="button" data-era="${e.id}">${smart(e.name)}</button>`).join("")}</div>
      <input type="search" id="pq" placeholder="Filter by name or role" value="${esc(peopleQ)}" aria-label="Filter people"></div>
      <div class="pgrid" id="pgrid"></div>
    </div>`;
  };
  V.people.after = function () {
    const grid = document.getElementById("pgrid"), tabs = document.getElementById("ptabs"), q = document.getElementById("pq");
    const draw = () => {
      const s = peopleQ.trim().toLowerCase();
      const ps = CH.people.filter(p => (peopleEra === "all" || p.e === peopleEra) && (!s || (p.n + " " + p.r).toLowerCase().indexOf(s) >= 0));
      grid.innerHTML = ps.map(personCard).join("") || `<p class="empty">No one matches that filter.</p>`;
      tabs.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.era === peopleEra));
    };
    tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { peopleEra = b.dataset.era; draw(); } });
    q.addEventListener("input", () => { peopleQ = q.value; draw(); });
    draw();
  };

  V.person = function (id) {
    const p = P[id]; if (!p) return V.notFound();
    const era = CH.eras.find(e => e.id === p.e);
    const evs = CH.events.filter(e => (e.people || []).indexOf(id) >= 0).sort((a, b) => a.y - b.y);
    const texts = CH.debates.filter(d => (d.people || []).indexOf(id) >= 0);
    const peers = CH.people.filter(x => x.e === p.e && x.id !== id);
    const at = CH.people.indexOf(p), near = [CH.people[at - 2], CH.people[at - 1], CH.people[at + 1], CH.people[at + 2]].filter(Boolean);
    return `<div class="page person">
      <nav class="crumbs"><a href="#/people">People</a><i>›</i><span>${smart(era.name)}</span></nav>
      <div class="person-grid">
        <figure class="person-fig">${portrait(p, "lg")}${CH.images[p.w] ? `<figcaption>${credit(p.w)}</figcaption>` : ""}</figure>
        <div>
          <header class="page-head"><p class="eyebrow">${smart(p.r)}</p><h1>${smart(p.n)}</h1><p class="q">${esc(p.d)}</p></header>
          <p class="bio">${smart(p.b)}</p>
          <dl class="facts row">${p.t && T[p.t] ? `<dt>Tradition</dt><dd>${tLink(p.t, T[p.t].name)}</dd>` : ""}<dt>Era</dt><dd><a href="#/story/${era.id}">${smart(era.name)}, ${esc(era.label)}</a></dd></dl>
          ${evs.length ? `<h2>On the timeline</h2><ul class="mini-ev">${evs.map(e => `<li><a href="#/story/${eraOf(e.y).id}"><span>${esc(e.d)}</span>${smart(e.t)}</a></li>`).join("")}</ul>` : ""}
          ${texts.length ? `<h2>In the disputed texts</h2><div class="reads">${texts.map(d => `<a href="#/text/${d.id}"><b>${smart(d.title)}</b><span>${smart(d.q)}</span></a>`).join("")}</div>` : ""}
          <h2>Around the same time</h2><div class="chips">${near.map(x => personChip(x.id)).join("")}</div>
        </div>
      </div>
    </div>`;
  };

  let cmp = ["catholic", "orthodox", "lutheran", "baptist"];
  V.compare = function (add) {
    const able = CH.traditions.filter(t => t.stance);
    if (add && T[add] && T[add].stance && cmp.indexOf(add) < 0) cmp = [add].concat(cmp).slice(0, 4);
    return `<div class="page wide">
      ${head("Compare", "Side by side", "Pick the traditions you want to set next to each other. Each cell is that church's own position in a sentence. For the reasoning behind a row, follow the link to the disputed text.")}
      <div class="cmp-pick" id="cmpPick">${able.map(t => `<button type="button" data-id="${t.id}" style="--c:${color(t)}">${smart(t.short.replace(/^.*→ /, ""))}</button>`).join("")}</div>
      <div class="cmp-wrap" id="cmpTable"></div>
    </div>`;
  };
  V.compare.after = function () {
    const rowText = { authority: "scripture-tradition", salvation: "justification", baptism: "baptism-who", eucharist: "eucharist", sacraments: "confession", polity: "church-government", clergy: "celibacy", saints: "images-saints" };
    const pick = document.getElementById("cmpPick"), out = document.getElementById("cmpTable");
    const draw = () => {
      pick.querySelectorAll("button").forEach(b => b.classList.toggle("on", cmp.indexOf(b.dataset.id) >= 0));
      const order = CH.traditions.filter(t => cmp.indexOf(t.id) >= 0);
      out.innerHTML = order.length ? `<table class="cmp" style="--n:${order.length}"><thead><tr><th></th>${order.map(t => `<th style="--c:${color(t)}"><a href="#/tradition/${t.id}">${smart(t.name)}</a><i>${esc(years(t))}</i></th>`).join("")}</tr></thead>
        <tbody>${CH.stanceTopics.map(k => `<tr><th>${k[1]}<a href="#/text/${rowText[k[0]]}">The texts</a></th>${order.map(t => `<td>${smart(t.stance[k[0]])}</td>`).join("")}</tr>`).join("")}</tbody></table>` : `<p class="empty">Pick at least one tradition above.</p>`;
    };
    pick.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const i = cmp.indexOf(b.dataset.id); if (i >= 0) cmp.splice(i, 1); else cmp.push(b.dataset.id); draw(); });
    draw();
  };

  V.glossary = function () {
    return `<div class="page">${head("Glossary", "The words you keep running into", "Short definitions for the terms used across the site.")}
      <dl class="gloss">${CH.glossary.map(g => `<div><dt>${smart(g[0])}</dt><dd>${smart(g[1])}</dd></div>`).join("")}</dl></div>`;
  };

  V.sources = function () {
    const notices = {
      NIV: "Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.",
      NASB: "Scripture quotations taken from the New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995 by The Lockman Foundation. Used by permission. All rights reserved. lockman.org",
      NLT: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.",
      TPT: "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc. Used by permission. All rights reserved. ThePassionTranslation.com.",
      KJV: "King James Version, 1769 text. Public domain in the United States."
    };
    const kinds = { NIV: "Thought-for-thought and word-for-word in balance.", NASB: "Strictly word-for-word.", NLT: "Thought-for-thought, in everyday English.", TPT: "An expansive rendering by one translator. Many scholars class it as a paraphrase.", KJV: "The classic English Bible of 1611, in its 1769 spelling." };
    const imgs = Object.keys(CH.images).sort();
    return `<div class="page">
      ${head("Sources", "Where this comes from", "Translations, method, reading and image credits.")}
      <section class="t-sec"><div class="t-h"><h2>Bible translations</h2></div>
        <dl class="src">${TR_HAVE.map(t => `<div><dt>${TR[t][0]} · ${esc(TR[t][1])}</dt><dd>${kinds[t]}<br><span class="sub">${esc(notices[t])}</span></dd></div>`).join("")}
        <div><dt>Douay-Rheims</dt><dd>Used for 2 Maccabees, which is not in the other translations here, and for one comparison in Luke 1:28. Public domain.</dd></div></dl>
      </section>
      <section class="t-sec"><div class="t-h"><h2>Method</h2></div>
        <p>Each position is stated the way its own confessions and teachers state it: the Catechism of the Catholic Church, the Orthodox councils and fathers, the Book of Concord, the Reformed and Westminster standards, the Thirty-Nine Articles, the Schleitheim and Baptist confessions, Wesley's sermons, and the statements of faith of Pentecostal, Adventist and Restoration churches. Where a tradition holds more than one view, the page says so.</p>
        <p>Dates before 400 are often approximate and are marked “c.” Membership numbers are rounded and labeled as estimates, or carry the name of the body that reports them. World totals follow the Center for the Study of Global Christianity and the Pew Research Center.</p>
      </section>
      <section class="t-sec"><div class="t-h"><h2>Further reading</h2></div>
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
      <section class="t-sec"><div class="t-h"><h2>Image credits</h2><p>All images are served from Wikimedia Commons under the license shown. Click a title for the file page.</p></div>
        <ul class="credits">${imgs.map(k => { const im = CH.images[k]; return `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">${esc(k)}</a> <span>${esc(list([im.by, im.lic]) || "Wikimedia Commons")}</span></li>`; }).join("")}</ul>
      </section>
    </div>`;
  };

  V.notFound = function () { return `<div class="page">${head("Not found", "That page does not exist", "")}<p><a class="go" href="#/">Back to the start</a></p></div>`; };

  /* ───────── router ───────── */
  const TITLES = { home: "", story: "The Story", tree: "Family Tree", traditions: "Traditions", texts: "Disputed Texts", councils: "Councils & Creeds", people: "People", compare: "Compare", glossary: "Glossary", sources: "Sources" };
  const NAV = { tradition: "traditions", text: "texts", person: "people" };
  let lastView = null;
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    const name = parts[0] || "home", arg = parts[1];
    const view = V[name] || V.notFound;
    // Moving between chapters of the story is a scroll, not a new page.
    if (name === "story" && lastView === "story" && arg && document.getElementById("era-" + arg)) { document.getElementById("era-" + arg).scrollIntoView({ behavior: "smooth" }); return; }
    VB = [];
    app.className = "v-" + name;
    app.innerHTML = view(arg);
    const item = name === "tradition" ? T[arg] && T[arg].name : name === "text" ? D[arg] && D[arg].title : name === "person" ? P[arg] && P[arg].n : TITLES[name];
    document.title = (item ? item + " · " : "") + "Vine & Branches" + (item ? "" : ": A Map of Church History");
    document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("on", a.dataset.nav === (NAV[name] || name)));
    closeMenu();
    if (!(lastView === name && (name === "story" || name === "councils") && arg)) window.scrollTo(0, 0);
    if (view.after) view.after(arg);
    lastView = name;
  }
  window.addEventListener("hashchange", route);

  /* ───────── menu ───────── */
  const menuBtn = document.getElementById("menuBtn"), nav = document.getElementById("nav");
  function closeMenu() { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => { const o = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", String(o)); });

  /* ───────── search ───────── */
  const sWrap = document.getElementById("search"), sIn = document.getElementById("searchInput"), sOut = document.getElementById("searchResults");
  let index = null;
  function buildIndex() {
    index = [];
    CH.traditions.forEach(t => index.push({ k: "Tradition", t: t.name, s: t.blurb, h: "#/tradition/" + t.id, x: [t.name, t.short, t.blurb, t.bodies, t.founded].join(" ") }));
    CH.people.forEach(p => index.push({ k: "Person", t: p.n, s: p.r + ", " + p.d, h: "#/person/" + p.id, x: [p.n, p.r, p.b].join(" ") }));
    CH.debates.forEach(d => index.push({ k: "Disputed text", t: d.title, s: d.q, h: "#/text/" + d.id, x: [d.title, d.q, d.intro, d.passages.map(p => p.ref).join(" "), d.positions.map(o => o.name).join(" ")].join(" ") }));
    CH.councils.forEach(c => index.push({ k: "Council", t: c.name, s: c.when + ", " + c.place, h: "#/councils/" + c.id, x: [c.name, c.issue, c.decided].join(" ") }));
    CH.events.forEach(e => index.push({ k: "Event", t: e.t, s: e.d, h: "#/story/" + eraOf(e.y).id, x: [e.t, e.x, e.d].join(" ") }));
    CH.glossary.forEach(g => index.push({ k: "Glossary", t: g[0], s: g[1], h: "#/glossary", x: g.join(" ") }));
    index.forEach(r => { r.lt = r.t.toLowerCase(); r.lx = r.x.toLowerCase(); });
  }
  function runSearch() {
    const q = sIn.value.trim().toLowerCase();
    if (!q) { sOut.innerHTML = `<p class="search-empty">Try “Luther”, “baptism”, “1054” or “Matthew 16”.</p>`; return; }
    const words = q.split(/\s+/);
    const hits = index.map(r => {
      if (!words.every(w => r.lx.indexOf(w) >= 0)) return null;
      return { r, score: (r.lt === q ? 100 : 0) + (r.lt.split(/\s+/).indexOf(q) >= 0 ? 60 : 0) + (r.lt.indexOf(q) === 0 ? 30 : 0) + (r.lt.indexOf(q) >= 0 ? 25 : 0) + (r.k === "Event" || r.k === "Glossary" ? 0 : 5) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 14);
    sOut.innerHTML = hits.length ? hits.map(h => `<a href="${h.r.h}"><i>${h.r.k}</i><b>${smart(h.r.t)}</b><span>${smart(h.r.s)}</span></a>`).join("") : `<p class="search-empty">Nothing found for “${esc(q)}”.</p>`;
  }
  function openSearch() { if (!index) buildIndex(); sWrap.hidden = false; document.body.classList.add("locked"); sIn.value = ""; runSearch(); sIn.focus(); }
  function closeSearch() { sWrap.hidden = true; document.body.classList.remove("locked"); }
  document.getElementById("searchBtn").addEventListener("click", openSearch);
  sIn.addEventListener("input", runSearch);
  sIn.addEventListener("keydown", e => { if (e.key === "Enter") { const a = sOut.querySelector("a"); if (a) { location.hash = a.getAttribute("href"); closeSearch(); } } });
  sWrap.addEventListener("click", e => { if (e.target === sWrap || e.target.closest("a")) closeSearch(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeSearch(); return; }
    const tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "/" && tag !== "input" && tag !== "textarea") { e.preventDefault(); openSearch(); }
  });

  route();
})();
