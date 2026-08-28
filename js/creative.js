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
        dot.tabIndex = active ? 0 : -1;
      });
    }

    if (previous) previous.addEventListener('click', function () { showPhoto(current - 1); });
    if (next) next.addEventListener('click', function () { showPhoto(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showPhoto(i); });
      dot.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPhoto(i - 1);
          dots[(i - 1 + dots.length) % dots.length].focus();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showPhoto(i + 1);
          dots[(i + 1) % dots.length].focus();
        }
      });
    });
    showPhoto(0);
  }

  var track = document.getElementById('musicTrack');
  var skip = document.getElementById('musicSkip');
  var musicTitle = document.getElementById('musicTitle');
  var musicArtist = document.getElementById('musicArtist');
  var musicTracks = Array.from(document.querySelectorAll('.music-track'));

  function setTrack(button, shouldPlay) {
    if (!track || !button) return;
    var wasPlaying = shouldPlay || !track.paused;
    track.src = button.getAttribute('data-src') || '';
    if (musicTitle) musicTitle.textContent = button.getAttribute('data-title') || 'Selected track';
    if (musicArtist) musicArtist.textContent = button.getAttribute('data-artist') || 'Supplied archive';
    musicTracks.forEach(function (item) {
      var active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-current', active ? 'true' : 'false');
    });
    track.load();
    if (wasPlaying) {
      var promise = track.play();
      if (promise && typeof promise.catch === 'function') promise.catch(function () {});
    }
  }

  musicTracks.forEach(function (button) {
    button.addEventListener('click', function () { setTrack(button, false); });
    button.addEventListener('keydown', function (event) {
      var index = musicTracks.indexOf(button);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        var previousButton = musicTracks[(index - 1 + musicTracks.length) % musicTracks.length];
        previousButton.focus();
        setTrack(previousButton, false);
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        var nextButton = musicTracks[(index + 1) % musicTracks.length];
        nextButton.focus();
        setTrack(nextButton, false);
      }
    });
  });

  if (track && skip) {
    skip.addEventListener('click', function () {
      track.currentTime = Math.min((track.duration || track.currentTime + 10), track.currentTime + 10);
      track.focus();
    });
  }
})();
