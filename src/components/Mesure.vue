<template>
  <q-card bordered class="my-card q-ma-lg">
    <q-card-section>
      <div class="text-h6 text-center">Mesure N° {{ mesure.id }}</div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-black" >
      <div> Temperature : {{ mesure.temperature }}  </div>
      <div> Humidité : {{ mesure.humidite }}  </div>
      <div> Sequence : {{ mesure.sequence }}  </div>
      <div> Date : {{ mesure.date }}  </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MesureComp',
  props: ['mesure']
})
</script>
