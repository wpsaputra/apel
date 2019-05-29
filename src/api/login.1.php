<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

// // function hash_password($password){
// //     return password_hash($password, PASSWORD_BCRYPT);
// // }

// // echo hash_password("wayan.saputra");

// $key = '5uLTR4Ok33AnG37';

// // $plaintext = "wayan.saputra";
// // $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
// // $iv = openssl_random_pseudo_bytes($ivlen);
// // $ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
// // $hmac = hash_hmac('sha512', $ciphertext_raw, $key, $as_binary=true);
// // $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );

// // echo "ciphertext <br/>";
// // echo $ciphertext;
// // echo "<br/>ciphertext_raw <br/>";
// // echo $ciphertext_raw;

// $ciphertext = 'UlH+LNUOeXKhKlcnWpQR7UhhbpiuBgwjFDkH7hMjVR5okxRVoj58Ch0kjky7Cbd8hgCoL5y0T1vDfKOjePqjtw==';
// echo $ciphertext;

// //decrypt later....
// $c = base64_decode($ciphertext);
// $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
// $iv = substr($c, 0, $ivlen);
// $hmac = substr($c, $ivlen, $sha2len=32);
// $ciphertext_raw = substr($c, $ivlen+$sha2len);
// $original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
// $calcmac = hash_hmac('sha512', $ciphertext_raw, $key, $as_binary=true);
// if (hash_equals($hmac, $calcmac))//PHP 5.6+ timing attack safe comparison
// {
//     echo "<br/>original_plaintext"."<br/>";
//     echo $original_plaintext."<br/>";
// }

$cip = "dcf77059ed0e5c55d0e81f7da44c68cb";
echo $cip."<br/>";
echo md5("wayan.saputra")."<br/>";
print_r($_POST);


?>