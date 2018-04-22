/**
 * 自动加载路由配置
 */
const fs = require('fs');
const path = require('path');
const logger = require('digger-node').Logger;
const {urlContext} = require('../config');

const rootPath = __dirname;

/**
 * 构建路由拦截相对路径
 * @param routePath
 * @returns {string}
 */
const buildRouteContext = function (routePath) {
  const rootLength = rootPath.length;

  return routePath.length === rootLength
    ? '/'
    : `${routePath.substring(rootLength)}/`;
};

// 后端接口路由
function apiRoutes(app) {
  const isFile = function (name) {
    return (/\.js/).test(name);
  };
  /**
   * 递归添加api路由
   * @param routePath
   */
  const addApiRoute = function (routePath) {
    fs.readdirSync(routePath).forEach((name) => {
      if (!isFile(name)) {
        addApiRoute(path.join(routePath, name)); // 递归添加子路由
      } else {
        const route = buildRouteContext(routePath);
        const routeName = (route + name.replace(/.js/, '')).replace(/\\/g, '/');

        // 过滤 api-routes 和 page-routes
        if (['/api-routes', '/page-routes'].indexOf(routeName) === -1) {
          const obj = require(`.${routeName}`);
          logger.info(`add api route automatic:${routeName}`);
          app.use(urlContext + routeName, obj);
        }
      }
    });
  };

  // api路由配置
  addApiRoute(rootPath);
}

module.exports = apiRoutes;
