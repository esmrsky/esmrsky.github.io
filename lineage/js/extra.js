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
  // Original widths (Wikimedia Commons, read November 11, 2026) of the pictures whose originals are 501 to 959px wide.
  // Every other 500px thumbnail has an original of at least 960px. Used only to pick a sharper copy.
  LN.mid = {
    "ADAMELLO_-_PAPA_-_Giovanni_Paolo_II_-_panoramio_(cropped).jpg": 762,
    "Anselm_of_Canterbury,_seal.svg": 755,
    "Avvakum.jpg": 626,
    "CS_Lewis_photo_on_dust_jacket.jpg": 900,
    "Charles_Wesley.jpg": 664,
    "Charles_g_finney.jpg": 893,
    "E-codices_bke-0047_001v_medium_(cropped).jpg": 640,
    "Exultet_Rolls_of_Southern_Italy,_detail_of_Pope_Gregory_VII.jpg": 507,
    "Facial_Chronicle_-_b.13,_p.414_-_Photios_baptising_king_of_Bulgars.gif": 813,
    "Fox_by_Lely_2.jpg": 659,
    "Fresco_of_Saint_Paul_at_Ephesus.jpg": 898,
    "Giovanni_Battista_Tiepolo_096.jpg": 955,
    "John_Bunyan_by_Thomas_Sadler_1684.jpg": 668,
    "John_Nelson_Darby_à_Genève_1840.jpg": 888,
    "Joseph_Smith,_Jr._portrait_owned_by_Joseph_Smith_III.jpg": 747,
    "Knoxbezaicones.jpg": 844,
    "Memling,_Trittico_di_Benedetto_Portinari,_San_Benedetto.jpg": 725,
    "Monseñor_Romero_(colour).jpg": 631,
    "Piotr_Abelard_(cropped).jpg": 723,
    "Polycarp_of_Smyrna2.jpg": 735,
    "Portret_van_Friedrich_Ernst_Daniel_Schleiermacher_(cropped).jpg": 942,
    "Saint_Boniface_by_Cornelis_Bloemaert.jpg": 800,
    "San_Bernardo,_de_Juan_Correa_de_Vivar_(Museo_del_Prado).jpg": 779,
    "St._Peter_(portrayed_as_a_Roman_consul).jpg": 593,
    "StFrancis_part.jpg": 735,
    "Statue_of_Dame_Julian_crop.jpg": 683,
    "Stimmer_Jan_Hus.jpg": 720,
    "Søren_Kierkegaard_(1813-1855)_-_(cropped).jpg": 564,
    "Thomas_von_Kempen_JS.JPG": 852,
    "Ulrich-Zwingli-1.jpg": 712,
    "William_wilberforce.jpg": 650,
    "Wycliffe_by_Kirby.jpg": 917
  };
})();
