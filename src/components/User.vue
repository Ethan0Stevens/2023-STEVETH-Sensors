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
      <div><q-btn icon="settings" @click="makeAdmin = true" /></div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="makeAdmin">
    <q-card class="my-card full-width">
      <q-card-section>
        <div class="row no-wrap items-center text-center">
          <div class="col text-h5 text-bold ellipsis">
            Rendre cet utilisateur Admin ?
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="center">
        <q-btn class="q-mx-xl" flat label="Annuler" color="primary" v-close-popup />
        <q-btn class="q-mx-xl" flat label="Confirmer" color="primary" v-close-popup @click="setAdmin(user.id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'UserComp',
  props: ['user'],
  data () {
    return {
      makeAdmin: false
    }
  },
  methods: {
    ...mapActions('auth', ['setAdmin'])
  }
})
</script>
