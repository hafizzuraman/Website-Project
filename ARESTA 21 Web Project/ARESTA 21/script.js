/* =========================
   Typed.js Hero Animation
========================= */
new Typed('#tema-typed', {
  strings: [
    '"Genggam Dunia dengan Impianmu, Ubah Dunia dengan Potensimu"'
  ],
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 2000,
  startDelay: 300,
  loop: true,
  showCursor: false
});


/* =========================
   Countdown Timer
========================= */
const targetTime = new Date("2026-01-28T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
setInterval(updateCountdown, 1000);


/* =========================
   Intro Animation (Logo + Mask)
========================= */
// Setelah mask selesai (1.6s), tunggu dikit, lalu fade out logo dan mask
setTimeout(() => {
  const logo = document.getElementById('introLogo');
  const mask = document.getElementById('revealMask');
  if (logo) logo.style.opacity = '0';
  if (mask) {
    mask.style.opacity = '0';
    mask.style.transition = 'opacity 0.4s ease';
  }
}, 1900); // tunggu mask selesai (1.6s + 0.3 delay)

// Setelah itu, gold background naik ke atas
setTimeout(() => {
  document.getElementById('introOverlay')?.classList.add('gold-slide');
}, 2400); // 0.5 detik setelah fade out

// Hapus overlay dari DOM
setTimeout(() => {
  document.getElementById('introOverlay')?.remove();
}, 3200);


/* =========================
   Splide.js Carousel
========================= */
document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('.splide', {
    type: 'loop',
    gap: '1rem',
    padding: '1rem',
    autoplay: true,
    interval: 5000, // ms
    pauseOnHover: false,
    perPage: 5,
    focus: 0, // setiap kartu dianggap slide individu
    pagination: false,
    breakpoints: {
      1024: { perPage: 4 },
      768: { perPage: 1 },
    },
  });

  splide.mount();
  setTimeout(() => splide.refresh(), 300);
});


/* =========================
   Hamburger Menu Animated
========================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

// Klik hamburger → toggle menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");

  // animasi stagger (delay tiap item)
  navItems.forEach((item, index) => {
    if (navLinks.classList.contains("open")) {
      item.style.animation = `fadeIn 0.4s ease forwards ${index * 0.1 + 0.2}s`;
    } else {
      item.style.animation = "";
    }
  });
});

// auto-close kalau link diklik
navItems.forEach(item => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    navItems.forEach(link => (link.style.animation = ""));
  });
});

/* ========================= 
    Loading Screen Fade Out
========================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1500); // delay 1.5s biar smooth
});

/* ========================= 
    Time Line Section
========================= */
    // Animasi muncul saat discroll
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));