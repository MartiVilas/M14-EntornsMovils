<script setup>
import { ref } from 'vue'
import { useFetch } from './composables/useFetch'
import Meals from './components/Meals.vue'
const input = ref('chicken')
const url = ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
const { data, loading, error, fetchData } = useFetch(url)
</script>

<template>
  <div>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="data && data.meals">
        <div v-for="meal in data.meals" :key="meal.id">
          <Meals
            :name="meal.strMeal"
            :area="meal.strArea"
            :catergory="meal.strCategory"
            :thumb="meal.strMealThumb"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
