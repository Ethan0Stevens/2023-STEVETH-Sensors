<template>
  <q-page>
    <video class="fixed-bottom-right" src="../assets/tree_landscape.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center">
      <div class="row absolute-center" v-if="userIsLogedIn">
        <room
          v-for="room in getRooms"
          :key="room.id"
          :room="room" />
      </div>
      <btn-loged-in v-else/>
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
    ...mapGetters('auth', ['userIsLogedIn'])
  },
  methods: {
    ...mapActions('sensors', ['getApiRooms'])
  },
  created () {
    this.getApiRooms()
  }
})
</script>
