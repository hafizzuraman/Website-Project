<?php
include 'koneksi.php'; // koneksi ke database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tentukan apakah form individu atau tim
    $tipe = isset($_POST['tipe']) ? $_POST['tipe'] : '';

    // Folder penyimpanan file
    $targetDir = "backend/uploads/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true); // buat folder kalau belum ada
    }

    // Pastikan ada file yang diupload
    if (isset($_FILES["bukti"]) && $_FILES["bukti"]["error"] === 0) {
        $file = $_FILES["bukti"];

        // Cek ukuran file (maks 5MB)
        $maxSize = 5 * 1024 * 1024;
        if ($file["size"] > $maxSize) {
            die("❌ Ukuran file melebihi batas maksimal 5MB.");
        }

        // Cek ekstensi file
        $allowedTypes = ['jpg', 'jpeg', 'png', 'pdf'];
        $fileExt = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
        if (!in_array($fileExt, $allowedTypes)) {
            die("❌ Format file tidak diperbolehkan. Gunakan JPG, PNG, atau PDF.");
        }

        // === FORM INDIVIDU ===
        if ($tipe === "individu") {
            $namaLengkap = mysqli_real_escape_string($conn, $_POST['nama']);
            $asalSekolah = mysqli_real_escape_string($conn, $_POST['asal']);
            $telepon     = mysqli_real_escape_string($conn, $_POST['hp']);
            $lomba       = mysqli_real_escape_string($conn, $_POST['lomba_diikuti']);

            // Buat nama file baru
            $namaFileBaru = "bukti_" . preg_replace('/\s+/', '_', strtolower($namaLengkap)) . "." . $fileExt;
            $targetFilePath = $targetDir . $namaFileBaru;

            // Pindahkan file
            if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
                $sql = "INSERT INTO pendaftaran_individu 
                        (namaLengkap, telepon, asalSekolah, lomba_diikuti, file_path)
                        VALUES ('$namaLengkap', '$telepon', '$asalSekolah', '$lomba', '$targetFilePath')";
            } else {
                die("❌ Gagal memindahkan file ke folder upload.");
            }

        }

        // === FORM TIM ===
        elseif ($tipe === "tim") {
            $namaTim = mysqli_real_escape_string($conn, $_POST['tim']);
            $asalSekolah = mysqli_real_escape_string($conn, $_POST['asal']);
            $telepon     = mysqli_real_escape_string($conn, $_POST['hp']);
            $lomba       = mysqli_real_escape_string($conn, $_POST['lomba_diikuti']);

            // Peserta (1–5, tergantung input)
            $peserta1 = mysqli_real_escape_string($conn, $_POST['peserta1']);
            $peserta2 = mysqli_real_escape_string($conn, $_POST['peserta2']);
            $peserta3 = mysqli_real_escape_string($conn, $_POST['peserta3']);
            $peserta4 = mysqli_real_escape_string($conn, $_POST['peserta4']);
            $peserta5 = isset($_POST['peserta5']) ? mysqli_real_escape_string($conn, $_POST['peserta5']) : null;

            // Buat nama file baru
            $namaFileBaru = "bukti_tim_" . preg_replace('/\s+/', '_', strtolower($namaTim)) . "." . $fileExt;
            $targetFilePath = $targetDir . $namaFileBaru;

            // Pindahkan file
            if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
                $sql = "INSERT INTO pendaftaran_tim 
                        (namaTim, peserta1, peserta2, peserta3, peserta4, peserta5, telepon, asalSekolah, lomba_diikuti, file_path)
                        VALUES ('$namaTim', '$peserta1', '$peserta2', '$peserta3', '$peserta4', '$peserta5', '$telepon', '$asalSekolah', '$lomba', '$targetFilePath')";
            } else {
                die("❌ Gagal memindahkan file ke folder upload.");
            }
        }

        // Eksekusi query
        if (isset($sql)) {
            if (mysqli_query($conn, $sql)) {
                header("Location: sukses.html");
                exit();
            } else {
                echo "❌ Gagal menyimpan data ke database: " . mysqli_error($conn);
            }
        } else {
            echo "❌ Tidak ada form yang diproses.";
        }
    } else {
        echo "❌ Tidak ada file yang diunggah atau terjadi error.";
    }
}
?>
