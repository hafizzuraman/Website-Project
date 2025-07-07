// Initialize Swiper
new Splide( '.splide', {
    type: 'loop',
    perPage: 3,             // Tampilkan 3 slide sekaligus
    focus: 'center',        // Slide aktif di tengah
    gap: '1rem',            // Jarak antar slide
    autoplay: true,
    padding: '2rem',        // Tambahkan padding supaya sisi kiri/kanan ada space
}).mount();

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

  const targetTime = new Date("2025-08-10T00:00:00").getTime();

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
