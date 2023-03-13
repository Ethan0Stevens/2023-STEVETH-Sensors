<template>
  <div class="text-center row full-width" v-if="showAllRooms || !room.showSensors">
    <div class="col full-height">
      <div class="text-h1 q-mb-xl">
        {{ room.nom }}
      </div>
      <div class="text-h6">
        <q-card bordered class="my-card q-ma-lg">
          <q-card-section>
            <div class="text-h6 text-center">Dernière mesure</div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="text-black">
            <div class="row q-ma-lg text-center">
              <div class="col">
                <q-icon name="sunny" size="40px"></q-icon>
                0 °C
              </div>
              <div class="col">
                <q-icon name="water_drop" size="40px"></q-icon>
                100 %
              </div>
            </div>
            <div class="q-mt-xl"> 19-06-2004  </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col relative-position">
      <q-btn class="absolute-center" icon="keyboard_double_arrow_down" @click="showSensors(room)" label="Afficher capteurs" size="20px"></q-btn>
    </div>
  </div>
  <div class="q-mb-lg row justify-center text-center" v-if="room.showSensors">
    <div class="text-h4 q-mr-xl">
      {{ room.nom }}
    </div>
    <div class="col relative-position" >
      <q-btn icon="keyboard_double_arrow_down" @click="showSensors(room)" label="Cacher capteurs" size="20px"></q-btn>
    </div>
  </div>
  <q-scroll-area
    v-if="room.showSensors"
    class="text-black rounded-borders q-ml-xl"
    style="min-height: 65vh; width: 70vw; background: rgba(255, 255, 255, 0.8)">
    <div class="q-pb-sm q-px-md" v-if="getSensors.length > 0 && sensorInTheRoom">
      <q-list bordered padding class="rounded-borders text-primary">
        <sensor v-for="sensor in getSensors"
                :key="sensor.id"
                :sensor="sensor"
                :roomId="room.id" />
      </q-list>
    </div>
    <div class="text-h2 text-bold text-primary text-center absolute-center full-width" v-else>
      Aucun capteur
    </div>
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomComp',
  props: ['room'],
  components: {
    // Initialisation des composants
    sensor: require('components/Sensor.vue').default
  },
  computed: {
    // Mappage des getters des magasins
    ...mapGetters('sensors', ['showAllRooms', 'getSensors']),
    ...mapGetters('auth', ['getUser', 'userIsLogedIn']),

    /**
     * Compte le nombre de capteur d'une salle et retourne vrai si il y a plus de 0 capteur
     * @returns vrai ou faux
     */
    sensorInTheRoom () {
      let count = 0
      this.getSensors.forEach(sensor => {
        if (sensor.salle.id === this.room.id) {
          count++
        }
      })
      return count > 0
    }
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('sensors', ['showSensors', 'getApiSensors', 'deleteRoom'])
  },
  created () {
    // Code executé a la creation de la page
    // si l'utilisateur est connecté, alors appele les capteurs depuis l'API
    if (this.userIsLogedIn) {
      this.getApiSensors()
    }
  }
})
</script>
