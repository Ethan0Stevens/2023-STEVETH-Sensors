<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions('auth', ['setUser'])
  },
  mounted () {
    LocalStorage.favorites = []
    // Récupère les données du localStorage
    const user = this.$q.localStorage.getItem('user')
    const token = this.$q.localStorage.getItem('token')
    // Si un utilisateur et un token exisent
    if (user && token) {
      // Construction de l'objet data
      const data = {
        user: user,
        access_token: token
      }
      // Définit l'utilisateur en cours
      this.setUser(data)
    }
  }
})
</script>
