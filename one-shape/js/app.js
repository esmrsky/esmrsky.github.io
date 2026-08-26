/* ============================================================
   One Shape · Many Wells — app shell

   One document, one navigation. The rail (wide) and the
   contents sheet (narrow) are two renderings of a single index
   read out of the DOM, driven by a single scroll-spy.
   ============================================================ */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var body = document.body;

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
    applyTheme(saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      var next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem("osmw-theme", next);
      applyTheme(next);
    });
  }

  /* ---------- Reveal: open every <details> above a target ----------
     A link into a collapsed catalogue must open its way in, or the
     jump lands on a summary and the reader sees nothing happen. */
  function reveal(el) {
    var n = el;
    while (n && n !== document.body) {
      if (n.tagName === "DETAILS" && !n.open) n.open = true;
      n = n.parentElement;
    }
  }
  window.osmwReveal = reveal;

  /* ---------- Disclosure open / close ----------
     A native <details> snaps: the browser flips `open` and the content
     appears in one frame. We take the click, hold `open` true through
     the whole close, and animate the body's height with WAAPI against a
     freshly measured resting height — so a disclosure whose contents
     reflow still lands on the right number.

     Every disclosure gets this, not just the big panels: the feelings
     cards and the nested romance/parenting blocks are the ones a reader
     opens most, and they were the ones still snapping. */
  var DISCLOSURES = "details.panel, details.fcard, details.depth";
  var EASE = "cubic-bezier(.32,.72,0,1)";
  function reduced() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function bodyOf(d) {
    for (var n = d.firstElementChild; n; n = n.nextElementSibling) {
      if (n.tagName !== "SUMMARY") return n;
    }
    return null;
  }

  function initDisclosures(root) {
    (root || document).querySelectorAll(DISCLOSURES).forEach(function (d) {
      if (d.dataset.eased) return;
      var summary = d.querySelector(":scope > summary");
      var body = bodyOf(d);
      if (!summary || !body) return;
      d.dataset.eased = "1";
      var anim = null;

      function run(opening) {
        if (anim) anim.cancel();
        var start = opening ? 0 : body.getBoundingClientRect().height;
        body.style.height = "auto";
        var end = opening ? body.getBoundingClientRect().height : 0;
        body.style.height = start + "px";
        body.style.overflow = "hidden";
        // Distance-scaled, but always inside a range a reader reads as
        // "it moved" rather than "it is loading".
        var ms = Math.max(200, Math.min(440, 180 + Math.abs(end - start) * 0.2));
        anim = body.animate(
          { height: [start + "px", end + "px"] },
          { duration: ms, easing: EASE }
        );
        anim.onfinish = function () {
          anim = null;
          body.style.height = "";
          body.style.overflow = "";     // never clip at rest
          if (!opening) d.open = false;
          if (opening) bentoAll(body);  // its grids have a track list now
          runSpy();
        };
        anim.oncancel = function () {
          anim = null; body.style.height = ""; body.style.overflow = "";
        };
      }

      summary.addEventListener("click", function (e) {
        if (reduced()) return;          // let the browser snap it
        e.preventDefault();
        if (d.open) run(false);
        else { d.open = true; run(true); }
      });
    });
  }
  window.osmwEase = initDisclosures;

  /* ---------- Bento fill ----------
     CSS grid leaves the tail of a run stranded: five cards in two
     columns means one lonely half-width card with a hole beside it.
     There is no CSS for "share out what is left" — `auto-fit` only
     stretches when the items never filled a row at all, and masonry
     is not in a stable browser — so the leftover is measured and
     spanned. Read the resolved track list, take the remainder, and
     hand the trailing cards the spare columns as evenly as they go. */
  var BENTO = ".mini-grid, .grid, .phase-row, .beats, .spine ol, .lens-cards, .doors";

  function bentoFill(grid) {
    var kids = Array.prototype.slice.call(grid.children).filter(function (el) {
      return el.nodeType === 1;
    });
    kids.forEach(function (el) { el.style.gridColumn = ""; });
    if (!kids.length) return;

    var tpl = getComputedStyle(grid).gridTemplateColumns;
    // "none" means the grid is inside a closed <details> and has never
    // been laid out; there is nothing to measure until it opens.
    if (!tpl || tpl === "none") return;
    var cols = tpl.split(" ").filter(Boolean).length;
    if (cols < 2) return;

    var items = kids.filter(function (el) { return getComputedStyle(el).display !== "none"; });
    if (!items.length) return;

    // A run shorter than one row shares the whole row; otherwise only
    // the remainder after the last full row needs sharing out.
    var rem = items.length < cols ? items.length : items.length % cols;
    if (!rem) return;
    var tail = items.slice(items.length - rem);
    var base = Math.floor(cols / rem), extra = cols % rem;
    tail.forEach(function (el, i) {
      el.style.gridColumn = "span " + (base + (i < extra ? 1 : 0));
    });
  }

  function bentoAll(root) {
    (root || document).querySelectorAll(BENTO).forEach(bentoFill);
  }
  window.osmwBento = bentoAll;

  /* ---------- Scrolling to a target ---------- */
  function goTo(el, instant) {
    if (!el) return;
    reveal(el);
    var run = function () {
      var top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: instant ? "auto" : "smooth" });
    };
    requestAnimationFrame(run);
    // Correction passes: the page reflows as fonts and catalogues settle.
    if (document.readyState !== "complete") window.addEventListener("load", run, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
  }

  /* ---------- The index ---------- */
  var chapters = [];

  function collectIndex() {
    chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter")).map(function (ch) {
      return {
        el: ch,
        id: ch.id,
        key: ch.dataset.chapter,
        num: ch.dataset.chNum || "",
        title: ch.dataset.chTitle || "",
        sections: Array.prototype.slice.call(ch.querySelectorAll(".section[data-title]")).map(function (s) {
          return { el: s, id: s.id, title: s.dataset.title };
        })
      };
    });
  }

  function renderIndex(listEl) {
    listEl.innerHTML = chapters.map(function (c) {
      var secs = c.sections.map(function (s) {
        return '<li><a class="sec-link" href="#' + s.id + '" data-sec="' + s.id + '">' + s.title + "</a></li>";
      }).join("");
      return '<li data-ch="' + c.id + '">' +
        '<a class="ch-link" href="#' + c.id + '" data-ch-link="' + c.id + '">' +
          '<span class="ch-n">' + (c.num || "◆") + "</span>" +
          "<span>" + c.title + "</span>" +
        "</a>" +
        (secs ? '<ol class="sec-list">' + secs + "</ol>" : "") +
        "</li>";
    }).join("");
  }

  /* ---------- Scroll-spy ---------- */
  var railList = document.getElementById("rail-list");
  var sheetList = document.getElementById("sheet-list");
  var progress = document.getElementById("progress");
  var hereN = document.getElementById("here-n");
  var hereT = document.getElementById("here-t");
  var spyState = { ch: null, sec: null, ticking: false };

  function runSpy() {
    if (spyState.ticking) return;
    spyState.ticking = true;
    requestAnimationFrame(function () {
      spyState.ticking = false;
      // The chapter turns over when its mark reaches the upper quarter,
      // not the instant its top edge slips under the header — otherwise
      // a full screen of the next chapter still wears the last one's accent.
      var line = Math.min(160, window.innerHeight * 0.28);

      // Progress
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.pageYOffset / max) : 0) + ")";

      // Current chapter = last one whose top has crossed the line
      var cur = chapters[0], i;
      for (i = 0; i < chapters.length; i++) {
        if (chapters[i].el.getBoundingClientRect().top - line <= 1) cur = chapters[i];
        else break;
      }
      if (!cur) return;

      if (cur.id !== spyState.ch) {
        spyState.ch = cur.id;
        body.setAttribute("data-chapter", cur.key);
        if (hereN) hereN.textContent = cur.num || "";
        if (hereT) hereT.textContent = cur.title;
        [railList, sheetList].forEach(function (l) {
          if (!l) return;
          l.querySelectorAll("li[data-ch]").forEach(function (li) {
            li.classList.toggle("current", li.dataset.ch === cur.id);
          });
        });
        // A chapter change invalidates the section highlight
        spyState.sec = null;
      }

      // Current section within that chapter
      var secs = cur.sections, curSec = secs.length ? secs[0].id : null;
      for (i = 0; i < secs.length; i++) {
        if (secs[i].el.getBoundingClientRect().top - line <= 1) curSec = secs[i].id;
        else break;
      }
      if (curSec !== spyState.sec) {
        spyState.sec = curSec;
        [railList, sheetList].forEach(function (l) {
          if (!l) return;
          l.querySelectorAll(".sec-link").forEach(function (a) {
            a.classList.toggle("active", a.dataset.sec === curSec);
          });
        });
        var active = railList && railList.querySelector(".sec-link.active");
        if (active) {
          var r = active.getBoundingClientRect(), rail = document.getElementById("rail");
          if (rail && (r.top < 80 || r.bottom > window.innerHeight - 20)) {
            active.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
        }
      }
    });
  }

  /* ---------- The contents sheet ---------- */
  var sheet = document.getElementById("sheet");
  var sheetScrim = document.getElementById("sheet-scrim");
  var sheetBtn = document.getElementById("contents-btn");
  var lastFocus = null;

  function openSheet() {
    lastFocus = document.activeElement;
    sheet.classList.add("open");
    sheetScrim.classList.add("open");
    sheet.setAttribute("aria-hidden", "false");
    sheetBtn.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
    var first = sheet.querySelector("li.current .ch-link") || sheet.querySelector(".ch-link");
    if (first) first.focus();
  }
  function closeSheet() {
    sheet.classList.remove("open");
    sheetScrim.classList.remove("open");
    sheet.setAttribute("aria-hidden", "true");
    sheetBtn.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- Legacy hashes ----------
     The site used to be five views at #/view/section. Those links
     are in the wild (and inside the need drawer), so they still
     resolve — to the section that now carries the content. */
  var ALIAS = {
    "love-matrix": "love-discriminator",
    "mech-matrix": "mech-counterfeits",
    "mech-simulator": "mech-archetypes",
    "wayback-counterfeits": "mech-counterfeits",
    "wayback-guardrails": "pattern-guardrails",
    "pattern-almost": "home-loop",
    "home": "top", "pattern": "ch-pattern", "love": "ch-love",
    "mechanics": "ch-mech", "wayback": "ch-wayback"
  };

  function resolve(hash) {
    var raw = String(hash || "").replace(/^#\/?/, "");
    if (!raw) return null;
    var parts = raw.split("/");
    var want = parts.length > 1 ? parts[1] : parts[0];
    if (ALIAS[want]) want = ALIAS[want];
    return document.getElementById(want);
  }

  function routeFromHash(instant) {
    var el = resolve(location.hash);
    if (el) goTo(el, instant);
  }

  /* ---------- Wiring ---------- */
  function initNav() {
    collectIndex();
    if (railList) renderIndex(railList);
    if (sheetList) renderIndex(sheetList);

    // One handler for every in-page anchor, wherever it lives.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute("href");
      if (href === "#" || a.classList.contains("skip-link")) return;
      var el = resolve(href) || document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      if (sheet.classList.contains("open")) closeSheet();
      goTo(el, false);
      if (location.hash !== href) history.replaceState(null, "", href);
    });

    sheetBtn.addEventListener("click", function () {
      sheet.classList.contains("open") ? closeSheet() : openSheet();
    });
    document.getElementById("sheet-close").addEventListener("click", closeSheet);
    sheetScrim.addEventListener("click", closeSheet);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sheet.classList.contains("open")) closeSheet();
    });

    window.addEventListener("hashchange", function () { routeFromHash(false); });
    window.addEventListener("scroll", runSpy, { passive: true });
    var rt = null;
    window.addEventListener("resize", function () {
      runSpy();
      clearTimeout(rt);
      rt = setTimeout(bentoAll, 120);   // track count changes with width
    });
    // Opening a catalogue changes every offset below it — and gives its
    // grids a track list for the first time.
    document.addEventListener("toggle", function (e) {
      runSpy();
      if (e.target && e.target.open) bentoAll(e.target);
    }, true);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initNav();
    initDisclosures();
    bentoAll();
    runSpy();
    if (location.hash) routeFromHash(true);
  });
})();
