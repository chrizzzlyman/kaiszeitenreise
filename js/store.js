/* ============================================================
   Kais Zeitenreise – Spielstand (nur im Browser, ohne Server)
   Es werden keine persönlichen Daten gespeichert.
   ============================================================ */
(function (root) {
  "use strict";
  const KEY = "kais-zeitenreise-v1";

  function fresh() {
    return {
      v: 1, coins: 0, rounds: 0, perfectRounds: 0, bestStreak: 0,
      badges: {}, boxes: {},
      stars: { praesens: 0, praeteritum: 0, perfekt: 0, futur: 0, mix: 0 },
      played: { praesens: 0, praeteritum: 0, perfekt: 0, futur: 0, mix: 0 },
      sound: null, seenIntro: false,
    };
  }

  let memory = null;
  let state = fresh();

  function read() {
    try {
      const raw = root.localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* Speicher gesperrt: wir arbeiten im Arbeitsspeicher weiter */ }
    return memory;
  }
  function write() {
    memory = state;
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignorieren */ }
  }

  const Store = {
    load: function () {
      const saved = read();
      if (saved && saved.v === 1) {
        const base = fresh();
        state = Object.assign(base, saved);
        state.stars = Object.assign(base.stars, saved.stars || {});
        state.played = Object.assign(base.played, saved.played || {});
        state.badges = saved.badges || {};
        state.boxes = saved.boxes || {};
      } else {
        state = fresh();
      }
      return state;
    },
    get: function () { return state; },
    save: write,
    reset: function () {
      const sound = state.sound;
      state = fresh(); state.sound = sound; write();
      return state;
    },
  };
  root.KaiStore = Store;
})(typeof window !== "undefined" ? window : this);
