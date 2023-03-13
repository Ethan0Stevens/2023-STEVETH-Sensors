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
          <div class="text-center row full-width">
            <div class="col full-height">
              <div class="text-h1 q-mb-xl">
                B1-01
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
              <q-btn class="absolute-center" icon="keyboard_double_arrow_down" label="Afficher capteurs" size="20px"></q-btn>
            </div>
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
