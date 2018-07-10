import { Map } from 'immutable';

/**
 * 设置 toast 内容和效果
 */
export default {
  namespace: 'toast',
  state: Map(),
  reducers: {
    // (state, action)
    show(state, { payload = {} }) {
      const { content = '', time = 0 } = payload;
      return state
        .set('content', content)
        .set('time', time)
        .set('show', true);
    },
    hide(state, { payload = {} }) {
      const { content, time = 0 } = payload;
      if (content) {
        return state
          .set('content', content)
          .set('time', time)
          .set('show', false);
      }
      return state.set('time', time).set('show', false);
    },
  },
  effects: {},
};
