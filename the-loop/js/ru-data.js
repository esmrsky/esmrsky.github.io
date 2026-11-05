/* Russian payload for the strings content.js and main.js own. A no-op on the English page.
   put() merges by key and index and throws on any mismatch, so a changed English table
   cannot silently pair with the wrong Russian. */
(function () {
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;
  var C = window.CONTENT;
  if (!C) throw new Error("ru-data.js: CONTENT missing (load it after content.js)");

  function put(en, ru, path) {
    if (Array.isArray(en)) {
      if (!Array.isArray(ru) || ru.length !== en.length) throw new Error("ru-data.js: length mismatch at " + path);
      ru.forEach(function (v, i) { if (typeof en[i] === "string") en[i] = v; else put(en[i], v, path + "[" + i + "]"); });
      return;
    }
    var a = Object.keys(en).sort().join("|"), b = Object.keys(ru).sort().join("|");
    if (a !== b) throw new Error("ru-data.js: key mismatch at " + path + "\n" + a + "\n" + b);
    Object.keys(en).forEach(function (k) {
      if (typeof en[k] === "string") en[k] = ru[k]; else put(en[k], ru[k], path + "." + k);
    });
  }

  var RU = {
    reroutes: {
      "scrolling": "холодильник", "porn": "скроллинг", "food": "шопинг", "a drink": "работа",
      "work": "одобрение", "approval": "работа", "shopping": "еда", "gaming": "скроллинг"
    },
    needLines: {
      "rest": "Усталость, до которой сон, кажется, не добирается.",
      "comfort": "Хочется, чтобы хоть что-то было мягким. Хотя бы раз.",
      "worth": "Тихая арифметика <em>достаточно ли я хорош</em>, которая идёт под всем остальным.",
      "closeness": "Вокруг люди. А тебя всё равно никто по-настоящему не знает.",
      "safety": "Ждёшь, что вот-вот случится худшее. Всегда.",
      "joy": "Всё работает. Но ничего не поёт."
    },
    agentFineprint: {
      "scrolling": { promise: "быть где-то ещё", delivery: "не здесь — минут на одиннадцать", price: "твой сон, а потом внимание" },
      "porn": { promise: "близость без риска быть узнанным", delivery: "накал — минут на одиннадцать", price: "настоящая близость отдаляется" },
      "food": { promise: "утешение, которое можно взять в руки", delivery: "тепло — минут на одиннадцать", price: "потом само утешение нуждается в утешении" },
      "a drink": { promise: "звук потише", delivery: "сглаженные углы — минут на одиннадцать", price: "завтра, с процентами" },
      "work": { promise: "ценность, которую можно доказать", delivery: "разгон — минут на одиннадцать", price: "отдых начинает казаться долгом" },
      "approval": { promise: "вердикт: ты в порядке", delivery: "тёплое сияние — минут на одиннадцать", price: "твоё настроение отдано на аутсорс" },
      "shopping": { promise: "новый старт с доставкой", delivery: "искра новизны — минут на одиннадцать", price: "проходит раньше, чем спишется платёж" },
      "gaming": { promise: "мир, в котором можно победить", delivery: "прогресс — минут на одиннадцать", price: "жизнь вне игры копится" }
    },
    nodeLabels: {
      personal: {
        pain: { main: "боль", sub: "{need}" },
        craving: { main: "тяга", sub: "желание" },
        behavior: { main: "{agent}", sub: "выход" },
        relief: { main: "облегчение", sub: "~11 минут" },
        shame: { main: "стыд", sub: "счёт" }
      },
      earning: {
        pain: { main: "достаточно?", sub: "вопрос" },
        craving: { main: "докажи", sub: "тяга" },
        behavior: { main: "выступай", sub: "работа" },
        relief: { main: "овации", sub: "доходит" },
        shame: { main: "проходит", sub: "снова счёт" }
      }
    },
    achievements: ["Оценки.", "Повышение.", "Марафон.", "Тебе похлопали.", "«Ты изменился!»", "Идеальная серия."],
    spiralCaption: "боль → принесена, не спрятана → встречена у источника → доверие глубже → плод",
    names: {
      need: { "rest": "отдых", "comfort": "утешение", "worth": "значимость", "closeness": "близость", "safety": "безопасность", "joy": "радость" },
      bindNeed: { "rest": "отдыха", "comfort": "утешения", "worth": "значимости", "closeness": "близости", "safety": "безопасности", "joy": "радости" },
      agent: { "scrolling": "скроллинг", "porn": "порно", "food": "еда", "a drink": "выпивка", "work": "работа", "approval": "одобрение", "shopping": "шопинг", "gaming": "игры" }
    },
    ui: {
      fridge: "холодильник",
      exit: "выход",
      newExit: "новый выход",
      meta: "кругов: {n} · облегчение: тает · стыд: растёт",
      runLabels: ["Запустить петлю", "Ещё раз", "Снова", "Снова", "Ты уже знаешь дорогу"],
      willAgain: "Попробовать силу воли ещё раз",
      willKnows: "Петля уже знает этот трюк",
      received: "принято"
    }
  };

  ["reroutes", "needLines", "agentFineprint", "nodeLabels", "achievements", "spiralCaption", "names", "ui"].forEach(function (k) {
    if (typeof C[k] === "string") C[k] = RU[k]; else put(C[k], RU[k], k);
  });
})();
