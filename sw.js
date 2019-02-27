var cacheName = 'bs-0-2-0';
var cacheFiles = [
    '/',
    'index.html',
    'index.js',
    'style.css',
    'img/book.png',
    'img/loading.svg'
];

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});