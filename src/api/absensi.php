<?php

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$_POST = json_decode(file_get_contents("php://input"), true);

class Absensi
{
    public $servername = "localhost";
    public $username_ckp = "root";
    public $password_ckp = "";
    public $dbname_ckp = "ckpnew";

    public $array_password = array(
        7400 => array(
            'username' => 'admin74',
            'password' => 'admin74'
        ),
        7401 => array(
            'username' => 'bps7401',
            'password' => 'password7401!'
        ),
        7402 => array(
            'username' => 'bps7402',
            'password' => 'password7402!'
        ),
        7403 => array(
            'username' => 'bps7403',
            'password' => 'konawe7403.'
        ),
        7404 => array(
            'username' => 'bps7404',
            'password' => 'anterio7404'
        ),
        7405 => array(
            'username' => 'bps7405',
            'password' => 'password7405!'
        ),
        7406 => array(
            'username' => 'bps7406',
            'password' => 'arm3buy'
        ),
        7407 => array(
            'username' => 'bps7407',
            'password' => 'pr3s3ns!'
        ),
        7408 => array(
            'username' => 'bps7408',
            'password' => 'ipedees7408'
        ),
        7409 => array(
            'username' => 'bps7409',
            'password' => 'password7409!'
        ),
        7410 => array(
            'username' => 'bps7410',
            'password' => 'aratu7409'
        ),
        7411 => array(
            'username' => '',
            'password' => ''
        ),
        7471 => array(
            'username' => 'bps7471',
            'password' => '45jampino'
        ),
        7472 => array(
            'username' => 'bps7472',
            'password' => 'password7472!'
        ),
    );

    public function actionAbsen($datestart, $dateend, $userid, $idkabkot)
    {
        $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, 'http://10.0.0.50/woowtime/users/login');
        curl_setopt($ch, CURLOPT_URL, 'http://10.0.0.50/woowtime/users/ext_login');
        curl_setopt($ch, CURLOPT_PORT, 8090);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "username=admin74&password=admin74");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIESESSION, true);
        curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
        curl_setopt($ch, CURLOPT_COOKIEFILE, '/var/www/ip4.x/file/tmp');  //could be empty, but cause problems on some hosts
        $answer = curl_exec($ch);
        if (curl_error($ch)) {
            echo curl_error($ch);
        }

        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set the url
        // curl_setopt($ch, CURLOPT_URL, "http://10.0.0.50/woowtime/report/saveatttemp?datestart=2019-07-01&dateend=2019-07-31&selall=false&sorting=false&orgid=undefined&userid=8433,&excelid=0&dateinfo=1");
        curl_setopt($ch, CURLOPT_URL, "http://10.0.0.50/woowtime/report/saveatttemp?datestart=".$datestart."&dateend=".$dateend."&selall=false&sorting=false&orgid=undefined&userid=".$userid.",&excelid=0&dateinfo=1");

        //port
        curl_setopt($ch, CURLOPT_PORT, 8090);

        // Execute
        $result = curl_exec($ch);
        
        curl_close($ch);

        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML($result);
        $element = $dom->getElementsByTagName("table");
        
        $element = $element->item(2);
        
        $tabel_absensi = $dom->saveXML($element);

        // echo ($tabel_absensi);
        return $tabel_absensi;
    }

    // public function actionAbsenKabkot()
    public function actionAbsenKabkot($datestart, $dateend, $userid, $idkabkot)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://10.0.36.41/woowtime/users/ext_login');
        curl_setopt($ch, CURLOPT_PORT, 80);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "username=".$this->array_password[$idkabkot]["username"]."&password=".$this->array_password[$idkabkot]["password"]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIESESSION, true);
        curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
        curl_setopt($ch, CURLOPT_COOKIEFILE, '/var/www/ip4.x/file/tmp');  //could be empty, but cause problems on some hosts
        $answer = curl_exec($ch);
        if (curl_error($ch)) {
            echo curl_error($ch);
        }

        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set the url
        curl_setopt($ch, CURLOPT_URL, "http://10.0.36.41/woowtime/report/saveatttemp?datestart=".$datestart."&dateend=".$dateend."&selall=false&sorting=false&orgid=undefined&userid=".$userid.",&excelid=0&dateinfo=1");

        //port
        curl_setopt($ch, CURLOPT_PORT, 80);

        // Execute
        $result = curl_exec($ch);
        
        curl_close($ch);

        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML($result);
        $element = $dom->getElementsByTagName("table");
        
        $element = $element->item(1);
        
        $tabel_absensi = $dom->saveXML($element);

        // echo ($tabel_absensi);
        return $tabel_absensi;

        // print_r($this->array_password[7410]["username"]);
        // print_r($this->array_password[7410]["password"]);
    }

    public function actionMultiple($datestart, $dateend, $userid, $idkabkot)
    {
        $userid = explode(",", $userid);
        // $result = array();
        foreach ($userid as $key => $value) {
            echo $this->actionAbsen($datestart, $dateend, $value, $idkabkot);
            echo "<br/>";

            // $result[$value] = $this->actionAbsen($datestart, $dateend, $value, $idkabkot);
        }

        // echo json_encode($result);
    }

    public function actionMultipleKabkot($datestart, $dateend, $userid, $idkabkot)
    {

    }

}
// http://localhost/absensi.php?datestart=2019-01-01&dateend=2019-01-31&userid=57236
// http://localhost/absensi.php?datestart=2019-01-01&dateend=2019-01-31&userid=18828&idkabkot=7471

$datestart = $_GET["datestart"];
$dateend = $_GET["dateend"];
$userid = $_GET["userid"];
$idkabkot = $_GET["idkabkot"];

$absen = new Absensi();
if($idkabkot==7400){
    if(strpos($userid, ",") !== false) {
        $absen->actionMultiple($datestart, $dateend, $userid, $idkabkot);
    }else{
        echo $absen->actionAbsen($datestart, $dateend, $userid, $idkabkot);
    }
}else{
    if(strpos($userid, ",") !== false) {
        $absen->actionMultipleKabkot($datestart, $dateend, $userid, $idkabkot);
    }else{
        echo $absen->actionAbsenKabkot($datestart, $dateend, $userid, $idkabkot);
    }
}
