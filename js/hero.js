// Stretches the "WEB DEV" title (via CSS scaleX) to fill the available
// width of its container, up to a 1.25x cap, on Home only.
// The resulting scale is remembered in bigTitleScaleX so the scroll
// parallax effect below can combine with it instead of overwriting it.
let bigTitleScaleX = 1;
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

  bigTitleScaleX = w > 0 ? Math.min(avail / w, 1.25) : 1;
  el.style.transform = `scaleX(${bigTitleScaleX})`;
}

// staggers the slide-in entrance animation for each .anim element
function runAnims() {
  document.querySelectorAll('.anim').forEach((el, i) => {
    setTimeout(() => el.classList.add('go'), i * 80);
  });
}

// modern "parallax exit" effect: each hero element fades/lifts at its own
// speed as you scroll past — the big title lingers longest (it's the
// focal point) while the smaller name/tagline lines peel away faster,
// giving the hero some depth instead of moving as one flat block.
// #bigTitle needs its own scaleX (from scaleBig above) preserved, so its
// transform is composed as "scaleX(...) translateY(...) scale(...)"
// rather than overwritten outright.
const heroLayers = [
  { selector: '#home .top-name',   rate: 1.5 },
  { selector: '#home #bigTitle',   rate: 0.6, keepScaleX: true },
  { selector: '#home .script-text', rate: 1.0 },
  { selector: '#home .bottom-row', rate: 1.7 },
];

let heroScrollTicking = false;
function fadeHeroOnScroll() {
  const hero = document.getElementById('home');
  if (!hero) return;

  const heroHeight = hero.offsetHeight;
  // fully faded by the time we've scrolled 65% of the hero's height
  const baseProgress = Math.min(window.scrollY / (heroHeight * 0.65), 1);

  heroLayers.forEach(({ selector, rate, keepScaleX }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    // .top-name/.big-title/.script-text also carry the "anim" entrance
    // animation (see runAnims above); that CSS animation's "forwards"
    // fill keeps overriding inline opacity/transform indefinitely, so it
    // has to be switched off here before this scroll effect can take over
    if (el.style.animation !== 'none') el.style.animation = 'none';

    const p = Math.min(baseProgress * rate, 1);
    const lift = `translateY(${p * -50}px) scale(${1 - p * 0.08})`;

    el.style.opacity = 1 - p;
    el.style.filter = `blur(${p * 5}px)`;
    el.style.transform = keepScaleX ? `scaleX(${bigTitleScaleX}) ${lift}` : lift;
  });
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
  // only run the scroll-fade effect immediately if the page loaded
  // already scrolled down (e.g. browser restored scroll position) — at
  // scrollY 0 it's skipped so the "anim" entrance animation gets to play
  // instead of being cut off by fadeHeroOnScroll() switching it off
  if (window.scrollY > 0) fadeHeroOnScroll();
}

window.addEventListener('load', init);
// re-run once web fonts finish loading — the title's real width can
// change after the fallback font swaps to 'Oswald'
if (document.fonts) document.fonts.ready.then(scaleBig);
window.addEventListener('resize', scaleBig);
window.addEventListener('scroll', onHeroScroll, { passive: true });
