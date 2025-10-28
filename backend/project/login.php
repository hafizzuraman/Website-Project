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
body{background:#f4f6f9;font-family:Arial;display:flex;justify-content:center;align-items:center;height:100vh;}
form{background:white;padding:25px;border-radius:10px;width:300px;box-shadow:0 0 10px rgba(0,0,0,0.1);} 
input{width:100%;padding:8px;margin-top:10px;border:1px solid #ccc;border-radius:5px;}
button{margin-top:15px;width:100%;padding:10px;background:#007bff;border:none;border-radius:5px;color:white;}
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
