<script setup>
import { useRoute } from 'vue-router'
import Receptes from '@/data/Receptes'

const route = useRoute()
const id = Number(route.params.id)
const recepte = Receptes.find((r) => r.id === id)
</script>

<template>
  <section v-if="recepte" class="recipe-detail">
    <h1>{{ recepte.nom }}</h1>

    <p class="description">
      {{ recepte.descripcio }}
    </p>

    <h3>Ingredients</h3>
    <p>{{ recepte.ingredients }}</p>

    <h3>Temps de preparació</h3>
    <p>{{ recepte.tempsPreparacio }}</p>
  </section>

  <section v-else class="recipe-detail">
    <h1>Recepta no trobada</h1>
    <p>La recepta que busques no existeix.</p>
  </section>
</template>

<style scoped>
.recipe-detail {
  max-width: 800px;
}
.recipe-detail h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.recipe-detail h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.25rem;
}
.description {
  font-size: 1.05rem;
  line-height: 1.6;
}
</style>
