/**
 * @fileoverview Appel ajax pour vérifier si l'utilisateur est connecté
 *
 * @author François Siderikoudis
 *
 */

import LoginModule from "./LoginModule.js";

(function () {
    'use strict';
    $(() => {

        $.ajax({
            url: "/json/isConnected.php",
            method: "get",
        }).done(function (data) {
            if(data.success) {
                LoginModule.login(data);
            } else { // Si utilisateur n'est pas connecté
                $('#main').fadeIn(1500);
                // window.location.href = '/';
            }
        }).fail(function () {
            $('body').html('une erreur critique est arrivée is_connected');
        }); // Fin ajax isConnected.php (pour verifier si l'utilisateur est connecté)

    }); //FIN DE IS READY
}) ();