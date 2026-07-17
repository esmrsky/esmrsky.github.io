/* Mechanics content — extracted from Combo Stern: 5 existential axes, 5 modern app traps, 8 archetypes. */
window.AXES_DATA = {
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

window.APP_TRAPS_DATA = {
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

window.ARCHETYPES_DATA = {
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
