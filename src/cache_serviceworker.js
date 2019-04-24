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
	// event.respondWith(
	//     // ensure we check the *right* cache to match against
	//     fetch(event.request)
	//         .then((response) => {
	//             if (event.request.url.)
	//             if (event.request.method === 'GET') {
	//                 caches.open(CACHE_NAME).then(cache => {
	//                     return cache.add(event.request)
	//                 });
	//             }
	//             return Promise.resolve(response)
	//         })
	//         .catch(() => {
	//             return caches.match(event.request)
	//         })
	// );
	if (event.request.method !== 'GET') {
		return;
	}

	const url = new URL(event.request.url);
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}

	if (url.pathname.indexOf('/api') !== -1 || url.pathname.indexOf('/storage') !== -1) {
		return;
	}

	if (global.navigator.connection !== undefined &&
        global.navigator.connection.effectiveType !== undefined ){

		console.log('Connection:' + global.navigator.connection.effectiveType);
		event.respondWith(
			caches.match(url.pathname)
				.catch(() => fetch(event.request))
		);
		event.waitUntil(
			update(event.request)
		);
	} else {
		event.respondWith(
			update(event.request)
				.catch(() => global.caches.match(url.pathname))
		);
	}
});


function update (request) {
	return fetch(request)
		.then((resp) => {
			if (resp.ok) {
				return caches.open(CACHE_NAME)
					.then((cache) => {
						console.log('update cache');
						cache.put(request, resp.clone());
						return resp;
					});
			}
		});
}
