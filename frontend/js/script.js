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
    // Fungsi untuk menyembunyikan loader
    const hideLoader = () => {
      const loader = safeQuery('#loader');
      if (loader) {
        loader.style.transition = 'opacity 0.5s ease-out';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    };

    // Sembunyikan loader setelah DOM siap (simulasi 2 detik)
    setTimeout(hideLoader, 2000);

    // Callback setelah loading selesai (untuk memulai komponen lain)
    setTimeout(() => {
      try {
        initCountdown();
        handleIntro();
        initSplide();
        navHandler();
        timelineObserver();
        // filterGrade sudah global, tidak perlu dipanggil di sini
      } catch (error) {
        console.error('Error initializing components:', error);
      }
    }, 2500); // Mulai setelah loading + buffer 500ms

    // Contoh penggunaan debounce: Tangani event resize window (gabungkan untuk semua kebutuhan)
    const handleResize = () => {
      console.log('Window resized!');
      const body = safeQuery('body');
      if (body) {
        // Perbaikan: Gunakan clamp untuk font-size yang lebih stabil, hindari perubahan drastis
        const fontSize = Math.max(14, Math.min(20, window.innerWidth / 50));
        body.style.fontSize = `${fontSize}px`;
      }
      // Refresh Splide jika ada
      if (window.Splide && window.splideInstance) {
        try {
          window.splideInstance.refresh();
        } catch (e) {
          console.warn('Splide refresh failed:', e);
        }
      }
    };

    // Tambahkan satu event listener resize dengan debounce
    window.addEventListener('resize', debounce(handleResize, 200));

    /* =========================
       Countdown Timer
       ========================= */
    function initCountdown() {
      const daysEl = safeQuery('#days');
      const hoursEl = safeQuery('#hours');
      const minutesEl = safeQuery('#minutes');
      const secondsEl = safeQuery('#seconds');
      const countdownContainer = safeQuery('#countdown');

      // Perbaikan: Pastikan targetTime valid
      const targetTimeStr = '2026-01-29T00:00:00';
      const targetTime = new Date(targetTimeStr).getTime();
      if (isNaN(targetTime)) {
        console.error('Invalid target time for countdown:', targetTimeStr);
        return;
      }

      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.warn('Countdown elements not found');
        return;
      }

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
          setZeros();
          if (countdownContainer && !countdownContainer.dataset.finished) {
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
      window.__ARESTA_countdown_interval = setInterval(updateCountdown, 1000);
    }

    /* =========================
       Intro Overlay
       ========================= */
    function handleIntro() {
      const introLogo = safeQuery('#introLogo');
      const revealMask = safeQuery('#revealMask');
      const introOverlay = safeQuery('#introOverlay');

      if (!introLogo && !revealMask && !introOverlay) return; // Perbaikan: Jika tidak ada elemen, skip

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

    /* =========================
       Splide.js Carousel
       ========================= */
    function initSplide() {
      if (!window.Splide) {
        console.warn('Splide library not loaded');
        return;
      }
      const splideEl = safeQuery('.splide');
      if (!splideEl) {
        console.warn('Splide element not found');
        return;
      }
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
            768: { perPage: 3, gap: '0.5rem' },
            480: { perPage: 2, gap: '0.5rem' }
          },
          lazyLoad: 'nearby'
        });

        splide.mount();
        window.splideInstance = splide; // Simpan instance untuk refresh di resize
      } catch (err) {
        console.warn('Splide init failed:', err);
      }
    }

    /* =========================
       Hamburger Menu
       ========================= */
    function navHandler() {
      const hamburger = safeQuery('#hamburger');
      const navLinks = safeQuery('#navLinks');
      const navItems = document.querySelectorAll('.nav-links a');

      if (!hamburger || !navLinks) {
        console.warn('Hamburger or navLinks not found');
        return;
      }

      hamburger.setAttribute('aria-controls', 'navLinks');
      if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');

      const openMenu = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
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

      navItems.forEach(item => item.addEventListener('click', closeMenu));

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    }

    /* =========================
       Timeline Section
       ========================= */
    function timelineObserver() {
      const items = document.querySelectorAll('.timeline-item');
      if (!items.length) {
        console.warn('No timeline items found');
        return;
      }
      if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.2 });

      items.forEach(item => observer.observe(item));
    }

    /* =========================
       Filter Grade (Global Function)
       ========================= */
    window.filterGrade = function filterGrade(a, b) {
      let grade;
      let evt = null;

      if (typeof a === 'string') {
        grade = a;
      } else if (a && typeof a === 'object') {
        evt = a;
        grade = b;
      }

      if (!grade) {
        console.warn('No grade provided to filterGrade');
        return;
      }

      const buttons = document.querySelectorAll('.grade-filter button');
      const cards = document.querySelectorAll('.card');

      if (!buttons.length || !cards.length) {
        console.warn('Filter buttons or cards not found');
        return;
      }

      buttons.forEach(btn => btn.classList.remove('active'));

      if (evt && evt.target) {
        evt.target.classList.add('active');
      } else {
        buttons.forEach(btn => {
          if (btn.textContent.trim().toUpperCase() === String(grade).toUpperCase()) {
            btn.classList.add('active');
          }
        });
      }

      cards.forEach(card => {
        const list = (card.getAttribute('data-grade') || '').toUpperCase();
        if (list.includes(String(grade).toUpperCase())) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    };
  });
})();
