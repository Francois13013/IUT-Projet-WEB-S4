<?php

const DSN_DB  =  "mysql:host=      ;dbname=     ";
const USER_DB = "     ";
const PASSWORD_DB = "     ";

//$pdo = new PDO(DSN_DB, USER_DB, PASSWORD_DB);
//$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
//$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/*  ERROR  */

const ERROR_LOGIN_NOT_GOOD = "Nom d'utilisateur ou mot de passe incorrect";

const ERROR_REGISTER_EMAIL_NOT_GOOD_FORMAT = "L'adresse email doit être valide";
const ERROR_REGISTER_PASSWORD_NOT_GOOD_FORMAT = "Mot de passe doit être superieur à 5 caractères";
const ERROR_REGISTER_EMAIL_ALREADY_EXIST = "Adresse email déjà utilisé";
const ERROR_REGISTER_PASSWORD_DOES_NOT_MATCH = "Les mots de passe ne correspondent pas";
const THANKS_REGISTER = "Merci de vous être inscrit";

/* INTERFACE */

const ERROR_ADDREMINDER_DATE_PAST = "Veuillez rentrer une date de rappel dans le futur";
const ERROR_ADDREMINDER_DATE_NOT_EXIST = "Veuillez rentrer une date ou une heure valide";
const ERROR_ADDREMINDER_TITLE_EMPTY = "Le tire doit faire plus de 1 caractère";
const ERROR_ADDREMINDER_TITLE_TOO_LONG = "Le tire doit faire moins de 40 caractères";
const ERROR_ADDREMINDER_SOMETHING_EMPTY = "Veuillez remplir tous les champs";
