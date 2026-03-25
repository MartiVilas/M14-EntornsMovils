<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()
const auth = useAuthStore()

const isRegister = ref(false)
const showPassword = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: '',
})

async function handleSubmit() {
  try {
    if (isRegister.value) {
      await auth.register(form)
      $q.notify({ type: 'positive', message: 'Compte creat. Ara pots iniciar sessió.' })
      isRegister.value = false
      return
    }

    await auth.login({ email: form.email, password: form.password })
    $q.notify({ type: 'positive', message: 'Sessió iniciada correctament.' })
    await router.push('/tasks')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || "No s'ha pogut completar l'operació.",
    })
  }
}
</script>
<template>
  <q-page class="row items-center justify-center q-pa-md bg-grey-2">
    <q-card class="full-width" style="max-width: 420px">
      <q-card-section>
        <div class="text-h5 text-weight-bold">{{ isRegister ? 'Registre' : 'Login' }}</div>
        <div class="text-subtitle2 text-grey-7">Connexió amb l'API de Nuxt</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
          <q-input v-model="form.name" v-if="isRegister" label="Nom" outlined />
          <q-input
            v-model="form.email"
            label="Email"
            outlined
            type="email"
            lazy-rules
            :rules="[(v) => !!v || 'Email obligatori']"
          />
          <q-input
            v-model="form.password"
            label="Contrasenya"
            outlined
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            :rules="[(v) => !!v || 'Contrasenya obligatòria']"
          >
            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-btn
            unelevated
            color="primary"
            :loading="auth.isLoading"
            class="full-width"
            :label="isRegister ? 'Crear compte' : 'Entrar'"
            type="submit"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn
          flat
          color="primary"
          :label="isRegister ? 'Ja tinc compte' : 'No tinc compte encara'"
          @click="isRegister = !isRegister"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>
