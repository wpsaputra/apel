<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ckpnew";

$month = $_GET["month"];
$year = $_GET["year"];

// if(is_int($month)){
//     echo "nenek moyang";
//     echo $month;
// }else{
//     echo "anak haram";

// }

if (!ctype_digit(strval($month)) || !ctype_digit(strval($year))) {
    echo "Error: Your variable is not an integer";
    return;
}

echo "xxx";


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
            $array_niplama[] = "(" . $nip . ")";
        }
    }

    $sql = "INSERT INTO penilaian (niplama) VALUES " . implode(", ", $array_niplama);

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