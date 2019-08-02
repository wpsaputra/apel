<?php

// header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
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

    // public function actionAbsen($level, $niplama, $token, $startdate, $enddate)
    // {
    //     if ($token <> md5($niplama . $level . "sultra74")) {
    //         $json = array('status' => false, 'message' => 'Token Salah', 'data' => NULL);
    //         echo json_encode($json);
    //         return;
    //     }

    //     $niplamabaru = (int) $niplama;

    //     $server = null;
    //     $port = null;
    //     $json = null;
    //     $path = '/woowtime/report/monthlyReport?start_date=' . $startdate . '&end_date=' . $enddate . '&orgid=undefined&userid=' . $niplamabaru . ',&excelid=0';

    //     $ch = curl_init();
    //     if ($level == 1) {
    //         $server = 'http://10.0.0.50';
    //         $port = 8090;
    //         //initial request with login data

    //         // Set the url
    //         curl_setopt($ch, CURLOPT_URL, $server . "/woowtime/users/ext_login");

    //         //port
    //         curl_setopt($ch, CURLOPT_PORT, $port);
    //         curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/32.0.1700.107 Chrome/32.0.1700.107 Safari/537.36');
    //         curl_setopt($ch, CURLOPT_POST, true);
    //         curl_setopt($ch, CURLOPT_POSTFIELDS, "username=admin74&password=admin74");
    //         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //         curl_setopt($ch, CURLOPT_COOKIESESSION, true);
    //         curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie-name');  //could be empty, but cause problems on some hosts
    //         curl_setopt($ch, CURLOPT_COOKIEFILE, '/var/www/ip4.x/file/tmp');  //could be empty, but cause problems on some hosts
    //         $sesi = curl_exec($ch);
    //         if (curl_error($ch)) {
    //             $json = array('status' => false, 'message' => curl_error($ch), 'data' => NULL);
    //             echo json_encode($json);
    //             return;
    //         }
    //     } else if ($level == 2) {
    //         $server = 'http://10.0.36.41';
    //         $port = 80;
    //     }

    //     // Will return the response, if false it print the response
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     // Set the url
    //     curl_setopt($ch, CURLOPT_URL, $server . $path);

    //     //port
    //     curl_setopt($ch, CURLOPT_PORT, $port);

    //     // Execute
    //     $result = curl_exec($ch);

    //     if (curl_error($ch)) {
    //         //echo curl_error($ch);
    //         $json = array('status' => false, 'message' => curl_error($ch), 'data' => NULL);
    //         echo CJSon($json);
    //         return;
    //     }

    //     // Closing
    //     curl_close($ch);
    //     libxml_use_internal_errors(true);
    //     $dom = new DOMDocument();
    //     $dom->loadHTML($result);
    //     if ($level == 1) {
    //         $hasil = $this->element_to_obj_prov($dom);
    //     } else if ($level == 2) {
    //         $hasil = $this->element_to_obj($dom);
    //     }

    //     $json = array('status' => true, 'message' => 'Sukses', 'data' => array('niplama' => $niplama, 'startdate' => $startdate, 'enddate' => $enddate, 'absen' => $hasil));

    //     echo CJSON::encode($json);
    //     //echo $result;
    // }

    public function actionAbsen2()
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

        // echo $answer;

        //another request preserving the session

        // curl_setopt($ch, CURLOPT_URL, 'http://10.0.0.50/woowtime/report/saveatttemp?datestart=2019-07-01&dateend=2019-07-31&selall=false&sorting=false&orgid=undefined&userid=8433,&excelid=0&dateinfo=1');
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, "");
        // $answer = curl_exec($ch);
        // if (curl_error($ch)) {
        //     echo curl_error($ch);
        // }
        // echo $answer;

        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set the url
        curl_setopt($ch, CURLOPT_URL, "http://10.0.0.50/woowtime/report/saveatttemp?datestart=2019-07-01&dateend=2019-07-31&selall=false&sorting=false&orgid=undefined&userid=8433,&excelid=0&dateinfo=1");

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

        $xml = simplexml_load_string($tabel_absensi);
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);

        echo json_encode($array);
       


    }
}

$absen = new Absensi();
$absen->actionAbsen2();
// $id_lvl = $_GET["id_lvl"];
// $id_satker = $_GET["id_satker"];
// $id_org = $_GET["id_org"];

// $pegawai->id_satker = $id_satker;
// $pegawai->id_org = $id_org;

// // print_r($_GET);
// // echo json_encode($pegawai->get_pegawai_es4_ksk());

// if (strcmp($id_lvl, '1') == 0) {
//     $result = $pegawai->get_pegawai_es3();
// } else if (strcmp($id_lvl, '2') == 0) {
//     if (strcmp(substr($id_satker, 2, 2), '00') == 0) {
//         $result = $pegawai->get_pegawai_es4();
//     } else {
//         $result = $pegawai->get_pegawai_es4_ksk();
//     }
// } else {
//     $result = $pegawai->get_pegawai_by_org_jab($id_org, $id_lvl);
// }

// echo json_encode($result);

// // http://localhost/pegawai.php?id_lvl=3&id_org=92860&id_satker=7471
