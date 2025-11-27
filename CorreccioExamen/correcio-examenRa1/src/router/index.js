import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/foods', component: () => import('@/views/FoodList.vue') },
    { path: '/trainings', component: () => import('@/views/TrainingPanel.vue') },
  ],
})

export default router
