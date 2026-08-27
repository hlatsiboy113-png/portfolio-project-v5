(function () {
  'use strict';

  var fields = [
    { id: 'contactName', errorId: 'contactNameError', validate: function (value) { return value.length > 0 ? '' : 'Please enter your name.'; } },
    { id: 'contactEmail', errorId: 'contactEmailError', validate: function (value) {
      if (!value) return 'Please enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.';
    } },
    { id: 'contactMsg', errorId: 'contactMsgError', validate: function (value) {
      if (!value) return 'Please add a short message.';
      return value.length >= 20 ? '' : 'Please use at least 20 characters so I have enough context.';
    } }
  ];

  function getField(config) {
    return document.getElementById(config.id);
  }

  function setError(config, message) {
    var input = getField(config);
    var error = document.getElementById(config.errorId);
    if (!input || !error) return !message;
    input.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.classList.toggle('show', Boolean(message));
    return !message;
  }

  function validateField(config) {
    var input = getField(config);
    var value = input ? input.value.trim() : '';
    return setError(config, config.validate(value));
  }

  function clearErrors() {
    fields.forEach(function (config) { setError(config, ''); });
  }

  function initInlineValidation() {
    fields.forEach(function (config) {
      var input = getField(config);
      if (!input) return;
      input.addEventListener('blur', function () { validateField(config); });
      input.addEventListener('input', function () {
        if (input.classList.contains('has-error')) validateField(config);
      });
    });
  }

  window.sendMessage = function () {
    var valid = fields.map(validateField).every(Boolean);
    var form = document.getElementById('contactFormFields');
    var success = document.getElementById('formSuccess');
    var nameEl = document.getElementById('successName');
    if (!valid) {
      var firstInvalid = fields.map(getField).find(function (input) { return input && input.getAttribute('aria-invalid') === 'true'; });
      if (firstInvalid) firstInvalid.focus();
      return false;
    }

    var name = (getField(fields[0]).value || '').trim().split(/\s+/)[0] || 'there';
    if (form) form.hidden = true;
    if (success) success.classList.add('show');
    if (nameEl) nameEl.textContent = name;
    return true;
  };

  window.resetContactForm = function () {
    var form = document.getElementById('contactFormFields');
    var success = document.getElementById('formSuccess');
    if (form) form.hidden = false;
    if (success) success.classList.remove('show');
    clearErrors();
    var name = document.getElementById('contactName');
    if (name) name.focus();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initInlineValidation);
  else initInlineValidation();
})();
