import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Frameworks from '@/views/Frameworks.vue'
import FrameworkDetail from '@/views/FrameworkDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/frameworks',
      name: 'frameworks',
      component: Frameworks,
      children: [
        {
          path: ':id',
          name: 'FrameworksDetail',
          component: FrameworkDetail,
          children: [],
        },
      ],
    },
  ],
})

export default router
