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
        v-if="toggle"
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

      <q-btn class="bg-primary fixed-right q-mr-lg" style="height: 50vh;margin-bottom: auto; margin-top: auto" icon="add" rounded size="17px" @click="clickAdd = true" v-if="getUser.is_admin && showAllRooms"/>
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
    sensor: require('components/Sensor.vue').default
  },
  methods: {
    ...mapActions('sensors', ['showSensors', 'getApiSensors', 'deleteRoom'])
  },
  computed: {
    ...mapGetters('sensors', ['showAllRooms', 'getSensors']),
    ...mapGetters('auth', ['getUser'])
  },
  created () {
    this.getApiSensors()
  }
})
</script>
