/*
 * @file: router
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-04-13 19:35:49
 */
import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout/Layout.vue";
import microRouter from "@/router/micro-app";

const microRouterMap = microRouter.map((micro) => ({
  path: "/main",
  component: Layout,
  name: micro.name,
  meta: {
    title: micro.name,
  },
  redirect: micro.activeRule,
  children: [
    {
      path: micro.activeRule.replace("/main/", ""),
      name: `${micro.name}-index`,
      meta: { title: micro.name },
    },
  ],
}));

Vue.use(Router);

const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    meta: { hidden: true },
  },
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true },
    component: () => import("@/views/public/Login.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    meta: { hidden: true },
    component: () => import("@/views/public/404.vue"),
  },
  {
    path: "/main/*",
    name: "Layout",
    meta: { hidden: true },
    component: Layout,
  },
  {
    path: "/person",
    component: Layout,
    name: "Person",
    meta: {
      title: "员工管理",
    },
    redirect: "/person/index",
    children: [
      {
        path: "index",
        name: "PersonIndex",
        component: () =>
          import(/* webpackChunkName: "person" */ "@/views/person/Person.vue"),
        meta: { title: "员工管理", icon: "员工管理" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true },
  },
];

const router = new Router({
  mode: "history",
  routes: [...microRouterMap, ...constantRouterMap],
});

export { router, constantRouterMap, microRouterMap };
