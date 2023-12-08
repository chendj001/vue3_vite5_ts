import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

let routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/md',
    name: 'md',
    component: () => import('@/md/help.md')
  }
]
const css = [
  {
    path: '/css3',
    name: 'css3',
    component: () => import('@/views/css3.vue')
  }
]
routes.push(...css)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
export default router
