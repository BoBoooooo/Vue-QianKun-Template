import store from "../store";

const microApps = [
  {
    name: "sub-vue",
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: "/main/sub-vue",
  },
  {
    name: "sub-react",
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: "/main/sub-react",
  },
];

const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: (store as any).getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;