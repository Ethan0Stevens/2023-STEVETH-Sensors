// State : données du magasin
import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/functions/error-message'
import { Loading, LocalStorage } from 'quasar'

const state = {
  user: null,
  token: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  login ({ dispatch }, payload) {
    Loading.show()
    api
      .post('login', payload)
      .then(response => {
        dispatch('setUser', response.data)
        this.$router.go(-1)
      })
      .catch(error => {
        Loading.hide()
        afficherMessageErreur('Cet utilisateur n\'existe pas !', Object.values(error.response.data))
      })
  },
  logout ({ commit, state }) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    // Déconnexion de l'API
    api
      .post('logout', {}, config)
      .then(
        commit('SET_USER', null),
        commit('SET_TOKEN', null),

        // Vide le locaStorage
        LocalStorage.clear(),

        location.reload()
      )
      .catch(error => {
        afficherMessageErreur('Déconnexion impossible', Object.values(error.response.data))
      })
    Loading.hide()
  },
  updateUser ({ commit, state }, payload) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api
      .put('updateme', payload, config)
      .then(response => {
        commit('SET_USER', response.data)
        LocalStorage.set('user', state.user)
        console.log(response.data)
      })
      .catch(error => {
        afficherMessageErreur('Modification impossible', Object.values(error.response.data))
      })
    Loading.hide()
  },
  setUser ({ commit }, data) {
    commit('SET_USER', data.user)
    commit('SET_TOKEN', data.access_token)
    // Sauvegarde les données de l'utilisateur dans le localStorage
    LocalStorage.set('user', state.user)
    LocalStorage.set('token', state.token)

    Loading.hide()
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  userIsLogedIn (state) {
    return state.user != null && state.token != null
  },
  getUser (state) {
    return { ...state.user }
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
