/* Lineage: shared lookups and counts. Every number a view draws is worked out here from /data. */
(function () {
  "use strict";
  const CH = window.CH, LN = window.LN;
  const NOW = 2026;
  const T = {}, P = {}, D = {}, C = {};
  CH.traditions.forEach(t => (T[t.id] = t));
  CH.people.forEach(p => (P[p.id] = p));
  CH.debates.forEach(d => (D[d.id] = d));
  CH.councils.forEach(c => (C[c.id] = c));

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const col = t => LN.color[(typeof t === "string" ? T[t] : t).family] || "#9AA3B2";
  const tiny = t => LN.tinyName[t.id] || t.short;
  const r1 = n => Math.round(n * 10) / 10;

  /* ───── time ───── */
  const stops = []; let acc = 0;
  CH.eras.forEach(e => { const w = LN.eraWidth[e.id]; stops.push({ e, a: acc, b: acc + w }); acc += w; });
  // Year to a 0..1 place on the stretched time axis.
  const tf = y => {
    y = Math.max(30, Math.min(NOW, y));
    for (const s of stops) if (y <= s.e.to) return s.a + (s.b - s.a) * (y - s.e.from) / (s.e.to - s.e.from);
    return 1;
  };
  const MARKS = [100, 313, 600, 1054, 1517, 1648, 1900, NOW];

  /* ───── the tree ───── */
  const kids = {};
  CH.traditions.forEach(t => { if (t.parent) (kids[t.parent] = kids[t.parent] || []).push(t.id); });
  const ancestors = id => { const a = []; let t = T[id]; while (t && t.parent) { a.push(t.parent); t = T[t.parent]; } return a; };
  const descendants = id => { const out = []; (function go(x) { (kids[x] || []).forEach(k => { out.push(k); go(k); }); })(id); return out; };
  const related = id => new Set([id].concat(ancestors(id), descendants(id)));
  const alive = y => CH.traditions.filter(t => t.start <= y && (!t.end || t.end > y)).length;
  const living = CH.traditions.filter(t => !t.end);

  /* ───── people ───── */
  const eraMid = {}; CH.eras.forEach(e => (eraMid[e.id] = (e.from + e.to) / 2));
  // One working year per person, from the dates on their card: the middle of a life, or 20 years before a lone death date.
  const pyear = p => {
    const n = (p.d.match(/\d+/g) || []).map(Number); let y;
    if (/century/.test(p.d) && n.length) y = (n[0] - 1) * 100 + 50;
    else if (n.length >= 2) y = (n[0] + n[1]) / 2;
    else if (n.length === 1) y = /^d\./.test(p.d) ? n[0] - 20 : n[0];
    else y = eraMid[p.e];
    return Math.max(30, Math.min(NOW, y));
  };
  const PY = {}; CH.people.forEach(p => (PY[p.id] = pyear(p)));
  const peopleOf = id => CH.people.filter(p => p.t === id).sort((a, b) => PY[a.id] - PY[b.id]);

  /* ───── readings ───── */
  // READ[text][tradition] = the readings (by position number) that tradition is listed under.
  const READ = {};
  CH.debates.forEach(d => { const m = (READ[d.id] = {}); d.positions.forEach((p, i) => (p.held || []).forEach(h => (m[h] = m[h] || []).push(i))); });
  const cover = id => CH.debates.filter(d => READ[d.id][id]).length;
  const share = (a, b) => a.some(x => b.indexOf(x) >= 0);
  // For one tradition: every other tradition, with the texts both are listed on and how many they read the same way.
  const overlap = id => CH.traditions.filter(t => t.id !== id).map(t => {
    let both = 0, same = 0;
    CH.debates.forEach(d => { const a = READ[d.id][id], b = READ[d.id][t.id]; if (a && b) { both++; if (share(a, b)) same++; } });
    return { t, both, same };
  }).filter(o => o.both >= 8).sort((x, y) => y.same / y.both - x.same / x.both || y.both - x.both);
  const matrixCols = CH.traditions.filter(t => cover(t.id) > 0).sort((a, b) => a.lane - b.lane || a.start - b.start);

  /* ───── size ───── */
  const fmtSize = id => {
    const v = LN.size[id];
    if (v == null) return "";
    if (LN.soft[id]) return LN.soft[id];
    if (LN.under[id]) return "<100K";
    return "~" + (v >= 1000 ? r1(v / 1000) + "B" : v >= 10 ? Math.round(v) + "M" : v >= 1 ? r1(v) + "M" : Math.round(v * 1000) + "K");
  };

  /* ───── events in 50-year steps ───── */
  const BIN = 50;
  const binOf = y => Math.floor(y / BIN) * BIN;
  const bins = {};
  const bin = b => (bins[b] = bins[b] || { from: b, events: [], people: [], councils: [] });
  for (let b = 0; b <= 2000; b += BIN) bin(b);
  CH.events.forEach(e => bin(binOf(e.y)).events.push(e));
  CH.people.forEach(p => bin(binOf(PY[p.id])).people.push(p));
  CH.councils.forEach(c => bin(binOf(c.year)).councils.push(c));

  /* ───── images ───── */
  // Wikimedia serves fixed thumbnail steps; a small face should not pull the full-size file.
  const thumb = (src, px) => (px ? src.replace(/\/(\d+)px-/, (m, n) => (+n > px ? "/" + px + "px-" : m)) : src);
  // The banner and portrait need about 740px for a sharp picture on a phone or laptop screen. Wikimedia's 960px
  // step where the original is that wide; otherwise the original file, which is then under 960px.
  const sharp = im => {
    const m = /\/(\d+)px-/.exec(im.src);
    if (!m) return { src: im.src, w: im.w };
    const ow = LN.mid[im.file];
    if (!ow) return { src: im.src.replace(/\/\d+px-/, "/960px-"), w: 960 };
    return { src: im.src.replace("://thumb.wikimedia.org/", "://upload.wikimedia.org/").replace("/thumb/", "/").replace(/\/[^\/]+$/, ""), w: ow };
  };
  const picture = (im, alt) => {
    const lo = thumb(im.src, 500), hi = sharp(im);
    const set = hi.src === lo ? "" : ` srcset="${esc(lo)} 500w, ${esc(hi.src)} ${hi.w}w" sizes="(max-width: 920px) min(100vw, 600px), 370px"`;
    return `<img src="${esc(lo)}"${set} alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.closest('figure').remove()">`;
  };
  const initials = n => n.replace(/\(.*?\)/g, "").split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join("");
  const face = (p, px, cls) => {
    const im = CH.images[p.w], c = p.t && T[p.t] ? col(p.t) : "#9AA3B2";
    return `<span class="face ${cls || ""}" style="--c:${c}"><i>${esc(initials(p.n))}</i>${im ? `<img src="${esc(thumb(im.src, px || 120))}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ""}</span>`;
  };

  Object.assign(LN, { NOW, T, P, D, C, esc, col, tiny, tf, MARKS, kids, ancestors, descendants, related, alive, living, PY, peopleOf,
    READ, cover, share, overlap, matrixCols, fmtSize, BIN, bins, binOf, thumb, picture, face, eraStops: stops });
})();
