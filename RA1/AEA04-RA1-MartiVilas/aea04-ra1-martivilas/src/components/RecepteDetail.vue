<script setup>
const props = defineProps({
  id: Number,
  nom: String,
  descripcio: String,
  ingredients: String,
  tempsPreaparacio: Number,
})
</script>
<template>
  <h1>{{ props.nom }}</h1>
  <p>{{ props.descripcio }}</p>
  <p>{{ props.ingredients }}</p>
  <p>{{ props.tempsPreaparacio }}</p>
</template>
<style></style>
