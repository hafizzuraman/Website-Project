const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // biarkan kosong kalau belum diatur di phpMyAdmin
  database: "ajang_remaja_db",
  port: 3307 // sesuaikan dengan port MySQL kamu di XAMPP
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err);
  } else {
    console.log("✅ Terhubung ke MySQL!");
  }
});

// Route untuk menerima data form
app.post("/daftar", (req, res) => {
  const { nama, email, sekolah, jurusan } = req.body;

  const sql = "INSERT INTO pendaftaran (nama, email, sekolah, jurusan) VALUES (?, ?, ?, ?)";
  db.query(sql, [nama, email, sekolah, jurusan], (err, result) => {
    if (err) {
      console.error("❌ Error saat menyimpan:", err);
      res.status(500).send("Terjadi kesalahan di server");
    } else {
      console.log("✅ Data berhasil disimpan!");
      res.send("Pendaftaran berhasil!");
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
