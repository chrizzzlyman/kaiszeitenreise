/* Kais Zeitenreise – Offline-Speicher (Service Worker)
   Die App funktioniert nach dem ersten Laden auch ohne Internet.
   Nach einer Änderung an den Dateien die Zahl in CACHE erhöhen. */
const CACHE = "kais-zeitenreise-v2";
const ASSETS = [
  "./", "index.html", "manifest.webmanifest",
  "css/style.css",
  "js/data.js", "js/logic.js", "js/art.js", "js/sound.js", "js/store.js", "js/app.js", "js/pwa.js",
  "fonts/andika-latin-400-normal.woff2", "fonts/andika-latin-700-normal.woff2", "fonts/pirata-one-latin-400-normal.woff2",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});
/* Erst das Netz fragen (dann ist die App immer aktuell), ohne Internet den Speicher nutzen. */
self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); }); })
  );
});
