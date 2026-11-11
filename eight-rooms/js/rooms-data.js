/* Eight Rooms: curation only. Wall colors, which pictures hang large, and which
   disputed text is argued in which room. No facts live here; those are in /data. */
window.CH = window.CH || {};

/* wall = the gallery paint, ink = type on it, acc = the one accent,
   dk / lt = the two inks of the duotone photograph, frame / mat = picture frames. */
CH.rooms = {
  apostolic: {
    wall: "#dbc08a", ink: "#1b160f", acc: "#a02c14", dk: "#2a1c0d", lt: "#ead6a8", frame: "#33210f", mat: "#f3e9d2",
    paint: "Papyrus sand", layout: "split", side: "right",
    leads: ["paul", "peter"],
    texts: ["church-government", "sabbath"],
    hero: { "church-government": [{ ref: "Acts 14:23" }] }
  },
  persecution: {
    wall: "#5c1215", ink: "#f3ddc9", acc: "#f0a94a", dk: "#2c0608", lt: "#f2bd8c", frame: "#b48a3c", mat: "#efe2cf",
    paint: "Catacomb oxblood", layout: "split", side: "left",
    leads: ["perpetua", "irenaeus", "tertullian"],
    texts: ["canon", "millennium", "hell"],
    hero: { canon: [{ ref: "Luke 24:44" }] }
  },
  imperial: {
    wall: "#3a1552", ink: "#f4e7c6", acc: "#e8b93c", dk: "#1d082d", lt: "#f1c95c", frame: "#b9963f", mat: "#f1e6cc",
    paint: "Byzantine purple", layout: "bleed",
    leads: ["augustine", "constantine", "athanasius", "chrysostom"],
    texts: ["trinity", "christology", "original-sin", "mary"],
    hero: { trinity: [{ ref: "John 10:30" }, { ref: "John 14:28" }] }
  },
  "early-medieval": {
    wall: "#15402c", ink: "#f0e7c8", acc: "#f2b33a", dk: "#092216", lt: "#ecd27a", frame: "#b9963f", mat: "#efe6cf",
    paint: "Monastery green", layout: "split", side: "right",
    leads: ["gregory-great", "charlemagne", "john-damascus"],
    texts: ["filioque", "images-saints", "peter-rock"],
    hero: { filioque: [{ ref: "John 15:26" }] }
  },
  medieval: {
    wall: "#13327f", ink: "#f3ecd9", acc: "#ff7b5c", dk: "#08184a", lt: "#c3d4ff", frame: "#b9963f", mat: "#eee8d8",
    paint: "Lapis blue", layout: "bleed",
    leads: ["francis", "aquinas", "hildegard", "hus"],
    texts: ["purgatory", "atonement", "confession", "celibacy"],
    hero: { purgatory: [{ ref: "1 Corinthians 3:11-15", only: [15] }] }
  },
  reformation: {
    wall: "#efebe1", ink: "#121110", acc: "#c9211b", dk: "#121110", lt: "#f2eee4", frame: "#121110", mat: "#ffffff",
    paint: "Printer's black and red", layout: "bleed",
    leads: ["luther", "calvin", "tyndale", "teresa-avila"],
    texts: ["justification", "eucharist", "scripture-tradition", "baptism-who", "baptism-what", "predestination", "divorce"],
    feature: 2,
    hero: {
      justification: [{ ref: "Romans 3:23-28", only: [28] }, { ref: "James 2:20-24", only: [24] }],
      eucharist: [{ ref: "Matthew 26:26-28", only: [26] }]
    }
  },
  awakening: {
    wall: "#f0a51e", ink: "#1d1304", acc: "#9c1f0e", dk: "#2b1703", lt: "#f8ba3a", frame: "#1d1304", mat: "#fbf3df",
    paint: "Revival marigold", layout: "bleed",
    leads: ["wesley", "edwards", "crowther", "spurgeon"],
    texts: ["sanctification", "perseverance", "worship", "sword"],
    hero: { sanctification: [{ ref: "Matthew 5:48" }, { ref: "1 John 1:8-9", only: [8] }] }
  },
  global: {
    wall: "#0b5256", ink: "#e9f4ee", acc: "#ffa585", dk: "#042b2e", lt: "#c4ecdf", frame: "#0c0c0c", mat: "#f4f1ea",
    paint: "Sea teal", layout: "bleed", allMats: true,
    leads: ["seymour", "bonhoeffer", "king", "teresa-calcutta"],
    texts: ["gifts", "women"],
    hero: { gifts: [{ ref: "1 Corinthians 14:39-40", only: [39] }, { ref: "1 Corinthians 13:8-10", only: [8] }] }
  }
};

/* Banner and tile colors for the families. Brighter than version 1's, tuned so
   white type reads on every one of them. */
CH.roomFam = {
  early: "#2a2622", ancient: "#6b6457", "east-syriac": "#0f766e", oriental: "#b45309", orthodox: "#946400",
  catholic: "#b01e23", dissent: "#7a5230", lutheran: "#1d4ea3", reformed: "#1f7a3d", anglican: "#6d3a9c",
  radical: "#756710", baptist: "#0e7490", wesleyan: "#c2410c", pentecostal: "#be185d", restoration: "#3f4fa0",
  global: "#4d7c0f", "new": "#57534e"
};
