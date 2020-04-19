/**
 * @fileoverview Affichage graphique d'un message et d'une image disant qu'aucun resultat n'est trouvé
 *
 * @author François Siderikoudis
 *
 */

export default class NothingFound {
    constructor() {
        'use strict';
        this.interface = $('<div></div>')
            .attr({
                id: "NothingFound"
            })
            .append(
                $('<p></p>').html("Aucun resultat"),
                $('<img/>').attr({
                    src : "media/badsmiley.png",
                    alt : "Smiley"
                }),
            )
    } // Fin constructor
} // Fin NoReminder