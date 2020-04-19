<?php

include_once ('../php/const.php');
include_once ('../php/utils.php');

session_start();

$pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);

$obj = new stdClass();
$obj->success = false;

$stmt = $pdo->prepare("DELETE FROM Reminder WHERE id = :idDelete AND email = :email");

$stmt->execute(['idDelete' => $_POST['idOfReminder'],'email' => $_SESSION['email']]);

$sizeRes = $pdo->prepare("SELECT * FROM Reminder WHERE email = :email ORDER BY date");

$sizeRes->execute(['email' => $_SESSION['email']]);

$rendu2 = $sizeRes->fetchAll();

$obj->size = sizeof($rendu2);

$obj->success = true;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);