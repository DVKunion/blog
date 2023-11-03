function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}

var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var img = entry.target;
            img.srcset = img.getAttribute('data-srcset');
            img.className += ' loaded';
            io.unobserve(img);
        }
    });
});

query('img.lazyload').forEach(function (item) {
    io.observe(item);
});