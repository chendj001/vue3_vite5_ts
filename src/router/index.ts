import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
const mds = import.meta.glob(['../md/**/*.md'])
console.log(mds)
let list = []
for (let attr in mds) {
  list.push({
    path: attr.replace('../md/', '').replace('.md', ''),
    name: attr.replace('../', '').replace('.md', '').replace('/', ''),
    component: mds[attr]
  })
}
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
      children: list
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('@/views/Grid.vue')
    }
  ]
})

export default router
