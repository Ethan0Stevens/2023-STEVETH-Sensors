// State : données du magasin
import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/functions/error-message'
import { Loading, LocalStorage } from 'quasar'

// Déclaration des variables du state
const state = {
  user: null,
  token: null,
  users: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Définit l'utilisateur du state
   * @param state le state du magasin
   * @param user l'utilisateur à assigner au state
   */
  SET_USER (state, user) {
    state.user = user
  },
  /**
   * Définit la liste des utilisateurs du state
   * @param state le state du magasin
   * @param users les utilisateurs à assigner au state
   * @constructor
   */
  SET_USERS (state, users) {
    state.users = users
  },
  /**
   * Définit le token du state
   * @param state le state du magasin
   * @param token le token à assigner au state
   */
  SET_TOKEN (state, token) {
    state.token = token
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Requete de connexion a l'api
   * @param dispatch
   * @param payload données utilisées pour la connexion
   */
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
  /**
   * Requete de déconnexion à l'api
   * @param commit
   * @param state le state du magasin
   */
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

        this.$router.push('/')
      )
      .catch(error => {
        afficherMessageErreur('Déconnexion impossible', Object.values(error.response.data))
      })
    Loading.hide()
  },
  /**
   * Requete de mise à jour de l'utilisateur
   * @param commit
   * @param state le state du magasin
   * @param payload les données utiles a la modification d'un utilisateur
   */
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
  /**
   * Requete de creation d'un utilisateur à l'api
   * @param state le state du magasin
   * @param payload Données utiles à la creation d'un utilisateur
   */
  createUser ({ state }, payload) {
    Loading.show()
    console.log('Token :', state.token)
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api
      .post('newuser', payload, config)
      .then(response => {
        location.reload()
      })
      .catch(error => {
        afficherMessageErreur('Creation impossible', Object.values(error.response.data))
      })
    Loading.hide()
  },
  /**
   * Rend admin l'utilisateur dont l'id est passé en parametre
   * @param state le state du magasin
   * @param id l'id de l'utilisateur
   */
  setAdmin ({ state }, id) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api
      .post('setadmin/' + id, config)
      .then(response => {
        location.reload()
      })
      .catch(error => {
        afficherMessageErreur("Impossible de rendre l'utilisateur admin", Object.values(error.response.data))
      })
    Loading.hide()
  },
  /**
   * Récuperer depuis l'api, la liste des utilisateurs
   * @param state le state du magasin
   * @param commit
   */
  getAllUsers ({ state, commit }) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api
      .get('utilisateurs', config)
      .then(response => {
        commit('SET_USERS', response.data)
        console.log(response.data)
      })
      .catch(error => {
        afficherMessageErreur('Impossible de récuperer les utilisateurs', Object.values(error.response.data))
      })
    Loading.hide()
  },
  /**
   * Action d'assignement des données de l'utilisateur au state
   * @param commit
   * @param data les données à assigner
   */
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
  /**
   * Retourne si oui ou non l'utilisateur est connecté
   * @param state le state du magasin
   * @returns boolean
   */
  userIsLogedIn (state) {
    return state.user != null && state.token != null
  },
  /**
   * Getter de l'utilisateur du magasin
   * @param state le state du magasin
   * @returns l'utilisateur
   */
  getUser (state) {
    return { ...state.user }
  },
  /**
   * Getter de la liste des utilisateurs
   * @param state
   * @returns {{}}
   */
  getUsers (state) {
    return { ...state.users }
  },
  /**
   * Getter du token du magasin
   * @param state le state du magasin
   * @returns le token
   */
  getToken (state) {
    return state.token
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
