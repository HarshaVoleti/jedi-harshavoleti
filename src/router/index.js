// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BaseInfo from '../components/BaseInfo.vue'
import WorkShopDetails from '../views/WorkShopDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BaseInfo
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: WorkShopDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
