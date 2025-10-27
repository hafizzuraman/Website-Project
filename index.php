<?php

$route = $_GET['route'] ?? 'home';

switch ($route) {

    // HALAMAN FRONTEND
    case 'home':
        include "./frontend/project/index.html";
        break;

    case 'pendaftaran':
        include "./frontend/project/pendaftaran.html";
        break;

    case 'competition':
        include "./frontend/project/competition.html";
        break;

    case 'sukses':
        include "./frontend/project/sukses.html";
        break;


    // HALAMAN LOGIN + DASHBOARD
    case 'login':
        include "backend/project/login.php";
        break;

    case 'dashboard':
        include "backend/project/dashboard.php";
        break;

    case 'logout':
        include "backend/project/logout.php";
        break;


    // API / PROSES FORM
    case 'kirim-pendaftaran':
        include "backend/database/proses_pendaftaran.php";
        break;

    case 'cek-login':
        include "backend/project/cek_login.php";
        break;

    default:
        http_response_code(404);
        include "frontend/project/404.html";
        break;
}
