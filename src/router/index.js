import { createRouter, createWebHashHistory } from 'vue-router'

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
  history: createWebHashHistory(),
  routes
})

export default router
