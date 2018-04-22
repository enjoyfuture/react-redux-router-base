/**
 * 页面路由配置
 */
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const handlebars = require('handlebars');
const logger = require('digger-node').Logger;
const {urlContext, nodeEnv} = require('../config');

// services
const isDev = nodeEnv === 'development';

// 加载webpack打包后的静态文件映射表
const fileManifest = isDev ? null : require('../../public/dist/manifest.json');

// 静态文件上下文路径
const staticResourceContext = `${urlContext}/dist/`;

// 加载html模板
const htmlTemplate = (function (path) {
  let content = fs.readFileSync(path, {encoding: 'utf8'});
  // 去掉模板中的注释
  content = content.replace(/<!--.*-->/g, '');
  return handlebars.compile(content);
})(path.join(__dirname, '../views/layout.hbs'));

/**
 * 将页面初始值转换为scrip脚本，添加到data.scriptHtml属性中
 * @param data
 */
const wrapScriptHtml = function (data) {

  // 应该把所有的初始化数据都放到 __initialState__ 中，client 生成 store 时，传入该数据
  if (data.initDatas) {
    const scriptHtml = `window.__initialState__=${serialize(data.initDatas)};`;
    data.scriptHtml = scriptHtml;
    delete data.initDatas;
  }

  // 设置二级路径上下文
  data.urlContext = urlContext;

};
/**
 * 构建页面样式表，添加到data.links属性中
 * @param data
 * @param isDev
 * @param manifest
 */
const wrapStyleImports = function (data, isDev, manifest) {
  const buildLink = function (href) {
    if (href) {
      return `<link href="${href}" rel="stylesheet">`;
    }
    return '';
  };
  if (!isDev) {
    let links = buildLink(manifest[`${staticResourceContext}${data.name}.css`]);
    // 公共的
    if (manifest[`${staticResourceContext}vendor.css`]) {
      links += buildLink(manifest[`${staticResourceContext}vendor.css`]);
    }
    // 引入第三方 css
    if (manifest[`${staticResourceContext}style.${data.name}.css`]) {
      links += buildLink(manifest[`${staticResourceContext}style.${data.name}.css`]);
    }
    data.links = links;
  }
};

/**
 * 构建页面外链脚本，添加到data.scripts属性中
 * @param data
 * @param isDev
 * @param manifest
 */
const wrapScriptImports = function (data, isDev, manifest) {
  const buildScript = function (src) {
    if (src) {
      return `<script src="${src}"></script>`;
    }
    return '';
  };
  if (isDev) {
    data.scripts = `${buildScript(`${urlContext}/dll/vendor.dll.js`)}
         ${buildScript(`${staticResourceContext}vendors.chunk.js`)}
         ${buildScript(`${staticResourceContext}${data.name}.bundle.js`)}`;
  } else {
    data.scripts = `${buildScript(manifest[`${staticResourceContext}manifest.js`])}
        ${buildScript(manifest[`${staticResourceContext}vendors.js`])}
        ${buildScript(manifest[`${staticResourceContext}${data.name}.js`])}`;
  }
};
/**
 * 设置通用的响应头,页面不缓存！！
 * @param response
 */
const setCommonHeader = function (response) {
  response.setHeader('cache-control', 'no-cache, no-store');
  response.setHeader('content-type', 'text/html; charset=UTF-8');
};

/**
 * 根据页面模型数据渲染页面模板
 * @param request
 * @param response
 * @param data
 * {
 *    title, //页面标题<必须>
 *    name,  //页面在webpack entry中对应的名称<必须>
 *    initDatas:{
 *        _pageInitData,others...
 *    }
 * }
 */
const renderTemplateSync = function (request, response, data) {
  setCommonHeader(response);

  wrapScriptHtml(data);
  wrapStyleImports(data, isDev, fileManifest);
  wrapScriptImports(data, isDev, fileManifest);
  // 环境
  data.isProd = process.env.NODE_ENV === 'production';
  /*
   * data 结构：
   *     { title,name,scriptHtml,links,scripts,context }
   */
  response.end(htmlTemplate(data));
};

/**
 * 渲染首页
 * @param req
 * @param res
 * @param next
 */
const renderIndex = function (req, res, next) {
  res.redirect(`${urlContext}/home`);
};

function addRoute(app, options) {
  // page1
  app.get(`${urlContext}/page1**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'Page1',
      name: 'page1',
    });
  });

  // page2
  app.get(`${urlContext}/page2**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'Page2',
      name: 'page2',
    });
  });

  // about
  app.get(`${urlContext}/about**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'About Page',
      name: 'about',
    });
  });

  // h5-example
  app.get(`${urlContext}/h5-example**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'h5-example',
      name: 'h5-example',
    });
  });

  // 首页
  app.get(`${urlContext}/home**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'Home Page',
      name: 'home',
    });
  });

  app.get(`${urlContext}/`, (req, res, next) => {
    renderIndex(req, res, next);
  });

  // 将未知的页面请求重定向到首页
  app.get('*', (req, res, next) => {
    if (/\.{1}(ico|png|jpg|gif|svg|js|css|map|json)(\?.*|$)/.test(req.url)) {
      return next();
    }
    logger.info(`unknow resource,redirect to /,request url : ${req.url}`);

    renderIndex(req, res, next);
  });
}

module.exports = addRoute;
