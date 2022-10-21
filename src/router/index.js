import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/websocket',
    name: 'websocket',
    // route level code-splitting
    // this generates a separate chunk (websocket.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "websocket" */ '../views/WebSocketView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
