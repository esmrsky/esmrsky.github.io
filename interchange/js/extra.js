/* Interchange: map-only data layered on top of /data. Nothing here changes a fact;
   it only says where a line is drawn, what its bullet looks like, and how long
   station names are shortened to fit on a map. */
(function () {
  "use strict";
  const CH = window.CH;
  const END = 2026;

  // [from, to, pixels per year]. Crowded decades get more room.
  const SEGS = [[30, 100, 2.2], [100, 300, 1.2], [300, 500, 1.6], [500, 1000, 1], [1000, 1500, 1.3], [1500, 1510, 6],
    [1510, 1540, 20], [1540, 1620, 8], [1620, 1700, 4.5], [1700, 1900, 3.6], [1900, END, 5.5]];

  // Row of each line. The trunk is 0, the East rides above it, the West below.
  // Children sit next to their parent so a branch settles before its own first branch.
  const lanes = {
    "church-east": -6.5, oriental: -5.5, cathar: -4.5, bogomil: -3.5, "old-believers": -3.5, orthodox: -2.5,
    marcionite: -2, "eastern-catholic": -1.5, gnostic: -1, waldensian: -0.5, early: 0, lollard: 0.5, "old-catholic": 0.5,
    arian: 1, hussite: 1.5, donatist: 2, catholic: 2.5, montanist: 3, lutheran: 3.5, presbyterian: 4.5, restoration: 5.5,
    unitarian: 6.5, reformed: 7.5, anabaptist: 8.5, brethren: 9.5, amish: 10.5, hutterite: 11.5, anglican: 12.5,
    plymouth: 13.5, methodist: 14.5, aic: 15.5, holiness: 16.5, pentecostal: 17.5, charismatic: 18.5, quaker: 19.5,
    congregationalist: 20.5, baptist: 21.5, adventist: 22.5, jw: 23.5, lds: 24.5
  };

  // Bullet codes, the way a transit system letters its lines.
  const code = {
    early: "E", gnostic: "GN", marcionite: "MC", montanist: "MT", arian: "AR", donatist: "DN", bogomil: "BG", cathar: "CT",
    "church-east": "CE", oriental: "OO", orthodox: "EO", "old-believers": "OB", "eastern-catholic": "EC", catholic: "RC",
    "old-catholic": "OC", waldensian: "W", lollard: "LO", hussite: "H", lutheran: "L", anabaptist: "AB", hutterite: "HU",
    amish: "AM", brethren: "BR", quaker: "Q", reformed: "R", presbyterian: "PR", congregationalist: "C", unitarian: "U",
    anglican: "A", baptist: "B", methodist: "M", holiness: "HO", pentecostal: "P", charismatic: "CH", plymouth: "PB",
    restoration: "RM", adventist: "AD", jw: "JW", lds: "LD", aic: "AI"
  };

  // One trunk color per family, retuned for a white map.
  const pal = {
    early: "#141414", ancient: "#9AA0A6", "east-syriac": "#00808C", oriental: "#8A5A2B", orthodox: "#F2B600",
    catholic: "#E3231B", dissent: "#7D7A1A", lutheran: "#0A5EB0", reformed: "#007A3D", anglican: "#6A2C91",
    radical: "#B8C400", baptist: "#00A6E0", wesleyan: "#F47B20", pentecostal: "#E5007D", restoration: "#3B3F9E",
    global: "#35B34A", "new": "#56606B"
  };

  // Short names for the stations that carry a label. Keyed by position in CH.events.
  const stationName = {
    0: "Pentecost", 2: "Council of Jerusalem", 9: "Irenaeus", 15: "Edict of Milan", 16: "Nicaea", 19: "Constantinople",
    23: "Ephesus", 25: "Chalcedon", 31: "Arab conquests", 35: "Charlemagne", 38: "Baptism of Rus", 39: "East–West Schism",
    41: "First Crusade", 43: "Sack of Constantinople", 45: "Lateran IV", 48: "Western Schism", 50: "Hus burned at Constance",
    51: "Florence", 52: "Fall of Constantinople", 56: "Ninety-five Theses", 57: "Diet of Worms", 58: "First Anabaptist baptisms",
    60: "Marburg", 61: "Augsburg", 62: "England breaks with Rome", 65: "Trent", 73: "First Baptist church", 75: "Dort",
    77: "Westminster", 78: "Westphalia", 84: "Wesley’s heart warmed", 89: "Missionary movement", 100: "Papal infallibility",
    101: "Azusa Street", 104: "Russian Revolution", 107: "Barmen", 113: "Vatican II", 116: "Lausanne", 119: "Joint Declaration"
  };

  // Councils that already have a moment on the map, by position in CH.events.
  const councilEvent = {
    jerusalem: 2, "nicaea-1": 16, "constantinople-1": 19, ephesus: 23, chalcedon: 25, "lateran-4": 45, constance: 50,
    florence: 51, trent: 65, "vatican-1": 100, "vatican-2": 113, marburg: 60, augsburg: 61, dort: 75, westminster: 77,
    barmen: 107, lausanne: 116, jddj: 119
  };
  // Councils with no moment of their own get a station on these lines.
  const councilStation = {
    orange: ["Orange", ["early"]], "constantinople-2": ["Constantinople II", ["early"]],
    "constantinople-3": ["Constantinople III", ["early"]], "nicaea-2": ["Nicaea II", ["early"]],
    schleitheim: ["Schleitheim", ["anabaptist"]], heidelberg: ["Heidelberg", ["reformed"]],
    "thirty-nine": ["Thirty-Nine Articles", ["anglican"]], concord: ["Book of Concord", ["lutheran"]],
    "london-1689": ["London Confession", ["baptist"]]
  };

  // The disputed text most tied to the moment a line left its parent.
  const splitText = {
    arian: "trinity", "church-east": "christology", oriental: "christology", orthodox: "filioque", catholic: "filioque",
    "eastern-catholic": "peter-rock", "old-catholic": "peter-rock", hussite: "eucharist", lutheran: "justification",
    reformed: "justification", anglican: "justification", anabaptist: "baptism-who", baptist: "baptism-who",
    presbyterian: "church-government", congregationalist: "church-government", unitarian: "trinity",
    methodist: "sanctification", holiness: "sanctification", pentecostal: "gifts", charismatic: "gifts",
    adventist: "sabbath", jw: "trinity", plymouth: "millennium"
  };

  // Who the acceptance rows are, as lines.
  const acceptLines = [["church-east"], ["oriental"], ["orthodox"], ["catholic"], ["lutheran", "reformed", "anglican"], ["baptist", "pentecostal"]];

  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const smart = s => esc(s)
    .replace(/(^|[\s(\[\u201c\u2014-])'/g, "$1‘").replace(/'/g, "’")
    .replace(/(^|[\s(\[])&quot;/g, "$1“").replace(/&quot;/g, "”");
  const T = {}; CH.traditions.forEach(t => (T[t.id] = t));
  const colorOf = id => pal[T[id].family];
  function ink(hex) {
    const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] > 0.3 ? "#111111" : "#ffffff";
  }
  // "Hussites → Moravians" is one line with two names: the first at its start, the second today.
  const tail = id => id === "early" ? "Early church" : T[id].short;
  const head = id => tail(id).replace(/ → .*$/, "");
  const dest = id => tail(id).replace(/^.*→ /, "");
  const years = t => t.id === "early" ? "c. 30 to 1054" : t.end ? `${t.start} to ${t.end}` : `${t.start} to today`;
  const lineage = id => { const out = []; let n = T[id]; while (n) { out.push(n.id); n = T[n.parent]; } return out; };

  CH.x = { END, SEGS, lanes, code, pal, stationName, councilEvent, councilStation, splitText, acceptLines, esc, smart, T, colorOf, ink, tail, head, dest, years, lineage };
})();
