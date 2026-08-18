const VERSES = [
  {
    "number": 1,
    "reference": "Psalm 16:11",
    "apiReference": "Psalms 16:11",
    "text": "You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.",
    "theme": "Joy",
    "icon": "spark",
    "book": "Psalm"
  },
  {
    "number": 2,
    "reference": "Psalm 37:19",
    "apiReference": "Psalms 37:19",
    "text": "They shall not be disappointed in the time of evil. In the days of famine they shall be satisfied.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 3,
    "reference": "Psalm 17:15",
    "apiReference": "Psalms 17:15",
    "text": "As for me, I shall see your face in righteousness. I shall be satisfied, when I awake, with seeing your form.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 4,
    "reference": "Isaiah 55:12",
    "apiReference": "Isaiah 55:12",
    "text": "For you shall go out with joy, and be led out with peace. The mountains and the hills will break out before you into singing; and all the trees of the fields will clap their hands.",
    "theme": "Joy",
    "icon": "spark",
    "book": "Isaiah"
  },
  {
    "number": 5,
    "reference": "Deuteronomy 8:18",
    "apiReference": "Deuteronomy 8:18",
    "text": "But you shall remember Yahweh your God, for it is he who gives you power to get wealth; that he may establish his covenant which he swore to your fathers, as it is today.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Deuteronomy"
  },
  {
    "number": 6,
    "reference": "Deuteronomy 28:1-14",
    "apiReference": "Deuteronomy 28:1-14",
    "text": "It shall happen, if you shall listen diligently to Yahweh your God’s voice, to observe to do all his commandments which I command you today, that Yahweh your God will set you high above all the nations of the earth. All these blessings will come upon you, and overtake you, if you listen to Yahweh your God’s voice. You shall be blessed in the city, and you shall be blessed in the field. You shall be blessed in the fruit of your body, the fruit of your ground, the fruit of your animals, the increase of your livestock, and the young of your flock. Your basket and your kneading trough shall be blessed. You shall be blessed when you come in, and you shall be blessed when you go out. Yahweh will cause your enemies who rise up against you to be struck before you. They will come out against you one way, and will flee before you seven ways. Yahweh will command the blessing on you in your barns, and in all that you put your hand to. He will bless you in the land which Yahweh your God gives you. Yahweh will establish you for a holy people to himself, as he has sworn to you, if you shall keep the commandments of Yahweh your God, and walk in his ways. All the peoples of the earth shall see that you are called by Yahweh’s name, and they will be afraid of you. Yahweh will grant you abundant prosperity, in the fruit of your body, in the fruit of your livestock, and in the fruit of your ground, in the land which Yahweh swore to your fathers to give you. Yahweh will open to you his good treasure in the sky, to give the rain of your land in its season, and to bless all the work of your hand. You will lend to many nations, and you will not borrow. Yahweh will make you the head, and not the tail. You will be above only, and you will not be beneath; if you listen to the commandments of Yahweh your God, which I command you today, to observe and to do, and shall not turn away from any of the words which I command you today, to the right hand, or to the left, to go after other gods to serve them.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Deuteronomy"
  },
  {
    "number": 7,
    "reference": "Psalm 32:8",
    "apiReference": "Psalms 32:8",
    "text": "I will instruct you and teach you in the way which you shall go. I will counsel you with my eye on you.",
    "theme": "Word",
    "icon": "book",
    "book": "Psalm"
  },
  {
    "number": 8,
    "reference": "Isaiah 41:10",
    "apiReference": "Isaiah 41:10",
    "text": "Don’t you be afraid, for I am with you. Don’t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Isaiah"
  },
  {
    "number": 9,
    "reference": "Jeremiah 17:7-8",
    "apiReference": "Jeremiah 17:7-8",
    "text": "“Blessed is the man who trusts in Yahweh, and whose confidence is in Yahweh. For he will be as a tree planted by the waters, who spreads out its roots by the river, and will not fear when heat comes, but its leaf will be green; and will not be concerned in the year of drought. It won’t cease from yielding fruit.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Jeremiah"
  },
  {
    "number": 10,
    "reference": "Isaiah 58:11-12",
    "apiReference": "Isaiah 58:11-12",
    "text": "and Yahweh will guide you continually, and satisfy your soul in dry places, and make your bones strong; and you shall be like a watered garden, and like a spring of water, whose waters don’t fail. Those who shall be of you shall build the old waste places; you shall raise up the foundations of many generations; and you shall be called Repairer of the Breach, Restorer of Paths with Dwellings.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Isaiah"
  },
  {
    "number": 11,
    "reference": "Psalm 37:25-26",
    "apiReference": "Psalms 37:25-26",
    "text": "I have been young, and now am old, yet I have not seen the righteous forsaken, nor his children begging for bread. All day long he deals graciously, and lends. His offspring is blessed.",
    "theme": "Provision",
    "icon": "leaf",
    "book": "Psalm"
  },
  {
    "number": 12,
    "reference": "2 Corinthians 9:10-11",
    "apiReference": "2 Corinthians 9:10-11",
    "text": "Now may he who supplies seed to the sower and bread for food, supply and multiply your seed for sowing, and increase the fruits of your righteousness; you being enriched in everything to all generosity, which produces through us thanksgiving to God.",
    "theme": "Provision",
    "icon": "leaf",
    "book": ""
  },
  {
    "number": 13,
    "reference": "Mark 16:15",
    "apiReference": "Mark 16:15",
    "text": "He said to them, “Go into all the world, and preach the Good News to the whole creation.",
    "theme": "Mission",
    "icon": "send",
    "book": "Mark"
  },
  {
    "number": 14,
    "reference": "Romans 1:16",
    "apiReference": "Romans 1:16",
    "text": "For I am not ashamed of the Good News of Christ, because it is the power of God for salvation for everyone who believes; for the Jew first, and also for the Greek.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Romans"
  },
  {
    "number": 15,
    "reference": "Matthew 28:19-20",
    "apiReference": "Matthew 28:19-20",
    "text": "Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I commanded you. Behold, I am with you always, even to the end of the age.” Amen.",
    "theme": "Word",
    "icon": "book",
    "book": "Matthew"
  },
  {
    "number": 16,
    "reference": "Isaiah 65:24",
    "apiReference": "Isaiah 65:24",
    "text": "It will happen that, before they call, I will answer; and while they are yet speaking, I will hear.",
    "theme": "Promise",
    "icon": "star",
    "book": "Isaiah"
  },
  {
    "number": 17,
    "reference": "Matthew 5:14",
    "apiReference": "Matthew 5:14",
    "text": "You are the light of the world. A city located on a hill can’t be hidden.",
    "theme": "Mission",
    "icon": "send",
    "book": "Matthew"
  },
  {
    "number": 18,
    "reference": "John 14:27",
    "apiReference": "John 14:27",
    "text": "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don’t let your heart be troubled, neither let it be fearful.",
    "theme": "Peace",
    "icon": "shield",
    "book": "John"
  },
  {
    "number": 19,
    "reference": "Hebrews 10:19-25",
    "apiReference": "Hebrews 10:19-25",
    "text": "Having therefore, brothers, boldness to enter into the holy place by the blood of Jesus, by the way which he dedicated for us, a new and living way, through the veil, that is to say, his flesh; and having a great priest over God’s house, let’s draw near with a true heart in fullness of faith, having our hearts sprinkled from an evil conscience, and having our body washed with pure water, let us hold fast the confession of our hope without wavering; for he who promised is faithful. Let us consider how to provoke one another to love and good works, not forsaking our own assembling together, as the custom of some is, but exhorting one another; and so much the more, as you see the Day approaching.",
    "theme": "Identity",
    "icon": "home",
    "book": "Hebrews"
  },
  {
    "number": 20,
    "reference": "Psalm 119:89",
    "apiReference": "Psalms 119:89",
    "text": "Yahweh, your word is settled in heaven forever.",
    "theme": "Word",
    "icon": "book",
    "book": "Psalm"
  },
  {
    "number": 21,
    "reference": "Psalm 25:5",
    "apiReference": "Psalms 25:5",
    "text": "Guide me in your truth, and teach me, For you are the God of my salvation, I wait for you all day long.",
    "theme": "Word",
    "icon": "book",
    "book": "Psalm"
  },
  {
    "number": 22,
    "reference": "Isaiah 58:11",
    "apiReference": "Isaiah 58:11",
    "text": "and Yahweh will guide you continually, and satisfy your soul in dry places, and make your bones strong; and you shall be like a watered garden, and like a spring of water, whose waters don’t fail.",
    "theme": "Word",
    "icon": "book",
    "book": "Isaiah"
  },
  {
    "number": 23,
    "reference": "Proverbs 19:23",
    "apiReference": "Proverbs 19:23",
    "text": "The fear of Yahweh leads to life, then contentment; he rests and will not be touched by trouble.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Proverbs"
  },
  {
    "number": 24,
    "reference": "Ephesians 6:10",
    "apiReference": "Ephesians 6:10",
    "text": "Finally, be strong in the Lord, and in the strength of his might.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Ephesians"
  },
  {
    "number": 25,
    "reference": "John 6:27",
    "apiReference": "John 6:27",
    "text": "Don’t work for the food which perishes, but for the food which remains to eternal life, which the Son of Man will give to you. For God the Father has sealed him.”",
    "theme": "Promise",
    "icon": "star",
    "book": "John"
  },
  {
    "number": 26,
    "reference": "Psalm 16:9-10",
    "apiReference": "Psalms 16:9-10",
    "text": "Therefore my heart is glad, and my tongue rejoices. My body shall also dwell in safety. For you will not leave my soul in Sheol, neither will you allow your holy one to see corruption.",
    "theme": "Joy",
    "icon": "spark",
    "book": "Psalm"
  },
  {
    "number": 27,
    "reference": "John 6:35",
    "apiReference": "John 6:35",
    "text": "Jesus said to them, “I am the bread of life. He who comes to me will not be hungry, and he who believes in me will never be thirsty.",
    "theme": "Provision",
    "icon": "leaf",
    "book": "John"
  },
  {
    "number": 28,
    "reference": "Psalm 103:1-5",
    "apiReference": "Psalms 103:1-5",
    "text": "Praise Yahweh, my soul! All that is within me, praise his holy name! Praise Yahweh, my soul, and don’t forget all his benefits; who forgives all your sins; who heals all your diseases; who redeems your life from destruction; who crowns you with loving kindness and tender mercies; who satisfies your desire with good things, so that your youth is renewed like the eagle’s.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 29,
    "reference": "Psalm 52:8",
    "apiReference": "Psalms 52:8",
    "text": "But as for me, I am like a green olive tree in God’s house. I trust in God’s loving kindness forever and ever.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 30,
    "reference": "Psalm 91:13",
    "apiReference": "Psalms 91:13",
    "text": "You will tread on the lion and cobra. You will trample the young lion and the serpent underfoot.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 31,
    "reference": "Psalm 119:97-106",
    "apiReference": "Psalms 119:97-106",
    "text": "How I love your law! It is my meditation all day. Your commandments make me wiser than my enemies, for your commandments are always with me. I have more understanding than all my teachers, for your testimonies are my meditation. I understand more than the aged, because I have kept your precepts. I have kept my feet from every evil way, that I might observe your word. I have not turned away from your ordinances, for you have taught me. How sweet are your promises to my taste, more than honey to my mouth! Through your precepts, I get understanding; therefore I hate every false way. Your word is a lamp to my feet, and a light for my path. I have sworn, and have confirmed it, that I will obey your righteous ordinances.",
    "theme": "Word",
    "icon": "book",
    "book": "Psalm"
  },
  {
    "number": 32,
    "reference": "Joshua 1:5",
    "apiReference": "Joshua 1:5",
    "text": "No man will be able to stand before you all the days of your life. As I was with Moses, so I will be with you. I will not fail you nor forsake you.",
    "theme": "Promise",
    "icon": "star",
    "book": "Joshua"
  },
  {
    "number": 33,
    "reference": "Isaiah 61:1",
    "apiReference": "Isaiah 61:1",
    "text": "The Lord Yahweh’s Spirit is on me; because Yahweh has anointed me to preach good news to the humble. He has sent me to bind up the broken hearted, to proclaim liberty to the captives, and release to those who are bound;",
    "theme": "Mission",
    "icon": "send",
    "book": "Isaiah"
  },
  {
    "number": 34,
    "reference": "Deuteronomy 31:8",
    "apiReference": "Deuteronomy 31:8",
    "text": "Yahweh himself is who goes before you. He will be with you. He will not fail you nor forsake you. Don’t be afraid. Don’t be discouraged.”",
    "theme": "Peace",
    "icon": "shield",
    "book": "Deuteronomy"
  },
  {
    "number": 35,
    "reference": "Galatians 5:22-25",
    "apiReference": "Galatians 5:22-25",
    "text": "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law. Those who belong to Christ have crucified the flesh with its passions and lusts. If we live by the Spirit, let’s also walk by the Spirit.",
    "theme": "Joy",
    "icon": "spark",
    "book": "Galatians"
  },
  {
    "number": 36,
    "reference": "Mark 11:24",
    "apiReference": "Mark 11:24",
    "text": "Therefore I tell you, all things whatever you pray and ask for, believe that you have received them, and you shall have them.",
    "theme": "Promise",
    "icon": "star",
    "book": "Mark"
  },
  {
    "number": 37,
    "reference": "Colossians 3:2-4",
    "apiReference": "Colossians 3:2-4",
    "text": "Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory.",
    "theme": "Promise",
    "icon": "star",
    "book": "Colossians"
  },
  {
    "number": 38,
    "reference": "Philippians 4:19",
    "apiReference": "Philippians 4:19",
    "text": "My God will supply every need of yours according to his riches in glory in Christ Jesus.",
    "theme": "Provision",
    "icon": "leaf",
    "book": "Philippians"
  },
  {
    "number": 39,
    "reference": "Colossians 3:9-12",
    "apiReference": "Colossians 3:9-12",
    "text": "Don’t lie to one another, seeing that you have put off the old man with his doings, and have put on the new man, who is being renewed in knowledge after the image of his Creator, where there can’t be Greek and Jew, circumcision and uncircumcision, barbarian, Scythian, bondservant, freeman; but Christ is all, and in all. Put on therefore, as God’s chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance;",
    "theme": "Identity",
    "icon": "home",
    "book": "Colossians"
  },
  {
    "number": 40,
    "reference": "John 8:51",
    "apiReference": "John 8:51",
    "text": "Most certainly, I tell you, if a person keeps my word, he will never see death.”",
    "theme": "Word",
    "icon": "book",
    "book": "John"
  },
  {
    "number": 41,
    "reference": "Psalm 27:1",
    "apiReference": "Psalms 27:1",
    "text": "Yahweh is my light and my salvation. Whom shall I fear? Yahweh is the strength of my life. Of whom shall I be afraid?",
    "theme": "Peace",
    "icon": "shield",
    "book": "Psalm"
  },
  {
    "number": 42,
    "reference": "Galatians 3:23-29",
    "apiReference": "Galatians 3:23-29",
    "text": "But before faith came, we were kept in custody under the law, confined for the faith which should afterwards be revealed. So that the law has become our tutor to bring us to Christ, that we might be justified by faith. But now that faith has come, we are no longer under a tutor. For you are all children of God, through faith in Christ Jesus. For as many of you as were baptized into Christ have put on Christ. There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus. If you are Christ’s, then you are Abraham’s offspring and heirs according to promise.",
    "theme": "Word",
    "icon": "book",
    "book": "Galatians"
  },
  {
    "number": 43,
    "reference": "Isaiah 43:18-19",
    "apiReference": "Isaiah 43:18-19",
    "text": "“Don’t remember the former things, and don’t consider the things of old. Behold, I will do a new thing. It springs out now. Don’t you know it? I will even make a way in the wilderness, and rivers in the desert.",
    "theme": "Promise",
    "icon": "star",
    "book": "Isaiah"
  },
  {
    "number": 44,
    "reference": "Psalm 119:7",
    "apiReference": "Psalms 119:7",
    "text": "I will give thanks to you with uprightness of heart, when I learn your righteous judgments.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 45,
    "reference": "Psalm 119:11",
    "apiReference": "Psalms 119:11",
    "text": "I have hidden your word in my heart, that I might not sin against you.",
    "theme": "Word",
    "icon": "book",
    "book": "Psalm"
  },
  {
    "number": 46,
    "reference": "Psalm 119:13-16",
    "apiReference": "Psalms 119:13-16",
    "text": "With my lips, I have declared all the ordinances of your mouth. I have rejoiced in the way of your testimonies, as much as in all riches. I will meditate on your precepts, and consider your ways. I will delight myself in your statutes. I will not forget your word.",
    "theme": "Joy",
    "icon": "spark",
    "book": "Psalm"
  },
  {
    "number": 47,
    "reference": "Psalm 16:7-8",
    "apiReference": "Psalms 16:7-8",
    "text": "I will bless Yahweh, who has given me counsel. Yes, my heart instructs me in the night seasons. I have set Yahweh always before me. Because he is at my right hand, I shall not be moved.",
    "theme": "Provision",
    "icon": "leaf",
    "book": "Psalm"
  },
  {
    "number": 48,
    "reference": "John 15:7",
    "apiReference": "John 15:7",
    "text": "If you remain in me, and my words remain in you, you will ask whatever you desire, and it will be done for you.",
    "theme": "Word",
    "icon": "book",
    "book": "John"
  },
  {
    "number": 49,
    "reference": "Psalm 77:12",
    "apiReference": "Psalms 77:12",
    "text": "I will also meditate on all your work, and consider your doings.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 50,
    "reference": "Galatians 2:20",
    "apiReference": "Galatians 2:20",
    "text": "I have been crucified with Christ, and it is no longer I that live, but Christ lives in me. That life which I now live in the flesh, I live by faith in the Son of God, who loved me, and gave himself up for me.",
    "theme": "Promise",
    "icon": "star",
    "book": "Galatians"
  },
  {
    "number": 51,
    "reference": "Joshua 1:9",
    "apiReference": "Joshua 1:9",
    "text": "Haven’t I commanded you? Be strong and courageous. Don’t be afraid. Don’t be dismayed, for Yahweh your God is with you wherever you go.”",
    "theme": "Peace",
    "icon": "shield",
    "book": "Joshua"
  },
  {
    "number": 52,
    "reference": "2 Timothy 1:7",
    "apiReference": "2 Timothy 1:7",
    "text": "For God didn’t give us a spirit of fear, but of power, love, and self-control.",
    "theme": "Peace",
    "icon": "shield",
    "book": ""
  },
  {
    "number": 53,
    "reference": "Isaiah 41:10",
    "apiReference": "Isaiah 41:10",
    "text": "Don’t you be afraid, for I am with you. Don’t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Isaiah"
  },
  {
    "number": 54,
    "reference": "Psalm 34:4",
    "apiReference": "Psalms 34:4",
    "text": "I sought Yahweh, and he answered me, and delivered me from all my fears.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Psalm"
  },
  {
    "number": 55,
    "reference": "Psalm 118:6",
    "apiReference": "Psalms 118:6",
    "text": "Yahweh is on my side. I will not be afraid. What can man do to me?",
    "theme": "Peace",
    "icon": "shield",
    "book": "Psalm"
  },
  {
    "number": 56,
    "reference": "Proverbs 3:5-6",
    "apiReference": "Proverbs 3:5-6",
    "text": "Trust in Yahweh with all your heart, and don’t lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight.",
    "theme": "Promise",
    "icon": "star",
    "book": "Proverbs"
  },
  {
    "number": 57,
    "reference": "Mark 16:17-18",
    "apiReference": "Mark 16:17-18",
    "text": "These signs will accompany those who believe: in my name they will cast out demons; they will speak with new languages; they will take up serpents; and if they drink any deadly thing, it will in no way hurt them; they will lay hands on the sick, and they will recover.”",
    "theme": "Promise",
    "icon": "star",
    "book": "Mark"
  },
  {
    "number": 58,
    "reference": "Romans 8:37",
    "apiReference": "Romans 8:37",
    "text": "No, in all these things, we are more than conquerors through him who loved us.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Romans"
  },
  {
    "number": 59,
    "reference": "Luke 1:37",
    "apiReference": "Luke 1:37",
    "text": "For nothing spoken by God is impossible.”",
    "theme": "Promise",
    "icon": "star",
    "book": "Luke"
  },
  {
    "number": 60,
    "reference": "Luke 10:19",
    "apiReference": "Luke 10:19",
    "text": "Behold, I give you authority to tread on serpents and scorpions, and over all the power of the enemy. Nothing will in any way hurt you.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Luke"
  },
  {
    "number": 61,
    "reference": "Mark 11:23",
    "apiReference": "Mark 11:23",
    "text": "For most certainly I tell you, whoever may tell this mountain, ‘Be taken up and cast into the sea,’ and doesn’t doubt in his heart, but believes that what he says is happening; he shall have whatever he says.",
    "theme": "Promise",
    "icon": "star",
    "book": "Mark"
  },
  {
    "number": 62,
    "reference": "Luke 21:18",
    "apiReference": "Luke 21:18",
    "text": "And not a hair of your head will perish.",
    "theme": "Promise",
    "icon": "star",
    "book": "Luke"
  },
  {
    "number": 63,
    "reference": "Psalm 1:3",
    "apiReference": "Psalms 1:3",
    "text": "He will be like a tree planted by the streams of water, that produces its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper.",
    "theme": "Provision",
    "icon": "leaf",
    "book": "Psalm"
  },
  {
    "number": 64,
    "reference": "Romans 8:31-32",
    "apiReference": "Romans 8:31-32",
    "text": "What then shall we say about these things? If God is for us, who can be against us? He who didn’t spare his own Son, but delivered him up for us all, how would he not also with him freely give us all things?",
    "theme": "Promise",
    "icon": "star",
    "book": "Romans"
  },
  {
    "number": 65,
    "reference": "Isaiah 54:17",
    "apiReference": "Isaiah 54:17",
    "text": "No weapon that is formed against you will prevail; and you will condemn every tongue that rises against you in judgment. This is the heritage of Yahweh’s servants, and their righteousness is of me,” says Yahweh.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Isaiah"
  },
  {
    "number": 66,
    "reference": "Colossians 3:15",
    "apiReference": "Colossians 3:15",
    "text": "And let the peace of God rule in your hearts, to which also you were called in one body; and be thankful.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Colossians"
  },
  {
    "number": 67,
    "reference": "2 Thessalonians 3:16",
    "apiReference": "2 Thessalonians 3:16",
    "text": "Now may the Lord of peace himself give you peace at all times in all ways. The Lord be with you all.",
    "theme": "Peace",
    "icon": "shield",
    "book": ""
  },
  {
    "number": 68,
    "reference": "Psalm 119:165",
    "apiReference": "Psalms 119:165",
    "text": "Those who love your law have great peace. Nothing causes them to stumble.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Psalm"
  },
  {
    "number": 69,
    "reference": "Colossians 3:1-4",
    "apiReference": "Colossians 3:1-4",
    "text": "If then you were raised together with Christ, seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory.",
    "theme": "Promise",
    "icon": "star",
    "book": "Colossians"
  },
  {
    "number": 70,
    "reference": "Colossians 3:14-17",
    "apiReference": "Colossians 3:14-17",
    "text": "Above all these things, walk in love, which is the bond of perfection. And let the peace of God rule in your hearts, to which also you were called in one body; and be thankful. Let the word of Christ dwell in you richly; in all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs, singing with grace in your heart to the Lord. Whatever you do, in word or in deed, do all in the name of the Lord Jesus, giving thanks to God the Father, through him.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Colossians"
  },
  {
    "number": 71,
    "reference": "Matthew 6:34",
    "apiReference": "Matthew 6:34",
    "text": "Therefore don’t be anxious for tomorrow, for tomorrow will be anxious for itself. Each day’s own evil is sufficient.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Matthew"
  },
  {
    "number": 72,
    "reference": "Matthew 11:28-30",
    "apiReference": "Matthew 11:28-30",
    "text": "“Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and humble in heart; and you will find rest for your souls. For my yoke is easy, and my burden is light.”",
    "theme": "Peace",
    "icon": "shield",
    "book": "Matthew"
  },
  {
    "number": 73,
    "reference": "Psalm 4:8",
    "apiReference": "Psalms 4:8",
    "text": "In peace I will both lay myself down and sleep, for you, Yahweh alone, make me live in safety.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Psalm"
  },
  {
    "number": 74,
    "reference": "Philippians 4:8-9",
    "apiReference": "Philippians 4:8-9",
    "text": "Finally, brothers, whatever things are true, whatever things are honorable, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report; if there is any virtue, and if there is any praise, think about these things. The things which you learned, received, heard, and saw in me: do these things, and the God of peace will be with you.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Philippians"
  },
  {
    "number": 75,
    "reference": "Philippians 4:6-7",
    "apiReference": "Philippians 4:6-7",
    "text": "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.",
    "theme": "Peace",
    "icon": "shield",
    "book": "Philippians"
  },
  {
    "number": 76,
    "reference": "John 14:27",
    "apiReference": "John 14:27",
    "text": "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don’t let your heart be troubled, neither let it be fearful.",
    "theme": "Peace",
    "icon": "shield",
    "book": "John"
  },
  {
    "number": 77,
    "reference": "John 8:31-32",
    "apiReference": "John 8:31-32",
    "text": "Jesus therefore said to those Jews who had believed him, “If you remain in my word, then you are truly my disciples. You will know the truth, and the truth will make you free.”",
    "theme": "Word",
    "icon": "book",
    "book": "John"
  },
  {
    "number": 78,
    "reference": "John 15:15-16",
    "apiReference": "John 15:15-16",
    "text": "No longer do I call you servants, for the servant doesn’t know what his lord does. But I have called you friends, for everything that I heard from my Father, I have made known to you. You didn’t choose me, but I chose you, and appointed you, that you should go and bear fruit, and that your fruit should remain; that whatever you will ask of the Father in my name, he may give it to you.",
    "theme": "Promise",
    "icon": "star",
    "book": "John"
  },
  {
    "number": 79,
    "reference": "Titus 3:3-7",
    "apiReference": "Titus 3:3-7",
    "text": "For we were also once foolish, disobedient, deceived, serving various lusts and pleasures, living in malice and envy, hateful, and hating one another. But when the kindness of God our Savior and his love toward mankind appeared, not by works of righteousness which we did ourselves, but according to his mercy, he saved us through the washing of regeneration and renewing by the Holy Spirit, whom he poured out on us richly, through Jesus Christ our Savior; that being justified by his grace, we might be made heirs according to the hope of eternal life.",
    "theme": "Promise",
    "icon": "star",
    "book": "Titus"
  },
  {
    "number": 80,
    "reference": "Colossians 1:21-23",
    "apiReference": "Colossians 1:21-23",
    "text": "You, being in past times alienated and enemies in your mind in your evil deeds, yet now he has reconciled in the body of his flesh through death, to present you holy and without defect and blameless before him, if it is so that you continue in the faith, grounded and steadfast, and not moved away from the hope of the Good News which you heard, which is being proclaimed in all creation under heaven; of which I, Paul, was made a servant.",
    "theme": "Promise",
    "icon": "star",
    "book": "Colossians"
  },
  {
    "number": 81,
    "reference": "Ephesians 2:19",
    "apiReference": "Ephesians 2:19",
    "text": "So then you are no longer strangers and foreigners, but you are fellow citizens with the saints, and of the household of God,",
    "theme": "Identity",
    "icon": "home",
    "book": "Ephesians"
  },
  {
    "number": 82,
    "reference": "Ephesians 2:13",
    "apiReference": "Ephesians 2:13",
    "text": "But now in Christ Jesus you who once were far off are made near in the blood of Christ.",
    "theme": "Identity",
    "icon": "home",
    "book": "Ephesians"
  },
  {
    "number": 83,
    "reference": "Ephesians 1:4-7",
    "apiReference": "Ephesians 1:4-7",
    "text": "even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love; having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved, in whom we have our redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace,",
    "theme": "Provision",
    "icon": "leaf",
    "book": "Ephesians"
  },
  {
    "number": 84,
    "reference": "2 Corinthians 6:16",
    "apiReference": "2 Corinthians 6:16",
    "text": "What agreement has a temple of God with idols? For you are a temple of the living God. Even as God said, “I will dwell in them, and walk in them; and I will be their God, and they will be my people.”",
    "theme": "Promise",
    "icon": "star",
    "book": ""
  },
  {
    "number": 85,
    "reference": "1 Corinthians 2:16",
    "apiReference": "1 Corinthians 2:16",
    "text": "“For who has known the mind of the Lord, that he should instruct him?” But we have Christ’s mind.",
    "theme": "Promise",
    "icon": "star",
    "book": ""
  },
  {
    "number": 86,
    "reference": "1 Corinthians 6:17",
    "apiReference": "1 Corinthians 6:17",
    "text": "But he who is joined to the Lord is one spirit.",
    "theme": "Promise",
    "icon": "star",
    "book": ""
  },
  {
    "number": 87,
    "reference": "Galatians 4:4-7",
    "apiReference": "Galatians 4:4-7",
    "text": "But when the fullness of the time came, God sent out his Son, born to a woman, born under the law, that he might redeem those who were under the law, that we might receive the adoption of children. And because you are children, God sent out the Spirit of his Son into your hearts, crying, “Abba, Father!” So you are no longer a bondservant, but a son; and if a son, then an heir of God through Christ.",
    "theme": "Word",
    "icon": "book",
    "book": "Galatians"
  },
  {
    "number": 88,
    "reference": "2 Corinthians 5:17",
    "apiReference": "2 Corinthians 5:17",
    "text": "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.",
    "theme": "Redemption",
    "icon": "cross",
    "book": ""
  },
  {
    "number": 89,
    "reference": "1 Peter 2:24",
    "apiReference": "1 Peter 2:24",
    "text": "He himself bore our sins in his body on the tree, that we, having died to sins, might live to righteousness; by whose stripes you were healed.",
    "theme": "Redemption",
    "icon": "cross",
    "book": ""
  },
  {
    "number": 90,
    "reference": "2 Chronicles 20:17",
    "apiReference": "2 Chronicles 20:17",
    "text": "You will not need to fight this battle. Set yourselves, stand still, and see the salvation of Yahweh with you, O Judah and Jerusalem. Don’t be afraid, nor be dismayed. Go out against them tomorrow, for Yahweh is with you.’”",
    "theme": "Peace",
    "icon": "shield",
    "book": ""
  },
  {
    "number": 91,
    "reference": "1 John 4:4",
    "apiReference": "1 John 4:4",
    "text": "You are of God, little children, and have overcome them; because greater is he who is in you than he who is in the world.",
    "theme": "Strength",
    "icon": "bolt",
    "book": ""
  },
  {
    "number": 92,
    "reference": "Nehemiah 8:10",
    "apiReference": "Nehemiah 8:10",
    "text": "Then he said to them, “Go your way. Eat the fat, drink the sweet, and send portions to him for whom nothing is prepared, for today is holy to our Lord. Don’t be grieved, for the joy of Yahweh is your strength.”",
    "theme": "Joy",
    "icon": "spark",
    "book": "Nehemiah"
  },
  {
    "number": 93,
    "reference": "Psalm 23:1",
    "apiReference": "Psalms 23:1",
    "text": "Yahweh is my shepherd: I shall lack nothing.",
    "theme": "Promise",
    "icon": "star",
    "book": "Psalm"
  },
  {
    "number": 94,
    "reference": "Matthew 8:16-17",
    "apiReference": "Matthew 8:16-17",
    "text": "When evening came, they brought to him many possessed with demons. He cast out the spirits with a word, and healed all who were sick; that it might be fulfilled which was spoken through Isaiah the prophet, saying, “He took our infirmities, and bore our diseases.”",
    "theme": "Word",
    "icon": "book",
    "book": "Matthew"
  },
  {
    "number": 95,
    "reference": "Ephesians 5:8-11",
    "apiReference": "Ephesians 5:8-11",
    "text": "For you were once darkness, but are now light in the Lord. Walk as children of light, for the fruit of the Spirit is in all goodness and righteousness and truth, proving what is well pleasing to the Lord. Have no fellowship with the unfruitful deeds of darkness, but rather even reprove them.",
    "theme": "Word",
    "icon": "book",
    "book": "Ephesians"
  },
  {
    "number": 96,
    "reference": "Colossians 2:13-15",
    "apiReference": "Colossians 2:13-15",
    "text": "You were dead through your trespasses and the uncircumcision of your flesh. He made you alive together with him, having forgiven us all our trespasses, wiping out the handwriting in ordinances which was against us; and he has taken it out of the way, nailing it to the cross; having stripped the principalities and the powers, he made a show of them openly, triumphing over them in it.",
    "theme": "Strength",
    "icon": "bolt",
    "book": "Colossians"
  }
];
const BIBLE_VERSIONS = {
  NIV: { id: 111, abbreviation: 'NIV', apiAbbreviations: ['NIV'], linkAbbreviation: 'NIV' },
  TPT: { id: 1849, abbreviation: 'TPT', apiAbbreviations: ['TPT'], linkAbbreviation: 'TPT' },
  NLT: { id: 116, abbreviation: 'NLT', apiAbbreviations: ['NLT'], linkAbbreviation: 'NLT' },
  NASB: { id: 2692, abbreviation: 'NASB', apiAbbreviations: ['NASB2020', 'NASB'], linkAbbreviation: 'NASB2020' }
};

const BOOK_USFM = {
  'Deuteronomy': 'DEU', 'Joshua': 'JOS', '2 Chronicles': '2CH', 'Nehemiah': 'NEH',
  'Psalm': 'PSA', 'Proverbs': 'PRO', 'Isaiah': 'ISA', 'Jeremiah': 'JER',
  'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Romans': 'ROM',
  '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL',
  'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL',
  '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI',
  '2 Timothy': '2TI', 'Titus': 'TIT', 'Hebrews': 'HEB', '1 Peter': '1PE',
  '1 John': '1JN'
};

const BOLLS_BOOK_IDS = {
  'Deuteronomy': 5, 'Joshua': 6, '2 Chronicles': 14, 'Nehemiah': 16,
  'Psalm': 19, 'Proverbs': 20, 'Isaiah': 23, 'Jeremiah': 24,
  'Matthew': 40, 'Mark': 41, 'Luke': 42, 'John': 43, 'Romans': 45,
  '1 Corinthians': 46, '2 Corinthians': 47, 'Galatians': 48,
  'Ephesians': 49, 'Philippians': 50, 'Colossians': 51,
  '2 Thessalonians': 53, '2 Timothy': 55, 'Titus': 56, 'Hebrews': 58,
  '1 Peter': 60, '1 John': 62
};

const ICONS = {
  spark: '✦', shield: '○', bolt: '↑', leaf: '♧', book: '≡',
  home: '◎', send: '↗', cross: '✚', star: '◇'
};

const CATEGORY_ORDER = ['All', 'Joy', 'Promise', 'Strength', 'Peace', 'The Word', 'Provision', 'Mission', 'Identity', 'Redemption'];
const CATEGORY_ICONS = { All: '✦', Joy: '✦', Promise: '◇', Strength: '↑', Peace: '○', 'The Word': '≡', Provision: '♧', Mission: '↗', Identity: '◎', Redemption: '✚' };

const scriptureApi = window.ESMRSKY_SCRIPTURE_API || window.PROMISES_SCRIPTURE_API || { configured: false };
const translationCache = new Map();
const bollsChapterCache = new Map();
const cards = document.querySelector('#cards');
const categoryFilters = document.querySelector('#categoryFilters');
const visibleCount = document.querySelector('#visibleCount');
const translationStatus = document.querySelector('#translationStatus');
const translationCredit = document.querySelector('#translationCredit');
const versionPicker = document.querySelector('#versionPicker');
const versionTrigger = document.querySelector('#versionTrigger');
const versionMenu = document.querySelector('#versionMenu');
const selectedVersionLabel = document.querySelector('#selectedVersionLabel');
const versionOptions = Array.from(document.querySelectorAll('[data-version-option]'));
let selectedVersionKey = loadVersionKey();
let activeCategory = 'All';
let activeLoadToken = 0;
let loadingVersionKey = null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function loadVersionKey() {
  try {
    const saved = localStorage.getItem('promises96-version');
    return BIBLE_VERSIONS[saved] ? saved : 'NIV';
  } catch (error) {
    return 'NIV';
  }
}

function saveVersionKey(key) {
  try {
    localStorage.setItem('promises96-version', key);
  } catch (error) {
    // The selection still applies for this visit.
  }
}

function referenceParts(reference) {
  return String(reference).match(/^(.+?) (\d+):(\d+)(?:[–-](\d+))?$/);
}

function referenceToUsfm(reference) {
  const match = referenceParts(reference);
  if (!match || !BOOK_USFM[match[1]]) return '';
  return `${BOOK_USFM[match[1]]}.${match[2]}.${match[3]}${match[4] ? `-${match[4]}` : ''}`;
}

function referenceToBolls(reference) {
  const match = referenceParts(reference);
  if (!match || !BOLLS_BOOK_IDS[match[1]]) return null;
  return {
    bookId: BOLLS_BOOK_IDS[match[1]],
    chapter: Number(match[2]),
    verseStart: Number(match[3]),
    verseEnd: Number(match[4] || match[3])
  };
}

async function getBollsChapter(bookId, chapter) {
  const key = `${bookId}:${chapter}`;
  if (!bollsChapterCache.has(key)) {
    bollsChapterCache.set(key, fetch(`https://bolls.life/get-text/NLT/${bookId}/${chapter}/`)
      .then(response => {
        if (!response.ok) throw new Error('NLT could not be loaded.');
        return response.json();
      })
      .then(verses => {
        if (!Array.isArray(verses)) throw new Error('NLT returned an unexpected response.');
        return verses;
      })
      .catch(error => {
        bollsChapterCache.delete(key);
        throw error;
      }));
  }
  return bollsChapterCache.get(key);
}

async function getBollsPassage(reference) {
  const parts = referenceToBolls(reference);
  if (!parts) throw new Error('Unsupported Scripture reference.');
  const chapter = await getBollsChapter(parts.bookId, parts.chapter);
  const text = chapter
    .filter(verse => Number(verse.verse) >= parts.verseStart && Number(verse.verse) <= parts.verseEnd)
    .map(verse => String(verse.text || '').trim())
    .filter(Boolean)
    .join(' ');
  if (!text) throw new Error('NLT passage was not found.');
  return text;
}

function bookName(reference) {
  const match = referenceParts(reference);
  return match ? match[1] : '';
}

function selectedVersion() {
  return BIBLE_VERSIONS[selectedVersionKey];
}

function versionPassages(key) {
  if (!translationCache.has(key)) translationCache.set(key, new Map());
  return translationCache.get(key);
}

function currentPassage(item) {
  const translated = versionPassages(selectedVersionKey).get(item.number);
  return translated || {
    text: item.text,
    source: 'WEB · public domain',
    isFallback: true
  };
}

function cardSize(text) {
  if (text.length > 520) return 'is-long';
  if (text.length > 270) return 'is-medium';
  return '';
}

function categoryValue(category) {
  return category === 'The Word' ? 'Word' : category;
}

function categoryLabel(category) {
  return category === 'Word' ? 'The Word' : category;
}

function renderCategoryFilters() {
  categoryFilters.innerHTML = CATEGORY_ORDER.map(category => {
    const value = categoryValue(category);
    const count = category === 'All' ? VERSES.length : VERSES.filter(item => item.theme === value).length;
    const themeSlug = value.toLowerCase();
    const active = category === activeCategory;
    return `<button class="category-pill${active ? ' is-active' : ''}" type="button" data-category="${category}" style="--pill-accent:var(--${category === 'All' ? 'lime' : `tone-${themeSlug}`})" aria-pressed="${active}"><i aria-hidden="true">${CATEGORY_ICONS[category]}</i>${category}<small>${count}</small></button>`;
  }).join('');
}

function render() {
  const filtered = activeCategory === 'All'
    ? VERSES
    : VERSES.filter(item => item.theme === categoryValue(activeCategory));

  cards.innerHTML = filtered.map(item => {
    const passage = currentPassage(item);
    const themeSlug = item.theme.toLowerCase();
    const isLoading = loadingVersionKey === selectedVersionKey && passage.isFallback;
    return `<article class="card ${cardSize(passage.text)}${isLoading ? ' is-loading' : ''}" data-passage="${item.number}" style="--card-accent:var(--tone-${themeSlug});--card-surface:var(--card-bg-${themeSlug})">
      <div class="card-top">
        <div class="card-kicker">
          <span class="number">${String(item.number).padStart(2, '0')}</span>
          <span class="theme-pill"><span class="theme-icon" aria-hidden="true">${ICONS[item.icon] || '◇'}</span>${escapeHtml(categoryLabel(item.theme))}</span>
        </div>
        <h2 class="reference">${escapeHtml(item.reference)}</h2>
      </div>
      <p class="verse">${escapeHtml(passage.text)}</p>
      <div class="card-bottom">
        <span class="source">${escapeHtml(passage.source)}</span>
        <button class="copy-button" type="button" data-copy-passage="${item.number}" aria-label="Copy ${escapeHtml(item.reference)}"><span aria-hidden="true">⧉</span><span class="copy-label">Copy</span></button>
      </div>
    </article>`;
  }).join('') || '<div class="empty">No passages in this category.</div>';

  visibleCount.textContent = filtered.length;
  renderCategoryFilters();
}

function copyFallback(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy was not available.');
}

async function copyPassage(number, button) {
  const item = VERSES.find(entry => entry.number === number);
  if (!item) return;
  const passage = currentPassage(item);
  const text = `“${passage.text}”\n\n— ${item.reference}`;

  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else copyFallback(text);
    const label = button.querySelector('.copy-label');
    button.classList.add('is-copied');
    if (label) label.textContent = 'Copied';
    window.setTimeout(() => {
      button.classList.remove('is-copied');
      if (label) label.textContent = 'Copy';
    }, 1600);
  } catch (error) {
    const label = button.querySelector('.copy-label');
    if (label) label.textContent = 'Try again';
  }
}

function findAvailableVersion(versions, expected) {
  return versions.find(version => expected.apiAbbreviations.includes(String(version.abbreviation || '').toUpperCase()));
}

function setStatus(message) {
  translationStatus.textContent = message;
}

async function hydrateNltFromBolls(token, passages, expected) {
  loadingVersionKey = 'NLT';
  setStatus('Connecting to NLT…');
  render();

  const pending = VERSES.filter(item => !passages.has(item.number));
  let completed = VERSES.length - pending.length;
  let failed = 0;
  const batchSize = 8;

  for (let index = 0; index < pending.length; index += batchSize) {
    const batch = pending.slice(index, index + batchSize);
    const results = await Promise.allSettled(batch.map(item => getBollsPassage(item.reference)));

    if (token !== activeLoadToken) return;
    results.forEach((result, resultIndex) => {
      const item = batch[resultIndex];
      if (result.status === 'fulfilled') {
        passages.set(item.number, {
          text: result.value,
          source: 'NLT · Bolls.life',
          isFallback: false
        });
        completed += 1;
      } else {
        failed += 1;
      }
    });

    setStatus(`Loading NLT · ${completed} of ${VERSES.length}`);
    render();
  }

  if (token !== activeLoadToken) return;
  loadingVersionKey = null;
  const fallbackCount = VERSES.length - passages.size;
  setStatus(fallbackCount
    ? `${passages.size} passages in NLT · ${fallbackCount} shown in WEB`
    : `All ${VERSES.length} passages in NLT`);
  translationCredit.textContent = [
    `${expected.abbreviation} · New Living Translation. Scripture text supplied by Bolls.life.`,
    (failed || fallbackCount) ? 'World English Bible fallback text is public domain.' : ''
  ].filter(Boolean).join(' ');
  render();
}

async function hydrateSelectedVersion() {
  const token = ++activeLoadToken;
  const key = selectedVersionKey;
  const expected = selectedVersion();
  const passages = versionPassages(key);

  if (key === 'NLT') {
    await hydrateNltFromBolls(token, passages, expected);
    return;
  }

  if (!scriptureApi.configured || typeof scriptureApi.getPassage !== 'function') {
    loadingVersionKey = null;
    setStatus(`${expected.abbreviation} selected · showing WEB until the shared Scripture service is connected`);
    translationCredit.textContent = 'World English Bible (WEB). Public domain.';
    render();
    return;
  }

  loadingVersionKey = key;
  setStatus(`Connecting to ${expected.abbreviation}…`);
  render();

  let availableVersions;
  try {
    availableVersions = await scriptureApi.getVersions();
  } catch (error) {
    if (token !== activeLoadToken) return;
    loadingVersionKey = null;
    setStatus(`${expected.abbreviation} is temporarily unavailable · showing WEB`);
    translationCredit.textContent = 'World English Bible (WEB). Public domain.';
    render();
    return;
  }

  if (token !== activeLoadToken) return;
  const available = findAvailableVersion(availableVersions, expected);
  if (!available) {
    loadingVersionKey = null;
    setStatus(`${expected.abbreviation} is not available to the shared Scripture service · showing WEB`);
    translationCredit.textContent = 'World English Bible (WEB). Public domain.';
    render();
    return;
  }

  const pending = VERSES.filter(item => !passages.has(item.number));
  let completed = VERSES.length - pending.length;
  let failed = 0;
  const batchSize = 8;

  for (let index = 0; index < pending.length; index += batchSize) {
    const batch = pending.slice(index, index + batchSize);
    const results = await Promise.allSettled(batch.map(item => {
      const usfm = referenceToUsfm(item.reference);
      return usfm
        ? scriptureApi.getPassage(available.id, usfm)
        : Promise.reject(new Error('Unsupported Scripture reference.'));
    }));

    if (token !== activeLoadToken) return;
    results.forEach((result, resultIndex) => {
      const item = batch[resultIndex];
      if (result.status === 'fulfilled' && result.value.content) {
        passages.set(item.number, {
          text: String(result.value.content).trim(),
          source: `${expected.abbreviation} · YouVersion`,
          isFallback: false
        });
        completed += 1;
      } else {
        failed += 1;
      }
    });

    setStatus(`Loading ${expected.abbreviation} · ${completed} of ${VERSES.length}`);
    render();
  }

  if (token !== activeLoadToken) return;
  loadingVersionKey = null;
  const fallbackCount = VERSES.length - passages.size;
  setStatus(fallbackCount
    ? `${passages.size} passages in ${expected.abbreviation} · ${fallbackCount} shown in WEB`
    : `All ${VERSES.length} passages in ${expected.abbreviation}`);
  translationCredit.textContent = [
    available.copyright || `${available.title || expected.abbreviation}. Supplied by YouVersion.`,
    (failed || fallbackCount) ? 'World English Bible fallback text is public domain.' : ''
  ].filter(Boolean).join(' ');
  render();
}

function syncThemeButtons() {
  const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-theme-option]').forEach(option => {
    const active = option.dataset.themeOption === theme;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f3f0e7' : '#121612';
}

function setVersionMenuOpen(open, focusSelection = false) {
  versionMenu.hidden = !open;
  versionTrigger.setAttribute('aria-expanded', String(open));
  if (open && focusSelection) {
    const selectedIndex = versionOptions.findIndex(option => option.dataset.versionOption === selectedVersionKey);
    focusVersionOption(Math.max(0, selectedIndex));
  }
}

function focusVersionOption(index) {
  versionOptions.forEach((option, optionIndex) => {
    option.tabIndex = optionIndex === index ? 0 : -1;
  });
  versionOptions[index].focus();
}

function syncVersionPicker() {
  selectedVersionLabel.textContent = selectedVersion().abbreviation;
  versionOptions.forEach(option => {
    const selected = option.dataset.versionOption === selectedVersionKey;
    option.setAttribute('aria-selected', String(selected));
    option.tabIndex = selected ? 0 : -1;
  });
}

function chooseVersion(key) {
  if (!BIBLE_VERSIONS[key]) return;
  selectedVersionKey = key;
  saveVersionKey(selectedVersionKey);
  syncVersionPicker();
  setVersionMenuOpen(false);
  versionTrigger.focus();
  render();
  hydrateSelectedVersion();
}

document.querySelectorAll('[data-theme-option]').forEach(button => {
  button.addEventListener('click', () => {
    document.documentElement.dataset.theme = button.dataset.themeOption;
    try {
      localStorage.setItem('promises96-theme', button.dataset.themeOption);
    } catch (error) {
      // Theme selection still applies for this visit.
    }
    syncThemeButtons();
  });
});

categoryFilters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  render();
});

cards.addEventListener('click', event => {
  const button = event.target.closest('[data-copy-passage]');
  if (!button) return;
  copyPassage(Number(button.dataset.copyPassage), button);
});

versionTrigger.addEventListener('click', () => {
  setVersionMenuOpen(versionMenu.hidden, versionMenu.hidden);
});

versionTrigger.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    setVersionMenuOpen(true, true);
  }
});

versionOptions.forEach(option => {
  option.addEventListener('click', () => chooseVersion(option.dataset.versionOption));
});

versionMenu.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    const option = event.target.closest('[data-version-option]');
    if (option) {
      event.preventDefault();
      chooseVersion(option.dataset.versionOption);
    }
    return;
  }
  const currentIndex = versionOptions.indexOf(document.activeElement);
  let nextIndex = currentIndex;
  if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1 + versionOptions.length) % versionOptions.length;
  else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + versionOptions.length) % versionOptions.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = versionOptions.length - 1;
  else return;
  event.preventDefault();
  focusVersionOption(nextIndex);
});

document.addEventListener('click', event => {
  if (!versionMenu.hidden && !versionPicker.contains(event.target)) setVersionMenuOpen(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !versionMenu.hidden) {
    setVersionMenuOpen(false);
    versionTrigger.focus();
  }
});

syncThemeButtons();
syncVersionPicker();
render();
hydrateSelectedVersion();
