const CACHE_NAME = 'geratarefas-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Estratégia Network-First: Tenta usar a internet, se falhar, usa o cache offline.
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Guarda uma cópia atualizada no cache se tiver internet
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Se não houver internet, procura no cache!
                return caches.match(event.request);
            })
    );
});
