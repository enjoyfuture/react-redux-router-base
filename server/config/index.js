// 公用的配置参数
const config = {
  port: 8888, // 服务启动端口
  /**
   * url 二级路径上下文，页面中引入资源上下文，默认为 ''
   * 注意：如果有的应用设置了 context，但 nginx 配置时可能没有配置 context，这时最好让运维配置上
   * 但万一不配置话，我们可以在不同的环境下，设置不一样的 context，格式 context: '/context'
   */
  urlContext: '',
};

const envConfig = {
  // 开发环境配置文件
  development: {
    serverUrl: 'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/'
  },
  // 测试环境配置文件
  beta: {
    serverUrl: 'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/'
  },
  // 生产环境配置文件
  production: {
    serverUrl: 'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/'
  }
};

// 注意 node 6.9.1 版本不支持这种写法，可以改成以下写法
// _config = Object.assign(config, envConfig[process.env.NODE_ENV], {nodeEnv: process.env.NODE_ENV});
const _config = {...config, ...envConfig[process.env.NODE_ENV], nodeEnv: process.env.NODE_ENV};

module.exports = _config;
