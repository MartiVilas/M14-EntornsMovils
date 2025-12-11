<script setup>
import { ref } from 'vue'
import { useFetch } from './composables/useFetch'
import Meals from './components/Meals.vue'
const input = ref('chicken')
const url = ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
const { data, loading, error } = useFetch(url)
</script>

<template>
  <div>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="data && data.meals" class="meals">
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

<style scoped>
.meals {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  padding: 1rem;
}

/* Contenedor de cada Meal (el div del v-for) */
.meals > div {
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  max-width: 300px;
  width: 100%;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: none; /* quitar */
}

/* Si quieres estilizar imágenes dentro de Meals.vue */
.meals img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 0.75rem;
}

/* Tipografía general */
.meals h2,
.meals p {
  margin: 0.25rem 0;
}
</style>
