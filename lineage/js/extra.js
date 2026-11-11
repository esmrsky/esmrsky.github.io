/* Lineage: view-only data layered on top of /data. Nothing here changes a fact.
   It only sets the screen colors, the short labels that fit on a chart, and the
   one number each size estimate is drawn at. */
(function () {
  "use strict";
  const LN = (window.LN = window.LN || {});

  // One bright color per family, chosen for a dark screen.
  // East in golds, Rome in red, the magisterial Reformation in cool colors, revival in hot ones.
  LN.color = {
    early: "#E8EDF5", ancient: "#7C8798", "east-syriac": "#2DD4BF", oriental: "#FF9F43", orthodox: "#FFD23F",
    catholic: "#FF3B3B", dissent: "#C9A27A", lutheran: "#4D7CFE", reformed: "#3DDC84", anglican: "#A970FF",
    radical: "#D4E157", baptist: "#22C3EE", wesleyan: "#FF7A45", pentecostal: "#FF4FA3", restoration: "#8C9EFF",
    global: "#9BE15D", "new": "#9AA3B2"
  };

  // Size today, in millions. Each number is the figure on that tradition's card,
  // or the midpoint where the card gives a range. All are estimates unless the card names a source.
  LN.size = {
    catholic: 1400, pentecostal: 600, orthodox: 220, reformed: 87.5, anglican: 85, methodist: 80, lutheran: 77.5,
    oriental: 55, baptist: 50, adventist: 22, "eastern-catholic": 18, lds: 17, holiness: 12, jw: 9, restoration: 5.5,
    anabaptist: 2.1, "old-believers": 1.5, plymouth: 1.5, hussite: 1, brethren: 0.6, "church-east": 0.4, amish: 0.4,
    quaker: 0.4, "old-catholic": 0.1, hutterite: 0.05, waldensian: 0.045,
    // The card gives words, not a number. Drawn with a dashed edge and labeled with the card's own words.
    aic: 30, unitarian: 0.3
  };
  LN.soft = { aic: "Tens of millions", unitarian: "A few hundred thousand" };
  LN.under = { "old-catholic": 1 };

  // Labels short enough to sit on a chart.
  LN.tinyName = {
    early: "Early church", "church-east": "Church of the East", hussite: "Hussite / Moravian", anabaptist: "Anabaptist",
    charismatic: "Charismatic", aic: "African-initiated", restoration: "Restoration Mvmt", jw: "Jehovah's Witnesses",
    lds: "Latter-day Saints", congregationalist: "Congregationalist"
  };
  LN.eraShort = {
    apostolic: "Apostolic", persecution: "Martyrs", imperial: "Councils", "early-medieval": "Drift", medieval: "Christendom",
    reformation: "Reformation", awakening: "Revival and mission", global: "Global century"
  };
  // Share of the time axis each era gets on Flow and Radial. Crowded eras get more room.
  LN.eraWidth = { apostolic: 0.06, persecution: 0.07, imperial: 0.09, "early-medieval": 0.08, medieval: 0.14, reformation: 0.19, awakening: 0.21, global: 0.16 };

  // Reading colors for the Matrix: first, second, third reading listed for a text, and so on.
  LN.readPal = ["#4D7CFE", "#FFB020", "#FF4FA3", "#3DDC84", "#A970FF", "#22C3EE"];
  LN.councilColor = { early: "#E8EDF5", ecumenical: "#FFD23F", western: "#FF3B3B", confession: "#4D7CFE", modern: "#9AA3B2" };
})();
