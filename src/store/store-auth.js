// State : données du magasin
import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/functions/error-message'

const state = {
  user: null,
  token: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  login ({ commit }, payload) {
    const that = this
    api
      .post('login', payload)
      .then(response => (commit('setUser', response.data.user) &&
                         commit('setToken', response.data.access_token) &&
                         that.$router.push('/')))
      .catch(error => (afficherMessageErreur('Cet utilisateur n\'existe pas !', Object.values(error.response.data)) && throw error))
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
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
