/* ============================================================
   FAITH — site behavior: theme toggle, scroll reveals,
   stat count-ups, nav active state.
   (The <head> carries a tiny first-paint script that sets
   data-theme before CSS loads; this file only toggles it.)
   ============================================================ */
(function () {
  'use strict';

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fine */ } }

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme ---------- */
  function effectiveTheme() {
    var explicit = document.documentElement.dataset.theme;
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function initTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      lsSet('faith-theme', next);
    });
    /* Ease palette swaps only after first paint, so a visit doesn't
       open by fading into its own colors. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add('theme-eases');
      });
    });
  }

  /* ---------- scroll reveals ---------- */
  function initReveals() {
    var els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stat count-up ---------- */
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (!isFinite(target)) return;
    var suffix = el.dataset.suffix || '';
    if (REDUCED) { el.textContent = target + suffix; return; }
    var start = null;
    var dur = 1400;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    var els = Array.from(document.querySelectorAll('[data-count]'));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(countUp);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        countUp(entry.target);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- nav active state ---------- */
  function initNavSpy() {
    var links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { io.observe(s); });
  }

  function init() {
    initTheme();
    initReveals();
    initCounters();
    initNavSpy();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
