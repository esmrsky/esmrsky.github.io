/* The preview frame: one quiet bar at the foot of each direction, so the four can
   be flipped through in order. It is not part of any design. */
(function () {
  var D = [
    { slug: 'gallery', name: 'Gallery' },
    { slug: 'contents', name: 'Contents' },
    { slug: 'question', name: 'Question' },
    { slug: 'two-books', name: 'Two Books' }
  ];
  var here = (/\/directions\/([^\/]+)\//.exec(location.pathname) || [])[1];
  var i = D.findIndex(function (d) { return d.slug === here; });
  if (i < 0) return;
  var prev = D[(i + D.length - 1) % D.length], next = D[(i + 1) % D.length];
  var bar = document.createElement('nav');
  bar.className = 'dir-frame';
  bar.setAttribute('aria-label', 'Preview directions');
  bar.innerHTML =
    '<a href="/directions/' + prev.slug + '/" rel="prev"><span aria-hidden="true">←</span> ' + prev.name + '</a>' +
    '<a class="dir-frame-mid" href="/directions/">Direction ' + (i + 1) + ' of ' + D.length + ': <b>' + D[i].name + '</b></a>' +
    '<a href="/directions/' + next.slug + '/" rel="next">' + next.name + ' <span aria-hidden="true">→</span></a>';
  var css = document.createElement('style');
  css.textContent =
    '.dir-frame{position:fixed;left:50%;bottom:14px;translate:-50% 0;z-index:90;display:flex;align-items:stretch;' +
    'font:500 13px/1 system-ui,-apple-system,sans-serif;letter-spacing:0;background:#111;color:#eee;border-radius:10px;' +
    'box-shadow:0 6px 24px rgba(0,0,0,.28);overflow:hidden;max-width:calc(100vw - 24px)}' +
    '.dir-frame a{display:flex;align-items:center;gap:6px;min-height:44px;padding:0 14px;color:inherit;text-decoration:none;white-space:nowrap;' +
    'transition:background-color .2s ease}' +
    '.dir-frame a:hover{background-color:#2a2a2a}.dir-frame a:focus-visible{outline:2px solid #fff;outline-offset:-4px}' +
    '.dir-frame-mid{border-inline:1px solid #333;color:#aaa!important}.dir-frame-mid b{color:#fff;font-weight:600}' +
    '@media (max-width:520px){.dir-frame-mid{display:none!important}.dir-frame{bottom:10px}}' +
    '@media print{.dir-frame{display:none}}';
  document.head.appendChild(css);
  document.body.appendChild(bar);
})();
