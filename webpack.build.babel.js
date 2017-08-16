// 通过设置环境变量，设置 url 二级路径上下文，页面中引入资源上下文
process.env.URL_CONTEXT = '/context';

if (process.env.NODE_ENV === undefined) {
  console.log('NODE_ENV is undefind! use default [beta].');
  process.env.NODE_ENV = 'development';
}
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}.`);

let realFileName = './webpack.config.prod.babel';

if (process.env.NODE_ENV === 'development') {
  realFileName = './webpack.config.dev.babel';
}

console.log(`use webpack config file :"${realFileName}"`);

module.exports = require(realFileName);
