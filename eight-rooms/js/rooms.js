/* Eight Rooms: one long building. Every room is rendered once, in its finished
   state; motion is switched on only if the browser proves it can run it. */
(function () {
  "use strict";
  const CH = window.CH, ROOMS = CH.rooms, FAM = CH.roomFam;
  const app = document.getElementById("app");
  const root = document.documentElement;
  const T = {}, P = {}, C = {}, D = {};
  CH.traditions.forEach(t => (T[t.id] = t));
  CH.people.forEach(p => (P[p.id] = p));
  CH.councils.forEach(c => (C[c.id] = c));
  CH.debates.forEach(d => (D[d.id] = d));
  /* Optional lists are simply left out of some records. Read them as empty. */
  CH.events.forEach(e => { e.people = e.people || []; e.tags = e.tags || []; });
  CH.traditions.forEach(t => { t.people = t.people || []; t.marks = t.marks || []; });
  CH.debates.forEach(d => { d.people = d.people || []; d.councils = d.councils || []; d.passages = d.passages || []; d.positions = d.positions || []; d.positions.forEach(q => { q.held = q.held || []; }); });
  CH.images = CH.images || {};
  CH.verses = CH.verses || {};

  /* Animation is an extra. It turns on only when a frame actually arrives. */
  if (window.requestAnimationFrame && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    requestAnimationFrame(() => root.classList.add("anim"));
  }

  /* ───────── helpers ───────── */
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const smart = s => esc(s)
    .replace(/(^|[\s(\[“—-])'/g, "$1‘").replace(/'/g, "’")
    .replace(/(^|[\s(\[])&quot;/g, "$1“").replace(/&quot;/g, "”");
  const pad2 = n => String(n).padStart(2, "0");
  const ERA_FIX = { 1054: "early-medieval", 1648: "reformation" };
  const eraOf = y => CH.eras.find(e => e.id === ERA_FIX[y]) || CH.eras.find(e => y >= e.from && y < e.to) || CH.eras[CH.eras.length - 1];
  const eraNo = id => CH.eras.findIndex(e => e.id === id) + 1;
  const fam = t => FAM[t.family] || "#444";
  const shortName = t => t.short.replace(/^.*→ /, "");
  const years = t => t.id === "early" ? "c. 30 to 1054" : t.end ? `${t.start} to ${t.end}` : `${t.start} to today`;
  const lineage = id => { const out = []; let n = T[id]; while (n) { out.unshift(n); n = T[n.parent]; } return out; };
  const children = id => CH.traditions.filter(t => t.parent === id).sort((a, b) => a.start - b.start);
  const initials = n => n.replace(/\b(of|the|and|von|à)\b/g, "").split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join("");
  const textRoom = {};
  Object.keys(ROOMS).forEach(r => ROOMS[r].texts.forEach((id, k) => (textRoom[id] = { room: r, no: eraNo(r) + "." + (k + 1) })));
  const catName = {};
  CH.debateCats.forEach(c => (catName[c.id] = c.name));
  const groupName = {};
  CH.councilGroups.forEach(g => (groupName[g.id] = g.name));

  /* Wikimedia serves fixed thumbnail steps; a small chip or banner should not pull the full-size file. */
  const thumb = (src, px) => (px ? src.replace(/\/(\d+)px-/, (m, n) => (+n > px ? `/${px}px-` : m)) : src);
  function img(title, alt, eager, px) {
    const im = CH.images[title];
    if (!im) return "";
    return `<img src="${esc(thumb(im.src, px))}" alt="${esc(alt || "")}" ${eager ? "" : 'loading="lazy" '}decoding="async" width="${im.w}" height="${im.h}" onerror="var h=this.closest('[data-pic]');if(h)h.classList.add('none');this.remove()">`;
  }
  /* Some Commons author fields arrive doubled ("Unknown authorUnknown author"). Show them once. */
  function byline(im) {
    const b = (im.by || "").trim(), h = b.length / 2;
    return b.length % 2 === 0 && h > 2 && b.slice(0, h) === b.slice(h) ? b.slice(0, h) : b;
  }
  function credit(title) {
    const im = CH.images[title];
    if (!im) return "";
    const by = [byline(im), im.lic].filter(Boolean).join(", ") || "Wikimedia Commons";
    return `<a class="credit" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">Image: ${esc(by)}</a>`;
  }

  /* ───────── verses ───────── */
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
  const prettyRef = r => esc(r.replace(/^Psalms /, "Psalm ").replace(/^Jude 1:/, "Jude ").replace(/-/g, "–"));
  // A verse number can be "5-6" where a translation merges verses.
  const hits = (label, only) => { const a = String(label).split("-").map(Number), lo = a[0], hi = a[a.length - 1]; return only.some(v => v >= lo && v <= hi); };

  function verseInner(f) {
    const ref = f.dataset.ref, t = f.dataset.t || "", only = f.dataset.only ? f.dataset.only.split(",").map(Number) : null, big = f.classList.contains("vs-big");
    const data = CH.verses[t ? ref + "|" + t : ref];
    const shown = only ? ref.replace(/:.*$/, ":" + only[0] + (only.length > 1 ? "-" + only[only.length - 1] : "")) : ref;
    if (!data) return `<figcaption><span class="ref">${prettyRef(shown)}</span></figcaption>`;
    const have = t ? Object.keys(data) : TR_ORDER.filter(x => data[x]);
    const use = have.indexOf(curTr) >= 0 ? curTr : have[0];
    let rows = data[use];
    if (only) { const cut = rows.filter(r => hits(r[1], only)); if (cut.length) rows = cut; }
    const tabs = have.length > 1
      ? `<span class="trs" role="group" aria-label="Translation">${have.map(x => `<button type="button" data-tr="${x}" class="${x === use ? "on" : ""}" title="${esc(TR[x][1])}" aria-pressed="${x === use}">${TR[x][0]}</button>`).join("")}</span>`
      : `<span class="trs"><span class="only" title="${esc(TR[use][1])}">${TR[use][0]}</span></span>`;
    const one = rows.length === 1 && big;
    const body = rows.map(v => `${one ? "" : `<sup class="vn">${v[1]}</sup>`}${smart(v[2])}`).join(" ");
    const len = rows.reduce((n, v) => n + v[2].length, 0);
    f.dataset.len = len > 420 ? "xl" : len > 260 ? "l" : len > 130 ? "m" : "s";
    return `<blockquote>${body}</blockquote><figcaption><span class="ref">${prettyRef(shown)}</span>${tabs}</figcaption>`;
  }
  const verse = (p, cls) => `<figure class="vs ${cls || ""}" data-ref="${esc(p.ref)}"${p.t ? ` data-t="${p.t}"` : ""}${p.only ? ` data-only="${p.only.join(",")}"` : ""}></figure>`;
  function paintVerses(scope) { (scope || document).querySelectorAll("figure.vs").forEach(f => (f.innerHTML = verseInner(f))); }

  /* ───────── small parts ───────── */
  const tile = id => T[id] ? `<button type="button" class="tile${T[id].end ? " gone" : ""}" data-open="t/${id}" style="--c:${fam(T[id])}">${smart(shortName(T[id]))}</button>` : "";
  const more = (label, inner, cls) => `<div class="more ${cls || ""}"><button type="button" class="tog" aria-expanded="false" data-a="${esc(label)}" data-b="Close"><span>${esc(label)}</span><i aria-hidden="true"></i></button><div class="ease"><div><div class="ease-in">${inner}</div></div></div></div>`;
  const sec = (no, title, count) => `<header class="sec-h"><span class="mono">${no}</span><h3>${title}</h3>${count ? `<span class="sec-n mono">${count}</span>` : ""}</header>`;

  function frame(p, size) {
    const im = CH.images[p.w];
    const ar = im ? Math.max(0.62, Math.min(1.4, im.w / im.h)) : 0.78;
    const no = "P." + String(CH.people.indexOf(p) + 1).padStart(3, "0");
    return `<button type="button" class="fr fr-${size}" data-open="p/${p.id}" style="--ar:${ar.toFixed(3)}">
      <span class="fr-pic${im ? "" : " none"}" data-pic data-i="${esc(initials(p.n))}">${img(p.w, "Portrait of " + p.n)}</span>
      <span class="fr-lab"><span class="mono">${no}</span><b>${smart(p.n)}</b><span>${esc(p.d)}</span><span>${smart(p.r)}</span></span></button>`;
  }
  const chip = id => P[id] ? `<button type="button" class="pchip" data-open="p/${id}"><span class="pchip-pic${CH.images[P[id].w] ? "" : " none"}" data-pic data-i="${esc(initials(P[id].n))}">${img(P[id].w, "", false, 120)}</span><span class="pchip-t"><b>${smart(P[id].n)}</b><i>${esc(P[id].d)}</i></span></button>` : "";
  const plaque = c => `<button type="button" class="pq" data-open="c/${c.id}"><span class="pq-y">${c.year}</span><span class="pq-n">${smart(c.name)}</span><span class="pq-p mono">${smart(c.place)}</span></button>`;

  /* ───────── lobby ───────── */
  function lobby() {
    return `<section class="lobby" id="lobby" data-stop="lobby">
      <div class="lobby-t">
        <p class="mono">An exhibition in eight galleries</p>
        <h1>Eight Rooms</h1>
        <p class="lobby-l">Two thousand years of church history. Walk through, meet the people, and see where the churches parted and which verses they parted over.</p>
      </div>
      <div class="bands">${CH.eras.map((e, i) => {
        const r = ROOMS[e.id], a = e.label.replace(/^c\. /, "").split(" – ");
        return `<a class="band" href="#/room/${e.id}" style="--wall:${r.wall};--ink:${r.ink};--acc:${r.acc};--dk:${r.dk};--lt:${r.lt}">
          <span class="band-img duo" data-pic>${img(e.w, "", true)}</span>
          <span class="band-n">${i + 1}</span>
          <span class="band-name">${smart(e.name)}</span>
          <span class="band-y mono">${esc(a[0])} to ${esc(a[1])}</span></a>`;
      }).join("")}</div>
    </section>`;
  }

  /* ───────── a room ───────── */
  function vitrine(d, no, hero) {
    const reads = d.positions.map(pos => `<div class="rd">
        <h5>${smart(pos.name)}</h5>
        <div class="tiles">${pos.held.map(tile).join("")}${pos.held.length > 4 ? `<span class="tile-more">+${pos.held.length - 4}</span>` : ""}</div>
        <p class="rd-x">${smart(pos.text)}</p>
        <button type="button" class="rd-more" aria-expanded="false">Read on</button></div>`).join("");
    const rest = d.passages.length - 1;
    return `<article class="case" id="case-${d.id}">
      <p class="mono case-no">Case ${no} · ${esc(catName[d.cat])} · ${smart(d.title)}</p>
      <h4 class="case-q">${smart(d.q)}</h4>
      <div class="case-v n${hero.length}">${hero.map(h => verse(h, "vs-big")).join("")}</div>
      <p class="mono case-k">${d.positions.length} readings of the same words</p>
      <div class="reads">${reads}</div>
      <button type="button" class="case-open" data-open="text/${d.id}"><b>Open the full case</b><span>${d.passages.length} passages written out, where the readings part, and how the argument went</span></button>
    </article>`;
  }
  const miniCase = (d, no) => `<button type="button" class="mini" data-open="text/${d.id}">
      <span class="mono">Case ${no} · ${esc(catName[d.cat])}</span><b>${smart(d.q)}</b>
      <span class="mini-r">${smart(d.title)} · ${prettyRef(d.passages[0].ref)}${d.passages.length > 1 ? ` and ${d.passages.length - 1} more` : ""}</span></button>`;

  function creed() {
    return `<section class="creed">
      ${sec("3.6", "The Nicene Creed", "Choose a line to see what it answers")}
      <div class="creed-g">
        <ol class="creed-l">${CH.creed.map((l, i) => `<li><button type="button" class="creed-b${l.mark ? " mark" : ""}" data-creed="${i}" aria-pressed="false">${smart(l.t)}</button></li>`).join("")}</ol>
        <aside class="creed-n" id="creed-n" aria-live="polite"><p class="mono">Inscription note</p><p class="creed-nt">The creed in the English of the 1662 Book of Common Prayer. Choose a line to read what it answers. The marked line is the Filioque.</p></aside>
      </div>
      <div class="acc">
        <p class="mono acc-h">Who accepts which of the seven ecumenical councils</p>
        <div class="acc-g">${CH.councilAcceptance.map(a => `<div class="acc-r"><b>${smart(a.who)}</b><span class="acc-d" role="img" aria-label="${esc(a.note)}">${[1, 2, 3, 4, 5, 6, 7].map(n => `<i class="${n <= a.upTo ? "on" : a.soft && n <= a.soft ? "soft" : ""}">${n}</i>`).join("")}</span><span class="acc-n">${smart(a.note)}</span></div>`).join("")}</div>
        <p class="acc-k mono"><i class="on"></i> accepted <i class="soft"></i> accepted in part or by many <i></i> not accepted</p>
      </div>
    </section>`;
  }

  function room(e, i) {
    const r = ROOMS[e.id], n = i + 1;
    const a = e.label.split(" – ");
    const people = CH.people.filter(p => p.e === e.id);
    const leads = r.leads.map(id => P[id]).filter(Boolean);
    const rest = people.filter(p => r.leads.indexOf(p.id) < 0);
    const evs = CH.events.map((ev, k) => ({ ev, k })).filter(x => eraOf(x.ev.y).id === e.id);
    const key = evs.filter(x => x.ev.k), other = evs.filter(x => !x.ev.k);
    const trads = CH.traditions.filter(t => eraOf(t.start).id === e.id).sort((x, y) => x.start - y.start);
    const councils = CH.councils.filter(c => eraOf(c.year).id === e.id).sort((x, y) => x.year - y.year);
    const few = trads.length <= 4;
    const feat = r.feature || 1;
    const texts = r.texts.map(id => D[id]);
    const heroOf = d => (r.hero && r.hero[d.id]) || [{ ref: d.passages[0].ref, t: d.passages[0].t }];
    let s = 0;
    const no = () => n + "." + (++s);

    const threshold = `<header class="thr thr-${r.layout}${r.side ? " side-" + r.side : ""}">
        <figure class="thr-img duo" data-pic>${img(e.w, e.cap, true)}</figure>
        <div class="thr-t">
          <p class="mono thr-no">Room ${pad2(n)} of 08 <span>${esc(r.paint)}</span></p>
          <h2>${smart(e.name)}</h2>
          <p class="thr-y" aria-label="${esc(e.label)}"><span>${esc(a[0])}</span><i>to</i><span>${esc(a[1])}</span></p>
          <p class="thr-cap">${smart(e.cap)} ${credit(e.w)}</p>
          ${more("Read the wall text", `<p class="walltext">${smart(e.intro)}</p>`, "thr-more")}
        </div>
      </header>`;

    const hang = `<section class="hang">
        ${sec(no(), "On the walls", people.length + " portraits")}
        <div class="rail rail-l" style="--n:${leads.length}">${leads.map(p => frame(p, "l")).join("")}</div>
        <div class="rail rail-s${r.allMats ? " mats" : ""}">${rest.map(p => frame(p, "s")).join("")}</div>
      </section>`;

    const moments = `<section class="moments">
        ${sec(no(), "What happened", evs.length + " moments")}
        <div class="mo-g" style="--cols:${key.length <= 5 ? key.length : Math.ceil(key.length / 2)}">${key.map(x => `<button type="button" class="mo" data-open="e/${x.k}"><span class="mo-y">${x.ev.y}</span><span class="mo-t">${smart(x.ev.t)}</span></button>`).join("")}</div>
        ${other.length ? more(`All ${evs.length} moments in this room`, `<ol class="mo-l">${evs.map(x => `<li><button type="button" class="mo-r${x.ev.k ? " k" : ""}" data-open="e/${x.k}"><span class="mono">${esc(x.ev.d)}</span><span>${smart(x.ev.t)}</span></button></li>`).join("")}</ol>`) : ""}
      </section>`;

    const branches = trads.length ? `<section class="branches">
        ${sec(no(), trads.length === 1 ? "Where it starts" : "New branches", trads.length === 1 ? "The trunk" : trads.length + " begin in this room")}
        <div class="rod${few ? " few" : ""}${few && trads.length > 2 ? " below" : ""}" style="--n:${trads.length}">${trads.map(t => {
          const has = !!CH.images[t.w];
          const lab = few ? `<p class="bn-lab"><b>${smart(t.name)}</b><span class="mono">${esc(years(t))}</span>${smart(t.blurb)}</p></div>` : "";
          return `${few ? '<div class="bn-w">' : ""}<button type="button" class="bn k-${t.kind}${t.end ? " gone" : ""}${has ? " has" : ""}" data-open="t/${t.id}" style="--c:${fam(t)}">
            ${has ? `<span class="bn-img" data-pic>${img(t.w, "", false, 500)}</span>` : ""}
            <span class="bn-y">${t.start}</span>
            <span class="bn-n">${smart(t.name)}</span>
            <span class="bn-f mono">${t.end ? "ended c. " + t.end : T[t.parent] ? "from " + esc(shortName(T[t.parent])) : t.id === "early" ? "the trunk" : "its own beginning"}</span></button>${lab}`;
        }).join("")}</div>
      </section>` : "";

    const argNo = no();
    const argument = `<section class="argument">
        ${sec(argNo, "The argument of the room", texts.length + (texts.length === 1 ? " disputed text" : " disputed texts"))}
        ${texts.slice(0, feat).map(d => vitrine(d, textRoom[d.id].no, heroOf(d))).join("")}
        ${texts.length > feat ? `<p class="mono also-h">Also argued in this room</p><div class="also">${texts.slice(feat).map(d => miniCase(d, textRoom[d.id].no)).join("")}</div>` : ""}
      </section>`;

    const plaques = councils.length ? `<section class="plaques">
        ${sec(no(), "Councils and confessions", councils.length + (councils.length === 1 ? " plaque" : " plaques"))}
        <div class="pq-g">${councils.map(plaque).join("")}</div>
      </section>` : "";

    return `<section class="room room-${e.id}" id="room-${e.id}" data-stop="room/${e.id}" style="--wall:${r.wall};--ink:${r.ink};--acc:${r.acc};--dk:${r.dk};--lt:${r.lt};--frame:${r.frame};--mat:${r.mat}">
      ${threshold}
      <div class="walls">${hang}${moments}${branches}${argument}${plaques}${e.id === "imperial" ? creed() : ""}</div>
    </section>`;
  }

  /* ───────── the family wall ───────── */
  function wall() {
    const fams = Object.keys(CH.families).map(k => `<span class="lg"><i style="background:${FAM[k]}"></i>${smart(CH.families[k].name)}</span>`).join("");
    return `<section class="fwall" id="wall" data-stop="wall">
      <header class="fw-h">
        <p class="mono">Gallery 09</p>
        <h2>The family wall</h2>
        <p class="fw-l">Follow a line back to see where each church came from. Choose any name to see its label.</p>
      </header>
      <div class="chart" id="chart"></div>
      <div class="legend">${fams}<span class="lg"><i class="hollow"></i>No longer exists</span></div>
    </section>`;
  }
  function drawChart() {
    const host = document.getElementById("chart");
    if (!host) return;
    const W = host.clientWidth || 1000, narrow = W < 860;
    const nodes = [];
    let row = 0;
    const walk = (t, depth) => {
      const n = { t, depth, kids: [] };
      nodes.push(n);
      const ch = children(t.id);
      if (narrow) { n.row = row++; ch.forEach(c => n.kids.push(walk(c, depth + 1))); }
      else if (!ch.length) n.row = row++;
      else { ch.forEach(c => n.kids.push(walk(c, depth + 1))); n.row = (n.kids[0].row + n.kids[n.kids.length - 1].row) / 2; }
      return n;
    };
    CH.traditions.filter(t => !t.parent || !T[t.parent]).forEach(t => { walk(t, 0); if (!narrow) row += 0.5; });
    const cols = 7, colW = narrow ? 16 : W / cols, tileW = narrow ? 0 : Math.min(colW - 22, 200), tileH = narrow ? 44 : 56, pitch = narrow ? 50 : 62;
    const H = Math.ceil((narrow ? row : row - 0.5) * pitch);
    let paths = "", tiles = "";
    nodes.forEach(n => {
      const x = n.depth * colW, y = n.row * pitch, w = narrow ? W - x : tileW;
      n.x = x; n.y = y; n.w = w;
      tiles += `<button type="button" class="nd${n.t.end ? " gone" : ""}${!narrow && n.t.name.length > 30 ? " long" : ""}" data-open="t/${n.t.id}" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;--c:${fam(n.t)}"><span class="mono">${n.t.start}</span><b>${smart(n.t.name)}</b></button>`;
    });
    nodes.forEach(n => n.kids.forEach(k => {
      const c = fam(k.t), dash = k.t.end ? ' stroke-dasharray="3 5"' : "";
      let d;
      if (narrow) d = `M${n.x + 8} ${n.y + tileH} V${k.y + tileH / 2 - 6} q0 6 6 6 H${k.x}`;
      else {
        const x1 = n.x + n.w, y1 = n.y + tileH / 2, x2 = k.x, y2 = k.y + tileH / 2, mx = x2 - 11, r = Math.min(8, Math.abs(y2 - y1) / 2), sg = y2 > y1 ? 1 : -1;
        d = Math.abs(y2 - y1) < 1 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mx - r} q${r} 0 ${r} ${sg * r} V${y2 - sg * r} q0 ${sg * r} ${r} ${sg * r} H${x2}`;
      }
      paths += `<path d="${d}" stroke="${c}"${dash}/>`;
    }));
    host.style.height = H + "px";
    host.classList.toggle("narrow", narrow);
    host.innerHTML = `<svg class="no-reflink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${paths}</svg>${tiles}`;
  }

  /* ───────── index and credits ───────── */
  function index() {
    const people = CH.people.slice().sort((a, b) => a.n.localeCompare(b.n));
    const li = (href, label, sub, s) => `<li data-s="${esc((label + " " + (sub || "") + " " + (s || "")).toLowerCase())}"><a href="${href}"><span>${smart(label)}</span>${sub ? `<i>${esc(sub)}</i>` : ""}</a></li>`;
    return `<section class="ix" id="index" data-stop="index">
      <header class="ix-h">
        <p class="mono">Collection index</p>
        <h2>Everything in the building</h2>
        <label class="ix-s"><span class="mono">Find</span><input type="search" id="ix-q" placeholder="A name, a church, a council, a year" autocomplete="off" spellcheck="false"></label>
        <p class="ix-none" id="ix-none" hidden>Nothing in the collection matches that.</p>
      </header>
      <div class="ix-g">
        <div class="ix-c ix-people"><h3><span class="mono">${CH.people.length}</span> People</h3><ul>${people.map(p => li("#/p/" + p.id, p.n, p.d, p.r)).join("")}</ul></div>
        <div class="ix-c"><h3><span class="mono">${CH.traditions.length}</span> Churches and movements</h3><ul>${CH.traditions.slice().sort((a, b) => a.name.localeCompare(b.name)).map(t => li("#/t/" + t.id, t.name, years(t), t.short)).join("")}</ul></div>
        <div class="ix-c"><h3><span class="mono">${CH.debates.length}</span> Disputed texts</h3><ul>${CH.debates.map(d => li("#/text/" + d.id, d.title, "Case " + textRoom[d.id].no, d.q + " " + d.passages.map(p => p.ref).join(" "))).join("")}</ul>
          <h3 class="ix-h2"><span class="mono">${CH.councils.length}</span> Councils and confessions</h3><ul>${CH.councils.slice().sort((a, b) => a.year - b.year).map(c => li("#/c/" + c.id, c.name, c.when, c.place)).join("")}</ul></div>
        <div class="ix-c ix-ev" id="ix-ev" hidden><h3><span class="mono">${CH.events.length}</span> Moments</h3><ul>${CH.events.map((e, k) => li("#/e/" + k, e.t, e.d, "")).join("")}</ul></div>
      </div>
      ${more(`Glossary: ${CH.glossary.length} words you keep running into`, `<dl class="gloss">${CH.glossary.map(g => `<div><dt>${smart(g[0])}</dt><dd>${smart(g[1])}</dd></div>`).join("")}</dl>`, "ix-more")}
    </section>`;
  }

  function credits() {
    const notices = {
      NIV: "Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.",
      NASB: "Scripture quotations taken from the New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995 by The Lockman Foundation. Used by permission. All rights reserved. lockman.org",
      NLT: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.",
      TPT: "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc. Used by permission. All rights reserved. ThePassionTranslation.com.",
      KJV: "King James Version, 1769 text. Public domain in the United States."
    };
    const kinds = { NIV: "Thought-for-thought and word-for-word in balance.", NASB: "Strictly word-for-word.", NLT: "Thought-for-thought, in everyday English.", TPT: "An expansive rendering by one translator. Many scholars class it as a paraphrase.", KJV: "The classic English Bible of 1611, in its 1769 spelling." };
    const imgs = Object.keys(CH.images).sort();
    return `<section class="cr" id="credits" data-stop="credits">
      <header class="cr-h"><p class="mono">Credits</p><h2>Where this comes from</h2></header>
      <div class="cr-g">
        <div class="cr-c">
          <h3>Bible translations</h3>
          <dl class="src">${TR_HAVE.map(t => `<div><dt>${TR[t][0]} · ${esc(TR[t][1])}</dt><dd>${kinds[t]}<br><span class="sub">${esc(notices[t])}</span></dd></div>`).join("")}
          <div><dt>Douay-Rheims</dt><dd>Used for 2 Maccabees, which is not in the other translations here, and for one comparison in Luke 1:28. Public domain.</dd></div></dl>
          <p class="sub">The Passion Translation does not include every Old Testament book. Where it has no text for a passage, its tab is left out.</p>
        </div>
        <div class="cr-c">
          <h3>Method</h3>
          <p>Each position is stated the way its own confessions and teachers state it: the Catechism of the Catholic Church, the Orthodox councils and fathers, the Book of Concord, the Reformed and Westminster standards, the Thirty-Nine Articles, the Schleitheim and Baptist confessions, Wesley's sermons, and the statements of faith of Pentecostal, Adventist and Restoration churches. Where a tradition holds more than one view, the page says so.</p>
          <p>Dates before 400 are often approximate and are marked “c.” Membership numbers are rounded and labeled as estimates, or carry the name of the body that reports them. World totals follow the Center for the Study of Global Christianity and the Pew Research Center.</p>
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
          </ul>
          <h3>Text sources</h3>
          <p>NIV and TPT come from YouVersion. NASB and NLT come from bolls.life. KJV and Douay-Rheims come from bible-api.com. Pictures are photographs and period art from Wikimedia Commons, shown under the licenses listed below.</p>
        </div>
      </div>
      ${more(`Image credits: ${imgs.length} pictures`, `<ul class="imgs">${imgs.map(k => { const im = CH.images[k]; return `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">${esc(k)}</a><span>${esc([byline(im), im.lic].filter(Boolean).join(", ") || "Wikimedia Commons")}</span></li>`; }).join("")}</ul>`, "cr-more")}
      <footer class="foot">
        <p class="mono">Other versions</p>
        <p class="foot-v"><a href="../vine-and-branches/">Vine &amp; Branches</a><a href="../rose-window/">Rose Window</a><a href="../interchange/">Interchange</a><a href="../lineage/">Lineage</a></p>
        <p class="foot-h"><a href="/">All projects</a><a href="#/room/apostolic">Back to Room 1</a></p>
      </footer>
    </section>`;
  }

  /* ───────── placards ───────── */
  const PL = {};
  const plHead = (kicker, title, sub) => `<header class="pl-h"><p class="mono">${kicker}</p><h2 id="pl-title">${title}</h2>${sub ? `<p class="pl-sub">${sub}</p>` : ""}</header>`;
  const roomLink = (eraId, label) => { const e = CH.eras.find(x => x.id === eraId); return e ? `<button type="button" class="lnk" data-go="#/room/${e.id}">${label || "Go to Room " + eraNo(e.id) + ": " + smart(e.name)}</button>` : ""; };
  const sidesOf = id => { const out = []; CH.debates.forEach(d => d.positions.forEach(p => { if (p.held.indexOf(id) >= 0) out.push([d, p]); })); return out; };

  PL.p = id => {
    const p = P[id], t = T[p.t], im = CH.images[p.w];
    const inTexts = CH.debates.filter(d => d.people.indexOf(id) >= 0);
    const inEvents = CH.events.map((e, k) => ({ e, k })).filter(x => x.e.people.indexOf(id) >= 0);
    const no = "P." + String(CH.people.indexOf(p) + 1).padStart(3, "0");
    return { cls: "pl-p", fam: t ? fam(t) : "#121110", html: `
      <div class="pl-pg">
        <figure class="pl-pic${im ? "" : " none"}" data-pic data-i="${esc(initials(p.n))}">${img(p.w, "Portrait of " + p.n)}${im ? `<figcaption>${credit(p.w)}</figcaption>` : `<figcaption>Not pictured</figcaption>`}</figure>
        <div>
          ${plHead(no + " · Room " + pad2(eraNo(p.e)), smart(p.n), esc(p.d) + " · " + smart(p.r))}
          <p class="pl-lead">${smart(p.b)}</p>
          ${t ? `<p class="pl-k mono">Tradition</p><div class="tiles">${tile(t.id)}</div>` : ""}
          ${inTexts.length ? `<p class="pl-k mono">In the arguments</p><ul class="pl-ul">${inTexts.map(d => `<li><button type="button" class="lnk" data-open="text/${d.id}">${smart(d.q)}</button></li>`).join("")}</ul>` : ""}
          ${inEvents.length ? `<p class="pl-k mono">Moments</p><ul class="pl-ul">${inEvents.map(x => `<li><button type="button" class="lnk" data-open="e/${x.k}"><span class="mono">${esc(x.e.d)}</span> ${smart(x.e.t)}</button></li>`).join("")}</ul>` : ""}
          <p class="pl-go">${roomLink(p.e)}</p>
        </div>
      </div>` };
  };

  PL.t = id => {
    const t = T[id], line = lineage(id), kids = children(id), im = CH.images[t.w], sides = sidesOf(id);
    const prov = line.map((x, i) => `<span class="pv-g">${i ? '<i class="pv-a" aria-hidden="true"></i>' : ""}<button type="button" class="pv${x.id === id ? " me" : ""}" data-open="t/${x.id}" style="--c:${fam(x)}"${x.id === id ? ' aria-current="true"' : ""}><span class="mono">${x.start}</span><b>${smart(shortName(x))}</b></button></span>`).join("");
    const links = (t.links || []).map(l => T[l.to] ? `<li>${tile(l.to)}<span>${l.year}. ${smart(l.note)}.</span></li>` : "").join("");
    const stance = t.stance ? `<h4>Where it stands</h4><dl class="stance">${CH.stanceTopics.map(k => `<div><dt>${esc(k[1])}</dt><dd>${smart(t.stance[k[0]])}</dd></div>`).join("")}</dl>` : "";
    const moreHtml = `
      ${t.marks.length > 3 ? `<h4>More marks</h4><ul class="marks">${t.marks.slice(3).map(m => `<li>${smart(m)}</li>`).join("")}</ul>` : ""}
      <h4>How it began</h4><p>${smart(t.origins)}</p>
      <h4>Churches today</h4><p>${smart(t.bodies)}</p>
      ${links ? `<h4>Other ties</h4><ul class="ties">${links}</ul>` : ""}
      ${stance}
      ${sides.length ? `<h4>Where it takes a side</h4><ul class="sides">${sides.map(([d, p]) => `<li><button type="button" class="lnk" data-open="text/${d.id}">${smart(d.q)}</button><span>${smart(p.name)}</span></li>`).join("")}</ul>` : ""}`;
    return { cls: "pl-t", fam: fam(t), html: `
      <div class="pl-ban${im ? " has" : ""}" style="--c:${fam(t)}">
        ${im ? `<span class="pl-ban-img" data-pic>${img(t.w, "")}</span>` : ""}
        <p class="mono">${esc(CH.families[t.family].name)}${t.end ? " · no longer exists" : ""}</p>
        <h2 id="pl-title">${smart(t.name)}</h2>
        <p class="pl-ban-y">${esc(years(t))}</p>
        ${im ? credit(t.w) : ""}
      </div>
      <div class="pl-b">
        <p class="pl-lead">${smart(t.blurb)}</p>
        <dl class="facts"><div><dt class="mono">Founded</dt><dd>${smart(t.founded)}</dd></div><div><dt class="mono">Size</dt><dd>${smart(t.size)}</dd></div>${t.from ? `<div><dt class="mono">The break</dt><dd>${smart(t.from)}</dd></div>` : ""}</dl>
        <p class="pl-k mono">Provenance</p>
        <div class="prov">${prov}</div>
        ${kids.length ? `<p class="pl-k mono">Descended from it</p><div class="tiles">${kids.map(k => tile(k.id)).join("")}</div>` : ""}
        <p class="pl-k mono">What marks it</p>
        <ul class="marks">${t.marks.slice(0, 3).map(m => `<li>${smart(m)}</li>`).join("")}</ul>
        ${t.people.length ? `<p class="pl-k mono">People</p><div class="chips">${t.people.map(chip).join("")}</div>` : ""}
        ${more("More about " + shortName(t), moreHtml, "pl-more")}
        <p class="pl-go">${roomLink(eraOf(t.start).id, "See it hang in Room " + eraNo(eraOf(t.start).id))}</p>
      </div>` };
  };

  PL.text = id => {
    const d = D[id], tr = textRoom[id];
    return { cls: "pl-x", fam: ROOMS[tr.room].acc, html: `
      ${plHead("Case " + tr.no + " · " + esc(catName[d.cat]) + " · " + smart(d.title), smart(d.q), smart(d.intro))}
      <p class="pl-k mono">The passages</p>
      <div class="pl-vs">${d.passages.map(p => `<div class="pl-v">${verse(p)}${p.note ? `<p class="vnote">${smart(p.note)}</p>` : ""}</div>`).join("")}</div>
      <p class="pl-k mono">Where the readings part</p>
      <p class="crux">${smart(d.crux)}</p>
      <p class="pl-k mono">${d.positions.length} readings</p>
      <div class="pl-reads">${d.positions.map(pos => `<div class="prd"><h4>${smart(pos.name)}</h4><div class="tiles">${pos.held.map(tile).join("")}</div><p>${smart(pos.text)}</p></div>`).join("")}</div>
      ${more("How the argument went", `<p>${smart(d.history)}</p>`, "pl-more")}
      ${d.people.length ? `<p class="pl-k mono">Voices</p><div class="chips">${d.people.map(chip).join("")}</div>` : ""}
      ${d.councils.length ? `<p class="pl-k mono">Councils and confessions</p><div class="pq-g small">${d.councils.map(c => C[c] ? plaque(C[c]) : "").join("")}</div>` : ""}
      <p class="pl-go">${roomLink(tr.room)}</p>` };
  };

  PL.c = id => {
    const c = C[id], im = CH.images[c.w], inTexts = CH.debates.filter(d => d.councils.indexOf(id) >= 0), e = eraOf(c.year);
    return { cls: "pl-c", fam: ROOMS[e.id].wall, html: `
      <p class="pl-big">${c.year}</p>
      ${plHead(esc(groupName[c.g]) + (c.n ? " · No. " + c.n : ""), smart(c.name), esc(c.when) + " · " + smart(c.place))}
      ${im ? `<figure class="pl-wide" data-pic>${img(c.w, c.name)}<figcaption>${credit(c.w)}</figcaption></figure>` : ""}
      <dl class="qa"><div><dt class="mono">The question</dt><dd>${smart(c.issue)}</dd></div><div><dt class="mono">What was decided</dt><dd>${smart(c.decided)}</dd></div><div><dt class="mono">What followed</dt><dd>${smart(c.after)}</dd></div></dl>
      ${inTexts.length ? `<p class="pl-k mono">In the arguments</p><ul class="pl-ul">${inTexts.map(d => `<li><button type="button" class="lnk" data-open="text/${d.id}">${smart(d.q)}</button></li>`).join("")}</ul>` : ""}
      <p class="pl-go">${roomLink(e.id)}</p>` };
  };

  PL.e = k => {
    const ev = CH.events[+k], e = eraOf(ev.y);
    return { cls: "pl-e", fam: ROOMS[e.id].wall, html: `
      <p class="pl-big">${ev.y}</p>
      ${plHead(esc(ev.d) + " · Room " + pad2(eraNo(e.id)), smart(ev.t))}
      <p class="pl-lead">${smart(ev.x)}</p>
      ${ev.tags && ev.tags.length ? `<p class="pl-k mono">Churches involved</p><div class="tiles">${ev.tags.map(tile).join("")}</div>` : ""}
      ${ev.people && ev.people.length ? `<p class="pl-k mono">People</p><div class="chips">${ev.people.map(chip).join("")}</div>` : ""}
      <p class="pl-go">${roomLink(e.id)}</p>` };
  };
  const valid = { p: id => P[id], t: id => T[id], text: id => D[id], c: id => C[id], e: k => CH.events[+k] };
  const roomBehind = {
    p: id => "room-" + P[id].e, t: id => "room-" + eraOf(T[id].start).id, text: id => "case-" + id,
    c: id => "room-" + eraOf(C[id].year).id, e: k => "room-" + eraOf(CH.events[+k].y).id
  };

  /* ───────── build the building ───────── */
  /* Deep links decide where the page opens, so the browser should not restore an old scroll position over them. */
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (err) {}
  app.innerHTML = lobby() + CH.eras.map(room).join("") + wall() + index() + credits();
  paintVerses();
  drawChart();

  /* ───────── floor plan and position ───────── */
  const STOPS = ["lobby"].concat(CH.eras.map(e => "room/" + e.id), ["wall", "index", "credits"]);
  const stopEl = s => document.querySelector(`[data-stop="${s}"]`);
  const stopName = s => s === "lobby" ? ["Entrance", "Eight Rooms"] : s === "wall" ? ["Gallery 09", "The family wall"] : s === "index" ? ["Index", "Everything in the building"] : s === "credits" ? ["Credits", "Where this comes from"] : ["Room " + eraNo(s.slice(5)) + " of 8", CH.eras.find(e => e.id === s.slice(5)).name];
  let cur = "lobby";
  const plan = document.getElementById("plan"), bar = document.getElementById("bar");
  plan.innerHTML = `<p class="plan-h mono">Floor plan</p><div class="plan-g">
    ${CH.eras.map((e, i) => `<button type="button" class="plan-r pr-${i + 1}" data-go="#/room/${e.id}" data-stopref="room/${e.id}" style="--w:${ROOMS[e.id].wall};--i:${ROOMS[e.id].ink}" title="Room ${i + 1}: ${esc(e.name)}" aria-label="Room ${i + 1}: ${esc(e.name)}"><span>${i + 1}</span></button>`).join("")}
    <button type="button" class="plan-r pr-w" data-go="#/wall" data-stopref="wall">Family wall</button>
    <button type="button" class="plan-r pr-i" data-go="#/index" data-stopref="index">Index</button>
  </div><p class="plan-now" id="plan-now"></p>`;
  bar.innerHTML = `<button type="button" class="bar-b" id="bar-prev" aria-label="Previous room"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>
    <button type="button" class="bar-mid" id="bar-mid" aria-expanded="false" aria-controls="plan"><i class="bar-sw" id="bar-sw"></i><span class="bar-t"><b id="bar-a"></b><span id="bar-b"></span></span><span class="mono bar-p">Plan</span></button>
    <button type="button" class="bar-b" id="bar-next" aria-label="Next room"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>`;
  const theme = document.querySelector('meta[name="theme-color"]');
  function setCur(s) {
    cur = s;
    const nm = stopName(s), r = s.indexOf("room/") === 0 ? ROOMS[s.slice(5)] : null;
    plan.querySelectorAll(".plan-r").forEach(b => { const on = b.dataset.stopref === s; b.classList.toggle("on", on); if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
    document.getElementById("plan-now").innerHTML = `<b>${esc(nm[0])}</b>${smart(nm[1])}`;
    document.getElementById("bar-a").textContent = nm[0];
    document.getElementById("bar-b").textContent = nm[1];
    document.getElementById("bar-sw").style.background = r ? r.wall : s === "wall" ? "#f3f0e8" : "#0e0d0c";
    if (theme) theme.setAttribute("content", r ? r.wall : s === "wall" ? "#f3f0e8" : "#0e0d0c");
    const i = STOPS.indexOf(s);
    document.getElementById("bar-prev").disabled = i <= 0;
    document.getElementById("bar-next").disabled = i >= STOPS.length - 1;
  }
  setCur("lobby");
  function planOpen(on) { plan.classList.toggle("open", on); document.getElementById("bar-mid").setAttribute("aria-expanded", on ? "true" : "false"); }
  const hashOf = s => s === "lobby" ? "#/" : "#/" + s;
  function jumpTo(elId, stop) {
    const el = document.getElementById(elId);
    if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - (elId.indexOf("case-") === 0 ? 90 : 0); window.scrollTo(0, Math.max(0, y)); }
    if (stop) setCur(stop);
  }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && ov.hidden) setCur(en.target.dataset.stop); }), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("[data-stop]").forEach(el => io.observe(el));
  }

  /* ───────── overlay ───────── */
  const ov = document.getElementById("ov"), placard = document.getElementById("placard");
  let lastFocus = null, fadeT = 0;
  function openPl(kind, id) {
    const p = PL[kind](id);
    if (ov.hidden) lastFocus = document.activeElement;
    placard.className = "placard " + p.cls;
    placard.style.setProperty("--c", p.fam);
    placard.innerHTML = `<button type="button" class="pl-x-btn" data-close aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button><div class="pl-in">${p.html}</div>`;
    paintVerses(placard);
    ov.hidden = false;
    ov.classList.remove("in", "done"); void ov.offsetWidth; ov.classList.add("in");
    /* If the fade cannot run (a throttled or frozen tab), a timer still lands on the finished state. */
    clearTimeout(fadeT); fadeT = setTimeout(() => ov.classList.add("done"), 420);
    root.classList.add("locked");
    placard.scrollTop = 0;
    planOpen(false);
    try { placard.focus({ preventScroll: true }); } catch (e) { placard.focus(); }
  }
  function closePl(quiet) {
    if (ov.hidden) return;
    ov.hidden = true;
    root.classList.remove("locked");
    placard.innerHTML = "";
    if (!quiet) { history.pushState(null, "", hashOf(cur)); if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* older browsers */ } } }
  }

  /* ───────── routing ───────── */
  let first = true;
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/"), kind = parts[0], id = decodeURIComponent(parts.slice(1).join("/"));
    if (kind === "room" && ROOMS[id]) { closePl(true); jumpTo("room-" + id, "room/" + id); }
    else if (kind === "wall" || kind === "index" || kind === "credits") { closePl(true); jumpTo(kind, kind); }
    else if (PL[kind] && valid[kind](id)) {
      if (first) { let b = roomBehind[kind](id); if (!document.getElementById(b) && kind === "text") b = "room-" + textRoom[id].room; const sec = document.getElementById(b); jumpTo(b, sec ? (sec.closest("[data-stop]") || sec).dataset.stop : null); }
      openPl(kind, id);
    } else { closePl(true); if (!first && (kind === "" || kind === "lobby")) jumpTo("lobby", "lobby"); }
    first = false;
  }
  function go(hash) { if (location.hash !== hash) history.pushState(null, "", hash); route(); }
  window.addEventListener("hashchange", route);

  /* ───────── clicks ───────── */
  document.addEventListener("click", e => {
    const t = e.target;
    let b;
    if ((b = t.closest("[data-tr]"))) { curTr = b.dataset.tr; store.set("vb.tr", curTr); paintVerses(); return; }
    if ((b = t.closest("[data-open]"))) { go("#/" + b.dataset.open); return; }
    if ((b = t.closest("[data-go]"))) { planOpen(false); go(b.dataset.go); return; }
    if ((b = t.closest("[data-close]"))) { closePl(); return; }
    if ((b = t.closest(".tog"))) {
      const on = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", on ? "true" : "false");
      b.nextElementSibling.classList.toggle("open", on);
      b.firstElementChild.textContent = on ? b.dataset.b : b.dataset.a;
      return;
    }
    if ((b = t.closest(".rd-more"))) {
      const rd = b.closest(".rd"), on = !rd.classList.contains("open");
      rd.classList.toggle("open", on); b.setAttribute("aria-expanded", on ? "true" : "false"); b.textContent = on ? "Show less" : "Read on";
      return;
    }
    if ((b = t.closest("[data-creed]"))) {
      const l = CH.creed[+b.dataset.creed];
      document.querySelectorAll(".creed-b").forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      document.getElementById("creed-n").innerHTML = `<p class="mono">${l.mark ? "The Filioque line" : "What this line answers"}</p><p class="creed-nt">${smart(l.n)}</p>${l.mark ? `<p><button type="button" class="lnk" data-open="text/filioque">Open the case on the Filioque</button></p>` : ""}`;
      return;
    }
    if (t.closest("#bar-mid")) { planOpen(!plan.classList.contains("open")); return; }
    if (t.closest("#bar-prev")) { const i = STOPS.indexOf(cur); if (i > 0) go(hashOf(STOPS[i - 1])); return; }
    if (t.closest("#bar-next")) { const i = STOPS.indexOf(cur); if (i < STOPS.length - 1) go(hashOf(STOPS[i + 1])); return; }
    if (plan.classList.contains("open") && !t.closest("#plan")) planOpen(false);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { if (!ov.hidden) closePl(); else planOpen(false); }
    if (e.key === "Tab" && !ov.hidden) {
      const f = placard.querySelectorAll("button, a[href], input"), a = f[0], z = f[f.length - 1];
      if (!f.length) return;
      if (e.shiftKey && (document.activeElement === a || document.activeElement === placard)) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  /* ───────── index search ───────── */
  const q = document.getElementById("ix-q");
  q.addEventListener("input", () => {
    const v = q.value.trim().toLowerCase(), ev = document.getElementById("ix-ev");
    let n = 0;
    ev.hidden = v.length < 2;
    document.querySelectorAll(".ix-c li").forEach(li => { const on = !v || li.dataset.s.indexOf(v) >= 0; li.hidden = !on; if (on && !li.closest("[hidden]")) n++; });
    document.querySelectorAll(".ix-c").forEach(c => c.classList.toggle("empty", !c.querySelector("li:not([hidden])")));
    document.getElementById("ix-none").hidden = n > 0;
  });

  let rz;
  window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(drawChart, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawChart);
  route();
})();
