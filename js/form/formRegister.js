/**
 * @fileoverview Appel ajax du formulaire d'inscription
 *
 * @author François Siderikoudis
 *
 */

(function () {
    'use strict';
    $(() => {

        $('#form-register').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done(function (data) {
                $('.errorMessage').html("").fadeOut();
                if (data.success === true) {
                    $('#thanksRegister').html(data.message).fadeIn().fadeOut(1300);
                    $('#registerMenu').slideUp(1300);
                    $('#form-register input').val("");
                } else {
                    if (typeof data.error.email !== 'undefined') {
                        $('#errorEmailRegister').html(data.error.email).fadeIn();
                    }
                    if (typeof data.error.password !== 'undefined') {
                        $('#errorPasswordRegister').html(data.error.password).fadeIn();
                    }
                    if (typeof data.error.confirmPassword !== 'undefined') {
                        $('#errorConfirmPasswordRegister').html(data.error.confirmPassword).fadeIn();
                    }
                }
            }).fail(function () {
                $('body').html('une erreur critique est arrivée');
            });
            return false; //faire semblant de rien envoyer
        }); // Fin SUBMIT form-register

    }); //FIN DE IS READY
}) ();
