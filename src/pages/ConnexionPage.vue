<template>
  <q-page class="fullscreen" >
    <q-img :fit="'fill'" height="100vh" src="https://getwallpapers.com/wallpaper/full/8/7/3/1089718-one-piece-crew-wallpaper-1920x1080-for-full-hd.jpg">
      <div class="absolute-full flex flex-center">
        <q-card class="my-card">
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md" >
              <q-input
                filled
                label="Adresse e-mail *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Champ obligatoire']" />

              <q-input
                filled
                label="Mot de passe *"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your age',
                  val => val > 0 && val < 100 || 'Please type a real age'
                ]" />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-img>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConnexionPage'
})
</script>
