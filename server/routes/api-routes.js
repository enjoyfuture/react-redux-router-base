/**
 * 统一处理前端 api，直接映射到 java 端对应的 api 路由
 */
const utils = require('../helper/utils');
const { URL_CONTEXT } = require('../../common/constants');
const apis = require('../apis');

const { SERVER_URL, NODE_ENV } = process.env;

// 页面上下文，根路径，nginx 会卸载掉前缀 context
const context = NODE_ENV === 'production' ? '' : URL_CONTEXT;

function apiRoutes(app) {
  app.use((req, res, next) => {
    const { url, body } = req;
    // 如果前端 url 是以 /api/ 开头的，则直接映射到后台对应的 url 上
    const prefix = `${context}/api/`;
    if (url.startsWith(prefix)) {
      // 替换掉前缀和时间戳
      const dPrefixUrl = url.replace(prefix, '').replace(/\?_t=\d+/, '');
      utils
        .remotePostJSON({
          url: apis[dPrefixUrl] || SERVER_URL + dPrefixUrl,
          data: body,
          req,
          res,
        })
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          next(err);
        });
    } else {
      next();
    }
  });
}

module.exports = apiRoutes;
