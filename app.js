const modal = document.querySelector('#rsvpModal');
const form = document.querySelector('#rsvpForm');
const status = document.querySelector('#formStatus');
const opening = document.querySelector('#opening');
const music = document.querySelector('#backgroundMusic');
const musicToggle = document.querySelector('#musicToggle');
const musicAction = document.querySelector('#musicAction');
music.volume = 0.6;
const updateMusicButton = (playing) => {
  musicToggle.classList.toggle('is-playing', playing);
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicAction.textContent = playing ? 'Pause music' : 'Play music';
};
const playMusic = () => music.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false));
const setOpen = (open) => {
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) setTimeout(() => form.elements.name.focus(), 250);
};
document.querySelector('#openRsvp').addEventListener('click', () => setOpen(true));
document.querySelector('#detailsRsvp').addEventListener('click', () => setOpen(true));
document.querySelector('#closingRsvp').addEventListener('click', () => setOpen(true));
document.querySelector('#openInvitation').addEventListener('click', () => {
  opening.classList.add('is-hidden');
  opening.setAttribute('aria-hidden', 'true');
  playMusic();
});
musicToggle.addEventListener('click', () => music.paused ? playMusic() : music.pause());
music.addEventListener('pause', () => updateMusicButton(false));
music.addEventListener('play', () => updateMusicButton(true));
document.querySelectorAll('.motif-choice').forEach((choice) => choice.addEventListener('click', () => {
  document.querySelectorAll('.motif-choice').forEach((button) => button.classList.toggle('is-selected', button === choice));
  document.querySelector('#motifMessage').textContent = `${choice.dataset.motif} will look wonderful for this celebration.`;
}));
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
