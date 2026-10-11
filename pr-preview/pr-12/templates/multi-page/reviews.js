/* ==========================================================
   CUSTOMIZE: Google reviews
   Copy reviews from the customer's Google Business Profile.
   The page shows the 5 newest reviews rated 4 stars or more.

   SAMPLE: while true, a small note under the reviews says they are
   samples. Set it to false once these are real reviews.
   ========================================================== */
const REVIEWS_SETTINGS = {
  sample: true,
  rating: 4.8,                 // overall star rating shown on Google
  total: 312,                  // total number of Google reviews
  breakdown: { 5: 268, 4: 31, 3: 7, 2: 2, 1: 4 },  // counts per star level, for the bars
  // Links: Google Maps "Reviews" tab and the "Write a review" link from the Business Profile
  allReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Hearth+%26+Grain+Bakehouse',
  writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Hearth+%26+Grain+Bakehouse',
};

/* Each review:
   name, subtitle (e.g. "Local Guide · 48 reviews"), rating (1–5),
   date ("YYYY-MM-DD", the day it was posted)  -- or daysAgo for demo data,
   text, optional tags, optional reply { text, date | daysAgo } from the owner,
   optional color for the initial avatar. */
const REVIEWS = [
  {
    name: 'Maya Thornton',
    subtitle: 'Local Guide · 64 reviews · 210 photos',
    rating: 5,
    daysAgo: 4,
    text: "I've been chasing a proper croissant since a trip to Lyon years ago, and I finally found it twenty minutes from my house. Shattering outside, honeycomb inside, and you can actually taste the butter. The almond twice-baked is dangerous. Came back the next morning for a sourdough loaf and it was gone by the weekend. Staff remembered my order on visit two. This is my Saturday ritual now.",
    tags: ['Croissants', 'Sourdough', 'Friendly staff'],
    reply: { daysAgo: 3, text: "Maya, this made our whole bake team grin. Saturday rituals are our favorite kind. See you this weekend, and we'll save you an almond twice-bake." },
    color: '#c2185b',
  },
  {
    name: 'Derek Oyelaran',
    subtitle: '12 reviews',
    rating: 5,
    daysAgo: 11,
    text: "Best flat white in town, full stop. They take their time with it and it shows: silky milk, no burnt taste, and latte art that's honestly too pretty to drink. Grabbed a baguette on the way out and ate half of it in the car.",
    color: '#1565c0',
  },
  {
    name: 'Priya Natarajan',
    subtitle: 'Local Guide · 138 reviews',
    rating: 4,
    daysAgo: 19,
    text: "Lovely little spot with a real neighborhood feel. The seeded loaf is fantastic and the pastry case is gorgeous. Only knock is that the line gets long around 9 on weekends. Go early, it's worth it.",
    tags: ['Seeded loaf', 'Cozy'],
    color: '#00897b',
  },
  {
    name: 'Luis Ortega',
    subtitle: '3 reviews',
    rating: 3,
    daysAgo: 24,
    text: "Good coffee, but they were sold out of almost everything by 1pm.",
    color: '#6d4c41',
  },
  {
    name: 'Tom Kowalski',
    subtitle: 'Local Guide · 41 reviews',
    rating: 5,
    daysAgo: 33,
    text: "Ordered a dozen pastries and two loaves for a family brunch and every single thing was gone in twenty minutes. They boxed it beautifully and had it ready right on time. The chocolate croissants converted my picky nephew.",
    reply: { daysAgo: 31, text: "Thanks, Tom! Big brunch orders are a joy. Just give us a day's notice and we'll have it boxed and warm." },
    color: '#ef6c00',
  },
  {
    name: 'Hannah Brooks',
    subtitle: '27 reviews · 9 photos',
    rating: 5,
    daysAgo: 47,
    text: "Rainy Tuesday, window seat, cortado and a slice of the lemon loaf. Couldn't have asked for a better hour. Everyone who works here clearly loves what they do.",
    tags: ['Atmosphere', 'Coffee'],
    color: '#5e35b1',
  },
  {
    name: 'Jen Whitaker',
    subtitle: 'Local Guide · 89 reviews',
    rating: 5,
    daysAgo: 70,
    text: "Their bread has ruined grocery store bread for me forever.",
    color: '#2e7d32',
  },
];

/* ---------- Rendering (no need to edit below) ---------- */
(() => {
  const root = document.querySelector('[data-reviews]');
  if (!root) return;
  const DAY = 86400000;

  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  const G_LOGO = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>';

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const stars = (rating, small) => {
    const s = el('span', small ? 'stars small' : 'stars');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', `Rated ${rating} out of 5`);
    for (let i = 1; i <= 5; i++) {
      const w = el('span', i <= Math.round(rating) ? '' : 'off');
      w.innerHTML = STAR;
      s.appendChild(w);
    }
    return s;
  };
  const postedAt = (r) => (r.date ? new Date(`${r.date}T12:00:00`).getTime() : Date.now() - (r.daysAgo || 0) * DAY);
  const ago = (t) => {
    const days = Math.max(0, Math.floor((Date.now() - t) / DAY));
    if (days < 1) return 'today';
    if (days < 2) return 'a day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 14) return 'a week ago';
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 60) return 'a month ago';
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    if (days < 730) return 'a year ago';
    return `${Math.floor(days / 365)} years ago`;
  };

  // Summary
  const s = REVIEWS_SETTINGS;
  root.querySelector('[data-score]').textContent = s.rating.toFixed(1);
  root.querySelector('[data-score-stars]').replaceWith(stars(s.rating));
  root.querySelector('[data-count]').textContent = `Based on ${s.total.toLocaleString()} reviews`;
  root.querySelectorAll('[data-g-logo]').forEach((n) => { n.innerHTML = G_LOGO; });
  root.querySelector('[data-all]').href = s.allReviewsUrl;
  root.querySelector('[data-write]').href = s.writeReviewUrl;
  const bars = root.querySelector('[data-bars]');
  const biggest = Math.max(...Object.values(s.breakdown));
  [5, 4, 3, 2, 1].forEach((n) => {
    const row = el('div', 'g-bar');
    row.setAttribute('aria-label', `${n} stars: ${s.breakdown[n] || 0} reviews`);
    row.append(el('span', '', n), el('span'));
    row.style.setProperty('--pct', `${((s.breakdown[n] || 0) / biggest) * 100}%`);
    bars.appendChild(row);
  });

  // The 5 newest reviews rated 4+
  const list = root.querySelector('[data-list]');
  REVIEWS
    .filter((r) => r.rating >= 4)
    .map((r) => ({ ...r, at: postedAt(r) }))
    .sort((a, b) => b.at - a.at)
    .slice(0, 5)
    .forEach((r) => {
      const card = el('article', 'g-card');
      const head = el('div', 'g-head');
      const avatar = el('span', 'g-avatar', r.name.trim()[0].toUpperCase());
      if (r.color) avatar.style.setProperty('--avatar', r.color);
      avatar.setAttribute('aria-hidden', 'true');
      const who = el('div');
      who.append(el('div', 'g-name', r.name), el('div', 'g-sub', r.subtitle || ''));
      head.append(avatar, who);
      const mark = el('span', 'g-mark');
      mark.innerHTML = G_LOGO;
      mark.title = 'Posted on Google';

      const line = el('div', 'g-rating-line');
      line.append(stars(r.rating, true), el('span', '', ago(r.at)));
      if (Date.now() - r.at < 7 * DAY) line.append(el('span', 'g-new', 'NEW'));

      const text = el('p', 'g-text', r.text);
      card.append(head, mark, line, text);
      // "More" only shows when the clamped text is actually cut off (see fitMore below)
      text.classList.add('clamped');
      const more = el('button', 'g-more', 'More');
      more.type = 'button';
      more.setAttribute('aria-expanded', 'false');
      more.addEventListener('click', () => {
        const open = text.classList.toggle('clamped') === false;
        more.textContent = open ? 'Less' : 'More';
        more.setAttribute('aria-expanded', open);
      });
      card.append(more);
      if (r.tags && r.tags.length) {
        const tags = el('div', 'g-tags');
        r.tags.forEach((t) => tags.append(el('span', '', t)));
        card.append(tags);
      }
      if (r.reply) {
        const reply = el('div', 'g-reply');
        const title = el('strong', '', 'Response from the owner ');
        title.append(el('small', '', ago(postedAt(r.reply))));
        reply.append(title, el('p', '', r.reply.text));
        card.append(reply);
      }
      list.appendChild(card);
    });

  function fitMore() {
    list.querySelectorAll('.g-more').forEach((btn) => {
      if (btn.getAttribute('aria-expanded') === 'true') return;
      const text = btn.previousElementSibling;
      btn.hidden = text.scrollHeight <= text.clientHeight + 1;
    });
  }
  fitMore();
  window.addEventListener('resize', fitMore);
  if (document.fonts) document.fonts.ready.then(fitMore);

  const foot = root.querySelector('[data-footnote]');
  foot.textContent = s.sample
    ? 'Sample reviews shown for demonstration.'
    : 'Recent reviews from Google.';
})();
