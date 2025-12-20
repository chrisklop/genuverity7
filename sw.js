// GenuVerity Service Worker
const CACHE_NAME = 'genuverity-v1';
const STATIC_CACHE = 'genuverity-static-v1';
const DYNAMIC_CACHE = 'genuverity-dynamic-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/reports.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Precaching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip cross-origin requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // API requests: network-first (don't cache)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Static assets: cache-first, fallback to network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cache, but also update cache in background
          event.waitUntil(
            fetch(event.request)
              .then(response => {
                if (response && response.ok) {
                  const responseClone = response.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then(cache => cache.put(event.request, responseClone));
                }
              })
              .catch(() => {})
          );
          return cachedResponse;
        }

        // No cache - fetch from network
        return fetch(event.request)
          .then(response => {
            if (!response || !response.ok) {
              return response;
            }

            // Cache the fetched response
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(event.request, responseClone));

            return response;
          })
          .catch(() => {
            // Offline fallback for HTML pages
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline report requests (future feature)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reports') {
    console.log('[SW] Background sync triggered');
  }
});

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New report available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'view', title: 'View Report' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('GenuVerity', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/reports.html')
    );
  }
});
