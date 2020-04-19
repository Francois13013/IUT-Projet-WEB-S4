/**
 * @fileoverview Représentation sur le site d'un rappel et de son interface
 *
 * @param 1 - Titre du rappel
 * @param 2 - Date 'D/M/Y'
 * @param 3 - Heures '00 h 00'
 * @param 4 - Id sur la base de donnée du message (Pour permettre sa suppression)
 *
 * @author François Siderikoudis
 *
 */

import NoReminder from "./NoReminder.js";

export default class Reminder {
    constructor(title,date,hours,id) {
        'use strict';

        var that = this;
        this.id = id;
        this.removeBtn = $('<button>X</button>')
            .hide()
            .click( function(){
                $.ajax({    //Fait un appel ajax qui envoie l'id du rappel
                    url: 'json/removeReminder.php',
                    method: 'POST',
                    data: {idOfReminder: that.id}
                }).done(function (data) {
                    if (data.success === true) {
                        that.reminder.remove();
                        if(data.size === 0) { // Si c'était le dernier rappel
                            $('#reminderContainer').append(
                                new NoReminder().interface // Affiche aucun rappel
                            );
                        }
                    } else {

                    }
                }).fail(function () {
                    $('body').html('une erreur critique est arrivée');
                })
            });

        this.reminder = $('<div></div>')
            .attr({
                class:"reminder",
            })
            .append(
                $('<p>' + title + '</p>').attr(
                    'id','title'
                ),
                $('<div></div>').append(
                    $('<p>' + date + '</p>'),
                    $('<p>' + hours + '</p>')
                ),
                this.removeBtn
            )
            .mouseenter(function () {
                that.removeBtn.fadeIn(50);
            })
            .mouseleave(function () {
                that.removeBtn.fadeOut(50);
            })
    } // Fin constructor


} // Fin NoReminder