<script setup>
import FoodItem from './FoodItem.vue'
import { ref } from 'vue'

const foodArray = ref([
  {
    name: 'Salmó Atlàntic',
    type: 'Proteïna',
    properties: ['Alt Omega-3', 'Ajuda a la recuperació', 'Vitamina D'],
    img: 'salmo.jpeg',
  },
  {
    name: 'Civada integral',
    type: 'Hidrat de carboni',
    properties: ['Alliberament energètic sostingut', 'Rica en ferro', 'Fibra soluble'],
    img: 'civada.jpeg',
  },
  {
    name: 'Alvocat',
    type: 'Greix saludable',
    properties: ['Greixos monoinsaturats', 'Alt en fibra', 'Conté potassi'],
    img: 'alvocat.jpeg',
  },
  {
    name: 'Ou de gallina',
    type: 'Proteïna',
    properties: ['Alto valor biològic', 'Rics en aminoàcids essencials', 'Vitamina B12'],
    img: 'ou.jpeg',
  },
])
const elementSeleccionat = ref(null)
function agafarSeleccionat(food) {
  elementSeleccionat.value = food
}
</script>

<template>
  <h1>FoodList</h1>
  <FoodItem v-for="food in foodArray" :key="food.name" :food="food" @selected="agafarSeleccionat" />
  <div v-if="elementSeleccionat">
    <h1>Food Item</h1>
    <img width="100px" :src="`./img/${elementSeleccionat.img}`" />
    <h2>{{ elementSeleccionat.name }}</h2>
    <p>{{ elementSeleccionat.type }}</p>
    <ul>
      <li v-for="p in elementSeleccionat.properties">{{ p }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
