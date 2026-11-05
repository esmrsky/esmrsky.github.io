window.CONTENT = {
  defaults: { need: "worth", agent: "scrolling" },

  needs: ["rest", "comfort", "worth", "closeness", "safety", "joy"],

  agents: ["scrolling", "porn", "food", "a drink", "work", "approval", "shopping", "gaming"],

  // where the loop reroutes to when willpower cuts the wire
  reroutes: {
    "scrolling": "the fridge",
    "porn": "scrolling",
    "food": "shopping",
    "a drink": "work",
    "work": "approval",
    "approval": "work",
    "shopping": "food",
    "gaming": "scrolling"
  },

  // the immediate payoff for picking a need — one line, written for that ache
  needLines: {
    "rest":      "Tired in a way sleep doesn't seem to reach.",
    "comfort":   "You just want something to be soft, for once.",
    "worth":     "The quiet math of <em>am I enough</em>, running under everything.",
    "closeness": "Surrounded by people. Somehow still not known.",
    "safety":    "Waiting for the other shoe. Always.",
    "joy":       "Everything works. Nothing sings."
  },

  // per-exit terms for the subscription card
  agentFineprint: {
    "scrolling": { promise: "somewhere else to be",            delivery: "elsewhere — for about eleven minutes",        price: "your sleep, then your attention" },
    "porn":      { promise: "closeness, without being known",  delivery: "intensity — for about eleven minutes",        price: "the real thing drifts further away" },
    "food":      { promise: "comfort you can hold",            delivery: "warmth — for about eleven minutes",           price: "the comfort needs comforting after" },
    "a drink":   { promise: "the volume turned down",          delivery: "softer edges — for about eleven minutes",     price: "tomorrow, with interest" },
    "work":      { promise: "worth you can prove",             delivery: "momentum — for about eleven minutes",         price: "rest starts to feel like debt" },
    "approval":  { promise: "a verdict: you're okay",          delivery: "a warm glow — for about eleven minutes",      price: "your mood, outsourced" },
    "shopping":  { promise: "a fresh start, shipped",          delivery: "new-thing spark — for about eleven minutes",  price: "wears off before the card clears" },
    "gaming":    { promise: "a world you can win",             delivery: "progress — for about eleven minutes",         price: "the unpaused life piles up" }
  },

  nodeLabels: {
    personal: {
      pain:     { main: "the ache", sub: "of {need}" },
      craving:  { main: "the pull", sub: "craving" },
      behavior: { main: "{agent}", sub: "the exit" },
      relief:   { main: "relief", sub: "~11 minutes" },
      shame:    { main: "shame", sub: "the bill" }
    },
    earning: {
      pain:     { main: "enough?", sub: "the question" },
      craving:  { main: "prove it", sub: "the pull" },
      behavior: { main: "perform", sub: "the work" },
      relief:   { main: "applause", sub: "it lands" },
      shame:    { main: "wears off", sub: "the bill again" }
    }
  },

  achievements: [
    "The grades.",
    "The promotion.",
    "The marathon.",
    "They clapped.",
    "“You’ve changed!”",
    "A perfect streak."
  ],

  spiralCaption: "the ache → brought, not hidden → met at the source → trust deepens → fruit",

  // words as shown: node labels use names.need / names.agent, prose binds use bindNeed
  names: {
    need:  { "rest": "rest", "comfort": "comfort", "worth": "worth", "closeness": "closeness", "safety": "safety", "joy": "joy" },
    bindNeed: { "rest": "rest", "comfort": "comfort", "worth": "worth", "closeness": "closeness", "safety": "safety", "joy": "joy" },
    agent: { "scrolling": "scrolling", "porn": "porn", "food": "food", "a drink": "a drink", "work": "work", "approval": "approval", "shopping": "shopping", "gaming": "gaming" }
  },

  // strings main.js writes itself
  ui: {
    fridge: "the fridge",
    exit: "the exit",
    newExit: "the new exit",
    meta: "passes: {n} · relief: shrinking · shame: growing",
    runLabels: ["Run the loop", "Run it again", "Again", "Again", "You know the way by now"],
    willAgain: "Try willpower again",
    willKnows: "The loop knows this trick now",
    received: "received"
  }
};
