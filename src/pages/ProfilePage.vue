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
              @click="link = 'profile'"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="face" :color="link === 'profile' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Profile</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="link = 'password'"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="vpn_key" :color="link === 'password' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Mot de passe</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="link = 'info'"
              active-class="my-menu-link" >
              <q-item-section avatar>
                <q-icon name="contacts" :color="link === 'info' ? '' : 'grey'" />
              </q-item-section>

              <q-item-section class="text-h6">Informations personnels</q-item-section>
            </q-item>
          </q-list>
        </div>

        <q-scroll-area
          class="text-black fixed-bottom-right"
          style="height: 1px; min-height: 100vh; min-width: 70vw; background: rgba(0, 0, 0, 0.5)">
          <div class="q-py-xs flex-center">
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center">Profile</div>
              </q-card-section>
              <q-card-section class="bg-white col column">
                <div class="col relative-position">
                  <q-img
                    class="absolute-center"
                    style="border-radius: 100%;"
                    :src="photo === null || photo === '' ? 'https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png' : photo"
                    height="30vh"
                    width="30vh"/>
                </div>

                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md col-5">
                  <div class="absolute-bottom q-mb-lg">
                    <q-input outlined label="Nouveau lien" v-model="photo" />
                    <q-btn class="full-width q-pa-md q-ma-lg text-h6" disable label="Sauvegarder" type="submit" color="primary" />
                  </div>
                </q-form>

              </q-card-section>
            </q-card>
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center">Profile</div>
              </q-card-section>
              <q-card-section class="bg-white col">
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md">
                  <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"/>

                  <q-input
                    filled
                    type="number"
                    v-model="age"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Please type your age',
                      val => val > 0 && val < 100 || 'Please type a real age'
                    ]"/>

                  <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
            <q-card class="row" style="background: rgba(50, 50, 50, 0.7); width: 60vw; height: 80vh; margin: 10vh 5vw 10vh 5vw">
              <q-card-section class="col-5">
                <div class="text-h2 text-bold text-primary absolute-center">Profile</div>
              </q-card-section>
              <q-card-section class="bg-white col">
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md">
                  <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"/>

                  <q-input
                    filled
                    type="number"
                    v-model="age"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Please type your age',
                      val => val > 0 && val < 100 || 'Please type a real age'
                    ]"/>

                  <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>

      </div>
    </q-img>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'ProfilePage',
  data () {
    return {
      link: 'profile',
      photo: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser'])
  },
  created () {
    this.photo = this.getUser.photo
  }
})
</script>
