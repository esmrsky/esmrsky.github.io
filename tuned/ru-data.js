/* Tuned · the Russian payload. It runs only on /tuned/ru/: the English page carries it as an inert
   text/x-ru script, and the generator turns it into a real one. It defines window.TunedRU; the page
   script calls RU.put(name, target) right after each data const and RU.done() at the end, which
   throws if any block here was never applied.
   put() merges by index and key. A length mismatch, a missing translation, a key the English does
   not have, or a changed number throws, so an edit to the English data fails loudly instead of
   silently mispairing. Nothing in this file quotes Scripture. */
(function () {
  "use strict";
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;

  /* fields that are keys, colors or shapes, never reader-facing text */
  var NONTEXT = { id: 1, v: 1, shape: 1 };
  function fail(path, why) { throw new Error("tuned RU: " + path + ": " + why); }
  function apply(o, k, v, path) {
    var e = o[k], p = path + "." + k;
    if (typeof e === "string") {
      if (NONTEXT[k]) { if (v !== undefined && v !== e) fail(p, "key changed: " + e + " vs " + v); return; }
      if (typeof v !== "string") fail(p, "no translation");
      o[k] = v; return;
    }
    if (typeof e === "number") { if (v !== undefined && v !== e) fail(p, "number changed: " + e + " vs " + v); return; }
    if (e && typeof e === "object") { merge(e, v, p); return; }
    fail(p, "English has no such field");
  }
  function merge(en, ru, path) {
    if (Array.isArray(en)) {
      if (!Array.isArray(ru)) fail(path, "expected an array");
      if (ru.length !== en.length) fail(path, "English has " + en.length + " items, RU has " + ru.length);
      for (var i = 0; i < en.length; i++) apply(en, i, ru[i], path);
      return;
    }
    if (!ru || typeof ru !== "object") fail(path, "expected an object");
    Object.keys(ru).forEach(function (k) { if (!(k in en)) fail(path + "." + k, "English has no such key"); });
    Object.keys(en).forEach(function (k) { apply(en, k, ru[k], path); });
  }

  var DATA = {};
  var used = {};

  /* the spine: [stage, caption], in ring order */
  DATA.TEXT = {
    open: [
      ["Доверие", "Ты в безопасности рядом с тем, кто на твоей стороне. Это ещё не чувство. Это установленный факт."],
      ["Покой", "Тело выходит из боевой готовности. Это состояние, а не настроение, и именно оно открывает все остальные."],
      ["Внимание расширяется", "Обзор открывается. Ты способен вместить больше, чем одну угрозу."],
      ["Резонанс", "Всё начинает попадать. Ты замечаешь, хочешь, радуешься."],
      ["Игра", "Включаются творчество и юмор, потому что ничего не нужно защищать."],
      ["Близость", "Нервные системы подстраиваются друг под друга. Эту часть в одиночку не сделать."],
      ["Плод", "Из этого что-то вырастает. И именно плод подтверждает доверие, так что всё начинается заново."]
    ],
    closed: [
      ["Страх", "Тело считывает угрозу. Часто оно право, поэтому эта петля вообще существует."],
      ["Суженное внимание", "Обзор сужается до опасности. Больше ничего не проходит."],
      ["Тяга без удовольствия", "Хотение остаётся включённым. Удовольствие затихает. Ты гонишься сильнее, а радуешься меньше."],
      ["Выступление и самопроверка", "Ты смотришь на себя со стороны и ставишь себе оценку."],
      ["Изоляция", "Быть с людьми стоит больше, чем даёт, и ты перестаёшь. А изоляция кормит страх."]
    ]
  };

  /* "what you're tuned to": swatch names and the plural the caption uses */
  DATA.KIND = [
    { name: "Роза",       plural: "круги цвета розы" },
    { name: "Латунь",     plural: "треугольники цвета латуни" },
    { name: "Папоротник", plural: "квадраты цвета папоротника" },
    { name: "Гавань",     plural: "ромбы цвета гавани" },
    { name: "Ирис",       plural: "пятиугольники цвета ириса" }
  ];

  /* wanting / liking dials */
  DATA.S = [
    { label: "Отдохнувший", t: "Совпадают. Ты хочешь примерно того, что тебе нравится, и удовольствие действительно приходит. Ничего драматичного не происходит, и в этом весь смысл." },
    { label: "В стрессе",   t: "Хотение растёт, а удовольствие от него отстаёт. Тот же предмет, больше погони, меньше отдачи." },
    { label: "В погоне",    t: "Погоня, в которой почти ничего не доходит. Это закрытая петля одной картинкой, и поэтому ответ никогда не в том, чтобы хотеть ещё сильнее." }
  ];

  var NONE = "Ничего не выбрано. Шестьдесят фигур, и никакой особой причины замечать хоть одну из них.";

  window.TunedRU = {
    /* hero pendulums: drifting, pulling together, locked in anti-phase */
    pend: [
      "Два маятника, одна общая балка. <b>Смотрим, как они дрейфуют.</b>",
      "Два маятника, одна общая балка. <b>Что-то втягивает их в связь друг с другом.</b>",
      "<b>Сцепились, и точно в противофазе.</b> В противофазе они перестают раскачивать балку, и энергия больше не утекает."
    ],
    of: " из ",
    lookFor: "Искать ",
    capInit: NONE,
    cap: function (idx, count, kind) {
      return idx < 0 ? NONE
        : count + " из 60 — " + kind.plural + ". <b>В самом поле ничего не изменилось. Изменилось только то, что ты искал.</b>";
    },
    put: function (name, target) {
      if (!(name in DATA)) fail(name, "no Russian block");
      merge(target, DATA[name], name);
      used[name] = 1;
    },
    done: function () {
      Object.keys(DATA).forEach(function (k) { if (!used[k]) fail(k, "never applied"); });
    }
  };
})();
