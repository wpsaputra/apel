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
$_POST = json_decode(file_get_contents("php://input"), true);

class Pegawai{
    public $servername = "localhost";
    public $username_ckp = "root";
    public $password_ckp = "";
    public $dbname_ckp = "ckpnew";
    public $id_satker = "7400";
    public $id_org = "92600";
    
    
    //fix
    function get_pegawai_es3(){
        // $this->db->from($this->table);
        // $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        // $this->db->where('autentifikasi.id_level', '2');
        // $this->db->order_by("nama", "asc");
        // $query = $this->db->get();
        // return $query->result();
    
        $result = "Error get eselon 3";
        try {
            $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname_ckp", $this->username_ckp, $this->password_ckp);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM master_pegawai JOIN autentifikasi ON master_pegawai.niplama=autentifikasi.niplama WHERE autentifikasi.id_level=2 ORDER BY nama ASC");
            // $stmt->bindParam(':username', $usr);
            $stmt->execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
        
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        return $result;
    }
    
    //fix
    function get_pegawai_es4(){
        // $this->db->from($this->table);
        // $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        // $this->db->where('autentifikasi.id_level', '3');
        // $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        // $this->db->like('master_pegawai.id_org', substr($this->session->userdata('organisasi'), 0, 3));
        // $this->db->order_by("nama", "asc");
        // $query = $this->db->get();
    
        // return $query->result();

        $result = "Error get eselon 4";
        try {
            $conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname_ckp", $this->username_ckp, $this->password_ckp);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM master_pegawai JOIN autentifikasi ON master_pegawai.niplama=autentifikasi.niplama WHERE autentifikasi.id_level=3 
                AND master_pegawai.id_satker=:satker AND master_pegawai.id_org LIKE :id_org ORDER BY nama ASC");
            $stmt->bindParam(':satker', $this->id_satker);
            $sub_id_org = substr($this->id_org, 0, 3)."%";
            // $stmt->bindParam(':id_org', substr($this->id_org, 0, 3));
            $stmt->bindParam(':id_org', $sub_id_org);
            $stmt->execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            // $result = $stmt;
        
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        return $result;
    }
    
    function get_pegawai_es4_ksk()
    {
        $tu=$this->check_92810();
        $sosial=$this->check_92820();
        $produksi=$this->check_92830();
        $distribusi=$this->check_92840();
        $nerwilis=$this->check_92850();
        $ipds=$this->check_92860();
        $querys="SELECT*FROM master_pegawai JOIN autentifikasi ON master_pegawai.niplama=autentifikasi.niplama
        WHERE master_pegawai.id_satker=".$this->session->userdata('satker')." AND (";
        if($tu < 1){
            $querys.='master_pegawai.id_org="92810" OR ';
        }
        if($sosial < 1){
            $querys.='master_pegawai.id_org="92820" OR ';
        }
        if($produksi < 1){
            $querys.='master_pegawai.id_org="92830" OR ';
        }
        if($distribusi < 1){
            $querys.='master_pegawai.id_org="92840" OR ';
        }
        if($nerwilis < 1){
            $querys.='master_pegawai.id_org="92850" OR ';
        }
        if($ipds < 1){
            $querys.='master_pegawai.id_org="92860" OR ';
        }
    
        $querys.='master_pegawai.id_org="92870" OR autentifikasi.id_level="3")';
        $this->db->query($querys);
        $query = $this->db->query($querys);
    
    return $query->result();
    }
    
    function check_92810()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->where('id_org', '92810');
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function check_92820()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('id_org', '92820');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function check_92830()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('id_org', '92830');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function check_92840()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('id_org', '92840');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function check_92850()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('id_org', '92850');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function check_92860()
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level =', '3');
        $this->db->where('master_pegawai.id_org', '92860');
        $this->db->where('master_pegawai.id_satker', $this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->num_rows();
    }
    
    function get_pegawai_by_org_jab($id, $id_lvl)
    {
        $this->db->from($this->table);
        $this->db->join($this->autentifikasi, 'master_pegawai.niplama=autentifikasi.niplama');
        $this->db->where('autentifikasi.id_level >',$id_lvl);
        $this->db->where('id_org',$id);
        $this->db->where('id_satker',$this->session->userdata('satker'));
        $this->db->order_by("nama", "asc");
        $query = $this->db->get();
    
        return $query->result();
    }

}

$pegawai = new Pegawai();

echo json_encode($pegawai->get_pegawai_es4());
// $result = $pegawai->get_pegawai_es3();
// echo $result;


?>