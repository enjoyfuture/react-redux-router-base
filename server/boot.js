/**
 * 自动加载路由配置
 */
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const logger = require('./helper/mylogger').Logger;

const rootPath = path.join(__dirname, 'routes');
const isFile = function (name) {
  return (/\.js/).test(name);
};

//页面上下文，根路径，nginx 会卸载掉前缀 context
const context = process.env.NODE_ENV === 'product' ? '' : '/context';

//为了区分前后端路由，服务端统一加前缀 api
const buildRoutContext = function (routePath) {
  const rootLength = rootPath.length;

  return routePath.length === rootLength
    ? '/'
    : `${routePath.substring(rootLength)}/`;
};

function addRoute(app, routePath = rootPath) {
  //页面路由
  const pageRoutes = [{
    route: 'home',
    title: 'Home Page'
  }, {
    route: 'page1',
    title: 'Page1'
  }, {
    route: 'page2',
    title: 'Page2'
  }, {
    route: 'about',
    title: 'About Page'
  }];

  // 前后端路由区分，包括页面路由
  app.get('*', (req, res, next) => {
    let {url} = req;
    if (/\.(ico|png|jpg|gif|js|css|woff|ttf|svg|map|json)$/.test(url)) {
      return next();
    }
    url = url.substring(context.length + 1);
    //后台数据接口
    if (url.startsWith('api')) {
      return next();
    }

    logger.info(`页面 url **** ${url}`);

    let page = {
      route: 'home',
      title: 'home'
    };

    pageRoutes.forEach((item) => {
      if (url.startsWith(item.route)) {
        page = item;
        return false;
      }
    });

    // 初始化数据
    // TODO 这里可以根据业务需求初始化数据
    const initialState = {};
    const scriptHtml = `window.__initialState__=${serialize(initialState)};`;
    const {route, title} = page;
    res.render(route, {title, scriptHtml});
  });

  //服务端数据路由
  fs.readdirSync(routePath).forEach((name) => {
    if (!isFile(name)) {
      addRoute(app, path.join(routePath, name)); //递归添加子路由
    } else {
      const context = buildRoutContext(routePath);
      const routeName = (context + name.replace(/.js/, '')).replace(/\\/g, '/');
      const obj = require(`./routes/${routeName}`);
      logger.info(`add route automatic:${routeName}`);
      app.use(routeName, obj);
    }
  });
}

module.exports = addRoute;
