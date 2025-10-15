<<<<<<< HEAD
# ARESTA-21
ini repository web ARESTA 21, harap kerjasamanya untuk engembankan web ini, がんばるよ!
=======
# AJANG REMAJA BERPRESTASI 21
Template sistem pendaftaran lomba (HTML/CSS/JS + Node.js + MySQL)

## Cara pakai (singkat)
1. Pastikan Node.js & MySQL sudah terinstal.
2. Buat database dan tabel di MySQL:

   ```sql
   CREATE DATABASE ajangremaja_db;
   USE ajangremaja_db;
   CREATE TABLE peserta (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nama_lengkap VARCHAR(100),
     telepon VARCHAR(20),
     asal_sekolah VARCHAR(100),
     kategori VARCHAR(50),
     file_path VARCHAR(255),
     waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. Salin file ke server / komputer lokal.
4. Install dependencies:
   ```
   npm install
   ```
5. Jalankan server:
   ```
   npm start
   ```
6. Buka browser `http://localhost:3000` dan coba daftar.

## Catatan
- File upload disimpan di folder `uploads/`.
- Untuk konfigurasi koneksi DB, bisa pakai environment variables:
  - DB_HOST, DB_USER, DB_PASS, DB_NAME
>>>>>>> 48af7cb (first commit)
