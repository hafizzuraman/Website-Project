import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// === KONEKSI DATABASE ===
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // default XAMPP
  password: "", // kosongkan jika belum diubah
  database: "aresta 21",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke MySQL:", err);
  } else {
    console.log("✅ Terhubung ke MySQL!");
  }
});

// === Konfigurasi Upload File ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// === ROUTE: Pendaftaran ===
app.post("/api/daftar", upload.single("file"), (req, res) => {
  const { namaLengkap, telepon, asalSekolah, lomba } = req.body;
  const file = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO peserta (namaLengkap, telepon, asalSekolah, lomba, file) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [namaLengkap, telepon, asalSekolah, lomba, file], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal menyimpan data" });
    }
    res.json({ message: "Pendaftaran berhasil!" });
  });
});

// === ROUTE: Ambil semua peserta ===
app.get("/api/peserta", (req, res) => {
  db.query("SELECT * FROM peserta", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data" });
    }
    res.json(result);
  });
});

app.listen(port, () =>
  console.log(`🚀 Server berjalan di http://localhost:${port}`)
);
