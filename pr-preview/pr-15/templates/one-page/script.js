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

// Escape closes the mobile menu and returns focus to the menu button
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && links.classList.contains('open')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.focus();
  }
});

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Carousel: swipe/scroll natively, arrows + dots, autoplay that pauses on hover, focus or hidden tab.
// Loops seamlessly: a copy of the last slide sits before the first and a copy of the first after
// the last. Wrapping scrolls one step onto the copy, then jumps invisibly to the real slide.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const count = slides.length;
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const interval = Number(carousel.dataset.interval) || 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let paused = reduceMotion; // the visitor's choice; reduced-motion users never get autoplay

  const makeClone = (slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    clone.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
    return clone;
  };
  track.prepend(makeClone(slides[count - 1]));
  track.append(makeClone(slides[0]));

  // Track positions: 0 = copy of last, 1..count = real slides, count + 1 = copy of first
  const width = () => track.clientWidth;
  const position = () => track.scrollLeft / width();

  function jump(pos) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = pos * width();
    track.style.scrollBehavior = '';
  }

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photo ${i + 1} of ${count}`);
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  // Pause / play: WCAG 2.2.2 requires a way to stop content that moves on its own
  const pauseBtn = document.createElement('button');
  pauseBtn.type = 'button';
  pauseBtn.className = 'carousel-pause';
  const showPauseState = () => {
    pauseBtn.textContent = paused ? 'Play' : 'Pause';
    pauseBtn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  };
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    showPauseState();
    if (paused) stop(); else restart();
  });
  showPauseState();
  if (!reduceMotion) dotsWrap.after(pauseBtn);

  function setActive(i) {
    index = (i + count) % count;
    dots.forEach((d, n) => d.setAttribute('aria-current', n === index ? 'true' : 'false'));
  }

  // Go to real slide i the short way round. The track may first hop to an identical-looking
  // spot (copy <-> real) so the scroll never sweeps past every photo.
  let animating = false;
  let goal = null;
  function goTo(i) {
    const real = ((i % count) + count) % count;
    const cur = position();
    const targets = [real + 1];
    if (real === 0) targets.push(count + 1);
    if (real === count - 1) targets.push(0);
    let best = { shift: 0, to: real + 1, dist: Infinity };
    [0, count, -count].forEach((shift) => {
      const from = cur + shift;
      if (from < 0 || from > count + 1) return;
      targets.forEach((to) => {
        const dist = Math.abs(to - from);
        if (dist < best.dist) best = { shift, to, dist };
      });
    });
    animating = best.dist > 0.01;
    goal = best.to;
    if (best.shift) jump(cur + best.shift);
    track.scrollTo({ left: best.to * width(), behavior: reduceMotion ? 'auto' : 'smooth' });
    setActive(real);
  }

  // Once scrolling stops, swap a copy for its real slide
  function settle() {
    // Ignore the stop event from the hop itself; wait until we reach the goal
    if (animating && Math.abs(position() - goal) > 0.05) return;
    animating = false;
    const pos = Math.round(position());
    if (pos === 0) jump(count);
    else if (pos === count + 1) jump(1);
    setActive(Math.round(position()) - 1);
  }

  // Keep dots in sync while swiping
  let scrollRaf;
  let settleTimer;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollRaf);
    if (!animating) scrollRaf = requestAnimationFrame(() => setActive(Math.round(position()) - 1));
    if (!('onscrollend' in window)) {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 150);
    }
  }, { passive: true });
  track.addEventListener('scrollend', settle);
  window.addEventListener('resize', () => jump(index + 1));

  carousel.querySelector('.prev').addEventListener('click', () => { goTo(index - 1); restart(); });
  carousel.querySelector('.next').addEventListener('click', () => { goTo(index + 1); restart(); });
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(index - 1); restart(); }
    if (e.key === 'ArrowRight') { goTo(index + 1); restart(); }
  });

  function start() { if (!paused && !timer) timer = setInterval(() => goTo(index + 1), interval); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  // A swipe or wheel takes over from any button-driven scroll
  ['touchstart', 'wheel'].forEach((type) => track.addEventListener(type, () => { animating = false; }, { passive: true }));
  track.addEventListener('touchstart', stop, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  jump(1);
  setActive(0);
  start();
});
