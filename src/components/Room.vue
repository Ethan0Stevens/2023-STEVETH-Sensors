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
    </div>
    <div class="col justify-center column full-height">
      <div class="col relative-position" v-if="getUser.is_admin && showAllRooms">
        <q-btn class="absolute-center" icon="delete" @click="confirm = true" label="Supprimer salle" size="25px"></q-btn>
      </div>
      <div class="col relative-position">
        <q-btn class="absolute-center" icon="keyboard_double_arrow_down" @click="showSensors(room)" label="Afficher capteurs" size="25px"></q-btn>
      </div>
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
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white" />
        <span class="q-ml-sm">Voulez-vous vraiment supprimer cette salle ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="primary" v-close-popup />
        <q-btn flat label="Supprimer" color="primary" v-close-popup @click="deleteRoom(room.id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomComp',
  props: ['room'],
  setup () {
    return {
      confirm: ref(false)
    }
  },
  data () {
    return {
      lastMesure: {
        id: -1,
        temperature: 0,
        humidite: 0
      }
    }
  },
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
          this.setLastMesure(sensor.mesures.at(0))
          count++
        }
      })
      return count > 0
    }
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('sensors', ['showSensors', 'getApiSensors', 'deleteRoom']),
    setLastMesure () {
      this.getSensors.forEach(sensor => {
        if (sensor.salle.id === this.room.id) {
          if (this.lastMesure.id < sensor.mesures[0].id) {
            this.lastMesure = sensor.mesures[0]
          }
        }
      })
    }
  },
  created () {
    // Code executé a la creation de la page
    // si l'utilisateur est connecté, alors appele les capteurs depuis l'API
    if (this.userIsLogedIn) {
      this.getApiSensors()
      this.setLastMesure()
    }
  }
})
</script>
