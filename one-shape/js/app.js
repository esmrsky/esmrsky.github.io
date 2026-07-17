/* ============================================================
   One Shape · Many Wells — app shell
   Two-level navigation: floating lens dock (level 1) +
   sticky scroll-spy section nav (level 2). Hash routing,
   theme toggle, and the console mode for Loop Mechanics.
   ============================================================ */
(function () {
  "use strict";

  var VIEWS = ["home", "pattern", "love", "mechanics", "wayback"];
  var body = document.body;
  var docEl = document.documentElement;
  var subnav = document.getElementById("subnav");
  var dock = document.getElementById("dock");
  var spy = { sections: [], ticking: false, last: null };

  /* ---------- Theme ---------- */
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

  function applyTheme(t) {
    docEl.setAttribute("data-theme", t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.innerHTML = t === "dark" ? SUN : MOON;
  }
  function initTheme() {
    var saved = localStorage.getItem("osmw-theme");
    var t = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(t);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      var next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("osmw-theme", next);
      applyTheme(next);
    });
  }

  /* ---------- Section nav (level 2) + scroll-spy ---------- */
  function buildSubnav(view) {
    subnav.innerHTML = "";
    var sections = document.querySelectorAll("#view-" + view + " .lens-section[data-title]");
    if (!sections.length) return;
    sections.forEach(function (sec) {
      var a = document.createElement("a");
      a.href = "#/" + view + "/" + sec.id;
      a.textContent = sec.getAttribute("data-title");
      a.dataset.target = sec.id;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToSection(sec.id, false);
        setHash(view, sec.id);
      });
      subnav.appendChild(a);
    });
    spy.last = null;
    var first = subnav.querySelector("a");
    if (first) first.classList.add("active");
    initSpy(view);
  }

  function initSpy(view) {
    spy.sections = Array.prototype.slice.call(
      document.querySelectorAll("#view-" + view + " .lens-section[data-title]")
    );
    runSpy();
  }

  // Deterministic: the active section is the last one whose top has
  // crossed a line just under the sticky header.
  function runSpy() {
    if (spy.ticking) return;
    spy.ticking = true;
    requestAnimationFrame(function () {
      spy.ticking = false;
      var secs = spy.sections;
      if (!secs.length) return;
      var line = 96;
      var current = secs[0].id;
      for (var i = 0; i < secs.length; i++) {
        if (secs[i].getBoundingClientRect().top - line <= 1) current = secs[i].id;
        else break;
      }
      highlightSubnav(current);
    });
  }

  function highlightSubnav(id) {
    if (id === spy.last) return;
    spy.last = id;
    var active = null;
    subnav.querySelectorAll("a").forEach(function (l) {
      var on = l.dataset.target === id;
      l.classList.toggle("active", on);
      if (on) active = l;
    });
    if (active && active.scrollIntoView) {
      active.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }

  function scrollToSection(id, instant) {
    var el = document.getElementById(id);
    if (!el) return;
    var go = function () { el.scrollIntoView({ behavior: instant ? "auto" : "smooth", block: "start" }); };
    requestAnimationFrame(go);
    // Correction passes: layout shifts as web fonts and images settle.
    if (document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
  }

  /* ---------- Routing (level 1) ---------- */
  function setHash(view, section) {
    var h = "#/" + view + (section ? "/" + section : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }

  function showView(view, section, fromHash) {
    if (VIEWS.indexOf(view) === -1) view = "home";

    VIEWS.forEach(function (v) {
      document.getElementById("view-" + v).classList.toggle("active", v === view);
    });
    body.setAttribute("data-lens", view);

    // Console mode only inside Loop Mechanics
    if (view === "mechanics") docEl.setAttribute("data-console", "on");
    else docEl.removeAttribute("data-console");

    // Dock state
    dock.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.view === view);
    });

    buildSubnav(view);

    if (section && document.getElementById(section)) {
      scrollToSection(section, fromHash);
    } else {
      window.scrollTo({ top: 0, behavior: fromHash ? "auto" : "smooth" });
    }
    if (!fromHash) setHash(view, section);
  }

  function parseHash() {
    var raw = location.hash.replace(/^#\/?/, "");
    if (!raw) return { view: "home", section: null };
    var parts = raw.split("/");
    return { view: parts[0] || "home", section: parts[1] || null };
  }

  function routeFromHash() {
    var r = parseHash();
    showView(r.view, r.section, true);
  }

  /* ---------- Wiring ---------- */
  function initNav() {
    dock.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { showView(b.dataset.view); });
    });
    document.getElementById("brand").addEventListener("click", function () { showView("home"); });

    document.querySelectorAll("[data-go]").forEach(function (el) {
      el.addEventListener("click", function () {
        var parts = el.getAttribute("data-go").split(":");
        showView(parts[0], parts[1] || null);
      });
    });

    window.addEventListener("hashchange", routeFromHash);
    window.addEventListener("scroll", runSpy, { passive: true });
    window.addEventListener("resize", runSpy);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initNav();
    routeFromHash();
  });
})();
