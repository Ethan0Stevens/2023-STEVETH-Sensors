<template>
  <q-card class="my-card  q-ma-lg" v-if="showAllRooms || room.showSensors">
    <q-card-section class="bg-accent text-white">
      <div class="text-h2">{{ room.nom }}</div>
    </q-card-section>

    <q-card-actions vertical align="center">
      <q-btn class="text-black" flat icon="keyboard_double_arrow_down" @click="showSensors(room)">Afficher capteurs</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomComp',
  props: ['room'],
  methods: {
    ...mapActions('sensors', ['showSensors'])
  },
  computed: {
    ...mapGetters('sensors', ['showAllRooms'])
  }
})
</script>
