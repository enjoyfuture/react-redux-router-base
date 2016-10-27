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