// ============================================================
// SKILLS MAP DATA — edit freely, the page renders from this.
// verdict: "learn" | "know" | "skip"
// ============================================================

const SKILLS_META = {
  learn: {
    title: "Learn deeply",
    badge: "badge-green",
    label: "Worth real hours",
    sub: "These compound. AI makes them MORE valuable, not less, because they're what you need to direct, judge, and ship AI-built work."
  },
  know: {
    title: "Know of",
    badge: "badge-yellow",
    label: "Understand the concept, skip the mastery",
    sub: "Learn what these are and when they apply — enough to recognize them in conversation and ask AI for the right thing. Don't grind tutorials on them."
  },
  skip: {
    title: "Safely skip",
    badge: "badge-red",
    label: "Don't spend hours here",
    sub: "Either AI handles it reliably, or the industry moved on. Time spent memorizing these is time stolen from the 'learn deeply' column."
  }
};

const SKILLS = [
  // ---------- LEARN DEEPLY ----------
  {
    name: "Reading code",
    verdict: "learn",
    tag: "Core",
    why: "The #1 skill of the AI era. You'll write less code but review far more. If you can't read what Claude wrote, you can't catch the 10% that's wrong — and that 10% is where everything breaks.",
    how: "Read code AI generates for you and ask it to explain every line you don't understand. Do this for a month and you'll be ahead of most bootcamp grads."
  },
  {
    name: "Git mental model",
    verdict: "learn",
    tag: "Core",
    why: "Commits, branches, merges, and pull requests are how all software collaboration works — including collaborating with AI agents. You need the MODEL in your head. (The command flags? AI remembers those for you.)",
    how: "Learn ~8 ideas: repo, commit, branch, merge, remote, push/pull, PR, merge conflict. The glossary on this site covers all of them with diagrams."
  },
  {
    name: "Debugging mindset",
    verdict: "learn",
    tag: "Core",
    why: "When something breaks, the skill is forming hypotheses and narrowing them down: read the error, isolate the cause, test one change at a time. AI is a debugging partner, but YOU decide what question to ask it.",
    how: "Next time something breaks, resist pasting the error straight into AI. First guess what's wrong, then check. Calibrating your own guesses is the training."
  },
  {
    name: "How the web works (conceptually)",
    verdict: "learn",
    tag: "Core",
    why: "Browser → request → server → response → render. DNS, HTTP, frontend vs backend, where code actually runs. Without this map, every error message is gibberish and every AI suggestion is a coin flip.",
    how: "One afternoon with the diagrams on the glossary page covers 80% of it. The rest you absorb by building."
  },
  {
    name: "Directing AI agents",
    verdict: "learn",
    tag: "AI-era",
    why: "Writing clear specs, breaking work into reviewable chunks, knowing when to trust vs verify, managing context. This is the new core engineering skill — closer to being a tech lead than a typist.",
    how: "Use Claude Code on real projects. Notice when results disappoint, and ask: was my instruction actually clear? Would a human have understood it?"
  },
  {
    name: "Writing clear specs & requirements",
    verdict: "learn",
    tag: "AI-era",
    why: "AI builds exactly what you describe, including your ambiguities. The bottleneck has moved from 'can you implement it' to 'can you say precisely what you want.' Vague in, vague out.",
    how: "Before any build, write 5 sentences: who it's for, what it does, what it explicitly does NOT do, what done looks like, what could go wrong."
  },
  {
    name: "Verifying & testing what AI built",
    verdict: "learn",
    tag: "AI-era",
    why: "AI confidently ships code that looks right and isn't. The habit of actually running the thing, clicking through it, and checking edge cases is what separates people who ship from people who demo.",
    how: "Rule: never say 'done' until you've personally seen it work. Ask Claude to write tests, then read the tests — they're often easier to review than the code."
  },
  {
    name: "Security basics",
    verdict: "learn",
    tag: "Core",
    why: "Secrets don't go in code. User input is hostile. Auth is hard — use a provider. AI sometimes generates insecure patterns, and the consequences (leaked API keys, injected databases) are real money and real harm.",
    how: "Learn: environment variables for secrets, what SQL injection / XSS are conceptually, why you never roll your own login. That's 90% of beginner risk."
  },
  {
    name: "Data modeling basics",
    verdict: "learn",
    tag: "Core",
    why: "What are the THINGS in your app and how do they relate — users have posts, posts have comments. Get this wrong and AI will cheerfully build you a beautiful app on a broken foundation that's painful to fix later.",
    how: "Before building, sketch your data as boxes and arrows on paper. Then ask AI to critique it. This 15-minute habit prevents most rewrites."
  },
  {
    name: "Product judgment & taste",
    verdict: "learn",
    tag: "Durable",
    why: "What to build, for whom, what 'good' looks like, what to cut. AI flattens the cost of building, which makes deciding WHAT to build the scarce skill. This is the moat no model update erodes.",
    how: "Ship small things to real users. Use great products and articulate WHY they're great. No shortcut exists, which is exactly why it's valuable."
  },
  {
    name: "Command line survival",
    verdict: "learn",
    tag: "Core",
    why: "Claude Code lives in a terminal. You need maybe 10 commands (cd, ls, running scripts) plus the confidence to not panic at a wall of text. That's it — but you genuinely need it.",
    how: "Two hours of deliberate practice. Make folders, move around, run things. Ask Claude to explain anything scary."
  },

  // ---------- KNOW OF ----------
  {
    name: "JavaScript / TypeScript syntax",
    verdict: "know",
    tag: "Language",
    why: "Controversial take: you need to READ it fluently, not write it from memory. Know what functions, variables, async, and objects are. AI writes the syntax; you supply the comprehension.",
    how: "Learn by reading AI output, not by grinding syntax courses. Look up what you don't recognize."
  },
  {
    name: "CSS layout concepts",
    verdict: "know",
    tag: "Frontend",
    why: "Know that flexbox and grid exist and what kind of problem each solves, so you can say 'make this a responsive grid.' Hand-writing CSS from scratch is mostly AI's job now.",
    how: "Skim a visual flexbox/grid guide once. When AI's layout is off, describing the problem precisely ('center it vertically') gets it fixed."
  },
  {
    name: "The framework landscape (React, Next.js, etc.)",
    verdict: "know",
    tag: "Frontend",
    why: "Know what a framework IS and which names are mainstream, so you can make sane choices and read job posts. Deep framework expertise is depreciating — AI knows the APIs better than you ever will.",
    how: "One mental model: React = UI as components; Next.js = React plus routing/server stuff; everything else is a variation. Pick one, build with AI, learn just-in-time."
  },
  {
    name: "Databases: SQL vs NoSQL",
    verdict: "know",
    tag: "Backend",
    why: "Know that SQL means structured tables with relationships (default choice) and NoSQL means flexible documents. Know that SQLite/Postgres are the safe answers. Writing complex queries by hand? AI's job.",
    how: "Learn to READ a simple SELECT so you can sanity-check what AI queries for. 30 minutes."
  },
  {
    name: "APIs & JSON",
    verdict: "know",
    tag: "Backend",
    why: "Every integration — Stripe, OpenAI, weather data — is 'call a URL, get JSON back.' Understand that pattern and you understand how most software talks to other software.",
    how: "Ask Claude to walk you through one real API call end-to-end, and look at the JSON that comes back. The pattern repeats forever."
  },
  {
    name: "Deployment & hosting landscape",
    verdict: "know",
    tag: "Ops",
    why: "Know the tiers: GitHub Pages (free, static), Vercel/Netlify (easy, full apps), real cloud (AWS/GCP — avoid until forced). The actual deploying is increasingly one command or one AI request.",
    how: "Deploy this very site to GitHub Pages. Seriously — it's free, takes 10 minutes, and demystifies the whole thing."
  },
  {
    name: "CI/CD & GitHub Actions",
    verdict: "know",
    tag: "Ops",
    why: "Know the concept: robots that run your tests and deploy your code whenever you push. You'll meet it in every real project. Writing the YAML config? Delegate that.",
    how: "Concept takes 5 minutes (see glossary). Set one up only when a project needs it, with AI writing the config."
  },
  {
    name: "Docker & containers",
    verdict: "know",
    tag: "Ops",
    why: "Know the elevator pitch — 'a box that packages an app with everything it needs so it runs anywhere' — so the word doesn't scare you. Most personal projects never need it.",
    how: "That sentence is genuinely enough until a project forces more."
  },
  {
    name: "Python",
    verdict: "know",
    tag: "Language",
    why: "The language of AI/data work and the easiest to read. Same rule as JavaScript: reading fluency matters, memorized syntax doesn't.",
    how: "If you'll touch data or AI APIs, learn to read it. Otherwise skip until needed."
  },
  {
    name: "DNS & domains",
    verdict: "know",
    tag: "Ops",
    why: "Know that a domain is a name you rent, DNS points it at a server, and changes take time to propagate. That's enough to launch things and debug 'why isn't my site up.'",
    how: "Learn it the day you buy your first domain, not before."
  },
  {
    name: "How LLMs work (conceptually)",
    verdict: "know",
    tag: "AI-era",
    why: "Tokens, context windows, why models hallucinate, why they're bad at counting letters. A correct mental model makes you dramatically better at using them — and immune to both hype and doom.",
    how: "The glossary AI section covers the working model. You don't need the math."
  },

  // ---------- SAFELY SKIP ----------
  {
    name: "Memorizing syntax & APIs",
    verdict: "skip",
    tag: "Obsolete grind",
    why: "Knowing the arguments to Array.reduce by heart was always a proxy for experience, never the point. AI has perfect syntax recall. Your memory is for concepts and judgment, not parameter order.",
    how: null
  },
  {
    name: "LeetCode-style algorithm grinding",
    verdict: "skip",
    tag: "Obsolete grind",
    why: "Unless you're interviewing at companies that still require it (a separate, dying game), inverting binary trees has nearly zero overlap with building real things. Big-O intuition — 'nested loops over big lists get slow' — is the part worth keeping, and it takes a day.",
    how: null
  },
  {
    name: "Memorizing git commands & flags",
    verdict: "skip",
    tag: "Delegate to AI",
    why: "Understand the branch/merge/PR model deeply (see Learn column!) — but 'git rebase --onto' incantations are exactly what AI is for. Asking Claude 'undo my last commit but keep the changes' beats memorizing flag soup.",
    how: null
  },
  {
    name: "CSS trivia & cross-browser hacks",
    verdict: "skip",
    tag: "Obsolete grind",
    why: "Specificity calculation rules, vendor prefixes, IE workarounds, clearfix lore — a decade of accumulated pain that modern browsers and AI generation made irrelevant.",
    how: null
  },
  {
    name: "Build-tool configuration (webpack et al.)",
    verdict: "skip",
    tag: "Delegate to AI",
    why: "Once a rite of passage, now a solved problem: modern tools ship with sane defaults, and AI writes config files on demand. Nobody should hand-tune a webpack config for fun in 2026.",
    how: null
  },
  {
    name: "jQuery & legacy stacks",
    verdict: "skip",
    tag: "Legacy",
    why: "Still running on millions of old sites, but learning it new in 2026 is studying Latin to order coffee in Rome. If you ever inherit legacy code, AI translates it for you.",
    how: null
  },
  {
    name: "Hand-writing boilerplate",
    verdict: "skip",
    tag: "Delegate to AI",
    why: "Project scaffolding, CRUD endpoints, form validation wiring, config files — the repetitive 60% of old-school coding. This is THE thing AI fully ate. Typing it yourself is practicing the wrong skill.",
    how: null
  },
  {
    name: "Memorizing regex",
    verdict: "skip",
    tag: "Delegate to AI",
    why: "Know regex exists for pattern-matching text. Then describe the pattern in English and let AI write it — which is what most senior engineers quietly did anyway.",
    how: null
  },
  {
    name: "Prompt-engineering 'tricks'",
    verdict: "skip",
    tag: "Already stale",
    why: "Magic phrases, 'act as a world-class expert' incantations, tip-jar bribes — folk remedies for weaker models. Modern models reward the same thing humans do: clear, specific, well-structured requests. That's the writing skill in the Learn column, not a trick.",
    how: null
  }
];
