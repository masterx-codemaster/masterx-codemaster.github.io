
var CACHE_STATIC_NAME = 'static-champagne';
var CACHE_DYNAMIC_NAME = 'dynamic-tequilla';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell ...');
        cache.addAll([
          '/',
          /* -- Start Loading Core Files -- */
          'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900',
          '/fonts/great-vibes/great-vibes.ttf',
          '/fonts/great-vibes/great-vibes.woff',
          '/fonts/great-vibes/great-vibes.woff2',
          '/css/great-vibes.css',
          '/css/style.css',

          '/images/bg_1.jpg',
          '/images/bg_2.jpg',
          '/images/bg_3.jpg',
          '/images/bg_4.jpg',
          '/images/bg_5.jpg',

          '/index.html',
          '/offline.html',
          '/manifest.json',
          /* -- End Loading Core Files -- */

          '/css/open-iconic-bootstrap.min.css',
          '/css/animate.css',
          '/css/owl.carousel.min.css',
          '/css/owl.theme.default.min.css',
          '/css/magnific-popup.css',
          '/css/aos.css',
          '/css/ionicons.min.css',
          '/css/bootstrap-datepicker.css',
          '/css/jquery.timepicker.css',
          '/css/flaticon.css',
          '/css/icomoon.css',

          '/js/jquery.min.js',
          '/js/jquery-migrate-3.0.1.min.js',
          '/js/popper.min.js',
          '/js/bootstrap.min.js',
          '/js/jquery.easing.1.3.js',
          '/js/jquery.waypoints.min.js',
          '/js/jquery.stellar.min.js',
          '/js/owl.carousel.min.js',
          '/js/jquery.magnific-popup.min.js',
          '/js/aos.js',
          '/js/jquery.animateNumber.min.js',
          '/js/bootstrap-datepicker.js',
          '/js/jquery.timepicker.min.js',
          '/js/scrollax.min.js',
          '/js/main.js'
        ]);
      })
  )
  console.log('[Service Worker] Installed!');
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache ....', key);
            return caches.delete(key);
          }
        }));
      })
  );
  console.log('[Service Worker] Activated!');
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function (cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function (cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});

/*
U : elgastronomo.resto@gmail.com
P : El Gastronomo 2020

Deleted Mapping :
[1] ./css/aos.css
[2] ./js/aos.js
[3] ./js/bootstrap.min.js
[4] ./js/popper.min.js
*/