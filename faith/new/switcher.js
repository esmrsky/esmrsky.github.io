/* ============================================================
   FAITH — direction switcher (preview only)

   Sets `data-dir` on <html>; themes.css does the rest. Also keeps
   `data-mode` — the site's three-state theme (explicit dark /
   explicit light / system) resolved down to two — in sync, so each
   direction needs two palette blocks instead of three.

   Deliberately NOT a view transition. This is a control a reader
   presses repeatedly, and while a document-wide view transition runs
   the page is a photograph of itself: nothing is hit-tested, so the
   second press lands on the document instead of the button. The
   colour tokens are @property-registered and eased by
   :root.theme-eases, so the palette cross-fades anyway; type swaps.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'faith-dir';

  /* swatches are the light-mode values from themes.css, in reading order */
  var DIRECTIONS = [
    { id: 'original',  name: 'Original',   tag: 'Manuscript · gold · serif',      sw: ['#f6f1e4', '#a1761c', '#3c5a96', '#b03a2a', '#6d4b94'] },
    { id: 'bulletin',  name: 'Bulletin',   tag: 'Flat · wide display',            sw: ['#EEF0F6', '#2933F0', '#FF3E8A', '#FFD029', '#14A06A'] },
    { id: 'prism',     name: 'Prism',      tag: 'Five-hue index',                 sw: ['#FFFFFF', '#0B4CFF', '#E23200', '#00875F', '#8A22F0'] },
    { id: 'placard',   name: 'Placard',    tag: 'Condensed · two inks',           sw: ['#F4F5F7', '#E8112D', '#0026FF', '#0F0F10', '#FFFFFF'] },
    { id: 'field',     name: 'Field',      tag: 'Readouts · thresholds',          sw: ['#0B1410', '#6EF2B0', '#F2C14E', '#C9744A', '#12201A'] },
    { id: 'blueprint', name: 'Blueprint',  tag: 'Drafted · annotated',            sw: ['#0D1B3E', '#38BDF8', '#7C93BE', '#FF7A6B', '#16295A'] },
    { id: 'margin',    name: 'Margin',     tag: 'Serif · apparatus',              sw: ['#FBFBF9', '#1B3BFF', '#D6002E', '#007A5E', '#14141A'] },
    { id: 'ledger',    name: 'Ledger',     tag: 'Dense · tabular',                sw: ['#F0F2F4', '#2F5D8C', '#B5543F', '#4E7A4A', '#6B4E82'] },
    { id: 'chroma',    name: 'Chroma',     tag: 'Saturated blocks',               sw: ['#FFFFFF', '#1D2BE0', '#F4361F', '#D6F034', '#7B2FF7'] }
  ];

  /* Field and Blueprint were drawn dark; the others were drawn light.
     Applying a direction takes its native mode unless the reader has
     picked a theme for themselves. */
  var NATIVE_DARK = { field: true, blueprint: true };

  var root = document.documentElement;
  var wrap = document.getElementById('dsw');
  var handle = document.getElementById('dsw-handle');
  var tray = document.getElementById('dsw-tray');
  var nameEl = document.getElementById('dsw-name');
  if (!wrap || !handle || !tray || !nameEl) return;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fine */ } }

  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function syncMode() {
    var t = root.dataset.theme;
    var dark = t === 'dark' || (t !== 'light' && mql.matches);
    root.dataset.mode = dark ? 'dark' : 'light';
  }

  function current() {
    return root.dataset.dir || 'original';
  }

  function find(id) {
    for (var i = 0; i < DIRECTIONS.length; i++) if (DIRECTIONS[i].id === id) return DIRECTIONS[i];
    return DIRECTIONS[0];
  }

  /* an explicit choice — the site's toggle, or ?theme= in the URL — outranks
     a direction's own default mode, and nothing below may overwrite it */
  var urlTheme = /[?&]theme=(dark|light)/.test(location.search);

  function apply(id, userPick) {
    var d = find(id);
    if (d.id === 'original') delete root.dataset.dir;
    else root.dataset.dir = d.id;

    /* Picking one of the two directions that were drawn dark opens it dark;
       picking any other hands the page back to the system preference. Only
       on a real pick — on load, the first-paint script has already done it,
       and re-running it here would clobber ?theme=. */
    if (userPick && !urlTheme && !lsGet('faith-theme')) {
      if (NATIVE_DARK[d.id]) root.dataset.theme = 'dark';
      else delete root.dataset.theme;
    }
    syncMode();

    if (userPick) lsSet(KEY, d.id);
    nameEl.textContent = d.name;
    handle.style.setProperty('--sw1', d.sw[1]);
    handle.style.setProperty('--sw2', d.sw[2]);
    handle.style.setProperty('--sw3', d.sw[3]);

    var opts = tray.querySelectorAll('.dsw-opt');
    for (var i = 0; i < opts.length; i++) {
      opts[i].setAttribute('aria-selected', String(opts[i].dataset.id === d.id));
    }
  }

  function buildTray() {
    var frag = document.createDocumentFragment();
    DIRECTIONS.forEach(function (d, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dsw-opt';
      b.dataset.id = d.id;
      b.setAttribute('role', 'option');
      b.setAttribute('aria-selected', 'false');

      var sw = document.createElement('span');
      sw.className = 'dsw-sw';
      sw.setAttribute('aria-hidden', 'true');
      d.sw.forEach(function (c) {
        var s = document.createElement('span');
        s.style.background = c;
        s.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,.14)';
        sw.appendChild(s);
      });

      var n = document.createElement('span');
      n.className = 'dsw-opt-name';
      n.innerHTML = '<span class="dsw-opt-num">' + (i === 0 ? '—' : ('0' + i)) + '</span>';
      n.appendChild(document.createTextNode(d.name));

      var t = document.createElement('span');
      t.className = 'dsw-opt-tag';
      t.textContent = d.tag;

      b.appendChild(sw); b.appendChild(n); b.appendChild(t);
      frag.appendChild(b);
    });
    tray.appendChild(frag);
  }

  function open(v) {
    wrap.dataset.open = String(v);
    handle.setAttribute('aria-expanded', String(v));
    tray.hidden = !v;
    if (v) {
      var sel = tray.querySelector('.dsw-opt[aria-selected="true"]');
      if (sel) sel.focus();
    }
  }

  buildTray();
  apply(current(), false);

  handle.addEventListener('click', function (e) {
    e.stopPropagation();
    open(wrap.dataset.open !== 'true');
  });

  tray.addEventListener('click', function (e) {
    var b = e.target.closest('.dsw-opt');
    if (!b) return;
    apply(b.dataset.id, true);
    open(false);
    handle.focus();
  });

  tray.addEventListener('keydown', function (e) {
    var opts = Array.prototype.slice.call(tray.querySelectorAll('.dsw-opt'));
    var i = opts.indexOf(document.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = opts[(i + 1) % opts.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = opts[(i - 1 + opts.length) % opts.length];
    if (next) { e.preventDefault(); next.focus(); }
  });

  document.addEventListener('click', function (e) {
    if (wrap.dataset.open === 'true' && !wrap.contains(e.target)) open(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wrap.dataset.open === 'true') { open(false); handle.focus(); }
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    /* 1–8 pick a direction, 0 (or `) returns to the original */
    if (e.key >= '1' && e.key <= '8') apply(DIRECTIONS[Number(e.key)].id, true);
    else if (e.key === '0' || e.key === '`') apply('original', true);
  });

  /* the site's own toggle writes data-theme; mirror it into data-mode */
  new MutationObserver(syncMode).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (mql.addEventListener) mql.addEventListener('change', syncMode);
  else if (mql.addListener) mql.addListener(syncMode);
})();
