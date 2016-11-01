/**
 * 基础的工具方法
 * @type {request}
 */
const request = require('request');
const Promise = require('bluebird');

module.exports.remotePostJSON = (options) => {
  console.info('请求地址:', options.url, '请求参数:', JSON.stringify(options.data));
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: options.url,
        json: options.data || {},
        headers: {
          cookie: options.cookie,
          'X-Requested-With': 'XMLHttpRequest'
        }
      },
      (err, response, body) => {
        if (err) {
          console.error('=======错误==========', err);
          reject(err);
        } else {
          if (body.success) {
            console.info('=======返回数据==========', JSON.stringify(body));
            resolve(body.data);
          } else {
            console.error('=======错误==========', JSON.stringify(body));
            reject(body.message);
          }
        }
      }
    );
  });
};

/**
 * get获取json数据
 * @param options
 */
module.exports.remoteGetJSON = (options) => {
  let url;
  let json = {};
  if (typeof options === 'string') {
    url = options;
  } else if (typeof options === 'object') {
    json = options.data || {};
    url = options.url;
  }
  console.info('请求地址:', url, '请求参数:', JSON.stringify(json));
  return new Promise((resolve, reject) => {
    request.get(
      {
        url,
        json
      },
      (err, response, body) => {
        if (err) {
          console.error('=======错误==========', err);
          reject(err);
        } else {
          if (body.success) {
            console.info('=======返回数据==========', JSON.stringify(body));
            resolve(body.data);
          } else {
            console.error('=======错误==========', JSON.stringify(body));
            reject(body);
          }
        }
      }
    );
  });
};
