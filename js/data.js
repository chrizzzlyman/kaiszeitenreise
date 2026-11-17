/* ============================================================
   Kais Zeitenreise – Lerninhalte
   Hier kannst du Verben, Sätze, Texte und Schätze anpassen.
   Alle Verbformen werden aus dem Verblexikon automatisch erzeugt,
   so müssen nur Verb, Person, Subjekt und Satzrest eingetragen werden.
   ============================================================ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.KaiData = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---------- Zeitformen ---------- */
  const TENSES = ["praesens", "praeteritum", "perfekt", "futur"];

  const TENSE_INFO = {
    praesens: {
      name: "Präsens",
      alt: "Gegenwart",
      short: "jetzt",
      formula: "Das Verb passt sich der Person an: ich laufe, er läuft.",
      example: "Kai läuft über das Deck.",
      signal: ["jetzt", "gerade", "heute", "im Moment"],
      rule: "Das Präsens erzählt, was JETZT passiert.",
      tip: "Achtung: Manche Verben ändern den Vokal, zum Beispiel laufen → er läuft.",
    },
    praeteritum: {
      name: "Präteritum",
      alt: "Vergangenheit",
      short: "vorbei",
      formula: "Das Verb ändert sich in einem Wort: spielte, lief.",
      example: "Kai lief über das Deck.",
      signal: ["gestern", "früher", "damals", "letzte Woche"],
      rule: "Das Präteritum erzählt, was früher war. Es ist nur EIN Wort.",
      tip: "Schwache Verben bekommen -te (spielen → spielte). Starke Verben ändern den Stamm (laufen → lief).",
    },
    perfekt: {
      name: "Perfekt",
      alt: "Vergangenheit",
      short: "geschafft",
      formula: "haben oder sein + Partizip (gespielt, gelaufen)",
      example: "Kai ist über das Deck gelaufen.",
      signal: ["gestern", "früher", "vor einer Stunde"],
      rule: "Das Perfekt erzählt, was schon geschehen ist. Es besteht aus ZWEI Teilen.",
      tip: "Bei Bewegung (laufen, fliegen, springen) und bei sein/bleiben nimmst du „sein“, sonst „haben“.",
    },
    futur: {
      name: "Futur",
      alt: "Zukunft",
      short: "bald",
      formula: "werden + Grundform (werde laufen)",
      example: "Kai wird über das Deck laufen.",
      signal: ["morgen", "bald", "gleich", "später"],
      rule: "Das Futur erzählt, was noch kommt. Es besteht aus ZWEI Teilen.",
      tip: "Du brauchst immer eine Form von „werden“ und die Grundform des Verbs.",
    },
  };

  /* ---------- Zeitwörter (Hinweise im Satz) ---------- */
  const TIME_WORDS = {
    praesens: ["jetzt", "gerade", "heute", "im Moment"],
    praeteritum: ["gestern", "früher", "damals", "letzte Woche", "vor einer Stunde"],
    perfekt: ["gestern", "früher", "damals", "letzte Woche", "vor einer Stunde"],
    futur: ["morgen", "bald", "gleich", "später", "nächste Woche"],
  };

  /* ---------- Verblexikon ----------
     Schwache (regelmäßige) Verben: nur pp (Partizip) und evtl. aux ("sein").
     Starke Verben:  pres = Stamm für du/er (bei Vokalwechsel), pret = Präteritumstamm.
     Gemischte Verben: m:1 + pret (bringen → brachte, rennen → rannte).
     aux fehlt = "haben".                                                            */
  const VERBS = {
    // schwach
    spielen: { pp: "gespielt" },
    suchen: { pp: "gesucht" },
    machen: { pp: "gemacht" },
    kochen: { pp: "gekocht" },
    lachen: { pp: "gelacht" },
    malen: { pp: "gemalt" },
    tanzen: { pp: "getanzt" },
    kaufen: { pp: "gekauft" },
    zeigen: { pp: "gezeigt" },
    fragen: { pp: "gefragt" },
    sagen: { pp: "gesagt" },
    hören: { pp: "gehört" },
    warten: { pp: "gewartet" },
    antworten: { pp: "geantwortet" },
    öffnen: { pp: "geöffnet" },
    putzen: { pp: "geputzt" },
    zählen: { pp: "gezählt" },
    angeln: { pp: "geangelt" },
    winken: { pp: "gewinkt" },
    bauen: { pp: "gebaut" },
    holen: { pp: "geholt" },
    leuchten: { pp: "geleuchtet" },
    regnen: { pp: "geregnet" },
    träumen: { pp: "geträumt" },
    wohnen: { pp: "gewohnt" },
    lernen: { pp: "gelernt" },
    feiern: { pp: "gefeiert" },
    kämpfen: { pp: "gekämpft" },
    schaukeln: { pp: "geschaukelt" },
    sammeln: { pp: "gesammelt" },
    verstecken: { pp: "versteckt", noGe: true },
    entdecken: { pp: "entdeckt", noGe: true },
    besuchen: { pp: "besucht", noGe: true },
    segeln: { pp: "gesegelt", aux: "sein" },
    klettern: { pp: "geklettert", aux: "sein" },
    rudern: { pp: "gerudert", aux: "sein" },
    // stark
    laufen: { pres: "läuf", pret: "lief", pp: "gelaufen", aux: "sein" },
    gehen: { pret: "ging", pp: "gegangen", aux: "sein" },
    kommen: { pret: "kam", pp: "gekommen", aux: "sein" },
    sehen: { pres: "sieh", pret: "sah", pp: "gesehen" },
    finden: { pret: "fand", pp: "gefunden" },
    essen: { pres: "iss", pret: "aß", pp: "gegessen" },
    trinken: { pret: "trank", pp: "getrunken" },
    schreiben: { pret: "schrieb", pp: "geschrieben" },
    lesen: { pres: "lies", pret: "las", pp: "gelesen" },
    fliegen: { pret: "flog", pp: "geflogen", aux: "sein" },
    schwimmen: { pret: "schwamm", pp: "geschwommen", aux: "sein" },
    springen: { pret: "sprang", pp: "gesprungen", aux: "sein" },
    geben: { pres: "gib", pret: "gab", pp: "gegeben" },
    nehmen: { pres: "nimm", pret: "nahm", pp: "genommen" },
    schlafen: { pres: "schläf", pret: "schlief", pp: "geschlafen" },
    singen: { pret: "sang", pp: "gesungen" },
    fahren: { pres: "fähr", pret: "fuhr", pp: "gefahren", aux: "sein" },
    helfen: { pres: "hilf", pret: "half", pp: "geholfen" },
    werfen: { pres: "wirf", pret: "warf", pp: "geworfen" },
    graben: { pres: "gräb", pret: "grub", pp: "gegraben" },
    binden: { pret: "band", pp: "gebunden" },
    ziehen: { pret: "zog", pp: "gezogen" },
    tragen: { pres: "träg", pret: "trug", pp: "getragen" },
    fallen: { pres: "fäll", pret: "fiel", pp: "gefallen", aux: "sein" },
    bleiben: { pret: "blieb", pp: "geblieben", aux: "sein" },
    rufen: { pret: "rief", pp: "gerufen" },
    verlieren: { pret: "verlor", pp: "verloren", noGe: true },
    vergessen: { pres: "vergiss", pret: "vergaß", pp: "vergessen", noGe: true },
    blasen: { pres: "bläs", pret: "blies", pp: "geblasen" },
    scheinen: { pret: "schien", pp: "geschienen" },
    // gemischt
    bringen: { m: 1, pret: "brach", pp: "gebracht" },
    rennen: { m: 1, pret: "rann", pp: "gerannt", aux: "sein" },
    // Sonderfälle (komplett von Hand)
    sein: {
      irr: true,
      pres: ["bin", "bist", "ist", "sind", "seid", "sind"],
      pretAll: ["war", "warst", "war", "waren", "wart", "waren"],
      pp: "gewesen",
      aux: "sein",
    },
    haben: {
      irr: true,
      pres: ["habe", "hast", "hat", "haben", "habt", "haben"],
      pretAll: ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"],
      pp: "gehabt",
    },
  };

  /* ---------- Sätze ----------
     [Verb, Person, Subjekt, Rest]
     Person: 1s ich · 2s du · 3s er/sie/es · 1p wir · 2p ihr · 3p sie
     Subjekt steht so, wie es MITTEN im Satz geschrieben wird
     (Pronomen und Artikel klein, Namen und Nomen groß).
     Der Rest ist EIN Satzbaustein (Ort, Objekt …) und steht hinter der Zeitangabe. */
  const ITEMS_RAW = [
    ["spielen", "3s", "Kai", "mit dem Papagei"],
    ["spielen", "1p", "wir", "mit dem Ball"],
    ["laufen", "3s", "Kai", "über das Deck"],
    ["laufen", "3p", "die Kinder", "am Strand entlang"],
    ["segeln", "1p", "wir", "zur Schatzinsel"],
    ["segeln", "3s", "der Kapitän", "um die Insel"],
    ["suchen", "3p", "die Piraten", "den Schatz"],
    ["suchen", "1s", "ich", "meinen Kompass"],
    ["finden", "3s", "der Pirat", "eine Flaschenpost"],
    ["finden", "2s", "du", "eine goldene Münze"],
    ["graben", "1p", "wir", "ein tiefes Loch"],
    ["graben", "3p", "die Piraten", "nach dem Schatz"],
    ["fliegen", "3s", "das Schiff", "über die Wolken"],
    ["fliegen", "2p", "ihr", "zu den Sternen"],
    ["sehen", "1s", "ich", "eine kleine Insel"],
    ["sehen", "3p", "die Matrosen", "einen großen Wal"],
    ["rufen", "3s", "die Möwe", "nach Kai"],
    ["rufen", "2s", "du", "den Kapitän"],
    ["essen", "3p", "die Piraten", "einen großen Fisch"],
    ["essen", "1s", "ich", "einen roten Apfel"],
    ["trinken", "1s", "ich", "frisches Wasser"],
    ["trinken", "3s", "der Papagei", "aus dem Napf"],
    ["schlafen", "3s", "der Kapitän", "in der Kajüte"],
    ["schlafen", "2p", "ihr", "in der Hängematte"],
    ["singen", "3p", "die Matrosen", "ein lustiges Lied"],
    ["singen", "2s", "du", "ein Seemannslied"],
    ["schreiben", "2s", "du", "einen langen Brief"],
    ["schreiben", "3s", "Kai", "ins Logbuch"],
    ["lesen", "3s", "Kai", "die Schatzkarte"],
    ["lesen", "1p", "wir", "ein spannendes Buch"],
    ["malen", "1s", "ich", "eine bunte Flagge"],
    ["kochen", "3s", "die Köchin", "eine Fischsuppe"],
    ["kochen", "1p", "wir", "einen Topf Reis"],
    ["machen", "3s", "Kai", "einen Handstand"],
    ["feiern", "3p", "die Piraten", "ein großes Fest"],
    ["lachen", "2p", "ihr", "über den Witz"],
    ["lachen", "3s", "der Papagei", "laut"],
    ["tanzen", "3p", "die Piraten", "auf dem Deck"],
    ["tanzen", "1s", "ich", "im Kreis"],
    ["springen", "3s", "der Pirat", "ins Wasser"],
    ["springen", "2s", "du", "über die Pfütze"],
    ["schwimmen", "1p", "wir", "zur Insel"],
    ["schwimmen", "3s", "der Delfin", "um das Schiff"],
    ["geben", "3s", "Kai", "dem Papagei einen Keks"],
    ["geben", "1p", "wir", "dem Koch die Karte"],
    ["nehmen", "1s", "ich", "das Fernrohr"],
    ["nehmen", "3p", "die Kinder", "die Schatzkarte"],
    ["bringen", "3s", "die Möwe", "eine Nachricht"],
    ["bringen", "2s", "du", "das Essen"],
    ["helfen", "2s", "du", "dem Koch"],
    ["helfen", "3p", "die Kinder", "dem Kapitän"],
    ["werfen", "3s", "Kai", "den Anker ins Wasser"],
    ["werfen", "1p", "wir", "das Netz ins Meer"],
    ["ziehen", "3p", "die Matrosen", "am dicken Seil"],
    ["ziehen", "1p", "wir", "den schweren Anker"],
    ["binden", "1s", "ich", "ein rotes Tuch um den Kopf"],
    ["binden", "3s", "der Pirat", "ein dickes Seil um den Mast"],
    ["tragen", "3s", "der Pirat", "eine schwere Kiste"],
    ["tragen", "2p", "ihr", "die Fässer"],
    ["fahren", "1p", "wir", "mit dem Beiboot zum Strand"],
    ["fahren", "3s", "der Koch", "zum Hafen"],
    ["kommen", "2p", "ihr", "zum Hafen"],
    ["kommen", "3s", "der Wind", "von Westen"],
    ["gehen", "1p", "wir", "an Bord"],
    ["gehen", "3s", "die Piratin", "zur Schatzkiste"],
    ["klettern", "3s", "Kai", "auf den Mast"],
    ["klettern", "3p", "die Affen", "auf die Palme"],
    ["rennen", "3s", "der Koch", "zum Strand"],
    ["rennen", "1s", "ich", "zum Steg"],
    ["fallen", "3s", "der Hut", "ins Wasser"],
    ["fallen", "3p", "die Kokosnüsse", "von der Palme"],
    ["bleiben", "3p", "die Piraten", "auf der Insel"],
    ["bleiben", "1s", "ich", "an Land"],
    ["sein", "3s", "das Meer", "ruhig"],
    ["sein", "3p", "die Piraten", "müde"],
    ["sein", "2s", "du", "auf dem Schiff"],
    ["haben", "1s", "ich", "großen Hunger"],
    ["haben", "3s", "der Kapitän", "eine neue Karte"],
    ["haben", "1p", "wir", "viel Spaß"],
    ["fragen", "3s", "Kai", "den Kapitän"],
    ["antworten", "3s", "der Kapitän", "freundlich"],
    ["warten", "3p", "die Kinder", "am Strand"],
    ["warten", "1s", "ich", "auf den Wind"],
    ["öffnen", "3s", "der Pirat", "die Schatzkiste"],
    ["zählen", "3s", "Kai", "die Goldmünzen"],
    ["putzen", "3p", "die Matrosen", "das Deck"],
    ["angeln", "1p", "wir", "einen dicken Fisch"],
    ["hören", "3s", "Kai", "ein lautes Geräusch"],
    ["zeigen", "3s", "der Kapitän", "den Weg zur Insel"],
    ["kaufen", "1s", "ich", "einen neuen Hut"],
    ["sagen", "3s", "der Papagei", "laut Ahoi"],
    ["sammeln", "3p", "die Kinder", "bunte Muscheln"],
    ["winken", "3s", "Kai", "dem Schiff"],
    ["bauen", "1p", "wir", "ein Floß"],
    ["holen", "3s", "der Koch", "frisches Wasser"],
    ["leuchten", "3s", "der Mond", "hell"],
    ["regnen", "3s", "es", "stark"],
    ["blasen", "3s", "der Wind", "kräftig"],
    ["scheinen", "3s", "die Sonne", "hell"],
    ["verstecken", "3p", "die Piraten", "den Schatz"],
    ["entdecken", "3s", "Kai", "eine geheime Höhle"],
    ["besuchen", "1p", "wir", "eine kleine Insel"],
    ["verlieren", "3s", "der Kapitän", "seinen Hut"],
    ["vergessen", "3s", "Kai", "den Kompass"],
    ["kämpfen", "3p", "die Piraten", "mit Holzschwertern"],
    ["rudern", "1p", "wir", "zum Strand"],
    ["schaukeln", "3s", "das Schiff", "im Wind"],
    ["wohnen", "3s", "der Papagei", "auf dem Schiff"],
    ["träumen", "3s", "Kai", "von Gold"],
    ["lernen", "1p", "wir", "die Zeitformen"],
  ];

  const ITEMS = ITEMS_RAW.map(function (r, i) {
    return { id: i, verb: r[0], person: r[1], subj: r[2], rest: r[3] };
  });

  /* ---------- Texte von Kai ---------- */
  const TEXTS = {
    greetFirst: "Ahoi! Ich bin Kai. Wohin soll die Reise gehen?",
    greetBack: [
      "Ahoi! Wohin fliegen wir heute?",
      "Schön, dass du da bist! Such dir eine Reise aus.",
      "Mein Schiff ist startklar. Wohin fliegen wir?",
    ],
    start: {
      praesens: "Präsens: Was passiert JETZT?",
      praeteritum: "Präteritum: Was war früher? Nur EIN Verbwort!",
      perfekt: "Perfekt: haben oder sein + Partizip.",
      futur: "Futur: werden + Grundform.",
      mix: "Wilde Mischung! Achte genau auf jede Aufgabe.",
      fehler: "Diese Aufgaben üben wir noch einmal. Du schaffst das!",
    },
    correct: [
      "Volltreffer!",
      "Super gemacht!",
      "Genau richtig!",
      "Wie ein echter Pirat!",
      "Klasse!",
      "Bravo!",
    ],
    correctSecond: [
      "Geschafft! Beim zweiten Versuch.",
      "Richtig! Dranbleiben lohnt sich.",
      "Jetzt stimmt es!",
    ],
    wrongFirst: [
      "Fast! Versuch es noch einmal.",
      "Hoppla! Schau genau hin.",
      "Probier es noch einmal!",
    ],
    reveal: [
      "Kein Problem! Das üben wir noch.",
      "Macht nichts! Weiter geht’s.",
      "Nicht schlimm! Beim nächsten Mal klappt es.",
    ],
    roundEnd: {
      3: ["Fantastisch! Du bist ein Zeitenmeister!", "Wow, fast alles auf Anhieb richtig!"],
      2: ["Starke Reise! Das war richtig gut.", "Prima gemacht!"],
      1: ["Geschafft! Beim nächsten Mal wird es noch besser.", "Du hast durchgehalten, das zählt!"],
    },
  };

  /* ---------- Ränge ---------- */
  const RANKS = [
    { min: 0, name: "Landratte", art: "eine" },
    { min: 150, name: "Seeratte", art: "eine" },
    { min: 450, name: "Piratenlehrling", art: "ein" },
    { min: 900, name: "Piratenprofi", art: "ein" },
    { min: 1500, name: "Käpt'n", art: "ein" },
  ];

  /* ---------- Schätze (Erfolge): jeder Erfolg legt ein Schatzstück in die Truhe ----------
     art = Name der Zeichnung in art.js (KaiArt.treasure) */
  const BADGES = [
    { id: "first", art: "compass", name: "Kompass", desc: "Die erste Reise geschafft." },
    { id: "rounds3", art: "spyglass", name: "Fernrohr", desc: "3 Reisen geschafft." },
    { id: "tenses", art: "map", name: "Schatzkarte", desc: "Jede Zeitform einmal geübt." },
    { id: "praesens", art: "emerald", name: "Smaragd", desc: "8 von 10 gleich richtig im Präsens." },
    { id: "praeteritum", art: "amethyst", name: "Amethyst", desc: "8 von 10 gleich richtig im Präteritum." },
    { id: "perfekt", art: "amber", name: "Bernstein", desc: "8 von 10 gleich richtig im Perfekt." },
    { id: "futur", art: "sapphire", name: "Saphir", desc: "8 von 10 gleich richtig im Futur." },
    { id: "mix", art: "pearl", name: "Zauberperle", desc: "7 von 10 gleich richtig in der Wilden Mischung." },
    { id: "stars3", art: "goblet", name: "Goldpokal", desc: "3 Sterne in einer Reise." },
    { id: "streak", art: "ruby", name: "Feuerrubin", desc: "5 Aufgaben hintereinander gleich richtig." },
    { id: "perfect", art: "diamond", name: "Diamant", desc: "Eine ganze Reise ohne Fehler." },
    { id: "redo", art: "key", name: "Schlüssel", desc: "Eine Fehler-Reise geschafft." },
    { id: "coins", art: "bars", name: "Goldbarren", desc: "300 Goldmünzen gesammelt." },
    { id: "coins1000", art: "ring", name: "Goldring", desc: "1000 Goldmünzen gesammelt." },
    { id: "rounds", art: "hat", name: "Piratenhut", desc: "10 Reisen geschafft." },
    { id: "master", art: "crown", name: "Königskrone", desc: "Alle vier Zeitform-Edelsteine gefunden." },
  ];

  return {
    TENSES, TENSE_INFO, TIME_WORDS, VERBS, ITEMS, TEXTS, RANKS, BADGES,
  };
});
