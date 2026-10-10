// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
});

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Carousel: swipe/scroll natively, arrows + dots, autoplay that pauses on hover, focus or hidden tab
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const interval = Number(carousel.dataset.interval) || 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photo ${i + 1} of ${slides.length}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function setActive(i) {
    index = i;
    dots.forEach((d, n) => d.setAttribute('aria-current', n === i ? 'true' : 'false'));
  }

  function goTo(i) {
    const n = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[n].offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    setActive(n);
  }

  // Keep dots in sync when the visitor swipes
  let scrollRaf;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== index && slides[i]) setActive(i);
    });
  }, { passive: true });

  carousel.querySelector('.prev').addEventListener('click', () => { goTo(index - 1); restart(); });
  carousel.querySelector('.next').addEventListener('click', () => { goTo(index + 1); restart(); });
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(index - 1); restart(); }
    if (e.key === 'ArrowRight') { goTo(index + 1); restart(); }
  });

  function start() { if (!reduceMotion && !timer) timer = setInterval(() => goTo(index + 1), interval); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  track.addEventListener('touchstart', stop, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  setActive(0);
  start();
});
