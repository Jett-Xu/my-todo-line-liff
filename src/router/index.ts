import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import WheelView from '../views/WheelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListView
    },
    {
      path: '/wheel',
      name: 'wheel',
      component: WheelView
    }
  ]
})

export default router
