// Click an image marked .zoom to see it larger. Without JS the link opens the image file.
(function () {
  var dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('.lightbox-caption');

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a.zoom');
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();

    var figure = link.closest('figure');
    var figcaption = figure ? figure.querySelector('figcaption') : null;
    var thumb = link.querySelector('img');

    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    caption.textContent = figcaption ? figcaption.textContent : '';
    dialog.showModal();
  });

  dialog.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { img.removeAttribute('src'); });
})();

// Simple / Cool switch: slide the thumb, then load the other design.
(function () {
  var sw = document.querySelector('.design-switch');
  if (!sw) return;
  sw.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    if (link.hasAttribute('aria-current')) { event.preventDefault(); return; }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    sw.classList.add('flip');
    setTimeout(function () { window.location.href = link.href; }, 230);
  });
  window.addEventListener('pageshow', function () { sw.classList.remove('flip'); });
})();
