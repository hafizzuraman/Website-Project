// Initialize Swiper
new Splide( '.splide', {
    type: 'loop',
    perPage: 4,             // Tampilkan 3 slide sekaligus
    focus: 'center',        // Slide aktif di tengah
    gap: '1rem',            // Jarak antar slide
    autoplay: true,
    padding: '2rem',        // Tambahkan padding supaya sisi kiri/kanan ada space
}).mount();


