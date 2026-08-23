// Navbar behavior shared by every page: hamburger toggle, closing the
// mobile menu after a link click, and mobile submenu open/close.
(function() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('navbar');

  // open/close the mobile slide-out menu
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // clicking a plain nav link (not one with a submenu) closes the mobile menu
  nav.querySelectorAll('li:not(.has-submenu) a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  // on mobile, tapping a "Work"/"Projects"-style link toggles its submenu
  // instead of navigating (desktop still uses the CSS :hover submenu)
  document.querySelectorAll('.has-submenu > a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 768;
      if (!isMobile) return;

      e.preventDefault();
      const li = a.parentElement;
      const isOpen = li.classList.contains('open');

      // only one submenu open at a time
      document.querySelectorAll('.has-submenu').forEach((other) => {
        if (other !== li) other.classList.remove('open');
      });

      li.classList.toggle('open', !isOpen);
    });
  });

  // tapping/clicking anywhere outside the navbar closes any open submenu
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-submenu') && !e.target.closest('.navbar')) {
      document.querySelectorAll('.has-submenu').forEach((li) => {
        li.classList.remove('open');
      });
    }
  });

  // keep the footer's copyright year current without a yearly manual edit
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
})();
