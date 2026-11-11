/* Disputed texts, part 2: sacraments, the church, last things, Christian life. */
CH.debates.push(

/* ───────────────────────── SACRAMENTS ───────────────────────── */
{
  id: "eucharist", cat: "sacraments",
  title: "“This Is My Body”",
  q: "Is Christ truly present in the bread and wine, and how?",
  intro: "Four words at the Last Supper. Catholics, Orthodox, Lutherans, Reformed and Baptists each read them differently. The Reformation could not unite because of them.",
  passages: [
    { ref: "Matthew 26:26-28" },
    { ref: "Luke 22:19-20", note: "“Remembrance” is anamnēsis. A mental recalling, or a making present?" },
    { ref: "John 6:53-56" },
    { ref: "John 6:63", note: "Zwingli's key verse: the Spirit gives life, and the flesh is of no help." },
    { ref: "1 Corinthians 10:16-17" },
    { ref: "1 Corinthians 11:23-29" },
    { ref: "Hebrews 10:11-14", note: "Cited against calling the Mass a sacrifice. Catholics answer that the Mass makes the one sacrifice present and does not repeat it." },
    { ref: "Malachi 1:11", note: "Read by the early church as a prophecy of the Eucharist." }
  ],
  crux: "The word “is.” Does it mean “is,” as Luther insisted, or “stands for,” as when Jesus says “I am the door”? And is John 6 about the Supper at all, or about believing in him? Those who take both texts plainly reach a real presence. Those who start from John 6:63 and from Christ's body being in heaven reach a spiritual or symbolic reading.",
  positions: [
    { name: "Transubstantiation", held: ["catholic", "eastern-catholic"],
      text: "The whole substance of the bread and wine becomes the body and blood of Christ. Only the appearances of bread and wine remain. The Mass makes present the one sacrifice of the cross. Christ stays present in the consecrated host, which is reserved and adored. Named at the Fourth Lateran Council (1215) and defined at Trent (1551)." },
    { name: "A true change, left a mystery", held: ["orthodox", "oriental", "church-east"],
      text: "The bread and wine truly become the body and blood of Christ by the Holy Spirit, called down in the prayer of the liturgy. The East confesses the change and declines to explain it in philosophical terms. Leavened bread is used, and infants receive from baptism on." },
    { name: "Sacramental union", held: ["lutheran"],
      text: "Christ's true body and blood are present “in, with and under” the bread and wine, which remain bread and wine. All who eat receive him, believers to their good and unbelievers to their judgment. Lutherans do not use the label consubstantiation." },
    { name: "Spiritual presence", held: ["reformed", "presbyterian", "congregationalist", "anglican", "methodist"],
      text: "Calvin: Christ's body is in heaven, but by the Holy Spirit believers truly feed on him by faith as they eat the bread. The signs give what they show, to those who believe. The Anglican Articles and Wesley's Supper hymns stand close to this. Anglican practice ranges from near-Catholic to near-memorial." },
    { name: "Memorial", held: ["baptist", "anabaptist", "pentecostal", "restoration", "adventist", "plymouth", "charismatic", "amish", "hutterite", "brethren"],
      text: "Zwingli: the bread and cup are signs that recall Christ's death and declare the faith and unity of the church. Christ is present among his people, not in the elements. Usually called an ordinance, not a sacrament." },
    { name: "No outward rite", held: ["quaker"],
      text: "Quakers hold that true communion is inward and needs no bread or wine. The Salvation Army also does not practice the Supper." }
  ],
  history: "The first written dispute came in the 800s between two monks of Corbie, Radbertus and Ratramnus. Berengar of Tours was condemned in 1059 for a symbolic view. At Marburg in 1529, Luther wrote “This is my body” in chalk on the table and would not move, and the Lutheran and Swiss reforms went separate ways. Other fights are tied to this one. The Hussites demanded the cup for lay people. East and West quarreled over leavened or unleavened bread in 1054. Churches still differ on who may receive.",
  people: ["luther", "zwingli", "calvin", "aquinas", "cranmer", "hus"], councils: ["lateran-4", "trent", "marburg", "constance"]
},
{
  id: "baptism-who", cat: "sacraments",
  title: "Who Should Be Baptized",
  q: "Should the infants of believers be baptized, or only those who can profess faith?",
  intro: "The question that created the Anabaptists and Baptists, and for which hundreds were drowned or burned in the 1500s.",
  passages: [
    { ref: "Acts 2:38-39", note: "The promise is for the hearers and their children. Does this mean a covenant that takes in infants, or simply the next generation as they come to believe?" },
    { ref: "Acts 16:14-15" },
    { ref: "Acts 16:31-34" },
    { ref: "Colossians 2:11-12", note: "Paul sets baptism beside circumcision, which was given to infants." },
    { ref: "Genesis 17:7" },
    { ref: "Mark 10:13-16" },
    { ref: "1 Corinthians 7:14" },
    { ref: "Matthew 28:19-20" },
    { ref: "Acts 8:36-38", note: "Verse 37 is missing from the oldest manuscripts, and most modern Bibles put it in a footnote." },
    { ref: "Romans 6:3-4", note: "The picture of burial is the main argument for immersion." }
  ],
  crux: "The New Testament has no command to baptize infants, and no case of a believer's child baptized later as an adult. Each side reads that silence through a bigger frame. One side sees God dealing with households and their children, from Abraham on. The other sees a set order in every clear case: hear, believe, be baptized.",
  positions: [
    { name: "Infants, for new birth", held: ["catholic", "orthodox", "oriental", "church-east", "lutheran", "eastern-catholic", "old-catholic"],
      text: "Baptism is God's act, not ours. It gives new birth and joins the child to Christ and the church, and a child needs that gift as much as an adult. The East gives chrismation and first communion in the same service. Lutherans say God gives infants faith through baptism." },
    { name: "Infants, as the sign of the covenant", held: ["reformed", "presbyterian", "congregationalist", "anglican", "methodist", "hussite", "waldensian"],
      text: "God's covenant has always taken in believers and their children. Baptism took the place of circumcision as its sign. It marks the child as belonging to the church, and the promise is to be received later by personal faith." },
    { name: "Believers only", held: ["anabaptist", "baptist", "pentecostal", "restoration", "adventist", "amish", "hutterite", "brethren", "plymouth", "charismatic"],
      text: "Baptism follows a personal confession of faith. It is the believer's public pledge, and an infant cannot make it. The church is the gathered company of those who have chosen to follow Christ, not everyone born in a parish." }
  ],
  history: "Infant baptism is clearly attested by about 200. Tertullian advised against it, which shows it was being done, and Origen called it a custom from the apostles. By the 400s it was normal everywhere. On January 21, 1525, in Zurich, Conrad Grebel baptized George Blaurock, and the Anabaptist movement began. Catholic and Protestant rulers alike put Anabaptists to death. English Baptists appeared in 1609. On the amount of water: the Greek baptizō means to dip, the Didache (c. 100) prefers running water but allows pouring, the Orthodox immerse infants three times, and the West moved to pouring in the late Middle Ages. Baptists took up immersion about 1641.",
  people: ["grebel", "menno", "zwingli", "smyth", "helwys", "tertullian", "origen", "luther"], councils: ["schleitheim", "london-1689", "trent"]
},
{
  id: "baptism-what", cat: "sacraments",
  title: "What Baptism Does",
  q: "Does baptism save and give new birth, or does it picture a salvation already received?",
  intro: "This is a separate question from who is baptized. A Lutheran and a Presbyterian both baptize infants and disagree here. A Baptist and a member of the Churches of Christ both immerse believers and disagree here too.",
  passages: [
    { ref: "John 3:3-5", note: "“Born of water.” The early writers all took it as baptism." },
    { ref: "Acts 22:16" },
    { ref: "Titus 3:5-7" },
    { ref: "1 Peter 3:20-21", note: "Peter says that baptism now saves, and then adds a qualifier that each side claims." },
    { ref: "Mark 16:16" },
    { ref: "Galatians 3:26-27" },
    { ref: "1 Corinthians 1:14-17" },
    { ref: "Acts 10:44-47", note: "The Spirit falls on Cornelius's household before they are baptized." },
    { ref: "Luke 23:42-43", note: "The thief on the cross, saved without baptism." }
  ],
  crux: "Several texts tie baptism directly to forgiveness and new birth. Others stress that salvation is by faith, and show people receiving the Spirit before the water or with no water at all. Is baptism the tool God uses to save, or the sign of what faith has already received?",
  positions: [
    { name: "Baptism gives new birth", held: ["catholic", "orthodox", "oriental", "church-east", "lutheran", "eastern-catholic"],
      text: "In baptism God forgives sin, gives the Spirit and makes a person a member of Christ. Catholics say the sacrament works by Christ's power in the act itself. Lutherans say the power is the word of God joined to the water, received by faith. Anglicans use the same language in their baptism service and have long argued over how to take it." },
    { name: "Sign and seal", held: ["reformed", "presbyterian", "congregationalist", "methodist", "anglican"],
      text: "Baptism is a means of grace that shows and confirms God's promise. But the grace is not tied to the moment the water is applied. It takes effect in God's time, in those who believe." },
    { name: "For the forgiveness of sins", held: ["restoration"],
      text: "Churches of Christ read Acts 2:38 as it stands. A penitent believer is immersed “for the remission of sins,” and that is the point at which God forgives. It is an act of faith, not a work that earns anything." },
    { name: "A symbol of salvation already given", held: ["baptist", "anabaptist", "pentecostal", "adventist", "plymouth", "charismatic", "amish", "brethren"],
      text: "A person is saved the moment they trust Christ. Baptism is a commanded act of obedience that pictures dying and rising with him and declares faith in public. It is called an ordinance. The thief on the cross and Cornelius show that salvation does not wait for water." },
    { name: "No water baptism", held: ["quaker"],
      text: "The one baptism that matters is the inward baptism of the Spirit. Quakers and the Salvation Army do not baptize with water." }
  ],
  history: "For 1,500 years nearly all Christians believed baptism gives new birth. Zwingli first cut the tie between the sign and the thing signified in the 1520s. Luther held the old view against him. In 1850 the Gorham case nearly split the Church of England over the question. On the American frontier, Alexander Campbell's preaching of baptism for remission of sins set his movement apart from the Baptists.",
  people: ["zwingli", "luther", "campbell", "cyprian", "fox"], councils: ["trent", "augsburg", "westminster"]
},
{
  id: "confession", cat: "sacraments",
  title: "Confession, Priests and the Sacraments",
  q: "Did Christ give ministers power to forgive sins? Is there a priesthood apart from all believers?",
  intro: "This takes in three linked disputes: private confession to a priest, the number of the sacraments (seven or two), and whether the clergy are priests or simply ministers.",
  passages: [
    { ref: "John 20:21-23" },
    { ref: "James 5:14-16", note: "The basis for the anointing of the sick, and for confession. Protestants note that the confessing here is mutual, not to a priest." },
    { ref: "Matthew 18:18" },
    { ref: "2 Corinthians 5:18-20" },
    { ref: "1 John 1:8-9" },
    { ref: "1 Timothy 2:5" },
    { ref: "1 Peter 2:9", note: "The source text for “the priesthood of all believers.”" },
    { ref: "Hebrews 4:14-16" }
  ],
  crux: "Jesus tells the disciples that the sins they forgive are forgiven. To whom is this said: to the apostles as the first holders of an office, or to the whole church as it preaches forgiveness? And is one mediator (1 Timothy 2:5) set against human priests, or do priests act as tools of that one mediator?",
  positions: [
    { name: "Sacramental confession", held: ["catholic", "eastern-catholic", "old-catholic"],
      text: "Christ gave the apostles and their successors power to forgive in his name. Serious sins after baptism are confessed to a priest, who absolves in the person of Christ. Yearly confession has been required since 1215. There are seven sacraments: baptism, confirmation, Eucharist, penance, anointing of the sick, holy orders and marriage." },
    { name: "The mystery of repentance", held: ["orthodox", "oriental", "church-east"],
      text: "The penitent confesses to Christ with the priest present as witness and guide, and the priest prays for forgiveness and declares it. The East also counts seven mysteries but has never fixed the number as a closed list." },
    { name: "Absolution kept as gospel", held: ["lutheran", "anglican"],
      text: "Luther kept private confession for the comfort of hearing forgiveness spoken, but without a duty to list every sin. Anglicans say of it: all may, none must, some should. Both count two sacraments that Christ himself founded, baptism and the Supper. Lutherans sometimes add absolution." },
    { name: "Straight to God", held: ["reformed", "presbyterian", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "congregationalist", "adventist", "plymouth", "quaker"],
      text: "Every believer is a priest with direct access to God through Christ. Sins are confessed to God, and to one another where there has been wrong. Ministers announce the gospel's forgiveness. They do not grant it. There are two ordinances or sacraments. Quakers have none." }
  ],
  history: "In the early church serious sin meant public penance, allowed once in a lifetime. Irish monks spread private, repeatable confession from the 500s. Peter Lombard fixed the Western list of seven sacraments about 1150. The sale of indulgences, which lessen the penalties tied to penance, set off Luther's Ninety-five Theses in 1517. Trent defined the seven sacraments and the priesthood in reply.",
  people: ["luther", "aquinas", "calvin", "cyprian"], councils: ["lateran-4", "trent", "florence"]
},

/* ───────────────────────── THE CHURCH ───────────────────────── */
{
  id: "church-government", cat: "church",
  title: "Bishops, Elders or the Congregation",
  q: "Who governs the church?",
  intro: "Three answers gave three families of churches their names: Episcopal, Presbyterian and Congregational.",
  passages: [
    { ref: "Acts 14:23" },
    { ref: "Acts 20:17", note: "Paul calls for the elders (presbyteroi) of Ephesus…" },
    { ref: "Acts 20:28", note: "…and calls the same men overseers (episkopoi), the word for bishops." },
    { ref: "Titus 1:5-7" },
    { ref: "1 Timothy 3:1-2" },
    { ref: "Philippians 1:1" },
    { ref: "1 Peter 5:1-3" },
    { ref: "Acts 15:22-23", note: "The Jerusalem council: apostles, elders and the whole church." },
    { ref: "Matthew 18:17" },
    { ref: "2 Timothy 2:2" }
  ],
  crux: "In the New Testament, “elder” and “bishop” seem to name the same people. By about 110, Ignatius of Antioch writes of one bishop in each city, with elders and deacons under him, and by 200 that pattern is everywhere. Was this the Spirit leading the church into the form the apostles meant, and so binding? Or was it a human arrangement that the church may keep or change?",
  positions: [
    { name: "Bishops in succession from the apostles", held: ["catholic", "orthodox", "oriental", "church-east", "anglican", "old-catholic", "eastern-catholic", "hussite"],
      text: "The apostles appointed successors, and bishops in an unbroken line of laying on of hands guard the faith and ordain. Catholics and Orthodox hold that without them there is no full church or valid Eucharist. Anglicans kept bishops and value the line. Some Lutherans (in Sweden and Finland), Methodists and Moravians also have bishops but put less weight on the succession." },
    { name: "Rule by elders", held: ["reformed", "presbyterian"],
      text: "Elder and bishop are one office. Each church is led by a group of elders, some who teach and some who rule. Churches are joined under graded courts: session, presbytery and general assembly. No minister ranks above another." },
    { name: "The gathered congregation", held: ["baptist", "congregationalist", "anabaptist", "restoration", "pentecostal", "plymouth", "amish", "brethren"],
      text: "Each local church, under Christ, governs itself. It calls its own pastors, receives its own members and applies its own discipline (Matthew 18:17). Wider bodies advise and cooperate but cannot command." },
    { name: "No ordained clergy", held: ["quaker"],
      text: "Friends traditionally have no set-apart ministry. Anyone may speak in meeting as the Spirit leads. The early Plymouth Brethren also had no clergy." }
  ],
  history: "The fight was hottest in Britain. Scotland went Presbyterian under John Knox and Andrew Melville. England kept bishops. The Westminster Assembly (1643–49) tried to make England Presbyterian during the Civil War. Congregationalists and Baptists wanted neither system. In 1896 Pope Leo XIII ruled Anglican ordinations “absolutely null and utterly void,” which still blocks reunion.",
  people: ["ignatius", "cyprian", "knox", "calvin", "cranmer", "smyth"], councils: ["westminster", "trent", "jerusalem"]
},
{
  id: "women", cat: "church",
  title: "Women in Ministry",
  q: "May women be ordained to preach, to lead congregations and to serve at the altar?",
  intro: "A live dispute in the past hundred years. It runs between churches and through the middle of many of them.",
  passages: [
    { ref: "1 Timothy 2:11-14", note: "The verb for having authority is authentein, used only here in the New Testament. Its exact force is debated." },
    { ref: "1 Corinthians 14:34-35" },
    { ref: "1 Corinthians 11:4-5", note: "Three chapters earlier, women pray and prophesy in the gathering." },
    { ref: "Galatians 3:28" },
    { ref: "Romans 16:1-2", note: "Phoebe is a diakonos, the same word translated “deacon” or “minister” elsewhere." },
    { ref: "Romans 16:7", note: "Most scholars now read Junia, a woman's name. Is she outstanding among the apostles, or well known to them?" },
    { ref: "Acts 2:17-18" },
    { ref: "Acts 18:26" },
    { ref: "Judges 4:4" },
    { ref: "John 20:17-18" }
  ],
  crux: "Is 1 Timothy 2 a standing rule rooted in creation (“For Adam was first formed”), or a ruling for a local problem in Ephesus? Those who restrict the pastor's office start from that text and read Phoebe, Junia and Priscilla within it. Those who ordain women start from Galatians 3:28 and the women who prophesied and taught, and read the limits as tied to their setting.",
  positions: [
    { name: "A male priesthood", held: ["catholic", "orthodox", "oriental", "church-east", "eastern-catholic"],
      text: "Christ chose twelve men, and the church has kept to that pattern without a break. The priest stands at the altar as an image of Christ the bridegroom. John Paul II ruled in 1994 that the church has no authority to ordain women as priests. Some Orthodox churches are looking again at the ancient order of deaconess." },
    { name: "Complementarian", held: ["baptist", "presbyterian", "lutheran", "plymouth", "amish", "restoration"],
      text: "Men and women are equal in worth and differ in role. The office of pastor or elder is for qualified men, based on the order of creation. Women serve in many other ministries. Held by the Southern Baptist Convention, the Presbyterian Church in America, the Lutheran Church–Missouri Synod and others. The same families include bodies that do ordain women." },
    { name: "Egalitarian", held: ["methodist", "anglican", "holiness", "pentecostal", "quaker", "congregationalist", "charismatic"],
      text: "The Spirit gives gifts without regard to sex, and the limiting texts spoke to local disorder. Quakers held this from the 1650s and the Salvation Army from 1865. Holiness and Pentecostal churches had women preachers from the start. Most Methodist, Lutheran, Presbyterian and Anglican bodies in Europe and North America have ordained women since the mid-1900s." }
  ],
  history: "Margaret Fell defended women's speaking in 1666. Antoinette Brown was ordained by a Congregational church in New York in 1853. Catherine Booth helped found the Salvation Army as an equal preacher. The Church of Sweden ordained women in 1960, the U.S. Episcopal Church in 1976, and the Church of England in 1994, with bishops in 2014. The Southern Baptist Convention changed its confession in 2000 to limit the pastor's office to men.",
  people: ["booth", "palmer", "fox", "mcpherson", "john-paul-ii"], councils: []
},
{
  id: "mary", cat: "church",
  title: "Mary",
  q: "How should Christians honor the mother of Jesus, and what should they believe about her?",
  intro: "Catholic and Orthodox devotion to Mary is one of the first things a Protestant notices. A good part of the difference rests on a few Greek words.",
  passages: [
    { ref: "Luke 1:28", note: "The Greek is kecharitōmenē, one who has been graced. Protestant Bibles say favored or highly favored." },
    { ref: "Luke 1:28", t: "dra", note: "Douay-Rheims, following the Latin gratia plena: “full of grace.”" },
    { ref: "Luke 1:41-43" },
    { ref: "Luke 1:46-49" },
    { ref: "Matthew 1:24-25", note: "The Greek is heōs hou, until. Does it imply that things changed afterward? Compare 2 Samuel 6:23." },
    { ref: "Mark 6:3", note: "“Brother” (adelphos) can mean a brother or a wider kinsman." },
    { ref: "John 19:26-27", note: "Would Jesus hand his mother to John if she had other sons?" },
    { ref: "John 2:3-5" },
    { ref: "Genesis 3:15" },
    { ref: "Revelation 12:1-2" }
  ],
  crux: "Three small words carry much of the weight. Does the angel's greeting, “full of grace” or “highly favored,” describe a unique holiness? Does “until” in Matthew 1:25 mean that Mary and Joseph later lived as husband and wife? And who are the “brothers” of Jesus: Mary's younger children, Joseph's sons by an earlier marriage, or cousins? Behind the words is a larger question: may the church teach as dogma what Scripture does not plainly state?",
  positions: [
    { name: "Catholic: four dogmas", held: ["catholic", "eastern-catholic"],
      text: "Mary is the Mother of God (Ephesus, 431). She was ever a virgin. She was kept free from original sin from her conception (defined in 1854). She was taken up body and soul into heaven (defined in 1950). The faithful ask for her prayers. The brothers of Jesus are understood as cousins, following Jerome." },
    { name: "Orthodox: the all-holy God-bearer", held: ["orthodox", "oriental"],
      text: "Mary is the Theotokos, ever-virgin and the highest of the saints, and she fills Orthodox hymns and icons. Her falling asleep and being taken up are kept as a feast on August 15. The Orthodox do not accept the Immaculate Conception as Rome defined it, because they do not hold that guilt is inherited. The brothers are Joseph's children by an earlier marriage." },
    { name: "Protestant: blessed among women", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "adventist", "congregationalist", "plymouth"],
      text: "Mary is the mother of the Lord and a model of faith, and all generations call her blessed. But prayer goes to God alone, and doctrines without clear ground in Scripture cannot be required. Luther, Zwingli and Wesley still held that she remained a virgin. Most Protestants today take the brothers as her later children. Some Anglicans and Lutherans keep Marian feasts." },
    { name: "Church of the East", held: ["church-east"],
      text: "Honors Mary highly as ever-virgin, and by tradition calls her Mother of Christ and not Mother of God. The 1994 statement with Rome accepted that both titles express the same faith." }
  ],
  history: "The Protoevangelium of James (c. 150) already tells of Mary's lifelong virginity. Helvidius argued about 383 that she had other children, and Jerome wrote against him. Ephesus (431) backed the title Theotokos to protect the truth about Christ. Medieval teachers divided over her conception: Aquinas against, Duns Scotus for. Pius IX defined the Immaculate Conception in 1854 and Pius XII the Assumption in 1950, the one clear use of papal infallibility since 1870.",
  people: ["cyril-alexandria", "nestorius", "jerome", "pius-ix", "aquinas", "luther"], councils: ["ephesus", "vatican-2"]
},
{
  id: "images-saints", cat: "church",
  title: "Icons, Images and the Saints",
  q: "May Christians make and honor images, and ask the saints in heaven to pray for them?",
  intro: "Walk into an Orthodox church and then a Scottish Presbyterian one. This debate is the reason they look so different.",
  passages: [
    { ref: "Exodus 20:4-5" },
    { ref: "Exodus 25:18-20", note: "Five chapters later God commands carved cherubim for the ark." },
    { ref: "Numbers 21:8-9" },
    { ref: "2 Kings 18:4", note: "The same bronze serpent is destroyed once the people begin to worship it." },
    { ref: "Colossians 1:15", note: "Christ is the “image” (eikōn, icon) of the unseen God." },
    { ref: "Revelation 5:8", note: "The elders in heaven offer up the prayers of the saints." },
    { ref: "Hebrews 12:1" },
    { ref: "1 Timothy 2:5" },
    { ref: "Revelation 19:10" }
  ],
  crux: "Does the commandment forbid all religious images, or only idols? One fact is telling: the churches number the Ten Commandments differently. Catholics and Lutherans fold the ban on images into the first commandment. The Reformed and the Orthodox count it as the second. On the saints: are those who died in Christ able to hear and pray for us, as part of one living body? Or is asking them a form of prayer that belongs to God alone?",
  positions: [
    { name: "Icons are honored, saints are asked to pray", held: ["orthodox", "catholic", "oriental", "church-east", "eastern-catholic", "old-believers"],
      text: "Because God became visible in Christ, he can be pictured. The Second Council of Nicaea (787) separated worship, owed to God alone, from the honor shown to images, which passes on to the person shown. The saints are alive in Christ, and asking for their prayers is like asking a friend to pray. Icons belong to the heart of Orthodox worship. The Church of the East uses few images apart from the plain cross." },
    { name: "Images teach, but prayer is to God alone", held: ["lutheran", "anglican", "methodist", "hussite"],
      text: "Luther kept crucifixes, altarpieces and stained glass as aids to faith and opposed the image-smashers. The saints are remembered as examples. But Scripture does not teach us to call on them, and Christ is the one mediator (Augsburg Confession, Article 21)." },
    { name: "No images in worship", held: ["reformed", "presbyterian", "baptist", "anabaptist", "congregationalist", "restoration", "plymouth", "amish", "quaker", "adventist", "pentecostal"],
      text: "The second commandment forbids picturing God and using images in worship. Reformed churches were stripped bare and whitewashed. Prayer to saints is seen as taking from Christ's sole work as mediator. Many of these churches today allow pictures for teaching but not for devotion." }
  ],
  history: "The Byzantine emperor Leo III moved against icons about 726. The fight lasted more than a century, with monks and John of Damascus defending images. Nicaea II restored them in 787, and the final return in 843 is still kept as the Triumph of Orthodoxy. In the West, crowds wrecked church art across Switzerland, Scotland and the Netherlands in 1566.",
  people: ["john-damascus", "zwingli", "calvin", "luther", "knox"], councils: ["nicaea-2", "trent", "heidelberg"]
},
{
  id: "worship", cat: "church",
  title: "How to Worship",
  q: "May the church do in worship whatever Scripture does not forbid, or only what it commands?",
  intro: "Organs, hymns, vestments, incense, set prayers, silence: each has been a breaking point.",
  passages: [
    { ref: "John 4:23-24" },
    { ref: "Deuteronomy 12:32" },
    { ref: "Leviticus 10:1-2", note: "Nadab and Abihu offer fire that God had not commanded." },
    { ref: "Colossians 3:16" },
    { ref: "Ephesians 5:19", note: "The Greek for making music is psallontes. Churches of Christ note that the New Testament speaks of singing and never of instruments." },
    { ref: "Psalms 150:3-5" },
    { ref: "1 Corinthians 14:26" },
    { ref: "Acts 2:42" }
  ],
  crux: "What does the Bible's silence mean? If Scripture does not mention something, such as an organ, a church calendar or a wedding ring, is it allowed or ruled out?",
  positions: [
    { name: "The received liturgy", held: ["orthodox", "catholic", "oriental", "church-east", "eastern-catholic", "old-believers"],
      text: "Worship is handed down, not designed. The liturgy of the Eucharist, with set prayers, vestments, incense, chant and a yearly round of feasts and fasts, comes from the early centuries and carries the faith. The Orthodox sing without instruments. The Old Believers split from the Russian church over changes to the rite itself." },
    { name: "Whatever is not forbidden", held: ["lutheran", "anglican", "methodist", "hussite"],
      text: "The church is free to keep any custom that does not go against Scripture and that serves the gospel. Luther kept most of the Mass. The Book of Common Prayer gave Anglicans one set liturgy in English." },
    { name: "Only what is commanded", held: ["reformed", "presbyterian", "congregationalist", "baptist"],
      text: "The Reformed rule: God may be worshiped only in ways he has appointed, which are reading, preaching, prayer, psalms and the two sacraments. The Puritans rejected vestments, kneeling, holy days and set prayers on this ground. Some Presbyterians still sing only psalms, with no instruments." },
    { name: "The New Testament pattern", held: ["restoration", "anabaptist", "amish", "plymouth", "brethren"],
      text: "Worship as the first churches did. Churches of Christ sing without instruments and take the Lord's Supper every Sunday. The Amish sing slow hymns from the 1500s in homes and barns. Brethren and others keep foot washing." },
    { name: "As the Spirit leads", held: ["quaker", "pentecostal", "charismatic", "aic"],
      text: "Quakers wait in silence until someone is moved to speak. Pentecostal worship is spoken prayer by all at once, testimony, tongues and long free singing. The two look nothing alike and share one principle: no fixed script." }
  ],
  history: "The first Puritan protest (1560s) was over the white surplice worn by Anglican clergy. Scots rioted in 1637 when a prayer book was forced on them. Russian Old Believers went to the stake after 1666 over a change from two fingers to three in making the sign of the cross. American Restoration churches divided over the organ by 1906. Vatican II (1963) put the Catholic Mass into the people's languages.",
  people: ["cranmer", "calvin", "knox", "avvakum", "fox", "campbell"], councils: ["westminster", "vatican-2", "trent"]
},

/* ───────────────────────── LAST THINGS ───────────────────────── */
{
  id: "purgatory", cat: "last",
  title: "Purgatory and Prayer for the Dead",
  q: "Is there a cleansing after death, and can the prayers of the living help those who have died?",
  intro: "The sale of indulgences for souls in purgatory was the spark of 1517. Under it lay an older practice shared by East and West: praying for the dead.",
  passages: [
    { ref: "1 Corinthians 3:11-15", note: "Saved, but as through fire. A cleansing of persons after death, or a testing of a minister's work on the last day?" },
    { ref: "2 Maccabees 12:43-46", t: "dra", note: "The clearest text, from a book Protestants do not count as Scripture." },
    { ref: "Matthew 12:32", note: "Not forgiven in this age or in the age to come. Does that imply some sins are forgiven there?" },
    { ref: "2 Timothy 1:16-18", note: "Onesiphorus seems to have died. Is Paul praying for him?" },
    { ref: "Revelation 21:27" },
    { ref: "Hebrews 9:27" },
    { ref: "Luke 23:42-43" },
    { ref: "2 Corinthians 5:6-8" },
    { ref: "Luke 16:22-26" }
  ],
  crux: "Nothing unclean enters heaven, and most believers die far from perfect. How is that gap closed: by a cleansing after death, or wholly by Christ's righteousness counted to the believer at once? The strongest text for prayers for the dead stands in a book that only some churches accept, so this dispute is tied to the one over the canon.",
  positions: [
    { name: "Purgatory", held: ["catholic", "eastern-catholic"],
      text: "Those who die in God's friendship but not yet fully cleansed are purified after death before they see God. The prayers, alms and Masses of the living help them. An indulgence applies the merits of Christ and the saints to remit the penalty still due for forgiven sin. Defined at Florence (1439) and Trent (1563)." },
    { name: "Prayer for the departed, without purgatory", held: ["orthodox", "oriental", "church-east"],
      text: "The East has always prayed for the dead and believes these prayers help them. It rejects the Latin teaching of a place of cleansing fire and of penalties to be paid, and it leaves the state of the dead before the resurrection largely undefined." },
    { name: "No purgatory", held: ["lutheran", "reformed", "presbyterian", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "congregationalist", "plymouth", "anglican"],
      text: "Christ's sacrifice fully pays for sin. The believer who dies is with the Lord at once. The Anglican Articles call purgatory “a fond thing vainly invented.” Some Anglicans do pray for the departed, and C. S. Lewis believed in a cleansing after death." },
    { name: "The dead sleep", held: ["adventist", "jw"],
      text: "The dead are not conscious. They rest in the grave until the resurrection, so there is no one to pray for or to." }
  ],
  history: "Prayers for the dead appear in catacomb writing and in Tertullian (c. 200). Augustine and Gregory the Great spoke of cleansing fire. The word purgatory as a place dates from the 1100s, and Dante gave it a shape in poetry. In 1517 the preacher Johann Tetzel sold indulgences near Wittenberg to fund St. Peter's Basilica, and Luther posted his theses. Trent kept the doctrine and banned the sale.",
  people: ["luther", "gregory-great", "augustine", "lewis", "catherine-siena"], councils: ["florence", "trent", "thirty-nine"]
},
{
  id: "millennium", cat: "last",
  title: "The Thousand Years",
  q: "Will Christ reign on earth for a thousand years, and does he return before or after it?",
  intro: "One short passage in Revelation has produced four full systems for reading the end. In America it has also shaped attitudes toward the modern state of Israel.",
  passages: [
    { ref: "Revelation 20:1-6" },
    { ref: "1 Thessalonians 4:15-17", note: "The source of the word “rapture,” from the Latin rapiemur, “caught up.”" },
    { ref: "Matthew 24:29-31" },
    { ref: "Matthew 24:34", note: "“This generation.” Preterists hold that most of the chapter was fulfilled when Jerusalem fell in AD 70." },
    { ref: "Daniel 9:24-27", note: "The seventy weeks, or seventy sevens. Dispensational teaching puts a long gap before the last one." },
    { ref: "Romans 11:25-26" },
    { ref: "John 5:28-29", note: "One hour, one resurrection of all. A key text for those who see no earthly reign in between." },
    { ref: "2 Peter 3:8-10" },
    { ref: "Acts 1:6-8" }
  ],
  crux: "Is the thousand years a literal future age or a picture of the present one? Revelation is full of symbols, and it is the only place a thousand-year reign is named. A second question: do the Old Testament promises to Israel still await a literal fulfillment for the Jewish people, or are they fulfilled in Christ and the church?",
  positions: [
    { name: "Amillennial", held: ["catholic", "orthodox", "oriental", "lutheran", "reformed", "presbyterian", "anglican", "methodist", "eastern-catholic"],
      text: "The thousand years stands for the whole age between Christ's first and second comings, in which he reigns from heaven and Satan is held back from stopping the gospel. Christ returns once, raises all the dead and judges. Augustine set this out in The City of God. It has been the majority view since." },
    { name: "Postmillennial", held: ["congregationalist"],
      text: "The gospel will spread until the world is largely Christian, and after that long age of peace Christ returns. Jonathan Edwards and many Puritans held it. It drove nineteenth-century missions and social reform and faded after the World Wars." },
    { name: "Historic premillennial", held: ["baptist"],
      text: "Christ returns after a time of great trouble and then reigns on earth for a thousand years before the final judgment. Justin Martyr and Irenaeus taught this in the 100s. Among modern holders are Charles Spurgeon and George Ladd." },
    { name: "Dispensational premillennial", held: ["plymouth", "pentecostal", "charismatic"],
      text: "John Nelson Darby (1830s): God has separate plans for Israel and the church. The church is caught up before a seven-year tribulation, then Christ returns to reign from Jerusalem and keep the promises made to Israel. The Scofield Reference Bible (1909) spread it, and it is widely held by American Baptists, Pentecostals and Bible churches." },
    { name: "Adventist and Jehovah's Witness readings", held: ["adventist", "jw"],
      text: "Seventh-day Adventists place the thousand years in heaven with the saints while the earth lies empty. Jehovah's Witnesses teach that Christ began to rule unseen in 1914 and that 144,000 will reign with him over a restored earth." }
  ],
  history: "Many early writers expected an earthly kingdom. Origen and then Augustine turned the church toward a symbolic reading. End-time excitement returned with Joachim of Fiore (d. 1202), the radical Anabaptists at Münster (1534) and William Miller, who predicted Christ's return for October 22, 1844. Darby's system crossed the Atlantic through Bible conferences and, much later, popular novels.",
  people: ["augustine", "irenaeus", "justin", "edwards", "darby", "scofield", "miller", "white"], councils: []
},
{
  id: "hell", cat: "last",
  title: "Hell and the Final State",
  q: "Is the punishment of the lost endless, does it end in destruction, or will all at last be saved?",
  intro: "The majority view has always been eternal punishment. Two minority readings have a long history and are growing.",
  passages: [
    { ref: "Matthew 25:41" },
    { ref: "Matthew 25:46", note: "The same word, aiōnios, describes both the punishment and the life." },
    { ref: "Mark 9:47-48" },
    { ref: "Revelation 14:10-11" },
    { ref: "Revelation 20:14-15" },
    { ref: "Matthew 10:28", note: "“Destroy both soul and body.” Ruin, or an end of existence?" },
    { ref: "2 Thessalonians 1:8-9" },
    { ref: "Romans 6:23" },
    { ref: "1 Corinthians 15:22" },
    { ref: "1 Corinthians 15:28" },
    { ref: "Colossians 1:19-20" },
    { ref: "Ecclesiastes 9:5" }
  ],
  crux: "Three groups of texts. Some speak of everlasting punishment. Some speak of the wicked being destroyed or perishing. Some speak of God reconciling “all things” and being “all in all.” Each view takes one group as its base. Much depends on the words aiōnios (eternal, or belonging to the age to come) and apollymi (destroy, or ruin).",
  positions: [
    { name: "Everlasting conscious punishment", held: ["catholic", "orthodox", "oriental", "lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "pentecostal", "restoration", "anabaptist", "congregationalist", "plymouth"],
      text: "Those who finally refuse God are separated from him forever, aware and without end. This is the teaching of the Catholic catechism and of the main Protestant confessions. Many Orthodox writers describe hell as the experience of God's love by those who hate it." },
    { name: "Conditional immortality", held: ["adventist", "jw"],
      text: "Only God is immortal by nature, and eternal life is his gift to the saved. The lost are raised, judged and destroyed, a punishment that is eternal in its result. Taught by Seventh-day Adventists, and in recent decades by some evangelicals. John Stott leaned toward it." },
    { name: "Universal restoration", held: ["unitarian"],
      text: "God's love will finally win every creature, perhaps through cleansing judgment. Origen hoped for this, and a council in 553 condemned the teaching under his name. Gregory of Nyssa held a form of it and is still honored as a saint. It gave the Universalist churches their name. Some modern Catholic and Orthodox thinkers speak only of a hope that all may be saved." }
  ],
  history: "Augustine argued at length against “the merciful” who denied endless punishment, and his view carried the West. The 1800s saw a revolt against the doctrine in Britain and America that produced Universalists, Adventists and others. Vatican II and later popes moved the stress from fire to self-chosen separation. Among evangelicals the debate reopened in the 1980s.",
  people: ["origen", "gregory-nyssa", "augustine", "edwards", "stott", "white", "lewis"], councils: ["constantinople-2"]
},

/* ───────────────────────── CHRISTIAN LIFE ───────────────────────── */
{
  id: "sabbath", cat: "life",
  title: "Sabbath or Lord's Day",
  q: "Which day should Christians keep, and how?",
  intro: "Nearly all Christians worship on Sunday, the day of the resurrection. A committed minority keeps Saturday, and Sunday-keepers disagree among themselves about what the day is.",
  passages: [
    { ref: "Genesis 2:2-3" },
    { ref: "Exodus 20:8-11" },
    { ref: "Matthew 5:17-18" },
    { ref: "Mark 2:27-28" },
    { ref: "Acts 20:7" },
    { ref: "1 Corinthians 16:2" },
    { ref: "Revelation 1:10" },
    { ref: "Colossians 2:16-17" },
    { ref: "Romans 14:5-6" },
    { ref: "Hebrews 4:9-10" }
  ],
  crux: "The Sabbath command sits among the Ten Commandments, which Christians treat as lasting moral law, and yet Paul lists the Sabbath among the shadows that pointed to Christ. Is the fourth commandment moral, ceremonial or both? And if the day changed, who had the authority to change it?",
  positions: [
    { name: "The seventh day still stands", held: ["adventist"],
      text: "God blessed the seventh day at creation, before there was a Jewish nation, and wrote it in the Ten Commandments. No verse moves it to Sunday. Seventh-day Adventists and Seventh Day Baptists rest and worship from Friday sunset to Saturday sunset." },
    { name: "Sunday is the Christian Sabbath", held: ["reformed", "presbyterian", "congregationalist", "baptist", "methodist"],
      text: "The command to keep one day in seven is permanent. The resurrection moved the day from the last to the first. The Westminster Confession calls for a whole day of rest and worship. This was the Puritan Sunday that shaped Scotland and New England." },
    { name: "The Lord's Day, not a Sabbath", held: ["catholic", "orthodox", "lutheran", "anglican", "anabaptist", "pentecostal", "restoration", "oriental", "eastern-catholic", "plymouth"],
      text: "The Jewish Sabbath was a sign that pointed to Christ and is fulfilled in him. The church gathers on the first day because he rose on it. Catholics treat Sunday Mass as a serious duty set by the church. Luther and Calvin taught that the day itself is a matter of good order. The Ethiopian church honors both Saturday and Sunday." }
  ],
  history: "Sunday worship is attested by Ignatius (c. 110) and Justin Martyr (c. 155). Constantine made Sunday a day of rest in 321. English Puritans developed the strict Sunday Sabbath in the 1590s. Seventh Day Baptists appeared in the 1650s. After the Millerite disappointment of 1844, Joseph Bates and Ellen White gathered the Seventh-day Adventists around the Saturday Sabbath.",
  people: ["white", "miller", "constantine", "justin", "ignatius"], councils: ["westminster"]
},
{
  id: "sword", cat: "life",
  title: "The Sword, the Oath and the State",
  q: "May a Christian fight, swear an oath or hold public office? Should the state uphold the church?",
  intro: "From Constantine to the 1700s, almost every church was tied to a government. The Anabaptists broke that tie first and paid for it. Most of the modern world came around to their view of church and state. Most Christians did not accept their pacifism.",
  passages: [
    { ref: "Matthew 5:33-37" },
    { ref: "Matthew 5:38-39" },
    { ref: "Matthew 5:43-44" },
    { ref: "Matthew 26:52" },
    { ref: "John 18:36" },
    { ref: "Romans 12:19-21" },
    { ref: "Romans 13:1-4", note: "It follows directly on the end of chapter 12. The ruler does not carry the sword for nothing." },
    { ref: "Luke 3:14", note: "John the Baptist does not tell soldiers to leave the army." },
    { ref: "Matthew 22:20-21" },
    { ref: "Acts 5:29" }
  ],
  crux: "Jesus forbids his followers to resist evil with force. Paul, a few lines after repeating that teaching, says the ruler's sword is God's servant. Do the two passages address the same people? Just-war churches say the Sermon on the Mount governs private wrongs and the heart, while a Christian in public office may use force for a neighbor's sake. Peace churches say Jesus gave no such exception. The sword belongs to the world, and the disciple leaves it there.",
  positions: [
    { name: "Nonresistance", held: ["anabaptist", "amish", "hutterite", "brethren", "quaker"],
      text: "Christians do not kill, in war or otherwise, do not swear oaths, and in the older teaching do not serve as magistrates. The church is a separate people living by the Sermon on the Mount. Set out in the Schleitheim Confession (1527). Quakers reach the same peace witness by way of the inner light." },
    { name: "Just war", held: ["catholic", "lutheran", "reformed", "presbyterian", "anglican", "methodist", "baptist", "orthodox", "congregationalist", "pentecostal"],
      text: "Force is always a sad necessity, but rulers may use it to defend the innocent. A war must have a just cause, proper authority, a right aim and restraint in its means. Augustine and Aquinas drew up the rules. Luther added that God rules the world with two hands, law and sword on one side and gospel on the other, and a Christian may serve in both. The Orthodox never made a formal theory and treat killing in war as something to grieve." },
    { name: "A free church in a free state", held: ["baptist", "anabaptist", "quaker", "restoration", "adventist"],
      text: "Faith cannot be forced, so the magistrate has no power over conscience. Thomas Helwys told King James so in 1612 and died in prison. Roger Williams founded Rhode Island on the principle in 1636. This is a separate question from pacifism. Most Baptists fight in wars and reject state churches." },
    { name: "Church and ruler in partnership", held: ["orthodox", "catholic", "lutheran", "anglican", "reformed"],
      text: "The older view of nearly all: the ruler protects and promotes true religion. Byzantium called it “symphony.” The medieval West argued over whether pope or emperor was senior. The Reformation produced state churches in England, Scandinavia, Scotland and Geneva. Most of these ties have been loosened or cut." }
  ],
  history: "Christians were split on army service before Constantine. After 380 the empire was officially Christian, and Augustine approved using state pressure against the Donatists. The Peace of Augsburg (1555) let each prince choose his land's religion. After the Peasants' War (1525) and Münster (1534), rulers treated all Anabaptists as rebels. The First Amendment (1791) ended any national church in the United States. Vatican II affirmed religious freedom in 1965.",
  people: ["augustine", "aquinas", "luther", "menno", "grebel", "helwys", "williams", "fox", "bonhoeffer", "king"], councils: ["schleitheim", "augsburg", "vatican-2", "barmen"]
},
{
  id: "celibacy", cat: "life",
  title: "Married Clergy and Vows of Celibacy",
  q: "Must priests be unmarried? Is the celibate life a higher calling?",
  intro: "A married priest serves in every Orthodox village. For Catholics of the Latin rite a married priest is a rare exception. For Protestants the pastor's family is a fixture of church life. All three appeal to Paul.",
  passages: [
    { ref: "1 Timothy 3:1-2", note: "Literally a one-woman man. Must he be married? Married only once? Or simply faithful?" },
    { ref: "Matthew 8:14", note: "Peter had a mother-in-law." },
    { ref: "1 Corinthians 9:5" },
    { ref: "Matthew 19:10-12" },
    { ref: "1 Corinthians 7:7-9" },
    { ref: "1 Corinthians 7:32-35" },
    { ref: "1 Timothy 4:1-3", note: "The Reformers turned this warning about those who forbid marriage against required celibacy." }
  ],
  crux: "Paul prefers the single life for the sake of undivided service, and he also expects church leaders to be family men. Jesus praises those who give up marriage for the kingdom, “he that is able to receive it.” Is celibacy a gift freely taken up, or may the church require it of all its priests?",
  positions: [
    { name: "Celibate priests in the Latin church", held: ["catholic"],
      text: "Priests of the Latin rite promise celibacy, following Christ's own way of life and for the sake of undivided service. Rome calls this a discipline, not a dogma, so it could be changed. Married former Anglican and Lutheran clergy have been ordained as exceptions. Monks and nuns vow poverty, chastity and obedience." },
    { name: "Married priests, celibate bishops", held: ["orthodox", "oriental", "eastern-catholic", "church-east", "old-believers"],
      text: "A married man may be ordained deacon or priest, but he may not marry after ordination. Bishops are chosen from among monks or widowers. Monastic life is held in very high honor. Most Eastern Catholic churches follow the same rule. The Church of the East has at times allowed married bishops." },
    { name: "Clergy free to marry", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "anabaptist", "pentecostal", "restoration", "congregationalist", "old-catholic", "adventist"],
      text: "Marriage is honorable for all, and required celibacy has no ground in Scripture and causes scandal. The Reformers closed monasteries and married. Luther, a former monk, wed Katharina von Bora, a former nun, in 1525. Singleness is honored as a gift for some, with no vows." }
  ],
  history: "Many early clergy were married. Western councils from Elvira (c. 305) on asked married clergy to live apart from their wives. The Eastern rule was fixed at the Council in Trullo (692). The Second Lateran Council (1139) declared marriages of Latin priests void. Enforcement was a main aim of Gregory VII's reforms. The Reformers made clergy marriage a mark of their cause.",
  people: ["luther", "gregory-vii", "antony", "benedict", "paul"], councils: ["trent", "augsburg"]
},
{
  id: "divorce", cat: "life",
  title: "Divorce and Remarriage",
  q: "May a Christian who has divorced marry again?",
  intro: "Jesus's words on divorce are among his strictest. East, West and the Reformation each handle them differently, and the difference touches millions of families.",
  passages: [
    { ref: "Matthew 19:4-9", note: "The exception clause turns on the word porneia, sexual immorality. Only Matthew has it." },
    { ref: "Mark 10:11-12", note: "Mark gives no exception." },
    { ref: "1 Corinthians 7:10-15", note: "Paul adds the case of an unbelieving spouse who leaves." },
    { ref: "Deuteronomy 24:1" },
    { ref: "Malachi 2:16" }
  ],
  crux: "What is the exception in Matthew? If porneia means adultery, then the wronged spouse may divorce and, most say, remarry. If it means an unlawful union that was never a true marriage, then there is no exception for a true marriage at all. And when Paul says a deserted believer is not bound, is that person free to remarry or only free to let the other go?",
  positions: [
    { name: "A sacramental marriage cannot be dissolved", held: ["catholic", "eastern-catholic"],
      text: "A valid, consummated marriage between two baptized people ends only with death. Civil divorce does not free anyone to remarry. A church court may find that a marriage was never valid from the start (an annulment). Those who remarry without one are asked not to receive communion, though pastoral practice has been debated since 2016." },
    { name: "Remarriage allowed as a concession", held: ["orthodox", "oriental"],
      text: "Marriage is meant to be forever. But the church, acting in mercy toward human weakness, may bless a second and even a third marriage after a divorce, with a more penitential rite. A fourth is not allowed." },
    { name: "Divorce for adultery or desertion", held: ["lutheran", "reformed", "presbyterian", "anglican", "baptist", "methodist", "pentecostal", "congregationalist", "adventist"],
      text: "The Reformers denied that marriage is a sacrament and took the two biblical exceptions plainly. The innocent party may remarry (Westminster Confession, chapter 24). Many Protestant churches now also allow for abuse and other breakdown. The Church of England did not permit remarriage in church until 2002." },
    { name: "No remarriage while a spouse lives", held: ["anabaptist", "amish", "hutterite", "restoration"],
      text: "Conservative Mennonites and Amish, and many Churches of Christ, hold close to the stricter reading. Some allow remarriage only for the innocent party after adultery. Some do not allow it at all." }
  ],
  history: "The early church was strict, with some variety. The Western view hardened through Augustine and was fixed in church law in the 1100s. Henry VIII's request for an annulment from Catherine of Aragon, refused by Pope Clement VII, led to England's break with Rome in 1534. Trent confirmed that marriage cannot be dissolved in 1563.",
  people: ["augustine", "henry-viii", "luther", "erasmus"], councils: ["trent", "westminster"]
}
);
