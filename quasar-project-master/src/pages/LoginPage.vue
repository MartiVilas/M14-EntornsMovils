<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { loginUser } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const form = reactive({
  email: '',
  password: ''
})

async function submitLogin () {
  loading.value = true

  try {
    await loginUser(form)
    $q.notify({ type: 'positive', message: 'Sesión iniciada correctamente' })
    router.replace('/')
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'No se pudo iniciar sesión' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-page class="row items-center justify-center q-pa-md">
    <q-card class="auth-card shadow-8">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold">Anime Mobile</div>
        <div class="text-subtitle2 text-grey-7">Accede a tu catálogo de animes</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="submitLogin">
          <q-input v-model="form.email" type="email" label="Email" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.password" type="password" label="Contraseña" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-btn type="submit" color="primary" label="Entrar" class="full-width" :loading="loading" />
          <q-btn flat color="primary" label="Crear cuenta" class="full-width" @click="$router.push('/register')" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>