// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import WorkShopDetails from '../views/WorkShopDetails.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
