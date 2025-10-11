const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Ensure uploads folder exists
const fs = require("fs");
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

app.post("/api/daftar", upload.single("file"), (req, res) => {
  const { namaLengkap, telepon, asalSekolah, kategori } = req.body;
  const filePath = req.file ? req.file.path : null;

  if (!namaLengkap || !telepon || !asalSekolah || !kategori || !filePath) {
    return res.status(400).json({ error: "Data belum lengkap!" });
  }

  const sql = `
    INSERT INTO peserta (nama_lengkap, telepon, asal_sekolah, kategori, file_path)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [namaLengkap, telepon, asalSekolah, kategori, filePath], (err) => {
    if (err) {
      console.error("Gagal menyimpan data:", err);
      return res.status(500).json({ error: "Gagal menyimpan data." });
    }
    res.json({ message: "Pendaftaran berhasil!" });
  });
});

// Optional: endpoint to list peserta (for testing)
app.get("/api/peserta", (req, res) => {
  db.query("SELECT id, nama_lengkap, telepon, asal_sekolah, kategori, file_path, waktu FROM peserta ORDER BY waktu DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil data." });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
