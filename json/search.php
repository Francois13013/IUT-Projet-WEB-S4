<?php
include_once ('../php/const.php');
include_once ('../php/utils.php');
session_start();

$obj = new stdClass();
$obj->success = false;

$requestSearch = $_POST['searchInput'] . '%';
$obj = getJSONReminder($_SESSION['email'],$obj,$requestSearch);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);