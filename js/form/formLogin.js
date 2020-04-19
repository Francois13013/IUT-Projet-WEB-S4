/**
 * @fileoverview Appel ajax du formulaire de connexion
 *
 * @author François Siderikoudis
 *
 */

import LoginModule from "../LoginModule.js";

(function () {
    'use strict';
    $(() => {
        $('#form-login').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                $('.errorMessage').html("").fadeOut();
                if(data.success === true) {
                    $('#form-login input').val("");
                    LoginModule.login(data);
                } else {
                    $('#errorLogin').html(data.errorLogin).fadeIn();
                }
            }).fail(function () {
                $('body').html('une erreur critique est arrivée');
            });
            return false; //faire semblant de rien envoyer
        }); // Fin SUBMIT form-login
    }); //FIN DE IS READY
}) ();


