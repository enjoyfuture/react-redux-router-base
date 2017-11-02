const _sessionStorage = window.sessionStorage;

/**
 * 设置数据
 * @param key
 * @param value
 */
export function setSessionStorage(key, value) {
  _sessionStorage.setItem(key, value);
}

/**
 * 读取数据
 * @param key
 * @returns {*}
 */
export function getSessionStorage(key) {
  return _sessionStorage.getItem(key);
}

/**
 * 删除数据
 * @param key
 */
export function removeSessionStorage(key) {
  return _sessionStorage.removeItem(key);
}
