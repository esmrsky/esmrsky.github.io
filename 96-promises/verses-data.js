/**
 * Complete 96 Bible Verses Dataset - Dynamic Multi-Translation Context & Interlinear Lexicon Edition
 */

const BIBLE_VERSES = [
  {
    "id": 1,
    "ref": "Psalm 16:11",
    "book": "Psalms",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "sparkles",
    "bentoSpan": "tall",
    "keyPhrase": "In your presence there is fullness of joy",
    "themeColor": "amber",
    "translations": {
      "NIV": "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
      "TPT": "For you bring me a continual revelation of resurrection life, the path to the bliss that brings me face-to-face with you. Where we have the sweetest fellowship and pleasures that will never end.",
      "NLT": "You will show me the way of life, granting me the joy of your presence and the pleasures of living with you forever.",
      "NASB": "You will make known to me the way of life; in Your presence is fullness of joy; in Your right hand there are pleasures forever."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 16 \u2014 David's Miktam of Inheritance & Resurrection Joy",
      "chapterSummary": "David celebrates Yahweh as his supreme portion and cup, culminating in the triumphant prophecy of bodily resurrection and fullness of joy.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "8",
              "text": "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken."
            },
            {
              "num": "9",
              "text": "Therefore my heart is glad and my tongue rejoices; my body also will rest secure,"
            },
            {
              "num": "10",
              "text": "because you will not abandon me to the realm of the dead, nor will you let your faithful one see decay."
            }
          ],
          "target": {
            "num": "11",
            "text": "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand."
          },
          "after": [
            {
              "num": "17:1",
              "text": "Hear me, Lord, my plea is just; listen to my cry. Hear my prayer\u2014it does not rise from deceitful lips."
            },
            {
              "num": "17:2",
              "text": "Let my vindication come from you; may your eyes see what is right."
            },
            {
              "num": "17:3",
              "text": "Though you probe my heart, though you examine me at night and test me, you will find that I have planned no evil."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "8",
              "text": "Because I set Yahweh always before me, He is at my right hand and I will never be shaken."
            },
            {
              "num": "9",
              "text": "My heart is overflowing with joyful ecstasy, my glory breaks forth into song, and my physical body rests safely in hope."
            },
            {
              "num": "10",
              "text": "For You will never leave my soul in the depths of the grave, nor will You allow Your Holy One to see corruption."
            }
          ],
          "target": {
            "num": "11",
            "text": "For you bring me a continual revelation of resurrection life, the path to the bliss that brings me face-to-face with you. Where we have the sweetest fellowship and pleasures that will never end."
          },
          "after": [
            {
              "num": "17:1",
              "text": "Hear my righteous cry, O Lord! Listen attentively to my pleading, for my prayer comes from an authentic heart."
            },
            {
              "num": "17:2",
              "text": "Let my vindication issue directly from Your throne, for Your eyes behold equity and truth."
            },
            {
              "num": "17:3",
              "text": "You have scrutinized my innermost heart in the dark night; You have refined me and found nothing impure."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "8",
              "text": "I know the Lord is always with me. I will not be shaken, for he is right beside me."
            },
            {
              "num": "9",
              "text": "No wonder my heart is glad, and I rejoice. My body rests in safety."
            },
            {
              "num": "10",
              "text": "For you will not leave my soul among the dead or allow your holy one to rot in the grave."
            }
          ],
          "target": {
            "num": "11",
            "text": "You will show me the way of life, granting me the joy of your presence and the pleasures of living with you forever."
          },
          "after": [
            {
              "num": "17:1",
              "text": "O Lord, hear my plea for fairness. Listen to my cry for help. Pay attention to my prayer, for it comes from honest lips."
            },
            {
              "num": "17:2",
              "text": "Declare me innocent, for you see those who do right."
            },
            {
              "num": "17:3",
              "text": "You have tested my thoughts and examined my heart in the night. You have scrutinized me and found nothing wrong."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "8",
              "text": "I have set the Lord continually before me; Because He is at my right hand, I will not be shaken."
            },
            {
              "num": "9",
              "text": "Therefore my heart is glad and my glory rejoices; My flesh also will dwell securely."
            },
            {
              "num": "10",
              "text": "For You will not abandon my soul to Sheol; Nor will You allow Your Holy One to undergo decay."
            }
          ],
          "target": {
            "num": "11",
            "text": "You will make known to me the way of life; in Your presence is fullness of joy; in Your right hand there are pleasures forever."
          },
          "after": [
            {
              "num": "17:1",
              "text": "Hear a just cause, O Lord, give heed to my cry; Give ear to my prayer, which is not from deceitful lips."
            },
            {
              "num": "17:2",
              "text": "Let my judgment come forth from Your presence; Let Your eyes look with equity."
            },
            {
              "num": "17:3",
              "text": "You have tried my heart; You have visited me by night; You have tested me and You find nothing."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "You make known to me the [path of life]{H7307}; you will fill me with [joy in your presence]{H7654}, with [eternal pleasures]{H5273} at your right hand.",
        "TPT": "For you bring me a continual revelation of [resurrection life]{H7307}, the path to the bliss that brings me [face-to-face with you]{H7654}. Where we have the [sweetest fellowship and pleasures]{H5273} that will never end.",
        "NLT": "You will show me the [way of life]{H7307}, granting me the [joy of your presence]{H7654} and the [pleasures of living with you]{H5273} forever.",
        "NASB": "You will make known to me the [way of life]{H7307}; In Your presence is [fullness of joy]{H7654}; In Your right hand there are [pleasures forever]{H5273}."
      },
      "keyTerms": [
        {
          "strongs": "H7654 & H8057",
          "word": "\u05e9\u05b9\u05c2\u05d1\u05b7\u05e2 \u05e9\u05b0\u05c2\u05de\u05b8\u05d7\u05d5\u05b9\u05ea",
          "transliteration": "\u015b\u014d\u1e07a\u02bb \u015bim\u1e25\u014d\u1e6f (sova simchot)",
          "pronunciation": "so'-vah sim-khote'",
          "partOfSpeech": "Noun Masculine & Noun Feminine Plural",
          "matchedEnglish": "joy in your presence / fullness of joy",
          "root": "From saba (to be sated to overflowing) + samach (to brighten, exult)",
          "definition": "The sum total and highest conceivable intensity of delight and satisfaction in God's immediate manifest presence.",
          "usageInPassage": "Points directly to Christ's resurrection victory where joy is unbroken and perpetual (Acts 2:28)."
        },
        {
          "strongs": "H5273",
          "word": "\u05e0\u05b0\u05e2\u05b4\u05d9\u05de\u05d5\u05b9\u05ea",
          "transliteration": "n\u0259\u2018\u00eem\u014d\u1e6f (ne'imot)",
          "pronunciation": "neh-ee-mote'",
          "partOfSpeech": "Noun Feminine Plural",
          "matchedEnglish": "eternal pleasures / pleasures forever",
          "root": "From na'em (to be delightful, sweet, lovely)",
          "definition": "Exquisite pleasures, sweet harmonies, and delightful inheritances that never fade or decay.",
          "usageInPassage": "Describes the perpetual delights at the Father's right hand where believers are seated in Christ."
        },
        {
          "strongs": "H7307 / H734",
          "word": "\u05d0\u05b9\u05e8\u05b7\u05d7 \u05d7\u05b7\u05d9\u05b4\u05bc\u05d9\u05dd",
          "transliteration": "\u2019\u014dra\u1e25 \u1e25ayy\u00eem (orach chayyim)",
          "pronunciation": "o'-rakh khah-yeem'",
          "partOfSpeech": "Noun Construct",
          "matchedEnglish": "path of life / way of life",
          "root": "From arach (to travel) + chai (living, active, vigorous)",
          "definition": "The divine trajectory of immortality and indestructible vitality that escapes Sheol.",
          "usageInPassage": "The resurrection path pioneered by Jesus for all who believe."
        }
      ],
      "theologicalSummary": "David prophetically reveals that true joy is relational, not circumstantial. In the Septuagint and Acts 2:28, Peter translates 'sova simchot' as 'pl\u0113roseis me euphrosyn\u0113s meta tou pros\u014dpou sou'\u2014being filled to the brim with joyful gladness in the presence of the Father's face."
    },
    "crossReferencesList": [
      {
        "ref": "Acts 2:25\u201328",
        "text": "Peter quotes Psalm 16:11 at Pentecost to announce Christ's triumphant resurrection and eternal gladness.",
        "linkedVerseId": 1
      },
      {
        "ref": "Hebrews 12:2",
        "text": "For the joy set before Him, Jesus endured the cross, despising its shame, and sat down at the right hand of God.",
        "linkedVerseId": 19
      },
      {
        "ref": "John 15:11",
        "text": "I have told you this so that my joy may be in you and that your joy may be complete.",
        "linkedVerseId": 27
      },
      {
        "ref": "Romans 14:17",
        "text": "For the kingdom of God is not eating and drinking, but righteousness, peace and joy in the Holy Spirit.",
        "linkedVerseId": 14
      }
    ]
  },
  {
    "id": 2,
    "ref": "Psalm 37:19",
    "book": "Psalms",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "wheat",
    "bentoSpan": "standard",
    "keyPhrase": "In days of famine they will enjoy plenty",
    "themeColor": "emerald",
    "translations": {
      "NIV": "In times of disaster they will not wither; in days of famine they will enjoy plenty.",
      "TPT": "When hard times come, they\u2019ll not be ashamed, and in days of famine they will feast on plenty.",
      "NLT": "They will not be disgraced in hard times; even in famine they will have more than enough.",
      "NASB": "They will not be ashamed in the time of evil, and in the days of famine they will have abundance."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 37 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 37:19 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "In times of disaster they will not wither; in days of famine they will enjoy plenty."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19",
            "text": "When hard times come, they\u2019ll not be ashamed, and in days of famine they will feast on plenty."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "They will not be disgraced in hard times; even in famine they will have more than enough."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "They will not be ashamed in the time of evil, and in the days of famine they will have abundance."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "In times of disaster they will [not wither / not be ashamed]{H954}; in [days of famine]{H7458} they will [enjoy plenty / be satisfied]{H7646}.",
        "TPT": "When hard times come, they'll [not be ashamed]{H954}, and in the [days of famine]{H7458} they will be [abundantly satisfied]{H7646}.",
        "NLT": "They will [not be disgraced]{H954} in hard times; even in [famine]{H7458} they will have [more than enough]{H7646}.",
        "NASB": "They will [not be ashamed]{H954} in the time of evil, and in the [days of famine]{H7458} they will have [abundance]{H7646}."
      },
      "keyTerms": [
        {
          "strongs": "H954",
          "word": "\u05dc\u05b9\u05d0\u05be\u05d9\u05b5\u05d1\u05b9\u05e9\u05c1\u05d5\u05bc",
          "transliteration": "l\u014d\u2019-y\u0113\u1e07\u014d\u0161\u00fb (lo yevoshu)",
          "pronunciation": "lo yeh-vo'-shoo",
          "partOfSpeech": "Negative Particle + Verb Qal Imperfect",
          "matchedEnglish": "not wither / not be ashamed / not be disgraced",
          "root": "From bosh (to be disappointed, confounded, or fail of expectations)",
          "definition": "They shall never suffer embarrassment, disappointment, or public ruin because God is their guarantee.",
          "usageInPassage": "Covenant security protecting believers from anxiety during societal and financial collapse."
        },
        {
          "strongs": "H7458",
          "word": "\u05e8\u05b8\u05e2\u05b8\u05d1",
          "transliteration": "r\u0101\u2018\u0101\u1e07 (ra'av)",
          "pronunciation": "raw-awb'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "days of famine / famine",
          "root": "From ra'ev (to hunger, crave food)",
          "definition": "Severe economic drought, agricultural crisis, extreme national scarcity.",
          "usageInPassage": "The harshest external environment is powerless against God's supernatural supply line."
        },
        {
          "strongs": "H7646",
          "word": "\u05d9\u05b4\u05e9\u05b0\u05c2\u05d1\u05b8\u05bc\u05e2\u05d5\u05bc",
          "transliteration": "yi\u015bb\u0101\u2018\u00fb (yisba'u)",
          "pronunciation": "yis-baw'-oo",
          "partOfSpeech": "Verb Qal Imperfect",
          "matchedEnglish": "enjoy plenty / abundantly satisfied / have abundance",
          "root": "From saba (to be filled to the utmost satisfaction, to feast)",
          "definition": "To have surplus, to eat to total contentment, to experience overflow while the world starves.",
          "usageInPassage": "Supernatural covenant abundance in direct contrast to worldly recession."
        }
      ],
      "theologicalSummary": "Under God's covenant of grace, the believer's supply is not tied to natural market forces. In Christ, God supplies every need according to His riches in glory (Phil 4:19)."
    },
    "crossReferencesList": [
      {
        "ref": "Philippians 4:19",
        "text": "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
        "linkedVerseId": 12
      },
      {
        "ref": "1 Kings 17:14\u201316",
        "text": "The jar of flour was not used up and the jug of oil did not run dry in the middle of severe drought.",
        "linkedVerseId": 5
      },
      {
        "ref": "Psalm 33:18\u201319",
        "text": "The eyes of the Lord are on those who fear him, to keep them alive in famine.",
        "linkedVerseId": 2
      },
      {
        "ref": "2 Corinthians 9:8",
        "text": "God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.",
        "linkedVerseId": 12
      }
    ]
  },
  {
    "id": 3,
    "ref": "Psalm 17:15",
    "book": "Psalms",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "sun",
    "bentoSpan": "standard",
    "keyPhrase": "When I awake, I will be satisfied with seeing your likeness",
    "themeColor": "amber",
    "translations": {
      "NIV": "As for me, I will be vindicated and will see your face; when I awake, I will be satisfied with seeing your likeness.",
      "TPT": "As for me, because I am innocent I will see your face until now and forever! When I awake, I will be fully satisfied seeing your likeness.",
      "NLT": "Because I am righteous, I will see you. When I awake, I will see you face to face and be satisfied.",
      "NASB": "As for me, I shall behold Your face in righteousness; I will be satisfied with Your likeness when I awake."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 17 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 17:15 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "As for me, I will be vindicated and will see your face; when I awake, I will be satisfied with seeing your likeness."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "15",
            "text": "As for me, because I am innocent I will see your face until now and forever! When I awake, I will be fully satisfied seeing your likeness."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "Because I am righteous, I will see you. When I awake, I will see you face to face and be satisfied."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "As for me, I shall behold Your face in righteousness; I will be satisfied with Your likeness when I awake."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 17:15.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 17:15.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 17:15.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 17:15."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 17:15."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 17:15 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 4,
    "ref": "Isaiah 55:12",
    "book": "Isaiah",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "mountain",
    "bentoSpan": "wide",
    "keyPhrase": "You will go out in joy and be led forth in peace",
    "themeColor": "amber",
    "translations": {
      "NIV": "You will go out in joy and be led forth in peace; the mountains and hills will burst into song before you, and all the trees of the field will clap their hands.",
      "TPT": "You will go out with celebration and be guided with peace. The mountains and the hills will erupt with singing before you, and all the trees of the forest will clap their hands in praise!",
      "NLT": "You will live in joy and peace. The mountains and hills will burst into song, and the trees of the field will clap their hands!",
      "NASB": "For you will go out with joy and be led forth with peace; the mountains and the hills will break forth into shouts of joy before you, and all the trees of the field will clap their hands."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 55 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 55:12 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "You will go out in joy and be led forth in peace; the mountains and hills will burst into song before you, and all the trees of the field will clap their hands."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "12",
            "text": "You will go out with celebration and be guided with peace. The mountains and the hills will erupt with singing before you, and all the trees of the forest will clap their hands in praise!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "You will live in joy and peace. The mountains and hills will burst into song, and the trees of the field will clap their hands!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "For you will go out with joy and be led forth with peace; the mountains and the hills will break forth into shouts of joy before you, and all the trees of the field will clap their hands."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 55:12.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 55:12.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 55:12.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 55:12."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 55:12."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 55:12 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 5,
    "ref": "Deuteronomy 8:18",
    "book": "Deuteronomy",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "coins",
    "bentoSpan": "standard",
    "keyPhrase": "He gives you the ability to produce wealth",
    "themeColor": "emerald",
    "translations": {
      "NIV": "But remember the LORD your God, for it is he who gives you the ability to produce wealth, and so confirms his covenant, which he swore to your ancestors, as it is today.",
      "TPT": "Always remember the LORD your God, for he is the one who gives you the ability and power to gain wealth, in order to fulfill the covenant he swore to your fathers, as it is this day.",
      "NLT": "Remember the LORD your God. He is the one who gives you power to be successful, in order to fulfill the covenant he confirmed to your ancestors with an oath.",
      "NASB": "But you are to remember the LORD your God, for it is He who is giving you power to make wealth, that He may confirm His covenant which He swore to your fathers, as it is this day."
    },
    "dynamicContext": {
      "chapterTitle": "Deuteronomy 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Deuteronomy 8:18 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "But remember the LORD your God, for it is he who gives you the ability to produce wealth, and so confirms his covenant, which he swore to your ancestors, as it is today."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "18",
            "text": "Always remember the LORD your God, for he is the one who gives you the ability and power to gain wealth, in order to fulfill the covenant he swore to your fathers, as it is this day."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "Remember the LORD your God. He is the one who gives you power to be successful, in order to fulfill the covenant he confirmed to your ancestors with an oath."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "But you are to remember the LORD your God, for it is He who is giving you power to make wealth, that He may confirm His covenant which He swore to your fathers, as it is this day."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Deuteronomy 8:18.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Deuteronomy 8:18.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Deuteronomy 8:18.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Deuteronomy 8:18."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Deuteronomy 8:18."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Deuteronomy 8:18 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 6,
    "ref": "Deuteronomy 28:1\u201314",
    "book": "Deuteronomy",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "crown",
    "bentoSpan": "hero",
    "keyPhrase": "The LORD will make you the head, not the tail; you will always be on top",
    "themeColor": "emerald",
    "translations": {
      "NIV": "If you fully obey the LORD your God and carefully follow all his commands... All these blessings will come on you and accompany you: You will be blessed in the city and blessed in the country. The fruit of your womb will be blessed, and the crops of your land and the young of your livestock... You will be blessed when you come in and blessed when you go out. The LORD will grant that the enemies who rise up against you will be defeated before you... The LORD will open the heavens, the storehouse of his bounty, to send rain on your land in season and to bless all the work of your hands. You will lend to many nations but will borrow from none. The LORD will make you the head, not the tail.",
      "TPT": "If you listen diligently to the voice of Yahweh your God, being careful to do all his commands... All these blessings will come upon you and overtake you! You will be blessed in the city and blessed in the field. Blessed will be the fruit of your body, the yield of your ground, and the fruit of your herds... Blessed shall you be when you come in, and blessed shall you be when you go out. Yahweh will cause your enemies who rise against you to be defeated before your face... Yahweh will command the blessing upon you in your storehouses and in all that you undertake. The Lord will establish you as a holy people to himself, and make you the head and not the tail; you shall be above only and not beneath!",
      "NLT": "If you fully obey the LORD your God and carefully keep all his commands... all these blessings will come on you and accompany you: You will be blessed in your towns and blessed in your fields. Your children and your crops and your herds of cattle and flocks of sheep and goats will be blessed. Your fruit baskets and breadboards will be blessed. Wherever you go and whatever you do, you will be blessed. The LORD will conquer your enemies when they attack you... The LORD will send a blessing on your barns and on everything you put your hand to. The LORD will make you the head and not the tail, and you will always be on top and never at the bottom.",
      "NASB": "Now it shall be, if you diligently obey the LORD your God, being careful to do all His commandments... all these blessings will come upon you and overtake you: Blessed shall you be in the city, and blessed shall you be in the country. Blessed shall be the offspring of your body and the produce of your ground... Blessed shall you be when you come in, and blessed shall you be when you go out. The LORD will cause your enemies who rise up against you to be defeated before you... The LORD will open for you His good storehouse, the heavens, to give rain to your land in its season and to bless all the work of your hand; and you shall lend to many nations, but you shall not borrow. The LORD will make you the head and not the tail."
    },
    "dynamicContext": {
      "chapterTitle": "Deuteronomy 28 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Deuteronomy 28:1\u201314 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1\u201314",
            "text": "If you fully obey the LORD your God and carefully follow all his commands... All these blessings will come on you and accompany you: You will be blessed in the city and blessed in the country. The fruit of your womb will be blessed, and the crops of your land and the young of your livestock... You will be blessed when you come in and blessed when you go out. The LORD will grant that the enemies who rise up against you will be defeated before you... The LORD will open the heavens, the storehouse of his bounty, to send rain on your land in season and to bless all the work of your hands. You will lend to many nations but will borrow from none. The LORD will make you the head, not the tail."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1\u201314",
            "text": "If you listen diligently to the voice of Yahweh your God, being careful to do all his commands... All these blessings will come upon you and overtake you! You will be blessed in the city and blessed in the field. Blessed will be the fruit of your body, the yield of your ground, and the fruit of your herds... Blessed shall you be when you come in, and blessed shall you be when you go out. Yahweh will cause your enemies who rise against you to be defeated before your face... Yahweh will command the blessing upon you in your storehouses and in all that you undertake. The Lord will establish you as a holy people to himself, and make you the head and not the tail; you shall be above only and not beneath!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1\u201314",
            "text": "If you fully obey the LORD your God and carefully keep all his commands... all these blessings will come on you and accompany you: You will be blessed in your towns and blessed in your fields. Your children and your crops and your herds of cattle and flocks of sheep and goats will be blessed. Your fruit baskets and breadboards will be blessed. Wherever you go and whatever you do, you will be blessed. The LORD will conquer your enemies when they attack you... The LORD will send a blessing on your barns and on everything you put your hand to. The LORD will make you the head and not the tail, and you will always be on top and never at the bottom."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1\u201314",
            "text": "Now it shall be, if you diligently obey the LORD your God, being careful to do all His commandments... all these blessings will come upon you and overtake you: Blessed shall you be in the city, and blessed shall you be in the country. Blessed shall be the offspring of your body and the produce of your ground... Blessed shall you be when you come in, and blessed shall you be when you go out. The LORD will cause your enemies who rise up against you to be defeated before you... The LORD will open for you His good storehouse, the heavens, to give rain to your land in its season and to bless all the work of your hand; and you shall lend to many nations, but you shall not borrow. The LORD will make you the head and not the tail."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Deuteronomy 28:1\u201314.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Deuteronomy 28:1\u201314.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Deuteronomy 28:1\u201314.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Deuteronomy 28:1\u201314."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Deuteronomy 28:1\u201314."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Deuteronomy 28:1\u201314 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 7,
    "ref": "Psalm 32:8",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Guidance",
    "icon": "compass",
    "bentoSpan": "standard",
    "keyPhrase": "I will instruct you and teach you in the way you should go",
    "themeColor": "cyan",
    "translations": {
      "NIV": "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
      "TPT": "I hear the Lord saying, 'I will stay close to you, instructing and guiding you along the pathway for your life. I will advise you and watch over you with my loving eye.'",
      "NLT": "The LORD says, 'I will guide you along the best pathway for your life. I will advise you and watch over you.'",
      "NASB": "I will instruct you and teach you in the way which you should go; I will advise you with My eye upon you."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 32 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 32:8 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8",
            "text": "I hear the Lord saying, 'I will stay close to you, instructing and guiding you along the pathway for your life. I will advise you and watch over you with my loving eye.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "The LORD says, 'I will guide you along the best pathway for your life. I will advise you and watch over you.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "I will instruct you and teach you in the way which you should go; I will advise you with My eye upon you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 32:8.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 32:8.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 32:8.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 32:8."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 32:8."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 32:8 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 8,
    "ref": "Isaiah 41:10",
    "book": "Isaiah",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield",
    "bentoSpan": "wide",
    "keyPhrase": "Do not fear, for I am with you; I will uphold you with my righteous right hand",
    "themeColor": "rose",
    "translations": {
      "NIV": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      "TPT": "Do not yield to fear, for I am always near. Never turn your gaze away, for I am your God. I will strengthen you; yes, I will help you. I will hold you tight in my hand of victory and righteousness.",
      "NLT": "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand.",
      "NASB": "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you, I will also help you, I will also uphold you with My righteous right hand."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 41 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 41:10 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "10",
            "text": "Do not yield to fear, for I am always near. Never turn your gaze away, for I am your God. I will strengthen you; yes, I will help you. I will hold you tight in my hand of victory and righteousness."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you, I will also help you, I will also uphold you with My righteous right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 41:10.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 41:10.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 41:10.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 41:10."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 41:10."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 41:10 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 9,
    "ref": "Jeremiah 17:7\u20138",
    "book": "Jeremiah",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "tree",
    "bentoSpan": "tall",
    "keyPhrase": "Like a tree planted by the water that never fails to bear fruit",
    "themeColor": "emerald",
    "translations": {
      "NIV": "But blessed is the one who trusts in the LORD, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream. It does not fear when heat comes; its leaves are always green. It has no worries in a year of drought and never fails to bear fruit.",
      "TPT": "Blessed is the man who believes in and relies on Yahweh, whose confidence is in Yahweh. For he will be like a tree planted by the waters, spreading out its roots by the river. It will not fear when heat comes; its leaves will be green. It will not be anxious in the year of drought, nor cease from yielding fruit.",
      "NLT": "But blessed are those who trust in the LORD and have made the LORD their hope and confidence. They are like trees planted along a riverbank, with roots that reach deep into the water. Such trees are not bothered by the heat or worried by long months of drought. Their leaves stay green, and they never stop producing fruit.",
      "NASB": "Blessed is the man who trusts in the LORD, and whose trust is the LORD. For he will be like a tree planted by the water, that extends its roots by a stream, and does not fear when the heat comes; but its leaves will be green, and it will not be anxious in a year of drought, nor cease to yield fruit."
    },
    "dynamicContext": {
      "chapterTitle": "Jeremiah 17 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Jeremiah 17:7\u20138 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "But blessed is the one who trusts in the LORD, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream. It does not fear when heat comes; its leaves are always green. It has no worries in a year of drought and never fails to bear fruit."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "Blessed is the man who believes in and relies on Yahweh, whose confidence is in Yahweh. For he will be like a tree planted by the waters, spreading out its roots by the river. It will not fear when heat comes; its leaves will be green. It will not be anxious in the year of drought, nor cease from yielding fruit."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "But blessed are those who trust in the LORD and have made the LORD their hope and confidence. They are like trees planted along a riverbank, with roots that reach deep into the water. Such trees are not bothered by the heat or worried by long months of drought. Their leaves stay green, and they never stop producing fruit."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "Blessed is the man who trusts in the LORD, and whose trust is the LORD. For he will be like a tree planted by the water, that extends its roots by a stream, and does not fear when the heat comes; but its leaves will be green, and it will not be anxious in a year of drought, nor cease to yield fruit."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Jeremiah 17:7\u20138.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Jeremiah 17:7\u20138.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Jeremiah 17:7\u20138.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Jeremiah 17:7\u20138."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Jeremiah 17:7\u20138."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Jeremiah 17:7\u20138 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 10,
    "ref": "Isaiah 58:11\u201312",
    "book": "Isaiah",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "droplet",
    "bentoSpan": "wide",
    "keyPhrase": "You will be called Repairer of Broken Walls, Restorer of Streets",
    "themeColor": "purple",
    "translations": {
      "NIV": "The LORD will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame. You will be like a well-watered garden, like a spring whose waters never fail. Your people will rebuild the ancient ruins and will raise up the age-old foundations; you will be called Repairer of Broken Walls, Restorer of Streets with Dwellings.",
      "TPT": "Yahweh will always guide you and satisfy you even in the parched places. He will strengthen your bones, and you will become like a watered garden, like a spring of water whose waters never fail. You will rebuild the ancient ruins and raise up the foundations of bygone generations. You will be called 'Restorer of the Broken Walls,' 'Repairer of Streets to Dwell In.'",
      "NLT": "The LORD will guide you continually, giving you water when you are dry and restoring your strength. You will be like a well-watered garden, like an ever-flowing spring. Some of you will rebuild the deserted ruins of your cities. Then you will be known as a rebuilder of walls and a restorer of homes.",
      "NASB": "And the LORD will continually guide you, and satisfy your desire in scorched places, and give strength to your bones; and you will be like a watered garden, and like a spring of water whose waters do not fail. Those from among you will rebuild the ancient ruins; you will raise up the age-old foundations; and you will be called the repairer of the breach, the restorer of the streets in which to dwell."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 58 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 58:11\u201312 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "11\u201312",
            "text": "The LORD will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame. You will be like a well-watered garden, like a spring whose waters never fail. Your people will rebuild the ancient ruins and will raise up the age-old foundations; you will be called Repairer of Broken Walls, Restorer of Streets with Dwellings."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "11\u201312",
            "text": "Yahweh will always guide you and satisfy you even in the parched places. He will strengthen your bones, and you will become like a watered garden, like a spring of water whose waters never fail. You will rebuild the ancient ruins and raise up the foundations of bygone generations. You will be called 'Restorer of the Broken Walls,' 'Repairer of Streets to Dwell In.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "11\u201312",
            "text": "The LORD will guide you continually, giving you water when you are dry and restoring your strength. You will be like a well-watered garden, like an ever-flowing spring. Some of you will rebuild the deserted ruins of your cities. Then you will be known as a rebuilder of walls and a restorer of homes."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "11\u201312",
            "text": "And the LORD will continually guide you, and satisfy your desire in scorched places, and give strength to your bones; and you will be like a watered garden, and like a spring of water whose waters do not fail. Those from among you will rebuild the ancient ruins; you will raise up the age-old foundations; and you will be called the repairer of the breach, the restorer of the streets in which to dwell."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 58:11\u201312.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 58:11\u201312.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 58:11\u201312.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 58:11\u201312."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 58:11\u201312."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 58:11\u201312 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 11,
    "ref": "Psalm 37:25\u201326",
    "book": "Psalms",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "heart-handshake",
    "bentoSpan": "standard",
    "keyPhrase": "I have never seen the righteous forsaken or their children begging bread",
    "themeColor": "emerald",
    "translations": {
      "NIV": "I was young and now I am old, yet I have never seen the righteous forsaken or their children begging bread. They are always generous and lend freely; their children are a blessing.",
      "TPT": "I was once young, but now I\u2019m old, and not once have I ever seen the godly forsaken, nor have I seen their children begging for bread. They are always generous and lend freely; their children are a blessing to all.",
      "NLT": "Once I was young, and now I am old. Yet I have never seen the godly abandoned or their children begging for bread. The godly always give generous loans to others, and their children are a blessing.",
      "NASB": "I have been young and now I am old, yet I have not seen the righteous forsaken or his descendants begging bread. All day long he is gracious and lends, and his descendants are a blessing."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 37 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 37:25\u201326 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "25\u201326",
            "text": "I was young and now I am old, yet I have never seen the righteous forsaken or their children begging bread. They are always generous and lend freely; their children are a blessing."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "25\u201326",
            "text": "I was once young, but now I\u2019m old, and not once have I ever seen the godly forsaken, nor have I seen their children begging for bread. They are always generous and lend freely; their children are a blessing to all."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "25\u201326",
            "text": "Once I was young, and now I am old. Yet I have never seen the godly abandoned or their children begging for bread. The godly always give generous loans to others, and their children are a blessing."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "25\u201326",
            "text": "I have been young and now I am old, yet I have not seen the righteous forsaken or his descendants begging bread. All day long he is gracious and lends, and his descendants are a blessing."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 37:25\u201326.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 37:25\u201326.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 37:25\u201326.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 37:25\u201326."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 37:25\u201326."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 37:25\u201326 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 12,
    "ref": "2 Corinthians 9:10\u201311",
    "book": "2 Corinthians",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "sprout",
    "bentoSpan": "wide",
    "keyPhrase": "Enriched in every way so that you can be generous on every occasion",
    "themeColor": "emerald",
    "translations": {
      "NIV": "Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness. You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God.",
      "TPT": "This generous God who supplies abundant seed to the farmer, which becomes bread for our meals, will even more extravagantly supply you with all you need. He will multiply what you produce and brew a harvest of righteousness in you and through you. You will be abundantly enriched in every way so that you can give generously on every occasion.",
      "NLT": "For God is the one who provides seed for the farmer and then bread to eat. In the same way, he will provide and increase your resources and then produce a great harvest of generosity in you. Yes, you will be enriched in every way so that you can always be generous.",
      "NASB": "Now He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness; you will be enriched in everything for all liberality, which through us is producing thanksgiving to God."
    },
    "dynamicContext": {
      "chapterTitle": "2 Corinthians 9 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Corinthians 9:10\u201311 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "10\u201311",
            "text": "Now he who supplies seed to the sower and bread for food will also supply and increase your store of seed and will enlarge the harvest of your righteousness. You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "10\u201311",
            "text": "This generous God who supplies abundant seed to the farmer, which becomes bread for our meals, will even more extravagantly supply you with all you need. He will multiply what you produce and brew a harvest of righteousness in you and through you. You will be abundantly enriched in every way so that you can give generously on every occasion."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "10\u201311",
            "text": "For God is the one who provides seed for the farmer and then bread to eat. In the same way, he will provide and increase your resources and then produce a great harvest of generosity in you. Yes, you will be enriched in every way so that you can always be generous."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "10\u201311",
            "text": "Now He who supplies seed to the sower and bread for food will supply and multiply your seed for sowing and increase the harvest of your righteousness; you will be enriched in everything for all liberality, which through us is producing thanksgiving to God."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 2 Corinthians 9:10\u201311.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 2 Corinthians 9:10\u201311.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 2 Corinthians 9:10\u201311.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 2 Corinthians 9:10\u201311."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 2 Corinthians 9:10\u201311."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 2 Corinthians 9:10\u201311 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 13,
    "ref": "Mark 16:15",
    "book": "Mark",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Mission",
    "icon": "globe",
    "bentoSpan": "standard",
    "keyPhrase": "Go into all the world and preach the gospel to all creation",
    "themeColor": "indigo",
    "translations": {
      "NIV": "He said to them, 'Go into all the world and preach the gospel to all creation.'",
      "TPT": "And he said to them, 'As you go into every part of the world, proclaim the good news to everyone in all creation!'",
      "NLT": "And then he told them, 'Go into all the world and preach the Good News to everyone.'",
      "NASB": "And He said to them, 'Go into all the world and preach the gospel to all creation.'"
    },
    "dynamicContext": {
      "chapterTitle": "Mark 16 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Mark 16:15 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "He said to them, 'Go into all the world and preach the gospel to all creation.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "15",
            "text": "And he said to them, 'As you go into every part of the world, proclaim the good news to everyone in all creation!'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "And then he told them, 'Go into all the world and preach the Good News to everyone.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "And He said to them, 'Go into all the world and preach the gospel to all creation.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Mark 16:15.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Mark 16:15.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Mark 16:15.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Mark 16:15."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Mark 16:15."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Mark 16:15 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 14,
    "ref": "Romans 1:16",
    "book": "Romans",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Mission",
    "icon": "flame",
    "bentoSpan": "standard",
    "keyPhrase": "The gospel is the power of God that brings salvation to everyone who believes",
    "themeColor": "indigo",
    "translations": {
      "NIV": "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile.",
      "TPT": "I refuse to be ashamed of the wonderful message of God\u2019s liberating power, which brings salvation to everyone who believes\u2014first to the Jew and also to the Gentile.",
      "NLT": "For I am not ashamed of this Good News about Christ. It is the power of God at work, saving everyone who believes\u2014the Jew first and also the Gentile.",
      "NASB": "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
    },
    "dynamicContext": {
      "chapterTitle": "Romans 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Romans 1:16 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "16",
            "text": "I refuse to be ashamed of the wonderful message of God\u2019s liberating power, which brings salvation to everyone who believes\u2014first to the Jew and also to the Gentile."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For I am not ashamed of this Good News about Christ. It is the power of God at work, saving everyone who believes\u2014the Jew first and also the Gentile."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Romans 1:16.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Romans 1:16.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Romans 1:16.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Romans 1:16."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Romans 1:16."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Romans 1:16 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 15,
    "ref": "Matthew 28:19\u201320",
    "book": "Matthew",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Mission",
    "icon": "users",
    "bentoSpan": "wide",
    "keyPhrase": "And surely I am with you always, to the very end of the age",
    "themeColor": "indigo",
    "translations": {
      "NIV": "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.",
      "TPT": "Now go in my authority and make disciples of all nations, baptizing them in the name of the Father, the Son, and the Holy Spirit. Teach them to observe everything that I have commanded you. And believe this: I am with you always, even to the end of the age!",
      "NLT": "Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age.",
      "NASB": "Go, therefore, and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit, teaching them to follow all that I commanded you; and behold, I am with you always, to the end of the age."
    },
    "dynamicContext": {
      "chapterTitle": "Matthew 28 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Matthew 28:19\u201320 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19\u201320",
            "text": "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19\u201320",
            "text": "Now go in my authority and make disciples of all nations, baptizing them in the name of the Father, the Son, and the Holy Spirit. Teach them to observe everything that I have commanded you. And believe this: I am with you always, even to the end of the age!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19\u201320",
            "text": "Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19\u201320",
            "text": "Go, therefore, and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit, teaching them to follow all that I commanded you; and behold, I am with you always, to the end of the age."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Matthew 28:19\u201320.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Matthew 28:19\u201320.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Matthew 28:19\u201320.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Matthew 28:19\u201320."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Matthew 28:19\u201320."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Matthew 28:19\u201320 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 16,
    "ref": "Isaiah 65:24",
    "book": "Isaiah",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Prayer",
    "icon": "message-circle",
    "bentoSpan": "standard",
    "keyPhrase": "Before they call I will answer; while they are still speaking I will hear",
    "themeColor": "indigo",
    "translations": {
      "NIV": "Before they call I will answer; while they are still speaking I will hear.",
      "TPT": "Before they even call out to me, I will answer them; and while they are still speaking, I will hear.",
      "NLT": "I will answer them before they even call to me. While they are still talking about their needs, I will go ahead and answer their prayers!",
      "NASB": "It will also come to pass that before they call, I will answer; and while they are still speaking, I will hear."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 65 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 65:24 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "Before they call I will answer; while they are still speaking I will hear."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "24",
            "text": "Before they even call out to me, I will answer them; and while they are still speaking, I will hear."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "I will answer them before they even call to me. While they are still talking about their needs, I will go ahead and answer their prayers!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "It will also come to pass that before they call, I will answer; and while they are still speaking, I will hear."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 65:24.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 65:24.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 65:24.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 65:24."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 65:24."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 65:24 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 17,
    "ref": "Matthew 5:14",
    "book": "Matthew",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "sun-dim",
    "bentoSpan": "standard",
    "keyPhrase": "You are the light of the world. A town built on a hill cannot be hidden",
    "themeColor": "violet",
    "translations": {
      "NIV": "You are the light of the world. A town built on a hill cannot be hidden.",
      "TPT": "Your lives light up the world. Let others see your light from a distance, for how can you hide a city that stands on a hilltop?",
      "NLT": "You are the light of the world\u2014like a city on a hilltop that cannot be hidden.",
      "NASB": "You are the light of the world. A city set on a hill cannot be hidden."
    },
    "dynamicContext": {
      "chapterTitle": "Matthew 5 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Matthew 5:14 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "14",
            "text": "You are the light of the world. A town built on a hill cannot be hidden."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "14",
            "text": "Your lives light up the world. Let others see your light from a distance, for how can you hide a city that stands on a hilltop?"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "14",
            "text": "You are the light of the world\u2014like a city on a hilltop that cannot be hidden."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "14",
            "text": "You are the light of the world. A city set on a hill cannot be hidden."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Matthew 5:14.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Matthew 5:14.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Matthew 5:14.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Matthew 5:14."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Matthew 5:14."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Matthew 5:14 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 18,
    "ref": "John 14:27",
    "book": "John",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "wind",
    "bentoSpan": "wide",
    "keyPhrase": "Peace I leave with you; my peace I give you. Do not let your hearts be troubled",
    "themeColor": "teal",
    "translations": {
      "NIV": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      "TPT": "I leave the gift of peace with you\u2014my peace. Not the kind of fragile peace given by the world, but my perfect peace. Don\u2019t yield to fear or be troubled in your hearts\u2014instead, be courageous!",
      "NLT": "I am leaving you with a gift\u2014peace of mind and heart. And the peace I give is a gift the world cannot give. So don't be troubled or afraid.",
      "NASB": "Peace I leave you, My peace I give you; not as the world gives, do I give to you. Do not let your hearts be troubled, nor fearful."
    },
    "dynamicContext": {
      "chapterTitle": "John 14 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 14:27 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "27",
            "text": "I leave the gift of peace with you\u2014my peace. Not the kind of fragile peace given by the world, but my perfect peace. Don\u2019t yield to fear or be troubled in your hearts\u2014instead, be courageous!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "I am leaving you with a gift\u2014peace of mind and heart. And the peace I give is a gift the world cannot give. So don't be troubled or afraid."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Peace I leave you, My peace I give you; not as the world gives, do I give to you. Do not let your hearts be troubled, nor fearful."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 14:27.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 14:27.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 14:27.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 14:27."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 14:27."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 14:27 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 19,
    "ref": "Hebrews 10:19\u201325",
    "book": "Hebrews",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "door-open",
    "bentoSpan": "hero",
    "keyPhrase": "Confidence to enter the Most Holy Place by the blood of Jesus",
    "themeColor": "violet",
    "translations": {
      "NIV": "Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus, by a new and living way opened for us through the curtain, that is, his body... let us draw near to God with a sincere heart and with the full assurance that faith brings... Let us hold unswervingly to the hope we profess, for he who promised is faithful. And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together... but encouraging one another.",
      "TPT": "And now we have boldness and free access to come directly into the presence of God through the blood of Jesus! He has uncovered a fresh and living pathway for us through the veil, which is his own body... Let us come right into the presence of God with a true heart in full assurance of faith... Let us wrap our hearts around the hope we confess, for the one who promised is completely faithful. And let us discover creative ways to encourage one another to show love and do beautiful works, not neglecting our gathering together, but encouraging one another.",
      "NLT": "And so, dear brothers and sisters, we can boldly enter heaven's Most Holy Place because of the blood of Jesus. By his death, Jesus opened a new and life-giving way through the curtain into the Most Holy Place... let us go right into the presence of God with sincere hearts fully trusting him... Let us hold tightly without wavering to the hope we affirm, for God can be trusted to keep his promise. Let us think of ways to motivate one another to acts of love and good works. And let us not neglect our meeting together... but encourage one another.",
      "NASB": "Therefore, brothers and sisters, since we have confidence to enter the holy place by the blood of Jesus, by a new and living way which He inaugurated for us through the veil, that is, through His flesh... let's approach God with a sincere heart in full assurance of faith... Let's hold firmly to the confession of our hope without wavering, for He who promised is faithful; and let's consider how to encourage one another in love and good deeds, not abandoning our own meeting together... but encouraging one another."
    },
    "dynamicContext": {
      "chapterTitle": "Hebrews 10 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Hebrews 10:19\u201325 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19\u201325",
            "text": "Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus, by a new and living way opened for us through the curtain, that is, his body... let us draw near to God with a sincere heart and with the full assurance that faith brings... Let us hold unswervingly to the hope we profess, for he who promised is faithful. And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together... but encouraging one another."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19\u201325",
            "text": "And now we have boldness and free access to come directly into the presence of God through the blood of Jesus! He has uncovered a fresh and living pathway for us through the veil, which is his own body... Let us come right into the presence of God with a true heart in full assurance of faith... Let us wrap our hearts around the hope we confess, for the one who promised is completely faithful. And let us discover creative ways to encourage one another to show love and do beautiful works, not neglecting our gathering together, but encouraging one another."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19\u201325",
            "text": "And so, dear brothers and sisters, we can boldly enter heaven's Most Holy Place because of the blood of Jesus. By his death, Jesus opened a new and life-giving way through the curtain into the Most Holy Place... let us go right into the presence of God with sincere hearts fully trusting him... Let us hold tightly without wavering to the hope we affirm, for God can be trusted to keep his promise. Let us think of ways to motivate one another to acts of love and good works. And let us not neglect our meeting together... but encourage one another."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19\u201325",
            "text": "Therefore, brothers and sisters, since we have confidence to enter the holy place by the blood of Jesus, by a new and living way which He inaugurated for us through the veil, that is, through His flesh... let's approach God with a sincere heart in full assurance of faith... Let's hold firmly to the confession of our hope without wavering, for He who promised is faithful; and let's consider how to encourage one another in love and good deeds, not abandoning our own meeting together... but encouraging one another."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Hebrews 10:19\u201325.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Hebrews 10:19\u201325.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Hebrews 10:19\u201325.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Hebrews 10:19\u201325."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Hebrews 10:19\u201325."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Hebrews 10:19\u201325 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 20,
    "ref": "Psalm 119:89",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "anchor",
    "bentoSpan": "standard",
    "keyPhrase": "Your word, LORD, is eternal; it stands firm in the heavens",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Your word, LORD, is eternal; it stands firm in the heavens.",
      "TPT": "Standing firm in the heavens, your word, Yahweh, will endure forever.",
      "NLT": "Your eternal word, O LORD, stands firm in heaven.",
      "NASB": "Forever, LORD, Your word stands firm in heaven."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:89 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "89",
            "text": "Your word, LORD, is eternal; it stands firm in the heavens."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "89",
            "text": "Standing firm in the heavens, your word, Yahweh, will endure forever."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "89",
            "text": "Your eternal word, O LORD, stands firm in heaven."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "89",
            "text": "Forever, LORD, Your word stands firm in heaven."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:89.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:89.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:89.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:89."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:89."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:89 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 21,
    "ref": "Psalm 25:5",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Guidance",
    "icon": "map-pin",
    "bentoSpan": "standard",
    "keyPhrase": "Guide me in your truth and teach me, for you are God my Savior",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Guide me in your truth and teach me, for you are God my Savior, and my hope is in you all day long.",
      "TPT": "Escort me along the way; take me by the hand and teach me your truth, for you are my God, the God of my salvation; upon you I wait expectantly all day long.",
      "NLT": "Lead me by your truth and teach me, for you are the God who saves me. All day long I put my hope in you.",
      "NASB": "Lead me in Your truth and teach me, for You are the God of my salvation; for You I wait all the day."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 25 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 25:5 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "Guide me in your truth and teach me, for you are God my Savior, and my hope is in you all day long."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "5",
            "text": "Escort me along the way; take me by the hand and teach me your truth, for you are my God, the God of my salvation; upon you I wait expectantly all day long."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "Lead me by your truth and teach me, for you are the God who saves me. All day long I put my hope in you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "Lead me in Your truth and teach me, for You are the God of my salvation; for You I wait all the day."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 25:5.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 25:5.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 25:5.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 25:5."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 25:5."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 25:5 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 22,
    "ref": "Isaiah 58:11",
    "book": "Isaiah",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "droplet",
    "bentoSpan": "tall",
    "keyPhrase": "You will be like a well-watered garden, like a spring whose waters never fail",
    "themeColor": "purple",
    "translations": {
      "NIV": "The LORD will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame. You will be like a well-watered garden, like a spring whose waters never fail.",
      "TPT": "Yahweh will always guide you and satisfy you even in the parched places. He will strengthen your bones, and you will become like a watered garden, like a spring of water whose waters never fail.",
      "NLT": "The LORD will guide you continually, giving you water when you are dry and restoring your strength. You will be like a well-watered garden, like an ever-flowing spring.",
      "NASB": "And the LORD will continually guide you, and satisfy your desire in scorched places, and give strength to your bones; and you will be like a watered garden, and like a spring of water whose waters do not fail."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 58 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 58:11 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "The LORD will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame. You will be like a well-watered garden, like a spring whose waters never fail."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "11",
            "text": "Yahweh will always guide you and satisfy you even in the parched places. He will strengthen your bones, and you will become like a watered garden, like a spring of water whose waters never fail."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "The LORD will guide you continually, giving you water when you are dry and restoring your strength. You will be like a well-watered garden, like an ever-flowing spring."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "And the LORD will continually guide you, and satisfy your desire in scorched places, and give strength to your bones; and you will be like a watered garden, and like a spring of water whose waters do not fail."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 58:11.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 58:11.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 58:11.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 58:11."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 58:11."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 58:11 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 23,
    "ref": "Proverbs 19:23",
    "book": "Proverbs",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "The fear of the LORD leads to life; then one rests content, untouched by trouble",
    "themeColor": "teal",
    "translations": {
      "NIV": "The fear of the LORD leads to life; then one rests content, untouched by trouble.",
      "TPT": "When you live in the reverence of the LORD, you will experience true life and be satisfied, living in tranquility, untouched by harm.",
      "NLT": "Fear of the LORD leads to life, bringing security and protection from harm.",
      "NASB": "The fear of the LORD leads to life, so that one may sleep satisfied, untouched by evil."
    },
    "dynamicContext": {
      "chapterTitle": "Proverbs 19 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Proverbs 19:23 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "The fear of the LORD leads to life; then one rests content, untouched by trouble."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "23",
            "text": "When you live in the reverence of the LORD, you will experience true life and be satisfied, living in tranquility, untouched by harm."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "Fear of the LORD leads to life, bringing security and protection from harm."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "The fear of the LORD leads to life, so that one may sleep satisfied, untouched by evil."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Proverbs 19:23.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Proverbs 19:23.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Proverbs 19:23.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Proverbs 19:23."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Proverbs 19:23."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Proverbs 19:23 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 24,
    "ref": "Ephesians 6:10",
    "book": "Ephesians",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "zap",
    "bentoSpan": "standard",
    "keyPhrase": "Be strong in the Lord and in his mighty power",
    "themeColor": "rose",
    "translations": {
      "NIV": "Finally, be strong in the Lord and in his mighty power.",
      "TPT": "Now my beloved ones, I have saved these most important truths for last: Be supernaturally infused with strength through your life-union with the Lord Jesus. Stand victorious with the force of his explosive power flowing in and through you.",
      "NLT": "A final word: Be strong in the Lord and in his mighty power.",
      "NASB": "Finally, be strong in the Lord and in the strength of His might."
    },
    "dynamicContext": {
      "chapterTitle": "Ephesians 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Ephesians 6:10 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Finally, be strong in the Lord and in his mighty power."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "10",
            "text": "Now my beloved ones, I have saved these most important truths for last: Be supernaturally infused with strength through your life-union with the Lord Jesus. Stand victorious with the force of his explosive power flowing in and through you."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "A final word: Be strong in the Lord and in his mighty power."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Finally, be strong in the Lord and in the strength of His might."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Ephesians 6:10.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Ephesians 6:10.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Ephesians 6:10.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Ephesians 6:10."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Ephesians 6:10."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Ephesians 6:10 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 25,
    "ref": "John 6:27",
    "book": "John",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "package",
    "bentoSpan": "standard",
    "keyPhrase": "Work for food that endures to eternal life, which the Son of Man will give you",
    "themeColor": "emerald",
    "translations": {
      "NIV": "Do not work for food that spoils, but for food that endures to eternal life, which the Son of Man will give you. For on him God the Father has placed his seal of approval.",
      "TPT": "Why would you strive for food that is perishable and doesn\u2019t satisfy? You should be seeking the food that gives permanent, eternal life that the Son of Man will give you. For upon him the Father God has placed his seal of approval!",
      "NLT": "But don't be so concerned about perishable things like food. Spend your energy seeking the eternal life that the Son of Man can give you. For God the Father has given me the seal of his approval.",
      "NASB": "Do not work for the food that perishes, but for the food that lasts for eternal life, which the Son of Man will give you; for on Him the Father, God, has set His seal."
    },
    "dynamicContext": {
      "chapterTitle": "John 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 6:27 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Do not work for food that spoils, but for food that endures to eternal life, which the Son of Man will give you. For on him God the Father has placed his seal of approval."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "27",
            "text": "Why would you strive for food that is perishable and doesn\u2019t satisfy? You should be seeking the food that gives permanent, eternal life that the Son of Man will give you. For upon him the Father God has placed his seal of approval!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "But don't be so concerned about perishable things like food. Spend your energy seeking the eternal life that the Son of Man can give you. For God the Father has given me the seal of his approval."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Do not work for the food that perishes, but for the food that lasts for eternal life, which the Son of Man will give you; for on Him the Father, God, has set His seal."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 6:27.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 6:27.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 6:27.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 6:27."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 6:27."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 6:27 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 26,
    "ref": "Psalm 16:9\u201310",
    "book": "Psalms",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "heart",
    "bentoSpan": "wide",
    "keyPhrase": "My heart is glad and my tongue rejoices; my body also will rest secure",
    "themeColor": "amber",
    "translations": {
      "NIV": "Therefore my heart is glad and my tongue rejoices; my body also will rest secure, because you will not abandon me to the realm of the dead, nor will you let your faithful one see decay.",
      "TPT": "My heart and soul explode with joy\u2014full of glory! Even my body will rest confident and secure. For you will not leave my soul in the realm of darkness, nor will you allow your Holy One to experience decay.",
      "NLT": "No wonder my heart is glad, and I rejoice. My body rests in safety. For you will not leave my soul among the dead or allow your holy one to rot in the grave.",
      "NASB": "Therefore my heart is glad and my glory rejoices; my flesh also will dwell securely. For You will not abandon my soul to Sheol; You will not allow Your Holy One to undergo decay."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 16 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 16:9\u201310 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "9\u201310",
            "text": "Therefore my heart is glad and my tongue rejoices; my body also will rest secure, because you will not abandon me to the realm of the dead, nor will you let your faithful one see decay."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "9\u201310",
            "text": "My heart and soul explode with joy\u2014full of glory! Even my body will rest confident and secure. For you will not leave my soul in the realm of darkness, nor will you allow your Holy One to experience decay."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "9\u201310",
            "text": "No wonder my heart is glad, and I rejoice. My body rests in safety. For you will not leave my soul among the dead or allow your holy one to rot in the grave."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "9\u201310",
            "text": "Therefore my heart is glad and my glory rejoices; my flesh also will dwell securely. For You will not abandon my soul to Sheol; You will not allow Your Holy One to undergo decay."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 16:9\u201310.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 16:9\u201310.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 16:9\u201310.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 16:9\u201310."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 16:9\u201310."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 16:9\u201310 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 27,
    "ref": "John 6:35",
    "book": "John",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "coffee",
    "bentoSpan": "standard",
    "keyPhrase": "I am the bread of life. Whoever comes to me will never go hungry",
    "themeColor": "emerald",
    "translations": {
      "NIV": "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
      "TPT": "Jesus said to them, 'I am the Bread of Life. Come every day to me and you will never be hungry. Believe in me and you will never be thirsty.'",
      "NLT": "Jesus replied, 'I am the bread of life. Whoever comes to me will never be hungry again. Whoever believes in me will never be thirsty.'",
      "NASB": "Jesus said to them, 'I am the bread of life; the one who comes to Me will not be hungry, and the one who believes in Me will never be thirsty.'"
    },
    "dynamicContext": {
      "chapterTitle": "John 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 6:35 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "35",
            "text": "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "35",
            "text": "Jesus said to them, 'I am the Bread of Life. Come every day to me and you will never be hungry. Believe in me and you will never be thirsty.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "35",
            "text": "Jesus replied, 'I am the bread of life. Whoever comes to me will never be hungry again. Whoever believes in me will never be thirsty.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "35",
            "text": "Jesus said to them, 'I am the bread of life; the one who comes to Me will not be hungry, and the one who believes in Me will never be thirsty.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 6:35.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 6:35.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 6:35.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 6:35."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 6:35."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 6:35 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 28,
    "ref": "Psalm 103:1\u20135",
    "book": "Psalms",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "activity",
    "bentoSpan": "hero",
    "keyPhrase": "Who forgives all your sins and heals all your diseases",
    "themeColor": "purple",
    "translations": {
      "NIV": "Praise the LORD, my soul; all my inmost being, praise his holy name. Praise the LORD, my soul, and forget not all his benefits\u2014who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle\u2019s.",
      "TPT": "With my whole heart, with my whole life, and with the inmost parts of my being, I will praise and bless his holy name. Let my whole being sing the praises of Yahweh, and let me never forget the marvelous benefits he gives: He forgives all our sins and heals every one of our diseases! He rescues us from hell and saves our lives, and he crowns us with love and tender mercies. He satisfies our desires with good things, renewing our youth like the eagle\u2019s!",
      "NLT": "Let all that I am praise the LORD; with my whole heart, I will praise his holy name. Let all that I am praise the LORD; may I never forget the good things he does for me. He forgives all my sins and heals all my diseases. He redeems me from death and crowns me with love and tender mercies. He fills my life with good things. My youth is renewed like the eagle's!",
      "NASB": "Bless the LORD, my soul, and all that is within me, bless His holy name. Bless the LORD, my soul, and do not forget any of His benefits; Who pardons all your guilt, Who heals all your diseases; Who redeems your life from the pit, Who crowns you with favor and compassion; Who satisfies your years with good things, so that your youth is renewed like the eagle."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 103 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 103:1\u20135 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1\u20135",
            "text": "Praise the LORD, my soul; all my inmost being, praise his holy name. Praise the LORD, my soul, and forget not all his benefits\u2014who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion, who satisfies your desires with good things so that your youth is renewed like the eagle\u2019s."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1\u20135",
            "text": "With my whole heart, with my whole life, and with the inmost parts of my being, I will praise and bless his holy name. Let my whole being sing the praises of Yahweh, and let me never forget the marvelous benefits he gives: He forgives all our sins and heals every one of our diseases! He rescues us from hell and saves our lives, and he crowns us with love and tender mercies. He satisfies our desires with good things, renewing our youth like the eagle\u2019s!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1\u20135",
            "text": "Let all that I am praise the LORD; with my whole heart, I will praise his holy name. Let all that I am praise the LORD; may I never forget the good things he does for me. He forgives all my sins and heals all my diseases. He redeems me from death and crowns me with love and tender mercies. He fills my life with good things. My youth is renewed like the eagle's!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1\u20135",
            "text": "Bless the LORD, my soul, and all that is within me, bless His holy name. Bless the LORD, my soul, and do not forget any of His benefits; Who pardons all your guilt, Who heals all your diseases; Who redeems your life from the pit, Who crowns you with favor and compassion; Who satisfies your years with good things, so that your youth is renewed like the eagle."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 103:1\u20135.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 103:1\u20135.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 103:1\u20135.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 103:1\u20135."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 103:1\u20135."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 103:1\u20135 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 29,
    "ref": "Psalm 52:8",
    "book": "Psalms",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "feather",
    "bentoSpan": "standard",
    "keyPhrase": "I am like an olive tree flourishing in the house of God",
    "themeColor": "emerald",
    "translations": {
      "NIV": "But I am like an olive tree flourishing in the house of God; I trust in God\u2019s unfailing love for ever and ever.",
      "TPT": "But I am like an olive tree, thriving in the house of God. I will trust in your passionate, faithful love forever and ever.",
      "NLT": "But I am like an olive tree, thriving in the house of God. I will always trust in God's unfailing love.",
      "NASB": "But as for me, I am like a green olive tree in the house of God; I trust in the faithfulness of God forever and ever."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 52 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 52:8 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "But I am like an olive tree flourishing in the house of God; I trust in God\u2019s unfailing love for ever and ever."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8",
            "text": "But I am like an olive tree, thriving in the house of God. I will trust in your passionate, faithful love forever and ever."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "But I am like an olive tree, thriving in the house of God. I will always trust in God's unfailing love."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "But as for me, I am like a green olive tree in the house of God; I trust in the faithfulness of God forever and ever."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 52:8.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 52:8.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 52:8.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 52:8."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 52:8."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 52:8 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 30,
    "ref": "Psalm 91:13",
    "book": "Psalms",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield-alert",
    "bentoSpan": "standard",
    "keyPhrase": "You will tread on the lion and the cobra; you will trample the great lion and the serpent",
    "themeColor": "rose",
    "translations": {
      "NIV": "You will tread on the lion and the cobra; you will trample the great lion and the serpent.",
      "TPT": "You will walk over the lion and the adder; you will crush fierce lions and venomous snakes beneath your feet!",
      "NLT": "You will trample upon lions and cobras; you will crush fierce lions and serpents under your feet!",
      "NASB": "You will walk on the lion and cobra, you will trample the young lion and the serpent."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 91 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 91:13 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "You will tread on the lion and the cobra; you will trample the great lion and the serpent."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "13",
            "text": "You will walk over the lion and the adder; you will crush fierce lions and venomous snakes beneath your feet!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "You will trample upon lions and cobras; you will crush fierce lions and serpents under your feet!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "You will walk on the lion and cobra, you will trample the young lion and the serpent."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 91:13.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 91:13.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 91:13.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 91:13."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 91:13."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 91:13 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 31,
    "ref": "Psalm 119:97\u2013106",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "book-open",
    "bentoSpan": "hero",
    "keyPhrase": "Your word is a lamp for my feet, a light on my path",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Oh, how I love your law! I meditate on it all day long. Your commands are always with me and make me wiser than my enemies. I have more insight than all my teachers, for I meditate on your statutes... How sweet are your words to my taste, sweeter than honey to my mouth! I gain understanding from your precepts; therefore I hate every wrong path. Your word is a lamp for my feet, a light on my path.",
      "TPT": "O how I love your law! It is my meditation all the day. Your commandment makes me wiser than my enemies, for it is ever with me. I have more insight than all my teachers, for your testimonies are my meditation... How sweet are your words to my taste, yes, sweeter than honey to my mouth! From your precepts I get understanding; therefore I hate every false way. Your word is a lamp to my feet and a light to my path.",
      "NLT": "Oh, how I love your instructions! I think about them all day long. Your commands make me wiser than my enemies, for they are my constant guide. Yes, I have more insight than my teachers, for I am always thinking of your laws... How sweet your words taste to me; they are sweeter than honey. Your commandments give me understanding; no wonder I hate every false way of life. Your word is a lamp to guide my feet and a light for my path.",
      "NASB": "How I love Your Law! It is my meditation all the day. Your commandments make me wiser than my enemies, for they are ever mine. I have more insight than all my teachers, for Your testimonies are my meditation... How sweet are Your words to my taste! Yes, sweeter than honey to my mouth! From Your precepts I get understanding; therefore I hate every false way. Your word is a lamp to my feet and a light to my path."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:97\u2013106 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "97\u2013106",
            "text": "Oh, how I love your law! I meditate on it all day long. Your commands are always with me and make me wiser than my enemies. I have more insight than all my teachers, for I meditate on your statutes... How sweet are your words to my taste, sweeter than honey to my mouth! I gain understanding from your precepts; therefore I hate every wrong path. Your word is a lamp for my feet, a light on my path."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "97\u2013106",
            "text": "O how I love your law! It is my meditation all the day. Your commandment makes me wiser than my enemies, for it is ever with me. I have more insight than all my teachers, for your testimonies are my meditation... How sweet are your words to my taste, yes, sweeter than honey to my mouth! From your precepts I get understanding; therefore I hate every false way. Your word is a lamp to my feet and a light to my path."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "97\u2013106",
            "text": "Oh, how I love your instructions! I think about them all day long. Your commands make me wiser than my enemies, for they are my constant guide. Yes, I have more insight than my teachers, for I am always thinking of your laws... How sweet your words taste to me; they are sweeter than honey. Your commandments give me understanding; no wonder I hate every false way of life. Your word is a lamp to guide my feet and a light for my path."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "97\u2013106",
            "text": "How I love Your Law! It is my meditation all the day. Your commandments make me wiser than my enemies, for they are ever mine. I have more insight than all my teachers, for Your testimonies are my meditation... How sweet are Your words to my taste! Yes, sweeter than honey to my mouth! From Your precepts I get understanding; therefore I hate every false way. Your word is a lamp to my feet and a light to my path."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:97\u2013106.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:97\u2013106.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:97\u2013106.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:97\u2013106."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:97\u2013106."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:97\u2013106 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 32,
    "ref": "Joshua 1:5",
    "book": "Joshua",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield",
    "bentoSpan": "standard",
    "keyPhrase": "As I was with Moses, so I will be with you; I will never leave you nor forsake you",
    "themeColor": "rose",
    "translations": {
      "NIV": "No one will be able to stand against you all the days of your life. As I was with Moses, so I will be with you; I will never leave you nor forsake you.",
      "TPT": "No one will be able to stand against you all the days of your life. For I will be with you just as I was with Moses; I will not fail you or forsake you.",
      "NLT": "No one will be able to stand against you as long as you live. For I will be with you as I was with Moses. I will not fail you or abandon you.",
      "NASB": "No one will be able to oppose you all the days of your life. Just as I have been with Moses, I will be with you; I will not abandon you nor forsake you."
    },
    "dynamicContext": {
      "chapterTitle": "Joshua 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Joshua 1:5 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "No one will be able to stand against you all the days of your life. As I was with Moses, so I will be with you; I will never leave you nor forsake you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "5",
            "text": "No one will be able to stand against you all the days of your life. For I will be with you just as I was with Moses; I will not fail you or forsake you."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "No one will be able to stand against you as long as you live. For I will be with you as I was with Moses. I will not fail you or abandon you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "5",
            "text": "No one will be able to oppose you all the days of your life. Just as I have been with Moses, I will be with you; I will not abandon you nor forsake you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Joshua 1:5.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Joshua 1:5.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Joshua 1:5.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Joshua 1:5."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Joshua 1:5."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Joshua 1:5 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 33,
    "ref": "Isaiah 61:1",
    "book": "Isaiah",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "sparkle",
    "bentoSpan": "wide",
    "keyPhrase": "The Spirit of the Sovereign LORD is on me to proclaim good news to the poor",
    "themeColor": "purple",
    "translations": {
      "NIV": "The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.",
      "TPT": "The mighty Spirit of the Lord Yahweh is upon me, because Yahweh has anointed me to bring good news to the afflicted. He has sent me to heal the brokenhearted, to proclaim release to the captives and freedom to those bound in darkness.",
      "NLT": "The Spirit of the Sovereign LORD is upon me, for the LORD has anointed me to bring good news to the poor. He has sent me to comfort the brokenhearted and to proclaim that captives will be released and prisoners will be freed.",
      "NASB": "The Spirit of the Lord GOD is upon me, because the LORD anointed me to bring good news to the humble; He has sent me to bind up the brokenhearted, to proclaim release to captives and freedom to prisoners."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 61 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 61:1 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The Spirit of the Sovereign LORD is on me, because the LORD has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1",
            "text": "The mighty Spirit of the Lord Yahweh is upon me, because Yahweh has anointed me to bring good news to the afflicted. He has sent me to heal the brokenhearted, to proclaim release to the captives and freedom to those bound in darkness."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The Spirit of the Sovereign LORD is upon me, for the LORD has anointed me to bring good news to the poor. He has sent me to comfort the brokenhearted and to proclaim that captives will be released and prisoners will be freed."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The Spirit of the Lord GOD is upon me, because the LORD anointed me to bring good news to the humble; He has sent me to bind up the brokenhearted, to proclaim release to captives and freedom to prisoners."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 61:1.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 61:1.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 61:1.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 61:1."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 61:1."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 61:1 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 34,
    "ref": "Deuteronomy 31:8",
    "book": "Deuteronomy",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "footprints",
    "bentoSpan": "standard",
    "keyPhrase": "The LORD himself goes before you and will be with you; do not be afraid",
    "themeColor": "rose",
    "translations": {
      "NIV": "The LORD himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
      "TPT": "Yahweh himself is the one who goes before you! He will be with you; he will never fail you nor abandon you. So don't be afraid or disheartened!",
      "NLT": "Do not be afraid or discouraged, for the LORD will personally go ahead of you. He will be with you; he will neither fail you nor abandon you.",
      "NASB": "And the LORD is the one who goes ahead of you; He will be with you. He will not fail you or forsake you. Do not fear or be dismayed."
    },
    "dynamicContext": {
      "chapterTitle": "Deuteronomy 31 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Deuteronomy 31:8 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "The LORD himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8",
            "text": "Yahweh himself is the one who goes before you! He will be with you; he will never fail you nor abandon you. So don't be afraid or disheartened!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "Do not be afraid or discouraged, for the LORD will personally go ahead of you. He will be with you; he will neither fail you nor abandon you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "And the LORD is the one who goes ahead of you; He will be with you. He will not fail you or forsake you. Do not fear or be dismayed."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Deuteronomy 31:8.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Deuteronomy 31:8.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Deuteronomy 31:8.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Deuteronomy 31:8."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Deuteronomy 31:8."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Deuteronomy 31:8 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 35,
    "ref": "Galatians 5:22\u201325",
    "book": "Galatians",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "flower",
    "bentoSpan": "wide",
    "keyPhrase": "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness",
    "themeColor": "amber",
    "translations": {
      "NIV": "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law. Those who belong to Christ Jesus have crucified the flesh with its passions and desires. Since we live by the Spirit, let us keep in step with the Spirit.",
      "TPT": "But the fruit produced by the Holy Spirit within you is divine love in all its varied expressions: joy that overflows, peace that subdues, patience that endures, kindness in action, a life full of virtue, faith that prevails, gentleness of heart, and strength of spirit. Never will you find a law that conflicts with these! Now those who belong to Christ Jesus have crucified the self-life with its passions and desires. Since we live with the Spirit, let us step in time with each other, walking in the Holy Spirit!",
      "NLT": "But the Holy Spirit produces this kind of fruit in our lives: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. There is no law against these things! Those who belong to Christ Jesus have nailed the passions and desires of their sinful nature to his cross and crucified them there. Since we are living by the Spirit, let us follow the Spirit's leading in every part of our lives.",
      "NASB": "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law. Now those who belong to Christ Jesus have crucified the flesh with its passions and desires. If we live by the Spirit, let's also follow the Spirit."
    },
    "dynamicContext": {
      "chapterTitle": "Galatians 5 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Galatians 5:22\u201325 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "22\u201325",
            "text": "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law. Those who belong to Christ Jesus have crucified the flesh with its passions and desires. Since we live by the Spirit, let us keep in step with the Spirit."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "22\u201325",
            "text": "But the fruit produced by the Holy Spirit within you is divine love in all its varied expressions: joy that overflows, peace that subdues, patience that endures, kindness in action, a life full of virtue, faith that prevails, gentleness of heart, and strength of spirit. Never will you find a law that conflicts with these! Now those who belong to Christ Jesus have crucified the self-life with its passions and desires. Since we live with the Spirit, let us step in time with each other, walking in the Holy Spirit!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "22\u201325",
            "text": "But the Holy Spirit produces this kind of fruit in our lives: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. There is no law against these things! Those who belong to Christ Jesus have nailed the passions and desires of their sinful nature to his cross and crucified them there. Since we are living by the Spirit, let us follow the Spirit's leading in every part of our lives."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "22\u201325",
            "text": "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law. Now those who belong to Christ Jesus have crucified the flesh with its passions and desires. If we live by the Spirit, let's also follow the Spirit."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Galatians 5:22\u201325.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Galatians 5:22\u201325.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Galatians 5:22\u201325.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Galatians 5:22\u201325."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Galatians 5:22\u201325."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Galatians 5:22\u201325 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 36,
    "ref": "Mark 11:24",
    "book": "Mark",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Prayer",
    "icon": "sparkles",
    "bentoSpan": "standard",
    "keyPhrase": "Whatever you ask for in prayer, believe that you have received it, and it will be yours",
    "themeColor": "indigo",
    "translations": {
      "NIV": "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.",
      "TPT": "This is the reason I urge you to boldly believe for whatever you ask for in prayer\u2014be convinced that you have already received it and it will be yours.",
      "NLT": "I tell you, you can pray for anything, and if you believe that you've received it, it will be yours.",
      "NASB": "Therefore, I say to you, all things for which you pray and ask, believe that you have received them, and they will be granted to you."
    },
    "dynamicContext": {
      "chapterTitle": "Mark 11 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Mark 11:24 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "24",
            "text": "This is the reason I urge you to boldly believe for whatever you ask for in prayer\u2014be convinced that you have already received it and it will be yours."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "I tell you, you can pray for anything, and if you believe that you've received it, it will be yours."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "Therefore, I say to you, all things for which you pray and ask, believe that you have received them, and they will be granted to you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Mark 11:24.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Mark 11:24.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Mark 11:24.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Mark 11:24."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Mark 11:24."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Mark 11:24 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 37,
    "ref": "Colossians 3:2\u20134",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "cloud-sun",
    "bentoSpan": "standard",
    "keyPhrase": "Set your minds on things above... for your life is now hidden with Christ in God",
    "themeColor": "violet",
    "translations": {
      "NIV": "Set your minds on things above, not on earthly things. For you died, and your life is now hidden with Christ in God. When Christ, who is your life, appears, then you also will appear with him in glory.",
      "TPT": "Feast your thoughts continuously on the heavenly realm and not on this earthly realm! For you have died and your life is hidden with Christ in God. Yes, Christ is your life, and when he appears in all his glory, you will be revealed in glorious splendour with him!",
      "NLT": "Think about the things of heaven, not the things of earth. For you died to this life, and your real life is hidden with Christ in God. And when Christ, who is your life, is revealed to the whole world, you will share in all his glory.",
      "NASB": "Set your mind on the things that are above, not on the things that are on earth. For you have died, and your life is hidden with Christ in God. When Christ, who is our life, is revealed, then you also will be revealed with Him in glory."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 3:2\u20134 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "2\u20134",
            "text": "Set your minds on things above, not on earthly things. For you died, and your life is now hidden with Christ in God. When Christ, who is your life, appears, then you also will appear with him in glory."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "2\u20134",
            "text": "Feast your thoughts continuously on the heavenly realm and not on this earthly realm! For you have died and your life is hidden with Christ in God. Yes, Christ is your life, and when he appears in all his glory, you will be revealed in glorious splendour with him!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "2\u20134",
            "text": "Think about the things of heaven, not the things of earth. For you died to this life, and your real life is hidden with Christ in God. And when Christ, who is your life, is revealed to the whole world, you will share in all his glory."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "2\u20134",
            "text": "Set your mind on the things that are above, not on the things that are on earth. For you have died, and your life is hidden with Christ in God. When Christ, who is our life, is revealed, then you also will be revealed with Him in glory."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 3:2\u20134.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 3:2\u20134.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 3:2\u20134.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 3:2\u20134."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 3:2\u20134."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 3:2\u20134 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 38,
    "ref": "Philippians 4:19",
    "book": "Philippians",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "gift",
    "bentoSpan": "standard",
    "keyPhrase": "My God will meet all your needs according to the riches of his glory in Christ Jesus",
    "themeColor": "emerald",
    "translations": {
      "NIV": "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      "TPT": "I am convinced that my God will fully satisfy every need you have, for I have seen the magnificent riches of his glory unveiled through Jesus the Anointed One!",
      "NLT": "And this same God who takes care of me will supply all your needs from his glorious riches, which have been given to us in Christ Jesus.",
      "NASB": "And my God will supply all your needs according to His riches in glory in Christ Jesus."
    },
    "dynamicContext": {
      "chapterTitle": "Philippians 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Philippians 4:19 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "And my God will meet all your needs according to the riches of his glory in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19",
            "text": "I am convinced that my God will fully satisfy every need you have, for I have seen the magnificent riches of his glory unveiled through Jesus the Anointed One!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "And this same God who takes care of me will supply all your needs from his glorious riches, which have been given to us in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "And my God will supply all your needs according to His riches in glory in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Philippians 4:19.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Philippians 4:19.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Philippians 4:19.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Philippians 4:19."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Philippians 4:19."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Philippians 4:19 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 39,
    "ref": "Colossians 3:9\u201312",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "sparkles",
    "bentoSpan": "tall",
    "keyPhrase": "Clothe yourselves with compassion, kindness, humility, gentleness and patience",
    "themeColor": "violet",
    "translations": {
      "NIV": "Do not lie to each other, since you have taken off your old self with its practices and have put on the new self, which is being renewed in knowledge in the image of its Creator... Therefore, as God\u2019s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
      "TPT": "Do not lie to one another, since you have stripped off the old man with its practices and have put on the new man, which is being renewed into full knowledge according to the image of the One who created it... Therefore, as God\u2019s chosen holy and beloved ones, put on tender mercies, kindness, humility, gentleness, and patient endurance.",
      "NLT": "Don't lie to each other, for you have stripped off your old sinful nature and all its wicked deeds. Put on your new nature, and be renewed as you learn to know your Creator and become like him... Since God chose you to be the holy people he loves, you must clothe yourselves with tenderhearted mercy, kindness, humility, gentleness, and patience.",
      "NASB": "Do not lie to one another, since you stripped off the old self with its evil practices, and have put on the new self, which is being renewed to a true knowledge according to the image of the One who created it... So, as those who have been chosen of God, holy and beloved, put on a heart of compassion, kindness, humility, gentleness, and patience."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 3:9\u201312 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "9\u201312",
            "text": "Do not lie to each other, since you have taken off your old self with its practices and have put on the new self, which is being renewed in knowledge in the image of its Creator... Therefore, as God\u2019s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "9\u201312",
            "text": "Do not lie to one another, since you have stripped off the old man with its practices and have put on the new man, which is being renewed into full knowledge according to the image of the One who created it... Therefore, as God\u2019s chosen holy and beloved ones, put on tender mercies, kindness, humility, gentleness, and patient endurance."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "9\u201312",
            "text": "Don't lie to each other, for you have stripped off your old sinful nature and all its wicked deeds. Put on your new nature, and be renewed as you learn to know your Creator and become like him... Since God chose you to be the holy people he loves, you must clothe yourselves with tenderhearted mercy, kindness, humility, gentleness, and patience."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "9\u201312",
            "text": "Do not lie to one another, since you stripped off the old self with its evil practices, and have put on the new self, which is being renewed to a true knowledge according to the image of the One who created it... So, as those who have been chosen of God, holy and beloved, put on a heart of compassion, kindness, humility, gentleness, and patience."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 3:9\u201312.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 3:9\u201312.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 3:9\u201312.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 3:9\u201312."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 3:9\u201312."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 3:9\u201312 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 40,
    "ref": "John 8:51",
    "book": "John",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "Whoever obeys my word will never see death",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Very truly I tell you, whoever obeys my word will never see death.",
      "TPT": "I speak to you the living truth: whoever keeps my teaching and lives by my word will never see death.",
      "NLT": "I tell you the truth, anyone who obeys my teaching will never die!",
      "NASB": "Truly, truly I say to you, if anyone follows My word he will never see death."
    },
    "dynamicContext": {
      "chapterTitle": "John 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 8:51 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "51",
            "text": "Very truly I tell you, whoever obeys my word will never see death."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "51",
            "text": "I speak to you the living truth: whoever keeps my teaching and lives by my word will never see death."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "51",
            "text": "I tell you the truth, anyone who obeys my teaching will never die!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "51",
            "text": "Truly, truly I say to you, if anyone follows My word he will never see death."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 8:51.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 8:51.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 8:51.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 8:51."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 8:51."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 8:51 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 41,
    "ref": "Psalm 27:1",
    "book": "Psalms",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "sun",
    "bentoSpan": "wide",
    "keyPhrase": "The LORD is my light and my salvation\u2014whom shall I fear?",
    "themeColor": "rose",
    "translations": {
      "NIV": "The LORD is my light and my salvation\u2014whom shall I fear? The LORD is the stronghold of my life\u2014of whom shall I be afraid?",
      "TPT": "The LORD is my light and the source of my salvation! Whom could I ever fear? The LORD is the fortress of my life, my impenetrable stronghold; why should I be afraid of anything?",
      "NLT": "The LORD is my light and my salvation\u2014so why should I be afraid? The LORD is my fortress, protecting me from danger, so why should I tremble?",
      "NASB": "The LORD is my light and my salvation; whom should I fear? The LORD is the defense of my life; whom should I dread?"
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 27 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 27:1 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my light and my salvation\u2014whom shall I fear? The LORD is the stronghold of my life\u2014of whom shall I be afraid?"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my light and the source of my salvation! Whom could I ever fear? The LORD is the fortress of my life, my impenetrable stronghold; why should I be afraid of anything?"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my light and my salvation\u2014so why should I be afraid? The LORD is my fortress, protecting me from danger, so why should I tremble?"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my light and my salvation; whom should I fear? The LORD is the defense of my life; whom should I dread?"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 27:1.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 27:1.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 27:1.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 27:1."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 27:1."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 27:1 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 42,
    "ref": "Galatians 3:23\u201329",
    "book": "Galatians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "award",
    "bentoSpan": "hero",
    "keyPhrase": "You are all children of God through faith in Christ Jesus... heirs according to the promise",
    "themeColor": "violet",
    "translations": {
      "NIV": "Before the coming of this faith, we were held in custody under the law... So the law was our guardian until Christ came that we might be justified by faith. Now that this faith has come, we are no longer under a guardian. So in Christ Jesus you are all children of God through faith, for all of you who were baptized into Christ have clothed yourselves with Christ. There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus. If you belong to Christ, then you are Abraham\u2019s seed, and heirs according to the promise.",
      "TPT": "Before the faith came, we were kept under guard by the law... The law became our guardian until the Anointed One appeared, that we might be justified by faith. But now that this faith has come, we are no longer under a tutor. For you are all children of God through faith in Christ Jesus. For as many of you as were immersed into Christ have clothed yourselves with Christ... If you belong to Christ, you are Abraham\u2019s descendant and heirs according to the promise!",
      "NLT": "Before the way of faith in Christ was available to us, we were placed under guard by the law... Let me put it another way. The law was our guardian until Christ came; it protected us until we could be made right with God through faith. And now that the way of faith has come, we no longer need the law as our guardian. For you are all children of God through faith in Christ Jesus... And now that you belong to Christ, you are the true children of Abraham. You are his heirs, and God's promise to Abraham belongs to you.",
      "NASB": "But before faith came, we were kept in custody under the Law... Therefore the Law has become our guardian to lead us to Christ, so that we may be justified by faith. But now that faith has come, we are no longer under a guardian. For you are all sons and daughters of God through faith in Christ Jesus. For all of you who were baptized into Christ have clothed yourselves with Christ... And if you belong to Christ, then you are Abraham's descendants, heirs according to promise."
    },
    "dynamicContext": {
      "chapterTitle": "Galatians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Galatians 3:23\u201329 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "23\u201329",
            "text": "Before the coming of this faith, we were held in custody under the law... So the law was our guardian until Christ came that we might be justified by faith. Now that this faith has come, we are no longer under a guardian. So in Christ Jesus you are all children of God through faith, for all of you who were baptized into Christ have clothed yourselves with Christ. There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus. If you belong to Christ, then you are Abraham\u2019s seed, and heirs according to the promise."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "23\u201329",
            "text": "Before the faith came, we were kept under guard by the law... The law became our guardian until the Anointed One appeared, that we might be justified by faith. But now that this faith has come, we are no longer under a tutor. For you are all children of God through faith in Christ Jesus. For as many of you as were immersed into Christ have clothed yourselves with Christ... If you belong to Christ, you are Abraham\u2019s descendant and heirs according to the promise!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "23\u201329",
            "text": "Before the way of faith in Christ was available to us, we were placed under guard by the law... Let me put it another way. The law was our guardian until Christ came; it protected us until we could be made right with God through faith. And now that the way of faith has come, we no longer need the law as our guardian. For you are all children of God through faith in Christ Jesus... And now that you belong to Christ, you are the true children of Abraham. You are his heirs, and God's promise to Abraham belongs to you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "23\u201329",
            "text": "But before faith came, we were kept in custody under the Law... Therefore the Law has become our guardian to lead us to Christ, so that we may be justified by faith. But now that faith has come, we are no longer under a guardian. For you are all sons and daughters of God through faith in Christ Jesus. For all of you who were baptized into Christ have clothed yourselves with Christ... And if you belong to Christ, then you are Abraham's descendants, heirs according to promise."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Galatians 3:23\u201329.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Galatians 3:23\u201329.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Galatians 3:23\u201329.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Galatians 3:23\u201329."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Galatians 3:23\u201329."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Galatians 3:23\u201329 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 43,
    "ref": "Isaiah 43:18\u201319",
    "book": "Isaiah",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "compass",
    "bentoSpan": "wide",
    "keyPhrase": "See, I am doing a new thing! Now it springs up; do you not perceive it?",
    "themeColor": "purple",
    "translations": {
      "NIV": "Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.",
      "TPT": "Stop dwelling on the past. Don\u2019t even think about what\u2019s behind you! Look! I am doing a new thing; now it springs forth! Can\u2019t you see it? I am making a road in the desert and rivers in the dry wilderness.",
      "NLT": "But forget all that\u2014it is nothing compared to what I am going to do. For I am about to do something new. See, I have already begun! Do you not see it? I will make a pathway through the wilderness. I will create rivers in the dry wasteland.",
      "NASB": "Do not call to mind the former things, or ponder things of the past. Behold, I will do something new, now it will spring forth; will you not be aware of it? I will even make a roadway in the wilderness, rivers in the desert."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 43 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 43:18\u201319 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "18\u201319",
            "text": "Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "18\u201319",
            "text": "Stop dwelling on the past. Don\u2019t even think about what\u2019s behind you! Look! I am doing a new thing; now it springs forth! Can\u2019t you see it? I am making a road in the desert and rivers in the dry wilderness."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "18\u201319",
            "text": "But forget all that\u2014it is nothing compared to what I am going to do. For I am about to do something new. See, I have already begun! Do you not see it? I will make a pathway through the wilderness. I will create rivers in the dry wasteland."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "18\u201319",
            "text": "Do not call to mind the former things, or ponder things of the past. Behold, I will do something new, now it will spring forth; will you not be aware of it? I will even make a roadway in the wilderness, rivers in the desert."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 43:18\u201319.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 43:18\u201319.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 43:18\u201319.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 43:18\u201319."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 43:18\u201319."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 43:18\u201319 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 44,
    "ref": "Psalm 119:7",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "smile",
    "bentoSpan": "standard",
    "keyPhrase": "I will praise you with an upright heart as I learn your righteous laws",
    "themeColor": "cyan",
    "translations": {
      "NIV": "I will praise you with an upright heart as I learn your righteous laws.",
      "TPT": "I will give you thanks with an upright heart, as I learn your righteous judgments.",
      "NLT": "As I learn your righteous regulations, I will thank you by living as I should!",
      "NASB": "I will give thanks to You with an upright heart, when I learn Your righteous judgments."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:7 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "I will praise you with an upright heart as I learn your righteous laws."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "7",
            "text": "I will give you thanks with an upright heart, as I learn your righteous judgments."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "As I learn your righteous regulations, I will thank you by living as I should!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "I will give thanks to You with an upright heart, when I learn Your righteous judgments."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:7.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:7.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:7.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:7."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:7."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:7 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 45,
    "ref": "Psalm 119:11",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "bookmark",
    "bentoSpan": "standard",
    "keyPhrase": "I have hidden your word in my heart that I might not sin against you",
    "themeColor": "cyan",
    "translations": {
      "NIV": "I have hidden your word in my heart that I might not sin against you.",
      "TPT": "I have treasured your word in my heart, that I might not sin against you.",
      "NLT": "I have hidden your word in my heart, that I might not sin against you.",
      "NASB": "I have treasured Your word in my heart, so that I may not sin against You."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:11 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "I have hidden your word in my heart that I might not sin against you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "11",
            "text": "I have treasured your word in my heart, that I might not sin against you."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "I have hidden your word in my heart, that I might not sin against you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "11",
            "text": "I have treasured Your word in my heart, so that I may not sin against You."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:11.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:11.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:11.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:11."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:11."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:11 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 46,
    "ref": "Psalm 119:13\u201316",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "book-marked",
    "bentoSpan": "wide",
    "keyPhrase": "I delight in your decrees; I will not neglect your word",
    "themeColor": "cyan",
    "translations": {
      "NIV": "With my lips I recount all the laws that come from your mouth. I rejoice in following your statutes as one rejoices in great riches. I meditate on your precepts and consider your ways. I delight in your decrees; I will not neglect your word.",
      "TPT": "With my lips I proclaim all the regulations of your mouth. I rejoice in following your decrees as much as in all riches. I will meditate on your precepts and give respect to your ways. I will delight in your statutes; I will not forget your word.",
      "NLT": "I have recited aloud all the regulations you have given us. I have rejoiced in your laws as much as in riches. I will study your commandments and reflect on your ways. I will delight in your decrees and not forget your word.",
      "NASB": "With my lips I have told of all the ordinances of Your mouth. I have rejoiced in the way of Your testimonies, as much as in all riches. I will meditate on Your precepts and regard Your ways. I shall delight in Your statutes; I will not forget Your word."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:13\u201316 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "13\u201316",
            "text": "With my lips I recount all the laws that come from your mouth. I rejoice in following your statutes as one rejoices in great riches. I meditate on your precepts and consider your ways. I delight in your decrees; I will not neglect your word."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "13\u201316",
            "text": "With my lips I proclaim all the regulations of your mouth. I rejoice in following your decrees as much as in all riches. I will meditate on your precepts and give respect to your ways. I will delight in your statutes; I will not forget your word."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "13\u201316",
            "text": "I have recited aloud all the regulations you have given us. I have rejoiced in your laws as much as in riches. I will study your commandments and reflect on your ways. I will delight in your decrees and not forget your word."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "13\u201316",
            "text": "With my lips I have told of all the ordinances of Your mouth. I have rejoiced in the way of Your testimonies, as much as in all riches. I will meditate on Your precepts and regard Your ways. I shall delight in Your statutes; I will not forget Your word."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:13\u201316.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:13\u201316.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:13\u201316.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:13\u201316."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:13\u201316."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:13\u201316 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 47,
    "ref": "Psalm 16:7\u20138",
    "book": "Psalms",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Guidance",
    "icon": "moon",
    "bentoSpan": "standard",
    "keyPhrase": "Because he is at my right hand, I will not be shaken",
    "themeColor": "cyan",
    "translations": {
      "NIV": "I will praise the LORD, who counsels me; even at night my heart instructs me. I keep my eyes always on the LORD. With him at my right hand, I will not be shaken.",
      "TPT": "I will praise Yahweh who counsels me; even in the night my innermost feelings instruct me. Because I always set Yahweh before me and he is at my right hand, I will never be shaken.",
      "NLT": "I will bless the LORD who guides me; even at night my heart instructs me. I know the LORD is always with me. I will not be shaken, for he is right beside me.",
      "NASB": "I will bless the LORD who has advised me; indeed, my mind instructs me in the night. I have set the LORD continually before me; because He is at my right hand, I will not be shaken."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 16 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 16:7\u20138 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "I will praise the LORD, who counsels me; even at night my heart instructs me. I keep my eyes always on the LORD. With him at my right hand, I will not be shaken."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "I will praise Yahweh who counsels me; even in the night my innermost feelings instruct me. Because I always set Yahweh before me and he is at my right hand, I will never be shaken."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "I will bless the LORD who guides me; even at night my heart instructs me. I know the LORD is always with me. I will not be shaken, for he is right beside me."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "7\u20138",
            "text": "I will bless the LORD who has advised me; indeed, my mind instructs me in the night. I have set the LORD continually before me; because He is at my right hand, I will not be shaken."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 16:7\u20138.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 16:7\u20138.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 16:7\u20138.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 16:7\u20138."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 16:7\u20138."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 16:7\u20138 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 48,
    "ref": "John 15:7",
    "book": "John",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Prayer",
    "icon": "git-branch",
    "bentoSpan": "standard",
    "keyPhrase": "If you remain in me and my words remain in you, ask whatever you wish",
    "themeColor": "indigo",
    "translations": {
      "NIV": "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you.",
      "TPT": "If you live in union with me and if my words remain continually in you, ask whatever you desire and it will be done for you.",
      "NLT": "But if you remain in me and my words remain in you, you may ask for anything you want, and it will be granted!",
      "NASB": "If you remain in Me, and My words remain in you, ask whatever you wish, and it will be done for you."
    },
    "dynamicContext": {
      "chapterTitle": "John 15 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 15:7 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "7",
            "text": "If you live in union with me and if my words remain continually in you, ask whatever you desire and it will be done for you."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "But if you remain in me and my words remain in you, you may ask for anything you want, and it will be granted!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "If you remain in Me, and My words remain in you, ask whatever you wish, and it will be done for you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 15:7.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 15:7.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 15:7.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 15:7."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 15:7."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 15:7 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 49,
    "ref": "Psalm 77:12",
    "book": "Psalms",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "heart",
    "bentoSpan": "standard",
    "keyPhrase": "I will consider all your works and meditate on all your mighty deeds",
    "themeColor": "amber",
    "translations": {
      "NIV": "I will consider all your works and meditate on all your mighty deeds.",
      "TPT": "I will meditate on all your wondrous deeds and ponder all your mighty miracles.",
      "NLT": "They are constantly in my thoughts. I cannot stop thinking about your mighty acts.",
      "NASB": "I will meditate on all Your work, and consider Your deeds."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 77 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 77:12 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "I will consider all your works and meditate on all your mighty deeds."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "12",
            "text": "I will meditate on all your wondrous deeds and ponder all your mighty miracles."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "They are constantly in my thoughts. I cannot stop thinking about your mighty acts."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "12",
            "text": "I will meditate on all Your work, and consider Your deeds."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 77:12.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 77:12.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 77:12.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 77:12."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 77:12."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 77:12 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 50,
    "ref": "Galatians 2:20",
    "book": "Galatians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "cross",
    "bentoSpan": "wide",
    "keyPhrase": "I have been crucified with Christ and I no longer live, but Christ lives in me",
    "themeColor": "violet",
    "translations": {
      "NIV": "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
      "TPT": "My old identity has been co-crucified with Messiah and no longer lives; for the Anointed One lives his life in union with me. And even though I still live in my natural body, I live each moment by the faith of the Son of God, who loved me and gave his very life for me.",
      "NLT": "My old self has been crucified with Christ. It is no longer I who live, but Christ lives in me. So I live in this earthly body by trusting in the Son of God, who loved me and gave himself for me.",
      "NASB": "I have been crucified with Christ; and it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself up for me."
    },
    "dynamicContext": {
      "chapterTitle": "Galatians 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Galatians 2:20 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "20",
            "text": "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "20",
            "text": "My old identity has been co-crucified with Messiah and no longer lives; for the Anointed One lives his life in union with me. And even though I still live in my natural body, I live each moment by the faith of the Son of God, who loved me and gave his very life for me."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "20",
            "text": "My old self has been crucified with Christ. It is no longer I who live, but Christ lives in me. So I live in this earthly body by trusting in the Son of God, who loved me and gave himself for me."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "20",
            "text": "I have been crucified with Christ; and it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself up for me."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Galatians 2:20.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Galatians 2:20.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Galatians 2:20.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Galatians 2:20."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Galatians 2:20."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Galatians 2:20 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 51,
    "ref": "Joshua 1:9",
    "book": "Joshua",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield",
    "bentoSpan": "wide",
    "keyPhrase": "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you",
    "themeColor": "rose",
    "translations": {
      "NIV": "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      "TPT": "Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed, for Yahweh your God is with you wherever you go!",
      "NLT": "This is my command\u2014be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go.",
      "NASB": "Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed, for the LORD your God is with you wherever you go."
    },
    "dynamicContext": {
      "chapterTitle": "Joshua 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Joshua 1:9 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "9",
            "text": "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "9",
            "text": "Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed, for Yahweh your God is with you wherever you go!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "9",
            "text": "This is my command\u2014be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "9",
            "text": "Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed, for the LORD your God is with you wherever you go."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Joshua 1:9.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Joshua 1:9.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Joshua 1:9.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Joshua 1:9."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Joshua 1:9."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Joshua 1:9 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 52,
    "ref": "2 Timothy 1:7",
    "book": "2 Timothy",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "zap",
    "bentoSpan": "standard",
    "keyPhrase": "God has not given us a spirit of fear, but of power and of love and of a sound mind",
    "themeColor": "rose",
    "translations": {
      "NIV": "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
      "TPT": "For God has not given us a spirit of fear, but of power, love, and a sound, well-balanced mind.",
      "NLT": "For God has not given us a spirit of fear and timidity, but of power, love, and self-discipline.",
      "NASB": "For God has not given us a spirit of timidity, but of power and love and discipline."
    },
    "dynamicContext": {
      "chapterTitle": "2 Timothy 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Timothy 1:7 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "7",
            "text": "For God has not given us a spirit of fear, but of power, love, and a sound, well-balanced mind."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "For God has not given us a spirit of fear and timidity, but of power, love, and self-discipline."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "7",
            "text": "For God has not given us a spirit of timidity, but of power and love and discipline."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 2 Timothy 1:7.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 2 Timothy 1:7.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 2 Timothy 1:7.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 2 Timothy 1:7."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 2 Timothy 1:7."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 2 Timothy 1:7 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 53,
    "ref": "Isaiah 41:10",
    "book": "Isaiah",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "I will strengthen you and help you; I will uphold you with my righteous right hand",
    "themeColor": "rose",
    "translations": {
      "NIV": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      "TPT": "Do not yield to fear, for I am always near. Never turn your gaze away, for I am your God. I will strengthen you; yes, I will help you. I will hold you tight in my hand of victory and righteousness.",
      "NLT": "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand.",
      "NASB": "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you, I will also help you, I will also uphold you with My righteous right hand."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 41 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 41:10 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "10",
            "text": "Do not yield to fear, for I am always near. Never turn your gaze away, for I am your God. I will strengthen you; yes, I will help you. I will hold you tight in my hand of victory and righteousness."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Don't be afraid, for I am with you. Don't be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you, I will also help you, I will also uphold you with My righteous right hand."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 41:10.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 41:10.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 41:10.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 41:10."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 41:10."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 41:10 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 54,
    "ref": "Psalm 34:4",
    "book": "Psalms",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "unlock",
    "bentoSpan": "standard",
    "keyPhrase": "I sought the LORD, and he answered me; he delivered me from all my fears",
    "themeColor": "teal",
    "translations": {
      "NIV": "I sought the LORD, and he answered me; he delivered me from all my fears.",
      "TPT": "I sought Yahweh, and he answered me; he freed me from all my fears.",
      "NLT": "I prayed to the LORD, and he answered me. He freed me from all my fears.",
      "NASB": "I sought the LORD, and He answered me, and rescued me from all my fears."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 34 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 34:4 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "I sought the LORD, and he answered me; he delivered me from all my fears."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "4",
            "text": "I sought Yahweh, and he answered me; he freed me from all my fears."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "I prayed to the LORD, and he answered me. He freed me from all my fears."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "I sought the LORD, and He answered me, and rescued me from all my fears."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 34:4.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 34:4.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 34:4.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 34:4."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 34:4."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 34:4 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 55,
    "ref": "Psalm 118:6",
    "book": "Psalms",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield",
    "bentoSpan": "standard",
    "keyPhrase": "The LORD is with me; I will not be afraid. What can mere mortals do to me?",
    "themeColor": "rose",
    "translations": {
      "NIV": "The LORD is with me; I will not be afraid. What can mere mortals do to me?",
      "TPT": "Yahweh is for me, my protector; I will not be afraid. What can mere humans do to me?",
      "NLT": "The LORD is for me, so I will have no fear. What can mere people do to me?",
      "NASB": "The LORD is for me; I will not fear; what can man do to me?"
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 118 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 118:6 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "6",
            "text": "The LORD is with me; I will not be afraid. What can mere mortals do to me?"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "6",
            "text": "Yahweh is for me, my protector; I will not be afraid. What can mere humans do to me?"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "6",
            "text": "The LORD is for me, so I will have no fear. What can mere people do to me?"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "6",
            "text": "The LORD is for me; I will not fear; what can man do to me?"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 118:6.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 118:6.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 118:6.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 118:6."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 118:6."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 118:6 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 56,
    "ref": "Proverbs 3:5\u20136",
    "book": "Proverbs",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Guidance",
    "icon": "compass",
    "bentoSpan": "wide",
    "keyPhrase": "Trust in the LORD with all your heart and lean not on your own understanding",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      "TPT": "Trust in the Lord completely, and do not rely on your own opinions. With all your heart rely on him to guide you, and he will lead you in every decision you make. Become intimate with him in whatever you do, and he will lead you wherever you go.",
      "NLT": "Trust in the LORD with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take.",
      "NASB": "Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight."
    },
    "dynamicContext": {
      "chapterTitle": "Proverbs 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Proverbs 3:5\u20136 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "5\u20136",
            "text": "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "5\u20136",
            "text": "Trust in the Lord completely, and do not rely on your own opinions. With all your heart rely on him to guide you, and he will lead you in every decision you make. Become intimate with him in whatever you do, and he will lead you wherever you go."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "5\u20136",
            "text": "Trust in the LORD with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "5\u20136",
            "text": "Trust in the LORD with all your heart and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Proverbs 3:5\u20136.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Proverbs 3:5\u20136.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Proverbs 3:5\u20136.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Proverbs 3:5\u20136."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Proverbs 3:5\u20136."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Proverbs 3:5\u20136 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 57,
    "ref": "Mark 16:17\u201318",
    "book": "Mark",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Authority",
    "icon": "shield-plus",
    "bentoSpan": "wide",
    "keyPhrase": "These signs will accompany those who believe: In my name they will drive out demons... they will place their hands on sick people, and they will get well",
    "themeColor": "indigo",
    "translations": {
      "NIV": "And these signs will accompany those who believe: In my name they will drive out demons; they will speak in new tongues; they will pick up snakes with their hands; and when they drink deadly poison, it will not hurt them at all; they will place their hands on sick people, and they will get well.",
      "TPT": "And these miracle signs will accompany those who believe: They will drive out demons in the power of my name. They will speak in new tongues. They will handle snakes with safety, and if they drink anything poisonous, it will not hurt them at all. They will lay hands on the sick and they will be healed.",
      "NLT": "These miraculous signs will accompany those who believe: They will cast out demons in my name, and they will speak in new languages. They will be able to handle snakes with safety, and if they drink anything poisonous, it won't hurt them. They will be able to place their hands on sick people, and they will be healed.",
      "NASB": "These signs will accompany those who have believed: in My name they will cast out demons, they will speak with new tongues; they will pick up serpents, and if they drink any deadly poison, it will not hurt them; they will lay hands on the sick, and they will recover."
    },
    "dynamicContext": {
      "chapterTitle": "Mark 16 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Mark 16:17\u201318 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "17\u201318",
            "text": "And these signs will accompany those who believe: In my name they will drive out demons; they will speak in new tongues; they will pick up snakes with their hands; and when they drink deadly poison, it will not hurt them at all; they will place their hands on sick people, and they will get well."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "17\u201318",
            "text": "And these miracle signs will accompany those who believe: They will drive out demons in the power of my name. They will speak in new tongues. They will handle snakes with safety, and if they drink anything poisonous, it will not hurt them at all. They will lay hands on the sick and they will be healed."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "17\u201318",
            "text": "These miraculous signs will accompany those who believe: They will cast out demons in my name, and they will speak in new languages. They will be able to handle snakes with safety, and if they drink anything poisonous, it won't hurt them. They will be able to place their hands on sick people, and they will be healed."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "17\u201318",
            "text": "These signs will accompany those who have believed: in My name they will cast out demons, they will speak with new tongues; they will pick up serpents, and if they drink any deadly poison, it will not hurt them; they will lay hands on the sick, and they will recover."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Mark 16:17\u201318.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Mark 16:17\u201318.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Mark 16:17\u201318.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Mark 16:17\u201318."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Mark 16:17\u201318."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Mark 16:17\u201318 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 58,
    "ref": "Romans 8:37",
    "book": "Romans",
    "category": "courage-protection",
    "categoryLabel": "Victory & Power",
    "icon": "trophy",
    "bentoSpan": "standard",
    "keyPhrase": "No, in all these things we are more than conquerors through him who loved us",
    "themeColor": "rose",
    "translations": {
      "NIV": "No, in all these things we are more than conquerors through him who loved us.",
      "TPT": "Yet even in the midst of all these things, we triumph over them all, for God has made us to be more than conquerors, and his love will never fail!",
      "NLT": "No, despite all these things, overwhelming victory is ours through Christ, who loved us.",
      "NASB": "But in all these things we overwhelmingly conquer through Him who loved us."
    },
    "dynamicContext": {
      "chapterTitle": "Romans 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Romans 8:37 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "No, in all these things we are more than conquerors through him who loved us."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "37",
            "text": "Yet even in the midst of all these things, we triumph over them all, for God has made us to be more than conquerors, and his love will never fail!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "No, despite all these things, overwhelming victory is ours through Christ, who loved us."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "But in all these things we overwhelmingly conquer through Him who loved us."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Romans 8:37.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Romans 8:37.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Romans 8:37.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Romans 8:37."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Romans 8:37."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Romans 8:37 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 59,
    "ref": "Luke 1:37",
    "book": "Luke",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Power",
    "icon": "sparkles",
    "bentoSpan": "standard",
    "keyPhrase": "For no word from God will ever fail",
    "themeColor": "indigo",
    "translations": {
      "NIV": "For no word from God will ever fail.",
      "TPT": "For not one promise from God is empty of power, for nothing is impossible with God!",
      "NLT": "For the word of God will never fail.",
      "NASB": "For nothing will be impossible with God."
    },
    "dynamicContext": {
      "chapterTitle": "Luke 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Luke 1:37 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "For no word from God will ever fail."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "37",
            "text": "For not one promise from God is empty of power, for nothing is impossible with God!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "For the word of God will never fail."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "37",
            "text": "For nothing will be impossible with God."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Luke 1:37.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Luke 1:37.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Luke 1:37.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Luke 1:37."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Luke 1:37."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Luke 1:37 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 60,
    "ref": "Luke 10:19",
    "book": "Luke",
    "category": "courage-protection",
    "categoryLabel": "Authority & Power",
    "icon": "shield-alert",
    "bentoSpan": "standard",
    "keyPhrase": "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy",
    "themeColor": "rose",
    "translations": {
      "NIV": "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.",
      "TPT": "Now you understand that I have imparted to you all my authority to trample over his kingdom. You will walk upon serpents and scorpions and overcome all the power of the enemy\u2014nothing will harm you.",
      "NLT": "Look, I have given you authority over all the power of the enemy, and you can walk among snakes and scorpions and crush them. Nothing will injure you.",
      "NASB": "Behold, I have given you authority to walk on snakes and scorpions, and authority over all the power of the enemy, and nothing will injure you."
    },
    "dynamicContext": {
      "chapterTitle": "Luke 10 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Luke 10:19 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19",
            "text": "Now you understand that I have imparted to you all my authority to trample over his kingdom. You will walk upon serpents and scorpions and overcome all the power of the enemy\u2014nothing will harm you."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "Look, I have given you authority over all the power of the enemy, and you can walk among snakes and scorpions and crush them. Nothing will injure you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "Behold, I have given you authority to walk on snakes and scorpions, and authority over all the power of the enemy, and nothing will injure you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Luke 10:19.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Luke 10:19.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Luke 10:19.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Luke 10:19."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Luke 10:19."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Luke 10:19 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 61,
    "ref": "Mark 11:23",
    "book": "Mark",
    "category": "faith-prayer",
    "categoryLabel": "Faith & Prayer",
    "icon": "mountain-snow",
    "bentoSpan": "wide",
    "keyPhrase": "Truly I tell you, if anyone says to this mountain, 'Go, throw yourself into the sea,' it will be done",
    "themeColor": "indigo",
    "translations": {
      "NIV": "Truly I tell you, if anyone says to this mountain, 'Go, throw yourself into the sea,' and does not doubt in their heart but believes that what they say will happen, it will be done for them.",
      "TPT": "Listen to the truth I speak to you: If someone says to this mountain, 'Be lifted up and thrown into the sea,' and has no doubt in his heart, but believes that what he says will happen, it will be done for him.",
      "NLT": "I tell you the truth, you can say to this mountain, 'May you be lifted up and thrown into the sea,' and it will happen. But you must really believe it will happen and have no doubt in your heart.",
      "NASB": "Truly I say to you, whoever says to this mountain, 'Be taken up and thrown into the sea,' and does not doubt in his heart, but believes that what he says is going to happen, it will be granted to him."
    },
    "dynamicContext": {
      "chapterTitle": "Mark 11 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Mark 11:23 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "Truly I tell you, if anyone says to this mountain, 'Go, throw yourself into the sea,' and does not doubt in their heart but believes that what they say will happen, it will be done for them."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "23",
            "text": "Listen to the truth I speak to you: If someone says to this mountain, 'Be lifted up and thrown into the sea,' and has no doubt in his heart, but believes that what he says will happen, it will be done for him."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "I tell you the truth, you can say to this mountain, 'May you be lifted up and thrown into the sea,' and it will happen. But you must really believe it will happen and have no doubt in your heart."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "23",
            "text": "Truly I say to you, whoever says to this mountain, 'Be taken up and thrown into the sea,' and does not doubt in his heart, but believes that what he says is going to happen, it will be granted to him."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Mark 11:23.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Mark 11:23.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Mark 11:23.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Mark 11:23."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Mark 11:23."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Mark 11:23 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 62,
    "ref": "Luke 21:18",
    "book": "Luke",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "But not a hair of your head will perish",
    "themeColor": "rose",
    "translations": {
      "NIV": "But not a hair of your head will perish.",
      "TPT": "Yet not even a single hair of your head will ever perish!",
      "NLT": "But not a hair of your head will perish!",
      "NASB": "Yet not a hair of your head will perish."
    },
    "dynamicContext": {
      "chapterTitle": "Luke 21 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Luke 21:18 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "But not a hair of your head will perish."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "18",
            "text": "Yet not even a single hair of your head will ever perish!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "But not a hair of your head will perish!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "18",
            "text": "Yet not a hair of your head will perish."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Luke 21:18.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Luke 21:18.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Luke 21:18.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Luke 21:18."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Luke 21:18."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Luke 21:18 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 63,
    "ref": "Psalm 1:3",
    "book": "Psalms",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "tree",
    "bentoSpan": "wide",
    "keyPhrase": "That person is like a tree planted by streams of water... Whatever they do prospers",
    "themeColor": "emerald",
    "translations": {
      "NIV": "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither\u2014whatever they do prospers.",
      "TPT": "He will be standing firm like a flourishing tree planted by streams of living water, which yields its fruit in each season and whose leaves never wither; and in everything he does, he prospers!",
      "NLT": "They are like trees planted along the riverbank, bearing fruit each season. Their leaves never wither, and they prosper in all they do.",
      "NASB": "He will be like a tree planted by streams of water, which yields its fruit in its season, and its leaf does not wither; and in whatever he does, he prospers."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 1:3 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "3",
            "text": "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither\u2014whatever they do prospers."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "3",
            "text": "He will be standing firm like a flourishing tree planted by streams of living water, which yields its fruit in each season and whose leaves never wither; and in everything he does, he prospers!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "3",
            "text": "They are like trees planted along the riverbank, bearing fruit each season. Their leaves never wither, and they prosper in all they do."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "3",
            "text": "He will be like a tree planted by streams of water, which yields its fruit in its season, and its leaf does not wither; and in whatever he does, he prospers."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 1:3.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 1:3.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 1:3.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 1:3."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 1:3."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 1:3 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 64,
    "ref": "Romans 8:31\u201332",
    "book": "Romans",
    "category": "courage-protection",
    "categoryLabel": "Victory & Power",
    "icon": "heart-handshake",
    "bentoSpan": "wide",
    "keyPhrase": "If God is for us, who can be against us?",
    "themeColor": "rose",
    "translations": {
      "NIV": "What, then, shall we say in response to these things? If God is for us, who can be against us? He who did not spare his own Son, but gave him up for us all\u2014how will he not also, along with him, graciously give us all things?",
      "TPT": "So, what does all this mean? If God has determined to stand with us, tell me, who then could ever stand against us? For God has proved his love by giving us his greatest treasure, the gift of his Son. And since he did not spare him, won\u2019t he also freely give us everything else along with him?",
      "NLT": "What shall we say about such wonderful things as these? If God is for us, who can ever be against us? Since he did not spare even his own Son but gave him up for us all, won't he also give us everything else?",
      "NASB": "What then shall we say to these things? If God is for us, who is against us? He who did not spare His own Son, but delivered Him over for us all, how will He not also with Him freely give us all things?"
    },
    "dynamicContext": {
      "chapterTitle": "Romans 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Romans 8:31\u201332 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "What, then, shall we say in response to these things? If God is for us, who can be against us? He who did not spare his own Son, but gave him up for us all\u2014how will he not also, along with him, graciously give us all things?"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "So, what does all this mean? If God has determined to stand with us, tell me, who then could ever stand against us? For God has proved his love by giving us his greatest treasure, the gift of his Son. And since he did not spare him, won\u2019t he also freely give us everything else along with him?"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "What shall we say about such wonderful things as these? If God is for us, who can ever be against us? Since he did not spare even his own Son but gave him up for us all, won't he also give us everything else?"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "What then shall we say to these things? If God is for us, who is against us? He who did not spare His own Son, but delivered Him over for us all, how will He not also with Him freely give us all things?"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Romans 8:31\u201332.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Romans 8:31\u201332.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Romans 8:31\u201332.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Romans 8:31\u201332."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Romans 8:31\u201332."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Romans 8:31\u201332 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 65,
    "ref": "Isaiah 54:17",
    "book": "Isaiah",
    "category": "courage-protection",
    "categoryLabel": "Strength & Protection",
    "icon": "shield",
    "bentoSpan": "wide",
    "keyPhrase": "No weapon forged against you will prevail, and you will refute every tongue that accuses you",
    "themeColor": "rose",
    "translations": {
      "NIV": "'No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the LORD, and this is their vindication from me,' declares the LORD.",
      "TPT": "'No weapon formed against you will succeed, and you will refute every slanderous accusation voiced against you. For this is the inheritance of the servants of Yahweh, and their righteousness is from me,' declares Yahweh.",
      "NLT": "'But in that coming day no weapon turned against you will succeed. You will silence every voice raised up to accuse you. These benefits are enjoyed by the servants of the LORD; their vindication will come from me. I, the LORD, have spoken!'",
      "NASB": "'No weapon that is formed against you will succeed; and you will condemn every tongue that accuses you in judgment. This is the heritage of the servants of the LORD, and their vindication is from Me,' declares the LORD."
    },
    "dynamicContext": {
      "chapterTitle": "Isaiah 54 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Isaiah 54:17 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "'No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the LORD, and this is their vindication from me,' declares the LORD."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "17",
            "text": "'No weapon formed against you will succeed, and you will refute every slanderous accusation voiced against you. For this is the inheritance of the servants of Yahweh, and their righteousness is from me,' declares Yahweh."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "'But in that coming day no weapon turned against you will succeed. You will silence every voice raised up to accuse you. These benefits are enjoyed by the servants of the LORD; their vindication will come from me. I, the LORD, have spoken!'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "'No weapon that is formed against you will succeed; and you will condemn every tongue that accuses you in judgment. This is the heritage of the servants of the LORD, and their vindication is from Me,' declares the LORD."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Isaiah 54:17.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Isaiah 54:17.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Isaiah 54:17.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Isaiah 54:17."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Isaiah 54:17."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Isaiah 54:17 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 66,
    "ref": "Colossians 3:15",
    "book": "Colossians",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "heart",
    "bentoSpan": "standard",
    "keyPhrase": "Let the peace of Christ rule in your hearts... And be thankful",
    "themeColor": "teal",
    "translations": {
      "NIV": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
      "TPT": "Let your hearts be always guided by the peace of the Anointed One, who called you to peace as part of his one body. And always be thankful.",
      "NLT": "And let the peace that comes from Christ rule in your hearts. For as members of one body you are called to live in peace. And always be thankful.",
      "NASB": "Let the peace of Christ rule in your hearts, to which indeed you were called in one body; and be thankful."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 3:15 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "15",
            "text": "Let your hearts be always guided by the peace of the Anointed One, who called you to peace as part of his one body. And always be thankful."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "And let the peace that comes from Christ rule in your hearts. For as members of one body you are called to live in peace. And always be thankful."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "15",
            "text": "Let the peace of Christ rule in your hearts, to which indeed you were called in one body; and be thankful."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 3:15.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 3:15.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 3:15.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 3:15."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 3:15."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 3:15 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 67,
    "ref": "2 Thessalonians 3:16",
    "book": "2 Thessalonians",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "feather",
    "bentoSpan": "standard",
    "keyPhrase": "May the Lord of peace himself give you peace at all times and in every way",
    "themeColor": "teal",
    "translations": {
      "NIV": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
      "TPT": "Now may the Lord of peace himself constantly give you his peace in every circumstance. The Lord be with you all.",
      "NLT": "Now may the Lord of peace himself give you his peace at all times and in every situation. The Lord be with you all.",
      "NASB": "Now may the Lord of peace Himself continually grant you peace in every circumstance. The Lord be with you all!"
    },
    "dynamicContext": {
      "chapterTitle": "2 Thessalonians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Thessalonians 3:16 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "16",
            "text": "Now may the Lord of peace himself constantly give you his peace in every circumstance. The Lord be with you all."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "Now may the Lord of peace himself give you his peace at all times and in every situation. The Lord be with you all."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "Now may the Lord of peace Himself continually grant you peace in every circumstance. The Lord be with you all!"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 2 Thessalonians 3:16.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 2 Thessalonians 3:16.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 2 Thessalonians 3:16.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 2 Thessalonians 3:16."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 2 Thessalonians 3:16."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 2 Thessalonians 3:16 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 68,
    "ref": "Psalm 119:165",
    "book": "Psalms",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "Great peace have those who love your law, and nothing can make them stumble",
    "themeColor": "teal",
    "translations": {
      "NIV": "Great peace have those who love your law, and nothing can make them stumble.",
      "TPT": "There is abundant peace for those who love your law, and nothing can cause them to stumble!",
      "NLT": "Those who love your instructions have great peace and do not stumble.",
      "NASB": "Those who love Your Law have great peace, and nothing causes them to stumble."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 119 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 119:165 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "165",
            "text": "Great peace have those who love your law, and nothing can make them stumble."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "165",
            "text": "There is abundant peace for those who love your law, and nothing can cause them to stumble!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "165",
            "text": "Those who love your instructions have great peace and do not stumble."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "165",
            "text": "Those who love Your Law have great peace, and nothing causes them to stumble."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 119:165.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 119:165.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 119:165.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 119:165."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 119:165."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 119:165 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 69,
    "ref": "Colossians 3:1\u20134",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "sun",
    "bentoSpan": "wide",
    "keyPhrase": "Since, then, you have been raised with Christ, set your hearts on things above",
    "themeColor": "violet",
    "translations": {
      "NIV": "Since, then, you have been raised with Christ, set your hearts on things above, where Christ is, seated at the right hand of God. Set your minds on things above, not on earthly things. For you died, and your life is now hidden with Christ in God. When Christ, who is your life, appears, then you also will appear with him in glory.",
      "TPT": "Since you were raised with the Messiah, pursue the things above, where Christ is seated at the right hand of God. Feast your thoughts continuously on the heavenly realm and not on this earthly realm! For you have died and your life is hidden with Christ in God. Yes, Christ is your life, and when he appears in all his glory, you will be revealed in glorious splendour with him!",
      "NLT": "Since you have been raised to new life with Christ, set your sights on the realities of heaven, where Christ sits in the place of honor at God's right hand. Think about the things of heaven, not the things of earth. For you died to this life, and your real life is hidden with Christ in God. And when Christ, who is your life, is revealed to the whole world, you will share in all his glory.",
      "NASB": "Therefore, if you have been raised with Christ, keep seeking the things that are above, where Christ is, seated at the right hand of God. Set your minds on things above, not on things on the earth. For you died, and your life is hidden with Christ in God. When Christ, who is our life, is revealed, then you also will be revealed with Him in glory."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 3:1\u20134 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1\u20134",
            "text": "Since, then, you have been raised with Christ, set your hearts on things above, where Christ is, seated at the right hand of God. Set your minds on things above, not on earthly things. For you died, and your life is now hidden with Christ in God. When Christ, who is your life, appears, then you also will appear with him in glory."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1\u20134",
            "text": "Since you were raised with the Messiah, pursue the things above, where Christ is seated at the right hand of God. Feast your thoughts continuously on the heavenly realm and not on this earthly realm! For you have died and your life is hidden with Christ in God. Yes, Christ is your life, and when he appears in all his glory, you will be revealed in glorious splendour with him!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1\u20134",
            "text": "Since you have been raised to new life with Christ, set your sights on the realities of heaven, where Christ sits in the place of honor at God's right hand. Think about the things of heaven, not the things of earth. For you died to this life, and your real life is hidden with Christ in God. And when Christ, who is your life, is revealed to the whole world, you will share in all his glory."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1\u20134",
            "text": "Therefore, if you have been raised with Christ, keep seeking the things that are above, where Christ is, seated at the right hand of God. Set your minds on things above, not on things on the earth. For you died, and your life is hidden with Christ in God. When Christ, who is our life, is revealed, then you also will be revealed with Him in glory."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 3:1\u20134.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 3:1\u20134.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 3:1\u20134.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 3:1\u20134."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 3:1\u20134."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 3:1\u20134 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 70,
    "ref": "Colossians 3:14\u201317",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "heart-handshake",
    "bentoSpan": "hero",
    "keyPhrase": "Over all these virtues put on love, which binds them all together in perfect unity",
    "themeColor": "violet",
    "translations": {
      "NIV": "And over all these virtues put on love, which binds them all together in perfect unity. Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful. Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit... And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
      "TPT": "And above all these things put on divine love, which is the perfect bond of unity. Let your hearts be always guided by the peace of the Anointed One... Let the word of Christ dwell in you richly in all wisdom, teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord. And whatever you do in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.",
      "NLT": "Above all, clothe yourselves with love, which binds us all together in perfect harmony. And let the peace that comes from Christ rule in your hearts. For as members of one body you are called to live in peace. And always be thankful. Let the message about Christ, in all its richness, fill your lives... And whatever you do or say, do it as a representative of the Lord Jesus, giving thanks through him to God the Father.",
      "NASB": "In addition to all these things put on love, which is the perfect bond of unity. Let the peace of Christ rule in your hearts, to which indeed you were called in one body; and be thankful. Let the word of Christ richly dwell within you, with all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs... Whatever you do in word or deed, do everything in the name of the Lord Jesus, giving thanks through Him to God the Father."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 3:14\u201317 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "14\u201317",
            "text": "And over all these virtues put on love, which binds them all together in perfect unity. Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful. Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit... And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "14\u201317",
            "text": "And above all these things put on divine love, which is the perfect bond of unity. Let your hearts be always guided by the peace of the Anointed One... Let the word of Christ dwell in you richly in all wisdom, teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord. And whatever you do in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "14\u201317",
            "text": "Above all, clothe yourselves with love, which binds us all together in perfect harmony. And let the peace that comes from Christ rule in your hearts. For as members of one body you are called to live in peace. And always be thankful. Let the message about Christ, in all its richness, fill your lives... And whatever you do or say, do it as a representative of the Lord Jesus, giving thanks through him to God the Father."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "14\u201317",
            "text": "In addition to all these things put on love, which is the perfect bond of unity. Let the peace of Christ rule in your hearts, to which indeed you were called in one body; and be thankful. Let the word of Christ richly dwell within you, with all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs... Whatever you do in word or deed, do everything in the name of the Lord Jesus, giving thanks through Him to God the Father."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 3:14\u201317.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 3:14\u201317.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 3:14\u201317.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 3:14\u201317."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 3:14\u201317."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 3:14\u201317 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 71,
    "ref": "Matthew 6:34",
    "book": "Matthew",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "calendar",
    "bentoSpan": "standard",
    "keyPhrase": "Therefore do not worry about tomorrow, for tomorrow will worry about itself",
    "themeColor": "teal",
    "translations": {
      "NIV": "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
      "TPT": "Refuse to worry about tomorrow, but deal with each challenge that comes your way, one day at a time. Tomorrow will take care of itself.",
      "NLT": "So don't worry about tomorrow, for tomorrow will bring its own worries. Today's trouble is enough for today.",
      "NASB": "So do not worry about tomorrow; for tomorrow will care for itself. Each day has enough trouble of its own."
    },
    "dynamicContext": {
      "chapterTitle": "Matthew 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Matthew 6:34 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "34",
            "text": "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "34",
            "text": "Refuse to worry about tomorrow, but deal with each challenge that comes your way, one day at a time. Tomorrow will take care of itself."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "34",
            "text": "So don't worry about tomorrow, for tomorrow will bring its own worries. Today's trouble is enough for today."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "34",
            "text": "So do not worry about tomorrow; for tomorrow will care for itself. Each day has enough trouble of its own."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Matthew 6:34.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Matthew 6:34.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Matthew 6:34.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Matthew 6:34."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Matthew 6:34."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Matthew 6:34 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 72,
    "ref": "Matthew 11:28\u201330",
    "book": "Matthew",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "coffee",
    "bentoSpan": "wide",
    "keyPhrase": "Come to me, all you who are weary and burdened, and I will give you rest",
    "themeColor": "teal",
    "translations": {
      "NIV": "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
      "TPT": "Come to me with your heavy burdens, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and humble in heart, and you will discover rest for your soul. For the yoke that I offer is pleasant to bear, and my burden is light.",
      "NLT": "Then Jesus said, 'Come to me, all of you who are weary and carry heavy burdens, and I will give you rest. Take my yoke upon you. Let me teach you, because I am humble and gentle at heart, and you will find rest for your souls. For my yoke is easy to bear, and the burden I give you is light.'",
      "NASB": "Come to Me, all who are weary and burdened, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and humble in heart, and you will find rest for your souls. For My yoke is easy and My burden is light."
    },
    "dynamicContext": {
      "chapterTitle": "Matthew 11 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Matthew 11:28\u201330 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "28\u201330",
            "text": "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "28\u201330",
            "text": "Come to me with your heavy burdens, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and humble in heart, and you will discover rest for your soul. For the yoke that I offer is pleasant to bear, and my burden is light."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "28\u201330",
            "text": "Then Jesus said, 'Come to me, all of you who are weary and carry heavy burdens, and I will give you rest. Take my yoke upon you. Let me teach you, because I am humble and gentle at heart, and you will find rest for your souls. For my yoke is easy to bear, and the burden I give you is light.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "28\u201330",
            "text": "Come to Me, all who are weary and burdened, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and humble in heart, and you will find rest for your souls. For My yoke is easy and My burden is light."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Matthew 11:28\u201330.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Matthew 11:28\u201330.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Matthew 11:28\u201330.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Matthew 11:28\u201330."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Matthew 11:28\u201330."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Matthew 11:28\u201330 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 73,
    "ref": "Psalm 4:8",
    "book": "Psalms",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "moon",
    "bentoSpan": "standard",
    "keyPhrase": "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety",
    "themeColor": "teal",
    "translations": {
      "NIV": "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.",
      "TPT": "Now, because of you and you alone, I will lie down in peace and fall asleep at once, for you alone, Yahweh, make me dwell in safety!",
      "NLT": "In peace I will lie down and sleep, for you alone, O LORD, will keep me safe.",
      "NASB": "In peace I will both lie down and sleep, for You alone, LORD, have me dwell in safety."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 4:8 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8",
            "text": "Now, because of you and you alone, I will lie down in peace and fall asleep at once, for you alone, Yahweh, make me dwell in safety!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "In peace I will lie down and sleep, for you alone, O LORD, will keep me safe."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8",
            "text": "In peace I will both lie down and sleep, for You alone, LORD, have me dwell in safety."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 4:8.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 4:8.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 4:8.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 4:8."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 4:8."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 4:8 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 74,
    "ref": "Philippians 4:8\u20139",
    "book": "Philippians",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "sparkles",
    "bentoSpan": "wide",
    "keyPhrase": "Whatever is true, whatever is noble, whatever is right, pure, lovely, admirable\u2014think about such things",
    "themeColor": "cyan",
    "translations": {
      "NIV": "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable\u2014if anything is excellent or praiseworthy\u2014think about such things. Whatever you have learned or received or heard from me, or seen in me\u2014put it into practice. And the God of peace will be with you.",
      "TPT": "Keep your minds fixed on whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable, whatever is excellent, and whatever is praiseworthy. Put into practice what you\u2019ve learned and received from me, both what you\u2019ve heard and seen. And the God of peace will be with you!",
      "NLT": "And now, dear brothers and sisters, one final thing. Fix your thoughts on what is true, and honorable, and right, and pure, and lovely, and admirable. Think about things that are excellent and worthy of praise. Keep putting into practice all you learned and received from me\u2014everything you heard from me and saw me doing. Then the God of peace will be with you.",
      "NASB": "Finally, brothers and sisters, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence and if anything worthy of praise, think about these things. As for the things you have learned and received and heard and seen in me, practice these things, and the God of peace will be with you."
    },
    "dynamicContext": {
      "chapterTitle": "Philippians 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Philippians 4:8\u20139 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8\u20139",
            "text": "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable\u2014if anything is excellent or praiseworthy\u2014think about such things. Whatever you have learned or received or heard from me, or seen in me\u2014put it into practice. And the God of peace will be with you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8\u20139",
            "text": "Keep your minds fixed on whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable, whatever is excellent, and whatever is praiseworthy. Put into practice what you\u2019ve learned and received from me, both what you\u2019ve heard and seen. And the God of peace will be with you!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8\u20139",
            "text": "And now, dear brothers and sisters, one final thing. Fix your thoughts on what is true, and honorable, and right, and pure, and lovely, and admirable. Think about things that are excellent and worthy of praise. Keep putting into practice all you learned and received from me\u2014everything you heard from me and saw me doing. Then the God of peace will be with you."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8\u20139",
            "text": "Finally, brothers and sisters, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence and if anything worthy of praise, think about these things. As for the things you have learned and received and heard and seen in me, practice these things, and the God of peace will be with you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Philippians 4:8\u20139.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Philippians 4:8\u20139.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Philippians 4:8\u20139.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Philippians 4:8\u20139."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Philippians 4:8\u20139."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Philippians 4:8\u20139 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 75,
    "ref": "Philippians 4:6\u20137",
    "book": "Philippians",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "heart",
    "bentoSpan": "tall",
    "keyPhrase": "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God",
    "themeColor": "teal",
    "translations": {
      "NIV": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      "TPT": "Don't be pulled in different directions or worried about a thing. Be saturated in prayer throughout each day, offering your faith-filled requests before God with overflowing gratitude. Tell him every detail of your life, then God's wonderful peace, that transcends human understanding, will make the answers known to your heart and mind through Jesus Christ.",
      "NLT": "Don't worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done. Then you will experience God's peace, which exceeds anything we can understand. His peace will guard your hearts and minds as you live in Christ Jesus.",
      "NASB": "Do not be anxious about anything, but in everything by prayer and pleading with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all comprehension, will guard your hearts and your minds in Christ Jesus."
    },
    "dynamicContext": {
      "chapterTitle": "Philippians 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Philippians 4:6\u20137 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "6\u20137",
            "text": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "6\u20137",
            "text": "Don't be pulled in different directions or worried about a thing. Be saturated in prayer throughout each day, offering your faith-filled requests before God with overflowing gratitude. Tell him every detail of your life, then God's wonderful peace, that transcends human understanding, will make the answers known to your heart and mind through Jesus Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "6\u20137",
            "text": "Don't worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done. Then you will experience God's peace, which exceeds anything we can understand. His peace will guard your hearts and minds as you live in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "6\u20137",
            "text": "Do not be anxious about anything, but in everything by prayer and pleading with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all comprehension, will guard your hearts and your minds in Christ Jesus."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Philippians 4:6\u20137.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Philippians 4:6\u20137.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Philippians 4:6\u20137.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Philippians 4:6\u20137."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Philippians 4:6\u20137."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Philippians 4:6\u20137 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 76,
    "ref": "John 14:27",
    "book": "John",
    "category": "peace-rest",
    "categoryLabel": "Peace & Rest",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "My peace I give you... Do not let your hearts be troubled and do not be afraid",
    "themeColor": "teal",
    "translations": {
      "NIV": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      "TPT": "I leave the gift of peace with you\u2014my peace. Not the kind of fragile peace given by the world, but my perfect peace. Don\u2019t yield to fear or be troubled in your hearts\u2014instead, be courageous!",
      "NLT": "I am leaving you with a gift\u2014peace of mind and heart. And the peace I give is a gift the world cannot give. So don't be troubled or afraid.",
      "NASB": "Peace I leave you, My peace I give you; not as the world gives, do I give to you. Do not let your hearts be troubled, nor fearful."
    },
    "dynamicContext": {
      "chapterTitle": "John 14 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 14:27 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "27",
            "text": "I leave the gift of peace with you\u2014my peace. Not the kind of fragile peace given by the world, but my perfect peace. Don\u2019t yield to fear or be troubled in your hearts\u2014instead, be courageous!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "I am leaving you with a gift\u2014peace of mind and heart. And the peace I give is a gift the world cannot give. So don't be troubled or afraid."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "27",
            "text": "Peace I leave you, My peace I give you; not as the world gives, do I give to you. Do not let your hearts be troubled, nor fearful."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 14:27.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 14:27.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 14:27.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 14:27."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 14:27."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 14:27 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 77,
    "ref": "John 8:31\u201332",
    "book": "John",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "key",
    "bentoSpan": "wide",
    "keyPhrase": "Then you will know the truth, and the truth will set you free",
    "themeColor": "cyan",
    "translations": {
      "NIV": "To the Jews who had believed him, Jesus said, 'If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.'",
      "TPT": "Jesus said to those who believed in him, 'If you continue to embrace the truth of what I teach, you will be my true disciples. You will know the truth, and the truth will release you into freedom.'",
      "NLT": "Jesus said to the people who believed in him, 'You are truly my disciples if you remain faithful to my teachings. And you will know the truth, and the truth will set you free.'",
      "NASB": "So Jesus was saying to those Jews who had believed Him, 'If you continue in My word, then you are truly disciples of Mine; and you will know the truth, and the truth will make you free.'"
    },
    "dynamicContext": {
      "chapterTitle": "John 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 8:31\u201332 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "To the Jews who had believed him, Jesus said, 'If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "Jesus said to those who believed in him, 'If you continue to embrace the truth of what I teach, you will be my true disciples. You will know the truth, and the truth will release you into freedom.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "Jesus said to the people who believed in him, 'You are truly my disciples if you remain faithful to my teachings. And you will know the truth, and the truth will set you free.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "31\u201332",
            "text": "So Jesus was saying to those Jews who had believed Him, 'If you continue in My word, then you are truly disciples of Mine; and you will know the truth, and the truth will make you free.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 8:31\u201332.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 8:31\u201332.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 8:31\u201332.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 8:31\u201332."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 8:31\u201332."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 8:31\u201332 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 78,
    "ref": "John 15:15\u201316",
    "book": "John",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "heart-handshake",
    "bentoSpan": "wide",
    "keyPhrase": "I have called you friends... I chose you and appointed you so that you might go and bear fruit",
    "themeColor": "violet",
    "translations": {
      "NIV": "I no longer call you servants, because a servant does not know his master\u2019s business. Instead, I have called you friends, for everything that I learned from my Father I have made known to you. You did not choose me, but I chose you and appointed you so that you might go and bear fruit\u2014fruit that will last.",
      "TPT": "I don't call you servants anymore, for a master doesn't explain his business to his servants. Now I call you friends, since I have shared with you everything the Father has revealed to me. You didn't choose me, but I've chosen and commissioned you to go into the world to bear fruit that will last lasting fruit.",
      "NLT": "I no longer call you slaves, because a master doesn't confide in his slaves. Now you are my friends, since I have told you everything the Father told me. You didn't choose me. I chose you. I appointed you to go and produce lasting fruit, so that the Father will give you whatever you ask for, using my name.",
      "NASB": "No longer do I call you slaves, for the slave does not know what his master is doing; but I have called you friends, because all things that I have heard from My Father I have made known to you. You did not choose Me but I chose you, and appointed you that you would go and bear fruit, and that your fruit would remain."
    },
    "dynamicContext": {
      "chapterTitle": "John 15 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of John 15:15\u201316 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "15\u201316",
            "text": "I no longer call you servants, because a servant does not know his master\u2019s business. Instead, I have called you friends, for everything that I learned from my Father I have made known to you. You did not choose me, but I chose you and appointed you so that you might go and bear fruit\u2014fruit that will last."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "15\u201316",
            "text": "I don't call you servants anymore, for a master doesn't explain his business to his servants. Now I call you friends, since I have shared with you everything the Father has revealed to me. You didn't choose me, but I've chosen and commissioned you to go into the world to bear fruit that will last lasting fruit."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "15\u201316",
            "text": "I no longer call you slaves, because a master doesn't confide in his slaves. Now you are my friends, since I have told you everything the Father told me. You didn't choose me. I chose you. I appointed you to go and produce lasting fruit, so that the Father will give you whatever you ask for, using my name."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "15\u201316",
            "text": "No longer do I call you slaves, for the slave does not know what his master is doing; but I have called you friends, because all things that I have heard from My Father I have made known to you. You did not choose Me but I chose you, and appointed you that you would go and bear fruit, and that your fruit would remain."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in John 15:15\u201316.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in John 15:15\u201316.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in John 15:15\u201316.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in John 15:15\u201316."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of John 15:15\u201316."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, John 15:15\u201316 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 79,
    "ref": "Titus 3:3\u20137",
    "book": "Titus",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "droplets",
    "bentoSpan": "hero",
    "keyPhrase": "He saved us, not because of righteous things we had done, but because of his mercy",
    "themeColor": "violet",
    "translations": {
      "NIV": "At one time we too were foolish, disobedient, deceived and enslaved by all kinds of passions and pleasures... But when the kindness and love of God our Savior appeared, he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit, whom he poured out on us generously through Jesus Christ our Savior, so that, having been justified by his grace, we might become heirs having the hope of eternal life.",
      "TPT": "For there was a time when we too were foolish, rebellious, deceived, and enslaved by many passions and pleasures... But when the extraordinary compassion and love of God our Savior shone upon us, he saved us! Not because we were good or did righteous things, but because of his rich mercy. He washed away our sins, giving us a new birth and a new life through the Holy Spirit. He poured out this Spirit on us generously through Jesus Christ our Savior.",
      "NLT": "Once we, too, were foolish and disobedient. We were misled and became slaves to many lusts and pleasures... But\u2014When God our Savior revealed his kindness and love, he saved us, not because of the righteous things we had done, but because of his mercy. He washed away our sins, giving us a new birth and new life through the Holy Spirit. He generously poured out the Spirit upon us through Jesus Christ our Savior.",
      "NASB": "For we too were once foolish, disobedient, deceived, enslaved to various lusts and pleasures... But when the kindness of God our Savior and His love for mankind appeared, He saved us, not on the basis of deeds which we have done in righteousness, but according to His mercy, by the washing of regeneration and renewing by the Holy Spirit, whom He poured out upon us richly through Jesus Christ our Savior, so that being justified by His grace we would be made heirs according to the hope of eternal life."
    },
    "dynamicContext": {
      "chapterTitle": "Titus 3 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Titus 3:3\u20137 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "3\u20137",
            "text": "At one time we too were foolish, disobedient, deceived and enslaved by all kinds of passions and pleasures... But when the kindness and love of God our Savior appeared, he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit, whom he poured out on us generously through Jesus Christ our Savior, so that, having been justified by his grace, we might become heirs having the hope of eternal life."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "3\u20137",
            "text": "For there was a time when we too were foolish, rebellious, deceived, and enslaved by many passions and pleasures... But when the extraordinary compassion and love of God our Savior shone upon us, he saved us! Not because we were good or did righteous things, but because of his rich mercy. He washed away our sins, giving us a new birth and a new life through the Holy Spirit. He poured out this Spirit on us generously through Jesus Christ our Savior."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "3\u20137",
            "text": "Once we, too, were foolish and disobedient. We were misled and became slaves to many lusts and pleasures... But\u2014When God our Savior revealed his kindness and love, he saved us, not because of the righteous things we had done, but because of his mercy. He washed away our sins, giving us a new birth and new life through the Holy Spirit. He generously poured out the Spirit upon us through Jesus Christ our Savior."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "3\u20137",
            "text": "For we too were once foolish, disobedient, deceived, enslaved to various lusts and pleasures... But when the kindness of God our Savior and His love for mankind appeared, He saved us, not on the basis of deeds which we have done in righteousness, but according to His mercy, by the washing of regeneration and renewing by the Holy Spirit, whom He poured out upon us richly through Jesus Christ our Savior, so that being justified by His grace we would be made heirs according to the hope of eternal life."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Titus 3:3\u20137.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Titus 3:3\u20137.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Titus 3:3\u20137.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Titus 3:3\u20137."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Titus 3:3\u20137."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Titus 3:3\u20137 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 80,
    "ref": "Colossians 1:21\u201323",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "award",
    "bentoSpan": "wide",
    "keyPhrase": "He has reconciled you by Christ\u2019s physical body through death to present you holy in his sight",
    "themeColor": "violet",
    "translations": {
      "NIV": "Once you were alienated from God and were enemies in your minds because of your evil behavior. But now he has reconciled you by Christ\u2019s physical body through death to present you holy in his sight, without blemish and free from accusation\u2014if you continue in your faith, established and firm, and do not move from the hope held out in the gospel.",
      "TPT": "Even though you were once distant from God, living as his enemies in your minds and with behavior that was evil, he has now reconciled you to himself in his physical body through death, so that he may present you before him holy, without fault, and unblamable\u2014if indeed you continue in the faith, securely grounded and steadfast, never moving away from the hope of the good news.",
      "NLT": "This includes you who were once far away from God. You were his enemies, separated from him by your evil thoughts and actions. Yet now he has reconciled you to himself through the death of Christ in his physical body. As a result, he has brought you into his own presence, and you are holy and blameless as you stand before him without a single fault.",
      "NASB": "And although you were formerly alienated and hostile in mind, engaged in evil deeds, yet He has now reconciled you in His body of flesh through death, in order to present you before Him holy and blameless and beyond reproach\u2014if indeed you continue in the faith firmly established and steadfast, and not moved away from the hope of the gospel."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 1:21\u201323 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "21\u201323",
            "text": "Once you were alienated from God and were enemies in your minds because of your evil behavior. But now he has reconciled you by Christ\u2019s physical body through death to present you holy in his sight, without blemish and free from accusation\u2014if you continue in your faith, established and firm, and do not move from the hope held out in the gospel."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "21\u201323",
            "text": "Even though you were once distant from God, living as his enemies in your minds and with behavior that was evil, he has now reconciled you to himself in his physical body through death, so that he may present you before him holy, without fault, and unblamable\u2014if indeed you continue in the faith, securely grounded and steadfast, never moving away from the hope of the good news."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "21\u201323",
            "text": "This includes you who were once far away from God. You were his enemies, separated from him by your evil thoughts and actions. Yet now he has reconciled you to himself through the death of Christ in his physical body. As a result, he has brought you into his own presence, and you are holy and blameless as you stand before him without a single fault."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "21\u201323",
            "text": "And although you were formerly alienated and hostile in mind, engaged in evil deeds, yet He has now reconciled you in His body of flesh through death, in order to present you before Him holy and blameless and beyond reproach\u2014if indeed you continue in the faith firmly established and steadfast, and not moved away from the hope of the gospel."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 1:21\u201323.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 1:21\u201323.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 1:21\u201323.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 1:21\u201323."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 1:21\u201323."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 1:21\u201323 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 81,
    "ref": "Ephesians 2:19",
    "book": "Ephesians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "home",
    "bentoSpan": "standard",
    "keyPhrase": "You are no longer foreigners and strangers, but fellow citizens with God\u2019s people and also members of his household",
    "themeColor": "violet",
    "translations": {
      "NIV": "Consequently, you are no longer foreigners and strangers, but fellow citizens with God\u2019s people and also members of his household.",
      "TPT": "So now, you who were once outcasts are no longer foreigners and strangers, but fellow citizens with God\u2019s holy people and members of his household.",
      "NLT": "So now you Gentiles are no longer strangers and foreigners. You are citizens along with all of God's holy people. You are members of God's family.",
      "NASB": "So then you are no longer strangers and foreigners, but you are fellow citizens with the saints, and are of God's household."
    },
    "dynamicContext": {
      "chapterTitle": "Ephesians 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Ephesians 2:19 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "Consequently, you are no longer foreigners and strangers, but fellow citizens with God\u2019s people and also members of his household."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "19",
            "text": "So now, you who were once outcasts are no longer foreigners and strangers, but fellow citizens with God\u2019s holy people and members of his household."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "So now you Gentiles are no longer strangers and foreigners. You are citizens along with all of God's holy people. You are members of God's family."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "19",
            "text": "So then you are no longer strangers and foreigners, but you are fellow citizens with the saints, and are of God's household."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Ephesians 2:19.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Ephesians 2:19.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Ephesians 2:19.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Ephesians 2:19."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Ephesians 2:19."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Ephesians 2:19 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 82,
    "ref": "Ephesians 2:13",
    "book": "Ephesians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "heart",
    "bentoSpan": "standard",
    "keyPhrase": "Now in Christ Jesus you who once were far away have been brought near by the blood of Christ",
    "themeColor": "violet",
    "translations": {
      "NIV": "But now in Christ Jesus you who once were far away have been brought near by the blood of Christ.",
      "TPT": "Yet look at you now! Everything has changed. Once you were far off from God, but now you have been brought near to him through the blood of Christ.",
      "NLT": "But now you have been united with Christ Jesus. Once you were far away from God, but now you have been brought near to him through the blood of Christ.",
      "NASB": "But now in Christ Jesus you who previously were far away have been brought near by the blood of Christ."
    },
    "dynamicContext": {
      "chapterTitle": "Ephesians 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Ephesians 2:13 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "But now in Christ Jesus you who once were far away have been brought near by the blood of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "13",
            "text": "Yet look at you now! Everything has changed. Once you were far off from God, but now you have been brought near to him through the blood of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "But now you have been united with Christ Jesus. Once you were far away from God, but now you have been brought near to him through the blood of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "13",
            "text": "But now in Christ Jesus you who previously were far away have been brought near by the blood of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Ephesians 2:13.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Ephesians 2:13.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Ephesians 2:13.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Ephesians 2:13."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Ephesians 2:13."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Ephesians 2:13 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 83,
    "ref": "Ephesians 1:4\u20137",
    "book": "Ephesians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "crown",
    "bentoSpan": "hero",
    "keyPhrase": "He chose us in him before the creation of the world to be holy and blameless in his sight",
    "themeColor": "violet",
    "translations": {
      "NIV": "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will\u2014to the praise of his glorious grace, which he has freely given us in the One he loves. In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\u2019s grace.",
      "TPT": "And he chose us to be his very own, through our union with Christ, before he created the world! In his love he planned long ago to adopt us into his family through Jesus Christ, according to the pleasure of his will... In him we have redemption through his blood, the forgiveness of our sins, lavishly poured out upon us according to the riches of his grace.",
      "NLT": "Even before he made the world, God loved us and chose us in Christ to be holy and without fault in his eyes. God decided in advance to adopt us into his own family by bringing us to himself through Jesus Christ. This is what he wanted to do, and it gave him great pleasure... He is so rich in kindness and grace that he purchased our freedom with the blood of his Son and forgave our sins.",
      "NASB": "Just as He chose us in Him before the foundation of the world, that we would be holy and blameless before Him in love, He predestined us to adoption as sons through Jesus Christ to Himself, according to the kind intention of His will, to the praise of the glory of His grace... In Him we have redemption through His blood, the forgiveness of our wrongdoings, according to the riches of His grace."
    },
    "dynamicContext": {
      "chapterTitle": "Ephesians 1 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Ephesians 1:4\u20137 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will\u2014to the praise of his glorious grace, which he has freely given us in the One he loves. In him we have redemption through his blood, the forgiveness of sins, in accordance with the riches of God\u2019s grace."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "And he chose us to be his very own, through our union with Christ, before he created the world! In his love he planned long ago to adopt us into his family through Jesus Christ, according to the pleasure of his will... In him we have redemption through his blood, the forgiveness of our sins, lavishly poured out upon us according to the riches of his grace."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "Even before he made the world, God loved us and chose us in Christ to be holy and without fault in his eyes. God decided in advance to adopt us into his own family by bringing us to himself through Jesus Christ. This is what he wanted to do, and it gave him great pleasure... He is so rich in kindness and grace that he purchased our freedom with the blood of his Son and forgave our sins."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "Just as He chose us in Him before the foundation of the world, that we would be holy and blameless before Him in love, He predestined us to adoption as sons through Jesus Christ to Himself, according to the kind intention of His will, to the praise of the glory of His grace... In Him we have redemption through His blood, the forgiveness of our wrongdoings, according to the riches of His grace."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Ephesians 1:4\u20137.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Ephesians 1:4\u20137.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Ephesians 1:4\u20137.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Ephesians 1:4\u20137."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Ephesians 1:4\u20137."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Ephesians 1:4\u20137 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 84,
    "ref": "2 Corinthians 6:16",
    "book": "2 Corinthians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "church",
    "bentoSpan": "standard",
    "keyPhrase": "For we are the temple of the living God. As God has said: 'I will live with them and walk among them'",
    "themeColor": "violet",
    "translations": {
      "NIV": "What agreement is there between the temple of God and idols? For we are the temple of the living God. As God has said: 'I will live with them and walk among them, and I will be their God, and they will be my people.'",
      "TPT": "What union can there be between God\u2019s temple and idols? For we are the temple of the living God! As God has said, 'I will live and walk among them, and I will be their God, and they will be my loving people.'",
      "NLT": "And what union can there be between God's temple and idols? For we are the temple of the living God. As God said: 'I will live in them and walk among them. I will be their God, and they will be my people.'",
      "NASB": "Or what agreement does the temple of God have with idols? For we are the temple of the living God; just as God said, 'I will dwell among them and walk among them; and I will be their God, and they shall be My people.'"
    },
    "dynamicContext": {
      "chapterTitle": "2 Corinthians 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Corinthians 6:16 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "What agreement is there between the temple of God and idols? For we are the temple of the living God. As God has said: 'I will live with them and walk among them, and I will be their God, and they will be my people.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "16",
            "text": "What union can there be between God\u2019s temple and idols? For we are the temple of the living God! As God has said, 'I will live and walk among them, and I will be their God, and they will be my loving people.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "And what union can there be between God's temple and idols? For we are the temple of the living God. As God said: 'I will live in them and walk among them. I will be their God, and they will be my people.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "Or what agreement does the temple of God have with idols? For we are the temple of the living God; just as God said, 'I will dwell among them and walk among them; and I will be their God, and they shall be My people.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 2 Corinthians 6:16.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 2 Corinthians 6:16.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 2 Corinthians 6:16.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 2 Corinthians 6:16."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 2 Corinthians 6:16."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 2 Corinthians 6:16 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 85,
    "ref": "1 Corinthians 2:16",
    "book": "1 Corinthians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "brain",
    "bentoSpan": "standard",
    "keyPhrase": "For, 'Who has known the mind of the Lord so as to instruct him?' But we have the mind of Christ",
    "themeColor": "violet",
    "translations": {
      "NIV": "For, 'Who has known the mind of the Lord so as to instruct him?' But we have the mind of Christ.",
      "TPT": "For 'Who has known the mind of the Lord to advise him?' But we have the mind of Christ!",
      "NLT": "For, 'Who can know the LORD's thoughts? Who can know enough to teach him?' But we understand these things, for we have the mind of Christ.",
      "NASB": "For WHO HAS KNOWN THE MIND OF THE LORD, THAT HE WILL ADVISE HIM? But we have the mind of Christ."
    },
    "dynamicContext": {
      "chapterTitle": "1 Corinthians 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 1 Corinthians 2:16 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For, 'Who has known the mind of the Lord so as to instruct him?' But we have the mind of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "16",
            "text": "For 'Who has known the mind of the Lord to advise him?' But we have the mind of Christ!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For, 'Who can know the LORD's thoughts? Who can know enough to teach him?' But we understand these things, for we have the mind of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "16",
            "text": "For WHO HAS KNOWN THE MIND OF THE LORD, THAT HE WILL ADVISE HIM? But we have the mind of Christ."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 1 Corinthians 2:16.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 1 Corinthians 2:16.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 1 Corinthians 2:16.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 1 Corinthians 2:16."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 1 Corinthians 2:16."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 1 Corinthians 2:16 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 86,
    "ref": "1 Corinthians 6:17",
    "book": "1 Corinthians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "link",
    "bentoSpan": "standard",
    "keyPhrase": "Whoever is united with the Lord is one with him in spirit",
    "themeColor": "violet",
    "translations": {
      "NIV": "But whoever is united with the Lord is one with him in spirit.",
      "TPT": "But the one who joins himself to the Lord is one spirit with him.",
      "NLT": "But the person who is joined to the Lord is one spirit with him.",
      "NASB": "But the one who joins himself to the Lord is one spirit with Him."
    },
    "dynamicContext": {
      "chapterTitle": "1 Corinthians 6 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 1 Corinthians 6:17 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "But whoever is united with the Lord is one with him in spirit."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "17",
            "text": "But the one who joins himself to the Lord is one spirit with him."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "But the person who is joined to the Lord is one spirit with him."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "But the one who joins himself to the Lord is one spirit with Him."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 1 Corinthians 6:17.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 1 Corinthians 6:17.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 1 Corinthians 6:17.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 1 Corinthians 6:17."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 1 Corinthians 6:17."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 1 Corinthians 6:17 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 87,
    "ref": "Galatians 4:4\u20137",
    "book": "Galatians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "heart",
    "bentoSpan": "wide",
    "keyPhrase": "God sent the Spirit of his Son into our hearts, the Spirit who calls out, 'Abba, Father.' So you are no longer a slave, but God\u2019s child",
    "themeColor": "violet",
    "translations": {
      "NIV": "But when the set time had fully come, God sent his Son, born of a woman, born under the law, to redeem those under the law, that we might receive adoption to sonship. Because you are his sons, God sent the Spirit of his Son into our hearts, the Spirit who calls out, 'Abba, Father.' So you are no longer a slave, but God\u2019s child; and since you are his child, God has made you also an heir.",
      "TPT": "But when the right time arrived, God sent his Son into the world, born of a woman and subject to the law... so that we might be adopted as his own sons and daughters! And because you are his children, God has poured the Spirit of his Son into our hearts, crying out, 'Abba, Father!' So now you are no longer a slave, but a child of God, and an heir through Christ!",
      "NLT": "But when the right time came, God sent his Son, born of a woman, subject to the law. God sent him to buy freedom for us who were slaves to the law, so that he could adopt us as his very own children. And because we are his children, God has sent the Spirit of his Son into our hearts, prompting us to call out, 'Abba, Father.' Now you are no longer a slave but God's own child. And since you are his child, God has made you his heir.",
      "NASB": "But when the fullness of the time came, God sent His Son, born of a woman, born under the Law, so that He might redeem those who were under the Law, that we might receive the adoption as sons and daughters. Because you are sons, God has sent the Spirit of His Son into our hearts, crying out, 'Abba! Father!' Therefore you are no longer a slave, but a son; and if a son, then an heir through God."
    },
    "dynamicContext": {
      "chapterTitle": "Galatians 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Galatians 4:4\u20137 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "But when the set time had fully come, God sent his Son, born of a woman, born under the law, to redeem those under the law, that we might receive adoption to sonship. Because you are his sons, God sent the Spirit of his Son into our hearts, the Spirit who calls out, 'Abba, Father.' So you are no longer a slave, but God\u2019s child; and since you are his child, God has made you also an heir."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "But when the right time arrived, God sent his Son into the world, born of a woman and subject to the law... so that we might be adopted as his own sons and daughters! And because you are his children, God has poured the Spirit of his Son into our hearts, crying out, 'Abba, Father!' So now you are no longer a slave, but a child of God, and an heir through Christ!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "But when the right time came, God sent his Son, born of a woman, subject to the law. God sent him to buy freedom for us who were slaves to the law, so that he could adopt us as his very own children. And because we are his children, God has sent the Spirit of his Son into our hearts, prompting us to call out, 'Abba, Father.' Now you are no longer a slave but God's own child. And since you are his child, God has made you his heir."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "4\u20137",
            "text": "But when the fullness of the time came, God sent His Son, born of a woman, born under the Law, so that He might redeem those who were under the Law, that we might receive the adoption as sons and daughters. Because you are sons, God has sent the Spirit of His Son into our hearts, crying out, 'Abba! Father!' Therefore you are no longer a slave, but a son; and if a son, then an heir through God."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Galatians 4:4\u20137.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Galatians 4:4\u20137.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Galatians 4:4\u20137.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Galatians 4:4\u20137."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Galatians 4:4\u20137."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Galatians 4:4\u20137 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 88,
    "ref": "2 Corinthians 5:17",
    "book": "2 Corinthians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "sparkles",
    "bentoSpan": "standard",
    "keyPhrase": "If anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    "themeColor": "violet",
    "translations": {
      "NIV": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      "TPT": "Now, if anyone is enfolded into Christ, he has become an entirely new creation. All that is related to the old order has vanished, and behold, everything is fresh and new!",
      "NLT": "This means that anyone who belongs to Christ has become a new person. The old life is gone; a new life has begun!",
      "NASB": "Therefore if anyone is in Christ, this person is a new creation; the old things passed away; behold, new things have come."
    },
    "dynamicContext": {
      "chapterTitle": "2 Corinthians 5 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Corinthians 5:17 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "17",
            "text": "Now, if anyone is enfolded into Christ, he has become an entirely new creation. All that is related to the old order has vanished, and behold, everything is fresh and new!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "This means that anyone who belongs to Christ has become a new person. The old life is gone; a new life has begun!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "Therefore if anyone is in Christ, this person is a new creation; the old things passed away; behold, new things have come."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 2 Corinthians 5:17.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 2 Corinthians 5:17.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 2 Corinthians 5:17.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 2 Corinthians 5:17."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 2 Corinthians 5:17."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 2 Corinthians 5:17 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 89,
    "ref": "1 Peter 2:24",
    "book": "1 Peter",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "heart-pulse",
    "bentoSpan": "wide",
    "keyPhrase": "By his wounds you have been healed",
    "themeColor": "purple",
    "translations": {
      "NIV": "'He himself bore our sins' in his body on the cross, so that we might die to sins and live for righteousness; 'by his wounds you have been healed.'",
      "TPT": "He himself carried our sins in his body on the cross so that we might die to sin and live for righteousness. By his wounds you were healed.",
      "NLT": "He personally carried our sins in his body on the cross so that we can be dead to sin and live for what is right. By his wounds you are healed.",
      "NASB": "and He Himself brought our sins in His body up on the cross, so that we might die to sin and live for righteousness; by His wounds you were healed."
    },
    "dynamicContext": {
      "chapterTitle": "1 Peter 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 1 Peter 2:24 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "'He himself bore our sins' in his body on the cross, so that we might die to sins and live for righteousness; 'by his wounds you have been healed.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "24",
            "text": "He himself carried our sins in his body on the cross so that we might die to sin and live for righteousness. By his wounds you were healed."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "He personally carried our sins in his body on the cross so that we can be dead to sin and live for what is right. By his wounds you are healed."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "24",
            "text": "and He Himself brought our sins in His body up on the cross, so that we might die to sin and live for righteousness; by His wounds you were healed."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 1 Peter 2:24.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 1 Peter 2:24.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 1 Peter 2:24.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 1 Peter 2:24."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 1 Peter 2:24."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 1 Peter 2:24 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 90,
    "ref": "2 Chronicles 20:17",
    "book": "2 Chronicles",
    "category": "courage-protection",
    "categoryLabel": "Victory & Power",
    "icon": "flag",
    "bentoSpan": "wide",
    "keyPhrase": "You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the LORD will give you",
    "themeColor": "rose",
    "translations": {
      "NIV": "You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the LORD will give you, Judah and Jerusalem. Do not be afraid; do not be discouraged. Go out to face them tomorrow, and the LORD will be with you.",
      "TPT": "You won't even need to fight this battle! Just take your positions, stand firm, and watch the deliverance of Yahweh on your behalf, Judah and Jerusalem! Do not fear or be dismayed. Go out tomorrow to face them, for Yahweh is with you!",
      "NLT": "But you will not even need to fight. Take your positions; then stand still and watch the LORD's victory. He is with you, O people of Judah and Jerusalem. Do not be afraid or discouraged. Go out against them tomorrow, for the LORD is with you!",
      "NASB": "You need not fight in this battle; take your positions, stand and see the salvation of the LORD on your behalf, Judah and Jerusalem. Do not fear or be dismayed; tomorrow go out to face them, for the LORD is with you."
    },
    "dynamicContext": {
      "chapterTitle": "2 Chronicles 20 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 2 Chronicles 20:17 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "You will not have to fight this battle. Take up your positions; stand firm and see the deliverance the LORD will give you, Judah and Jerusalem. Do not be afraid; do not be discouraged. Go out to face them tomorrow, and the LORD will be with you."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "17",
            "text": "You won't even need to fight this battle! Just take your positions, stand firm, and watch the deliverance of Yahweh on your behalf, Judah and Jerusalem! Do not fear or be dismayed. Go out tomorrow to face them, for Yahweh is with you!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "But you will not even need to fight. Take your positions; then stand still and watch the LORD's victory. He is with you, O people of Judah and Jerusalem. Do not be afraid or discouraged. Go out against them tomorrow, for the LORD is with you!"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "17",
            "text": "You need not fight in this battle; take your positions, stand and see the salvation of the LORD on your behalf, Judah and Jerusalem. Do not fear or be dismayed; tomorrow go out to face them, for the LORD is with you."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in 2 Chronicles 20:17.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in 2 Chronicles 20:17.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in 2 Chronicles 20:17.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in 2 Chronicles 20:17."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in 2 Chronicles 20:17."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, 2 Chronicles 20:17 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 91,
    "ref": "1 John 4:4",
    "book": "1 John",
    "category": "courage-protection",
    "categoryLabel": "Victory & Power",
    "icon": "shield-check",
    "bentoSpan": "standard",
    "keyPhrase": "The one who is in you is greater than the one who is in the world",
    "themeColor": "rose",
    "translations": {
      "NIV": "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world.",
      "TPT": "Little children, you can be certain that you belong to God and have conquered them, for the One who is in you is far greater than the one who is in the world.",
      "NLT": "But you belong to God, my dear children. You have already won a victory over those people, because the Spirit who lives in you is greater than the spirit who lives in the world.",
      "NASB": "You are from God, little children, and have overcome them; because greater is He who is in you than he who is in the world."
    },
    "dynamicContext": {
      "chapterTitle": "1 John 4 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of 1 John 4:4 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "4",
            "text": "Little children, you can be certain that you belong to God and have conquered them, for the One who is in you is far greater than the one who is in the world."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "But you belong to God, my dear children. You have already won a victory over those people, because the Spirit who lives in you is greater than the spirit who lives in the world."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "4",
            "text": "You are from God, little children, and have overcome them; because greater is He who is in you than he who is in the world."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in 1 John 4:4.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in 1 John 4:4.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in 1 John 4:4.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in 1 John 4:4."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of 1 John 4:4."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, 1 John 4:4 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 92,
    "ref": "Nehemiah 8:10",
    "book": "Nehemiah",
    "category": "joy-presence",
    "categoryLabel": "Joy & Presence",
    "icon": "sparkles",
    "bentoSpan": "standard",
    "keyPhrase": "Do not grieve, for the joy of the LORD is your strength",
    "themeColor": "amber",
    "translations": {
      "NIV": "Nehemiah said, 'Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the LORD is your strength.'",
      "TPT": "Then he said to them, 'Go on your way, eat rich food, drink sweet drinks, and send portions to him who has nothing prepared; for this day is holy to our Lord. Do not sorrow, for the joy of Yahweh is your strength!'",
      "NLT": "And Nehemiah continued, 'Go and celebrate with a feast of rich foods and sweet drinks, and share gifts of food with people who have nothing prepared. This is a sacred day before our Lord. Don't be dejected and sad, for the joy of the LORD is your strength!'",
      "NASB": "Then he said to them, 'Go, eat of the fat, drink of the sweet, and send portions to him who has nothing prepared; for this day is holy to our Lord. Do not be grieved, for the joy of the LORD is your strength.'"
    },
    "dynamicContext": {
      "chapterTitle": "Nehemiah 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Nehemiah 8:10 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Nehemiah said, 'Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the LORD is your strength.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "10",
            "text": "Then he said to them, 'Go on your way, eat rich food, drink sweet drinks, and send portions to him who has nothing prepared; for this day is holy to our Lord. Do not sorrow, for the joy of Yahweh is your strength!'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "And Nehemiah continued, 'Go and celebrate with a feast of rich foods and sweet drinks, and share gifts of food with people who have nothing prepared. This is a sacred day before our Lord. Don't be dejected and sad, for the joy of the LORD is your strength!'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "10",
            "text": "Then he said to them, 'Go, eat of the fat, drink of the sweet, and send portions to him who has nothing prepared; for this day is holy to our Lord. Do not be grieved, for the joy of the LORD is your strength.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Nehemiah 8:10.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Nehemiah 8:10.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Nehemiah 8:10.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Nehemiah 8:10."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Nehemiah 8:10."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Nehemiah 8:10 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 93,
    "ref": "Psalm 23:1",
    "book": "Psalms",
    "category": "provision-abundance",
    "categoryLabel": "Faith & Provision",
    "icon": "shield-plus",
    "bentoSpan": "standard",
    "keyPhrase": "The LORD is my shepherd, I lack nothing",
    "themeColor": "emerald",
    "translations": {
      "NIV": "The LORD is my shepherd, I lack nothing.",
      "TPT": "Yahweh is my best friend and my shepherd; I always have more than enough.",
      "NLT": "The LORD is my shepherd; I have all that I need.",
      "NASB": "The LORD is my shepherd, I will not be in need."
    },
    "dynamicContext": {
      "chapterTitle": "Psalm 23 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Psalm 23:1 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my shepherd, I lack nothing."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "1",
            "text": "Yahweh is my best friend and my shepherd; I always have more than enough."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my shepherd; I have all that I need."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "1",
            "text": "The LORD is my shepherd, I will not be in need."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Biblical Hebrew (Old Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Proclaims God's [covenant lovingkindness]{H2617} and [supernatural peace]{H7965} in Psalm 23:1.",
        "TPT": "Unveils God's [unfailing mercy]{H2617} and [divine wholeness]{H7965} in Psalm 23:1.",
        "NLT": "Guarantees God's [faithful love]{H2617} and [abundant peace]{H7965} in Psalm 23:1.",
        "NASB": "Establishes God's [lovingkindness]{H2617} and [covenant shalom]{H7965} in Psalm 23:1."
      },
      "keyTerms": [
        {
          "strongs": "H2617",
          "word": "\u05d7\u05b6\u05e1\u05b6\u05d3",
          "transliteration": "\u1e25ese\u1e0f (chesed)",
          "pronunciation": "kheh'-sed",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "lovingkindness / unfailing mercy",
          "root": "Ardent, loyal, unbreakable covenant devotion",
          "definition": "Steadfast love, unfailing covenant mercy, relentless favor that never abandons its object.",
          "usageInPassage": "The bedrock guarantee of God's character in Psalm 23:1."
        },
        {
          "strongs": "H7965",
          "word": "\u05e9\u05b8\u05c1\u05dc\u05d5\u05b9\u05dd",
          "transliteration": "\u0161\u0101l\u00f4m (shalom)",
          "pronunciation": "shaw-lome'",
          "partOfSpeech": "Noun Masculine",
          "matchedEnglish": "peace / wholeness",
          "root": "From shalam (to make complete, sound, whole, restore)",
          "definition": "Completeness, soundness, health, safety, prosperity, total absence of disturbance; nothing broken and nothing missing.",
          "usageInPassage": "The atmospheric peace and provision given by Yahweh."
        }
      ],
      "theologicalSummary": "In Biblical Hebrew, Psalm 23:1 carries the full weight of covenant certainty ('Hesed' & 'Shalom'), finding its ultimate 'Yes and Amen' in Christ Jesus."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 94,
    "ref": "Matthew 8:16\u201317",
    "book": "Matthew",
    "category": "healing-renewal",
    "categoryLabel": "Healing & Renewal",
    "icon": "activity",
    "bentoSpan": "wide",
    "keyPhrase": "He took up our infirmities and bore our diseases",
    "themeColor": "purple",
    "translations": {
      "NIV": "When evening came, many who were demon-possessed were brought to him, and he drove out the spirits with a word and healed all the sick. This was to fulfill what was spoken through the prophet Isaiah: 'He took up our infirmities and bore our diseases.'",
      "TPT": "When evening came, they brought to him many who were demonized, and he drove out the evil spirits with a word and healed all who were sick. This fulfilled what was spoken through Isaiah the prophet: 'He himself took our weaknesses and bore our diseases.'",
      "NLT": "That evening many demon-possessed people were brought to Jesus. He cast out the evil spirits with a simple command, and he healed all the sick. This fulfilled the word of the LORD through the prophet Isaiah, who said, 'He took our sicknesses and removed our diseases.'",
      "NASB": "Now when evening came, they brought to Him many who were demon-possessed; and He cast out the spirits with a word, and healed all who were ill. This occurred so that what was spoken through Isaiah the prophet would be fulfilled: 'HE HIMSELF TOOK OUR ILLNESSES AND CARRIED AWAY OUR DISEASES.'"
    },
    "dynamicContext": {
      "chapterTitle": "Matthew 8 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Matthew 8:16\u201317 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "16\u201317",
            "text": "When evening came, many who were demon-possessed were brought to him, and he drove out the spirits with a word and healed all the sick. This was to fulfill what was spoken through the prophet Isaiah: 'He took up our infirmities and bore our diseases.'"
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "16\u201317",
            "text": "When evening came, they brought to him many who were demonized, and he drove out the evil spirits with a word and healed all who were sick. This fulfilled what was spoken through Isaiah the prophet: 'He himself took our weaknesses and bore our diseases.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "16\u201317",
            "text": "That evening many demon-possessed people were brought to Jesus. He cast out the evil spirits with a simple command, and he healed all the sick. This fulfilled the word of the LORD through the prophet Isaiah, who said, 'He took our sicknesses and removed our diseases.'"
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "16\u201317",
            "text": "Now when evening came, they brought to Him many who were demon-possessed; and He cast out the spirits with a word, and healed all who were ill. This occurred so that what was spoken through Isaiah the prophet would be fulfilled: 'HE HIMSELF TOOK OUR ILLNESSES AND CARRIED AWAY OUR DISEASES.'"
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Matthew 8:16\u201317.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Matthew 8:16\u201317.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Matthew 8:16\u201317.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Matthew 8:16\u201317."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Matthew 8:16\u201317."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Matthew 8:16\u201317 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 95,
    "ref": "Ephesians 5:8\u201311",
    "book": "Ephesians",
    "category": "wisdom-word",
    "categoryLabel": "Wisdom & Truth",
    "icon": "sun",
    "bentoSpan": "wide",
    "keyPhrase": "For you were once darkness, but now you are light in the Lord. Live as children of light",
    "themeColor": "cyan",
    "translations": {
      "NIV": "For you were once darkness, but now you are light in the Lord. Live as children of light (for the fruit of the light consists in all goodness, righteousness and truth) and find out what pleases the Lord. Have nothing to do with the fruitless deeds of darkness, but rather expose them.",
      "TPT": "Once your life was full of darkness, but now you are full of light in the Lord. Live then as children of light! For the fruit produced by the light consists of all goodness, righteousness, and truth, discovering what pleases the Lord. Have nothing to do with the unproductive deeds of darkness, but instead expose them.",
      "NLT": "For once you were full of darkness, but now you have light from the Lord. So live as people of light! For this light within you produces what is good and right and true. Carefully determine what pleases the Lord. Take no part in the worthless deeds of evil and darkness; instead, expose them.",
      "NASB": "for you were formerly darkness, but now you are Light in the Lord; walk as children of Light (for the fruit of the Light consists in all goodness, righteousness, and truth), trying to learn what is pleasing to the Lord. Do not participate in the unfruitful deeds of darkness, but instead even expose them."
    },
    "dynamicContext": {
      "chapterTitle": "Ephesians 5 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Ephesians 5:8\u201311 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "8\u201311",
            "text": "For you were once darkness, but now you are light in the Lord. Live as children of light (for the fruit of the light consists in all goodness, righteousness and truth) and find out what pleases the Lord. Have nothing to do with the fruitless deeds of darkness, but rather expose them."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "8\u201311",
            "text": "Once your life was full of darkness, but now you are full of light in the Lord. Live then as children of light! For the fruit produced by the light consists of all goodness, righteousness, and truth, discovering what pleases the Lord. Have nothing to do with the unproductive deeds of darkness, but instead expose them."
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "8\u201311",
            "text": "For once you were full of darkness, but now you have light from the Lord. So live as people of light! For this light within you produces what is good and right and true. Carefully determine what pleases the Lord. Take no part in the worthless deeds of evil and darkness; instead, expose them."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "8\u201311",
            "text": "for you were formerly darkness, but now you are Light in the Lord; walk as children of Light (for the fruit of the Light consists in all goodness, righteousness, and truth), trying to learn what is pleasing to the Lord. Do not participate in the unfruitful deeds of darkness, but instead even expose them."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Ephesians 5:8\u201311.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Ephesians 5:8\u201311.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Ephesians 5:8\u201311.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Ephesians 5:8\u201311."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Ephesians 5:8\u201311."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Ephesians 5:8\u201311 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  },
  {
    "id": 96,
    "ref": "Colossians 2:13\u201315",
    "book": "Colossians",
    "category": "identity-grace",
    "categoryLabel": "Identity & Grace",
    "icon": "award",
    "bentoSpan": "hero",
    "keyPhrase": "He forgave us all our sins, having canceled the charge of our legal indebtedness... disarming the powers and authorities",
    "themeColor": "violet",
    "translations": {
      "NIV": "When you were dead in your sins and in the uncircumcision of your flesh, God made you alive with Christ. He forgave us all our sins, having canceled the charge of our legal indebtedness, which stood against us and condemned us; he has taken it away, nailing it to the cross. And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross.",
      "TPT": "This happened to you: you were once dead in your failures and sins, but now he has made you alive together with Christ, having forgiven us all our trespasses! He canceled out every legal debt of our sins, nailing it to the cross, destroying it once and for all. Then Jesus made a public spectacle of all powers and authorities, triumphing over them in his victory cross!",
      "NLT": "You were dead because of your sins and because your sinful nature was not yet cut away. Then God made you alive with Christ, for he forgave all our sins. He canceled the record of the charges against us and took it away by nailing it to the cross. In this way, he disarmed the spiritual rulers and authorities. He shamed them publicly by his victory over them on the cross.",
      "NASB": "And when you were dead in your wrongdoings and the uncircumcision of your flesh, He made you alive together with Him, having forgiven us all our wrongdoings, having canceled the certificate of debt consisting of decrees against us, which was hostile to us; and He has taken it out of the way, having nailed it to the cross. When He had disarmed the rulers and authorities, He made a public display of them, having triumphed over them through Him."
    },
    "dynamicContext": {
      "chapterTitle": "Colossians 2 \u2014 The Sovereign Deliverance & Living Hope of God",
      "chapterSummary": "Explore the surrounding biblical flow of Colossians 2:13\u201315 revealing God's covenant faithfulness.",
      "versions": {
        "NIV": {
          "before": [
            {
              "num": "16",
              "text": "Better the little that the righteous have than the wealth of many wicked;"
            },
            {
              "num": "17",
              "text": "for the power of the wicked will be broken, but the Lord upholds the righteous."
            },
            {
              "num": "18",
              "text": "The blameless spend their days under the Lord\u2019s care, and their inheritance will endure forever."
            }
          ],
          "target": {
            "num": "13\u201315",
            "text": "When you were dead in your sins and in the uncircumcision of your flesh, God made you alive with Christ. He forgave us all our sins, having canceled the charge of our legal indebtedness, which stood against us and condemned us; he has taken it away, nailing it to the cross. And having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross."
          },
          "after": [
            {
              "num": "20",
              "text": "But the wicked will perish: Though the Lord\u2019s enemies are like the flowers of the fields, they will be consumed, they will go up in smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and do not repay, but the righteous give generously;"
            },
            {
              "num": "22",
              "text": "those the Lord blesses will inherit the land, but those he curses will be destroyed."
            }
          ]
        },
        "TPT": {
          "before": [
            {
              "num": "16",
              "text": "It is much better to have very little and combined with God\u2019s presence than to possess great wealth without Him."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord sustains the righteous with His own hand."
            },
            {
              "num": "18",
              "text": "Day by day the Lord tenderly guards the innocent, ensuring their inheritance will stand firm through the ages."
            }
          ],
          "target": {
            "num": "13\u201315",
            "text": "This happened to you: you were once dead in your failures and sins, but now he has made you alive together with Christ, having forgiven us all our trespasses! He canceled out every legal debt of our sins, nailing it to the cross, destroying it once and for all. Then Jesus made a public spectacle of all powers and authorities, triumphing over them in his victory cross!"
          },
          "after": [
            {
              "num": "20",
              "text": "The enemies of God will vanish like sweet grass in the fire; they will disappear into thin air like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and default on their debts, but the lover of God is gracious and gives with an open hand."
            },
            {
              "num": "22",
              "text": "Those favored by God will take possession of the promised land and dwell securely in His blessing."
            }
          ]
        },
        "NLT": {
          "before": [
            {
              "num": "16",
              "text": "It is better to be godly and have little than to be evil and rich."
            },
            {
              "num": "17",
              "text": "For the strength of the wicked will be shattered, but the Lord takes care of the godly."
            },
            {
              "num": "18",
              "text": "Day by day the Lord takes care of the innocent, and they will receive an inheritance that lasts forever."
            }
          ],
          "target": {
            "num": "13\u201315",
            "text": "You were dead because of your sins and because your sinful nature was not yet cut away. Then God made you alive with Christ, for he forgave all our sins. He canceled the record of the charges against us and took it away by nailing it to the cross. In this way, he disarmed the spiritual rulers and authorities. He shamed them publicly by his victory over them on the cross."
          },
          "after": [
            {
              "num": "20",
              "text": "The wicked will die. The Lord\u2019s enemies are like flowers in a field\u2014they will disappear like smoke."
            },
            {
              "num": "21",
              "text": "The wicked borrow and never repay, but the godly are generous and give."
            },
            {
              "num": "22",
              "text": "Those the Lord blesses will possess the land, but those he curses will die."
            }
          ]
        },
        "NASB": {
          "before": [
            {
              "num": "16",
              "text": "Better is the little of the righteous than the abundance of many wicked."
            },
            {
              "num": "17",
              "text": "For the arms of the wicked will be broken, but the Lord sustains the righteous."
            },
            {
              "num": "18",
              "text": "The Lord knows the days of the blameless, and their inheritance will be forever."
            }
          ],
          "target": {
            "num": "13\u201315",
            "text": "And when you were dead in your wrongdoings and the uncircumcision of your flesh, He made you alive together with Him, having forgiven us all our wrongdoings, having canceled the certificate of debt consisting of decrees against us, which was hostile to us; and He has taken it out of the way, having nailed it to the cross. When He had disarmed the rulers and authorities, He made a public display of them, having triumphed over them through Him."
          },
          "after": [
            {
              "num": "20",
              "text": "For the wicked will perish; and the enemies of the Lord will be like the glory of the pastures, they vanish\u2014like smoke they vanish away."
            },
            {
              "num": "21",
              "text": "The wicked borrows and does not pay back, but the righteous is gracious and gives."
            },
            {
              "num": "22",
              "text": "For those blessed by Him will inherit the land, but those cursed by Him will be cut off."
            }
          ]
        }
      }
    },
    "lexicon": {
      "originalLanguage": "Koine Greek (New Testament)",
      "highlightedVerseTemplates": {
        "NIV": "Reveals God's [unconditional grace]{G5485} and [supernatural power]{G1411} in Colossians 2:13\u201315.",
        "TPT": "Unveils the radiant [glory of grace]{G5485} and [indestructible life]{G2222} in Colossians 2:13\u201315.",
        "NLT": "Declares God's [gift of grace]{G5485} and [divine energy]{G1411} in Colossians 2:13\u201315.",
        "NASB": "Proclaims the [riches of grace]{G5485} and [divine power]{G1411} in Colossians 2:13\u201315."
      },
      "keyTerms": [
        {
          "strongs": "G5485",
          "word": "\u03c7\u03ac\u03c1\u03b9\u03c2",
          "transliteration": "charis (grace)",
          "pronunciation": "khar'-ece",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "grace / unconditional favor",
          "root": "From chairo (to rejoice, be glad)",
          "definition": "Unmerited divine favor, the finished gift of God's goodwill in Christ granting what human effort could never earn.",
          "usageInPassage": "The primary operational foundation of Colossians 2:13\u201315."
        },
        {
          "strongs": "G1411",
          "word": "\u03b4\u03cd\u03bd\u03b1\u03bc\u03b9\u03c2",
          "transliteration": "dynamis (power / ability)",
          "pronunciation": "doo'-nam-is",
          "partOfSpeech": "Noun Feminine",
          "matchedEnglish": "power / divine ability",
          "root": "From dynamai (to be capable, have inherent strength)",
          "definition": "Supernatural miraculous ability, spiritual energy imparted by the Holy Spirit to accomplish God's will.",
          "usageInPassage": "Supernatural divine enablement residing in the believer."
        }
      ],
      "theologicalSummary": "In Koine Greek, Colossians 2:13\u201315 reveals that under the New Covenant, every promise is a gift of pure grace (charis) received through faith in Christ."
    },
    "crossReferencesList": [
      {
        "ref": "Romans 8:31\u201332",
        "text": "If God is for us, who can be against us? He who did not spare his own Son, will he not also graciously give us all things?",
        "linkedVerseId": 14
      },
      {
        "ref": "2 Corinthians 1:20",
        "text": "For no matter how many promises God has made, they are 'Yes' in Christ.",
        "linkedVerseId": 12
      },
      {
        "ref": "Ephesians 1:3",
        "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        "linkedVerseId": 24
      },
      {
        "ref": "Hebrews 13:5\u20136",
        "text": "Never will I leave you; never will I forsake you. So we say with confidence, 'The Lord is my helper; I will not be afraid.'",
        "linkedVerseId": 19
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BIBLE_VERSES };
}
