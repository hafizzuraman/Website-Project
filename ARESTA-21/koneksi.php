<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "ARESTA21"; // nama database kamu

$conn = mysqli_connect($host, $user, $pass, $db);

// cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
