<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-luffy.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center" style="background: rgba(0, 0, 0, 0.4)">
      <div class="row col justify-center" v-if="userIsLogedIn">
        <q-scroll-area
          class="text-black rounded-borders q-ml-xl col"
          style="min-height: 85vh; max-width: 62vw; background: rgba(255, 255, 255, 0.8)">
          <div class="q-py-sm q-px-md">
            <q-list bordered padding class="rounded-borders text-primary">
              <user v-for="user in getUsers" :key="user.id" :user="user" />
            </q-list>
          </div>
        </q-scroll-area>
      </div>
      <q-btn class="bg-primary fixed-right q-mr-xl" style="height: 50vh;margin-bottom: auto; margin-top: auto" icon="add" rounded size="25px" @click="clickAdd = true"/>
      <q-dialog v-model="clickAdd">
        <q-card class="my-card full-width">
          <q-card-section>
            <div class="row no-wrap items-center text-center">
              <div class="col text-h5 text-bold ellipsis">
                Créer un utilisateur
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form class="relative-position justify-center items-center">
              <div class="row">
                <q-input class="col q-mx-lg q-mb-lg" label="Nom" v-model="newUser.nom" :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"></q-input>
                <q-input class="col q-mx-lg q-mb-lg" label="Prenom" v-model="newUser.prenom" :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"></q-input>
              </div>
              <q-input class="q-mx-lg q-mb-lg" type="email" label="Email" v-model="newUser.email" :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"></q-input>
              <q-input class="q-mx-lg q-mb-lg" label="Mot de passe" type="password" v-model="newUser.password" :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"></q-input>
              <div class="col q-mb-lg">
                <q-checkbox v-model="newUser.is_admin" class="justify-center" label="admin" />
              </div>
              <q-separator />
              <div class="row q-mt-md">
                <q-btn class="col" v-close-popup flat color="primary" label="Annuler" />
                <q-btn class="col" v-close-popup flat color="primary" label="Ajouter" @click="createUser(newUser)"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'AdminPage',
  data () {
    return {
      // Creation des variables
      newUser: {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        is_admin: false
      },
      clickAdd: false
    }
  },
  components: {
    // Initialisation des composants
    user: require('components/User.vue').default
  },
  computed: {
    ...mapGetters('auth', ['getUsers', 'userIsLogedIn'])
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('auth', ['createUser', 'getAllUsers'])
  },
  created () {
    this.getAllUsers()
  }
})
</script>
