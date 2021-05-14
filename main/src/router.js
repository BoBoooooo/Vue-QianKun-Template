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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/public/Login.vue')

  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/public/404.vue')

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
