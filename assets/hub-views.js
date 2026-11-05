/* The hub's view switcher. Grid is the bento in index.html; Shelves, Threads and
   Map are built here from those same cards, so a project is described in one
   place only. Styles in /assets/hub-views.css.

   On the Russian hub the generator keeps only the cards whose Russian page
   exists, and these views read whatever cards are on the page, so they follow
   it for free. Strings this file writes carry both languages; `RU` picks.

   No requestAnimationFrame and no running animation anywhere: the map is laid
   out once with a fixed-seed force pass and drawn as a still SVG. Every change
   after that is a class toggle that CSS eases (opacity and color only). */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var RU = /^ru\b/.test(root.getAttribute('lang') || '');
  var T = function (en, ru) { return RU && ru ? ru : en; };
  var VIEWS = ['grid', 'shelves', 'threads', 'map'];
  var KEY = 'esmrsky-view';
  window.__hubViews = true;

  /* ---------------------------------------------------------------- data */
  var SECTIONS = [
    { id: 'start', en: 'Start here', ru: 'С чего начать',
      den: 'Two maps of everything below.', dru: 'Две карты всего, что ниже.',
      s: ['the-whole', 'throughline'] },
    { id: 'bible', en: 'Bible studies', ru: 'Библейские исследования',
      den: 'Word studies, teachings and companions that stay close to the text.',
      dru: 'Разборы слов, учения и пособия, которые держатся близко к тексту.',
      s: ['the-thread', 'faith', 'salvation', 'the-word', 'ecclesia', 'judgment', 'given',
          'fear-of-god-ii', 'spirit-soul-body', 'father-inside-time', 'before-the-mountains',
          'draw-near', 'inner-room', 'same-fire', 'one-accord', 'word-in-season',
          'word-in-season-talk', 'most-best-verses', 'master-thread'] },
    { id: 'practice', en: 'Faith in practice', ru: 'Вера на практике',
      den: 'Field guides for where you are and how you grow.',
      dru: 'Путеводители о том, где вы сейчас и как растёте.',
      s: ['soundings', 'where-are-you', 'three-territories', 'received', 'focus', 'tuned',
          'measured', 'the-fixed-point', 'the-gap', 'something-in-the-air', 'graded',
          'broken-cistern', 'be-filled', 'the-return-new', 'twelve', 'atlas-v3'] },
    { id: 'mind', en: 'Mind & body', ru: 'Ум и тело',
      den: 'How the brain, the body and learning actually work.',
      dru: 'Как на самом деле работают мозг, тело и учёба.',
      s: ['feels-like-learning', 'how-to-teach', 'predicting-mind', 'the-seeking-machine',
          'sleep-rest-peace', 'huberman', 'how-not-eating-works', 'the-curves-under-the-stages',
          'colour-of-middle-c', 'two-hundred-milliseconds', 'everything-mid'] },
    { id: 'loops', en: 'Loops & desire', ru: 'Петли и желания',
      den: 'Why we want what we want, and the way out of the loop.',
      dru: 'Почему мы хотим того, чего хотим, и как выйти из петли.',
      s: ['architecture-of-desire', 'desire-master', 'one-shape', 'the-loop', 'uncooked',
          'happy-heisenberg', 'combo-stern-loop-love', 'combo-stern', 'loop-atlas',
          'feedback-loops', 'Fake-Love', 'bait-constellation'] },
    { id: 'tools', en: 'Tools & other work', ru: 'Инструменты и другое',
      den: 'Building, coding and design.', dru: 'Разработка, код и дизайн.',
      s: ['coding-agents-guide', 'app-playbook', 'code-school', 'never-done', 'specimens',
          'soundlab-mixing-academy', 'quick-faraday'] },
    { id: 'earlier', en: 'Earlier versions', ru: 'Ранние версии',
      den: 'Kept as they stood before they were merged or rebuilt.',
      dru: 'Сохранены такими, какими были до слияния или переделки.',
      s: ['still-awake', 'anatomy-of-rest', 'the-watches-of-the-night', 'the-weight-of-rest',
          'the-atlas', 'atlas-v2', 'best-verses-v0'] }
  ];
  var MORE = { id: 'more', en: 'More', ru: 'Ещё', den: '', dru: '', s: [] };

  /* Throughline's chain and its eight claims (throughline/index.html). */
  var LINKS = [
    { id: 'Input', ru: 'Вход' }, { id: 'Meaning', ru: 'Смысл' }, { id: 'Desire', ru: 'Желание' },
    { id: 'Repetition', ru: 'Повторение' }, { id: 'Formation', ru: 'Формирование' }
  ];
  var CLAIMS = [
    { n: 1, pin: 'Input', en: 'One English word can hide several.', ru: 'Одно слово может скрывать несколько.',
      sen: 'One word, several', sru: 'Одно слово, несколько',
      s: ['judgment', 'fear-of-god-ii', 'ecclesia', 'faith', 'the-thread', 'master-thread',
          'most-best-verses', 'spirit-soul-body', 'one-accord', 'same-fire'] },
    { n: 2, pin: 'Meaning', en: 'The signal is real before the story is true.', ru: 'Сигнал реален раньше, чем история верна.',
      sen: 'Signal before story', sru: 'Сигнал раньше истории',
      s: ['predicting-mind', 'the-gap', 'the-word', 'graded', 'atlas-v3', 'two-hundred-milliseconds',
          'colour-of-middle-c', 'tuned', 'word-in-season'] },
    { n: 3, pin: 'Meaning', en: 'No instrument can read itself.', ru: 'Ни один прибор не может измерить сам себя.',
      sen: 'No instrument reads itself', sru: 'Прибор не измерит себя',
      s: ['the-fixed-point', 'the-seeking-machine', 'architecture-of-desire', 'everything-mid'] },
    { n: 4, pin: 'Desire', en: 'Wanting is not liking.', ru: 'Хотеть — не то же самое, что получать удовольствие.',
      sen: 'Wanting is not liking', sru: 'Хотеть ≠ наслаждаться',
      s: ['architecture-of-desire', 'one-shape', 'broken-cistern', 'desire-master',
          'the-seeking-machine', 'be-filled', 'inner-room'] },
    { n: 5, pin: 'Repetition', en: 'A loop is paid for in relief.', ru: 'За петлю платят облегчением.',
      sen: 'Loops pay in relief', sru: 'Петля платит облегчением',
      s: ['the-loop', 'uncooked', 'measured', 'loop-atlas', 'bait-constellation', 'Fake-Love', 'same-fire'] },
    { n: 6, pin: 'Repetition', en: 'You leave by replacing, not by pushing.', ru: 'Выходят, заменяя, а не отталкивая.',
      sen: 'Replace, don’t push', sru: 'Заменять, а не давить',
      s: ['the-return-new', 'one-shape', 'desire-master', 'happy-heisenberg', 'faith', 'be-filled',
          'inner-room', 'salvation'] },
    { n: 7, pin: 'every', en: 'The body sets the gain on everything above it.', ru: 'Тело задаёт громкость всему, что над ним.',
      sen: 'The body sets the gain', sru: 'Тело задаёт громкость',
      s: ['sleep-rest-peace', 'still-awake', 'anatomy-of-rest', 'the-watches-of-the-night',
          'the-weight-of-rest', 'spirit-soul-body', 'huberman', 'how-not-eating-works'] },
    { n: 8, pin: 'Formation', en: 'Difficulty forms you; ease only feels like learning.', ru: 'Трудность формирует; лёгкость лишь кажется учёбой.',
      sen: 'Difficulty forms you', sru: 'Трудность формирует',
      s: ['how-to-teach', 'soundings', 'where-are-you', 'three-territories', 'twelve', 'everything-mid',
          'feels-like-learning', 'draw-near', 'father-inside-time', 'the-curves-under-the-stages'] }
  ];

  /* Family ties between sites: [from, to, kind]. Labels read from each side. */
  var FAMILY = [
    ['the-atlas', 'atlas-v2', 'earlier'], ['atlas-v2', 'atlas-v3', 'earlier'], ['atlas-v3', 'twelve', 'sibling'],
    ['best-verses-v0', 'most-best-verses', 'earlier'],
    ['still-awake', 'sleep-rest-peace', 'merged'], ['anatomy-of-rest', 'sleep-rest-peace', 'merged'],
    ['the-watches-of-the-night', 'sleep-rest-peace', 'merged'], ['the-weight-of-rest', 'sleep-rest-peace', 'merged'],
    ['soundings', 'where-are-you', 'sibling'], ['word-in-season', 'word-in-season-talk', 'sequel'],
    ['father-inside-time', 'before-the-mountains', 'sibling'], ['faith', 'salvation', 'sibling'],
    ['anatomy-of-rest', 'measured', 'sibling'], ['measured', 'the-fixed-point', 'sibling'],
    ['combo-stern', 'combo-stern-loop-love', 'sequel'], ['Fake-Love', 'combo-stern-loop-love', 'sibling'],
    ['uncooked', 'happy-heisenberg', 'sibling'], ['broken-cistern', 'be-filled', 'sibling'],
    ['broken-cistern', 'one-shape', 'sibling'], ['desire-master', 'architecture-of-desire', 'sibling'],
    ['feels-like-learning', 'how-to-teach', 'sibling'], ['the-whole', 'throughline', 'sibling']
  ];
  var REL = {
    earlier: { a: ['Earlier version of', 'Ранняя версия'], b: ['Rebuilt from', 'Переделка'] },
    merged: { a: ['Merged into', 'Вошла в'], b: ['Brings together', 'Объединяет'] },
    sequel: { a: ['Continued in', 'Продолжение'], b: ['Companion to', 'Спутник'] },
    sibling: { a: ['Sibling', 'Родственная'], b: ['Sibling', 'Родственная'] }
  };

  /* ------------------------------------------------------------- the cards */
  var slugOf = function (href) {
    var m = /^\/([^\/?#]+)\//.exec(href || '');
    return m ? m[1] : null;
  };
  var text = function (el, sel) {
    var n = el.querySelector(sel);
    return n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  var sites = [];
  var bySlug = {};
  [].forEach.call(doc.querySelectorAll('main.bento-grid > .bento-card, .other-grid > .bento-card'), function (el) {
    var href = el.getAttribute('href');
    var slug = slugOf(href);
    if (!slug || bySlug[slug]) return;
    var s = {
      slug: slug, href: href, el: el,
      title: text(el, '.card-title'), tag: text(el, '.card-tag'), desc: text(el, '.card-desc'),
      tags: (el.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean),
      accent: (getComputedStyle(el).getPropertyValue('--accent') || '').trim() || 'var(--cobalt)',
      claims: [], fam: []
    };
    sites.push(s);
    bySlug[slug] = s;
  });
  var claims = CLAIMS.map(function (c) {
    return { n: c.n, pin: c.pin, title: T(c.en, c.ru), short: T(c.sen, c.sru),
      sites: c.s.map(function (x) { return bySlug[x]; }).filter(Boolean) };
  }).filter(function (c) { return c.sites.length; });
  claims.forEach(function (c) { c.sites.forEach(function (s) { s.claims.push(c); }); });
  var family = FAMILY.map(function (f) { return { a: bySlug[f[0]], b: bySlug[f[1]], kind: f[2] }; })
    .filter(function (f) { return f.a && f.b; });
  family.forEach(function (f) {
    f.a.fam.push({ other: f.b, label: T(REL[f.kind].a[0], REL[f.kind].a[1]), kind: f.kind });
    f.b.fam.push({ other: f.a, label: T(REL[f.kind].b[0], REL[f.kind].b[1]), kind: f.kind });
  });
  var linkName = function (id) {
    if (id === 'every') return T('Every link', 'Все звенья');
    for (var i = 0; i < LINKS.length; i++) if (LINKS[i].id === id) return T(LINKS[i].id, LINKS[i].ru);
    return id;
  };
  var claimNo = function (n) { return (n < 10 ? '0' : '') + n; };
  var throughlineHref = (function () {
    var t = bySlug.throughline;
    return t ? t.href : '/throughline/';
  })();

  /* ------------------------------------------------------------ the filter */
  var activeFilter = function () {
    var b = doc.querySelector('.filter-btn.active');
    return b ? b.getAttribute('data-filter') : 'all';
  };
  var passes = function (s, f) { return f === 'all' || s.tags.indexOf(f) > -1; };

  /* ---------------------------------------------------------------- render */
  var host = doc.getElementById('views');
  var stage = doc.querySelector('.view-stage');
  if (!host || !stage) return;
  var built = {};
  var panes = {};

  var pane = function (v) {
    if (!panes[v]) {
      panes[v] = doc.createElement('div');
      panes[v].className = 'vw-pane vw-' + v;
      panes[v].hidden = true;
      host.appendChild(panes[v]);
    }
    return panes[v];
  };

  var bandHead = function (title, desc, count) {
    return '<div class="vw-band-head"><h2 class="vw-band-title">' + esc(title) + '</h2>' +
      (desc ? '<p class="vw-band-desc">' + esc(desc) + '</p>' : '') +
      '<span class="vw-count">' + count + '</span></div>';
  };

  /* Shelves -------------------------------------------------------------- */
  function buildShelves() {
    var p = pane('shelves');
    var placed = {};
    var bands = SECTIONS.concat([MORE]).map(function (sec) {
      var list = sec.id === 'more'
        ? sites.filter(function (s) { return !placed[s.slug]; })
        : sec.s.map(function (x) { return bySlug[x]; }).filter(Boolean);
      list.forEach(function (s) { placed[s.slug] = true; });
      return { sec: sec, list: list };
    }).filter(function (b) { return b.list.length; });

    p.innerHTML = '';
    bands.forEach(function (b) {
      var band = doc.createElement('section');
      band.className = 'vw-band';
      band.setAttribute('data-band', b.sec.id);
      band.innerHTML = bandHead(T(b.sec.en, b.sec.ru), T(b.sec.den, b.sec.dru), b.list.length);
      var grid = doc.createElement('div');
      grid.className = 'shelf-grid';
      b.list.forEach(function (s) {
        var c = s.el.cloneNode(true);
        c.classList.remove('span-2-2', 'span-2-1', 'span-3-1', 'span-1-2', 'enter', 'leaving', 'moving', 'is-filtered');
        c.removeAttribute('style');
        c.classList.add('is-shelf');
        if (b.sec.id === 'start') c.classList.add('is-wide');
        c.setAttribute('data-slug', s.slug);
        grid.appendChild(c);
      });
      band.appendChild(grid);
      p.appendChild(band);
    });
  }

  /* Threads -------------------------------------------------------------- */
  function chip(s) {
    var x = s.claims.length > 1 ? '<span class="tv-x" title="' + esc(T('on ' + s.claims.length + ' threads', 'в ' + s.claims.length + ' нитях')) + '">×' + s.claims.length + '</span>' : '';
    return '<a class="tv-chip" data-slug="' + esc(s.slug) + '" href="' + esc(s.href) + '" style="--accent:' + esc(s.accent) + '">' + esc(s.title) + x + '</a>';
  }
  function buildThreads() {
    var p = pane('threads');
    var order = ['Input', 'Meaning', 'Desire', 'Repetition', 'Formation', 'every'];
    var sorted = claims.slice().sort(function (a, b) {
      return order.indexOf(a.pin) - order.indexOf(b.pin) || a.n - b.n;
    });
    var html = '<div class="tv-chain" aria-label="' + esc(T('The chain', 'Цепочка')) + '">' +
      LINKS.map(function (l, i) {
        return (i ? '<span class="tv-arrow" aria-hidden="true">→</span>' : '') + '<span class="tv-link">' + esc(T(l.id, l.ru)) + '</span>';
      }).join('') + '</div>' +
      '<p class="tv-note">' + esc(T(
        'The theology, the neuroscience and the learning research keep arriving at the same eight claims. Each one grabs this chain at one link, and each is argued by more than one site.',
        'Богословие, нейронаука и исследования учёбы снова и снова приходят к одним и тем же восьми утверждениям. Каждое хватает эту цепочку за одно звено, и каждое разбирается не на одном сайте.')) + '</p>';
    sorted.forEach(function (c) {
      html += '<article class="tv-row" data-claim="' + c.n + '"><div>' +
        '<span class="tv-no">' + esc(T('Thread ', 'Нить ')) + claimNo(c.n) + '</span>' +
        '<h3 class="tv-title">' + esc(c.title) + '</h3>' +
        '<span class="tv-pin">' + esc(T('Grabs the chain at · ', 'Звено · ')) + esc(linkName(c.pin)) + '</span><br>' +
        '<a class="tv-more" href="' + esc(throughlineHref) + '#t' + c.n + '">' + esc(T('Read it in Throughline', 'Читать в «Сквозной линии»')) + '</a>' +
        '</div><div class="tv-chips">' + c.sites.map(chip).join('') + '</div></article>';
    });
    var rest = sites.filter(function (s) { return !s.claims.length; });
    if (rest.length) {
      html += '<section class="tv-rest">' + bandHead(T('Not on a thread yet', 'Пока ни в одной нити'),
        T('Sites that none of the eight claims names.', 'Сайты, которых не называет ни одно из восьми утверждений.'), rest.length) +
        '<div class="tv-chips">' + rest.map(chip).join('') + '</div></section>';
    }
    p.innerHTML = html;
  }

  /* Map ------------------------------------------------------------------ */
  var mapState = { sel: null, mode: null };

  function seeded(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }

  function layout(mode) {
    var W = mode === 'wide' ? 1100 : 600;
    var H = mode === 'wide' ? 760 : 1180;
    var rnd = seeded(42);
    var nodes = [];
    var order = ['Input', 'Meaning', 'Desire', 'Repetition', 'Formation'];
    var chainClaims = claims.filter(function (c) { return c.pin !== 'every'; })
      .sort(function (a, b) { return order.indexOf(a.pin) - order.indexOf(b.pin) || a.n - b.n; });
    var cn = {};
    chainClaims.forEach(function (c, i) {
      var t = chainClaims.length > 1 ? i / (chainClaims.length - 1) : .5;
      /* Staggered either side of the chain line, so neighboring pills never
         share a row and can't overlap. */
      var side = i % 2 ? 1 : -1;
      var n = mode === 'wide'
        ? { x: 120 + t * (W - 240), y: H * .46 + side * 30 }
        : { x: W / 2 + side * 92, y: 180 + t * (H - 440) };
      n.cy = mode === 'wide' ? H * .46 : n.y;
      n.cx = mode === 'wide' ? n.x : W / 2;
      n.fixed = true; n.claim = c; n.r = 0;
      cn[c.n] = n; nodes.push(n);
    });
    claims.filter(function (c) { return c.pin === 'every'; }).forEach(function (c) {
      var n = mode === 'wide' ? { x: W / 2, y: H - 70 } : { x: W / 2, y: H - 110 };
      n.fixed = true; n.claim = c; n.r = 0;
      cn[c.n] = n; nodes.push(n);
    });
    var sn = {};
    var mapsTop = ['the-whole', 'throughline'];
    sites.forEach(function (s, i) {
      var n = { site: s, r: Math.min(11, 5 + (s.claims.length + s.fam.length) * 1.1) };
      var mi = mapsTop.indexOf(s.slug);
      if (mi > -1) {
        n.fixed = true;
        n.x = W / 2 + (mi ? 1 : -1) * (mode === 'wide' ? 110 : 90);
        n.y = mode === 'wide' ? 52 : 60;
      } else if (s.claims.length) {
        var x = 0, y = 0;
        s.claims.forEach(function (c) { x += cn[c.n].x; y += cn[c.n].y; });
        n.x = x / s.claims.length + (rnd() - .5) * 120;
        n.y = y / s.claims.length + (rnd() - .5) * 120;
      } else {
        var a = (i / sites.length) * Math.PI * 2;
        n.x = W / 2 + Math.cos(a) * W * .42;
        n.y = H / 2 + Math.sin(a) * H * .42;
      }
      sn[s.slug] = n; nodes.push(n);
    });
    var edges = [];
    sites.forEach(function (s) {
      s.claims.forEach(function (c) { edges.push({ a: sn[s.slug], b: cn[c.n], kind: 'claim', len: mode === 'wide' ? 78 : 90, k: .03 }); });
    });
    family.forEach(function (f) {
      edges.push({ a: sn[f.a.slug], b: sn[f.b.slug], kind: f.kind, fam: f, len: 44, k: .05 });
    });

    /* A short, fixed-seed force pass: springs along edges, a soft push between
       every pair, a weak pull to the middle for the unconnected. Deterministic,
       so the map is the same picture every visit. */
    var fsz = mode === 'wide' ? 12 : 19;
    nodes.forEach(function (n) {
      if (!n.claim) return;
      n.pw = Math.max(n.claim.short.length * fsz * .56, 40) + 40;
      n.ph = fsz * 2.4;
    });
    var free = nodes.filter(function (n) { return !n.fixed; });
    for (var it = 0; it < 320; it++) {
      var cool = 1 - it / 320;
      free.forEach(function (n) { n.vx = 0; n.vy = 0; });
      edges.forEach(function (e) {
        var dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        var f = (d - e.len) * e.k;
        var fx = dx / d * f, fy = dy / d * f;
        if (!e.a.fixed) { e.a.vx += fx; e.a.vy += fy; }
        if (!e.b.fixed) { e.b.vx -= fx; e.b.vy -= fy; }
      });
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var A = nodes[i], B = nodes[j];
          if (A.fixed && B.fixed) continue;
          /* A claim is a pill, not a point: keep sites outside its outline. */
          var C = A.claim ? A : B.claim ? B : null;
          if (C) {
            var S = C === A ? B : A;
            var ex = (S.x - C.x) / (C.pw / 2 + 16), ey = (S.y - C.y) / (C.ph / 2 + 16);
            var q = ex * ex + ey * ey;
            if (q < 1 && !S.fixed) {
              var qn = Math.sqrt(q) || .01;
              S.vx += ex / qn * (1 - qn) * 30;
              S.vy += ey / qn * (1 - qn) * 30;
            }
            continue;
          }
          var dx2 = B.x - A.x, dy2 = B.y - A.y;
          var d2 = dx2 * dx2 + dy2 * dy2 || 1;
          var min = (A.claim || B.claim) ? 64 : 40;
          var push = 1400 / d2 + (d2 < min * min ? (min - Math.sqrt(d2)) * .4 : 0);
          var dd = Math.sqrt(d2);
          var px = dx2 / dd * push, py = dy2 / dd * push;
          if (!A.fixed) { A.vx -= px; A.vy -= py; }
          if (!B.fixed) { B.vx += px; B.vy += py; }
        }
      }
      free.forEach(function (n) {
        if (!n.site.claims.length) { n.vx += (W / 2 - n.x) * .002; n.vy += (H / 2 - n.y) * .002; }
        var step = Math.max(-14, Math.min(14, n.vx)) * cool, stepY = Math.max(-14, Math.min(14, n.vy)) * cool;
        n.x = Math.max(28, Math.min(W - 28, n.x + step));
        n.y = Math.max(mode === 'wide' ? 116 : 96, Math.min(H - 28, n.y + stepY));
      });
    }
    return { W: W, H: H, nodes: nodes, edges: edges, sn: sn, cn: cn, chainClaims: chainClaims };
  }

  function buildMap() {
    var p = pane('map');
    var mode = stage.clientWidth >= 760 ? 'wide' : 'tall';
    mapState.mode = mode;
    var L = layout(mode);
    var fs = mode === 'wide' ? 12 : 19;
    var svg = '<svg class="mv-svg" viewBox="0 0 ' + L.W + ' ' + L.H + '" role="group" aria-label="' +
      esc(T('Map of every site and what connects them', 'Карта всех сайтов и их связей')) + '">';

    /* the chain itself, faint, under everything */
    var cc = L.chainClaims.map(function (c) { return L.cn[c.n]; });
    if (cc.length > 1) {
      var a = cc[0], b = cc[cc.length - 1];
      svg += '<line class="mv-chain-line" x1="' + a.cx + '" y1="' + a.cy + '" x2="' + b.cx + '" y2="' + b.cy + '"/>';
      /* Each link's name on a ruler along the top, over the claims it holds.
         On the line itself the pills covered them. Phones skip the ruler; the
         panel names the link. */
      if (mode === 'wide') {
        var groups = {};
        L.chainClaims.forEach(function (c) { (groups[c.pin] = groups[c.pin] || []).push(L.cn[c.n]); });
        Object.keys(groups).forEach(function (pin) {
          var g = groups[pin], mx = 0;
          g.forEach(function (n) { mx += n.cx; });
          mx /= g.length;
          svg += '<text class="mv-chain-lbl" x="' + mx.toFixed(1) + '" y="96" text-anchor="middle" font-size="10">' + esc(linkName(pin)) + '</text>';
        });
      }
    }

    L.edges.forEach(function (e, i) {
      var cls = 'mv-e ' + (e.kind === 'claim' ? 'k-claim' : 'k-fam k-' + e.kind);
      var acc = e.fam ? ' style="--accent:' + esc(e.fam.a.accent) + '"' : '';
      svg += '<line class="' + cls + '" data-e="' + i + '"' + acc + ' x1="' + e.a.x.toFixed(1) + '" y1="' + e.a.y.toFixed(1) +
        '" x2="' + e.b.x.toFixed(1) + '" y2="' + e.b.y.toFixed(1) + '"/>';
    });

    /* labels: most-connected first, and a label that would overlap one already
       placed stays hidden until its site is part of a selection */
    var boxes = [];
    var hit = function (bx) {
      for (var i = 0; i < boxes.length; i++) {
        var o = boxes[i];
        if (bx.x < o.x + o.w && bx.x + bx.w > o.x && bx.y < o.y + o.h && bx.y + bx.h > o.y) return true;
      }
      return false;
    };
    L.nodes.filter(function (n) { return n.claim; }).forEach(function (n) {
      boxes.push({ x: n.x - n.pw / 2 - 4, y: n.y - n.ph / 2 - 4, w: n.pw + 8, h: n.ph + 8 });
    });
    var siteNodes = L.nodes.filter(function (n) { return n.site; })
      .sort(function (a, b) { return (b.site.claims.length + b.site.fam.length) - (a.site.claims.length + a.site.fam.length); });
    siteNodes.forEach(function (n) {
      var w = n.site.title.length * fs * .52;
      var right = n.x < L.W - w - 30;
      n.lx = right ? n.x + n.r + 5 : n.x - n.r - 5;
      n.anchor = right ? 'start' : 'end';
      var bx = { x: right ? n.lx : n.lx - w, y: n.y - fs * .7, w: w, h: fs * 1.3 };
      n.lh = hit(bx);
      if (!n.lh) boxes.push(bx);
      boxes.push({ x: n.x - n.r, y: n.y - n.r, w: n.r * 2, h: n.r * 2 });
    });

    L.nodes.forEach(function (n, i) {
      if (n.claim) {
        var c = n.claim;
        svg += '<g class="mv-n mv-claim" data-claim="' + c.n + '" tabindex="0" role="button" aria-label="' +
          esc(T('Thread ', 'Нить ') + claimNo(c.n) + ': ' + c.title) + '">' +
          '<rect class="mv-pill" x="' + (n.x - n.pw / 2).toFixed(1) + '" y="' + (n.y - n.ph / 2).toFixed(1) + '" width="' + n.pw.toFixed(1) +
          '" height="' + n.ph.toFixed(1) + '" rx="' + (n.ph / 2).toFixed(1) + '"/>' +
          '<text class="mv-cno" x="' + (n.x - n.pw / 2 + fs * 1.1).toFixed(1) + '" y="' + (n.y + fs * .36).toFixed(1) + '" font-size="' + (fs * .8).toFixed(1) + '">' + claimNo(c.n) + '</text>' +
          '<text class="mv-ct" x="' + (n.x - n.pw / 2 + fs * 2.9).toFixed(1) + '" y="' + (n.y + fs * .36).toFixed(1) + '" font-size="' + fs + '">' + esc(c.short) + '</text></g>';
      } else {
        var s = n.site;
        svg += '<g class="mv-n mv-site' + (n.lh ? ' lh' : '') + '" data-slug="' + esc(s.slug) + '" style="--accent:' + esc(s.accent) +
          '" tabindex="0" role="button" aria-label="' + esc(s.title) + '">' +
          '<circle class="mv-hit" cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="' + Math.max(n.r + 8, mode === 'wide' ? 14 : 22) + '"/>' +
          '<circle class="mv-dot" cx="' + n.x.toFixed(1) + '" cy="' + n.y.toFixed(1) + '" r="' + n.r.toFixed(1) + '"/>' +
          '<text class="mv-lbl" x="' + n.lx.toFixed(1) + '" y="' + (n.y + fs * .36).toFixed(1) + '" text-anchor="' + n.anchor + '" font-size="' + fs + '">' + esc(s.title) + '</text></g>';
      }
    });
    svg += '</svg>';

    var legend = '<div class="mv-legend">' +
      '<span><svg viewBox="0 0 26 8" aria-hidden="true"><line x1="1" y1="4" x2="25" y2="4" style="stroke:var(--hair-hover)"/></svg>' + esc(T('argues a shared claim', 'разбирает общее утверждение')) + '</span>' +
      '<span><svg viewBox="0 0 26 8" aria-hidden="true"><line x1="1" y1="4" x2="25" y2="4" style="stroke:var(--cobalt-soft)"/></svg>' + esc(T('sibling or companion', 'родственный или спутник')) + '</span>' +
      '<span><svg viewBox="0 0 26 8" aria-hidden="true"><line x1="1" y1="4" x2="25" y2="4" style="stroke:var(--cobalt-soft);stroke-dasharray:4 4"/></svg>' + esc(T('earlier version, or merged in', 'ранняя версия или вошла в другой')) + '</span>' +
      '</div>';

    p.innerHTML = '<div class="mv"><div class="mv-board">' + svg + legend + '</div>' +
      '<aside class="mv-panel" aria-live="polite"><div class="mv-panel-body"></div></aside></div>';
    p._layout = L;
    wireMap(p);
    showPanel(null, true);
    if (mapState.sel) select(mapState.sel, true);
    applyFilterTo('map');
  }

  function neighborhood(sel, L) {
    var on = { nodes: {}, edges: {} };
    var key = function (n) { return n.claim ? 'c' + n.claim.n : 's' + n.site.slug; };
    var me = sel.claim ? L.cn[sel.claim] : L.sn[sel.slug];
    if (!me) return on;
    on.nodes[key(me)] = true;
    L.edges.forEach(function (e, i) {
      if (e.a === me || e.b === me) {
        on.edges[i] = true;
        on.nodes[key(e.a)] = true;
        on.nodes[key(e.b)] = true;
      }
    });
    return on;
  }

  function select(sel, instant) {
    var p = panes.map;
    if (!p || !p._layout) return;
    mapState.sel = sel;
    var svg = p.querySelector('.mv-svg');
    var on = sel ? neighborhood(sel, p._layout) : null;
    svg.classList.toggle('has-sel', !!sel);
    [].forEach.call(svg.querySelectorAll('.mv-n'), function (g) {
      var k = g.hasAttribute('data-claim') ? 'c' + g.getAttribute('data-claim') : 's' + g.getAttribute('data-slug');
      g.classList.toggle('on', !!(on && on.nodes[k]));
      var isSel = !!sel && (sel.claim ? 'c' + sel.claim === k : 's' + sel.slug === k);
      g.classList.toggle('is-sel', isSel);
      g.setAttribute('aria-pressed', String(isSel));
    });
    [].forEach.call(svg.querySelectorAll('.mv-e'), function (l) {
      l.classList.toggle('on', !!(on && on.edges[l.getAttribute('data-e')]));
    });
    showPanel(sel, instant);
  }

  function panelHtml(sel) {
    if (!sel) {
      return '<p class="mv-hint">' + T(
        'Every site, the <b>eight claims</b> they keep arriving at, and the <b>families</b> they belong to. Tap a site or a claim to see what it connects to. <b>Esc</b> clears.',
        'Все сайты, <b>восемь утверждений</b>, к которым они снова и снова приходят, и <b>семьи</b>, к которым они принадлежат. Нажмите на сайт или утверждение, чтобы увидеть его связи. <b>Esc</b> снимает выбор.') + '</p>';
    }
    if (sel.claim) {
      var c = claims.filter(function (x) { return x.n === sel.claim; })[0];
      if (!c) return '';
      return '<span class="mv-kicker">' + esc(T('Thread ', 'Нить ')) + claimNo(c.n) + ' · ' + esc(linkName(c.pin)) + '</span>' +
        '<h3 class="mv-ptitle">' + esc(c.title) + '</h3>' +
        '<span class="mv-sub">' + esc(T('Argued in', 'Разбирается в')) + ' · ' + c.sites.length + '</span>' +
        '<div class="mv-plist">' + c.sites.map(function (s) {
          return '<button type="button" class="mv-pbtn" data-go-slug="' + esc(s.slug) + '" style="--accent:' + esc(s.accent) + '">' + esc(s.title) + '</button>';
        }).join('') + '</div>' +
        '<a class="mv-open" href="' + esc(throughlineHref) + '#t' + c.n + '">' + esc(T('Read it in Throughline', 'Читать в «Сквозной линии»')) + ' →</a>';
    }
    var s = bySlug[sel.slug];
    if (!s) return '';
    var html = '<span class="mv-kicker" style="--accent:' + esc(s.accent) + '">' + esc(s.tag) + '</span>' +
      '<h3 class="mv-ptitle">' + esc(s.title) + '</h3>' +
      (s.desc ? '<p class="mv-pdesc">' + esc(s.desc) + '</p>' : '');
    if (s.claims.length) {
      html += '<span class="mv-sub">' + esc(T('Threads', 'Нити')) + '</span><div class="mv-plist">' +
        s.claims.map(function (c) {
          return '<button type="button" class="mv-pbtn is-claim" data-go-claim="' + c.n + '">' + esc(c.short) + '<small>' + claimNo(c.n) + '</small></button>';
        }).join('') + '</div>';
    }
    if (s.fam.length) {
      html += '<span class="mv-sub">' + esc(T('Family', 'Семья')) + '</span><div class="mv-plist">' +
        s.fam.map(function (f) {
          return '<button type="button" class="mv-pbtn" data-go-slug="' + esc(f.other.slug) + '" style="--accent:' + esc(f.other.accent) + '">' + esc(f.other.title) + '<small>' + esc(f.label) + '</small></button>';
        }).join('') + '</div>';
    }
    if (!s.claims.length && !s.fam.length) {
      html += '<p class="mv-hint">' + esc(T('Not tied to the others yet.', 'Пока не связан с остальными.')) + '</p>';
    }
    return html + '<a class="mv-open" href="' + esc(s.href) + '">' + esc(T('Open', 'Открыть')) + ' →</a>';
  }

  var panelTimer = null;
  function showPanel(sel, instant) {
    var body = panes.map && panes.map.querySelector('.mv-panel-body');
    if (!body) return;
    var html = panelHtml(sel);
    if (instant || reduce()) { body.innerHTML = html; body.classList.remove('is-changing'); return; }
    clearTimeout(panelTimer);
    body.classList.add('is-changing');
    panelTimer = setTimeout(function () {
      body.innerHTML = html;
      body.classList.remove('is-changing');
    }, 160);
  }

  function wireMap(p) {
    var pick = function (g) {
      if (!g) return;
      var sel = g.hasAttribute('data-claim') ? { claim: +g.getAttribute('data-claim') } : { slug: g.getAttribute('data-slug') };
      var same = mapState.sel && ((sel.claim && mapState.sel.claim === sel.claim) || (sel.slug && mapState.sel.slug === sel.slug));
      select(same ? null : sel);
    };
    p.addEventListener('click', function (ev) {
      var g = ev.target.closest('.mv-n');
      if (g) { pick(g); return; }
      var go = ev.target.closest('[data-go-slug],[data-go-claim]');
      if (go) {
        select(go.hasAttribute('data-go-claim') ? { claim: +go.getAttribute('data-go-claim') } : { slug: go.getAttribute('data-go-slug') });
        return;
      }
      if (ev.target.closest('.mv-svg') && mapState.sel) select(null);
    });
    p.addEventListener('keydown', function (ev) {
      var g = ev.target.closest && ev.target.closest('.mv-n');
      if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); pick(g); }
    });
  }

  doc.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && current === 'map' && mapState.sel) select(null);
  });

  /* --------------------------------------------------- filter, all views */
  function applyFilterTo(v) {
    var f = activeFilter();
    var p = panes[v];
    if (!p) return;
    if (v === 'shelves') {
      [].forEach.call(p.querySelectorAll('.vw-band'), function (band) {
        var shown = 0;
        [].forEach.call(band.querySelectorAll('.bento-card'), function (c) {
          var s = bySlug[c.getAttribute('data-slug')];
          var ok = !s || passes(s, f);
          c.classList.toggle('vw-out', !ok);
          if (ok) shown++;
        });
        band.classList.toggle('vw-out', !shown);
        var cnt = band.querySelector('.vw-count');
        if (cnt) cnt.textContent = shown;
      });
    } else if (v === 'threads') {
      [].forEach.call(p.querySelectorAll('.tv-row, .tv-rest'), function (row) {
        var shown = 0;
        [].forEach.call(row.querySelectorAll('.tv-chip'), function (c) {
          var ok = passes(bySlug[c.getAttribute('data-slug')], f);
          c.classList.toggle('vw-out', !ok);
          if (ok) shown++;
        });
        row.classList.toggle('vw-out', !shown);
      });
    } else if (v === 'map') {
      var L = p._layout;
      [].forEach.call(p.querySelectorAll('.mv-site'), function (g) {
        g.classList.toggle('out', !passes(bySlug[g.getAttribute('data-slug')], f));
      });
      if (L) [].forEach.call(p.querySelectorAll('.mv-e'), function (l) {
        var e = L.edges[+l.getAttribute('data-e')];
        var out = (e.a.site && !passes(e.a.site, f)) || (e.b.site && !passes(e.b.site, f));
        l.classList.toggle('out', !!out);
      });
    }
  }
  doc.addEventListener('click', function (ev) {
    if (!ev.target.closest('.filter-btn')) return;
    /* the grid's own handler has set .active by now (it was bound first) */
    Object.keys(panes).forEach(applyFilterTo);
  });

  /* ------------------------------------------------------------ switching */
  var reduce = function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var current = VIEWS.indexOf(root.getAttribute('data-view')) > -1 ? root.getAttribute('data-view') : 'grid';
  var buttons = [].slice.call(doc.querySelectorAll('.view-btn'));

  function ensure(v) {
    if (v === 'grid' || built[v]) return;
    if (v === 'shelves') buildShelves();
    if (v === 'threads') buildThreads();
    if (v === 'map') buildMap();
    built[v] = true;
    applyFilterTo(v);
  }

  function reveal(v) {
    Object.keys(panes).forEach(function (k) { panes[k].hidden = k !== v; });
    root.setAttribute('data-view', v);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === v)); });
  }

  var swapTimer = null;
  function setView(v, opts) {
    if (VIEWS.indexOf(v) < 0) v = 'grid';
    opts = opts || {};
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ }
    if (v === current && !opts.force) return;
    current = v;
    if (opts.instant || reduce()) { ensure(v); reveal(v); return; }
    clearTimeout(swapTimer);
    stage.classList.add('is-swapping');
    swapTimer = setTimeout(function () {
      ensure(v);
      reveal(v);
      /* While the stage is invisible, bring its top into view if the reader had
         scrolled past it, so the new view starts where it starts. */
      var top = stage.getBoundingClientRect().top;
      if (top < 0) window.scrollBy(0, top - 24);
      stage.classList.remove('is-swapping');
    }, 220);
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view')); });
  });

  /* The map's shape depends on the stage width; redraw only when it crosses
     from one layout to the other. */
  var rz = null;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      if (!built.map) return;
      var mode = stage.clientWidth >= 760 ? 'wide' : 'tall';
      if (mode !== mapState.mode) buildMap();
    }, 200);
  });

  setView(current, { instant: true, force: true });
})();
