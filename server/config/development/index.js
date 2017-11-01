/**
 * 环境配置-本地开发环境
 */
const config = require('./base');

// 自定义
const nodeEnv = process.env.NODE_ENV = 'development';
const serverUrl = process.env.SERVER_URL = 'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/';

// 注意 node 6.9.1 版本不支持这种写法，可以改成以下写法
// _config = Object.assign(config, {nodeEnv, serverUrl});
const _config = {...config, nodeEnv, serverUrl};

module.exports = _config;

