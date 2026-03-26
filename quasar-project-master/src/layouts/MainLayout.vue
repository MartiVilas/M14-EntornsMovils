<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authState, logoutUser } from 'src/stores/auth-store'

const leftDrawerOpen = ref(false)
const router = useRouter()

const userName = computed(() => authState.user?.name || 'Usuario')
const userEmail = computed(() => authState.user?.email || '')

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function goToHome () {
  router.push('/')
}

function handleLogout () {
  logoutUser()
  router.replace('/login')
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Anime Mobile</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ userName }}</q-item-label>
            <q-item-label caption>{{ userEmail }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item clickable v-ripple @click="goToHome">
          <q-item-section avatar>
            <q-icon name="movie" />
          </q-item-section>
          <q-item-section>Mis animes</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="handleLogout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Cerrar sesión</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>