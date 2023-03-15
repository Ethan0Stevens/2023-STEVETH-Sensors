// State : données du magasin
import { api } from 'boot/axios'
import { Loading } from 'quasar'
import { afficherMessageErreur } from 'src/functions/error-message'

// Déclaration des variables du state
const state = {
  rooms: [],
  sensors: [],
  mesures: []
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Définit la liste des capteurs du state
   * @param state le state du magasin
   * @param sensors la liste de capteurs à assigner au state
   */
  SET_SENSORS (state, sensors) {
    state.sensors = sensors
  },
  /**
   * Définit la liste des salles du state
   * @param state le state du magasin
   * @param rooms la liste de salles à assigner au state
   */
  SET_ROOMS (state, rooms) {
    state.rooms = []
    // Ajouter un parametre au salle pour savoir si il faut afficher leurs capteurs ou non
    rooms.forEach(room => (state.rooms.push({ ...room, showSensors: false })))
  },
  /**
   * Définit la liste des mesures du state
   * @param state le state du magasin
   * @param mesures la liste de mesures à assigner au state
   */
  SET_MESURES (state, mesures) {
    state.mesures = mesures
  },
  /**
   * Ajouter une salle à la liste de salles
   * @param state le state du magasin
   * @param room la salle à ajouter
   */
  ADD_ROOM (state, room) {
    state.rooms.push(room)
  },
  /**
   * Change l'etat de si oui ou non la salle doit afficher les capteurs
   * @param state le state du magasin
   * @param room la salle à modifier
   */
  SHOW_SENSORS (state, room) {
    // Recherche la salle et retourne sa position dans le tableau, son index
    const index = state.rooms.findIndex(el => el.id === room.id)

    // Si une salle a été trouvée
    if (index !== -1) {
      room.showSensors = !room.showSensors
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.rooms[index], room)
    }
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Recuperer les capteurs a l'aide de l'api
   * @param commit
   * @param rootState
   */
  getApiSensors ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .get('capteurs', config)
      .then(response => commit('SET_SENSORS', response.data))
      .catch(error => afficherMessageErreur("Erreur de connexion a l'api", Object.values(error.response.data)))
  },
  /**
   * Recuperer les salles a l'aide de l'api
   * @param commit
   * @param rootState
   */
  getApiRooms ({ commit, rootState }) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .get('salles', config)
      .then(response => commit('SET_ROOMS', response.data))
      .catch(error => afficherMessageErreur("Erreur de connexion a l'api", Object.values(error.response.data)))
    Loading.hide()
  },
  /**
   * Recuperer les mesures à l'aide de l'api
   * @param commit
   * @param rootState
   */
  getApiMesures ({ commit, rootState }) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .get('mesures', config)
      .then(response => commit('SET_MESURES', response.data))
      .catch(error => afficherMessageErreur("Erreur de connexion a l'api", Object.values(error.response.data)))
    Loading.hide()
  },
  /**
   * Appele de l'api pour ajouter une nouvelle salle
   * @param commit
   * @param rootState
   * @param payload Données utile à l'ajout
   */
  addRoom ({ commit, rootState }, payload) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .post('salles', payload, config)
      .then(response => {
        commit('ADD_ROOM', response.data)
      })
      .catch(error => afficherMessageErreur('Erreur lors de la création de la salle', Object.values(error.response.data)))
    Loading.hide()
  },
  /**
   * Appele de l'api pour modifier une salle
   * @param commit
   * @param rootState
   * @param payload Données utile à la modification
   */
  modifyRoom ({ commit, rootState }, payload) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    console.log(payload)
    api
      .put('salles/' + payload.id, payload.room, config)
      .then(location.reload())
      .catch(error => afficherMessageErreur('Erreur lors de la modification de la salle', Object.values(error.response.data)))
    Loading.hide()
  },
  /**
   * Appele de l'api pour supprimer une salle
   * @param commit
   * @param rootState
   * @param id identifiant de la salle a supprimer
   */
  deleteRoom ({ commit, rootState }, id) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .delete('salles/' + id, config)
      .then(location.reload())
      .catch(error => afficherMessageErreur('Erreur lors de la suppression de la salle', Object.values(error.response.data)))
    Loading.hide()
  },
  /**
   * Action permetant de rendre les capteurs d'une salle visible
   * @param commit
   * @param room la salle concerné
   */
  showSensors ({ commit }, room) {
    commit('SHOW_SENSORS', room)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  /**
   * Getter des salles du magasin
   * @param state le state du magasin
   * @returns la liste des salles
   */
  getRooms (state) {
    return [...state.rooms]
  },
  /**
   * Getter des capteurs du magasin
   * @param state le state du magasin
   * @returns la liste des capteurs
   */
  getSensors (state) {
    return [...state.sensors]
  },
  /**
   * Getter des mesures du magasin
   * @param state le state du magasin
   * @returns la liste des mesures
   */
  getMesures (state) {
    return [...state.mesures]
  },
  /**
   * Determine si oui ou non toutes les salles devront etre affichées
   * @param state le state du magasin
   * @returns true ou false
   */
  showAllRooms (state) {
    let show = true
    state.rooms.forEach((room) => {
      if (room.showSensors === true) {
        show = false
      }
    })
    return show
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
