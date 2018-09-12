if (process.env.NODE_ENV === undefined) {
  console.log('NODE_ENV is undefined! use default [development].');
  process.env.NODE_ENV = 'development';
}
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}.`);

const realFileName =
  process.env.NODE_ENV === 'development'
    ? './webpack.config.dev.babel'
    : './webpack.config.prod.babel';

console.log(`use webpack config file :"${realFileName}"`);

module.exports = require(realFileName);
