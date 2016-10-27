/**
 * 自动加载路由配置
 */
import fs from 'fs';
import mock from './mock';

export default (app) => {
  //页面路由
  //首页
  app.get('/', (req, res, next) => {
    const content = {
      data: JSON.stringify(req.content || {})
    };
    res.render('index', content)
  });

  // 关于页
  app.get('/about', (req, res, next) => {
    const content = {
      data: JSON.stringify(req.content || {})
    };
    res.render('about', content)
  });

  // demo 页
  app.get('/demo/person', (req, res, next) => {
    const content = {
      data: JSON.stringify(req.content || {})
    };
    res.render('person', content)
  });

  app.use('/mock', mock);
  //后台数据路由
  fs.readdirSync(__dirname).forEach((name) => {
    const _name = name.replace(/.js/, '');
    if (_name !== 'index' && _name !== 'mock') {
      const obj = require(`./${_name}`);
      app.use(`/api/${_name}`, obj);
    }
  });
};
