/* Original synthesis of the supplied episode transcript and research companion.
   Transcript locators count non-empty lines, preserving their original order.
   PDF locators use physical page numbers in v2.1; no timestamps are invented. */
const PROTOCOLS = [
  {
    id:'water', number:'01', title:'Hydrate after waking', category:'food', icon:'drop', color:'blue', time:'After waking', status:'Supported core', tone:'mint',
    summary:'Make water easy to reach. The useful goal is adequate hydration, not a hormone spike.',
    episode:'He suggests 16–32 US fl oz of water after waking (about 475–950 mL), with electrolytes optional, and roughly 80 fl oz (2.4 L) across the day. He favors more fluid earlier and less near bedtime.',
    steps:['Keep drinking water where you will encounter it after getting up. Drink a comfortable amount; the episode’s volume is not a universal requirement.','Adjust across the day for thirst, heat, activity, food, and any clinician-given fluid guidance. Routine extra electrolytes are not necessary for everyone.','If nighttime bathroom trips disrupt sleep, review late fluid intake without under-hydrating the rest of the day.'],
    why:'Dehydration can make concentration and physical effort harder. A simple morning cue helps avoid forgetting fluids.',
    evidence:'The PDF finds no direct demonstration that drinking water after waking raises the cortisol awakening response through the vagus nerve. Water-related autonomic effects and the normal cortisol rhythm are separate findings. Keep the hydration habit without claiming that mechanism.',
    caution:'Fluid or sodium restrictions for heart, kidney, or other conditions take priority. Do not force large volumes quickly.',
    pages:'9–11', lines:'236–268', related:['morning-light','nutrition']
  },
  {
    id:'morning-light', number:'02', title:'Get outdoor daylight', category:'light', icon:'sun', color:'amber', time:'Early in your day', status:'Supported core', tone:'mint',
    summary:'Give your internal clock a strong daytime cue. Overcast daylight still counts.',
    episode:'He prioritizes daylight in the first 30–60 minutes after waking, ideally outdoors, and mentions a 10,000-lux light box when daylight is unavailable. He starts to discuss exposure length but does not give a complete clear/overcast-day timing schedule in this transcript.',
    steps:['Pair going outside with an existing morning activity: a short walk, sitting on a balcony, or taking your drink outdoors.','Look normally at your surroundings, never directly at the sun. Outdoor brightness varies with weather, shade, and season; a screen is not a substitute for daylight.','If waking before sunrise, use suitable indoor lighting and get outside when daylight arrives. A clinical light box has its own instructions and dosing.','If you miss a day, resume the habit. His suggestion to double the next day is not an established catch-up formula.'],
    why:'Light-sensitive retinal cells send timing information to the suprachiasmatic nucleus—the brain’s central circadian clock. Timing and light intensity help organize the sleep–wake cycle.',
    evidence:'Morning light supports circadian timing. The PDF does not establish a one-hour window that permanently closes, a special “optimal” sunrise color, or the claim that maximizing morning cortisol guarantees better immunity and sleep. Glass changes light transmission, but window light is not biologically useless.',
    caution:'Never stare at the sun, even at sunrise. Keep needed eye and skin protection. For light-box use, follow the device distance and discuss eye disease, photosensitizing medicines, or bipolar disorder with a clinician. A SAD treatment regimen is different from a universal wellness dose.',
    pages:'11–19', lines:'270–434, 575–590', link:'https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder', linkLabel:'NIMH: light therapy context', related:['evening-light','dim']
  },
  {
    id:'exercise', number:'03', title:'Train across the week', category:'movement', icon:'strength', color:'mint', time:'A time you can repeat', status:'Supported core', tone:'mint',
    summary:'Build strength and aerobic capacity. Choose a repeatable schedule with room for recovery.',
    episode:'He prefers exercise within the first 3–4 hours of waking, while explicitly allowing later training. His template alternates three lifting and three cardio days, with a rest day after hard leg training. He describes a 5-minute cardio warm-up and 2–3 working sets per exercise, emphasizing multi-joint movements.',
    steps:['Start from your current capacity and choose exercises you can perform well. A manageable schedule beats copying someone else’s volume.','Include both resistance training and aerobic work. The example week below separates easy, moderate, and hard cardio.','Use a gradual warm-up and controlled technique. Hard sets require appropriate load, experience, and recovery.','Keep the rest day meaningful. Adjust the next session if fatigue or soreness changes your movement.'],
    why:'Different training types build different capacities. A routine makes exercise easier to repeat and creates opportunities for meaningful physical effort.',
    evidence:'The broad value of exercise is strong. Universal superiority of morning exercise, exact cortisol multipliers, and a fixed four-hour post-workout learning window are not established. The PDF also finds benefits for moderate continuous cardio; it is not inferior for every brain outcome.',
    caution:'The interview’s short all-out bike intervals are an example of his training, not a beginner prescription. Progress vigorous exercise to your fitness and health status; pain, dizziness, or chest symptoms are reasons to stop and seek appropriate help.',
    pages:'28–31, 36–37', lines:'760–907', link:'https://www.cdc.gov/physical-activity-basics/guidelines/adults.html', linkLabel:'CDC: adult activity guidance', related:['walking','cold','challenge']
  },
  {
    id:'focus', number:'04', title:'Do effortful mental work', category:'mind', icon:'focus', color:'blue', time:'One protected work period', status:'Supported core', tone:'mint',
    summary:'Pick one meaningful task. Remove interruptions and work at the edge of what you can do.',
    episode:'He describes 90 minutes to 2 hours of difficult work or learning daily. He stresses being alert, focusing attention, making genuine attempts, noticing errors, and returning after rest.',
    steps:['Choose one concrete outcome: solve a set of problems, practice a language conversation, draft an argument, or understand a difficult passage.','Put the phone outside the room if possible. Close unrelated tabs and reduce visual distractions.','Begin with a block you can sustain, even if much shorter than his 90–120 minutes. Take breaks when useful.','If the work feels too easy, add a challenge. If it is overwhelming, reduce the difficulty and get feedback. Finish by recalling what you learned.'],
    why:'Focused attempts expose the gap between what you intend and what you can currently do. Feedback and later practice help close it.',
    evidence:'Effort and feedback matter, but the episode’s roughly 15% error rate comes from a particular computational learning framework, not a universal target for languages, relationships, or every skill. Neither uninterrupted two-hour focus nor distress is required for learning.',
    caution:'Difficulty is useful when it is manageable and informative. It is not a reason to ignore exhaustion or to alter prescribed ADHD, anxiety, or other treatment.',
    pages:'36–38, 50–52', lines:'2976–3133', related:['phone','recall','sigh']
  },
  {
    id:'sigh', number:'05', title:'Use a physiological sigh', category:'mind', icon:'breath', color:'mint', time:'When you feel overactivated', status:'Qualified / promising', tone:'amber',
    summary:'A comfortable inhale, a small second inhale, then a long exhale. Reassess how you feel.',
    episode:'For stress in the moment, he suggests one double-inhale, long-exhale sigh. He also describes a study comparing 5 minutes daily of cyclic sighing, box breathing, cyclic hyperventilation, or meditation for one month.',
    steps:['Sit somewhere stable. Inhale comfortably through your nose.','Add a small second inhale to top up, without straining.','Exhale slowly through your mouth. Let the exhale be longer than the inhale.','Return to normal breathing and reassess. The on-page demonstration shows three gentle cycles; its exact timing is illustrative.'],
    why:'Breathing and heart rhythm interact. A slow exhale can help bring a sense of control when you are too activated for the task in front of you.',
    evidence:'The randomized trial found greater mood improvement and reduced respiratory rate with exhale-focused breathwork than with meditation. It does not prove one sigh treats anxiety, improves every HRV or sleep measure, or is the best method for everyone. It was remote, unblinded, and one month long.',
    caution:'Do not force repeated deep breaths. Stop if dizzy, tingling, or uncomfortable. Practice away from driving or water; this is not a hyperventilation or breath-hold exercise.',
    pages:'39–41', lines:'1453–1706', link:'https://pubmed.ncbi.nlm.nih.gov/36630953/', linkLabel:'Balban et al., 2023: breathwork trial', related:['night-waking','focus']
  },
  {
    id:'evening-light', number:'06', title:'Step outside later, too', category:'light', icon:'sunset', color:'amber', time:'Late afternoon / early evening', status:'Qualified / context matters', tone:'amber',
    summary:'Take another daylight break. It can support the day–night contrast, but it does not erase late light exposure.',
    episode:'He suggests daylight in the last third of the waking day: a walk, balcony break, or time near a window. He calls this a buffer against later screen light, and says the same protection does not work in adolescents.',
    steps:['If daylight remains, use a brief outdoor break to transition out of work. It can double as movement or time with another person.','Keep the later evening dim even if you got plenty of daylight.','Use seasonal daylight rather than a rigid sunset ritual. Do not add intense light late at night in an attempt to compensate for a dim day.'],
    why:'Recent light history can change sensitivity to later light. Consistent daytime brightness and a dim sleep environment make the daily timing signal clearer.',
    evidence:'Prior bright light can reduce later melatonin suppression under some conditions. The effect depends on timing, spectrum, duration, and prior days. Evening light can also delay the body clock. The PDF does not support a guaranteed “Netflix inoculation” or a simple all-or-nothing rule for teens.',
    caution:'Outdoor daylight is not a reason to look directly at the sun. For shift work or circadian disorders, light timing should be tailored rather than copied from a daytime routine.',
    pages:'26–27', lines:'693–756', related:['morning-light','dim']
  },
  {
    id:'nutrition', number:'07', title:'Build meals that support you', category:'food', icon:'food', color:'amber', time:'Across your meals', status:'Supported core / qualified details', tone:'mint',
    summary:'Enough food, useful protein, plants you tolerate, and a pattern you can maintain.',
    episode:'He favors appropriate total energy, protein sources that deliver essential amino acids without excessive calories, fruit and vegetables, lower-sugar fermented foods, olive oil, and starches matched to needs. Examples include eggs, lean meat, fish, yogurt-style foods, kimchi, sauerkraut, rice, oats, and sourdough.',
    steps:['Build a meal around a protein source you enjoy. Plant-based choices can meet protein needs with planning; the episode gives no daily protein target.','Include a range of tolerated plants and fiber sources. Increase fiber gradually rather than abruptly overloading it.','Try a modest amount of a fermented food if you like it and tolerate it. More is not automatically better.','Match carbohydrate and total energy intake to appetite, activity, and health needs. Avoid going to bed painfully hungry or uncomfortably full.'],
    why:'Nutrition supports recovery, everyday energy, and adequate nutrient intake. Simple meal choices are easier to sustain than arguing over one ingredient.',
    evidence:'The Stanford fermented-food trial found changes in microbial diversity and inflammatory markers. That does not mean fiber is generally inflammatory. A small high-GI evening-meal study found faster sleep onset, but the proposed starch → lower cortisol → better sleep pathway is not established.',
    caution:'Do not use the episode’s elimination-diet anecdotes to treat autoimmune disease without care. Therapeutic diets, diabetes, food allergies, and eating-disorder history call for individualized guidance.',
    pages:'33–34', lines:'1195–1338', link:'https://doi.org/10.1016/j.cell.2021.06.019', linkLabel:'Wastyk et al.: published fermented-food trial', related:['water','walking','sleep']
  },
  {
    id:'dim', number:'08', title:'Lower the evening light', category:'light', icon:'lamp', color:'lilac', time:'Before bed', status:'Supported core', tone:'mint',
    summary:'Reduce brightness and stimulation. Make the last stretch of the day feel different from the first.',
    episode:'He suggests dimming lights and screens, optionally using a red screen setting, and keeping the last 30 minutes before sleep screen-free. He also proposes avoiding screens during the first 30 minutes after waking.',
    steps:['Lower bright room lighting as you approach bedtime. Use comfortable, lower-intensity lighting where practical.','If you need a screen, lower its brightness and choose less stimulating content. A warmer or red display does not remove the effects of brightness, timing, or content.','Try a 30-minute screen-free wind-down: wash, prepare tomorrow’s essentials, read something calm, or talk.','Keep enough lighting for safe movement, especially if you get up during the night.'],
    why:'Light can suppress melatonin and shift circadian timing. The amount reaching your eyes, its spectrum, the time, and your recent light exposure all matter.',
    evidence:'The circadian effect is better supported than the claim that every evening screen exposure necessarily produces a harmful cortisol spike. The UK Biobank mortality result is observational, not proof that using a phone after 6 p.m. shortens a particular person’s life.',
    pages:'17–19, 25–27', lines:'421–430, 2921–2952', link:'https://doi.org/10.1073/pnas.2405924121', linkLabel:'Windred et al.: light and mortality cohort', related:['sleep','evening-light']
  },
  {
    id:'sleep', number:'09', title:'Protect your sleep', category:'sleep', icon:'moon', color:'lilac', time:'Every night', status:'Supported core', tone:'mint',
    summary:'A dark, comfortable sleep space and enough time to rest come before tools that promise extra sleep stages.',
    episode:'He recommends a dark bedroom, an eye mask if helpful, optional earplugs, and a comfortable temperature. He mentions a cooling mattress as a personal preference, side sleeping with the head slightly elevated, and long exhales after nighttime waking.',
    steps:['Make the room dark and comfortably cool. Cover small light sources or use a comfortable eye mask if it helps.','Leave adequate sleep opportunity and aim for a consistent schedule. Most adults need at least 7 hours; individual and age-related needs vary.','Use a comfortable sleeping position. Do not trade comfort or a medical positioning recommendation for an unproven brain-clearance claim.','If you repeatedly struggle to sleep, snore heavily, gasp, or feel excessively sleepy in the day, seek evaluation rather than adding more sleep gadgets.'],
    why:'Sleep supports learning, daily function, and recovery. A supportive environment reduces avoidable disruption.',
    evidence:'The body-position glymphatic experiment was in anesthetized rodents, not a human dementia-prevention trial. The meditation MRI study measured fluid dynamics, not proof that meditation replaces an hour of sleep. Sleep-stage readings from wearables are estimates, not a reason to shorten sleep.',
    pages:'31–32, 41–43, 53–54', lines:'2921–2973, 3433–3554', link:'https://www.cdc.gov/sleep/about/index.html', linkLabel:'CDC: sleep and age-specific needs', related:['warm-shower','night-waking','meditation']
  },
  {
    id:'reflection', number:'10', title:'Step out of your roles', category:'mind', icon:'spark', color:'lilac', time:'A little space each day', status:'Personal practice', tone:'lilac',
    summary:'Fulfill your responsibilities, then make room to notice what matters beyond performance.',
    episode:'Drawing on James Hollis, he describes gratitude, preparation, and showing up for others, balanced with daily time out of stimulus–response mode. Examples include quiet sitting, drawing, music, and time outside. He does not give a fixed daily duration.',
    steps:['Choose a small moment without a productivity goal. Sit, draw, listen to music, or take an unhurried walk.','Let feelings and thoughts arrive without demanding an immediate answer to “What is my calling?”','Later, notice patterns: what feels meaningful, what consistently drains you, and what responsibility deserves attention.','Take one practical step in ordinary life. Reflection can inform action without replacing it.'],
    why:'A life made entirely of outward roles can leave little space for your own needs. A life made entirely of introspection can avoid needed action. The conversation argues for both.',
    evidence:'This is a personal-development framework and the speaker’s experience, not a controlled clinical protocol. The discussion of prayer and faith has its own section because it is an important part of the episode, with a different kind of claim from physiology.',
    pages:null, lines:'3236–3428', related:['challenge','meditation']
  },
  {
    id:'walking', number:'EXTENSION', title:'Walk after a meal', category:'movement', icon:'walk', color:'mint', time:'5–10 min in the episode', status:'Supported core', tone:'mint',
    summary:'Give sitting a break. An easy walk after eating is a practical way to add repeated muscle activity.',
    episode:'He suggests 5–10 minutes of walking after meals and an overall personal goal of 7,000–8,000 steps/day. He adds movement by pacing on calls, taking stairs, and walking with his team.',
    steps:['Choose one meal you usually eat sitting down, then follow it with a comfortable walk.','If you cannot walk, choose an appropriate, comfortable movement break for your abilities. The broad idea is to interrupt prolonged sitting.','Use calls, errands, or social time as opportunities to move. Build from your own baseline instead of treating his step count as a pass/fail threshold.'],
    why:'Repeated muscle contractions can help manage post-meal glucose. Movement also makes the day less sedentary; it complements dedicated training.',
    evidence:'The broader movement-break evidence is useful. A specialized, supervised, hours-long soleus-push-up study is not proof that ordinary knee bouncing produces the same large glucose effect. The squatting comparison used 3-minute breaks every 45 minutes, ten times—not merely ten squats every 45 minutes.',
    caution:'A normal rise in glucose after eating is expected. Movement does not replace diabetes treatment. If taking glucose-lowering medication, follow your care plan for activity and hypoglycemia.',
    pages:'54–56', lines:'3712–3909', link:'https://doi.org/10.1111/sms.14628', linkLabel:'Gao et al.: interrupted-sitting study', related:['exercise','nutrition']
  },
  {
    id:'recall', number:'EXTENSION', title:'Test yourself to remember', category:'mind', icon:'repeat', color:'blue', time:'After study, then later', status:'Supported core', tone:'mint',
    summary:'Replace some rereading with active recall. Find the gap, check it, and try again later.',
    episode:'He suggests self-testing mentally or asking an AI tool to generate questions from material. He emphasizes checking what was wrong or missing and returning after a day or two.',
    steps:['Read or practice enough to gain an initial understanding. Then close the material.','Write or say the key ideas from memory, or answer specific questions without hints.','Check your answer against the source. Correct it before rehearsing it again.','Return later for another retrieval attempt. For physical skills, perform the skill and use appropriate feedback.'],
    why:'Recognizing an answer is easier than producing it. Retrieval reveals what you can actually access and helps make it available later.',
    evidence:'Retrieval practice generally improves delayed retention compared with restudy. Difficulty, prior knowledge, and feedback matter. This does not mean notes are useless, one reading is enough for every topic, or every effect lasts two years.',
    caution:'If an AI creates a test, supply the source and verify its answer key. Fluent questions and explanations can still contain errors.',
    pages:'51–52', lines:'3074–3133', link:'https://doi.org/10.3102/0034654316689306', linkLabel:'Practice-testing meta-analysis', related:['focus','sleep']
  },
  {
    id:'meditation', number:'EXTENSION', title:'Begin with ten breaths', category:'mind', icon:'circle', color:'lilac', time:'His morning practice', status:'Personal practice / qualified science', tone:'lilac',
    summary:'Notice breathing, notice wandering, and gently return. Attention is the practice.',
    episode:'He says he now begins the morning with ten breaths of meditation, then gets up, uses the bathroom, hydrates, gets daylight and movement, and later has caffeine and trains. He also discusses research on experienced meditators and brain-fluid dynamics.',
    steps:['Sit or lie comfortably and notice a natural breath. You do not need to make it deeper or slower.','Count up to ten breaths. When attention wanders, acknowledge that and return gently.','Carry the same noticing into the next activity. Wandering is not failure or a verdict on what kind of person you are.'],
    why:'A short attention practice creates a moment to notice your state before immediately reacting to the day.',
    evidence:'The neuroimaging study involved highly experienced meditators and indirect measures of cerebrospinal fluid motion. It did not demonstrate direct waste removal, dementia prevention, or permission to reduce sleep by an hour. Ten breaths is his entry point, not the study’s dose.',
    pages:'53–54', lines:'3511–3554', link:'https://doi.org/10.1073/pnas.2504961122', linkLabel:'Keating et al.: neurofluid study', related:['reflection','sleep']
  },
  {
    id:'warm-shower', number:'EXTENSION', title:'Use warmth to wind down', category:'sleep', icon:'warm', color:'amber', time:'Before bed', status:'Supported / timing matters', tone:'mint',
    summary:'A comfortably warm shower or bath can help the body release heat as bedtime approaches.',
    episode:'He mentions a hot shower after later exercise and describes the seeming paradox that warming the skin can help lower core temperature and support sleep onset.',
    steps:['If you enjoy it, try a comfortably warm shower or bath during the wind-down period.','The review describes heating 1–2 hours before bedtime, sometimes for as little as 10 minutes. This timing comes from the research companion, not an exact episode instruction.','Allow a calm transition afterward. Keep the bedroom comfortable rather than overheating it.'],
    why:'Warming the skin can increase blood flow to the extremities, helping heat dissipate as the body prepares for sleep.',
    evidence:'A review of 17 studies supports improved sleep-onset timing and some sleep-quality measures under specific heating protocols. The mechanism is broader than a simple thermostat command in one brain region.',
    caution:'Use comfortable water, not extreme heat. Take particular care with reduced temperature sensation, dizziness, or medical advice about hot baths.',
    pages:'31–32', lines:'855–877', link:'https://doi.org/10.1016/j.smrv.2019.04.008', linkLabel:'Warm bathing and sleep review', related:['dim','sleep']
  },
  {
    id:'night-waking', number:'EXTENSION', title:'Ease out of nighttime rumination', category:'sleep', icon:'moon', color:'lilac', time:'If you wake in the night', status:'Qualified / personal technique', tone:'amber',
    summary:'Keep stimulation low and try comfortable long exhales. His eye-movement trick is unvalidated.',
    episode:'He suggests ten long deliberate exhales after waking at night. His optional eyes-closed sequence is left, right, up, down, counterclockwise, clockwise, then looking down toward the nose with a long exhale, repeated two or three times.',
    steps:['Stay with low light and an unhurried response. Avoid checking messages that turn waking into work or conflict.','Try a few comfortable, slow exhales, then let breathing return to normal. There is no need to reach ten if it feels forced.','The eye sequence is recorded here for completeness, not presented as a proven sleep intervention. If you try it, keep movements gentle and stop with discomfort or dizziness.'],
    why:'The practical aim is to reduce activation instead of adding frustration about being awake.',
    evidence:'Eye movements and drowsiness are related, but the PDF found no direct test of this exact sequence shutting down cerebellar proprioception or reliably inducing sleep. Small bilateral-stimulation studies do not validate the whole claim.',
    caution:'Persistent insomnia deserves assessment. CBT-I is an evidence-based first treatment for long-term insomnia; a breathing or eye-movement trick is not a substitute.',
    pages:'41–43', lines:'1707–1841, 2921–2930', link:'https://www.nhlbi.nih.gov/health/insomnia/treatment', linkLabel:'NHLBI: insomnia treatment', related:['sigh','sleep']
  },
  {
    id:'cold', number:'EXTENSION', title:'Understand cold exposure', category:'movement', icon:'cold', color:'blue', time:'Optional, not a daily essential', status:'Qualified / risk-sensitive', tone:'amber',
    summary:'A strong stressor, not a prerequisite for health. Separate the experience from exaggerated hormone claims.',
    episode:'He discusses cold showers or plunges as a way to practice remaining composed under a voluntary stressor. He strongly claims cold barely raises cortisol. The transcript gives no safe universal water temperature or duration.',
    steps:['Treat cold exposure as optional. A manageable exercise or learning challenge can also give you practice responding to discomfort.','If considering immersion, first assess whether your health makes it appropriate and use a supervised, conservative approach.','Do not combine cold-water exposure with deliberate hyperventilation or breath holds. Keep away from solitary open-water experiments.','If muscle growth is your goal, avoid habitual cold-water immersion immediately after lifting.'],
    why:'Cold can rapidly increase sympathetic activation. A subjective feeling of alertness or composure does not prove lasting resilience or a specific brain-dopamine change.',
    evidence:'The PDF directly contradicts “cold does not raise cortisol”: results vary with temperature, duration, timing, and the participant. Blood dopamine is not a direct measurement of dopamine in human reward circuits. Regular immediate post-training immersion may attenuate muscle growth.',
    caution:'Sudden cold can provoke gasping, blood-pressure changes, and dangerous heart rhythms. Seek medical advice if you have cardiovascular or relevant health conditions. No temperature or exposure target is supplied here.',
    pages:'28–33', lines:'817–853, 959–1043', link:'https://doi.org/10.1002/ejsc.12074', linkLabel:'Cold immersion and hypertrophy review', related:['exercise','challenge']
  },
  {
    id:'challenge', number:'EXTENSION', title:'Practice a manageable hard thing', category:'mind', icon:'steps', color:'mint', time:'Within normal life', status:'Personal framework / qualified mechanism', tone:'lilac',
    summary:'Use chosen effort to build skill and confidence. Discomfort alone is not the objective.',
    episode:'He links tenacity to the anterior midcingulate cortex (aMCC), describes doing things you resist, and includes learning a language, dancing, and mobility work as examples. He also recommends pausing before reacting when stressed or tired.',
    steps:['Choose a worthwhile task with a clear reason: a difficult paragraph, a movement skill, or a conversation you have prepared for.','Make the challenge small enough to attempt sincerely. Use feedback and progression rather than punishment.','When a stressful message arrives, pause, settle, and decide what response would serve the situation.','Use convenience deliberately. Put the time it saves toward something meaningful instead of assuming convenience itself is bad.'],
    why:'Repeated experience of meeting a manageable challenge can change your relationship to effort. The useful outcome is better action, not accumulating suffering.',
    evidence:'The aMCC participates in effort evaluation and perseverance. Activation or stimulation findings do not establish that every unwanted task enlarges a single “willpower muscle.” The PDF found no direct support for the exact claim that the prefrontal cortex switches off for the first 20–30 seconds of a cold plunge.',
    caution:'Ordinary acute stress is not equivalent to brain damage. Do not turn the resilience message into tolerating abuse, ignoring pain, or blaming neurological illness on insufficient motivation.',
    pages:'32–33, 52', lines:'908–1192', related:['focus','sigh','reflection']
  },
  {
    id:'phone', number:'EXTENSION', title:'Give attention some distance', category:'mind', icon:'phone', color:'blue', time:'During focused work', status:'Useful experiment / mixed literature', tone:'amber',
    summary:'Move the phone out of reach—or out of the room—and see whether the task becomes easier to stay with.',
    episode:'He describes phones on the desk, in a bag, or in another room and says a nearby phone reduces cognitive flexibility even when not being used. He also points to visual clutter and the need to narrow competing inputs.',
    steps:['Before the work block, put the phone elsewhere if your responsibilities allow it.','Turn off nonessential notifications and use a separate timer if checking the phone starts a distraction loop.','If you must be reachable, choose a deliberate exception for urgent contacts rather than treating every notification as urgent.','Compare the quality of work with and without the change. Keep a setup that actually helps you.'],
    why:'Physical separation reduces easy checking and can reduce the effort spent managing interruptions.',
    evidence:'The cited Ward experiments measured working memory, fluid intelligence, and sustained attention—not a direct cognitive-flexibility test. Effects varied by outcome, and the wider phone-presence literature is not uniformly positive. This is an inexpensive environment change to try, not a claim that a nearby phone always impairs everyone.',
    pages:'50–51', lines:'2981–3018', link:'https://doi.org/10.1086/691462', linkLabel:'Ward et al.: original phone-presence experiments', related:['focus','recall']
  }
];

const PHASES = {
  morning:{label:'WAKE & ACTIVATE',title:'Start with the outside world.',description:'Drink water, get outdoor daylight, and make room for movement. A repeatable start is more useful than a perfect morning.',ids:['water','morning-light','exercise'],marker:105,color:'amber'},
  day:{label:'FOCUS & MOVE',title:'Put your energy into something.',description:'Protect a period of effortful work. Eat enough to support your day and interrupt sitting with comfortable movement.',ids:['focus','nutrition','walking'],marker:290,color:'mint'},
  evening:{label:'SLOW & SETTLE',title:'Create a softer landing.',description:'Take a daylight break while it is still light, lower brightness later, and let work give way to reflection or connection.',ids:['evening-light','dim','reflection'],marker:455,color:'amber'},
  night:{label:'SLEEP & RESTORE',title:'Let the day be finished.',description:'Keep the room dark and comfortable. Protect enough sleep time; use a gentle calming tool if you wake without turning it into a performance test.',ids:['sleep','night-waking','warm-shower'],marker:620,color:'lilac'}
};

const TRAINING = [
  {day:'MON',name:'Strength',meta:'Upper body',color:'mint',title:'A strength session',description:'He emphasizes multi-joint movements such as rows, pull-ups, and dips, after a brief warm-up, with 2–3 working sets per exercise. Choose suitable variations and good technique. The upper-body placement here is an example, not an exact split specified in the episode.'},
  {day:'TUE',name:'Long & easy',meta:'~60 min in episode',color:'blue',title:'The longer aerobic session',description:'His first cardio category is about an hour, long and slow. Use a comfortable, sustainable intensity and build duration from your current capacity. A shorter session is a valid starting point; the hour is his template.'},
  {day:'WED',name:'Strength',meta:'Another lifting day',color:'mint',title:'More practice under load',description:'Another resistance session can cover movements or muscle groups that fit your recovery. The interview does not give a full exercise list, repetition range, or a complete upper-body split. Avoid treating that missing detail as an instruction to do every exercise to failure.'},
  {day:'THU',name:'Moderate',meta:'~30 min in episode',color:'blue',title:'A shorter, steadier effort',description:'His second cardio category is roughly 30 minutes at moderate intensity. Choose a mode you can sustain—walking briskly, cycling, or another appropriate activity—and adjust the effort to your conditioning.'},
  {day:'FRI',name:'Legs',meta:'Strength + recovery',color:'mint',title:'Harder leg work, then rest',description:'He discusses squats, hack squats, and deadlifts while describing compound lower-body work. They are alternatives, not a requirement to do them all. His explicit scheduling preference is a rest day after a demanding leg session.'},
  {day:'SAT',name:'Rest',meta:'Recover',color:'lilac',title:'Leave room to recover',description:'This is the one day he says he does not train. Comfortable ordinary movement is compatible with a rest day. Recovery needs vary; additional rest can be appropriate depending on training load, illness, and life stress.'},
  {day:'SUN',name:'Intervals',meta:'Brief & hard',color:'amber',title:'His high-intensity example',description:'He describes easy pedaling for about a minute, then four 30-second very hard efforts separated by 10-second easy periods on an air bike. That is a report of his session, not a complete warm-up or beginner protocol. All-out intervals require preparation, appropriate fitness, and adequate recovery.'}
];

const DEEP_NOTES = [
  {id:'faith',featured:true,title:'A life larger than optimization',label:'FAITH / PURPOSE / PERSONAL GROWTH',tone:'lilac',preview:'The conversation spends real time on prayer, humility, responsibility, and making room for what you cannot control. This is central to the episode’s message.',body:[
    '<strong>What he describes.</strong> Huberman says nightly prayer, and prayer before conversations, helped him loosen the need to control everything. He asks for humility, clarity, the ability to serve, and openness to an outcome he did not plan. He describes this as personal experience and faith.',
    '<strong>How to apply the reflection.</strong> If prayer belongs in your life, make room for it in your own tradition. If it does not, consider a quiet moment to notice gratitude, limits, and the kind of person you want to be in your next interaction. These are different practices, not a claim that a secular exercise reproduces religious experience.',
    '<div class="reflection-prompts"><div>What can I release?<small>Name something beyond your control.</small></div><div>Who can I serve?<small>Let the next action face outward.</small></div><div>What deserves my attention?<small>Leave space for an honest answer.</small></div></div>',
    '<strong>The distinction to keep.</strong> Subjective meaning is not a laboratory demonstration of God, miracles, or a treatment effect. The discussion of quantum mechanics is an analogy; mathematical physics does not prove the theological conclusion. Spiritual experience and neuroscience can be discussed without turning either into proof of the other.',
    '<strong>Roles and self.</strong> Drawing on Hollis and Martha Beck, he holds preparation and responsibility alongside time without an agenda. Let patterns in ordinary work guide your next step rather than waiting for one perfect calling. His closing caution about overoptimization is practical: these habits should leave you more available for life.'
  ],source:'Transcript lines 2230–2873, 3236–3428. Personal testimony and philosophical reflection; not an evidence-graded medical protocol.'},
  {id:'cortisol-story',title:'Cortisol is a rhythm, not a score',label:'MECHANISM CHECK',tone:'amber',preview:'A normal morning rise is not an instruction to make cortisol as high as possible.',body:[
    'Cortisol helps regulate energy availability and participates in the stress response. Its daily rhythm, its level at waking, the rise after waking, and its response to a stressor are related but different measurements.',
    'The PDF rejects the simple causal chain “bigger morning peak → lower nighttime cortisol → better health.” Both unusually high and blunted responses can occur in clinical contexts. A flatter daily curve is associated with some adverse outcomes, but that does not mean everyone with morning fatigue has low cortisol.',
    '<strong>Application:</strong> support sleep, daylight, food, and movement. Do not deliberately create emotional stress, self-diagnose a hormone problem from symptoms, or treat a curve on this site as a lab target. Ordinary stress does not temporarily make you “brain damaged.”'
  ],source:'PDF pp. 4–11, 14–16, 28–33. Transcript lines 139–235, 1340–1445.'},
  {id:'red-light',title:'Red light: interesting, still early',label:'SMALL STUDIES / SPECIFIC DEVICES',tone:'amber',preview:'The glucose number was an area-under-the-curve result. The vision findings were narrow laboratory outcomes.',body:[
    '<strong>Glucose:</strong> a 30-person experiment used a defined 670 nm exposure on the upper back before a glucose drink. The reported 27.7% decrease was integrated glucose elevation over two hours; the peak decrease was 7.5%. The episode conflates these. It was not a diabetes-treatment trial.',
    '<strong>Vision:</strong> small studies of a specific 670 nm device reported improvements in color-contrast sensitivity, mainly in older participants and with morning exposure. That is not proof of better everyday visual acuity, or evidence that any red flashlight is safe to shine into the eyes.',
    '<strong>Cell biology:</strong> local melatonin has antioxidant roles. Claims about light “liberating” it in human cells remain mechanistic or preliminary. Evidence of blue-light mitochondrial harm in flies or retinal models is not proof ordinary indoor LEDs damage human mitochondria at everyday exposure levels.',
    '<strong>Application:</strong> prioritize ordinary outdoor time and comfortable day–night lighting. There is no need to buy a device to follow this guide, and no eye-directed light protocol is recommended here.'
  ],source:'PDF pp. 20–23. Transcript lines 434–603.',links:[['Glucose experiment','https://doi.org/10.1002/jbio.202300521'],['Color-contrast study','https://doi.org/10.1038/s41598-021-02311-1']]},
  {id:'sun-skin',title:'Daylight does not require tanning',label:'LIGHT / UV / LONGEVITY',tone:'amber',preview:'Retinal light timing, vitamin D production, sunburn risk, and hormone claims are separate questions.',body:[
    'The episode discusses sunlight on skin, vitamin D, infrared light in greenery, and possible effects of UVB on sex hormones and libido. The UVB hormone argument comes largely from animal work and limited human observations; the PDF does not support a universal daily UV protocol for hormones or relationships.',
    'A low skin UV index is not a reliable guarantee of low eye exposure. Never look directly at the sun. You can seek outdoor daylight while using appropriate sun protection; you do not need exposed skin to give retinal cells a timing signal.',
    'The Swedish women’s cohort found similar life expectancy in sun-avoiding nonsmokers and the most sun-exposed smokers—not proof that sun makes smoking safe. Activity, health, and socioeconomic differences may confound the association.',
    '<strong>Application:</strong> enjoy outdoor time with appropriate eye and skin protection. Do not use an observational longevity association as a reason to sunburn or to ignore smoking risk.'
  ],source:'PDF pp. 18–19, 23–25. Transcript lines 395–420, 605–660.'},
  {id:'night-light',title:'Bright nights: keep the risk in proportion',label:'OBSERVATIONAL EVIDENCE',tone:'amber',preview:'Long-term light exposure and shift work matter. Checking a screen after 6 p.m. is not the definition of a night-shift worker.',body:[
    'The 88,905-person UK Biobank study linked brighter nights and darker days to higher mortality. The PDF reports about 21% higher relative risk in the brightest-night group in the fully adjusted model. This is not a 21-percentage-point absolute risk increase or proof of causation.',
    'Light was measured at the wrist for one week, and existing illness could influence both outdoor activity and sleep. Night-shift studies typically concern occupational schedules and long exposure histories; the episode’s claim that most such studies are simply about device use after 6 p.m. is misleading.',
    '<strong>Application:</strong> build a workable light–dark contrast and protect sleep. If working nights, get advice tailored to your schedule. Neither fear nor an arbitrary evening clock time is a useful replacement for that.'
  ],source:'PDF pp. 17–19, 25–27. Transcript lines 370–387, 661–756.',links:[['UK Biobank study','https://doi.org/10.1073/pnas.2405924121']]},
  {id:'brain-clearance',title:'Sleep, fluid flow, and the missing leap',label:'GLYMPHATIC RESEARCH',tone:'amber',preview:'Fluid movement is not the same outcome as waste clearance or dementia prevention.',body:[
    'The side-sleeping study measured glymphatic transport in anesthetized rodents. It did not test humans sleeping with a slightly raised pillow. It therefore cannot establish that a specific pillow position prevents dementia or removes bags under the eyes.',
    'The meditation study measured MRI signals related to cerebrospinal fluid in experienced practitioners. It did not directly measure waste removal, nor establish that twenty minutes of meditation replaces an hour of sleep.',
    'Inversion tables, shaking, tapping, and “lymph drainage” are mentioned in the conversation but no validated dementia-prevention protocol is provided. Likewise, a device’s ability to estimate REM is different from a proven ability to generate restorative sleep stages on demand.',
    '<strong>Application:</strong> prioritize comfortable, adequate sleep. Meditate if useful, but do not shorten sleep to compensate for it. Use clinician-recommended positioning for a medical condition.'
  ],source:'PDF pp. 42–43, 53–54. Transcript lines 1811–1841, 3433–3554.',links:[['Rodent posture study','https://doi.org/10.1523/jneurosci.1625-15.2015'],['Meditation MRI study','https://doi.org/10.1073/pnas.2504961122']]},
  {id:'peptides',title:'Peptides are not one category of evidence',label:'EXPERIMENTAL / CLINICIAN TERRITORY',tone:'amber',preview:'Pinealon, epitalon, growth-hormone secretagogues, and BPC-157 are discussed. None becomes a general routine from these anecdotes.',body:[
    '<strong>Pinealon:</strong> he reports increased REM from personal experimentation. The PDF finds no direct human clinical evidence for that REM claim. Epitalon is mentioned for DNA repair, but evidence about a related peptide does not validate Pinealon or a longevity regimen.',
    '<strong>GH secretagogues:</strong> he names tesamorelin, ipamorelin, CJC-1295, and sermorelin, with personal sleep experiences. The PDF distinguishes drugs that stimulate endogenous GH pulses from giving external GH; the blanket claim that secretagogues shut down one’s production is inaccurate. Insulin-sensitivity claims also need compound-specific clinical context.',
    '<strong>BPC-157:</strong> tissue-healing evidence is predominantly animal research with very limited human evidence. Tumor vascularization is a theoretical concern in the review, not a demonstrated human outcome or proof of safety. An unknown lethal dose does not mean a substance is harmless.',
    '<strong>Application:</strong> identify the actual problem and discuss established options with a clinician. This guide gives no peptide sourcing, injection, dosing, or cycling regimen.'
  ],source:'PDF pp. 43–44, 48–50. Transcript lines 1900–2115.'},
  {id:'glp',title:'GLP-1 drugs: separate the approved from the experimental',label:'CLINICAL CARE / EVOLVING EVIDENCE',tone:'amber',preview:'Obesity and diabetes treatment, alcohol-craving research, and fatigue anecdotes are different applications.',body:[
    'Semaglutide activates GLP-1 receptors; tirzepatide activates GIP and GLP-1 receptors. Retatrutide is a triple agonist including glucagon. A drug activating the receptor is not the same as raising the body’s own GLP-1 by a thousandfold.',
    'Retatrutide remains unapproved in the FDA guidance checked for this guide. The PDF separates peer-reviewed studies from company announcements and diabetes trials from obesity trials. A dramatic percentage of weight loss is not a prediction for every person.',
    'The conversation’s very-low-dose GLP use for chronic fatigue is anecdotal, not an established fatigue treatment or validated microdosing schedule. Alcohol-craving findings are promising but mixed and do not establish a general replacement for alcohol-use-disorder care.',
    'Vision risk is more complicated than one anatomical feature: pre-existing diabetic retinopathy and rapid glucose changes matter, and NAION signals are still being evaluated. A normal eye-pressure reading does not rule out every relevant eye problem. Sudden vision loss needs urgent assessment.',
    '<strong>Application:</strong> make prescribing decisions around an actual diagnosis, an approved indication where relevant, and individualized benefit–risk. Do not stop prescribed medication because of the podcast or this summary.'
  ],source:'PDF pp. 44–50. Transcript lines 1938–2209. Regulatory guidance checked September 8, 2026.',links:[['FDA: unapproved GLP-1 products','https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss']]},
  {id:'sitting-glucose',title:'The soleus story and the squatting correction',label:'MOVEMENT / GLUCOSE',tone:'amber',preview:'Muscle activity helps. The impressive laboratory numbers do not transfer directly to ordinary fidgeting.',body:[
    'The soleus is a calf muscle with a useful capacity for sustained oxidative work. The study’s “soleus push-up” was a specifically coached, prolonged seated movement. It reported roughly 52% less glucose excursion and 60% less hyperinsulinemia in that experimental setting.',
    'The comparison highlighted in the PDF used 3-minute squat breaks every 45 minutes, repeated ten times. It did not test just ten air squats at each break. A different brief chair-squat study did not show the same glucose effect.',
    '<strong>Application:</strong> break up sitting and consider a short walk after meals when practical. Do not promise yourself a fixed glucose reduction, chase a perfectly flat glucose line, or assume a bouncing knee reproduces a supervised experiment.'
  ],source:'PDF pp. 54–56. Transcript lines 3734–3818.',links:[['Original soleus experiment','https://doi.org/10.1016/j.isci.2022.104869'],['Frequent movement-break comparison','https://doi.org/10.1111/sms.14628']]},
  {id:'aging',title:'Movement matters. Aging still happens.',label:'METABOLISM / COGNITIVE RESERVE',tone:'amber',preview:'Keeping muscle and staying engaged help. They do not make age-related physiology disappear.',body:[
    'The large energy-expenditure study found adjusted expenditure broadly stable from about age 20 to 60, then declining after 60 even after accounting for fat-free mass. The episode’s “it does not decline if you preserve muscle” conclusion goes too far.',
    'Everyday movement contributes to expenditure, but the episode’s striking extra-calorie examples are not reliable estimates of what pacing or fidgeting will burn for you. No fixed calorie reward is assigned here.',
    'Mentally, physically, and socially active lives may support cognitive reserve. The fact that some people function well despite Alzheimer-type pathology does not make the pathology harmless or guarantee prevention.',
    '<strong>Application:</strong> keep useful movement, strength, learning, and relationships in the week. Measure success by function and consistency, without promising immunity to aging or dementia.'
  ],source:'PDF p. 56. Transcript lines 3183–3232, 3818–3909.',links:[['Pontzer et al.: energy expenditure across life','https://doi.org/10.1126/science.abe5017']]},
  {id:'therapy',title:'Hypnosis, psychedelics, and memory',label:'THERAPIES / CONTEXT MATTERS',tone:'amber',preview:'Clinical approaches, personal experiences, and mechanisms should not be turned into a do-it-yourself treatment.',body:[
    'Clinical hypnosis is discussed through David Spiegel’s work. The PDF finds useful support for some pain and anxiety applications, while smoking-cessation superiority is uncertain. Calling it “self-directed plasticity” is a framing, not a unique proven mechanism.',
    'The speakers describe experiences with psilocybin, MDMA, and DMT, including therapeutic support around some experiences. They provide no complete clinical protocol. A vivid or meaningful experience is not by itself evidence for a general treatment benefit or a claim about external reality.',
    'The research companion also addresses propranolol: some studies concern adrenergic enhancement of emotional memory. That is not erasure of ordinary memories or a reason to stop a beta blocker to learn better. The same caution applies to deliberately seeking extreme stress to consolidate learning.',
    '<strong>Application:</strong> for a treatment goal, work with a qualified clinician and assess the specific intervention. Keep mental-health care separate from an anecdote about someone else’s experimentation.'
  ],source:'PDF pp. 35–40. Transcript lines 1392–1450, 1511–1517, 2213–2336.'},
  {id:'attention-context',title:'Neurological examples are not character judgments',label:'PARKINSON’S / ADHD / ANOREXIA',tone:'amber',preview:'Being able to perform in one special context does not mean someone can simply choose to perform in every context.',body:[
    'Paradoxical kinesia describes rare, temporary improvements in movement in some people with Parkinson’s under unusual conditions. It is not evidence that people with Parkinson’s lack effort, and danger is not a therapy.',
    'A person with ADHD concentrating intensely on an engaging activity does not disprove functional impairments elsewhere. The useful lesson is that context affects attention, not that the condition is just unwillingness.',
    'Anorexia nervosa has a very high mortality risk. The conversation’s comparison between disbelief and “spiritual anorexia” is a rhetorical metaphor, not a diagnosis or a scientific characterization of atheists.',
    '<strong>Application:</strong> change environments thoughtfully, respect individual capacities, and avoid using simplified brain stories to blame people for illness.'
  ],source:'PDF p. 52. Transcript lines 2753–2787, 3183–3232.'},
  {id:'air',title:'Air, breathing, and the room you work in',label:'BRIEF MENTIONS / PRACTICAL CONTEXT',tone:'neutral',preview:'The interview closes with a stuffy room and rising CO₂. This is a ventilation cue, not a personal brain-performance meter.',body:[
    'The host describes the studio CO₂ rising from about 600 to 1,700 ppm and mentions performance concerns around 1,000 ppm. The supplied PDF does not independently review this claim. A single concentration is not a universal threshold for cognitive impairment, and a CO₂ meter is not a carbon-monoxide alarm.',
    'The practical step is to improve ventilation where feasible and safe, or take a break outside. Occupancy, outdoor air, HVAC design, temperature, and other pollutants all affect indoor conditions.',
    'The episode also says mouth breathing deprives the brain of oxygen. That blanket claim is not established here. Persistent nasal obstruction, sleep-related breathing symptoms, or daytime breathlessness merit evaluation; this guide does not recommend mouth taping.',
    'Box breathing and cyclic hyperventilation are named in the breathwork discussion. They are distinct methods: hyperventilation can cause lightheadedness or fainting and is not interchangeable with the gentle sigh demonstration.'
  ],source:'Transcript lines 1525–1557, 3850–3860, 3911–3936. The PDF covers hyperventilation at pp. 40–41, not the studio CO₂ threshold.',links:[['EPA: improving indoor air quality','https://www.epa.gov/indoor-air-quality-iaq/improving-indoor-air-quality']]}
];

const QUIZ = [
  {q:'What is the useful goal of morning light—and what is not the goal?',a:'Give the circadian clock a clear daytime cue. The goal is not to stare at the sun, maximize cortisol, or chase a guaranteed hormone effect.'},
  {q:'Describe a physiological sigh without looking at the guide.',a:'A comfortable nasal inhale, a small second top-up inhale, then a longer, slow exhale through the mouth. Return to normal breathing; do not force it.'},
  {q:'Why is recalling an idea different from rereading it?',a:'Recall asks you to produce the idea without the source. It exposes gaps that familiarity can hide. Check and correct those gaps, then retrieve again later.'},
  {q:'Which two claims should not be used to justify cutting sleep short?',a:'The claims that meditation replaces an hour of sleep and that a device can reliably deliver chosen amounts of deep sleep or REM on demand. The evidence summarized here does not establish either.'},
  {q:'What is the key vitamin D distinction in the episode?',a:'He reports 5,000–10,000 IU/day, but the usual adult upper intake limit is 4,000 IU/day. His personal dose is not a universal recommendation. Higher-dose treatment needs clinical context.'},
  {q:'What makes a practical takeaway different from a proven mechanism?',a:'An action can be useful even when the story explaining it is unproven. For example, drinking enough water is sensible; the claim that morning water boosts cortisol through the vagus nerve is not established.'}
];

const SOURCES = [
  {title:'Brief structured respiration practices',detail:'Balban et al. · 2023 · randomized breathwork trial',url:'https://pubmed.ncbi.nlm.nih.gov/36630953/'},
  {title:'Brighter nights and darker days predict higher mortality risk',detail:'Windred et al. · 2024 · observational UK Biobank cohort',url:'https://doi.org/10.1073/pnas.2405924121'},
  {title:'Gut-microbiota-targeted diets modulate human immune status',detail:'Wastyk et al. · 2021 · published Cell trial; replaces the PDF’s preprint citation',url:'https://doi.org/10.1016/j.cell.2021.06.019'},
  {title:'Phone presence and available cognitive capacity',detail:'Ward et al. · 2017 · two original experiments',url:'https://doi.org/10.1086/691462'},
  {title:'Practice testing and learning',detail:'Adesope et al. · 2017 · meta-analysis',url:'https://doi.org/10.3102/0034654316689306'},
  {title:'Body posture and brain glymphatic transport',detail:'Lee et al. · 2015 · anesthetized-rodent study',url:'https://doi.org/10.1523/jneurosci.1625-15.2015'},
  {title:'Neurofluid circulation during focused-attention meditation',detail:'Keating et al. · 2025 · MRI surrogate measures',url:'https://doi.org/10.1073/pnas.2504961122'},
  {title:'Soleus oxidative metabolism and glucose regulation',detail:'Hamilton et al. · 2022 · specialized laboratory protocol',url:'https://doi.org/10.1016/j.isci.2022.104869'},
  {title:'Daily energy expenditure through the human life course',detail:'Pontzer et al. · 2021 · multi-country lifespan analysis',url:'https://doi.org/10.1126/science.abe5017'},
  {title:'Creatine during sleep deprivation',detail:'Gordji-Nejad et al. · 2024 · experimental cognitive outcomes',url:'https://doi.org/10.1038/s41598-024-54249-9'},
  {title:'Vitamin D: intakes, upper limits, and risks',detail:'NIH Office of Dietary Supplements · clinical reference',url:'https://ods.od.nih.gov/factsheets/VITAMIND/HealthProfessional/'},
  {title:'Unapproved GLP-1 products and retatrutide',detail:'FDA · regulatory and safety reference',url:'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss'}
];

// Recent episode notes: practical synthesis; replay dates refer to the clip release.
const RECENT_EPISODES = [
  {
    "id": "meaning",
    "color": "lilac",
    "icon": "spark",
    "topic": "Meaning & motivation",
    "guest": "Tony Robbins",
    "date": "2026-08-28",
    "displayDate": "28 AUG 2026",
    "format": "Replay clip",
    "title": "Make room for a meaningful life.",
    "summary": "Achievement can leave connection underfed. Robbins uses his six-needs framework to examine what is driving your choices.",
    "chapters": "Replay: 00:00–08:55; 16:30–19:35",
    "steps": [
      [
        "Map your current priorities",
        "Consider certainty, variety, significance, connection, growth, and contribution. Which two get most of your time? Which two would you like to prioritize?"
      ],
      [
        "Change one way you meet a need",
        "If recognition sends you scrolling or comparing, try a direct conversation or useful contribution. Choose a behavior you can actually repeat."
      ],
      [
        "Put meaning on the calendar",
        "Our exercise: schedule one moment of connection and one small act of service this week. Reflect on how they felt, without turning them into another performance score."
      ]
    ],
    "check": "This is a coaching framework and reflection exercise, not a validated diagnostic model. Difficult circumstances and trauma are not explained away by choosing different priorities.",
    "links": [
      [
        "Listen to the replay",
        "https://podcasts.apple.com/ca/podcast/most-replayed-moment-tony-robbins-reveals-the-key-to/id1291423644?i=1000786433892"
      ],
      [
        "Episode transcript",
        "https://podscripts.co/podcasts/the-diary-of-a-ceo-with-steven-bartlett/most-replayed-moment-tony-robbins-reveals-the-key-to-a-meaningful-life"
      ],
      [
        "Robbins’s framework",
        "https://live.tonyrobbins.com/blog/do-you-need-to-feel-significant"
      ]
    ]
  },
  {
    "id": "parenthood",
    "color": "mint",
    "icon": "circle",
    "topic": "Relationships & parenthood",
    "guest": "Dr Darby Saxbe",
    "date": "2026-08-24",
    "displayDate": "24 AUG 2026",
    "format": "Full conversation",
    "title": "Prepare the partnership, too.",
    "summary": "Saxbe’s parenthood conversation offers concrete ways to share care, build support, and protect connection during a major life change.",
    "chapters": "01:05:51–01:15:08 · care, support, communication",
    "steps": [
      [
        "Make the division of care visible",
        "Before a baby arrives, list recurring jobs and agree who owns them. Revisit the plan after birth as feeding, leave, and recovery change what is realistic."
      ],
      [
        "Build support beyond your partner",
        "Name people or local parent groups you can turn to. Make help specific: a meal, an errand, a walk together, or a chance to rest."
      ],
      [
        "Keep learning each other",
        "Take hands-on opportunities to bond with the baby. Our exercise: a brief weekly check-in about what feels hard and one adjustment that would help each person."
      ]
    ],
    "check": "These are relationship practices adapted from the conversation, not a guaranteed outcome. Brain-volume findings do not, by themselves, establish cognitive decline or prove improved efficiency.",
    "links": [
      [
        "Episode & transcript",
        "https://podscripts.co/podcasts/the-diary-of-a-ceo-with-steven-bartlett/the-scientist-who-scans-fathers-brains-parenthood-shrinks-your-brain-and-drops-testosterone-25"
      ],
      [
        "Saxbe’s research lab",
        "https://dornsife.usc.edu/nestlab/"
      ]
    ]
  },
  {
    "id": "recovery",
    "color": "blue",
    "icon": "moon",
    "topic": "Sleep & recovery",
    "guest": "Dr Kristen Holmes",
    "date": "2026-08-21",
    "displayDate": "21 AUG 2026",
    "format": "Replay clip",
    "title": "Make recovery more repeatable.",
    "summary": "The useful thread in this replay: sleep quality depends on everyday timing and habits as well as time in bed.",
    "chapters": "Replay: 06:16–15:50; 18:26–20:21",
    "steps": [
      [
        "Anchor a realistic sleep schedule",
        "Keep bed and wake times as consistent as your responsibilities allow, including weekends. Preserve enough sleep opportunity; consistency does not replace duration."
      ],
      [
        "Move caffeine earlier",
        "Holmes suggests avoiding caffeine within 8–12 hours of sleep. Treat that as her suggestion, not a universal cutoff. Start by moving afternoon caffeine earlier and note any change."
      ],
      [
        "Notice alcohol’s effect",
        "Avoid alcohol near bedtime. Our exercise: record bedtime, awakenings, caffeine timing, and morning energy for a week to spot patterns without chasing a wearable score."
      ]
    ],
    "check": "CDC supports regular schedules and avoiding late caffeine and bedtime alcohol; adults 18–60 generally need at least 7 hours. The replay’s sweeping lifespan and mental-health statistics are not used as established facts here.",
    "links": [
      [
        "Listen to the replay",
        "https://podcasts.apple.com/ca/podcast/most-replayed-moment-better-sleep-doesnt-always-mean/id1291423644?i=1000784723071"
      ],
      [
        "Episode transcript",
        "https://podscripts.co/podcasts/the-diary-of-a-ceo-with-steven-bartlett/most-replayed-moment-better-sleep-doesnt-always-mean-longer-sleep-fix-these-habits-today"
      ],
      [
        "CDC sleep guidance",
        "https://www.cdc.gov/sleep/about/index.html"
      ]
    ]
  },
  {
    "id": "fear",
    "color": "amber",
    "icon": "steps",
    "topic": "Confidence & fear",
    "guest": "Alex Honnold",
    "date": "2026-08-14",
    "displayDate": "14 AUG 2026",
    "format": "Replay clip",
    "title": "Practice the manageable version.",
    "summary": "Honnold describes years of preparation and repeated experience. His account of public speaking offers a useful everyday application.",
    "chapters": "Replay: 02:38–08:10 · practice and fear",
    "steps": [
      [
        "Choose a safe, specific situation",
        "Try asking a question in a meeting or speaking to a small group. Separate ordinary discomfort from an activity that is actually dangerous."
      ],
      [
        "Build a small ladder",
        "Our example: rehearse aloud → explain to a friend → speak briefly to a group. Begin with a manageable step and repeat it before increasing difficulty."
      ],
      [
        "Compare the prediction with the outcome",
        "Write what you expected, what happened, and what you learned. Progress means building experience; it does not require feeling completely fearless."
      ]
    ],
    "check": "NHS guidance supports gradually facing safe feared situations. Honnold’s experience is not a clinical trial or a reason to copy high-risk climbing. Seek qualified support for severe anxiety or trauma-related fears.",
    "links": [
      [
        "Listen to the replay",
        "https://podcasts.apple.com/my/podcast/most-replayed-moment-fear-is-a-skill-you-can-train/id1291423644?i=1000783252101"
      ],
      [
        "Episode transcript",
        "https://podscripts.co/podcasts/the-diary-of-a-ceo-with-steven-bartlett/most-replayed-moment-fear-is-a-skill-you-can-train-lessons-from-the-worlds-greatest-climber"
      ],
      [
        "NHS: facing fears",
        "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/facing-your-fears/"
      ]
    ]
  },
  {
    "id": "sleep-quality",
    "color": "lime",
    "icon": "focus",
    "topic": "Sleep quality & nutrition",
    "guest": "Dr Andy Galpin",
    "date": "2026-08-13",
    "displayDate": "13 AUG 2026",
    "format": "Full conversation",
    "title": "Investigate the bottleneck.",
    "summary": "More tracking and more supplements can miss the real problem. Galpin discusses sleep disorders, wearable limits, and basic nutrition.",
    "chapters": "08:33–20:30 · sleep; 01:02:35–01:13:55 · cholesterol",
    "steps": [
      [
        "Bring persistent symptoms to a clinician",
        "Frequent loud snoring, witnessed breathing pauses, gasping, or persistent daytime sleepiness deserve assessment. A questionnaire or wearable can flag a concern; neither replaces diagnosis."
      ],
      [
        "Use the tracker as a clue",
        "Look at broad patterns alongside how you feel. Avoid treating a single night’s deep-sleep or REM estimate as a precise measurement or a verdict on your health."
      ],
      [
        "Add a food source of fibre",
        "Try oats, beans, lentils, vegetables, or whole grains in a usual meal. The companion corrects his approximate fibre target to 14 g per 1,000 kcal; increase gradually as tolerated."
      ]
    ],
    "check": "The research companion qualifies wearable accuracy by device and study. Fibre can modestly help cholesterol; it does not replace indicated medication. Sleep symptoms require clinical evaluation, not a supplement stack.",
    "links": [
      [
        "Listen to the episode",
        "https://podcasts.apple.com/de/podcast/fat-loss-scientist-its-easy-to-lose-weight-but-heres/id1291423644?i=1000783070620"
      ],
      [
        "DOAC research · pp. 3–7, 19–20",
        "https://stevenbartlett.com/wp-content/uploads/2026/08/DOAC-Andy-Galpin-Independent-Research-Further-Reading.pdf"
      ],
      [
        "NIH: sleep-apnea symptoms",
        "https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms"
      ]
    ]
  }
];
