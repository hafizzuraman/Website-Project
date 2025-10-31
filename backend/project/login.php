<?php
session_start();

// Jika sudah login, arahkan ke dashboard
if(isset($_SESSION['admin_logged']) && $_SESSION['admin_logged'] === true){
  header('Location: dashboard.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="/ARESTA-21/frontend/asset/LOGO/LOGO UTAMA.png" type="image/x-icon" />
<title>Login Admin</title>
<style>
/* ====== GLOBAL RESET ====== */
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

/* ====== BODY STYLE ====== */
body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #f8fafc;
}

/* ====== LOGIN FORM CONTAINER ====== */
form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ====== TITLE ====== */
form h3 {
  margin-bottom: 8px;
  font-size: 22px;
  color: #e2e8f0;
  letter-spacing: 0.5px;
  font-family: 'hauser', sans-serif;
}

/* ====== INPUTS ====== */
form input {
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  font-size: 15px;
  outline: none;
  transition: 0.2s ease;
}

form input::placeholder {
  color: #cbd5e1;
}

form input:focus {
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.15);
}

/* ====== BUTTON ====== */
form button {
  padding: 12px 0;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #6366f1, #06b6d4);
  color: #f1f5f9;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

/* ====== RESPONSIVE ====== */
@media (max-width: 480px) {
  form {
    width: 90%;
    padding: 32px 24px;
  }

  form h3 {
    font-size: 20px;
  }
}

</style>
</head>
<body>
<form action="cek_login.php" method="POST">
  <h3 style="text-align:center;">Login Admin</h3>
  <input type="text" name="username" placeholder="Username" required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit">Login</button>
</form>
</body>
</html>
