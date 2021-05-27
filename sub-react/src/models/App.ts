export default {
  namespace: "app",

  state: {
    global: {},
    name: "这是app的model",
    user: {},
  },

  subscriptions: {},

  effects: {},

  reducers: {
    setGlobalState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
