/**
 * 自动加载路由配置
 */
'use strict';
const fs = require('fs');
const path = require('path');
const logger = require('../helper/mylogger').Logger;

const rootPath = __dirname;

/**
 * 构建路由拦截相对路径
 * @param routePath
 * @returns {string}
 */
const buildRouteContext = function(routePath) {
    const rootLength = rootPath.length;

    return routePath.length === rootLength
        ? '/'
        : routePath.substring(rootLength) + '/';
};

function addRoute(app, options) {
    const isFile = function(name) {
        return (/\.js/).test(name);
    };
    /**
     * 递归添加api路由
     * @param routePath
     */
    const addApiRoute = function(routePath) {
        fs.readdirSync(routePath).forEach((name) => {
            if (!isFile(name)) {
                addApiRoute(path.join(routePath, name)); //递归添加子路由
            } else {
                const context = buildRouteContext(routePath);
                const routeName = (context + name.replace(/.js/, '')).replace(/\\/g, '/');

                //过滤loader页面路由
                if(['/api-route-loader','/page-routes'].indexOf(routeName)==-1){
                    const obj = require('.' + routeName);
                    logger.info(`add api route automatic:${routeName}`);
                    app.use(routeName, obj);
                }
            }
        });
    };

    //api路由配置
    addApiRoute(rootPath);
}

module.exports = addRoute;
