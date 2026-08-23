// Stretches the "WEB DEV" title (via CSS scaleX) to fill the available
// width of its container, up to a 1.25x cap, on Home only.
function scaleBig() {
  const el = document.getElementById('bigTitle');
  if (!el) return; // element only exists on the Home page

  // reset any previous scale before measuring, so scrollWidth reflects
  // the title's true unscaled width
  el.style.transform = 'none';

  const parentStyle = getComputedStyle(el.parentElement);
  const horizontalPadding = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight);
  const avail = el.parentElement.clientWidth - horizontalPadding;
  const w = el.scrollWidth;

  if (w > 0) el.style.transform = `scaleX(${Math.min(avail / w, 1.25)})`;
}

// staggers the slide-in entrance animation for each .anim element
function runAnims() {
  document.querySelectorAll('.anim').forEach((el, i) => {
    setTimeout(() => el.classList.add('go'), i * 80);
  });
}

// modern "fade away" effect: as the visitor scrolls down past the hero,
// the big title/tagline gently fades and lifts out of view instead of
// just snapping off-screen
function fadeHeroOnScroll() {
  const page = document.querySelector('#home .page');
  if (!page) return;

  const heroHeight = document.getElementById('home').offsetHeight;
  // fully faded by the time we've scrolled 70% of the hero's height
  const progress = Math.min(window.scrollY / (heroHeight * 0.7), 1);
  const fade = 1 - progress;

  page.style.opacity = fade;
  page.style.transform = `translateY(${progress * -40}px)`;
}

function init() {
  scaleBig();
  runAnims();
  fadeHeroOnScroll();
}

window.addEventListener('load', init);
// re-run once web fonts finish loading — the title's real width can
// change after the fallback font swaps to 'Oswald'
if (document.fonts) document.fonts.ready.then(scaleBig);
window.addEventListener('resize', scaleBig);
window.addEventListener('scroll', fadeHeroOnScroll, { passive: true });
