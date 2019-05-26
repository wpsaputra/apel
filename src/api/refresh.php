<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ckpnew";

$month = $_GET["month"];
$year = $_GET["year"];

if (!ctype_digit(strval($month)) || !ctype_digit(strval($year))) {
    echo "Error: Your variable is not an integer";
    return;
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT niplama FROM master_pegawai");
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $array_niplama = array();
    foreach ($stmt->fetchAll() as $k => $v) {
        foreach ($v as $col => $nip) {
            // $array_niplama[] = "(" . $nip . ", " . $month . ", " . $year . ", ". "80)";
            $array_niplama[] = "(" . $nip . ", " . $month . ", " . $year . ")";
        }
    }

    // $sql = "INSERT INTO penilaian (niplama, bulan_ckp, tahun_ckp, skor_realisasi_pekerjaan) VALUES " . implode(", ", $array_niplama).
    //     " ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), niplama=niplama, bulan_ckp=bulan_ckp, tahun_ckp=tahun_ckp, skor_realisasi_pekerjaan=values(skor_realisasi_pekerjaan)";
    // $sql = "REPLACE INTO penilaian (niplama, bulan_ckp, tahun_ckp, skor_realisasi_pekerjaan) VALUES " . implode(", ", $array_niplama);
    
    $sql = "INSERT INTO penilaian (niplama, bulan_ckp, tahun_ckp) VALUES " . implode(", ", $array_niplama).
        " ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), niplama=niplama, bulan_ckp=bulan_ckp, tahun_ckp=tahun_ckp";

    $conn->beginTransaction();
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $conn->commit();

    echo json_encode($sql);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
$conn = null;

?>