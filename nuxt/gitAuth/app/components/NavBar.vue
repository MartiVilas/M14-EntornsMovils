<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession();
</script>

<template>
  <UCard class="flex justify-end">
    <div v-if="loggedIn" class="flex items-center gap-4">
      <h1>Hola {{ user?.login }}!</h1>
      <UButton @click="clear">Logout</UButton>
    </div>
    <div v-else>
      <UButton @click="openInPopup('/auth/github')">Iniciar sesión</UButton>
    </div>
  </UCard>
</template>
