// roww.ai: small helpers shared by every page.

// 1. Phone menu: open and close the navigation.
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// 2. Mark the current page in the menu.
(function () {
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });
})();

// 3. "Up next on the water" on the Home page: the next 3 races per team from data/schedules.json.
(function () {
  var box = document.getElementById('upnext');
  if (!box) return;

  var TEAMS = [
    { key: 'tufts', label: 'Tufts Men' },
    { key: 'stanford', label: 'Stanford Women' }
  ];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function dateLabel(r) {
    if (!r.date) return 'TBA';
    var p = r.date.split('-');
    return MONTHS[+p[1] - 1] + ' ' + (+p[2]);
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  fetch('data/schedules.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var now = today();
      box.innerHTML = TEAMS.map(function (t) {
        var races = (data.races || [])
          .filter(function (r) { return r.team === t.key && (!r.date || r.date >= now); })
          .sort(function (a, b) { return (a.date || '9999').localeCompare(b.date || '9999'); })
          .slice(0, 3);
        var sample = races.some(function (r) { return r.sample; });
        var rows = races.length ? races.map(function (r) {
          return '<div class="race"><span class="race-date">' + esc(dateLabel(r)) +
            (r.home ? '<small>Home</small>' : '') + '</span>' +
            '<span class="race-name">' + esc(r.event) +
            '<span class="race-where">' + esc(r.location || 'Location TBA') + '</span></span></div>';
        }).join('') : '<p class="sample-note">No upcoming races posted yet.</p>';
        return '<div class="upnext-card ' + t.key + '"><h3>' + t.label + '</h3>' + rows +
          (sample ? '<p class="sample-note">Sample races until the real schedule is added.</p>' : '') + '</div>';
      }).join('');
    })
    .catch(function () {
      box.querySelectorAll('.sample-note').forEach(function (p) { p.textContent = 'Schedule unavailable right now. See the Schedules page.'; });
    });
})();
