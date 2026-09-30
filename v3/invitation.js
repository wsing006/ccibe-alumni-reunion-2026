const arrival = document.getElementById('arrival');
const letter = document.getElementById('letter');
const envelope = document.getElementById('open-letter');
const closeButton = document.getElementById('close-letter');
let state = 'closed';
let timers = [];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function revealLetter() {
  state = 'open';
  letter.hidden = false;
  arrival.inert = true;
  document.body.classList.add('reading');
  letter.scrollTop = 0;
  const title = document.getElementById('letter-title');
  title.tabIndex = -1;
  title.focus({ preventScroll: true });
  timers = [];
}
envelope.addEventListener('click', () => {
  if (state !== 'closed') return;
  state = 'opening';
  envelope.disabled = true;
  envelope.setAttribute('aria-expanded', 'true');
  if (reduceMotion()) {
    revealLetter();
    return;
  }
  envelope.classList.add('unsealing');
  timers.push(window.setTimeout(() => envelope.classList.add('extracting'), 680));
  timers.push(window.setTimeout(revealLetter, 1500));
});
function closeLetter() {
  timers.forEach(window.clearTimeout);
  timers = [];
  letter.hidden = true;
  arrival.inert = false;
  document.body.classList.remove('reading');
  envelope.classList.remove('unsealing', 'extracting');
  envelope.disabled = false;
  envelope.setAttribute('aria-expanded', 'false');
  state = 'closed';
  envelope.focus({ preventScroll: true });
}
closeButton.addEventListener('click', closeLetter);
document.addEventListener('keydown', (event) => {
  if (state !== 'open') return;
  if (event.key === 'Escape') closeLetter();
  // The close control is the dialog's only interactive element.
  if (event.key === 'Tab') {
    event.preventDefault();
    closeButton.focus({ preventScroll: true });
  }
});
