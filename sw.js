// Service worker d'App GR : rend l'app installable depuis Chrome.
// Chrome ignore un gestionnaire « fetch » vide (no-op) : il faut qu'il réponde réellement.
// Réseau d'abord : chaque ouverture charge la dernière version publiée ;
// le cache ne sert qu'en secours, hors connexion.
const C="appgr-v261111.59",F=["./","index.html","manifest.webmanifest","icon-192.png?v=2","icon-512.png?v=2","apple-touch-icon.png?v=2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):Response.error()))))});
