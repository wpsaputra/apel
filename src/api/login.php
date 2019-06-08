<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

header("Access-Control-Request-Headers: x-requested-with");
header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Headers: X-Requested-With");
// header('Content-Type: application/json');

// header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username_ckp = "root";
$password_ckp = "";
$dbname_ckp = "ckpnew";

$username_daily = "root";
$password_daily = "";
$dbname_daily = "dailyactivity";

$_POST = json_decode(file_get_contents("php://input"),true);

// $usr = $_POST["username"];
// $pass = $_POST["password"];

function checkLogin($usr, $pass, $servername, $dbname_daily, $username, $password)
{
    $md5_pass = md5($pass);
    $count = 0;
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname_daily", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT COUNT(*) FROM autentifikasi WHERE username=:usr AND password=:md5_pass");
        $stmt->bindParam(':usr', $usr);
        $stmt->bindParam(':md5_pass', $md5_pass);
        $stmt->execute();
        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // echo json_encode($stmt->fetchAll());
        // print_r($stmt->fetchAll()[0]["COUNT(*)"]);
        $count = $stmt->fetchAll()[0]["COUNT(*)"];
    
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
    // return $username == 'admin' && $password == 'admin';
    return $count;
}

function getUserProfile($usr, $pass, $servername, $dbname_ckp, $username, $password){
    $result = "Error get user profile";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname_ckp", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT a.niplama, b.nama, a.id_level, b.id_gol, b.id_org, b.id_satker FROM `autentifikasi` a LEFT JOIN master_pegawai b ON a.niplama=b.niplama WHERE a.username=:username");
        $stmt->bindParam(':username', $usr);
        // $stmt->bindParam(':md5_pass', $md5_pass);
        $stmt->execute();
        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // echo json_encode($stmt->fetchAll());
        // print_r($stmt->fetchAll()[0]["COUNT(*)"]);
        $result = $stmt->fetchAll();
    
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    return $result;
}

if(checkLogin($_POST["username"],$_POST["password"], $servername, $dbname_daily, $username_daily, $password_daily)>0){
    // echo "login";
    $result = getUserProfile($_POST["username"],$_POST["password"], $servername, $dbname_ckp, $username_ckp, $password_ckp);
    echo json_encode($result[0]);
}else{
    echo "Error Login";
}

?>