<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname_ckp = "ckpnew";
$dbname_daily = "dailyactivity";

function checkLogin($username, $password) {
    return $username == 'admin' && $password == 'admin';
}



?>