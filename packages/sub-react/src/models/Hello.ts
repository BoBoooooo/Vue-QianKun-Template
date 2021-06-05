export default {
  namespace: 'hello',

  state: {
    count: 1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        console.log(pathname);
        if (pathname === '/hello') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },

  effects: {},

  reducers: {
    add(state) {
      const newCurrent = state.count + 1;
      return { ...state, count: newCurrent };
    },
  },
};
