<template>
  <q-page>
    <video class="fixed-bottom" style="min-height: 100%; min-width: 100%; transform: translate(0, 15vh)" src="../assets/one-piece-sunny.mp4" autoplay muted loop />
    <div class="flex flex-center absolute-full" style="background: rgba(0, 0, 0, 0.4)">
      <chart/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    chart: require('components/Chart').default
  }
})
</script>
