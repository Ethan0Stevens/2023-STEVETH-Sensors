<template>
  <q-item class="full-width row text-center">
    <q-expansion-item
      class="text-subtitle1 col"
      expand-separator
      icon="sensors"
      :label="sensor.nom" >
      <div class="row justify-center">
        <chart :temp="getTemperatures" :humidite="getHumidite" :size="10" :id="sensor.id" />
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
    'sensor'
  ],
  data () {
    return {
      isFavorite: false
    }
  },
  components: {
    mesure: require('components/Mesure.vue').default,
    chart: require('components/Chart.vue').default
  },
  computed: {
    getTemperatures () {
      const temp = []
      this.sensor.mesures.forEach(mesure => {
        temp.push(mesure.temperature)
      })
      return temp
    },
    getHumidite () {
      const humi = []
      this.sensor.mesures.forEach(mesure => {
        humi.push(mesure.humidite)
      })
      return humi
    }
  },
  methods: {
    makeFavorite () {
      this.isFavorite = !this.isFavorite
      let favorites = this.$q.localStorage.getItem('favorites')
      if (favorites) {
        if (this.isFavorite) {
          favorites.push(this.sensor)
        } else {
          favorites = favorites.filter(sensor => (sensor.id !== this.sensor.id))
        }
        LocalStorage.set('favorites', favorites)
      }
    }
  },
  mounted () {
    const sensors = this.$q.localStorage.getItem('favorites')
    if (sensors) {
      sensors.forEach(sensor => {
        if (sensor.id === this.sensor.id) {
          this.isFavorite = true
        }
      })
    } else {
      this.isFavorite = false
    }
  }
})
</script>
