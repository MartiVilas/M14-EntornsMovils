<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>Task Mobile App</q-toolbar-title>
        <q-btn flat round icon="logout" @click="handleLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Navegació</q-item-label>
        <q-item clickable v-ripple to="/tasks" exact>
          <q-item-section avatar><q-icon name="checklist" /></q-item-section>
          <q-item-section>Tasques</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/login">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'

const router = useRouter()
const auth = useAuthStore()
const leftDrawerOpen = ref(false)

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>
