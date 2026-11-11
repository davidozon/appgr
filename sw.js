// Service worker minimal : rend App GR installable (écran d'accueil, plein écran).
// Aucune mise en cache : chaque ouverture charge la dernière version publiée.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
