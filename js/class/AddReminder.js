/**
 * @fileoverview Block d'ajout d'un rappel (Input, formulaire, submit....)
 *
 * @author François Siderikoudis
 *
 */

import Message from "./Message.js";
import ReminderFunction from "./ReminderFunction.js";

export default class AddReminder {
    constructor() {
        'use strict';
        let that = this;
        this.button = $('<button>Ajouter</button>').attr({
            type: 'submit',
        });
        this.inputTitle =  $('<input>')
            .attr({
                id:'addInputTitle',
                name:'addInputTitle',
                placeholder: 'Nom du rappel',
                class: 'form-control'
            });
        this.interface = $('<form></form>')
            .attr({
                id:'addReminder',
                method:'POST',
                action:'json/addReminder.php'
            })
            .append(
                this.inputTitle,
                $('<div></div>').append(
                    $('<input>').attr({
                        id:'Days',
                        name:'Days',
                        placeholder: 'Jour',
                        class: 'form-control'

                    }),
                    $('<input>').attr({
                        id:'Months',
                        name:'Months',
                        placeholder: 'Mois',
                        class: 'form-control'
                    }),
                    $('<input>').attr({
                        id:'Years',
                        name:'Years',
                        placeholder: 'Année',
                        class: 'form-control'
                    })
                ),
                $('<div></div>').append(
                    $('<input>').attr({
                        id: 'Hours',
                        name: 'Hours',
                        placeholder: 'Heures',
                        class: 'form-control'
                    }),
                    $('<input>').attr({
                        id: 'Minutes',
                        name: 'Minutes',
                        placeholder: 'Minutes',
                        class: 'form-control'
                    }),
                ),
                that.button,
            )
            .submit(function () {
                $.ajax({
                    url: $(this).attr('action'),
                    method: $(this).attr('method'),
                    data: $(this).serialize()
                }).done(function (data) {
                    if(data.success === true) {
                        let searchInput = $('#searchInput');
                        if(searchInput.val().length > 0) { // Si une recherche est en cours
                            searchInput.submit();  // Ré-affiche les resultats de la recherche après l'ajout
                        } else {
                            ReminderFunction.getNewReminder(); // Si non affiche tout les resultats
                        }
                        $("#addReminder input").val(""); //Supprime tous les inputs après l'ajout du rappel
                    } else {
                        new Message(data.errorNewReminder, that.inputTitle.position().top);
                    }
                }).fail(function () {
                    $('body').html('une erreur critique est arrivée');
                });
                return false;
            })
    } // Fin constructor
} // Fin AddReminder