<template>
  <div class="text-center row full-width">
    <div class="col full-height">
      <div class="text-h1 q-mb-xl">
        {{ room.nom }}
      </div>
      <div class="text-h6">
        <q-card bordered class="my-card q-ma-lg">
          <q-card-section>
            <div class="text-h6 text-center">{{ room.nom }}</div>
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
      <q-btn class="absolute-center" icon="keyboard_double_arrow_down" label="Afficher capteurs" size="20px"></q-btn>
    </div>
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
    console.log(this.room.id)
  }
})
</script>
