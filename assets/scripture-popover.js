/* Shared scripture layer: hover/tap verse pop-ups, a translation picker, and a
   "see in context" dialog. Ported from the-thread's implementation so the pages
   that were only linking out to Bible Gateway can read the text in place.

   Behaviour only — every colour, font and radius comes from CSS custom properties
   the host page defines, because these sites are separate works and deliberately
   do not share a design language.

   Two suppliers, same as the rest of the estate:
     bolls.life  — NIV/NASB/ESV/KJV/NLT/AMP/MSG, and НРП on the Russian pages. CORS *, no key.
     the Worker  — TPT only (YouVersion); bolls does not carry it.

   Usage:
     EsmrskyScripture.init({ key: 'the-word', scan: '.source, .note b' });
*/
(function () {
  'use strict';

  var WORKER = 'https://esmrsky-scripture-api.esmrsky.workers.dev';
  var TPT_ID = 1849;

  /* ---------------------------------------------------------------- books */
  /* One table drives all four consumers: the link regex, the bolls book id, the
     USFM code TPT needs, and the full name the context dialog shows. `names`
     carries every spelling that appears in the copy across these pages — spelled
     out and abbreviated — and `n` separates the numbered volumes so "2 Kings"
     and a bare "Kings" resolve apart. */
  var BOOKS = [
    { id: 1, usfm: 'GEN', full: 'Genesis', ru: 'Бытие', names: ['Gen', 'Genesis'], runames: ['Быт', 'Бытие'] },
    { id: 2, usfm: 'EXO', full: 'Exodus', ru: 'Исход', names: ['Ex', 'Exod', 'Exodus'], runames: ['Исх', 'Исход'] },
    { id: 3, usfm: 'LEV', full: 'Leviticus', ru: 'Левит', names: ['Lev', 'Leviticus'], runames: ['Лев', 'Левит'] },
    { id: 4, usfm: 'NUM', full: 'Numbers', ru: 'Числа', names: ['Num', 'Numbers'], runames: ['Чис', 'Числа'] },
    { id: 5, usfm: 'DEU', full: 'Deuteronomy', ru: 'Второзаконие', names: ['Deut', 'Deuteronomy'], runames: ['Втор', 'Второзаконие'] },
    { id: 6, usfm: 'JOS', full: 'Joshua', ru: 'Иисус Навин', names: ['Josh', 'Joshua'], runames: ['Нав'] },
    { id: 7, usfm: 'JDG', full: 'Judges', ru: 'Судьи', names: ['Judg', 'Judges'], runames: ['Суд', 'Судей'] },
    { id: 8, usfm: 'RUT', full: 'Ruth', ru: 'Руфь', names: ['Ruth'], runames: ['Руфь'] },
    { id: 9, usfm: '1SA', full: '1 Samuel', n: 1, rn: 1, names: ['Sam', 'Samuel'], runames: ['Цар', 'Царств'] },
    { id: 10, usfm: '2SA', full: '2 Samuel', n: 2, rn: 2, names: ['Sam', 'Samuel'], runames: ['Цар', 'Царств'] },
    { id: 11, usfm: '1KI', full: '1 Kings', n: 1, rn: 3, names: ['Kgs', 'Kings'], runames: ['Цар', 'Царств'] },
    { id: 12, usfm: '2KI', full: '2 Kings', n: 2, rn: 4, names: ['Kgs', 'Kings'], runames: ['Цар', 'Царств'] },
    { id: 13, usfm: '1CH', full: '1 Chronicles', n: 1, names: ['Chr', 'Chronicles'], runames: ['Пар', 'Паралипоменон'] },
    { id: 14, usfm: '2CH', full: '2 Chronicles', n: 2, names: ['Chr', 'Chronicles'], runames: ['Пар', 'Паралипоменон'] },
    { id: 15, usfm: 'EZR', full: 'Ezra', ru: 'Ездра', names: ['Ezra'], runames: ['Езд', 'Ездры'] },
    { id: 16, usfm: 'NEH', full: 'Nehemiah', ru: 'Неемия', names: ['Neh', 'Nehemiah'], runames: ['Неем', 'Неемии'] },
    { id: 17, usfm: 'EST', full: 'Esther', ru: 'Есфирь', names: ['Esth', 'Esther'], runames: ['Есф', 'Есфирь'] },
    { id: 18, usfm: 'JOB', full: 'Job', ru: 'Иов', names: ['Job'], runames: ['Иов', 'Иова'] },
    { id: 19, usfm: 'PSA', full: 'Psalms', ru: 'Псалтирь', names: ['Ps', 'Psalm', 'Psalms'], runames: ['Пс', 'Псалом', 'Псалтирь'] },
    { id: 20, usfm: 'PRO', full: 'Proverbs', ru: 'Притчи', names: ['Prov', 'Proverbs'], runames: ['Притч', 'Притчи'] },
    { id: 21, usfm: 'ECC', full: 'Ecclesiastes', ru: 'Екклесиаст', names: ['Eccl', 'Ecclesiastes'], runames: ['Екк', 'Екклесиаст'] },
    { id: 22, usfm: 'SNG', full: 'Song of Songs', ru: 'Песнь Песней', names: ['Song'], runames: ['Песн'] },
    { id: 23, usfm: 'ISA', full: 'Isaiah', ru: 'Исаия', names: ['Isa', 'Isaiah'], runames: ['Ис', 'Исаия'] },
    { id: 24, usfm: 'JER', full: 'Jeremiah', ru: 'Иеремия', names: ['Jer', 'Jeremiah'], runames: ['Иер', 'Иеремия'] },
    { id: 25, usfm: 'LAM', full: 'Lamentations', ru: 'Плач Иеремии', names: ['Lam', 'Lamentations'], runames: ['Плач'] },
    { id: 26, usfm: 'EZK', full: 'Ezekiel', ru: 'Иезекииль', names: ['Ezek', 'Ezekiel'], runames: ['Иез', 'Иезекииль'] },
    { id: 27, usfm: 'DAN', full: 'Daniel', ru: 'Даниил', names: ['Dan', 'Daniel'], runames: ['Дан', 'Даниил'] },
    { id: 28, usfm: 'HOS', full: 'Hosea', ru: 'Осия', names: ['Hos', 'Hosea'], runames: ['Ос', 'Осия'] },
    { id: 29, usfm: 'JOL', full: 'Joel', ru: 'Иоиль', names: ['Joel'], runames: ['Иоиль'] },
    { id: 30, usfm: 'AMO', full: 'Amos', ru: 'Амос', names: ['Amos'], runames: ['Ам', 'Амос'] },
    { id: 31, usfm: 'OBA', full: 'Obadiah', ru: 'Авдий', names: ['Obad', 'Obadiah'], runames: ['Авд', 'Авдия'] },
    { id: 32, usfm: 'JON', full: 'Jonah', ru: 'Иона', names: ['Jonah'], runames: ['Иона', 'Ионы'] },
    { id: 33, usfm: 'MIC', full: 'Micah', ru: 'Михей', names: ['Mic', 'Micah'], runames: ['Мих', 'Михей'] },
    { id: 34, usfm: 'NAM', full: 'Nahum', ru: 'Наум', names: ['Nah', 'Nahum'], runames: ['Наум'] },
    { id: 35, usfm: 'HAB', full: 'Habakkuk', ru: 'Аввакум', names: ['Hab', 'Habakkuk'], runames: ['Авв', 'Аввакум'] },
    { id: 36, usfm: 'ZEP', full: 'Zephaniah', ru: 'Софония', names: ['Zeph', 'Zephaniah'], runames: ['Соф', 'Софония'] },
    { id: 37, usfm: 'HAG', full: 'Haggai', ru: 'Аггей', names: ['Hag', 'Haggai'], runames: ['Агг', 'Аггей'] },
    { id: 38, usfm: 'ZEC', full: 'Zechariah', ru: 'Захария', names: ['Zech', 'Zechariah'], runames: ['Зах', 'Захария'] },
    { id: 39, usfm: 'MAL', full: 'Malachi', ru: 'Малахия', names: ['Mal', 'Malachi'], runames: ['Мал', 'Малахия'] },
    { id: 40, usfm: 'MAT', full: 'Matthew', ru: 'От Матфея', names: ['Matt', 'Matthew'], runames: ['Мф', 'Матфея'] },
    { id: 41, usfm: 'MRK', full: 'Mark', ru: 'От Марка', names: ['Mark'], runames: ['Мк', 'Марка'] },
    { id: 42, usfm: 'LUK', full: 'Luke', ru: 'От Луки', names: ['Luke'], runames: ['Лк', 'Луки'] },
    { id: 43, usfm: 'JHN', full: 'John', ru: 'От Иоанна', names: ['John'], runames: ['Ин', 'Иоанна'] },
    { id: 44, usfm: 'ACT', full: 'Acts', ru: 'Деяния', names: ['Acts'], runames: ['Деян', 'Деяния'] },
    { id: 45, usfm: 'ROM', full: 'Romans', ru: 'Римлянам', names: ['Rom', 'Romans'], runames: ['Рим', 'Римлянам'] },
    { id: 46, usfm: '1CO', full: '1 Corinthians', n: 1, names: ['Cor', 'Corinthians'], runames: ['Кор', 'Коринфянам'] },
    { id: 47, usfm: '2CO', full: '2 Corinthians', n: 2, names: ['Cor', 'Corinthians'], runames: ['Кор', 'Коринфянам'] },
    { id: 48, usfm: 'GAL', full: 'Galatians', ru: 'Галатам', names: ['Gal', 'Galatians'], runames: ['Гал', 'Галатам'] },
    { id: 49, usfm: 'EPH', full: 'Ephesians', ru: 'Ефесянам', names: ['Eph', 'Ephesians'], runames: ['Еф', 'Ефесянам'] },
    { id: 50, usfm: 'PHP', full: 'Philippians', ru: 'Филиппийцам', names: ['Phil', 'Philippians'], runames: ['Флп', 'Филиппийцам'] },
    { id: 51, usfm: 'COL', full: 'Colossians', ru: 'Колоссянам', names: ['Col', 'Colossians'], runames: ['Кол', 'Колоссянам'] },
    { id: 52, usfm: '1TH', full: '1 Thessalonians', n: 1, names: ['Thess', 'Thessalonians'], runames: ['Фес', 'Фессалоникийцам'] },
    { id: 53, usfm: '2TH', full: '2 Thessalonians', n: 2, names: ['Thess', 'Thessalonians'], runames: ['Фес', 'Фессалоникийцам'] },
    { id: 54, usfm: '1TI', full: '1 Timothy', n: 1, names: ['Tim', 'Timothy'], runames: ['Тим', 'Тимофею'] },
    { id: 55, usfm: '2TI', full: '2 Timothy', n: 2, names: ['Tim', 'Timothy'], runames: ['Тим', 'Тимофею'] },
    { id: 56, usfm: 'TIT', full: 'Titus', ru: 'Титу', names: ['Titus'], runames: ['Тит', 'Титу'] },
    { id: 57, usfm: 'PHM', full: 'Philemon', ru: 'Филимону', names: ['Philem', 'Philemon'], runames: ['Флм', 'Филимону'] },
    { id: 58, usfm: 'HEB', full: 'Hebrews', ru: 'Евреям', names: ['Heb', 'Hebrews'], runames: ['Евр', 'Евреям'] },
    { id: 59, usfm: 'JAS', full: 'James', ru: 'Иакова', names: ['Jas', 'James'], runames: ['Иак', 'Иакова'] },
    { id: 60, usfm: '1PE', full: '1 Peter', n: 1, names: ['Pet', 'Peter'], runames: ['Пет', 'Петра'] },
    { id: 61, usfm: '2PE', full: '2 Peter', n: 2, names: ['Pet', 'Peter'], runames: ['Пет', 'Петра'] },
    { id: 62, usfm: '1JN', full: '1 John', n: 1, names: ['John'], runames: ['Ин', 'Иоанна'] },
    { id: 63, usfm: '2JN', full: '2 John', n: 2, names: ['John'], runames: ['Ин', 'Иоанна'] },
    { id: 64, usfm: '3JN', full: '3 John', n: 3, names: ['John'], runames: ['Ин', 'Иоанна'] },
    { id: 65, usfm: 'JUD', full: 'Jude', ru: 'Иуды', names: ['Jude'], runames: ['Иуд', 'Иуды'] },
    { id: 66, usfm: 'REV', full: 'Revelation', ru: 'Откровение', names: ['Rev', 'Revelation'], runames: ['Откр', 'Откровение'] }
  ];

  /* name -> { 0: unnumbered id, 1: "1 X", ... }. English and Russian keep separate
     slot maps because the two traditions number the same books differently: English
     has 1-2 Samuel and 1-2 Kings, Russian counts all four as 1-4 Царств. Sharing one
     map made "2 Kings" resolve to 1 Kings. */
  var BY_NAME = {};
  var RU_BY_NAME = {};
  var FULL_BY_ID = {};
  var RU_FULL_BY_ID = {};
  var USFM_BY_ID = {};
  BOOKS.forEach(function (b) {
    FULL_BY_ID[b.id] = b.full;
    USFM_BY_ID[b.id] = b.usfm;
    var ruVolume = b.rn || b.n;
    RU_FULL_BY_ID[b.id] = b.ru || (ruVolume ? ruVolume + ' ' + b.runames[b.runames.length - 1] : b.runames[b.runames.length - 1]);
    (b.names || []).forEach(function (name) {
      (BY_NAME[name] || (BY_NAME[name] = {}))[b.n || 0] = b.id;
    });
    (b.runames || []).forEach(function (name) {
      (RU_BY_NAME[name] || (RU_BY_NAME[name] = {}))[ruVolume || 0] = b.id;
    });
  });

  /* Longest name first, so "Isaiah 53" matches Isaiah rather than backtracking into "Isa". */
  var ALL_NAMES = [];
  BOOKS.forEach(function (b) { ALL_NAMES = ALL_NAMES.concat(b.names || [], b.runames || []); });
  ALL_NAMES = ALL_NAMES.filter(function (v, i, a) { return a.indexOf(v) === i; })
    .sort(function (a, b) { return b.length - a.length; });
  var NAME_PATTERN = ALL_NAMES.join('|');
  /* The optional trailing "." lets the Russian abbreviations ("Мф. 16:18") match. */
  var REF_BODY = '(?:[123]\\s)?(?:' + NAME_PATTERN + ')\\.?\\s\\d+(?::\\d+(?:[-–]\\d+)?)?';
  var REF_RE = new RegExp('(' + REF_BODY + ')', 'g');
  var PARSE_RE = new RegExp('^([123])?\\s?(' + NAME_PATTERN + ')\\.?\\s(\\d+)(?::(\\d+)(?:[-–](\\d+))?)?');
  var BOOK_ONLY_RE = new RegExp('^(?:[123]\\s)?(?:' + NAME_PATTERN + ')\\.?');
  var CONT_RE = /(\s*[·;,]\s*)(\d+:\d+(?:[-–]\d+)?)/g;

  function parseReference(refStr) {
    var match = String(refStr).trim().match(PARSE_RE);
    if (!match) return null;
    /* A Cyrillic name can only be a Russian spelling, so the map is chosen by the
       name itself rather than by the page's language: an English page quoting a
       Russian abbreviation still resolves. */
    var slot = (/[А-Яа-яЁё]/.test(match[2]) ? RU_BY_NAME : BY_NAME)[match[2]];
    if (!slot) return null;
    var num = match[1] ? parseInt(match[1], 10) : 0;
    var bookId = slot[num] !== undefined ? slot[num]
      : slot[0] !== undefined ? slot[0]
        : slot[Object.keys(slot)[0]];
    if (!bookId) return null;
    return {
      bookId: bookId,
      chapter: parseInt(match[3], 10),
      verseStart: match[4] ? parseInt(match[4], 10) : null,
      verseEnd: match[5] ? parseInt(match[5], 10) : null
    };
  }

  /* "Prov 11:14 · 15:22" is one label but two lookups, and the second one inherits
     the book from the first. */
  function splitReferenceGroup(refs) {
    var parts = String(refs).split(/\s*[;·]\s*/).filter(Boolean);
    var lastBook = '';
    var out = [];
    var bookRe = new RegExp('^((?:[123]\\s)?(?:' + NAME_PATTERN + ')\\.?)\\s+\\d');
    parts.forEach(function (part) {
      part = part.trim();
      var book = part.match(bookRe);
      if (book) lastBook = book[1];
      else if (lastBook && /^\d/.test(part)) part = lastBook + ' ' + part;
      out.push(part);
    });
    return out;
  }

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* -------------------------------------------------------------- versions */
  var EN_VERSIONS = [
    { code: 'NIV', full: 'New International Version' },
    { code: 'NASB', full: 'New American Standard' },
    { code: 'ESV', full: 'English Standard Version' },
    { code: 'KJV', full: 'King James Version' },
    { code: 'NLT', full: 'New Living Translation' },
    { code: 'AMP', full: 'Amplified Bible' },
    { code: 'MSG', full: 'The Message' },
    { code: 'TPT', full: 'The Passion Translation' }
  ];
  /* Only one published Russian translation is used across the estate, so on the
     Russian pages the picker states what you are reading rather than offering a choice. */
  var RU_VERSIONS = [{ code: 'НРП', full: 'Новый русский перевод', bolls: 'NRT' }];

  var cfg = { key: 'esmrsky', scan: '', lang: 'en' };
  var VERSIONS = EN_VERSIONS;
  var active = 'NIV';
  var listeners = [];

  function isRu() { return cfg.lang === 'ru'; }
  function t(en, ru) { return isRu() ? ru : en; }
  function bollsCode(code) {
    var v = VERSIONS.filter(function (x) { return x.code === code; })[0];
    return (v && v.bolls) || code;
  }

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* preferences just will not persist */ } }

  function getVersion() { return active; }
  function setVersion(code) {
    if (!VERSIONS.some(function (v) { return v.code === code; })) return;
    active = code;
    lsSet(cfg.key + '-scripture-version', code);
    document.querySelectorAll('.esv-pick-val').forEach(function (el) { el.textContent = code; });
    document.querySelectorAll('.esv-pick-opt').forEach(function (o) {
      o.setAttribute('aria-selected', String(o.dataset.v === code));
    });
    document.querySelectorAll('.esv-ref').forEach(function (a) { a.href = bgUrl(a.dataset.ref || a.textContent); });
    refreshPinned();
    listeners.forEach(function (fn) { try { fn(code); } catch (e) { /* a host callback must not break the picker */ } });
  }

  /* ------------------------------------------------------------- suppliers */
  var chapterCache = {};
  var tptCache = {};

  function bollsChapter(version, bookId, chapter) {
    var key = version + '-' + bookId + '-' + chapter;
    if (!chapterCache[key]) {
      chapterCache[key] = fetch('https://bolls.life/get-text/' + version + '/' + bookId + '/' + chapter + '/')
        .then(function (r) { if (!r.ok) throw new Error('API error'); return r.json(); })
        .catch(function (e) { delete chapterCache[key]; throw e; });
    }
    return chapterCache[key];
  }

  /* bolls ships verses as small HTML fragments. Stripping every tag to '' glues words
     together at line breaks and lets <sup> footnote text leak in as verse words. So:
     footnotes and Strong's numbers go entirely, <br> becomes a real newline (the box
     renders `white-space: pre-line`), italics survive, and everything else is escaped.
     The sentinels are strings no scripture text contains and no escape touches. */
  var I_OPEN = '@@ESVI@@';
  var I_CLOSE = '@@ESV/I@@';
  function cleanBolls(text) {
    var marked = String(text)
      .replace(/<s>[\s\S]*?<\/s>/gi, '')
      .replace(/<sup>[\s\S]*?<\/sup>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?(?:i|em)\b[^>]*>/gi, function (m) { return m.charAt(1) === '/' ? I_CLOSE : I_OPEN; })
      .replace(/<[^>]*>/g, '');
    return esc(marked)
      .split(I_CLOSE).join('</i>')
      .split(I_OPEN).join('<i>')
      .replace(/[ \t]*\n[ \t]*/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  }

  function toUsfm(parsed) {
    var book = USFM_BY_ID[parsed.bookId];
    if (!book) return '';
    var p = book + '.' + parsed.chapter;
    if (parsed.verseStart !== null) {
      p += '.' + parsed.verseStart;
      if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) p += '-' + parsed.verseEnd;
    }
    return p;
  }

  function tptPassage(passage) {
    if (!tptCache[passage]) {
      tptCache[passage] = fetch(WORKER + '/passage?version=' + TPT_ID + '&passage=' + encodeURIComponent(passage),
        { headers: { Accept: 'application/json' } })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (b) {
            if (!r.ok || !b.content) throw new Error(b.message || 'TPT could not be loaded.');
            return String(b.content).trim();
          });
        })
        .catch(function (e) { delete tptCache[passage]; throw e; });
    }
    return tptCache[passage];
  }

  /* The TPT source has no Pentateuch — Exodus through Deuteronomy 404 — so those
     books skip the request and read NIV instead, with a line saying so. */
  var TPT_MISSING = [2, 3, 4, 5];
  var FALLBACK = 'NIV';

  function fallbackNote() {
    return '<span class="esv-note">' + t(
      'TPT does not carry this book — showing ' + FALLBACK + '.',
      'В TPT этой книги нет — показан ' + FALLBACK + '.') + '</span>';
  }

  function loadVerse(ref, version) {
    var parsed = parseReference(ref);
    if (!parsed) return Promise.resolve(t('Reference not recognized.', 'Ссылка не распознана.'));
    if (version === 'TPT') {
      if (TPT_MISSING.indexOf(parsed.bookId) === -1) {
        return tptPassage(toUsfm(parsed)).then(esc).catch(function () {
          return fromBolls(parsed, FALLBACK).then(function (text) { return text + '\n' + fallbackNote(); });
        });
      }
      return fromBolls(parsed, FALLBACK).then(function (text) { return text + '\n' + fallbackNote(); });
    }
    return fromBolls(parsed, bollsCode(version));
  }

  function fromBolls(parsed, version) {
    return bollsChapter(version, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) return t('Verse not found.', 'Стих не найден.');
      var picked;
      if (parsed.verseStart !== null) {
        var end = parsed.verseEnd !== null ? parsed.verseEnd : parsed.verseStart;
        picked = verses.filter(function (v) { return v.verse >= parsed.verseStart && v.verse <= end; });
      } else {
        picked = verses.slice(0, 3);
      }
      if (!picked.length) return t('Verse not found.', 'Стих не найден.');
      return picked.map(function (v) { return cleanBolls(v.text); }).join(' ');
    }).catch(function () {
      return t('Could not retrieve scripture text.', 'Не удалось загрузить текст Писания.');
    });
  }

  /* A passage does not stop where the chapter file does: asking for more context at
     the top of a chapter has to reach back into the previous one, not forward. */
  function loadContext(ref, version, radius) {
    var parsed = parseReference(ref);
    if (!parsed) return Promise.reject(new Error('bad reference'));
    var code = version === 'TPT' ? FALLBACK : bollsCode(version);
    var note = version === 'TPT' ? '<p class="esv-ctx-note">' + fallbackNote() + '</p>' : '';
    return bollsChapter(code, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) throw new Error('empty chapter');
      var selStart = parsed.verseStart === null ? 1 : parsed.verseStart;
      var selEnd = parsed.verseEnd || selStart;
      var from = selStart - radius;
      var to = selEnd + radius;
      var rows = verses.filter(function (v) { return v.verse >= from && v.verse <= to; })
        .map(function (v) { return { chapter: parsed.chapter, verse: v.verse, text: v.text }; });
      var pre = (from < 1 && parsed.chapter > 1)
        ? bollsChapter(code, parsed.bookId, parsed.chapter - 1).catch(function () { return null; })
        : Promise.resolve(null);
      var post = (to > verses.length)
        ? bollsChapter(code, parsed.bookId, parsed.chapter + 1).catch(function () { return null; })
        : Promise.resolve(null);
      return Promise.all([pre, post]).then(function (extra) {
        if (extra[0] && extra[0].length) {
          var want = 1 - from;
          extra[0].slice(Math.max(0, extra[0].length - want)).forEach(function (v, i) {
            rows.splice(i, 0, { chapter: parsed.chapter - 1, verse: v.verse, text: v.text });
          });
        }
        if (extra[1] && extra[1].length) {
          extra[1].slice(0, to - verses.length).forEach(function (v) {
            rows.push({ chapter: parsed.chapter + 1, verse: v.verse, text: v.text });
          });
        }
        return '<p class="esv-ctx-passage">' + rows.map(function (v) {
          var on = v.chapter === parsed.chapter && v.verse >= selStart && v.verse <= selEnd;
          var num = v.chapter === parsed.chapter ? String(v.verse) : v.chapter + ':' + v.verse;
          return '<span class="esv-ctx-verse' + (on ? ' is-selected' : '') + '">' +
            '<sup class="esv-ctx-num">' + num + '</sup><span class="esv-ctx-t">' +
            cleanBolls(v.text) + '</span></span>';
        }).join(' ') + '</p>' + note;
      });
    });
  }

  /* ---------------------------------------------------------------- picker */
  function menuHtml(heading) {
    return '<span class="esv-pick-head">' + esc(heading) + '</span>' +
      VERSIONS.map(function (v) {
        return '<button class="esv-pick-opt" type="button" role="option" data-v="' + esc(v.code) + '"' +
          ' aria-selected="' + (v.code === active) + '">' +
          '<span class="code">' + esc(v.code) + '</span><span class="full">' + esc(v.full) + '</span></button>';
      }).join('');
  }

  var BOOK_ICON = '<svg class="esv-pick-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.2C10 4.4 7 4.1 4 4.6V19c3-.5 6-.2 8 1.6 2-1.8 5-2.1 8-1.6V4.6c-3-.5-6-.2-8 1.6z"/><path d="M12 6.2v14.4"/></svg>';
  var CARET = '<svg class="esv-pick-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.8 5.5 5 5.5-5"/></svg>';

  function pickerHtml(label) {
    var name = esc(label || t('Bible translation', 'Перевод Библии'));
    return '<div class="esv-pick">' +
      '<button class="esv-pick-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="' + name + '">' +
      BOOK_ICON + '<span class="esv-pick-val">' + esc(active) + '</span>' + CARET + '</button>' +
      '<div class="esv-pick-menu" role="listbox" aria-label="' + name + '" hidden></div></div>';
  }

  function wirePicker(wrap, heading) {
    if (!wrap) return null;
    var btn = wrap.querySelector('.esv-pick-btn');
    var menu = wrap.querySelector('.esv-pick-menu');
    var val = wrap.querySelector('.esv-pick-val');
    if (!btn || !menu || !val) return null;
    menu.innerHTML = menuHtml(heading || t('Verse pop-ups read in', 'Стихи читаются в переводе'));
    val.textContent = active;

    var opts = function () { return Array.prototype.slice.call(menu.querySelectorAll('.esv-pick-opt')); };
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
    var move = function (step) {
      var list = opts();
      var i = -1;
      list.forEach(function (o, j) { if (o.classList.contains('cursor')) i = j; });
      var next = list[Math.max(0, Math.min(list.length - 1, i < 0 ? 0 : i + step))];
      list.forEach(function (o) { o.classList.remove('cursor'); });
      if (next) next.classList.add('cursor');
    };
    btn.addEventListener('click', function (ev) { ev.stopPropagation(); if (menu.hidden) open(); else close(); });
    menu.addEventListener('click', function (ev) {
      var opt = ev.target.closest('.esv-pick-opt');
      if (opt) { setVersion(opt.dataset.v); close(); btn.focus(); }
    });
    document.addEventListener('click', function (ev) {
      if (!menu.hidden && !wrap.contains(ev.target)) close();
    });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !menu.hidden) { ev.preventDefault(); close(); btn.focus(); return; }
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        if (menu.hidden) { open(); return; }
        move(ev.key === 'ArrowDown' ? 1 : -1);
        return;
      }
      if ((ev.key === 'Enter' || ev.key === ' ') && !menu.hidden) {
        var cur = menu.querySelector('.esv-pick-opt.cursor');
        if (cur) { ev.preventDefault(); setVersion(cur.dataset.v); close(); btn.focus(); }
      }
    });
    return { close: close };
  }

  /* --------------------------------------------------------------- linking */
  var BG = 'https://www.biblegateway.com/passage/?search=';

  function bgUrl(ref) {
    return BG + encodeURIComponent(String(ref).replace(/·/g, ';')) +
      '&version=' + (isRu() ? 'NRT' : active);
  }

  function linkFor(ref, label) {
    var a = document.createElement('a');
    a.className = 'esv-ref';
    a.href = bgUrl(ref);
    a.target = '_blank';
    a.rel = 'noopener';
    a.dataset.ref = ref;
    a.textContent = label === undefined ? ref : label;
    return a;
  }

  /* Walks text nodes only, so an existing <a> never ends up nested inside a new one
     and no markup in the host page is rewritten by a string replace. */
  function linkTextNodes(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        while (p) {
          var tag = p.tagName;
          if (tag === 'A' || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
          if (p.classList && p.classList.contains('esv-skip')) return NodeFilter.FILTER_REJECT;
          if (p === root) break;
          p = p.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var targets = [];
    var node;
    while ((node = walker.nextNode())) {
      REF_RE.lastIndex = 0;
      if (REF_RE.test(node.nodeValue)) targets.push(node);
    }
    targets.forEach(function (text0) {
      var text = text0.nodeValue;
      var frag = document.createDocumentFragment();
      var last = 0;
      var m;
      var book = '';
      REF_RE.lastIndex = 0;
      while ((m = REF_RE.exec(text))) {
        var gap = text.slice(last, m.index);
        if (gap) frag.appendChild(document.createTextNode(gap));
        frag.appendChild(linkFor(m[0]));
        book = (m[0].match(BOOK_ONLY_RE) || [''])[0];
        last = m.index + m[0].length;
        /* Anything after this that is a bare chapter:verse joined by a separator
           still belongs to the book just named, so it becomes a link that carries
           the book with it. */
        CONT_RE.lastIndex = last;
        var c;
        while (book && (c = CONT_RE.exec(text)) && c.index === last) {
          frag.appendChild(document.createTextNode(c[1]));
          frag.appendChild(linkFor(book + ' ' + c[2], c[2]));
          last = c.index + c[0].length;
          CONT_RE.lastIndex = last;
        }
        REF_RE.lastIndex = last;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      text0.parentNode.replaceChild(frag, text0);
    });
  }

  function linkAll(root) {
    if (!cfg.scan) return;
    var hosts = (root || document).querySelectorAll(cfg.scan);
    Array.prototype.forEach.call(hosts, function (host) {
      if (host.dataset.esvLinked) return;
      host.dataset.esvLinked = '1';
      linkTextNodes(host);
    });
  }

  /* --------------------------------------------------------------- tooltip */
  var tip = null;
  var dialog = null;
  var tipTimer = null;
  var pinned = false;
  var reqId = 0;
  var tipAnchor = null;
  var tipRef = '';
  var ctxReq = 0;
  var ctxPicker = null;

  function fullTitle(ref) {
    var parsed = parseReference(ref);
    var table = isRu() ? RU_FULL_BY_ID : FULL_BY_ID;
    var full = parsed && table[parsed.bookId];
    if (!full) return ref;
    var out = full + ' ' + parsed.chapter;
    if (parsed.verseStart !== null) {
      out += ':' + parsed.verseStart;
      if (parsed.verseEnd !== null && parsed.verseEnd !== parsed.verseStart) out += '–' + parsed.verseEnd;
    }
    return out;
  }

  function position(anchor) {
    var rect = anchor.getBoundingClientRect();
    var sy = window.scrollY || window.pageYOffset;
    var sx = window.scrollX || window.pageXOffset;
    var width = Math.min(360, window.innerWidth - 28);
    /* Anchoring to the link's own edges lets the box grow when the verse arrives
       without moving: below it grows down, above translateY(-100%) grows it up. */
    var roomBelow = window.innerHeight - rect.bottom;
    if (roomBelow > 200 || roomBelow > rect.top) {
      tip.style.top = (sy + rect.bottom + 8) + 'px';
      tip.style.transform = 'none';
    } else {
      tip.style.top = (sy + rect.top - 8) + 'px';
      tip.style.transform = 'translateY(-100%)';
    }
    tip.style.left = Math.max(sx + 14, Math.min(sx + rect.left, sx + window.innerWidth - width - 14)) + 'px';
  }

  function fill(ref, version, id) {
    var box = tip.querySelector('.esv-tip-text');
    if (box) box.classList.add('is-loading');
    var label = tip.querySelector('.esv-tip-ref');
    if (label) label.textContent = fullTitle(ref) + ' · ' + version;
    var out = tip.querySelector('.esv-tip-out');
    if (out) out.href = bgUrl(ref);
    return loadVerse(ref, version).then(function (text) {
      if (id !== reqId) return;
      var b = tip.querySelector('.esv-tip-text');
      if (b) { b.classList.remove('is-loading'); b.innerHTML = text; }
    }).catch(function () {
      if (id !== reqId) return;
      var b = tip.querySelector('.esv-tip-text');
      if (b) { b.classList.remove('is-loading'); b.textContent = t('Unable to load verse.', 'Не удалось загрузить стих.'); }
    });
  }

  function show(anchor, ref, isPinned) {
    if (tipTimer) clearTimeout(tipTimer);
    pinned = Boolean(isPinned);
    tipAnchor = anchor;
    tipRef = ref;
    var id = ++reqId;
    position(anchor);
    tip.innerHTML =
      '<span class="esv-tip-ref">' + esc(fullTitle(ref)) + ' · ' + esc(active) + '</span>' +
      '<div class="esv-tip-text is-loading">' + t('Reading…', 'Читаю…') + '</div>' +
      '<div class="esv-tip-actions">' +
      '<button class="esv-tip-ctx" type="button" data-ref="' + esc(ref) + '">' +
      t('See in context', 'Показать контекст') + '</button>' +
      '<a class="esv-tip-out" href="' + esc(bgUrl(ref)) + '" target="_blank" rel="noopener">' +
      t('Open', 'Открыть') + ' ↗</a></div>';
    tip.classList.toggle('is-pinned', pinned);
    tip.classList.add('open');
    fill(ref, active, id);
  }

  function hide(force) {
    if (pinned && !force) return;
    tipTimer = setTimeout(function () {
      pinned = false;
      tip.classList.remove('open');
      tip.classList.remove('is-pinned');
    }, 200);
  }

  /* Re-read a pinned pop-up in whatever translation is now active, without
     collapsing it back to a one-line "loading" box on the way. */
  function refreshPinned() {
    if (!tip) return;
    if (pinned && tipAnchor && tipRef && tipAnchor.isConnected) fill(tipRef, active, ++reqId);
    if (dialog && dialog.open) refreshContext(true);
  }

  /* --------------------------------------------------------------- context */
  function refreshContext(preserve) {
    if (!dialog) return;
    var ref = dialog.dataset.ref;
    if (!ref) return;
    var radius = parseInt(dialog.dataset.radius, 10) || 4;
    var id = ++ctxReq;
    var body = dialog.querySelector('.esv-ctx-body');
    var more = dialog.querySelector('.esv-ctx-more');
    var selBefore = preserve && body.querySelector('.is-selected');
    var offBefore = selBefore ? selBefore.offsetTop : 0;
    var scrollBefore = body.scrollTop;
    if (!preserve) body.innerHTML = '<p class="esv-ctx-loading">' + t('Loading surrounding verses…', 'Загружаю соседние стихи…') + '</p>';
    else { body.style.minHeight = body.offsetHeight + 'px'; body.classList.add('is-refreshing'); }
    more.disabled = true;

    loadContext(ref, active, radius).then(function (html) {
      if (id !== ctxReq) return;
      body.classList.remove('is-refreshing');
      body.innerHTML = html;
      requestAnimationFrame(function () { body.style.minHeight = ''; });
      if (preserve) {
        var after = body.querySelector('.is-selected');
        if (after) body.scrollTop = scrollBefore + after.offsetTop - offBefore;
      }
      more.disabled = false;
    }).catch(function () {
      if (id !== ctxReq) return;
      body.classList.remove('is-refreshing');
      body.style.minHeight = '';
      body.innerHTML = '<p class="esv-ctx-loading">' +
        t('Unable to load the surrounding verses right now.', 'Сейчас не удалось загрузить соседние стихи.') + '</p>';
      more.disabled = false;
    });
  }

  function openContext(ref) {
    if (!dialog || !ref) return;
    dialog.dataset.ref = ref;
    dialog.dataset.radius = '4';
    dialog.querySelector('.esv-ctx-head h3').textContent = fullTitle(ref);
    var out = dialog.querySelector('.esv-ctx-out');
    if (out) out.href = bgUrl(ref);
    dialog.querySelector('.esv-ctx-body').scrollTop = 0;
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    refreshContext(false);
  }

  function build() {
    tip = document.createElement('div');
    tip.className = 'esv-tip';
    document.body.appendChild(tip);

    dialog = document.createElement('dialog');
    dialog.className = 'esv-ctx';
    dialog.innerHTML =
      '<div class="esv-ctx-inner">' +
      '<header class="esv-ctx-head"><div class="esv-ctx-title"><span class="esv-ctx-label">' +
      t('See in context', 'В контексте') + '</span><h3></h3></div>' +
      '<div class="esv-ctx-actions">' + pickerHtml(t('Read this passage in', 'Читать этот отрывок в')) +
      '<button class="esv-ctx-close" type="button" aria-label="' + t('Close', 'Закрыть') + '">×</button>' +
      '</div></header>' +
      '<div class="esv-ctx-body" aria-live="polite"></div>' +
      '<footer class="esv-ctx-foot">' +
      '<button class="esv-ctx-more" type="button">' + t('Even more context', 'Ещё шире контекст') + '</button>' +
      '<a class="esv-ctx-out" href="#" target="_blank" rel="noopener">' + t('Full chapter', 'Вся глава') + ' ↗</a>' +
      '</footer></div>';
    document.body.appendChild(dialog);
    ctxPicker = wirePicker(dialog.querySelector('.esv-pick'), t('Read this passage in', 'Читать этот отрывок в'));

    tip.addEventListener('mouseenter', function () { if (tipTimer) clearTimeout(tipTimer); });
    tip.addEventListener('mouseleave', function () { hide(); });

    document.body.addEventListener('mouseover', function (ev) {
      if (pinned) return;
      var link = ev.target.closest('.esv-ref');
      if (!link) return;
      show(link, link.dataset.ref || link.textContent, false);
    });
    document.body.addEventListener('mouseout', function (ev) {
      if (ev.target.closest('.esv-ref')) hide();
    });

    document.body.addEventListener('click', function (ev) {
      var link = ev.target.closest('.esv-ref');
      if (link) {
        ev.preventDefault();
        show(link, link.dataset.ref || link.textContent, true);
        return;
      }
      var ctxBtn = ev.target.closest('.esv-tip-ctx');
      if (ctxBtn) { openContext(ctxBtn.dataset.ref); hide(true); return; }
      /* The translation picker is part of the pop-up's controls, not "somewhere else". */
      if (pinned && !ev.target.closest('.esv-tip') && !ev.target.closest('.esv-pick')) hide(true);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' || !pinned) return;
      if (dialog && dialog.open) return;                      // <dialog> closes itself
      if (document.querySelector('.esv-pick.open')) return;    // the open menu takes it first
      ev.preventDefault();
      hide(true);
    });

    dialog.querySelector('.esv-ctx-close').addEventListener('click', function () { dialog.close(); });
    dialog.querySelector('.esv-ctx-more').addEventListener('click', function () {
      dialog.dataset.radius = String((parseInt(dialog.dataset.radius, 10) || 4) + 6);
      refreshContext(true);
    });
    dialog.addEventListener('close', function () { if (ctxPicker) ctxPicker.close(); });
    dialog.addEventListener('click', function (ev) { if (ev.target === dialog) dialog.close(); });

    /* The pop-up is positioned against the document, so it has to be re-anchored
       whenever the page reflows underneath it. */
    addEventListener('resize', function () {
      if (pinned && tipAnchor && tipAnchor.isConnected) position(tipAnchor);
    });
  }

  /* ------------------------------------------------------------------ init */
  function init(options) {
    options = options || {};
    cfg.key = options.key || 'esmrsky';
    cfg.scan = options.scan || '';
    cfg.lang = options.lang || document.documentElement.getAttribute('data-lang') || 'en';
    VERSIONS = isRu() ? RU_VERSIONS : EN_VERSIONS;
    active = VERSIONS[0].code;
    if (!isRu()) {
      var saved = lsGet(cfg.key + '-scripture-version');
      if (saved && VERSIONS.some(function (v) { return v.code === saved; })) active = saved;
    }
    build();
    linkAll();
  }

  window.EsmrskyScripture = {
    init: init,
    linkAll: linkAll,
    linkTextNodes: linkTextNodes,
    getVersion: getVersion,
    setVersion: setVersion,
    versions: function () { return VERSIONS.slice(); },
    onChange: function (fn) { listeners.push(fn); },
    pickerHtml: pickerHtml,
    wirePicker: wirePicker,
    loadVerse: loadVerse,
    /* The passage WITH its surroundings, as HTML, and without any UI attached. `openContext`
       has always had this — it just kept it inside its own <dialog>. A host that wants to show
       context somewhere other than a modal (a panel, a page, a face of a cube) needs the data
       and not the dialog, and reimplementing the fetch is how a shared layer gets forked.
       Additive: nothing that existed behaves differently.
         loadContext(ref, version, radius) -> Promise<string>
       Rejects on an unparseable reference or an empty chapter. */
    loadContext: loadContext,
    parseReference: parseReference,
    splitReferenceGroup: splitReferenceGroup,
    fullTitle: fullTitle,
    openContext: openContext,
    isRu: isRu
  };
})();
