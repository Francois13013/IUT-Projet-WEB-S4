<?php
include_once ('const.php');

function getJSONReminder($email,$obj,$like) {
    $pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if(strlen($like) < 1) {
        $stmt = $pdo->prepare("SELECT * FROM Reminder WHERE email = :email ORDER BY date");
        $stmt->execute(['email'=> $email]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM Reminder WHERE email = :email AND title LIKE :like ORDER BY date");
        $stmt->execute(['email'=> $email, 'like'=>$like]);
    }
        $rendu = $stmt->fetchAll();

        $obj->size = sizeof($rendu);

        for ($i = 0; $i < $obj->size; $i++) {
            $aReminder = new stdClass();
            $aReminder->idUser = $rendu[$i][0];
            $aReminder->id = $rendu[$i][1];
            $aReminder->title = $rendu[$i][2];
            $timestamp = strtotime($rendu[$i][3]);
            $new_date = date("d-m-Y", $timestamp);
            $aReminder->date = $new_date;

            $str = $rendu[$i][4];
            if (strlen($str) > 3) {
                $aReminder->hour = substr_replace($str, 'h', 2, 0);
            } else {
                $aReminder->hour = substr_replace($str, 'h', 1, 0);
            }
            $obj->$i = $aReminder;
        }

        $obj->success = true;

        return $obj;
}