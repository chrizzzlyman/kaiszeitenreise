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

  root.KaiArt = { ship, kai, island, coin, star, chest, cloud, skull, ICON };
})(typeof window !== "undefined" ? window : this);
