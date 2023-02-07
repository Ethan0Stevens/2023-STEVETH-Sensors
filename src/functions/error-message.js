// Importation du plugin Dialog de Quasar
import { Dialog } from 'quasar'

// Exporte notre fonction
export function afficherMessageErreur (message, erreurs) {
  // Crée et affiche la boite de dialogue
  Dialog.create({
    title: 'Erreur', // Titre du dialog
    message, // Message du dialog
    html: true // Html utilisable dans le message
  })
}
