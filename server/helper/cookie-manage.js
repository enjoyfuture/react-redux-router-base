/**
 * 用来动态管理 cookie 数据
 */
const path = '/';
const cookieManage = {
  /**
   * 设置 cookie 信息
   * @param res
   */
  set(keys, res, domain) {
    /**
     * 不能设置 secure 为 true
     *  Set-Cookie 的 secure 属性就是处理这方面的情况用的，
     *  它表示创建的 cookie 只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，
     *  如果是 HTTP 连接则不会传递该信息，所以绝对不会被窃听到
     * @type {{maxAge: number}}
     * maxAge 单位是毫秒
     */
    // ie 低版本需要设置 P3P
    res.set('P3P', 'CP=CAO PSA OUR');
    const options = { domain, path, maxAge: 30 * 24 * 60 * 60 * 1000 };
    Object.keys(keys).forEach(k => {
      res.cookie(k, keys[k], options);
    });
  },

  /**
   * 获取 cookie 信息
   * @param keys
   * @param req
   * @returns {{}}
   */
  get(keys, req, domain) {
    const { cookies } = req;
    const rs = {};
    Object.keys(keys).forEach(k => {
      rs[k] = cookies[k];
    });
    return rs;
  },

  /**
   * 清空 cookie
   * @param res
   */
  clear(keys, res, domain) {
    const options = { domain, path };
    Object.keys(keys).forEach(k => {
      res.clearCookie(k, options);
    });
  },
};

module.exports = cookieManage;
