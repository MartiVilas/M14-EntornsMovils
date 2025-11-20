import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Receptes from '@/components/Receptes.vue'
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
      name: 'home',
      component: Receptes,
    },
  ],
})

export default router
