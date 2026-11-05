/* ============ Get Uncooked — shared logic ============ */

/* localStorage can throw (privacy modes, blocked storage) — never let it break the page */
function storeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* persistence is a nice-to-have */ }
}


/* ---------- language ---------- */
/* English is the default. On /uncooked/ru/ the generator sets data-lang="ru"; the Russian for every string this
   file writes lives in UI_RU below, keyed by the English string. TXT never falls back silently: a key that is
   missing in Russian throws, so a new English string cannot ship untranslated. The pattern and quiz content is
   translated the same way in data-ru.js. Never name this helper L. */
const IS_RU = document.documentElement.getAttribute("data-lang") === "ru";
const UI_RU = {
  "Get Uncooked": "Расклиниться",
  "Get <span class=\"un\">Uncooked</span>": "<span class=\"un\">Расклиниться</span>",
  "Language": "Язык",
  "Diagnostic": "Диагностика",
  "Patterns": "Петли",
  "Get help": "Помощь",
  "of": "из",
  "Question": "Вопрос",
  "PATTERN": "ПЕТЛЯ",
  "Pattern": "Петля",
  "<strong>Get <span style=\"color:var(--cool)\">Uncooked</span></strong> — six loops, the mechanics behind each, and the way out.": "<strong><span style=\"color:var(--cool)\">Расклиниться</span></strong> — шесть петель, механика каждой и выход.",
  "This site is education and encouragement, not therapy, diagnosis, or a substitute for professional care.": "Этот сайт — просвещение и поддержка, а не терапия, не диагностика и не замена профессиональной помощи.",
  "Curious about the Bible overlap? The full argument →": "Любопытно про пересечение с Библией? Полный аргумент →",
  "← All projects": "← Все проекты",
  "Thinking about suicide or self-harm? Support is here →": "Думаешь о самоубийстве или самоповреждении? Поддержка здесь →",
  "Care &amp; counseling resources →": "Ресурсы помощи и консультаций →",
  "The Patterns": "Петли",
  "The field guide": "Путеводитель",
  "The six loops": "Шесть петель",
  "Being stuck isn't random — it's a loop, and loops have known mechanics. Find yours, see how it runs, and learn the counter-practice. Or <a href=\"quiz.html\">take the diagnostic</a> and let it find you.": "Застревание не случайно: это петля, а у петель известная механика. Найди свою, посмотри, как она устроена, и освой практику-противовес. Или <a href=\"quiz.html\">пройди диагностику</a>, и она найдёт её за тебя.",
  "The old map": "Старая карта",
  "(optional)": "(по желанию)",
  "Where it overlaps with the protocol": "Где это пересекается с протоколом",
  "Interested in the bigger picture? <a href=\"why.html\">The full overlap argument is here</a> — including what it does and doesn't claim.": "Интересна картина целиком? <a href=\"why.html\">Полный аргумент о пересечении здесь</a> — в том числе что он утверждает, а что нет.",
  "How the loop runs": "Как работает петля",
  "What's happening in your brain": "Что происходит в мозге",
  "The mechanism": "Механизм",
  "The short version": "Коротко",
  "Sources &amp; further reading": "Источники и что почитать дальше",
  "The counter-practice": "Практика-противовес",
  "Read this first": "Прочти сначала",
  "Checkboxes save on this device, so you can come back to your plan. <button class=\"linklike\" onclick=\"window.print()\">Print this page</button> if paper works better.": "Галочки сохраняются на этом устройстве, так что к плану можно вернуться. <button class=\"linklike\" onclick=\"window.print()\">Распечатай страницу</button>, если на бумаге удобнее.",
  "If you only do one thing": "Если сделаешь только одно",
  "A line you should not cross alone": "Черта, которую не стоит переходить одному",
  "If this pattern involves a substance you can't stop, or thoughts of suicide or self-harm — that's beyond a website, and getting real help is the strong move, not the weak one. <a href=\"help.html\">Care resources are here</a>, and <a href=\"crisis.html\">crisis support is here</a>.": "Если в этой петле есть вещество, которое ты не можешь бросить, или мысли о самоубийстве или самоповреждении — это уже за пределами возможностей сайта, и обратиться за настоящей помощью — сильный шаг, а не слабый. <a href=\"help.html\">Ресурсы помощи здесь</a>, а <a href=\"crisis.html\">кризисная поддержка — здесь</a>.",
  "Loops that feed this one": "Петли, которые питают эту",
  "← All six patterns": "← Все шесть петель",
  "Take the diagnostic": "Пройти диагностику",
  "← back": "← назад",
  "Found it. Here's your loop.": "Нашлось. Вот твоя петля.",
  "No judgment — a loop is a mechanism, not a verdict. Knowing which one you're in is most of the battle.": "Без осуждения: петля — это механизм, а не приговор. Знать, в какой ты, — уже большая часть победы.",
  "YOUR PRIMARY PATTERN": "ТВОЯ ГЛАВНАЯ ПЕТЛЯ",
  "Read your full breakdown →": "Читать полный разбор →",
  "RUNNING A CLOSE SECOND": "СОВСЕМ БЛИЗКО — ВТОРАЯ",
  "Your full profile": "Твой полный профиль",
  "Most people run 2–3 loops that feed each other. Your primary is the one to start with — the others usually loosen when it does.": "У большинства людей работают 2–3 петли, которые питают друг друга. Начинать нужно с главной: остальные обычно слабеют вслед за ней.",
  "Real talk before you go": "Честно, прежде чем уйдёшь",
  "If what's underneath your answers includes thoughts of suicide or self-harm, a quiz isn't the tool for that — <a href=\"crisis.html\">crisis support is here</a>, free and anonymous, right now. If a substance has you, <a href=\"help.html\">real care is here</a>.": "Если за твоими ответами стоят мысли о самоубийстве или самоповреждении, тест — не тот инструмент: <a href=\"crisis.html\">кризисная поддержка здесь</a>, бесплатно и анонимно, прямо сейчас. Если тебя держит вещество, <a href=\"help.html\">настоящая помощь здесь</a>.",
  "↻ retake the diagnostic": "↻ пройти диагностику заново"
};
function TXT(s) {
  if (!IS_RU) return s;
  if (!Object.hasOwn(UI_RU, s)) throw new Error("uncooked RU: no translation for " + JSON.stringify(s));
  return UI_RU[s];
}
/* НРП notice, Russian page only (quoted Scripture on the pattern pages is Новый русский перевод) */
const NRT_NOTE_RU = `<p class="faint">Библейские цитаты приводятся по Новому русскому переводу (НРП®) © <a href="https://www.biblica.com/permissions/" target="_blank" rel="noopener" style="color:inherit">Biblica, Inc.</a>® Используется по разрешению. Все права защищены.</p>`;

/* EN · RU switch: each page links to its own twin (/uncooked/x.html <-> /uncooked/ru/x.html), query kept */
function langSwitchHTML() {
  const path = location.pathname, tail = location.search + location.hash;
  const en = IS_RU ? path.replace(/\/ru\/(?=[^/]*$)/, "/") : path;
  const ru = IS_RU ? path : path.replace(/\/([^/]*)$/, "/ru/$1");
  return `<div class="lang-switch" role="group" aria-label="${TXT("Language")}">
        <a class="lang-opt" href="${en}${tail}" lang="en" hreflang="en"${IS_RU ? "" : ' aria-current="page"'}>EN</a>
        <a class="lang-opt" href="${ru}${tail}" lang="ru" hreflang="ru"${IS_RU ? ' aria-current="page"' : ""}>RU</a>
      </div>`;
}

/* ---------- shared chrome ---------- */

function renderNav() {
  const el = document.getElementById("nav");
  if (!el) return;
  el.innerHTML = `
    <div class="nav-inner">
      <a class="brand" href="index.html">${TXT('Get <span class="un">Uncooked</span>')}</a>
      <div class="nav-links">
        <a href="quiz.html">${TXT("Diagnostic")}</a>
        <a href="pattern.html">${TXT("Patterns")}</a>
        <a href="help.html">${TXT("Get help")}</a>
      </div>
      ${langSwitchHTML()}
    </div>`;
}

function renderFooter() {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `
    <div class="wrap">
      <div>
        <p>${TXT('<strong>Get <span style="color:var(--cool)">Uncooked</span></strong> — six loops, the mechanics behind each, and the way out.')}</p>
        <p>${TXT("This site is education and encouragement, not therapy, diagnosis, or a substitute for professional care.")}</p>
        <p><a href="why.html">${TXT("Curious about the Bible overlap? The full argument →")}</a></p>
        <p><a class="home" href="${IS_RU ? "https://esmrsky.github.io/ru/" : "https://esmrsky.github.io/"}">${TXT("← All projects")}</a></p>
        ${IS_RU ? NRT_NOTE_RU : ""}
      </div>
      <div>
        <p><a href="crisis.html">${TXT("Thinking about suicide or self-harm? Support is here →")}</a></p>
        <p><a href="help.html">${TXT("Care &amp; counseling resources →")}</a></p>
      </div>
    </div>`;
}

/* ---------- pattern grid (used on index + pattern fallback) ---------- */

function patternGridHTML() {
  return Object.values(PATTERNS).map(p => `
    <a class="card" href="pattern.html?p=${p.slug}">
      <div class="num">${TXT("PATTERN")} ${p.num}</div>
      <h3>${p.name}</h3>
      <p class="tag">${p.tag}</p>
    </a>`).join("");
}

/* ---------- pattern page ---------- */

function renderPatternPage() {
  const root = document.getElementById("pattern-root");
  if (!root) return;

  const slug = new URLSearchParams(location.search).get("p");
  const p = slug && Object.hasOwn(PATTERNS, slug) ? PATTERNS[slug] : null;

  if (!p) {
    document.title = `${TXT("The Patterns")} — ${TXT("Get Uncooked")}`;
    root.innerHTML = `
      <header class="pattern-header wrap">
        <div class="kicker">${TXT("The field guide")}</div>
        <h1>${TXT("The six loops")}</h1>
        <p class="tagline">${TXT("Being stuck isn't random — it's a loop, and loops have known mechanics. Find yours, see how it runs, and learn the counter-practice. Or <a href=\"quiz.html\">take the diagnostic</a> and let it find you.")}</p>
      </header>
      <div class="wrap"><div class="grid">${patternGridHTML()}</div></div>`;
    return;
  }

  document.title = `${p.name} — ${TXT("Get Uncooked")}`;

  const para = (arr) => arr.map(t => `<p>${t}</p>`).join("");
  const loop = p.loop.map(s =>
    `<li><span class="step-title">${s.t}</span><span class="step-body">${s.b}</span></li>`).join("");
  const refs = p.science.refs.map(r => `<li>${r}</li>`).join("");

  const doneKey = `uncook_steps_${p.slug}`;
  let done = [];
  try { done = JSON.parse(storeGet(doneKey)) || []; } catch { done = []; }

  const steps = p.practice.steps.map((s, i) => `
    <div class="practice-step ${done[i] ? "done" : ""}">
      <label>
        <input type="checkbox" data-step="${i}" ${done[i] ? "checked" : ""}>
        <span><h4>${s.t}</h4><p>${s.b}</p></span>
      </label>
    </div>`).join("");

  const related = p.related.map(rs => {
    const r = PATTERNS[rs];
    return `<a class="card" href="pattern.html?p=${r.slug}">
      <div class="num">${TXT("PATTERN")} ${r.num}</div><h3>${r.name}</h3><p class="tag">${r.tag}</p></a>`;
  }).join("");

  const bible = p.bible ? `
    <details class="flyout">
      <summary><span class="flyout-icon">📜</span> <strong>${TXT("The old map")}</strong> — ${p.bible.title} <span class="faint">${TXT("(optional)")}</span></summary>
      <div class="flyout-body">
        ${para(p.bible.paras)}
        <blockquote>${p.bible.quote.text}<cite>— ${p.bible.quote.cite}</cite></blockquote>
        <h4>${TXT("Where it overlaps with the protocol")}</h4>
        <ul class="overlaps">${p.bible.overlaps.map(o => `<li>${o}</li>`).join("")}</ul>
        <p class="faint">${TXT("Interested in the bigger picture? <a href=\"why.html\">The full overlap argument is here</a> — including what it does and doesn't claim.")}</p>
      </div>
    </details>` : "";

  root.innerHTML = `
    <header class="pattern-header wrap">
      <div class="kicker">${TXT("Pattern")} ${p.num} ${TXT("of")} 06</div>
      <h1>${p.name}</h1>
      <p class="tagline">${p.tag}</p>
    </header>

    <div class="wrap">
      ${para(p.hook)}

      <h2>${TXT("How the loop runs")}</h2>
      <ol class="loop-steps">${loop}</ol>

      <div class="section-label sci">${TXT("What's happening in your brain")}</div>
      <h2 class="mt-0">${TXT("The mechanism")}</h2>
      <div class="callout"><div class="callout-title" style="color:var(--cool)">${TXT("The short version")}</div><p>${p.science.tldr}</p></div>
      ${para(p.science.paras)}
      <details><summary class="faint" style="cursor:pointer">${TXT("Sources &amp; further reading")}</summary>
        <ul class="refs">${refs}</ul>
      </details>

      <h2>${TXT("The counter-practice")}</h2>
      <p>${p.practice.lead}</p>
      ${p.practice.safety ? `
      <div class="callout warn">
        <div class="callout-title">${TXT("Read this first")}</div>
        <p>${p.practice.safety}</p>
      </div>` : ""}
      <div id="practice-steps">${steps}</div>
      <p class="faint">${TXT("Checkboxes save on this device, so you can come back to your plan. <button class=\"linklike\" onclick=\"window.print()\">Print this page</button> if paper works better.")}</p>

      <div class="one-thing">
        <div class="callout-title">${TXT("If you only do one thing")}</div>
        <p>${p.practice.oneThing}</p>
      </div>

      ${bible}

      <div class="callout warn">
        <div class="callout-title">${TXT("A line you should not cross alone")}</div>
        <p>${TXT("If this pattern involves a substance you can't stop, or thoughts of suicide or self-harm — that's beyond a website, and getting real help is the strong move, not the weak one. <a href=\"help.html\">Care resources are here</a>, and <a href=\"crisis.html\">crisis support is here</a>.")}</p>
      </div>

      <div class="related">
        <h2>${TXT("Loops that feed this one")}</h2>
        <div class="grid">${related}</div>
        <p style="margin-top:1.5em"><a href="pattern.html">${TXT("← All six patterns")}</a> · <a href="quiz.html">${TXT("Take the diagnostic")}</a></p>
      </div>
    </div>`;

  document.getElementById("practice-steps").addEventListener("change", (e) => {
    const i = e.target.dataset?.step;
    if (i === undefined) return;
    done[i] = e.target.checked;
    storeSet(doneKey, JSON.stringify(done));
    e.target.closest(".practice-step").classList.toggle("done", e.target.checked);
  });
}

/* ---------- quiz ---------- */

function renderQuiz() {
  const root = document.getElementById("quiz-root");
  if (!root) return;

  let i = 0;            // current question index
  const picks = [];     // chosen option per question

  function showQuestion() {
    const q = QUIZ[i];

    root.innerHTML = `
      <div class="quiz-progress"><div class="bar" style="transform:scaleX(${i / QUIZ.length})"></div></div>
      <p class="faint">${TXT("Question")} ${i + 1} ${TXT("of")} ${QUIZ.length}</p>
      <p class="quiz-q">${q.q}</p>
      ${q.opts.map((o, j) => `<button class="quiz-opt" data-j="${j}">${o.text}</button>`).join("")}
      ${i > 0 ? `<button class="quiz-back" id="back">${TXT("← back")}</button>` : ""}
    `;

    root.querySelectorAll(".quiz-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        picks[i] = QUIZ[i].opts[+btn.dataset.j];
        i++;
        if (i >= QUIZ.length) showResults();
        else { showQuestion(); window.scrollTo(0, 0); }
      });
    });

    const back = document.getElementById("back");
    if (back) back.addEventListener("click", () => { i--; showQuestion(); });
  }

  function showResults() {
    const scores = {};
    Object.keys(PATTERNS).forEach(k => scores[k] = 0);
    picks.forEach(opt => {
      Object.entries(opt.w).forEach(([k, v]) => scores[k] += v);
    });

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const max = ranked[0][1] || 1;
    const [first, second] = ranked;
    const p1 = PATTERNS[first[0]];
    const p2 = PATTERNS[second[0]];
    const secondClose = second[1] >= first[1] - 1 && second[1] > 0;

    const bars = ranked.map(([k, v]) => `
      <div class="result-bar-row">
        <span class="label">${PATTERNS[k].name.replace("The ", "")}</span>
        <div class="result-bar-track"><div class="result-bar-fill" style="width:${Math.round((v / max) * 100)}%"></div></div>
      </div>`).join("");

    root.innerHTML = `
      <div class="quiz-progress"><div class="bar" style="transform:scaleX(1)"></div></div>
      <h1 style="font-size:2rem">${TXT("Found it. Here's your loop.")}</h1>
      <p class="dim">${TXT("No judgment — a loop is a mechanism, not a verdict. Knowing which one you're in is most of the battle.")}</p>

      <a class="card result-primary" href="pattern.html?p=${p1.slug}" style="margin:1.5em 0; display:block">
        <div class="num">${TXT("YOUR PRIMARY PATTERN")}</div>
        <h3 style="font-size:1.5rem">${p1.name}</h3>
        <p class="tag">${p1.tag}</p>
        <p style="margin:14px 0 0; color:var(--cool); font-weight:600">${TXT("Read your full breakdown →")}</p>
      </a>

      ${secondClose ? `
      <a class="card" href="pattern.html?p=${p2.slug}" style="display:block; margin-bottom:1.5em">
        <div class="num">${TXT("RUNNING A CLOSE SECOND")}</div>
        <h3>${p2.name}</h3>
        <p class="tag">${p2.tag}</p>
      </a>` : ""}

      <h3>${TXT("Your full profile")}</h3>
      ${bars}
      <p class="faint" style="margin-top:1em">${TXT("Most people run 2–3 loops that feed each other. Your primary is the one to start with — the others usually loosen when it does.")}</p>

      <div class="callout warn">
        <div class="callout-title">${TXT("Real talk before you go")}</div>
        <p>${TXT("If what's underneath your answers includes thoughts of suicide or self-harm, a quiz isn't the tool for that — <a href=\"crisis.html\">crisis support is here</a>, free and anonymous, right now. If a substance has you, <a href=\"help.html\">real care is here</a>.")}</p>
      </div>

      <p style="margin-top:2em"><button class="quiz-back" id="retake">${TXT("↻ retake the diagnostic")}</button></p>
    `;

    document.getElementById("retake").addEventListener("click", () => {
      i = 0; picks.length = 0; showQuestion(); window.scrollTo(0, 0);
    });
  }

  showQuestion();
}

/* ---------- boot ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  renderPatternPage();
  renderQuiz();
  const grid = document.getElementById("pattern-grid");
  if (grid) grid.innerHTML = patternGridHTML();
});
