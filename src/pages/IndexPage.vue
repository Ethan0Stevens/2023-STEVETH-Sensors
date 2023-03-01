<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-sunny.mp4" autoplay muted loop />
    <div class="absolute-full flex flex-center" style="background: rgba(0, 0, 0, 0.4)">
      <h1 class="text-white">Bienvenu !</h1>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
