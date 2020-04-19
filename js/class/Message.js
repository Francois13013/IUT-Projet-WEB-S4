/**
 * @fileoverview Message "flottant" pour prévenir d'une erreur
 *
 * @param 1 - Le texte dans le message a faire passer
 * @param 2 - Un point de poisitionnement pour son apparition
 *
 * @author François Siderikoudis
 *
 */

export default class Message {
    constructor(name,where) {
        'use strict';
        $('body').append(
            $('<div></div>').css({
                position : 'absolute',
                top: where,
                height:'70px',
                width:'350px',
                left:'50%',
                marginLeft: '-175px', //On peut pas positionner un objet absolute au centre sans flex avec des margins auto
                //Donc on prend la largeur fixe / 2
                textAlign : 'center',
                display:'flex',
                justifyContent : "center",
            }).attr({
                class : 'card',
            }).html(name).fadeOut(3500, function() { $(this).remove(); }),
        )
    } // Fin constructor
} // Fin Message