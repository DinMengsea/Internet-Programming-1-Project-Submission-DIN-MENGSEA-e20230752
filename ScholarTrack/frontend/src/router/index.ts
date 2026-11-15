
import { createRouter, createWebHistory } from 'vue-router'
import ExplorePage from '../view/ExplorePage.vue'
import OpportunitiesDetailPage from '../view/OpportunitiesDetailPage.vue'
import NotFoundView from '../view/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/explore',
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExplorePage,
    },
    {
      path: '/opportunities/:id',
      name: 'opportunity-detail',
      component: OpportunitiesDetailPage,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
