/* ============================================================
   FAITH — scripture system
   Ported from the-thread (esmrsky): bolls.life chapter API for
   NIV/NASB/NKJV/NLT, the esmrsky scripture worker for TPT,
   hover verse pop-ups, a click-to-open passage dialog, and a
   translation picker. Default version: NIV.
   ============================================================ */
(function () {
  'use strict';

  var BG = 'https://www.biblegateway.com/passage/?search=';

  /* One table for every book: the link regex, parseReference's book ids,
     and the dialog's full names all stay in step. */
  var BOOKS = [
    { id: 1, full: 'Genesis', names: ['Gen', 'Genesis'] },
    { id: 2, full: 'Exodus', names: ['Ex', 'Exod', 'Exodus'] },
    { id: 3, full: 'Leviticus', names: ['Lev', 'Leviticus'] },
    { id: 4, full: 'Numbers', names: ['Num', 'Numbers'] },
    { id: 5, full: 'Deuteronomy', names: ['Deut', 'Deuteronomy'] },
    { id: 6, full: 'Joshua', names: ['Josh', 'Joshua'] },
    { id: 7, full: 'Judges', names: ['Judg', 'Judges'] },
    { id: 8, full: 'Ruth', names: ['Ruth'] },
    { id: 9, full: '1 Samuel', n: 1, names: ['Sam', 'Samuel'] },
    { id: 10, full: '2 Samuel', n: 2, names: ['Sam', 'Samuel'] },
    { id: 11, full: '1 Kings', n: 1, names: ['Kings'] },
    { id: 12, full: '2 Kings', n: 2, names: ['Kings'] },
    { id: 13, full: '1 Chronicles', n: 1, names: ['Chr', 'Chronicles'] },
    { id: 14, full: '2 Chronicles', n: 2, names: ['Chr', 'Chronicles'] },
    { id: 15, full: 'Ezra', names: ['Ezra'] },
    { id: 16, full: 'Nehemiah', names: ['Neh', 'Nehemiah'] },
    { id: 17, full: 'Esther', names: ['Esth', 'Esther'] },
    { id: 18, full: 'Job', names: ['Job'] },
    { id: 19, full: 'Psalms', names: ['Ps', 'Psalm', 'Psalms'] },
    { id: 20, full: 'Proverbs', names: ['Prov', 'Proverbs'] },
    { id: 21, full: 'Ecclesiastes', names: ['Eccl', 'Ecclesiastes'] },
    { id: 22, full: 'Song of Songs', names: ['Song'] },
    { id: 23, full: 'Isaiah', names: ['Isa', 'Isaiah'] },
    { id: 24, full: 'Jeremiah', names: ['Jer', 'Jeremiah'] },
    { id: 25, full: 'Lamentations', names: ['Lam', 'Lamentations'] },
    { id: 26, full: 'Ezekiel', names: ['Ezek', 'Ezekiel'] },
    { id: 27, full: 'Daniel', names: ['Dan', 'Daniel'] },
    { id: 28, full: 'Hosea', names: ['Hos', 'Hosea'] },
    { id: 29, full: 'Joel', names: ['Joel'] },
    { id: 30, full: 'Amos', names: ['Amos'] },
    { id: 31, full: 'Obadiah', names: ['Obad', 'Obadiah'] },
    { id: 32, full: 'Jonah', names: ['Jonah'] },
    { id: 33, full: 'Micah', names: ['Mic', 'Micah'] },
    { id: 34, full: 'Nahum', names: ['Nah', 'Nahum'] },
    { id: 35, full: 'Habakkuk', names: ['Hab', 'Habakkuk'] },
    { id: 36, full: 'Zephaniah', names: ['Zeph', 'Zephaniah'] },
    { id: 37, full: 'Haggai', names: ['Hag', 'Haggai'] },
    { id: 38, full: 'Zechariah', names: ['Zech', 'Zechariah'] },
    { id: 39, full: 'Malachi', names: ['Mal', 'Malachi'] },
    { id: 40, full: 'Matthew', names: ['Matt', 'Matthew'] },
    { id: 41, full: 'Mark', names: ['Mark'] },
    { id: 42, full: 'Luke', names: ['Luke'] },
    { id: 43, full: 'John', names: ['John'] },
    { id: 44, full: 'Acts', names: ['Acts'] },
    { id: 45, full: 'Romans', names: ['Rom', 'Romans'] },
    { id: 46, full: '1 Corinthians', n: 1, names: ['Cor', 'Corinthians'] },
    { id: 47, full: '2 Corinthians', n: 2, names: ['Cor', 'Corinthians'] },
    { id: 48, full: 'Galatians', names: ['Gal', 'Galatians'] },
    { id: 49, full: 'Ephesians', names: ['Eph', 'Ephesians'] },
    { id: 50, full: 'Philippians', names: ['Phil', 'Philippians'] },
    { id: 51, full: 'Colossians', names: ['Col', 'Colossians'] },
    { id: 52, full: '1 Thessalonians', n: 1, names: ['Thess', 'Thessalonians'] },
    { id: 53, full: '2 Thessalonians', n: 2, names: ['Thess', 'Thessalonians'] },
    { id: 54, full: '1 Timothy', n: 1, names: ['Tim', 'Timothy'] },
    { id: 55, full: '2 Timothy', n: 2, names: ['Tim', 'Timothy'] },
    { id: 56, full: 'Titus', names: ['Titus'] },
    { id: 57, full: 'Philemon', names: ['Philem', 'Philemon'] },
    { id: 58, full: 'Hebrews', names: ['Heb', 'Hebrews'] },
    { id: 59, full: 'James', names: ['Jas', 'James'] },
    { id: 60, full: '1 Peter', n: 1, names: ['Pet', 'Peter'] },
    { id: 61, full: '2 Peter', n: 2, names: ['Pet', 'Peter'] },
    { id: 62, full: '1 John', n: 1, names: ['John'] },
    { id: 63, full: '2 John', n: 2, names: ['John'] },
    { id: 64, full: '3 John', n: 3, names: ['John'] },
    { id: 65, full: 'Jude', names: ['Jude'] },
    { id: 66, full: 'Revelation', names: ['Rev', 'Revelation'] }
  ];

  var BOOK_BY_NAME = {};
  var BOOK_FULL_BY_ID = {};
  BOOKS.forEach(function (b) {
    BOOK_FULL_BY_ID[b.id] = b.full;
    b.names.forEach(function (name) {
      var slot = BOOK_BY_NAME[name] || (BOOK_BY_NAME[name] = {});
      slot[b.n || 0] = b.id;
    });
  });

  /* Longest name first so "Isaiah 53" matches as Isaiah rather than "Isa". */
  var BOOK_NAME_PATTERN = Array.from(new Set(BOOKS.reduce(function (acc, b) { return acc.concat(b.names); }, [])))
    .sort(function (a, b) { return b.length - a.length; }).join('|');
  var REF_RE = new RegExp(
    '\\b((?:[123]\\s)?(?:' + BOOK_NAME_PATTERN + ')\\s\\d+(?::\\d+(?:[-–]\\d+(?::\\d+)?)?(?:,\\s?\\d+(?:[-–]\\d+)?)*)?)', 'g');

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* fine */ } }

  var HOVER_CAPABLE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- versions ---------- */
  var VERSIONS = [
    { code: 'NIV', full: 'New International Version' },
    { code: 'NASB', full: 'New American Standard' },
    { code: 'NKJV', full: 'New King James Version' },
    { code: 'NLT', full: 'New Living Translation' },
    { code: 'TPT', full: 'The Passion Translation' }
  ];
  var ACTIVE_VERSION = 'NIV';
  function getVersion() { return ACTIVE_VERSION; }
  function applyVersion(code) {
    if (!VERSIONS.some(function (v) { return v.code === code; })) return;
    ACTIVE_VERSION = code;
    lsSet('faith-version', code);
    document.querySelectorAll('.verpick-val').forEach(function (val) { val.textContent = code; });
    document.querySelectorAll('.verpick-opt').forEach(function (o) { o.setAttribute('aria-selected', String(o.dataset.v === code)); });
  }

  function versionMenuHtml(heading) {
    return '<span class="verpick-head">' + heading + '</span>' +
      VERSIONS.map(function (v) {
        return '<button class="verpick-opt" type="button" role="option" data-v="' + v.code + '"' +
          ' title="' + v.full + '" aria-label="' + v.full + '"' +
          ' aria-selected="' + (v.code === ACTIVE_VERSION) + '">' +
          '<span class="code">' + v.code + '</span><span class="full">' + v.full + '</span></button>';
      }).join('');
  }

  function wireVersionPicker(wrap, onChoose) {
    var btn = wrap && wrap.querySelector('.verpick-btn');
    var menu = wrap && wrap.querySelector('.verpick-menu');
    var val = wrap && wrap.querySelector('.verpick-val');
    if (!wrap || !btn || !menu || !val) return null;

    val.textContent = ACTIVE_VERSION;
    var opts = function () { return Array.from(menu.querySelectorAll('.verpick-opt')); };
    var close = function () {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      opts().forEach(function (o) { o.classList.remove('cursor'); });
    };
    var open = function () {
      wrap.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      var sel = menu.querySelector('[aria-selected="true"]') || opts()[0];
      if (sel) sel.classList.add('cursor');
    };
    var choose = function (code) {
      applyVersion(code);
      close();
      if (onChoose) onChoose(code);
      btn.focus();
    };
    var moveCursor = function (step) {
      var list = opts();
      var i = list.findIndex(function (o) { return o.classList.contains('cursor'); });
      var next = list[Math.max(0, Math.min(list.length - 1, (i < 0 ? 0 : i + step)))];
      list.forEach(function (o) { o.classList.remove('cursor'); });
      if (next) next.classList.add('cursor');
    };

    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      menu.hidden ? open() : close();
    });
    menu.addEventListener('click', function (ev) {
      var opt = ev.target.closest('.verpick-opt');
      if (opt) choose(opt.dataset.v);
    });
    document.addEventListener('click', function (ev) {
      if (!menu.hidden && !wrap.contains(ev.target)) close();
    });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !menu.hidden) { ev.preventDefault(); close(); btn.focus(); return; }
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        if (menu.hidden) { open(); return; }
        moveCursor(ev.key === 'ArrowDown' ? 1 : -1);
        return;
      }
      if ((ev.key === 'Enter' || ev.key === ' ') && !menu.hidden) {
        var cur = menu.querySelector('.verpick-opt.cursor');
        if (cur) { ev.preventDefault(); choose(cur.dataset.v); }
      }
    });
    return { close: close };
  }

  /* ---------- reference parsing & auto-linking ---------- */
  function parseReference(refStr) {
    var clean = refStr.replace(/–/g, '-').trim();
    var match = clean.match(/^([123]\s)?([A-Za-z]+)\s(\d+)(?::(\d+)(?:[-](\d+))?)?/);
    if (!match) return null;
    var numPrefix = match[1] ? match[1].trim() : '';
    var name = match[2];
    var chapter = parseInt(match[3], 10);
    var verseStart = match[4] ? parseInt(match[4], 10) : null;
    var verseEnd = match[5] ? parseInt(match[5], 10) : null;
    var slot = BOOK_BY_NAME[name];
    if (!slot) return null;
    var num = numPrefix ? parseInt(numPrefix, 10) : 0;
    var bookId = slot[num] !== undefined ? slot[num]
      : slot[0] !== undefined ? slot[0]
        : slot[1];
    if (!bookId) return null;
    return { bookId: bookId, chapter: chapter, verseStart: verseStart, verseEnd: verseEnd };
  }

  function formatReferenceTitle(refStr) {
    var parsed = parseReference(refStr);
    var full = parsed && BOOK_FULL_BY_ID[parsed.bookId];
    if (!full) return refStr;
    var out = full + ' ' + parsed.chapter;
    if (parsed.verseStart !== null) {
      out += ':' + parsed.verseStart;
      if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) out += '–' + parsed.verseEnd;
    }
    return out;
  }

  function splitReferenceGroup(refs) {
    var parts = String(refs).split(/\s*;\s*/).filter(Boolean);
    var lastBook = '';
    var expanded = [];
    parts.forEach(function (part) {
      var book = part.match(/^((?:[123]\s)?[A-Za-z]+)\s+\d/);
      if (book) lastBook = book[1];
      else if (lastBook && /^\d/.test(part)) part = lastBook + ' ' + part;
      var commaGroup = part.match(/^((?:[123]\s)?[A-Za-z]+)\s+(\d+):(.+,.+)$/);
      if (commaGroup) {
        commaGroup[3].split(/\s*,\s*/).forEach(function (verse) { expanded.push(commaGroup[1] + ' ' + commaGroup[2] + ':' + verse); });
      } else {
        expanded.push(part);
      }
    });
    return expanded;
  }

  function singleRefLink(r) {
    return '<a class="ref-link" target="_blank" rel="noopener" href="' + BG + encodeURIComponent(r) + '" data-ref="' + r + '">' + r + '</a>';
  }
  function refLink(r) {
    return splitReferenceGroup(r).map(singleRefLink).join('<span class="ref-separator">; </span>');
  }
  function linkRefsHtml(html) { return html.replace(REF_RE, function (m) { return refLink(m); }); }

  /* Auto-link references in text nodes only, so attributes and existing links stay intact. */
  function autoLink(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || node.nodeValue.length < 6) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p || p.closest('a, script, style, .verse-tooltip, .verse-context-dialog, h1, .no-reflink, [data-verse]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var targets = [];
    var n;
    while ((n = walker.nextNode())) {
      REF_RE.lastIndex = 0;
      if (REF_RE.test(n.nodeValue)) targets.push(n);
    }
    targets.forEach(function (node) {
      var span = document.createElement('span');
      REF_RE.lastIndex = 0;
      span.innerHTML = node.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(REF_RE, function (m) { return refLink(m); });
      node.parentNode.replaceChild(span, node);
    });
    markWrittenOutRefs(root);
  }

  /* ---------- references whose verse is already on the page ----------
     A <cite> on this site always names a quotation printed directly above it — a verse-card
     or a pull-quote. Hovering that reference opened a pop-up containing the very words the
     reader was already looking at, which is the one case where the pop-up has nothing to add.
     Marked here rather than guessed at hover time, so the rule is stated once and the
     handlers stay simple. The CLICK is untouched: the passage AROUND the verse is genuinely
     more than what is printed, and that is what the dialog gives. */
  function markWrittenOutRefs(root) {
    (root || document).querySelectorAll('cite .ref-link').forEach(function (link) {
      var host = link.closest('.verse-card, .pull, figure');
      if (!host) return;                                        /* a bare cite names nothing */
      if (!host.querySelector('[data-verse], blockquote')) return;  /* nothing printed above it */
      link.setAttribute('data-written', '');
    });
  }

  /* ---------- text cleaning ---------- */
  function escapeScriptureText(text) {
    return String(text).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  /* bolls.life ships verses as small HTML fragments: footnotes and Strong's numbers go,
     <br> becomes a newline, italics survive, everything else is escaped. */
  var ITALIC_OPEN = '\u0001i\u0001';
  var ITALIC_CLOSE = '\u0001/i\u0001';
  function cleanBollsText(text) {
    var marked = String(text)
      .replace(/<s>[\s\S]*?<\/s>/gi, '')
      .replace(/<sup>[\s\S]*?<\/sup>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(?:i|em)\b[^>]*>/gi, function (m) { return m.charAt(1) === '/' ? ITALIC_CLOSE : ITALIC_OPEN; })
      .replace(/<[^>]*>/g, '');
    return escapeScriptureText(marked)
      .split(ITALIC_OPEN).join('<i>')
      .split(ITALIC_CLOSE).join('</i>')
      .replace(/[ \t]*\n[ \t]*/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  }

  function flowText(text) {
    return String(text).replace(/\s*\n+\s*/g, ' ').trim();
  }

  /* A translation's section heading arrives inside the first verse it belongs to. Headings
     lead the verse, run short, Title Case, and carry no closing punctuation; anything else
     on its own line is poetry, and poetry flows. */
  function splitHeading(text) {
    var nl = text.indexOf('\n');
    if (nl < 1) return { heading: '', body: flowText(text) };
    var head = text.slice(0, nl).trim();
    var rest = text.slice(nl + 1);
    var plain = head.replace(/<[^>]*>/g, '').trim();
    if (!plain || plain.length > 64 || /[.!?;:,—]$/.test(plain) || !rest.trim()) {
      return { heading: '', body: flowText(text) };
    }
    if (!/^[A-Z]/.test(plain)) return { heading: '', body: flowText(text) };
    var titleCase = plain.split(/\s+/).every(function (w) { return w.length < 4 || /^[^a-z]/.test(w); });
    if (!titleCase) return { heading: '', body: flowText(text) };
    return { heading: head, body: flowText(rest) };
  }

  /* ---------- translation APIs ---------- */
  var SCRIPTURE_API_BASE = 'https://esmrsky-scripture-api.esmrsky.workers.dev';
  var TPT_VERSION_ID = 1849;
  var YOUVERSION_USFM_BOOKS = {
    1: 'GEN', 2: 'EXO', 3: 'LEV', 4: 'NUM', 5: 'DEU', 6: 'JOS', 7: 'JDG', 8: 'RUT',
    9: '1SA', 10: '2SA', 11: '1KI', 12: '2KI', 13: '1CH', 14: '2CH', 15: 'EZR',
    16: 'NEH', 17: 'EST', 18: 'JOB', 19: 'PSA', 20: 'PRO', 21: 'ECC', 22: 'SNG',
    23: 'ISA', 24: 'JER', 25: 'LAM', 26: 'EZK', 27: 'DAN', 28: 'HOS', 29: 'JOL',
    30: 'AMO', 31: 'OBA', 32: 'JON', 33: 'MIC', 34: 'NAM', 35: 'HAB', 36: 'ZEP',
    37: 'HAG', 38: 'ZEC', 39: 'MAL', 40: 'MAT', 41: 'MRK', 42: 'LUK', 43: 'JHN',
    44: 'ACT', 45: 'ROM', 46: '1CO', 47: '2CO', 48: 'GAL', 49: 'EPH', 50: 'PHP',
    51: 'COL', 52: '1TH', 53: '2TH', 54: '1TI', 55: '2TI', 56: 'TIT', 57: 'PHM',
    58: 'HEB', 59: 'JAS', 60: '1PE', 61: '2PE', 62: '1JN', 63: '2JN', 64: '3JN',
    65: 'JUD', 66: 'REV'
  };
  var chapterCache = {};
  var tptPassageCache = new Map();

  function toYouVersionPassage(ref) {
    var parsed = parseReference(ref);
    if (!parsed || !YOUVERSION_USFM_BOOKS[parsed.bookId]) return '';
    var passage = YOUVERSION_USFM_BOOKS[parsed.bookId] + '.' + parsed.chapter;
    if (parsed.verseStart !== null) {
      passage += '.' + parsed.verseStart;
      if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) passage += '-' + parsed.verseEnd;
    }
    return passage;
  }

  function fetchTptPassage(passage) {
    if (!tptPassageCache.has(passage)) {
      var url = SCRIPTURE_API_BASE + '/passage?version=' + TPT_VERSION_ID + '&passage=' + encodeURIComponent(passage);
      tptPassageCache.set(passage, fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (body) {
            if (!response.ok || !body.content) throw new Error(body.message || 'TPT could not be loaded.');
            return String(body.content).trim();
          });
        })
        .catch(function (error) {
          tptPassageCache.delete(passage);
          throw error;
        }));
    }
    return tptPassageCache.get(passage);
  }

  function fetchTptFromYouVersion(ref) {
    var passage = toYouVersionPassage(ref);
    if (!passage) return Promise.reject(new Error('Reference not recognized.'));
    return fetchTptPassage(passage).then(function (text) { return escapeScriptureText(text); });
  }

  /* The TPT source has no Pentateuch — those books read NIV instead, with a line saying so. */
  var TPT_MISSING_BOOKS = [2, 3, 4, 5];
  var TPT_FALLBACK_VERSION = 'NIV';
  var TPT_FALLBACK_NOTE = '<span class="verse-fallback-note">TPT does not carry this book — showing ' + TPT_FALLBACK_VERSION + '.</span>';

  function tptCoversBook(ref) {
    var parsed = parseReference(ref);
    return !parsed || TPT_MISSING_BOOKS.indexOf(parsed.bookId) === -1;
  }

  function getBollsChapter(version, bookId, chapter) {
    var cacheKey = version + '-' + bookId + '-' + chapter;
    if (!chapterCache[cacheKey]) {
      var url = 'https://bolls.life/get-text/' + version + '/' + bookId + '/' + chapter + '/';
      chapterCache[cacheKey] = fetch(url).then(function (res) {
        if (!res.ok) throw new Error('API error');
        return res.json();
      }).catch(function (e) {
        delete chapterCache[cacheKey];
        throw e;
      });
    }
    return chapterCache[cacheKey];
  }

  function fetchFromBolls(ref, version) {
    var parsed = parseReference(ref);
    if (!parsed) return Promise.resolve('Reference not recognized.');
    return getBollsChapter(version, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) return 'Verse not found.';
      var filtered;
      if (parsed.verseStart !== null) {
        if (parsed.verseEnd !== null) {
          filtered = verses.filter(function (v) { return v.verse >= parsed.verseStart && v.verse <= parsed.verseEnd; });
        } else {
          filtered = verses.filter(function (v) { return v.verse === parsed.verseStart; });
        }
      } else {
        filtered = verses.slice(0, 3);
      }
      if (!filtered.length) return 'Verse not found in ' + version + '.';
      return filtered.map(function (v) { return cleanBollsText(v.text); }).join(' ');
    }, function () {
      return 'Could not retrieve scripture text.';
    });
  }

  function loadVerseText(ref, version) {
    if (version !== 'TPT') return fetchFromBolls(ref, version);
    if (tptCoversBook(ref)) {
      return fetchTptFromYouVersion(ref).catch(function () {
        return fetchFromBolls(ref, TPT_FALLBACK_VERSION).then(function (t) { return t + '\n' + TPT_FALLBACK_NOTE; });
      });
    }
    return fetchFromBolls(ref, TPT_FALLBACK_VERSION).then(function (t) { return t + '\n' + TPT_FALLBACK_NOTE; });
  }

  /* ---------- passage context (the lightbox body) ---------- */
  var CONTEXT_RADIUS = 9;

  function loadBollsContext(parsed, version, radius) {
    return getBollsChapter(version, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) throw new Error('Verse not found.');
      var selectedStart = parsed.verseStart === null ? 1 : parsed.verseStart;
      var selectedEnd = parsed.verseEnd || selectedStart;
      var rangeStart = selectedStart - radius;
      var rangeEnd = selectedEnd + radius;
      var rows = verses
        .filter(function (v) { return v.verse >= rangeStart && v.verse <= rangeEnd; })
        .map(function (v) { return { chapter: parsed.chapter, verse: v.verse, text: v.text }; });

      var pre = Promise.resolve();
      /* A passage does not stop where the chapter file does. */
      if (rangeStart < 1 && parsed.chapter > 1) {
        pre = getBollsChapter(version, parsed.bookId, parsed.chapter - 1).catch(function () { return null; })
          .then(function (prev) {
            if (prev && prev.length) {
              var wanted = 1 - rangeStart;
              var tail = prev.slice(Math.max(0, prev.length - wanted));
              rows.unshift.apply(rows, tail.map(function (v) { return { chapter: parsed.chapter - 1, verse: v.verse, text: v.text }; }));
            }
          });
      }
      var post = Promise.resolve();
      if (rangeEnd > verses.length) {
        post = getBollsChapter(version, parsed.bookId, parsed.chapter + 1).catch(function () { return null; })
          .then(function (next) {
            if (next && next.length) {
              var headRows = next.slice(0, rangeEnd - verses.length);
              rows.push.apply(rows, headRows.map(function (v) { return { chapter: parsed.chapter + 1, verse: v.verse, text: v.text }; }));
            }
          });
      }
      return Promise.all([pre, post]).then(function () {
        return '<p class="context-passage">' + rows.map(function (v) {
          var selected = v.chapter === parsed.chapter && v.verse >= selectedStart && v.verse <= selectedEnd;
          var parts = splitHeading(cleanBollsText(v.text));
          var num = v.chapter === parsed.chapter ? String(v.verse) : v.chapter + ':' + v.verse;
          return (parts.heading ? '<b class="context-heading">' + parts.heading + '</b>' : '') +
            '<span class="context-verse' + (selected ? ' is-selected' : '') + '"><sup class="context-verse-number">' + num +
            '</sup><span class="ctx-t">' + parts.body + '</span></span>';
        }).join(' ') + '</p>';
      });
    });
  }

  function loadTptContext(parsed, radius) {
    var book = YOUVERSION_USFM_BOOKS[parsed.bookId];
    if (!book) return Promise.reject(new Error('Reference not recognized.'));
    var selectedStart = parsed.verseStart === null ? 1 : parsed.verseStart;
    var selectedEnd = parsed.verseEnd || selectedStart;
    var beforeStart = Math.max(1, selectedStart - radius);
    var afterEnd = selectedEnd + radius;
    var passage = function (start, end) { return book + '.' + parsed.chapter + '.' + start + (end > start ? '-' + end : ''); };
    var requests = [];

    if (beforeStart < selectedStart) {
      requests.push(fetchTptPassage(passage(beforeStart, selectedStart - 1)).then(function (text) {
        return '<span class="context-block">' + flowText(escapeScriptureText(text)) + '</span>';
      }));
    }
    requests.push(fetchTptPassage(passage(selectedStart, selectedEnd)).then(function (text) {
      return '<span class="context-block is-selected">' + flowText(escapeScriptureText(text)) + '</span>';
    }));
    requests.push(fetchTptPassage(passage(selectedEnd + 1, afterEnd)).then(function (text) {
      return '<span class="context-block">' + flowText(escapeScriptureText(text)) + '</span>';
    }));

    return Promise.allSettled(requests).then(function (results) {
      var blocks = results.filter(function (r) { return r.status === 'fulfilled'; }).map(function (r) { return r.value; });
      if (!blocks.length) throw new Error('Verse not found.');
      return '<p class="context-passage">' + blocks.join(' ') + '</p>';
    });
  }

  function loadVerseContext(ref, version, radius) {
    var parsed = parseReference(ref);
    if (!parsed) return Promise.reject(new Error('Reference not recognized.'));
    if (version !== 'TPT') return loadBollsContext(parsed, version, radius);
    if (TPT_MISSING_BOOKS.indexOf(parsed.bookId) === -1) {
      return loadTptContext(parsed, radius).catch(function () {
        return loadBollsContext(parsed, TPT_FALLBACK_VERSION, radius).then(function (html) {
          return html + '<p class="context-fallback-note">' + TPT_FALLBACK_NOTE + '</p>';
        });
      });
    }
    return loadBollsContext(parsed, TPT_FALLBACK_VERSION, radius).then(function (html) {
      return html + '<p class="context-fallback-note">' + TPT_FALLBACK_NOTE + '</p>';
    });
  }

  /* ---------- tooltip + dialog ---------- */
  var tooltipEl = null;
  var tooltipTimer = null;
  var tooltipPinned = false;
  var tooltipRequestId = 0;
  var tooltipLink = null;
  var tooltipRef = '';
  var contextDialogEl = null;
  var contextRequestId = 0;
  var contextVersionPicker = null;

  /* ---------- the passage dialog is a reader ----------
     Once a whole chapter is open in it, it is no longer a pop-up — it is somewhere you read for
     a few minutes, and it wants the same dials The Thread's dialog has. All three are scoped to
     the dialog by attributes on it, which is the cheap mechanism: `--ctx-fs` and the two
     attributes are inherited, so the stylesheet can transition `font-size` and `line-height` on
     the one block that moves. Nothing here goes near a document-wide view transition — on The
     Thread that is exactly what made the panel close under a second press. */
  var CTX_FACES = [
    ['text', 'Newsreader', 'serif, built for reading'],
    ['display', 'Cormorant', 'the site display serif'],
    ['sans', 'Inter', 'sans, high legibility']
  ];
  var CTX_LH = ['snug', 'normal', 'roomy'];
  var CTX_FS_STEPS = [0.88, 0.94, 1, 1.08, 1.18, 1.3];
  var ctxType = 'text', ctxLh = 'normal', ctxFsIndex = 2;

  function readingPanelHtml() {
    return '<span class="ctxp-head">Typeface</span>' +
      '<div class="ctxp-faces" data-ctxp="type">' +
      CTX_FACES.map(function (f) {
        return '<button type="button" data-v="' + f[0] + '" aria-pressed="false"' +
          ' title="' + f[1] + ' \u2014 ' + f[2] + '" aria-label="' + f[1] + ', ' + f[2] + '">' +
          '<b>A</b><i>a</i><span>' + f[1] + '</span></button>';
      }).join('') + '</div>' +
      '<span class="ctxp-head">Line height</span>' +
      '<div class="ctxp-seg" data-ctxp="lh">' +
      CTX_LH.map(function (v) {
        return '<button type="button" data-v="' + v + '" aria-pressed="false">' + v + '</button>';
      }).join('') + '</div>' +
      '<span class="ctxp-head">Text size <b class="ctxp-val">100%</b></span>' +
      '<div class="ctxp-step" data-ctxp="fs">' +
      '<button type="button" data-step="-1" aria-label="Smaller passage text"><span class="sz sz-sm">A</span></button>' +
      '<button type="button" data-step="1" aria-label="Larger passage text"><span class="sz sz-lg">A</span></button>' +
      '</div>' +
      '<div class="ctxp-foot"><button class="ctxp-reset" type="button" data-ctxp-reset>Reset</button></div>';
  }

  function markCtxButtons(group, value) {
    var wrap = contextDialogEl && contextDialogEl.querySelector('[data-ctxp="' + group + '"]');
    if (!wrap) return;
    wrap.querySelectorAll('button[data-v]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.v === value));
    });
  }

  function applyCtxType(v) {
    ctxType = CTX_FACES.some(function (f) { return f[0] === v; }) ? v : 'text';
    lsSet('faith-ctx-type', ctxType);
    markCtxButtons('type', ctxType);
    if (contextDialogEl) contextDialogEl.dataset.ctxType = ctxType;
  }

  function applyCtxLh(v) {
    ctxLh = CTX_LH.indexOf(v) >= 0 ? v : 'normal';
    lsSet('faith-ctx-lh', ctxLh);
    markCtxButtons('lh', ctxLh);
    if (contextDialogEl) contextDialogEl.dataset.ctxLh = ctxLh;
  }

  function applyCtxFs(i) {
    ctxFsIndex = Math.max(0, Math.min(CTX_FS_STEPS.length - 1, isNaN(i) ? 2 : i));
    lsSet('faith-ctx-fs', String(ctxFsIndex));
    if (!contextDialogEl) return;
    contextDialogEl.style.setProperty('--ctx-fs', String(CTX_FS_STEPS[ctxFsIndex]));
    var val = contextDialogEl.querySelector('.ctxp-val');
    if (val) val.textContent = Math.round(CTX_FS_STEPS[ctxFsIndex] * 100) + '%';
    contextDialogEl.querySelectorAll('[data-ctxp="fs"] button[data-step]').forEach(function (b) {
      var dir = +b.dataset.step;
      b.disabled = (dir < 0 && ctxFsIndex === 0) || (dir > 0 && ctxFsIndex === CTX_FS_STEPS.length - 1);
    });
  }

  function wireReadingPanel() {
    var wrap = contextDialogEl.querySelector('.ctxprefs');
    var btn = wrap.querySelector('.ctxprefs-btn');
    var menu = wrap.querySelector('.ctxprefs-menu');
    var close = function () { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); wrap.classList.remove('open'); };
    var open = function () { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); wrap.classList.add('open'); };

    btn.addEventListener('click', function (ev) { ev.stopPropagation(); menu.hidden ? open() : close(); });
    menu.addEventListener('click', function (ev) {
      ev.stopPropagation();
      if (ev.target.closest('[data-ctxp-reset]')) { applyCtxType('text'); applyCtxLh('normal'); applyCtxFs(2); return; }
      var step = ev.target.closest('[data-ctxp="fs"] button[data-step]');
      if (step) { applyCtxFs(ctxFsIndex + (+step.dataset.step)); return; }
      var b = ev.target.closest('[data-ctxp] button[data-v]');
      if (!b) return;
      if (b.closest('[data-ctxp]').dataset.ctxp === 'type') applyCtxType(b.dataset.v);
      else applyCtxLh(b.dataset.v);
    });
    /* The dialog is modal, so a click anywhere else in it is "outside" this panel. */
    contextDialogEl.addEventListener('click', function (ev) {
      if (!menu.hidden && !wrap.contains(ev.target)) close();
    });
    contextDialogEl.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !menu.hidden) { ev.stopPropagation(); ev.preventDefault(); close(); btn.focus(); }
    });

    var savedFs = parseInt(lsGet('faith-ctx-fs'), 10);
    applyCtxType(lsGet('faith-ctx-type') || 'text');
    applyCtxLh(lsGet('faith-ctx-lh') || 'normal');
    applyCtxFs(isNaN(savedFs) ? 2 : savedFs);
  }

  var GEAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 8h9M17.5 8H20M4 16h3.5M12 16h8"/><circle cx="15.2" cy="8" r="2.3"/><circle cx="9.7" cy="16" r="2.3"/></svg>';

  var BOOK_SVG = '<svg class="verpick-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.2C10 4.4 7 4.1 4 4.6V19c3-.5 6-.2 8 1.6 2-1.8 5-2.1 8-1.6V4.6c-3-.5-6-.2-8 1.6z"/><path d="M12 6.2v14.4"/></svg>';
  var CARET_SVG = '<svg class="verpick-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.8 5.5 5 5.5-5"/></svg>';

  function initTooltip() {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'verse-tooltip';
    document.body.appendChild(tooltipEl);

    contextDialogEl = document.createElement('dialog');
    contextDialogEl.className = 'verse-context-dialog';
    contextDialogEl.tabIndex = -1;
    contextDialogEl.innerHTML =
      '<div class="context-dialog-inner">' +
      '  <header class="context-dialog-head"><div><span class="label smallcaps">See in context</span><h3></h3></div>' +
      '  <div class="context-dialog-actions"><div class="verpick context-verpick">' +
      '    <button class="verpick-btn" type="button" aria-haspopup="listbox" aria-expanded="false" title="Bible translation">' +
      BOOK_SVG +
      '      <span class="verpick-val">' + ACTIVE_VERSION + '</span>' +
      CARET_SVG +
      '    </button><div class="verpick-menu" role="listbox" aria-label="Bible translation" hidden></div></div>' +
      '    <div class="ctxprefs">' +
      '      <button class="ctxprefs-btn" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="Reading settings" title="Reading settings">' + GEAR_SVG + '</button>' +
      '      <div class="ctxprefs-menu" role="dialog" aria-label="Reading settings" hidden>' + readingPanelHtml() + '</div>' +
      '    </div>' +
      '    <button class="context-dialog-close" type="button" aria-label="Close">' +
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6.6 6.6l10.8 10.8M17.4 6.6 6.6 17.4"/></svg>' +
      '    </button></div></header>' +
      '  <div class="context-dialog-body" aria-live="polite"></div>' +
      '  <footer class="context-dialog-foot"><button class="context-more-button" type="button">Even more context</button></footer>' +
      '</div>';
    document.body.appendChild(contextDialogEl);
    var contextPickerWrap = contextDialogEl.querySelector('.context-verpick');
    contextPickerWrap.querySelector('.verpick-menu').innerHTML = versionMenuHtml('Read in');
    wireReadingPanel();
    contextVersionPicker = wireVersionPicker(contextPickerWrap, function (code) {
      contextDialogEl.dataset.version = code;
      refreshVerseContext(true);
      refreshLiveVerses();
    });

    if (!HOVER_CAPABLE) {
      tooltipEl.addEventListener('mouseenter', function () {
        if (tooltipTimer) clearTimeout(tooltipTimer);
      });
      tooltipEl.addEventListener('mouseleave', function () { hideTooltip(); });
    }

    document.body.addEventListener('mouseover', function (ev) {
      if (tooltipPinned) return;
      var link = ev.target.closest('.ref-link');
      if (!link) return;
      if (link.hasAttribute('data-written')) return;   /* the verse is already on the page */
      var ref = link.dataset.ref || link.textContent;
      if (!ref) return;
      showTooltip(link, ref, false);
    });

    document.body.addEventListener('mouseout', function (ev) {
      var link = ev.target.closest('.ref-link');
      if (!link) return;
      hideTooltip();
    });

    document.body.addEventListener('click', function (ev) {
      var link = ev.target.closest('.ref-link');
      if (link) {
        ev.preventDefault();
        var ref = link.dataset.ref || link.textContent;
        if (!ref) return;
        /* On touch the first tap normally pins the little pop-up, because there was no hover
           to show the verse. Under a verse that is already printed there is nothing for that
           tap to reveal, so it goes straight to the passage — the same place the pointer
           click goes, and the only thing the reader could still be asking for. */
        if (HOVER_CAPABLE || link.hasAttribute('data-written')) {
          openVerseContext(ref, getVersion());
          hideTooltip(true);
        } else {
          showTooltip(link, ref, true);
        }
        return;
      }
      var contextButton = ev.target.closest('.tooltip-context-button');
      if (contextButton) {
        openVerseContext(contextButton.dataset.ref, contextButton.dataset.version);
        hideTooltip(true);
        return;
      }
      if (tooltipPinned && !ev.target.closest('.verse-tooltip') && !ev.target.closest('.verpick')) hideTooltip(true);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' || !tooltipPinned) return;
      if (contextDialogEl && contextDialogEl.open) return;
      if (document.querySelector('.verpick.open')) return;
      ev.preventDefault();
      hideTooltip(true);
    });

    contextDialogEl.querySelector('.context-dialog-close').addEventListener('click', function () { contextDialogEl.close(); });
    contextDialogEl.querySelector('.context-more-button').addEventListener('click', function () {
      contextDialogEl.dataset.radius = String((parseInt(contextDialogEl.dataset.radius, 10) || CONTEXT_RADIUS) + 8);
      refreshVerseContext(true);
    });
    contextDialogEl.addEventListener('close', function () {
      if (contextVersionPicker) contextVersionPicker.close();
    });
    contextDialogEl.addEventListener('click', function (ev) {
      if (ev.target === contextDialogEl) contextDialogEl.close();
    });
  }

  function refreshPinnedTooltip() {
    if (!tooltipPinned || !tooltipLink || !tooltipRef) return;
    if (!tooltipLink.isConnected) return;
    fillTooltip(tooltipRef, getVersion(), ++tooltipRequestId);
  }

  function positionTooltip(link) {
    var rect = link.getBoundingClientRect();
    var scrollY = window.scrollY || window.pageYOffset;
    var scrollX = window.scrollX || window.pageXOffset;
    var width = Math.min(350, window.innerWidth - 28);
    var roomBelow = window.innerHeight - rect.bottom;
    var below = roomBelow > 190 || roomBelow > rect.top;
    if (below) {
      tooltipEl.style.top = (scrollY + rect.bottom + 8) + 'px';
      tooltipEl.style.transform = 'none';
    } else {
      tooltipEl.style.top = (scrollY + rect.top - 8) + 'px';
      tooltipEl.style.transform = 'translateY(-100%)';
    }
    tooltipEl.style.left = Math.max(scrollX + 14, Math.min(scrollX + rect.left, scrollX + window.innerWidth - width - 14)) + 'px';
  }

  function fillTooltip(ref, version, requestId) {
    var box = tooltipEl.querySelector('.tooltip-text');
    if (box) box.classList.add('is-loading');
    var label = tooltipEl.querySelector('.tooltip-ref');
    if (label) label.textContent = ref + ' (' + version + ')';
    var button = tooltipEl.querySelector('.tooltip-context-button');
    if (button) { button.dataset.ref = ref; button.dataset.version = version; }
    return loadVerseText(ref, version).then(function (text) {
      if (requestId !== tooltipRequestId) return;
      var b = tooltipEl.querySelector('.tooltip-text');
      if (b) { b.classList.remove('is-loading'); b.innerHTML = text; }
    }).catch(function () {
      if (requestId !== tooltipRequestId) return;
      var b = tooltipEl.querySelector('.tooltip-text');
      if (b) { b.classList.remove('is-loading'); b.innerHTML = '<span style="color:var(--c-fear)">Unable to load verse.</span>'; }
    });
  }

  function tooltipActionHtml(ref, version) {
    if (HOVER_CAPABLE) return '<div class="tooltip-actions is-hint">Click the reference to read it in context</div>';
    return '<div class="tooltip-actions"><button class="tooltip-context-button" type="button" data-ref="' +
      escapeScriptureText(ref) + '" data-version="' + version + '">See in context</button></div>';
  }

  function showTooltip(link, ref, pinned) {
    if (tooltipTimer) clearTimeout(tooltipTimer);
    tooltipPinned = Boolean(pinned);
    tooltipLink = link;
    tooltipRef = ref;
    var requestId = ++tooltipRequestId;
    var version = getVersion();
    positionTooltip(link);
    tooltipEl.innerHTML =
      '<span class="tooltip-ref">' + escapeScriptureText(ref) + ' (' + version + ')</span>' +
      '<div class="tooltip-text is-loading">Reading…</div>' +
      tooltipActionHtml(ref, version);
    tooltipEl.classList.toggle('is-pinned', tooltipPinned);
    tooltipEl.classList.add('open');
    fillTooltip(ref, version, requestId);
  }

  function hideTooltip(force) {
    if (tooltipPinned && !force) return;
    tooltipTimer = setTimeout(function () {
      tooltipPinned = false;
      tooltipEl.classList.remove('open');
      tooltipEl.classList.remove('is-pinned');
    }, HOVER_CAPABLE ? 60 : 200);
  }

  function refreshVerseContext(preserveSelection) {
    if (!contextDialogEl) return;
    var ref = contextDialogEl.dataset.ref;
    var version = contextDialogEl.dataset.version || getVersion();
    var radius = parseInt(contextDialogEl.dataset.radius, 10) || CONTEXT_RADIUS;
    if (!ref) return;
    var requestId = ++contextRequestId;
    var body = contextDialogEl.querySelector('.context-dialog-body');
    var moreButton = contextDialogEl.querySelector('.context-more-button');
    var selectedBefore = preserveSelection && body.querySelector('.is-selected');
    var selectedOffsetBefore = selectedBefore ? selectedBefore.offsetTop : 0;
    var scrollBefore = body.scrollTop;
    if (!preserveSelection) body.innerHTML = '<p class="context-loading">Loading surrounding verses…</p>';
    else { body.style.minHeight = body.offsetHeight + 'px'; body.classList.add('is-refreshing'); }
    moreButton.disabled = true;
    moreButton.textContent = preserveSelection ? 'Loading more…' : 'Even more context';

    loadVerseContext(ref, version, radius).then(function (html) {
      if (requestId !== contextRequestId) return;
      body.classList.remove('is-refreshing');
      body.innerHTML = html;
      requestAnimationFrame(function () { body.style.minHeight = ''; });
      if (preserveSelection) {
        var selectedAfter = body.querySelector('.is-selected');
        if (selectedAfter) body.scrollTop = scrollBefore + selectedAfter.offsetTop - selectedOffsetBefore;
      }
      moreButton.disabled = false;
      moreButton.textContent = 'Even more context';
    }).catch(function () {
      if (requestId !== contextRequestId) return;
      body.classList.remove('is-refreshing');
      body.style.minHeight = '';
      body.innerHTML = '<p>Unable to load the surrounding verses right now.</p>';
      moreButton.disabled = false;
      moreButton.textContent = 'Even more context';
    });
  }

  function openVerseContext(ref, version) {
    if (!contextDialogEl || !ref) return;
    version = version || getVersion();
    contextDialogEl.dataset.ref = ref;
    contextDialogEl.dataset.version = version;
    contextDialogEl.dataset.radius = String(CONTEXT_RADIUS);
    contextDialogEl.querySelector('h3').textContent = formatReferenceTitle(ref);
    applyVersion(version);
    var body = contextDialogEl.querySelector('.context-dialog-body');
    body.scrollTop = 0;
    if (!contextDialogEl.open) {
      if (typeof contextDialogEl.showModal === 'function') contextDialogEl.showModal();
      else contextDialogEl.setAttribute('open', '');
    }
    contextDialogEl.focus({ preventScroll: true });
    refreshVerseContext(false);
  }

  /* ---------- live verses: [data-verse] blocks follow the picker ---------- */
  var liveVerseEls = [];

  function swapVerse(el, version) {
    var ref = el.dataset.verse;
    if (!ref) return;
    el.classList.add('is-swapping');
    var token = version + '|' + ref;
    el.dataset.pending = token;
    loadVerseText(ref, version).then(function (text) {
      if (el.dataset.pending !== token) return;
      /* Errors keep the built-in fallback text rather than replacing scripture with an apology. */
      if (/^(Could not retrieve|Verse not found|Reference not recognized)/.test(text)) {
        el.classList.remove('is-swapping');
        return;
      }
      /* A translation's section heading rides inside the first verse ("By Faith<br/>Now
         faith is…") — folded into a flowing quote it reads as stray words. Strip it. */
      var parts = splitHeading(text.replace(/<span class="verse-fallback-note">[\s\S]*?<\/span>/, ''));
      var flowed = flowText(parts.body);
      var note = /verse-fallback-note/.test(text) ? TPT_FALLBACK_NOTE : '';
      el.innerHTML = '“' + flowed.replace(/^[“"]+|[”"]+$/g, '') + '”' + note;
      el.dataset.loaded = version;
      el.classList.remove('is-swapping');
    }).catch(function () {
      el.classList.remove('is-swapping');
    });
  }

  function refreshLiveVerses() {
    var version = getVersion();
    liveVerseEls.forEach(function (el) {
      if (el.dataset.loaded && el.dataset.loaded !== version) swapVerse(el, version);
    });
  }

  function initLiveVerses() {
    liveVerseEls = Array.from(document.querySelectorAll('[data-verse]'));
    if (!liveVerseEls.length) return;
    if (!('IntersectionObserver' in window)) {
      liveVerseEls.forEach(function (el) { swapVerse(el, getVersion()); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        swapVerse(entry.target, getVersion());
      });
    }, { rootMargin: '600px 0px' });
    liveVerseEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- boot ---------- */
  function initNavVersionPicker() {
    var wrap = document.getElementById('verpick');
    if (!wrap) return;
    var menu = wrap.querySelector('.verpick-menu');
    if (menu) menu.innerHTML = versionMenuHtml('Verses read in');
    wireVersionPicker(wrap, function () {
      refreshPinnedTooltip();
      refreshLiveVerses();
    });
  }

  function init() {
    var saved = lsGet('faith-version');
    if (saved && VERSIONS.some(function (v) { return v.code === saved; })) ACTIVE_VERSION = saved;
    document.querySelectorAll('[data-autolink]').forEach(function (el) { autoLink(el); });
    initTooltip();
    initNavVersionPicker();
    initLiveVerses();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* Small public surface for the miracles page (re-link after re-render). */
  window.FaithScripture = {
    autoLink: autoLink,
    linkRefsHtml: linkRefsHtml,
    refLink: refLink,
    getVersion: getVersion,
    refreshLiveVerses: refreshLiveVerses
  };
})();
