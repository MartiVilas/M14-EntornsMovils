import App from '@/App.vue'
import MealsDetail from '@/components/MealsDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: App },
    { path: '/detall', component: MealsDetail },
  ],
})

export default router
