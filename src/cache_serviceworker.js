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
    '/rules',
    '/game'
];

const CACHE_NAME = 'colors-game';

// we'll version our cache (and learn how to delete caches in
// some other post)


self.addEventListener('install', event => {
    // once the SW is installed, go ahead and fetch the resources
    // to make this work offline
    event.waitUntil(
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
        fetch(event.request)
            .then((response) => {
                caches.open(CACHE_NAME).then(cache => {
                    return cache.add(event.request)
                });
                return Promise.resolve(response)
            })
            .catch(() => {
                return caches.match(event.request)
            })
    );
});
