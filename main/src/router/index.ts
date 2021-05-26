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

const microRouterMap = microRouter.map(micro => ({
  path: '/subapp',
  component: Layout,
  name: micro.name,
  meta: {
    title: micro.name,
  },
  redirect: micro.activeRule,
  children: [
    {
      path: micro.activeRule.replace('/subapp/', ''),
      name: `${micro.name}-index`,
      meta: { title: micro.name },
    },
  ],
}));

Vue.use(Router);

const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    meta: { hidden: true },
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
    path: '/subapp/*',
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
  routes: [...microRouterMap, ...constantRouterMap],
});

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = (router as any).history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export { router, constantRouterMap, microRouterMap };
