/**
 * @file 全局请求权限控制，本文件在main.js中引用
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日10:58:43
 */

import store from "@/store/index";
import { router } from "./router";
// 白名单：不需要鉴权的地址
const whiteList = ["/login"];

// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token != null && store.getters.token !== "null") {
    if (to.path === "/login") {
      next({
        path: "/",
      });
    } else if (!store.getters.userid) {
      // 如果addRouters长度为0说明permission.js中没有追加有权限的路由表
      // 请求用户信息
      const userInfo = await store.dispatch("getUserInfoByToken");
      // // 根据用户权限过滤路由规则
      // await store.dispatch("generateRoutes", {
      //   roleRouters: (userInfo.roleAuthName || "").split(","),
      //   userName: userInfo.userName,
      // });
      // router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
      // store.dispatch('initWebSocket', store.getters.name); // 建立ws连接
      next({ ...to, replace: true } as any);
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    // 如果不存在Token & 当前地址在白名单内
    next();
  } else {
    // 如果不存在Token & 当前地址不在白名单内
    next("/login");
  }
});
