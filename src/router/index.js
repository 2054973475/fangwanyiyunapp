import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'discover',
    component: () => import('../views/DiscoverView')
  },
  {
    path: '/songListDetails',
    name: 'songListDetails',
    component: () => import('../views/SongListDetails')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
