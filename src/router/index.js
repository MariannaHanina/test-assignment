import Vue from 'vue'
import VueRouter from 'vue-router'
import TradingDeskView from '../views/TradingDeskView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tradingDesk',
    component: TradingDeskView
  },
  {
    path: '/transactions',
    name: 'transactions',
    // route level code-splitting
    // this generates a separate chunk (transactions.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "transactions" */ '../views/TransactionsView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
