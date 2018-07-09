import { Map } from 'immutable';

export default {
  namespace: 'module2',
  state: Map(),
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    helloModule2(state, { payload = {} }) {
      const { content } = payload;
      return state.set('content', content);
    },
  },
  effects: {},
};
