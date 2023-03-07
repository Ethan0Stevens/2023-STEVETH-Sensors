<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-luffy.mp4" autoplay muted loop />
      <div class="absolute-full flex flex-center row" style="background: rgba(0, 0, 0, 0.4)">
        <div class="row col" v-if="userIsLogedIn">
          <q-scroll-area
            class="text-black rounded-borders q-ml-xl"
            style="height: 1px; min-height: 80vh; min-width: 62vw; background: rgba(255, 255, 255, 0.8)">
            <div class="q-py-sm q-px-md">
              <q-list bordered padding class="rounded-borders text-primary">
                <sensor v-for="sensor in getSensors"
                        :key="sensor.id"
                        :sensor="sensor"
                        roomId="all" />
              </q-list>
            </div>
          </q-scroll-area>
        </div>
        <btn-loged-in v-else />
        <div class="col-auto column q-mr-xl" style="background: rgba(0,0,0,0.8)">
          <div class="col text-center text-h6 q-my-lg text-primary text-bold">Graphique de la dernière mesure de tous les capteurs</div>
          <chart class="col-auto" :temp="getTemperatures" :humidite="getHumidite" :size="getSensors.length" :id="'all'"/>
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  components: {
    sensor: require('components/Sensor.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default,
    chart: require('components/Chart.vue').default
  },
  computed: {
    ...mapGetters('sensors', ['getSensors']),
    ...mapGetters('auth', ['userIsLogedIn']),
    getTemperatures () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).temperature)
      })
      return temp
    },
    getHumidite () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).humidite)
      })
      return temp
    }
  },
  methods: {
    ...mapActions('sensors', ['getApiSensors'])
  },
  created () {
    this.getApiSensors()
  }
})
</script>
