<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-luffy.mp4" autoplay muted loop />
      <div class="absolute-full flex flex-center row" style="background: rgba(0, 0, 0, 0.4)">
        <div class="row col justify-center" v-if="userIsLogedIn">
          <q-scroll-area
            class="text-black rounded-borders q-ml-xl col"
            style="min-height: 80vh; max-width: 62vw; background: rgba(255, 255, 255, 0.8)">
            <div class="q-py-sm q-px-md" v-if="getSensors.length > 0">
              <q-list bordered padding class="rounded-borders text-primary">
                <sensor v-for="sensor in getSensors"
                        :key="sensor.id"
                        :sensor="sensor"
                        roomId="all" />
                <!-- Probleme dans l'api lors de l'ajout d'un capteur
                <q-item class="full-width row text-center" v-if="getUser.is_admin">
                  <q-btn class="full-width bg-primary text-white" size="20px" flat dense rounded icon="add" @click="clickAdd = true" />
                </q-item>
                -->
              </q-list>
            </div>
            <div class="text-h2 text-bold text-primary text-center absolute-center full-width" v-else>
              Aucun capteur
            </div>
          </q-scroll-area>
          <div class="q-mx-xl justify-center col-4" v-if="getSensors.length > 0" style="background: rgba(0,0,0,0.8); margin-top: auto; margin-bottom: auto">
            <div class="text-center text-h6 q-my-lg text-primary text-bold">Graphique de la dernière mesure de tous les capteurs</div>
            <chart :temp="getTemperatures" :humidite="getHumidite" :dates="getdates" :id="'all'"/>
          </div>
        </div>
        <btn-loged-in v-else />
        <q-dialog v-model="clickAdd">
          <q-card class="my-card full-width">
            <q-card-section>
              <div class="row no-wrap items-center text-center">
                <div class="col text-h5 text-bold ellipsis">
                  Ajouter un capteur
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-form class="relative-position justify-center items-center" @submit="addSensor(newSensor)">
                <q-input class="q-my-lg" v-model="newSensor.nom" label="Nom" />
                <q-input class="q-my-lg" v-model="newSensor.code" label="Code" />
                <q-select class="q-my-lg" outlined v-model="newSensor.salle_id" :options="getRoomsId" label="ID Salle" />
                <div class="row q-mt-md">
                  <q-btn class="col" v-close-popup flat color="primary" label="Annuler" />
                  <q-btn class="col" v-close-popup flat color="primary" label="Ajouter" type="submit"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'RoomsPage',
  data () {
    return {
      clickAdd: false,
      newSensor: {
        nom: '',
        logo: 'null',
        code: '',
        salle_id: 0
      }
    }
  },
  components: {
    // Initialisation des composants
    sensor: require('components/Sensor.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default,
    chart: require('components/Chart.vue').default
  },
  computed: {
    // Mappage des getters des magasins
    ...mapGetters('sensors', ['getSensors', 'getRooms']),
    ...mapGetters('auth', ['userIsLogedIn', 'getUser']),
    /**
     * Retourne La derniere temperatures de tous les capteurs sous forme de liste
     * @returns La liste des temperatures
     */
    getTemperatures () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).temperature)
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
      })
      return temp
    },
    /**
     * Retourne les dates de chaques mesure de chaque capteurs
     * @returns la liste de dates
     */
    getdates () {
      const temp = []
      this.getSensors.forEach(sensor => {
        temp.push(sensor.mesures.at(0).date.substring(0, 10))
      })
      return temp
    },
    /**
     * Retourne une liste de l'id de chaque capteur
     * @returns La liste d'id
     */
    getRoomsId () {
      const temp = []
      this.getRooms.forEach(room => {
        temp.push(room.id)
      })
      return temp
    }
  },
  methods: {
    // Mappage des actions des magasins
    ...mapActions('sensors', ['getApiSensors', 'getApiRooms', 'addSensor'])
  },
  created () {
    // Code executé a la creation de la page
    // Si l'utilisateur est connecté, alors appeler les capteurs depuis l'API
    if (this.userIsLogedIn) {
      this.getApiSensors()
      this.getApiRooms()
    }
  }
})
</script>
