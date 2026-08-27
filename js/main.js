(function () {
  'use strict';

  /* Theme */
  function syncThemeIcon(isLight) {
    var icon = document.getElementById('themeIcon');
    var button = document.querySelector('.btn-theme');
    if (icon) icon.textContent = isLight ? '☾' : '☼';
    if (button) button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  window.toggleMode = function () {
    var isLight = document.body.classList.toggle('light');
    try { localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark'); } catch (e) {}
    syncThemeIcon(isLight);
  };

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('portfolio-theme'); } catch (e) {}
    var isLight = stored === 'light';
    if (stored === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) isLight = true;
    document.body.classList.toggle('light', isLight);
    syncThemeIcon(isLight);
  }

  /* Mobile nav */
  window.toggleMobileNav = function () {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (!nav) return;
    var open = nav.classList.toggle('open');
    if (btn) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
  };

  window.closeMobileNav = function () {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (nav) nav.classList.remove('open');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open navigation menu');
    }
  };

  /* Resume menu */
  function initResumeMenu() {
    var menu = document.getElementById('resumeMenu');
    var trigger = document.getElementById('resumeTrigger');
    var panel = document.getElementById('resumePanel');
    if (!menu || !trigger || !panel) return;

    function closeMenu(restoreFocus) {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    }

    trigger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        var first = panel.querySelector('[role="menuitem"]');
        if (first) first.focus();
      }
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });

    panel.addEventListener('keydown', function (event) {
      var items = Array.from(panel.querySelectorAll('[role="menuitem"]'));
      var index = items.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        items[(index + 1) % items.length].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target)) closeMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
  }

  document.addEventListener('click', function (event) {
    var nav = document.getElementById('mobileNav');
    var btn = document.getElementById('hamburgerBtn');
    if (nav && nav.classList.contains('open') && !nav.contains(event.target) && btn && !btn.contains(event.target)) {
      window.closeMobileNav();
    }
  });

  /* Active nav link on scroll */
  document.addEventListener('scroll', function () {
    var sections = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-links a');
    var scrollY = window.scrollY + 80;
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        links.forEach(function (link) {
          link.classList.toggle('active-link', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }, { passive: true });

  function init() {
    initTheme();
    initResumeMenu();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
