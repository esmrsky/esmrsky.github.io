/* Love content — extracted from Fake Love: Family I (5 feelings), Family II (7 acts), 5 loop steps. */
window.LOVE_FEELINGS = [
  {
    name: "Cathexis",
    sub: "The Hook of Investment",
    driver: "Mental/Emotional Charge",
    sensation: "An intense, consuming focus on a person; feeling they are deeply important to your life, thinking about them constantly.",
    reality: "Emotional investment of energy (cathexis) is not love. You can cathect someone you do not actually know, respect, or actively act to support. Cathexis is a mental attachment; love is the action of caring.",
    lit: "M. Scott Peck (The Road Less Traveled) & bell hooks (All About Love)",
    target: "Any extraction loop",
    example: "A person spends months daydreaming about an acquaintance, crafting elaborate mental scenarios of a future together and feeling a profound 'bond,' but never initiates a real conversation to learn who they actually are."
  },
  {
    name: "Limerence",
    sub: "The Obsessive Spark",
    driver: "Dopamine & Uncertainty",
    sensation: "Intense, involuntary craving for emotional reciprocation, obsessive mental loops, mood swings depending on their signals.",
    reality: "A dopamine-driven fantasy fueled by uncertainty. It requires a projection of the person rather than their actual reality.",
    lit: "Dorothy Tennov (Love and Limerence, 1979)",
    target: "Love as a Drug",
    example: "Analyzing every punctuation mark in their text messages, experiencing intense euphoria when they reply quickly, and crashing into physical despair or emptiness when response times drag."
  },
  {
    name: "The 'Anxious Spark'",
    sub: "Chemistry of Unpredictability",
    driver: "Cortisol & Attachment Alarm",
    sensation: "Heart-racing excitement, butterflies, high stakes, magnetic attraction, constant scanning for signals of interest.",
    reality: "Your nervous system detecting threat or unavailability, triggering an anxious attachment alarm. We mistake anxiety for passion.",
    lit: "Grounded in Attachment Theory (John Bowlby)",
    target: "Love as Control",
    example: "Feeling intense 'chemistry' only around partners who are emotionally distant or unpredictable. Feeling bored or assuming there is 'no spark' when interacting with someone who is consistent, warm, and secure."
  },
  {
    name: "Trauma-Bond Pull",
    sub: "Intensity Mistaken for Depth",
    driver: "Intermittent Reinforcement",
    sensation: "Ecstatic highs and devastating lows; feeling 'us against the world'; an addictive draw to a turbulent person.",
    reality: "A bond forged by cycles of abuse, neglect, or drama followed by sudden warmth. Pain followed by relief trains the brain to read conflict as intimacy.",
    lit: "Patrick Carnes (Against the Betrayal Bond)",
    target: "Love as Rescue / Drug",
    example: "Staying in a volatile cycle where a partner alternates between harsh criticism and sudden grand gestures of warmth, interpreting the emotional relief of reconciliation as proof of a 'soulmate connection.'"
  },
  {
    name: "Familiarity",
    sub: "The Static Connection",
    driver: "Comfort of the Known",
    sensation: "Low-friction coexistence, shared history, comfortable routine, avoidance of disruption.",
    reality: "An attachment of convenience. The comfort of predictability and fear of change mistaken for active, willing care for the other's growth.",
    lit: "Erich Fromm (The Art of Loving)",
    target: "Love as a Mirror",
    example: "Coexisting in a roommate-like routine, avoiding difficult conversations to preserve the peace, and mistaking the comfortable habituation and fear of being alone for active care for each other's growth."
  }
];

window.LOVE_ACTS = [
  {
    num: "I", name: "Love as a Drug", mech: "Regulation",
    need: "I cannot regulate my own inner state, so I borrow yours to do it.",
    romantic: "Limerence and codependency. Your mood sets mine; one text rewrites my whole day; I consume your presence to feel level.",
    parenting: "Parentification. The child becomes the parent's soother and confidant — managing the adult's feelings to keep them okay.",
    echo: "A parentified child learns that their value lies in emotional containment, growing up to seek partners whose unstable mood they must regulate.",
    tell: "I need your state to fix mine.",
    idol: "The person becomes your <b>peace</b> — the steadiness you were meant to find in God, outsourced to a human nervous system.",
    loop: ["Unregulated ache", "They soothe it", "They become my peace", "I orient the day around their signals", "I'm only okay if they're okay"],
    turn: "A self that can be held — that can self-soothe and rest in God — can be <b>with</b> the other instead of feeding on them. Presence, not consumption."
  },
  {
    num: "II", name: "Love as a Mirror", mech: "Validation",
    need: "I don't know my own worth, so I need you to reflect it back.",
    romantic: "Loving how they make you feel about yourself. Needing constant reassurance; in love with the admiration more than the person.",
    parenting: "The child as ego-extension. Living through their wins; their achievement feeds my self-image, their failure shames me.",
    echo: "A child loved only as an ego-extension grows up to equate achievement and validation with love, constantly performing to keep the mirror kind.",
    tell: "Love warms when they make me look good, cools when they don't.",
    idol: "The person becomes your <b>verdict</b> — your sense of being acceptable rests on their reflection instead of on being already beloved.",
    loop: ["Am I worth anything?", "Their admiration says yes", "They become my verdict", "I perform to keep the mirror kind", "Identity contingent on approval"],
    turn: "Worth received as a given — belovedness that precedes performance — frees you to actually <b>see</b> the other instead of using them as glass."
  },
  {
    num: "III", name: "Love as Control", mech: "Possession",
    need: "I secure myself by controlling you; your freedom feels like my danger.",
    romantic: "Jealousy, monitoring, engulfment. 'If you loved me you'd...' Closeness measured by how much you'll surrender.",
    parenting: "Overcontrol; love conditional on compliance. The child's individuation experienced as betrayal rather than growth.",
    echo: "A child raised under overcontrol equates closeness with the surrender of self, leading them to either control partners or seek engulfment.",
    tell: "The other's separateness feels like a threat.",
    idol: "The person becomes your <b>security</b> — you trust your grip more than you trust God to hold what you can't.",
    loop: ["Fear of abandonment / chaos", "If I control you, I'm safe", "Control becomes my security", "I sacrifice your freedom to my fear", "Love means grip"],
    turn: "Security held elsewhere lets you open your hand. Love strong enough to <b>bless the other's freedom</b> — even the freedom to leave."
  },
  {
    num: "IV", name: "Love as Debt", mech: "Transaction",
    need: "I can't trust love freely given, so I bind it with obligation.",
    romantic: "Scorekeeping. Love advanced to be owed. 'I did this, so now you owe me that.' Ledgers.",
    parenting: "'After all I've done for you.' Guilt as the binding agent; sacrifice quietly weaponized into leverage.",
    echo: "A child trained in transactional love grows up to keep a ledger, terrified of grace and unable to receive love without checking the invoice.",
    tell: "There's an invisible ledger, and I'm always reading it.",
    idol: "The relationship becomes your <b>justification</b> — you earn and extract instead of receiving and extending grace.",
    loop: ["Love must be earned", "A ledger makes it predictable", "The exchange becomes my justification", "I keep paying and collecting", "Grace is impossible; all is owed"],
    turn: "Grace received — unearned, un-repayable — dissolves the ledger. Love that <b>gives without invoicing</b> because it was first given to."
  },
  {
    num: "V", name: "Love as Rescue", mech: "The Project",
    need: "I love by fixing — which keeps me needed and lets me avoid my own wound.",
    romantic: "The savior / fixer dynamic. Falling for potential; managing the other's life; loving the version I'm building.",
    parenting: "Over-functioning, helicoptering. Can't let the child struggle or fail; their growing competence quietly threatens my role.",
    echo: "An over-functioning child learns they are only safe when useful, seeking broken partners in adulthood to maintain their worth.",
    tell: "I need you to need me.",
    idol: "You make yourself the person's <b>savior</b> — taking the seat only God can hold, and calling the takeover love.",
    loop: ["I'm only valuable if useful", "Being your rescuer makes me valuable", "Being needed becomes my worth", "I keep you dependent", "Love means fixing"],
    turn: "A worth not contingent on being needed lets you support without engulfing — and lets the other outgrow you. <b>Love that launches.</b>"
  },
  {
    num: "VI", name: "Love as Indulgence", mech: "Permissiveness",
    need: "I want to be liked or avoid conflict, so I give you whatever you want.",
    romantic: "People-pleasing, never saying no, allowing boundaries to be overrun to keep peace. Relentless compliance.",
    parenting: "Permissive parenting. Shielding children from consequences; refusing to set boundaries to avoid their discomfort or anger.",
    echo: "A child raised without boundaries struggles with limits in adulthood, equating rules with rejection and pleasing to survive.",
    tell: "I cannot tolerate your discomfort or anger with me.",
    idol: "The relationship becomes your <b>comfort/approval</b> — you sacrifice their character growth to avoid temporary friction.",
    loop: ["Fear of conflict/disapproval", "I indulge them", "They are temporarily happy/quiet", "I avoid setting boundaries", "They become entitled/stunted"],
    turn: "Real love is willing to be disliked for the other's long-term good. It sets boundaries that protect their character and maturity."
  },
  {
    num: "VII", name: "Love as Worry", mech: "Anxiety-as-Care",
    need: "My own anxiety is unmanageable, so I wrap it in 'concern' to control your movements.",
    romantic: "Constant checking-in, catastrophizing their plans, restricting their risks in the name of safety.",
    parenting: "Overprotection, helicoptering. Projecting my fears onto the child so they are afraid of the world and stay close.",
    echo: "A child raised in an anxious, overprotective environment grows up viewing the world as hyper-dangerous and struggles to differentiate.",
    tell: "I count my anxiety as proof of how much I care about you.",
    idol: "The other's safety becomes your <b>shield against chaos</b> — you make them carry your fear.",
    loop: ["Internal anxiety/catastrophizing", "I restrict/overprotect you", "I feel temporarily relieved", "You absorb the fear and withdraw", "The world is scary; you must stay close"],
    turn: "Love casts out fear. True care supports the other's brave engagement with the world, taking healthy risks and welcoming growth."
  }
];

window.LOVE_STEPS = [
  {
    title: "1. The Wound (Scarcity)",
    desc: "The initial emotional void or deficit in our own system. This is the structural vulnerability that demands stabilization."
  },
  {
    title: "2. The Offer (The Bait)",
    desc: "How the other person or relation promises to temporarily soothe or fill that wound. It is the initial hook of attachment."
  },
  {
    title: "3. The Idol (Cathexis)",
    desc: "The other person is elevated to the source of what we cannot find in ourselves. They carry the ultimate weight of our peace, worth, or safety."
  },
  {
    title: "4. The Altar (The Sacrifice)",
    desc: "What we must sacrifice or deform in order to keep the idol in place. Usually involves sacrificing their freedom or our boundaries."
  },
  {
    title: "5. The Mental Structure (The Captivity)",
    desc: "The rigid, locked-in relational script. The boundary collapses entirely, and the counterfeit pattern becomes a persistent pattern of extraction."
  }
];
