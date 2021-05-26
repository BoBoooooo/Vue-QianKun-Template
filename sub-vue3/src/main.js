import '@/public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import store from '@/store';
import { store as commonStore } from '../../common';
import routers from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;
/**
 * @name 子应用实例化函数
 * @param {Object} props param0 qiankun将用户添加信息和自带信息整合，通过props传给子应用
 * @description {Array} routes 主应用请求获取注册表后，从服务端拿到路由数据
 * @description {String} 子应用路由前缀 主应用请求获取注册表后，从服务端拿到路由数据
 */
const render = ({ routerBase, container } = {}) => {
  // Vue.config.productionTip = false;
  console.log(__qiankun__);
  router = createRouter({
    history: createWebHistory(__qiankun__ ? routerBase : '/'),
    routes: routers,
  });
  instance = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount(container ? container.querySelector('#app') : '#app');
};

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' }; // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo });

  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  commonStore.globalRegister(store, props);
  props.onGlobalStateChange((newState, prev) => {
    console.log('sub-vue3 change', JSON.stringify(newState), JSON.stringify(prev));
    // vue3 用Proxy代理 父应用的initState,注册进sub-vue3 vuex时会失去响应式
    // 此处需要单独监听onChange事件手动更新sub-vue3中的vuex数据
    store.dispatch('global/updateCurrentGlobalState', newState);
  });

  render(props);
}

export async function unmount() {
  instance.$el.innerHTML = '';
  instance = null;
}
