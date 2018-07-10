/**
 * 环境配置-生产环境
 */
const config = require('./base');

const NODE_ENV = (process.env.NODE_ENV = 'production');
const SERVER_URL = (process.env.SERVER_URL =
  'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/');

const _config = { ...config, NODE_ENV, SERVER_URL };

module.exports = _config;
