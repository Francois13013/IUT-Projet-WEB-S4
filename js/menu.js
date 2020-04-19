/**
 * @fileoverview Annimation du menu Hamburger
 *
 * @author François Siderikoudis
 *
 */

(function () {
    'use strict';
    $(() => {
        let loginMenu = $("#loginMenu");
        let registerMenu = $("#registerMenu");
        $("#iconMenu").click(function(){
            if(loginMenu.is(':visible'))
            {
                loginMenu.slideUp({duration:'fast',queue:false});
            } else if (registerMenu.is(':visible')) {
                registerMenu.slideUp({duration:'fast',queue:false});
            } else {
                loginMenu.slideDown({duration:'fast',queue:false});
            }
        });
        $("#registerButton").click(function(){
            loginMenu.slideUp({duration:'fast',queue:false});
            registerMenu.slideDown({duration:'fast',queue:false});
        });
        $("#loginButton").click(function(){
            loginMenu.slideDown({duration:'fast',queue:false});
            registerMenu.slideUp({duration:'fast',queue:false});
        });
    });
}) ();