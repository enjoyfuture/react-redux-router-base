import { fromJS } from 'immutable';

export default {
  namespace: 'home',
  state: fromJS({
    hello: {},
    homeRoute: {},
  }),
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    hello(state, { payload = {} }) {
      const { content } = payload;
      return state.setIn(['hello', 'content'], content);
    },
    clearHello(state, { payload = {} }) {
      return state.update('hello', hello => hello.clear());
    },
    setHomeRoute(state, { payload = {} }) {
      const { content } = payload;
      return state.setIn(['homeRoute', 'content'], content);
    },
  },
  effects: {},
};
