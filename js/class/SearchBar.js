/**
 * @fileoverview Bar de recherche
 *
 * @author François Siderikoudis
 *
 */

import NothingFound from "./NothingFound.js";
import NoReminder from "./NoReminder.js";
import ReminderFunction from "./ReminderFunction.js";

export default class SearchBar {
    constructor() {
        let that = this;

        this.input = $('<input>')
            .attr({
                id:'searchInput',
                name:'searchInput',
                class : 'form-control',
                placeholder : 'Rechercher'
            })
            .on("keyup paste submit",function() {
                $.ajax({
                    url: 'json/search.php',
                    method: 'post',
                    data: $(this).serialize()
                }).done(function (data) {
                    if(data.success === true) {
                        let reminderContainer = $('#reminderContainer');
                        reminderContainer.empty();
                        if(data.size > 0) {
                            ReminderFunction.displayReminder(data);
                        } else if($('#searchInput').val().length !== 0) {
                            reminderContainer.append(
                                new NothingFound().interface
                            );
                        } else {
                            reminderContainer.append(
                                new NoReminder().interface
                            );
                        }
                    }
                }).fail(function () {
                    $('body').html('une erreur critique est arrivée');
                });
                return false; //faire semblant de rien envoyer
            });

        this.removeSearchButton = $('<button>X</button>').attr({
            'id':'remove'
        }).click(function() {
            that.input.val("");
            that.input.submit();
        });

        this.interface = $('<div></div>')
            .append(
                that.input,
                that.removeSearchButton,
            )

    } // Fin constructor
} // Fin SearchBar
