/* Lineage: shell, stat strip, inspector and router. */
(function () {
  "use strict";
  const CH = window.CH, LN = window.LN, V = LN.views;
  const { NOW, T, P, D, C, esc, col, tiny, kids, ancestors, related, alive, PY, READ, cover, overlap, fmtSize, bins, BIN, thumb, face } = LN;
  const $ = s => document.querySelector(s);
  const VIEWS = ["flow", "radial", "matrix", "scale", "pulse"];
  const st = { view: "", kind: "", id: "", focus: null, fam: null };
  let pendingFocus = null, painted = false; const psel = {};


  const META = {
    flow: { name: "Flow", line: "Every tradition as a stream. Time runs left to right, and a stream leaves its parent where the split happened.",
      foot: "Width follows the size estimate on each tradition's card, on a log scale. Thin lines have no separate figure or are no longer living. The numbered markers count the bodies on the map in that year. Dotted arcs are influences, not splits." },
    radial: { name: "Radial", line: "The same tree grown outward from the year 30. Each dot is a person, set on the tradition this site ties them to.",
      foot: "Rings mark the same years as the Flow view. A dot sits at the middle of that person's life." },
    matrix: { name: "Matrix", line: "The disputed texts run down the side and the traditions run across the top. Each cell is the reading that tradition takes.", foot: "" },
    scale: { name: "Scale", line: "How large each living tradition is today. The area of a circle follows the size estimate on its card.",
      foot: "Every figure is an estimate unless its card names the body that reports it. Where a card gives a range, the circle uses the midpoint. A dashed edge means the card gives words, not a number. The smallest circles are drawn at a minimum size so they can be seen." },
    pulse: { name: "Pulse", line: "What this site records, in 50-year steps: events, people, councils, and how many bodies were alive.",
      foot: "This counts the entries on this site. It shows where the record is thick, not how much happened. Brighter blocks are turning points." },
    sources: { name: "Sources", line: "Translations, method, how the views are counted, reading and image credits.", foot: "" }
  };
  const ICON = {
    flow: '<path d="M2 12h6c4 0 4-7 8-7h6M8 12c4 0 4 7 8 7h6"/>',
    radial: '<circle cx="12" cy="12" r="2"/><path d="M12 10V3M13.7 13l6 3.5M10.3 13l-6 3.5"/><circle cx="12" cy="12" r="9" opacity=".45"/>',
    matrix: '<path d="M7 3.5l3 1.7v3.5L7 10.4 4 8.7V5.2zM17 3.5l3 1.7v3.5l-3 1.7-3-1.7V5.2zM7 13.6l3 1.7v3.5l-3 1.7-3-1.7v-3.5zM17 13.6l3 1.7v3.5l-3 1.7-3-1.7v-3.5z"/>',
    scale: '<circle cx="9" cy="10" r="6.5"/><circle cx="18.5" cy="17" r="3.5"/>',
    pulse: '<path d="M4 20V11M9 20V5M14 20v-7M19 20V9"/>',
    sources: '<path d="M6 4h9l3 3v13H6zM9 10h6M9 14h6"/>'
  };

  /* ───── verses ───── */
  const TR = { NIV: ["NIV", "New International Version"], NASB: ["NASB", "New American Standard Bible, 1995"], NLT: ["NLT", "New Living Translation"], TPT: ["TPT", "The Passion Translation"], KJV: ["KJV", "King James Version"], DRA: ["Douay-Rheims", "Douay-Rheims Bible"] };
  const TR_ORDER = ["NIV", "NASB", "NLT", "TPT", "KJV"];
  const TR_HAVE = TR_ORDER.filter(t => Object.keys(CH.verses).some(k => CH.verses[k][t]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  let curTr = store.get("vb.tr");
  if (TR_HAVE.indexOf(curTr) < 0) curTr = TR_HAVE[0];
  const prettyRef = r => esc(r.replace(/^Psalms /, "Psalm ").replace(/^Jude 1:/, "Jude ").replace(/-/g, "–"));
  function verseInner(fig) {
    const ref = fig.dataset.ref, t = fig.dataset.t || "", data = CH.verses[t ? ref + "|" + t : ref];
    if (!data) return `<figcaption><span class="ref">${prettyRef(ref)}</span></figcaption>`;
    const have = t ? Object.keys(data) : TR_ORDER.filter(x => data[x]);
    const use = have.indexOf(curTr) >= 0 ? curTr : have[0], rows = data[use];
    const tabs = have.length > 1
      ? `<span class="trs" role="group" aria-label="Translation">${have.map(x => `<button type="button" data-tr="${x}" class="${x === use ? "on" : ""}" title="${esc(TR[x][1])}" aria-pressed="${x === use}">${TR[x][0]}</button>`).join("")}</span>`
      : `<span class="trs"><span class="only" title="${esc((TR[use] || [use, use])[1])}">${(TR[use] || [use])[0]}</span></span>`;
    const len = rows.reduce((n, v) => n + v[2].length, 0);
    fig.dataset.len = len > 420 ? "xl" : len > 220 ? "l" : "s";
    return `<figcaption><span class="ref">${prettyRef(ref)}</span>${tabs}</figcaption><blockquote>${rows.map(v => `${rows.length > 1 ? `<sup>${v[1]}</sup>` : ""}${esc(v[2])}`).join(" ")}</blockquote>`;
  }
  const paintVerses = () => document.querySelectorAll("figure.vs").forEach(f => (f.innerHTML = verseInner(f)));

  /* ───── small parts ───── */
  const href = tail => "#/" + st.view + (tail ? "/" + tail : "");
  const tchip = id => (T[id] ? `<a class="chip" href="${href("t/" + id)}" style="--c:${col(id)}"><i></i>${esc(tiny(T[id]))}</a>` : "");
  const pchip = id => (P[id] ? `<a class="pchip" href="${href("p/" + id)}">${face(P[id], 120)}<span><b>${esc(P[id].n)}</b><em>${esc(P[id].d)}</em></span></a>` : "");
  const head = (kick, title, sub, c, noClose) => `<header class="ih">${noClose ? "" : `<a class="x" href="${href("")}" aria-label="Close and clear the selection"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a>`}<p class="kick mono" style="color:${c || "var(--mut)"}">${kick}</p><h2>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ""}</header>`;
  const sec = (label, inner, n) => `<section class="is"><h3 class="mono">${label}${n != null ? `<b>${n}</b>` : ""}</h3>${inner}</section>`;
  const more = (label, inner) => `<div class="more"><button type="button" class="tog" aria-expanded="false" data-more><span>${label}</span><i aria-hidden="true"></i></button><div class="ease"><div><div class="ease-in">${inner}</div></div></div></div>`;
  const tile = (label, big, small) => `<div><span class="mono">${label}</span><b>${big}</b><em>${small}</em></div>`;

  /* ───── inspector ───── */
  function inspHome() {
    const fams = Object.keys(CH.families).map(k => { const n = CH.traditions.filter(t => t.family === k).length; return `<button type="button" class="fam${st.fam === k ? " on" : ""}" data-fam="${k}" aria-pressed="${st.fam === k}"><i style="background:${LN.color[k]}"></i><span>${esc(CH.families[k].name)}</span><b class="mono">${n}</b></button>`; }).join("");
    return head("One dataset · five views", "Pick anything on the map", "Every view draws the same 40 traditions. What you pick stays picked when you change views.", null, true) +
      sec("Families", `<div class="fams">${fams}</div>`, Object.keys(CH.families).length) +
      sec("Start with", `<div class="starts"><a href="${href("t/baptist")}"><span class="mono">Tradition</span>Baptist</a><a href="${href("text/eucharist")}"><span class="mono">Text</span>${esc(D.eucharist.title)}</a><a href="${href("p/augustine")}"><span class="mono">Person</span>Augustine</a></div>`);
  }

  function inspT(t) {
    const c = col(t), im = CH.images[t.w], anc = ancestors(t.id).reverse(), ks = kids[t.id] || [], ppl = (t.people || []).filter(id => P[id]);
    const texts = CH.debates.filter(d => READ[d.id][t.id]), ov = overlap(t.id).slice(0, 6), v = LN.size[t.id];
    const sizeBig = t.end ? "ended" : !v ? "n/a" : LN.soft[t.id] ? "no figure" : fmtSize(t.id);
    const row = d => `<a class="rdrow" href="${href("text/" + d.id)}"><b>${esc(d.title)}</b><span>${esc(READ[d.id][t.id].map(i => d.positions[i].name).join(" / "))}</span></a>`;
    const stance = t.stance ? `<dl class="st">${CH.stanceTopics.filter(s => t.stance[s[0]]).map(s => `<div><dt class="mono">${esc(s[1])}</dt><dd>${esc(t.stance[s[0]])}</dd></div>`).join("")}</dl>` : "";
    return head(esc(CH.families[t.family].name), esc(t.name), esc(t.blurb), c) +
      (im ? `<figure class="ban"><img src="${esc(thumb(im.src, 500))}" alt="" loading="lazy" decoding="async" onerror="this.closest('figure').remove()"><figcaption>${esc(t.w)}</figcaption></figure>` : "") +
      `<div class="tiles">${tile("Began", t.start, esc(t.founded))}${tile("Size today", sizeBig, esc(t.size || (t.end ? "Ended about " + t.end : "No separate figure")))}${tile("Readings listed", `${texts.length}<small>/${CH.debates.length}</small>`, "of the disputed texts")}</div>` +
      sec("Lineage", `<div class="path">${anc.map(tchip).join('<span class="arr">→</span>')}${anc.length ? '<span class="arr">→</span>' : ""}<span class="chip here" style="--c:${c}"><i></i>${esc(tiny(t))}</span></div>${t.from ? `<p class="note">${esc(t.from)}</p>` : ""}` +
        (ks.length ? `<p class="lbl mono">Branches from it</p><div class="chips">${ks.map(tchip).join("")}</div>` : "") +
        ((t.links || []).length ? `<p class="lbl mono">Also shaped by</p>${t.links.map(l => `<p class="lk">${tchip(l.to)}<span>${esc(l.note)}</span></p>`).join("")}` : "")) +
      (ppl.length ? sec("People", `<div class="pchips">${ppl.map(pchip).join("")}</div>`, ppl.length) : "") +
      (texts.length ? sec("Its readings", texts.slice(0, 5).map(row).join("") + (texts.length > 5 ? more(`All ${texts.length} readings`, texts.slice(5).map(row).join("")) : ""), texts.length) : "") +
      (ov.length ? sec("Shared readings", ov.map(o => `<a class="ovr" href="${href("t/" + o.t.id)}"><span>${esc(tiny(o.t))}</span><span class="bar"><i style="width:${Math.round(o.same / o.both * 100)}%;background:${col(o.t)}"></i></span><b class="mono">${o.same}/${o.both}</b></a>`).join("") + `<p class="note">Texts where both are listed, and how many they read the same way. A count from this site's ${CH.debates.length} texts, not a measure of how close two churches are.</p>`) : "") +
      (stance ? more("Where it stands on 8 questions", stance) : "") +
      more("Origins and marks", `<p>${esc(t.origins)}</p>${(t.marks || []).length ? `<ul>${t.marks.map(m => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}${t.bodies ? `<p class="note">${esc(t.bodies)}</p>` : ""}`);
  }

  function inspD(d) {
    const cat = CH.debateCats.find(c => c.id === d.cat), i0 = Math.min(psel[d.id] || 0, d.passages.length - 1), p = d.passages[i0];
    const mine = st.focus && READ[d.id][st.focus], listed = Object.keys(READ[d.id]).length;
    const bar = d.positions.map((q, i) => ((q.held || []).length ? `<i style="flex:${q.held.length};background:${LN.readPal[i % 6]}" title="${esc(q.name)}"></i>` : "")).join("");
    const reads = d.positions.map((q, i) => `<article class="rd${mine && mine.indexOf(i) >= 0 ? " mine" : ""}"><header><i style="background:${LN.readPal[i % 6]}"></i><h4>${esc(q.name)}</h4><b class="mono">${(q.held || []).length}</b></header>${mine && mine.indexOf(i) >= 0 ? `<p class="minel mono" style="color:${col(st.focus)}">${esc(tiny(T[st.focus]))} reads it this way</p>` : ""}${(q.held || []).length ? `<div class="chips">${q.held.map(tchip).join("")}</div>` : `<p class="note">No living tradition on this map is listed here.</p>`}${more("The case for it", `<p>${esc(q.text)}</p>`)}</article>`).join("");
    return head(esc(cat.name) + " · disputed text", esc(d.title), esc(d.q), "#8FB0FF") +
      `<figure class="vs" data-ref="${esc(p.ref)}"${p.t ? ` data-t="${p.t}"` : ""}></figure>${p.note ? `<p class="pnote">${esc(p.note)}</p>` : ""}` +
      `<div class="pcs" role="group" aria-label="Passages">${d.passages.map((q, i) => `<button type="button" class="pc${i === i0 ? " on" : ""}" data-pi="${i}" aria-pressed="${i === i0}">${prettyRef(q.ref)}</button>`).join("")}</div>` +
      sec("Readings", `<div class="split" aria-hidden="true">${bar}</div><p class="note">${listed} traditions are listed. Bar segments show how they divide.</p>${reads}`, d.positions.length) +
      sec("Where it turns", `<p>${esc(d.crux)}</p>`) +
      (d.history ? more("How the argument ran", `<p>${esc(d.history)}</p>`) : "") +
      ((d.people || []).filter(x => P[x]).length ? sec("People in it", `<div class="pchips">${d.people.map(pchip).join("")}</div>`) : "") +
      ((d.councils || []).filter(x => C[x]).length ? sec("Councils and confessions", `<div class="chips">${d.councils.filter(x => C[x]).map(x => `<a class="chip sq" href="${href("c/" + x)}" style="--c:${LN.councilColor[C[x].g]}"><i></i>${esc(C[x].name)}</a>`).join("")}</div>`) : "");
  }

  function inspP(p) {
    const t = T[p.t], c = t ? col(t) : "#9AA3B2", era = CH.eras.find(e => e.id === p.e), im = CH.images[p.w];
    const evs = CH.events.filter(e => (e.people || []).indexOf(p.id) >= 0), ds = CH.debates.filter(d => (d.people || []).indexOf(p.id) >= 0);
    return head(esc(era ? era.name : "") + (t ? " · " + esc(t.short) : ""), esc(p.n), esc(p.r + " · " + p.d), c) +
      (im ? `<figure class="por"><img src="${esc(thumb(im.src, 500))}" alt="${esc(p.n)}" loading="lazy" decoding="async" onerror="this.closest('figure').remove()"></figure>` : "") +
      `<p class="bio">${esc(p.b)}</p>` + (t ? `<div class="chips">${tchip(t.id)}</div>` : "") +
      (evs.length ? sec("On the record", evs.map(e => `<div class="evr"><span class="mono">${esc(e.d)}</span><b>${esc(e.t)}</b></div>`).join(""), evs.length) : "") +
      (ds.length ? sec("Texts argued over", ds.map(d => `<a class="rdrow" href="${href("text/" + d.id)}"><b>${esc(d.title)}</b><span>${esc(d.q)}</span></a>`).join(""), ds.length) : "");
  }

  function inspC(c) {
    const g = CH.councilGroups.find(x => x.id === c.g), ds = CH.debates.filter(d => (d.councils || []).indexOf(c.id) >= 0);
    return head(esc(g ? g.name : "Council"), esc(c.name), esc(c.when + " · " + c.place), LN.councilColor[c.g]) +
      sec("The question", `<p>${esc(c.issue)}</p>`) + sec("Decided", `<p>${esc(c.decided)}</p>`) + (c.after ? sec("Afterward", `<p>${esc(c.after)}</p>`) : "") +
      (ds.length ? sec("Texts it bears on", ds.map(d => `<a class="rdrow" href="${href("text/" + d.id)}"><b>${esc(d.title)}</b><span>${esc(d.q)}</span></a>`).join(""), ds.length) : "");
  }

  function inspY(b) {
    const B = bins[b];
    return head("50 years", `${b} to ${b + BIN - 1}`, `${alive(Math.min(NOW, Math.max(30, b + BIN - 1)))} bodies on the map by the end of it.`, "#8FB0FF") +
      (B.events.length ? sec("Events", B.events.map(e => `<div class="evr${e.k ? " key" : ""}"><span class="mono">${esc(e.d)}</span><b>${esc(e.t)}</b><p>${esc(e.x)}</p></div>`).join(""), B.events.length) : "") +
      (B.people.length ? sec("People", `<div class="pchips">${B.people.map(p => pchip(p.id)).join("")}</div>`, B.people.length) : "") +
      (B.councils.length ? sec("Councils and confessions", `<div class="chips">${B.councils.map(c => `<a class="chip sq" href="${href("c/" + c.id)}" style="--c:${LN.councilColor[c.g]}"><i></i>${esc(c.name)}</a>`).join("")}</div>`, B.councils.length) : "");
  }

  function renderInsp() {
    const el = $("#insp"); let html = "";
    if (st.kind === "t" && T[st.id]) html = inspT(T[st.id]);
    else if (st.kind === "text" && D[st.id]) html = inspD(D[st.id]);
    else if (st.kind === "p" && P[st.id]) html = inspP(P[st.id]);
    else if (st.kind === "c" && C[st.id]) html = inspC(C[st.id]);
    else if (st.kind === "y" && bins[st.id]) html = inspY(+st.id);
    const picked = !!html;
    el.innerHTML = (picked ? `<div class="sheetbar"><a href="${href("")}">Close</a></div>` : "") + `<div class="insp-in">${html || inspHome()}</div>`;
    el.classList.toggle("picked", picked); document.body.classList.toggle("sheet-on", picked);
    el.scrollTop = 0; paintVerses();
  }

  /* ───── stat strip ───── */
  function kpis() {
    const W = 92, H = 28;
    const bars = arr => { const m = Math.max.apply(null, arr), w = W / arr.length; return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${arr.map((n, i) => `<rect x="${(i * w + 1).toFixed(1)}" y="${(H - Math.max(2, n / m * H)).toFixed(1)}" width="${(w - 2).toFixed(1)}" height="${Math.max(2, n / m * H).toFixed(1)}" rx="1.5"/>`).join("")}</svg>`; };
    const per = (list, yr) => CH.eras.map(e => list.filter(x => { const y = yr(x); return y >= e.from && (e.to === NOW ? y <= e.to : y < e.to); }).length);
    let line = ""; const mx = alive(NOW) + 2;
    for (let i = 0; i <= 40; i++) { const y = 30 + (NOW - 30) * i / 40; line += (i ? "L" : "M") + (LN.tf(y) * W).toFixed(1) + "," + (H - 2 - alive(y) / mx * (H - 4)).toFixed(1); }
    const cats = CH.debateCats.map((c, i) => `<i style="flex:${CH.debates.filter(d => d.cat === c.id).length};background:${LN.readPal[i % 6]}"></i>`).join("");
    const tiles = [
      ["flow", CH.traditions.length, "Traditions", `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="ln" d="${line}"/></svg>`],
      ["radial", CH.people.length, "People", bars(per(CH.people, p => PY[p.id]))],
      ["pulse", CH.events.length, "Events", bars(per(CH.events, e => e.y))],
      ["pulse", CH.councils.length, "Councils", bars(per(CH.councils, c => c.year))],
      ["matrix", CH.debates.length, "Disputed texts", `<span class="seg">${cats}</span>`],
      ["matrix", Object.keys(CH.verses).length, "Passages written out", `<span class="trl mono">${TR_HAVE.join(" ")}</span>`]
    ];
    $("#kpis").innerHTML = tiles.map(t => `<a class="kpi" href="#/${t[0]}"><span class="mono">${t[2]}</span><b>${t[1]}</b><span class="sp">${t[3]}</span></a>`).join("");
  }

  /* ───── sources ───── */
  function sources() {
    const notices = {
      NIV: "Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used by permission. All rights reserved worldwide.",
      NASB: "Scripture quotations taken from the New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995 by The Lockman Foundation. Used by permission. All rights reserved. lockman.org",
      NLT: "Scripture quotations are taken from the Holy Bible, New Living Translation, copyright © 1996, 2004, 2015 by Tyndale House Foundation. Used by permission of Tyndale House Publishers, Carol Stream, Illinois 60188. All rights reserved.",
      TPT: "Scripture quotations marked TPT are from The Passion Translation®. Copyright © 2017, 2018, 2020 by Passion & Fire Ministries, Inc. Used by permission. All rights reserved. ThePassionTranslation.com.",
      KJV: "King James Version, 1769 text. Public domain in the United States."
    };
    const kinds = { NIV: "Thought-for-thought and word-for-word in balance.", NASB: "Strictly word-for-word.", NLT: "Thought-for-thought, in everyday English.", TPT: "An expansive rendering by one translator. Many scholars class it as a paraphrase.", KJV: "The classic English Bible of 1611, in its 1769 spelling." };
    const imgs = Object.keys(CH.images).sort();
    return `<div class="src">
      <section><h3 class="mono">Bible translations</h3><dl>${TR_HAVE.map(t => `<div><dt>${TR[t][0]} · ${esc(TR[t][1])}</dt><dd>${kinds[t]}<br><span class="fine">${esc(notices[t])}</span></dd></div>`).join("")}
        <div><dt>Douay-Rheims</dt><dd>Used for 2 Maccabees, which is not in the other translations here, and for one comparison in Luke 1:28. Public domain.</dd></div></dl></section>
      <section><h3 class="mono">Method</h3>
        <p>Each position is stated the way its own confessions and teachers state it: the Catechism of the Catholic Church, the Orthodox councils and fathers, the Book of Concord, the Reformed and Westminster standards, the Thirty-Nine Articles, the Schleitheim and Baptist confessions, Wesley's sermons, and the statements of faith of Pentecostal, Adventist and Restoration churches. Where a tradition holds more than one view, the page says so.</p>
        <p>Dates before 400 are often approximate and are marked “c.” Membership numbers are rounded and labeled as estimates, or carry the name of the body that reports them. World totals follow the Center for the Study of Global Christianity and the Pew Research Center.</p></section>
      <section><h3 class="mono">How the views are counted</h3><ul>
        <li>Flow and Radial stretch the time axis so crowded centuries get more room. Each line starts in the year on that tradition's card.</li>
        <li>Line width and circle area use the size estimate on each card, at the midpoint where the card gives a range. Two cards give words instead of a number. Those are drawn with a dashed edge.</li>
        <li>The Matrix shows only the readings this site lists. A blank cell means no reading is listed, not that a church has no view.</li>
        <li>Shared readings is a count across these ${CH.debates.length} texts. It is not a measure of how close two churches are.</li>
        <li>Pulse counts what this site records. It shows where the record is thick, not how much happened.</li>
        <li>A person's dot sits at the middle of their life, or 20 years before a lone death date.</li></ul></section>
      <section><h3 class="mono">Further reading</h3><ul>
        <li>Jaroslav Pelikan, <i>The Christian Tradition: A History of the Development of Doctrine</i>, 5 volumes (1971–1989)</li>
        <li>Diarmaid MacCulloch, <i>Christianity: The First Three Thousand Years</i> (2009) and <i>The Reformation</i> (2003)</li>
        <li>Justo L. González, <i>The Story of Christianity</i>, 2 volumes</li>
        <li>Henry Chadwick, <i>The Early Church</i> (1967)</li>
        <li>Timothy (Kallistos) Ware, <i>The Orthodox Church</i> (1963)</li>
        <li>Philip Jenkins, <i>The Lost History of Christianity</i> (2008), on the churches of Asia and Africa</li>
        <li>Mark Noll, <i>Turning Points: Decisive Moments in the History of Christianity</i></li>
        <li>Philip Schaff, <i>The Creeds of Christendom</i>, 3 volumes (1877), for the texts of the creeds and confessions</li></ul></section>
      <section class="wide"><h3 class="mono">Image credits</h3><p>All images are served from Wikimedia Commons under the license shown. Click a title for the file page.</p>
        <ul class="credits">${imgs.map(k => { const im = CH.images[k]; return `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(im.file)}" target="_blank" rel="noopener">${esc(k)}</a> <span>${esc([im.by, im.lic].filter(Boolean).join(", ") || "Wikimedia Commons")}</span></li>`; }).join("")}</ul></section>
    </div>`;
  }

  /* ───── canvas ───── */
  function renderCanvas() {
    const m = META[st.view];
    $("#cvh").innerHTML = `<div><h1><span class="mono">View ${st.view === "sources" ? "" : "0" + (VIEWS.indexOf(st.view) + 1) + " / 05"}</span>${m.name}</h1><p>${m.line}</p></div>`;
    const b = $("#cvb");
    b.className = "cv-b v-" + st.view;
    b.innerHTML = st.view === "sources" ? sources() : V[st.view]();
    $("#cvf").innerHTML = st.view === "matrix" ? `<p id="mlegend"></p>` : m.foot ? `<p>${m.foot}</p>` : "";
    const sc = b.querySelector(".scroll.center"); if (sc) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
    if (painted) b.classList.add("sw");
  }
  function paintTabs() {
    const keep = st.kind ? "/" + st.kind + "/" + encodeURIComponent(st.id) : "";
    document.querySelectorAll("#tabs a").forEach(a => {
      const on = a.dataset.view === st.view;
      a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      a.setAttribute("href", "#/" + a.dataset.view + (a.dataset.view === "sources" ? "" : keep));
    });
  }

  function applySel() {
    const root = $("#cvb"); let rel = null;
    if (st.kind === "t" && T[st.id]) rel = related(st.id);
    else if (st.kind === "p" && P[st.id] && T[P[st.id].t]) rel = new Set([P[st.id].t]);
    else if (st.kind === "text" && st.focus) rel = related(st.focus);
    else if (st.fam) rel = new Set(CH.traditions.filter(t => t.family === st.fam).map(t => t.id));
    const me = st.kind === "t" ? st.id : st.kind === "text" ? st.focus : null;
    root.classList.toggle("has-sel", !!rel);
    root.querySelectorAll("[data-t]").forEach(el => { el.classList.toggle("rel", !!rel && rel.has(el.dataset.t)); el.classList.toggle("me", !!me && el.dataset.t === me); });
    root.querySelectorAll("[data-p]").forEach(el => el.classList.toggle("on", st.kind === "p" && el.dataset.p === st.id));
    root.querySelectorAll("[data-c]").forEach(el => el.classList.toggle("on", st.kind === "c" && el.dataset.c === st.id));
    root.querySelectorAll("[data-bin]").forEach(el => el.classList.toggle("on", st.kind === "y" && el.dataset.bin === st.id));
    root.querySelectorAll(".mr").forEach(el => el.classList.toggle("on", st.kind === "text" && el.dataset.d === st.id));
    if (st.view === "matrix") {
      const on = V.paintMatrix(root, me), key = (c, s) => `<span class="lg"><i style="background:${c}"></i>${s}</span>`;
      $("#mlegend").innerHTML = on
        ? `Compared with <b style="color:${col(me)}">${esc(tiny(T[me]))}</b>: ${key("#F2F5FA", "its own reading")}${key("#4D7CFE", "same reading")}${key("#FF4D4D", "a different reading")}${key("#3A4558", "it has none listed")} A blank cell means this site lists no reading there.`
        : `${LN.readPal.map((c, i) => key(c, ["1st", "2nd", "3rd", "4th", "5th", "6th"][i])).join("")} reading listed for that text. A color only groups the churches within its own row. Pick a tradition to see who reads with it. A blank cell means this site lists no reading there.`;
    }
  }

  /* ───── router ───── */
  function route() {
    const h = location.hash.replace(/^#\/?/, "").split("/");
    const view = VIEWS.indexOf(h[0]) >= 0 || h[0] === "sources" ? h[0] : "flow", kind = h[1] || "", id = decodeURIComponent(h[2] || "");
    const changed = view !== st.view;
    st.view = view; st.kind = kind; st.id = id;
    if (kind === "t") st.focus = id; else if (kind === "text") st.focus = pendingFocus || st.focus; else st.focus = null;
    if (kind) st.fam = null;
    pendingFocus = null;
    if (changed) renderCanvas();
    renderInsp(); applySel(); paintTabs();
    if (painted) $("#insp").classList.add("sw");
    painted = true;
    const name = kind === "t" && T[id] ? T[id].name : kind === "text" && D[id] ? D[id].title : kind === "p" && P[id] ? P[id].n : kind === "c" && C[id] ? C[id].name : "";
    document.title = (name ? name + " · " : "") + META[view].name + " · Lineage";
  }

  const open = el => { if (el.dataset.focus) pendingFocus = el.dataset.focus; location.hash = "#/" + st.view + "/" + el.dataset.open; };
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-open],[data-more],[data-tr],[data-pi],[data-fam]");
    if (!el) return;
    if (el.dataset.open) { e.preventDefault(); open(el); }
    else if (el.hasAttribute("data-more")) { const m = el.closest(".more"), on = m.classList.toggle("open"); el.setAttribute("aria-expanded", on); }
    else if (el.dataset.tr) { curTr = el.dataset.tr; store.set("vb.tr", curTr); paintVerses(); }
    else if (el.dataset.pi) { psel[st.id] = +el.dataset.pi; const y = $("#insp").scrollTop; renderInsp(); $("#insp").scrollTop = y; }
    else if (el.dataset.fam) { st.fam = st.fam === el.dataset.fam ? null : el.dataset.fam; renderInsp(); applySel(); }
  });
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-open][tabindex]")) { e.preventDefault(); open(e.target); }
    if (e.key === "Escape" && st.kind) location.hash = "#/" + st.view;
  });

  /* ───── tooltip (mouse only) ───── */
  const tip = $("#tip");
  document.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const el = e.target.closest && e.target.closest("[data-tip]");
    if (!el) { tip.hidden = true; return; }
    tip.textContent = el.dataset.tip; tip.hidden = false;
    const w = tip.offsetWidth, x = Math.min(window.innerWidth - w - 10, e.clientX + 14), y = e.clientY + 18 + tip.offsetHeight > window.innerHeight ? e.clientY - tip.offsetHeight - 10 : e.clientY + 18;
    tip.style.left = Math.max(6, x) + "px"; tip.style.top = y + "px";
  });
  document.addEventListener("pointerleave", () => (tip.hidden = true));
  window.addEventListener("scroll", () => (tip.hidden = true), { passive: true });

  $("#tabs").innerHTML = VIEWS.concat("sources").map(v => `<a href="#/${v}" data-view="${v}"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[v]}</svg><span>${META[v].name}</span></a>`).join("");
  kpis();
  window.addEventListener("hashchange", route);
  // Motion only where frames really run. If none arrives, the page paints still and nothing waits on an animation.
  let started = false;
  const start = live => { if (started) return; started = true; if (live) document.documentElement.classList.add("live"); route(); };
  requestAnimationFrame(() => start(true));
  setTimeout(() => start(false), 160);
})();
