<template>
  <div class="absolute-center" >
    <q-btn
      rounded
      size="2.5vh"
      class="q-px-xl q-py-xs"
      color="secondary"
      label="Vous devez être connecté pour accéder au contenu de cette page !"
      to="connexion"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnErrorLogedIn'
})
</script>
