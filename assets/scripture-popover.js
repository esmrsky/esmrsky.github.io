/* Shared scripture layer: hover/tap verse pop-ups, a translation picker, and a
   "see in context" dialog. Ported from the-thread's implementation so the pages
   that were only linking out to Bible Gateway can read the text in place.

   Behaviour only — every colour, font and radius comes from CSS custom properties
   the host page defines, because these sites are separate works and deliberately
   do not share a design language.

   Two suppliers, same as the rest of the estate:
     the Worker  — NIV and TPT, from YouVersion under the estate's app key. NIV is the
                   current text; bolls.life's NIV is the 1984 edition.
     bolls.life  — NASB/ESV/KJV/NLT/AMP/MSG, НРП on the Russian pages, CORS *, no key.
                   When the Worker can't be reached, NIV readers get the WEB from here,
                   labeled. bolls.life's own NIV is no longer Scripture (see bollsFetch).

   Usage:
     EsmrskyScripture.init({ key: 'the-word', scan: '.source, .note b' });
     EsmrskyScripture.init({ key: 'salvation', scan: '#read', versions: ['NIV', 'NASB', 'NLT', 'TPT'] });
       (`versions` is optional: a subset in the page's order, first one is the default)
*/
(function () {
  'use strict';

  var WORKER = 'https://esmrsky-scripture-api.esmrsky.workers.dev';
  var TPT_ID = 1849;
  var NIV_ID = 111;

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

  /* Obadiah, Philemon, 2 John, 3 John and Jude have exactly one chapter, so a
     reference like "Jude 9" is book + VERSE, not book + chapter. Read as a
     chapter it asks the API for Jude 9, which does not exist, and the popover
     says "Verse not found" — which looks like a dead network rather than a
     parse bug. An explicit "Jude 1:9" still parses the ordinary way. */
  var ONE_CHAPTER = { 31: 1, 57: 1, 63: 1, 64: 1, 65: 1 };

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
    var first = parseInt(match[3], 10);
    /* one number, and the book only has one chapter -> that number is the verse */
    if (ONE_CHAPTER[bookId] && !match[4]) {
      return { bookId: bookId, chapter: 1, verseStart: first, verseEnd: null };
    }
    return {
      bookId: bookId,
      chapter: first,
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
  var RU_VERSIONS = [{ code: 'НРП', full: 'Новый русский перевод', bolls: 'NRT', bg: 'NRT' }];
  /* The Synodal is offered only where a page asks for it (`ruVersions`): fear-of-god-ii is a
     study of how the Synodal renders one word, so its pop-ups must read the same text. */
  var RU_ALL = RU_VERSIONS.concat([{ code: 'СП', full: 'Синодальный перевод', bolls: 'SYNOD', bg: 'RUSV' }]);

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
    lsSet(cfg.key + (isRu() ? '-scripture-version-ru' : '-scripture-version'), code);
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

  /* NIV arrives a chapter at a time as YouVersion HTML, which marks every verse
     (<span class="yv-v" v="23">). Split on the markers and it becomes the same
     [{verse, text}] list bolls returns, with <br> where a line or paragraph breaks,
     so everything downstream reads both suppliers alike. */
  function splitYvChapter(html) {
    var parts = String(html)
      .replace(/<span class="yv-vlbl">[\s\S]*?<\/span>/g, '')
      .split(/<span class="yv-v" v="(\d+)[^"]*"><\/span>/);
    var verses = [];
    for (var i = 1; i < parts.length; i += 2) {
      var text = parts[i + 1]
        .replace(/<\/div>\s*<div\b[^>]*>/g, '<br>')
        .replace(/<\/?(?:div|span)\b[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#0?39;|&#x27;/g, "'").replace(/&amp;/g, '&')
        .replace(/^(?:\s*<br>)+|(?:<br>\s*)+$/g, '')
        .trim();
      if (text) verses.push({ verse: Number(parts[i]), text: text });
    }
    return verses;
  }

  function yvChapter(bookId, chapter) {
    var book = USFM_BY_ID[bookId];
    if (!book) return Promise.reject(new Error('unknown book'));
    return fetch(WORKER + '/passage?version=' + NIV_ID + '&passage=' + book + '.' + chapter + '&format=html',
      { headers: { Accept: 'application/json' } })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (b) {
          if (!r.ok || !b.content) throw new Error(b.message || 'NIV could not be loaded.');
          var verses = splitYvChapter(b.content);
          if (!verses.length) throw new Error('empty chapter');
          return verses;
        });
      });
  }

  /* bolls.life sometimes answers with a notice where the text should be. Since October
     2026 every NIV chapter comes back as one "verse" saying Biblica has prohibited it, and a
     notice must never be shown as Scripture. Every chapter in the Bible has at least two
     verses (Psalm 117 is the shortest), so a single entry that talks about the translation
     is a notice, and so is any response carrying that wording. */
  function isNotice(verses) {
    if (!Array.isArray(verses) || !verses.length) return false;
    var all = verses.map(function (v) { return (v && v.text) || ''; }).join(' ');
    if (/prohibited me from using|has prohibited (?:me|us|the use)/i.test(all)) return true;
    return verses.length === 1 && /\btranslation\b/i.test(all) &&
      /prohibit|copyright|licen[cs]|removed|no longer/i.test(all);
  }

  function bollsFetch(version, bookId, chapter) {
    return fetch('https://bolls.life/get-text/' + version + '/' + bookId + '/' + chapter + '/')
      .then(function (r) { if (!r.ok) throw new Error('API error'); return r.json(); })
      .then(function (verses) {
        if (isNotice(verses)) throw new Error('bolls.life sent a notice, not ' + version);
        return verses;
      });
  }

  /* When the Worker can't be reached, NIV readers get the World English Bible, a
     public-domain modern translation, with a line saying so. The stand-in is not kept
     under the NIV key, so the next passage tries the Worker again. */
  var NIV_STANDIN = 'WEB';

  function getChapter(version, bookId, chapter) {
    var key = version + '-' + bookId + '-' + chapter;
    if (!chapterCache[key]) {
      chapterCache[key] = (version === 'NIV'
        ? yvChapter(bookId, chapter).catch(function () {
            return getChapter(NIV_STANDIN, bookId, chapter).then(function (verses) {
              delete chapterCache[key];
              var shown = verses.slice();
              shown.standIn = NIV_STANDIN;
              return shown;
            });
          })
        : bollsFetch(version, bookId, chapter))
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

  /* Scripture reads like a book on every page: one run of prose, no poetry line
     breaks, the way the original manuscripts ran (verse numbers came in the 1500s).
     The translations' line breaks are folded into spaces here, once, so no host
     page can bring them back with `white-space: pre-line`. Decided October 7, 2026. */
  function flow(text) {
    return String(text).replace(/\s*\n+\s*/g, ' ').replace(/[ \t]{2,}/g, ' ').trim();
  }

  /* Some translations post a section heading inside the first verse it belongs to, on its own
     line ("The Beginning" ahead of Genesis 1:1). Folded into the prose it reads as stray words
     glued to the front of the sentence. Same test as the-thread's splitHeading: a heading leads
     the verse, is short, has no closing punctuation, and is Title Case (a broken line of verse
     opens lower-case or on a quote mark). Takes cleaned text, before flow(). */
  function splitHeading(text) {
    var nl = text.indexOf('\n');
    if (nl < 1) return { heading: '', body: flow(text) };
    var head = text.slice(0, nl).trim();
    var rest = text.slice(nl + 1);
    var plain = head.replace(/<[^>]*>/g, '').trim();
    if (!plain || plain.length > 64 || /[.!?;:,—]$/.test(plain) || !rest.trim() ||
        !/^[A-ZА-ЯЁ]/.test(plain)) return { heading: '', body: flow(text) };
    var titleCase = plain.split(/\s+/).every(function (w) { return w.length < 4 || /^[^a-zа-яё]/.test(w); });
    if (!titleCase) return { heading: '', body: flow(text) };
    return { heading: head, body: flow(rest) };
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

  /* One line beside any passage that is not the translation the reader picked, naming
     what is shown instead. `why` is 'missing' (TPT has no such book), 'context' (TPT
     can't show surrounding verses) or 'failed' (the supplier couldn't be reached). */
  function swapNote(asked, shown, why) {
    var en = why === 'missing' ? asked + ' does not carry this book'
      : why === 'context' ? asked + ' can’t show the surrounding verses'
      : asked + ' could not be loaded';
    var ru = why === 'missing' ? 'В ' + asked + ' этой книги нет'
      : why === 'context' ? asked + ' не показывает соседние стихи'
      : asked + ' не удалось загрузить';
    return '<span class="esv-note">' + t(en + ' — showing ' + shown + '.', ru + ' — показан ' + shown + '.') + '</span>';
  }

  function loadVerse(ref, version) {
    var parsed = parseReference(ref);
    if (!parsed) return Promise.resolve(t('Reference not recognized.', 'Ссылка не распознана.'));
    if (version === 'TPT') {
      if (TPT_MISSING.indexOf(parsed.bookId) === -1) {
        return tptPassage(toUsfm(parsed)).then(function (text) { return flow(esc(text)); }).catch(function () {
          return fromBolls(parsed, FALLBACK, 'TPT', 'failed');
        });
      }
      return fromBolls(parsed, FALLBACK, 'TPT', 'missing');
    }
    return fromBolls(parsed, bollsCode(version));
  }

  /* `asked`/`why` are set when this read is already a stand-in (TPT reading NIV); the note
     then names what was asked for and what actually came back, which may be the WEB. */
  function fromBolls(parsed, version, asked, why) {
    return getChapter(version, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) return t('Verse not found.', 'Стих не найден.');
      var picked;
      if (parsed.verseStart !== null) {
        var end = parsed.verseEnd !== null ? parsed.verseEnd : parsed.verseStart;
        picked = verses.filter(function (v) { return v.verse >= parsed.verseStart && v.verse <= end; });
      } else {
        picked = verses.slice(0, 3);
      }
      if (!picked.length) return t('Verse not found.', 'Стих не найден.');
      var shown = verses.standIn || version;
      var note = asked ? swapNote(asked, shown, why) : shown !== version ? swapNote(version, shown, 'failed') : '';
      /* A pop-up is one verse or a few: a section heading inside it is dropped, not shown. */
      return flow(picked.map(function (v) { return splitHeading(cleanBolls(v.text)).body; }).join(' ')) + (note ? ' ' + note : '');
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
    return getChapter(code, parsed.bookId, parsed.chapter).then(function (verses) {
      if (!verses || !verses.length) throw new Error('empty chapter');
      var shown = verses.standIn || code;
      var swap = version === 'TPT' ? swapNote('TPT', shown, TPT_MISSING.indexOf(parsed.bookId) > -1 ? 'missing' : 'context')
        : shown !== code ? swapNote(code, shown, 'failed') : '';
      var note = swap ? '<p class="esv-ctx-note">' + swap + '</p>' : '';
      var selStart = parsed.verseStart === null ? 1 : parsed.verseStart;
      var selEnd = parsed.verseEnd || selStart;
      var from = selStart - radius;
      var to = selEnd + radius;
      var rows = verses.filter(function (v) { return v.verse >= from && v.verse <= to; })
        .map(function (v) { return { chapter: parsed.chapter, verse: v.verse, text: v.text }; });
      var pre = (from < 1 && parsed.chapter > 1)
        ? getChapter(code, parsed.bookId, parsed.chapter - 1).catch(function () { return null; })
        : Promise.resolve(null);
      var post = (to > verses.length)
        ? getChapter(code, parsed.bookId, parsed.chapter + 1).catch(function () { return null; })
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
          var parts = splitHeading(cleanBolls(v.text));
          return (parts.heading ? '<b class="esv-ctx-heading">' + parts.heading + '</b>' : '') +
            '<span class="esv-ctx-verse' + (on ? ' is-selected' : '') + '">' +
            '<sup class="esv-ctx-num">' + num + '</sup><span class="esv-ctx-t">' +
            parts.body + '</span></span>';
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
      '&version=' + (isRu() ? bgCode(active) : active);
  }

  function bgCode(code) {
    var v = VERSIONS.filter(function (x) { return x.code === code; })[0];
    return (v && v.bg) || 'NRT';
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

  /* ----------------------------------------------------- background scroll */
  /* A pop-up that lets the page slide about underneath it reads as a fault: the
     thing you opened drifts off while the text behind it moves. So whenever the
     context dialog is open, or a verse pop-up is pinned, the document is held
     still and the scrolling happens inside the viewer.

     `position: fixed` on the body, rather than `overflow: hidden`, is what iOS
     actually honours. Offsetting the body by the scroll position we froze at
     keeps the view exactly where it was, and keeps the pop-up there too: it is
     absolutely positioned in document coordinates, and a body pinned at
     -scrollY puts those coordinates back under the same pixels.

     The depth counter matters because "see in context" locks the dialog while
     the pop-up that opened it is still unlocking on its 200ms timer. */
  var lockDepth = 0;
  var lockTop = 0;
  var lockLeft = 0;
  var lockPrev = null;
  var tipLocked = false;
  var ctxLocked = false;

  /* While the body is fixed the window reports a scroll of 0, so anything that
     positions against the document has to ask for the frozen offset instead. */
  function docScrollY() { return lockDepth ? lockTop : (window.scrollY || window.pageYOffset || 0); }
  function docScrollX() { return lockDepth ? lockLeft : (window.scrollX || window.pageXOffset || 0); }

  function lockScroll() {
    if (lockDepth++) return;
    var doc = document.documentElement;
    var body = document.body;
    lockTop = window.scrollY || window.pageYOffset || 0;
    lockLeft = window.scrollX || window.pageXOffset || 0;
    /* Taking the scrollbar away would shift the whole page sideways under the
       pop-up, so its width is handed back as padding. */
    var gutter = window.innerWidth - doc.clientWidth;
    lockPrev = {
      position: body.style.position, top: body.style.top, left: body.style.left,
      right: body.style.right, paddingRight: body.style.paddingRight
    };
    body.style.position = 'fixed';
    body.style.top = -lockTop + 'px';
    body.style.left = -lockLeft + 'px';
    body.style.right = '0';
    if (gutter > 0) body.style.paddingRight = gutter + 'px';
    doc.classList.add('esv-scroll-locked');
  }

  function unlockScroll() {
    if (!lockDepth || --lockDepth) return;
    var body = document.body;
    if (lockPrev) {
      body.style.position = lockPrev.position;
      body.style.top = lockPrev.top;
      body.style.left = lockPrev.left;
      body.style.right = lockPrev.right;
      body.style.paddingRight = lockPrev.paddingRight;
      lockPrev = null;
    }
    document.documentElement.classList.remove('esv-scroll-locked');
    /* Pages set `scroll-behavior: smooth`, which would animate the restore into
       a visible lurch. Ask for the jump, and fall back where the enum is unknown. */
    try { window.scrollTo({ top: lockTop, left: lockLeft, behavior: 'instant' }); }
    catch (e) { window.scrollTo(lockLeft, lockTop); }
  }

  function setTipLock(on) { if (on !== tipLocked) { tipLocked = on; if (on) lockScroll(); else unlockScroll(); } }
  function setCtxLock(on) { if (on !== ctxLocked) { ctxLocked = on; if (on) lockScroll(); else unlockScroll(); } }

  /* The estate's pages own every colour, font and radius the pop-ups use. These
     rules are not that: they are the scrolling behaviour itself, and every page
     that loads this file wants them, so they ship with it. Appended to <head>
     after the host's own <style>, so an equal-specificity rule there still wins
     on anything it actually sets. */
  var BEHAVIOUR_CSS =
    'html.esv-scroll-locked{overflow:hidden!important}' +
    '.esv-tip{max-height:min(70dvh,620px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}' +
    /* so "see in context" stays reachable once the verse starts scrolling */
    '.esv-tip-actions{position:sticky;bottom:0;background:inherit}' +
    '.esv-ctx,.esv-ctx-body,.esv-pick-menu{overscroll-behavior:contain}' +
    '.esv-ctx-body{-webkit-overflow-scrolling:touch}' +
    /* The passage's type answers to the screen the way its box does: width, because that is
       the line it has to fill, and height, because that is what it has to reach. The floor is
       hit before phone size, so a phone reads at 1rem and a sliding URL bar moves nothing.
       --esv-fs and --esv-lh are the reader's own dials (see the reading settings below);
       `dialog.esv-ctx` outranks a host's plain `.esv-ctx-body` without needing !important. */
    '.esv-ctx{--esv-fs:1;--esv-lh:1.65;--esv-base:clamp(1rem,0.42rem + 0.45vw + 0.55dvh,1.28rem)}' +
    'dialog.esv-ctx .esv-ctx-body{font-size:calc(var(--esv-base) * var(--esv-fs));line-height:var(--esv-lh)}' +
    /* The settings sit in the flow between the passage and the footer, so they can never be
       clipped by the dialog or cover the text they change. Colour comes from the dialog
       (currentColor), so every host page's palette is followed without a variable to define. */
    '.esv-ctx-prefs{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;padding:12px 20px;' +
      'border-top:1px solid color-mix(in srgb,currentColor 16%,transparent);' +
      'background:color-mix(in srgb,currentColor 4%,transparent);font-size:.86rem;line-height:1.3;font-family:inherit}' +
    '.esv-ctx-prefs[hidden]{display:none}' +
    '.esv-ctx-prefs .esv-pref{display:flex;align-items:center;gap:10px}' +
    '.esv-ctx-prefs .esv-pref-name{opacity:.72;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase}' +
    '.esv-ctx-prefs .esv-pref-group{display:inline-flex;border:1px solid color-mix(in srgb,currentColor 24%,transparent);border-radius:999px;overflow:hidden}' +
    '.esv-ctx-prefs button{min-width:44px;min-height:44px;padding:0 14px;border:0;background:none;color:inherit;font:inherit;cursor:pointer}' +
    '.esv-ctx-prefs button:hover:not(:disabled){background:color-mix(in srgb,currentColor 10%,transparent)}' +
    '.esv-ctx-prefs button:disabled{opacity:.3;cursor:default}' +
    '.esv-ctx-prefs button[aria-pressed="true"]{background:color-mix(in srgb,currentColor 16%,transparent);font-weight:700}' +
    '.esv-ctx-prefs .esv-fs-val{display:inline-grid;place-items:center;min-width:3.4em;font-variant-numeric:tabular-nums}' +
    '.esv-ctx-prefs .esv-pref-reset{margin-left:auto;border-radius:999px;text-decoration:underline;text-underline-offset:3px}' +
    '.esv-ctx-aa[aria-expanded="true"]{background:color-mix(in srgb,currentColor 12%,transparent)}' +
    /* The face reaches the passage only, never the dialog's heading or controls. */
    'dialog.esv-ctx[data-face]:not([data-face="page"]) .esv-ctx-body{font-family:var(--esv-face)}' +
    /* Pages hide verse numbers so scripture reads as prose; the reader can ask for them back. */
    'dialog.esv-ctx[data-nums="on"] .esv-ctx-num{display:inline;margin-right:.3em;font-size:.62em;font-weight:700;' +
      'vertical-align:.45em;line-height:0;opacity:.62;font-family:inherit}' +
    '.esv-ctx-prefs .esv-face-opt{font-size:1.02em}' +
    '@media (max-width:560px){.esv-ctx-prefs{gap:10px 14px;padding:12px 14px;max-height:46dvh;overflow-y:auto}' +
      '.esv-ctx-prefs .esv-pref-face{flex-wrap:wrap}.esv-ctx-prefs .esv-pref-face .esv-pref-group{flex-wrap:wrap;border-radius:16px}' +
      '.esv-ctx-prefs .esv-pref{width:100%;justify-content:space-between}.esv-ctx-prefs .esv-pref-name{white-space:nowrap}}' +
    /* The dialog's footer is a <footer>, so a page's own `footer{margin-top:…}` reached into it
       and opened a gap above the buttons (the-word). It belongs to the dialog, not the page. */
    'dialog.esv-ctx .esv-ctx-foot{margin:0}' +
    /* Section headings are apparatus, like verse numbers: off unless the reader asks. */
    '.esv-ctx-heading{display:none}' +
    'dialog.esv-ctx[data-heads="on"] .esv-ctx-heading{display:block;margin:1.1em 0 .35em;font-size:.82em;font-weight:700;' +
      'letter-spacing:.02em;opacity:.78;font-family:inherit}' +
    'dialog.esv-ctx[data-heads="on"] .esv-ctx-heading:first-child{margin-top:0}' +
    /* A floor of motion for any page whose skin has none: the pop-up and the dialog fade in
       place. :where() has no specificity, so a skin's own transition always wins. Closing the
       dialog eases from script (closeContext), so it works whatever the skin declares. */
    '@media (prefers-reduced-motion:no-preference){' +
      ':where(.esv-tip){transition:opacity .18s ease,display .18s allow-discrete}' +
      ':where(.esv-ctx){transition:opacity .22s ease,display .22s allow-discrete,overlay .22s allow-discrete}' +
      '@starting-style{:where(.esv-tip.open){opacity:0}:where(.esv-ctx[open]){opacity:0}}}' +
    '@media (prefers-reduced-motion:no-preference){dialog.esv-ctx .esv-ctx-body{transition:font-size .18s ease,line-height .18s ease,opacity .18s ease}}';

  /* ------------------------------------------------------- reading settings */
  /* The same panel the-thread puts on its passage dialog: typeface, text size, line height
     and verse numbers. Size, leading and numbers are kept under the-thread's own keys, so a
     choice made there holds here: the sites share an origin, and a reader should only have to
     say it once. The typeface is not: the-thread writes its default face back on every visit,
     which here would replace each page's own face with Literata for anyone who had ever been
     there. "Page" — the host's face — is the default, and only a choice made here moves it. */
  var FS_STEPS = [0.86, 0.93, 1, 1.08, 1.16, 1.26, 1.36];
  var LH_STEPS = { snug: 1.5, normal: 1.65, roomy: 1.9 };
  var FACES = {
    page: { name: 'Page', ru: 'Как на странице', stack: '' },
    literata: { name: 'Literata', stack: '"Literata",Georgia,serif' },
    'source-serif': { name: 'Source Serif', stack: '"Source Serif 4",Georgia,serif' },
    figtree: { name: 'Figtree', stack: '"Figtree",system-ui,sans-serif' },
    atkinson: { name: 'Atkinson', stack: '"Atkinson Hyperlegible Next",system-ui,sans-serif' }
  };
  /* One stylesheet for all four, added the first time the panel opens. It only declares the
     faces; a file is fetched when a face is actually drawn, so nobody pays for the preview
     buttons until they ask to see them. */
  var FACES_CSS = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400..800;1,400..700' +
    '&family=Figtree:ital,wght@0,400..900;1,400..700&family=Literata:ital,opsz,wght@0,7..72,400..800;1,7..72,400..700' +
    '&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..800;1,8..60,400..700&display=swap';
  var FS_KEY = 'thread-ctx-fs';
  var LH_KEY = 'thread-ctx-lh';
  var NUMS_KEY = 'thread-ctx-nums';
  var HEADS_KEY = 'thread-ctx-heads';
  var FACE_KEY = 'esmrsky-ctx-face';
  var FS_DEF = 2;
  var LH_DEF = 'normal';
  var FACE_DEF = 'page';
  var fsIndex = FS_DEF;
  var lhName = LH_DEF;
  var faceName = FACE_DEF;
  var numsOn = false;
  var headsOn = false;

  function readSaved() {
    headsOn = lsGet(HEADS_KEY) === 'on';
    var fs = parseInt(lsGet(FS_KEY), 10);
    fsIndex = fs >= 0 && fs < FS_STEPS.length ? fs : FS_DEF;
    var lh = lsGet(LH_KEY);
    lhName = LH_STEPS[lh] ? lh : LH_DEF;
    var face = lsGet(FACE_KEY);
    faceName = FACES[face] ? face : FACE_DEF;
    numsOn = lsGet(NUMS_KEY) === 'on';
  }

  function ensureFaces() {
    if (faceName !== FACE_DEF || (dialog && !dialog.querySelector('.esv-ctx-prefs').hidden)) {
      if (document.getElementById('esv-faces')) return;
      var link = document.createElement('link');
      link.id = 'esv-faces';
      link.rel = 'stylesheet';
      link.href = FACES_CSS;
      (document.head || document.documentElement).appendChild(link);
    }
  }

  function applyReading(save) {
    if (save) {
      lsSet(FS_KEY, String(fsIndex));
      lsSet(LH_KEY, lhName);
      lsSet(FACE_KEY, faceName);
      lsSet(NUMS_KEY, numsOn ? 'on' : 'off');
      lsSet(HEADS_KEY, headsOn ? 'on' : 'off');
    }
    if (!dialog) return;
    ensureFaces();
    dialog.style.setProperty('--esv-fs', String(FS_STEPS[fsIndex]));
    dialog.style.setProperty('--esv-lh', String(LH_STEPS[lhName]));
    if (faceName === FACE_DEF) dialog.style.removeProperty('--esv-face');
    else dialog.style.setProperty('--esv-face', FACES[faceName].stack);
    dialog.dataset.face = faceName;
    dialog.dataset.nums = numsOn ? 'on' : 'off';
    dialog.dataset.heads = headsOn ? 'on' : 'off';
    var heads = dialog.querySelector('.esv-heads-opt');
    if (heads) heads.setAttribute('aria-pressed', String(headsOn));
    var val = dialog.querySelector('.esv-fs-val');
    if (val) val.textContent = Math.round(FS_STEPS[fsIndex] * 100) + '%';
    [].forEach.call(dialog.querySelectorAll('.esv-fs-step'), function (b) {
      var dir = +b.dataset.step;
      b.disabled = (dir < 0 && fsIndex === 0) || (dir > 0 && fsIndex === FS_STEPS.length - 1);
    });
    [].forEach.call(dialog.querySelectorAll('.esv-lh-opt'), function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lh === lhName));
    });
    [].forEach.call(dialog.querySelectorAll('.esv-face-opt'), function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.face === faceName));
    });
    var nums = dialog.querySelector('.esv-nums-opt');
    if (nums) nums.setAttribute('aria-pressed', String(numsOn));
  }

  function prefsHtml() {
    var lhLabels = { snug: t('Snug', 'Плотно'), normal: t('Normal', 'Обычно'), roomy: t('Roomy', 'Свободно') };
    return '<div class="esv-ctx-prefs" hidden>' +
      '<div class="esv-pref esv-pref-face"><span class="esv-pref-name">' + t('Typeface', 'Шрифт') + '</span>' +
      '<span class="esv-pref-group">' +
      Object.keys(FACES).map(function (k) {
        var f = FACES[k];
        var label = k === FACE_DEF ? t(f.name, f.ru) : f.name;
        return '<button type="button" class="esv-face-opt" data-face="' + k + '" aria-pressed="false"' +
          (f.stack ? ' style="font-family:' + f.stack.replace(/"/g, '&quot;') + '"' : '') + '>' + label + '</button>';
      }).join('') + '</span></div>' +
      '<div class="esv-pref"><span class="esv-pref-name">' + t('Text size', 'Размер текста') + '</span>' +
      '<span class="esv-pref-group">' +
      '<button type="button" class="esv-fs-step" data-step="-1" aria-label="' + t('Smaller passage text', 'Меньше текст') + '">−</button>' +
      '<span class="esv-fs-val" aria-live="polite">100%</span>' +
      '<button type="button" class="esv-fs-step" data-step="1" aria-label="' + t('Larger passage text', 'Больше текст') + '">+</button>' +
      '</span></div>' +
      '<div class="esv-pref"><span class="esv-pref-name">' + t('Line height', 'Интервал') + '</span>' +
      '<span class="esv-pref-group">' +
      Object.keys(LH_STEPS).map(function (k) {
        return '<button type="button" class="esv-lh-opt" data-lh="' + k + '" aria-pressed="false">' + lhLabels[k] + '</button>';
      }).join('') + '</span></div>' +
      '<div class="esv-pref"><span class="esv-pref-group">' +
      '<button type="button" class="esv-nums-opt" aria-pressed="false">' + t('Verse numbers', 'Номера стихов') + '</button>' +
      '<button type="button" class="esv-heads-opt" aria-pressed="false">' + t('Headings', 'Заголовки') + '</button>' +
      '</span></div>' +
      '<button type="button" class="esv-pref-reset">' + t('Reset', 'Сбросить') + '</button>' +
      '</div>';
  }

  function wirePrefs() {
    var panel = dialog.querySelector('.esv-ctx-prefs');
    var toggle = dialog.querySelector('.esv-ctx-aa');
    toggle.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) ensureFaces();
    });
    panel.addEventListener('click', function (ev) {
      var step = ev.target.closest('.esv-fs-step');
      var opt = ev.target.closest('.esv-lh-opt');
      var face = ev.target.closest('.esv-face-opt');
      if (step) fsIndex = Math.max(0, Math.min(FS_STEPS.length - 1, fsIndex + (+step.dataset.step)));
      else if (opt) lhName = opt.dataset.lh;
      else if (face) faceName = face.dataset.face;
      else if (ev.target.closest('.esv-nums-opt')) numsOn = !numsOn;
      else if (ev.target.closest('.esv-heads-opt')) headsOn = !headsOn;
      else if (ev.target.closest('.esv-pref-reset')) { fsIndex = FS_DEF; lhName = LH_DEF; faceName = FACE_DEF; numsOn = false; headsOn = false; }
      else return;
      applyReading(true);
    });
    /* Another tab — or the-thread — may have changed a setting; read it again on each open. */
    dialog.addEventListener('esv-open', function () { readSaved(); applyReading(false); });
    readSaved();
    applyReading(false);
  }

  function ensureBehaviourCss() {
    if (document.getElementById('esv-behaviour')) return;
    var style = document.createElement('style');
    style.id = 'esv-behaviour';
    style.textContent = BEHAVIOUR_CSS;
    (document.head || document.documentElement).appendChild(style);
  }

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
    var sy = docScrollY();
    var sx = docScrollX();
    var width = Math.min(360, window.innerWidth - 28);
    /* Anchoring to the link's own edges lets the box grow when the verse arrives
       without moving: below it grows down, above translateY(-100%) grows it up. */
    var roomBelow = window.innerHeight - rect.bottom;
    var below = roomBelow > 200 || roomBelow > rect.top;
    if (below) {
      tip.style.top = (sy + rect.bottom + 8) + 'px';
      tip.style.transform = 'none';
    } else {
      tip.style.top = (sy + rect.top - 8) + 'px';
      tip.style.transform = 'translateY(-100%)';
    }
    tip.style.left = Math.max(sx + 14, Math.min(sx + rect.left, sx + window.innerWidth - width - 14)) + 'px';
    /* A pinned pop-up freezes the page, so anything of it hanging below the fold
       would be unreachable — including its own buttons. Give it only the room it
       actually has and let the verse scroll inside it. */
    var room = (below ? roomBelow : rect.top) - 22;
    tip.style.maxHeight = Math.max(168, Math.min(620, Math.round(window.innerHeight * 0.7), room)) + 'px';
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
    /* Positioned first, frozen second: locking zeroes the window's scroll, and a
       pop-up measured after that would land at the top of the page. */
    setTipLock(pinned);
    tip.scrollTop = 0;
    fill(ref, active, id);
  }

  /* `keepFocus` is for closes the reader caused somewhere else (clicking another spot, opening
     the passage): focus stays where they put it. Escape and a second click hand focus back to
     the reference, so a keyboard reader never lands at the top of the document. */
  function hide(force, keepFocus) {
    if (pinned && !force) return;
    if (tipTimer) clearTimeout(tipTimer);
    var back = !keepFocus && tipAnchor;
    if (back && back.isConnected && tip.contains(document.activeElement)) {
      try { back.focus({ preventScroll: true }); } catch (e) { /* fine */ }
    }
    tipTimer = setTimeout(function () {
      pinned = false;
      setTipLock(false);
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

  /* The dialog fades out before it closes, whatever the host's skin declares: the animation
     runs on the element itself (and its backdrop where the browser allows), so no skin rule
     can clobber it. Reduced motion closes at once. */
  var ctxTrigger = null;
  var closing = false;
  function closeContext() {
    if (!dialog || !dialog.open || closing) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof dialog.animate !== 'function') { dialog.close(); return; }
    closing = true;
    dialog.classList.add('is-closing');
    var opts = { duration: 200, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' };
    var anims = [dialog.animate([{ opacity: getComputedStyle(dialog).opacity }, { opacity: 0 }], opts)];
    try { anims.push(dialog.animate([{ opacity: 1 }, { opacity: 0 }], Object.assign({ pseudoElement: '::backdrop' }, opts))); }
    catch (e) { /* the backdrop simply goes with the close */ }
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      closing = false;
      dialog.close();
      anims.forEach(function (a) { try { a.cancel(); } catch (e) { /* fine */ } });
    };
    anims[0].finished.then(finish, finish);
    setTimeout(finish, 320);
  }

  function openContext(ref) {
    if (!dialog || !ref) return;
    if (!ctxTrigger && document.activeElement && document.activeElement !== document.body) ctxTrigger = document.activeElement;
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
    setCtxLock(true);
    dialog.dispatchEvent(new Event('esv-open'));
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
      prefsHtml() +
      '<footer class="esv-ctx-foot">' +
      '<button class="esv-ctx-more" type="button">' + t('Even more context', 'Ещё шире контекст') + '</button>' +
      '<a class="esv-ctx-out" href="#" target="_blank" rel="noopener">' + t('Full chapter', 'Вся глава') + ' ↗</a>' +
      '<button class="esv-ctx-more esv-ctx-aa" type="button" aria-expanded="false" aria-label="' +
      t('Reading settings: text size and line height', 'Настройки чтения: размер текста и интервал') + '">Aa</button>' +
      '</footer></div>';
    document.body.appendChild(dialog);
    wirePrefs();
    ctxPicker = wirePicker(dialog.querySelector('.esv-pick'), t('Read this passage in', 'Читать этот отрывок в'));

    /* Click, never hover (November 5, 2026). A pop-up that appears because the pointer
       crossed a word covers the line being read, and a phone has no hover anyway, so every
       device now works the way a phone always did: tap or click a reference to open its
       pop-up, "See in context" for the passage, and a second click on the same reference,
       a click elsewhere or Escape to close. */
    document.body.addEventListener('click', function (ev) {
      var link = ev.target.closest('.esv-ref');
      if (link) {
        ev.preventDefault();
        if (pinned && tipAnchor === link) { hide(true); return; }
        show(link, link.dataset.ref || link.textContent, true);
        return;
      }
      var ctxBtn = ev.target.closest('.esv-tip-ctx');
      if (ctxBtn) { ctxTrigger = tipAnchor; openContext(ctxBtn.dataset.ref); hide(true, true); return; }
      /* The translation picker is part of the pop-up's controls, not "somewhere else". */
      if (pinned && !ev.target.closest('.esv-tip') && !ev.target.closest('.esv-pick')) hide(true, true);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape' || !pinned) return;
      if (dialog && dialog.open) return;                      // the dialog takes it (cancel below)
      if (document.querySelector('.esv-pick.open')) return;    // the open menu takes it first
      ev.preventDefault();
      hide(true);
    });

    dialog.querySelector('.esv-ctx-close').addEventListener('click', closeContext);
    dialog.querySelector('.esv-ctx-more').addEventListener('click', function () {
      dialog.dataset.radius = String((parseInt(dialog.dataset.radius, 10) || 4) + 6);
      refreshContext(true);
    });
    /* Escape arrives as `cancel`; take it over so the close eases like the button's does.
       An open picker inside the dialog takes Escape first, and keeps the dialog open. */
    dialog.addEventListener('cancel', function (ev) {
      ev.preventDefault();
      if (dialog.querySelector('.esv-pick.open')) return;
      closeContext();
    });
    dialog.addEventListener('close', function () {
      dialog.classList.remove('is-closing');
      setCtxLock(false);
      if (ctxPicker) ctxPicker.close();
      /* Back to the reference that opened it, without scrolling the page to reach it. */
      var back = ctxTrigger;
      ctxTrigger = null;
      if (back && back.isConnected) { try { back.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
    });
    dialog.addEventListener('click', function (ev) { if (ev.target === dialog) closeContext(); });

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
    /* A page may offer a subset, in its own order; the first code is its default.
       Unknown codes are ignored, and an empty result falls back to the full list. */
    if (!isRu() && options.versions && options.versions.length) {
      var offered = options.versions.map(function (code) {
        return EN_VERSIONS.filter(function (v) { return v.code === code; })[0];
      }).filter(Boolean);
      if (offered.length) VERSIONS = offered;
    }
    if (isRu() && options.ruVersions && options.ruVersions.length) {
      var ru = options.ruVersions.map(function (code) {
        return RU_ALL.filter(function (v) { return v.code === code; })[0];
      }).filter(Boolean);
      if (ru.length) VERSIONS = ru;
    }
    active = VERSIONS[0].code;
    /* A one-translation Russian page has nothing to remember; a page offering two does. */
    if (!isRu() || VERSIONS.length > 1) {
      var saved = lsGet(cfg.key + (isRu() ? '-scripture-version-ru' : '-scripture-version'));
      if (saved && VERSIONS.some(function (v) { return v.code === saved; })) active = saved;
    }
    ensureBehaviourCss();
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
