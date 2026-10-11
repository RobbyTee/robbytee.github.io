/* ==========================================================
   CUSTOMIZE: everything about pricing lives here.
   - Each room has a starting count (a typical 2,100 sq ft home)
     and a list of services, priced PER ROOM.
   - `on: true` services are ticked by default.
   - A service with `per` is priced per item instead (e.g. each
     taxidermy mount), with its own counter.
   ========================================================== */
const HOME_SIZE = 2100;     // sq ft the prices are based on (shown in the disclaimer)
const MINIMUM = 95;         // smallest booking we accept
const RANGE = [0.9, 1.15];  // estimate is shown as a range around the total

const ROOMS = [
  {
    id: 'bedroom', name: 'Bedroom', plural: 'Bedrooms', count: 3, max: 8,
    icon: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M12 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>',
    services: [
      { id: 'floors', name: 'Vacuum & mop floors', price: 10, on: true },
      { id: 'dust', name: 'Dust furniture, shelves & décor', price: 6, on: true },
      { id: 'sheets', name: 'Change sheets & make the bed', price: 6, on: true },
      { id: 'trash', name: 'Empty trash cans', price: 1, on: true },
      { id: 'touch', name: 'Wipe switches, handles & doors', price: 2, on: true },
      { id: 'blinds', name: 'Window sills & blinds', price: 8 },
      { id: 'base', name: 'Hand-wipe baseboards', price: 6 },
      { id: 'underbed', name: 'Vacuum under the bed', price: 4 },
      { id: 'closet', name: 'Tidy & organize closet', price: 15 },
    ],
  },
  {
    id: 'bathroom', name: 'Bathroom', plural: 'Bathrooms', count: 2, max: 6,
    icon: '<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM6 12V5a2 2 0 0 1 4 0M8 20l-1 2M16 20l1 2"/>',
    services: [
      { id: 'toilet', name: 'Detail toilet (inside, outside & base)', price: 10, on: true },
      { id: 'shower', name: 'Scrub shower & tub', price: 14, on: true },
      { id: 'mirrors', name: 'Wipe mirrors & glass', price: 3, on: true },
      { id: 'sink', name: 'Sink, counter & faucet', price: 6, on: true },
      { id: 'floor', name: 'Mop floor', price: 5, on: true },
      { id: 'trash', name: 'Empty trash cans', price: 1, on: true },
      { id: 'towels', name: 'Fold & hang fresh towels', price: 3 },
      { id: 'cabinets', name: 'Wipe cabinet fronts', price: 6 },
      { id: 'grout', name: 'Deep-scrub tile grout', price: 20 },
      { id: 'fan', name: 'Clean exhaust fan cover', price: 5 },
    ],
  },
  {
    id: 'kitchen', name: 'Kitchen', plural: 'Kitchens', count: 1, max: 2,
    icon: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M8 6h.01M12 6h.01M9 14h6"/>',
    services: [
      { id: 'counters', name: 'Counters & backsplash', price: 8, on: true },
      { id: 'sink', name: 'Scrub sink & faucet', price: 5, on: true },
      { id: 'stove', name: 'Degrease stovetop', price: 8, on: true },
      { id: 'appliances', name: 'Shine appliance exteriors', price: 8, on: true },
      { id: 'microwave', name: 'Clean inside microwave', price: 5, on: true },
      { id: 'floor', name: 'Vacuum & mop floor', price: 8, on: true },
      { id: 'trash', name: 'Empty trash & recycling', price: 1, on: true },
      { id: 'dishes', name: 'Load or unload dishwasher', price: 6 },
      { id: 'cabinets', name: 'Wipe cabinet fronts', price: 12 },
      { id: 'oven', name: 'Clean inside oven', price: 30 },
      { id: 'fridge', name: 'Clean inside fridge', price: 30 },
    ],
  },
  {
    id: 'living', name: 'Living room', plural: 'Living rooms', count: 1, max: 3,
    icon: '<path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M2 18h20M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M5 18v2M19 18v2"/>',
    services: [
      { id: 'floors', name: 'Vacuum & mop floors', price: 10, on: true },
      { id: 'dust', name: 'Dust surfaces, shelves & décor', price: 8, on: true },
      { id: 'cushions', name: 'Straighten & fluff cushions', price: 2, on: true },
      { id: 'screens', name: 'Wipe TV & electronics', price: 4, on: true },
      { id: 'upholstery', name: 'Vacuum upholstery', price: 10 },
      { id: 'fan', name: 'Ceiling fan & light fixtures', price: 6 },
      { id: 'blinds', name: 'Window sills & blinds', price: 8 },
      { id: 'base', name: 'Hand-wipe baseboards', price: 8 },
    ],
  },
  {
    id: 'dining', name: 'Dining room', plural: 'Dining rooms', count: 1, max: 2,
    icon: '<path d="M3 10h18M5 10v10M19 10v10M9 10V6M15 10V6M12 4v2"/>',
    services: [
      { id: 'floors', name: 'Vacuum & mop floors', price: 10, on: true },
      { id: 'table', name: 'Wipe table & chairs', price: 5, on: true },
      { id: 'dust', name: 'Dust buffet & décor', price: 5, on: true },
      { id: 'chandelier', name: 'Dust chandelier or light fixture', price: 6 },
      { id: 'base', name: 'Hand-wipe baseboards', price: 6 },
    ],
  },
  {
    id: 'den', name: 'Den / office', plural: 'Dens / offices', count: 0, max: 3,
    icon: '<path d="M4 20V9l8-5 8 5v11M9 20v-5h6v5M7 9.5c1.5-3 3-3 5-1.5 2-1.5 3.5-1.5 5 1.5"/>',
    services: [
      { id: 'floors', name: 'Vacuum & mop floors', price: 10, on: true },
      { id: 'dust', name: 'Dust desk, shelves & bookcases', price: 8, on: true },
      { id: 'screens', name: 'Wipe electronics & screens', price: 4, on: true },
      { id: 'fan', name: 'Ceiling fan & light fixtures', price: 6 },
      { id: 'base', name: 'Hand-wipe baseboards', price: 6 },
      { id: 'blinds', name: 'Window sills & blinds', price: 8 },
      { id: 'mounts', name: 'Taxidermy dusting (soft-brush, no liquids)', price: 12, per: 'mount', perPlural: 'mounts',
        note: 'Fur, feathers and antlers are gently brushed and vacuumed on low.' },
    ],
  },
  {
    id: 'laundry', name: 'Laundry room', plural: 'Laundry rooms', count: 0, max: 2,
    icon: '<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="4.5"/><path d="M8 6h.01M11 6h.01"/>',
    services: [
      { id: 'machines', name: 'Wipe washer & dryer', price: 6, on: true },
      { id: 'floor', name: 'Sweep & mop floor', price: 6, on: true },
      { id: 'lint', name: 'Clear lint trap', price: 2, on: true },
      { id: 'fold', name: 'Fold one load of laundry', price: 12 },
    ],
  },
  {
    id: 'hall', name: 'Hallway / stairs', plural: 'Hallways / stairs', count: 1, max: 4,
    icon: '<path d="M4 20h4v-4h4v-4h4V8h4"/>',
    services: [
      { id: 'floors', name: 'Vacuum & mop floors or stairs', price: 6, on: true },
      { id: 'rails', name: 'Wipe handrails & banisters', price: 3, on: true },
      { id: 'frames', name: 'Dust picture frames', price: 3 },
      { id: 'base', name: 'Hand-wipe baseboards', price: 6 },
    ],
  },
];

const EXTRAS = [
  { id: 'windows', name: 'Inside windows, whole home', price: 45 },
  { id: 'pets', name: 'Pet hair deep treatment', price: 25 },
  { id: 'eco', name: 'Eco-friendly, fragrance-free products', price: 10 },
  { id: 'garage', name: 'Sweep the garage', price: 30 },
  { id: 'patio', name: 'Sweep porch & patio', price: 20 },
];

const FREQUENCIES = [
  { id: 'once', name: 'One time', discount: 0 },
  { id: 'monthly', name: 'Monthly', discount: 0.10 },
  { id: 'biweekly', name: 'Every 2 weeks', discount: 0.15 },
  { id: 'weekly', name: 'Weekly', discount: 0.20 },
];

// CUSTOMIZE: where requests are sent (FormSubmit AJAX endpoint: your email or private ID)
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/b33ff50d0c99374a065a214a6e806cfe';

/* ========================================================== */

const STORAGE_KEY = 'bright-nest-estimate-v1';
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');
const roundTo5 = (n) => Math.round(n / 5) * 5;
const $ = (sel) => document.querySelector(sel);

// ---------- state ----------
function defaultState() {
  return {
    rooms: Object.fromEntries(ROOMS.map((r) => [r.id, {
      count: r.count,
      services: Object.fromEntries(r.services.map((s) => [s.id, s.per ? 0 : !!s.on])),
    }])),
    extras: Object.fromEntries(EXTRAS.map((e) => [e.id, false])),
    frequency: 'once',
  };
}

function loadState() {
  const state = defaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return state;
    // only copy over values that still exist, so old saves survive price-list edits
    for (const room of ROOMS) {
      const s = saved.rooms && saved.rooms[room.id];
      if (!s) continue;
      if (Number.isInteger(s.count)) state.rooms[room.id].count = Math.min(Math.max(s.count, 0), room.max);
      for (const svc of room.services) {
        if (s.services && svc.id in s.services) state.rooms[room.id].services[svc.id] = s.services[svc.id];
      }
    }
    for (const e of EXTRAS) if (saved.extras && e.id in saved.extras) state.extras[e.id] = !!saved.extras[e.id];
    if (FREQUENCIES.some((f) => f.id === saved.frequency)) state.frequency = saved.frequency;
  } catch (err) { /* no storage or bad data: use defaults */ }
  return state;
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
}

let state = loadState();

// ---------- pricing ----------
function roomTotal(room) {
  const rs = state.rooms[room.id];
  let total = 0;
  for (const svc of room.services) {
    const v = rs.services[svc.id];
    if (svc.per) total += (rs.count > 0 ? v : 0) * svc.price;
    else if (v) total += rs.count * svc.price;
  }
  return total;
}

function estimate() {
  const rooms = ROOMS.map((room) => ({ room, total: roomTotal(room) })).filter((r) => r.total > 0);
  const extras = EXTRAS.filter((e) => state.extras[e.id]);
  const subtotal = rooms.reduce((a, r) => a + r.total, 0) + extras.reduce((a, e) => a + e.price, 0);
  const freq = FREQUENCIES.find((f) => f.id === state.frequency);
  const discount = subtotal * freq.discount;
  const total = subtotal - discount;
  const billed = subtotal > 0 ? Math.max(total, MINIMUM) : 0;
  return {
    rooms, extras, subtotal, freq, discount, total, billed,
    low: roundTo5(billed * RANGE[0]), high: roundTo5(billed * RANGE[1]),
  };
}

function rangeText(est) {
  return est.billed ? `${money(est.low)} – ${money(est.high)}` : '$0';
}

// ---------- rendering ----------
const iconSvg = (paths) => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;

function renderRooms() {
  const wrap = $('#rooms');
  wrap.innerHTML = ROOMS.map((room) => `
    <article class="room" data-room="${room.id}">
      <header class="room-head">
        <span class="room-icon">${iconSvg(room.icon)}</span>
        <div class="room-title">
          <h3>${room.name}</h3>
          <span class="room-subtotal" data-subtotal></span>
        </div>
        <div class="stepper" role="group" aria-label="Number of ${room.plural.toLowerCase()}">
          <button type="button" data-step="-1" aria-label="One fewer ${room.name.toLowerCase()}">−</button>
          <output data-count aria-live="polite"></output>
          <button type="button" data-step="1" aria-label="One more ${room.name.toLowerCase()}">+</button>
        </div>
      </header>
      <ul class="services">
        ${room.services.map((svc) => svc.per ? `
          <li class="service service-per">
            <div class="service-label">
              <span>${svc.name}</span>
              ${svc.note ? `<small>${svc.note}</small>` : ''}
            </div>
            <span class="price">${money(svc.price)}<small>/${svc.per}</small></span>
            <div class="stepper stepper-small" role="group" aria-label="Number of ${svc.perPlural}">
              <button type="button" data-per="${svc.id}" data-step="-1" aria-label="One fewer ${svc.per}">−</button>
              <output data-per-count="${svc.id}" aria-live="polite"></output>
              <button type="button" data-per="${svc.id}" data-step="1" aria-label="One more ${svc.per}">+</button>
            </div>
          </li>` : `
          <li class="service">
            <label>
              <input type="checkbox" data-service="${svc.id}">
              <span class="check" aria-hidden="true"></span>
              <span class="service-label">${svc.name}</span>
              <span class="price">${money(svc.price)}<small>/room</small></span>
            </label>
          </li>`).join('')}
      </ul>
    </article>`).join('');

  $('#extras').innerHTML = EXTRAS.map((e) => `
    <label class="extra">
      <input type="checkbox" data-extra="${e.id}">
      <span class="check" aria-hidden="true"></span>
      <span class="service-label">${e.name}</span>
      <span class="price">+${money(e.price)}</span>
    </label>`).join('');

  $('#frequency').innerHTML = FREQUENCIES.map((f) => `
    <label class="pill">
      <input type="radio" name="frequency" value="${f.id}">
      <span>${f.name}${f.discount ? `<small>−${Math.round(f.discount * 100)}%</small>` : ''}</span>
    </label>`).join('');

  document.querySelectorAll('[data-home-size]').forEach((el) => { el.textContent = HOME_SIZE.toLocaleString('en-US'); });
}

function update() {
  for (const room of ROOMS) {
    const card = document.querySelector(`[data-room="${room.id}"]`);
    const rs = state.rooms[room.id];
    card.classList.toggle('is-off', rs.count === 0);
    card.querySelector('[data-count]').textContent = rs.count;
    card.querySelector('[data-step="-1"]:not([data-per])').disabled = rs.count === 0;
    card.querySelector('[data-step="1"]:not([data-per])').disabled = rs.count >= room.max;
    const t = roomTotal(room);
    card.querySelector('[data-subtotal]').textContent = rs.count === 0
      ? 'Not included'
      : `${rs.count} ${rs.count === 1 ? 'room' : 'rooms'} · ${money(t)}`;
    for (const svc of room.services) {
      if (svc.per) {
        card.querySelector(`[data-per-count="${svc.id}"]`).textContent = rs.services[svc.id];
        card.querySelector(`[data-per="${svc.id}"][data-step="-1"]`).disabled = rs.services[svc.id] === 0;
      } else {
        card.querySelector(`[data-service="${svc.id}"]`).checked = rs.services[svc.id];
      }
    }
  }
  for (const e of EXTRAS) document.querySelector(`[data-extra="${e.id}"]`).checked = state.extras[e.id];
  document.querySelector(`input[name="frequency"][value="${state.frequency}"]`).checked = true;

  const est = estimate();
  const lines = est.rooms.map(({ room, total }) => {
    const n = state.rooms[room.id].count;
    return `<li><span>${n} ${n === 1 ? room.name : room.plural}</span><span>${money(total)}</span></li>`;
  });
  if (est.extras.length) lines.push(`<li><span>Extras (${est.extras.length})</span><span>${money(est.extras.reduce((a, e) => a + e.price, 0))}</span></li>`);
  if (est.discount) lines.push(`<li class="discount"><span>${est.freq.name} discount</span><span>−${money(est.discount)}</span></li>`);
  $('#summary-lines').innerHTML = lines.join('') || '<li class="empty">Add a room to get started.</li>';

  const text = rangeText(est);
  $('#summary-total').textContent = text;
  $('#mobile-total').textContent = text;
  $('#summary-note').textContent = !est.billed
    ? ''
    : est.total < MINIMUM
      ? `Includes our ${money(MINIMUM)} minimum visit. Based on a ${HOME_SIZE.toLocaleString('en-US')} sq ft home.`
      : `${est.freq.id === 'once' ? 'One-time clean' : est.freq.name + ', per visit'} · based on a ${HOME_SIZE.toLocaleString('en-US')} sq ft home.`;
  $('#summary-cta').classList.toggle('is-disabled', !est.billed);

  $('#request-summary').innerHTML = est.billed
    ? `<p class="request-estimate"><span>Your estimate</span><strong>${text}</strong><small>${est.freq.name}</small></p>
       <ul>${est.rooms.map(({ room }) => { const n = state.rooms[room.id].count; return `<li>${n} × ${n === 1 ? room.name : room.plural}</li>`; }).join('')}${est.extras.map((e) => `<li>${e.name}</li>`).join('')}</ul>
       <a href="#estimate" class="link-button">Change selections</a>`
    : `<p class="request-estimate empty">You haven't picked any rooms yet. <a href="#estimate">Build your cleaning</a> first, or just send a note and we'll quote by email.</p>`;

  saveState();
}

// ---------- events ----------
document.addEventListener('click', (e) => {
  const step = e.target.closest('[data-step]');
  if (!step) return;
  const room = ROOMS.find((r) => r.id === step.closest('[data-room]').dataset.room);
  const rs = state.rooms[room.id];
  const delta = Number(step.dataset.step);
  if (step.dataset.per) {
    const id = step.dataset.per;
    rs.services[id] = Math.min(Math.max(rs.services[id] + delta, 0), 20);
    if (rs.services[id] > 0 && rs.count === 0) rs.count = 1; // adding mounts means the room is included
  } else {
    rs.count = Math.min(Math.max(rs.count + delta, 0), room.max);
  }
  update();
});

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.service) {
    const room = t.closest('[data-room]').dataset.room;
    state.rooms[room].services[t.dataset.service] = t.checked;
    if (t.checked && state.rooms[room].count === 0) state.rooms[room].count = 1; // ticking a service adds the room
  } else if (t.dataset.extra) {
    state.extras[t.dataset.extra] = t.checked;
  } else if (t.name === 'frequency') {
    state.frequency = t.value;
  } else {
    return;
  }
  update();
});

$('#reset').addEventListener('click', () => {
  state = defaultState();
  update();
});

$('#summary-cta').addEventListener('click', (e) => {
  if (!estimate().billed) { e.preventDefault(); document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' }); }
});

// ---------- mobile estimate bar: shown while the room list is on screen ----------
const bar = $('#mobile-bar');
if ('IntersectionObserver' in window) {
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
    const showBar = seen.has($('#rooms')) && !seen.has($('#summary')) && !seen.has($('#request'));
    bar.hidden = !showBar;
  });
  [$('#rooms'), $('#summary'), $('#request')].forEach((el) => io.observe(el));
}

// ---------- request form ----------
const form = $('#request-form');
const button = form.querySelector('button[type="submit"]');
const okBox = $('#form-success');
const errBox = $('#form-error');

// earliest date is tomorrow
const dateInput = $('#preferred-date');
const tomorrow = new Date(Date.now() + 864e5);
dateInput.min = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

function showError(msg) {
  errBox.textContent = msg;
  errBox.hidden = false;
  errBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// The selections as readable rows for the email (FormSubmit's table template shows one row per field)
function selectionFields() {
  const est = estimate();
  const fields = {};
  for (const { room, total } of est.rooms) {
    const rs = state.rooms[room.id];
    const picked = room.services
      .filter((s) => (s.per ? rs.services[s.id] > 0 : rs.services[s.id]))
      .map((s) => (s.per ? `${s.name}: ${rs.services[s.id]} ${rs.services[s.id] === 1 ? s.per : s.perPlural}` : s.name));
    fields[`${rs.count} × ${rs.count === 1 ? room.name : room.plural}`] = `${picked.join('; ')} (${money(total)})`;
  }
  fields['Whole-home extras'] = est.extras.length ? est.extras.map((e) => `${e.name} (${money(e.price)})`).join('; ') : 'None';
  fields['Frequency'] = est.freq.name + (est.discount ? ` (−${Math.round(est.freq.discount * 100)}%: −${money(est.discount)})` : '');
  fields['Estimate'] = `${rangeText(est)} (calculated ${money(est.billed)}${est.total < MINIMUM && est.billed ? ', minimum applied' : ''})`;
  return fields;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  okBox.hidden = true;
  errBox.hidden = true;

  if (!form.checkValidity()) {
    form.classList.add('was-validated'); // outlines the fields that still need attention
    const bad = form.querySelector('input:invalid, textarea:invalid');
    const name = bad.closest('label')?.querySelector('.label-text')?.firstChild.textContent.trim();
    showError(bad.validity.valueMissing
      ? `Please fill in the required "${name || 'highlighted'}" field.`
      : bad.title || `Please check the "${name || 'highlighted'}" field.`);
    bad.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  Object.assign(data, estimate().billed ? selectionFields() : { Selections: 'None chosen (asked to quote by email)' });

  button.disabled = true;
  button.textContent = 'Sending…';
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok && String(result.success) === 'true') {
      form.reset();
      form.classList.remove('was-validated');
      okBox.hidden = false;
      okBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      showError(`Sorry, your request could not be sent (${result.message || 'error ' + res.status}). Please call or text us instead.`);
    }
  } catch (err) {
    showError('Sorry, your request could not be sent (network error). Please call or text us instead.');
  } finally {
    button.disabled = false;
    button.textContent = 'Send my request';
  }
});

// ---------- menu + footer ----------
const toggle = $('.nav-toggle');
const links = $('#nav-links');
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
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

renderRooms();
update();
