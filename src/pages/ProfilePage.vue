<template>
  <q-page class="fullscreen" >
    <q-img :fit="'fill'" height="100vh" src="https://getwallpapers.com/wallpaper/full/8/7/3/1089718-one-piece-crew-wallpaper-1920x1080-for-full-hd.jpg">
      <div class="absolute-full flex flex-center">

        <q-btn class="fixed-top-left q-ma-xl" label="Retour" size="xl" icon="arrow_back" color="primary" rounded @click="$router.go(-1)" />

        <q-card class="my-card">
          <div class="q-pa-xl">

            <q-card-section>
              <div class="text-bold text-black text-h3" align="center">Connexion</div>
              <q-separator class="bg-primary"/>
            </q-card-section>

            <q-card-section>
              <q-form @submit="login(user)">
                <q-input
                  filled
                  type="email"
                  label="Adresse e-mail *"
                  v-model="user.email"
                  :rules="[ val => val && val.length > 0 || 'Champ obligatoire']" />
                <q-input
                  filled
                  type="password"
                  label="Mot de passe *"
                  v-model="user.password"
                  :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"/>
                <div class="q-pt-xl" align="center" >
                  <q-btn size="lg" icon="arrow_forward" type="submit" color="primary" round />
                </div>
              </q-form>
            </q-card-section>

          </div>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'ConnexionPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login'])
  }
})
</script>
