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
