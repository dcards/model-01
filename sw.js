var CACHE_NAME = 'angel-models-card-v01-01';
var urlsToCache = [
	'/model-01/',
	'/model-01/index.html',
	'/model-01/offline.html',
	'/model-01/404.html',
	'/model-01/favicon/android-chrome-512x512.png',
	'/model-01/css/all.css',
	'/model-01/webfonts/fa-brands-400.eot',
	'/model-01/webfonts/fa-brands-400.svg',
	'/model-01/webfonts/fa-brands-400.ttf',
	'/model-01/webfonts/fa-brands-400.woff',
	'/model-01/webfonts/fa-brands-400.woff2',
	'/model-01/webfonts/fa-regular-400.eot',
	'/model-01/webfonts/fa-regular-400.svg',
	'/model-01/webfonts/fa-regular-400.ttf',
	'/model-01/webfonts/fa-regular-400.woff',
	'/model-01/webfonts/fa-regular-400.woff2',
	'/model-01/webfonts/fa-solid-900.eot',
	'/model-01/webfonts/fa-solid-900.svg',
	'/model-01/webfonts/fa-solid-900.ttf',
	'/model-01/webfonts/fa-solid-900.woff',
	'/model-01/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/model-01/imgs/mauricio-jun-angel-models-card-top-bkg.png',
	'/model-01/imgs/mauricio-jun-angel-models-sobre-mobile.png',
	'/model-01/imgs/mauricio-jun-logo-angel-models-01-maior-1024x1024.png',
	'/model-01/imgs/portfolio-01.png',
	'/model-01/imgs/portfolio-02.png',
	'/model-01/imgs/portfolio-03.png',
	'/model-01/imgs/mauricio-jun-logo-angel-models-02.png'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/model-01/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/model-01/offline.html');
		})
	);
});