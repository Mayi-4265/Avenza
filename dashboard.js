/* ==========================================================
   AVENZA – Dashboard script
   ========================================================== */

/* ---------- Sample data (replace with real data later) ---------- */
var navItems = [
  ['🏠', 'Dashboard'], ['🎓', 'Scholarships'], ['📄', 'My Applications'], ['🔔', 'Notifications'], ['-'],
  ['👤', 'Profile'], ['ℹ️', 'About Avenza'], ['✉️', 'Contact'], ['❓', 'FAQ’s'], ['⚙️', 'Settings']
];

var applications = [
  { name: 'Academic Excellence Scholarship', info: 'Academic | University of Batangas', status: 'Approved', date: 'Sep 10, 2026' },
  { name: 'Financial Assistance Grant', info: 'Financial Assistance | UB', status: 'Pending', date: 'Sep 15, 2026' },
  { name: 'STEM Scholarship Program', info: 'Merit-Based | UB', status: 'Rejected', date: 'Aug 26, 2026' }
];

var scholarships = [
  { name: 'Academic Excellence Scholarship', type: 'Academic', who: 'Undergraduate Students', deadline: 'Oct 30, 2026' },
  { name: 'Financial Assistance Grant', type: 'Financial Assistance', who: 'Students with financial needs', deadline: 'Nov 15, 2026' },
  { name: 'STEM Scholarship Program', type: 'Merit-Based', who: 'STEM students (IT, CS, etc.)', deadline: 'Dec 05, 2026' }
];

var announcements = [
  ['New Scholarship Available', 'The Academic Excellence Scholarship is now open...', 'Sep 22, 2026'],
  ['Application Deadline Reminder', 'The Financial Assistance Scholarship closes on...', 'Sep 20, 2026'],
  ['Application Period Open', 'Applications for the Student Support Grant are...', 'Sep 18, 2026'],
  ['Document Submission Reminder', 'Please make sure all required documents are...', 'Sep 16, 2026']
];

var deadlines = [
  ['Academic Excellence Scholarship', 'Oct 30, 2026', 'Closing'],
  ['Financial Assistance Grant', 'Nov 15, 2026', 'Open'],
  ['STEM Scholarship Program', 'Dec 05, 2026', 'Open']
];

var quickLinks = ['🔍 Search Scholarships', '📘 Scholarship Guide', '📂 My Applications', '💬 Help & FAQ’s'];


/* ---------- Helpers ---------- */
var $ = function (id) { return document.getElementById(id); };
var toast = $('toast');

function note(text) {
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2400);
}

function count(status) {
  return applications.filter(function (a) { return a.status === status; }).length;
}


/* ---------- Sidebar ---------- */
$('nav').innerHTML = navItems.map(function (n, i) {
  if (n[0] === '-') return '<hr>';
  return '<button class="' + (i === 0 ? 'on' : '') + '">' + n[0] + ' ' + n[1] + '</button>';
}).join('');

$('nav').addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (b && !b.classList.contains('on')) note(b.textContent.trim().slice(2) + ' page is coming soon.');
});


/* ---------- Stats ---------- */
$('stats').innerHTML = [
  ['Total Applications', applications.length, '#5e3fc4'],
  ['Approved', count('Approved'), '#1f9d55'],
  ['Pending', count('Pending'), '#b7791f'],
  ['Rejected', count('Rejected'), '#d6336c']
].map(function (s) {
  return '<div class="stat" style="--c:' + s[2] + '"><small>' + s[0] + '</small><b>' + s[1] + '</b><a href="#">View All</a></div>';
}).join('');


/* ---------- Application status ---------- */
$('apps').innerHTML = applications.map(function (a) {
  return '<div class="row"><div><b>' + a.name + '</b><small>' + a.info + '</small></div>' +
         '<div style="text-align:right"><span class="tag ' + a.status + '">' + a.status + '</span><br><small>' + a.date + '</small></div></div>';
}).join('');


/* ---------- Recommended scholarships (with search) ---------- */
function renderRecs(query) {
  var q = (query || '').toLowerCase().trim();
  var list = scholarships.filter(function (s) {
    return (s.name + ' ' + s.type + ' ' + s.who).toLowerCase().indexOf(q) > -1;
  });

  $('recs').innerHTML = list.map(function (s) {
    return '<article class="rec"><span class="tag Open" style="justify-self:start">Open</span>' +
           '<h3>' + s.name + '</h3><small>' + s.type + '</small><small>For: ' + s.who + '</small>' +
           '<small>Deadline: ' + s.deadline + '</small><button data-name="' + s.name + '">View Details</button></article>';
  }).join('');

  $('empty').hidden = list.length > 0;
}

renderRecs();
$('search').addEventListener('input', function (e) { renderRecs(e.target.value); });
$('recs').addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (b) note('Details for “' + b.dataset.name + '” coming soon.');
});


/* ---------- Announcements, deadlines, quick access ---------- */
$('news').innerHTML = announcements.map(function (n) {
  return '<li><b>' + n[0] + '</b>' + n[1] + '<br><small>' + n[2] + '</small></li>';
}).join('');

$('deadlines').innerHTML = deadlines.map(function (d) {
  return '<li class="dl"><div><b>' + d[0] + '</b><small>' + d[1] + '</small></div><span class="tag ' + d[2] + '">' + d[2] + '</span></li>';
}).join('');

$('quick').innerHTML = quickLinks.map(function (q) { return '<button>' + q + '</button>'; }).join('');
$('quick').addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (b) note(b.textContent.slice(3) + ' is coming soon.');
});

$('bell').addEventListener('click', function () { note('You have 4 new announcements.'); });