
// 缓存数据，这里只标示一下缓存数据的 key 值，即把 key 设为 true，而不会真正缓存数据，
// 读取实际数据时，还是从 state 中读取
export function setCache(key, value = true) {
  return {
    type: 'set_cache',
    key,
    value
  };
}

//删除一个或多个缓存
export function removeCache(keys) {
  return {
    type: 'remove_cache',
    keys
  };
}

//清空所有缓存
export function clearCache() {
  return {
    type: 'clear_cache'
  };
}
