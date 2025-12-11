<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@/composables/useFetch'

const routeID = useRoute()
const url = ref(`www.themealdb.com/api/json/v1/1/lookup.php?i=${routeID.params.id}`)
const { data, error, loading, fetchData } = useFetch(url)

console.log(data.value)
</script>
<template>
  <div>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="data && data.meals" class="meals">
        <div v-for="meal in data.meals" :key="meal.id">
          {{ meal.strMeal }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
