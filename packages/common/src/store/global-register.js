
/* eslint-disable */ 
/**
 * 
 * @param {vuex实例} store 
 * @param {qiankun下发的props} props 
 */
function registerGlobalModule (store, props = {}) {
  if (!store || !store.hasModule) {
    return;
  }
  // 获取初始化的state
  // 主要要跟基座  main/src/store.ts中的初始化内容保持一致
  const initState = props.getGlobalState && props.getGlobalState() || {
    user: {}
  };
  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule('global')) {
    const globalModule = {
      namespaced: true,
      state: initState,
      mutations: {
        setGlobalState (state, payload) {
          // eslint-disable-next-line
          state = Object.assign(state, payload);
        },
        // 通知父应用
        emitGlobalState (state) {
          if (props.setGlobalState) {
            props.setGlobalState(state);
          }
        },
      },
      actions: {
        // 子应用改变state并通知父应用
        setGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
          commit('emitGlobalState', payload);
        },
        updateCurrentGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
          // commit('emitGlobalState', payload);
        },
        // 初始化，只用于mount时同步父应用的数据
        initGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
        },
      },
    };
    store.registerModule('global', globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch('global/initGlobalState', initState);
  }
};

export default registerGlobalModule;
