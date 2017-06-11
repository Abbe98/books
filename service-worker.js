const CACHE_NAME = 'abbesbooks';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '',
        'index.html',
        'style.css',
        'list.min.js',
        'app.js',
        'books.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(loadFromCache(event.request));
    event.waitUntil(updateCache(event.request));
});

function loadFromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(match => {
      return match || Promise.reject('failed-match');
    });
  });
}

function updateCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(request).then(response => {
      return cache.put(request, response);
    });
  });
}
