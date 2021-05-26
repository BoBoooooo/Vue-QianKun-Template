/*
 * @file: router
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-04-13 19:35:49
 */
import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import microRouter from '@/router/micro-app';
import Person from '@/views/person/Person.vue';

Vue.use(Router);

// 子应用转成路由格式拼接至路由表
const microRouterMap = microRouter.map(micro => ({
  path: '/app',
  component: Layout,
  name: micro.name,
  meta: {
    title: micro.name,
  },
  redirect: micro.activeRule,
  children: [
    {
      path: micro.activeRule.replace('/app/', ''),
      name: `${micro.name}-index`,
      meta: { title: micro.name },
    },
  ],
}));

// 基座路由
const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { hidden: false },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { hidden: false, title: '首页', icon: '首页' },
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: { hidden: true },
    component: () => import('@/views/public/Login.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: { hidden: true },
    component: () => import('@/views/public/404.vue'),
  },
  {
    path: '/app/*',
    name: 'Layout',
    meta: { hidden: true },
    component: Layout,
  },
  {
    path: '/person',
    component: Layout,
    name: 'Person',
    meta: {
      title: '员工管理',
    },
    redirect: '/person/index',
    children: [
      {
        path: 'index',
        name: 'PersonIndex',
        component: Person,
        meta: { title: '员工管理', icon: '员工管理' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true },
  },
];

const router = new Router({
  mode: 'history',
  routes: [...constantRouterMap, ...microRouterMap], // 拼接基座路由和子应用路由
});

export { router, constantRouterMap, microRouterMap };
