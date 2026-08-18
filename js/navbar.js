(function() {
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('navbar');

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('li:not(.has-submenu) a').forEach(function(a) {
    a.addEventListener('click', function() {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  document.querySelectorAll('.has-submenu > a').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var isMobile = window.innerWidth <= 768;
      if (!isMobile) return;

      e.preventDefault();
      var li = a.parentElement;
      var isOpen = li.classList.contains('open');

      document.querySelectorAll('.has-submenu').forEach(function(other) {
        if (other !== li) other.classList.remove('open');
      });

      li.classList.toggle('open', !isOpen);
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.has-submenu') && !e.target.closest('.navbar')) {
      document.querySelectorAll('.has-submenu').forEach(function(li) {
        li.classList.remove('open');
      });
    }
  });
})();
