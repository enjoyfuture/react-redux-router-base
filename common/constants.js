/**
 * 全局常量
 */

/**
 * url 二级路径上下文，页面中引入资源上下文，默认为 ''
 * 注意：如果有的应用设置了 context，但 nginx 配置时可能没有配置 context，这时最好让运维配置上
 * 但万一不配置话，我们可以在不同的环境下，设置不一样的 context，格式 context: '/context'
 */
module.exports.URL_CONTEXT = ''; // 如：'/urlContext'

// result
module.exports.RES_CODE = 'code';
module.exports.RES_DATA = 'data';
module.exports.RES_MSG = 'msg';
module.exports.SUCCESS_CODE = '0';
module.exports.FAIL_CODE = '1';
module.exports.AUTH_EXPIRED_CODE = '9999'; // 登录过期
module.exports.NO_PERMISSION_CODE = '9994'; // 无权限
