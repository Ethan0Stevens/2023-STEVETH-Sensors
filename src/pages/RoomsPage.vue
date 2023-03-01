<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/tree_landscape.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center">
      <q-scroll-area class="absolute-top q-mt-lg" style="height: 70vh; width: 85vw; margin-left: auto; margin-right: auto">
        <div class="row justify-center" v-if="userIsLogedIn">
          <room
            v-for="room in getRooms"
            :key="room.id"
            :room="room" />
        </div>
        <btn-loged-in v-else/>
      </q-scroll-area>
      <q-btn class="bg-primary fixed-bottom q-mb-lg" style="width: 30vw; margin-right: auto; margin-left: auto" rounded size="30px" @click="addRoom({ nom: 'B1-14' })" v-if="getUser.is_admin" label="Ajouter"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  components: {
    room: require('components/Room.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default
  },
  computed: {
    ...mapGetters('sensors', ['getRooms']),
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
