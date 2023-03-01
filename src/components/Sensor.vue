<template>
  <q-item class="full-width row">
    <q-expansion-item
      class="text-subtitle1 col"
      v-if="sensor.salle.id === roomId || roomId === 'all'"
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
    <q-item-section top side class="col-auto">
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" :class="isFavorite ? 'text-yellow' : ''" @click="makeFavorite" size="20px" flat dense round icon="star" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'SensorComp',
  props: [
    'sensor',
    'roomId'
  ],
  data () {
    return {
      isFavorite: false
    }
  },
  components: {
    mesure: require('components/Mesure.vue').default
  },
  methods: {
    makeFavorite () {
      this.isFavorite = !this.isFavorite
      LocalStorage.set('favoritesSensors', this.$q.localStorage.getItem('favoritesSensors').append(this.sensor))
    }
  }
})
</script>
