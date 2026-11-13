// roww.ai: small helpers shared by every page.
// Content lives in the data/ folder. This file only turns that content into page sections.

(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var TEAMS = {
    tufts: { label: 'Tufts Men', long: "Tufts Men's Rowing" },
    stanford: { label: 'Stanford Women', long: "Stanford Women's Rowing" }
  };

  // ---------- small helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // **bold** and [placeholder] in data files
  function rich(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]/g, '<mark class="todo">[$1]</mark>');
  }
  function photo(name, alt, sizes, extra) {
    // A name with a file extension (for example "race-day.jpg") is used as-is: handy for photos uploaded on GitHub.
    if (/\.[a-z0-9]+$/i.test(name)) {
      return '<img src="images/' + esc(name) + '" alt="' + esc(alt) + '"' + (extra || '') + '>';
    }
    return '<img src="images/' + esc(name) + '-sm.webp" srcset="images/' + esc(name) + '-sm.webp 800w, images/' +
      esc(name) + '-lg.webp 1400w" sizes="' + (sizes || '100vw') + '" alt="' + esc(alt) + '"' + (extra || '') + '>';
  }
  function getJSON(path) {
    return fetch(path).then(function (r) { if (!r.ok) throw new Error(path); return r.json(); });
  }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parts(iso) { var p = iso.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function weekday(iso) { var p = parts(iso); return DAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()]; }
  function shortDate(r) {
    if (!r.date) return 'TBA';
    var a = parts(r.date), s = MONTHS[a.m - 1] + ' ' + a.d;
    if (r.end_date) { var b = parts(r.end_date); s += '–' + (b.m === a.m ? b.d : MONTHS[b.m - 1] + ' ' + b.d); }
    return s;
  }
  function clock(hhmm) {
    var p = hhmm.split(':'), h = +p[0], m = p[1];
    return ((h + 11) % 12 + 1) + ':' + m + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function timeLine(r) {
    if (!r.time_et) return 'Time TBA';
    var s = clock(r.time_et) + ' ET';
    if (r.team === 'stanford') {
      var p = r.time_et.split(':'), h = (+p[0] + 21) % 24; // Pacific is 3 hours behind Eastern all year
      s += ' · ' + clock(String(h).padStart(2, '0') + ':' + p[1]) + ' PT';
    }
    return s;
  }
  function isPast(r, today) { return r.date && (r.end_date || r.date) < today; }

  // ---------- 1. phone menu ----------
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---------- 2. mark the current page in the menu ----------
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || href === here.replace(/\.html$/, '')) a.setAttribute('aria-current', 'page');
  });

  // ---------- 3. Home: "Up next on the water" ----------
  var upnext = document.getElementById('upnext');
  if (upnext) {
    getJSON('data/schedules.json').then(function (data) {
      var today = todayISO();
      upnext.innerHTML = Object.keys(TEAMS).map(function (key) {
        var races = data.races.filter(function (r) { return r.team === key && !isPast(r, today); })
          .sort(function (a, b) { return a.date.localeCompare(b.date); }).slice(0, 3);
        var rows = races.map(function (r) {
          return '<div class="race"><span class="race-date">' + esc(shortDate(r)) + '<small>' + esc(weekday(r.date)) +
            (r.venue === 'home' ? ' · Home' : '') + '</small></span><span class="race-name">' + esc(r.event) +
            '<span class="race-where">' + esc(r.location) + ' · ' + esc(timeLine(r)) + '</span></span></div>';
        }).join('');
        if (!rows) rows = '<p class="sample-note">' + esc((data.notes && data.notes[key]) || 'No upcoming races posted yet.') + '</p>';
        return '<div class="upnext-card ' + key + '"><h3>' + TEAMS[key].label + '</h3>' + rows + '</div>';
      }).join('');
    }).catch(function () {
      upnext.innerHTML = '<p>Schedules are unavailable right now. Try the <a href="schedules.html">Schedules page</a>.</p>';
    });
  }

  // ---------- 4. Schedules page ----------
  var sched = document.getElementById('schedule');
  if (sched) {
    getJSON('data/schedules.json').then(function (data) {
      var today = todayISO();
      sched.innerHTML = Object.keys(TEAMS).map(function (key) {
        var races = data.races.filter(function (r) { return r.team === key; })
          .sort(function (a, b) { return a.date.localeCompare(b.date); });
        var lastSeason = '';
        var rows = races.map(function (r) {
          var p = parts(r.date), season = (p.m >= 7 ? 'Fall ' : 'Spring ') + p.y, head = '';
          if (season !== lastSeason) { head = '<h3 class="season">' + season + '</h3>'; lastSeason = season; }
          var past = isPast(r, today);
          return head + '<article class="sched-row' + (past ? ' is-past' : '') + '">' +
            '<div class="sched-date"><span class="d">' + esc(shortDate(r)) + '</span><span class="w">' + esc(weekday(r.date)) + '</span></div>' +
            '<div class="sched-body"><h4>' + esc(r.event) + '</h4>' +
            '<p class="sched-where">' + esc(r.location) + '</p>' +
            '<p class="sched-meta"><span class="chip chip-' + esc(r.venue) + '">' + esc(r.venue.charAt(0).toUpperCase() + r.venue.slice(1)) + '</span>' +
            (past ? '<span class="chip chip-final">Final</span>' : '<span class="sched-time">' + esc(timeLine(r)) + '</span>') + '</p>' +
            (past && r.result ? '<p class="sched-result">' + esc(r.result) + '</p>' : '') +
            (past && !r.result ? '<p class="sched-result muted">Result coming soon</p>' : '') +
            (r.link ? '<p><a href="' + esc(r.link) + '" target="_blank" rel="noopener">Race recap<span class="visually-hidden"> (opens the team site)</span> →</a></p>' : '') +
            '</div></article>';
        }).join('');
        var note = data.notes && data.notes[key] ? '<p class="sched-note">' + esc(data.notes[key]) + '</p>' : '';
        return '<section class="sched-col ' + key + '" data-team="' + key + '" aria-labelledby="h-' + key + '">' +
          '<header class="sched-head"><h2 id="h-' + key + '">' + TEAMS[key].long + '</h2>' +
          '<button type="button" class="btn btn-outline btn-small" data-ics="' + key + '">Add to my calendar</button></header>' +
          rows + note +
          '<p class="sched-source">Source: <a href="' + esc(data.sources[key]) + '" target="_blank" rel="noopener">official ' + TEAMS[key].long + ' schedule</a></p>' +
          '</section>';
      }).join('');

      // filter buttons
      var filters = document.querySelectorAll('[data-filter]');
      filters.forEach(function (f) {
        f.addEventListener('click', function () {
          var want = f.getAttribute('data-filter');
          filters.forEach(function (g) { g.setAttribute('aria-pressed', g === f ? 'true' : 'false'); });
          sched.classList.toggle('single', want !== 'both');
          sched.querySelectorAll('.sched-col').forEach(function (c) { c.hidden = want !== 'both' && c.getAttribute('data-team') !== want; });
        });
      });

      // calendar downloads
      sched.querySelectorAll('[data-ics]').forEach(function (b) {
        b.addEventListener('click', function () { downloadICS(b.getAttribute('data-ics'), data.races); });
      });
      var upd = document.getElementById('sched-updated');
      if (upd && data.updated) { var u = parts(data.updated); upd.textContent = 'Last checked against the team sites on ' + MONTHS[u.m - 1] + ' ' + u.d + ', ' + u.y + '.'; }
    }).catch(function () {
      sched.innerHTML = '<p>Schedules are unavailable right now. Please try again in a minute.</p>';
    });
  }

  function downloadICS(key, races) {
    function d8(iso) { return iso.replace(/-/g, ''); }
    function nextDay(iso) { var p = parts(iso), t = new Date(Date.UTC(p.y, p.m - 1, p.d + 1)); return t.toISOString().slice(0, 10).replace(/-/g, ''); }
    function icsText(s) { return String(s || '').replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n'); }
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//roww.ai//Race schedule//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:' + TEAMS[key].long + ' (roww.ai)'];
    races.filter(function (r) { return r.team === key; }).forEach(function (r) {
      lines.push('BEGIN:VEVENT', 'UID:' + key + '-' + r.date + '-' + r.event.replace(/[^a-z0-9]/gi, '').toLowerCase() + '@roww.ai', 'DTSTAMP:' + stamp);
      if (r.time_et && !r.end_date) {
        var h = +r.time_et.split(':')[0], m = r.time_et.split(':')[1];
        lines.push('DTSTART;TZID=America/New_York:' + d8(r.date) + 'T' + String(h).padStart(2, '0') + m + '00',
          'DTEND;TZID=America/New_York:' + d8(r.date) + 'T' + String(Math.min(h + 3, 23)).padStart(2, '0') + m + '00');
      } else {
        lines.push('DTSTART;VALUE=DATE:' + d8(r.date), 'DTEND;VALUE=DATE:' + nextDay(r.end_date || r.date));
      }
      lines.push('SUMMARY:' + icsText(TEAMS[key].label + ': ' + r.event), 'LOCATION:' + icsText(r.location),
        'DESCRIPTION:' + icsText((r.time_et ? '' : 'Start time TBA. ') + 'Schedule from roww.ai'), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    var blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roww-' + key + '-rowing.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  // ---------- 5. Rower pages (Parker, Evie) ----------
  var rower = document.querySelector('[data-rower]');
  if (rower) {
    getJSON('data/' + rower.getAttribute('data-rower') + '.json').then(function (p) {
      function timeline(block, accent) {
        return '<section class="timeline ' + accent + '"><h2>' + esc(block.title) + '</h2><ol>' +
          block.items.map(function (i) {
            return '<li><span class="when">' + esc(i.when) + '</span><span class="what">' + rich(i.text) + '</span></li>';
          }).join('') + '</ol>' +
          (block.link ? '<p><a href="' + esc(block.link.url) + '" target="_blank" rel="noopener">' + esc(block.link.text) + ' →</a></p>' : '') +
          '</section>';
      }
      rower.innerHTML =
        '<section class="rower-hero"><div class="wrap">' +
          '<div class="rower-photo">' + photo(p.hero.image, p.hero.alt, '(min-width: 900px) 600px, 100vw', ' fetchpriority="high" style="object-position:' + esc(p.hero.focus || '50% 50%') + '"') + '</div>' +
          '<div class="rower-copy">' +
            '<span class="tag tag-' + esc(p.team_key) + '">' + esc(p.team) + '</span>' +
            '<h1>' + esc(p.name) + '</h1>' +
            '<p class="rower-sub">' + esc(p.subtitle) + '</p>' +
            '<ul class="facts">' + p.facts.map(function (f) {
              return '<li><span class="v">' + esc(f.value) + '</span><span class="l">' + esc(f.label) + '</span></li>';
            }).join('') + '</ul>' +
            '<p class="rower-intro">' + rich(p.intro) + '</p>' +
          '</div></div></section>' +
        '<div class="wrap timelines">' + timeline(p.school, p.team_key) + timeline(p.youth, 'youth') + '</div>' +
        '<section class="wrap gallery" aria-labelledby="gal-h"><h2 id="gal-h">Gallery</h2><ul>' +
          p.gallery.map(function (g) { return '<li>' + photo(g.image, g.alt, '(min-width: 900px) 300px, 50vw', ' loading="lazy"') + '</li>'; }).join('') +
        '</ul></section>';
    }).catch(function () {
      rower.innerHTML = '<div class="wrap"><p>This page is unavailable right now. Please try again in a minute.</p></div>';
    });
  }

  // ---------- 6. What we offer ----------
  var offers = document.getElementById('offerings');
  if (offers) {
    getJSON('data/offerings.json').then(function (d) {
      offers.innerHTML = d.offerings.map(function (o) {
        var pic = o.image ? photo(o.image, o.alt, '(min-width: 900px) 600px, 100vw', ' loading="lazy"')
          : '<div class="placeholder">' + esc(o.placeholder || 'Photo coming soon') + '</div>';
        var external = /^https?:/.test(o.button_link);
        return '<section class="offer" id="' + esc(o.id) + '" aria-labelledby="o-' + esc(o.id) + '">' +
          '<div class="offer-photo">' + pic + '</div>' +
          '<div class="offer-copy"><h2 id="o-' + esc(o.id) + '">' + esc(o.title) + '</h2>' +
          '<p class="offer-headline">' + esc(o.headline) + '</p><p>' + rich(o.text) + '</p>' +
          '<p><a class="btn btn-crimson" href="' + esc(o.button_link) + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(o.button_text) + '</a></p>' +
          '</div></section>';
      }).join('');
      if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
    }).catch(function () {
      offers.innerHTML = '<p>This section is unavailable right now. Please try again in a minute.</p>';
    });
  }
})();
