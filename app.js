const modal = document.querySelector('#rsvpModal');
const form = document.querySelector('#rsvpForm');
const status = document.querySelector('#formStatus');
const opening = document.querySelector('#opening');
const setOpen = (open) => {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) setTimeout(() => form.elements.name.focus(), 250);
};
document.querySelector('#openRsvp').addEventListener('click', () => setOpen(true));
document.querySelector('#detailsRsvp').addEventListener('click', () => setOpen(true));
document.querySelector('#openInvitation').addEventListener('click', () => {
  opening.classList.add('is-hidden');
  opening.setAttribute('aria-hidden', 'true');
});
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const endpoint = window.RSVP_CONFIG?.endpoint?.trim();
  const submit = form.querySelector('.submit');
  submit.disabled = true;
  status.textContent = 'Sending your RSVP…';
  try {
    if (endpoint) {
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }) });
    } else {
      console.info('RSVP preview:', data);
    }
    status.textContent = endpoint ? 'Thank you — your RSVP has been sent.' : 'Thank you! Preview mode is on; add an endpoint in config.js to save responses.';
    form.reset();
  } catch {
    status.textContent = 'We could not send your RSVP. Please try again.';
  } finally { submit.disabled = false; }
});
