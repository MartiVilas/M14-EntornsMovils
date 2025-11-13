<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const frameworks = [
  { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
  { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
  { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' },
]
const routes = useRoute()
const frameworkId = parseInt(routes.params.id)
const framework = frameworks.find((f) => f.id == frameworkId)
</script>
<template>
  <h2 v-if="framework.id = frameworkId">Detalls de {{ framework.name }}</h2>
  <p v-if="framework.id = frameworkId">{{ framework.desc }}</p>

  <RouterView />
</template>
<style></style>
