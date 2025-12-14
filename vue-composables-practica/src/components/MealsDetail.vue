<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@/composables/useFetch'

const route = useRoute()

const url = computed(() =>
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`
)

const { data, error, loading } = useFetch(url)
</script>

<template>
  <div class="page">
    <h1 class="title">Receptari Vue + TheMealDB</h1>

    <RouterLink class="home" to="/">Home</RouterLink>

    <div v-if="loading" class="state">Carregant...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>

    <div v-else-if="data?.meals?.length">
      <div v-for="meal in data.meals" :key="meal.idMeal" class="detail">
        <h2 class="meal-title">{{ meal.strMeal }}</h2>

        <div class="content">
          <div class="left">
            <img class="thumb" :src="meal.strMealThumb" :alt="meal.strMeal" />
          </div>
          <div class="right">
            <h3 class="section-title">Instruccions</h3>
            <p class="instructions">{{ meal.strInstructions }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="state">No s'ha trobat cap resultat</div>
  </div>
</template>


<style scoped>
/* Contenedor general */
div {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  color: #222;
}

/* Estados */
div > div[v-if],
div > div[v-else-if] {
  text-align: center;
  font-size: 1.1rem;
}

/* Tarjeta de la receta */
.meals > div,
div[v-else-if] > div {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* Título */
.meals h2,
.meals div > :first-child {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Categoría y zona */
.meals span,
.meals div > :nth-child(2),
.meals div > :nth-child(3) {
  display: inline-block;
  margin-right: 1rem;
  font-size: 0.95rem;
  color: #666;
}

/* Imagen */
.meals img,
div img {
  width: 100%;
  max-width: 400px;
  display: block;
  margin: 1.5rem auto;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
}

/* Instrucciones */
.meals p,
div p {
  line-height: 1.7;
  font-size: 1rem;
  color: #333;
  margin-top: 1rem;
  white-space: pre-line;
}

/* Responsive */
@media (max-width: 600px) {
  div {
    padding: 1rem;
  }

  .meals img,
  div img {
    max-width: 100%;
  }
}

</style>
