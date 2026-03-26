<script setup>
import { z } from 'zod'

const toast = useToast()
const { loggedIn, ready, fetch: refreshSession } = useUserSession()

const schema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const state = reactive({
  email: '',
  password: ''
})

watchEffect(() => {
  if (ready.value && loggedIn.value) {
    navigateTo('/dashboard')
  }
})

async function onSubmit(event) {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: event.data
    })

    await refreshSession()

    toast.add({
      title: 'Sesión iniciada',
      description: 'Bienvenido de nuevo a tu catálogo anime.'
    })

    await navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Error de acceso',
      description: 'Email o contraseña incorrectos',
      color: 'error'
    })
  }
}

function loginWithGithub() {
  window.location.href = '/auth/github'
}
</script>

<template>
  <main class="min-h-screen bg-neutral-50 px-6 py-12">
    <div class="mx-auto max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <NuxtLink
          to="/"
          class="inline-flex text-sm font-medium text-primary hover:underline"
        >
          ← Volver al inicio
        </NuxtLink>
        <h1 class="text-3xl font-bold">Iniciar sesión</h1>
        <p class="text-sm text-neutral-600">
          Accede a tu dashboard y gestiona tu biblioteca de animes.
        </p>
      </div>

      <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="tu@email.com"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Contraseña" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="••••••••"
              class="w-full"
            />
          </UFormField>

          <div class="flex flex-col gap-3 pt-2">
            <UButton
              type="submit"
              class="w-full justify-center"
              trailing-icon="i-lucide-log-in"
            >
              Entrar
            </UButton>

            <UButton
              type="button"
              color="neutral"
              variant="outline"
              icon="i-simple-icons-github"
              class="w-full justify-center"
              @click="loginWithGithub"
            >
              Entrar con GitHub
            </UButton>
          </div>
        </UForm>
      </div>

      <p class="text-center text-sm text-neutral-600">
        ¿No tienes cuenta?
        <NuxtLink
          to="/register"
          class="font-medium text-primary hover:underline"
        >
          Regístrate
        </NuxtLink>
      </p>
    </div>
  </main>
</template>