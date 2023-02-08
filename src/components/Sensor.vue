<template>
  <q-item
    clickable
    v-ripple
    active-class="my-menu-link">
    <q-item-section avatar>
      <q-icon name="sensors" />
    </q-item-section>
    <q-item-section>{{ sensor.nom }}</q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SensorComp',
  props: ['sensor']
})
</script>
