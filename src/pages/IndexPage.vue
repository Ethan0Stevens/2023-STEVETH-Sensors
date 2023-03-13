<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-sunny.mp4" autoplay muted loop />
    <div class="flex flex-center absolute-full" style="background: rgba(0, 0, 0, 0.4)">
      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-type="push"
        control-color="primary"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation
        padding
        arrows
        style="height: 80vh; width: 80vw"
        class="bg-white text-primary shadow-1 rounded-borders">

        <q-carousel-slide name="style" class="column flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            B1-01
          </div>
        </q-carousel-slide>

        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            2
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            3
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            4
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    return {
      slide: ref('style')
    }
  }
})
</script>
