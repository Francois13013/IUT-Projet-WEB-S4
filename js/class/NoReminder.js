/**
 * @fileoverview Affichage graphique d'un message et d'une image disant qu'aucun rappel n'est crée
 *
 * @author François Siderikoudis
 *
 */

export default class NoReminder {
    constructor() {
        'use strict';
        this.interface = $('<div></div>')
            .attr({
                id: "NoReminder",
            })
            .append(
                $('<p></p>').html("Il n'y a aucun rappel pour l'instant vous pouvez en créer un ici"),
                $('<img/>').attr({
                    src : "media/arrowdown.png",
                    alt : "Flèche vers le bas"
                }),
            );
    } // Fin constructor
} // Fin NoReminder