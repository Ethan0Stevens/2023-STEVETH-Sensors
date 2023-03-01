<template>
  <q-page>
    <video class="fixed-bottom-right" src="../assets/water_landscape.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center" style="background: rgba(0, 0, 0, 0.4)">
      <div class="row absolute-center" v-if="user">
        <q-scroll-area
          class="text-black rounded-borders"
          style="height: 1px; min-height: 90vh; min-width: 50vw; background: rgba(0, 0, 0, 0.6)">
          <div class="q-py-sm q-px-md" v-if="favoritesSensors">
            <q-list bordered padding class="rounded-borders text-primary">
              <sensor v-for="sensor in favoritesSensors"
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
      <btn-loged-in v-else />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'FavoritePage',
  data () {
    return {
      favorite: this.$q.localStorage.getItem('favoritesSensors')
    }
  },
  components: {
    sensor: require('components/Sensor.vue').default,
    btnLogedIn: require('components/BtnErrorLogedIn.vue').default
  },
  computed: {
    ...mapGetters('auth', ['userIsLogedIn'])
  }
})
</script>
