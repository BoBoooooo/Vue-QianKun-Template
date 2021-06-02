/**
 * @file 框架页数据
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:35:59
 */
import getSystemConfig from '@/api/system/config';

const app = {
  state: {
    sidebar: {
      // 侧边栏隐藏状态
      opened: 1,
    },
    config: {
      // 密码长度
      passwordLength: '',
      // 客户端超时时间(分钟)
      clientTimeOut: '',
      // 初始密码
      initialPassword: '',
      // 系统名称
      systemName: '',
    },
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        state.sidebar.opened = 1;
      } else {
        state.sidebar.opened = 0;
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    SET_CONFIG: (state, config) => {
      state.config = config;
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    },
    // 初始化系统配置
    initSystemConfig: async ({ commit }) => {
      const {
        data: { list },
      } = await getSystemConfig();
      const config = {
        systemName: '',
      };
      list.forEach(k => {
        const { codeValue, remark } = k;
        config[remark] = codeValue;
      });

      commit('SET_CONFIG', config);
      return config;
    },
  },
};

export default app;
