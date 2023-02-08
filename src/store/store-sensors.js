// State : données du magasin
import { api } from 'boot/axios'
import { Loading } from 'quasar'

const state = {
  rooms: [],
  sensors: []
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  SET_SENSORS (state, sensors) {
    state.sensors = sensors
  },
  SET_ROOMS (state, rooms) {
    rooms.forEach(room => (state.rooms.push({ ...room, showSensors: false })))
  },
  SHOW_SENSORS (state, room) {
    // Recherche la salle et retourne sa position dans le tableau, son index
    const index = state.rooms.findIndex(el => el.id === room.id)

    // Si une salle a été trouvée
    if (index !== -1) {
      room.showSensors = !room.showSensors
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.rooms[index], room)
      console.log(state.rooms)
    }
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getApiSensors ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .get('capteurs', config)
      .then(response => commit('SET_SENSORS', response.data))
      .catch(error => console.log(error.response))
  },
  getApiRooms ({ commit, rootState }) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api
      .get('salles', config)
      .then(response => commit('SET_ROOMS', response.data))
      .catch(error => console.log(error.response))
    Loading.hide()
  },
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
  getRooms (state) {
    return [...state.rooms]
  },
  getSensors (state) {
    return [...state.sensors]
  },
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
