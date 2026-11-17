/* Registriert den Offline-Speicher (nur über https oder localhost, nicht beim Öffnen der Datei). */
(function () {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () { /* ohne Offline-Speicher weiter */ });
  });
})();
