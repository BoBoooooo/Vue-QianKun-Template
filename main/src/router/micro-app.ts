import store from '../store';

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/subapp/sub-vue',
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/subapp/sub-react',
  },
  {
    name: 'sub-vue3',
    entry: process.env.VUE_APP_SUB_VUE3,
    activeRule: '/subapp/sub-vue3',
  },
];

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: (store as any).getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;
