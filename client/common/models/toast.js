/**
 * 设置 toast 内容和效果
 */

export default {
  namespace: 'toast',
  state: {},
  reducers: {
    // (state, action)
    set(state, { payload = {} }) {
      const { content = '', effect = 'enter', time = 2e3 } = payload;
      return { ...state, content, effect, time };
    },
    clear(state, { payload = {} }) {
      const { effect = 'leave' } = payload;
      return { ...state, content: '', effect };
    },
  },
  effects: {},
};
