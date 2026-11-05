/* Before the Mountains: theme, the lens (inside / both / outside), the passage filters, and the
   live verse slots. The verse painter is Salvation's, by way of Received. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $$ = function (s, el) { return Array.prototype.slice.call((el || d).querySelectorAll(s)); };
  var lsSet = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  /* ---- theme */
  var themeBtn = d.querySelector('.theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    lsSet('btm-theme', next);
  });

  /* ---- the lens, shared by every page */
  var lensBtns = $$('.lens button');
  var applyLens = function (lens) {
    root.setAttribute('data-lens', lens);
    lensBtns.forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.lens === lens)); });
    filter();
  };
  lensBtns.forEach(function (b) {
    b.addEventListener('click', function () { applyLens(b.dataset.lens); lsSet('btm-lens', b.dataset.lens); });
  });

  /* ---- passages: lens + theme filter */
  var cards = $$('.pcard'), tabs = $$('.tab'), shown = d.getElementById('shown'), theme = 'all';
  function filter() {
    if (!cards.length) return;
    var lens = root.getAttribute('data-lens') || 'both', n = 0;
    cards.forEach(function (c) {
      var okLens = lens === 'both' || c.dataset.lean === lens || c.dataset.lean === 'both';
      var okTheme = theme === 'all' || c.dataset.themeTag === theme;
      c.hidden = !(okLens && okTheme);
      if (!c.hidden) n++;
    });
    if (shown) shown.textContent = n;
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      theme = t.dataset.themeFilter;
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      filter();
    });
  });
  /* a hash that points at a filtered-out card: show everything, then go there */
  var revealHash = function () {
    var el = location.hash && d.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.classList.contains('pcard') && el.hidden) { theme = 'all'; tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.themeFilter === 'all')); }); applyLens('both'); el.scrollIntoView(); }
  };
  applyLens(root.getAttribute('data-lens') || 'both');
  revealHash();
  addEventListener('hashchange', revealHash);

  /* ---- the scripture layer */
  var S = window.EsmrskyScripture;
  if (!S) return;
  var VERS = ['NIV', 'NASB', 'NLT', 'ESV', 'AMP', 'KJV', 'TPT'];
  S.init({ key: 'before-the-mountains', scan: '#read', versions: VERS });
  var host = d.getElementById('pickerHost');
  if (host) { host.innerHTML = S.pickerHtml('Bible translation'); S.wirePicker(host, 'Verses read in'); }

  var FAILED = /^(Reference not recognized|Verse not found|Could not retrieve)/;
  var strip = function (text) {
    var parts = String(text || '').split('\n');
    if (parts.length > 1) { var h = parts[0].trim(); if (h && h.length < 60 && !/[.!?”’:;,]$/.test(h)) parts.shift(); }
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  };
  var slots = $$('[data-verse]');
  slots.forEach(function (el) { el._t = el.querySelector('.vtext') || el; el._base = el._t.innerHTML.trim(); });
  var BAKED = 'NIV', gen = 0;
  var tagFor = function (el) { var box = el.closest('.pc-verse'); return box && box.querySelector('.vver'); };
  var fill = function (el) {
    var v = S.getVersion(), g = gen, t = el._t, tag = tagFor(el);
    if (v === BAKED) { t.innerHTML = el._base; if (tag) tag.textContent = v; return; }
    t.style.opacity = '.45';
    S.loadVerse(el.dataset.verse, v).then(function (raw) {
      if (g !== gen) return;
      var note = '', cut = String(raw).indexOf('<span class="esv-note">');
      if (cut > -1) { note = raw.slice(cut).replace(/<[^>]+>/g, '').trim(); raw = raw.slice(0, cut); }
      var text = strip(String(raw).replace(/<[^>]+>/g, ''));
      t.style.opacity = '';
      if (!text || FAILED.test(text)) {
        t.innerHTML = el._base;
        if (tag) tag.textContent = BAKED + ', ' + v + ' unavailable';
        return;
      }
      t.textContent = text;
      if (tag) tag.textContent = note || v;
    });
  };
  var seen = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { seen.unobserve(e.target); fill(e.target); } });
  }, { rootMargin: '400px 0px' }) : null;
  var paint = function () {
    gen++;
    slots.forEach(function (el) { if (!seen) { fill(el); return; } seen.unobserve(el); seen.observe(el); });
  };
  paint();
  S.onChange(paint);
})();
