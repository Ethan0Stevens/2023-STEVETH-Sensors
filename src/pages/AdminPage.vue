<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-luffy.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center" style="background: rgba(0, 0, 0, 0.4)">
      <q-btn @click="createUser(newUser)"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'AdminPage',
  data () {
    return {
      newUser: {
        nom: 'Test',
        prenom: 'Test',
        email: 'test3@tempapi.divtec.me',
        password: 'Admlocal1',
        is_admin: 0
      }
    }
  },
  methods: {
    ...mapActions('auth', ['createUser'])
  }
})
</script>
