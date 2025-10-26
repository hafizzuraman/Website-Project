<?php
// Kirim WhatsApp via redirect (tanpa API)

$nama   = urlencode($_GET['nama'] ?? '');
$asal   = urlencode($_GET['asal'] ?? '');
$hp     = urlencode($_GET['hp'] ?? '');
$lomba  = urlencode($_GET['lomba'] ?? '');

$wa_admin = '6281227500898'; // sudah diubah ke format internasional (0 -> 62)

$pesan = "Pendaftar baru nih! 🎉\n\nNama: $nama\nSekolah: $asal\nNo HP: $hp\nLomba: $lomba\n\nCek bukti pembayaran di dashboard ya ✅";

$pesan = urlencode($pesan);

header("Location: https://wa.me/$wa_admin?text=$pesan");
exit;
?>
