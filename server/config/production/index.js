/**
 * 环境配置-生产环境
 */
/* eslint-disable import/no-unresolved */
const config = require('./base');

const NODE_ENV = (process.env.NODE_ENV = 'production');
const SERVER_URL = (process.env.SERVER_URL =
  'http://xxx.xxx.com/xxx/xxx/');

const _config = { ...config, NODE_ENV, SERVER_URL };

module.exports = _config;
