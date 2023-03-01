<template>
  <q-page class="fullscreen" >
    <q-img :fit="'fill'" height="100vh" src="https://getwallpapers.com/wallpaper/full/8/7/3/1089718-one-piece-crew-wallpaper-1920x1080-for-full-hd.jpg">
      <div class="absolute-full flex flex-center">

        <q-btn class="fixed-top-left q-ma-xl z-top" label="Retour" size="xl" icon="arrow_back" color="primary" rounded @click="$router.go(-1)" />

        <div class="q-pa-md fixed-bottom-left" style="width: 30vw; height: 100vh; background: rgba(0, 0, 0, 0.7)">
          <q-list bordered padding class="rounded-borders text-primary absolute-center">
            <q-item
              clickable
              v-ripple
              @click="scoll('profile')"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="face" :color="link === 'profile' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Profil</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="scoll('password')"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="vpn_key" :color="link === 'password' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Mot de passe</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="scoll('info')"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="contacts" :color="link === 'info' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Informations personnels</q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-scroll-area
          @scroll="updateScrollLink"
          ref="scrollAreaRef"
          class="text-black fixed-bottom-right"
          style="height: 1px; min-height: 100vh; min-width: 70vw; background: rgba(0, 0, 0, 0.5)">
          <div class="q-py-xs flex-center">
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center">Profil</div>
              </q-card-section>
              <q-card-section class="bg-white col column">
                <div class="col-6 relative-position">
                  <q-img
                    class="absolute-center"
                    style="border-radius: 100%; max-width: 15vw; width: 100%; height: auto;"
                    ratio="1"
                    :src="newUserPicture.photo === null || newUserPicture.photo === '' ? 'https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png' : newUserPicture.photo"/>
                </div>
                <div class="col absolute-bottom q-ma-lg column">
                  <q-btn class="q-ma-lg text-subtitle1" v-if="newUserPicture.photo !== this.getUser.photo" label="Annuler" @click="newUserPicture.photo = this.getUser.photo" color="primary" />
                  <q-input outlined label="Lien photo de profil" v-model="newUserPicture.photo" />
                  <q-btn class="full-width q-pa-md q-ma-lg text-h6" :disable="newUserPicture.photo === this.getUser.photo" label="Sauvegarder" @click="updateUser(newUserPicture.photo)" color="primary" />
                </div>
              </q-card-section>
            </q-card>
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center text-center full-width">Mot de passe</div>
              </q-card-section>
              <q-card-section class="bg-white col column">
                <div class="text-center text-red text-bold text-h6 col justify-center q-mt-lg">
                  <q-avatar icon="error" v-if="error !== ''"/>
                  {{ error }}
                </div>
                <div class="q-ma-lg full-width col-7">
                  <q-input class="col q-ma-lg" v-model="newUserPassword.password" type="password" outlined label="Nouveau mot de passe" />
                  <q-input class="col q-ma-lg" v-if="newUserPassword.password !== ''" v-model="validatePassword" type="password" outlined label="Confirmer mot de passe" />
                  <div class="full-width relative-position row">
                    <q-btn class="q-pa-md q-ma-lg text-h6 col" :disable="newUserPassword.password === ''" label="Sauvegarder" @click="resetPassword" color="primary" />
                    <q-btn class="q-pa-md q-ma-lg text-h6 col" v-if="newUserPassword.password !== ''" label="Annuler" @click="newUserPassword.password = ''; validatePassword = ''; error = ''" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center text-center full-width">Informations personnels</div>
              </q-card-section>
              <q-card-section class="bg-white col">
                <div class="q-ma-lg full-width absolute-center">
                  <q-input class="col q-ma-lg" v-model="this.newUserInfos.nom" outlined label="Nom" />
                  <q-input class="col q-ma-lg" v-model="this.newUserInfos.prenom" outlined label="Prenom" />
                  <q-input class="col q-ma-lg" v-model="this.newUserInfos.email" outlined label="E-mail" />
                  <div class="full-width relative-position row">
                    <q-btn class="q-pa-md q-ma-lg text-h6 col" label="Sauvegarder" @click="updateUser(newUserInfos)" :disable="!verifyInformations('and')" color="primary" />
                    <q-btn class="q-pa-md q-ma-lg text-h6 col" label="Annuler" @click="resetInformations" v-if="verifyInformations('or')" color="primary" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>

      </div>
    </q-img>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const scrollAreaRef = ref(null)
    return {
      scrollAreaRef,

      scoll (link) {
        let position
        this.link = link
        switch (link) {
          case 'profile':
            position = 0
            break
          case 'password':
            position = 0.5005
            break
          case 'info':
            position = 1
            break
        }
        scrollAreaRef.value.setScrollPercentage('vertical', position, 150)
      }
    }
  },
  data () {
    return {
      link: 'profile',
      newUserPicture: {
        photo: ''
      },
      newUserPassword: {
        password: ''
      },
      validatePassword: '',
      newUserInfos: {
        nom: '',
        prenom: '',
        email: ''
      },
      error: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser'])
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    resetPassword () {
      if (this.validatePassword !== this.newUserPassword.password) {
        this.error = 'MOT DE PASSE ET CONFIRMATION DIFFERENTS !'
        return false
      }
      this.error = ''
      this.updateUser(this.newUserPassword)
    },
    resetInformations () {
      this.newUserInfos.nom = this.getUser.nom
      this.newUserInfos.prenom = this.getUser.prenom
      this.newUserInfos.email = this.getUser.email
    },
    verifyInformations () {
      return this.newUserInfos.nom !== this.getUser.nom ||
          this.newUserInfos.prenom !== this.getUser.prenom ||
          this.newUserInfos.email !== this.getUser.email
    },
    updateScrollLink ({ verticalPercentage }) {
      if (verticalPercentage < 0.4) {
        this.link = 'profile'
      } else if (verticalPercentage >= 0.4 && verticalPercentage <= 0.9) {
        this.link = 'password'
      } else {
        this.link = 'info'
      }
    }
  },
  mounted () {
    this.newUserInfos.nom = this.getUser.nom
    this.newUserInfos.prenom = this.getUser.prenom
    this.newUserInfos.email = this.getUser.email
    this.newUserPicture.photo = this.getUser.photo
    console.log(this.getUser)
  }
})
</script>
