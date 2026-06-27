(function HeroSequence() {
  const layers   = document.querySelectorAll('.hero-layer');
  const videoEl  = document.getElementById('heroVideo');
  const dots     = document.querySelectorAll('.hero-dot');
  const fillEl   = document.getElementById('heroProgressFill');
  const content  = document.getElementById('heroContent');
  const label    = document.getElementById('mediaLabel');
  const labelTxt = document.getElementById('mediaLabelText');
  const SLIDE_TIME = 4000;
  const FADE_DUR   = 900;
  const VIDEO_DUR  = 7000;
  let current = 0, sliderTimer = null, videoTimer = null, videoPhase = false;

  function setLabel(txt) {
    if (!label) return;
    labelTxt.textContent = txt;
    label.classList.add('show');
  }
  function runProgress(ms) {
    if (!fillEl) return;
    fillEl.style.transition = 'none';
    fillEl.style.width = '0%';
    void fillEl.offsetWidth;
    fillEl.style.transition = 'width ' + ms + 'ms linear';
    fillEl.style.width = '100%';
  }
  function activateSlide(idx) {
    layers.forEach(function(l){ l.classList.remove('active'); });
    dots.forEach(function(d){ d.classList.remove('active'); });
    layers[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
    current = idx;
    setLabel('Scene 0' + (idx + 1));
    runProgress(SLIDE_TIME);
  }
  function startVideo() {
    if (!videoEl) { restartSlider(); return; }
    videoPhase = true;
    clearInterval(sliderTimer);
    setLabel('Showreel');
    videoEl.currentTime = 0;
    var p = videoEl.play();
    var showVideo = function() {
      videoEl.classList.add('active');
      setTimeout(function(){ layers.forEach(function(l){ l.classList.remove('active'); }); }, FADE_DUR);
    };
    if (p !== undefined) { p.then(showVideo).catch(showVideo); } else { showVideo(); }
    videoTimer = setTimeout(function() {
      videoEl.pause();
      videoEl.classList.remove('active');
      videoPhase = false;
      setTimeout(function() {
        activateSlide(0);
        sliderTimer = setInterval(nextSlide, SLIDE_TIME);
      }, FADE_DUR + 200);
    }, VIDEO_DUR);
  }
  function nextSlide() {
    if (videoPhase) return;
    var next = (current + 1) % layers.length;
    if (next === 0 && current === layers.length - 1) { startVideo(); }
    else { activateSlide(next); }
  }
  function restartSlider() {
    videoPhase = false; activateSlide(0);
    sliderTimer = setInterval(nextSlide, SLIDE_TIME);
  }
  window.goToSlide = function(idx) {
    if (videoPhase) {
      clearTimeout(videoTimer);
      if (videoEl) { videoEl.pause(); videoEl.classList.remove('active'); }
      videoPhase = false;
    }
    clearInterval(sliderTimer);
    activateSlide(idx);
    sliderTimer = setInterval(nextSlide, SLIDE_TIME);
  };
  function init() {
    if (videoEl) videoEl.load();
    setTimeout(function(){ if (content) content.classList.add('reveal-hero'); }, 500);
    activateSlide(0);
    sliderTimer = setInterval(nextSlide, SLIDE_TIME);
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();