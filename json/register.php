<?php
include_once ('../php/const.php');
include_once ('../php/utils.php');

session_start();

$pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);

$email = $_POST['emailRegister'];
$password = sha1($_POST['passwordRegister']);
$confirmPassword = $_POST['confirmPasswordRegister'];

$obj = new stdClass();
$obj->success = false;

$error = new stdClass();
$errorDb = false;

if ( strlen($_POST['emailRegister']) < 5) {
    $error->email = ERROR_REGISTER_EMAIL_NOT_GOOD_FORMAT;
    $errorDb = true;
}

if (!strpos($_POST['emailRegister'],'@')) {
    $error->email = ERROR_REGISTER_EMAIL_NOT_GOOD_FORMAT;
    $errorDb = true;
}

if (!strpos($_POST['emailRegister'],'.')) {
    $error->email = ERROR_REGISTER_EMAIL_NOT_GOOD_FORMAT;
    $errorDb = true;
}

if ( strlen($_POST['passwordRegister']) < 6) {
    $error->password = ERROR_REGISTER_PASSWORD_NOT_GOOD_FORMAT;
    $errorDb = true;
}

if ( $_POST['passwordRegister'] != $_POST['confirmPasswordRegister']) {
    $error->confirmPassword = ERROR_REGISTER_PASSWORD_DOES_NOT_MATCH;
    $errorDb = true;
}

if (!$errorDb) {
    $stmt = $pdo->prepare("SELECT * FROM User WHERE email = :email");
    $stmt->execute(['email'=> $email]);
    $rendu = $stmt->fetchAll();
    if(sizeof($rendu) > 0) {
        $error->email = ERROR_REGISTER_EMAIL_ALREADY_EXIST;
        $errorDb = true;
    }
}

if(!$errorDb) {
    $stmt = $pdo->prepare("INSERT INTO User (email,password) VALUES (:email,:password)");
    $stmt->execute(['email'=>$email, 'password'=>$password]);
    $obj->success = true;
    $obj->message = THANKS_REGISTER;
}

$obj->error = $error;


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);