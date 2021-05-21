import Vue from "vue";
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
import store from "@/store/index"; // store内做了局部持久化
import App from "./App.vue";
import microApps from "./micro-app";
import "@/styles/index.scss"; // 全局样式
import "nprogress/nprogress.css";
import { router } from "./router";
import "@/plugins/element"; // vue-cli3.0以插件形式引入elementui
import "@/icons/autoImportSvg";
// 自动导入src/icon目录下的svg图标
Vue.config.productionTip = false;

const instance = new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading;
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map((item) => {
  return {
    ...item,
    loader,
  };
});

registerMicroApps(apps, {
  // beforeLoad: app => {
  //   console.log('before load app.name====>>>>>', app.name)
  // },
  // beforeMount: [
  //   app => {
  //     console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterMount: [
  //   app => {
  //     console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
  //   }
  // ],
  // afterUnmount: [
  //   app => {
  //     console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
  //   }
  // ]
});
setDefaultMountApp("/main/sub-vue");
start();
