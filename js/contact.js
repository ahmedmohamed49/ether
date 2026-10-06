const form = document.querySelector('#customer-form');
const statusMessage = document.querySelector('#form-status');
const button = form.querySelector('button');
const fields = [...form.querySelectorAll('input, select')];

function showError(field, message) {
  document.querySelector(`#${field.id}-error`).textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validate(field) {
  let message = '';
  if (!field.value.trim()) message = `Please enter your ${field.dataset.label}.`;
  if (field.name === 'country' && !field.value) message = 'Please select your country.';
  if (field.type === 'email' && field.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
    message = 'Please enter a valid email address.';
  }
  showError(field, message);
  return !message;
}

fields.forEach(field => {
  field.addEventListener('blur', () => validate(field));
  field.addEventListener('input', () => {
    statusMessage.textContent = '';
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  });
});

// Demo only: no server request and no browser storage.
function checkDemo(event) {
  event.preventDefault();
  statusMessage.textContent = '';
  const valid = fields.map(validate).every(Boolean);
  if (!valid) {
    statusMessage.textContent = 'Please complete the highlighted fields.';
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  statusMessage.textContent = 'Your practice form is complete. This is a demo: no information has been sent or saved.';
}
form.addEventListener('submit', checkDemo);
button.addEventListener('click', checkDemo);
button.disabled = false;
