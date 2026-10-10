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

// Contact form (FormSubmit): come back to this page after sending, and say thanks.
const form = document.getElementById('contact-form');
form.elements._next.value = location.origin + location.pathname + '?sent=1#contact';
if (new URLSearchParams(location.search).has('sent')) {
  document.getElementById('form-success').hidden = false;
}
form.addEventListener('submit', () => {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Sending…';
});
// Re-enable the button if the visitor comes back with the browser's Back button.
window.addEventListener('pageshow', () => {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = false;
  button.textContent = 'Send message';
});
