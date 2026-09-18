const CACHE = 'jatahsusu-pearl-cove-v1';
const LOCAL_ASSETS = [
  './',
  './index.html',
  './pearl-cove.css',
  './pearl-cove.js',
  './manifest.json',
  './logo.jpg',
  './logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const requestUrl = new URL(e.request.url);
  if (e.request.method !== 'GET' || requestUrl.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
        }
        return response;
      }).catch(() => cached);

      return cached || network;
    })
  );
});
