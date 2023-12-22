import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: () => import('@/views/Md.vue'),
      children: [
        {
          path: '',
          name: 'md',
          component: () => import('@/md/index.md')
        },
        {
          path: 'vue2Array',
          name: 'vue2Array',
          component: () => import('@/md/vue2_array.md')
        },
        {
          path: 'vue2Error',
          name: 'vue2Error',
          component: () => import('@/md/vue2_error.md')
        },
        {
          path: 'vueComponent',
          name: 'vueComponent',
          component: () => import('@/md/vue3/组件编写.md')
        },
        {
          path: 'icon',
          name: 'icon',
          component: () => import('@/md/css3/icon.md')
        },
        {
          path: 'jsdoc',
          name: 'jsdoc',
          component: () => import('@/md/jsdoc.md')
        }
      ]
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('@/views/Grid.vue')
    }
  ]
})

export default router
