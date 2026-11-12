const CACHE = 'pgtpcalc-static-v2';
self.addEventListener('install', ev => ev.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./config.js','./manifest.webmanifest','./lugia.png']))));
self.addEventListener('activate', ev => ev.waitUntil(self.clients.claim()));
self.addEventListener('fetch', ev => {
  if(ev.request.method !== 'GET' || new URL(ev.request.url).origin !== self.location.origin) return;
  ev.respondWith(fetch(ev.request).then(resp=>{const clone=resp.clone(); caches.open(CACHE).then(c=>c.put(ev.request,clone)); return resp;}).catch(()=>caches.match(ev.request)));
});
