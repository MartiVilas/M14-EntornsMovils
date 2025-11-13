<script setup>
import { ref } from 'vue'
const frameworks = ref([
  { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
  { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
  { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' },
])
</script>
<template>
  <ul v-for="framework in frameworks" :key="framework.id">
    <li>
      <RouterLink :to="`/frameworks/${framework.id}`">{{ framework.name }}</RouterLink>
    </li>
  </ul>
  <RouterView />
</template>
<style></style>
