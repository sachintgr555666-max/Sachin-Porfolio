// ── NAV SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));

// ── ACTIVE NAV HIGHLIGHT ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#f97316' : '';
  });
});

// ── TYPED HERO TAG (rotating phrases) ──
const tag = document.getElementById('heroTag');
if (tag) {
  const phrases = [
    '👋 Available for hire',
    '📊 Data Analyst',
    '🐍 Python Enthusiast',
    '📈 Power BI Builder'
  ];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const current = phrases[pi];
    if (!deleting) {
      tag.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      tag.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 70);
  }
  type();
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ──
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-w') + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(bar => barObserver.observe(bar));

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('.stat-num[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
      let current  = 0;
      const step   = Math.max(1, Math.floor(target / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.innerHTML = current + suffix;
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ── CONTACT FORM — Formspree ──
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xqewjjgg', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        formSuccess.style.display = 'block';
        formSuccess.textContent   = '✅ Message sent! Sachin will reply soon.';
        setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
      } else {
        formSuccess.style.display   = 'block';
        formSuccess.style.color     = '#f87171';
        formSuccess.textContent     = '❌ Something went wrong. Please email directly.';
      }
    } catch (err) {
      formSuccess.style.display = 'block';
      formSuccess.style.color   = '#f87171';
      formSuccess.textContent   = '❌ Network error. Please try again.';
    }

    btn.textContent = 'Send Message →';
    btn.disabled    = false;
  });
}

// ── SCROLL HINT FADE ──
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = window.scrollY > 100 ? '0' : '1';
  });
}
