// script.js (reworked for plain HTML project)
// - Compatible with the HTML you provided (no React, no imports)
// - Defensive: checks for lib availability (Typed, Splide)
// - Accessible hamburger (aria-expanded), Escape to close
// - filterGrade supports both onclick="filterGrade('SD')" and onclick="filterGrade(event,'SD')"

(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const debounce = (fn, wait = 100) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const safeQuery = (sel) => document.querySelector(sel);

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    /* =========================
       Typed.js Hero Animation
       ========================= */
    if (window.Typed && safeQuery('#tema-typed')) {
      try {
        // single string, looping, no cursor
        /* eslint-disable no-new */
        new Typed('#tema-typed', {
          strings: ['"Genggam Dunia dengan Impianmu, Ubah Dunia dengan Potensimu"'],
          typeSpeed: 60,
          backSpeed: 30,
          backDelay: 2000,
          startDelay: 300,
          loop: true,
          showCursor: false
        });
      } catch (err) {
        // ignore typed init failure
        // console.warn('Typed init failed', err);
      }
    }

    /* =========================
       Countdown Timer
       ========================= */
    (function initCountdown() {
      const daysEl = safeQuery('#days');
      const hoursEl = safeQuery('#hours');
      const minutesEl = safeQuery('#minutes');
      const secondsEl = safeQuery('#seconds');
      const countdownContainer = safeQuery('#countdown');

      // keep your provided target date
      const targetTime = new Date('2026-01-31T00:00:00').getTime();

      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

      function setZeros() {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
      }

      function updateCountdown() {
        const now = Date.now();
        const distance = targetTime - now;

        if (distance <= 0) {
          // Event started / passed
          setZeros();
          if (countdownContainer && !countdownContainer.dataset.finished) {
            // Optional: show a small message
            const msg = document.createElement('div');
            msg.className = 'countdown-finished';
            msg.textContent = 'Event Dimulai!';
            msg.style.marginTop = '10px';
            msg.style.fontWeight = '700';
            msg.style.color = 'var(--primary)';
            countdownContainer.parentElement?.appendChild(msg);
            countdownContainer.dataset.finished = 'true';
          }
          clearInterval(window.__ARESTA_countdown_interval);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
      }

      updateCountdown();
      // store interval id to allow clearing later if needed
      window.__ARESTA_countdown_interval = setInterval(updateCountdown, 1000);
    })();

    /* =========================
       Intro overlay / optional elements safe handling
       ========================= */
    (function handleIntro() {
      // These elements may not exist in your HTML — handle safely
      const introLogo = safeQuery('#introLogo');
      const revealMask = safeQuery('#revealMask');
      const introOverlay = safeQuery('#introOverlay');

      // Mirror the behavior you wrote (but safe)
      if (introLogo || revealMask || introOverlay) {
        setTimeout(() => {
          if (introLogo) introLogo.style.opacity = '0';
          if (revealMask) {
            revealMask.style.transition = 'opacity 0.4s ease';
            revealMask.style.opacity = '0';
          }
        }, 1900);

        setTimeout(() => {
          if (introOverlay) introOverlay.classList.add('gold-slide');
        }, 2400);

        setTimeout(() => {
          if (introOverlay && introOverlay.parentElement) introOverlay.remove();
        }, 3200);
      }
    })();

    /* =========================
       Splide.js Carousel
       ========================= */
    (function initSplide() {
      if (!window.Splide) return;
      try {
        const splide = new Splide('.splide', {
          type: 'loop',
          gap: '1rem',
          padding: '1rem',
          autoplay: true,
          interval: 5000,
          pauseOnHover: false,
          perPage: 5,
          focus: 0,
          pagination: false,
          breakpoints: {
            1400: { perPage: 4 },
            1024: { perPage: 3 },
            768: { perPage: 1 }
          },
          lazyLoad: 'nearby' // if images are large, helps perf (Splide supports lazyLoad)
        });

        splide.mount();

        // refresh on resize (debounced)
        window.addEventListener('resize', debounce(() => {
          try { splide.refresh(); } catch (e) { /* ignore */ }
        }, 200));
      } catch (err) {
        // console.warn('Splide init failed', err);
      }
    })();

    /* =========================
       Hamburger Menu Animated + accessible
       ========================= */
    (function navHandler() {
      const hamburger = safeQuery('#hamburger');
      const navLinks = safeQuery('#navLinks');
      const navItems = document.querySelectorAll('.nav-links a');

      if (!hamburger || !navLinks) return;

      // a11y attributes
      hamburger.setAttribute('aria-controls', 'navLinks');
      if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');

      const openMenu = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');

        // stagger animation for links
        navItems.forEach((item, index) => {
          item.style.animation = `fadeSlideIn 0.35s ease forwards ${index * 0.08 + 0.15}s`;
        });
      };

      const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navItems.forEach(item => (item.style.animation = ''));
      };

      hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) closeMenu(); else openMenu();
      });

      // close when a link is clicked
      navItems.forEach(item => item.addEventListener('click', closeMenu));

      // close with Escape key for accessibility
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    })();

    /* =========================
       Loading Screen Fade Out
       ========================= */
// Helper function biar aman kalau elemen belum ada
function safeQuery(selector) {
  return document.querySelector(selector);
}

// === Efek Glow Interaktif ===
const glow = safeQuery('.loader-glow');
if (glow) {
  document.addEventListener('mousemove', (e) => {
    const hue = (e.clientX / window.innerWidth) * 360; // ubah warna berdasarkan posisi X
    const brightness = 1.5 + (e.clientY / window.innerHeight); // makin ke bawah makin terang

    glow.style.filter = `
      brightness(0)
      saturate(100%)
      sepia(100%)
      hue-rotate(${hue}deg)
      saturate(600%)
      brightness(${brightness})
      blur(25px)
    `;
  });

  // efek redup pelan kalau mouse berhenti
  let timeout;
  document.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    glow.style.opacity = 1;
    timeout = setTimeout(() => {
      glow.style.opacity = 0.7;
    }, 2000);
  });
}

// === Loader Auto Fade-Out ===
(function loader() {
  window.addEventListener('load', () => {
    const loader = safeQuery('.loader-wrapper');
    if (!loader) return;

    // setelah 1.5 detik, fade-out
    setTimeout(() => {
      loader.classList.add('fade-out');
      // hapus dari DOM setelah transisi selesai
      loader.addEventListener(
        'transitionend',
        () => loader.remove(),
        { once: true }
      );
    }, 1500);
  });
})();

    /* =========================
       Time Line Section (IntersectionObserver)
       ========================= */
    (function timelineObserver() {
      const items = document.querySelectorAll('.timeline-item');
      if (!items.length || !('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.2 });

      items.forEach(item => observer.observe(item));
    })();

    /* =========================
       Lomba section: filterGrade()
       - Supports onclick="filterGrade('SD')" (legacy)
       - Supports onclick="filterGrade(event,'SD')" (recommended)
       ========================= */
    window.filterGrade = function filterGrade(a, b) {
      // Determine signature
      let grade;
      let evt = null;

      if (typeof a === 'string') {
        grade = a;
      } else if (a && typeof a === 'object') {
        evt = a;
        grade = b;
      }

      // Normalize
      if (!grade) return;

      const buttons = document.querySelectorAll('.grade-filter button');
      const cards = document.querySelectorAll('.card');

      buttons.forEach(btn => btn.classList.remove('active'));

      if (evt && evt.target) {
        evt.target.classList.add('active');
      } else {
        // Fallback: find button whose text matches grade
        buttons.forEach(btn => {
          if (btn.textContent.trim().toUpperCase() === String(grade).toUpperCase()) {
            btn.classList.add('active');
          }
        });
      }

      // Show/hide cards
      cards.forEach(card => {
        const list = (card.getAttribute('data-grade') || '').toUpperCase();
        if (list.includes(String(grade).toUpperCase())) {
          card.style.display = ''; // let CSS determine the layout (grid will handle)
        } else {
          card.style.display = 'none';
        }
      });
    };

    /* =========================
       Optional: Native Gradual Blur (non-React)
       - attachGradualBlur(selector, options)
       - Creates an absolute overlay with multiple blur layers
       - Usage example (uncomment to use): attachGradualBlur('.about-content', {position:'bottom'});
       ========================= */
    window.attachGradualBlur = function attachGradualBlur(selector, opts = {}) {
      const el = document.querySelector(selector);
      if (!el) return null;

      const cfg = Object.assign({
        position: 'bottom', // top|bottom|left|right
        height: '6rem',
        strength: 6, // px multiplier
        divCount: 4,
        opacity: 0.55,
        zIndex: 12,
        className: 'gradual-blur-native'
      }, opts);

      // ensure parent is positioned
      const prevPos = window.getComputedStyle(el).position;
      if (prevPos === 'static' || !prevPos) el.style.position = 'relative';

      const wrapper = document.createElement('div');
      wrapper.className = cfg.className;
      wrapper.style.position = 'absolute';
      wrapper.style.left = '0';
      wrapper.style.right = '0';
      wrapper.style.height = cfg.height;
      wrapper.style[cfg.position] = '0';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.overflow = 'hidden';
      wrapper.style.zIndex = String(cfg.zIndex);

      for (let i = 0; i < cfg.divCount; i++) {
        const d = document.createElement('div');
        d.style.position = 'absolute';
        d.style.inset = '0';
        // progressive blur
        const p = (i + 1) / cfg.divCount;
        const blurPx = Math.max(0.5, (cfg.strength * p)).toFixed(2);
        d.style.backdropFilter = `blur(${blurPx}px)`;
        d.style.WebkitBackdropFilter = `blur(${blurPx}px)`;
        d.style.opacity = String(cfg.opacity);
        // staggered gradient mask for softer edge
        d.style.maskImage = `linear-gradient(${cfg.position === 'top' ? 'to bottom' : 'to top'}, rgba(0,0,0,${0.05 * (i + 1)}) 0%, rgba(0,0,0,0) 100%)`;
        d.style.WebkitMaskImage = d.style.maskImage;
        wrapper.appendChild(d);
      }

      el.appendChild(wrapper);
      return wrapper;
    };

    // Example usage (uncomment if you want the effect immediately)
    // attachGradualBlur('.about-content', { position: 'bottom', height: '8rem', strength: 10, divCount: 5 });

  }); // DOMContentLoaded end

})(); // IIFE end
