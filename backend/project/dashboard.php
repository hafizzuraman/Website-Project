<?php
include "../database/koneksi.php";
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/ARESTA-21/frontend/asset/LOGO/LOGO UTAMA.png" type="image/x-icon"/>
  <title>Dashboard Panitia Lomba</title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background: #f9fafb;
      padding: 40px;
      color: #333;
    }

    h1 {
      text-align: center;
      color: #222;
      margin-bottom: 30px;
    }

    .table-container {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 50px;
    }

    table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto; /* biar kolom nyesuai isi */
    }

    td, th {
    padding: 8px 12px;
    border: 1px solid #ddd;
    white-space: normal; /* biar teks bisa turun baris */
    word-wrap: break-word; /* pecah nomor panjang */
    }

    th {
      background: #007bff;
      color: white;
      font-weight: 600;
    }

    tr:hover {
      background-color: #f1f5ff;
    }

    img.bukti {
      width: 80px;
      height: auto;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    .type-title {
      font-size: 20px;
      margin-top: 40px;
      color: #007bff;
      border-left: 4px solid #007bff;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .search-box {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .search-box input, .search-box select {
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    .search-box label {
      font-weight: 500;
    }

    .no-data {
      color: #888;
      text-align: center;
      padding: 15px;
    }
  </style>
</head>
<body>
  <h1>📋 Dashboard Panitia Lomba ARESTA-21</h1>

  <!-- ================= INDIVIDU ================= -->
  <div class="table-container">
    <div class="type-title">
      Peserta Lomba Individu
      <div class="search-box">
        <label>🔍 Cari:</label>
        <input type="text" id="searchIndividu" placeholder="Cari nama, sekolah, atau lomba...">
      </div>
    </div>

    <table id="tableIndividu">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Lengkap</th>
          <th>Asal Sekolah</th>
          <th>No HP</th>
          <th>Kategori Lomba</th>
          <th>Bukti Pembayaran</th>
          <th>Tanggal Daftar</th>
        </tr>
      </thead>
      <tbody>
        <?php
        $query = $conn->query("SELECT * FROM lomba_individu ORDER BY tanggal_daftar DESC");
        if ($query->num_rows > 0) {
          $no = 1;
          while ($row = $query->fetch_assoc()) {
            echo "<tr>
                    <td>{$no}</td>
                    <td>{$row['nama_lengkap']}</td>
                    <td>{$row['asal_sekolah']}</td>
                    <td>{$row['no_wa']}</td>
                    <td>{$row['kategori_lomba']}</td>
                    <td>";
            if ($row["berkas_pendaftaran"]) {
              echo "<a href='{$row["berkas_pendaftaran"]}' target='_blank'>
                      <img src='{$row["berkas_pendaftaran"]}' class='bukti' alt='Bukti Pembayaran'>
                    </a>";
            } else {
              echo "<span class='no-data'>Tidak ada file</span>";
            }
            echo "</td>
                  <td>{$row['tanggal_daftar']}</td>
                  </tr>";
            $no++;
          }
        } else {
          echo "<tr><td colspan='7' class='no-data'>Belum ada data peserta individu</td></tr>";
        }
        ?>
      </tbody>
    </table>
  </div>

  <!-- ================= TIM ================= -->
  <div class="table-container">
    <div class="type-title">
      Peserta Lomba Tim
      <div class="search-box">
        <label>🔍 Cari:</label>
        <input type="text" id="searchTim" placeholder="Cari nama tim, anggota, atau lomba...">
      </div>
    </div>

    <table id="tableTim">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Tim</th>
          <th>Peserta</th>
          <th>Asal Sekolah</th>
          <th>No HP</th>
          <th>Kategori Lomba</th>
          <th>Bukti Pembayaran</th>
          <th>Tanggal Daftar</th>
        </tr>
      </thead>
      <tbody>
        <?php
        $queryTim = $conn->query("SELECT * FROM lomba_tim ORDER BY tanggal_daftar DESC");
        if ($queryTim->num_rows > 0) {
          $no = 1;
          while ($row = $queryTim->fetch_assoc()) {
            $anggota = [];
            for ($i = 1; $i <= 5; $i++) {
              if (!empty($row["peserta_$i"])) $anggota[] = $row["peserta_$i"];
            }
            $anggotaList = implode(", ", $anggota);

            echo "<tr>
                    <td>{$no}</td>
                    <td>{$row['nama_tim']}</td>
                    <td>{$anggotaList}</td>
                    <td>{$row['asal_sekolah']}</td>
                    <td>{$row['no_hp']}</td>
                    <td>{$row['kategori_lomba']}</td>
                    <td>";
            if ($row['bukti_pembayaran']) {
              echo "<a href='{$row['bukti_pembayaran']}' target='_blank'>
                      <img src='{$row['bukti_pembayaran']}' class='bukti' alt='Bukti Pembayaran'>
                    </a>";
            } else {
              echo "<span class='no-data'>Tidak ada file</span>";
            }
            echo "</td>
                  <td>{$row['tanggal_daftar']}</td>
                  </tr>";
            $no++;
          }
        } else {
          echo "<tr><td colspan='8' class='no-data'>Belum ada data peserta tim</td></tr>";
        }
        ?>
      </tbody>
    </table>
  </div>

  <script>
    // ======== PENCARIAN REAL-TIME UNTUK INDIVIDU ========
    document.getElementById("searchIndividu").addEventListener("keyup", function() {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll("#tableIndividu tbody tr");
      rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
      });
    });

    // ======== PENCARIAN REAL-TIME UNTUK TIM ========
    document.getElementById("searchTim").addEventListener("keyup", function() {
      const filter = this.value.toLowerCase();
      const rows = document.querySelectorAll("#tableTim tbody tr");
      rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
      });
    });
  </script>
</body>
</html>
