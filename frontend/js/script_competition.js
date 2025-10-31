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


     // Fungsi untuk menyembunyikan loader
    const hideLoader = () => {
      const loader = document.getElementById('loader');
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
      handleIntro();
      initSplide();
      navHandler();
      timelineObserver();
      // filterGrade sudah global, tidak perlu dipanggil di sini
    }, 2500); // Mulai setelah loading + buffer 500ms

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
            768: { perPage: 3, gap: '0.5rem' },
            480: { perPage: 2, gap: '0.5rem' }
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
  });
})();
      