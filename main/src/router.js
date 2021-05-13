/*
 * @file: router
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-04-13 19:35:49
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main/*',
    name: 'Layout',
    component: () => import('@/views/layout/Layout.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

export default router
