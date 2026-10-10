document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
  links.classList.toggle('open', open);
  header.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});

const revealed = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: sent through FormSubmit's AJAX endpoint so the visitor stays on
// the page and we can show FormSubmit's real answer (success or the reason it failed).
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/sales@draytontech.org';
const form = document.getElementById('contact-form');
const button = form.querySelector('button[type="submit"]');
const success = document.getElementById('form-success');
const failure = document.getElementById('form-error');

// fallback for the no-JavaScript plain POST: come back here and say thanks
form.elements._next.value = location.origin + location.pathname + '?sent=1#contact';
if (new URLSearchParams(location.search).has('sent')) success.hidden = false;

function showFailure(reason) {
  failure.textContent = 'Sorry, your message could not be sent' + (reason ? ' (' + reason + ')' : '') +
    '. Please email us directly at sales@draytontech.org.';
  failure.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  success.hidden = true;
  failure.hidden = true;
  button.disabled = true;
  button.textContent = 'Sending…';

  const data = Object.fromEntries(new FormData(form));
  delete data._next;

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok && String(result.success) === 'true') {
      form.reset();
      success.hidden = false;
      success.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      showFailure(result.message || 'error ' + response.status);
    }
  } catch (err) {
    showFailure('network error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send message';
  }
});
