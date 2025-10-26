<?php
session_start();
require __DIR__ . '/../database/koneksi.php';


$user = $_POST['username'] ?? '';
$pass = $_POST['password'] ?? '';

$valid_user = 'panitia21';
$valid_pass = 'aresta2025';

if($user === $valid_user && $pass === $valid_pass){
    $_SESSION['admin_logged'] = true;
    header('Location: dashboard.php');
    exit;
} else {
    echo "<script>alert('Username atau password salah!');window.location='login.php';</script>";
    exit;
}
?>