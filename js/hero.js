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

// modern "zoom away" effect: as the visitor scrolls past the hero, it
// gently shrinks, fades, and softens (blur) instead of just sliding off —
// applied to the .page wrapper, not #bigTitle, so it doesn't fight with
// scaleBig()'s own scaleX transform on the title itself
let heroScrollTicking = false;
function fadeHeroOnScroll() {
  const page = document.querySelector('#home .page');
  const hero = document.getElementById('home');
  if (!page || !hero) return;

  const heroHeight = hero.offsetHeight;
  // fully faded by the time we've scrolled 65% of the hero's height
  const progress = Math.min(window.scrollY / (heroHeight * 0.65), 1);

  page.style.opacity = 1 - progress;
  page.style.transform = `scale(${1 - progress * 0.08}) translateY(${progress * -30}px)`;
  page.style.filter = `blur(${progress * 6}px)`;
}
// rAF-throttled so this runs at most once per frame instead of once per
// scroll event (scroll can fire much faster than the screen can repaint)
function onHeroScroll() {
  if (heroScrollTicking) return;
  heroScrollTicking = true;
  requestAnimationFrame(() => {
    fadeHeroOnScroll();
    heroScrollTicking = false;
  });
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
window.addEventListener('scroll', onHeroScroll, { passive: true });
