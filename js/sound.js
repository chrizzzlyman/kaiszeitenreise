/* ============================================================
   Kais Zeitenreise – Klänge (alles selbst erzeugt, keine Audiodateien)
   ============================================================ */
(function (root) {
  "use strict";
  let ctx = null, master = null, enabled = true, noiseBuf = null;

  function ensure() {
    if (!enabled) return false;
    try {
      if (!ctx) {
        const AC = root.AudioContext || root.webkitAudioContext;
        if (!AC) return false;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
      }
      if (ctx.state === "suspended") ctx.resume();
      return true;
    } catch (e) { return false; }
  }

  function tone(freq, start, dur, type, vol, slideTo) {
    const t0 = ctx.currentTime + start;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.25, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function noise(start, dur, vol, f0, f1) {
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const t0 = ctx.currentTime + start;
    const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 1.2;
    f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t0); s.stop(t0 + dur + 0.05);
  }

  const S = {
    setEnabled: function (on) { enabled = !!on; },
    isEnabled: function () { return enabled; },
    unlock: function () { ensure(); },
    click: function () { if (!ensure()) return; tone(520, 0, 0.07, "triangle", 0.18); },
    correct: function () {
      if (!ensure()) return;
      tone(660, 0, 0.14, "triangle", 0.26); tone(880, 0.1, 0.14, "triangle", 0.26); tone(1318, 0.2, 0.3, "sine", 0.22);
    },
    coin: function () { if (!ensure()) return; tone(1568, 0, 0.09, "square", 0.08); tone(2093, 0.07, 0.25, "square", 0.08); },
    wrong: function () { if (!ensure()) return; tone(300, 0, 0.18, "sawtooth", 0.12, 200); tone(220, 0.14, 0.26, "sawtooth", 0.1, 150); },
    whoosh: function () { if (!ensure()) return; noise(0, 1.0, 0.22, 300, 2400); },
    drop: function () { if (!ensure()) return; tone(180, 0, 0.12, "sine", 0.2, 120); },
    pick: function () { if (!ensure()) return; tone(440, 0, 0.06, "triangle", 0.16); tone(587, 0.05, 0.06, "triangle", 0.14); },
    gull: function () {
      if (!ensure()) return;
      tone(1500, 0, 0.18, "sine", 0.1, 2100); tone(2100, 0.17, 0.2, "sine", 0.1, 1200); tone(1500, 0.5, 0.16, "sine", 0.08, 2000); tone(2000, 0.66, 0.22, "sine", 0.08, 1100);
    },
    fanfare: function () {
      if (!ensure()) return;
      const n = [523, 659, 784, 1047, 784, 1047, 1319];
      n.forEach(function (f, i) { tone(f, i * 0.13, i === n.length - 1 ? 0.6 : 0.16, "triangle", 0.26); tone(f / 2, i * 0.13, 0.18, "square", 0.05); });
    },
    badge: function () {
      if (!ensure()) return;
      [784, 988, 1175, 1568].forEach(function (f, i) { tone(f, i * 0.09, 0.3, "sine", 0.2); });
    },
  };
  root.KaiSound = S;
})(typeof window !== "undefined" ? window : this);
