/* ==========================================================
   AVENZA – Shared script
   ========================================================== */

var toast = document.getElementById('toast');

/* Page links used by data-go attributes */
var pages = {
  home: 'index.html',
  signup: 'signup.html',
  login: 'login.html'
};


/* ---------- Toast message ---------- */
function note(text) {
  toast.textContent = text;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 2600);
}


/* ---------- Navigation between pages ---------- */
document.addEventListener('click', function (e) {
  var target = e.target.closest('[data-go]');
  if (!target) return;

  var go = target.dataset.go;

  if (go === 'google') {
    note('Google sign-in connects here once your backend is ready.');
  } else if (go === 'forgot') {
    note('Password reset link goes here.');
  } else if (pages[go]) {
    location.href = pages[go];
  }
});

/* Let the Enter key activate links */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && e.target.matches('a[data-go]')) {
    e.target.click();
  }
});


/* ---------- Forms (sign up and log in pages) ---------- */
document.querySelectorAll('form').forEach(function (form) {

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var errorBox = form.querySelector('.err');
    var message = '';
    var inputs = form.querySelectorAll(
      'input[type=text], input[type=email], input[type=password]'
    );

    /* Clear earlier error highlights */
    inputs.forEach(function (input) {
      input.removeAttribute('aria-invalid');
    });

    /* 1. Required fields */
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value.trim()) {
        message = 'Fill in every field to continue.';
        inputs[i].setAttribute('aria-invalid', 'true');
        break;
      }
    }

    /* 2. Sign up checks */
    if (!message && form.dataset.form === 'signup') {
      if (!/^\S+@\S+\.\S+$/.test(form.email.value)) {
        message = 'Enter a valid email address.';
        form.email.setAttribute('aria-invalid', 'true');
      } else if (form.pw.value.length < 8) {
        message = 'Use at least 8 characters for your password.';
        form.pw.setAttribute('aria-invalid', 'true');
      } else if (form.pw.value !== form.pw2.value) {
        message = 'Passwords don’t match.';
        form.pw2.setAttribute('aria-invalid', 'true');
      }
    }

    errorBox.textContent = message;
    if (message) return;

    /* 3. Success */
    if (form.dataset.form === 'signup') {
      note('Account created. Log in to continue.');
      setTimeout(function () {
        location.href = pages.login;
      }, 1200);
    } else {
      note('Logged in. Dashboard goes here.');
    }
  });

});


/* ---------- Loading screen (index page only) ---------- */
var fill = document.getElementById('fill');

if (fill) {
  var progress = 0;

  var timer = setInterval(function () {
    progress += Math.random() * 14 + 6;

    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);

      setTimeout(function () {
        document.getElementById('splash').classList.add('ready');
      }, 250);
    }

    fill.style.width = progress + '%';
  }, 140);
}