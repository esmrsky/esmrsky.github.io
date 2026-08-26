/* ============================================================
   FAITH — direction switcher (preview only)

   One button in the nav, next to the theme toggle: each click advances to the next
   direction. Sets `data-dir` on <html>; themes.css does the rest. Also keeps
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
    { id: 'original', name: 'Original',  sw: ['#a1761c', '#3c5a96', '#b03a2a'] },
    { id: 'bulletin', name: 'Bulletin',  sw: ['#2933F0', '#FF3E8A', '#14A06A'] },
    { id: 'prism',    name: 'Prism',     sw: ['#0B4CFF', '#E23200', '#00875F'] },
    { id: 'placard',  name: 'Placard',   sw: ['#E8112D', '#0026FF', '#0F0F10'] },
    { id: 'margin',   name: 'Margin',    sw: ['#1B3BFF', '#D6002E', '#007A5E'] }
  ];


  var root = document.documentElement;
  var btn = document.getElementById('dirsw');
  if (!btn) return;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fine */ } }

  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function syncMode() {
    var t = root.dataset.theme;
    var dark = t === 'dark' || (t !== 'light' && mql.matches);
    root.dataset.mode = dark ? 'dark' : 'light';
  }

  function indexOf(id) {
    for (var i = 0; i < DIRECTIONS.length; i++) if (DIRECTIONS[i].id === id) return i;
    return 0;
  }

  function apply(id, userPick) {
    var d = DIRECTIONS[indexOf(id)];
    if (d.id === 'original') delete root.dataset.dir;
    else root.dataset.dir = d.id;
    syncMode();
    if (userPick) lsSet(KEY, d.id);

    var next = DIRECTIONS[(indexOf(d.id) + 1) % DIRECTIONS.length];
    for (var i = 0; i < 3; i++) btn.style.setProperty('--sw' + (i + 1), d.sw[i]);
    btn.title = d.name + ' — click for ' + next.name;
    btn.setAttribute('aria-label', 'Design direction: ' + d.name + '. Click for ' + next.name + '.');
  }

  apply(root.dataset.dir || 'original', false);

  btn.addEventListener('click', function () {
    apply(DIRECTIONS[(indexOf(root.dataset.dir || 'original') + 1) % DIRECTIONS.length].id, true);
  });

  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    if (e.key >= '1' && e.key <= String(DIRECTIONS.length - 1)) apply(DIRECTIONS[Number(e.key)].id, true);
    else if (e.key === '0' || e.key === '`') apply('original', true);
  });

  /* the site's own toggle writes data-theme; mirror it into data-mode */
  new MutationObserver(syncMode).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (mql.addEventListener) mql.addEventListener('change', syncMode);
  else if (mql.addListener) mql.addListener(syncMode);
})();
