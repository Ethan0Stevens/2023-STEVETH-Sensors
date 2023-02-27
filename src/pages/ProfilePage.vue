<template>
  <q-page class="fullscreen" >
    <q-img :fit="'fill'" height="100vh" src="https://getwallpapers.com/wallpaper/full/8/7/3/1089718-one-piece-crew-wallpaper-1920x1080-for-full-hd.jpg">
      <div class="absolute-full flex flex-center">

        <q-btn class="fixed-top-left q-ma-xl" label="Retour" size="xl" icon="arrow_back" color="primary" rounded @click="$router.go(-1)" />

        <div class="q-pa-md flex-center" style="width: 30vw; height: auto; background: rgba(0, 0, 0, 0.7)">
          <q-list bordered padding class="rounded-borders text-primary">
            <q-item
              clickable
              v-ripple
              :active="link === 'inbox'"
              @click="link = 'inbox'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section class="text-h6">Inbox</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'outbox'"
              @click="link = 'outbox'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section class="text-h6">Outbox</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'trash'"
              @click="link = 'trash'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>

              <q-item-section class="text-h6">Trash</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'settings'"
              @click="link = 'settings'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section class="text-h6">Settings</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :active="link === 'help'"
              @click="link = 'help'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section class="text-h6">Help</q-item-section>
            </q-item>
          </q-list>
        </div>

      </div>
    </q-img>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'ConnexionPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login'])
  }
})
</script>
