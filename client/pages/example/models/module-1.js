import { Map } from 'immutable';

export default {
  namespace: 'module1',
  state: Map(),
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    helloModule1(state, { payload = {} }) {
      const { content } = payload;
      return state.set('content', content);
    },
  },
  effects: {},
};
