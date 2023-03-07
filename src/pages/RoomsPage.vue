<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/tree_landscape.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center">
      <q-scroll-area class="absolute-top" style="height: 90vh; width: 85vw; margin-left: auto; margin-right: auto">
        <div class="row justify-center" v-if="userIsLogedIn">
          <room
            v-for="room in getRooms"
            :key="room.id"
            :room="room" />
        </div>
        <btn-loged-in v-else/>
      </q-scroll-area>
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
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  data () {
    return {
      clickAdd: false,
      room: {
        nom: ''
      }
    }
  },
  components: {
    room: require('components/Room.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default
  },
  computed: {
    ...mapGetters('sensors', ['getRooms', 'showAllRooms']),
    ...mapGetters('auth', ['userIsLogedIn', 'getUser'])
  },
  methods: {
    ...mapActions('sensors', ['getApiRooms', 'addRoom'])
  },
  created () {
    this.getApiRooms()
  }
})
</script>
