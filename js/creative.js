(function () {
  'use strict';

  var photoRoot = document.getElementById('creativePhotoCarousel');
  if (photoRoot) {
    var slides = Array.from(photoRoot.querySelectorAll('.creative-photo-slide'));
    var dots = Array.from(photoRoot.querySelectorAll('.creative-photo-dots [role="tab"]'));
    var previous = document.getElementById('creativePhotoPrev');
    var next = document.getElementById('creativePhotoNext');
    var current = 0;

    function showPhoto(index) {
      if (!slides.length) return;
      current = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.hidden = !active;
        slide.classList.toggle('active', active);
      });
      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    }

    if (previous) previous.addEventListener('click', function () { showPhoto(current - 1); });
    if (next) next.addEventListener('click', function () { showPhoto(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showPhoto(i); });
      dot.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(i - 1); dots[(i - 1 + dots.length) % dots.length].focus(); }
        if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(i + 1); dots[(i + 1) % dots.length].focus(); }
      });
    });
    showPhoto(0);
  }

  var track = document.getElementById('musicTrack');
  var skip = document.getElementById('musicSkip');
  if (track && skip) {
    skip.addEventListener('click', function () {
      track.currentTime = Math.min((track.duration || track.currentTime + 10), track.currentTime + 10);
      track.focus();
    });
  }
})();
