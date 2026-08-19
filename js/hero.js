function scaleBig() {
  const el = document.getElementById('bigTitle');
  if (!el) return;
  el.style.transform = 'none';
  const parentStyle = getComputedStyle(el.parentElement);
  const horizontalPadding = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight);
  const avail = el.parentElement.clientWidth - horizontalPadding;
  const w = el.scrollWidth;
  if (w > 0) el.style.transform = `scaleX(${Math.min(avail / w, 1.25)})`;
}

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
if (document.fonts) document.fonts.ready.then(scaleBig);
window.addEventListener('resize', scaleBig);
