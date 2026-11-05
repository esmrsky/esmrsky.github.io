// ============================================================
// GLOSSARY DATA — every term has a plain-English layer (eli5)
// and an optional "go deeper" layer for the curious.
// cat: "web" | "git" | "ai" | "workflow"
// ============================================================

const GLOSSARY_CATS = {
  web: { label: "Web basics", badge: "badge-blue" },
  git: { label: "Git & GitHub", badge: "badge-green" },
  ai: { label: "AI & Claude Code", badge: "badge-purple" },
  workflow: { label: "Workflows & tools", badge: "badge-cyan" }
};

const GLOSSARY = [
  // ---------------- WEB BASICS ----------------
  {
    term: "HTML",
    cat: "web",
    eli5: "The skeleton of a webpage — it says what's on the page (a heading, a button, an image) but not how it looks or behaves.",
    deeper: "HyperText Markup Language. Made of nested tags like <h1> and <div>. The browser reads it top to bottom and builds a tree of elements (the DOM) that CSS and JavaScript then style and animate."
  },
  {
    term: "CSS",
    cat: "web",
    eli5: "The styling of a webpage — colors, fonts, spacing, layout. HTML says 'there is a button'; CSS says 'it's blue, rounded, and centered.'",
    deeper: "Cascading Style Sheets. Rules match elements via selectors and set properties. 'Cascading' means multiple rules can apply and there's a precedence system. Flexbox and Grid are its two modern layout engines — worth knowing they exist, not memorizing."
  },
  {
    term: "JavaScript",
    cat: "web",
    eli5: "The behavior of a webpage — what happens when you click, type, or scroll. Also, confusingly, a general-purpose language used for servers too.",
    deeper: "The only language browsers run natively, which is why it conquered the world despite being designed in 10 days in 1995. Via Node.js it also runs servers. TypeScript is JavaScript plus type-checking — most serious projects use it."
  },
  {
    term: "Frontend",
    cat: "web",
    eli5: "Everything that runs in the user's browser — what you see and click. HTML, CSS, and JavaScript live here.",
    deeper: "Also called the 'client side.' Frontend code is fully visible to users (right-click → View Source), so it can never hold secrets. Anything sensitive must happen on the backend."
  },
  {
    term: "Backend",
    cat: "web",
    eli5: "Everything that runs on a server somewhere else — databases, login checks, payments. The part you can't see.",
    deeper: "Also called the 'server side.' Handles things that need secrecy (API keys), shared state (the database every user reads), or trust (you can't let the browser decide its own bank balance). Common languages: JavaScript/Node, Python, Go."
  },
  {
    term: "HTTP / HTTPS",
    cat: "web",
    eli5: "The language browsers and servers use to talk: the browser asks (request), the server answers (response). HTTPS is the same thing but encrypted.",
    deeper: "Each request has a method (GET = fetch, POST = send data), a URL, and headers. Each response has a status code: 200 OK, 404 not found, 500 server crashed. When debugging, the status code is the first clue."
  },
  {
    term: "URL / Domain / DNS",
    cat: "web",
    eli5: "A domain (yoursite.com) is a name you rent. DNS is the internet's phonebook that translates the name into the actual server's address.",
    deeper: "DNS changes take minutes-to-hours to spread worldwide ('propagation'), which is why a new domain doesn't work instantly. The path after the domain (/about) tells the server which page you want."
  },
  {
    term: "Server",
    cat: "web",
    eli5: "Just a computer that's always on and answers requests from the internet. Not magic — your laptop becomes one when you 'run a local server.'",
    deeper: "In practice you rent slices of computers in data centers. 'Serverless' confusingly still uses servers — it means the provider manages them and you only ship functions."
  },
  {
    term: "localhost",
    cat: "web",
    eli5: "Your own machine pretending to be a server, so you can preview your site privately before putting it on the internet.",
    deeper: "localhost:3000 means 'this computer, door number 3000.' Ports let many programs share one machine. Nobody else can see your localhost — that requires deploying."
  },
  {
    term: "Deploy",
    cat: "web",
    eli5: "Copying your site/app from your computer onto a real server so other people can use it. 'It works on localhost' → deploy → 'it works on the internet.'",
    deeper: "Modern flow: push code to GitHub, and a service (GitHub Pages, Vercel, Netlify) automatically builds and publishes it. Static sites are free to host; apps with backends cost a little."
  },
  {
    term: "API",
    cat: "web",
    eli5: "A menu of things one program lets other programs ask it to do. 'Give me today's weather' → JSON answer. Stripe, OpenAI, Google Maps — all APIs.",
    deeper: "Application Programming Interface. Most web APIs are 'REST-ish': you call a URL with a method and get JSON back. An 'API key' is your password proving who's asking (and who to bill) — which is why keys are secrets."
  },
  {
    term: "JSON",
    cat: "web",
    eli5: "The universal format programs use to send structured data to each other. Looks like: {\"name\": \"Ada\", \"age\": 36}.",
    deeper: "JavaScript Object Notation — borrowed from JavaScript but used everywhere. Just nested key-value pairs, lists, text, and numbers. If you can read JSON, you can read what almost every API says."
  },
  {
    term: "Database",
    cat: "web",
    eli5: "Where an app permanently remembers things — users, posts, orders. Without one, everything resets when the server restarts.",
    deeper: "SQL databases (Postgres, SQLite) store structured tables with relationships — the default choice. NoSQL (MongoDB) stores flexible documents. Boring advice that's correct: start with SQLite, graduate to Postgres."
  },
  {
    term: "Framework",
    cat: "web",
    eli5: "A pre-built foundation so you don't start from zero — it decides the boring structural stuff so you only write what's unique to your app.",
    deeper: "React (UI as reusable components) and Next.js (React plus routing, servers, and deployment conventions) dominate. Framework churn was a 2010s anxiety; in the AI era picking 'the popular one' and moving on is the right call."
  },

  // ---------------- GIT & GITHUB ----------------
  {
    term: "Git",
    cat: "git",
    eli5: "A save-system for code. Every 'commit' is a snapshot you can go back to. It also lets many people (and AI agents) work on the same code without overwriting each other.",
    deeper: "Git runs locally on your machine — no internet needed. It tracks the full history of every file. Created by Linus Torvalds in 2005 because he was angry at existing tools. Famously confusing commands, genuinely beautiful underlying model."
  },
  {
    term: "GitHub",
    cat: "git",
    eli5: "The website where git repositories live online. Backup + sharing + collaboration + portfolio, all in one. Git is the tool; GitHub is the social network around it.",
    deeper: "Owned by Microsoft. Also gives you: issues (todo lists), pull requests (code review), Actions (automation robots), and Pages (free hosting). Your GitHub profile is a public portfolio — recruiters look."
  },
  {
    term: "Repository (repo)",
    cat: "git",
    eli5: "One project's folder, with its entire history attached. Your app = one repo.",
    deeper: "Contains your files plus a hidden .git folder holding every snapshot ever taken. 'Local repo' = on your machine; 'remote repo' = the copy on GitHub. They sync via push and pull."
  },
  {
    term: "Commit",
    cat: "git",
    eli5: "A saved snapshot of your project with a note about what changed. 'Add login page' → commit. Made a mess? Go back to any previous commit.",
    deeper: "Each commit stores: the changes, a message, the author, and a pointer to the previous commit — forming a chain (history). Good habit: commit small and often, with messages that say WHY, not just what."
  },
  {
    term: "Branch",
    cat: "git",
    eli5: "A parallel universe of your code. Experiment freely on a branch; the main version stays safe until you merge your changes back.",
    deeper: "Branching is nearly free in git — it's just a movable label pointing at a commit. The convention: 'main' holds the working version, and each feature/fix gets its own short-lived branch. This is also how you sandbox AI agents."
  },
  {
    term: "Merge",
    cat: "git",
    eli5: "Combining a branch's changes back into another branch. The experiment graduates into the real version.",
    deeper: "Git auto-combines changes when they touch different lines. When two branches edited the SAME lines, you get a merge conflict and a human (or Claude) must choose. Merging usually happens via pull request rather than directly."
  },
  {
    term: "Merge conflict",
    cat: "git",
    eli5: "Git saying 'both versions changed this exact line and I refuse to guess.' You pick which change wins (or blend them). Annoying, not dangerous.",
    deeper: "Git marks conflicts in the file with <<<<<<< and >>>>>>> fences showing both versions. Resolving = edit the file to the final form, then commit. This is a great task to hand to Claude Code with the instruction 'resolve, keeping both intents.'"
  },
  {
    term: "Push & Pull",
    cat: "git",
    eli5: "Push = upload your new commits to GitHub. Pull = download commits others (or you, on another machine) added. It's syncing.",
    deeper: "Push rejected? Someone pushed before you — pull first, merge, push again. 'Pull' is technically fetch (download) + merge (combine), which explains most of its weird edge cases."
  },
  {
    term: "Clone & Fork",
    cat: "git",
    eli5: "Clone = download a full copy of a repo to your machine. Fork = make your own GitHub copy of someone else's project, which you can change freely.",
    deeper: "Fork → clone → change → pull request is how strangers contribute to open source: you can't edit someone's repo directly, so you change your fork and politely ask them to merge it."
  },
  {
    term: "Pull request (PR)",
    cat: "git",
    eli5: "A proposal: 'here are my changes — review them, discuss, and merge them in if they're good.' The center of all code collaboration.",
    deeper: "A PR shows the diff (every changed line), hosts discussion, runs automated checks, and merges on approval. Reviewing PRs is the skill of the AI era: Claude Code produces branches and PRs, and you are the reviewer."
  },
  {
    term: ".gitignore",
    cat: "git",
    eli5: "A list of files git should pretend not to see — secrets, passwords, giant junk folders like node_modules.",
    deeper: "Critical safety habit: .env files (where API keys live) go in .gitignore BEFORE your first commit. Secrets pushed to a public repo are compromised within minutes — bots scan for them continuously. Yes, minutes."
  },
  {
    term: "GitHub Pages",
    cat: "git",
    eli5: "Free website hosting built into every GitHub repo. Push your HTML, flip a setting, get a real URL. This site can be hosted there.",
    deeper: "Settings → Pages → pick branch → done; your site lives at username.github.io/repo-name. Static sites only (no backend). The single best first-deploy experience for beginners."
  },
  {
    term: "GitHub Actions",
    cat: "git",
    eli5: "Robots attached to your repo: 'whenever I push code, automatically run the tests / deploy the site / lint the files.'",
    deeper: "Defined in YAML files in .github/workflows/. This is 'CI/CD' in practice. Don't hand-write the YAML — describe what you want and let Claude write it."
  },

  // ---------------- AI & CLAUDE CODE ----------------
  {
    term: "LLM (Large Language Model)",
    cat: "ai",
    eli5: "The engine behind Claude, ChatGPT, etc. Trained on enormous amounts of text to predict what comes next — which turns out to scale into writing, reasoning, and coding.",
    deeper: "It has no live memory of you and no database of facts — it's compressed patterns. This explains both the magic (flexible reasoning) and the failure modes (confident fabrication, no awareness of yesterday's news without tools)."
  },
  {
    term: "Token",
    cat: "ai",
    eli5: "The chunks AI reads and writes text in — roughly ¾ of a word each. AI pricing and limits are measured in tokens.",
    deeper: "'Strawberry' might be 2–3 tokens, which is why models historically struggled to count its letter r's — they don't see letters. Rule of thumb: 1,000 tokens ≈ 750 words."
  },
  {
    term: "Context window",
    cat: "ai",
    eli5: "The AI's working memory for one conversation. Everything it can 'see' right now. When the conversation outgrows it, old parts get summarized or forgotten.",
    deeper: "Modern windows fit small books, but attention degrades when stuffed — relevant beats voluminous. This is why Claude Code searches for the right files instead of reading your whole repo, and why focused sessions beat marathon ones."
  },
  {
    term: "Hallucination",
    cat: "ai",
    eli5: "When AI states something false with full confidence — an API that doesn't exist, a citation it invented. Not lying; it genuinely can't always tell what it knows.",
    deeper: "Improving but unsolved. Defenses: give the model tools to check (run the code, search the docs), and verify anything load-bearing yourself. Code hallucinations are the least scary kind — they fail loudly when run. Trust unexecuted code less."
  },
  {
    term: "System prompt",
    cat: "ai",
    eli5: "Standing instructions an AI receives before your conversation starts — its job description, rules, and personality.",
    deeper: "When you build AI products, you write the system prompt. Files like CLAUDE.md are effectively user-controlled additions to the system prompt of your coding agent."
  },
  {
    term: "Agent / Agentic AI",
    cat: "ai",
    eli5: "AI that doesn't just answer — it acts. It uses tools, takes a step, looks at the result, and decides the next step. Claude Code is an agent: it reads files, edits, runs tests, and reacts.",
    deeper: "The loop: think → act → observe → repeat. The 2024–2026 capability jump came largely from models getting reliable at this loop over many steps. 'Agentic' is the difference between asking for directions and having a driver."
  },
  {
    term: "Claude Code",
    cat: "ai",
    eli5: "Anthropic's coding agent. You describe what you want in plain English; it reads your project, writes and edits files, runs commands, and fixes its own errors.",
    deeper: "Lives in the terminal (also desktop app, web, IDE extensions). Key habits: keep tasks scoped, review the diffs it produces, and let it run tests to check itself. Works beautifully with git — every change reviewable, every mistake reversible."
  },
  {
    term: "CLAUDE.md",
    cat: "ai",
    eli5: "A note-to-the-AI file in your repo: 'here's how this project works, here are our conventions, here's what to never touch.' Claude Code reads it automatically.",
    deeper: "Treat it as onboarding docs for an infinitely patient new teammate. Best contents: how to run/test the project, architectural decisions, naming conventions, known landmines. Keep it short — it spends context window."
  },
  {
    term: "MCP (Model Context Protocol)",
    cat: "ai",
    eli5: "A standard plug that connects AI to outside tools — your database, browser, Figma, Slack. Like USB for AI capabilities.",
    deeper: "Open-sourced by Anthropic in late 2024, adopted across the industry in 2025. An 'MCP server' exposes tools; any MCP-speaking AI can use them. Worth knowing the concept; the ecosystem moves fast."
  },
  {
    term: "Vibe coding",
    cat: "ai",
    eli5: "Building software by describing what you want and accepting what AI produces, without reading the code. Fast and fun for toys; risky for anything real.",
    deeper: "Coined by Andrej Karpathy in early 2025. The honest framing: vibe coding is a spectrum of how much you verify. Prototype → vibe away. Handles money or user data → someone must actually read the code. The skill ceiling is knowing where you are on that spectrum."
  },
  {
    term: "Fine-tuning vs RAG",
    cat: "ai",
    eli5: "Two ways to make AI know YOUR stuff. Fine-tuning = retraining the model on your data (heavy, rare). RAG = looking things up and pasting them into the prompt at question time (light, common).",
    deeper: "RAG = Retrieval-Augmented Generation. For 95% of 'make the AI know our docs' needs, RAG (or just long context) wins on cost and freshness. If someone proposes fine-tuning, the right first question is 'why not RAG?'"
  },
  {
    term: "Inference / Training",
    cat: "ai",
    eli5: "Training = the months-long, very expensive process of creating a model. Inference = using the finished model to answer you (what happens every time you chat).",
    deeper: "You'll never train a frontier model; a handful of labs do. Everyone else builds ON models via APIs. 'Open-weights' models (Llama, etc.) can be run on your own hardware — inference only."
  },

  // ---------------- WORKFLOWS & TOOLS ----------------
  {
    term: "IDE / Code editor",
    cat: "workflow",
    eli5: "The app you view and edit code in. VS Code is the default answer. Increasingly, the editor is where you supervise AI rather than type.",
    deeper: "IDE = Integrated Development Environment: editor + file explorer + terminal + debugger. Claude Code plugs into VS Code and JetBrains, showing diffs inline."
  },
  {
    term: "Terminal / Command line",
    cat: "workflow",
    eli5: "The text-based way to control your computer. Typing 'cd projects' instead of double-clicking a folder. Where Claude Code runs.",
    deeper: "Survival kit: cd (go to folder), ls (list files), and running commands like npm or git. The skill isn't memorizing commands — it's losing your fear of the black window. Ask Claude what any command does before running it."
  },
  {
    term: "Package manager (npm, pip)",
    cat: "workflow",
    eli5: "An installer for code libraries. 'npm install stripe' downloads Stripe's pre-written code into your project so you don't write payments from scratch.",
    deeper: "npm = JavaScript, pip = Python. Dependencies are listed in package.json / requirements.txt so anyone (including CI robots) can recreate your setup. node_modules is the giant folder of installed stuff — never commit it."
  },
  {
    term: "Dependency",
    cat: "workflow",
    eli5: "Someone else's code your project relies on. Modern apps are mostly dependencies plus a thin layer of your own logic.",
    deeper: "The trade: enormous speed for trust and maintenance burden. Worth knowing 'supply chain attack' = a popular dependency gets hijacked. Prefer popular, maintained packages; let AI audit unfamiliar ones."
  },
  {
    term: "Environment variables & secrets",
    cat: "workflow",
    eli5: "Settings and passwords kept OUTSIDE your code — in a .env file locally or in your host's dashboard. The cardinal rule: secrets never go in code.",
    deeper: "Why: code gets committed, pushed, shared, and pasted into AI chats. A key in code is a key leaked. The .env file is gitignored; the deployed app gets its values from the hosting platform's settings."
  },
  {
    term: "CI/CD",
    cat: "workflow",
    eli5: "Automation that tests your code on every push (CI) and deploys it automatically when it passes (CD). Robots doing the boring careful parts.",
    deeper: "Continuous Integration / Continuous Deployment. In GitHub-land this means Actions. The cultural point matters more than tooling: ship small changes often, with automatic safety nets, instead of giant risky releases."
  },
  {
    term: "Staging vs Production",
    cat: "workflow",
    eli5: "Production = the real site real users touch. Staging = a private dress-rehearsal copy where you test first. You never experiment in production.",
    deeper: "Modern platforms (Vercel, Netlify) auto-create a 'preview deployment' per pull request — a temporary staging site per change. Reviewing a PR by clicking its preview link is a core AI-era verification habit."
  },
  {
    term: "Code review",
    cat: "workflow",
    eli5: "A human reading proposed changes before they merge — catching bugs, asking 'why', keeping quality up. In the AI era, this is most of the job.",
    deeper: "Reviewing AI code: check the intent matches the request, hunt edge cases, run it, be suspicious of code that looks plausible but wasn't tested. 'LGTM' (looks good to me) without reading is how AI slop ships."
  },
  {
    term: "Open source",
    cat: "workflow",
    eli5: "Code published for anyone to read, use, and improve. Most of the modern web runs on it. Free as in both 'free beer' and 'free speech' (usually).",
    deeper: "Licenses matter at the edges: MIT/Apache ≈ do anything; GPL ≈ share your changes. Contributing to open source (even docs fixes) is still one of the best portfolio signals."
  },
  {
    term: "Technical debt",
    cat: "workflow",
    eli5: "Shortcuts that make today faster and every future change slower. Like financial debt: fine if deliberate, fatal if ignored.",
    deeper: "AI changes this calculus in both directions: it generates code so fast you can accumulate debt at record speed, but it also makes refactors and rewrites dramatically cheaper. The skill is noticing when you're borrowing."
  }
];

// ============================================================
// RUSSIAN PAYLOAD — runs only on /ru/ pages (<html data-lang="ru">).
// Swaps the text in place, keyed by the English term, and throws if the
// English data and this table ever drift apart.
// ============================================================
(function () {
  if (document.documentElement.getAttribute("data-lang") !== "ru") return;

  const RU_CATS = {
    web: "Основы веба",
    git: "Git и GitHub",
    ai: "ИИ и Claude Code",
    workflow: "Процессы и инструменты"
  };

  // term -> [term, eli5, deeper]
  const RU_TERMS = {
    "HTML": ["HTML",
      "Скелет веб-страницы: он говорит, что есть на странице (заголовок, кнопка, картинка), но не как она выглядит и не как себя ведёт.",
      "HyperText Markup Language. Состоит из вложенных тегов вроде <h1> и <div>. Браузер читает его сверху вниз и строит дерево элементов (DOM), которое затем стилизуют и оживляют CSS и JavaScript."],
    "CSS": ["CSS",
      "Оформление веб-страницы: цвета, шрифты, отступы, раскладка. HTML говорит «здесь есть кнопка», а CSS говорит «она синяя, скруглённая и стоит по центру».",
      "Cascading Style Sheets. Правила находят элементы через селекторы и задают свойства. «Каскадные» значит, что могут сработать сразу несколько правил, и между ними есть система приоритетов. Flexbox и Grid — две современные системы раскладки; достаточно знать, что они есть, и не заучивать."],
    "JavaScript": ["JavaScript",
      "Поведение веб-страницы: что происходит, когда ты кликаешь, печатаешь или прокручиваешь. А ещё, как ни странно, универсальный язык, который работает и на серверах.",
      "Единственный язык, который браузеры понимают без посредников, поэтому он и завоевал мир, хотя его придумали за 10 дней в 1995 году. Через Node.js он работает и на серверах. TypeScript — это JavaScript плюс проверка типов; большинство серьёзных проектов используют его."],
    "Frontend": ["Фронтенд",
      "Всё, что выполняется в браузере пользователя: то, что ты видишь и на что нажимаешь. Здесь живут HTML, CSS и JavaScript.",
      "Ещё его называют «клиентской стороной». Фронтенд-код полностью виден пользователям (правый клик → «Просмотр кода страницы»), поэтому в нём никогда не может быть секретов. Всё чувствительное должно происходить на бэкенде."],
    "Backend": ["Бэкенд",
      "Всё, что выполняется на сервере где-то в другом месте: базы данных, проверка входа, платежи. Та часть, которую не видно.",
      "Ещё его называют «серверной стороной». Занимается тем, что требует секретности (API-ключи), общего состояния (база, которую читают все пользователи) или доверия (нельзя позволять браузеру самому решать, какой у него баланс на счёте). Частые языки: JavaScript/Node, Python, Go."],
    "HTTP / HTTPS": ["HTTP / HTTPS",
      "Язык, на котором общаются браузеры и серверы: браузер спрашивает (запрос), сервер отвечает (ответ). HTTPS — то же самое, но с шифрованием.",
      "У каждого запроса есть метод (GET — получить, POST — отправить данные), URL и заголовки. У каждого ответа есть код состояния: 200 OK, 404 не найдено, 500 сервер упал. При отладке код состояния — первая подсказка."],
    "URL / Domain / DNS": ["URL / домен / DNS",
      "Домен (yoursite.com) — это имя, которое ты арендуешь. DNS — телефонная книга интернета, которая переводит имя в реальный адрес сервера.",
      "Изменения DNS расходятся по миру от нескольких минут до нескольких часов («распространение»), поэтому новый домен не работает мгновенно. Путь после домена (/about) говорит серверу, какую страницу ты хочешь."],
    "Server": ["Сервер",
      "Просто компьютер, который всегда включён и отвечает на запросы из интернета. Никакой магии: твой ноутбук становится сервером, когда ты запускаешь «локальный сервер».",
      "На практике ты арендуешь кусочки компьютеров в дата-центрах. «Serverless» (бессерверность), как ни странно, всё равно использует серверы: это значит, что ими управляет провайдер, а ты выкладываешь только функции."],
    "localhost": ["localhost",
      "Твой собственный компьютер, который притворяется сервером, чтобы ты мог посмотреть сайт в приватном режиме, прежде чем выложить его в интернет.",
      "localhost:3000 значит «этот компьютер, дверь номер 3000». Порты позволяют многим программам делить одну машину. Твой localhost никто больше не видит; для этого нужен деплой."],
    "Deploy": ["Деплой",
      "Копирование твоего сайта или приложения с твоего компьютера на настоящий сервер, чтобы им могли пользоваться другие. «На localhost работает» → деплой → «в интернете работает».",
      "Современный процесс: пушишь код на GitHub, а сервис (GitHub Pages, Vercel, Netlify) сам собирает и публикует. Статические сайты хостить бесплатно; приложения с бэкендом стоят недорого."],
    "API": ["API",
      "Меню того, о чём одна программа позволяет просить другим программам. «Дай мне сегодняшнюю погоду» → ответ в JSON. Stripe, OpenAI, Google Maps — всё это API.",
      "Application Programming Interface. Большинство веб-API «почти REST»: ты вызываешь URL методом и получаешь в ответ JSON. «API-ключ» — это твой пароль, доказывающий, кто спрашивает (и кому выставлять счёт), поэтому ключи — секрет."],
    "JSON": ["JSON",
      "Универсальный формат, в котором программы отправляют друг другу структурированные данные. Выглядит так: {\"name\": \"Ada\", \"age\": 36}.",
      "JavaScript Object Notation: позаимствован из JavaScript, но используется везде. Это просто вложенные пары «ключ — значение», списки, текст и числа. Если читаешь JSON, ты можешь прочитать, что говорит почти любой API."],
    "Database": ["База данных",
      "Место, где приложение надолго запоминает вещи: пользователей, посты, заказы. Без неё всё сбрасывается при перезапуске сервера.",
      "SQL-базы (Postgres, SQLite) хранят структурированные таблицы со связями — это выбор по умолчанию. NoSQL (MongoDB) хранит гибкие документы. Скучный и верный совет: начни с SQLite, потом переходи на Postgres."],
    "Framework": ["Фреймворк",
      "Готовый фундамент, чтобы не начинать с нуля: он решает скучные вопросы структуры, и тебе остаётся писать только то, что уникально для твоего приложения.",
      "Доминируют React (интерфейс из переиспользуемых компонентов) и Next.js (React плюс маршрутизация, серверы и соглашения о деплое). Метания между фреймворками были тревогой 2010-х; в эпоху ИИ правильно выбрать «самый популярный» и идти дальше."],

    "Git": ["Git",
      "Система сохранений для кода. Каждый «коммит» — снимок, к которому можно вернуться. Она же позволяет многим людям (и ИИ-агентам) работать над одним кодом, не затирая друг друга.",
      "Git работает локально на твоём компьютере, интернет не нужен. Он отслеживает полную историю каждого файла. Создал его Линус Торвальдс в 2005 году, потому что злился на существующие инструменты. Команды знамениты запутанностью, а модель под ними по-настоящему красива."],
    "GitHub": ["GitHub",
      "Сайт, где репозитории git живут онлайн. Резервная копия, обмен, совместная работа и портфолио в одном. Git — инструмент, а GitHub — социальная сеть вокруг него.",
      "Принадлежит Microsoft. Ещё даёт: issues (списки дел), pull request (код-ревью), Actions (роботов-автоматизаторов) и Pages (бесплатный хостинг). Твой профиль на GitHub — публичное портфолио; рекрутеры смотрят."],
    "Repository (repo)": ["Репозиторий (repo)",
      "Папка одного проекта вместе со всей его историей. Твоё приложение = один репозиторий.",
      "Содержит твои файлы и скрытую папку .git, где лежит каждый когда-либо сделанный снимок. «Локальный репозиторий» — на твоём компьютере; «удалённый» — копия на GitHub. Они синхронизируются через push и pull."],
    "Commit": ["Коммит",
      "Сохранённый снимок проекта с заметкой о том, что изменилось. «Добавил страницу входа» → коммит. Накосячил? Вернись к любому прошлому коммиту.",
      "Каждый коммит хранит изменения, сообщение, автора и ссылку на предыдущий коммит, и вместе они образуют цепочку (историю). Хорошая привычка: коммитить мало и часто, а в сообщениях писать, ЗАЧЕМ, а не только что."],
    "Branch": ["Ветка (branch)",
      "Параллельная вселенная твоего кода. Экспериментируй на ветке сколько угодно; основная версия остаётся в безопасности, пока ты не вольёшь изменения обратно.",
      "Ветки в git почти ничего не стоят: это просто подвижная метка, указывающая на коммит. Принято так: в «main» лежит рабочая версия, а у каждой фичи или исправления своя недолговечная ветка. Так же ты изолируешь и ИИ-агентов."],
    "Merge": ["Слияние (merge)",
      "Объединение изменений ветки с другой веткой. Эксперимент превращается в настоящую версию.",
      "Git сам объединяет изменения, когда они затрагивают разные строки. Когда две ветки правили ОДНИ И ТЕ ЖЕ строки, возникает конфликт слияния, и человек (или Claude) должен выбрать. Слияние обычно происходит через pull request, а не напрямую."],
    "Merge conflict": ["Конфликт слияния",
      "Git говорит: «обе версии изменили именно эту строку, и гадать я отказываюсь». Ты выбираешь, чьё изменение побеждает (или смешиваешь их). Неприятно, но не опасно.",
      "Git отмечает конфликты в файле ограждениями из <<<<<<< и >>>>>>>, показывая обе версии. Решить значит отредактировать файл до окончательного вида и закоммитить. Отличная задача для Claude Code с указанием «реши, сохранив оба замысла»."],
    "Push & Pull": ["Push и pull",
      "Push = загрузить свои новые коммиты на GitHub. Pull = скачать коммиты, которые добавили другие (или ты сам на другом компьютере). Это синхронизация.",
      "Push отклонён? Кто-то запушил раньше тебя: сначала сделай pull, слей, потом снова push. «Pull» технически — это fetch (скачать) + merge (объединить), что объясняет большинство его странных крайних случаев."],
    "Clone & Fork": ["Clone и fork",
      "Clone = скачать полную копию репозитория на свой компьютер. Fork = сделать собственную копию чужого проекта на GitHub, которую можно свободно менять.",
      "Fork → clone → изменения → pull request — так посторонние люди вносят вклад в опенсорс: напрямую чужой репозиторий не отредактируешь, поэтому ты меняешь свой форк и вежливо просишь владельца его влить."],
    "Pull request (PR)": ["Pull request (PR)",
      "Предложение: «вот мои изменения — посмотрите, обсудите и влейте, если они хороши». Центр всей совместной работы над кодом.",
      "PR показывает diff (каждую изменённую строку), даёт место для обсуждения, запускает автоматические проверки и вливается после одобрения. Ревью PR — навык эпохи ИИ: Claude Code создаёт ветки и PR, а ревьюер — ты."],
    ".gitignore": [".gitignore",
      "Список файлов, которых git должен «не замечать»: секреты, пароли, огромные мусорные папки вроде node_modules.",
      "Критическая привычка безопасности: файлы .env (где лежат API-ключи) попадают в .gitignore ДО твоего первого коммита. Секреты, выложенные в публичный репозиторий, оказываются скомпрометированы за минуты: боты непрерывно их ищут. Да, за минуты."],
    "GitHub Pages": ["GitHub Pages",
      "Бесплатный хостинг сайтов, встроенный в каждый репозиторий GitHub. Запушь свой HTML, включи настройку — и получишь настоящий URL. Этот сайт можно разместить там.",
      "Settings → Pages → выбрать ветку → готово; сайт живёт по адресу username.github.io/repo-name. Только статические сайты (без бэкенда). Лучший первый деплой для новичков."],
    "GitHub Actions": ["GitHub Actions",
      "Роботы, привязанные к твоему репозиторию: «каждый раз, когда я пушу код, автоматически запускай тесты / выкатывай сайт / проверяй стиль файлов».",
      "Описываются в YAML-файлах в .github/workflows/. Это и есть «CI/CD» на практике. Не пиши YAML руками: опиши, чего хочешь, и пусть напишет Claude."],

    "LLM (Large Language Model)": ["LLM (большая языковая модель)",
      "Движок за Claude, ChatGPT и им подобными. Обучена на огромном количестве текста предсказывать, что идёт дальше, и это, как выяснилось, вырастает в умение писать, рассуждать и программировать.",
      "У неё нет живой памяти о тебе и нет базы фактов: это сжатые закономерности. Отсюда и магия (гибкое рассуждение), и сбои (уверенные выдумки, незнание вчерашних новостей без инструментов)."],
    "Token": ["Токен",
      "Кусочки, на которые ИИ делит текст, когда читает и пишет: примерно ¾ слова каждый. Цены и лимиты ИИ считаются в токенах.",
      "«Strawberry» может быть 2–3 токенами, поэтому модели исторически не справлялись с подсчётом букв r в этом слове: они не видят букв. Практическое правило: 1000 токенов ≈ 750 слов."],
    "Context window": ["Окно контекста",
      "Рабочая память ИИ для одного разговора. Всё, что он «видит» прямо сейчас. Когда разговор вырастает за него, старые части сворачиваются в краткое содержание или забываются.",
      "Современные окна вмещают небольшие книги, но внимание ослабевает, когда окно забито: уместное лучше объёмного. Поэтому Claude Code ищет нужные файлы, а не читает весь репозиторий, и поэтому сфокусированные сессии лучше марафонских."],
    "Hallucination": ["Галлюцинация",
      "Когда ИИ с полной уверенностью утверждает что-то неверное: несуществующий API, выдуманную цитату. Это не ложь: он правда не всегда может отличить, что знает, а что нет.",
      "Становится лучше, но не решено. Защита: дай модели инструменты для проверки (запустить код, поискать в документации) и сам проверяй всё, на чём держится дело. Галлюцинации в коде — самый безобидный вид: при запуске они громко падают. Не запущенному коду доверяй меньше."],
    "System prompt": ["Системный промпт",
      "Постоянные инструкции, которые ИИ получает до начала твоего разговора: его должностная инструкция, правила и характер.",
      "Когда ты строишь ИИ-продукты, системный промпт пишешь ты. Файлы вроде CLAUDE.md — по сути пользовательские дополнения к системному промпту твоего кодингового агента."],
    "Agent / Agentic AI": ["Агент / агентный ИИ",
      "ИИ, который не только отвечает, но и действует. Он использует инструменты, делает шаг, смотрит на результат и решает, каким будет следующий. Claude Code — агент: читает файлы, правит, запускает тесты и реагирует.",
      "Цикл такой: думать → действовать → наблюдать → повторять. Скачок возможностей 2024–2026 годов во многом произошёл потому, что модели стали надёжно держать этот цикл на протяжении многих шагов. «Агентность» — это разница между вопросом о дороге и личным водителем."],
    "Claude Code": ["Claude Code",
      "Кодинговый агент от Anthropic. Ты описываешь, чего хочешь, обычными словами; он читает твой проект, пишет и правит файлы, запускает команды и исправляет собственные ошибки.",
      "Живёт в терминале (есть также десктопное приложение, веб и расширения для IDE). Главные привычки: держи задачи в узких рамках, проверяй diff, который он выдаёт, и пусть он сам запускает тесты. Прекрасно сочетается с git: каждое изменение можно проверить, каждую ошибку отменить."],
    "CLAUDE.md": ["CLAUDE.md",
      "Файл-записка для ИИ в твоём репозитории: «вот как устроен этот проект, вот наши соглашения, вот к чему никогда не прикасаться». Claude Code читает его автоматически.",
      "Относись к нему как к вводной документации для бесконечно терпеливого нового коллеги. Лучшее содержание: как запускать и тестировать проект, архитектурные решения, правила именования, известные грабли. Пиши коротко: он расходует окно контекста."],
    "MCP (Model Context Protocol)": ["MCP (Model Context Protocol)",
      "Стандартная розетка, которая подключает ИИ к внешним инструментам: твоей базе данных, браузеру, Figma, Slack. Что-то вроде USB для возможностей ИИ.",
      "Anthropic открыла его исходники в конце 2024 года, а в 2025 его приняла вся индустрия. «MCP-сервер» предоставляет инструменты; любой ИИ, говорящий на MCP, может ими пользоваться. Идею знать стоит; экосистема быстро меняется."],
    "Vibe coding": ["Вайб-кодинг (vibe coding)",
      "Создание софта так: описываешь, чего хочешь, и принимаешь то, что выдал ИИ, не читая код. Быстро и весело для игрушек; рискованно для всего настоящего.",
      "Термин придумал Андрей Карпати в начале 2025 года. Честная формулировка: вайб-кодинг — это шкала того, сколько ты проверяешь. Прототип → расслабляйся. Дело касается денег или пользовательских данных → кто-то должен реально прочитать код. Потолок мастерства — знать, где ты находишься на этой шкале."],
    "Fine-tuning vs RAG": ["Дообучение и RAG",
      "Два способа сделать так, чтобы ИИ знал ТВОИ материалы. Дообучение = переобучить модель на твоих данных (тяжело, редко). RAG = найти нужное и вставить в промпт в момент вопроса (легко, часто).",
      "RAG = Retrieval-Augmented Generation (генерация, дополненная поиском). Для 95% задач вида «пусть ИИ знает наши документы» RAG (или просто длинный контекст) выигрывает по цене и свежести. Если кто-то предлагает дообучение, правильный первый вопрос: «а почему не RAG?»"],
    "Inference / Training": ["Инференс и обучение",
      "Обучение = многомесячный и очень дорогой процесс создания модели. Инференс = использование готовой модели для ответа тебе (то, что происходит при каждом чате).",
      "Фронтирную модель ты никогда не будешь обучать; этим занимаются считаные лаборатории. Все остальные строят ПОВЕРХ моделей через API. Модели с «открытыми весами» (Llama и другие) можно запускать на собственном железе, но только для инференса."],

    "IDE / Code editor": ["IDE / редактор кода",
      "Приложение, в котором ты смотришь и правишь код. VS Code — ответ по умолчанию. Всё чаще редактор — это место, где ты присматриваешь за ИИ, а не печатаешь сам.",
      "IDE = Integrated Development Environment (интегрированная среда разработки): редактор + проводник по файлам + терминал + отладчик. Claude Code встраивается в VS Code и JetBrains и показывает diff прямо в редакторе."],
    "Terminal / Command line": ["Терминал / командная строка",
      "Текстовый способ управлять компьютером. Набрать «cd projects» вместо двойного клика по папке. Здесь запускается Claude Code.",
      "Набор для выживания: cd (перейти в папку), ls (список файлов) и запуск команд вроде npm или git. Навык не в том, чтобы заучить команды, а в том, чтобы перестать бояться чёрного окна. Перед запуском спрашивай Claude, что делает любая команда."],
    "Package manager (npm, pip)": ["Менеджер пакетов (npm, pip)",
      "Установщик библиотек кода. «npm install stripe» скачивает готовый код Stripe в твой проект, чтобы не писать платежи с нуля.",
      "npm — для JavaScript, pip — для Python. Зависимости перечислены в package.json / requirements.txt, чтобы кто угодно (в том числе роботы CI) мог воссоздать твою среду. node_modules — огромная папка с установленным; её никогда не коммитят."],
    "Dependency": ["Зависимость",
      "Чужой код, на который опирается твой проект. Современные приложения — это в основном зависимости плюс тонкий слой твоей собственной логики.",
      "Обмен такой: огромная скорость в обмен на доверие и бремя поддержки. Стоит знать, что «атака на цепочку поставок» — это когда популярную зависимость взламывают. Выбирай популярные и поддерживаемые пакеты; незнакомые пусть проверяет ИИ."],
    "Environment variables & secrets": ["Переменные окружения и секреты",
      "Настройки и пароли, которые хранятся ВНЕ кода: в файле .env локально или в панели управления твоего хостинга. Главное правило: секреты никогда не лежат в коде.",
      "Почему: код коммитят, пушат, пересылают и вставляют в чаты с ИИ. Ключ в коде — это утёкший ключ. Файл .env в gitignore; задеплоенное приложение получает значения из настроек платформы хостинга."],
    "CI/CD": ["CI/CD",
      "Автоматизация, которая тестирует твой код при каждом push (CI) и сама выкатывает его, когда тесты проходят (CD). Роботы, делающие скучные аккуратные части работы.",
      "Continuous Integration / Continuous Deployment (непрерывная интеграция и доставка). В мире GitHub это Actions. Культурный смысл важнее инструментов: выпускать маленькие изменения часто и с автоматической страховкой, а не гигантские рискованные релизы."],
    "Staging vs Production": ["Staging и production",
      "Production = настоящий сайт, с которым работают настоящие пользователи. Staging = закрытая копия для генеральной репетиции, где ты сначала всё проверяешь. Экспериментировать на production нельзя.",
      "Современные платформы (Vercel, Netlify) сами создают «превью-деплой» для каждого pull request: временный staging-сайт на каждое изменение. Проверять PR, открывая его превью-ссылку, — базовая привычка проверки эпохи ИИ."],
    "Code review": ["Код-ревью",
      "Человек читает предложенные изменения до слияния: ловит баги, спрашивает «зачем», держит качество. В эпоху ИИ это большая часть работы.",
      "Ревью кода от ИИ: проверь, что замысел совпадает с просьбой, поищи крайние случаи, запусти, с подозрением относись к коду, который выглядит правдоподобно, но не тестировался. «LGTM» (выглядит нормально) без чтения — вот так и выходит ИИ-халтура."],
    "Open source": ["Открытый исходный код (open source)",
      "Код, опубликованный, чтобы любой мог читать, использовать и улучшать. На нём работает большая часть современного веба. Свободный и как «бесплатное пиво», и как «свобода слова» (обычно).",
      "Лицензии важны по краям: MIT/Apache ≈ делай что хочешь; GPL ≈ делись своими изменениями. Вклад в опенсорс (хоть исправление документации) всё ещё один из лучших сигналов для портфолио."],
    "Technical debt": ["Технический долг",
      "Срезанные углы, которые ускоряют сегодняшний день и замедляют каждое будущее изменение. Как финансовый долг: нормально, если взят осознанно, смертельно, если игнорировать.",
      "ИИ меняет расчёт в обе стороны: он генерирует код так быстро, что долг копится рекордными темпами, но он же делает рефакторинг и переписывание намного дешевле. Навык в том, чтобы замечать, когда ты занимаешь."]
  };

  Object.keys(GLOSSARY_CATS).forEach((k) => {
    if (!RU_CATS[k]) throw new Error("glossary RU: no category " + k);
    GLOSSARY_CATS[k].label = RU_CATS[k];
  });
  if (Object.keys(RU_CATS).length !== Object.keys(GLOSSARY_CATS).length) throw new Error("glossary RU: category count");

  const seen = new Set();
  GLOSSARY.forEach((t) => {
    const r = RU_TERMS[t.term];
    if (!r) throw new Error("glossary RU: no translation for " + t.term);
    if (!!t.deeper !== !!r[2]) throw new Error("glossary RU: deeper mismatch for " + t.term);
    seen.add(t.term);
    t.term = r[0]; t.eli5 = r[1]; t.deeper = r[2];
  });
  if (seen.size !== Object.keys(RU_TERMS).length) throw new Error("glossary RU: table has entries the English lacks");
})();
