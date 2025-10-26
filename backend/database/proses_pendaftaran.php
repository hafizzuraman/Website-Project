<?php
include 'koneksi.php';

// Ambil tipe pendaftaran
$tipe = $_POST['tipe'] ?? '';
$lomba = $_POST['lomba'] ?? '';

// Upload Bukti Pembayaran
$target_dir = __DIR__ . "/../uploads/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$buktiName = time() . '_' . basename($_FILES['bukti']['name']);
$targetFile = $target_dir . $buktiName;
move_uploaded_file($_FILES['bukti']['tmp_name'], $targetFile);

if ($tipe === 'individu') {
    $nama = $_POST['nama'];
    $asal = $_POST['asal'];
    $hp = $_POST['hp'];

    // Simpan peserta
    $sql = "INSERT INTO peserta (nama, asal, hp, bukti) VALUES ('$nama', '$asal', '$hp', '$buktiName')";
    mysqli_query($conn, $sql);
    $id_peserta = mysqli_insert_id($conn);

    // Simpan lomba
    $sqlLomba = "INSERT INTO lomba (id_peserta, nama_lomba, tipe) VALUES ($id_peserta, '$lomba', 'individu')";
    mysqli_query($conn, $sqlLomba);

} elseif ($tipe === 'tim') {
    $nama_tim = $_POST['tim'];
    $asal = $_POST['asal'];
    $hp = $_POST['hp'];

    // Insert setiap peserta & ambil id
    $pesertaIDs = [];
    for ($i = 1; $i <= 5; $i++) {
        if (!empty($_POST['peserta'.$i])) {
            $p = $_POST['peserta'.$i];
            mysqli_query($conn, "INSERT INTO peserta (nama, asal, hp, bukti) VALUES ('$p', '$asal', '$hp', '$buktiName')");
            $pesertaIDs[$i] = mysqli_insert_id($conn);
        } else {
            $pesertaIDs[$i] = "NULL";
        }
    }

    // Simpan tim
    $sqlTim = "INSERT INTO tim (nama_tim, id_peserta1, id_peserta2, id_peserta3, id_peserta4, id_peserta5) VALUES
              ('$nama_tim', {$pesertaIDs[1]}, {$pesertaIDs[2]}, {$pesertaIDs[3]}, {$pesertaIDs[4]}, {$pesertaIDs[5]})";
    mysqli_query($conn, $sqlTim);
    $id_tim = mysqli_insert_id($conn);

    // Simpan lomba tim
    $sqlLomba = "INSERT INTO lomba (id_tim, nama_lomba, tipe) VALUES ($id_tim, '$lomba', 'tim')";
    mysqli_query($conn, $sqlLomba);
}

// Redirect ke halaman sukses
header("Location: /frontend/project/sukses.html");
exit;
// Kirim notifikasi WhatsApp
header("Location: ../kirim_wa.php?nama=$nama&asal=$asal&hp=$hp&lomba=$lomba");
exit;
?>
