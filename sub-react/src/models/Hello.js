export default {
  namespace: "hello",

  state: {
    count: 1,
  },

  subscriptions: {},

  effects: {},

  reducers: {
    add(state) {
      const newCurrent = state.count + 1;
      return { ...state, count: newCurrent };
    },
  },
};
