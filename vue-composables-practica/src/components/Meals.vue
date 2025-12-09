<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  id: Number,
  name: String,
  ingredients: String,
  area: String,
  catergory: String,
  thumb: String,
})
</script>

<template>
  <h1>{{ props.name }}</h1>
  <p>{{ props.catergory }} - {{ props.area }}</p>
  <img :src="props.thumb" />
</template>
