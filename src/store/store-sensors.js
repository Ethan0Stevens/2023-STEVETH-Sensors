// State : données du magasin
import { api } from 'boot/axios'

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
    state.rooms = rooms
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getApiSensors ({ commit }) {
    api
      .get('capteurs')
      .then(response => commit('SET_SENSORS', response.data))
      .catch(error => console.log(error.response))
  },
  getApiRooms ({ commit }) {
    api
      .get('salles')
      .then(response => commit('SET_ROOMS', response.data))
      .catch(error => console.log(error.response))
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
