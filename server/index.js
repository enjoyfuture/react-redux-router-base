/**
 * 入口文件
 */
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json({limit: '20mb'}));//设置前端post提交最大内容
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack.config.dev.babel');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}
// load routers
routes(app);

//将未知的页面请求重定向到首页
app.get('*', (req, res, next) => {
  if (/\.(ico)|(png)|(jpg)|(gif)|(js)|(css)/.test(req.url)) {
    return next();
  }

  const content = {
    data: JSON.stringify(req.content || {})
  };

  res.render('index', content)
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
