const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Initialize Swiper
new Splide( '.splide', {
    type: 'loop',
    perPage: 3,             // Tampilkan 3 slide sekaligus
    focus: 'center',        // Slide aktif di tengah
    gap: '1rem',            // Jarak antar slide
    autoplay: true,
    padding: '2rem',        // Tambahkan padding supaya sisi kiri/kanan ada space
}).mount();


