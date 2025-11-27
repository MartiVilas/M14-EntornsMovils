<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <RouterLink to="/">Inici</RouterLink>
        <RouterLink to="/receptes">Receptes</RouterLink>
        <RouterLink to="/gadgets">Gadgets</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header {
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav a.router-link-active {
  color: #e67e22;
}

.main {
  padding: 2rem;
}
</style>
