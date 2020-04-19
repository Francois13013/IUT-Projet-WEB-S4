<?php
/**
 * @descFile Ajout d'un reminder
 *
 * @author François Siderikoudis
 */

include_once ('../php/const.php');
include_once ('../php/utils.php');

session_start();

$obj = new stdClass();
$obj->success = false;

$pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);

$errorDb = false;

//$obj->errorLogin = "test";

if ( strlen($_POST['email']) < 5 || !strpos($_POST['email'],'@')) {
    $errorDb = true;
}

if(!$errorDb) {

    $password = sha1($_POST['password']);

    $loginQuery = $pdo->prepare("SELECT * FROM User WHERE email = :email AND password = :password");
    $loginQuery->execute(['email'=>$_POST['email'], 'password'=>$password]);
    $rendu2 = $loginQuery->fetchAll();

    if (sizeof($rendu2) > 0) {

        $obj = getJSONReminder($_POST['email'], $obj, '');
        $obj->errorLogin = $_POST['email'];

        $_SESSION['email'] = $_POST['email'];

        if($result = strstr($_SESSION['email'],'@',true)) {
            $obj->name = $result;
        } else {
            $obj->name = $_SESSION['email'];
        }
    } else {
        $obj->errorLogin = ERROR_LOGIN_NOT_GOOD;
    }
} else {
    $obj->errorLogin = ERROR_LOGIN_NOT_GOOD;
};

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);