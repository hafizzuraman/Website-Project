-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Okt 2025 pada 11.11
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aresta21`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id` int(11) NOT NULL,
  `namaLengkap` varchar(100) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `asalSekolah` varchar(100) NOT NULL,
  `lomba_diikuti` varchar(50) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `tanggal_daftar` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pendaftaran`
--

INSERT INTO `pendaftaran` (`id`, `namaLengkap`, `telepon`, `asalSekolah`, `lomba_diikuti`, `file_path`, `tanggal_daftar`) VALUES
(1, 'Fatih Hafizzurahman', '081227500898', 'MAS Husnul Khotimah', 'Lomba Baca Puisi', 'uploads/Central__3_-removebg-preview.png', '2025-10-12 02:55:59'),
(4, 'Fatih Hafizzurahman', '081227500898', 'MAS Husnul Khotimah', 'Lomba Desain Poster', 'uploads/dreamina-2025-10-02-3801-tolong digitalisasi gambar ini dengan st....jpeg', '2025-10-12 07:54:21'),
(5, 'hafizzurahman', '081227500898', 'MAS Husnul Khotimah', 'Lomba Archery', 'uploads/_DSC9066.JPG', '2025-10-13 12:35:34'),
(6, 'hafizzurahman', '081227500898', 'MAS Husnul Khotimah', 'Lomba Esai', 'uploads/plane.png', '2025-10-13 12:53:26'),
(7, 'hafizzurahman', '081227500898', 'MAS Husnul Khotimah', 'Lomba Desain Poster', 'uploads/38c4703a3054c7ffe17365d632997d82.jpg', '2025-10-13 12:54:34');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
