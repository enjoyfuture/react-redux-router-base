/**
 * 入口文件
 */
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const logger = require('digger-node').Logger;
const apiRoutes = require('./routes/api-routes');
const apiExtRoutes = require('./routes/api-ext-routes');
const pageRoutes = require('./routes/page-routes');
const errorHandler = require('./helper/error-handler');
const {
  URL_CONTEXT,
  RES_CODE,
  RES_MSG,
  NO_PERMISSION_CODE,
} = require('../common/constants');
const asyncRespHeader = require('./middlewares/async-resp-header');
const { getClientIP, getLocationOrigin } = require('./helper/utils');
const commonSafety = require('./middlewares/common-safety');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const app = express();

logger.info(`process.env.NODE_ENV is [${process.env.NODE_ENV}]`);
logger.info(`process.env.PORT is [${process.env.PORT}]`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// 非生产环境开启Gzip，生产环境nginx会开启gzip
if (isProd) {
  app.use(compress());
}
// 设置前端post提交最大内容
app.use(bodyParser.json({ limit: '20mb' }));
/*
 * The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
 * https://www.npmjs.com/package/body-parser#extended
 */
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(require('./middlewares/request-logger').create(logger));
// 因为 Nginx 会卸载 context
app.use(
  isProd ? '' : URL_CONTEXT,
  express.static(path.join(__dirname, '../public'))
);
// favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// 加载安全机制，静态资源不会走到这里
commonSafety(app);

if (isDev) {
  const webpackConfig = require('../scripts/webpack.config.dev.babel');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true, // 如果设置该参数为 true，则不打印输出信息
      cache: true, // 开启缓存，增量编译
      stats: {
        colors: true, // 打印日志显示颜色
        // reasons: true // 打印相关被引入的模块
      },
      publicPath: webpackConfig.output.publicPath,
    })
  );

  // 热部署，自动刷新，需要结合 webpack.config.dev.babel 中的定义
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: logger.info,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  );
}

// 设置 client ip
app.use((req, res, next) => {
  req.headers.clientIP = getClientIP(req);
  next();
});

// 设置 api 异步请求响应头
app.use(asyncRespHeader);

/*
 * 加载路由
 * 统一处理前端 api，直接映射到 java 端对应的 api 上
 */
apiRoutes(app);
// 其他需特殊处理的接口，比如合并请求等
apiExtRoutes(app);
// 页面路由
pageRoutes(app);

// 捕获 404 和其他错误
app.use((req, res, next) => {
  // 不处理 map 和 json 格式的数据
  if (/\.(map|json)$/.test(req.url)) {
    return next();
  }
  const err = new Error(`${req.url},Not Found`);
  err.status = 404;
  next(err);
});

// 异步接口异常处理
app.use((err, req, res, next) => {
  const contentType = req.headers['content-type'];

  // api 请求
  if (
    contentType &&
    contentType.toLowerCase().indexOf('application/json') !== -1
  ) {
    if (err) {
      // node 端打印错误日志
      logger.error(err.stack);
      const { code } = err;

      if (err.code === NO_PERMISSION_CODE) {
        // 如果没权限
        return res.redirect(`${getLocationOrigin}/403`);
      }

      const msg = errorHandler(err);
      return res.status(200).json({
        [RES_CODE]: code || 'S0001',
        [RES_MSG]: msg,
      });
    }
  } else {
    next(err);
  }
});

// 同步页面调用异常处理
app.use((err, req, res, next) => {
  // node 端打印错误日志
  if (err.status === 404) {
    logger.info(err.stack);
  } else {
    logger.error(err.stack);
  }

  res.status(err.status || 500).render('error', {
    message: err.message,
    error: err,
    context: URL_CONTEXT,
    mta: {
      version: process.env.MTA_VERSION,
      name: process.env.MTA_NAME,
      sid: process.env.MTA_SID,
      cid: process.env.MTA_CID,
    },
  });
});

module.exports = app;
