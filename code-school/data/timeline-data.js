// ============================================================
// TIMELINE DATA — eras of building software, what people
// poured years into then, and what of it still matters.
// future: true → rendered as a dashed "what's coming" node.
// ============================================================

const TIMELINE = [
  {
    era: "1995–2004",
    title: "The handmade web",
    desc: "Every page hand-written in HTML, styled with tables and hacks, uploaded over FTP. 'Webmaster' was one person doing everything. View Source was how everyone learned.",
    tags: ["HTML", "FTP", "GeoCities", "Flash"],
    then: "Hand-coding pages, browser quirks, Flash animation.",
    still: "The core model — browser asks, server answers, HTML comes back — is unchanged 30 years later. Learn it once, it never expires."
  },
  {
    era: "2004–2010",
    title: "The dynamic web (Web 2.0)",
    desc: "Sites became apps: Gmail, Facebook, YouTube. PHP + MySQL powered everything; jQuery papered over browser chaos; 'AJAX' (updating pages without reloading) felt like magic.",
    tags: ["PHP", "MySQL", "jQuery", "AJAX"],
    then: "jQuery tricks, PHP patterns, cross-browser CSS hacks — entire careers of accumulated workarounds.",
    still: "Databases and the request/response model. The jQuery-era trivia is fully obsolete — a preview of what happens to all tool-specific knowledge."
  },
  {
    era: "2010–2016",
    title: "Mobile, cloud & the framework wars",
    desc: "iPhone made every site need a mobile story. AWS made servers rentable by the minute. JavaScript ate the world: Node on servers, then Angular/React/Vue fighting for the frontend.",
    tags: ["AWS", "Node.js", "React", "Responsive design"],
    then: "Framework-of-the-month mastery, build-tool configuration, 'full-stack JavaScript' as identity.",
    still: "Component thinking (UIs as nestable lego blocks) won permanently. Cloud literacy matters. The specific framework API knowledge depreciated — AI now holds it for you."
  },
  {
    era: "2016–2022",
    title: "The professionalized era",
    desc: "Software engineering became industrial: TypeScript, CI/CD, Docker, Kubernetes, code review culture, design systems. Huge salaries, LeetCode interview gauntlets, bootcamps everywhere.",
    tags: ["TypeScript", "Docker", "CI/CD", "LeetCode era"],
    then: "Algorithm grinding for interviews, infrastructure YAML expertise, framework specialization.",
    still: "The PRACTICES survive — code review, automated testing, small frequent releases. They turned out to be exactly the safety rails needed for AI-generated code. The interview grind is fading."
  },
  {
    era: "2021–2023",
    title: "First contact",
    desc: "GitHub Copilot (2021) autocompletes whole functions. ChatGPT (Nov 2022) shows everyone that AI can code. GPT-4 and Claude (2023) make it undeniable. Mood swings between 'toy' and 'we're all unemployed.'",
    tags: ["Copilot", "ChatGPT", "GPT-4", "Claude"],
    then: "Prompt 'tricks', copy-pasting between ChatGPT and the editor, arguing about whether it's real.",
    still: "The lesson that survived: AI output quality tracks the clarity of what you asked for. The copy-paste workflow itself was transitional — agents replaced it."
  },
  {
    era: "2024–2025",
    title: "The agentic turn",
    desc: "AI stops just suggesting and starts DOING: reading repos, editing files, running tests, fixing its own errors. Claude Code, MCP, and 'agent' becomes the word of the year. 'Vibe coding' is coined. Non-programmers ship real apps.",
    tags: ["Claude Code", "Agents", "MCP", "Vibe coding"],
    then: "Early-adopter workflows, tool churn, figuring out what to delegate.",
    still: "This era's habits are CURRENT: spec clearly, let agents execute, review diffs, keep git as the safety net. You're learning them at the right time."
  },
  {
    era: "2026 — now",
    title: "Supervising fleets",
    desc: "The frontier moves from 'AI helps me code' to 'I direct AI that codes.' Multiple agents in parallel, background tasks that run for hours, AI doing first-pass code review of AI. The human role consolidates: deciding, specifying, verifying.",
    tags: ["Multi-agent", "Background agents", "AI code review"],
    then: "—",
    still: "The defining skill split: people who can JUDGE software (is this right? is this good? is this what users need?) pull ahead of people who could merely produce it."
  },
  {
    era: "Next few years",
    title: "What's coming (hold loosely)",
    future: true,
    desc: "Safe-ish bets: agents reliable enough for week-long projects; verification and testing increasingly automated; building software gets as accessible as making a spreadsheet. Genuinely uncertain: timelines, jobs, and everything anyone says with confidence.",
    tags: ["Longer autonomy", "Cheaper intelligence", "More builders"],
    then: "—",
    still: "Strategy for an uncertain curve: invest in what every scenario rewards — judgment, taste, domain knowledge, clear communication, and knowing how systems fit together. Rent the rest from the AI."
  }
];

// ============================================================
// RUSSIAN PAYLOAD — runs only on /ru/ pages (<html data-lang="ru">).
// Swaps the text in place, keyed by the English title, and throws if the
// English data and this table ever drift apart. Era dates are left as they are
// except the two words-only eras.
// ============================================================
(function () {
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;

  // title -> [era or null (keep), title, desc, tags, then, still]
  const RU_TL = {
    "The handmade web": [null, "Веб, сделанный вручную",
      "Каждая страница написана руками на HTML, оформлена таблицами и хаками и загружена по FTP. «Вебмастер» был одним человеком, который делал всё. «Просмотр кода» был тем, как учились все.",
      ["HTML", "FTP", "GeoCities", "Flash"],
      "Ручное кодирование страниц, причуды браузеров, анимация во Flash.",
      "Базовая модель — браузер спрашивает, сервер отвечает, возвращается HTML — не изменилась за 30 лет. Выучи один раз — и она никогда не устареет."],
    "The dynamic web (Web 2.0)": [null, "Динамический веб (Web 2.0)",
      "Сайты стали приложениями: Gmail, Facebook, YouTube. На PHP + MySQL работало всё; jQuery затыкал браузерный хаос; «AJAX» (обновление страниц без перезагрузки) казался магией.",
      ["PHP", "MySQL", "jQuery", "AJAX"],
      "Трюки jQuery, паттерны PHP, кроссбраузерные хаки для CSS: целые карьеры накопленных обходных путей.",
      "Базы данных и модель «запрос — ответ». Мелочи эпохи jQuery полностью устарели — предвкушение того, что случается со всеми знаниями об отдельных инструментах."],
    "Mobile, cloud & the framework wars": [null, "Мобильные устройства, облако и войны фреймворков",
      "iPhone заставил каждый сайт продумывать мобильную версию. AWS сделал серверы арендуемыми по минутам. JavaScript съел мир: Node на серверах, а затем Angular/React/Vue, дерущиеся за фронтенд.",
      ["AWS", "Node.js", "React", "Адаптивный дизайн"],
      "Мастерство во «фреймворке месяца», настройка сборщиков, «фулстек на JavaScript» как идентичность.",
      "Компонентное мышление (интерфейсы как вкладываемые кубики лего) победило навсегда. Облачная грамотность важна. Знание API конкретных фреймворков обесценилось — теперь его за тебя держит ИИ."],
    "The professionalized era": [null, "Эпоха профессионализации",
      "Разработка стала индустриальной: TypeScript, CI/CD, Docker, Kubernetes, культура код-ревью, дизайн-системы. Огромные зарплаты, собеседования-марафоны с LeetCode, буткемпы повсюду.",
      ["TypeScript", "Docker", "CI/CD", "Эпоха LeetCode"],
      "Зубрёжка алгоритмов для собеседований, экспертиза в YAML-инфраструктуре, специализация на фреймворках.",
      "ПРАКТИКИ выжили: код-ревью, автоматические тесты, мелкие частые релизы. Оказалось, что это именно те ограждения, которые нужны для кода, сгенерированного ИИ. Собеседовательная зубрёжка уходит."],
    "First contact": [null, "Первый контакт",
      "GitHub Copilot (2021) автодополняет целые функции. ChatGPT (ноябрь 2022) показывает всем, что ИИ умеет программировать. GPT-4 и Claude (2023) делают это неоспоримым. Настроение качается между «игрушка» и «мы все останемся без работы».",
      ["Copilot", "ChatGPT", "GPT-4", "Claude"],
      "«Трюки» с промптами, копирование туда-сюда между ChatGPT и редактором, споры о том, настоящее ли это.",
      "Урок, который пережил время: качество результата ИИ следует за ясностью того, о чём ты просил. Сам процесс с копированием был переходным — его заменили агенты."],
    "The agentic turn": [null, "Агентный поворот",
      "ИИ перестаёт только подсказывать и начинает ДЕЛАТЬ: читает репозитории, правит файлы, запускает тесты, исправляет собственные ошибки. Claude Code, MCP, а «агент» становится словом года. Появляется «вайб-кодинг». Непрограммисты выпускают настоящие приложения.",
      ["Claude Code", "Агенты", "MCP", "Вайб-кодинг"],
      "Процессы первопроходцев, смена инструментов, выяснение того, что можно делегировать.",
      "Привычки этой эпохи АКТУАЛЬНЫ: чётко ставь задачу, давай агентам выполнять, проверяй diff, держи git как страховочную сетку. Ты осваиваешь их в самое подходящее время."],
    "Supervising fleets": ["2026 — сейчас", "Управление флотами",
      "Передний край смещается от «ИИ помогает мне программировать» к «я руковожу ИИ, который программирует». Несколько агентов параллельно, фоновые задачи, идущие часами, ИИ, делающий первичное код-ревью кода ИИ. Роль человека сжимается до: решать, ставить задачу, проверять.",
      ["Мультиагентность", "Фоновые агенты", "Код-ревью с ИИ"],
      "—",
      "Главное разделение навыков: те, кто умеет ОЦЕНИВАТЬ софт (это правильно? это хорошо? это то, что нужно пользователям?), уходят вперёд от тех, кто умел его только производить."],
    "What's coming (hold loosely)": ["Ближайшие годы", "Что впереди (держи это не слишком крепко)",
      "Относительно надёжные ставки: агенты, достаточно надёжные для проектов на неделю; проверка и тестирование всё больше автоматизируются; создавать софт становится так же доступно, как делать таблицу. По-настоящему неопределённо: сроки, рабочие места и всё, что кто-либо говорит с уверенностью.",
      ["Больше автономности", "Дешевле интеллект", "Больше создателей"],
      "—",
      "Стратегия для неопределённой кривой: вкладывайся в то, что вознаграждается в любом сценарии, — суждение, вкус, знание предметной области, ясное общение и понимание того, как системы сочетаются. Остальное арендуй у ИИ."]
  };

  const seen = new Set();
  TIMELINE.forEach((it) => {
    const r = RU_TL[it.title];
    if (!r) throw new Error("timeline RU: no translation for " + it.title);
    if (r[3].length !== it.tags.length) throw new Error("timeline RU: tag count for " + it.title);
    if ((it.then === "—") !== (r[4] === "—")) throw new Error("timeline RU: then mismatch for " + it.title);
    seen.add(it.title);
    if (r[0]) it.era = r[0];
    it.title = r[1]; it.desc = r[2]; it.tags = r[3]; it.then = r[4]; it.still = r[5];
  });
  if (seen.size !== Object.keys(RU_TL).length) throw new Error("timeline RU: table has entries the English lacks");
})();
