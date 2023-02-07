<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated >
      <q-toolbar class="row">
        <q-btn class="col-1" flat label="Accueil" icon="home" />
        <!-- <q-separator vertical inset color="secondary" /> -->
        <q-tabs class="col-10" >
          <q-route-tab to="/" label="Page One" />
          <q-route-tab to="/" label="Page Two" />
          <q-route-tab to="/" label="Page Three" />
        </q-tabs>

        <q-btn class="col-1" flat label="Se connecter" icon="login" to="/connexion" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
