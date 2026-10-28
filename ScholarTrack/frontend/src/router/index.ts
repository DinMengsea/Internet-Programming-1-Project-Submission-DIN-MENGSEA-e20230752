import { createRouter, createWebHistory } from 'vue-router'
import ExplorePage from '../view/ExplorePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {path: '/',
      redirect: '/explore',},
      {path: '/explore',
      name: 'explore',
      component: ExplorePage,
      },
  ],
})

export default router
