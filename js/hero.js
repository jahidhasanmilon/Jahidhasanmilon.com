function scaleBig() {
  const el = document.getElementById('bigTitle');
  if (!el) return;
  const padding = window.innerWidth <= 600 ? 56 : window.innerWidth <= 900 ? 96 : 144;
  const avail = el.parentElement.clientWidth - padding;
  const prev = parseFloat(el.style.transform?.match(/scaleX\((.+)\)/)?.[1]) || 1;
  const w = el.scrollWidth / prev;
  if (w > 0) el.style.transform = `scaleX(${Math.min(avail / w, 1.25)})`;
}

function runAnims() {
  document.querySelectorAll('.anim').forEach((el, i) => {
    setTimeout(() => el.classList.add('go'), i * 80);
  });
}

window.addEventListener('load', () => { scaleBig(); runAnims(); });
window.addEventListener('resize', scaleBig);
