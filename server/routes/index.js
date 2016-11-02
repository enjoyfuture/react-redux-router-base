/**
 * 自动加载路由配置
 */
const fs = require('fs');

//页面路由
const pageRoutes = ['index', 'about', 'person'];

module.exports = (app) => {
  //页面路由
  pageRoutes.forEach((item) => {
    app.get(item === 'index' ? '/' : `/${item}`, (req, res) => {
      res.render(item)
    });
  });

  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  app.get('*', (req, res, next) => {
    const url = req.url.substring(1);
    if (url.startsWith('api') || url.startsWith('mock')) {
      return next();
    }
    let page;
    pageRoutes.forEach((item) => {
      if (item !== 'index' && url.startsWith(item)) {
        page = item;
      }
    });
    if (page) {
      res.render(page);
    }
  });

  //后台数据路由
  fs.readdirSync(__dirname).forEach((name) => {
    const _name = name.replace(/.js/, '');
    if (_name !== 'index' && _name !== 'mock') {
      const obj = require(`./${_name}`);
      app.use(`/api/${_name}`, obj);
    }
  });
};
