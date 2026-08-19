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

function init() {
  scaleBig();
  runAnims();
}

window.addEventListener('load', init);
// re-run once web fonts finish loading — the title's real width can
// change after the fallback font swaps to 'Oswald'
if (document.fonts) document.fonts.ready.then(scaleBig);
window.addEventListener('resize', scaleBig);
