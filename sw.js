/* Service worker: offline support with a safe update strategy.
   - HTML navigations: network-first (you always get fresh content when online),
     falling back to the cached copy when offline.
   - Static assets (css/js/images): cache-first for speed, refreshed in background.
   Bump VERSION whenever you deploy changed assets. */
const VERSION = "v1.0.0";
const CACHE = "portfolio-" + VERSION;
const CORE = [
  "./",
  "index.html",
  "blog.html",
  "resume.html",
  "404.html",
  "css/styles.css",
  "js/theme.js",
  "js/content.js",
  "js/main.js",
  "js/blog.js",
  "js/resume.js",
  "assets/favicon.svg",
  "manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match("index.html"))
        )
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
          return res;
        })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
