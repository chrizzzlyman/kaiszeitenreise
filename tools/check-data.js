/* Prüft Lerninhalte und Aufgabenlogik.
   Aufruf:   node tools/check-data.js          (nur Prüfung)
             node tools/check-data.js --print  (alle Sätze zum Korrekturlesen ausgeben) */
const D = require("../js/data.js");
const L = require("../js/logic.js");

let errors = 0;
function fail(msg) { errors++; console.error("FEHLER: " + msg); }

// 1) Alle Verben im Lexikon vollständig?
Object.keys(D.VERBS).forEach(function (inf) {
  const v = D.VERBS[inf];
  if (!v.pp) fail(inf + ": Partizip fehlt");
  if (!v.irr && !v.pret) {
    // schwach: Partizip muss zur Regel passen
    const st = L.stemOf(inf);
    const e = L.needsE(st) ? "et" : "t";
    const expect = (v.noGe ? "" : "ge") + st + e;
    if (v.pp !== expect) fail(inf + ": Partizip " + v.pp + " passt nicht zur Regel (" + expect + ")");
  }
});

// 2) Alle Sätze erzeugen
const print = process.argv.includes("--print");
const ids = {};
D.ITEMS.forEach(function (it) {
  if (!D.VERBS[it.verb]) fail("Verb fehlt: " + it.verb);
  if (L.PERSONS.indexOf(it.person) < 0) fail("Person unbekannt bei " + it.verb);
  const f = L.forms(it.verb, it.person);
  const labels = {};
  D.TENSES.forEach(function (t) {
    const label = f[t].join(" ");
    if (labels[label]) fail(it.verb + " " + it.person + ": " + t + " und " + labels[label] + " haben dieselbe Form");
    labels[label] = t;
    D.TIME_WORDS[t].forEach(function (tw) {
      ["S", "T", "R"].forEach(function (o) {
        const toks = L.buildTokens(it, t, tw, o);
        if (print && o === "S" && tw === D.TIME_WORDS[t][0]) console.log(L.pad ? "" : "", t.padEnd(12), L.sentenceText(toks));
      });
    });
  });
  if (print) console.log("");
  const key = it.verb + it.person + it.subj;
  if (ids[key]) fail("Doppelter Satz " + key);
  ids[key] = 1;
});

// 3) Viele Reisen erzeugen
const modes = ["praesens", "praeteritum", "perfekt", "futur", "mix"];
let made = 0;
modes.forEach(function (m) {
  for (let r = 0; r < 200; r++) {
    const qs = L.buildRound({ mode: m, count: 10 });
    if (qs.length !== 10) fail("Reise hat " + qs.length + " Aufgaben");
    const verbs = {};
    qs.forEach(function (q, i) {
      made++;
      if (i > 0 && qs[i - 1].type === q.type) fail("Gleiche Typen hintereinander in " + m);
      if (q.type === "mc") {
        const labels = q.options.map(function (o) { return L.norm(o.label); });
        if (new Set(labels).size !== labels.length) fail("MC mit doppelten Optionen: " + labels.join("|"));
        if (q.options.length !== 3) fail("MC hat " + q.options.length + " Optionen (" + q.verb + ")");
        if (q.options[q.correctIndex].kind !== "correct") fail("MC Lösung falsch markiert");
      }
      if (q.type === "order") {
        const s = L.norm(q.shuffled.map(function (k) { return q.tokens[k].text; }).join(" "));
        if (q.accepted.indexOf(s) >= 0) fail("Gemischte Reihenfolge ist schon richtig: " + s);
        // Probe: richtige Reihenfolge wird akzeptiert
        if (!L.checkOrder(q, q.tokens.map(function (t) { return t.text; })).ok) fail("Richtige Reihenfolge wird abgelehnt");
      }
      if (q.type === "gap") {
        if (!L.checkGap(q, q.expected).ok) fail("Richtige Lücke wird abgelehnt: " + q.verb);
        if (L.checkGap(q, q.expected.map(function () { return ""; })).ok) fail("Leere Lücke akzeptiert");
      }
      if (q.type === "find") {
        if (q.options.length !== 3) fail("find hat " + q.options.length + " Optionen");
        if (q.options[q.correctIndex].tense !== q.tense) fail("find Lösung falsch");
      }
    });
  }
});
console.log("Geprüft: " + D.ITEMS.length + " Sätze, " + Object.keys(D.VERBS).length + " Verben, " + made + " Aufgaben erzeugt.");

// 4) Stichproben für die Antwortprüfung
(function () {
  const it = D.ITEMS.find(function (x) { return x.verb === "laufen" && x.person === "3s"; });
  const q = L.makeQuestion(it, "perfekt", "gap", Math.random);
  const t1 = L.checkGap(q, ["hat", "gelaufen"]);
  if (t1.ok || t1.gaps[0].reason.code !== "auxSwap") fail("auxSwap nicht erkannt");
  const t2 = L.checkGap(q, ["ist", "laufen"]);
  if (t2.ok || t2.gaps[1].reason.code !== "otherTense") fail("otherTense (Grundform=Futur) nicht erkannt: " + JSON.stringify(t2.gaps[1]));
  const t3 = L.checkGap(q, ["IST ", " Gelaufen"]);
  if (!t3.ok) fail("Groß/Kleinschreibung oder Leerzeichen führen zu Fehler");
  const q2 = L.makeQuestion(it, "praesens", "gap", Math.random);
  if (!L.checkGap(q2, ["laeuft"]).translit) fail("ae statt ä wird nicht akzeptiert");
  if (L.checkGap(q2, ["lauft"]).ok) fail("lauft darf nicht richtig sein");
  const sp = D.ITEMS.find(function (x) { return x.verb === "spielen"; });
  const q3 = L.makeQuestion(sp, "perfekt", "gap", Math.random);
  const t4 = L.checkGap(q3, [q3.expected[0], "spielt"]);
  if (t4.gaps[1].reason.code !== "missingGe") fail("missingGe nicht erkannt");
  const vs = D.ITEMS.find(function (x) { return x.verb === "verstecken"; });
  const q4 = L.makeQuestion(vs, "perfekt", "gap", Math.random);
  if (L.checkGap(q4, [q4.expected[0], "geversteckt"]).gaps[1].reason.code !== "extraGe") fail("extraGe nicht erkannt");
})();

// 5) Schätze: Jeder Erfolg braucht eine Zeichnung und einen Platz in der Truhe
(function () {
  const Art = require("../js/art.js").KaiArt;
  const ids = {}, arts = {};
  D.BADGES.forEach(function (b) {
    if (!b.id || !b.art || !b.name || !b.desc) fail("Schatz unvollständig: " + JSON.stringify(b));
    if (ids[b.id]) fail("Schatz-Kennung doppelt: " + b.id);
    if (arts[b.art]) fail("Zeichnung doppelt verwendet: " + b.art);
    ids[b.id] = arts[b.art] = true;
    if (!Art.treasure(b.art)) fail("Keine Zeichnung für " + b.art);
    if (!Art.SLOTS[b.art]) fail("Kein Platz in der Truhe für " + b.art);
  });
  Object.keys(Art.SLOTS).forEach(function (k) { if (!arts[k]) fail("Platz ohne Schatz: " + k); });
  console.log("Geprüft: " + D.BADGES.length + " Schätze mit Zeichnung und Platz in der Truhe.");
})();

if (errors) { console.error("\n" + errors + " Fehler gefunden."); process.exit(1); }
console.log("Alle Prüfungen bestanden.");
