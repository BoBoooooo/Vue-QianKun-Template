/*
 * @file: router
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-04-13 19:35:49
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const constantRouterMap = [
  {
    path: "/",
    redirect: "/main/sub-vue",
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/public/Login.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/public/404.vue"),
  },
  {
    path: "/main/*",
    name: "Layout",
    component: () => import("@/views/layout/Layout.vue"),
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true },
  },
];

const router = new Router({
  mode: "history",
  routes: constantRouterMap,
});

export { router, constantRouterMap };
