import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://tempapi.divtec.me/api/',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  /**
  // Interception de toutes les requêtes AXIOS
  api.interceptors.request.use(function (config) {
    // Récupère le token de l'utlisateur actuel
    const token = store.getters['auth/getToken'] || null

    // Si un token existe, alors on l'ajoute aux headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Récupère l'utilisateur actuel
    const utilisateur = store.getters['auth/getUser'] || null

    // Rafraichit le token si validité inférieure à 5 jours
    if (
      utilisateur &&
      config.url !== 'api/refresh' &&
      tokenLimite(utilisateur.tokenExpiration, 9600)
    ) {
      store.dispatch('api/refresh')
    }
    return config
  }, function (error) {
    // Traitement des erreurs
    return Promise.reject(error)
  })

  api.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (
      error.response.status === 401 &&
      error.response.config.url !== 'api/logout' &&
      error.response.config.url !== 'api/login'
    ) {
      store.dispatch('api/logout')
    }
    return Promise.reject(error)
  })
   **/

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
