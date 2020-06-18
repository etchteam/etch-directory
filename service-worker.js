const cacheName = 'etch-directory-v1';
const thingsToCache = [
  '/',
  '/about'
];

const cacheResources = async () => {
  const cache = await caches.open(cacheName);
  return cache.addAll(thingsToCache);
};

const getResponse = async request => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  return cachedResponse || fetch(request);
};

self.addEventListener('install', event => {
  event.waitUntil(cacheResources());
});

self.addEventListener('fetch', event => {
  event.respondWith(getResponse(event.request));
});