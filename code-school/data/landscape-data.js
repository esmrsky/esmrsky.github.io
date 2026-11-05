// ============================================================
// AI LANDSCAPE DATA — the perishable file. Edit this to refresh
// the site (or ask Claude Code to: "update landscape-data.js
// with the current state of AI capabilities").
//
// rating:     "strong" | "decent" | "weak"
// trajectory: "fast"   | "steady" | "slow"
// ============================================================

const LANDSCAPE_UPDATED = "June 2026";

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
