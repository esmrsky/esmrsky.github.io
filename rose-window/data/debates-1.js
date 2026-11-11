/* Disputed texts, part 1: authority, God and Christ, salvation.
   Verse text is pulled by reference into data/verses.js (see tools/fetch_verses.py). */
window.CH = window.CH || {};
CH.debateCats = [
  { id: "authority", name: "Authority", line: "Who gets the last word, and how do we know?" },
  { id: "god", name: "God and Christ", line: "Who Jesus is, and how Father, Son and Spirit are one God." },
  { id: "salvation", name: "Salvation", line: "How a person is made right with God, and whether it lasts." },
  { id: "sacraments", name: "Sacraments", line: "What bread, wine and water actually do." },
  { id: "church", name: "The Church", line: "Who leads, who is honored, and what worship looks like." },
  { id: "last", name: "Last Things", line: "Death, judgment and the end of the age." },
  { id: "life", name: "Christian Life", line: "The Sabbath, the sword, marriage and vows." }
];

CH.debates = [

/* ───────────────────────── AUTHORITY ───────────────────────── */
{
  id: "peter-rock", cat: "authority",
  title: "Peter and the Rock",
  q: "Did Jesus found an office in Peter that passes to the bishops of Rome?",
  intro: "No single verse has divided more Christians. Catholics see here the charter of the papacy. Orthodox and Protestants honor Peter but deny that the verse sets up a ruler over the whole church.",
  passages: [
    { ref: "Matthew 16:18-19", note: "In Greek, “Peter” is Petros and “rock” is petra. In the Aramaic Jesus likely spoke, both would be the one word kepha." },
    { ref: "John 21:15-17", note: "Catholics read a charge over the whole flock. Others read Peter being restored after his three denials." },
    { ref: "Luke 22:31-32" },
    { ref: "Matthew 18:18", note: "The same binding and loosing, here given to all the disciples." },
    { ref: "Ephesians 2:19-20" },
    { ref: "1 Corinthians 3:11" },
    { ref: "Galatians 2:11", note: "Paul rebukes Peter in public at Antioch." }
  ],
  crux: "Two questions hide in one sentence. First, what is “this rock”: Peter himself, the faith he just confessed, or Christ? Second, even if it is Peter, does the promise create an office that is handed on? The text says nothing about successors either way. Each side answers from how it weighs the early church's practice.",
  positions: [
    { name: "The rock is Peter, and his office continues", held: ["catholic", "eastern-catholic"],
      text: "Jesus renames Simon “Rock” and builds on him. The keys echo the royal steward of Isaiah 22:22, an office that passes from one holder to the next. Peter led the apostles, died in Rome, and the bishops of Rome inherit his charge to strengthen the brethren and feed the sheep. Vatican I (1870) defined that the pope has full jurisdiction over the whole church and teaches without error when he defines doctrine from Peter's chair." },
    { name: "Peter is first in honor, not a ruler over all", held: ["orthodox", "oriental", "church-east", "old-catholic"],
      text: "Peter is the chief apostle and Rome was first among the ancient sees. But the rock is the faith Peter confessed (so Chrysostom), and every bishop who holds that faith sits in Peter's chair (so Cyprian). Authority over the whole church belongs to councils of bishops, not to one bishop. A primacy of honor is accepted. Universal jurisdiction and infallibility are not." },
    { name: "The rock is Christ, or Peter's confession", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "anabaptist", "congregationalist", "pentecostal", "restoration", "adventist"],
      text: "The church is built on Christ, the only foundation (1 Corinthians 3:11), whom Peter had just confessed. The keys are the preaching of the gospel, given to the whole church (Matthew 18:18). Many Protestant scholars today grant that the rock is Peter himself, but as the first witness in a once-only founding role. They note that Paul could correct him, and that the New Testament names no successor." }
  ],
  history: "Leo the Great (pope 440–461) gave the claim its classic form: Peter speaks through the bishop of Rome. Gregory VII pressed it against emperors in 1075. Disputes over it fed the break with the East in 1054. The Reformers rejected it outright. Vatican I defined papal infallibility in 1870, and the Old Catholics left over it. In 1995 John Paul II invited other churches to help rethink how the primacy is used.",
  people: ["peter", "leo-great", "cyprian", "chrysostom", "gregory-vii", "luther", "pius-ix"], councils: ["vatican-1", "florence", "chalcedon"]
},
{
  id: "scripture-tradition", cat: "authority",
  title: "Scripture and Tradition",
  q: "Is the Bible the only final authority, or does it stand alongside the church's tradition and teaching office?",
  intro: "Every church says Scripture is inspired. The split is over whether it stands alone as the final judge, and over who decides what it means when readers disagree.",
  passages: [
    { ref: "2 Timothy 3:16-17", note: "The word in dispute is the Greek ōphelimos, useful or profitable. Protestants stress the result: the reader is fully equipped. Catholics answer that useful does not mean sufficient." },
    { ref: "2 Thessalonians 2:15", note: "Paul names two channels for his teaching: what he said in person and what he wrote." },
    { ref: "Mark 7:8-9" },
    { ref: "Acts 17:11" },
    { ref: "1 Timothy 3:15", note: "Here it is the church that is called the pillar and support of the truth." },
    { ref: "1 Corinthians 11:2" },
    { ref: "2 Peter 1:20-21" }
  ],
  crux: "Paul tells the Thessalonians to hold what he taught by mouth and by letter. Was the spoken part later written down in full, so that Scripture now holds all of it? Or does some of it live on in the church's worship, creeds and bishops? And when two sincere readers disagree, is there a judge beyond the text?",
  positions: [
    { name: "Scripture alone is the final judge", held: ["lutheran", "reformed", "presbyterian", "anglican", "methodist", "congregationalist"],
      text: "The Reformation's sola scriptura. Scripture is the only rule that cannot err. Creeds, councils and church fathers are valued and used, but they can be wrong and must be tested by the Bible. Anglicans add that tradition and reason help read it. Methodists speak of Scripture, tradition, reason and experience, with Scripture first." },
    { name: "No creed but the Bible", held: ["baptist", "restoration", "anabaptist", "pentecostal", "adventist", "plymouth"],
      text: "A stricter form found in many free churches. Creeds and confessions have no binding force. Each congregation reads the New Testament for itself and tries to copy the first churches. Critics inside Protestantism say this cuts readers off from what earlier Christians learned." },
    { name: "Scripture and Tradition, read by the teaching office", held: ["catholic", "eastern-catholic"],
      text: "The one gospel comes down in two ways, written Scripture and unwritten apostolic Tradition, which together form a single deposit. The bishops in union with the pope (the magisterium) serve that deposit and interpret it with authority. Trent taught this in 1546. Vatican II restated it in 1965 and stressed that the teaching office is under the word of God, not above it." },
    { name: "Scripture within Holy Tradition", held: ["orthodox", "oriental", "church-east"],
      text: "Tradition is the whole life of the Spirit in the church. Scripture is its highest written form, alongside the councils, the liturgy, the fathers and the icons. They are not two sources to be weighed against each other. No single bishop decides. The church as a whole receives and guards the faith." }
  ],
  history: "Irenaeus (c. 180) answered the Gnostics by pointing to both the Scriptures and the public teaching of churches founded by apostles. In the late Middle Ages people asked whether a pope or council could err. Luther's stand at Worms in 1521, “my conscience is captive to the word of God,” made the question a dividing line. Trent answered in 1546. The spread of Protestant groups after 1800 is often traced to this question of who interprets.",
  people: ["irenaeus", "luther", "calvin", "campbell", "newman"], councils: ["trent", "vatican-2", "westminster"]
},
{
  id: "canon", cat: "authority",
  title: "Which Books Belong in the Bible",
  q: "Why do Catholic and Orthodox Bibles have more Old Testament books than Protestant ones?",
  intro: "All churches share the same 27 New Testament books. They differ on the Old Testament: 39 books for Protestants, 46 for Catholics, more for the Orthodox, and 81 in all for the Ethiopian church.",
  passages: [
    { ref: "2 Maccabees 12:43-46", t: "dra", note: "From a book Catholics and Orthodox hold as Scripture and Protestants do not. Text from the Douay-Rheims Bible." },
    { ref: "Luke 24:44", note: "Jesus names the three parts of the Hebrew Scriptures." },
    { ref: "Romans 3:1-2", note: "Protestants argue the Jewish people were trusted with the Old Testament, so their list of books should stand." },
    { ref: "Hebrews 11:35", note: "Widely read as pointing to the martyrs of 2 Maccabees 7." },
    { ref: "Jude 1:14-15", note: "Jude quotes 1 Enoch, which only the Ethiopian church counts as Scripture." }
  ],
  crux: "The Greek Old Testament used by the apostles and the early church (the Septuagint) circulated with books that are not in the Hebrew Bible, such as Tobit, Judith, Wisdom, Sirach, Baruch and 1–2 Maccabees. Which collection is the church's Old Testament? Behind that sits a second question: who has the authority to say?",
  positions: [
    { name: "46 Old Testament books", held: ["catholic", "eastern-catholic"],
      text: "The church read these books in worship from early on. Councils at Hippo (393) and Carthage (397) listed them, Florence repeated the list in 1442, and Trent defined it in 1546. Catholics call the seven extra books deuterocanonical, meaning their status was settled later, not that they rank lower." },
    { name: "The Septuagint, with a few more", held: ["orthodox", "oriental"],
      text: "The Greek Old Testament is the church's Bible. Orthodox Bibles add 1 Esdras, 3 Maccabees, Psalm 151 and the Prayer of Manasseh, with small differences between churches. The Ethiopian Orthodox canon is the widest and includes 1 Enoch and Jubilees." },
    { name: "39 Old Testament books", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "adventist", "congregationalist"],
      text: "The Old Testament is the Hebrew Bible. Jerome, who made the Latin Vulgate, set the extra books apart as useful but not a basis for doctrine. Luther printed them between the Testaments as “good to read.” The Church of England reads them “for example of life” but not to establish doctrine. The 1611 King James Bible included them in their own section. Most Protestant printings dropped them in the 1800s." }
  ],
  history: "Athanasius's Easter letter of 367 is the first list that matches today's New Testament exactly. The Old Testament edges stayed loose for centuries. The argument turned sharp in the 1500s because 2 Maccabees was cited for prayers for the dead, and Luther also questioned James, Hebrews, Jude and Revelation. Trent closed the Catholic canon in 1546. The old Syriac Bible of the Church of the East had 22 New Testament books, lacking 2 Peter, 2–3 John, Jude and Revelation.",
  people: ["jerome", "athanasius", "augustine", "luther"], councils: ["trent", "florence", "thirty-nine"]
},

/* ───────────────────────── GOD AND CHRIST ───────────────────────── */
{
  id: "trinity", cat: "god",
  title: "Is the Son Fully God?",
  q: "Is Jesus eternal God, equal to the Father, or the first and greatest of God's creatures?",
  intro: "The first great doctrinal fight of the church, and the reason the Nicene Creed exists. Nearly all churches today stand with Nicaea. A few modern movements do not.",
  passages: [
    { ref: "John 1:1-3" },
    { ref: "John 1:14" },
    { ref: "John 10:30" },
    { ref: "John 14:28", note: "The Arians' favorite text." },
    { ref: "Colossians 1:15-17", note: "The Greek is prōtotokos, firstborn. First to be created, or first in rank over creation?" },
    { ref: "Proverbs 8:22-23", note: "Wisdom speaks. The Greek Old Testament reads “The Lord created me,” and both sides took Wisdom to be Christ." },
    { ref: "Philippians 2:5-8" },
    { ref: "Hebrews 1:1-3" },
    { ref: "Matthew 28:19" },
    { ref: "Deuteronomy 6:4" },
    { ref: "John 20:28" }
  ],
  crux: "Scripture calls Jesus God, and it also shows him praying, obeying and saying the Father is greater. The Nicene side reads the “lesser” texts as describing the Son who took on human life (Philippians 2). The Arian side read them as describing what the Son is in himself. Much turned on single words: “firstborn,” “begotten,” and the Greek of Proverbs 8:22.",
  positions: [
    { name: "Nicene: of one being with the Father", held: ["catholic", "orthodox", "oriental", "church-east", "lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "adventist", "congregationalist", "quaker"],
      text: "The Son is “begotten, not made,” of one being (homoousios) with the Father. There was never a time when he was not. Father, Son and Holy Spirit are three persons in one God. Only God can save, so if the Son is less than God, we are not saved. This is the faith of Nicaea (325) and Constantinople (381)." },
    { name: "Arian: the first and highest creature", held: [],
      text: "Arius of Alexandria taught that God alone has no beginning. The Son was made before all ages and everything else was made through him, but “there was when he was not.” Arian Christianity was strong at the imperial court in the mid-300s and among the Goths, Vandals and Lombards until the 600s." },
    { name: "Jehovah's Witnesses", held: ["jw"],
      text: "Jehovah alone is almighty God. Jesus is his first creation, identified with Michael the archangel, and is “a god” in John 1:1 as their New World Translation renders it. The Holy Spirit is God's active force, not a person." },
    { name: "Oneness Pentecostals", held: [],
      text: "God is one person, not three. Father, Son and Spirit are ways the one God has shown himself, and Jesus is that God in flesh. Baptism is in the name of Jesus only (Acts 2:38). Held by the United Pentecostal Church and similar bodies, which broke from the Assemblies of God in 1916." },
    { name: "Latter-day Saints", held: ["lds"],
      text: "The Father, the Son and the Holy Ghost are three separate beings, one in purpose and will. The Father and the Son have glorified bodies. Latter-day Saints accept the Bible's titles for Christ but reject the wording of the fourth-century creeds." },
    { name: "Unitarian", held: ["unitarian"],
      text: "God is one person. Jesus is the Messiah and a teacher sent by God, but not God. The view took shape in Poland and Transylvania in the 1560s and in England and New England in the 1700s." }
  ],
  history: "Arius clashed with his bishop about 318. Constantine called the Council of Nicaea in 325, which condemned Arius. The fight went on for fifty more years. Athanasius was exiled five times for holding the Nicene line. The Cappadocian fathers worked out the language of one being and three persons, and the Council of Constantinople settled it in 381.",
  people: ["arius", "athanasius", "constantine", "basil", "gregory-nazianzus", "gregory-nyssa", "servetus", "russell", "smith"], councils: ["nicaea-1", "constantinople-1"]
},
{
  id: "christology", cat: "god",
  title: "One Christ, Two Natures",
  q: "How is Jesus both God and man? One nature or two?",
  intro: "After Nicaea settled that the Son is God, the next question was how God and man are joined in him. The answers split the church three ways in the 400s. Those three families still exist.",
  passages: [
    { ref: "John 1:14" },
    { ref: "Luke 1:41-43", note: "“The mother of my Lord.” The title Theotokos, God-bearer, set off the dispute." },
    { ref: "Luke 2:52" },
    { ref: "Mark 13:32" },
    { ref: "Colossians 2:9" },
    { ref: "Hebrews 4:15" },
    { ref: "Acts 20:28", note: "God's “own blood.” What is true of Christ's humanity is said of God." }
  ],
  crux: "The key word was “nature” (Greek physis). To Cyril's followers in Egypt and Syria, “two natures” after the union sounded like two Christs. To Rome and Constantinople, “one nature” sounded like a Christ who was not truly human. The Greek, Latin and Syriac terms did not line up, and rivalry between Alexandria, Antioch and Constantinople made things worse. Modern talks have found that the three sides mostly meant the same thing.",
  positions: [
    { name: "Chalcedonian: one person in two natures", held: ["catholic", "orthodox", "lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "pentecostal", "anabaptist", "congregationalist"],
      text: "Christ is one person, fully God and fully man, in two natures “without confusion, without change, without division, without separation.” Each nature keeps what is its own. Because he is one person, Mary is rightly called Mother of God. Defined at Chalcedon in 451." },
    { name: "Miaphysite: one united nature", held: ["oriental"],
      text: "Following Cyril of Alexandria's phrase “one incarnate nature of God the Word,” Christ is fully divine and fully human in one united nature, without mixing. The Oriental Orthodox churches reject the label Monophysite, and they condemn Eutyches, who taught that the humanity was swallowed up. They turned down Chalcedon because it sounded like Nestorius." },
    { name: "Church of the East: two natures kept distinct", held: ["church-east"],
      text: "Following Theodore of Mopsuestia, Christ has two natures, each complete, joined in one person. Mary is called Mother of Christ, to guard against saying that God was born or died. This church rejects the label Nestorian and holds that it never taught two Christs." },
    { name: "Views all three reject", held: [],
      text: "Docetism: Jesus only seemed human. Apollinarianism: he had a human body but no human mind. Eutychianism: his humanity dissolved into his divinity like a drop in the sea. Adoptionism: he was a man whom God adopted." }
  ],
  history: "Nestorius, bishop of Constantinople, objected to the title Theotokos in 428. Cyril of Alexandria had him deposed at Ephesus in 431. Chalcedon in 451 tried to settle matters with Pope Leo's Tome, and most of Egypt, Syria, Armenia and Ethiopia refused it. In our time the breach has narrowed. Rome signed common statements on Christ with the Coptic pope in 1973, the Syriac patriarch in 1984 and the Assyrian Church of the East in 1994.",
  people: ["cyril-alexandria", "nestorius", "leo-great", "justinian", "maximus"], councils: ["ephesus", "chalcedon", "constantinople-2", "constantinople-3"]
},
{
  id: "filioque", cat: "god",
  title: "The Filioque",
  q: "Does the Holy Spirit proceed from the Father alone, or from the Father and the Son?",
  intro: "One Latin word, Filioque (“and the Son”), added to the Nicene Creed in the West. It became the main doctrinal charge between Rome and Constantinople.",
  passages: [
    { ref: "John 15:26", note: "The Spirit proceeds from the Father and is sent by the Son. Both halves matter." },
    { ref: "John 16:13-15" },
    { ref: "John 20:21-22" },
    { ref: "Galatians 4:6" },
    { ref: "Romans 8:9", note: "The Spirit of God is also called the Spirit of Christ." },
    { ref: "Revelation 22:1" }
  ],
  crux: "John 15:26 says two things: the Spirit proceeds from the Father, and the Son sends him. The East keeps these apart. “Proceeds” names the Spirit's eternal origin, which is from the Father alone, the one source in God. The sending is what happens in time. The West holds that the sending in time shows the eternal relation. A second issue is as heavy as the first: may one part of the church change a creed that a council of the whole church wrote?",
  positions: [
    { name: "From the Father alone", held: ["orthodox", "oriental", "church-east"],
      text: "The creed of 381 says the Spirit “proceeds from the Father,” in the words of Jesus himself. The Father is the single source of the Son and the Spirit. Adding “and the Son” blurs this and was done without a council. Many Orthodox accept the phrase “through the Son” for the Spirit's work in the world." },
    { name: "From the Father and the Son", held: ["catholic"],
      text: "The Spirit proceeds from the Father and the Son as from one source, so the Son's full equality with the Father is kept. The phrase guards against Arianism. Rome has said the Greek text of the creed should stay as written, and Eastern Catholics often leave the phrase out." },
    { name: "Inherited by the Reformation", held: ["lutheran", "reformed", "presbyterian", "anglican", "methodist", "baptist"],
      text: "The Protestant confessions kept the Western wording without much debate. In recent talks with the Orthodox, Anglican and some Lutheran and Reformed bodies have agreed that the creed may be said in its first form." }
  ],
  history: "A council at Toledo in Spain used the phrase in 589 against the Arian Visigoths. Charlemagne's court pushed it. Pope Leo III agreed with the teaching but refused to alter the creed and had the original text hung in St. Peter's. Rome began to sing it about 1014. Patriarch Photius attacked it in 867, and it was a main charge in 1054. Reunion councils at Lyon (1274) and Florence (1439) defined it, and the East refused both.",
  people: ["photius", "charlemagne", "cerularius", "augustine", "palamas"], councils: ["constantinople-1", "florence"]
},
{
  id: "gifts", cat: "god",
  title: "Tongues, Prophecy and Miracles Today",
  q: "Did the miraculous gifts of the Spirit end with the apostles, or do they continue?",
  intro: "The newest of the great divides, and the one behind the fastest-growing wing of Christianity. Pentecostal and charismatic churches now count about a quarter of all Christians (estimate).",
  passages: [
    { ref: "Acts 2:1-4" },
    { ref: "Acts 2:17-18" },
    { ref: "1 Corinthians 12:7-11" },
    { ref: "1 Corinthians 13:8-10", note: "When does the perfect (to teleion) come?" },
    { ref: "1 Corinthians 14:39-40" },
    { ref: "Acts 19:2-6", note: "Pentecostals see a second experience after believing. Others see a one-time step in the gospel's spread." },
    { ref: "Ephesians 2:19-20", note: "Apostles and prophets as the foundation, laid once." },
    { ref: "Hebrews 2:3-4" },
    { ref: "Mark 16:17-18", note: "Part of the longer ending of Mark, which is missing from the two oldest full manuscripts." }
  ],
  crux: "Paul says prophecy and tongues will cease when the perfect comes. If the perfect is the finished New Testament, the gifts have ended. If it is Christ's return, they last until then. Most scholars on both sides now take it as the return. Cessationists argue instead from Ephesians 2:20: the sign gifts marked the founding age. The other question is how to read Acts: a pattern for every believer, or a record of a time that will not repeat?",
  positions: [
    { name: "Cessationist", held: ["reformed", "presbyterian", "plymouth"],
      text: "Miracles gathered around the apostles to confirm new revelation. With the apostles gone and Scripture complete, tongues, prophecy and gifts of healing have stopped. God still heals in answer to prayer, but no one holds the gift. Common among Reformed, dispensational and many Baptist teachers." },
    { name: "Classical Pentecostal", held: ["pentecostal"],
      text: "The baptism in the Holy Spirit is an experience after conversion that gives power for witness, and its first outward sign is speaking in tongues, as in Acts 2, 10 and 19. All the gifts of 1 Corinthians 12 are for the church today." },
    { name: "Charismatic and continuationist", held: ["charismatic", "aic"],
      text: "All the gifts continue, but tongues are not the required sign of Spirit baptism. Many hold that every believer receives the Spirit at conversion and may be filled many times. This view spread through the older churches from 1960 on." },
    { name: "Catholic and Orthodox", held: ["catholic", "orthodox", "oriental"],
      text: "These churches never taught that miracles ended. Healings, visions and prophecy run through the lives of the saints. Gifts are tested by the church and serve its common life. The Catholic Charismatic Renewal began in 1967 and has papal support." },
    { name: "Holiness", held: ["holiness", "methodist"],
      text: "A second work of grace follows conversion, but it is the cleansing of the heart, not tongues. The Holiness churches mostly rejected the Pentecostal claim after 1906." }
  ],
  history: "The Montanists claimed new prophecy in the 100s and were turned away. By about 400, Chrysostom wrote that tongues were no longer seen. The Reformers argued that miracles had done their work. B. B. Warfield made the full case in 1918. By then Charles Parham's students had spoken in tongues at Topeka, Kansas (January 1, 1901), and William Seymour's Azusa Street revival in Los Angeles (1906) had sent Pentecostalism around the world.",
  people: ["seymour", "parham", "warfield", "mcpherson", "chrysostom"], councils: []
},

/* ───────────────────────── SALVATION ───────────────────────── */
{
  id: "justification", cat: "salvation",
  title: "Faith and Works",
  q: "Is a sinner made right with God by faith alone?",
  intro: "The question that split Western Christianity in the 1500s. Luther called it the article on which the church stands or falls.",
  passages: [
    { ref: "Romans 3:23-28", note: "In his German Bible, Luther added “alone” after “faith” in verse 28. He said good German and Paul's meaning both called for it." },
    { ref: "Romans 4:2-5" },
    { ref: "Galatians 2:16" },
    { ref: "Ephesians 2:8-10" },
    { ref: "James 2:20-24", note: "Verse 24 is the only place in the Bible where the phrase faith alone (or faith only) appears, and the word in front of it is not." },
    { ref: "Galatians 5:6" },
    { ref: "Philippians 2:12-13" },
    { ref: "Luke 18:13-14" }
  ],
  crux: "What does “justify” mean? For the Reformers it is a verdict: God declares the sinner righteous because of Christ. For Trent it is also a change: God makes the sinner righteous within. Then there are Paul and James. Protestants say they use the word in two senses. Paul speaks of standing before God, James of faith shown to be real. Catholics say James shows that justification grows through works done in grace.",
  positions: [
    { name: "By faith alone: a verdict", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "congregationalist", "plymouth"],
      text: "God counts the believer righteous for Christ's sake alone. Christ's righteousness is credited to us and received by faith alone. Works play no part in the verdict. They follow as fruit, and a faith with no fruit is not real faith. Luther's phrase is that the believer is at once righteous and a sinner." },
    { name: "By grace, through faith working in love", held: ["catholic", "eastern-catholic"],
      text: "Justification is forgiveness and inner renewal together. It begins as a free gift in baptism, and nothing before it earns it. Grace then makes real cooperation possible, and works done in grace increase righteousness and merit eternal life as God promised. Faith is the root. Faith without love does not save. Defined at Trent in 1547." },
    { name: "Union with God (theosis)", held: ["orthodox", "oriental", "church-east"],
      text: "The East never had the Western debate and distrusts courtroom terms. Salvation is healing and sharing in God's life (2 Peter 1:4). It is all grace, and it calls for the free cooperation of the person through faith, the sacraments, prayer and love." },
    { name: "Wesleyan", held: ["methodist", "holiness", "pentecostal"],
      text: "Justified by faith alone, as the Reformers taught. But Wesley stressed that God's grace goes ahead of faith for all people, and that the new birth starts a real change that must go on to holiness of heart and life." },
    { name: "Anabaptist", held: ["anabaptist", "amish", "hutterite", "brethren"],
      text: "Faith that does not follow Jesus in life is not faith. The early Anabaptists thought the Reformers' teaching made cheap disciples. Salvation is by grace and is seen in obedience, above all to the Sermon on the Mount." },
    { name: "The “New Perspective on Paul”", held: [],
      text: "A scholarly reading since the 1970s (E. P. Sanders, James Dunn, N. T. Wright). Paul's “works of the law” are chiefly the marks that set Jews apart, such as circumcision, food laws and Sabbath. On this view his target is the exclusion of Gentiles more than moral effort. It is debated within every tradition." }
  ],
  history: "Augustine's fight with Pelagius (410s) fixed the West on grace. Late medieval teachers said God gives grace to those who do what is in them. Luther, a monk who could find no peace, broke with that around 1517. The Augsburg Confession stated the Protestant view in 1530. Talks at Regensburg in 1541 nearly reached agreement. Trent condemned “faith alone” in 1547. In 1999 the Catholic Church and the Lutheran World Federation signed a Joint Declaration saying the old condemnations do not apply to each side's teaching as stated there. Methodist, Reformed and Anglican bodies have since joined it.",
  people: ["paul", "james-just", "augustine", "luther", "melanchthon", "calvin", "wesley"], councils: ["trent", "augsburg", "jddj"]
},
{
  id: "predestination", cat: "salvation",
  title: "Predestination and Free Will",
  q: "Does God choose who will be saved, or does he save those who choose him?",
  intro: "The fight between Calvinists and Arminians is the best known form. Augustine and Pelagius had it first, and it runs through Catholic and Lutheran history too.",
  passages: [
    { ref: "Romans 8:29-30", note: "The verb is proegnō, to know beforehand. Did God see their faith ahead of time, or set his love on them ahead of time?" },
    { ref: "Romans 9:15-18", note: "Persons chosen for salvation, or peoples chosen for a role in history?" },
    { ref: "Ephesians 1:4-6" },
    { ref: "John 6:37" },
    { ref: "John 6:44" },
    { ref: "Acts 13:48" },
    { ref: "1 Timothy 2:3-6", note: "God wants all (pantas) to be saved. Every single person, or all kinds of people?" },
    { ref: "2 Peter 3:9" },
    { ref: "John 3:16-17" },
    { ref: "Matthew 23:37" },
    { ref: "Ezekiel 33:11" }
  ],
  crux: "Does God choose people because he sees they will believe, or do they believe because God chose them? One set of texts says God picks, draws and appoints. Another says he wants all to be saved and grieves over those who refuse. Each system takes one set as the plain rule and explains the other set in its light.",
  positions: [
    { name: "Reformed (Calvinist)", held: ["reformed", "presbyterian", "congregationalist"],
      text: "Before creation God chose whom he would save, by sheer mercy and not for anything seen in them. Christ died to secure their salvation. The Spirit brings them to faith without fail and keeps them. The rest are justly left in their sin. The Synod of Dort set this out in 1619 in five points, later nicknamed TULIP. Many Baptists hold it too." },
    { name: "Arminian and Wesleyan", held: ["methodist", "holiness", "pentecostal", "anabaptist", "restoration", "adventist", "baptist"],
      text: "God wants every person saved, and Christ died for all. Grace goes to everyone first and frees the will enough to accept or refuse. God chooses those he foresees will believe. Grace can be resisted. Held by Methodists, Pentecostals and a large share of Baptists." },
    { name: "Lutheran", held: ["lutheran"],
      text: "God chooses the saved by grace alone, and the believer contributes nothing. But God does not choose anyone for damnation. The lost are lost by their own fault, and grace can be resisted. Lutherans leave the two statements side by side and do not try to reconcile them (Formula of Concord, 1577)." },
    { name: "Catholic", held: ["catholic", "eastern-catholic"],
      text: "God predestines no one to evil, and grace is needed for every step, even the first (Council of Orange, 529). Inside those limits two schools are allowed. Thomists say grace works by its own power. Molinists say God knows what each free person would do in any setting and arranges his grace by that. Rome has left the question open since 1607." },
    { name: "Orthodox", held: ["orthodox", "oriental", "church-east"],
      text: "God foreknows all things but does not fix all things ahead of time. Salvation is a working together (synergy) of divine grace and human freedom. The East never took up Augustine's later teaching on predestination." }
  ],
  history: "Augustine wrote against Pelagius from 412 and came to teach that God chooses whom to save apart from anything in them. The Council of Orange (529) backed grace but not predestination to evil. Luther answered Erasmus on the bound will in 1525. Calvin gave the doctrine its best-known form. Jacobus Arminius objected, his followers filed their Remonstrance in 1610, and the Synod of Dort condemned it in 1619. Wesley and Whitefield parted over the question in 1740.",
  people: ["augustine", "pelagius", "luther", "erasmus", "calvin", "arminius", "wesley", "whitefield", "edwards"], councils: ["orange", "dort", "westminster", "concord"]
},
{
  id: "perseverance", cat: "salvation",
  title: "Can Salvation Be Lost?",
  q: "Can a true believer fall away and be lost?",
  intro: "“Once saved, always saved” is a line known to many American Christians. Most of the world's churches, across history, have said no to it.",
  passages: [
    { ref: "John 10:27-29" },
    { ref: "Romans 8:38-39" },
    { ref: "Philippians 1:6" },
    { ref: "1 John 2:19", note: "The key text for the view that those who leave were never truly inside." },
    { ref: "Hebrews 6:4-6", note: "Were these people true believers?" },
    { ref: "Hebrews 10:26-27" },
    { ref: "John 15:5-6" },
    { ref: "Galatians 5:4" },
    { ref: "1 Corinthians 9:27" },
    { ref: "2 Peter 2:20-21" }
  ],
  crux: "The New Testament holds strong promises (no one will snatch Christ's sheep out of his hand) and strong warnings (it is impossible to restore those who fall away). Which controls the other? If the promises come first, the warnings describe people who only looked like believers, or they are the means God uses to keep his own. If the warnings come first, the promises cover those who remain in Christ.",
  positions: [
    { name: "The saints will persevere", held: ["reformed", "presbyterian", "congregationalist"],
      text: "Those God has chosen and made alive he will keep to the end. True believers may fall badly but will not fall finally. Anyone who turns away for good shows they were never truly reborn (1 John 2:19). The warnings are real and are one way God keeps his people." },
    { name: "Eternal security", held: ["baptist", "plymouth"],
      text: "A popular form among Baptists and dispensational churches. A person who has truly trusted Christ is saved for good. Some teachers add that this holds even if the person later stops believing. Others answer that saving faith always lasts and always bears fruit." },
    { name: "Believers can fall away", held: ["catholic", "orthodox", "oriental", "lutheran", "anglican", "methodist", "holiness", "pentecostal", "anabaptist", "restoration", "adventist"],
      text: "The warnings mean what they say. Grace can be thrown away by unbelief or serious sin, and it can be regained by repentance. Catholics speak of mortal sin and confession. Lutherans say faith can be lost and that God wills to keep us through word and sacrament. Wesleyans stress watchfulness. No one may presume, and all should hope." }
  ],
  history: "Augustine taught that perseverance is a gift not given to every baptized person. Calvin tied it to election, so that the truly reborn cannot be lost. The Arminians doubted this in 1610, and Dort affirmed it in 1619. Wesley rejected it. In America the Baptist line “once saved, always saved” went further than Dort by stressing a single moment of decision.",
  people: ["augustine", "calvin", "arminius", "wesley", "spurgeon"], councils: ["dort", "trent", "westminster"]
},
{
  id: "original-sin", cat: "salvation",
  title: "Original Sin",
  q: "What did Adam's fall do to the rest of us?",
  intro: "All the historic churches say the human race is fallen and needs grace. They differ on whether we inherit Adam's guilt or only his damage. That difference shapes their views of baptism, of Mary and of infants.",
  passages: [
    { ref: "Romans 5:12", note: "The last clause in Greek is eph' hō pantes hēmarton, “because all sinned.” Augustine's Latin Bible read in quo, “in whom all sinned.”" },
    { ref: "Romans 5:18-19" },
    { ref: "Psalms 51:5" },
    { ref: "Ephesians 2:1-3" },
    { ref: "Genesis 8:21" },
    { ref: "Ezekiel 18:20" },
    { ref: "Matthew 19:14" }
  ],
  crux: "A matter of translation sits at the center. Augustine read Romans 5:12 in Latin as “in whom all sinned,” meaning everyone sinned in Adam and shares his guilt. The Greek fathers read “because all sinned”: death spread from Adam, and in a world ruled by death everyone sins. Is the thing inherited guilt, or mortality and a bent toward sin?",
  positions: [
    { name: "Catholic", held: ["catholic", "eastern-catholic"],
      text: "Adam lost the holiness he was made with, for himself and for all his children. Each person is born without that grace, which is original sin, a state and not a personal act. Baptism takes it away. A pull toward sin stays but is not itself sin (Trent, 1546)." },
    { name: "Lutheran and Reformed", held: ["lutheran", "reformed", "presbyterian", "anglican", "congregationalist"],
      text: "The fall ruined every part of human nature. The will is not free to turn to God without grace. The Reformed add that Adam stood for the race as its head, so his guilt is counted to all. The pull toward sin that stays in the baptized is truly sin." },
    { name: "Orthodox: ancestral sin", held: ["orthodox", "oriental", "church-east"],
      text: "We inherit death, decay and a weakened will from Adam, not his personal guilt. Each person is guilty only of their own sins. Infants are baptized to be joined to Christ and his life, not chiefly to wash off an inherited guilt." },
    { name: "Wesleyan", held: ["methodist", "holiness", "pentecostal"],
      text: "Human nature is wholly fallen, as the Reformers said. But because of Christ a first grace reaches every person and restores enough freedom to answer God. No one is condemned for Adam's sin alone." },
    { name: "Age of accountability", held: ["anabaptist", "baptist", "restoration", "adventist", "amish", "hutterite", "brethren"],
      text: "Children are born with a nature that leans to sin, but they are not held guilty until they can know right from wrong. Many Baptists hold this alongside a strong doctrine of the fall. Churches of Christ generally deny inherited guilt." },
    { name: "Pelagian (rejected by all the above)", held: [],
      text: "Adam hurt only himself and set a bad example. Each person is born as Adam was made and is able to obey God without inner grace. Condemned at Carthage in 418 and at Ephesus in 431." }
  ],
  history: "Pelagius, a British monk in Rome, was alarmed by Augustine's prayer “give what you command.” Augustine answered him for twenty years and worked out the Western doctrine. The Council of Orange (529) held that even the first step of faith is a gift, without backing all of Augustine. Because the East never took the idea of inherited guilt, it later declined the Catholic dogma of Mary's Immaculate Conception.",
  people: ["augustine", "pelagius", "chrysostom", "calvin", "wesley"], councils: ["orange", "trent", "ephesus"]
},
{
  id: "atonement", cat: "salvation",
  title: "Why the Cross Saves",
  q: "How does the death of Jesus put things right between God and humanity?",
  intro: "Every church confesses that Christ died for our sins. No council ever defined how it works. The answers are less a list of denominations than a set of models, and most churches use more than one.",
  passages: [
    { ref: "Isaiah 53:5-6" },
    { ref: "Mark 10:45" },
    { ref: "Romans 3:25-26", note: "The key word is hilastērion. Does it mean turning away God's wrath (propitiation) or wiping away sin (expiation)? Translations differ." },
    { ref: "2 Corinthians 5:19-21" },
    { ref: "Colossians 2:13-15" },
    { ref: "Hebrews 2:14-15" },
    { ref: "1 Peter 2:24" },
    { ref: "1 Peter 3:18" },
    { ref: "1 John 2:2" },
    { ref: "John 10:14-15", note: "Used for the view that Christ died for his sheep in particular." }
  ],
  crux: "The New Testament uses several pictures: a ransom paid, a battle won, a sacrifice offered, a debt canceled, a verdict given. The split is over which picture is the center, and above all whether the Father laid on the Son the punishment sinners deserved.",
  positions: [
    { name: "Victory and ransom", held: ["orthodox", "oriental", "church-east"],
      text: "By dying and rising, Christ broke the power of death, sin and the devil and freed their captives. This was the main note in the early church and it remains so in the East, which sings at Easter that he trampled down death by death." },
    { name: "Satisfaction", held: ["catholic"],
      text: "Anselm of Canterbury (1098): sin robs God of the honor owed to him. Humanity owes the debt, and only God can pay it, so the God-man offers his life freely. Catholic teaching built on this. Christ's loving obedience makes up for sin and wins grace." },
    { name: "Penal substitution", held: ["reformed", "presbyterian", "lutheran", "baptist", "anglican", "pentecostal", "plymouth", "adventist"],
      text: "The Reformers sharpened Anselm. Christ stood in the place of sinners and bore the penalty the law demands, so that God is both just and the one who justifies. For most evangelicals this is the heart of the gospel." },
    { name: "Governmental", held: ["methodist", "holiness"],
      text: "Hugo Grotius (1617) and later Methodist teachers: Christ's death shows how serious sin is and upholds God's moral rule, so that God can forgive without making light of his law. Wesley himself preached substitution." },
    { name: "Moral influence", held: ["unitarian"],
      text: "Linked with Peter Abelard (d. 1142) and with liberal Protestants. The cross is the supreme display of God's love, and it changes us by drawing out love in return." },
    { name: "A second question: for whom?", held: [],
      text: "Strict Calvinists hold that Christ died to save the elect in particular (definite or “limited” atonement). Lutherans, Arminians, Catholics and Orthodox hold that he died for every person (1 John 2:2)." }
  ],
  history: "Irenaeus spoke of Christ living the whole human story again and reversing Adam. Gregory of Nyssa pictured the devil swallowing a baited hook. Anselm's Why God Became Man (1098) set aside the idea of a ransom paid to the devil. Abelard answered him. Calvin put the model in terms of law. Gustaf Aulén's Christus Victor (1931) brought the oldest model back into view.",
  people: ["irenaeus", "anselm", "abelard", "calvin", "gregory-nyssa"], councils: ["dort"]
},
{
  id: "sanctification", cat: "salvation",
  title: "Holiness and Perfection",
  q: "How holy can a Christian become in this life?",
  intro: "The question that made Methodism and, through it, the Holiness and Pentecostal movements.",
  passages: [
    { ref: "Matthew 5:48", note: "“Perfect” (teleios) can also mean complete or mature." },
    { ref: "1 Thessalonians 5:23-24" },
    { ref: "1 John 3:9" },
    { ref: "1 John 1:8-9" },
    { ref: "Romans 7:21-25", note: "Is Paul describing his life as a Christian, or life under the law before Christ?" },
    { ref: "Philippians 3:12-14" },
    { ref: "Hebrews 12:14" },
    { ref: "2 Peter 1:3-4", note: "Sharing in the divine nature: the root text for the Eastern teaching of theosis." }
  ],
  crux: "Two lines in the first letter of John pull both ways. Whoever is born of God does not go on sinning, he writes, and yet anyone who claims to have no sin is self-deceived. Much depends on how sin is defined. Wesley meant a willful breaking of a known law of God, so a heart perfect in love could still make mistakes. The Reformed count every shortfall as sin, so no one is free of it before death.",
  positions: [
    { name: "Christian perfection", held: ["methodist", "holiness"],
      text: "Wesley taught that God can so fill a believer with love that willful sin stops. This is entire sanctification. It is received by faith, often in a moment after conversion, and it can be lost. The Holiness movement called it the second blessing." },
    { name: "A lifelong struggle", held: ["lutheran", "reformed", "presbyterian", "baptist", "anglican"],
      text: "The believer is truly being renewed, and real growth is expected. But sin stays until death, and Romans 7 is the normal Christian life. Claims of perfection lead to pride or despair." },
    { name: "Pentecostal: two views", held: ["pentecostal"],
      text: "The first Pentecostals kept the Holiness second blessing and added Spirit baptism as a third experience. The Church of God (Cleveland) and the Church of God in Christ still teach this. From 1910 William Durham taught the “finished work”: sanctification begins at conversion and grows. The Assemblies of God follow him." },
    { name: "Catholic", held: ["catholic", "eastern-catholic"],
      text: "Grace truly makes the soul holy, and all are called to holiness. The saints show how far grace can go. What is left undone at death is finished in purgatory." },
    { name: "Orthodox: theosis", held: ["orthodox", "oriental"],
      text: "The goal of life is to share in God's own life by grace and to become by grace what Christ is by nature. This has no upper limit and no end, in this age or the next." }
  ],
  history: "Wesley published A Plain Account of Christian Perfection in 1766. In America, Phoebe Palmer's Tuesday meetings (from the 1830s) and the camp meetings after 1867 made it a movement. Britain's Keswick conventions (from 1875) taught a “higher life” of victory over sin without claiming it is rooted out. The Holiness churches gave birth to Pentecostalism in 1901–1906.",
  people: ["wesley", "palmer", "finney", "seymour", "palamas"], councils: []
}
];
