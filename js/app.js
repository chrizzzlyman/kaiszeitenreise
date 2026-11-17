/* ============================================================
   Kais Zeitenreise – App (Bildschirme, Spielablauf)
   ============================================================ */
(function () {
  "use strict";
  var D = window.KaiData, L = window.KaiLogic, A = window.KaiArt, S = window.KaiSound, Store = window.KaiStore;
  var N = 10; // Aufgaben pro Reise
  var $app = document.getElementById("app");
  var $live = document.getElementById("live");
  var G = null;     // aktuelle Reise
  var ORD = null;   // Zustand „Wörter anordnen“
  var timers = [];
  var TL_ORDER = ["praeteritum", "perfekt", "praesens", "futur"];

  /* ---------- Helfer ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function announce(t) { $live.textContent = ""; setTimeout(function () { $live.textContent = t; }, 40); }
  function tname(t) { return D.TENSE_INFO[t].name; }
  function modeTitle(m) {
    return { praesens: "Präsens-Reise", praeteritum: "Präteritum-Reise", perfekt: "Perfekt-Reise", futur: "Futur-Reise", mix: "Wilde Mischung", fehler: "Fehler-Reise" }[m];
  }
  function cur() { return G.qs[G.idx]; }

  function wordSpan(t, i, hl) {
    var txt = i === 0 ? L.cap(t.text) : t.text;
    var cls = "w";
    if (hl) { if (t.role === "fin" || t.role === "v2") cls += " v"; if (t.role === "time") cls += " tm"; }
    return '<span class="' + cls + '">' + esc(txt) + "</span>";
  }
  function sentenceHTML(tokens, hl) {
    return tokens.map(function (t, i) { return wordSpan(t, i, hl); }).join(" ") + ".";
  }
  function soundBtn() {
    return '<button class="btn btn-light btn-round" data-act="sound" aria-label="Ton an oder aus" title="Ton an oder aus">' + (S.isEnabled() ? A.ICON.sound : A.ICON.mute) + "</button>";
  }
  function coinChip() {
    return '<span class="chip" id="coinChip" title="Deine Goldmünzen">' + A.coin() + '<span id="coinNum">' + Store.get().coins + "</span></span>";
  }
  function refreshSoundButtons() {
    $$('[data-act="sound"]').forEach(function (b) { b.innerHTML = S.isEnabled() ? A.ICON.sound : A.ICON.mute; });
  }
  function setSound(on) {
    S.setEnabled(on);
    var st = Store.get(); st.sound = on; Store.save();
    refreshSoundButtons();
    if (on) S.click();
  }

  /* ---------- Vorlesen (Sprachausgabe des Geräts) ---------- */
  var CAN_SPEAK = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  function speak(text) {
    if (!CAN_SPEAK) return;
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(text);
      u.lang = "de-DE"; u.rate = 0.9;
      var v = window.speechSynthesis.getVoices().filter(function (x) { return /^de/i.test(x.lang); })[0];
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) { /* kein Vorlesen möglich */ }
  }
  function gapSentenceText(q) {
    return q.tokens.map(function (t, i) { return (t.role === "fin" || t.role === "v2") ? "Lücke" : (i === 0 ? L.cap(t.text) : t.text); }).join(" ") + ".";
  }
  function readText(q) {
    var base = promptText(q) + " ";
    if (q.type === "gap" || q.type === "mc") return base + gapSentenceText(q) + " Das Verb heißt: " + q.verb + ".";
    if (q.type === "recog") return base + L.sentenceText(q.tokens);
    if (q.type === "find") return base + q.options.map(function (o, i) { return "Satz " + (i + 1) + ": " + o.text; }).join(" ");
    return base + "Wortkarten: " + q.shuffled.map(function (k) { return q.tokens[k].text; }).join(", ") + ".";
  }
  function readBtn(id) {
    return CAN_SPEAK ? '<button class="btn btn-light btn-round btn-sm" id="' + id + '" aria-label="Aufgabe vorlesen" title="Aufgabe vorlesen">' + A.ICON.sound + "</button>" : "";
  }

  /* ---------- Kai ---------- */
  var moodTimer = null;
  function kaiSay(text, mood, revertMs) {
    var sp = $("#speech");
    if (sp) {
      sp.textContent = text;
      sp.classList.remove("pop"); void sp.offsetWidth; sp.classList.add("pop");
    }
    setMood(mood || "happy", revertMs);
    announce("Kai sagt: " + text);
  }
  function setMood(mood, revertMs) {
    $$(".art-kai").forEach(function (k) { k.dataset.mood = mood; if (mood !== "happy") k.removeAttribute("data-wave"); });
    clearTimeout(moodTimer);
    if (mood !== "happy" && revertMs !== 0) {
      moodTimer = setTimeout(function () { $$(".art-kai").forEach(function (k) { k.dataset.mood = "happy"; }); }, revertMs || 2600);
    }
  }

  /* ---------- Konfetti, Funken, fliegende Münzen ---------- */
  function clearConfetti() { $$(".confetti").forEach(function (c) { c.remove(); }); }
  function confetti() {
    clearConfetti();
    var wrap = document.createElement("div");
    wrap.className = "confetti"; wrap.setAttribute("aria-hidden", "true");
    var cols = ["#f4b834", "#d9382f", "#2f8fe0", "#35a050", "#8e5bd6", "#ff8fb1"];
    for (var i = 0; i < 70; i++) {
      var p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = cols[i % cols.length];
      p.style.animationDuration = 2.4 + Math.random() * 2.4 + "s";
      p.style.animationDelay = Math.random() * 0.6 + "s";
      p.style.setProperty("--x", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--r", (Math.random() * 900 + 300) + "deg");
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 6000);
  }
  function sparkTrail(ms) {
    var route = $("#route"), ship = $("#shipWrap");
    if (!route || !ship) return;
    var end = Date.now() + ms;
    var iv = setInterval(function () {
      if (Date.now() > end || !document.body.contains(ship)) { clearInterval(iv); return; }
      var rr = route.getBoundingClientRect(), sr = ship.getBoundingClientRect();
      var s = document.createElement("span");
      s.className = "spark";
      s.style.left = (sr.left - rr.left + sr.width * (0.05 + Math.random() * 0.2)) + "px";
      s.style.top = (sr.top - rr.top + sr.height * (0.35 + Math.random() * 0.4)) + "px";
      s.style.setProperty("--dx", (-18 - Math.random() * 30) + "px");
      s.style.setProperty("--dy", (Math.random() * 30 - 8) + "px");
      route.appendChild(s);
      setTimeout(function () { s.remove(); }, 950);
    }, 70);
  }
  function flyCoin(fromEl) {
    var chip = $("#coinChip");
    if (!fromEl || !chip) { bumpCoins(); return; }
    var a = fromEl.getBoundingClientRect(), b = chip.getBoundingClientRect();
    var c = document.createElement("div");
    c.className = "fly-coin"; c.innerHTML = A.coin();
    c.style.left = a.left + "px"; c.style.top = a.top + "px";
    document.body.appendChild(c);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        c.style.transform = "translate(" + (b.left - a.left) + "px," + (b.top - a.top) + "px) scale(.8)";
        c.style.opacity = ".6";
      });
    });
    setTimeout(function () { c.remove(); bumpCoins(); }, 850);
  }
  function bumpCoins() {
    var n = $("#coinNum"), chip = $("#coinChip");
    if (n) n.textContent = Store.get().coins;
    if (chip) { chip.classList.remove("bump"); void chip.offsetWidth; chip.classList.add("bump"); }
  }

  /* ---------- Dialog ---------- */
  function modal(opts) {
    var back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = '<div class="paper modal" role="dialog" aria-modal="true" aria-labelledby="mTitle"><h2 id="mTitle">' + esc(opts.title) + "</h2><p>" + esc(opts.text) +
      '</p><div class="actions"><button class="btn btn-green" data-m="no">' + esc(opts.no) + '</button><button class="btn ' + (opts.yesClass || "btn-red") + '" data-m="yes">' + esc(opts.yes) + "</button></div></div>";
    document.body.appendChild(back);
    var prev = document.activeElement;
    function close() { back.remove(); if (prev && prev.focus) prev.focus(); }
    back.addEventListener("click", function (e) {
      var b = e.target.closest("[data-m]");
      if (e.target === back) { close(); return; }
      if (!b) return;
      S.click(); close();
      if (b.dataset.m === "yes") opts.onYes();
    });
    back.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    $('[data-m="no"]', back).focus();
  }

  /* ============================================================
     HAFEN (Startseite)
     ============================================================ */
  function starsRow(n) {
    var h = "";
    for (var i = 0; i < 3; i++) h += A.star(i < n);
    return '<span class="tc-stars" aria-hidden="true">' + h + "</span>";
  }

  function showHome() {
    clearTimers(); clearConfetti(); G = null; ORD = null;
    var st = Store.get();
    var first = st.rounds === 0 && !st.seenIntro;
    var greet = first ? D.TEXTS.greetFirst : rnd(D.TEXTS.greetBack);
    function card(t, name, sub, stars, extra) {
      return '<button class="tense-card ' + (extra || "") + '" data-t="' + t + '" data-act="start" data-mode="' + t + '" aria-label="' + name + " üben, " + sub + ", " + stars + ' von 3 Sternen">' +
        '<span class="tc-head"><span class="tc-name">' + name + '</span><span class="tc-alt">' + sub + "</span></span>" +
        '<span class="tc-foot">' + starsRow(stars) + '<span class="tc-go" aria-hidden="true">' + A.ICON.play + "</span></span></button>";
    }
    var cards = D.TENSES.map(function (t) {
      return card(t, D.TENSE_INFO[t].name, D.TENSE_INFO[t].alt, st.stars[t] || 0);
    }).join("");
    var mix = card("mix", "Wilde Mischung", "alle vier Zeitformen", st.stars.mix || 0, "mix");

    $app.innerHTML =
      '<div class="screen home">' +
      '<div class="topbar"><div class="grow"></div><div class="right">' + coinChip() + soundBtn() + "</div></div>" +
      '<div class="home-hero">' +
      '<div class="logo"><h1>Kais Zeitenreise</h1></div>' +
      '<div class="hero-ship">' + A.ship() + "</div>" +
      '<div class="hero-kai"><div class="kai-fig">' + A.kai() + '</div><div class="speech" id="speech"></div></div>' +
      "</div>" +
      '<h2 class="sr-only">Wähle deine Reise</h2>' +
      '<div class="tense-grid">' + cards + mix + "</div>" +
      '<div class="home-links">' +
      '<button class="btn btn-wood" data-act="fibel">' + A.ICON.book + "Piratenfibel</button>" +
      '<button class="btn btn-gold" data-act="truhe">' + A.ICON.chest + "Schatztruhe</button></div>" +
      "</div>";
    var k = $(".art-kai"); if (k) k.dataset.wave = "1";
    var sp = $("#speech"); sp.textContent = greet;
    announce("Kai sagt: " + greet);
    st.seenIntro = true; Store.save();
    window.scrollTo(0, 0);
  }

  /* ============================================================
     REISE
     ============================================================ */
  function startRound(mode, forced) {
    clearTimers(); clearConfetti();
    var st = Store.get();
    var qs = L.buildRound({ mode: mode === "fehler" ? "mix" : mode, boxes: st.boxes, forced: forced, count: N });
    G = {
      mode: mode, qs: qs, idx: 0, attempt: 0, answered: false, done: 0, n: qs.length,
      coinsGained: 0, firstTry: 0, streak: 0, bestStreak: 0, missed: [],
      coinsStart: st.coins, rankStart: L.rankFor(st.coins).name,
    };
    var pips = "";
    for (var i = 1; i < G.n; i++) pips += '<i class="pip" data-i="' + i + '"></i>';
    $app.innerHTML =
      '<div class="screen game" data-t="' + mode + '">' +
      '<div class="topbar"><button class="btn btn-light btn-round" data-act="leave" aria-label="Zurück zum Hafen" title="Zurück zum Hafen">' + A.ICON.back + "</button>" +
      '<div class="grow"><h1 class="sr-only">' + modeTitle(mode) + '</h1><span class="chip plain counter" id="counter"></span></div><div class="right">' + coinChip() + soundBtn() + "</div></div>" +
      '<div class="route" id="route" style="--p:0;--n:' + G.n + '">' +
      '<div class="layer layer-1"></div><div class="layer layer-2"></div><div class="route-line"></div>' + pips +
      '<div class="island-start">' + A.island() + "</div>" +
      '<div class="island-end" id="isleEnd">' + A.island("treasure") + "</div>" +
      '<div class="ship-wrap" id="shipWrap">' + A.ship() + "</div>" +
      '</div>' +
      '<div class="stage"><aside class="kai-col"><div class="kai-box"><div class="kai-fig">' + A.kai() + '</div><div class="speech" id="speech"></div></div></aside>' +
      '<section class="paper task" id="task"></section></div></div>';
    window.scrollTo(0, 0);
    S.gull();
    showQuestion(true);
    kaiSay(D.TEXTS.start[mode], "happy");
  }

  var NUDGES = ["Weiter geht’s!", "Volle Kraft voraus!", "Schau genau hin!", "Lies den Satz in Ruhe.", "Du bist gut dabei!"];

  function showQuestion(isFirst) {
    var q = cur();
    G.attempt = 0; G.answered = false; ORD = null;
    var task = $("#task");
    task.dataset.t = q.tense;
    $("#counter").innerHTML = '<span class="sr-only">Aufgabe </span>' + (G.idx + 1) + " / " + G.n;
    var body;
    if (q.type === "gap") body = renderGap(q);
    else if (q.type === "mc") body = renderMc(q);
    else if (q.type === "recog") body = renderRecog(q);
    else if (q.type === "find") body = renderFind(q);
    else body = renderOrder(q);
    task.innerHTML = promptRow(q) + body + '<div id="fbArea"></div><div class="actions" id="actions">' + actionsFor(q) + "</div>";
    bindQuestion(q);
    if (!isFirst) { kaiSay(rnd(NUDGES), "happy"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    announce("Aufgabe " + (G.idx + 1) + " von " + G.n + ". " + promptText(q));
  }

  function promptText(q) {
    var n = tname(q.tense);
    switch (q.type) {
      case "gap": return "Setze das Verb ins " + n + ".";
      case "mc": return "Wähle die richtige Form im " + n + ".";
      case "order": return "Ordne die Wörter zu einem Satz im " + n + ".";
      case "recog": return "In welcher Zeitform steht der Satz?";
      case "find": return "Welcher Satz steht im " + n + "?";
    }
    return "";
  }
  function promptHTML(q) {
    var t = esc(promptText(q));
    if (q.type !== "recog") t = t.replace(tname(q.tense), '<span class="tw" data-t="' + q.tense + '">' + tname(q.tense) + "</span>");
    return t;
  }
  function promptRow(q) {
    return '<div class="prompt-row"><p class="prompt">' + promptHTML(q) + "</p>" + readBtn("btnRead") + "</div>";
  }
  function actionsFor(q) {
    var check = (q.type === "gap" || q.type === "order") ? '<button class="btn btn-green btn-big" id="btnCheck">' + A.ICON.check + "Prüfen</button>" : "";
    return check + '<button class="btn btn-light" id="btnTip">' + A.ICON.bulb + "Tipp</button>";
  }

  /* ----- Lückentext ----- */
  function renderGap(q) {
    var gi = 0, total = q.expected.length;
    var parts = q.tokens.map(function (t, i) {
      if (t.role === "fin" || t.role === "v2") {
        var len = Math.max(4, t.text.length);
        var last = gi === total - 1;
        var h = '<input class="gap-input" type="text" data-gap="' + gi + '" style="--ch:' + len + '" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="' + (last ? "done" : "next") + '" aria-label="Lücke ' + (gi + 1) + " von " + total + '">';
        gi++; return h;
      }
      return wordSpan(t, i, false);
    });
    return '<p class="sentence">' + parts.join(" ") + '.<span class="hint-inf" title="Grundform">(' + esc(q.verb) + ")</span></p>" +
      '<div class="umlaut-bar" role="group" aria-label="Sonderzeichen">' + ["ä", "ö", "ü", "ß"].map(function (c) { return '<button type="button" data-ch="' + c + '" aria-label="' + c + ' einfügen">' + c + "</button>"; }).join("") + "</div>";
  }

  /* ----- Auswahl ----- */
  function renderMc(q) {
    var gi = 0;
    var parts = q.tokens.map(function (t, i) {
      if (t.role === "fin" || t.role === "v2") { return '<span class="gap-fill" data-gap="' + (gi++) + '"> … </span>'; }
      return wordSpan(t, i, false);
    });
    return '<p class="sentence">' + parts.join(" ") + '.<span class="hint-inf" title="Grundform">(' + esc(q.verb) + ")</span></p>" +
      '<div class="options" role="group" aria-label="Antworten">' +
      q.options.map(function (o, i) { return '<button class="opt" data-i="' + i + '">' + esc(o.label) + "</button>"; }).join("") + "</div>";
  }

  /* ----- Zeitform erkennen ----- */
  function renderRecog(q) {
    return '<p class="sentence">' + sentenceHTML(q.tokens, false) + "</p>" +
      '<div class="options" role="group" aria-label="Zeitformen">' +
      q.options.map(function (t) { return '<button class="opt tense-opt" data-t="' + t + '" data-tense="' + t + '">' + tname(t) + "</button>"; }).join("") + "</div>";
  }

  /* ----- Satz in der gesuchten Zeitform finden ----- */
  function renderFind(q) {
    return '<div class="options sentences" role="group" aria-label="Sätze">' +
      q.options.map(function (o, i) { return '<button class="opt sent" data-i="' + i + '">' + sentenceHTML(o.tokens, false) + "</button>"; }).join("") + "</div>";
  }

  /* ----- Wörter anordnen ----- */
  function renderOrder(q) {
    ORD = { line: [], bank: q.shuffled.slice(), q: q, done: false, suppress: false };
    return '<div class="slotline" id="line" role="group" aria-label="Dein Satz"></div>' +
      '<div class="bank" id="bank" role="group" aria-label="Wortkarten"></div>';
  }
  function drawOrder() {
    var q = ORD.q;
    function tok(id, inLine, pos) {
      var t = q.tokens[id];
      var txt = inLine && pos === 0 ? L.cap(t.text) : t.text;
      return '<button type="button" class="word" data-id="' + id + '" data-in="' + (inLine ? "line" : "bank") + '"' + (ORD.done ? " disabled" : "") + ">" + esc(txt) + "</button>";
    }
    var line = $("#line"), bank = $("#bank");
    if (ORD.line.length) {
      var toks = ORD.line.map(function (id, i) { return tok(id, true, i); });
      toks.push('<span class="lastgroup">' + toks.pop() + '<span class="dot" aria-hidden="true">.</span></span>');
      line.innerHTML = toks.join("");
    } else {
      line.innerHTML = '<span class="placeholder">Tippe die Wörter in der richtigen Reihenfolge an.</span>';
    }
    bank.innerHTML = ORD.bank.map(function (id) { return tok(id, false, 0); }).join("");
    var chk = $("#btnCheck"); if (chk) chk.disabled = ORD.bank.length > 0 || ORD.done;
  }
  function moveToken(id, to, index) {
    ORD.line = ORD.line.filter(function (x) { return x !== id; });
    ORD.bank = ORD.bank.filter(function (x) { return x !== id; });
    var arr = to === "line" ? ORD.line : ORD.bank;
    if (index == null || index > arr.length) index = arr.length;
    arr.splice(index, 0, id);
  }

  /* ----- Ereignisse der Aufgabe ----- */
  function bindQuestion(q) {
    var task = $("#task");
    var tip = $("#btnTip"); if (tip) tip.onclick = function () { S.click(); showTip(); };
    var rd = $("#btnRead"); if (rd) rd.onclick = function () { speak(readText(q)); };
    var chk = $("#btnCheck");
    if (q.type === "gap") {
      var inputs = $$(".gap-input", task), lastInput = inputs[0];
      inputs.forEach(function (inp, k) {
        inp.addEventListener("focus", function () { lastInput = inp; });
        inp.addEventListener("input", function () { inp.classList.remove("bad"); });
        inp.addEventListener("keydown", function (e) {
          if (e.key === "Enter") { e.preventDefault(); if (k < inputs.length - 1) inputs[k + 1].focus(); else checkGapUI(); }
        });
      });
      $$(".umlaut-bar button", task).forEach(function (b) {
        b.addEventListener("pointerdown", function (e) { e.preventDefault(); });
        b.addEventListener("click", function () {
          var t = lastInput || inputs[0]; if (!t || t.readOnly) return;
          var s = t.selectionStart == null ? t.value.length : t.selectionStart, e2 = t.selectionEnd == null ? s : t.selectionEnd;
          t.value = t.value.slice(0, s) + b.dataset.ch + t.value.slice(e2);
          t.focus(); t.setSelectionRange(s + 1, s + 1); S.click();
        });
      });
      if (chk) chk.onclick = checkGapUI;
      var touchOnly = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      if (inputs[0] && !touchOnly) setTimeout(function () { try { inputs[0].focus({ preventScroll: true }); } catch (e) { inputs[0].focus(); } }, 120);
    } else if (q.type === "mc") {
      $$(".opt", task).forEach(function (b) { b.onclick = function () { pickMc(+b.dataset.i); }; });
    } else if (q.type === "recog") {
      $$(".opt", task).forEach(function (b) { b.onclick = function () { pickRecog(b.dataset.tense); }; });
    } else if (q.type === "find") {
      $$(".opt", task).forEach(function (b) { b.onclick = function () { pickFind(+b.dataset.i); }; });
    } else if (q.type === "order") {
      drawOrder();
      if (chk) chk.onclick = checkOrderUI;
      bindOrderEvents();
    }
  }

  function showTip() {
    var q = cur(), info = D.TENSE_INFO[q.tense];
    var text = q.type === "recog"
      ? "Ein Verbwort: Präsens oder Präteritum. „haben/sein“ + Partizip: Perfekt. „werden“ + Grundform: Futur."
      : info.formula;
    kaiSay(text, "think", 6000);
  }

  /* ----- Rückmeldungen ----- */
  function banner(kind, title, html) {
    var icon = kind === "ok" ? A.ICON.check : kind === "bad" ? "<b aria-hidden=\"true\">!</b>" : A.ICON.bulb;
    $("#fbArea").innerHTML = '<div class="feedback ' + kind + '" role="status"><div class="ficon">' + icon + "</div><div>" + (title ? '<div class="ftitle">' + title + "</div>" : "") + html + "</div></div>";
  }
  function merkHTML(q) {
    var f = q.forms;
    var items = D.TENSES.map(function (t) {
      return '<span class="m" data-t="' + t + '"><b>' + tname(t) + "</b> " + esc(f[t].join(" ")) + "</span>";
    }).join("");
    return '<details class="merk"><summary>Alle Zeitformen von „' + esc(q.verb) + "“</summary><div class=\"merk-rows\">" + items + "</div></details>";
  }

  function wrongAttempt(hint) {
    G.attempt = 1;
    S.wrong();
    wobble();
    banner("bad", "", "<p>" + esc(hint) + "</p>");
    kaiSay(rnd(D.TEXTS.wrongFirst), "oops");
  }

  function wobble() {
    var s = $("#shipWrap"); if (!s) return;
    s.classList.remove("wobble"); void s.offsetWidth; s.classList.add("wobble");
    later(function () { s.classList.remove("wobble"); }, 800);
  }

  function moveShip() {
    var route = $("#route"), ship = $("#shipWrap");
    route.style.setProperty("--p", G.done / G.n);
    $$(".pip", route).forEach(function (p) { p.classList.toggle("done", +p.dataset.i <= G.done); });
    ship.classList.remove("boost"); void ship.offsetWidth; ship.classList.add("boost");
    later(function () { ship.classList.remove("boost"); }, 1300);
    S.whoosh(); sparkTrail(1200);
    if (G.done >= G.n) later(function () { var e = $("#isleEnd"); if (e) e.classList.add("reached"); }, 1100);
  }

  /* kind: first | second | reveal */
  function complete(kind, note) {
    var q = cur(), st = Store.get();
    G.answered = true;
    var gain = kind === "first" ? 10 : kind === "second" ? 5 : 0;
    G.coinsGained += gain; st.coins += gain;
    var key = q.item.id + ":" + q.tense;
    st.boxes[key] = kind === "first" ? Math.min(3, (st.boxes[key] || 0) + 1) : 0;
    if (kind === "first") { G.firstTry++; G.streak++; G.bestStreak = Math.max(G.bestStreak, G.streak); } else G.streak = 0;
    if (kind === "reveal") G.missed.push({ itemId: q.item.id, tense: q.tense });
    st.bestStreak = Math.max(st.bestStreak, G.bestStreak);
    Store.save();
    G.done++;
    moveShip();

    var title, cls, body = "";
    if (kind === "reveal") {
      cls = "reveal"; S.drop();
      title = q.type === "recog" ? "" : q.type === "find" ? "Dieser Satz passt." : "Merk dir die grüne Lösung.";
      if (note) body += "<p>" + esc(note) + "</p>";
      body += merkHTML(q);
    } else {
      cls = "ok"; S.correct(); if (gain) later(function () { S.coin(); }, 260);
      title = kind === "first" ? "Richtig!" : "Geschafft!";
      if (note) body += "<p>" + esc(note) + "</p>";
    }
    var coinHtml = gain ? '<span class="coin-gain">+' + gain + " " + A.coin() + "</span>" : "";
    banner(cls, title + coinHtml, body);
    if (gain) { var ci = $("#fbArea .coin-gain svg"); later(function () { flyCoin(ci); }, 200); }

    if (kind === "first") kaiSay(rnd(D.TEXTS.correct), "cheer");
    else if (kind === "second") kaiSay(rnd(D.TEXTS.correctSecond), "happy", 2600);
    else kaiSay(rnd(D.TEXTS.reveal), "think", 3500);

    var last = G.idx >= G.n - 1;
    $("#actions").innerHTML = '<button class="btn btn-gold btn-big" id="btnNext">' + (last ? "Zur Schatzinsel!" : "Weiter") + A.ICON.play + "</button>";
    var nb = $("#btnNext");
    nb.onclick = function () { S.click(); if (last) finishRound(); else { G.idx++; showQuestion(); } };
    setTimeout(function () { try { nb.focus({ preventScroll: true }); } catch (e) { nb.focus(); } nb.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, 250);
  }

  /* ----- Lückentext prüfen ----- */
  function checkGapUI() {
    var q = cur(); if (G.answered) return;
    var inputs = $$(".gap-input");
    var answers = inputs.map(function (i) { return i.value; });
    var empty = inputs.find(function (i) { return !i.value.trim(); });
    if (empty) {
      banner("bad", "", "<p>Schreibe etwas in jede Lücke.</p>");
      empty.focus(); return;
    }
    var res = L.checkGap(q, answers);
    if (res.ok) {
      inputs.forEach(function (inp, k) { inp.value = q.expected[k]; inp.classList.remove("bad"); inp.classList.add("ok"); inp.readOnly = true; });
      complete(G.attempt === 0 ? "first" : "second", res.translit ? "Mit Umlauten schreibst du ä, ö, ü und ß." : "");
      return;
    }
    if (G.attempt === 0) {
      var firstBad = null;
      inputs.forEach(function (inp, k) {
        var g = res.gaps[k];
        if (g.status === "ok" || g.status === "translit") { inp.value = q.expected[k]; inp.classList.add("ok"); inp.readOnly = true; }
        else { inp.classList.remove("bad"); void inp.offsetWidth; inp.classList.add("bad"); if (!firstBad) firstBad = inp; }
      });
      wrongAttempt(L.gapHint(q, res));
      if (firstBad) firstBad.focus();
    } else {
      inputs.forEach(function (inp, k) { inp.value = q.expected[k]; inp.classList.remove("bad"); inp.classList.add("ok"); inp.readOnly = true; });
      complete("reveal");
    }
  }

  /* ----- Auswahl prüfen ----- */
  function fillGaps(parts, cls) {
    $$(".gap-fill").forEach(function (g, k) {
      g.textContent = parts[k] || "";
      g.className = "gap-fill filled " + (cls || "");
    });
  }
  function clearGaps() {
    $$(".gap-fill").forEach(function (g) { g.textContent = " … "; g.className = "gap-fill"; });
  }
  function pickMc(i) {
    if (G.answered) return;
    var q = cur(), o = q.options[i], btn = $$(".opt")[i];
    S.pick();
    if (o.kind === "correct") {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      btn.classList.add("picked-ok"); fillGaps(o.parts, "ok");
      complete(G.attempt === 0 ? "first" : "second");
      return;
    }
    btn.classList.add("picked-bad"); btn.disabled = true; fillGaps(o.parts, "bad");
    if (G.attempt === 0) {
      later(function () { if (!G.answered) clearGaps(); }, 1000);
      wrongAttempt(L.mcHint(q, i));
    } else {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      var ci = q.correctIndex; $$(".opt")[ci].classList.add("picked-ok"); fillGaps(q.options[ci].parts, "ok");
      complete("reveal");
    }
  }

  /* ----- Zeitform erkennen ----- */
  function pickRecog(t) {
    if (G.answered) return;
    var q = cur(), btn = $('.opt[data-tense="' + t + '"]');
    S.pick();
    if (t === q.answer) {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      btn.classList.add("picked-ok");
      complete(G.attempt === 0 ? "first" : "second");
      return;
    }
    btn.classList.add("picked-bad"); btn.disabled = true;
    if (G.attempt === 0) wrongAttempt(L.recogHint(q, t, false));
    else {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      $('.opt[data-tense="' + q.answer + '"]').classList.add("picked-ok");
      complete("reveal", L.recogHint(q, t, true));
    }
  }

  /* ----- Satz finden ----- */
  function pickFind(i) {
    if (G.answered) return;
    var q = cur(), btn = $$(".opt")[i];
    S.pick();
    if (i === q.correctIndex) {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      btn.classList.add("picked-ok");
      complete(G.attempt === 0 ? "first" : "second");
      return;
    }
    btn.classList.add("picked-bad"); btn.disabled = true;
    if (G.attempt === 0) wrongAttempt(L.findHint(q, i));
    else {
      $$(".opt").forEach(function (b) { b.disabled = true; });
      $$(".opt")[q.correctIndex].classList.add("picked-ok");
      complete("reveal");
    }
  }

  /* ----- Wörter anordnen: Prüfen ----- */
  function builtTexts() { return ORD.line.map(function (id) { return ORD.q.tokens[id].text; }); }
  function checkOrderUI() {
    if (G.answered || !ORD) return;
    var q = cur();
    if (ORD.bank.length) {
      banner("bad", "", "<p>Alle Wortkarten gehören in den Satz.</p>"); return;
    }
    var built = builtTexts();
    var res = L.checkOrder(q, built);
    if (res.ok) {
      ORD.done = true; drawOrder();
      $$("#line .word").forEach(function (w) { w.classList.add("right"); });
      complete(G.attempt === 0 ? "first" : "second");
      return;
    }
    if (G.attempt === 0) {
      var marks = L.orderMatches(q, built);
      $$("#line .word").forEach(function (w, k) { w.classList.add(marks[k] ? "right" : "wrong"); });
      wrongAttempt(L.orderHint(q, built));
    } else {
      ORD.line = q.tokens.map(function (_, k) { return k; }); ORD.bank = []; ORD.done = true; drawOrder();
      $$("#line .word").forEach(function (w) { w.classList.add("right"); });
      complete("reveal");
    }
  }

  /* ----- Wörter anordnen: Ziehen, Tippen, Tastatur ----- */
  function bindOrderEvents() {
    var task = $("#task");
    var drag = null, ghost = null, mark = null;

    function clearMarks() { $$("#line .word, #bank .word").forEach(function (w) { w.classList.remove("right", "wrong"); }); }
    function indexAt(x, y) {
      var nodes = $$("#line .word:not(.dragging)");
      for (var i = 0; i < nodes.length; i++) {
        var r = nodes[i].getBoundingClientRect();
        if (y < r.top - 4 || (y <= r.bottom + 4 && x < r.left + r.width / 2)) return i;
      }
      return nodes.length;
    }
    function removeMark() { if (mark) { mark.remove(); mark = null; } }
    function endDrag() {
      if (ghost) ghost.remove(); ghost = null; removeMark();
      $$(".word.dragging").forEach(function (w) { w.classList.remove("dragging"); });
      $("#line") && $("#line").classList.remove("over"); $("#bank") && $("#bank").classList.remove("over");
      drag = null;
    }

    task.addEventListener("pointerdown", function (e) {
      var w = e.target.closest(".word");
      if (!w || ORD.done || e.button > 0) return;
      drag = { id: +w.dataset.id, el: w, sx: e.clientX, sy: e.clientY, started: false };
      try { w.setPointerCapture(e.pointerId); } catch (err) { /* egal */ }
    });
    task.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
      if (!drag.started) {
        if (Math.hypot(dx, dy) < 9) return;
        drag.started = true;
        var r = drag.el.getBoundingClientRect();
        drag.ox = e.clientX - r.left; drag.oy = e.clientY - r.top;
        ghost = drag.el.cloneNode(true); ghost.classList.add("ghost"); ghost.style.width = r.width + "px";
        document.body.appendChild(ghost);
        drag.el.classList.add("dragging");
        S.pick();
      }
      ghost.style.left = (e.clientX - drag.ox) + "px"; ghost.style.top = (e.clientY - drag.oy) + "px";
      var under = document.elementFromPoint(e.clientX, e.clientY);
      var over = under && under.closest("#line") ? "line" : under && under.closest("#bank") ? "bank" : null;
      $("#line").classList.toggle("over", over === "line"); $("#bank").classList.toggle("over", over === "bank");
      removeMark();
      if (over === "line") {
        mark = document.createElement("span"); mark.className = "slot-mark";
        var nodes = $$("#line .word:not(.dragging)"), i = indexAt(e.clientX, e.clientY);
        var line = $("#line");
        if (i < nodes.length) nodes[i].parentNode.insertBefore(mark, nodes[i]);
        else if (nodes.length) nodes[nodes.length - 1].parentNode.insertBefore(mark, nodes[nodes.length - 1].nextSibling);
        else line.appendChild(mark);
        drag.mark = { to: "line", index: i };
      } else drag.mark = over ? { to: "bank" } : null;
    });
    task.addEventListener("pointerup", function (e) {
      if (!drag) return;
      if (!drag.started) { drag = null; return; } // normales Tippen: der Klick erledigt alles
      var m = drag.mark, id = drag.id;
      ORD.suppress = true; setTimeout(function () { ORD.suppress = false; }, 50);
      endDrag();
      if (m) { clearMarks(); moveToken(id, m.to, m.index); S.drop(); drawOrder(); }
    });
    task.addEventListener("pointercancel", function () { if (drag) endDrag(); });

    task.addEventListener("click", function (e) {
      var w = e.target.closest(".word");
      if (!w || !ORD || ORD.done) return;
      if (ORD.suppress) { ORD.suppress = false; return; }
      var id = +w.dataset.id, inLine = w.dataset.in === "line";
      S.pick(); clearMarks();
      moveToken(id, inLine ? "bank" : "line");
      drawOrder();
      var again = $('.word[data-id="' + id + '"]'); if (again) again.focus({ preventScroll: true });
    });
    task.addEventListener("keydown", function (e) {
      var w = e.target.closest && e.target.closest(".word");
      if (!w || !ORD || ORD.done || w.dataset.in !== "line") return;
      var id = +w.dataset.id, i = ORD.line.indexOf(id);
      if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); clearMarks(); moveToken(id, "line", i - 1); drawOrder(); $('.word[data-id="' + id + '"]').focus(); }
      if (e.key === "ArrowRight" && i < ORD.line.length - 1) { e.preventDefault(); clearMarks(); moveToken(id, "line", i + 1); drawOrder(); $('.word[data-id="' + id + '"]').focus(); }
    });
  }

  /* ============================================================
     ERGEBNIS
     ============================================================ */
  function evalBadges(st, info) {
    var got = [];
    function give(id) { if (!st.badges[id]) { st.badges[id] = Date.now(); got.push(id); } }
    var ratio = info.n ? info.firstTry / info.n : 0;
    give("first");
    if (info.mode !== "mix" && info.mode !== "fehler" && ratio >= 0.8) give(info.mode);
    if (info.mode === "mix" && ratio >= 0.7) give("mix");
    if (info.mode !== "fehler" && info.firstTry === info.n && info.n >= 10) give("perfect");
    if (st.bestStreak >= 5) give("streak");
    if (st.coins >= 300) give("coins");
    if (st.rounds >= 10) give("rounds");
    if (st.badges.praesens && st.badges.praeteritum && st.badges.perfekt && st.badges.futur) give("master");
    if (st.rounds >= 3) give("rounds3");
    if (info.stars >= 3) give("stars3");
    if (info.mode === "fehler") give("redo");
    if (st.played.praesens && st.played.praeteritum && st.played.perfekt && st.played.futur) give("tenses");
    if (st.coins >= 1000) give("coins1000");
    return got;
  }

  function badgeById(id) { return D.BADGES.filter(function (x) { return x.id === id; })[0]; }
  /* Truhen-Szene mit allem, was das Kind schon gefunden hat; freshIds fallen mit Animation hinein */
  function chestHTML(st, freshIds, label) {
    var have = {}, fresh = [];
    D.BADGES.forEach(function (b) { if (st.badges[b.id]) have[b.art] = true; });
    (freshIds || []).forEach(function (id) { var b = badgeById(id); if (b) fresh.push(b.art); });
    var level = Math.max(0, D.RANKS.indexOf(L.rankFor(st.coins)));
    return '<div class="scene-wrap">' + A.chestScene({ have: have, fresh: fresh, level: level, label: label }) + "</div>";
  }

  function finishRound() {
    var st = Store.get();
    var n = G.n, stars = L.starsFor(G.firstTry, n), bonus = stars * 10;
    st.coins += bonus; st.rounds++;
    if (G.mode !== "fehler") {
      st.played[G.mode] = (st.played[G.mode] || 0) + 1;
      st.stars[G.mode] = Math.max(st.stars[G.mode] || 0, stars);
    }
    var perfect = G.firstTry === n;
    if (perfect) st.perfectRounds++;
    var newBadges = evalBadges(st, { mode: G.mode, firstTry: G.firstTry, n: n, stars: stars });
    Store.save();
    var rankObj = L.rankFor(st.coins), rankNow = rankObj.name, rankUp = rankNow !== G.rankStart;

    var badgeHtml = newBadges.map(function (id, i) {
      var bd = badgeById(id);
      return '<div class="badge fresh" style="animation-delay:' + (0.9 + i * 0.5).toFixed(2) + 's"><span class="medal">' + A.treasure(bd.art) + "</span><b>" + esc(bd.name) + "</b></div>";
    }).join("");
    var haveCount = D.BADGES.filter(function (b) { return st.badges[b.id]; }).length;
    var starHtml = "";
    for (var i = 0; i < 3; i++) starHtml += A.star(i < stars);
    var msg = rnd(D.TEXTS.roundEnd[stars]);
    if (rankUp) msg += " Du bist jetzt " + rankObj.art + " " + rankNow + "!";

    $app.innerHTML =
      '<div class="screen result-screen"><div class="topbar"><div class="grow"></div><div class="right">' + coinChip() + soundBtn() + "</div></div>" +
      '<div class="stage"><aside class="kai-col"><div class="kai-box"><div class="kai-fig">' + A.kai() + '</div><div class="speech" id="speech"></div></div></aside>' +
      '<section class="paper result" data-t="' + G.mode + '"><h1>Schatzinsel erreicht!</h1>' +
      chestHTML(st, newBadges, "Deine Schatztruhe mit " + haveCount + " von " + D.BADGES.length + " Schätzen") +
      '<div class="stars" role="img" aria-label="' + stars + ' von 3 Sternen">' + starHtml + "</div>" +
      '<div class="facts"><div class="fact"><b>' + G.firstTry + " von " + n + '</b><span>gleich richtig</span></div>' +
      '<div class="fact"><b>+' + (G.coinsGained + bonus) + " " + A.coin() + "</b><span>Goldmünzen</span></div></div>" +
      (newBadges.length ? '<h2 class="plain-h">' + (newBadges.length > 1 ? "Neue Schätze in der Truhe!" : "Neuer Schatz in der Truhe!") + '</h2><div class="newbadges">' + badgeHtml + "</div>" : "") +
      '<div class="actions" id="resActions">' +
      (G.missed.length
        ? '<button class="btn btn-gold btn-big" data-act="redo">' + A.ICON.anchor + "Fehler üben</button>"
        : '<button class="btn btn-gold btn-big" data-act="again" data-mode="' + (G.mode === "fehler" ? "mix" : G.mode) + '">' + A.ICON.refresh + "Noch eine Reise</button>") +
      '<button class="btn btn-wood btn-big" data-act="home">Zum Hafen</button></div></section></div></div>';
    window.scrollTo(0, 0);
    kaiSay(msg, stars >= 2 ? "cheer" : "happy", 4000);
    S.fanfare();
    newBadges.forEach(function (id, i) { later(function () { S.badge(); }, 1300 + i * 500); });
    if (stars >= 2) confetti();
    window.__lastMissed = G.missed;
  }

  /* ============================================================
     PIRATENFIBEL
     ============================================================ */
  var FB = { t: "praesens", item: null };
  function pickExampleItem() {
    var good = D.ITEMS.filter(function (x) { return x.person === "3s" && x.verb !== "sein" && x.verb !== "haben"; });
    return rnd(good);
  }
  function fibelCardHTML() {
    var t = FB.t, info = D.TENSE_INFO[t], it = FB.item;
    var rows = D.TENSES.map(function (tt) {
      var tw = D.TIME_WORDS[tt][0];
      var toks = L.buildTokens(it, tt, tw, "S");
      return '<tr class="' + (tt === t ? "sel" : "") + '" data-t="' + tt + '"><td>' + tname(tt) + "</td><td>" + sentenceHTML(toks, true).replace(/class="w v"/g, 'class="w v" style="color:var(--ct-' + tt + ')"') + "</td></tr>";
    }).join("");
    return '<div class="paper fibel-card" data-t="' + t + '"><span class="tense-pill" data-t="' + t + '">' + info.name + " <small>" + info.alt + "</small></span>" +
      '<p class="rule">' + esc(info.formula) + "</p>" +
      '<p class="signals"><span class="lbl">Signalwörter:</span> ' + info.signal.map(function (sg) { return '<span class="signal">' + esc(sg) + "</span>"; }).join("") + "</p>" +
      '<p class="cap">Ein Verb in allen Zeitformen: <b>' + esc(it.verb) + "</b></p>" +
      '<table class="mini-table" data-t="' + t + '"><tbody>' + rows + "</tbody></table>" +
      '<div class="actions"><button class="btn btn-light" data-act="fib-new">' + A.ICON.refresh + "Anderes Beispiel</button>" +
      '<button class="btn btn-gold" data-act="start" data-mode="' + t + '">' + info.name + " üben " + A.ICON.play + "</button></div></div>";
  }
  var FIBEL_KAI = {
    praesens: "Das Präsens erzählt, was JETZT passiert.",
    praeteritum: "Das Präteritum erzählt, was früher war. Es ist nur EIN Wort.",
    perfekt: "Das Perfekt erzählt auch von früher. Es hat ZWEI Teile.",
    futur: "Das Futur erzählt, was noch kommt. Es hat ZWEI Teile.",
  };
  function showFibel() {
    clearTimers(); clearConfetti(); G = null; ORD = null;
    if (!FB.item) FB.item = pickExampleItem();
    var k = TL_ORDER.indexOf(FB.t);
    var stops = TL_ORDER.map(function (t, i) {
      return '<button class="stop" data-t="' + t + '" data-act="fib-sel" data-tense="' + t + '" aria-pressed="' + (t === FB.t) + '"><i></i><span>' + tname(t) + "</span></button>";
    }).join("");
    $app.innerHTML =
      '<div class="screen fibel"><div class="page-head"><button class="btn btn-light btn-round" data-act="home" aria-label="Zurück zum Hafen">' + A.ICON.back + "</button><h1>Kais Piratenfibel</h1>" +
      '<div class="right" style="margin-left:auto;display:flex;gap:8px">' + soundBtn() + "</div></div>" +
      '<div class="timeline" id="timeline" style="--k:' + k + '"><div class="zones"><span>Vergangenheit</span><span>Gegenwart</span><span>Zukunft</span></div>' +
      '<div class="ship-wrap" id="tlShip">' + A.ship() + '</div><div class="stops">' + stops + "</div></div>" +
      '<div class="stage"><aside class="kai-col"><div class="kai-box"><div class="kai-fig">' + A.kai() + '</div><div class="speech" id="speech"></div></div></aside>' +
      '<div id="fibelCard">' + fibelCardHTML() + "</div></div></div>";
    window.scrollTo(0, 0);
    kaiSay("Tippe auf eine Zeitform. Mein Schiff fliegt dorthin!", "happy");
  }
  function fibelSelect(t) {
    FB.t = t;
    var k = TL_ORDER.indexOf(t);
    $("#timeline").style.setProperty("--k", k);
    $$(".stop").forEach(function (s) { s.setAttribute("aria-pressed", s.dataset.tense === t); });
    $("#fibelCard").innerHTML = fibelCardHTML();
    S.whoosh();
    kaiSay(FIBEL_KAI[t], "happy");
  }

  /* ============================================================
     SCHATZTRUHE
     ============================================================ */
  function showTruhe() {
    clearTimers(); clearConfetti(); G = null; ORD = null;
    var st = Store.get(), rank = L.rankFor(st.coins), next = L.nextRank(st.coins);
    var pct = next ? Math.round(((st.coins - rank.min) / (next.min - rank.min)) * 100) : 100;
    var earned = D.BADGES.filter(function (b) { return st.badges[b.id]; }).length;
    var tiles = D.BADGES.map(function (b) {
      var got = !!st.badges[b.id];
      return '<button type="button" class="badge ' + (got ? "" : "locked") + '" data-act="badge" data-id="' + b.id + '" aria-label="' + esc(b.name) + (got ? ", gefunden" : ", noch nicht gefunden") + '">' +
        '<span class="medal">' + A.treasure(b.art) + "</span><b>" + esc(b.name) + "</b></button>";
    }).join("");
    $app.innerHTML =
      '<div class="screen truhe"><div class="page-head"><button class="btn btn-light btn-round" data-act="home" aria-label="Zurück zum Hafen">' + A.ICON.back + "</button><h1>Schatztruhe</h1>" +
      '<div class="right" style="margin-left:auto;display:flex;gap:8px">' + soundBtn() + "</div></div>" +
      '<div class="paper truhe-top">' + chestHTML(st, [], "Deine Schatztruhe mit " + earned + " von " + D.BADGES.length + " Schätzen") +
      '<div class="rank-row"><div class="rank-name">' + esc(rank.name) + '</div><div class="rank-coins">' + A.coin() + " " + st.coins + " Goldmünzen</div></div>" +
      (next ? '<div class="rankbar" role="progressbar" aria-label="Fortschritt zum nächsten Rang" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div><small>Noch ' + (next.min - st.coins) + " Münzen bis zum Rang <b>" + esc(next.name) + "</b></small>" : "<p><b>Höchster Rang erreicht!</b></p>") +
      "</div>" +
      '<h2 class="section-title">Schätze: ' + earned + " von " + D.BADGES.length + "</h2>" +
      '<p class="badge-info" id="badgeInfo" role="status">' + (earned ? "Tippe auf einen Schatz." : "Die Truhe ist noch leer. Schaffe Reisen, dann füllt sie sich!") + "</p>" +
      '<div class="badge-grid">' + tiles + "</div>" +
      '<div class="reset-box"><button class="btn btn-outline btn-small" data-act="reset">Fortschritt zurücksetzen</button>' +
      '<p class="foot-note">Dein Fortschritt bleibt nur auf diesem Gerät. Es werden keine Daten verschickt.</p></div></div>';
    window.scrollTo(0, 0);
  }

  /* ============================================================
     Steuerung
     ============================================================ */
  $app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var act = b.dataset.act;
    S.unlock();
    switch (act) {
      case "sound": setSound(!S.isEnabled()); break;
      case "home": S.click(); showHome(); break;
      case "fibel": S.click(); showFibel(); break;
      case "truhe": S.click(); showTruhe(); break;
      case "badge":
        S.click();
        var bd = D.BADGES.filter(function (x) { return x.id === b.dataset.id; })[0], got = !!Store.get().badges[bd.id];
        $("#badgeInfo").textContent = bd.name + (got ? " – gefunden! " : " – so findest du den Schatz: ") + bd.desc;
        $$(".badge-grid .badge").forEach(function (x) { x.classList.toggle("sel", x === b); });
        break;
      case "start": S.click(); startRound(b.dataset.mode); break;
      case "again": S.click(); startRound(b.dataset.mode); break;
      case "redo": S.click(); startRound("fehler", window.__lastMissed); break;
      case "fib-sel": S.click(); fibelSelect(b.dataset.tense); break;
      case "fib-new":
        S.click(); FB.item = pickExampleItem(); $("#fibelCard").innerHTML = fibelCardHTML(); break;
      case "leave":
        S.click();
        modal({ title: "Reise beenden?", text: "Wenn du jetzt zurück zum Hafen fährst, geht diese Reise verloren.", no: "Weiter üben", yes: "Zum Hafen", yesClass: "btn-wood", onYes: showHome });
        break;
      case "reset":
        S.click();
        modal({ title: "Wirklich alles löschen?", text: "Deine Münzen, Schätze und Sterne werden gelöscht. Das kann man nicht rückgängig machen.", no: "Nein, behalten", yes: "Ja, löschen", onYes: function () { Store.reset(); showTruhe(); } });
        break;
    }
  });

  document.addEventListener("pointerdown", function () { S.unlock(); }, { once: true });

  /* ---------- Start ---------- */
  (function init() {
    var st = Store.load();
    var params = new URLSearchParams(location.search);
    var on = st.sound === null ? params.get("sound") !== "off" : st.sound;
    if (params.get("sound") === "off") on = false;
    S.setEnabled(on);
    if (params.get("bewegung") === "aus") document.documentElement.classList.add("no-motion");
    // Wolken im Hintergrund
    var world = document.getElementById("world");
    if (world) {
      var h = "";
      var defs = [[8, 160, 110], [30, 220, 150], [52, 140, 170], [70, 190, 130], [18, 120, 210]];
      defs.forEach(function (d, i) {
        h += '<div class="cloud-d" style="top:' + d[0] + "%;width:" + d[1] + "px;animation-duration:" + d[2] + "s;animation-delay:-" + (i * 31) + 's">' + A.cloud() + "</div>";
      });
      world.insertAdjacentHTML("afterbegin", h);
    }
    showHome();
  })();

  // zum Testen im Browser
  window.KaiApp = { startRound: startRound, showHome: showHome, showFibel: showFibel, showTruhe: showTruhe, state: function () { return G; }, ord: function () { return ORD; } };
})();
