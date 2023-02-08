<template>
  <div class="q-ma-lg" v-if="showAllRooms || room.showSensors">
    <q-card class="my-card">
      <q-card-section class="bg-accent text-white justify-center">
        <div class="text-h2 text-center">{{ room.nom }}</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn class="text-black" flat icon="keyboard_double_arrow_down" @click="showSensors(room)">Afficher capteurs</q-btn>
      </q-card-actions>
        <q-scroll-area
          class="bg-white text-black rounded-borders"
          style="height: 1px; min-height: 60vh; min-width: 100vh"
          v-if="room.showSensors" >
          <div class="q-py-sm q-px-md">
            <q-list bordered padding class="rounded-borders text-primary">
              <sensor/>
            </q-list>
          </div>
        </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomComp',
  props: ['room'],
  components: {
    sensor: require('components/Sensor.vue').default
  },
  methods: {
    ...mapActions('sensors', ['showSensors'])
  },
  computed: {
    ...mapGetters('sensors', ['showAllRooms'])
  }
})
</script>
