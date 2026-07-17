/* ============================================================
   CONTENT renderer — builds the ported catalogues into the
   lens sections from the data modules, each tagged with a
   need-chip that opens the cross-lens drawer (see synth.js).
   ============================================================ */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg>';
  var CORE_NEED = { Provision: "provision", Safety: "safety", Belonging: "belonging", Worth: "worth", Agency: "safety", "Comfort / Rest": "comfort", Meaning: "transcendence", Transcendence: "transcendence" };

  function chip(needId) {
    if (!needId || !window.needById) return "";
    var n = window.needById(needId);
    if (!n) return "";
    return '<button class="need-chip" data-need="' + needId + '" aria-label="See ' + n.name + ' across every lens">' + n.name + "</button>";
  }
  var NO = function () { return window.NEED_OF || {}; };

  /* ---------- WAY BACK ---------- */
  function renderCore() {
    var c = $("need-grid"); if (!c || !window.WAYBACK_DATA) return;
    c.innerHTML = WAYBACK_DATA.core.map(function (n) {
      return '<div class="ecard"><div class="ecard-head"><h3>' + n.name + '</h3><span class="emeta">' + n.q + "</span></div>" +
        '<p class="erow"><span class="elabel leak">counterfeit</span>' + n.bad + "</p>" +
        '<p class="erow real"><span class="elabel well">real meal</span>' + n.good + "</p>" + chip(CORE_NEED[n.name]) + "</div>";
    }).join("");
  }

  function renderFeel() {
    var c = $("feel-grid"); if (!c || !window.WAYBACK_DATA) return;
    c.innerHTML = WAYBACK_DATA.feel.map(function (f) {
      return '<details class="fcard"><summary><span class="ftitle">' + f.feel + "</span>" +
        '<span class="fneed">' + f.need + "</span>" + CHEV + "</summary>" +
        '<div class="fbody">' +
        '<p class="erow"><span class="elabel">signal</span>' + f.signal + "</p>" +
        '<p class="erow"><span class="elabel leak">counterfeit</span>' + f.old + "</p>" +
        '<p class="erow real"><span class="elabel well">real meal</span>' + f.real + "</p>" +
        '<p class="erow real"><span class="elabel">first move</span>' + f.move + "</p>" +
        chip(NO().feel ? NO().feel[f.feel] : null) + "</div></details>";
    }).join("");
  }

  function renderEveryday() {
    var c = $("everyday-grid"); if (!c || !window.getCounterfeits) return;
    c.innerHTML = window.getCounterfeits().map(function (e) {
      return '<div class="ecard"><div class="ecard-head"><h3>' + e.name + '</h3><span class="emeta">' + e.type +
        (e.behavioral ? " · also a mechanics view" : "") + "</span></div>" +
        '<p class="erow"><span class="elabel leak">counterfeit use</span>' + e.counterfeitUse + "</p>" +
        '<p class="erow"><span class="elabel">tell</span>' + e.tell + "</p>" +
        '<p class="erow real"><span class="elabel well">real meal</span>' + e.realMeal + "</p>" +
        chip(e.need) + "</div>";
    }).join("");
  }

  function renderDeepTable() {
    var c = $("deep-table"); if (!c || !window.WAYBACK_DATA) return;
    var head = ["Real need", "Counterfeit", "What it gives", "What it can't give", "Why it hooks", "Real meal", "First move"];
    var rows = WAYBACK_DATA.needs.map(function (n) {
      return "<tr><td>" + n.need + "</td><td class='c-leak'>" + n.counterfeit + "</td><td>" + n.gives +
        "</td><td>" + n.cannot + "</td><td>" + n.hook + "</td><td class='c-well'>" + n.real + "</td><td>" + n.move + "</td></tr>";
    }).join("");
    c.innerHTML = "<table class='reftable'><thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows + "</tbody></table>";
  }

  /* ---------- LOVE ---------- */
  function renderFamily1() {
    var c = $("family-1"); if (!c || !window.LOVE_FEELINGS) return;
    c.innerHTML = LOVE_FEELINGS.map(function (f, i) {
      return '<div class="ecard"><div class="ecard-head"><h3>' + f.name + '</h3><span class="emeta">' + f.driver + "</span></div>" +
        '<div class="sub">' + f.sub + "</div>" +
        '<p class="erow"><span class="elabel">sensation</span>' + f.sensation + "</p>" +
        '<p class="erow real">' + f.reality + "</p>" +
        '<p class="erow quote">“' + f.example + "”</p>" +
        '<span class="lit">' + f.lit + "</span>" + chip(NO().loveFeel ? NO().loveFeel[i] : null) + "</div>";
    }).join("");
  }

  function renderFamily2() {
    var c = $("family-2"); if (!c || !window.LOVE_ACTS) return;
    var keys = ["Wound", "Offer", "Idol", "Altar", "Structure"];
    c.innerHTML = LOVE_ACTS.map(function (d) {
      var beats = d.loop.map(function (v, i) {
        return '<div class="beat' + (i === 2 ? " idol-beat" : "") + '"><span class="bk">' + keys[i] + '</span><span class="bv">' + v + "</span></div>";
      }).join("");
      return '<div class="act-card"><span class="act-num">' + d.num + "</span>" +
        "<h3>" + d.name + '</h3><span class="mech">' + d.mech + "</span>" +
        '<p class="erow" style="margin-top:.5rem">' + d.need + "</p>" +
        '<p class="tell">“' + d.tell + "”</p>" +
        '<div class="beats">' + beats + "</div>" +
        '<p class="idol"><span class="elabel leak">the idol</span> ' + d.idol + "</p>" +
        '<details class="depth" style="margin:.6rem 0 0"><summary><span class="tag">in romance / parenting</span>' + CHEV + "</summary>" +
        '<div class="depth-body"><p class="erow"><span class="elabel">romantic</span>' + d.romantic + "</p>" +
        '<p class="erow"><span class="elabel">parenting</span>' + d.parenting + "</p>" +
        '<p class="erow"><span class="elabel">the echo</span>' + d.echo + "</p></div></details>" +
        '<p class="turn"><span class="elabel well">the true turn</span> ' + d.turn + "</p>" +
        chip(NO().loveAct ? NO().loveAct[d.num] : null) + "</div>";
    }).join("");
  }

  function renderAnatomy() {
    var c = $("anatomy-steps"); if (!c || !window.LOVE_STEPS) return;
    c.innerHTML = LOVE_STEPS.map(function (s, i) {
      var t = s.title.replace(/^\d+\.\s*/, "");
      return '<div class="phase"><span class="pn">' + (i + 1) + "</span><h4>" + t + "</h4><p>" + s.desc + "</p></div>";
    }).join("");
  }

  /* ---------- MECHANICS ---------- */
  function renderAxes() {
    var c = $("axes-grid"); if (!c || !window.AXES_DATA) return;
    c.innerHTML = Object.keys(AXES_DATA).map(function (k) {
      var a = AXES_DATA[k];
      return '<div class="ecard" id="axis-card-' + k + '" data-axis="' + k + '"><div class="ecard-head"><h3>' + a.title + "</h3></div>" +
        '<div class="sub">' + a.hunger + "</div>" +
        '<p class="erow"><span class="elabel">cue</span>' + a.cue + "</p>" +
        '<p class="erow"><span class="elabel leak">counterfeit</span>' + a.counterfeit + "</p>" +
        '<p class="erow"><span class="elabel">why it leaks</span>' + a.leak + "</p>" +
        '<p class="erow quote">' + a.shame + "</p>" +
        '<p class="erow real"><span class="elabel well">the exit</span>' + a.exit + "</p>" +
        chip(NO().axis ? NO().axis[k] : null) + "</div>";
    }).join("");
  }

  function behavioral() { return window.getCounterfeits ? window.getCounterfeits().filter(function (x) { return x.behavioral; }) : []; }

  function renderTraps() {
    var c = $("traps-grid"); if (!c) return;
    c.innerHTML = behavioral().map(function (t) {
      var b = t.behavioral;
      return '<div class="ecard"><div class="ecard-head"><h3>' + t.name + '</h3><span class="emeta">' + b.axis + "</span></div>" +
        '<p class="erow"><span class="elabel">cue</span>' + b.cue + "</p>" +
        '<p class="erow leak"><span class="elabel leak">routine</span>' + b.routine + "</p>" +
        '<p class="erow"><span class="elabel">payoff</span>' + b.reward + "</p>" +
        '<p class="erow"><span class="elabel">the works trap</span>' + b.worksTrap + "</p>" +
        '<p class="erow real"><span class="elabel well">grace exit</span>' + b.graceExit + "</p>" +
        chip(t.need) + "</div>";
    }).join("");
  }

  function renderTechMatrix() {
    var c = $("tech-matrix"); if (!c) return;
    var head = ["App / metric", "Axis", "The cue", "Counterfeit routine", "The works trap", "Grace exit"];
    var rows = behavioral().map(function (t) {
      var b = t.behavioral;
      return "<tr><td>" + t.name + "</td><td>" + b.axis + "</td><td>" + b.cue + "</td><td class='c-leak'>" + b.routine +
        "</td><td>" + b.worksTrap + "</td><td class='c-well'>" + b.graceExit + "</td></tr>";
    }).join("");
    c.innerHTML = "<table class='reftable'><thead><tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
      "</tr></thead><tbody>" + rows + "</tbody></table>";
  }

  function renderArchetypes() {
    var c = $("archetypes-grid"); if (!c || !window.ARCHETYPES_DATA) return;
    c.innerHTML = Object.keys(ARCHETYPES_DATA).map(function (k) {
      var a = ARCHETYPES_DATA[k];
      return '<div class="ecard"><div class="ecard-head"><h3>' + a.name + "</h3></div>" +
        '<div class="sub">' + a.calling + "</div>" +
        '<p class="erow"><span class="elabel leak">point of attack</span>' + a.inverse + "</p>" +
        '<p class="erow"><span class="elabel">the failure</span>' + a.failure + "</p>" +
        '<p class="erow"><span class="elabel">generational echo</span>' + a.legacy + "</p></div>";
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCore(); renderFeel(); renderEveryday(); renderDeepTable();
    renderFamily1(); renderFamily2(); renderAnatomy();
    renderAxes(); renderTraps(); renderTechMatrix(); renderArchetypes();
  });
})();
