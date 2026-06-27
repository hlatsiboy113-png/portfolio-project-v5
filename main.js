/* main.js — nav, theme, mobile menu */
(function() {
  /* Theme */
  window.toggleMode = function() {
    var isLight = document.body.classList.toggle('light');
    var icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = isLight ? '🌙' : '☀️';
  };

  /* Mobile nav */
  window.toggleMobileNav = function() {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (!nav) return;
    var open = nav.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', open);
  };
  window.closeMobileNav = function() {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (nav) nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', function(e) {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (!nav || !nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && btn && !btn.contains(e.target)) {
      window.closeMobileNav();
    }
  });

  /* Active nav link on scroll */
  document.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section[id], div[id]');
    var links    = document.querySelectorAll('.nav-links a');
    var scrollY  = window.scrollY + 80;
    sections.forEach(function(sec) {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        links.forEach(function(a) {
          a.classList.remove('active-link');
          if (a.getAttribute('href') === '#' + sec.id) a.classList.add('active-link');
        });
      }
    });
  }, { passive: true });
})();
