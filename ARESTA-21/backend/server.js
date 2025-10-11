const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data and uploads directory exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const DB_FILE = path.join(dataDir, 'peserta.json');
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]', 'utf8');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));
app.use('/public', express.static(path.join(frontendPath, 'public')));
app.use('/uploads', express.static(uploadsDir));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// API: submit registration (multipart/form-data)
app.post('/api/daftar', upload.single('file'), (req, res) => {
  try {
    const { nama, telepon, asalSekolah, lomba_diikuti, email } = req.body;
    if (!nama || !telepon || !asalSekolah || !lomba_diikuti) {
      return res.status(400).json({ error: 'Field wajib belum lengkap' });
    }
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;
    const peserta = {
      id: Date.now(),
      nama, telepon, asalSekolah, lomba_diikuti,
      email: email || null,
      file: filePath,
      waktu: new Date().toISOString()
    };
    const arr = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
    arr.push(peserta);
    fs.writeFileSync(DB_FILE, JSON.stringify(arr, null, 2), 'utf8');
    return res.json({ message: 'Pendaftaran berhasil', peserta });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Kesalahan server' });
  }
});

// API: list peserta
app.get('/api/peserta', (req, res) => {
  try {
    const arr = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
    res.json(arr.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Gagal membaca data' });
  }
});

// Fallback: serve frontend index
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pendaftaran.html'));
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
