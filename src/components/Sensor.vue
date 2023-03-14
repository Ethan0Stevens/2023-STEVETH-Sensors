<template>
  <q-item class="full-width row text-center" v-if="roomId === sensor.salle.id || roomId === 'all'">
    <q-expansion-item
      class="text-subtitle1 col"
      expand-separator
      icon="sensors"
      :label="sensor.nom + '&emsp; | &emsp; ☀ ' + this.latestMesure.temperature + '°C &emsp; 🌧️ ' + this.latestMesure.humidite +'%' " >
      <div>
        <chart class="q-my-lg" style="width: 30vw; margin-left: auto; margin-right: auto" :temp="getTemperatures" :humidite="getHumidite" :size="10" :id="sensor.id" />
      </div>
      <div class="row justify-center">
        <mesure v-for="mesure in sensor.mesures"
                :key="mesure.id"
                :mesure="mesure">
        </mesure>
      </div>
    </q-expansion-item>
    <q-item-section top side class="col-auto">
      <div class="text-grey-8">
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
    // Creation des variables
    return {
      isFavorite: false,
      latestMesure: {
        temperature: 0,
        humidite: 0
      }
    }
  },
  components: {
    // Initialisation des composants
    mesure: require('components/Mesure.vue').default,
    chart: require('components/Chart.vue').default
  },
  computed: {
    /**
     * Recupere toutes les temperatures du capteur
     * @returns la liste des temperatures
     */
    getTemperatures () {
      const temp = []
      this.sensor.mesures.forEach(mesure => {
        if (temp.length <= 0) {
          this.latestMesure.temperature = mesure.temperature
        }
        temp.push(mesure.temperature)
      })
      return temp
    },
    /**
     * Recupere toutes les mesures d'humiditée du capteur
     * @returns la liste des mesures
     */
    getHumidite () {
      const humi = []
      this.sensor.mesures.forEach(mesure => {
        if (humi.length <= 0) {
          this.latestMesure.humidite = mesure.humidite
        }
        humi.push(mesure.humidite)
      })
      return humi
    }
  },
  methods: {
    /**
     * Ajoute le capteur à la liste des favories
     */
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
    // Code executé au montage de la page

    // Recupere la liste des favories
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
