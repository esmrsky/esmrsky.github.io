/* The Stayed Mind · the Russian payload for the page's own scripts. It runs only on /focus/ru/: the
   English page carries it as an inert text/x-ru script, and the generator turns it into a real one.
   It defines window.FocusRU; each page script calls RU.put(name, target) right after its string table,
   and the figures script calls RU.done(), which throws if a block here was never applied.
   put() merges by index and key. A length mismatch, a missing translation, a key the English does not
   have, or a function swapped for a string all throw, so an edit to the English fails loudly instead of
   silently leaving a string in English. The learn-mode questions are in #learn-data-ru, not here. */
(function () {
  "use strict";
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;

  function fail(path, why) { throw new Error("focus RU: " + path + ": " + why); }
  function apply(o, k, v, path) {
    var e = o[k], p = path + "." + k;
    if (v === undefined) fail(p, "no translation");
    if (typeof e === "string") { if (typeof v !== "string") fail(p, "expected a string"); o[k] = v; return; }
    if (typeof e === "function") { if (typeof v !== "function") fail(p, "expected a function"); o[k] = v; return; }
    fail(p, "English has no such field, or one of an unexpected kind");
  }
  function merge(en, ru, path) {
    if (Array.isArray(en)) {
      if (!Array.isArray(ru)) fail(path, "expected an array");
      if (ru.length !== en.length) fail(path, "English has " + en.length + " items, RU has " + ru.length);
      for (var i = 0; i < en.length; i++) apply(en, i, ru[i], path);
      return;
    }
    Object.keys(ru).forEach(function (k) { if (!(k in en)) fail(path + "." + k, "English has no such key"); });
    Object.keys(en).forEach(function (k) { apply(en, k, ru[k], path); });
  }

  /* Russian plural: 1 день, 3 дня, 7 дней */
  function plural(n, one, few, many) {
    var a = n % 10, b = n % 100;
    return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many;
  }

  var DATA = {};
  var used = {};

  /* review queue (the "Due for review" panel and the grade row under every revealed answer) */
  DATA.review = {
    kept: "Хорошо. Этот вопрос не вернётся, если ты не ошибёшься.",
    next: function (n) { return "Хорошо. Следующий повтор через " + n + " " + plural(n, "день", "дня", "дней") + "."; },
    again: "Он вернётся завтра.",
    ask: "Ты знал ответ?", had: "Знал", missed: "Не знал",
    placeholder: "Твой ответ. Ответить про себя тоже считается.",
    reveal: "Ответ готов. Покажи",
    answer: "Ответ страницы",
    due: "Пора повторить · ",
    item: function (i, n) { return "Повтор " + i + " из " + n; }
  };

  /* pretest buttons and verdicts */
  DATA.label = { "true": "Правда", "false": "Неправда", unsure: "Не знаю" };
  DATA.pretest = {
    status: function (n) { return "Ответов: " + n + " из 5." + (n === 5 ? " Результаты ждут тебя в разделе о мифах." : ""); },
    guess: function (label, hit) { return "Твой ответ: «" + label + "». " + (hit ? "Подтвердилось." : "Данные говорят иное."); },
    score: function (hits, n) { return "Твоя разминка: подтвердилось " + hits + " из " + n + ". Промахи стоит запомнить в первую очередь."; }
  };

  /* figures: canvas and SVG strings the loops draw. Archivo has no Cyrillic, so the canvas face follows the page's Russian display face. */
  DATA.figures = {
    chose: "ТО, ЧТО ТЫ ВЫБРАЛ", notice: "ЗАМЕТИЛ", goal: "ЦЕЛЬ", ping: "СИГНАЛ",
    alone: "КАРКАС БЕЗ ОПОРЫ", leaning: "НАКЛОНЯЕТСЯ", supported: "SĀMÛḴ · С ОПОРОЙ",
    face: "'Sofia Sans', system-ui, sans-serif"
  };
  DATA.words = ["почта", "а вдруг…", "то сообщение", "тревога", "ещё одно видео", "счёт матча"];

  window.FocusRU = {
    put: function (name, target) {
      if (!(name in DATA)) fail(name, "no RU block for this name");
      if (used[name]) fail(name, "applied twice");
      merge(target, DATA[name], name);
      used[name] = true;
    },
    done: function () {
      Object.keys(DATA).forEach(function (k) { if (!used[k]) fail(k, "RU block was never applied"); });
    }
  };
})();
