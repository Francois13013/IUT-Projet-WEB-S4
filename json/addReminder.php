<?php
/**
 * @descFile Ajout d'un reminder
 *
 * @author François Siderikoudis
 */

include_once ('../php/const.php');
include_once ('../php/utils.php');

session_start();

$pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);

$obj = new stdClass();

$date2 = $_POST['Years'] . "-" . $_POST['Months'] . "-" . $_POST['Days'] ;

$obj->success = false;

if(!empty($_POST['Months']) && !empty($_POST['Days']) && !empty($_POST['Years']) && !empty($_POST['addInputTitle']) && $_POST['Hours'] >= 0 && $_POST['Minutes'] >= 0) {
    if(is_numeric($_POST['Months']) && is_numeric($_POST['Days']) && is_numeric($_POST['Years']) && is_numeric($_POST['Hours']) && is_numeric($_POST['Minutes'])) {
        if (strlen($_POST['Years']) == 2) {
            $years = $_POST['Years'] + 2000;
        } else {
            $years = $_POST['Years'];
        }

        $dateError = false;
        if ($_POST['Minutes'] < date("i") && $_POST['Hours'] <= date("H") && $_POST['Days'] <= date("d") && $_POST['Months'] <= date('m') && $years <= date("Y")) {
            $dateError = true;
        } else if ($_POST['Hours'] < date("H") && $_POST['Days'] <= date("d") && $_POST['Months'] <= date('m') && $years <= date("Y")) {
            $dateError = true;
        } else if ($_POST['Days'] < date("d") && $_POST['Months'] <= date('m') && $years <= date("Y")) {
            $dateError = true;
        } else if ($_POST['Months'] < date('m') && $years <= date("Y")) {
            $dateError = true;
        } else if ($years < date("Y")) {
            $dateError = true;
        } else {
            $dateError = false;
        }

        if ($dateError) {
            $obj->errorNewReminder = ERROR_ADDREMINDER_DATE_PAST;
        } else if (!checkdate($_POST['Months'], $_POST['Days'], $_POST['Years']) || $_POST['Hours'] > 23 || $_POST['Hours'] < 0 || $_POST['Minutes'] < 0 || $_POST['Minutes'] > 59) {
            $obj->errorNewReminder = ERROR_ADDREMINDER_DATE_NOT_EXIST;

        } else if (strlen($_POST['addInputTitle']) < 1) {
            $obj->errorNewReminder = ERROR_ADDREMINDER_TITLE_EMPTY;

        } else if (strlen($_POST['addInputTitle']) > 40) {
            $obj->errorNewReminder = ERROR_ADDREMINDER_TITLE_TOO_LONG;
        } else {

            if ($_POST['Minutes'] < 10 && strlen($_POST['Minutes']) < 2) {
                $minute = '0' . $_POST['Minutes'];
            } else {
                $minute = $_POST['Minutes'];
            }

            if ($_POST['Hours'] < 1 && strlen($_POST['Hours']) < 2) {
                $hours = '0' . $_POST['Hours'];
            } else {
                $hours = $_POST['Hours'];
            }


            $test = $_POST['addInputTitle'];
            $test2 = $_SESSION['email'];

            $date = $_POST['Years'] . "-" . $_POST['Months'] . "-" . $_POST['Days'];
            $heure = $hours . $minute;

            $obj->date = $date;
            $obj->hours = $heure;
            $obj->title = $test;
            $obj->idUser = $test2;

            $nrows = $pdo->prepare("INSERT INTO Reminder (email,title,date,hour) VALUES (:idUser , :title, :date, :hours)");

            $nrows->execute(['idUser' => $test2, 'title' => $test, 'date' => $date, 'hours' => $heure]);
            $obj->success = true;
        }
    } else {
        $obj->errorNewReminder = ERROR_ADDREMINDER_DATE_NOT_EXIST;
    }
} else {
    $obj->errorNewReminder = ERROR_ADDREMINDER_SOMETHING_EMPTY;
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);