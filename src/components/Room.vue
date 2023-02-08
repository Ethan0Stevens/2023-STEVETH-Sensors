<template>
  <q-card class="my-card q-ma-lg">
    <q-card-section class="bg-accent text-white">
      <div class="text-h2">{{ room.nom }}</div>
    </q-card-section>

    <q-card-actions vertical align="center">
      <q-btn class="text-black" flat icon="keyboard_double_arrow_down" >Afficher capteurs</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoomComp',
  props: ['room']
})
</script>
