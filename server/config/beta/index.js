/**
 * 环境配置-功能或闭环
 */
const config = require('./base');

const NODE_ENV = (process.env.NODE_ENV = 'beta');
const SERVER_URL = (process.env.SERVER_URL =
  'http://mock.jdfmgt.com/mock/5940f039f865654552406a9f/');

const _config = { ...config, NODE_ENV, SERVER_URL };

module.exports = _config;
