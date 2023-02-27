<template>
  <q-expansion-item
    class="text-subtitle1"
    v-if="sensor.salle.id === roomId"
    expand-separator
    icon="sensors"
    :label="sensor.nom" >
    <div class="row justify-center">
      <mesure v-for="mesure in sensor.mesures"
              :key="mesure.id"
              :mesure="mesure">
      </mesure>
    </div>
  </q-expansion-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SensorComp',
  props: [
    'sensor',
    'roomId'
  ],
  components: {
    mesure: require('components/Mesure.vue').default
  }
})
</script>
