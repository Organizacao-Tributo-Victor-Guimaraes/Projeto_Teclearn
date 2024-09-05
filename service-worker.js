const CACHE_NAME = 'quiz-cache-v1';
const urlsToCache = [
  '/',
  'index.html', 
  'src/util/style.css', 
  'src/util/app.js', 
  'manifest.json', 
  'src/assets/icon-1.png', 
  'src/assets/icon-2.png',
  'src/screenshots/desktop.png',
  'src/screenshots/mobile.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});