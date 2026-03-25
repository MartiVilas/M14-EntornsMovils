<script setup>
import { registerSchema } from '../../../shared/schemas/auth'

const toast = useToast()
const { loggedIn, ready, fetch: refreshSession } = useUserSession()

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

watchEffect(() => {
  if (ready.value && loggedIn.value) {
    navigateTo('/dashboard')
  }
})

async function onSubmit(event) {
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: event.data
    })

    await refreshSession()

    toast.add({
      title: 'Cuenta creada',
      description: 'Ya puedes empezar a guardar tus animes favoritos.'
    })
    toast.add({
  title: 'No se pudo crear la cuenta',
  description: error?.data?.statusMessage || 'Revisa los datos e inténtalo otra vez',
  color: 'error'
})

    await navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'No se pudo crear la cuenta',
      description: error?.data?.statusMessage || 'Revisa los datos e inténtalo otra vez',
      color: 'error'
    })
  }
}
</script>

<template>
  <main class="min-h-screen bg-neutral-50 px-6 py-12">
    <div class="mx-auto max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <NuxtLink to="/" class="inline-flex text-sm font-medium text-primary hover:underline">
          ← Volver al inicio
        </NuxtLink>
        <h1 class="text-3xl font-bold">Crear cuenta</h1>
        <p class="text-sm text-neutral-600">
          Regístrate para crear tu biblioteca de anime privada.
        </p>
      </div>

      <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <UForm :schema="registerSchema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Nombre" name="name">
            <UInput v-model="state.name" placeholder="Tu nombre" class="w-full" />
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput v-model="state.email" type="email" placeholder="tu@email.com" class="w-full" />
          </UFormField>

          <UFormField label="Contraseña" name="password">
            <UInput v-model="state.password" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>

          <UFormField label="Confirmar contraseña" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full"
            />
          </UFormField>

          <UButton type="submit" class="w-full justify-center" trailing-icon="i-lucide-user-plus">
            Crear cuenta
          </UButton>
        </UForm>
      </div>

      <p class="text-center text-sm text-neutral-600">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="font-medium text-primary hover:underline">
          Inicia sesión
        </NuxtLink>
      </p>
    </div>
  </main>
</template>
