<script setup>
import { ref, watch } from 'vue'
import { useFetch } from '@/composables/useFetch'
import Meals from './Meals.vue'
const query = ref('beef')
const url = ref(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.value}`)

const { data, error, loading, fetchData } = useFetch(url)

watch(query, (newQuery) => {
  url.value = `https://www.themealdb.com/api/json/v1/1/search.php?s=${newQuery}`
  fetchData()
})

const buscar = () => {
  fetchData()
}
</script>
<template>
  <h1>Receptari VUE + TheMealDB</h1>
  <nav>
    <ul class="nav">
      <RouterLink to="/">Home</RouterLink>

      <div class="search-box">
        <input placeholder="Busca recepta" v-model="query" />
        <button @click="buscar">Buscar</button>
      </div>
    </ul>
  </nav>
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
            :id="meal.idMeal"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
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
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between; /* separa Home a la izquierda y buscador a la derecha */
  padding: 1rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-box input {
  padding: 0.4rem 0.6rem;
}

.search-box button {
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}
input {
  border-radius: 8px;
  border: solid 1px;
}

button {
  color: white;
  background-color: dodgerblue;
  border: none;
  border-radius: 8px;
}
</style>
