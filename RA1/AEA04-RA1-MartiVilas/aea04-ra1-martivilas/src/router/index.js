import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Receptes from '@/components/Receptes.vue'
import Gadgets from '@/components/Gadgets.vue'
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
      name: 'receptes',
      component: Receptes,
    },
    {
      path: '/gadgets',
      name: 'gadgets',
      component: Gadgets,
    },
  ],
})

export default router
