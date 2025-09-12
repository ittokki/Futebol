self.addEventListener("install", (e) => {
  console.log("Service Worker instalado");
  e.waitUntil(
    caches.open("ranking-cache").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => resp || fetch(e.request))
  );
});
