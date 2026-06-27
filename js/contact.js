/* contact.js — form validation + success state + lofi sound */
(function() {
  function playSuccessSound() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var notes = [523, 659, 784];
      notes.forEach(function(freq, i) {
        var osc  = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.4);
      });
    } catch(e) {}
  }

  window.sendMessage = function() {
    var name  = (document.getElementById('contactName')  || {}).value || '';
    var email = (document.getElementById('contactEmail') || {}).value || '';
    var msg   = (document.getElementById('contactMsg')   || {}).value || '';
    name = name.trim(); email = email.trim(); msg = msg.trim();

    if (!name || !email || !msg) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    var form    = document.getElementById('contactFormFields');
    var success = document.getElementById('formSuccess');
    var nameEl  = document.getElementById('successName');

    if (form)    form.style.display = 'none';
    if (success) success.classList.add('show');
    if (nameEl)  nameEl.textContent = name.split(' ')[0];
    playSuccessSound();

    /* Reset values so they're empty if someone hides/shows the form */
    setTimeout(function() {
      if (document.getElementById('contactName'))  document.getElementById('contactName').value  = '';
      if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
      if (document.getElementById('contactMsg'))   document.getElementById('contactMsg').value   = '';
    }, 4000);
  };
})();