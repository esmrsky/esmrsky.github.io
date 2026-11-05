// ============================================================
// AI LANDSCAPE DATA — the perishable file. Edit this to refresh
// the site (or ask Claude Code to: "update landscape-data.js
// with the current state of AI capabilities").
//
// rating:     "strong" | "decent" | "weak"
// trajectory: "fast"   | "steady" | "slow"
// ============================================================

let LANDSCAPE_UPDATED = "June 2026";

const LANDSCAPE_RATINGS = {
  strong: { label: "Strong", dot: "dot-green", desc: "Trust it for real work; verify lightly" },
  decent: { label: "Decent", dot: "dot-yellow", desc: "Useful with supervision; verify the output" },
  weak:   { label: "Weak",   dot: "dot-red",   desc: "Don't rely on it; do this part yourself" }
};

const LANDSCAPE_TRAJECTORIES = {
  fast:   { label: "Improving fast", badge: "badge-green",  arrow: "↑↑" },
  steady: { label: "Improving steadily", badge: "badge-yellow", arrow: "↑" },
  slow:   { label: "Slow / plateaued", badge: "badge-gray", arrow: "→" }
};

const LANDSCAPE = [
  {
    domain: "Writing code",
    sub: "The core competency — and the most transformed.",
    items: [
      {
        name: "Boilerplate, scaffolding & CRUD",
        rating: "strong",
        trajectory: "steady",
        note: "Effectively solved. New project setup, forms, standard endpoints, config files — AI does in minutes what took days. If you're hand-typing boilerplate in 2026, you're doing it wrong."
      },
      {
        name: "Frontend UI from a description",
        rating: "strong",
        trajectory: "fast",
        note: "Describe a dashboard, get a working dashboard. Polish and taste still benefit from human direction ('more whitespace, less purple'), but the floor is now 'pretty good.'"
      },
      {
        name: "Small scripts & automations",
        rating: "strong",
        trajectory: "steady",
        note: "One-off data cleanup, file renaming, API glue — basically perfect. This is free real-world value most non-programmers still don't know they have access to."
      },
      {
        name: "Working in large, messy codebases",
        rating: "decent",
        trajectory: "fast",
        note: "The frontier that matters. Agents now navigate big repos, find the right files, and make multi-file changes — but can miss project conventions and distant side effects. This is improving fastest of anything on this page."
      },
      {
        name: "Novel algorithms & research-grade code",
        rating: "decent",
        trajectory: "steady",
        note: "Great at known patterns, weaker when the solution genuinely doesn't exist in any textbook. Will produce a plausible-looking attempt either way — which is exactly when you must verify."
      }
    ]
  },
  {
    domain: "Beyond writing code",
    sub: "The agentic loop: debugging, reviewing, operating.",
    items: [
      {
        name: "Debugging with full context",
        rating: "decent",
        trajectory: "fast",
        note: "When AI can run the code, read errors, and iterate, it's genuinely good. When it can only stare at a snippet, much weaker. Lesson: give your agent the ability to execute and it gets dramatically smarter."
      },
      {
        name: "Long autonomous tasks (hours, not minutes)",
        rating: "decent",
        trajectory: "fast",
        note: "The 2025–26 jump: agents that work for hours, run tests, and self-correct. Still drift on vague goals — crisp specs and checkpoints are what keep long runs on rails. Improving very fast."
      },
      {
        name: "Code review & bug-finding",
        rating: "decent",
        trajectory: "fast",
        note: "Solid first-pass reviewer: catches real bugs, flags security issues, never gets tired. Misses 'this is technically fine but the wrong design.' Use as the first filter, not the final word."
      },
      {
        name: "Knowing when it's wrong (calibration)",
        rating: "weak",
        trajectory: "slow",
        note: "The most important weakness on this page. AI presents its best guess and its certain knowledge in the same confident voice. Improving, but slowly — YOUR verification habits are the patch. Design workflows assuming confident error."
      },
      {
        name: "Up-to-date knowledge of APIs & libraries",
        rating: "weak",
        trajectory: "steady",
        note: "Frozen at training time; libraries change monthly. Raw model = stale. The fix is tools: agents that search docs or read your installed packages mostly solve this. Weak alone, fine with tooling."
      }
    ]
  },
  {
    domain: "Around the work",
    sub: "Design, writing, ops — the rest of shipping.",
    items: [
      {
        name: "Visual design taste",
        rating: "decent",
        trajectory: "steady",
        note: "Default output is clean-generic, like a competent template. With strong direction and references it gets distinctive. Original art direction is still a human edge."
      },
      {
        name: "Technical writing & docs",
        rating: "strong",
        trajectory: "steady",
        note: "READMEs, explanations, tutorials — excellent, often clearer than humans bother to be. Verify only the factual specifics."
      },
      {
        name: "DevOps & infrastructure",
        rating: "decent",
        trajectory: "steady",
        note: "Writes Docker/CI/deploy configs well; reasons about cloud architecture decently. Production incidents at 3am remain a human-judgment sport — with AI as the fastest log-reader you've ever met."
      },
      {
        name: "Security-sensitive code",
        rating: "decent",
        trajectory: "steady",
        note: "Knows the best practices and follows them — usually. 'Usually' is a problem in security. Anything touching auth, money, or personal data needs review by someone (or something) whose only job is finding flaws."
      },
      {
        name: "Understanding what users actually want",
        rating: "weak",
        trajectory: "slow",
        note: "AI builds what you SAY, not what you MEAN, and has no access to your users' unspoken needs. Product judgment is the most durable human skill on this page — that's a career hint."
      }
    ]
  }
];

// "So what should I do" — rendered at the bottom of the page.
const LANDSCAPE_TAKEAWAYS = [
  {
    title: "Position yourself at the weak spots",
    body: "Calibration, product judgment, verification, taste. Every red dot above is a place humans add value. Every green dot is a place to delegate without guilt."
  },
  {
    title: "Watch the 'improving fast' column",
    body: "Anything marked ↑↑ will be a tier better within a year. Don't build your skills (or your startup) on a weakness that's about to disappear — build on the slow-moving ones."
  },
  {
    title: "Tools beat raw models",
    body: "Half the 'weak' ratings flip to 'decent or better' when the AI can execute code, search docs, and see results. When AI disappoints you, first ask: did I give it the tools to check itself?"
  }
];

// ============================================================
// RUSSIAN PAYLOAD — runs only on /ru/ pages (<html data-lang="ru">).
// Swaps the text in place, keyed by the English name, and throws if the
// English data and this table ever drift apart. Dates and ratings are not
// touched: only the words around them.
// ============================================================
(function () {
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;

  LANDSCAPE_UPDATED = "июнь 2026";

  const RU_RATINGS = {
    strong: ["Сильно", "Можно доверять в серьёзной работе; проверяй вполглаза"],
    decent: ["Неплохо", "Полезно под присмотром; проверяй результат"],
    weak:   ["Слабо", "Не полагайся; эту часть делай сам"]
  };
  const RU_TRAJ = {
    fast:   "Быстро растёт",
    steady: "Растёт стабильно",
    slow:   "Медленно / на плато"
  };
  Object.keys(LANDSCAPE_RATINGS).forEach((k) => {
    if (!RU_RATINGS[k]) throw new Error("landscape RU: rating " + k);
    LANDSCAPE_RATINGS[k].label = RU_RATINGS[k][0];
    LANDSCAPE_RATINGS[k].desc = RU_RATINGS[k][1];
  });
  Object.keys(LANDSCAPE_TRAJECTORIES).forEach((k) => {
    if (!RU_TRAJ[k]) throw new Error("landscape RU: trajectory " + k);
    LANDSCAPE_TRAJECTORIES[k].label = RU_TRAJ[k];
  });

  // domain -> [domain, sub, { item name: [name, note] }]
  const RU_DOMAINS = {
    "Writing code": ["Написание кода", "Основная компетенция — и самая преобразившаяся.", {
      "Boilerplate, scaffolding & CRUD": ["Шаблонный код, каркасы и CRUD",
        "По сути решено. Настройка нового проекта, формы, типовые эндпоинты, конфиги: ИИ за минуты делает то, на что уходили дни. Если в 2026 году ты печатаешь шаблонный код руками, ты делаешь что-то не так."],
      "Frontend UI from a description": ["Фронтенд-интерфейс по описанию",
        "Опиши дашборд — получи работающий дашборд. Лоск и вкус по-прежнему выигрывают от человеческого направления («больше воздуха, меньше фиолетового»), но нижняя планка теперь «довольно хорошо»."],
      "Small scripts & automations": ["Небольшие скрипты и автоматизации",
        "Разовая чистка данных, переименование файлов, склейка API — практически идеально. Это бесплатная реальная польза, о доступе к которой большинство непрограммистов всё ещё не знает."],
      "Working in large, messy codebases": ["Работа в больших запутанных кодовых базах",
        "Граница, которая важна. Агенты уже ориентируются в больших репозиториях, находят нужные файлы и вносят правки сразу в несколько файлов, но могут упускать соглашения проекта и далёкие побочные эффекты. Здесь рост быстрее, чем у чего-либо на этой странице."],
      "Novel algorithms & research-grade code": ["Новые алгоритмы и исследовательский код",
        "Отлично с известными паттернами, слабее там, где решения по-настоящему нет ни в одном учебнике. В любом случае выдаст правдоподобную попытку, а это как раз тот момент, когда нужно проверять."]
    }],
    "Beyond writing code": ["Помимо написания кода", "Агентный цикл: отладка, ревью, эксплуатация.", {
      "Debugging with full context": ["Отладка с полным контекстом",
        "Когда ИИ может запускать код, читать ошибки и повторять, он действительно хорош. Когда может лишь смотреть на фрагмент, намного слабее. Вывод: дай агенту возможность выполнять код, и он станет заметно умнее."],
      "Long autonomous tasks (hours, not minutes)": ["Долгие автономные задачи (часы, а не минуты)",
        "Скачок 2025–26 годов: агенты работают часами, запускают тесты и сами себя поправляют. Всё ещё уплывают от расплывчатых целей; держат длинные запуски на рельсах чёткие задачи и контрольные точки. Растёт очень быстро."],
      "Code review & bug-finding": ["Код-ревью и поиск багов",
        "Крепкий ревьюер первого прохода: находит настоящие баги, замечает проблемы безопасности, никогда не устаёт. Пропускает вещи вроде «технически всё нормально, но дизайн неверный». Используй как первый фильтр, а не последнее слово."],
      "Knowing when it's wrong (calibration)": ["Понимание, когда он ошибается (калибровка)",
        "Самая важная слабость на этой странице. ИИ подаёт свою лучшую догадку и твёрдое знание одним и тем же уверенным голосом. Улучшается, но медленно: ЗАПЛАТКА здесь — твои привычки проверки. Выстраивай процессы в расчёте на уверенную ошибку."],
      "Up-to-date knowledge of APIs & libraries": ["Актуальные знания об API и библиотеках",
        "Заморожены на моменте обучения, а библиотеки меняются ежемесячно. Голая модель = устаревшее. Решают это инструменты: агенты, которые ищут в документации или читают твои установленные пакеты, в основном закрывают проблему. Слабо сам по себе, нормально с инструментами."]
    }],
    "Around the work": ["Вокруг работы", "Дизайн, тексты, эксплуатация — всё остальное, что нужно для выпуска.", {
      "Visual design taste": ["Визуальный вкус в дизайне",
        "Результат по умолчанию — чистая безликость, как у приличного шаблона. С сильным направлением и референсами становится выразительным. Оригинальное арт-дирекшн всё ещё преимущество человека."],
      "Technical writing & docs": ["Технические тексты и документация",
        "README, объяснения, туториалы: отлично, часто яснее, чем люди удосуживаются писать. Проверяй только фактические детали."],
      "DevOps & infrastructure": ["DevOps и инфраструктура",
        "Хорошо пишет конфиги Docker/CI/деплоя; прилично рассуждает об облачной архитектуре. Производственные аварии в 3 часа ночи остаются видом спорта, где решает человеческое суждение, а ИИ служит самым быстрым читателем логов, которого ты встречал."],
      "Security-sensitive code": ["Код, связанный с безопасностью",
        "Знает лучшие практики и следует им, обычно. «Обычно» в безопасности — проблема. Всё, что касается авторизации, денег или персональных данных, должно пройти проверку кем-то (или чем-то), чья единственная задача — искать изъяны."],
      "Understanding what users actually want": ["Понимание того, чего на самом деле хотят пользователи",
        "ИИ строит то, что ты ГОВОРИШЬ, а не то, что ты ИМЕЕШЬ В ВИДУ, и не имеет доступа к невысказанным потребностям твоих пользователей. Продуктовое суждение — самый долговечный человеческий навык на этой странице. Это подсказка для карьеры."]
    }]
  };

  const RU_TAKEAWAYS = {
    "Position yourself at the weak spots": ["Встань на слабых местах",
      "Калибровка, продуктовое суждение, проверка, вкус. Каждая красная точка выше — место, где люди добавляют ценность. Каждая зелёная — место, где можно без угрызений совести делегировать."],
    "Watch the 'improving fast' column": ["Следи за колонкой «быстро растёт»",
      "Всё, что помечено ↑↑, через год станет на класс лучше. Не строй свои навыки (или свой стартап) на слабости, которая вот-вот исчезнет: строй на медленно меняющихся."],
    "Tools beat raw models": ["Инструменты бьют голые модели",
      "Половина оценок «слабо» превращается в «неплохо» и лучше, когда ИИ может выполнять код, искать в документации и видеть результаты. Когда ИИ тебя разочаровал, сначала спроси себя: дал ли я ему инструменты, чтобы проверить себя?"]
  };

  const dSeen = new Set();
  LANDSCAPE.forEach((d) => {
    const r = RU_DOMAINS[d.domain];
    if (!r) throw new Error("landscape RU: no domain " + d.domain);
    dSeen.add(d.domain);
    const iSeen = new Set();
    d.items.forEach((it) => {
      const ri = r[2][it.name];
      if (!ri) throw new Error("landscape RU: no item " + it.name);
      iSeen.add(it.name);
      it.name = ri[0]; it.note = ri[1];
    });
    if (iSeen.size !== Object.keys(r[2]).length) throw new Error("landscape RU: item count in " + d.domain);
    d.domain = r[0]; d.sub = r[1];
  });
  if (dSeen.size !== Object.keys(RU_DOMAINS).length) throw new Error("landscape RU: domain count");

  const tSeen = new Set();
  LANDSCAPE_TAKEAWAYS.forEach((t) => {
    const r = RU_TAKEAWAYS[t.title];
    if (!r) throw new Error("landscape RU: no takeaway " + t.title);
    tSeen.add(t.title);
    t.title = r[0]; t.body = r[1];
  });
  if (tSeen.size !== Object.keys(RU_TAKEAWAYS).length) throw new Error("landscape RU: takeaway count");
})();
