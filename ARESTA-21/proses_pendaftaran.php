<?php
include 'koneksi.php'; // menghubungkan ke database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $namaLengkap = $_POST['namaLengkap'];
    $telepon = $_POST['telepon'];
    $asalSekolah = $_POST['asalSekolah'];
    $lomba = $_POST['lomba_diikuti'];

    // folder penyimpanan file
    $targetDir = "uploads/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true); // buat folder jika belum ada
    }

    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        $sql = "INSERT INTO pendaftaran (namaLengkap, telepon, asalSekolah, lomba_diikuti, file_path)
                VALUES ('$namaLengkap', '$telepon', '$asalSekolah', '$lomba', '$targetFilePath')";
        if (mysqli_query($conn, $sql)) {
            echo "Pendaftaran berhasil!";
        } else {
            echo "Gagal menyimpan data: " . mysqli_error($conn);
        }
    } else {
        echo "Gagal mengunggah file.";
    }
}
?>
