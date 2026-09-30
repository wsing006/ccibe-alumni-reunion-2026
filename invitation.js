const arrival = document.getElementById('arrival');
const letter = document.getElementById('letter');
const invitation = document.getElementById('invitation');
const opener = document.getElementById('open-letter');
let opening = false;
opener.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  opener.setAttribute('aria-expanded', 'true');
  invitation.classList.add('opening');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    arrival.hidden = true;
    letter.hidden = false;
    window.scrollTo(0, 0);
    const heading = document.getElementById('letter-title');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    opening = false;
  }, reduced ? 0 : 650);
});
document.getElementById('close-letter').addEventListener('click', () => {
  letter.hidden = true;
  arrival.hidden = false;
  invitation.classList.remove('opening');
  opener.setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0);
  opener.focus({ preventScroll: true });
});
document.getElementById('return-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
