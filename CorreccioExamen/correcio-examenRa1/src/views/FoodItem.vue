<script setup>
const props = defineProps({
  food: {
    type: Object,
  },
})
const emit = defineEmits(['selected'])
function selected() {
  emit('selected', props.food)
}
</script>

<template>
  <h1>Food Item</h1>
  <img width="100px" :src="`./img/${food.img}`" />
  <h2>{{ food.name }}</h2>
  <p>{{ food.type }}</p>
  <!-- <ul>
    <li v-for="p in food.properties">{{ p }}</li>
  </ul> -->
  <button @click="selected">Veure detall</button>
</template>

<style scoped></style>
