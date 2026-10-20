// Theme toggle. Remembers the choice; falls back to the OS setting.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');

  function stored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(mode) {
    if (mode) { root.setAttribute('data-theme', mode); }
    if (btn) { btn.textContent = mode === 'dark' ? '☼' : '☽'; }
  }

  var saved = stored();
  if (saved) {
    apply(saved);
  } else if (btn) {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    btn.textContent = prefersDark ? '☼' : '☽';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Footer year.
(function () {
  var el = document.getElementById('year');
  if (el) { el.textContent = new Date().getFullYear(); }
})();
