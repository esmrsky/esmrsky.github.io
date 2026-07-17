/* ============================================================
   INTERACTIVES — Phase 3 tools. Built on the same model the
   rest of the site uses, so a generated plan carries the
   canonical need and its grace exit.
   ============================================================ */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }

  /* ---- "When I feel…" re-source plan generator ---- */
  function initFeelGenerator() {
    var sel = $("gen-feel");
    if (!sel || !window.WAYBACK_DATA) return;
    sel.innerHTML = WAYBACK_DATA.feel.map(function (f, i) {
      return '<option value="' + i + '">' + f.feel + "</option>";
    }).join("");

    var out = $("gen-output"), copy = $("gen-copy");

    function build() {
      var f = WAYBACK_DATA.feel[(+sel.value) || 0];
      var run = ($("gen-run").value || "").trim();
      var before = ($("gen-before").value || "").trim();
      var needId = (window.NEED_OF && NEED_OF.feel) ? NEED_OF.feel[f.feel] : null;
      var need = window.needById ? window.needById(needId) : null;

      var L = [];
      L.push("RE-SOURCE PLAN");
      L.push("");
      L.push("I feel: " + f.feel);
      L.push("The felt signal: " + f.signal);
      L.push("");
      L.push("The real need under it: " + f.need + (need ? '  →  ' + need.name + ' (“' + need.q + '”)' : ""));
      L.push("The counterfeit I reach for: " + (run || f.old));
      if (before) L.push("What happened right before: " + before);
      L.push("");
      L.push("Why it loops: it gives a little, never enough — then the need returns sharper, with shame.");
      L.push("");
      L.push("The real meal: " + f.real);
      if (need) L.push("The way back (" + need.name + "): " + need.exit);
      L.push("");
      L.push("First faithful move: " + f.move);

      out.textContent = L.join("\n");
      out.hidden = false;
      copy.hidden = false;
    }

    $("gen-go").addEventListener("click", build);
    copy.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(out.textContent).then(function () {
        copy.textContent = "Copied ✓";
        setTimeout(function () { copy.textContent = "Copy plan"; }, 1600);
      });
    });
  }

  /* ---- Love / cathexis discriminator ---- */
  // Each split has a "love" lean and a "cathexis" lean. The verdict is
  // driven by the three; the optional idol picker pulls the canonical
  // need + grace exit from the model so a counterfeit verdict knows the
  // way back.
  var SPLIT_META = [
    { thread: "you're waiting on a feeling instead of choosing an action" },
    { thread: "it's about relieving your own lack, not their good" },
    { thread: "their separateness reads as a threat — the selves are fused" }
  ];

  function initDiscriminator() {
    var root = $("love-disc");
    if (!root) return;
    var leans = [null, null, null];

    // Optional idol picker, built from the love acts and tagged to a need.
    var idolSel = $("disc-idol");
    if (idolSel && window.LOVE_ACTS) {
      var opts = ['<option value="">— skip / not sure</option>'];
      LOVE_ACTS.forEach(function (a) {
        var m = /<b>(.*?)<\/b>/.exec(a.idol);
        var word = m ? m[1] : a.mech;
        opts.push('<option value="' + a.num + '">' + a.name + " — " + word + "</option>");
      });
      idolSel.innerHTML = opts.join("");
      idolSel.addEventListener("change", render);
    }

    root.querySelectorAll(".disc-split").forEach(function (split) {
      var i = +split.getAttribute("data-split");
      split.querySelectorAll(".disc-opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          leans[i] = btn.getAttribute("data-lean");
          split.querySelectorAll(".disc-opt").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          render();
        });
      });
    });

    function render() {
      var out = $("disc-verdict");
      if (leans.indexOf(null) !== -1) { out.hidden = true; out.innerHTML = ""; return; }
      var cath = leans.filter(function (l) { return l === "cathexis"; }).length;

      var tone, label;
      if (cath === 0) { tone = "love"; label = "This reads like love."; }
      else if (cath === 3) { tone = "cathexis"; label = "This reads like cathexis, not love."; }
      else { tone = "mix"; label = cath === 1 ? "Mostly love — with one counterfeit thread." : "Leaning cathexis."; }

      var explain;
      if (tone === "love") {
        explain = "On all three splits this moves like love: a verb, turned toward the other, between two whole selves. Keep protecting their freedom — that's the tell that it's the real thing.";
      } else if (tone === "cathexis") {
        explain = "On all three splits this moves like cathexis: a feeling you're swept by, about your own deficit, that can't tolerate the other's separateness. The fix isn't loving harder — it's getting filled at the source first, so the other is released from carrying what only God was meant to.";
      } else {
        explain = "True love is a verb, turned toward the other, between two whole selves. Watch the threads pulling toward cathexis:";
      }

      var h = '<div class="disc-result disc-result--' + tone + '">' +
        '<span class="disc-tag">the read</span><h3>' + label + "</h3>" +
        '<p class="disc-explain">' + explain + "</p>";

      if (tone === "mix") {
        var threads = leans.map(function (l, i) {
          return l === "cathexis" ? "<li>" + SPLIT_META[i].thread + "</li>" : "";
        }).join("");
        h += '<ul class="disc-threads">' + threads + "</ul>";
      }

      // Optional model tie: the idol → its canonical need + grace exit.
      var num = idolSel ? idolSel.value : "";
      if (num) {
        var act = LOVE_ACTS.filter(function (a) { return a.num === num; })[0];
        var m = act ? /<b>(.*?)<\/b>/.exec(act.idol) : null;
        var word = m ? m[1] : "";
        var needId = (window.NEED_OF && NEED_OF.loveAct) ? NEED_OF.loveAct[num] : null;
        var need = window.needById ? window.needById(needId) : null;
        if (need) {
          h += '<div class="disc-need">' +
            '<p class="erow"><span class="elabel leak">the weight on them</span>' + word + "</p>" +
            '<p class="erow"><span class="elabel">the real need under it</span>' + need.name + " — “" + need.q + "”</p>" +
            '<p class="erow real"><span class="elabel well">the way back</span>' + need.exit + "</p>" +
            '<button class="need-chip" data-need="' + need.id + '" aria-label="See ' + need.name + ' across every lens">' + need.name + "</button>" +
            "</div>";
        }
      }

      h += "</div>";
      out.innerHTML = h;
      out.hidden = false;
    }
  }

  /* ---- Interactive existential axis map ---- */
  // The SVG plane is built from AXES_DATA coords so the nodes stay in
  // sync with the data; clicking a node jumps to that axis's card below.
  function initAxisMap() {
    var wrap = $("axis-plane");
    if (!wrap || !window.AXES_DATA) return;
    var NODE_LABEL = {
      rejection_acceptance: "Acceptance", scarcity_abundance: "Abundance",
      control_surrender: "Control", performance_standing: "Performance",
      obscurity_renown: "Renown"
    };
    var keys = Object.keys(AXES_DATA);
    var spokes = keys.map(function (k) {
      var c = AXES_DATA[k].coords;
      return '<line class="axis-spoke" x1="50" y1="50" x2="' + c.x + '" y2="' + c.y + '"/>';
    }).join("");
    var nodes = keys.map(function (k) {
      var a = AXES_DATA[k], c = a.coords, lbl = NODE_LABEL[k] || a.title;
      return '<circle class="axis-node" data-axis="' + k + '" cx="' + c.x + '" cy="' + c.y + '" r="4.5" tabindex="0" role="button" aria-label="' + a.title + '"><title>' + a.title + "</title></circle>" +
        '<text class="axis-node-text" x="' + c.x + '" y="' + (c.y + 6.6) + '" text-anchor="middle">' + lbl + "</text>";
    }).join("");
    wrap.innerHTML =
      '<svg class="axis-svg" viewBox="0 0 100 100" role="img" aria-label="Existential axis map: five striving poles on a performance–obscurity and provision–scarcity plane">' +
        '<line class="axis-grid" x1="10" y1="50" x2="90" y2="50"/>' +
        '<line class="axis-grid" x1="50" y1="10" x2="50" y2="90"/>' +
        '<rect class="axis-frame" x="5" y="5" width="90" height="90"/>' +
        '<text class="axis-plane-label" x="50" y="8" text-anchor="middle">Provision / Abundance (Y+)</text>' +
        '<text class="axis-plane-label" x="50" y="96" text-anchor="middle">Deprivation / Scarcity (Y−)</text>' +
        '<text class="axis-plane-label" x="92" y="52" text-anchor="end">Performance (X+)</text>' +
        '<text class="axis-plane-label" x="8" y="52" text-anchor="start">Obscurity (X−)</text>' +
        spokes + nodes +
      "</svg>";

    function highlight(key) {
      wrap.querySelectorAll(".axis-node").forEach(function (n) {
        n.classList.toggle("active", n.dataset.axis === key);
      });
      document.querySelectorAll("#axes-grid .ecard[data-axis]").forEach(function (card) {
        var on = card.dataset.axis === key;
        card.classList.toggle("axis-card-hl", on);
        if (on) card.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    wrap.querySelectorAll(".axis-node").forEach(function (node) {
      node.addEventListener("click", function () { highlight(node.dataset.axis); });
      node.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); highlight(node.dataset.axis); }
      });
    });
  }

  /* ---- Searchable scripture & psychology glossary ---- */
  function gEsc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function initGlossary() {
    var grid = $("glossary-grid"), search = $("glossary-search"), tagWrap = $("glossary-tags");
    if (!grid || !search || !window.GLOSSARY_DATA) return;
    var activeTag = "all";

    // Axis terms map cleanly onto a canonical need; tag those cards with
    // a need-chip so the glossary links back into the cross-lens drawer.
    function needForId(id) {
      if (!window.NEED_OF || !NEED_OF.axis || id.indexOf("axis_") !== 0) return null;
      return NEED_OF.axis[id.slice(5)] || null;
    }
    function chip(needId) {
      if (!needId || !window.needById) return "";
      var n = window.needById(needId); if (!n) return "";
      return '<button class="need-chip" data-need="' + needId + '" aria-label="See ' + n.name + ' across every lens">' + n.name + "</button>";
    }

    function render() {
      var q = (search.value || "").toLowerCase().trim();
      var cards = GLOSSARY_DATA.filter(function (it) {
        if (activeTag !== "all" && it.tags.indexOf(activeTag) === -1) return false;
        if (!q) return true;
        var hay = [it.term].concat(it.synonyms, [it.definition, it.theology, it.psychology], it.verses || [], it.topics || []).join(" ").toLowerCase();
        return hay.indexOf(q) !== -1;
      }).map(function (it) {
        var verses = (it.verses && it.verses.length) ? '<p class="erow gloss-verses"><span class="elabel well">verses</span>' + gEsc(it.verses.join(", ")) + "</p>" : "";
        var topics = (it.topics && it.topics.length) ? '<p class="gloss-topics">' + gEsc(it.topics.join(" · ")) + "</p>" : "";
        var pills = it.tags.map(function (t) { return '<span class="gloss-pill">' + gEsc(t) + "</span>"; }).join("");
        return '<div class="ecard gloss-card">' +
          '<div class="ecard-head"><h3>' + gEsc(it.term) + "</h3>" + chip(needForId(it.id)) + "</div>" +
          '<p class="erow"><span class="elabel">synonyms</span>' + gEsc(it.synonyms.join(", ")) + "</p>" +
          '<p class="erow"><span class="elabel">definition</span>' + gEsc(it.definition) + "</p>" +
          '<p class="erow"><span class="elabel">theological</span>' + gEsc(it.theology) + "</p>" +
          '<p class="erow"><span class="elabel">psychological</span>' + gEsc(it.psychology) + "</p>" +
          verses + topics +
          '<div class="gloss-tagrow">' + pills + "</div></div>";
      }).join("");
      grid.innerHTML = cards || '<p class="gloss-empty">No matches for “' + gEsc(q) + "”.</p>";
    }

    search.addEventListener("input", render);
    tagWrap.querySelectorAll(".gloss-tag").forEach(function (b) {
      b.addEventListener("click", function () {
        tagWrap.querySelectorAll(".gloss-tag").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        activeTag = b.dataset.tag;
        render();
      });
    });
    render();
  }

  /* ---- Re-source workbook / personal architect ---- */
  // Presets adapted from Combo Stern's ARCHITECT_PRESETS, each tagged to a
  // canonical need so the grace anchor is pulled from the model (need.exit).
  var ARCHITECT_PRESETS = {
    peter: {
      need: "belonging",
      surface: "Denying what I believe to protect my reputation the moment I'm exposed.",
      counterfeit: "Proving courage to strangers to safeguard my heroic reputation.",
      shame: "You failed the Savior. You're a coward and a fraud.",
      repair: "Turn back and feed the sheep — let restoration, not resolve, carry the next step."
    },
    solomon: {
      need: "transcendence",
      surface: "Starting yet another project to outrun the emptiness.",
      counterfeit: "More builds, gardens, and gold to patch the existential deficit.",
      shame: "All is vanity and striving after wind. I'm still empty.",
      repair: "Receive one ordinary gift today — a meal, a walk — without producing anything."
    },
    martha: {
      need: "worth",
      surface: "Over-managing every domestic detail and snapping at the people I'm serving.",
      counterfeit: "Performing flawless service to prove I'm indispensable.",
      shame: "You're troubled about many things; you failed to sit at his feet.",
      repair: "Put down one task and sit to receive before serving again."
    }
  };
  var RISK_WORDS = ["must", "always", "never", "fail", "lazy", "perfect", "worthless", "need to", "try harder", "discipline"];
  var WB_FIELDS = ["surface", "counterfeit", "shame", "grace", "repair"];

  function initWorkbook() {
    var root = $("wb");
    if (!root || !window.NEEDS) return;
    var needSel = $("wb-need"), needQ = $("wb-need-q"), bp = $("wb-blueprint");
    var lastSuggested = "";

    needSel.innerHTML = '<option value="">— choose a need —</option>' +
      window.NEEDS.map(function (n) { return '<option value="' + n.id + '">' + n.name + "</option>"; }).join("");

    function wbChip(needId) {
      if (!needId || !window.needById) return "";
      var n = window.needById(needId); if (!n) return "";
      return '<button class="need-chip" data-need="' + needId + '" aria-label="See ' + n.name + ' across every lens">' + n.name + "</button>";
    }
    function val(id) { var el = $("wb-" + id); return el ? el.value.trim() : ""; }

    // The same linguistic check as the source: striving/closed-system words
    // signal a works paradigm; in the grace anchor they get a sharper flag.
    function checkRisk(field) {
      var el = $("wb-" + field), badge = $("wb-risk-" + field);
      if (!el || !badge) return;
      var v = (el.value || "").toLowerCase();
      var found = RISK_WORDS.filter(function (w) { return v.indexOf(w) !== -1; });
      if (!found.length) { badge.hidden = true; return; }
      badge.hidden = false;
      if (field === "grace") {
        badge.textContent = "Striving language in the grace anchor — grace is received, not achieved.";
        badge.className = "wb-risk grace-alert";
      } else {
        badge.textContent = "Striving indicators: " + found.map(function (w) { return "“" + w + "”"; }).join(", ");
        badge.className = "wb-risk";
      }
    }

    function render() {
      var need = needSel.value ? window.needById(needSel.value) : null;
      needQ.textContent = need ? "“" + need.q + "”" : "";
      var rows = [
        ["surface", "the surface behaviour", val("surface"), "elabel"],
        ["need", "the real need", need ? need.name + " — “" + need.q + "”" : "", "elabel"],
        ["counterfeit", "the counterfeit source", val("counterfeit"), "elabel leak"],
        ["shame", "the shame script", val("shame"), "elabel"],
        ["grace", "the real meal / way back", val("grace"), "elabel well"],
        ["repair", "the repair step", val("repair"), "elabel"]
      ];
      var html = '<div class="wb-bp-head"><h4>The re-source plan</h4>' + (need ? wbChip(need.id) : "") + "</div>";
      html += rows.map(function (r) {
        var filled = !!r[2];
        var cls = "erow" + (r[0] === "grace" || r[0] === "need" ? " real" : "") + (filled ? "" : " empty");
        return '<p class="' + cls + '"><span class="' + r[3] + '">' + r[1] + "</span>" + (filled ? gEsc(r[2]) : "—") + "</p>";
      }).join("");
      bp.innerHTML = html;
    }

    function loadPreset(key) {
      var p = ARCHITECT_PRESETS[key];
      if (!p) return;
      $("wb-surface").value = p.surface;
      $("wb-counterfeit").value = p.counterfeit;
      $("wb-shame").value = p.shame;
      $("wb-repair").value = p.repair;
      needSel.value = p.need;
      var need = window.needById(p.need);
      $("wb-grace").value = need ? need.exit : "";
      lastSuggested = need ? need.exit : "";
      WB_FIELDS.forEach(checkRisk);
      render();
    }

    needSel.addEventListener("change", function () {
      var need = needSel.value ? window.needById(needSel.value) : null;
      if (need) {
        var g = $("wb-grace");
        // Suggest the model's grace exit, but never clobber the user's own words.
        if (!g.value.trim() || g.value.trim() === lastSuggested) {
          g.value = need.exit; lastSuggested = need.exit; checkRisk("grace");
        }
      }
      render();
    });
    WB_FIELDS.forEach(function (f) {
      var el = $("wb-" + f);
      if (el) el.addEventListener("input", function () { checkRisk(f); render(); });
    });
    root.querySelectorAll(".wb-preset").forEach(function (b) {
      b.addEventListener("click", function () { loadPreset(b.dataset.preset); });
    });

    $("wb-copy").addEventListener("click", function () {
      var need = needSel.value ? window.needById(needSel.value) : null;
      var L = ["THE RE-SOURCE PLAN", ""];
      L.push("1 · Surface behaviour: " + (val("surface") || "—"));
      L.push("2 · The real need: " + (need ? need.name + " — “" + need.q + "”" : "—"));
      L.push("3 · Counterfeit source: " + (val("counterfeit") || "—"));
      L.push("4 · The shame script: " + (val("shame") || "—"));
      L.push("5 · The real meal / way back: " + (val("grace") || "—"));
      L.push("6 · The repair step: " + (val("repair") || "—"));
      L.push("", "Kept from One Shape · Many Wells.");
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(L.join("\n")).then(function () {
        var btn = $("wb-copy"); btn.textContent = "Copied ✓";
        setTimeout(function () { btn.textContent = "Copy plan"; }, 1600);
      });
    });
    $("wb-reset").addEventListener("click", function () {
      WB_FIELDS.forEach(function (f) { $("wb-" + f).value = ""; var b = $("wb-risk-" + f); if (b) b.hidden = true; });
      needSel.value = ""; lastSuggested = "";
      render();
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initFeelGenerator();
    initDiscriminator();
    initAxisMap();
    initGlossary();
    initWorkbook();
  });
})();
