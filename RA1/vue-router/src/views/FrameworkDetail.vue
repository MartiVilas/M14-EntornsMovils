<!-- Version 1 -->
<!-- <script setup>
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
<style></style> -->

<!-- Version2 -->
<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const frameworks = ref([
  { id: 1, name: 'Vue.js', desc: 'Progressive Framework per construir interfícies web.' },
  { id: 2, name: 'React', desc: 'Biblioteca per crear interfícies d’usuari interactives.' },
  { id: 3, name: 'Angular', desc: 'Framework complet per aplicacions empresarials.' },
])

const framework = ref(null)

const carregarFramework = (id) => {
  id = parseInt(id)
  framework.value = frameworks.value.find((f) => f.id === id) || null
}

// cargar inicial
carregarFramework(route.params.id)

// actualizar cuando cambie el id
watch(
  () => route.params.id,
  (newId) => carregarFramework(newId),
)
</script>

<template>
  <div v-if="framework">
    <h2>Detalls de {{ framework.name }}</h2>
    <p>{{ framework.desc }}</p>
  </div>

  <RouterView />
</template>
