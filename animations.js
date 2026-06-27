/* animations.js — scroll reveal + skill bars */
(function() {
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('show'); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(el) { obs.observe(el); });
  }

  function initSkillBars() {
    var items = document.querySelectorAll('.skill-item[data-pct]');
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var fill = e.target.querySelector('.skill-fill');
          if (fill) {
            setTimeout(function() { fill.style.width = e.target.dataset.pct + '%'; }, 250);
          }
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    items.forEach(function(item) { obs.observe(item); });
  }

  function initScrollBar() {
    window.addEventListener('scroll', function() {
      var el = document.getElementById('progressBar');
      if (!el) return;
      var top    = document.documentElement.scrollTop;
      var total  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      el.style.width = (top / total * 100) + '%';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initReveal(); initSkillBars(); initScrollBar();
    });
  } else {
    initReveal(); initSkillBars(); initScrollBar();
  }
})();