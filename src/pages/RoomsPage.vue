<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/tree_landscape.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center">
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        infinite
        swipeable
        animated
        control-type="push"
        control-color="primary"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation
        padding
        arrows
        style="height: 88vh; width: 85vw"
        class="bg-white text-primary shadow-1 rounded-borders">

        <q-carousel-slide :name="room.id" class="column flex-center" v-for="room in getRooms" :key="room.id">
          <room :room="room"/>
        </q-carousel-slide>
      </q-carousel>
      <q-btn class="bg-primary fixed-right q-mr-lg" style="height: 50vh;margin-bottom: auto; margin-top: auto" icon="add" rounded size="17px" @click="clickAdd = true" v-if="getUser.is_admin && showAllRooms"/>
      <q-dialog v-model="clickAdd">
        <q-card class="my-card full-width">
          <q-card-section>
            <div class="row no-wrap items-center text-center">
              <div class="col text-h5 text-bold ellipsis">
                Ajouter une salle
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form class="relative-position justify-center items-center" @submit="addRoom(room)">
              <q-input maxlength="5" class="q-mx-lg q-mb-lg" v-model="room.nom" :rules="[ val => val && val.length > 0 || 'Champ obligatoire']"></q-input>
              <q-separator />
              <div class="row q-mt-md">
                <q-btn class="col" v-close-popup flat color="primary" label="Annuler" />
                <q-btn class="col" v-close-popup flat color="primary" label="Ajouter" type="submit"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  setup () {
    return {
      slide: ref(1)
    }
  },
  data () {
    return {
      // Creation de variable
      clickAdd: false,
      room: {
        nom: ''
      }
    }
  },
  components: {
    // Initialisation des composants
    room: require('components/Room.vue').default
  },
  computed: {
    // Mappage des getters des magasins
    ...mapGetters('sensors', ['getRooms', 'showAllRooms']),
    ...mapGetters('auth', ['userIsLogedIn', 'getUser'])
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('sensors', ['getApiRooms', 'addRoom'])
  },
  created () {
    // Code executé a la creation de la page
    // Si l'utilisateur est connecté, alors appeler les salles depuis l'API
    if (this.userIsLogedIn) {
      this.getApiRooms()
    }
  }
})
</script>
