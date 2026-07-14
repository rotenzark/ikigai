/* ===== IKIGAI · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 750); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2800); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  // hours: Tue 11-20, Wed 10-19, Thu 9-18, Fri 10-19, Sat 9-17:30, Sun+Mon closed
  var TABLE = { 2: [[11, 20]], 3: [[10, 19]], 4: [[9, 18]], 5: [[10, 19]], 6: [[9, 17.5]] };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(h) { var H = Math.floor(h), M = Math.round((h - H) * 60); return H + ':' + (M >= 30 ? '30' : '00'); }
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function openClose(d) { var w = TABLE[d.getDay()] || [], h = d.getHours() + d.getMinutes() / 60; for (var i = 0; i < w.length; i++) if (h >= w[i][0] && h < w[i][1]) return w[i][1]; return null; }
  function updateLive() {
    var d = romeNow(), close = openClose(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (close !== null) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + fmt(close); return; }
    dot.className = 'closed'; var info = null, w = TABLE[day] || [];
    for (var i = 0; i < w.length; i++) if (h < w[i][0]) { info = { d: day, t: w[i][0], off: 0 }; break; }
    if (!info) for (var k = 1; k <= 7; k++) { var nd = (day + k) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0][0], off: k }; break; } }
    var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
    txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + fmt(info.t);
  }

  var LANG = 'it';
  var EN = {
    'intro.skip': 'Enter →', 'brand.sub': 'Beauty centre · Lambrate',
    'nav.ikigai': 'The name', 'nav.tratt': 'Treatments', 'nav.mani': 'Silvia &amp; Avrin', 'nav.dove': 'Find us', 'cta.book': 'Book',
    'hero.kicker': 'Beauty & wellness centre · Lambrate',
    'hero.claim': 'Your oasis of serenity.',
    'hero.sub': "A small beauty centre on Via Carlo Bertolazzi, where Silvia and Avrin take care of you with golden hands. Face, body, massages and nails — with the calm and care of a real treat.",
    'hero.cta1': 'Book your moment', 'hero.cta2': 'The treatments', 'hero.live': 'Checking hours…', 'hero.f2': '★ 5.0 · 522 reviews',
    'ikigai.kicker': 'The name', 'ikigai.h2': '«What gives value<br>to your days.»',
    'ikigai.p1': "<em>Ikigai</em> is the Japanese word for the reason it's worth getting up in the morning — what makes you feel good. Here, that something is simple: taking care of you, calmly.",
    'ikigai.p2': "No rush, no assembly line. Every treatment is designed around you, in a clean and welcoming space. As the clients write: «the moment you walk in, you feel pampered».",
    'tratt.kicker': 'What we offer', 'tratt.h2': 'The treatments',
    't.1t': 'Body &amp; massage', 't.1p': "Silvia's massages are a little ritual: they release tension and restore balance. Relaxing, draining, tailored.",
    't.2t': 'Face', 't.2p': '«The best facial of my life», they say. Deep cleansing, targeted treatments and skincare.',
    't.3t': 'Hands &amp; nails', 't.3p': 'Manicure, pedicure and nail care, with the same attention to detail as always.',
    't.4t': 'Tailored journeys', 't.4p': 'Packages and journeys designed for your needs, chosen together. Because every skin is different.',
    'tratt.note': 'Indicative treatments. The full price list and packages can be viewed and booked online (Treatwell / Fresha) or by phone.',
    'mani.kicker': 'The hands', 'mani.h2': 'Silvia &amp; Avrin.',
    'mani.p1': "Ikigai is the centre of <b>Silvia Casalino</b> — followed with affection by clients from one salon to the next — and of <b>Avrin</b>. «Golden hands», «angel's hands», «uncommon kindness»: the words that come up most in the reviews.",
    'm.1t': 'Attention to detail', 'm.1p': 'Every treatment is followed with precision, from start to finish.',
    'm.2t': 'Hygiene &amp; cleanliness', 'm.2p': 'Impeccable order and hygiene, always — something they never compromise on.',
    'm.3t': 'Excellent products', 'm.3p': 'Only quality products, chosen for the health of your skin.',
    'rev.kicker': 'What clients say', 'rev.h2': '5.0 ★ · 522 reviews',
    'dove.kicker': 'Find us', 'dove.h2': 'In Lambrate,<br>on Via Carlo Bertolazzi.',
    'dove.addr': 'Address', 'dove.hours': 'Hours', 'dove.hoursv': 'Tue 11–20 · Wed/Fri 10–19 · Thu 9–18 · Sat 9–17:30 · Sun & Mon closed', 'dove.phone': 'Phone', 'dove.book': 'Bookings', 'dove.bookv': 'Online on Treatwell or Fresha, or by phone.', 'dove.call': 'Call Ikigai', 'dove.route': 'Get directions',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where is Centro Estetico Ikigai?', 'faq.a1': 'At Via Carlo Bertolazzi 10, in Lambrate (Milan).',
    'faq.q2': 'When are you open?', 'faq.a2': 'Tuesday 11–20, Wednesday and Friday 10–19, Thursday 9–18, Saturday 9–17:30. Closed Sunday and Monday.',
    'faq.q3': 'Which treatments do you offer?', 'faq.a3': 'Face, body and massage, nails and tailored journeys. By appointment.',
    'faq.q4': 'How do I book?', 'faq.a4': 'Online via Treatwell or Fresha, or by calling 02 0995 2595.',
    'foot.sub': 'Beauty centre · Lambrate · Milan', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.hours2': 'Closed Sun & Mon', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Some treatment images are editorial (AI-generated) placeholders for illustration; the real photo of the centre and content gathered from public sources (Google Maps). Hours, treatments and prices are indicative, to be confirmed with the centre.',
    'ab.call': 'Call', 'ab.tratt': 'Treatments', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
