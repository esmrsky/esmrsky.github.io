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
