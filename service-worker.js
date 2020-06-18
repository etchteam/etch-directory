const cacheName = 'etch-directory-v2';
const thingsToCache = [
  '/',
  '/about'
];

const cacheResources = async () => {
  const cache = await caches.open(cacheName);
  return cache.addAll(thingsToCache);
};

const getResponse = async request => {
  try {
    return fetch(request)
  } catch (err) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse;
  }
};

self.addEventListener('install', event => {
  event.waitUntil(cacheResources());
});

self.addEventListener('fetch', event => {
  event.respondWith(getResponse(event.request));
});