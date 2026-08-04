const CACHE_NAME = "talent-workbench-v42";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=42",
  "./app.js?v=42",
  "./capture-setup.html",
  "./manifest.webmanifest",
  "./vendor/hello-csv/index.es.js",
  "./vendor/hello-csv/hello-csv.css?v=42",
  "./vendor/xlsx/read-excel-file.min.js?v=42",
  "./vendor/xlsx/write-excel-file.min.js?v=42",
  "./fonts/Figtree-roman.woff2",
  "./fonts/Figtree-italic.woff2",
  "./fonts/Playfair-roman.woff2",
  "./fonts/Playfair-italic.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
