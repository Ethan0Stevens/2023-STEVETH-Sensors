<template>
  <q-page>
    <video class="fixed-bottom-right" src="../assets/one-piece-luffy.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center" style="background: rgba(0, 0, 0, 0.4)">
      <div class="row absolute-center" v-if="userIsLogedIn">
        <q-scroll-area
          class="bg-white text-black rounded-borders"
          style="height: 1px; min-height: 90vh; min-width: 50vw">
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FavoritePage'
})
</script>
