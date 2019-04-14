const urlsToCache = [
    '/img/arrow_up_big.svg',
    '/img/edit.svg',
    '/img/pers1.svg',
    '/img/settings.svg',
    '/img/vk.svg',
    '/index.html',
    '/js/index.js',
    '/js/main.js',
    '/style.css',
    '/sw.js'
];

const CACHE_NAME = 'my-site-cache-v1';

// we'll version our cache (and learn how to delete caches in
// some other post)

self.addEventListener('install', e => {
    // once the SW is installed, go ahead and fetch the resources
    // to make this work offline
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(
                urlsToCache
            ).then(() => self.skipWaiting());
        })
    );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
    event.respondWith(
        // ensure we check the *right* cache to match against
        fetch(event.request).catch(() => {
            return caches.match(event.request)
        })
    );
});
