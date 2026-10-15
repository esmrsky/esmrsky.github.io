/* Eased <details>, shared across the estate.
   A <details> snaps open and shut by default. This intercepts the summary
   click and eases the element's own height from where it is to where it is
   going, so a second click mid-flight reverses from that point instead of
   jumping. It is draw-near's handler made general: no wrapper element, no
   markup changes, and it also works on <details> a page builds after load.

     <script src="/assets/ease-details.js" defer></script>
     <script src="/assets/ease-details.js" data-select="details.r-full" defer></script>

   data-select limits it to some <details>, for pages that already ease
   others their own way. data-ease-off on a single <details> opts it out.
   While one is closing it carries .is-closing, so a page can turn its
   chevron back at the start of the close: details.x.is-closing .chev{...}.
   Reduced motion: the native snap, untouched. */
(function () {
  "use strict";
  var me = document.currentScript;
  var SEL = (me && me.getAttribute("data-select")) || "details";
  var DUR = 360, EASE = "cubic-bezier(.22,.68,.28,1)";
  var still = function () { return matchMedia("(prefers-reduced-motion: reduce)").matches; };

  function closedHeight(det, sum) {
    var c = getComputedStyle(det), s = getComputedStyle(sum);
    return sum.getBoundingClientRect().height +
      parseFloat(s.marginTop) + parseFloat(s.marginBottom) +
      parseFloat(c.paddingTop) + parseFloat(c.paddingBottom) +
      parseFloat(c.borderTopWidth) + parseFloat(c.borderBottomWidth);
  }
  function settle(det) {
    det._ed = null;
    det.classList.remove("is-closing");
    det.style.overflow = ""; det.style.boxSizing = "";
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || still()) return;
    var sum = e.target.closest && e.target.closest("summary");
    if (!sum) return;
    var det = sum.parentElement;
    if (!det || det.tagName !== "DETAILS" || !det.matches(SEL) || det.hasAttribute("data-ease-off")) return;
    var inner = e.target.closest("a, button, input, select, textarea, label");
    if (inner && inner !== sum && sum.contains(inner)) return; /* a link inside a summary keeps its own job */
    e.preventDefault();

    var from = det.getBoundingClientRect().height;
    if (det._ed) { det._ed.onfinish = null; det._ed.cancel(); }
    det.style.overflow = "hidden";
    det.style.boxSizing = "border-box";
    var closing = det.open && !det.classList.contains("is-closing");
    var anim;
    if (closing) {
      det.classList.add("is-closing");
      anim = det.animate({ height: [from + "px", closedHeight(det, sum) + "px"] }, { duration: DUR, easing: EASE });
      anim.onfinish = function () { det.open = false; settle(det); };
    } else {
      det.classList.remove("is-closing");
      det.open = true;
      var full = det.getBoundingClientRect().height;
      anim = det.animate({ height: [from + "px", full + "px"] }, { duration: DUR, easing: EASE });
      anim.onfinish = function () { settle(det); };
    }
    det._ed = anim;
  });
})();
