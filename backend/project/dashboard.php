<?php
session_start();

// Cek login dulu sebelum lanjut
if(!isset($_SESSION['admin_logged'])){
    header('Location: login.php');
    exit;
}

require __DIR__ . '/../database/koneksi.php';

// Ambil peserta individu
$erk = mysqli_query($conn, "SELECT * FROM peserta ORDER BY tanggal_daftar DESC");
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/ARESTA-21/frontend/asset/LOGO/LOGO UTAMA.png" type="image/x-icon" />
<title>Dashboard Admin</title>
<style>
body{font-family:Arial;background:#f4f6f9;padding:20px;}
table{width:100%;border-collapse:collapse;background:#fff;}
th,td{padding:10px;border:1px solid #ddd;text-align:left;}
th{background:#007bff;color:#fff;}
h2{margin-bottom:15px;}
</style>
</head>
<body>

<a href="logout.php" style="
    position: absolute;
    top: 20px;
    right: 20px;
    background: #e63946;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
">Logout</a>

<h2>Daftar Peserta</h2>
<table>
<tr>
<th>Nama</th>
<th>Asal Sekolah</th>
<th>No HP</th>
<th>Bukti</th>
<th>Tanggal</th>
</tr>
<?php while($d = mysqli_fetch_assoc($erk)){ ?>
<tr>
<td><?php echo htmlspecialchars($d['nama']); ?></td>
<td><?php echo htmlspecialchars($d['asal']); ?></td>
<td><?php echo htmlspecialchars($d['hp']); ?></td>
<td><a href="uploads/<?php echo urlencode($d['bukti']); ?>" target="_blank">Lihat</a></td>
<td><?php echo $d['tanggal_daftar']; ?></td>
</tr>
<?php } ?>
</table>

</body>
</html>

