<template>
  <div class="q-ma-lg" :class="!room.showSensors && !showAllRooms ? 'hidden' : ''" ref="morphRef">
    <q-card class="my-card">
      <q-card-section class="bg-accent text-white justify-center">
        <div class="text-h2 text-center">{{ room.nom }}</div>
        <q-btn @click="deleteRoom(this.room.id)" v-if="false" label="Supprimer"></q-btn>
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn class="text-black" v-if="toggle" flat icon="keyboard_double_arrow_up" @click="morphContent(room)">Cacher capteurs</q-btn>
        <q-btn class="text-black" v-else flat icon="keyboard_double_arrow_down" @click="morphContent(room)">Afficher capteurs</q-btn>
      </q-card-actions>

      <q-scroll-area
        class="bg-white text-black rounded-borders"
        v-if="toggle && sensorInTheRoom"
        style="height: 1px; min-height: 69vh; min-width: 65vw">
        <div class="q-py-sm q-px-md">
          <q-list bordered padding class="rounded-borders text-primary">
            <div v-for="sensor in getSensors"
                 :key="sensor.id" >
              <sensor v-if="sensor.salle.id === room.id" :sensor="sensor" />
            </div>
          </q-list>
        </div>
      </q-scroll-area>
      <div v-else-if="toggle" class="text-h4 text-primary q-pa-xl" style="margin-bottom: 10vh">Pas de capteur dans la salle</div>
    </q-card>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { morph } from 'quasar'

export default defineComponent({
  name: 'RoomComp',
  props: ['room'],
  setup () {
    const toggle = ref(false)
    const morphRef = ref(null)
    let cancel

    return {
      toggle,
      morphRef,

      /**
       * Animation de morph à l'appui du bouton 'afficher capteurs'
       * @param room
       */
      morphContent (room) {
        const onToggle = () => {
          toggle.value = toggle.value !== true
        }

        if (cancel === void 0 || cancel() === false) {
          cancel = morph({
            from: morphRef.value,
            onToggle,
            duration: 150,
            tween: true,
            onEnd: end => {
              end === 'from' && onToggle()
            }
          })
        }
        this.showSensors(room)
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
