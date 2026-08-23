// Fades + slides any element with class "reveal" into view once it
// scrolls into the viewport. Uses IntersectionObserver (cheap, no
// scroll-event polling) and stops watching each element once it has
// played, so it only ever runs once per element.
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();
