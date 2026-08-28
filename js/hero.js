(function () {
  const layers = Array.from(document.querySelectorAll('.hero-layer'));
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  const fillEl = document.getElementById('heroProgressFill');
  const content = document.getElementById('heroContent');
  const label = document.getElementById('mediaLabel');
  const labelTxt = document.getElementById('mediaLabelText');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scenes = [
    { label: 'Scene 01 · Origin', duration: 1500 },
    { label: 'Scene 02 · Family · Pink chapter', duration: 1500 },
    { label: 'Scene 03 · Personal identity', duration: 1500 },
    { label: 'Scene 04 · FNB · Professional identity', duration: 1800 },
    { label: 'Scene 05 · Creative identity', duration: 1800 },
    { label: 'Scene 06 · Johannesburg · Braam', duration: 1500 },
    { label: 'Scene 07 · Entering iHub', duration: 1800 },
    { label: 'Scene 08 · Community · Learning', duration: 3000 },
    { label: 'Scene 09 · Technical growth', duration: 4000 },
    { label: 'Scene 10 · Current chapter', duration: 5000 }
  ];

  let current = 0;
  let timer = null;
  let progressTimer = null;
  let stopped = false;

  function setLabel(text) {
    if (!label || !labelTxt) return;
    labelTxt.textContent = text;
    label.classList.add('show');
  }

  function resetProgress(duration) {
    if (!fillEl) return;
    window.clearTimeout(progressTimer);
    fillEl.style.transition = 'none';
    fillEl.style.width = '0%';
    if (reduceMotion) return;
    void fillEl.offsetWidth;
    fillEl.style.transition = 'width ' + duration + 'ms linear';
    progressTimer = window.setTimeout(function () {
      fillEl.style.width = '100%';
    }, 20);
  }

  function updateDots(index) {
    dots.forEach(function (dot, dotIndex) {
      const active = dotIndex === index;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function activateSlide(index, shouldSchedule) {
    if (!layers[index]) return;
    layers.forEach(function (layer, layerIndex) {
      layer.classList.toggle('active', layerIndex === index);
    });
    current = index;
    updateDots(index);
    setLabel(scenes[index] ? scenes[index].label : 'Scene ' + String(index + 1).padStart(2, '0'));

    const duration = scenes[index] ? scenes[index].duration : 1800;
    resetProgress(duration);

    if (index === layers.length - 1) {
      stopped = true;
      window.clearTimeout(timer);
      if (fillEl && !reduceMotion) {
        window.setTimeout(function () { fillEl.style.width = '100%'; }, 25);
      }
      return;
    }

    stopped = false;
    if (shouldSchedule && !reduceMotion) {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { activateSlide(index + 1, true); }, duration);
    }
  }

  window.goToSlide = function (index) {
    const safeIndex = Math.max(0, Math.min(layers.length - 1, Number(index) || 0));
    window.clearTimeout(timer);
    stopped = safeIndex === layers.length - 1;
    activateSlide(safeIndex, !reduceMotion && !stopped);
  };

  function init() {
    if (!layers.length) return;
    layers.forEach(function (layer) { layer.classList.remove('active'); });
    activateSlide(0, !reduceMotion);
    window.setTimeout(function () {
      if (content) content.classList.add('reveal-hero');
    }, reduceMotion ? 0 : 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
