/* Russian: the page is static per language (<html data-lang="ru"> on /loop-atlas/ru/).
   IS_RU, GL() and TXT() are no-ops on the English page. */
const IS_RU = document.documentElement.getAttribute("data-lang") === "ru";
const GROUP_RU = {
  Habit: "Привычка",
  Motivation: "Мотивация",
  Feedback: "Обратная связь",
  Cognition: "Мышление",
  Social: "Социальное",
  Capability: "Способность",
  Opportunity: "Возможность",
  Model: "Модель",
};
const GL = (group) => (IS_RU && GROUP_RU[group]) || group;
const TR = {
  "N/A": "Нет данных",
  "General cortical/subcortical networks": "Общие корковые и подкорковые сети",
  "This loop represents general cognitive-behavioral dynamics that support self-monitoring and value alignment in daily life.":
    "Эта петля отражает общую когнитивно-поведенческую динамику, которая в повседневной жизни поддерживает самонаблюдение и согласование с ценностями.",
  "Integrate standard cognitive restructuring and present-moment awareness.":
    "Используй стандартную когнитивную перестройку и осознанность в настоящем моменте.",
  "<strong>Narrative Rumination Loop Active:</strong> Energy moves continuously between the Medial Prefrontal Cortex (mPFC) and the Posterior Cingulate Cortex (PCC). The brain compiles histories, anticipates threats, and maintains self-defensive stories, generating cortisol.":
    "<strong>Активна петля нарративной руминации:</strong> Энергия непрерывно ходит между медиальной префронтальной корой (ПФК) и задней поясной корой (ЗПК). Мозг собирает истории, предугадывает угрозы и поддерживает защитные рассказы о себе, вырабатывая кортизол.",
  "<strong>Task-Positive Network Re-coupled:</strong> Return to the sacred word recruits the dlPFC to decouple from PCC-mPFC rumination. Insula activation brings somatic awareness, quieting the Default Mode Network and allowing receptive rest in God.":
    "<strong>Сеть выполнения задач снова включена:</strong> Возвращение к священному слову подключает дорсолатеральную префронтальную кору и отделяет её от руминации ЗПК и медиальной ПФК. Активация островка приносит телесную осознанность, успокаивает сеть пассивного режима и открывает место для восприимчивого покоя в Боге.",
  "Hyperactive Threat Loop": "Гиперактивная петля угрозы",
  "High Amygdala & Cortisol levels": "Высокая активность миндалины и уровень кортизола",
  "Control & Accumulation": "Контроль и накопление",
  "Dopamine seeking / hedonic chasing": "Поиск дофамина / гедоническая погоня",
  "Chronic Stiffening": "Хроническое окостенение",
  "Reinforcing fear-based superhighways": "Укрепление магистралей, построенных на страхе",
  "Transition State (Ceasing)": "Переходное состояние (прекращение)",
  "Amygdala activity beginning to decay": "Активность миндалины начинает спадать",
  "De-escalation / Unplugging": "Деэскалация / отключение",
  "Dopamine seeking declines": "Дофаминовый поиск ослабевает",
  "Perceived Safety Rising": "Растёт ощущение безопасности",
  "Synapses transitioning to rest states": "Синапсы переходят в состояние покоя",
  "Sabbath Safety Circuit Active": "Активен контур субботней безопасности",
  "Subcortical PLAY circuits active; low cortisol": "Активны подкорковые контуры ИГРЫ; низкий кортизол",
  "Relational Joy & Play (Eutrapelia)": "Радость в отношениях и игра (эутрапелия)",
  "Endorphins & Oxytocin release": "Выброс эндорфинов и окситоцина",
  "Neuroplastic Growth (BDNF)": "Нейропластический рост (BDNF)",
  "Myelinating pathways of peace and attachment": "Миелинизация путей мира и привязанности",
};
const TXT = (s) => (IS_RU && TR[s]) || s;

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
          <circle class="map-hit" r="74"></circle>
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
    clone.querySelector(".card-group").textContent = GL(model.group);
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
  leverMatrix.innerHTML = headers.map((header) => `<div class="matrix-head">${GL(header)}</div>`).join("");

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
  detail.group.textContent = GL(model.group);
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
    document.getElementById("detailTelos").textContent = TXT("N/A");
    document.getElementById("detailSubstrate").textContent = TXT("General cortical/subcortical networks");
    document.getElementById("detailTheology").textContent = TXT("This loop represents general cognitive-behavioral dynamics that support self-monitoring and value alignment in daily life.");
    document.getElementById("detailPractice").textContent = TXT("Integrate standard cognitive restructuring and present-moment awareness.");
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

// --- Russian payload: data written by this script, swapped in place by id/index with length checks ---
function applyRussian() {
  const fail = (what) => console.error("loop-atlas RU payload mismatch: " + what);
  const sameLen = (a, b, what) => {
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) return true;
    fail(what);
    return false;
  };

  const RU_MODELS = {
    "habit-loop": {
      title: "Петля привычки",
      summary: "Сигналы запускают рутину, рутина приносит награду, а повторяющееся предвкушение награды делает сам сигнал мотивирующим.",
      components: ["Сигнал", "Тяга", "Рутина", "Награда", "Прогноз"],
      levers: ["Сделать сигналы заметными", "Заменить рутину", "Сократить задержку награды", "Убрать конкурирующие сигналы"],
      caution: "Полезна для повторяющегося поведения, но может недооценивать идентичность, эмоции и социальный контекст.",
      tags: ["сигнал", "рутина", "награда", "тяга", "автоматизм"],
      matrix: { Capability: ["Практика", "Сценарии"], Opportunity: ["Дизайн сигналов", "Трение"], Motivation: ["Награда", "Тяга"], Feedback: ["Серии", "Прогноз"], Social: ["Общий ритуал"] },
      bestFor: "Повторяющееся поведение, привязанное к устойчивым сигналам: проверка приложений, перекусы, ритуалы, приём лекарств, регулярные занятия.",
      evidence: "Исследования привычек",
      timescale: "От дней до месяцев",
      contexts: ["Личные привычки", "Продуктовые петли", "Здоровые рутины"],
      practical: {
        situation: "Человек хватается за телефон каждый раз, когда работа становится неприятной.",
        loop: "Неприятная задача → сигнал-телефон → прокрутка → облегчение → завтра сигнал побега сильнее.",
        firstMove: "Оставь сигнал, но замени рутину: встань, запиши следующую крошечную задачу, а телефон проверь после двух минут сосредоточенной работы.",
      },
    },
    fogg: {
      title: "Поведенческая модель Фогга",
      summary: "Поведение происходит, когда мотивация, способность и подсказка сходятся в один момент.",
      components: ["Мотивация", "Способность", "Подсказка", "Поведение", "Результат"],
      levers: ["Уменьшить действие", "Ставить подсказку в момент действия", "Убрать барьеры для способности", "Проектировать под состояния с низкой мотивацией"],
      caution: "Сильна для дизайна продуктов и привычек; хуже раскрывает глубинные потребности, ценности и структуры власти.",
      tags: ["мотивация", "способность", "подсказка", "триггер", "дизайн поведения"],
      matrix: { Capability: ["Упростить", "Тренировать"], Opportunity: ["Подсказка"], Motivation: ["Искра"], Feedback: ["Мгновенный результат"], Social: ["Сигнал принятия"] },
      bestFor: "Дизайн момента действия, когда желаемое поведение маленькое, конкретное и привязывается к подсказке.",
      evidence: "Дизайн поведения",
      timescale: "От секунд до дней",
      contexts: ["Онбординг", "Старт привычки", "Подсказки в продукте"],
      practical: {
        situation: "Кто-то хочет каждый день делать растяжку, но вспоминает о ней только перед сном.",
        loop: "Мотивация колеблется, способность кажется низкой, а нужная подсказка в нужный момент не появляется.",
        firstMove: "Сократи действие до одного упражнения и привяжи подсказку к уже существующему событию — например, к тому моменту, когда поставил чайник.",
      },
    },
    "com-b": {
      title: "Система COM-B",
      summary: "Способность, возможность и мотивация взаимодействуют как минимальные условия для того, чтобы поведение возникло и закрепилось.",
      components: ["Способность", "Возможность", "Мотивация", "Поведение", "Перезапуск системы"],
      levers: ["Найти недостающее условие", "Изменить среду", "Тренировать способность", "Использовать политику или дизайн сервиса"],
      caution: "Это диагностическая рамка, а не рецепт в один шаг; подходящее вмешательство зависит от того, насколько конкретно описано поведение.",
      tags: ["способность", "возможность", "мотивация", "колесо изменения поведения", "диагностика"],
      matrix: { Capability: ["Обучение", "Тренировка"], Opportunity: ["Создание условий", "Перестройка"], Motivation: ["Убеждение", "Стимулы"], Feedback: ["Мониторинг"], Social: ["Пример для подражания"] },
      bestFor: "Диагностика того, почему поведение не происходит, прежде чем выбирать вмешательство.",
      evidence: "Рамка изменения поведения",
      timescale: "От недель до систем",
      contexts: ["Общественное здоровье", "Дизайн сервисов", "Команды"],
      practical: {
        situation: "Команда говорит, что поддерживает документацию, но почти никто не обновляет заметки по проекту.",
        loop: "Людям не хватает шаблонов, времени и наглядных примеров, поэтому после каждой неловкой попытки мотивация падает.",
        firstMove: "Определи барьер: способность, возможность или мотивация. Начни с недостающего шаблона и защищённого времени на обновления.",
      },
    },
    "self-determination": {
      title: "Теория самодетерминации",
      summary: "Качественная мотивация растёт, когда окружение поддерживает автономию, компетентность и связанность с другими.",
      components: ["Автономия", "Компетентность", "Связанность", "Интернализация", "Устойчивость"],
      levers: ["Давать осмысленный выбор", "Создавать обратную связь о компетентности", "Выстраивать принадлежность", "Связывать цели с ценностями"],
      caution: "Поддержка потребностей — это не значит всё упрощать или убирать структуру.",
      tags: ["автономия", "компетентность", "связанность", "внутренняя мотивация", "интернализация"],
      matrix: { Capability: ["Мастерство"], Opportunity: ["Архитектура выбора"], Motivation: ["Ценности"], Feedback: ["Сигнал компетентности"], Social: ["Принадлежность"] },
      bestFor: "Построение мотивации, которая держится, потому что люди чувствуют выбор, рост и принадлежность.",
      evidence: "Теория мотивации",
      timescale: "От недель до лет",
      contexts: ["Образование", "Лидерство", "Здоровое поведение"],
      practical: {
        situation: "Студент занимается, только когда над ним нависает дедлайн.",
        loop: "Внешнее давление даёт послушание, но почти не даёт ощущения «это моё», поэтому усилия рушатся, как только контроль исчезает.",
        firstMove: "Предложи осмысленный выбор пути проекта, ясную обратную связь о компетентности и причину, почему эта работа важна.",
      },
    },
    "control-theory": {
      title: "Теория контроля",
      summary: "Человек сравнивает текущее состояние с целевым эталоном, замечает расхождение, действует и снова считывает обратную связь.",
      components: ["Цель", "Мониторинг", "Сравнение", "Действие", "Обратная связь"],
      levers: ["Уточнить эталонное значение", "Чаще получать обратную связь", "Снизить шум", "Определить правила корректировки"],
      caution: "Люди часто регулируют несколько целей сразу, поэтому одна петля может конкурировать с другой.",
      tags: ["саморегуляция", "обратная связь", "цель", "мониторинг", "расхождение"],
      matrix: { Capability: ["Самонаблюдение"], Opportunity: ["Доступ к сигналу"], Motivation: ["Заметность цели"], Feedback: ["Компаратор"], Social: ["Подотчётность"] },
      bestFor: "Отслеживание прогресса, саморегуляция и дизайн обратной связи, когда есть ясный стандарт.",
      evidence: "Теория саморегуляции",
      timescale: "От минут до месяцев",
      contexts: ["Отслеживание целей", "Коучинг", "Операции"],
      practical: {
        situation: "Кто-то хочет копить деньги, но заглядывает в счёт только в тревоге.",
        loop: "Расплывчатая цель → запоздалая обратная связь → неожиданное расхождение → избегание → ещё большее расхождение.",
        firstMove: "Определи эталонное значение и заведи еженедельную спокойную проверку с одним правилом корректировки.",
      },
    },
    reinforcement: {
      title: "Петля подкрепления",
      summary: "Последствия меняют вероятность будущего поведения через награду, наказание, ошибку предсказания и контекст.",
      components: ["Поведение", "Последствие", "Валентность", "Ошибка предсказания", "Обновление стратегии"],
      levers: ["Делать последствия немедленными", "Награждать приближения", "Убрать случайное подкрепление", "Отслеживать переменные награды"],
      caution: "Награды могут формировать поведение, упуская смысл; внешние стимулы способны вытеснять внутренние мотивы.",
      tags: ["награда", "наказание", "предсказание", "подкрепление", "обучение"],
      matrix: { Capability: ["Формирование"], Opportunity: ["Контингентность"], Motivation: ["Ценность награды"], Feedback: ["Ошибка предсказания"], Social: ["Признание"] },
      bestFor: "Понимание того, почему поведение сохраняется, даже когда люди говорят, что хотят его бросить.",
      evidence: "Теория научения",
      timescale: "От секунд до месяцев",
      contexts: ["Формирование поведения", "Зависимые петли", "Тренинг"],
      practical: {
        situation: "Человек то и дело проверяет сообщения за ужином.",
        loop: "Большинство проверок пустые, но редкие интересные ответы создают переменную награду.",
        firstMove: "Сдвинь окно награды: читай сообщения пачкой после ужина и добавь более быструю награду прямо за столом.",
      },
    },
    "goal-setting": {
      title: "Теория постановки целей",
      summary: "Конкретные, трудные, принятые цели фокусируют внимание, прибавляют усилий, продлевают упорство и подталкивают к поиску стратегий.",
      components: ["Конкретная цель", "Приверженность", "Усилие", "Обратная связь", "Стратегия"],
      levers: ["Задать чёткий стандарт", "Подобрать сложность", "Добавить обратную связь о прогрессе", "Защитить приверженность"],
      caution: "Трудные цели могут сузить внимание или обернуться против нас, если игнорировать способности, этику или конфликт целей.",
      tags: ["цель", "сложность", "приверженность", "обратная связь", "результативность"],
      matrix: { Capability: ["Стратегия"], Opportunity: ["Ресурсы"], Motivation: ["Приверженность"], Feedback: ["Прогресс"], Social: ["Публичный стандарт"] },
      bestFor: "Петли результативности, где усилию, упорству и стратегии нужна чёткая цель.",
      evidence: "Исследования постановки целей",
      timescale: "От дней до кварталов",
      contexts: ["Рабочие цели", "Тренировки", "Обучение"],
      practical: {
        situation: "Команда хочет повысить качество, но у неё есть только цель «работать лучше».",
        loop: "Размытый стандарт → разрозненные усилия → слабая обратная связь → стратегия не меняется.",
        firstMove: "Задай один конкретный показатель качества, добавь еженедельный обзор и раздели цели обучения и цели по результату.",
      },
    },
    implementation: {
      title: "Имплементационные намерения",
      summary: "Планы «если — то» связывают ситуативный сигнал с конкретной реакцией, и движение к цели начинается с меньшими раздумьями.",
      components: ["Цель", "Если-сигнал", "То-действие", "Автоматический старт", "Обзор"],
      levers: ["Уточнить, когда и где", "Выбрать устойчивый сигнал", "Заранее решить реакцию", "Мысленно отрепетировать"],
      caution: "Планы помогают начать, но сами по себе не решают проблему нереалистичных целей или враждебной среды.",
      tags: ["если то", "планирование", "сигнал", "движение к цели", "автоматизм"],
      matrix: { Capability: ["Предварительный план"], Opportunity: ["Сигнал"], Motivation: ["Связь с целью"], Feedback: ["Обзор"], Social: ["Обязательство"] },
      bestFor: "Сокращение разрыва между намерением и действием, когда цель человеку уже важна.",
      evidence: "Исследования планирования",
      timescale: "От мгновений до недель",
      contexts: ["Доведение до конца", "Профилактика срывов", "Рутины"],
      practical: {
        situation: "Кто-то собирается пойти погулять, но после работы снова и снова торгуется с собой.",
        loop: "Работа заканчивается, нарастает усталость, и план превращается в новое решение каждый день.",
        firstMove: "Запиши план так: если я закрываю ноутбук в 5:30, то надеваю кроссовки и иду вокруг квартала.",
      },
    },
    "expectancy-value": {
      title: "Ожидание и ценность",
      summary: "Усилий становится больше, когда люди ждут, что справятся, ценят результат и считают издержки посильными.",
      components: ["Ожидание", "Ценность", "Издержки", "Выбор", "Усилие"],
      levers: ["Накопить свидетельства самоэффективности", "Повысить ценность задачи", "Снизить скрытые издержки", "Прояснить ближайшие победы"],
      caution: "Люди не считают мотивацию как таблицу: эмоции и идентичность меняют воспринимаемые ценность и издержки.",
      tags: ["ожидание", "ценность", "издержки", "самоэффективность", "выбор"],
      matrix: { Capability: ["Самоэффективность"], Opportunity: ["Снятие издержек"], Motivation: ["Ценность"], Feedback: ["Свидетельства успеха"], Social: ["Ценность для идентичности"] },
      bestFor: "Паттерны слабых усилий, где настоящий барьер — уверенность, ценность или воспринимаемые издержки.",
      evidence: "Мотивация достижения",
      timescale: "От часов до месяцев",
      contexts: ["Образование", "Карьера", "Развитие навыков"],
      practical: {
        situation: "Новичок бросает курс по дизайну после двух трудных уроков.",
        loop: "Низкое ожидание успеха плюс высокие издержки усилий делают избегание логичным.",
        firstMove: "Создай заметные ранние победы, снизь «цену» следующего урока и свяжи навык с важной для человека идентичностью.",
      },
    },
    "cbt-loop": {
      title: "Когнитивно-поведенческая петля",
      summary: "Ситуации, интерпретации, эмоции, телесные ощущения и поведение со временем подкрепляют друг друга.",
      components: ["Ситуация", "Мысль", "Эмоция", "Тело", "Поведение"],
      levers: ["Назвать интерпретацию", "Проверить предсказания", "Сначала изменить поведение", "Регулировать телесное возбуждение"],
      caution: "Не стоит сводить дистресс только к мыслям: важны контекст, травма, биология и материальные условия.",
      tags: ["мысль", "эмоция", "поведение", "тело", "когнитивный"],
      matrix: { Capability: ["Когнитивные навыки"], Opportunity: ["Более безопасный контекст"], Motivation: ["Облегчение"], Feedback: ["Проверка прогноза"], Social: ["Поддержка"] },
      bestFor: "Паттерны, где мысли, телесные ощущения, эмоции и действия продолжают подкреплять дистресс.",
      evidence: "Клиническая рамка",
      timescale: "От минут до месяцев",
      contexts: ["Тревога", "Избегание", "Петли настроения"],
      practical: {
        situation: "Перед выступлением человек думает «я замру», чувствует панику и отменяет выступление.",
        loop: "Катастрофическая мысль → тревога в теле → избегание → краткое облегчение → вера в мысль крепнет.",
        firstMove: "Проведи маленький поведенческий эксперимент: покажи один слайд человеку, которому доверяешь, и запиши, что на самом деле произошло.",
      },
    },
    "emotion-regulation": {
      title: "Регуляция эмоций",
      summary: "Люди меняют траекторию эмоций: выбирают ситуации, переключают внимание, переоценивают смысл или управляют реакцией.",
      components: ["Ситуация", "Внимание", "Оценка", "Реакция", "Восстановление"],
      levers: ["Изменить ситуацию", "Перенаправить внимание", "Переоценить смысл", "Запланировать время на восстановление"],
      caution: "Подавление может дорого обходиться; качество регуляции зависит от момента, гибкости и социального окружения.",
      tags: ["эмоция", "внимание", "оценка", "реакция", "регуляция"],
      matrix: { Capability: ["Переоценка"], Opportunity: ["Выбор ситуации"], Motivation: ["Цель по аффекту"], Feedback: ["Сигнал возбуждения"], Social: ["Совместная регуляция"] },
      bestFor: "Выбор места для вмешательства в эмоциональный эпизод до его пика.",
      evidence: "Исследования регуляции эмоций",
      timescale: "От секунд до дней",
      contexts: ["Стресс", "Конфликт", "Восстановление"],
      practical: {
        situation: "Спор на планёрке быстро накаляется.",
        loop: "Оценка угрозы сужает внимание, реакции становятся резче, и в комнате нарастает защитная настороженность.",
        firstMove: "Вмешайся раньше: поставь ситуацию на паузу, верни внимание к общей цели, а затем переосмысли разногласие как информацию.",
      },
    },
    "social-feedback": {
      title: "Петля социальной обратной связи",
      summary: "Нормы, сигналы статуса, принадлежность и сигналы идентичности делают поведение видимым, вознаграждаемым, копируемым или отвергаемым.",
      components: ["Сигнал", "Норма", "Идентичность", "Реакция", "Репутация"],
      levers: ["Сделать желаемые нормы заметными", "Награждать вклад", "Защищать принадлежность", "Выстраивать взаимную обратную связь"],
      caution: "Социальное доказательство может усилить вредное поведение, если видимая норма нежелательна или исключает других.",
      tags: ["нормы", "статус", "идентичность", "принадлежность", "социальное доказательство"],
      matrix: { Capability: ["Ясность ролей"], Opportunity: ["Видимая норма"], Motivation: ["Принадлежность"], Feedback: ["Сигнал статуса"], Social: ["Взаимность"] },
      bestFor: "Поведение, которое формируют нормы, репутация, принадлежность и видимые сигналы группы.",
      evidence: "Социальная психология",
      timescale: "От мгновений до культуры",
      contexts: ["Сообщества", "Команды", "Платформы"],
      practical: {
        situation: "Новички в сообществе читают, но почти не пишут.",
        loop: "Нет заметной нормы малозатратного вклада → молчание → молчание становится видимой нормой.",
        firstMove: "Сделай первые маленькие вклады заметными, тёплыми и взаимными со стороны давних участников.",
      },
    },
    "social-comparison": {
      title: "Социальное сравнение",
      summary: "Люди оценивают прогресс, способности и ценность, сравнивая себя со значимыми другими и видимыми референтными группами.",
      components: ["Референтная группа", "Сравнение", "Самооценка", "Аффект", "Корректировка"],
      levers: ["Сменить набор для сравнения", "Показывать достижимых сверстников", "Измерять прогресс относительно себя", "Сократить публичные рейтинги"],
      caution: "Сравнение может вдохновить, а может ранить: один и тот же показатель мотивирует одного и стыдит другого.",
      tags: ["сравнение", "статус", "референтная группа", "рейтинг", "самооценка"],
      matrix: { Capability: ["Грамотность в прогрессе"], Opportunity: ["Набор для сравнения"], Motivation: ["Достижимый образец"], Feedback: ["Ориентир"], Social: ["Подача нормы"] },
      bestFor: "Скачки мотивации из-за рейтингов, видимости сверстников, публичных метрик или идеализированных лент.",
      evidence: "Классическая социальная теория",
      timescale: "От секунд до месяцев",
      contexts: ["Соцсети", "Образование", "Культуры результата"],
      practical: {
        situation: "Бегун чувствует себя хуже, увидев, что друзья выложили более быстрые отрезки.",
        loop: "Сравнение с теми, кто выше → угроза способностям → упадок духа → пропущенные тренировки → разрыв растёт.",
        firstMove: "Переключи набор для сравнения на собственный прогресс и достижимые примеры сверстников.",
      },
    },
    sociometer: {
      title: "Теория социометра",
      summary: "Самооценка может работать как датчик воспринимаемого принятия, отвержения и ценности в отношениях.",
      components: ["Социальный сигнал", "Ценность в отношениях", "Самооценка", "Аффект", "Шаг к сближению"],
      levers: ["Усилить сигналы принадлежности", "Снизить неопределённость отвержения", "Создавать инклюзивные ритуалы", "Отделить статус от ценности"],
      caution: "Самооценка — неточный индикатор: статус, принадлежность, безопасность и доминирование могут переплетаться.",
      tags: ["принадлежность", "самооценка", "отвержение", "принятие", "ценность в отношениях"],
      matrix: { Capability: ["Чтение сигналов"], Opportunity: ["Ритуал включения"], Motivation: ["Принятие"], Feedback: ["Сигнал принадлежности"], Social: ["Восстановление"] },
      bestFor: "Петли, где воспринимаемое отвержение или неясная принадлежность толкают к уходу, перенапряжению или погоне за статусом.",
      evidence: "Теория принадлежности",
      timescale: "От мгновений до лет",
      contexts: ["Команды", "Дружба", "Идентичность"],
      practical: {
        situation: "Коллега замолкает после того, как его идею дважды проигнорировали.",
        loop: "Неоднозначный сигнал отвержения → падение ценности в отношениях → уход в себя → меньше позитивных сигналов.",
        firstMove: "Исправь сигнал напрямую: позови человека обратно, назови ценность его вклада и введи норму очерёдности слова.",
      },
    },
  };

  const RU_NODE_LABELS = {
    "habit-loop": "Привычка", fogg: "Фогг", "com-b": "COM-B", "self-determination": "ТСД",
    "control-theory": "Контроль", reinforcement: "Награда", "goal-setting": "Цели", implementation: "Если—то",
    "expectancy-value": "Ценность", "cbt-loop": "КПТ", "emotion-regulation": "Эмоции", "social-feedback": "Нормы",
    "social-comparison": "Сравнение", sociometer: "Связь",
  };

  const RU_SCENARIOS = {
    procrastination: {
      title: "Спираль прокрастинации",
      setup: "Задача важна, но первый шаг кажется расплывчатым и эмоционально нагруженным.",
      flow: ["Размытая задача", "Оценка угрозы", "Избегание", "Краткое облегчение", "Задача растёт"],
      moves: [
        "Сделай следующее действие настолько наглядным, чтобы его можно было выполнить за две минуты.",
        "Запиши один план «если — то» для первого сигнала.",
        "Отслеживай облегчение как обратную связь: именно оно часто подкрепляет избегание.",
      ],
    },
    doomscrolling: {
      title: "Скроллинг плохих новостей по ночам",
      setup: "Поведение похоже на поиск информации, но чаще это петля награды и регуляции эмоций.",
      flow: ["Усталость", "Сигнал-телефон", "Переменная награда", "Больше возбуждения", "Позднее время сна"],
      moves: [
        "Убери сигнал-телефон из зоны досягаемости до пика усталости.",
        "Замени переменную награду ограниченным ритуалом перед сном.",
        "Продумай подсказку для остановки, а не только для старта.",
      ],
    },
    exercise: {
      title: "Регулярные тренировки",
      setup: "Большинство планов проваливаются, потому что желаемое действие слишком велико для дней с низкой мотивацией.",
      flow: ["Образ себя", "Высокая планка", "Пропущенная тренировка", "Падение ожиданий", "План перезапуска"],
      moves: [
        "Придумай минимально жизнеспособную тренировку, которая засчитывается даже в плохие дни.",
        "Отслеживай свидетельства компетентности, а не только интенсивность.",
        "Выбери форму движения, которая поддерживает автономию и принадлежность.",
      ],
    },
    sleep: {
      title: "Перезагрузка сна",
      setup: "Проблемы с отходом ко сну — это обычно несколько петель сразу: сигналы, возбуждение, запоздалая обратная связь и социальный ритм.",
      flow: ["Поздний сигнал", "Возбуждение", "Задержка", "Цена утром", "Усталость вечером"],
      moves: [
        "Выбери один якорный сигнал для начала завершения дня.",
        "Измеряй утреннюю энергию, чтобы сократить задержку обратной связи.",
        "Заранее продумай реакцию «если — то» на момент, когда появляется старый поздний сигнал.",
      ],
    },
    "team-adoption": {
      title: "Внедрение инструмента в команде",
      setup: "Людям может нравиться новый процесс, но они всё равно его обходят, если не хватает способности, возможности или сигналов статуса.",
      flow: ["Новый процесс", "Неясная норма", "Редкое использование", "Нет отдачи", "Возврат к старому пути"],
      moves: [
        "Определи, в чём барьер: навык, среда, мотивация или риск потерять принадлежность.",
        "Сделай желаемую норму видимой через уважаемых ранних последователей.",
        "Задай один полезный стандарт результата и публично награждай вклад.",
      ],
    },
    comparison: {
      title: "Выгорание от сравнения",
      setup: "Публичные метрики могут превратить прогресс в сигнал угрозы вместо полезной обратной связи.",
      flow: ["Видимые сверстники", "Сравнение с теми, кто выше", "Падение самоэффективности", "Уход", "Меньше прогресса"],
      moves: [
        "Смени референтную группу: вместо элиты — достижимые сверстники рядом.",
        "Сделай метрикой по умолчанию прогресс относительно себя.",
        "Добавь сигналы принадлежности, не привязанные к рангу.",
      ],
    },
    "restless-longing": {
      title: "Беспокойная дофаминовая петля",
      setup: "Попытка утолить бесконечную потребность в смысле конечными цифровыми метриками — отсюда постоянная гонка.",
      flow: ["Экзистенциальная пустота", "Подсказка новизны", "Компульсивная погоня", "Адаптация", "Глубокое беспокойство"],
      moves: [
        "Пойми: конечные награды запускают гедоническую адаптацию; направь желания к трансцендентным ценностям.",
        "Убери мгновенные цифровые подсказки, чтобы дофаминовый фон восстановился.",
        "Взращивай внутренний смысл через призвание и покой без пользы (суббота).",
      ],
    },
    "rumination-spiral": {
      title: "Спираль руминации",
      setup: "Тревожные витки, когда самоанализ превращается в петлю угрозы, замкнутую на себе.",
      flow: ["Внешний триггер", "Гиперактивность DMN", "Тревожный внутренний монолог", "Возбуждение миндалины", "Растущая угроза"],
      moves: [
        "Успокой сеть пассивного режима с помощью тихого якоря внимания в настоящем моменте (обет или слово).",
        "Перенастрой опорные цели на благодать, а не на абсолютный контроль.",
        "Практикуй молитвенный разбор дня (examen), центрированный на благодарности, чтобы подкорковые контуры сместились к миру.",
      ],
    },
  };

  const RU_INTEGRATION = {
    "habit-loop": {
      telos: "Телесная литургия",
      substrate: "Дорсальный стриатум (переход от DMS к DLS) и «скобки» задач",
      theology: "Джеймс К. А. Смит (Desiring the Kingdom): нас формирует не то, что мы думаем, а то, что мы постоянно делаем. Литургии — светские или священные рутины, которые захватывают предельное желание нашего сердца на автоматическом, телесном уровне.",
      practice: "Литургическое перекрепление: положи физическое напоминание о молитве (Библию, икону, крест) прямо поверх своего физического сигнала (ноутбука или подушки), чтобы прервать привычную петлю.",
    },
    "cbt-loop": {
      telos: "Апофатическая тишина",
      substrate: "Сеть пассивного режима (медиальная префронтальная кора, задняя поясная кора) и сеть выполнения задач (дорсолатеральная префронтальная кора)",
      theology: "«Облако неведения»: духовный путь отпускания мысленных образов, мыслей и когнитивных конструкций (апофасис), чтобы покоиться в Божьем присутствии за пределами мысли.",
      practice: "Центрирующая молитва: молча повторяй одно священное слово (например, «Мир»), чтобы перенести внимание с нарративного «я» (DMN) на восприимчивость к настоящему (TPN).",
    },
    "control-theory": {
      telos: "Игнатианское различение",
      substrate: "Компаратор в дорсолатеральной префронтальной коре и самореферентность медиальной префронтальной коры",
      theology: "Игнатианский examen: структурированный метод ежедневного молитвенного обзора. Он позволяет следить за мыслями, эмоциями и телесными реакциями в свете ценностей Евангелия.",
      practice: "Ежедневный examen: пошаговый разбор дня. 1. Благодарность. 2. Прошение. 3. Обзор поступков. 4. Примирение. 5. Взгляд вперёд с решимостью.",
    },
    "self-determination": {
      telos: "Беспокойное сердце",
      substrate: "Мезолимбическая дофаминовая система поиска (SEEKING): вентральная покрышка → прилежащее ядро",
      theology: "Августинова тоска: сердце человека устроено с бесконечным желанием, которое не утолить конечными вещами. Земные удовольствия дают временные дофаминовые награды, но оставляют сердце беспокойным.",
      practice: "Перенастройка священного желания: заметив тягу к статусу или контролю, остановись и помолись: «Господи, сердце моё неспокойно, пока не упокоится в Тебе» — так ты перенаправляешь систему поиска.",
    },
    "expectancy-value": {
      telos: "Утешение и запустение",
      substrate: "Дофаминовое ожидание награды и серотониновая модуляция настроения",
      theology: "Различение духов по святому Игнатию: отслеживание состояний духовного утешения (рост надежды, любви и энергии) и запустения (вялость, тревога и сползание к низкому, земному).",
      practice: "Обзор различения: проверь свои обязательства. Что движет действиями — запустение (тревожная гонка, слабая надежда на смысл) или утешение (мирное согласие с ценностями)?",
    },
    fogg: {
      telos: "Субботний покой",
      substrate: "Регуляция кортизола осью HPA и подкорковые пути ИГРЫ",
      theology: "Хешель, «Суббота»: святилище во времени. Требуя прекратить производство, суббота становится физическим барьером, который отсекает рабочие подсказки.",
      practice: "Субботний покой: выбери окно в 24 часа, когда компьютеры, почта и таск-менеджеры физически убраны, — так тело выходит из рабочих петель угрозы.",
    },
    "emotion-regulation": {
      telos: "Общая со-регуляция",
      substrate: "Активация блуждающего нерва, окситоцин и эндогенные эндорфины",
      theology: "Литургический пир и евхаристическое богослужение: общие собрания, где вместо изоляции и угрозы — совместное пение, священная трапеза и красота, которые рождают доверие и безопасность в присутствии Бога.",
      practice: "Евхаристический покой: назначь еженедельный непродуктивный ужин или общую литургию, посвящённую только благодарности, отношениям и безопасности, — это успокаивает телесные системы выживания.",
    },
  };

  if (Object.keys(RU_MODELS).length !== models.length) fail("model count");
  Object.keys(RU_MODELS).forEach((id) => {
    const model = modelById.get(id);
    const r = RU_MODELS[id];
    if (!model) return fail("unknown model " + id);
    ["components", "levers", "tags", "contexts"].forEach((key) => {
      if (sameLen(model[key], r[key], id + "." + key)) model[key] = r[key];
    });
    ["title", "summary", "caution", "bestFor", "evidence", "timescale"].forEach((key) => {
      if (typeof r[key] === "string" && r[key]) model[key] = r[key];
      else fail(id + "." + key);
    });
    ["situation", "loop", "firstMove"].forEach((key) => {
      if (typeof r.practical[key] === "string") model.practical[key] = r.practical[key];
      else fail(id + ".practical." + key);
    });
    groups.forEach((group) => {
      if (sameLen(model.matrix[group], r.matrix[group], id + ".matrix." + group)) model.matrix[group] = r.matrix[group];
    });
  });

  if (Object.keys(RU_NODE_LABELS).length === Object.keys(nodeLabels).length) Object.assign(nodeLabels, RU_NODE_LABELS);
  else fail("nodeLabels");

  if (Object.keys(RU_SCENARIOS).length !== scenarios.length) fail("scenario count");
  scenarios.forEach((scenario) => {
    const r = RU_SCENARIOS[scenario.id];
    if (!r) return fail("scenario " + scenario.id);
    scenario.title = r.title;
    scenario.setup = r.setup;
    if (sameLen(scenario.flow, r.flow, scenario.id + ".flow")) scenario.flow = r.flow;
    if (sameLen(scenario.moves, r.moves, scenario.id + ".moves")) scenario.moves = r.moves;
  });

  Object.keys(integrationData).forEach((id) => {
    const r = RU_INTEGRATION[id];
    if (!r) return fail("integration " + id);
    ["telos", "substrate", "theology", "practice"].forEach((key) => {
      if (typeof r[key] === "string") integrationData[id][key] = r[key];
      else fail(id + ".integration." + key);
    });
  });
}
if (IS_RU) applyRussian();

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

  if (IS_RU) {
    if (desc) desc.innerHTML = TXT(desc.innerHTML.trim());
    ['val-state', 'val-brain', 'val-focus', 'val-drive', 'val-outcome', 'val-myelin'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = TXT(el.textContent.trim());
    });
  }

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
      
      desc.innerHTML = TXT("<strong>Narrative Rumination Loop Active:</strong> Energy moves continuously between the Medial Prefrontal Cortex (mPFC) and the Posterior Cingulate Cortex (PCC). The brain compiles histories, anticipates threats, and maintains self-defensive stories, generating cortisol.");
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
      
      desc.innerHTML = TXT("<strong>Task-Positive Network Re-coupled:</strong> Return to the sacred word recruits the dlPFC to decouple from PCC-mPFC rumination. Insula activation brings somatic awareness, quieting the Default Mode Network and allowing receptive rest in God.");
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
        valState.textContent = TXT("Hyperactive Threat Loop");
        valState.style.color = 'var(--coral)';
        valBrain.textContent = TXT("High Amygdala & Cortisol levels");
        valFocus.textContent = TXT("Control & Accumulation");
        valDrive.textContent = TXT("Dopamine seeking / hedonic chasing");
        valOutcome.textContent = TXT("Chronic Stiffening");
        valMyelin.textContent = TXT("Reinforcing fear-based superhighways");
        cardBox.style.borderColor = 'var(--ink)';
        cardBox.style.background = 'var(--paper)';
      } else if (val < 70) {
        valState.textContent = TXT("Transition State (Ceasing)");
        valState.style.color = 'var(--ink)';
        valBrain.textContent = TXT("Amygdala activity beginning to decay");
        valFocus.textContent = TXT("De-escalation / Unplugging");
        valDrive.textContent = TXT("Dopamine seeking declines");
        valOutcome.textContent = TXT("Perceived Safety Rising");
        valMyelin.textContent = TXT("Synapses transitioning to rest states");
        cardBox.style.borderColor = 'var(--ink)';
        cardBox.style.background = 'var(--paper)';
      } else {
        valState.textContent = TXT("Sabbath Safety Circuit Active");
        valState.style.color = 'var(--mint)';
        valBrain.textContent = TXT("Subcortical PLAY circuits active; low cortisol");
        valFocus.textContent = TXT("Relational Joy & Play (Eutrapelia)");
        valDrive.textContent = TXT("Endorphins & Oxytocin release");
        valOutcome.textContent = TXT("Neuroplastic Growth (BDNF)");
        valMyelin.textContent = TXT("Myelinating pathways of peace and attachment");
        cardBox.style.borderColor = 'var(--mint)';
        cardBox.style.background = 'color-mix(in srgb, var(--paper-2) 93%, rgba(24, 184, 135, 0.08))';
      }
    });
  }
})();
