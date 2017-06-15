/**
 * 自动加载路由配置
 */
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const handlebars = require('handlebars');
const logger = require('./helper/mylogger').Logger;
const {URL_CONTEXT} = require('./config');

const env = process.env.NODE_ENV;

//文件匹配
const fileMapping = env === 'development' ? null : require('../public/dist/mapping.json');

const rootPath = path.join(__dirname, 'routes');

//页面上下文，根路径，nginx 会卸载掉前缀 context
const context = process.env.NODE_ENV === 'product' ? '' : URL_CONTEXT;
const urlPrefix = `${URL_CONTEXT}/dist/`;

const readTmpl = (callback) => {
  fs.readFile(path.join(__dirname, 'views', 'layout.hbs'), 'utf8', (err, data) => {
    if (err) {
      logger.error(`读取 handlebars 模板文件出错${err.stack}`);
      callback(err);
    }
    const template = handlebars.compile(data);
    callback(null, template);
  });
};

//预加载模板
let template;
readTmpl((err, tmpl) => {
  if (!err) {
    template = tmpl;
  }
});

const isFile = function (name) {
  return (/\.js/).test(name);
};

//为了区分前后端路由，服务端统一加前缀 api
const buildRoutPath = function (routePath) {
  const rootLength = rootPath.length;

  return routePath.length === rootLength
    ? '/'
    : `${routePath.substring(rootLength)}/`;
};

function addRoute(app, routePath = rootPath) {
  //页面路由
  const pageRoutes = [{
    page: 'home',
    title: 'Home Page'
  }, {
    page: 'page1',
    title: 'Page1'
  }, {
    page: 'page2',
    title: 'Page2'
  }, {
    page: 'about',
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

    let route = {
      page: 'home',
      title: 'home'
    };

    pageRoutes.forEach((item) => {
      if (url.startsWith(item.page)) {
        route = item;
        return false;
      }
    });

    // 初始化数据
    // TODO 这里可以根据业务需求初始化数据
    const initialState = {};
    const scriptHtml = `window.__initialState__=${serialize(initialState)};`;
    const {page, title} = route;
    const links = env === 'development' ? ''
      : `<link rel='stylesheet' href="${fileMapping[`${urlPrefix}vendor.css`]}">
         <link rel='stylesheet' href="${fileMapping[`${urlPrefix}${page}.css`]}">`;

    const vendor = env === 'development'
      ? `<script src="${URL_CONTEXT}/dll/vendor.dll.js"></script>`
      : `<script src="${fileMapping[`${urlPrefix}manifest.js`]}"></script>
         <script src="${fileMapping[`${urlPrefix}vendor.js`]}"></script>`;
    const pageScript = env === 'development'
      ? `<script src="${urlPrefix}${page}.js"></script>`
      : `<script src="${fileMapping[`${urlPrefix}${page}.js`]}"></script>`;

    const data = {
      title, scriptHtml,
      script: vendor + pageScript,
      links,
      context: URL_CONTEXT
    };

    if (template) {
      res.send(template(data));
    } else {
      //再次尝试读取一次
      readTmpl((err, tmpl) => {
        if (err) {
          return res.status(500).send({
            message: err.message,
            error: err
          });
        }
        res.send(tmpl(data));
      });
    }

    //如果想自定义页面，也可以按照以下方式处理
    /*res.render(page, {
     title, scriptHtml,
     script: vendor + pageScript,
     links
     });*/
  });

  //服务端数据路由
  fs.readdirSync(routePath).forEach((name) => {
    if (!isFile(name)) {
      addRoute(app, path.join(routePath, name)); //递归添加子路由
    } else {
      const route = buildRoutPath(routePath);
      const routeName = (route + name.replace(/.js/, '')).replace(/\\/g, '/');
      const obj = require(`./routes/${routeName}`);
      logger.info(`add route automatic:${context}/api${routeName}`);
      app.use(`${context}/api${routeName}`, obj);
    }
  });
}

module.exports = addRoute;
