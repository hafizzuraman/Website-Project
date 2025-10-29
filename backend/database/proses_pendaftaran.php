<?php
// ============================================
// PROSES PENDAFTARAN LOMBA ARESTA 21
// ============================================

// Koneksi ke database
include "koneksi.php";

// Cek apakah form dikirim
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Ambil tipe form: individu atau tim
    $tipe = $_POST["tipe"] ?? '';
    $lomba = $_POST["lomba"] ?? '';

    // ============================================
    // 1️⃣ FORM INDIVIDU
    // ============================================
    if ($tipe === "individu") {
        $nama = trim($_POST["nama"]);
        $asal = trim($_POST["asal"]);
        $hp = trim($_POST["hp"]);

        // Upload file bukti
        $fileTmp = $_FILES["bukti"]["tmp_name"];
        $fileName = $_FILES["bukti"]["name"];
        $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);

        // Filter nama file → nama_peserta_bukti_pendaftaran.ext
        $namaBersih = preg_replace("/[^a-zA-Z0-9_]/", "_", strtolower($nama));
        $newFileName = $namaBersih . "_bukti_pendaftaran." . $fileExt;

        // Folder tujuan upload
        $targetDir = __DIR__ . "/uploads/";
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

        $targetFile = $targetDir . $newFileName;

        if (move_uploaded_file($fileTmp, $targetFile)) {
            // Simpan ke database
            $query = "INSERT INTO lomba_individu (nama_lengkap, asal_sekolah, no_wa, kategori_lomba, berkas_pendaftaran)
                      VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sssss", $nama, $asal, $hp, $lomba, $newFileName);

            if ($stmt->execute()) {
                echo "<script>alert('Pendaftaran individu berhasil!'); window.location.href='/ARESTA-21/frontend/project/sukses.html';</script>";
            } else {
                echo "<script>alert('Gagal menyimpan data ke database!');</script>";
            }
        } else {
            echo "<script>alert('Gagal mengunggah file!');</script>";
        }

    // ============================================
    // 2️⃣ FORM TIM
    // ============================================
    } elseif ($tipe === "tim") {
        $tim = trim($_POST["tim"]);
        $asal = trim($_POST["asal"]);
        $hp = trim($_POST["hp"]);

        // Peserta tim (max 5)
        $peserta = [];
        for ($i = 1; $i <= 5; $i++) {
            $peserta[] = $_POST["peserta$i"] ?? '';
        }

        // Upload file bukti
        $fileTmp = $_FILES["bukti"]["tmp_name"];
        $fileName = $_FILES["bukti"]["name"];
        $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);

        // Rename file → nama_tim_bukti_pendaftaran.ext
        $timBersih = preg_replace("/[^a-zA-Z0-9_]/", "_", strtolower($tim));
        $newFileName = $timBersih . "_bukti_pendaftaran." . $fileExt;

        // Folder tujuan upload
        $targetDir = __DIR__ . "/uploads/";
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

        $targetFile = $targetDir . $newFileName;

        if (move_uploaded_file($fileTmp, $targetFile)) {
            // Simpan ke database
            $query = "INSERT INTO lomba_tim 
                      (nama_tim, anggota_1, anggota_2, anggota_3, anggota_4, anggota_5, asal_sekolah, no_wa_ketua, kategori_lomba, berkas_pendaftaran)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssssssssss",
                $tim, $peserta[0], $peserta[1], $peserta[2], $peserta[3], $peserta[4],
                $asal, $hp, $lomba, $newFileName
            );

            if ($stmt->execute()) {
                echo "<script>window.location.href='/ARESTA-21/frontend/project/sukses.html';</script>";
            } else {
                echo "<script>alert('Gagal menyimpan data ke database!');</script>";
            }
        } else {
            echo "<script>alert('Gagal mengunggah file!');</script>";
        }

    } else {
        echo "<script>alert('Tipe pendaftaran tidak dikenali!');</script>";
    }
}
?>
