/* ============================================================
   Kais Zeitenreise – Grafiken (alles als SVG, keine Bilddateien)
   ============================================================ */
(function (root) {
  "use strict";

  const OUT = "#23364f"; // Konturfarbe (dunkles Marineblau)

  /* ---------- Das fliegende Piratenschiff ---------- */
  function ship(extraClass) {
    return `
<svg class="art-ship ${extraClass || ""}" viewBox="0 0 330 260" role="img" aria-label="Das fliegende Piratenschiff">
  <g class="ship-wing ship-wing-b">
    <path d="M176 154 C150 112 104 76 34 62 C46 76 52 88 52 100 C40 98 28 102 18 110 C38 114 50 124 56 136 C44 136 34 142 26 152 C52 154 70 160 84 170 C74 174 66 180 60 188 C100 184 140 176 176 170 Z"
          fill="#ffffff" stroke="#2f6aa3" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M168 156 C140 120 100 92 52 80 M164 162 C130 136 96 122 56 118 M166 168 C130 152 96 146 60 150 M168 174 C140 170 112 172 84 178"
          fill="none" stroke="#9cc4ea" stroke-width="4" stroke-linecap="round"/>
  </g>
  <g class="ship-hull">
    <path d="M44 152 H290 C284 192 252 216 214 220 H112 C78 216 50 192 44 152 Z" fill="#935c2b" stroke="#4a2810" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M54 174 H282 M66 194 H270 M90 208 H246" stroke="#4a2810" stroke-opacity=".35" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <rect x="38" y="144" width="258" height="15" rx="7.5" fill="#f4b834" stroke="#8a5a0a" stroke-width="4"/>
    <circle cx="116" cy="186" r="9.5" fill="#ffe9a8" stroke="#4a2810" stroke-width="3.5"/>
    <circle cx="156" cy="190" r="9.5" fill="#ffe9a8" stroke="#4a2810" stroke-width="3.5"/>
    <circle cx="196" cy="190" r="9.5" fill="#ffe9a8" stroke="#4a2810" stroke-width="3.5"/>
    <path d="M52 148 V112 Q52 104 60 104 H112 Q120 104 120 112 V148 Z" fill="#b87340" stroke="#4a2810" stroke-width="4.5" stroke-linejoin="round"/>
    <rect x="63" y="116" width="17" height="17" rx="4" fill="#ffe9a8" stroke="#4a2810" stroke-width="3.5"/>
    <rect x="92" y="116" width="17" height="17" rx="4" fill="#ffe9a8" stroke="#4a2810" stroke-width="3.5"/>
    <path d="M288 150 L322 124" stroke="#6b3f1d" stroke-width="8" stroke-linecap="round"/>
    <path d="M288 150 L322 124" stroke="#4a2810" stroke-width="2" stroke-linecap="round" opacity=".5"/>
  </g>
  <path d="M157 38 L322 124 M157 38 L58 106" stroke="#3d2210" stroke-width="2.5" fill="none" opacity=".65"/>
  <rect x="150" y="34" width="12" height="114" rx="3.5" fill="#6b3f1d" stroke="#3d2210" stroke-width="3"/>
  <rect x="232" y="72" width="9" height="76" rx="3.5" fill="#6b3f1d" stroke="#3d2210" stroke-width="3"/>
  <g class="ship-sail">
    <path d="M104 50 C140 38 182 42 212 56 C220 82 216 106 208 122 C176 130 136 130 106 120 C98 98 98 72 104 50 Z"
          fill="#fff4d6" stroke="#8b6f3a" stroke-width="4" stroke-linejoin="round"/>
    <path d="M128 48 C124 76 124 104 128 126 M182 46 C190 76 190 104 184 128" stroke="#e5d3a4" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M138 66 L176 104 M176 66 L138 104" stroke="#7a1d18" stroke-width="6" stroke-linecap="round"/>
    <circle cx="157" cy="82" r="16" fill="#fff" stroke="#7a1d18" stroke-width="4"/>
    <rect x="149" y="92" width="16" height="10" rx="3" fill="#fff" stroke="#7a1d18" stroke-width="3.5"/>
    <circle cx="151" cy="81" r="3.6" fill="#7a1d18"/><circle cx="163" cy="81" r="3.6" fill="#7a1d18"/>
    <path d="M155.5 88 L157 85.5 L158.5 88 Z" fill="#7a1d18"/>
  </g>
  <g class="ship-sail ship-sail-2">
    <path d="M212 84 C232 78 256 80 272 88 C274 104 270 118 264 130 C248 136 226 136 214 130 C208 112 208 98 212 84 Z"
          fill="#fff4d6" stroke="#8b6f3a" stroke-width="4" stroke-linejoin="round"/>
    <path d="M238 84 C236 104 236 120 238 134" stroke="#e5d3a4" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="243" cy="108" r="8.5" fill="#fff" stroke="#7a1d18" stroke-width="3.5"/>
    <circle cx="240" cy="107" r="2" fill="#7a1d18"/><circle cx="246" cy="107" r="2" fill="#7a1d18"/>
  </g>
  <g class="ship-flag">
    <path d="M158 14 C142 12 126 18 108 14 C116 24 116 32 108 42 C126 38 142 42 158 38 Z" fill="#1d1d27" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="134" cy="27" r="6" fill="#fff"/><circle cx="132" cy="26" r="1.5" fill="#1d1d27"/><circle cx="136" cy="26" r="1.5" fill="#1d1d27"/>
  </g>
</svg>`;
  }

  /* ---------- Kai, das Piratenkind ---------- */
  function kai(extraClass) {
    return `
<svg class="art-kai ${extraClass || ""}" viewBox="0 0 200 275" data-mood="happy" role="img" aria-label="Kai, das Piratenkind">
  <g class="kai-body">
    <rect x="78" y="204" width="19" height="40" rx="8" fill="#5b4631" stroke="${OUT}" stroke-width="3.5"/>
    <rect x="103" y="204" width="19" height="40" rx="8" fill="#5b4631" stroke="${OUT}" stroke-width="3.5"/>
    <path d="M70 238 H99 V256 Q99 263 92 263 H77 Q70 263 70 256 Z" fill="#2a2018" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M101 238 H130 V256 Q130 263 123 263 H108 Q101 263 101 256 Z" fill="#2a2018" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>

    <g class="kai-arm kai-arm-l">
      <path d="M72 146 C60 162 56 178 56 194" stroke="${OUT}" stroke-width="21" stroke-linecap="round" fill="none"/>
      <path d="M72 146 C60 162 56 178 56 194" stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none"/>
      <circle cx="56" cy="198" r="10.5" fill="#f6cfa3" stroke="${OUT}" stroke-width="3.5"/>
    </g>
    <rect x="68" y="130" width="64" height="82" rx="18" fill="#fff" stroke="${OUT}" stroke-width="3.5"/>
    <g fill="#2f5d9e"><rect x="70" y="148" width="60" height="9"/><rect x="70" y="166" width="60" height="9"/><rect x="70" y="184" width="60" height="9"/></g>
    <rect x="66" y="203" width="68" height="12" rx="4" fill="#3a2614" stroke="#23160b" stroke-width="2.5"/>
    <rect x="92" y="200" width="16" height="17" rx="3" fill="#f4b834" stroke="#8a5a0a" stroke-width="2.5"/>
    <g class="kai-arm kai-arm-r">
      <path d="M128 146 C140 162 144 178 144 194" stroke="${OUT}" stroke-width="21" stroke-linecap="round" fill="none"/>
      <path d="M128 146 C140 162 144 178 144 194" stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none"/>
      <circle cx="144" cy="198" r="10.5" fill="#f6cfa3" stroke="${OUT}" stroke-width="3.5"/>
    </g>
  </g>

  <g class="kai-head">
    <circle cx="57" cy="94" r="8" fill="#f6cfa3" stroke="${OUT}" stroke-width="3.5"/>
    <circle cx="143" cy="94" r="8" fill="#f6cfa3" stroke="${OUT}" stroke-width="3.5"/>
    <circle cx="54" cy="104" r="4.5" fill="none" stroke="#f4b834" stroke-width="3"/>
    <circle cx="100" cy="88" r="43" fill="#f6cfa3" stroke="${OUT}" stroke-width="3.5"/>
    <path d="M58 82 C52 98 56 112 64 120 C62 108 62 96 66 84 Z" fill="#5b3a22"/>
    <path d="M142 82 C148 98 144 112 136 120 C138 108 138 96 134 84 Z" fill="#5b3a22"/>
    <path d="M60 76 C70 88 82 86 92 78 C98 88 112 88 120 78 C128 86 134 84 140 76 L140 66 L60 66 Z" fill="#5b3a22"/>
    <path d="M142 66 L168 54 L162 72 L174 80 L146 82 Z" fill="#d9382f" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M56 78 C54 30 146 30 144 78 C128 66 72 66 56 78 Z" fill="#d9382f" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
    <g fill="#fff"><circle cx="76" cy="58" r="3.8"/><circle cx="100" cy="49" r="3.8"/><circle cx="124" cy="58" r="3.8"/><circle cx="88" cy="68" r="3"/><circle cx="114" cy="68" r="3"/></g>
    <circle cx="72" cy="106" r="7.5" fill="#f2877a" opacity=".5"/>
    <circle cx="128" cy="106" r="7.5" fill="#f2877a" opacity=".5"/>
    <g class="kai-eyes">
      <circle cx="84" cy="92" r="6.8" fill="#2a1a10"/><circle cx="116" cy="92" r="6.8" fill="#2a1a10"/>
      <circle cx="86" cy="89.5" r="2.3" fill="#fff"/><circle cx="118" cy="89.5" r="2.3" fill="#fff"/>
    </g>
    <path d="M98 99 Q100.5 103 104 100" stroke="#c98a5e" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <g class="kai-face kai-face-happy">
      <path d="M75 81 Q84 76 93 80 M107 80 Q116 76 125 81" stroke="#3a2614" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M85 109 Q100 123 115 109" fill="none" stroke="${OUT}" stroke-width="3.8" stroke-linecap="round"/>
    </g>
    <g class="kai-face kai-face-cheer">
      <path d="M74 77 Q84 71 93 77 M107 77 Q116 71 126 77" stroke="#3a2614" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M81 107 Q100 138 119 107 Z" fill="#7a2a2a" stroke="${OUT}" stroke-width="3.8" stroke-linejoin="round"/>
      <path d="M90 121 Q100 112 110 121 Q100 129 90 121 Z" fill="#f08a8a"/>
    </g>
    <g class="kai-face kai-face-think">
      <path d="M75 82 Q84 79 93 82 M107 74 Q116 70 125 76" stroke="#3a2614" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M91 113 Q101 109 110 114" fill="none" stroke="${OUT}" stroke-width="3.8" stroke-linecap="round"/>
    </g>
    <g class="kai-face kai-face-oops">
      <path d="M76 83 Q84 79 93 76 M107 76 Q116 79 124 83" stroke="#3a2614" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M88 117 Q100 107 112 117" fill="none" stroke="${OUT}" stroke-width="3.8" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
  }

  /* ---------- Schwebende Insel (Wegpunkt) ---------- */
  function island(kind) {
    if (kind === "treasure") {
      return `
<svg class="art-island art-island-big" viewBox="0 0 150 120" aria-hidden="true">
  <path d="M10 70 H140 C134 96 110 112 75 118 C40 112 16 96 10 70 Z" fill="#8a7662" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M30 84 L40 98 M60 90 L66 106 M96 88 L90 104 M118 80 L110 94" stroke="#6f5d4b" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="75" cy="70" rx="66" ry="15" fill="#62c46f" stroke="${OUT}" stroke-width="4"/>
  <path d="M104 68 C106 52 112 40 124 30" stroke="#8a5a2b" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g fill="#35a050" stroke="${OUT}" stroke-width="3" stroke-linejoin="round">
    <path d="M124 30 C112 20 98 22 90 30 C102 28 114 28 124 30 Z"/>
    <path d="M124 30 C136 20 150 24 156 32 C144 28 134 28 124 30 Z"/>
    <path d="M124 30 C118 16 124 6 134 4 C130 14 128 22 124 30 Z"/>
  </g>
  <path d="M36 62 L56 52 M56 62 L36 52" stroke="#c0392b" stroke-width="6" stroke-linecap="round"/>
  <g transform="translate(60 38)">
    <rect x="2" y="12" width="34" height="20" rx="4" fill="#9b5f2b" stroke="${OUT}" stroke-width="3"/>
    <path d="M2 16 Q2 4 19 4 Q36 4 36 16 Z" fill="#b87340" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>
    <rect x="16" y="14" width="6" height="8" rx="1.5" fill="#f4b834" stroke="#8a5a0a" stroke-width="1.8"/>
  </g>
</svg>`;
    }
    return `
<svg class="art-island" viewBox="0 0 90 76" aria-hidden="true">
  <path d="M8 38 H82 C77 56 63 68 45 74 C27 68 13 56 8 38 Z" fill="#8a7662" stroke="${OUT}" stroke-width="3.5" stroke-linejoin="round"/>
  <ellipse cx="45" cy="38" rx="37" ry="9.5" fill="#62c46f" stroke="${OUT}" stroke-width="3.5"/>
  <path d="M52 36 C54 26 58 18 66 12" stroke="#8a5a2b" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g fill="#35a050" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round">
    <path d="M66 12 C58 5 48 6 43 12 C51 11 59 11 66 12 Z"/>
    <path d="M66 12 C74 5 84 8 87 14 C79 11 72 11 66 12 Z"/>
    <path d="M66 12 C62 3 66 -1 72 -2 C70 4 68 8 66 12 Z"/>
  </g>
</svg>`;
  }

  /* ---------- Goldmünze ---------- */
  function coin(extraClass) {
    return `<svg class="art-coin ${extraClass || ""}" viewBox="0 0 32 32" aria-hidden="true">
  <circle cx="16" cy="16" r="14" fill="#f7c948" stroke="#9a6508" stroke-width="2.5"/>
  <circle cx="16" cy="16" r="9.5" fill="none" stroke="#d9971a" stroke-width="2"/>
  <path d="M16 9.5 L17.9 14 L22.5 14.4 L19 17.4 L20.1 22 L16 19.5 L11.9 22 L13 17.4 L9.5 14.4 L14.1 14 Z" fill="#fde58a" stroke="#d9971a" stroke-width="1" stroke-linejoin="round"/>
</svg>`;
  }

  function star(on, extraClass) {
    return `<svg class="art-star ${on ? "on" : "off"} ${extraClass || ""}" viewBox="0 0 48 48" aria-hidden="true">
  <path d="M24 4 L30 17.5 L44.5 19 L33.5 28.8 L36.8 43 L24 35.6 L11.2 43 L14.5 28.8 L3.5 19 L18 17.5 Z"
        fill="${on ? "#ffcf3d" : "#d9d2c0"}" stroke="${on ? "#a56a00" : "#a69d86"}" stroke-width="3" stroke-linejoin="round"/>
</svg>`;
  }

  function chest(open) {
    return `<svg class="art-chest ${open ? "open" : ""}" viewBox="0 ${open ? -30 : 0} 150 ${open ? 160 : 130}" aria-hidden="true">
  ${open ? `<g class="chest-glow"><circle cx="75" cy="52" r="46" fill="#ffe27a" opacity=".45"/><circle cx="75" cy="52" r="30" fill="#fff3b8" opacity=".6"/></g>
  <g class="chest-coins"><ellipse cx="75" cy="58" rx="46" ry="14" fill="#f7c948" stroke="#9a6508" stroke-width="3"/>
    <circle cx="52" cy="50" r="9" fill="#fde58a" stroke="#9a6508" stroke-width="2.5"/><circle cx="76" cy="44" r="10" fill="#fde58a" stroke="#9a6508" stroke-width="2.5"/><circle cx="100" cy="51" r="9" fill="#fde58a" stroke="#9a6508" stroke-width="2.5"/>
    <circle cx="64" cy="55" r="8" fill="#f7c948" stroke="#9a6508" stroke-width="2.5"/><circle cx="90" cy="56" r="8" fill="#f7c948" stroke="#9a6508" stroke-width="2.5"/></g>` : ""}
  <rect x="22" y="60" width="106" height="58" rx="9" fill="#9b5f2b" stroke="${OUT}" stroke-width="4.5"/>
  <rect x="48" y="60" width="12" height="58" fill="#f4b834" stroke="#8a5a0a" stroke-width="3"/>
  <rect x="92" y="60" width="12" height="58" fill="#f4b834" stroke="#8a5a0a" stroke-width="3"/>
  ${open
    ? `<path d="M22 62 L30 20 Q75 4 120 20 L128 62 Z" fill="#b87340" stroke="${OUT}" stroke-width="4.5" stroke-linejoin="round" transform="translate(0 -22) rotate(-6 75 40)"/>`
    : `<path d="M22 62 Q22 22 75 22 Q128 22 128 62 Z" fill="#b87340" stroke="${OUT}" stroke-width="4.5" stroke-linejoin="round"/>
  <rect x="48" y="26" width="12" height="36" fill="#f4b834" stroke="#8a5a0a" stroke-width="3"/><rect x="92" y="26" width="12" height="36" fill="#f4b834" stroke="#8a5a0a" stroke-width="3"/>`}
  <rect x="66" y="66" width="18" height="22" rx="4" fill="#f4b834" stroke="#8a5a0a" stroke-width="3"/>
  <circle cx="75" cy="76" r="3.2" fill="#8a5a0a"/><rect x="73.7" y="77" width="2.6" height="7" rx="1.3" fill="#8a5a0a"/>
</svg>`;
  }

  function cloud(extraClass) {
    return `<svg class="art-cloud ${extraClass || ""}" viewBox="0 0 140 70" aria-hidden="true">
  <path d="M26 62 C6 62 4 40 22 36 C20 18 42 12 54 22 C60 6 88 4 96 22 C112 14 134 26 124 42 C138 46 134 62 114 62 Z" fill="#fff"/>
</svg>`;
  }

  /* ---------- Piratenflagge (Totenkopf) für Knöpfe ---------- */
  function skull() {
    return `<svg class="art-skull" viewBox="0 0 40 40" aria-hidden="true">
  <path d="M6 8 L34 32 M34 8 L6 32" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" opacity=".9"/>
  <circle cx="20" cy="17" r="10" fill="#fff" stroke="currentColor" stroke-width="3"/>
  <rect x="14.5" y="23" width="11" height="7" rx="2" fill="#fff" stroke="currentColor" stroke-width="2.6"/>
  <circle cx="16.3" cy="16.5" r="2.4" fill="currentColor"/><circle cx="23.7" cy="16.5" r="2.4" fill="currentColor"/>
</svg>`;
  }

  /* kleine Symbole (Zahnrad-frei, rein gezeichnet) */
  const ICON = {
    sound: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 12 H11 L18 6 V26 L11 20 H5 Z" fill="currentColor"/><path d="M22 11 Q26 16 22 21 M25 7.5 Q31 16 25 24.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>`,
    mute: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 12 H11 L18 6 V26 L11 20 H5 Z" fill="currentColor"/><path d="M22 11 L30 21 M30 11 L22 21" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>`,
    back: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M20 6 L9 16 L20 26" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    bulb: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 C9.5 3 6 8 6 12.5 C6 16.5 8.5 18.5 10 21 V24 H22 V21 C23.5 18.5 26 16.5 26 12.5 C26 8 22.5 3 16 3 Z" fill="currentColor"/><rect x="11" y="26" width="10" height="3.2" rx="1.6" fill="currentColor"/></svg>`,
    book: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 7 Q10 5 16 8 Q22 5 28 7 V25 Q22 23 16 26 Q10 23 4 25 Z" fill="currentColor"/><path d="M16 8 V26" stroke="#fff" stroke-width="2" opacity=".6"/></svg>`,
    chest: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 14 Q4 5 16 5 Q28 5 28 14 Z" fill="currentColor"/><rect x="4" y="14" width="24" height="13" rx="2.5" fill="currentColor"/><rect x="13.5" y="12" width="5" height="7" rx="1.4" fill="#fff" opacity=".8"/></svg>`,
    check: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 17 L13 24 L26 8" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    anchor: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="7" r="3.4" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M16 10.5 V26 M10 14 H22 M5 18 C6 24 11 27 16 27 C21 27 26 24 27 18 M5 18 L3 21 M5 18 L8.5 19 M27 18 L29 21 M27 18 L23.5 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    play: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5 L26 16 L9 27 Z" fill="currentColor"/></svg>`,
    refresh: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M26 16 A10 10 0 1 1 22 8" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><path d="M17 3 L24 9 L16 13 Z" fill="currentColor"/></svg>`,
  };

  /* ============================================================
     Schätze: 16 Schatzstücke (je 100 × 100) und die Truhen-Szene
     ============================================================ */
  const GEM_LINE = 'stroke="' + OUT + '" stroke-opacity=".5" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" fill="none"';
  const O = 'stroke="' + OUT + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"';
  const SPARK = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3} Z" fill="#fff" stroke="#9cc4ea" stroke-width="1.5" stroke-linejoin="round"/>`;

  function classicGem(top, mid, low, extra) {
    return `<path d="M28 20 H72 L92 42 L50 87 L8 42 Z" fill="${mid}" ${O}/>
  <path d="M28 20 L38 42 L50 20 L62 42 L72 20 Z" fill="${top}"/>
  <path d="M8 42 H92 L50 87 Z" fill="${low}"/>
  <path d="M28 20 H72 L92 42 L50 87 L8 42 Z" fill="none" ${O}/>
  <path d="M8 42 H92 M28 20 L38 42 M72 20 L62 42 M38 42 L50 20 L62 42 M38 42 L50 87 L62 42" ${GEM_LINE}/>
  <path d="M20 34 L30 27" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>${extra || ""}`;
  }

  const TREASURE = {
    compass: () => `
  <rect x="42" y="8" width="16" height="14" rx="5" fill="#f4b834" ${O}/>
  <circle cx="50" cy="56" r="36" fill="#f4b834" ${O}/>
  <circle cx="50" cy="56" r="27" fill="#fff8e1" stroke="#8a5a0a" stroke-width="3"/>
  <path d="M50 34 V39 M50 73 V78 M28 56 H33 M67 56 H72" stroke="#8a5a0a" stroke-width="3" stroke-linecap="round"/>
  <path d="M50 32 L59 56 L41 56 Z" fill="#d9382f" ${O.replace("3.5", "2.5")}/>
  <path d="M50 80 L59 56 L41 56 Z" fill="#fff" ${O.replace("3.5", "2.5")}/>
  <circle cx="50" cy="56" r="4" fill="#f4b834" stroke="${OUT}" stroke-width="2.2"/>
  <path d="M22 44 Q26 34 34 28" stroke="#fff6c8" stroke-width="4.5" stroke-linecap="round" fill="none" opacity=".8"/>`,

    spyglass: () => `<g transform="rotate(-32 50 50)">
  <rect x="10" y="34" width="26" height="32" rx="5" fill="#b87340" ${O}/>
  <ellipse cx="10" cy="50" rx="4.5" ry="14" fill="#9fdbfb" ${O.replace("3.5", "3")}/>
  <rect x="34" y="31" width="8" height="38" rx="3" fill="#f4b834" ${O.replace("3.5", "3")}/>
  <rect x="42" y="39" width="24" height="22" rx="4" fill="#935c2b" ${O}/>
  <rect x="64" y="36" width="8" height="28" rx="3" fill="#f4b834" ${O.replace("3.5", "3")}/>
  <rect x="72" y="42" width="19" height="16" rx="4" fill="#b87340" ${O}/>
  <path d="M16 38 H30" stroke="#fff6c8" stroke-width="4" stroke-linecap="round" opacity=".7"/></g>`,

    map: () => `
  <path d="M18 22 Q18 15 25 15 H77 Q84 15 84 22 V76 Q84 83 77 83 H25 Q18 83 18 76 Z" fill="#fdf0cc" ${O}/>
  <path d="M26 40 Q32 30 41 35 Q46 44 36 47 Q25 48 26 40 Z" fill="#7ac27f" stroke="#2f7d4a" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M34 72 Q44 54 54 62 T72 46" fill="none" stroke="#935c2b" stroke-width="3.5" stroke-dasharray="1 7" stroke-linecap="round"/>
  <path d="M62 24 L78 40 M78 24 L62 40" stroke="#d9382f" stroke-width="6" stroke-linecap="round"/>
  <rect x="9" y="12" width="12" height="76" rx="6" fill="#e8c98a" ${O}/>
  <rect x="79" y="12" width="12" height="76" rx="6" fill="#e8c98a" ${O}/>`,

    emerald: () => `
  <path d="M30 14 H70 L90 34 V66 L70 86 H30 L10 66 V34 Z" fill="#2fa36a" ${O}/>
  <path d="M35 27 H65 L77 39 V61 L65 73 H35 L23 61 V39 Z" fill="#58c98b" stroke="${OUT}" stroke-opacity=".5" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M42 37 H58 L66 45 V55 L58 63 H42 L34 55 V45 Z" fill="#9aeab9" stroke="${OUT}" stroke-opacity=".4" stroke-width="2" stroke-linejoin="round"/>
  <path d="M30 14 L35 27 M70 14 L65 27 M90 34 L77 39 M90 66 L77 61 M70 86 L65 73 M30 86 L35 73 M10 66 L23 61 M10 34 L23 39" ${GEM_LINE}/>
  <path d="M24 26 L34 18" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>`,

    amethyst: () => classicGem("#b58cf0", "#8e5bd6", "#6f3fb8"),

    amber: () => `
  <path d="M50 8 C74 8 90 28 90 52 C90 76 72 92 50 92 C28 92 10 76 10 52 C10 28 26 8 50 8 Z" fill="#e8860c" ${O}/>
  <path d="M50 18 C68 18 80 32 80 52 C80 70 68 82 50 82 C32 82 20 70 20 52 C20 32 32 18 50 18 Z" fill="#ffb43a" stroke="${OUT}" stroke-opacity=".35" stroke-width="2.5"/>
  <ellipse cx="52" cy="54" rx="5" ry="8" fill="#a85a05" transform="rotate(25 52 54)"/>
  <circle cx="40" cy="62" r="3" fill="#ffd98a" stroke="#c46f0a" stroke-width="1.5"/><circle cx="62" cy="40" r="2.5" fill="#ffd98a" stroke="#c46f0a" stroke-width="1.5"/>
  <path d="M28 34 Q32 26 40 22" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>`,

    sapphire: () => `
  <circle cx="50" cy="50" r="40" fill="#2a6fd6" ${O}/>
  <circle cx="50" cy="50" r="27" fill="#5b9cf2" stroke="${OUT}" stroke-opacity=".45" stroke-width="2.5"/>
  <circle cx="50" cy="50" r="13" fill="#a8cdfa" stroke="${OUT}" stroke-opacity=".35" stroke-width="2"/>
  <path d="M50 10 V23 M50 77 V90 M10 50 H23 M77 50 H90 M22 22 L31 31 M78 22 L69 31 M22 78 L31 69 M78 78 L69 69" ${GEM_LINE}/>
  <path d="M24 34 Q28 26 36 21" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>`,

    pearl: () => `
  <path d="M12 62 Q8 14 50 12 Q92 14 88 62 Z" fill="#f2c4d6" ${O}/>
  <path d="M50 14 V60 M32 20 L36 60 M68 20 L64 60 M20 34 L24 60 M80 34 L76 60" stroke="${OUT}" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="50" cy="56" r="24" fill="#fff" ${O}/>
  <path d="M34 66 Q40 78 54 78 Q66 76 72 64 Q60 70 34 66 Z" fill="#ffc2e0" opacity=".85"/>
  <path d="M64 42 Q72 50 70 60 Q64 52 58 46 Z" fill="#b8e0ff" opacity=".9"/>
  <path d="M30 56 Q30 46 38 40 Q34 50 38 60 Z" fill="#fff0a8" opacity=".9"/>
  <circle cx="41" cy="46" r="5" fill="#fff"/>
  <path d="M10 62 Q50 82 90 62 Q90 90 50 91 Q10 90 10 62 Z" fill="#fbdce8" ${O}/>
  <path d="M30 72 L32 86 M50 76 V90 M70 72 L68 86" stroke="${OUT}" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,

    goblet: () => `
  <path d="M25 24 H12 Q10 52 36 56" fill="none" stroke="${OUT}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M75 24 H88 Q90 52 64 56" fill="none" stroke="${OUT}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25 24 H12 Q10 52 36 56 M75 24 H88 Q90 52 64 56" fill="none" stroke="#f4b834" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 12 H76 V38 Q76 62 50 67 Q24 62 24 38 Z" fill="#f4b834" ${O}/>
  <path d="M32 20 V38 Q32 52 42 58" stroke="#fff6c8" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>
  <path d="M55 24 L58.5 32 L67 33 L60.8 38.6 L62.6 47 L55 42.8 L47.4 47 L49.2 38.6 L43 33 L51.5 32 Z" fill="#fff6c8" stroke="#a56a00" stroke-width="2" stroke-linejoin="round"/>
  <rect x="43" y="66" width="14" height="16" fill="#f4b834" ${O}/>
  <rect x="26" y="80" width="48" height="12" rx="4" fill="#e8a91c" ${O}/>`,

    ruby: () => `
  <path d="M50 88 C18 64 8 48 8 33 C8 20 18 11 30 11 C40 11 47 17 50 25 C53 17 60 11 70 11 C82 11 92 20 92 33 C92 48 82 64 50 88 Z" fill="#d9382f" ${O}/>
  <path d="M50 76 C28 58 20 46 20 35 C20 27 26 22 32 22 C40 22 46 28 50 36 C54 28 60 22 68 22 C74 22 80 27 80 35 C80 46 72 58 50 76 Z" fill="#f2665c" stroke="${OUT}" stroke-opacity=".35" stroke-width="2.5"/>
  <path d="M50 25 V88 M8 33 L50 52 L92 33" ${GEM_LINE}/>
  <path d="M22 28 Q26 20 34 18" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>`,

    diamond: () => classicGem("#f0fbff", "#c8e8ff", "#93cdf5", SPARK(88, 14, 9) + SPARK(12, 72, 6)),

    key: () => `<g transform="rotate(-38 50 50)">
  <path d="M26 30 a20 20 0 1 0 .01 0 Z M26 41 a9 9 0 1 1 -.01 0 Z" fill="#f4b834" fill-rule="evenodd" ${O}/>
  <rect x="42" y="43" width="50" height="14" rx="4" fill="#f4b834" ${O}/>
  <rect x="68" y="55" width="9" height="16" rx="2.5" fill="#f4b834" ${O}/>
  <rect x="82" y="55" width="9" height="11" rx="2.5" fill="#f4b834" ${O}/>
  <path d="M46 47 H64" stroke="#fff6c8" stroke-width="3.5" stroke-linecap="round" opacity=".8"/></g>`,

    bars: () => {
      const bar = (x, y) => `<path d="M${x} ${y + 22} L${x + 6} ${y} H${x + 34} L${x + 40} ${y + 22} Z" fill="#f7c948" ${O}/><path d="M${x + 9} ${y + 6} H${x + 31}" stroke="#fff6c8" stroke-width="4" stroke-linecap="round" opacity=".85"/>`;
      return bar(8, 66) + bar(52, 66) + bar(30, 42) + `<path d="M40 52 L60 52" stroke="#a56a00" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>`;
    },

    ring: () => `
  <ellipse cx="50" cy="64" rx="29" ry="25" fill="none" stroke="${OUT}" stroke-width="15"/>
  <ellipse cx="50" cy="64" rx="29" ry="25" fill="none" stroke="#f4b834" stroke-width="8"/>
  <path d="M34 50 Q42 42 52 41" stroke="#fff6c8" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".8"/>
  <path d="M34 14 H66 L78 28 L50 52 L22 28 Z" fill="#2ec4b6" ${O}/>
  <path d="M22 28 H78 M34 14 L40 28 L50 14 L60 28 L66 14 M40 28 L50 52 L60 28" ${GEM_LINE}/>
  <path d="M30 22 L38 18" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".85"/>`,

    hat: () => `
  <path d="M38 22 L62 48 M62 22 L38 48" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0"/>
  <path d="M6 66 C10 34 30 14 50 14 C70 14 90 34 94 66 C76 56 62 54 50 54 C38 54 24 56 6 66 Z" fill="#3a4157" ${O}/>
  <path d="M6 66 C24 56 38 54 50 54 C62 54 76 56 94 66" fill="none" stroke="#f4b834" stroke-width="5" stroke-linecap="round"/>
  <path d="M10 70 Q50 92 90 70 Q86 78 50 80 Q14 78 10 70 Z" fill="#2b2f3a" ${O.replace("3.5", "3")}/>
  <path d="M38 22 L62 44 M62 22 L38 44" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <circle cx="50" cy="32" r="11" fill="#fff" stroke="${OUT}" stroke-width="3"/>
  <rect x="44" y="38" width="12" height="9" rx="2.5" fill="#fff" stroke="${OUT}" stroke-width="2.6"/>
  <circle cx="45.5" cy="31" r="2.8" fill="${OUT}"/><circle cx="54.5" cy="31" r="2.8" fill="${OUT}"/>
  <path d="M20 38 Q26 28 34 24" stroke="#7d86a3" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>`,

    crown: () => `
  <path d="M12 78 L7 30 L31 52 L50 16 L69 52 L93 30 L88 78 Z" fill="#f7c948" ${O}/>
  <path d="M12 70 H88 V84 Q88 88 84 88 H16 Q12 88 12 84 Z" fill="#e8a91c" ${O}/>
  <circle cx="7" cy="27" r="6" fill="#d9382f" ${O.replace("3.5", "3")}/><circle cx="50" cy="12" r="7" fill="#d9382f" ${O.replace("3.5", "3")}/><circle cx="93" cy="27" r="6" fill="#d9382f" ${O.replace("3.5", "3")}/>
  <circle cx="28" cy="79" r="5.5" fill="#2a6fd6" stroke="${OUT}" stroke-width="2.5"/><circle cx="50" cy="79" r="6.5" fill="#d9382f" stroke="${OUT}" stroke-width="2.5"/><circle cx="72" cy="79" r="5.5" fill="#2fa36a" stroke="${OUT}" stroke-width="2.5"/>
  <path d="M22 66 L17 42 M44 44 L50 30" stroke="#fff6c8" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>`,
  };

  function treasure(id, extraClass) {
    const f = TREASURE[id];
    if (!f) return "";
    return `<svg class="art-treasure ${extraClass || ""}" viewBox="0 0 100 100" aria-hidden="true">${f()}</svg>`;
  }

  /* Plätze der Schatzstücke in der Truhe: x, y = Mitte, s = Größe (1 = 100 Einheiten), r = Drehung, z = Ebene
     z 0 = hinten, 1 = Mitte, 2 = vorn (halb vom Truhenrand verdeckt), 3 = vor der Truhe auf dem Boden */
  const SLOTS = {
    pearl:   { x: 206, y: 130, s: .9,  r: -4, z: 0 },
    crown:   { x: 330, y: 104, s: 1.4, r: 0, z: 0 },
    goblet:  { x: 458, y: 120, s: 1.05, r: 6, z: 0 },
    emerald: { x: 212, y: 178, s: .7,  r: -8, z: 1 },
    amber:   { x: 280, y: 182, s: .7,  r: 6, z: 1 },
    sapphire:{ x: 380, y: 182, s: .68, r: -6, z: 1 },
    ruby:    { x: 450, y: 180, s: .72, r: 8, z: 1 },
    amethyst:{ x: 254, y: 210, s: .68, r: -5, z: 2 },
    diamond: { x: 332, y: 204, s: .88, r: 2, z: 2 },
    spyglass:{ x: 52,  y: 236, s: 1.1, r: -40, z: 3 },
    hat:     { x: 62,  y: 324, s: 1.05, r: -6, z: 3 },
    compass: { x: 122, y: 354, s: .6,  r: 0, z: 3 },
    map:     { x: 616, y: 226, s: .95, r: 8, z: 3 },
    bars:    { x: 612, y: 322, s: .95, r: 0, z: 3 },
    ring:    { x: 566, y: 362, s: .52, r: 0, z: 3 },
    key:     { x: 668, y: 372, s: .56, r: -4, z: 3 },
  };

  /* Die ganze Truhe. opts.have = { id: true }, opts.fresh = [neue ids], opts.level = Größe des Münzhaufens 0–4 */
  function chestScene(opts) {
    opts = opts || {};
    const have = opts.have || {}, fresh = opts.fresh || [], level = Math.max(0, Math.min(4, opts.level || 0));
    const ids = Object.keys(SLOTS).filter(function (id) { return have[id]; });
    function piece(id, i) {
      const sl = SLOTS[id], isNew = fresh.indexOf(id) >= 0;
      const k = sl.s;
      const tr = `translate(${sl.x} ${sl.y}) rotate(${sl.r}) scale(${k}) translate(-50 -50)`;
      const delay = (0.5 + fresh.indexOf(id) * 0.5).toFixed(2);
      return `<g transform="${tr}"><g class="t-piece ${isNew ? "t-fresh" : ""}" style="${isNew ? "animation-delay:" + delay + "s" : ""}">` +
        (isNew ? `<circle class="t-glow" cx="50" cy="50" r="54" fill="#fff3b8" style="animation-delay:${delay}s"/>` : "") +
        TREASURE[id]() + (isNew ? `<g class="t-twinkle" style="animation-delay:${delay}s">${SPARK(8, 10, 9)}${SPARK(94, 22, 7)}${SPARK(80, 92, 8)}</g>` : "") +
        `</g></g>`;
    }
    const layer = function (z) { return ids.filter(function (id) { return SLOTS[id].z === z; }).map(piece).join(""); };
    // Münzhaufen wächst mit dem Rang
    const h = 8 + level * 12;
    const coinsXY = [[190, 0], [236, 3], [284, 1], [332, 4], [380, 1], [428, 3], [472, 0], [212, 12], [260, 14], [308, 10], [356, 14], [404, 11], [452, 12], [240, 24], [330, 22], [420, 24]];
    const nCoins = 4 + level * 3;
    const coins = coinsXY.slice(0, Math.min(coinsXY.length, nCoins)).map(function (c, i) {
      const lift = Math.max(0, h - 2 - Math.abs(c[0] - 330) * 0.1) * (c[1] / 24 + 0.55);
      return `<circle cx="${c[0]}" cy="${240 - 8 - lift + c[1] * 0.3}" r="11.5" fill="${i % 2 ? "#f7c948" : "#fde58a"}" stroke="#9a6508" stroke-width="2.8"/>`;
    }).join("");
    return `<svg class="art-scene" viewBox="0 0 700 400" role="img" aria-label="${esc(opts.label || "Schatztruhe")}">
  <ellipse cx="348" cy="372" rx="300" ry="13" fill="#23364f" opacity=".14"/>
  <path d="M130 244 L168 44 H492 L530 244 Z" fill="#b87340" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M150 236 L182 62 H478 L510 236 Z" fill="#6e3516" stroke="${OUT}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M168 44 H492" stroke="#f4b834" stroke-width="9" stroke-linecap="round"/>
  <path d="M214 74 L192 226 M330 66 V228 M446 74 L468 226" stroke="#8a4a22" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" opacity=".7"/>
  <rect x="150" y="208" width="360" height="44" fill="#3d1d0a"/>
  <path d="M120 244 Q200 ${240 - h} 330 ${236 - h} Q460 ${240 - h} 540 244 Z" fill="#f7c948" stroke="#9a6508" stroke-width="3" stroke-linejoin="round"/>
  ${coins}
  ${layer(0)}${layer(1)}${layer(2)}
  <rect x="110" y="240" width="440" height="118" rx="12" fill="#9b5f2b" stroke="${OUT}" stroke-width="5"/>
  <path d="M120 268 H540 M120 312 H540" stroke="#4a2810" stroke-opacity=".25" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="104" y="230" width="452" height="20" rx="9" fill="#b87340" stroke="${OUT}" stroke-width="5"/>
  <rect x="185" y="240" width="24" height="118" fill="#f4b834" stroke="#8a5a0a" stroke-width="3.5"/>
  <rect x="451" y="240" width="24" height="118" fill="#f4b834" stroke="#8a5a0a" stroke-width="3.5"/>
  <circle cx="197" cy="258" r="3.5" fill="#8a5a0a"/><circle cx="197" cy="338" r="3.5" fill="#8a5a0a"/><circle cx="463" cy="258" r="3.5" fill="#8a5a0a"/><circle cx="463" cy="338" r="3.5" fill="#8a5a0a"/>
  <rect x="312" y="264" width="36" height="46" rx="7" fill="#f4b834" stroke="#8a5a0a" stroke-width="3.5"/>
  <circle cx="330" cy="281" r="5" fill="#8a5a0a"/><rect x="327.6" y="282" width="4.8" height="14" rx="2.4" fill="#8a5a0a"/>
  ${layer(3)}
</svg>`;
  }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  root.KaiArt = { ship, kai, island, coin, star, chest, cloud, skull, ICON, treasure, chestScene, SLOTS };
})(typeof window !== "undefined" ? window : this);
