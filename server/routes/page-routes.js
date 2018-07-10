/**
 * 页面路由配置
 */

const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript');
const handlebars = require('handlebars');
const logger = require('digger-node').Logger;
const service = require('../service/common');
const wrapData = require('../helper/utils').wrapData;
const { URL_CONTEXT } = require('../../common/constants');

// environment
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// 加载 webpack 打包后的静态文件映射表
const manifest = isDev ? null : require('../../public/dist/manifest.json');

// 静态文件上下文路径
const staticResourceContext = `${URL_CONTEXT}/dist/`;

// 加载html模板
const htmlTemplate = (function(filePath) {
  let content = fs.readFileSync(filePath, { encoding: 'utf8' });
  // 去掉模板中的注释
  content = content.replace(/<!--.*-->/g, '');
  return handlebars.compile(content);
})(path.join(__dirname, '../views/layout.hbs'));

/**
 * 将页面初始值转换为scrip脚本，添加到data.scriptHtml属性中
 * @param data
 */
const wrapScriptHtml = function(data) {
  // 应该把所有的初始化数据都放到 __initialData__ 中，client 生成 store 时，传入该数据
  if (data.initDatas) {
    const scriptHtml = `window.__initialData__=${serialize(data.initDatas)};`;
    data.scriptHtml = scriptHtml;
    delete data.initDatas;
  }
};

/**
 * 构建页面样式表，添加到 data.links 属性中
 * @param data
 */
const wrapStyleImports = function(data) {
  const buildLink = function(href) {
    return href ? `<link href="${href}" rel="stylesheet">` : '';
  };

  if (!isDev) {
    let links = buildLink(manifest[`${staticResourceContext}${data.name}.css`]);
    // 公共的
    if (manifest[`${staticResourceContext}vendors.css`]) {
      links += buildLink(manifest[`${staticResourceContext}vendors.css`]);
    }
    // 引入第三方 css
    if (manifest[`${staticResourceContext}style.${data.name}.css`]) {
      links += buildLink(
        manifest[`${staticResourceContext}style.${data.name}.css`]
      );
    }
    data.links = links;
  }
};

/**
 * 构建页面外链脚本，添加到data.scripts属性中
 * @param data
 */
const wrapScriptImports = function(data) {
  const buildScript = function(src) {
    return src ? `<script src="${src}"></script>` : '';
  };

  if (isDev) {
    data.scripts = `${buildScript(`${URL_CONTEXT}/dll/vendor.dll.js`)}
         ${buildScript(`${staticResourceContext}vendors.chunk.js`)}
         ${buildScript(`${staticResourceContext}${data.name}.bundle.js`)}`;
  } else {
    data.scripts = `${buildScript(
      manifest[`${staticResourceContext}manifest.js`]
    )}
        ${buildScript(manifest[`${staticResourceContext}vendors.js`])}
        ${buildScript(manifest[`${staticResourceContext}${data.name}.js`])}`;
  }
};

/**
 * 设置通用的响应头,页面不缓存！！
 * @param response
 */
const setCommonHeader = function(response) {
  response.setHeader('cache-control', 'no-cache, no-store');
  response.setHeader('content-type', 'text/html; charset=UTF-8');
};

/**
 * 根据页面模型数据渲染页面模板
 * @param request
 * @param response
 * @param data
 * {
 *    title, // 页面标题<必须>
 *    name,  // 页面在webpack entry中对应的名称<必须>
 *    initDatas:{
 *        _pageInitData,others...
 *    }
 * }
 */
const renderTemplateSync = function(request, response, data) {
  setCommonHeader(response);

  wrapScriptHtml(data);
  wrapStyleImports(data);
  wrapScriptImports(data);
  // 环境
  data.isProd = isProd;
  // 设置二级路径上下文
  data.URL_CONTEXT = URL_CONTEXT;
  /*
   * data 结构：
   *     { title,name,scriptHtml,links,scripts,URL_CONTEXT,isProd }
   */
  response.end(htmlTemplate(data));
};

/**
 * 重定向到首页
 * @param req
 * @param res
 * @param next
 */
const renderIndex = function(req, res, next) {
  res.redirect(`${URL_CONTEXT}/`);
};

/**
 * 添加路由管理
 * @param app
 * @param options
 */
function addRoute(app, options) {
  // client-error，处理浏览器
  app.get(`${URL_CONTEXT}/client-error`, (req, res, next) => {
    let info;
    try {
      info = decodeURIComponent(req.query.i);
    } catch (e) {
      info = null;
    }
    logger.info(
      `client error!!!error info is: ${info},header is: ${JSON.stringify(
        req.headers
      )}`
    );
    res.end(null);
  });

  // page1
  app.get(`${URL_CONTEXT}/page1**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'Page1',
      name: 'page1',
    });
  });

  // 对于单页面，直接写一个页面路由即可
  app.get(`${URL_CONTEXT}**`, (req, res, next) => {
    renderTemplateSync(req, res, {
      title: 'React + Redux + Router',
      name: 'index',
    });
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
