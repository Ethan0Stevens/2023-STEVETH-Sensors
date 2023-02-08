<template>
  <q-page>
    <room :v-for="room in getApiRooms" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  components: {
    room: require('components/Room.vue').default
  },
  methods: {
    ...mapActions('sensors', ['getApiRooms'])
  }
})
</script>
