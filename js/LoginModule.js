/**
 * @fileoverview Methode qui met en place l'affichage après la connexion sur le site
 *
 * @param Les differentes informations de l'utilisateur et ses rappels.
 *
 * @author François Siderikoudis
 *
 */

import SearchBar from "./class/SearchBar.js";
import ReminderFunction from "./class/ReminderFunction.js";
import AddReminder from "./class/AddReminder.js";

import LogoutModule from "./LogoutModule.js";

export default class LoginModule {
    static login(data) {
        let loginMenu = $("#loginMenu");
        let allLoginElement = $(".logged"); //Tous les éléments de connexion
        allLoginElement.hide();
        let main = $("#main"); //Page d'acceuil
        main.hide();
        loginMenu.append(
            $("<p>Bonjour, " + data.name + "</p>").attr({
                id : 'UsernameInMenu'
            })
        );
        loginMenu.append(
            $('<button/>').html('Deconnexion').click(function() {
                $.ajax({
                    url:'/json/logout.php',
                    method:'get'
                }).done(function() {
                    LogoutModule.logout();
                })
            })
        );
        loginMenu.slideUp();

        $('body').append(
            $('<div></div>').attr(
                'id','mainApplication'
            )
        );

        //Affiche les rappels et leurs interfaces (d'ajout, de recherche, de suppressions..)

        let mainApplication = $("#mainApplication");

        mainApplication.append(
            new SearchBar().interface
        );

        mainApplication.append(
            $('<div></div>')
                .attr(
                    'id','reminderContainer'
                )
        );

        ReminderFunction.displayReminderIfExist(data);

        mainApplication.append(
            new AddReminder().interface
        );

    } //login ()
}

