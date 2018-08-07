import 'isomorphic-fetch';
import perfect from './perfect';
import { URL_CONTEXT } from '../../common/constants';

// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  method: 'post', // 请求 type  get post delete header put
  credentials: 'include', // 设置该属性可以把 cookie 信息传到后台
  headers: {
    // headers 的键是不区分大小写的
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

// 检查请求是否成功
function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param body // 往后台传递的 json 参数
 * @param options // 可选参数项
 * @returns {Promise.<TResult>}
 */
function callApi({ url, body = {}, options = {}, prefix = 'api' }) {
  if (!url) {
    const error = new Error('请传入 url');
    error.errorCode = 0;
    return Promise.reject(error);
  }

  let fullUrl = '';
  // 如果是绝对路径，则直接发请求
  if (url.indexOf('http') === 0) {
    fullUrl = url;
  } else {
    fullUrl = `${URL_CONTEXT}/${prefix}/${url}`;
  }

  const _options = { ...defaultOptions, ...options };
  const { method } = _options;

  if (method !== 'get' && method !== 'head') {
    if (body instanceof FormData) {
      _options.body = body;
      delete _options.headers;
    } else {
      // 数据为 null 不要传到后台
      Object.keys(body).forEach(item => {
        if (body[item] === null || body[item] === '') {
          delete body[item];
        }
      });
      _options.body = perfect.stringifyJSON(body);
    }
  }

  return fetch(fullUrl, _options)
    .then(checkStatus)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok || !json.code === '0') {
        // 根据后台实际返回数据来定义错误格式
        const error = new Error(json.msg || '获取数据出错');
        error.errorCode = json.code;
        return Promise.reject(error, json);
      }
      return json;
    })
    .catch(error => Promise.reject(error));
}

export default callApi;
