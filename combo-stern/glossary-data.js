// ============================================================
// GLOSSARY DATABASE (English-only, flattened with verses and topics)
// ============================================================
const GLOSSARY_DATA = [
  {
    "id": "broken_cistern",
    "term": "Broken Cistern",
    "synonyms": ["Leaky pit", "Self-reliance", "Stagnant well", "Man-made source"],
    "definition": "A man-made rainwater cavity hewed out of porous limestone that has cracked, rendering it unable to hold water. Metaphorically, it represents seeking ultimate security, worth, and validation from finite, unstable human structures rather than the self-existent Source.",
    "theology": "Originates in Jeremiah 2:13, where God accuses Israel of committing two evils: forsaking Him, the fountain of living waters, and carving out broken cisterns (*borot nišbārîm*) that leak dry.",
    "psychology": "A self-defeating coping mechanism where a legitimate need is routed to a proxy behavior. Since the proxy cannot satisfy the core deficit, the emotional tank leaks, driving compulsive repetition.",
    "verses": ["Jeremiah 2:13", "Isaiah 55:2", "Ecclesiastes 2:11"],
    "topics": ["Self-Reliance", "Compulsion", "Idol Dynamics"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "living_water",
    "term": "Living Water",
    "synonyms": ["Artesian spring", "Unearned grace", "Infinite source", "Abundant stream"],
    "definition": "Self-sustaining, actively flowing aerated water from a natural artesian spring. In Hebrew idioms, it stands in direct contrast to stagnant cistern water, representing a source of life that requires no human labor to construct.",
    "theology": "Jeremiah's *meqôr mayim ḥayyîm* (spring of living waters) and Jesus' promise in John 4:14 of an internal *pēgē* (spring) welling up to eternal life, completely independent of human works.",
    "psychology": "An integrated emotional state where self-worth is received as a secure, unconditional gift. This eliminates the frantic compulsion to draw validation from external performance metrics.",
    "verses": ["John 4:14", "Jeremiah 2:13", "Revelation 22:1"],
    "topics": ["Grace", "Identity", "Spiritual Satisfaction"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "works",
    "term": "Works",
    "synonyms": ["Performance treadmill", "Self-justification", "Striving engine", "Law-based living"],
    "definition": "The structural system wherein human effort is deployed to generate worth, earn standing, and secure status. Worth is treated as the volatile prize at the end of the behavior rather than the starting point.",
    "theology": "Paul's concept of 'works of the law' (*erga nomou*), an external code that demands performance but supplies no internal power, provoking fleshly rebellion (Romans 7) and transactional religion.",
    "psychology": "Striving behavior fueled by an underlying worth-deficit. When performance metrics are tied to basic safety, willpower is constantly depleted to maintain status.",
    "verses": ["Romans 4:5", "Galatians 2:16", "Ephesians 2:8-9"],
    "topics": ["Legalism", "Burnout", "Transactional Worth"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "grace",
    "term": "Grace",
    "synonyms": ["Received standing", "Unconditional acceptance", "Secure adoption", "Free gift"],
    "definition": "A state of secure status and unconditional value given as a free gift. Worth is established prior to any performance, turning good behaviors from a transaction to earn status into an overflow of gratitude.",
    "theology": "The Greek *charis*—unmerited favor. In Pauline theology, it shifts the sequence: 'no condemnation' (Romans 8:1) and secure adoption (*huiothesia*) precede and empower moral behavior.",
    "psychology": "The psychological release point where the self is completely decoupled from performance ranking, allowing nervous system recovery, cognitive clarity, and organic satisfaction.",
    "verses": ["Romans 8:1", "Romans 3:24", "Ephesians 1:5"],
    "topics": ["Imputed Worth", "Security", "Adoption"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "shame",
    "term": "Shame",
    "synonyms": ["Self-condemnation", "Identity deficit", "Wretchedness", "Hide-and-seek response"],
    "definition": "The painful emotional state arising from the belief that one is fundamentally defective, rejected, or unworthy of love. In the compulsion loop, shame acts as the volatile fuel that accelerates the next relapse.",
    "theology": "The immediate post-Fall response in Eden (Genesis 3)—hiding, covering with leaves, and fear. Also Paul's *katakrima* (penal servitude/condemnation) which binds the soul to self-hatred.",
    "psychology": "A high-stress feedback loop. When willpower fails to sustain the counterfeit cistern, the ego attacks itself. The resulting emotional distress triggers a craving for immediate numbing/escape, resetting the loop.",
    "verses": ["Genesis 3:7", "Romans 8:1", "Hebrews 12:2"],
    "topics": ["Condemnation", "Identity Deficit", "Isolation"],
    "tags": ["Psychological", "Theological", "Scripture"]
  },
  {
    "id": "willpower",
    "term": "Willpower",
    "synonyms": ["Ego depletion", "White-knuckling", "Moral resolve", "Self-effort"],
    "definition": "The conscious, effortful capacity to regulate behavior, resist impulses, and force compliance. When treated as the ultimate source of moral victory, it behaves like a leaky cistern that inevitably runs dry under stress.",
    "theology": "The condition of *talaipōros* (Romans 7:24)—worn down by calloused labor. Striving to please the external standard of the Law using only the resources of the flesh (*sarx*).",
    "psychology": "An energy-depleting executive control system. Relying solely on willpower to suppress cravings is a closed-system struggle of 'the self out-muscling the self,' which fails under fatigue or elevated stress.",
    "verses": ["Romans 7:18", "Galatians 3:3", "Zechariah 4:6"],
    "topics": ["Ego Depletion", "Fleshly Striving", "Willpower Tax"],
    "tags": ["Psychological", "Theological"]
  },
  {
    "id": "counterfeit",
    "term": "Counterfeit",
    "synonyms": ["Proxy metric", "False filler", "Surrogate reward", "Idol"],
    "definition": "A cheap, easily accessible substitute that mimics the properties of a true source. It temporarily quiets the alarm of an underlying need but leaves the core deficit untouched or exacerbated.",
    "theology": "The essence of idolatry: exchanging the glory of the incorruptible God for images (Romans 1:23) or trading the *Meqôr* (spring) for a *Bōr* (cistern) that collects silt and cracks.",
    "psychology": "Dopamine-driven cues (e.g., app streaks, metrics, binge-eating) that trigger immediate, short-term reward signals. Because they do not satisfy the actual need (rest, connection), they promote addictive craving.",
    "verses": ["Romans 1:23", "Jeremiah 2:13", "Jonah 2:8"],
    "topics": ["Idolatry", "Dopamine Traps", "Proxy Metrics"],
    "tags": ["Psychological", "Theological"]
  },
  {
    "id": "law",
    "term": "The Law",
    "synonyms": ["External standard", "Commandment system", "Performance code", "Works regulator"],
    "definition": "An external code of demands and standards. While good and holy in revealing the divine standard, it possesses no internal power to transform the human heart, leaving the individual trapped in striving.",
    "theology": "Paul's concept of the Law (*Nomos*) which exposes sin and shuts every mouth, acting as a guardian (*paidagōgos*) but unable to justify or produce life.",
    "psychology": "A rigid cognitive schema of 'shoulds' and 'musts'. Evaluating one's self-worth based on constant compliance with strict, unyielding rules generates chronic performance anxiety.",
    "verses": ["Romans 7:12", "Galatians 3:24", "Romans 8:3"],
    "topics": ["Legalism", "Commandments", "Cognitive Rigidity"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "imputed_righteousness",
    "term": "Imputed Righteousness",
    "synonyms": ["Received standing", "Declared worth", "Justification by grace", "Credited value"],
    "definition": "A legal and relational status of complete approval and righteousness credited to a person as a free gift, entirely independent of their personal works or behavioral metrics.",
    "theology": "From the Greek *logizomai* (to reckon, credit). In Pauline theology, God credits righteousness to the one who does not work but trusts Him who justifies the ungodly.",
    "psychology": "The baseline relief of 'unconditional positive regard' and absolute worth. Knowing one's value is non-negotiable dissolves performance threat responses.",
    "verses": ["Romans 4:5", "2 Corinthians 5:21", "Philippians 3:9"],
    "topics": ["Justification", "Received Status", "Anxiety Defusal"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "idolatry",
    "term": "Idolatry",
    "synonyms": ["Proxy worship", "Functional god", "Cistern carving", "Substituted source"],
    "definition": "Treating a created, finite resource or metric as the ultimate source of security, significance, or satisfaction. It is the active sourcing of identity from something other than the Creator.",
    "theology": "From Hebrew *elilim* (worthless things). Exchanging the covenant relationship with the living God for localized, manageable, and transactional deities.",
    "psychology": "Outsourcing the regulation of self-esteem or safety to external variables (wealth, career stats, social praise) which must then be constantly protected and served.",
    "verses": ["Colossians 3:5", "Exodus 20:3", "Ezekiel 14:3"],
    "topics": ["Idol Dynamics", "Identity Outsourcing", "Cistern Carving"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "sabbath",
    "term": "Sabbath Rest",
    "synonyms": ["Covenant rest", "Ceasing from striving", "Received rest", "Anti-works act"],
    "definition": "The intentional, structured cessation of work and productivity. It serves as a practical, bodily declaration that the universe and one's worth are sustained by the Creator, not by one's own labor.",
    "theology": "From Hebrew *Shabbat* (to cease). In scripture, it is both a creation design (Genesis 2) and a redemptive sign of freedom from Egyptian taskmasters and the treadmill of striving.",
    "psychology": "A structured boundary that forces nervous system downregulation. It breaks the compulsive link between productivity and self-preservation, fostering rest as trust.",
    "verses": ["Genesis 2:2", "Exodus 20:8", "Hebrews 4:9-10"],
    "topics": ["Rest", "Nervous System Recovery", "Trust"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "expulsive_affection",
    "term": "Expulsive Affection",
    "synonyms": ["New affection", "Higher desire", "Dissolving grace", "Displacing love"],
    "definition": "The theological and psychological principle that a deep-seated compulsive habit or desire cannot be overcome by mere suppression, but must be displaced by the superior beauty and value of a new love.",
    "theology": "A term coined by Thomas Chalmers in his sermon 'The Expulsive Power of a New Affection'. The heart's inclination toward the world is only broken by displaying a more glorious Object.",
    "psychology": "The principle of habit displacement. True recovery occurs when the brain finds a healthier, more rewarding resource (e.g. secure connection) that renders the old counterfeit dopamine loop dull by comparison.",
    "verses": ["Galatians 5:16", "Philippians 3:8", "1 John 2:15-17"],
    "topics": ["Habit Displacement", "Desire Transformation", "Thomas Chalmers"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "adoption",
    "term": "Adoption",
    "synonyms": ["Secure attachment", "Family standing", "Sonship", "Covenant belonging"],
    "definition": "The formal relocation of an individual from a state of slavery or estrangement into a permanent, legal status of family membership, securing all rights, inheritance, and unconditional belonging.",
    "theology": "Paul's *huiothesia* (adoption as sons). In Ephesians 1:5 and Romans 8:15, believers receive the Spirit of adoption, casting out the fear of rejection and allowing them to cry 'Abba, Father.'",
    "psychology": "The transition from an insecure, performance-based attachment style to a secure attachment baseline, where safety is relational and non-transactional.",
    "verses": ["Romans 8:15", "Galatians 4:4-6", "Ephesians 1:5"],
    "topics": ["Belonging", "Security", "Attachment Theory"],
    "tags": ["Theological", "Scripture", "Psychological"]
  },
  {
    "id": "axis_rejection_acceptance",
    "term": "Rejection vs. Acceptance",
    "synonyms": ["Social exclusion", "Codependency", "Belonging hunger", "Fawning"],
    "definition": "The existential axis dealing with the human need for relational connection. Striving in this axis leads to people-pleasing and fawning, while Grace provides security in unconditional adoption.",
    "theology": "Moves from the alienation of Genesis 3 (hiding and covering) to secure adoption (*huiothesia*) in Ephesians 1:5, establishing acceptance prior to social performance.",
    "psychology": "Examines the fear of exclusion, which triggers the same neurobiological pain centers as physical injury, contrasted with secure attachment theory.",
    "verses": ["Ephesians 1:5", "Psalm 27:10", "Romans 15:7"],
    "topics": ["Connection", "Rejection Fear", "Belonging"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "axis_scarcity_abundance",
    "term": "Scarcity vs. Abundance",
    "synonyms": ["Resource anxiety", "Hoarding", "Retail therapy", "Catastrophe planning"],
    "definition": "The existential axis focused on security and survival. The Works paradigm drives hoarding and resource panic, whereas Grace brings peace in the Father's daily provision.",
    "theology": "Contrast between Israel hoarding excess Manna in the wilderness (Exodus 16) and the lifestyle of trust outlined in Matthew 6 (birds of the air).",
    "psychology": "The 'scarcity mindset' which narrows cognitive bandwidth and forces short-term, defensive decisions, resolved by establishing safety baseline.",
    "verses": ["Matthew 6:26", "Exodus 16:19-20", "Philippians 4:19"],
    "topics": ["Security", "Provision", "Scarcity Mindset"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "axis_control_surrender",
    "term": "Control vs. Surrender",
    "synonyms": ["Micromanaging", "Planning obsession", "Information binging", "Perfectionism"],
    "definition": "The existential axis dealing with safety and predictability. The counterfeit is obsessive planning to avoid vulnerability, which is broken by surrendering limits to providence.",
    "theology": "Human pride claiming self-sovereignty (Genesis 11, Babel) vs. yielding to creaturely limits and resting in the sovereignty of God.",
    "psychology": "The drive to manage anxiety by controlling environment variables, causing cognitive overload, resolved through exposure to uncertainty.",
    "verses": ["Romans 8:28", "James 4:13-15", "Proverbs 3:5-6"],
    "topics": ["Sovereignty", "Limits", "Control Traps"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "axis_performance_standing",
    "term": "Performance vs. Standing",
    "synonyms": ["Workaholism", "Identity contingency", "Credential chasing", "LinkedIn comparison"],
    "definition": "The existential axis mapping justification and worth. Striving treats status as an earned prize; Grace establishes standing as an unconditional starting point.",
    "theology": "Paul's contrast between 'righteousness by works' (*erga nomou*) and imputed righteousness by grace (*charis*) in Romans 4.",
    "psychology": "Contingent self-worth which leads to burnout and performance anxiety, resolved by decoupling value from production metrics.",
    "verses": ["Romans 4:5", "Galatians 2:16", "Titus 3:5"],
    "topics": ["Justification", "Burnout", "Contingent Worth"],
    "tags": ["Theological", "Psychological"]
  },
  {
    "id": "axis_obscurity_renown",
    "term": "Obscurity vs. Renown",
    "synonyms": ["Vanity metrics", "Fame chasing", "Social gaze", "Public branding"],
    "definition": "The existential axis dealing with significance. Striving seeks validation from public renown, whereas Grace anchors identity in the quiet, loving gaze of the Source.",
    "theology": "Chasing the glory (*doxa*) of men rather than the glory that comes from God (John 5:44), resolved by living a life hidden with Christ (Colossians 3:3).",
    "psychology": "The dread of insignificance and mortality, compensated by seeking social mirrors (likes/followers), resolved by intimate, local relational depth.",
    "verses": ["Colossians 3:3", "John 5:44", "Matthew 6:4"],
    "topics": ["Significance", "The Gaze", "Hiddenness"],
    "tags": ["Theological", "Psychological"]
  }
];

// ============================================================
// EXISTENTIAL AXES MAPPING DATA
// ============================================================
const AXES_DATA = {
  rejection_acceptance: {
    title: "Rejection vs. Acceptance",
    hunger: "Belonging & Connection (👥)",
    cue: "A silent text thread, passive email, or critical look.",
    counterfeit: "Fawning, over-compliance, hyper-checking status tags.",
    leak: "Transactional acceptance (must perform to remain loved).",
    shame: "'I am defective; people only tolerate what I provide.'",
    exit: "Secure Adoption (Ephesians 1:5). Regular screenless solitude and vulnerable truth confession.",
    coords: { x: 30, y: 85 }
  },
  scarcity_abundance: {
    title: "Scarcity vs. Abundance",
    hunger: "Security & Provision (🕯️)",
    cue: "Sudden account repair bill, financial dip, or peer purchase.",
    counterfeit: "Banking app refreshing, panic hoarding, retail shopping.",
    leak: "Physical assets rust and decay; future ruin fear remains.",
    shame: "'I am exposed and unprotected; I will end up destitute.'",
    exit: "Provided Portion (Matthew 6:26). Active anonymous giving (generosity) to break scarcity threat loops.",
    coords: { x: 85, y: 20 }
  },
  control_surrender: {
    title: "Control vs. Surrender",
    hunger: "Safety & Predictability (🧭)",
    cue: "Relational ambiguity or sudden schedule adjustments.",
    counterfeit: "Hyper-planning roadmaps, micromanaging tasks, info binging.",
    leak: "Real-world variables drift from plans, causing collapse.",
    shame: "'If I let go of the wheel, everything breaks. I am incompetent.'",
    exit: "Sovereign Sanctuary (Romans 8:28). Limit ritual (writing and shredding uncontrollables) + strict Sabbath blocks.",
    coords: { x: 25, y: 35 }
  },
  performance_standing: {
    title: "Performance vs. Standing",
    hunger: "Worth & Justification (🛠️)",
    cue: "Slow workday, colleague promotion card, or small mistake.",
    counterfeit: "Workaholism, late emails, credential stacking.",
    leak: "Striving metrics reset daily ('What have you done today?').",
    shame: "'I am a lazy fraud. My value is contingent on output.'",
    exit: "Imputed Righteousness (Romans 4:5). Scheduled goal-free time during peak work hours.",
    coords: { x: 70, y: 75 }
  },
  obscurity_renown: {
    title: "Obscurity vs. Renown",
    hunger: "Significance & Gaze (🌌)",
    cue: "Low post engagement or feeling invisible in meetings.",
    counterfeit: "Digital curation, name-dropping, public self-branding.",
    leak: "Public attention is volatile; the spotlight shifts.",
    shame: "'I am small and unseen. My life leaves no trace.'",
    exit: "The Hidden Life (Colossians 3:3). Secret service (acts of help where credit is physically impossible).",
    coords: { x: 50, y: 50 }
  }
};

// ============================================================
// MODERN APP TRAPS DATABASE
// ============================================================
const APP_TRAPS_DATA = {
  rings: {
    title: "Fitness Trackers (Calorie Rings)",
    axis: "Performance & Scarcity",
    cue: "Wrist buzz or 'incomplete rings' visual display.",
    routine: "Jogging in circles late at night just to close rings.",
    reward: "A brief fireworks animation and streak preservation.",
    dependency: "Worth is outsourced to sensors. Rest is processed as guilt, driving chronic physical strain.",
    displacement: "Treat the body as a received asset. Move for joy and rest as a scheduled act of trust."
  },
  slack: {
    title: "Slack / Work Messages",
    axis: "Control & Acceptance",
    cue: "Red notification badge or desktop alert ping.",
    routine: "Instant replies, late-night checks, and typing indicators monitoring.",
    reward: "Temporary relief of anxiety and proof of responsiveness.",
    dependency: "Relational standing is made contingent on response speeds. Willpower is depleted to be 'seen.'",
    displacement: "Establish strict offline boundaries. Rest on received standing; let messages wait."
  },
  linkedin: {
    title: "LinkedIn Credentials",
    axis: "Performance & Obscurity",
    cue: "Seeing a colleague's certificate or promotion announcement.",
    routine: "Stacking minor online certifications and curating profile titles.",
    reward: "Likes, views, and comments indicating high professional value.",
    dependency: "Career significance is tied to peer rankings. The metric resets daily, generating impostor fear.",
    displacement: "Imputed worth. Do work secretly without posting. Celebrate colleagues' success."
  },
  streaks: {
    title: "Gamified Learning Streaks",
    axis: "Performance & Scarcity",
    cue: "App push alarm warning: 'Your streak will be lost!'",
    routine: "Completing a 1-minute basic exercise simply to save the number.",
    reward: "Number matches the next day; relief of saving the record.",
    dependency: "Loss aversion makes metrics an identity-contingency item. Willpower is consumed under threat.",
    displacement: "Intentionally break the streak. Re-source learning as a slow, unmeasured craft."
  },
  scroll: {
    title: "Infinite Feeds (Instagram/TikTok)",
    axis: "Rejection & Obscurity",
    cue: "Somatic fatigue, boredom, or feeling forgotten.",
    routine: "Opening the feed; scrolling for novel triggers.",
    reward: "Temporary dopamine buzz from seeing surprising items.",
    dependency: "Simulated connection. Stagnant reservoir leaves loneliness sharper, driving compulsive scrolling.",
    displacement: "Take connection hunger to local safe relationships, silence, or prayer. Delete the app."
  }
};

// ============================================================
// COMPULSION LOOP SIMULATOR PROFILES
// ============================================================
const SIM_LOOPS_DATA = {
  overworker: {
    title: "The Overworker Loop (Performance Axis)",
    initial: { W: 90, S: 30, SH: 5 },
    params: { leak: 1.1, shame: 1.6, grace: 1.3 },
    strivingMsg: "Checked emails at 11:30 PM. Staging metric proof. (-15 Willpower, +20 Stress, +5 Shame)",
    strivingDelta: { W: -15, S: 20, SH: 5 },
    exitMsg: "Sabbath boundary activated. Resting on imputed worth. Worth decoupled from output. (+30 Willpower, -25 Stress, -15 Shame)",
    exitDelta: { W: 30, S: -25, SH: -15 }
  },
  doomscroller: {
    title: "The Doomscroller Loop (Control Axis)",
    initial: { W: 80, S: 45, SH: 10 },
    params: { leak: 1.3, shame: 1.2, grace: 1.5 },
    strivingMsg: "Refreshed forums for 40 minutes seeking safety details. (-12 Willpower, +18 Stress, +12 Shame)",
    strivingDelta: { W: -12, S: 18, SH: 12 },
    exitMsg: "Limit Ritual activated. Shredded uncontrollable variables. Ambiguity accepted. (+25 Willpower, -30 Stress, -20 Shame)",
    exitDelta: { W: 25, S: -30, SH: -20 }
  },
  pleaser: {
    title: "The People-Pleaser Loop (Acceptance Axis)",
    initial: { W: 85, S: 25, SH: 15 },
    params: { leak: 0.9, shame: 1.8, grace: 1.4 },
    strivingMsg: "Fawned to resolve passive email tension. Sent transactional gift. (-18 Willpower, +15 Stress, +15 Shame)",
    strivingDelta: { W: -18, S: 15, SH: 15 },
    exitMsg: "Secure Adoption anchor loaded. Screenless solitude practiced. (+20 Willpower, -20 Stress, -25 Shame)",
    exitDelta: { W: 20, S: -20, SH: -25 }
  },
  therapist: {
    title: "The Retail Therapist Loop (Scarcity Axis)",
    initial: { W: 75, S: 40, SH: 20 },
    params: { leak: 1.4, shame: 1.4, grace: 1.2 },
    strivingMsg: "Refreshed cart checking price drops. Panic purchase made. (-14 Willpower, +10 Stress, +25 Shame)",
    strivingDelta: { W: -14, S: 10, SH: 25 },
    exitMsg: "Radical Outflow activated. Donated money anonymously. Scarcity broken. (+20 Willpower, -15 Stress, -30 Shame)",
    exitDelta: { W: 20, S: -15, SH: -30 }
  },
  compares: {
    title: "The Compare-and-Despair Loop (Obscurity Axis)",
    initial: { W: 80, S: 35, SH: 25 },
    params: { leak: 1.2, shame: 1.5, grace: 1.6 },
    strivingMsg: "Scrolled competitor highlight reels. Self-rating calculated. (-10 Willpower, +15 Stress, +20 Shame)",
    strivingDelta: { W: -10, S: 15, SH: 20 },
    exitMsg: "Secret Service activated. Performed creditless work behind the scenes. (+30 Willpower, -25 Stress, -35 Shame)",
    exitDelta: { W: 30, S: -25, SH: -35 }
  }
};

// ============================================================
// FREQUENCY & ANCESTRAL ARCHETYPES DATABASE
// ============================================================
const ARCHETYPES_DATA = {
  abraham: {
    name: "Abraham",
    calling: "Faith & Covenant Fatherhood (אֱמוּנָה - Emunah)",
    inverse: "Fear, self-protection, and deceptive manipulation.",
    failure: "Descended to Egypt under famine; passed Sarah off as his sister; fathered Ishmael in self-effort.",
    legacy: "Isaac repeats the sister-deception script in Gerar. Jacob uses identity theft to steal the blessing."
  },
  jacob: {
    name: "Jacob",
    calling: "Covenant Inheritance by election (Grace)",
    inverse: "Heel-grabbing (Aqab), striving, and identity theft.",
    failure: "Traded stew for Esau's birthright; wore Esau's clothes to steal the blessing; wrestled Padan-Aram in self-strength.",
    legacy: "Jacob is deceived by Laban (younger substituted for older), and later deceived by his own sons using goat's blood."
  },
  david: {
    name: "David",
    calling: "Intimate Worship (Tehillah) & Kingly Shelter",
    inverse: "Entitlement, voyeurism, and relational exploitation.",
    failure: "Abused kingly power to take Bathsheba; murdered Uriah; ordered a military census to rely on metrics.",
    legacy: "Amnon exploits Tamar; Absalom sleeps with David's concubines on the palace roof; Solomon builds a massive harem."
  },
  elijah: {
    name: "Elijah",
    calling: "Prophetic Fire & Covenant Restoration (Shuv)",
    inverse: "Suicidal collapse, extreme isolation, and self-pity.",
    failure: "Fled Jezebel's threat; collapsed under the broom tree requesting death; hid in the cave with a self-pitying script.",
    legacy: "Prophetic frequency is targeted with intense isolation, depression, and dark night of the soul."
  },
  moses: {
    name: "Moses",
    calling: "Mediatorship, Law-Giving, and Deliverance (Anavah - Humility)",
    inverse: "Self-willed anger, defensive execution, frustration with human deficits.",
    failure: "Struck the rock twice in anger to produce water instead of speaking to it; killed the Egyptian taskmaster in self-effort.",
    legacy: "Excluded from entering the Promised Land; Aaron constructs the golden calf under pressure; Israel falls into grumbling and law-breaking scripts."
  },
  saul: {
    name: "Saul",
    calling: "Kingly Authority, Headship, and Protection",
    inverse: "People-pleasing, insecurity under peer gaze, paranoid defensive preservation.",
    failure: "Offered the sacrifice prematurely because he feared the people scattering; spared King Agag and the best spoils to please his army.",
    legacy: "Loss of kingly lineage, descent into madness/seances, and the tragic death of Jonathan on Mount Gilboa."
  },
  peter: {
    name: "Peter",
    calling: "Apostolic Rock, Bold Witness, and Pioneer Declaration",
    inverse: "Fear of shame/exposure, impulsive over-promising, and self-preservation.",
    failure: "Denied Christ three times in the courtyard under a servant girl's gaze; drew a sword in Gethsemane in fleshly combat.",
    legacy: "Struggled with legalistic hypocrisy at Antioch (refusing to eat with Gentiles to please the circumcision party)."
  },
  martha: {
    name: "Martha",
    calling: "Practical Hospitality, Hostship, and Loving Care",
    inverse: "Domestic striving, resentment, comparison, anxiety over micro-details.",
    failure: "Tripped into self-pity and complained to Jesus about her sister Mary's failure to help with chores.",
    legacy: "Performance-based serving loops, relationship triangulation, and service driven by duty rather than devotion."
  }
};
