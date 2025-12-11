<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  id: String,
  name: String,
  ingredients: String,
  area: String,
  catergory: String,
  thumb: String,
})
</script>

<template>
  <div class="container">
    <h1>{{ props.name }}</h1>
    <p>Principal ingredient: {{ props.catergory }} - Area: {{ props.area }}</p>
    <img :src="props.thumb" />
    <RouterLink :to="`/detall/${props.id}`">Veure detalls</RouterLink>
  </div>
</template>

<style>
.container {
  width: 300px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.container:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 1.2rem;
  margin: 0.25rem 0 0.5rem 0;
  font-weight: 600;
  color: #333;
}

p {
  margin: 0 0 0.75rem 0;
  color: #555;
  font-size: 0.9rem;
}

img {
  width: 180px;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: auto;
  margin-bottom: 10px;
}
</style>
