<script setup>
import { reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { registerUser } from 'src/stores/auth'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

async function submitRegister () {
  loading.value = true

  try {
    await registerUser(form)
    $q.notify({ type: 'positive', message: 'Cuenta creada correctamente' })
    router.replace('/')
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'No se pudo crear la cuenta' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-page class="row items-center justify-center q-pa-md">
    <q-card class="auth-card shadow-8">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold">Crear cuenta</div>
        <div class="text-subtitle2 text-grey-7">Registra tu usuario para guardar animes</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="submitRegister">
          <q-input v-model="form.name" label="Nombre" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.email" type="email" label="Email" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.password" type="password" label="Contraseña" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.confirmPassword" type="password" label="Confirmar contraseña" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-btn type="submit" color="primary" label="Crear cuenta" class="full-width" :loading="loading" />
          <q-btn flat color="primary" label="Volver al login" class="full-width" @click="$router.push('/login')" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>