// 公用的配置参数

// 服务启动端口
module.exports.port = process.env.PORT = 8888;
/**
 * url 二级路径上下文，页面中引入资源上下文，默认为 ''
 * 注意：如果有的应用设置了 context，但 nginx 配置时可能没有配置 context，这时最好让运维配置上
 * 但万一不配置话，我们可以在不同的环境下，设置不一样的 context，格式 context: '/context'
 */
module.exports.urlContext = process.env.URL_CONTEXT = '';
