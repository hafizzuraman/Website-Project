// Initialize Swiper
new Splide( '.splide', {
    type: 'loop',
    perPage: 3,             // Tampilkan 3 slide sekaligus
    focus: 'center',        // Slide aktif di tengah
    gap: '1rem',            // Jarak antar slide
    padding: '2rem',        // Tambahkan padding supaya sisi kiri/kanan ada space
    arrows: true, 
    autoplay: true,
    delay: 3000,         // Tampilkan tombol navigasi
    pagination: {
        el: '.splide__pagination',
        clickable: true,     // Tombol pagination bisa diklik
    },
    breakpoints: {
        600: {
            perPage: 1,      // Tampilkan 1 slide pada layar kecil
            padding: '1rem', // Kurangi padding pada layar kecil
        },
        900: {
            perPage: 2,      // Tampilkan 2 slide pada layar menengah
            padding: '1.5rem', // Kurangi padding pada layar menengah
        }
    }// Aktifkan autoplay // Kecepatan autoplay dalam milidetik
}).mount();


