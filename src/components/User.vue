<template>
  <q-card bordered class="my-card q-ma-lg">
    <q-card-section class="row">
      <div class="col-1 text-h6 text-center">
        <q-img
        style="border-radius: 100%; max-width: 3vw; width: 100%; height: auto;"
        ratio="1"
        :src="user.photo === null || user.photo === '' ? 'https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png' : user.photo"/></div>
      <div class="col text-h6 text-center">{{ user.nom }} {{ user.prenom }}</div>
      <div class="col text-h6 text-center">{{ user.email }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserComp',
  props: ['user']
})
</script>
