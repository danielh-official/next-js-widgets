/// <reference lib="webworker" />

const CACHE_NAME = 'widgets-app-v1';

// Assets to cache on install
const STATIC_ASSETS = ['/', '/icon-192x192.png', '/icon-512x512.png'];

// Paths that should be cached (static assets and pages)
const CACHEABLE_PATHS = ['/', '/widgets', '/icon-', '/_next/static/'];

// Check if a request should be cached
function shouldCache(url) {
  const pathname = new URL(url).pathname;
  return CACHEABLE_PATHS.some((path) => pathname.startsWith(path));
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, falling back to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        // Only cache if the response is valid and the path is cacheable
        if (response.ok && shouldCache(event.request.url)) {
          const responseClone = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, responseClone);
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // Return a fallback response for navigation requests
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('/');
          if (fallback) {
            return fallback;
          }
        }
        // Return a basic offline response
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' },
        });
      })
  );
});
