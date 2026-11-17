/* ============================================================
   Kais Zeitenreise – Logik (ohne Oberfläche, testbar mit Node)
   Konjugation, Aufgaben erzeugen, Antworten prüfen, Rückmeldungen.
   ============================================================ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./data.js"));
  else root.KaiLogic = factory(root.KaiData);
})(typeof self !== "undefined" ? self : this, function (D) {
  "use strict";

  const PERSONS = ["1s", "2s", "3s", "1p", "2p", "3p"];
  const PIDX = { "1s": 0, "2s": 1, "3s": 2, "1p": 3, "2p": 4, "3p": 5 };
  const HABEN = ["habe", "hast", "hat", "haben", "habt", "haben"];
  const SEIN = ["bin", "bist", "ist", "sind", "seid", "sind"];
  const WERDEN = ["werde", "wirst", "wird", "werden", "werdet", "werden"];

  /* ---------- kleine Helfer ---------- */
  function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }
  function shuffle(arr, rng) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase().replace(/\s+/g, " "); }
  function translit(s) {
    return norm(s).replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  }
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = []; for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }
  function tenseName(t) { return D.TENSE_INFO[t].name; }

  /* ---------- Konjugation ---------- */
  function stemOf(inf) {
    if (/(eln|ern)$/.test(inf)) return inf.slice(0, -1);
    return inf.replace(/en$/, "");
  }
  function needsE(stem) { return /[dt]$/.test(stem) || /(ffn|gn|chn|tm|dm|ckn)$/.test(stem); }
  function sibilant(s) { return /[sßxz]$/.test(s); }

  function typeOf(inf) {
    const v = D.VERBS[inf];
    if (v.irr) return "irr";
    if (v.pret) return v.m ? "mixed" : "strong";
    return "weak";
  }

  function presens(inf, p) {
    const v = D.VERBS[inf];
    if (v.irr) return v.pres[PIDX[p]];
    const st = stemOf(inf);
    const s2 = v.pres || st;
    switch (p) {
      case "1s":
        if (/eln$/.test(inf)) return st.slice(0, -2) + "le";
        return st + "e";
      case "2s":
        if (sibilant(s2)) return s2 + "t";
        return s2 + (needsE(s2) ? "est" : "st");
      case "3s":
        return s2 + (needsE(s2) ? "et" : "t");
      case "1p": case "3p":
        return inf;
      case "2p":
        return st + (needsE(st) ? "et" : "t");
    }
    throw new Error("Unbekannte Person " + p);
  }

  function praeteritum(inf, p) {
    const v = D.VERBS[inf];
    if (v.irr) return v.pretAll[PIDX[p]];
    if (!v.pret || v.m) {
      const base = v.pret || stemOf(inf);
      const e = needsE(base) ? "e" : "";
      const end = { "1s": "te", "2s": "test", "3s": "te", "1p": "ten", "2p": "tet", "3p": "ten" }[p];
      return base + e + end;
    }
    const pr = v.pret;
    switch (p) {
      case "1s": case "3s": return pr;
      case "2s": return pr + (/[dt]$/.test(pr) || sibilant(pr) ? "est" : "st");
      case "1p": case "3p": return pr + "en";
      case "2p": return pr + (/[dt]$/.test(pr) ? "et" : "t");
    }
    throw new Error("Unbekannte Person " + p);
  }

  function auxOf(inf) { return D.VERBS[inf].aux || "haben"; }
  function auxForm(aux, p) { return (aux === "sein" ? SEIN : HABEN)[PIDX[p]]; }

  /* Alle vier Zeitformen eines Verbs für eine Person.
     Jede Form ist eine Liste: ["läuft"] oder ["ist", "gelaufen"] */
  function forms(inf, p) {
    const v = D.VERBS[inf];
    if (!v) throw new Error("Verb fehlt im Lexikon: " + inf);
    return {
      praesens: [presens(inf, p)],
      praeteritum: [praeteritum(inf, p)],
      perfekt: [auxForm(auxOf(inf), p), v.pp],
      futur: [WERDEN[PIDX[p]], inf],
    };
  }

  /* Typische Fehlformen, die sich als falsche Antworten eignen. */
  function errorForms(inf, p, tense) {
    const v = D.VERBS[inf];
    const out = [];
    const st = stemOf(inf);
    const t = typeOf(inf);
    const weakPret = function () {
      const e = needsE(st) ? "e" : "";
      return st + e + { "1s": "te", "2s": "test", "3s": "te", "1p": "ten", "2p": "tet", "3p": "ten" }[p];
    };
    if (tense === "praeteritum" && (t === "strong")) {
      out.push({ parts: [weakPret()], why: "Dieses Verb ist unregelmäßig. Es verändert seinen Stamm und bekommt kein -te." });
    }
    if (tense === "perfekt") {
      const other = auxOf(inf) === "sein" ? "haben" : "sein";
      if (!v.irr) out.push({ parts: [auxForm(other, p), v.pp], why: "Prüfe das Hilfsverb: haben oder sein? Bei Bewegung nimmst du „sein“." });
      if (t === "strong") {
        out.push({ parts: [auxForm(auxOf(inf), p), "ge" + st + (needsE(st) ? "et" : "t")], why: "Das Partizip dieses Verbs ist unregelmäßig." });
      }
      if (t === "weak" && !v.noGe) {
        out.push({ parts: [auxForm(auxOf(inf), p), v.pp.replace(/^ge/, "")], why: "Beim Partizip fehlt das ge- am Anfang." });
      }
      if (v.noGe) {
        out.push({ parts: [auxForm(auxOf(inf), p), "ge" + v.pp], why: "Bei Verben wie be-, ver-, ent- gibt es kein ge-." });
      }
    }
    if (tense === "futur") {
      if (!v.irr) out.push({ parts: [WERDEN[PIDX[p]], v.pp], why: "Nach „werden“ steht die Grundform, nicht das Partizip." });
    }
    if (tense === "praesens" && v.pres && !v.irr) {
      const s = st;
      const wrong = p === "2s" ? s + (needsE(s) ? "est" : "st") : s + (needsE(s) ? "et" : "t");
      if ((p === "2s" || p === "3s") && !sibilant(s) && wrong !== presens(inf, p)) {
        out.push({ parts: [wrong], why: "Bei diesem Verb ändert sich der Vokal im Präsens." });
      }
    }
    return out;
  }

  /* ---------- Sätze ---------- */
  function buildTokens(item, tense, timeWord, order) {
    const f = forms(item.verb, item.person)[tense];
    const subj = { text: item.subj, role: "subj" };
    const fin = { text: f[0], role: "fin" };
    const time = { text: timeWord, role: "time" };
    const rest = { text: item.rest, role: "rest" };
    const v2 = f.length > 1 ? { text: f[1], role: "v2" } : null;
    let seq;
    if (order === "T") seq = [time, fin, subj, rest];
    else if (order === "R") seq = [subj, fin, rest, time];
    else seq = [subj, fin, time, rest];
    if (v2) seq.push(v2);
    return seq;
  }
  function sentenceText(tokens) {
    return cap(tokens.map(function (t) { return t.text; }).join(" ")) + ".";
  }
  function acceptedOrders(item, tense, timeWord) {
    const orders = ["S", "T"];
    if (tense === "praesens" || tense === "praeteritum") orders.push("R");
    return orders.map(function (o) {
      return norm(buildTokens(item, tense, timeWord, o).map(function (t) { return t.text; }).join(" "));
    });
  }

  /* ---------- Aufgaben erzeugen ---------- */
  function makeQuestion(item, tense, type, rng) {
    rng = rng || Math.random;
    const q = {
      type: type, tense: tense, item: item, verb: item.verb, person: item.person,
      forms: forms(item.verb, item.person),
    };
    q.time = pick(D.TIME_WORDS[tense], rng);
    q.order = rng() < 0.6 ? "S" : "T";

    if (type === "gap") {
      q.tokens = buildTokens(item, tense, q.time, q.order);
      q.expected = q.forms[tense].slice();
    } else if (type === "mc") {
      q.tokens = buildTokens(item, tense, q.time, q.order);
      const correct = q.forms[tense];
      const correctLabel = correct.join(" ");
      const errs = shuffle(errorForms(item.verb, item.person, tense), rng).map(function (e) {
        return { parts: e.parts, kind: "error", why: e.why };
      });
      const others = shuffle(D.TENSES.filter(function (t) { return t !== tense; }), rng).map(function (t) {
        return { parts: q.forms[t], kind: "tense", tense: t };
      });
      const chosen = [];
      const seen = {}; seen[norm(correctLabel)] = true;
      function add(o) {
        const key = norm(o.parts.join(" "));
        if (seen[key] || chosen.length >= 2) return;
        seen[key] = true; chosen.push(o);
      }
      if (errs.length) add(errs[0]);
      others.forEach(add);
      errs.slice(1).forEach(add);
      const opts = shuffle([{ parts: correct, kind: "correct" }].concat(chosen), rng);
      opts.forEach(function (o) { o.label = o.parts.join(" "); });
      q.options = opts;
      q.correctIndex = opts.findIndex(function (o) { return o.kind === "correct"; });
    } else if (type === "recog") {
      q.tokens = buildTokens(item, tense, q.time, q.order);
      q.options = D.TENSES.slice();
      q.answer = tense;
    } else if (type === "find") {
      const others = shuffle(D.TENSES.filter(function (t) { return t !== tense; }), rng).slice(0, 2);
      const set = shuffle([tense].concat(others), rng);
      q.options = set.map(function (t) {
        const tw = t === tense ? q.time : pick(D.TIME_WORDS[t], rng);
        const tokens = buildTokens(item, t, tw, "S");
        return { tense: t, tokens: tokens, text: sentenceText(tokens) };
      });
      q.correctIndex = q.options.findIndex(function (o) { return o.tense === tense; });
    } else if (type === "order") {
      q.order = "S";
      q.tokens = buildTokens(item, tense, q.time, "S");
      q.accepted = acceptedOrders(item, tense, q.time);
      let idx = q.tokens.map(function (_, i) { return i; });
      let tries = 0, sh;
      do {
        sh = shuffle(idx, rng); tries++;
      } while (tries < 30 && q.accepted.indexOf(norm(sh.map(function (i) { return q.tokens[i].text; }).join(" "))) >= 0);
      q.shuffled = sh;
    } else {
      throw new Error("Unbekannter Aufgabentyp " + type);
    }
    return q;
  }

  /* Reihenfolge der Aufgabentypen in einer Reise */
  function typeSequence(count, rng) {
    const base = ["mc", "gap", "order", "recog", "mc", "gap", "order", "recog", "gap", "mc"];
    let seq = [];
    for (let i = 0; i < count; i++) seq.push(base[i % base.length]);
    for (let attempt = 0; attempt < 60; attempt++) {
      const s = shuffle(seq, rng);
      let ok = s[0] === "mc";
      for (let i = 1; ok && i < s.length; i++) if (s[i] === s[i - 1]) ok = false;
      if (ok) return s;
    }
    return seq;
  }

  function tenseSequence(mode, count, rng) {
    if (mode !== "mix") return new Array(count).fill(mode);
    const base = [];
    for (let i = 0; i < count; i++) base.push(D.TENSES[i % 4]);
    return shuffle(base, rng);
  }

  function boxOf(boxes, id, tense) { return (boxes && boxes[id + ":" + tense]) || 0; }

  function weightedPick(cands, boxes, tense, rng) {
    const w = cands.map(function (it) { return 4 - Math.min(3, boxOf(boxes, it.id, tense)); });
    let total = w.reduce(function (a, b) { return a + b; }, 0);
    let r = rng() * total;
    for (let i = 0; i < cands.length; i++) { r -= w[i]; if (r <= 0) return cands[i]; }
    return cands[cands.length - 1];
  }

  /* Eine ganze Reise (Standard: 10 Aufgaben) zusammenstellen */
  function buildRound(opts) {
    const rng = opts.rng || Math.random;
    const mode = opts.mode;
    const boxes = opts.boxes || {};
    const items = opts.items || D.ITEMS;
    let count = opts.count || 10;
    const questions = [];

    if (opts.forced && opts.forced.length) {
      const list = opts.forced.slice(0, count);
      const types = typeSequence(list.length, rng);
      list.forEach(function (f, i) {
        const it = items[f.itemId];
        let type = types[i];
        if (type === "recog" && mode !== "mix" && mode !== "fehler") type = "find";
        if (type === "recog") type = "find";
        questions.push(makeQuestion(it, f.tense, type, rng));
      });
      return questions;
    }

    const tenses = tenseSequence(mode, count, rng);
    const types = typeSequence(count, rng);
    const usedItems = {}, usedVerbs = {};
    for (let i = 0; i < count; i++) {
      const t = tenses[i];
      let cands = items.filter(function (it) { return !usedItems[it.id] && !usedVerbs[it.verb]; });
      if (!cands.length) cands = items.filter(function (it) { return !usedItems[it.id]; });
      const it = weightedPick(cands, boxes, t, rng);
      usedItems[it.id] = true; usedVerbs[it.verb] = true;
      let type = types[i];
      if (type === "recog" && mode !== "mix") type = "find";
      questions.push(makeQuestion(it, t, type, rng));
    }
    return questions;
  }

  /* ---------- Antworten prüfen ---------- */

  /* Lückentext: answers = Liste von Texten, eine pro Lücke */
  function checkGap(q, answers) {
    const exp = q.expected;
    const res = exp.map(function (e, i) {
      const a = norm(answers[i]);
      if (!a) return { status: "empty" };
      if (a === norm(e)) return { status: "ok" };
      if (translit(a) === translit(e)) return { status: "translit" };
      return { status: "wrong", reason: diagnoseGap(q, i, a) };
    });
    const ok = res.every(function (r) { return r.status === "ok" || r.status === "translit"; });
    return { ok: ok, gaps: res, translit: res.some(function (r) { return r.status === "translit"; }) };
  }

  function diagnoseGap(q, i, a) {
    const e = norm(q.expected[i]);
    const joinedAnswers = a;
    // gehört die Antwort zu einer anderen Zeitform?
    for (const t of D.TENSES) {
      if (t === q.tense) continue;
      const part = q.forms[t][i];
      if (part && norm(part) === a && i < q.forms[t].length) {
        // nur sinnvoll, wenn die Form im Zielzeit nicht genauso vorkommt
        if (q.forms[t].length === q.expected.length || i === 0) return { code: "otherTense", tense: t };
      }
    }
    if (q.tense === "perfekt" && i === 0) {
      const otherAux = auxOf(q.verb) === "sein" ? "haben" : "sein";
      if (norm(auxForm(otherAux, q.person)) === a) return { code: "auxSwap" };
    }
    if (q.tense === "perfekt" && i === 1) {
      const v = D.VERBS[q.verb];
      if (!v.noGe && /^ge/.test(e) && a === e.slice(2)) return { code: "missingGe" };
      if (v.noGe && a === "ge" + e) return { code: "extraGe" };
    }
    if (norm(q.verb) === a && !(q.tense === "futur" && i === 1)) return { code: "infinitive" };
    if (e.length >= 4 && lev(a, e) <= 1) return { code: "typo" };
    const typ = typeOf(q.verb);
    if (typ === "strong" && (q.tense === "praeteritum" || (q.tense === "perfekt" && i === 1))) return { code: "overreg" };
    return { code: "generic" };
  }

  function articleName(t) { return "das " + tenseName(t); }

  /* Kai erklärt, was schiefging – ohne die Lösung zu verraten */
  function gapHint(q, result) {
    const bad = result.gaps.find(function (g) { return g.status === "wrong" || g.status === "empty"; });
    if (!bad) return "";
    if (bad.status === "empty") return "Schreibe etwas in jede Lücke.";
    const r = bad.reason;
    switch (r.code) {
      case "otherTense": return "Diese Form gehört zum " + tenseName(r.tense) + ". Gesucht ist aber " + articleName(q.tense) + ".";
      case "auxSwap": return "Prüfe das Hilfsverb: haben oder sein? Bei Bewegung nimmst du „sein“.";
      case "missingGe": return "Beim Partizip fehlt etwas am Anfang: ge-.";
      case "extraGe": return "Bei Verben mit be-, ver-, ent- gibt es kein ge-.";
      case "infinitive": return "Hier brauchst du die gebeugte Form, nicht die Grundform.";
      case "typo": return "Fast richtig! Prüfe die Buchstaben noch einmal genau.";
      case "overreg": return "Dieses Verb ist unregelmäßig. Es verändert seinen Stamm.";
      default: return D.TENSE_INFO[q.tense].formula;
    }
  }

  function mcHint(q, optionIndex) {
    const o = q.options[optionIndex];
    if (o.kind === "tense") return "Diese Form gehört zum " + tenseName(o.tense) + ". Gesucht ist aber " + articleName(q.tense) + ".";
    if (o.kind === "error") return o.why;
    return "";
  }

  function recogHint(q, chosen, final) {
    if (!final) return "Zähle die Verbteile. Steht „werden“ oder „haben/sein“ dabei?";
    const clue = {
      praesens: "Es gibt nur ein Verbwort, und es passiert jetzt.",
      praeteritum: "Es gibt nur ein Verbwort, und es erzählt von früher.",
      perfekt: "Hier gibt es „haben“ oder „sein“ und ein Partizip.",
      futur: "Hier steht „werden“ mit der Grundform.",
    };
    return "Das ist " + articleName(q.answer) + ". " + clue[q.answer];
  }

  function findHint(q, optionIndex) {
    const o = q.options[optionIndex];
    return "Dieser Satz steht im " + tenseName(o.tense) + ". Gesucht ist aber " + articleName(q.tense) + ".";
  }

  /* Wörter anordnen: built = Liste von Tokentexten in der Reihenfolge, die das Kind gebaut hat */
  function checkOrder(q, builtTexts) {
    const s = norm(builtTexts.join(" "));
    const ok = q.accepted.indexOf(s) >= 0;
    return { ok: ok };
  }
  function orderHint(q, builtTexts) {
    if (builtTexts.length < q.tokens.length) return "Es fehlen noch Wortkarten. Alle Karten gehören in den Satz.";
    const lower = builtTexts.map(norm);
    const fin = q.tokens.find(function (t) { return t.role === "fin"; });
    const v2 = q.tokens.find(function (t) { return t.role === "v2"; });
    if (lower.indexOf(norm(fin.text)) !== 1) return "Das gebeugte Verb steht im Aussagesatz immer an zweiter Stelle.";
    if (v2 && lower[lower.length - 1] !== norm(v2.text)) return "Der zweite Verbteil gehört ans Ende des Satzes.";
    return "Fast! Prüfe noch einmal, welche Karte wohin gehört.";
  }
  /* Welche gebauten Karten stehen schon richtig? (für Rückmeldung) */
  function orderMatches(q, builtTexts) {
    let best = null;
    q.accepted.forEach(function (a) {
      const parts = a.split(" ");
      // Vergleich auf Ebene der Karten: Karten-Texte rekonstruieren
      const cards = cardsFromAccepted(q, a);
      let score = 0;
      const marks = builtTexts.map(function (b, i) { const m = cards[i] && norm(cards[i]) === norm(b); if (m) score++; return !!m; });
      if (!best || score > best.score) best = { score: score, marks: marks };
    });
    return best ? best.marks : [];
  }
  function cardsFromAccepted(q, str) {
    // Akzeptierte Reihenfolgen als Kartenlisten rekonstruieren (Karten sind eindeutig)
    const texts = q.tokens.map(function (t) { return norm(t.text); });
    const out = []; let rest = str;
    while (rest.length) {
      const hit = texts.find(function (t) { return rest === t || rest.indexOf(t + " ") === 0; });
      if (!hit) break;
      out.push(hit);
      rest = rest.slice(hit.length).trim();
    }
    return out;
  }

  /* ---------- Spielstand-Helfer ---------- */
  function rankFor(coins) {
    let r = D.RANKS[0];
    D.RANKS.forEach(function (x) { if (coins >= x.min) r = x; });
    return r;
  }
  function nextRank(coins) {
    return D.RANKS.find(function (x) { return x.min > coins; }) || null;
  }
  function starsFor(firstTry, total) {
    const r = total ? firstTry / total : 0;
    if (r >= 0.9) return 3;
    if (r >= 0.7) return 2;
    return 1;
  }

  return {
    PERSONS, HABEN, SEIN, WERDEN,
    pick, shuffle, cap, norm, translit, lev,
    stemOf, needsE, typeOf, presens, praeteritum, forms, errorForms,
    buildTokens, sentenceText, acceptedOrders,
    makeQuestion, buildRound, typeSequence,
    checkGap, gapHint, mcHint, recogHint, findHint, checkOrder, orderHint, orderMatches,
    rankFor, nextRank, starsFor, tenseName,
  };
});
