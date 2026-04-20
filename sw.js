// Service Worker für PWA – offline Funktionalität
// Datei: sw.js - im Root Ordner Lernplattform

const CACHE_NAME = 'emma-spanisch-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/core.js',
  '/assets/js/speech.js',
  '/manifest.json'
];

// Installation – Cache erstellen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll Error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Aktivierung – alte Caches löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Anfragen abfangen – offline/online Strategie
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      }).catch(() => {
        // Fallback wenn offline
        return new Response('Offline – bitte prüfe deine Internetverbindung', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({'Content-Type': 'text/plain'})
        });
      });
    })
  );
});
