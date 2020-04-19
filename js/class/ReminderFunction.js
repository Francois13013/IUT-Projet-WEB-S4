/**
 * @fileoverview Ensemble de fonction qui permettent l'affichage des rappels depuis la base de donnée
 *
 * @author François Siderikoudis
 *
 */

import NoReminder from "./NoReminder.js";
import Reminder from "./Reminder.js";

export default class ReminderFunction {
    'use strict';

    static displayReminder (data) {           //Affiche les rappels
        for (let i = 0; i < data.size; i++) {
            $('#reminderContainer').append(
                new Reminder(data[i].title,data[i].date,data[i].hour,data[i].id).reminder
            );
        }
    } // Fin displayReminder()

    static displayReminderIfExist (data) {    //Affiche les rappels si ils existent
        if(data.size > 0) {
            this.displayReminder(data);
        } else {
            $('#reminderContainer').append(
                new NoReminder().interface   // Ou affiche aucun rappel est present
            );
        }
    } // Fin displayReminderIfExist()

    static getNewReminder() {     // Lance l'appel ajax pour récupérer les reminders
        let that = this;
        $.ajax({
            url: "/json/isConnected.php",
            method: "POST",
        }).done(function (data) {
            if(data.success) {
                $('#reminderContainer').empty(); //Vide les rappels
                that.displayReminderIfExist(data);
            }
        }).fail(function () {
            $('body').html('une erreur critique est arrivée');
        });
    } // Fin getNewReminder()

} // Fin ReminderFunction
