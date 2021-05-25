export default {
  namespaced: true,
  state: {
    user: {
      name:''
    }
  },
  mutations: {
    // 设置父应用信息
    SET_USER_VALUE(state, data) {
      state.user = data;
    }
  },
  actions: {
    // 设置父应用信息
    setUser({ commit }, data) {
      commit("SET_USER_VALUE", data);
    }
  }
};
