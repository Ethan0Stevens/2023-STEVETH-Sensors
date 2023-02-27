<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated >
      <q-toolbar class="row">
        <q-btn class="col-1" flat label="Accueil" icon="home" to="/" />
        <!-- <q-separator vertical inset color="secondary" /> -->
        <q-tabs class="col-10" >
          <q-route-tab to="rooms" label="Salles" />
          <q-route-tab to="sensors" label="Capteurs" />
        </q-tabs>

        <q-btn v-if="!userIsLogedIn" class="col-1" flat label="Se connecter" icon="login" to="/connexion" />

        <q-btn-dropdown v-else class="col-1" color="secondary" label="Compte" dropdown-icon="arrow_drop_down">
          <q-list>
            <q-item clickable v-close-popup to="/profile">
              <q-item-section avatar>
                <q-avatar icon="account_circle" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-avatar icon="logout" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Se déconnecter</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters('auth', ['userIsLogedIn'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
})
</script>
