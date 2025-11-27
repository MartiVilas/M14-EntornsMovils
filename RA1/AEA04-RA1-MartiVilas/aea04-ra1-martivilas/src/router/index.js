// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Recipes from '@/views/Recipes.vue'
import RecipeDetail from '@/views/RecipeDetail.vue'
import Gadgets from '@/views/Gadgets.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/receptes',
      name: 'recipes',
      component: Recipes,
    },
    {
      path: '/receptes/:id',
      name: 'recipe-detail',
      component: RecipeDetail,
    },
    {
      path: '/gadgets',
      name: 'gadgets',
      component: Gadgets,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
