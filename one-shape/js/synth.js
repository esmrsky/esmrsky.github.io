/* ============================================================
   SYNTHESIS behaviour — the need-map crosswalk + the need drawer.
   The drawer is the cross-cutting view: one need, seen through
   every lens at once, built from the tagged model.
   ============================================================ */
(function () {
  "use strict";
  var INDEX = null, drawer, scrim, lastFocus;
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function idx() { if (!INDEX) INDEX = window.buildNeedIndex(); return INDEX; }
  var X = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* ---------- The crosswalk hub ---------- */
  function cell(t, lens) {
    var muted = /^—/.test(t);
    return '<span data-lens="' + lens + '"' + (muted ? ' class="dash"' : '') + '>' + esc(t) + "</span>";
  }
  function renderMap() {
    var c = document.getElementById("need-map");
    if (!c || !window.NEEDS) return;
    var head = '<div class="needmap-head"><span>Need</span><span>The Pattern</span><span>Love</span><span>Mechanics</span><span>The Way Back</span></div>';
    var rows = window.NEEDS.map(function (n) {
      return '<button class="need-row" data-need="' + n.id + '">' +
        '<span><span class="nm-name">' + esc(n.name) + '</span><span class="nm-q">' + esc(n.q) + "</span></span>" +
        cell(n.lens.pattern, "pattern") + cell(n.lens.love, "love") +
        cell(n.lens.mechanics, "mechanics") + cell(n.lens.wayback, "wayback") + "</button>";
    }).join("");
    var foot = '<div class="needmap-foot">All four lenses converge on <b>belonging, worth, safety, significance</b> — then each reaches into its own ground (Love → intimacy, Mechanics → provision &amp; renown, The Way Back → all the way to transcendence). Tap any need to see it across every lens.</div>';
    c.innerHTML = head + rows + foot;
    c.querySelectorAll(".need-row").forEach(function (b) {
      b.addEventListener("click", function () { openNeed(b.dataset.need); });
    });
  }

  /* ---------- The drawer ---------- */
  function sec(title, lensTag, inner) {
    return '<div class="nd-sec"><h3>' + title + (lensTag ? ' <span class="nd-lenstag">' + lensTag + "</span>" : "") + "</h3>" + inner + "</div>";
  }
  function jump(hash, label) { return '<button class="nd-jump" data-jump="' + hash + '">' + label + " →</button>"; }

  function buildDrawer(d) {
    var n = d.need, h = "";
    h += '<div class="nd-head"><div class="nd-tt">' +
      '<span class="nd-eyebrow">the need · seen across every lens</span>' +
      "<h2>" + esc(n.name) + "</h2>" +
      '<p class="nd-q">' + esc(n.q) + "</p></div>" +
      '<button class="nd-close" aria-label="Close">' + X + "</button></div>";
    h += '<div class="nd-body">';
    h += '<p class="nd-line"><span class="lab">the ache</span>' + esc(n.ache) + "</p>";
    h += '<p class="nd-line nd-promise">“' + esc(n.promise) + '”</p>';
    h += '<p class="nd-line nd-exit"><span class="lab">the way back</span>' + esc(n.exit) + "</p>";

    if (d.feelings.length) {
      var words = d.feelings.map(function (f) { return '<span class="nd-word">' + esc(f.feel) + "</span>"; }).join("");
      h += sec("When it surfaces as a feeling", "the way back", '<div class="nd-words">' + words + "</div>" + jump("#/wayback/wayback-feel", "Open the feelings router"));
    }
    if (d.loveActs.length || d.loveFeelings.length) {
      var inner = d.loveActs.map(function (a) {
        return '<div class="nd-mini"><span class="nm-name">' + esc(a.name) + '</span> <span class="nm-sub">— “' + esc(a.tell) + '”</span></div>';
      }).join("") + d.loveFeelings.map(function (f) {
        return '<div class="nd-mini"><span class="nm-name">' + esc(f.name) + '</span> <span class="nm-sub">— ' + esc(f.sub) + "</span></div>";
      }).join("");
      h += sec("As a counterfeit of love", "love", inner + jump("#/love/love-acts", "Open the love lens"));
    }
    if (d.counterfeits.length) {
      var items = d.counterfeits.map(function (c) {
        var tag = c.behavioral ? ' <span class="nm-sub">· also a mechanics view</span>' : "";
        return '<div class="nd-mini"><span class="nm-name">' + esc(c.name) + "</span>" + tag +
          '<br><span class="nm-sub">' + esc(c.counterfeitUse) + "</span></div>";
      }).join("");
      var anyB = d.counterfeits.some(function (c) { return c.behavioral; });
      h += sec("Where it shows up day to day", "everyday life", items +
        jump("#/wayback/wayback-counterfeits", "Open everyday counterfeits") +
        (anyB ? '<br>' + jump("#/mechanics/mech-counterfeits", "See the mechanics view") : ""));
    }
    if (d.axis) {
      h += sec("On the axis map", "loop mechanics",
        '<div class="nd-mini"><span class="nm-name">' + esc(d.axis.title) + '</span><br><span class="nm-sub">' + esc(d.axis.shame) + "</span></div>" +
        jump("#/mechanics/mech-axes", "Open the axis map"));
    }
    h += '<div class="nd-scripture">“' + esc(n.scripture.line) + "”<cite>" + esc(n.scripture.ref) + "</cite></div>";
    h += "</div>";
    return h;
  }

  function openNeed(id) {
    var d = idx()[id];
    if (!d) return;
    lastFocus = document.activeElement;
    drawer.innerHTML = buildDrawer(d);
    drawer.setAttribute("aria-hidden", "false");
    scrim.classList.add("open");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
    drawer.querySelector(".nd-close").addEventListener("click", closeNeed);
    drawer.querySelectorAll("[data-jump]").forEach(function (b) {
      b.addEventListener("click", function () { closeNeed(); location.hash = b.dataset.jump; });
    });
    drawer.scrollTop = 0;
    drawer.querySelector(".nd-close").focus();
  }
  function closeNeed() {
    scrim.classList.remove("open");
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  window.openNeed = openNeed;

  document.addEventListener("DOMContentLoaded", function () {
    drawer = document.getElementById("need-drawer");
    scrim = document.getElementById("need-scrim");
    renderMap();
    if (scrim) scrim.addEventListener("click", closeNeed);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNeed(); });
    // Delegated: any need-chip rendered into a lens opens the drawer.
    document.addEventListener("click", function (e) {
      var chip = e.target.closest && e.target.closest(".need-chip");
      if (chip && chip.dataset.need) openNeed(chip.dataset.need);
    });
  });
})();
