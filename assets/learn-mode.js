/* ==========================================================================
   Learn mode, shared across the hub. Piloted on /feels-like-learning/.
   A page opts in with one inline block of data:

     <script type="application/json" id="learn-data">{ … }</script>
     <script src="/assets/learn-mode.js"></script>   (after the page's markup,
                                                       before its own script)

   The script adds the graduation-cap switch to the page's bar, puts each
   checkpoint at the end of the section it names, and builds the "close it and
   explain it" block. Load it synchronously: the checkpoints have to be in the
   page before the page's own script measures sections.

   Data:
     page, title, url           what the AI grading prompt names
     toggle  { before, className, label }   where the switch goes, which of
             the page's own button classes it wears, and whether its word shows
     buttonClass                the page's own class for plain buttons
     note    { after }          the "learn mode is on/off" line
     checkpoints [{ id, in, q, a }]   `in` is a section; the checkpoint goes
             at the end of its .wrap. `after` (any selector) works instead.
     close   { after, wrapClass, keyIdeas: [], mixed: [{ id, q, a }] }
     apostrophe  "'" on a page set with straight apostrophes (default ’)

   The on/off choice is localStorage["esmrsky-learn"], site-wide, the same key
   the pilot uses. Each page reads it in <head> before first paint. Everything
   works without storage.
   ========================================================================== */
(function () {
  "use strict";
  var d = document, root = d.documentElement, KEY = "esmrsky-learn";
  var src = d.getElementById("learn-data");
  if (!src) return;
  var D;
  try { D = JSON.parse(src.textContent); } catch (e) { return; }

  var load = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(html) { var t = d.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function placeAfter(node, sel) {
    var ref = sel && $(sel);
    if (!ref) return false;
    ref.parentNode.insertBefore(node, ref.nextSibling);
    return true;
  }
  function placeIn(node, sel) {
    var sec = sel && $(sel);
    if (!sec) return false;
    var host = $(":scope > .wrap", sec) || sec;
    host.appendChild(node);
    return true;
  }

  var CAP = '<svg class="lm-cap" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5 12 4.5l10 5-10 5z"/><path d="M6 11.5v4.6c0 1.5 2.7 2.9 6 2.9s6-1.4 6-2.9v-4.6"/><path d="M22 9.5v5.5"/></svg>';
  var btnClass = D.buttonClass || "";
  var A = D.apostrophe || "\u2019";
  var total = (D.checkpoints || []).length;

  /* ---- checkpoints -------------------------------------------------------- */
  function checkpoint(c, label) {
    return el(
      '<aside class="lm-cp esv-skip" data-cp="' + esc(c.id) + '" aria-label="' + esc(label) + '">' +
        '<p class="lm-head">' + CAP + '<span>' + esc(label) + '</span></p>' +
        '<p class="lm-q" id="lm-q-' + esc(c.id) + '">' + esc(c.q) + '</p>' +
        '<textarea class="lm-a" rows="2" aria-labelledby="lm-q-' + esc(c.id) + '" placeholder="Your answer. Saying it in your head counts."></textarea>' +
        '<div class="lm-row"><button class="lm-btn ' + esc(btnClass) + '" type="button" data-lm-reveal>I' + A + 've answered. Show me.</button></div>' +
        '<div class="lm-ans" tabindex="-1" hidden><p class="lm-k">The page' + A + 's answer</p><p>' + esc(c.a) + '</p></div>' +
      '</aside>'
    );
  }
  (D.checkpoints || []).forEach(function (c, i) {
    var node = checkpoint(c, "Checkpoint " + (i + 1) + " of " + total);
    if (!placeIn(node, c["in"])) placeAfter(node, c.after);
  });

  /* ---- the note under the opening ---------------------------------------- */
  if (D.note) {
    placeAfter(el(
      '<p class="lm-note" role="note">' + CAP +
        '<span class="lm-on"><b>Learn mode is on.</b> ' + total + ' questions will ask before they tell, and the end has a place to explain the page from memory. Answer first, even in your head, then reveal. Turn it off with the cap at the top.</span>' +
        '<span class="lm-off"><b>Learn mode is off.</b> The page reads straight through. Tap the cap at the top to bring the questions back.</span>' +
      '</p>'
    ), D.note.after);
  }

  /* ---- close it and explain it ------------------------------------------- */
  var C = D.close;
  if (C) {
    var url = D.url || location.href.split("#")[0];
    var ideas = (C.keyIdeas || []).map(function (t) {
      return '<li><label><input type="checkbox"> <span>' + esc(t) + '</span></label></li>';
    }).join("");
    var box = el(
      '<section class="lm-close esv-skip" id="learn-close" aria-labelledby="lm-close-h">' +
        '<div class="' + esc(C.wrapClass || "") + ' lm-close-in">' +
          '<p class="lm-head">' + CAP + '<span>Learn mode</span></p>' +
          '<h2 id="lm-close-h">Now close it and explain it</h2>' +
          '<p class="lm-lede">Don' + A + 't scroll up. In three or four sentences, write what you' + A + 'd tell a friend about this page. Then compare it with the page' + A + 's version.</p>' +
          '<div class="lm-panel">' +
            '<label class="lm-k" for="lm-recall">From memory</label>' +
            '<textarea class="lm-recall" id="lm-recall" placeholder="The main idea is…"></textarea>' +
            '<div class="lm-row"><button class="lm-btn ' + esc(btnClass) + '" type="button" data-lm-compare>Compare with the page</button></div>' +
            '<div class="lm-compare" tabindex="-1" hidden>' +
              '<p><b>Tick the ones you had</b>, even in other words.</p>' +
              '<ul class="lm-ideas">' + ideas + '</ul>' +
              '<p class="lm-score" aria-live="polite"></p>' +
              '<p class="lm-k">Or have an AI grade it</p>' +
              '<pre class="lm-prompt" id="lm-prompt"></pre>' +
              '<div class="lm-row"><button class="lm-btn ' + esc(btnClass) + '" type="button" data-lm-copy>Copy the prompt</button><span class="lm-copied" aria-live="polite"></span></div>' +
            '</div>' +
          '</div>' +
          ((C.mixed || []).length ? '<h3 class="lm-sub">Two that cross the sections</h3><p class="lm-lede">These join ideas from different parts of the page. They are harder on purpose.</p>' : '') +
        '</div>' +
      '</section>'
    );
    var inner = $(".lm-close-in", box);
    (C.mixed || []).forEach(function (c, i) {
      inner.appendChild(checkpoint(c, "Across the page " + (i + 1) + " of " + C.mixed.length));
    });
    if (placeAfter(box, C.after)) {
      var recall = $("#lm-recall", box), prompt = $("#lm-prompt", box);
      var promptText = function () {
        var mine = recall.value.trim();
        return "Here is my summary of the page “" + (D.title || d.title) + "” at " + url + ", written from memory. " +
          "Grade it against the page only. List the main ideas I captured, the ones I missed, and anything I got wrong. " +
          "Then ask me one question about the idea I missed.\n\nMy summary:\n" + (mine || "[paste it here]");
      };
      var syncPrompt = function () { prompt.textContent = promptText(); };
      syncPrompt();
      recall.addEventListener("input", syncPrompt);

      $("[data-lm-compare]", box).addEventListener("click", function () {
        var cmp = $(".lm-compare", box);
        cmp.hidden = false;
        this.hidden = true;
        cmp.focus({ preventScroll: true });
      });
      var boxes = $$(".lm-ideas input", box), score = $(".lm-score", box);
      boxes.forEach(function (b) {
        b.addEventListener("change", function () {
          var n = boxes.filter(function (x) { return x.checked; }).length;
          score.textContent = n ? "You had " + n + " of " + boxes.length + "." + (n === boxes.length ? " All of it." : " The ones you missed are the ones to come back to.") : "";
        });
      });
      var copied = $(".lm-copied", box);
      $("[data-lm-copy]", box).addEventListener("click", function () {
        var text = promptText();
        var done = function () { copied.textContent = "Copied"; setTimeout(function () { copied.textContent = ""; }, 2200); };
        var fallback = function () {
          var ta = d.createElement("textarea");
          ta.value = text; ta.setAttribute("aria-hidden", "true");
          ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
          d.body.appendChild(ta); ta.select();
          try { d.execCommand("copy"); } catch (e) {}
          d.body.removeChild(ta); done();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
        else fallback();
      });
    }
  }

  /* ---- reveal ------------------------------------------------------------- */
  d.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-lm-reveal]");
    if (!b) return;
    var cp = b.closest(".lm-cp"), ans = $(".lm-ans", cp);
    ans.hidden = false;
    b.parentNode.hidden = true;
    cp.classList.add("is-open");
    ans.focus({ preventScroll: true });
  });

  /* ---- the switch --------------------------------------------------------- */
  var T = D.toggle || {};
  var tog = el(
    '<button class="lm-toggle ' + esc(T.className || "") + '" type="button" aria-pressed="true" aria-label="Learn mode" title="Learn mode: questions that ask before they tell">' +
      CAP + (T.label ? '<span class="lm-lab">Learn</span>' : '') +
    '</button>'
  );
  var before = T.before && $(T.before);
  if (before) before.parentNode.insertBefore(tog, before);
  else { tog.classList.add("lm-float"); d.body.appendChild(tog); }

  function set(on) {
    if (on) root.removeAttribute("data-learn"); else root.setAttribute("data-learn", "off");
    tog.setAttribute("aria-pressed", on ? "true" : "false");
  }
  set(load() !== "off");
  tog.addEventListener("click", function () {
    var on = root.getAttribute("data-learn") === "off";
    set(on);
    save(on ? "on" : "off");
  });
})();
