/**
 * 入口文件
 */
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const boot = require('./boot');
const logger = require('./helper/mylogger').Logger;
const {getClientIP} = require('./helper/utils');
const errorHandler = require('./helper/errorHandler');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(compress());//开启Gzip
app.use(bodyParser.json({limit: '20mb'}));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(require('./helper/requestLogger').create(logger));

logger.info(`process.env.NODE_ENV is [${process.env.NODE_ENV}]`);

app.use(process.env.URL_CONTEXT, express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack.config.dev.babel');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, //如果设置该参数为 true，则不打印输出信息
    cache: true, //开启缓存，增量编译
    stats: {
      colors: true, //打印日志显示颜色
      reasons: true //打印相关被引入的模块
    },
    publicPath: webpackConfig.output.publicPath
  }));

  //热部署，自动刷新，需要结合 webpack.config.dev.babel 中的定义
  app.use(require('webpack-hot-middleware')(compiler, {
    log: logger.info,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

//get client IP
app.use((req, res, next) => {
  req.headers.clientIP = getClientIP(req);
  next();
});

// load routers
boot(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  //不处理 map 和 json 格式的数据
  if (/\.(map|json)$/.test(req.url)) {
    return next();
  }
  const err = new Error(`${req.url},Not Found`);
  err.status = 404;
  next(err);
});

// error handlers
// will print stacktrace
app.use((err, req, res, next) => {
  if (req.url.startsWith('/api')) {
    const msg = errorHandler(err);
    return res.status(200).json({
      code: err.code || 'E-50x',
      msg
    });
  }

  logger.error(err.stack);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
