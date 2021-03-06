import Vue from 'vue';
import { registerMicroApps, setDefaultMountApp } from 'qiankun';
import store from '@/store/index'; // store内做了局部持久化
import App from './App.vue';
import microApps from './router/micro-app';
import '@/styles/index.scss'; // 全局样式
import 'nprogress/nprogress.css';
import { router } from './router';
import '@/plugins/element'; // vue-cli3.0以插件形式引入elementui
import '@/plugins/element-pro-crud'; // 引入element-pro-crud
import '@/icons/autoImportSvg';
import 'normalize.css';
import '@/permission'; // 权限控制
import '@/store';

// 自动导入src/icon目录下的svg图标
Vue.config.productionTip = false;
// 注入全局HOST_URL地址
Vue.prototype.HOST_URL = window.__HOST__URL__;
Vue.prototype.API_URL = window.__HOST__URL__ + window.__PREFIX__URL__;
Vue.prototype.CHAT_URL = window.__CHAT__URL__;

const instance = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading;
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader,
  };
});

registerMicroApps(apps);
// setDefaultMountApp('/app/sub-vue');
// 此处在AppMain.vue中异步触发start挂载
// start();
