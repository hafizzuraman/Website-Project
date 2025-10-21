<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "aresta21"; // ganti dengan nama database kamu

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("❌ Koneksi gagal: " . mysqli_connect_error());
} else {
    echo "✅ Koneksi ke database berhasil!";
}
?>

