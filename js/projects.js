(function () {
  'use strict';

  var track = document.getElementById('projectTrack');
  var prev = document.getElementById('projectPrev');
  var next = document.getElementById('projectNext');
  var caption = document.getElementById('projectCaption');
  var cards = track ? Array.from(track.querySelectorAll('.project-card')) : [];
  var current = 0;

  function announce(card) {
    if (!caption || !card) return;
    var name = card.getAttribute('aria-label') || 'project';
    caption.textContent = 'Showing ' + name + '. Use the arrows, click a side card, or use your keyboard to explore the work.';
  }

  function showProject(index, focusCard) {
    if (!cards.length) return;
    current = ((index % cards.length) + cards.length) % cards.length;
    cards.forEach(function (card, i) {
      var active = i === current;
      var left = i === ((current - 1 + cards.length) % cards.length);
      card.classList.toggle('active', active);
      card.classList.toggle('side', !active);
      card.classList.toggle('is-left', left);
      card.classList.toggle('is-right', !active && !left);
      card.setAttribute('aria-current', String(active));
      card.hidden = window.innerWidth <= 768 && !active;
    });
    announce(cards[current]);
    if (focusCard) cards[current].focus({ preventScroll: true });
  }

  if (!cards.length) return;
  if (prev) prev.addEventListener('click', function () { showProject(current - 1, false); });
  if (next) next.addEventListener('click', function () { showProject(current + 1, false); });

  cards.forEach(function (card, index) {
    card.tabIndex = 0;
    card.addEventListener('click', function (event) {
      if (card.classList.contains('side') && !event.target.closest('a')) showProject(index, true);
    });
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showProject(index, true);
      }
    });
  });

  if (track) track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showProject(current - 1, true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showProject(current + 1, true);
    }
  });

  window.addEventListener('resize', function () { showProject(current, false); });
  showProject(0, false);
})();
