import { Map } from 'immutable';

/**
 * 缓存数据，这里只标示一下缓存数据的 key 值，即把 key 设为 true，而不会真正缓存数据，
 * 读取实际数据时，还是从 state 中读取
 */
export default {
  namespace: 'caches',
  state: Map(),
  reducers: {
    // 设置缓存
    setCache(state, { payload = {} }) {
      const { key, value = true } = payload;
      return state.set(key, value);
    },
    // 删除一个或多个缓存
    removeCache(state, { payload = {} }) {
      const { keys } = payload;
      let _state = state;
      keys.forEach(item => {
        _state = _state.remove(item);
      });
      return _state;
    },
    // 清空所有缓存
    clearCache(state, { payload = {} }) {
      return state.clear();
    },
  },
  effects: {},
};
