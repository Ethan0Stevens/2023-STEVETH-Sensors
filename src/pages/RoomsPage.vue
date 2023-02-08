<template>
  <q-page>
    <q-img class="fixed-bottom" height="100vh" src="https://imgs.search.brave.com/G7LlHE745NOfPeXKwSUgMduj7eILYifMt9YC0K99jmk/rs:fit:1200:707:1/g:ce/aHR0cDovL2ltZzIu/d2lraWEubm9jb29r/aWUubmV0L19fY2Iy/MDEyMDIxMzEwNTUy/MS9vbmVwaWVjZS1j/YXQvY2EvaW1hZ2Vz/LzMvMzkvSGFiaXRh/Y2lvbm9pc3N1bm55/LnBuZw">
      <div class="absolute-full flex flex-center">
        <div class="row absolute-center">
          <room
            v-for="room in getRooms"
            :key="room.id"
            :room="room"/>
        </div>
      </div>
    </q-img>
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
