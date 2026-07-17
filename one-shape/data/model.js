/* ============================================================
   THE ONE MODEL — the synthesis backbone.
   A single canonical need-set. Every counterfeit, feeling and
   axis from the four sources is tagged to a need here, so the
   lenses become views over one model and a need can be seen
   across all of them at once.
   ============================================================ */

window.NEEDS = [
  { id: "belonging", name: "Belonging", q: "Am I wanted?",
    ache: "Scanning for approval; the ache of not being chosen.",
    promise: "Perform well enough and you'll be let in.",
    lens: { pattern: "acceptance", love: "the verdict / approval", mechanics: "Rejection ↔ Acceptance", wayback: "Belonging" },
    exit: "Secure adoption — belonging given before you perform for the room.",
    scripture: { ref: "Ephesians 1:5", line: "He predestined us for adoption… before the foundation of the world." } },

  { id: "worth", name: "Worth", q: "Am I enough?",
    ache: "Feeling behind, exposed, not enough; needing proof.",
    promise: "Your worth is the prize waiting at the end of performance.",
    lens: { pattern: "righteousness", love: "Debt → justification; Mirror → verdict", mechanics: "Performance ↔ Standing", wayback: "Worth / justification" },
    exit: "Imputed worth — the ground under obedience, not its reward.",
    scripture: { ref: "Romans 4:5", line: "To the one who does not work but trusts… faith is counted as righteousness." } },

  { id: "safety", name: "Safety & control", q: "Am I okay — can I keep the chaos out?",
    ache: "Tension, urgency, threat-scanning, the need to grip.",
    promise: "If you control it tightly enough, you'll finally be safe.",
    lens: { pattern: "control", love: "Control → security; Worry → a shield", mechanics: "Control ↔ Surrender", wayback: "Safety / agency" },
    exit: "Sovereign refuge — you are responsible, not sovereign; you can open the hand.",
    scripture: { ref: "Romans 8:28", line: "God works all things together for good for those who love him." } },

  { id: "significance", name: "Significance", q: "Do I matter — am I seen?",
    ache: "Feeling invisible, overlooked, small, leaving no trace.",
    promise: "Be seen by enough people and you'll finally matter.",
    lens: { pattern: "significance", love: "the Mirror", mechanics: "Obscurity ↔ Renown", wayback: "Significance / being seen" },
    exit: "The hidden life — seen by God; secret service where credit is impossible.",
    scripture: { ref: "Colossians 3:3", line: "Your life is hidden with Christ in God." } },

  { id: "comfort", name: "Comfort & rest", q: "Can I be soothed and restored?",
    ache: "Stress, grief, exhaustion; craving warmth or escape.",
    promise: "Numb it quickly and you'll feel better.",
    lens: { pattern: "comfort", love: "the Drug → borrowed peace", mechanics: "— (no axis; the gap the apps fill)", wayback: "Comfort / rest" },
    exit: "Comfort that doesn't require denying the wound; true Sabbath rest.",
    scripture: { ref: "Matthew 11:28", line: "Come to me, all who labor and are heavy laden, and I will give you rest." } },

  { id: "provision", name: "Provision", q: "Will I have enough?",
    ache: "Scarcity fear, exposure, dread of future ruin.",
    promise: "Secure the assets and the fear will stop.",
    lens: { pattern: "— (the broken-cistern image itself)", love: "—", mechanics: "Scarcity ↔ Abundance", wayback: "Provision" },
    exit: "Daily bread — the provided portion; generosity breaks the scarcity loop.",
    scripture: { ref: "Matthew 6:26", line: "Look at the birds… your heavenly Father feeds them. Are you not of more value?" } },

  { id: "intimacy", name: "Intimacy", q: "Can I be fully known and still loved?",
    ache: "Longing for closeness, tenderness, to be truly known.",
    promise: "Intensity is intimacy; this charge means you're close.",
    lens: { pattern: "— (a form of acceptance)", love: "the whole lens — cathexis, limerence", mechanics: "—", wayback: "Intimacy" },
    exit: "Covenant knowing — being known by God frees you to be known without consuming.",
    scripture: { ref: "1 Corinthians 13:12", line: "Then I shall know fully, even as I have been fully known." } },

  { id: "transcendence", name: "Transcendence & meaning", q: "What is ultimate — what is it all for?",
    ache: "Drift, emptiness, awe-hunger; the urge to worship something.",
    promise: "This cause, high, or spectacle can carry the ultimate weight.",
    lens: { pattern: "the true Source itself", love: "—", mechanics: "—", wayback: "Meaning / transcendence" },
    exit: "Only God bears the weight of ultimate glory; reached through ordinary means.",
    scripture: { ref: "Jeremiah 2:13 · John 4:14", line: "The fountain of living water… a spring welling up to eternal life." } }
];

/* ---- The synthesis: every source item tagged to a need ---- */
window.NEED_OF = {
  // Love · Family II acts (by roman-numeral id)
  loveAct: { "I": "comfort", "II": "worth", "III": "safety", "IV": "worth", "V": "significance", "VI": "belonging", "VII": "safety" },
  // Love · Family I feelings (by array index)
  loveFeel: ["intimacy", "intimacy", "safety", "comfort", "comfort"],
  // Mechanics · app traps (by key)
  appTrap: { rings: "worth", slack: "worth", linkedin: "significance", streaks: "worth", scroll: "belonging" },
  // Mechanics · existential axes (by key)
  axis: { rejection_acceptance: "belonging", scarcity_abundance: "provision", control_surrender: "safety", performance_standing: "worth", obscurity_renown: "significance" },
  // Way Back · everyday counterfeits (by array index)
  everyday: ["belonging", "safety", "worth", "worth", "worth", "safety", "comfort", "comfort", "safety", "provision", "intimacy", "comfort", "significance", "safety", "transcendence", "provision", "significance", "belonging", "safety", "transcendence"],
  // Way Back · feelings (by feeling label)
  feel: {
    "Lonely": "belonging", "Rejected": "belonging", "Powerless": "safety", "Disrespected": "worth",
    "Worthless": "worth", "Ashamed": "worth", "Anxious": "safety", "Uncertain": "safety",
    "Exhausted": "comfort", "Emotionally numb": "comfort", "Grieved": "comfort", "Bored": "comfort",
    "Hungry": "provision", "Empty": "transcendence", "Invisible": "significance", "Intimacy-starved": "intimacy",
    "Behind": "worth", "Resentful": "belonging", "Angry": "safety", "Tempted to compare": "worth",
    "Unsafe": "safety", "Spiritually dry": "transcendence", "Tempted to quit": "safety",
    "Guilty after failure": "worth", "Overwhelmed": "safety"
  }
};

window.needById = function (id) {
  for (var i = 0; i < window.NEEDS.length; i++) if (window.NEEDS[i].id === id) return window.NEEDS[i];
  return null;
};

/* ---- ONE counterfeit database ----
   The Way Back "everyday" list (20, practical framing) is the superset.
   Five of them are the same things Mechanics frames behaviourally
   (cue/routine/works-trap/grace-exit). We join those in rather than
   keeping two separate catalogues — so the lenses become two VIEWS of
   one object instead of duplicating it. */
var _cf = null;
var TRAP_OF_EVERYDAY = { 0: "scroll", 2: "slack", 3: "rings", 4: "streaks", 16: "linkedin" };
window.getCounterfeits = function () {
  if (_cf) return _cf;
  var ev = (window.WAYBACK_DATA && window.WAYBACK_DATA.everyday) || [];
  var traps = window.APP_TRAPS_DATA || {};
  _cf = ev.map(function (e, i) {
    var c = { id: "cf" + i, name: e.example, type: e.type, need: window.NEED_OF.everyday[i],
      counterfeitUse: e.counterfeit_use, healthyUse: e.healthy_use, tell: e.signal, realMeal: e.real_meal, behavioral: null };
    var tk = TRAP_OF_EVERYDAY[i];
    if (tk && traps[tk]) {
      var t = traps[tk];
      c.behavioral = { key: tk, axis: t.axis, cue: t.cue, routine: t.routine, reward: t.reward, worksTrap: t.dependency, graceExit: t.displacement };
    }
    return c;
  });
  return _cf;
};

/* Build a per-need index aggregating every lens's take on that need. */
window.buildNeedIndex = function () {
  var idx = {};
  window.NEEDS.forEach(function (n) {
    idx[n.id] = { need: n, feelings: [], loveActs: [], loveFeelings: [], counterfeits: [], axis: null };
  });
  var W = window.WAYBACK_DATA, NO = window.NEED_OF;

  if (W && W.feel) W.feel.forEach(function (f) { var k = NO.feel[f.feel]; if (idx[k]) idx[k].feelings.push(f); });
  if (window.LOVE_ACTS) window.LOVE_ACTS.forEach(function (a) { var k = NO.loveAct[a.num]; if (idx[k]) idx[k].loveActs.push(a); });
  if (window.LOVE_FEELINGS) window.LOVE_FEELINGS.forEach(function (f, i) { var k = NO.loveFeel[i]; if (idx[k]) idx[k].loveFeelings.push(f); });
  window.getCounterfeits().forEach(function (c) { if (idx[c.need]) idx[c.need].counterfeits.push(c); });
  if (window.AXES_DATA) Object.keys(window.AXES_DATA).forEach(function (key) { var k = NO.axis[key]; if (idx[k]) idx[k].axis = window.AXES_DATA[key]; });

  return idx;
};
