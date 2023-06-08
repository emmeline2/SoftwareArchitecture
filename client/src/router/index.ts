import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/rate',
      name: 'rate',
      component: () => import('../pages/RateMyGistPage.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../pages/SearchPage.vue')
    },
    {
      path: '/repos',
      name: 'repos',
      component: () => import('../pages/ReposPage.vue')
    }
  ]
})

export default router
