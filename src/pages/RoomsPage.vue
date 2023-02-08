<template>
  <q-page>
    <div class="row vertical-middle absolute-center">
      <room
        v-for="room in getRooms"
        :key="room.id"
        :room="room"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  components: {
    room: require('components/Room.vue').default
  },
  computed: {
    ...mapGetters('sensors', ['getRooms'])
  },
  methods: {
    ...mapActions('sensors', ['getApiRooms'])
  },
  created () {
    this.getApiRooms()
  }
})
</script>
