<script setup>
import Receptes from '@/data/Receptes'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="recipes">
    <h1>Llista de receptes</h1>

    <div class="recipe-list">
      <article
        v-for="recepte in Receptes"
        :key="recepte.id"
        class="recipe-card"
      >
        <h2>{{ recepte.nom }}</h2>
        <p>{{ recepte.descripcio }}</p>

        <RouterLink :to="`/receptes/${recepte.id}`" class="detail-link">
          Veure detall
        </RouterLink>
      </article>
    </div>
  </section>
</template>

<style scoped>
.recipes {
  max-width: 900px;
}

.recipe-list {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.recipe-card {
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.recipe-card h2 {
  margin-bottom: 0.5rem;
}

.detail-link {
  display: inline-block;
  margin-top: 0.75rem;
  font-weight: 500;
  color: #e67e22;
  text-decoration: none;
}
.detail-link:hover {
  text-decoration: underline;
}
</style>
