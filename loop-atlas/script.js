const models = [
  {
    id: "habit-loop",
    number: "01",
    title: "Habit Loop",
    group: "Habit",
    icon: "repeat",
    x: 142,
    y: 158,
    summary:
      "Cues activate a routine, the routine produces a reward, and repeated reward prediction makes the cue feel motivational.",
    components: ["Cue", "Craving", "Routine", "Reward", "Prediction"],
    levers: ["Make cues visible", "Swap the routine", "Tighten reward timing", "Reduce competing cues"],
    caution: "Useful for repeated behaviors, but it can understate identity, emotion, and social context.",
    tags: ["cue", "routine", "reward", "craving", "automaticity"],
    related: ["fogg", "implementation", "reinforcement", "com-b"],
    matrix: {
      Capability: ["Practice", "Scripts"],
      Opportunity: ["Cue design", "Friction"],
      Motivation: ["Reward", "Craving"],
      Feedback: ["Streaks", "Prediction"],
      Social: ["Shared ritual"],
    },
  },
  {
    id: "fogg",
    number: "02",
    title: "Fogg Behavior Model",
    group: "Habit",
    icon: "spark",
    x: 326,
    y: 104,
    summary:
      "Behavior happens when motivation, ability, and a prompt converge at the same moment.",
    components: ["Motivation", "Ability", "Prompt", "Behavior", "Outcome"],
    levers: ["Shrink the action", "Place prompts at the action moment", "Remove ability barriers", "Design for low-motivation states"],
    caution: "Strong for product and habit design; less complete for deeper needs, values, and power structures.",
    tags: ["motivation", "ability", "prompt", "trigger", "behavior design"],
    related: ["habit-loop", "com-b", "implementation", "expectancy-value"],
    matrix: {
      Capability: ["Make easier", "Train"],
      Opportunity: ["Prompt"],
      Motivation: ["Spark"],
      Feedback: ["Immediate result"],
      Social: ["Acceptance cue"],
    },
  },
  {
    id: "com-b",
    number: "03",
    title: "COM-B System",
    group: "Motivation",
    icon: "triad",
    x: 536,
    y: 142,
    summary:
      "Capability, opportunity, and motivation interact as the minimum conditions for behavior to occur and persist.",
    components: ["Capability", "Opportunity", "Motivation", "Behavior", "System reset"],
    levers: ["Diagnose the missing condition", "Change the environment", "Train capability", "Use policy or service design"],
    caution: "It is a diagnostic frame, not a one-step prescription; intervention fit depends on behavior specificity.",
    tags: ["capability", "opportunity", "motivation", "behavior change wheel", "diagnosis"],
    related: ["fogg", "self-determination", "control-theory", "habit-loop"],
    matrix: {
      Capability: ["Education", "Training"],
      Opportunity: ["Enablement", "Restructure"],
      Motivation: ["Persuasion", "Incentives"],
      Feedback: ["Monitoring"],
      Social: ["Modeling"],
    },
  },
  {
    id: "self-determination",
    number: "04",
    title: "Self-Determination Theory",
    group: "Motivation",
    icon: "needs",
    x: 760,
    y: 188,
    summary:
      "High-quality motivation grows when autonomy, competence, and relatedness are supported by the surrounding context.",
    components: ["Autonomy", "Competence", "Relatedness", "Internalization", "Persistence"],
    levers: ["Offer meaningful choice", "Create competence feedback", "Build belonging", "Connect goals to values"],
    caution: "Need support is not the same as making everything easy or removing structure.",
    tags: ["autonomy", "competence", "relatedness", "intrinsic", "internalization"],
    related: ["com-b", "goal-setting", "expectancy-value", "social-feedback", "sociometer"],
    matrix: {
      Capability: ["Mastery"],
      Opportunity: ["Choice architecture"],
      Motivation: ["Values"],
      Feedback: ["Competence signal"],
      Social: ["Belonging"],
    },
  },
  {
    id: "control-theory",
    number: "05",
    title: "Control Theory",
    group: "Feedback",
    icon: "gauge",
    x: 196,
    y: 350,
    summary:
      "A person compares current state with a reference goal, detects discrepancy, acts, and samples feedback again.",
    components: ["Goal", "Monitor", "Compare", "Act", "Feedback"],
    levers: ["Clarify the reference value", "Increase feedback frequency", "Lower noise", "Define adjustment rules"],
    caution: "People often regulate multiple goals at once, so one loop may compete with another.",
    tags: ["self-regulation", "feedback", "goal", "monitor", "discrepancy"],
    related: ["goal-setting", "reinforcement", "com-b", "cbt-loop"],
    matrix: {
      Capability: ["Self-monitor"],
      Opportunity: ["Signal access"],
      Motivation: ["Goal salience"],
      Feedback: ["Comparator"],
      Social: ["Accountability"],
    },
  },
  {
    id: "reinforcement",
    number: "06",
    title: "Reinforcement Loop",
    group: "Feedback",
    icon: "bolt",
    x: 430,
    y: 318,
    summary:
      "Consequences update the likelihood of future behavior through reward, punishment, prediction error, and context.",
    components: ["Behavior", "Consequence", "Valence", "Prediction error", "Policy update"],
    levers: ["Make consequences immediate", "Reward approximations", "Reduce accidental reinforcement", "Track variable rewards"],
    caution: "Rewards can shape behavior while missing meaning; external incentives may crowd out intrinsic motives.",
    tags: ["reward", "punishment", "prediction", "reinforcement", "learning"],
    related: ["habit-loop", "control-theory", "goal-setting", "self-determination"],
    matrix: {
      Capability: ["Shaping"],
      Opportunity: ["Contingency"],
      Motivation: ["Reward value"],
      Feedback: ["Prediction error"],
      Social: ["Recognition"],
    },
  },
  {
    id: "goal-setting",
    number: "07",
    title: "Goal-Setting Theory",
    group: "Motivation",
    icon: "target",
    x: 660,
    y: 340,
    summary:
      "Specific, difficult, accepted goals focus attention, increase effort, extend persistence, and invite strategy search.",
    components: ["Specific goal", "Commitment", "Effort", "Feedback", "Strategy"],
    levers: ["Set a clear standard", "Tune difficulty", "Add progress feedback", "Protect commitment"],
    caution: "Hard goals can narrow attention or backfire when ability, ethics, or goal conflict are ignored.",
    tags: ["goal", "difficulty", "commitment", "feedback", "performance"],
    related: ["control-theory", "implementation", "expectancy-value", "self-determination"],
    matrix: {
      Capability: ["Strategy"],
      Opportunity: ["Resources"],
      Motivation: ["Commitment"],
      Feedback: ["Progress"],
      Social: ["Public standard"],
    },
  },
  {
    id: "implementation",
    number: "08",
    title: "Implementation Intentions",
    group: "Habit",
    icon: "route",
    x: 934,
    y: 360,
    summary:
      "If-then plans bind a situational cue to a specific response so goal pursuit starts with less deliberation.",
    components: ["Goal", "If cue", "Then action", "Automatic initiation", "Review"],
    levers: ["Specify when and where", "Choose a stable cue", "Pre-decide the response", "Rehearse mentally"],
    caution: "Plans help initiation, but they do not solve unrealistic goals or hostile environments by themselves.",
    tags: ["if then", "planning", "cue", "goal pursuit", "automaticity"],
    related: ["habit-loop", "fogg", "goal-setting", "emotion-regulation"],
    matrix: {
      Capability: ["Pre-plan"],
      Opportunity: ["Cue"],
      Motivation: ["Goal link"],
      Feedback: ["Review"],
      Social: ["Commitment"],
    },
  },
  {
    id: "expectancy-value",
    number: "09",
    title: "Expectancy-Value",
    group: "Motivation",
    icon: "scale",
    x: 152,
    y: 600,
    summary:
      "Effort rises when people expect they can succeed, value the outcome, and perceive costs as manageable.",
    components: ["Expectancy", "Value", "Cost", "Choice", "Effort"],
    levers: ["Increase efficacy evidence", "Raise task value", "Lower hidden costs", "Clarify near-term wins"],
    caution: "People do not compute motivation like a spreadsheet; emotion and identity alter perceived value and cost.",
    tags: ["expectancy", "value", "cost", "efficacy", "choice"],
    related: ["self-determination", "goal-setting", "fogg", "com-b"],
    matrix: {
      Capability: ["Efficacy"],
      Opportunity: ["Cost removal"],
      Motivation: ["Value"],
      Feedback: ["Success evidence"],
      Social: ["Identity value"],
    },
  },
  {
    id: "cbt-loop",
    number: "10",
    title: "Cognitive Behavioral Loop",
    group: "Cognition",
    icon: "mind",
    x: 392,
    y: 602,
    summary:
      "Situations, interpretations, emotions, bodily sensations, and behaviors reinforce one another over time.",
    components: ["Situation", "Thought", "Emotion", "Body", "Behavior"],
    levers: ["Name the interpretation", "Test predictions", "Change behavior first", "Regulate body arousal"],
    caution: "Do not reduce distress to thoughts alone; context, trauma, biology, and material conditions matter.",
    tags: ["thought", "emotion", "behavior", "body", "cognitive"],
    related: ["emotion-regulation", "control-theory", "social-feedback", "reinforcement"],
    matrix: {
      Capability: ["Cognitive skills"],
      Opportunity: ["Safer context"],
      Motivation: ["Relief"],
      Feedback: ["Prediction test"],
      Social: ["Support"],
    },
  },
  {
    id: "emotion-regulation",
    number: "11",
    title: "Emotion Regulation",
    group: "Cognition",
    icon: "wave",
    x: 625,
    y: 596,
    summary:
      "People alter emotional trajectories by selecting situations, shifting attention, reappraising meaning, or modulating response.",
    components: ["Situation", "Attention", "Appraisal", "Response", "Recovery"],
    levers: ["Modify the situation", "Redirect attention", "Reappraise meaning", "Plan recovery windows"],
    caution: "Suppression can be costly; regulation quality depends on timing, flexibility, and social setting.",
    tags: ["emotion", "attention", "appraisal", "response", "regulation"],
    related: ["cbt-loop", "implementation", "self-determination", "social-feedback"],
    matrix: {
      Capability: ["Reappraisal"],
      Opportunity: ["Situation choice"],
      Motivation: ["Affect goal"],
      Feedback: ["Arousal signal"],
      Social: ["Co-regulation"],
    },
  },
  {
    id: "social-feedback",
    number: "12",
    title: "Social Feedback Loop",
    group: "Social",
    icon: "orbit",
    x: 1000,
    y: 575,
    summary:
      "Norms, status signals, belonging, and identity cues make behavior visible, rewarded, copied, or resisted.",
    components: ["Signal", "Norm", "Identity", "Response", "Reputation"],
    levers: ["Make desired norms observable", "Reward contribution", "Protect belonging", "Design reciprocal feedback"],
    caution: "Social proof can amplify harmful behavior when the visible norm is undesirable or exclusionary.",
    tags: ["norms", "status", "identity", "belonging", "social proof"],
    related: ["self-determination", "com-b", "cbt-loop", "emotion-regulation", "social-comparison", "sociometer"],
    matrix: {
      Capability: ["Role clarity"],
      Opportunity: ["Visible norm"],
      Motivation: ["Belonging"],
      Feedback: ["Status signal"],
      Social: ["Reciprocity"],
    },
  },
  {
    id: "social-comparison",
    number: "13",
    title: "Social Comparison",
    group: "Social",
    icon: "compare",
    x: 968,
    y: 145,
    summary:
      "People evaluate progress, ability, and worth by comparing themselves with relevant others and visible reference groups.",
    components: ["Reference group", "Comparison", "Self-evaluation", "Affect", "Adjustment"],
    levers: ["Change the comparison set", "Show attainable peers", "Use self-referenced progress", "Reduce public ranking"],
    caution: "Comparison can inspire or injure; the same metric can motivate one person and shame another.",
    tags: ["comparison", "status", "reference group", "ranking", "self-evaluation"],
    related: ["social-feedback", "self-determination", "expectancy-value", "sociometer"],
    matrix: {
      Capability: ["Progress literacy"],
      Opportunity: ["Reference set"],
      Motivation: ["Attainable model"],
      Feedback: ["Benchmark"],
      Social: ["Norm framing"],
    },
  },
  {
    id: "sociometer",
    number: "14",
    title: "Sociometer Theory",
    group: "Social",
    icon: "meter",
    x: 835,
    y: 625,
    summary:
      "Self-esteem can function like a monitor for perceived acceptance, rejection, and relational value.",
    components: ["Social cue", "Relational value", "Self-esteem", "Affect", "Affiliation move"],
    levers: ["Increase belonging cues", "Reduce rejection ambiguity", "Create inclusive rituals", "Separate status from worth"],
    caution: "Self-esteem is not a perfect gauge; status, belonging, safety, and dominance can be tangled together.",
    tags: ["belonging", "self-esteem", "rejection", "acceptance", "relational value"],
    related: ["social-feedback", "self-determination", "emotion-regulation", "social-comparison"],
    matrix: {
      Capability: ["Signal reading"],
      Opportunity: ["Inclusion ritual"],
      Motivation: ["Acceptance"],
      Feedback: ["Belonging cue"],
      Social: ["Repair"],
    },
  },
];

const groups = ["Capability", "Opportunity", "Motivation", "Feedback", "Social"];
const modelById = new Map(models.map((model) => [model.id, model]));
const groupClass = (group) => group.toLowerCase();

const icons = {
  repeat: `<svg viewBox="0 0 24 24"><path d="M4 7h12a4 4 0 0 1 0 8H8"/><path d="m8 11-4 4 4 4"/><path d="M20 17H8a4 4 0 0 1 0-8h8"/><path d="m16 5 4 4-4 4"/></svg>`,
  spark: `<svg viewBox="0 0 24 24"><path d="m13 2-2 7-7 2 7 2 2 7 2-7 7-2-7-2-2-7Z"/><path d="M5 19h4"/><path d="M3 15h2"/></svg>`,
  triad: `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M10.5 7.5 6.5 15"/><path d="m13.5 7.5 4 7.5"/><path d="M8 18h8"/></svg>`,
  needs: `<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5 8c3 0 5 2 7 4 2-2 4-4 7-4"/><path d="M5 16c3 0 5-2 7-4 2 2 4 4 7 4"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24"><path d="M4 14a8 8 0 0 1 16 0"/><path d="M12 14 17 9"/><path d="M6 18h12"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24"><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/></svg>`,
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/></svg>`,
  route: `<svg viewBox="0 0 24 24"><path d="M5 6h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="22" r="2"/></svg>`,
  scale: `<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5 7h14"/><path d="m7 7-4 7h8L7 7Z"/><path d="m17 7-4 7h8l-4-7Z"/></svg>`,
  mind: `<svg viewBox="0 0 24 24"><path d="M9 18a6 6 0 0 1-1-11 5 5 0 0 1 9 3 4 4 0 0 1-1 8"/><path d="M9 18v3"/><path d="M16 18v3"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>`,
  wave: `<svg viewBox="0 0 24 24"><path d="M3 12c3-6 6 6 9 0s6 6 9 0"/><path d="M3 17c3-4 6 4 9 0s6 4 9 0"/></svg>`,
  orbit: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M4 12c0-4 4-7 8-7s8 3 8 7-4 7-8 7-8-3-8-7Z"/><path d="M12 5c3 2 5 4 5 7s-2 5-5 7"/></svg>`,
  compare: `<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M20 19V5"/><path d="M8 16h8"/><path d="m13 13 3 3-3 3"/><path d="M16 8H8"/><path d="m11 5-3 3 3 3"/></svg>`,
  meter: `<svg viewBox="0 0 24 24"><path d="M5 15a7 7 0 0 1 14 0"/><path d="M12 15 16 9"/><path d="M7 19h10"/><path d="M9 5l3-2 3 2"/></svg>`,
};

const enrichments = {
  "habit-loop": {
    bestFor: "Repeating behaviors tied to stable cues: checking apps, snacks, rituals, medication, practice routines.",
    evidence: "Habit research",
    timescale: "Days to months",
    contexts: ["Personal habits", "Product loops", "Health routines"],
    practical: {
      situation: "A person opens their phone every time work gets uncomfortable.",
      loop: "Uncomfortable task -> phone cue -> scrolling -> relief -> stronger escape cue tomorrow.",
      firstMove: "Keep the cue but swap the routine: stand up, write the next tiny task, then check the phone after two focused minutes.",
    },
  },
  fogg: {
    bestFor: "Moment-of-action design where the desired behavior is small, concrete, and promptable.",
    evidence: "Behavior design",
    timescale: "Seconds to days",
    contexts: ["Onboarding", "Habit starts", "Product prompts"],
    practical: {
      situation: "Someone wants to stretch daily but forgets until bedtime.",
      loop: "Motivation fluctuates, ability feels low, and no prompt appears at the right moment.",
      firstMove: "Shrink it to one stretch and attach the prompt to an existing event, like after starting the kettle.",
    },
  },
  "com-b": {
    bestFor: "Diagnosing why a behavior is not happening before choosing an intervention.",
    evidence: "Behavior change framework",
    timescale: "Weeks to systems",
    contexts: ["Public health", "Service design", "Teams"],
    practical: {
      situation: "A team says they support documentation, but almost no one updates project notes.",
      loop: "People lack templates, time, and visible examples, so motivation drops after each messy attempt.",
      firstMove: "Map the barrier: capability, opportunity, or motivation. Start with the missing template and protected update time.",
    },
  },
  "self-determination": {
    bestFor: "Designing motivation that lasts because people feel choice, growth, and belonging.",
    evidence: "Motivation theory",
    timescale: "Weeks to years",
    contexts: ["Education", "Leadership", "Health behavior"],
    practical: {
      situation: "A student only studies when threatened with a deadline.",
      loop: "External pressure creates compliance, but little ownership, so effort collapses when surveillance disappears.",
      firstMove: "Offer a meaningful choice of project path, clear competence feedback, and a reason the work matters.",
    },
  },
  "control-theory": {
    bestFor: "Progress tracking, self-regulation, and feedback design when a clear standard exists.",
    evidence: "Self-regulation theory",
    timescale: "Minutes to months",
    contexts: ["Goal tracking", "Coaching", "Operations"],
    practical: {
      situation: "Someone wants to save money but only checks their account when anxious.",
      loop: "Vague goal -> delayed feedback -> surprise discrepancy -> avoidance -> bigger discrepancy.",
      firstMove: "Define the reference value and create a weekly, low-drama check with one adjustment rule.",
    },
  },
  reinforcement: {
    bestFor: "Understanding why a behavior persists even when people say they want to stop.",
    evidence: "Learning theory",
    timescale: "Seconds to months",
    contexts: ["Behavior shaping", "Addictive loops", "Training"],
    practical: {
      situation: "A person keeps checking messages during dinner.",
      loop: "Most checks are empty, but occasional interesting replies create variable reward.",
      firstMove: "Move the reward window: batch messages after dinner and add a more immediate dinner-table reward.",
    },
  },
  "goal-setting": {
    bestFor: "Performance loops where effort, persistence, and strategy need a clear target.",
    evidence: "Goal-setting research",
    timescale: "Days to quarters",
    contexts: ["Work goals", "Training", "Learning"],
    practical: {
      situation: "A team wants to improve quality but only has the goal 'do better work.'",
      loop: "Ambiguous standard -> scattered effort -> weak feedback -> no strategy change.",
      firstMove: "Set one specific quality marker, add a weekly review, and separate learning goals from output goals.",
    },
  },
  implementation: {
    bestFor: "Closing the intention-action gap when people already care about the goal.",
    evidence: "Planning research",
    timescale: "Moments to weeks",
    contexts: ["Follow-through", "Relapse prevention", "Routines"],
    practical: {
      situation: "Someone intends to go for a walk but keeps negotiating with themselves after work.",
      loop: "End of work arrives, fatigue rises, and the plan becomes a fresh decision every day.",
      firstMove: "Write the plan as: if I close my laptop at 5:30, then I put on shoes and walk around the block.",
    },
  },
  "expectancy-value": {
    bestFor: "Low-effort patterns where confidence, value, or perceived cost is the real blocker.",
    evidence: "Achievement motivation",
    timescale: "Hours to months",
    contexts: ["Education", "Career", "Skill building"],
    practical: {
      situation: "A beginner abandons a design course after two hard lessons.",
      loop: "Low success expectancy plus high effort cost makes avoidance feel rational.",
      firstMove: "Create visible early wins, lower the next lesson cost, and connect the skill to a valued identity.",
    },
  },
  "cbt-loop": {
    bestFor: "Patterns where thoughts, body sensations, emotion, and action keep reinforcing distress.",
    evidence: "Clinical framework",
    timescale: "Minutes to months",
    contexts: ["Anxiety", "Avoidance", "Mood loops"],
    practical: {
      situation: "Before presenting, someone thinks 'I will freeze,' feels panic, and cancels.",
      loop: "Catastrophic thought -> body alarm -> avoidance -> short relief -> stronger belief next time.",
      firstMove: "Run a small behavioral experiment: present one slide to a trusted person and record what actually happens.",
    },
  },
  "emotion-regulation": {
    bestFor: "Choosing where to intervene in an emotional episode before it peaks.",
    evidence: "Emotion regulation research",
    timescale: "Seconds to days",
    contexts: ["Stress", "Conflict", "Recovery"],
    practical: {
      situation: "A disagreement escalates quickly in a planning meeting.",
      loop: "Threat appraisal narrows attention, the response gets sharper, and the room becomes more defensive.",
      firstMove: "Intervene earlier: pause the situation, redirect attention to the shared goal, then reappraise the disagreement as information.",
    },
  },
  "social-feedback": {
    bestFor: "Behavior shaped by norms, reputation, belonging, and visible group signals.",
    evidence: "Social psychology",
    timescale: "Moments to culture",
    contexts: ["Communities", "Teams", "Platforms"],
    practical: {
      situation: "New members lurk in a community but rarely contribute.",
      loop: "No visible low-risk contribution norm -> silence -> silence becomes the visible norm.",
      firstMove: "Make small first contributions visible, welcomed, and reciprocated by established members.",
    },
  },
  "social-comparison": {
    bestFor: "Motivation swings caused by rankings, peer visibility, public metrics, or idealized feeds.",
    evidence: "Classic social theory",
    timescale: "Seconds to months",
    contexts: ["Social platforms", "Education", "Performance cultures"],
    practical: {
      situation: "A runner feels worse after seeing faster friends post their splits.",
      loop: "Upward comparison -> threat to ability -> discouragement -> skipped training -> wider gap.",
      firstMove: "Switch the comparison set to past-self progress and attainable peer examples.",
    },
  },
  sociometer: {
    bestFor: "Loops where perceived rejection or uncertain belonging drives withdrawal, overperformance, or status seeking.",
    evidence: "Belonging theory",
    timescale: "Moments to years",
    contexts: ["Teams", "Friendship", "Identity"],
    practical: {
      situation: "A teammate stops speaking after their idea is ignored twice.",
      loop: "Ambiguous rejection cue -> lower relational value -> withdrawal -> fewer positive signals.",
      firstMove: "Repair the signal directly: invite the person back in, name the value of the contribution, and create a turn-taking norm.",
    },
  },
};

models.forEach((model) => Object.assign(model, enrichments[model.id]));

const scenarios = [
  {
    id: "procrastination",
    title: "Procrastination spiral",
    setup: "A task matters, but the first step feels vague and emotionally loaded.",
    flow: ["Ambiguous task", "Threat appraisal", "Avoidance", "Short relief", "Bigger task"],
    models: ["cbt-loop", "implementation", "fogg", "control-theory"],
    moves: [
      "Make the next action visible enough to do in two minutes.",
      "Write one if-then plan for the first cue.",
      "Track relief as feedback, because relief is often what reinforces avoidance.",
    ],
  },
  {
    id: "doomscrolling",
    title: "Doomscrolling at night",
    setup: "The behavior looks like information seeking, but it is often a reward and emotion-regulation loop.",
    flow: ["Fatigue", "Phone cue", "Variable reward", "More arousal", "Later bedtime"],
    models: ["habit-loop", "reinforcement", "emotion-regulation", "fogg"],
    moves: [
      "Move the phone cue out of reach before fatigue peaks.",
      "Replace variable reward with a bounded wind-down ritual.",
      "Design the prompt for stopping, not just the prompt for starting.",
    ],
  },
  {
    id: "exercise",
    title: "Exercise consistency",
    setup: "Most plans fail because the desired action is too large for low-motivation days.",
    flow: ["Identity wish", "High target", "Missed session", "Lower expectancy", "Restart plan"],
    models: ["fogg", "expectancy-value", "self-determination", "habit-loop"],
    moves: [
      "Create a minimum viable workout that counts even on bad days.",
      "Track competence evidence, not only intensity.",
      "Choose a form of movement that supports autonomy and belonging.",
    ],
  },
  {
    id: "sleep",
    title: "Sleep reset",
    setup: "Bedtime problems are usually multiple loops: cues, arousal, delayed feedback, and social timing.",
    flow: ["Late cue", "Arousal", "Delay", "Morning cost", "Evening fatigue"],
    models: ["habit-loop", "control-theory", "emotion-regulation", "implementation"],
    moves: [
      "Pick one anchor cue for the start of shutdown.",
      "Measure morning energy to shorten the feedback delay.",
      "Plan an if-then response for the moment the old late-night cue appears.",
    ],
  },
  {
    id: "team-adoption",
    title: "Team tool adoption",
    setup: "People may like a new process but still avoid it when capability, opportunity, or status signals are wrong.",
    flow: ["New process", "Unclear norm", "Low use", "No payoff", "Return to old path"],
    models: ["com-b", "social-feedback", "goal-setting", "sociometer"],
    moves: [
      "Diagnose whether the blocker is skill, environment, motivation, or belonging risk.",
      "Make the desired norm visible through respected early adopters.",
      "Define one useful output standard and reward contribution publicly.",
    ],
  },
  {
    id: "comparison",
    title: "Comparison burnout",
    setup: "Public metrics can turn progress into a threat signal instead of useful feedback.",
    flow: ["Visible peers", "Upward comparison", "Lower efficacy", "Withdrawal", "Less progress"],
    models: ["social-comparison", "expectancy-value", "self-determination", "sociometer"],
    moves: [
      "Change the reference group from elite peers to attainable near-peers.",
      "Use self-referenced progress as the default metric.",
      "Add belonging cues that are not tied to rank.",
    ],
  },
  {
    id: "restless-longing",
    title: "Restless Dopamine Loop",
    setup: "Trying to satisfy an infinite need for purpose using finite digital metrics, resulting in constant striving.",
    flow: ["Existential void", "Novelty prompt", "Compulsive chase", "Adaptation", "Deep restlessness"],
    models: ["self-determination", "reinforcement", "sociometer", "expectancy-value"],
    moves: [
      "Realize finite rewards trigger hedonic adaptation; redirect desires to transcendent values.",
      "Remove immediate prompts of digital feedback to let dopamine baselines recover.",
      "Cultivate intrinsic meaning through vocation and non-utility rest (Sabbath)."
    ]
  },
  {
    id: "rumination-spiral",
    title: "The Rumination Spiral",
    setup: "Spiraling in anxiety, turning self-examination into a self-focused threat loop.",
    flow: ["External trigger", "DMN hyperactivity", "Anxious self-talk", "Amygdala arousal", "Increased threat"],
    models: ["cbt-loop", "control-theory", "emotion-regulation"],
    moves: [
      "Quieten the Default Mode Network using a silent present-moment attentional anchor (vow or word).",
      "Re-calibrate your reference goals toward grace rather than absolute control.",
      "Practice an examen centered on gratitude to shift subcortical circuits toward peace."
    ]
  }
];

let selectedId = "habit-loop";
let activeFilter = "all";
let searchTerm = "";
let traceIndex = 0;
let activeLens = "psychology";

const edgeLayer = document.querySelector("#edgeLayer");
const nodeLayer = document.querySelector("#nodeLayer");
const modelGrid = document.querySelector("#modelGrid");
const leverMatrix = document.querySelector("#leverMatrix");
const scenarioRail = document.querySelector("#scenarioRail");
const visibleCount = document.querySelector("#visibleCount");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter-chip")];

const detail = {
  dot: document.querySelector("#detailGroupDot"),
  group: document.querySelector("#detailGroup"),
  title: document.querySelector("#detailTitle"),
  summary: document.querySelector("#detailSummary"),
  meta: document.querySelector("#detailMeta"),
  chain: document.querySelector("#detailChain"),
  bestFor: document.querySelector("#detailBestFor"),
  situation: document.querySelector("#detailSituation"),
  exampleLoop: document.querySelector("#detailExampleLoop"),
  firstMove: document.querySelector("#detailFirstMove"),
  levers: document.querySelector("#detailLevers"),
  caution: document.querySelector("#detailCaution"),
  related: document.querySelector("#detailRelated"),
};

const scenarioDetail = {
  title: document.querySelector("#scenarioTitle"),
  setup: document.querySelector("#scenarioSetup"),
  flow: document.querySelector("#scenarioFlow"),
  models: document.querySelector("#scenarioModels"),
  moves: document.querySelector("#scenarioMoves"),
};

const nodeLabels = {
  "habit-loop": "Habit",
  fogg: "Fogg",
  "com-b": "COM-B",
  "self-determination": "SDT",
  "control-theory": "Control",
  reinforcement: "Reward",
  "goal-setting": "Goals",
  implementation: "If-Then",
  "expectancy-value": "Value",
  "cbt-loop": "CBT",
  "emotion-regulation": "Emotion",
  "social-feedback": "Norms",
  "social-comparison": "Compare",
  sociometer: "Belong",
};

function pathBetween(source, target, bend = 0.18) {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const mx = source.x + dx / 2;
  const my = source.y + dy / 2;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M ${source.x} ${source.y} Q ${cx} ${cy} ${target.x} ${target.y}`;
}

function renderEdges() {
  const seen = new Set();
  const fragments = [];

  models.forEach((model) => {
    model.related.forEach((relatedId) => {
      const key = [model.id, relatedId].sort().join("-");
      if (seen.has(key)) return;
      seen.add(key);
      const related = modelById.get(relatedId);
      fragments.push(
        `<path class="map-edge" data-source="${model.id}" data-target="${relatedId}" d="${pathBetween(model, related)}"></path>`,
      );
    });
  });

  edgeLayer.innerHTML = fragments.join("");
}

function iconPath(iconName) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = icons[iconName];
  return wrapper.firstElementChild.innerHTML;
}

function renderNodes() {
  nodeLayer.innerHTML = models
    .map(
      (model) => `
        <g class="map-node" data-id="${model.id}" data-group="${model.group}" transform="translate(${model.x} ${model.y})" tabindex="0" role="button" aria-label="${model.title}">
          <circle class="node-halo" r="68"></circle>
          <circle class="node-shell" r="45"></circle>
          <circle class="node-core" cx="33" cy="-33" r="17"></circle>
          <text class="node-number" x="33" y="-27">${model.number}</text>
          <g class="node-icon" transform="translate(-17 -17) scale(1.42)">
            ${iconPath(model.icon)}
          </g>
          <text class="node-label" y="76">${nodeLabels[model.id]}</text>
        </g>
      `,
    )
    .join("");

  document.querySelectorAll(".map-node").forEach((node) => {
    node.addEventListener("click", () => selectModel(node.dataset.id));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectModel(node.dataset.id);
      }
    });
  });
}

function renderCards() {
  const template = document.querySelector("#modelCardTemplate");
  modelGrid.innerHTML = "";

  models.forEach((model) => {
    const clone = template.content.cloneNode(true);
    const article = clone.querySelector(".model-card");
    const button = clone.querySelector(".card-hit");
    article.dataset.group = model.group;
    button.dataset.id = model.id;
    clone.querySelector(".card-icon").innerHTML = icons[model.icon];
    clone.querySelector(".card-group").textContent = model.group;
    clone.querySelector("strong").textContent = model.title;
    clone.querySelector(".card-summary").textContent = model.summary;
    clone.querySelector(".card-tags").innerHTML = [model.evidence, model.timescale]
      .map((tag) => `<span>${tag}</span>`)
      .join("");
    button.addEventListener("click", () => {
      selectModel(model.id);
      document.querySelector("#map").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    modelGrid.appendChild(clone);
  });
}

function renderScenarios() {
  scenarioRail.innerHTML = scenarios
    .map(
      (scenario, index) => `
        <button class="scenario-button ${index === 0 ? "is-active" : ""}" type="button" data-scenario="${scenario.id}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${scenario.title}</strong>
        </button>
      `,
    )
    .join("");

  scenarioRail.querySelectorAll(".scenario-button").forEach((button) => {
    button.addEventListener("click", () => selectScenario(button.dataset.scenario));
  });

  selectScenario(scenarios[0].id);
}

function renderMatrix() {
  const headers = ["Model", ...groups];
  leverMatrix.innerHTML = headers.map((header) => `<div class="matrix-head">${header}</div>`).join("");

  models.forEach((model) => {
    leverMatrix.insertAdjacentHTML("beforeend", `<div class="matrix-cell model-name">${model.title}</div>`);
    groups.forEach((group) => {
      const pills = model.matrix[group]
        .map((item) => `<span class="matrix-pill">${item}</span>`)
        .join("");
      leverMatrix.insertAdjacentHTML("beforeend", `<div class="matrix-cell">${pills}</div>`);
    });
  });
}

function matchesModel(model) {
  const matchesFilter = activeFilter === "all" || model.group === activeFilter;
  const haystack = [
    model.title,
    model.group,
    model.summary,
    model.components.join(" "),
    model.levers.join(" "),
    model.tags.join(" "),
    model.contexts.join(" "),
    model.bestFor,
    model.practical.situation,
    model.practical.loop,
    model.practical.firstMove,
  ]
    .join(" ")
    .toLowerCase();
  return matchesFilter && haystack.includes(searchTerm);
}

function updateVisibility() {
  const visibleIds = new Set(models.filter(matchesModel).map((model) => model.id));
  visibleCount.textContent = String(visibleIds.size).padStart(2, "0");

  document.querySelectorAll(".map-node").forEach((node) => {
    const isVisible = visibleIds.has(node.dataset.id);
    node.classList.toggle("is-muted", !isVisible);
  });

  document.querySelectorAll(".model-card").forEach((card) => {
    const id = card.querySelector(".card-hit").dataset.id;
    card.hidden = !visibleIds.has(id);
  });
}

function updateDetails(model) {
  detail.dot.className = `group-dot ${groupClass(model.group)}`;
  detail.group.textContent = model.group;
  detail.title.textContent = model.title;
  detail.summary.textContent = model.summary;
  detail.meta.innerHTML = [model.evidence, model.timescale, ...model.contexts]
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  detail.chain.innerHTML = model.components.map((component) => `<span>${component}</span>`).join("");
  detail.bestFor.textContent = model.bestFor;
  detail.situation.textContent = model.practical.situation;
  detail.exampleLoop.textContent = model.practical.loop;
  detail.firstMove.textContent = model.practical.firstMove;
  detail.levers.innerHTML = model.levers.map((lever) => `<li>${lever}</li>`).join("");
  detail.caution.textContent = model.caution;
  detail.related.innerHTML = model.related
    .map((id) => {
      const related = modelById.get(id);
      return `<button type="button" data-id="${id}">${related.title}</button>`;
    })
    .join("");
  detail.related.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => selectModel(button.dataset.id));
  });
  document.querySelector(".detail-panel").dataset.group = model.group;
  document.querySelector(".practice-stack").dataset.group = model.group;

  // Update detail panel lens state
  updateLensView();

  // Populate Theology & Neurobiology stack
  if (model.integration) {
    document.getElementById("detailTelos").textContent = model.integration.telos;
    document.getElementById("detailSubstrate").textContent = model.integration.substrate;
    document.getElementById("detailTheology").textContent = model.integration.theology;
    document.getElementById("detailPractice").textContent = model.integration.practice;
  } else {
    document.getElementById("detailTelos").textContent = "N/A";
    document.getElementById("detailSubstrate").textContent = "General cortical/subcortical networks";
    document.getElementById("detailTheology").textContent = "This loop represents general cognitive-behavioral dynamics that support self-monitoring and value alignment in daily life.";
    document.getElementById("detailPractice").textContent = "Integrate standard cognitive restructuring and present-moment awareness.";
  }
}

function selectScenario(id) {
  const scenario = scenarios.find((item) => item.id === id);
  if (!scenario) return;

  scenarioRail.querySelectorAll(".scenario-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scenario === id);
  });

  scenarioDetail.title.textContent = scenario.title;
  scenarioDetail.setup.textContent = scenario.setup;
  scenarioDetail.flow.innerHTML = scenario.flow.map((step) => `<span>${step}</span>`).join("");
  scenarioDetail.models.innerHTML = scenario.models
    .map((modelId) => {
      const model = modelById.get(modelId);
      return `<button type="button" data-id="${modelId}" data-group="${model.group}">${model.title}</button>`;
    })
    .join("");
  scenarioDetail.moves.innerHTML = scenario.moves.map((move) => `<li>${move}</li>`).join("");
  scenarioDetail.models.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectModel(button.dataset.id);
      document.querySelector("#map").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const firstModel = scenario.models[0];
  if (modelById.has(firstModel)) selectModel(firstModel);
}

function updateMapState() {
  const selected = modelById.get(selectedId);
  const related = new Set(selected.related);
  related.add(selected.id);

  document.querySelectorAll(".map-node").forEach((node) => {
    const nodeId = node.dataset.id;
    node.classList.toggle("is-selected", nodeId === selectedId);
    node.classList.toggle("is-traced", related.has(nodeId) && nodeId !== selectedId);
  });

  document.querySelectorAll(".map-edge").forEach((edge) => {
    const touchesSelection = edge.dataset.source === selectedId || edge.dataset.target === selectedId;
    edge.classList.toggle("is-related", touchesSelection);
    edge.classList.toggle("is-muted", !touchesSelection);
  });
}

function selectModel(id) {
  const model = modelById.get(id);
  if (!model) return;
  selectedId = id;
  traceIndex = 0;
  updateDetails(model);
  updateMapState();
}

function traceNextRelated() {
  const selected = modelById.get(selectedId);
  const nextId = selected.related[traceIndex % selected.related.length];
  traceIndex += 1;
  selectModel(nextId);
}

function resetAtlas() {
  activeFilter = "all";
  searchTerm = "";
  searchInput.value = "";
  filterButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
  selectModel("habit-loop");
  updateVisibility();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    updateVisibility();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim().toLowerCase();
  updateVisibility();
});

document.querySelector("#traceButton").addEventListener("click", traceNextRelated);
document.querySelector("#resetButton").addEventListener("click", resetAtlas);

// Theology & Neurobiology Integration Data
const integrationData = {
  "habit-loop": {
    telos: "Embodied Liturgy",
    substrate: "Dorsal Striatum (DMS to DLS transition) & Task-Bracketing",
    theology: "James K.A. Smith's 'Desiring the Kingdom': we are shaped not by what we think, but by what we repeatedly do. Liturgies are secular or sacred routines that capture our heart's ultimate desire at an automated, bodily level.",
    practice: "Liturgical Re-anchoring: Place a physical reminder of prayer (Bible, icon, cross) directly on top of your physical cue (laptop or pillow) to interrupt the default loop."
  },
  "cbt-loop": {
    telos: "Apophatic Stillness",
    substrate: "Default Mode Network (mPFC, PCC) vs. Task-Positive Network (dlPFC)",
    theology: "The Cloud of Unknowing: a spiritual path of letting go of mental images, thoughts, and cognitive constructs (apophasis) to rest in the divine presence beyond thought.",
    practice: "Centering Prayer: Silently repeating a single sacred word (e.g., 'Peace') to shift attention from the narrative self (DMN) to present-moment receptivity (TPN)."
  },
  "control-theory": {
    telos: "Ignatian Discernment",
    substrate: "dlPFC Comparator & Medial Prefrontal Self-Referentiality",
    theology: "The Ignatian Examen: a structured method of daily prayerful review. It allows the practitioner to monitor thoughts, emotions, and bodily reactions in the light of gospel values.",
    practice: "Daily Examen: Step-by-step audit of the day: 1. Gratitude, 2. Petition, 3. Review of actions, 4. Reconciliation, 5. Look forward with resolve."
  },
  "self-determination": {
    telos: "The Restless Heart",
    substrate: "Mesolimbic Dopamine SEEKING System (VTA -> NAcc)",
    theology: "Augustinian longing: human hearts are hardwired with an infinite desire that cannot be satisfied by finite things. Worldly pleasures provide temporary dopaminergic rewards but leave the heart restless.",
    practice: "Sacred Desire Realignment: When noticing a craving for status or control, pause and pray: 'O Lord, my heart is restless until it rests in you,' redirecting the SEEKING system."
  },
  "expectancy-value": {
    telos: "Consolation and Desolation",
    substrate: "Dopamine-driven reward expectation & Serotonergic mood modulation",
    theology: "St. Ignatius's Discernment of Spirits: tracking states of spiritual consolidation (increases in hope, love, and energy) and desolation (tepidity, anxiety, and a drift toward low, earthly things).",
    practice: "Discernment Review: Audit your commitments. Are actions driven by desolation (anxious striving, low expectancy of meaning) or consolation (peaceful value-alignment)?"
  },
  "fogg": {
    telos: "Sabbath Rest",
    substrate: "HPA Axis Cortisol Regulation & Subcortical PLAY Pathways",
    theology: "Heschel's 'The Sabbath': a temporal sanctuary. By commanding the cessation of production, the Sabbath acts as a physical barrier that prevents work-related prompts.",
    practice: "Sabbath Rest: Choose a 24-hour window where computers, email, and task-management tools are physically locked away, forcing the body out of work-related threat loops."
  },
  "emotion-regulation": {
    telos: "Communal Co-regulation",
    substrate: "Vagal nerve activation, oxytocin, and endogenous endorphins",
    theology: "Liturgical feast and Eucharistic worship: communal gatherings that replace isolation and threat with shared song, sacred food, and visual beauty, fostering trust and safety in the presence of God.",
    practice: "Eucharistic Rest: Schedule a weekly non-productive dinner or shared liturgy designed solely for gratitude, relationship, and safety, quieting bodily survival systems."
  }
};

// Map integration data to models
models.forEach(model => {
  if (integrationData[model.id]) {
    model.integration = integrationData[model.id];
  }
});

// Lens tab button event listeners
const btnPsych = document.getElementById("lens-psych");
const btnTheo = document.getElementById("lens-theo");
const practiceStack = document.getElementById("practice-stack");
const integrationStack = document.getElementById("integration-stack");

function updateLensView() {
  if (!btnPsych || !btnTheo || !practiceStack || !integrationStack) return;

  if (activeLens === "psychology") {
    btnPsych.classList.add("is-active");
    btnPsych.setAttribute("aria-selected", "true");
    btnTheo.classList.remove("is-active");
    btnTheo.setAttribute("aria-selected", "false");
    practiceStack.style.display = "";
    integrationStack.style.display = "none";
  } else {
    btnTheo.classList.add("is-active");
    btnTheo.setAttribute("aria-selected", "true");
    btnPsych.classList.remove("is-active");
    btnPsych.setAttribute("aria-selected", "false");
    practiceStack.style.display = "none";
    integrationStack.style.display = "";
  }
}

if (btnPsych && btnTheo) {
  btnPsych.addEventListener("click", () => {
    activeLens = "psychology";
    updateLensView();
  });

  btnTheo.addEventListener("click", () => {
    activeLens = "theology";
    updateLensView();
  });
}

renderEdges();
renderNodes();
renderCards();
renderScenarios();
renderMatrix();
selectModel(selectedId);
updateVisibility();

// --- Theology & Neuroscience Integration Section Logic ---
(function(){
  // Tab switching inside the dedicated section
  const tabs = document.querySelectorAll('#integration .tab-btn');
  const contents = document.querySelectorAll('#integration .tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');
      
      // Update active tab button
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Update active content
      contents.forEach(content => {
        content.classList.remove('active');
      });
      const targetContent = document.getElementById(targetId);
      if(targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Tab 1: Attention Hinge Toggle (DMN vs TPN)
  const btnDmn = document.getElementById('hinge-dmn');
  const btnTpn = document.getElementById('hinge-tpn');
  const pathDmn = document.getElementById('path-dmn');
  const pathTpn = document.getElementById('path-tpn');
  const desc = document.getElementById('hinge-desc');
  const nodeMpfc = document.getElementById('node-mpfc');
  const nodePcc = document.getElementById('node-pcc');
  const nodeDlpfc = document.getElementById('node-dlpfc');
  const nodeInsula = document.getElementById('node-insula');

  if(btnDmn && btnTpn) {
    btnDmn.addEventListener('click', () => {
      btnDmn.classList.add('active');
      btnTpn.classList.remove('active');
      
      nodeMpfc.classList.add('active');
      nodePcc.classList.add('active');
      nodeDlpfc.classList.remove('active');
      nodeDlpfc.querySelector('.node-outer').style.stroke = 'var(--line)';
      nodeDlpfc.querySelector('.node-inner').style.fill = 'var(--muted)';
      nodeInsula.classList.remove('active');
      nodeInsula.querySelector('.node-outer').style.stroke = 'var(--line)';
      nodeInsula.querySelector('.node-inner').style.fill = 'var(--muted)';
      
      pathDmn.classList.add('active');
      pathTpn.classList.remove('active');
      pathTpn.setAttribute('stroke-dasharray', '5 5');
      
      desc.innerHTML = "<strong>Narrative Rumination Loop Active:</strong> Energy moves continuously between the Medial Prefrontal Cortex (mPFC) and the Posterior Cingulate Cortex (PCC). The brain compiles histories, anticipates threats, and maintains self-defensive stories, generating cortisol.";
      desc.classList.remove('tpn-state');
    });

    btnTpn.addEventListener('click', () => {
      btnTpn.classList.add('active');
      btnDmn.classList.remove('active');
      
      nodeMpfc.classList.remove('active');
      nodePcc.classList.remove('active');
      nodeDlpfc.classList.add('active');
      nodeDlpfc.querySelector('.node-outer').style.stroke = 'var(--ink)';
      nodeDlpfc.querySelector('.node-inner').style.fill = 'var(--ink)';
      nodeInsula.classList.add('active');
      nodeInsula.querySelector('.node-outer').style.stroke = 'var(--ink)';
      nodeInsula.querySelector('.node-inner').style.fill = 'var(--ink)';
      
      pathDmn.classList.remove('active');
      pathTpn.classList.add('active');
      pathTpn.setAttribute('stroke-dasharray', '0');
      
      desc.innerHTML = "<strong>Task-Positive Network Re-coupled:</strong> Return to the sacred word recruits the dlPFC to decouple from PCC-mPFC rumination. Insula activation brings somatic awareness, quieting the Default Mode Network and allowing receptive rest in God.";
      desc.classList.add('tpn-state');
    });
  }

  // Tab 4: Sabbath Slider
  const slider = document.getElementById('spectrum-slider');
  const cardBox = document.getElementById('slider-card-box');
  const valState = document.getElementById('val-state');
  const valBrain = document.getElementById('val-brain');
  const valFocus = document.getElementById('val-focus');
  const valDrive = document.getElementById('val-drive');
  const valOutcome = document.getElementById('val-outcome');
  const valMyelin = document.getElementById('val-myelin');

  if(slider) {
    slider.addEventListener('input', () => {
      const val = parseInt(slider.value);
      
      if(val < 30) {
        valState.textContent = "Hyperactive Threat Loop";
        valState.style.color = 'var(--coral)';
        valBrain.textContent = "High Amygdala & Cortisol levels";
        valFocus.textContent = "Control & Accumulation";
        valDrive.textContent = "Dopamine seeking / hedonic chasing";
        valOutcome.textContent = "Chronic Stiffening";
        valMyelin.textContent = "Reinforcing fear-based superhighways";
        cardBox.style.borderColor = 'var(--ink)';
        cardBox.style.background = 'var(--paper)';
      } else if (val < 70) {
        valState.textContent = "Transition State (Ceasing)";
        valState.style.color = 'var(--ink)';
        valBrain.textContent = "Amygdala activity beginning to decay";
        valFocus.textContent = "De-escalation / Unplugging";
        valDrive.textContent = "Dopamine seeking declines";
        valOutcome.textContent = "Perceived Safety Rising";
        valMyelin.textContent = "Synapses transitioning to rest states";
        cardBox.style.borderColor = 'var(--ink)';
        cardBox.style.background = 'var(--paper)';
      } else {
        valState.textContent = "Sabbath Safety Circuit Active";
        valState.style.color = 'var(--mint)';
        valBrain.textContent = "Subcortical PLAY circuits active; low cortisol";
        valFocus.textContent = "Relational Joy & Play (Eutrapelia)";
        valDrive.textContent = "Endorphins & Oxytocin release";
        valOutcome.textContent = "Neuroplastic Growth (BDNF)";
        valMyelin.textContent = "Myelinating pathways of peace and attachment";
        cardBox.style.borderColor = 'var(--mint)';
        cardBox.style.background = 'color-mix(in srgb, var(--paper-2) 93%, rgba(24, 184, 135, 0.08))';
      }
    });
  }
})();
