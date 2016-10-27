'use strict';
/**
 * 基础的工具方法
 * @type {request}
 */
import request from 'request';

export const remotePostJSON = (options) => {
  console.info('请求地址:', options.url, '请求参数:', JSON.stringify(options.data));
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: options.url,
        json: JSON.parse(JSON.stringify(options.data)) || {},
        headers: {
          cookie: options.cookie,
          'X-Requested-With': 'XMLHttpRequest'
        }
      },
      (err, response, body) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (body.success) {
            console.info('=======返回数据==========', JSON.stringify(body));
            resolve(body);
          } else {
            console.log(body.message);
            reject(body.message);
          }
        }
      }
    );
  });
};

/**
 * get获取json数据
 * @param url
 */
export const remoteGetJSON = (url) => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url,
        json: {}
      },
      (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          if (body.success) {
            console.info('=======返回数据==========', JSON.stringify(body));
            resolve(body);
          } else {
            console.log(body.message);
            reject(body);
          }
        }
      }
    );
  });
};
