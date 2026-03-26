const routes = [
  {
    path: '/login',
    component: () => import('src/pages/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    component: () => import('src/pages/RegisterPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'anime-list',
        component: () => import('src/pages/AnimeListPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
