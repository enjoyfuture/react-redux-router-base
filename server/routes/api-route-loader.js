/**
 * 自动加载路由配置
 */
const fs = require('fs');
const path = require('path');
const logger = require('../helper/mylogger').Logger;
const {URL_CONTEXT} = require('../config');

const rootPath = __dirname;

//页面上下文，根路径，nginx 会卸载掉前缀 context
const context = process.env.NODE_ENV === 'product' ? '' : URL_CONTEXT;

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

function addRoute(app, options) {
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
        addApiRoute(path.join(routePath, name)); //递归添加子路由
      } else {
        const route = buildRouteContext(routePath);
        const routeName = (route + name.replace(/.js/, '')).replace(/\\/g, '/');

        //过滤loader页面路由
        if (['/api-route-loader', '/page-routes'].indexOf(routeName) === -1) {
          const obj = require(`.${routeName}`);
          logger.info(`add api route automatic:${routeName}`);
          app.use(context + routeName, obj);
        }
      }
    });
  };

  //api路由配置
  addApiRoute(rootPath);
}

module.exports = addRoute;
