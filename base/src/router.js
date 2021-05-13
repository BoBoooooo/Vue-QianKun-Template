import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect:'/layout/main/app1'
  },
  {
    path: "/layout/main/*",
    name: "Layout",
    component: () => import('@/views/layout/Layout.vue'),
  },
];

const router = new Router({
  mode: "history",
  routes: routes,
});

export default router;
