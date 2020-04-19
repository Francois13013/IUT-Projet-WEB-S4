<?php
/**
 * @descFile Verfie la connexion et recupère les rappels
 *
 * @author François Siderikoudis
 */

include_once ('../php/const.php');
include_once ('../php/utils.php');

session_start();

$obj = new stdClass();

if (isset($_SESSION['email'])) {
    $obj = getJSONReminder($_SESSION['email'],$obj,'');
    $obj->success = true;
    if($result = strstr($_SESSION['email'],'@',true)) {
        $obj->name = $result;
    } else {
        $obj->name = $_SESSION['email'];
    }
} else {
    $obj->success = false;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);