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
   /* ========== RESET ========== */

  @font-face {
    font-family: 'hauser'; /* nama font bebas, nanti dipakai di font-family */
    src: url('/ARESTA-21/frontend/asset/FONT/hauser/Hauser Bold Italic.otf') format('opentype');
    font-weight: normal; /* bisa juga bold */
    font-style: normal;  /* bisa italic */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  padding: 20px 40px;
}

/* ========== LOGOUT BUTTON ========== */
.logout-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  background: linear-gradient(90deg, #ef4444, #f87171);
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

/* ========== PAGE TITLE ========== */
h1 {
  text-align: center;
  margin-top: 80px;
  font-size: 28px;
  letter-spacing: 0.5px;
  color: #e2e8f0;
  font-family: 'hauser', sans-serif;
}

/* ========== TABLE SECTION ========== */
.table-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 24px;
  margin-top: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* ========== TYPE TITLE & SEARCH BOX ========== */
.type-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  font-family: 'hauser', sans-serif;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 6px 12px;
}

.search-box label {
  color: #94a3b8;
  font-size: 14px;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: #f8fafc;
  font-size: 14px;
  width: 200px;
}

.search-box input::placeholder {
  color: #cbd5e1;
}

/* ========== TABLE STYLE ========== */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background: linear-gradient(90deg, #6366f1, #06b6d4);
  color: #fff;
}

thead th {
  padding: 12px 10px;
  text-align: left;
  font-weight: 600;
  font-size: 15px;
}

tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

td {
  padding: 10px 12px;
  color: #e2e8f0;
  font-size: 14px;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 820px) {
  body {
    padding: 20px;
  }

  h1 {
    font-size: 22px;
    margin-top: 70px;
  }

  .search-box input {
    width: 140px;
  }

  table {
    font-size: 13px;
  }

  thead {
    display: none;
  }

  tbody, tr, td {
    display: block;
    width: 100%;
  }

  tr {
    margin-bottom: 18px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    padding: 10px;
  }

  td {
    text-align: right;
    position: relative;
    padding-left: 50%;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    font-weight: 600;
    color: #94a3b8;
  }
}

  </style>
</head>
<body>
  <a href="logout.php" class="logout-btn">Logout</a> 
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
                    <td>{$row['no_wa_ketua']}</td>
                    <td>{$row['kategori_lomba']}</td>
                    <td>";
            if ($row['berkas_pendaftaran']) {
              echo "<a href='{$row['berkas_pendaftaran']}' target='_blank'>
                      <img src='{$row['berkas_pendaftaran']}' class='bukti' alt='Bukti Pembayaran'>
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
