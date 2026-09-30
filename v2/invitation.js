const arrival = document.getElementById('arrival');
const letter = document.getElementById('letter');
const envelope = document.getElementById('envelope');
const opener = document.getElementById('open-letter');
const status = document.getElementById('opening-status');
let opening = false;
let timers = [];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function revealLetter() {
  arrival.hidden = true;
  letter.hidden = false;
  window.scrollTo(0, 0);
  const heading = document.getElementById('letter-title');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  opening = false;
  timers = [];
}
opener.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  opener.disabled = true;
  opener.setAttribute('aria-expanded', 'true');
  status.textContent = '正在为你拆开母校的来信…';
  if (reducedMotion()) {
    revealLetter();
    return;
  }
  envelope.classList.add('unsealing');
  timers.push(window.setTimeout(() => {
    envelope.classList.add('flap-open', 'extracting');
  }, 700));
  timers.push(window.setTimeout(() => {
    arrival.classList.add('departing');
  }, 1500));
  timers.push(window.setTimeout(revealLetter, 1950));
});
document.getElementById('close-letter').addEventListener('click', () => {
  timers.forEach(window.clearTimeout);
  timers = [];
  letter.hidden = true;
  arrival.hidden = false;
  arrival.classList.remove('departing');
  envelope.classList.remove('unsealing', 'flap-open', 'extracting');
  opener.disabled = false;
  opener.setAttribute('aria-expanded', 'false');
  status.textContent = '有些相逢，值得等二十年。';
  opening = false;
  window.scrollTo(0, 0);
  opener.focus({ preventScroll: true });
});
document.getElementById('return-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' });
});
