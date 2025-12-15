self.addEventListener("fetch",()=>{});
const CACHE="ai-quran-v1";
const ASSETS=[
  "./","./index.html","./style.css","./app.js","./quran-loader.js"
];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{
      const clone=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,clone));
      return res;
    }))
  );
});
