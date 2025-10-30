<script setup>
import TaskApp from './components/TaskApp.vue'
</script>

<template>
  <div class="app-container">
    <TaskApp />
  </div>
</template>

<style>
:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  font-family:
    system-ui,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
</style>
