<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-sunny.mp4" autoplay muted loop />
    <div class="absolute-full" style="background: rgba(0, 0, 0, 0.4)" >
      <div class="row absolute-full" v-if="userIsLogedIn">
        <div class="col-auto column" style="margin: auto;">
          <div class="col">
            <q-card bordered class="my-card q-mt-lg">
              <q-card-section>
                <div class="text-h6 text-center">Dernière mesure</div>
              </q-card-section>
              <q-separator/>
              <q-card-section class="text-black">
                <div class="row q-ma-lg text-center">
                  <div class="col">
                    <q-icon name="sunny" size="40px"></q-icon>
                    {{ lastMesure.temperature }} °C
                  </div>
                  <div class="col">
                    <q-icon name="water_drop" size="40px"></q-icon>
                    {{ lastMesure.humidite }} %
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col rounded-borders q-mb-lg" style="background: rgba(255, 255, 255, 0.7)">
            <chart class="" style="max-width: 40vw;" :temp="getTemperatures" :humidite="getHumidite" :dates="getDates" :id="-1" />
          </div>
        </div>
        <div class="row col-auto q-mr-xl">
          <q-scroll-area
            class="text-black rounded-borders"
            style="height: 85vh; width: 50vw;margin: auto; background: rgba(255, 255, 255, 0.7)">
            <div class="q-py-sm q-px-md" v-if="favorites.length > 0">
              <q-list bordered padding class="rounded-borders text-primary">
                <sensor v-for="sensor in favorites"
                        :key="sensor.id"
                        :sensor="sensor"
                        roomId="all" />
              </q-list>
            </div>
            <div class="text-h2 text-bold text-primary text-center absolute-center full-width" v-else>
              Aucun capteur favori
            </div>
          </q-scroll-area>
        </div>
      </div>
      <btn-loged-in v-else />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      // Creation des variables
      favorites: {},
      lastMesure: {
        id: -1,
        temperature: 0,
        humidite: 0
      }
    }
  },
  components: {
    // Initialisation des composants
    sensor: require('components/Sensor.vue').default,
    chart: require('components/Chart.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default
  },
  computed: {
    // Mappage des getters des magasins
    ...mapGetters('auth', ['userIsLogedIn']),
    ...mapGetters('sensors', ['getMesures', 'getSensors']),
    /**
     * Retourne La derniere temperatures de tous les capteurs sous forme de liste
     * @returns La liste des temperatures
     */
    getTemperatures () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).temperature)
        temp.push(sensor.mesures.at(1).temperature)
      })
      return temp
    },
    /**
     * Retourne La derniere mesure d'humidité de tous les capteurs sous forme de liste
     * @returns La liste des mesures d'humidités
     */
    getHumidite () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).humidite)
        temp.push(sensor.mesures.at(1).humidite)
      })
      return temp
    },
    getDates () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).date.substring(0, 10))
      })
      return temp
    }
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('sensors', ['getApiMesures', 'getApiSensors']),
    setLastMesure () {
      this.getSensors.forEach(sensor => {
        if (this.lastMesure.id < sensor.mesures[0].id) {
          this.lastMesure = sensor.mesures[0]
        }
      })
    }
  },
  created () {
    // Code executé a la création de la page
    // Recupere la liste des favorits dans le LocalStorage
    this.favorites = this.$q.localStorage.getItem('favorites')
    if (this.userIsLogedIn) {
      this.getApiSensors()
      this.setLastMesure()
    }
  }
})
</script>
