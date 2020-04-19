/**
 * @fileoverview Methode qui met en place l'affichage après la déconnexion sur le site
 *
 * @author François Siderikoudis
 *
 */

export default class LogoutModule {
    static logout() {
        let loginMenu = $("#loginMenu");
        loginMenu.children().hide();
        $(".logged").show();
        $("#mainApplication").remove();
        $('#main').fadeIn();
        loginMenu.slideUp();
        $('#Thanks').fadeOut();
    } // Fin logout()
}