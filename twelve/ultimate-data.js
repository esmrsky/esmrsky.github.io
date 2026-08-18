(function () {
  const axes = [
    {
      id: 1,
      name: "Love ⇄ Rejection",
      core: "Love",
      inverse: "Rejection",
      tribes: ["asher"],
      principle: "The calling creates belonging from received love. The pressure insists that belonging must be continually earned.",
      icon: "host",
      today: "A caregiver, pastor, parent, or culture-builder reads one person’s disappointment as proof the whole room is unsafe.",
      practice: "Can love remain present without volunteering to control the other person’s response?",
      references: ["Mark 1:11", "1 John 4:18", "Galatians 1:10"]
    },
    {
      id: 2,
      name: "Peace ⇄ Anxiety",
      core: "Peace",
      inverse: "Anxiety",
      tribes: ["gad", "reuben"],
      principle: "The calling holds steady under weight. The pressure treats personal control or immediate relief as the last line of defense.",
      icon: "shield",
      today: "One person grips every responsibility; another escapes the strain through impulse. Both nervous systems are trying to manufacture peace.",
      practice: "What would steady trust do here—put something down, or stay through the ordinary middle?",
      references: ["Isaiah 26:3", "Philippians 4:6–7", "Hebrews 4:9–11"]
    },
    {
      id: 3,
      name: "Joy ⇄ Heaviness",
      core: "Joy",
      inverse: "Heaviness",
      tribes: ["naphtali"],
      principle: "The calling translates suffering into liberation. The pressure makes escape—or the wound itself—feel safer than durable healing.",
      icon: "deer",
      today: "A gifted storyteller can turn pain into freedom for others while privately avoiding the structure that would make their own healing durable.",
      practice: "Is this movement genuine freedom, or a graceful-looking exit from necessary formation?",
      references: ["Nehemiah 8:10", "Psalm 42:5", "Isaiah 61:3", "John 15:11"]
    },
    {
      id: 4,
      name: "Dominion ⇄ Intimidation",
      core: "Dominion",
      inverse: "Intimidation",
      tribes: ["judah", "joseph", "benjamin", "simeon"],
      principle: "The calling carries authority for the protection of others. The pressure turns authority into self-protection, fear, or force.",
      icon: "lion",
      today: "Leaders, executives, protectors, and reformers all move a room; the pressure question is whether power covers people or defends the self.",
      practice: "Does this use of strength increase another person’s agency, safety, and capacity to tell the truth?",
      references: ["Psalm 72:12–14", "Luke 22:25–27", "1 Peter 5:2–3", "2 Timothy 1:7"]
    },
    {
      id: 5,
      name: "Generosity ⇄ Scarcity",
      core: "Generosity",
      inverse: "Scarcity",
      tribes: ["zebulun"],
      principle: "The calling multiplies entrusted resources with open hands. The pressure prices relationships and treats increase as personal security.",
      icon: "bull",
      today: "An entrepreneur sees opportunity everywhere; scarcity begins when every friendship, hour, or idea is evaluated only by measurable return.",
      practice: "What resource can be stewarded generously before it proves its value back to you?",
      references: ["Proverbs 11:24–25", "Matthew 6:24", "2 Corinthians 9:6–11", "Philippians 4:19"]
    },
    {
      id: 6,
      name: "Truth & Intelligence ⇄ Deception & Religion",
      core: "Truth & Intelligence",
      inverse: "Deception & Religion",
      tribes: ["levi", "issachar", "dan"],
      principle: "The calling sees, tests, teaches, and restores. The pressure hides behind certainty, delay, or an accurate verdict delivered without love.",
      icon: "scroll",
      today: "A teacher guards doctrine, a strategist keeps researching, and an auditor names the flaw. Each gift bends when truth stops serving embodied obedience and repair.",
      practice: "What faithful action, compassionate delivery, or honest uncertainty must accompany the accurate insight?",
      references: ["John 8:31–32", "Ephesians 4:15", "James 3:13–18", "2 Timothy 4:3–4"]
    }
  ];

  const mappings = {
    asher: {
      axisId: 1, axisConfidence: "strong",
      fivefold: [{ name: "Shepherd (Pastor)", confidence: "partial" }],
      secular: { label: "The Host", pearson: "Caregiver", confidence: "inference" },
      gift: { name: "Servant", confidence: "interpretive" },
      blueprint: { figure: "Martha of Bethany", references: ["Luke 10:38–42", "Luke 10:41–42"], evidence: "wiring-match" },
      friction: { tribe: "simeon", note: "The Host’s peacekeeping can experience the Blade’s directness as unsafe; the Blade can experience the Host’s diplomacy as compromise." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:20"], ["Tribal blessing", "Deuteronomy 33:24–25"],
        ["Explicit lineage", "Luke 2:36–38"], ["Pressure mirror", "Luke 10:38–42"], ["Identity practice", "1 John 4:18"]
      ]
    },
    gad: {
      axisId: 2, axisConfidence: "strong",
      fivefold: [],
      secular: { label: "The Operator", pearson: "Hero / Warrior", confidence: "inference" },
      gift: { name: "Ruler", confidence: "interpretive" },
      blueprint: { figure: "Elijah", references: ["1 Kings 18:22–40", "1 Kings 19:5–18"], evidence: "territorial resonance" },
      friction: { tribe: "issachar", note: "The Raider can read careful analysis as cowardice; the Sage can read urgent action as reckless and under-considered." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:19"], ["Tribal blessing", "Deuteronomy 33:20–21"],
        ["Explicit tribal company", "1 Chronicles 12:8–15"], ["Burnout mirror", "1 Kings 19:4–18"], ["Shared burden", "Exodus 18:17–23"]
      ]
    },
    reuben: {
      axisId: 2, axisConfidence: "partial",
      fivefold: [{ name: "Prophet", confidence: "partial" }],
      secular: { label: "The Pioneer", pearson: "Explorer", confidence: "inference" },
      gift: { name: "Exhorter", confidence: "interpretive" },
      blueprint: { figure: "Reuben", references: ["Genesis 49:3–4", "Deuteronomy 33:6"], evidence: "genealogical" },
      friction: { tribe: "joseph", note: "The Pioneer resists the Executive’s structure; the Executive distrusts the Pioneer’s volatility and unfinished starts." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:3–4"], ["Tribal blessing", "Deuteronomy 33:6"],
        ["Protective impulse", "Genesis 37:21–30"], ["Appetite mirror", "Genesis 25:29–34"], ["Embodied discipline", "1 Corinthians 9:24–27"]
      ]
    },
    naphtali: {
      axisId: 3, axisConfidence: "strong",
      fivefold: [{ name: "Evangelist", confidence: "partial" }],
      secular: { label: "The Artist", pearson: "Creator", confidence: "inference" },
      gift: { name: "Exhorter", confidence: "interpretive" },
      blueprint: { figure: "The restored man of Gadara", references: ["Mark 5:1–5", "Mark 5:15–20"], evidence: "wiring-match" },
      friction: { tribe: "zebulun", note: "The Deer can experience metrics and structure as a cage; the Merchant can experience freedom without structure as waste." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:21"], ["Tribal blessing", "Deuteronomy 33:23"],
        ["Tribal association", "Judges 4:6–16"], ["Escape mirror", "Jonah 1–4"], ["Liberated witness", "Mark 5:15–20"]
      ]
    },
    judah: {
      axisId: 4, axisConfidence: "strong",
      fivefold: [{ name: "Apostle", confidence: "partial" }],
      secular: { label: "The Leader", pearson: "Ruler", confidence: "inference" },
      gift: { name: "Ruler", confidence: "interpretive" },
      blueprint: { figure: "David", references: ["2 Samuel 11:1–5", "2 Samuel 12:1–13"], evidence: "genealogical" },
      friction: { tribe: "dan", note: "The Leader can experience the Auditor’s critique as disloyalty; the Auditor can experience vision without scrutiny as dangerous." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:8–12"], ["Tribal blessing", "Deuteronomy 33:7"],
        ["Explicit lineage", "1 Samuel 17:12"], ["Correction and repentance", "2 Samuel 12:1–13"], ["Servant authority", "Luke 22:25–27"]
      ]
    },
    joseph: {
      axisId: 4, axisConfidence: "strong",
      fivefold: [],
      secular: { label: "The Executive", pearson: "Ruler — steward variant", confidence: "inference" },
      gift: { name: "Ruler", confidence: "interpretive" },
      blueprint: { figure: "Joseph", references: ["Genesis 42:7", "Genesis 45:1–8"], evidence: "genealogical" },
      friction: { tribe: "benjamin", note: "The Executive’s controlled order can feel cold to the Vanguard; the Vanguard’s intensity can feel destabilizing to the Executive." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:22–26"], ["Tribal blessing", "Deuteronomy 33:13–17"],
        ["Administrative arc", "Genesis 41:37–57"], ["Vulnerable reveal", "Genesis 45:1–8"], ["Forgiveness", "Genesis 50:20–21"]
      ]
    },
    benjamin: {
      axisId: 4, axisConfidence: "strong",
      fivefold: [{ name: "Apostle", confidence: "partial" }],
      secular: { label: "The Vanguard", pearson: "Outlaw → Hero", confidence: "inference" },
      gift: { name: "Mercy", confidence: "interpretive" },
      blueprint: { figure: "Saul of Tarsus", references: ["Acts 9:1–2", "Acts 9:3–19"], evidence: "genealogical" },
      friction: { tribe: "asher", note: "The Vanguard can mistake sensitivity for weakness; the Host can experience the Vanguard’s intensity as relational threat." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:27"], ["Tribal blessing", "Deuteronomy 33:12"],
        ["Explicit lineage", "Romans 11:1"], ["Recommissioning", "Acts 9:1–22"], ["Covenant loyalty", "1 Samuel 18:1–4"]
      ]
    },
    simeon: {
      axisId: 4, axisConfidence: "strong",
      fivefold: [],
      secular: { label: "The Reformer", pearson: "Hero / Crusader", confidence: "inference" },
      gift: { name: "Mercy", confidence: "interpretive" },
      blueprint: { figure: "Simon Peter", references: ["John 18:10", "John 21:15–19"], evidence: "namesake resonance" },
      friction: { tribe: "levi", note: "The Reformer demands immediate action while the Priest slows down for process, mediation, and proportion." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:5–7"], ["Foundational warning", "Genesis 34:25–31"],
        ["Zeal rebuked", "Luke 9:51–56"], ["Sword redirected", "John 18:10–11"], ["Anger and righteousness", "James 1:19–20"]
      ]
    },
    zebulun: {
      axisId: 5, axisConfidence: "strong",
      fivefold: [],
      secular: { label: "The Entrepreneur", pearson: "Magician / Creator", confidence: "inference" },
      gift: { name: "Giver", confidence: "interpretive" },
      blueprint: { figure: "Zacchaeus", references: ["Luke 19:1–7", "Luke 19:8–10"], evidence: "silent on lineage" },
      friction: { tribe: "naphtali", note: "The Entrepreneur needs durable measures; the Artist needs enough freedom for discovery. Each can misread the other’s protection as contempt." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:13"], ["Tribal blessing", "Deuteronomy 33:18–19"],
        ["Explicit tribal company", "1 Chronicles 12:33"], ["Restitution and generosity", "Luke 19:1–10"], ["Open-handed increase", "2 Corinthians 9:6–11"]
      ]
    },
    levi: {
      axisId: 6, axisConfidence: "strong",
      fivefold: [{ name: "Teacher", confidence: "partial" }, { name: "Shepherd (Pastor)", confidence: "partial" }],
      secular: { label: "The Mentor", pearson: "Sage / Caregiver", confidence: "inference" },
      gift: { name: "Teacher", confidence: "interpretive" },
      blueprint: { figure: "Zechariah the priest", references: ["Luke 1:5–20", "Luke 1:57–79"], evidence: "genealogical" },
      friction: { tribe: "gad", note: "The Priest protects process and boundaries; the Raider will break convention to move the mission through immediate danger." },
      scriptures: [
        ["Tribal warning", "Genesis 49:5–7"], ["Tribal blessing", "Deuteronomy 33:8–11"],
        ["Explicit lineage", "Exodus 4:14"], ["Study, practice, teach", "Ezra 7:1–10"], ["Weightier matters", "Matthew 23:23–28"]
      ]
    },
    issachar: {
      axisId: 6, axisConfidence: "strong",
      fivefold: [{ name: "Teacher", confidence: "partial" }],
      secular: { label: "The Strategist", pearson: "Sage", confidence: "inference" },
      gift: { name: "Prophet", confidence: "interpretive" },
      blueprint: { figure: "Nicodemus", references: ["John 3:1–2", "John 7:50–51", "John 19:39"], evidence: "wiring-match" },
      friction: { tribe: "reuben", note: "The Strategist fears the Pioneer’s impulse; the Pioneer experiences the Strategist’s need for certainty as indefinite delay." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:14–15"], ["Tribal blessing", "Deuteronomy 33:18–19"],
        ["Explicit tribal company", "1 Chronicles 12:32"], ["Inquiry into embodied risk", "John 3:1–2; 19:39"], ["Wisdom that acts", "James 1:5–6"]
      ]
    },
    dan: {
      axisId: 6, axisConfidence: "strong",
      fivefold: [{ name: "Prophet", confidence: "partial" }],
      secular: { label: "The Auditor", pearson: "Sage — critic variant", confidence: "inference" },
      gift: { name: "Prophet", confidence: "interpretive" },
      blueprint: { figure: "Thomas", references: ["John 20:24–25", "John 20:26–29"], evidence: "wiring-match" },
      friction: { tribe: "judah", note: "The Auditor protects against blind spots; the Leader protects enough momentum for a vision to become real. Without honor, both gifts become threats." },
      scriptures: [
        ["Tribal anchor", "Genesis 49:16–18"], ["Tribal blessing", "Deuteronomy 33:22"],
        ["Judge under pressure", "Judges 13–16"], ["Corporate warning", "Judges 18"], ["Restorative truth", "2 Samuel 12:1–13"]
      ]
    }
  };

  const resonance = [
    { tribe: "Benjamin", axis: 1 },
    { tribe: "Naphtali", axis: 1 },
    { tribe: "Levi", axis: 1 },
    { tribe: "Asher", axis: 2 },
    { tribe: "Issachar", axis: 2 },
    { tribe: "Joseph", axis: 3 },
    { tribe: "Dan", axis: 4 },
    { tribe: "Reuben", axis: 5 },
    { tribe: "Judah", axis: 5 }
  ];

  window.TWELVE_ULTIMATE = { axes, mappings, resonance };

  const tribes = window.TWELVE_DATA || [];
  tribes.forEach(tribe => {
    const mapping = mappings[tribe.id];
    const axis = axes.find(item => item.id === mapping.axisId);
    Object.assign(tribe, mapping, { axis: axis.name, axisData: axis });
  });
})();
