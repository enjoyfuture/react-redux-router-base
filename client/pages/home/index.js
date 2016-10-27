/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */
const ie8 = require('../../util/perfect').ie8();
if (ie8) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  require('fetch-ie8');
}

const promise = require('es6-promise');
const React = require('react');
const render = require('react-dom').render;

const routes = require('./routes').default;
const reducers = require('./reducers').default;

let Root;
if (process.env.NODE_ENV === 'development') {
  Root = require('../../containers/Root.dev').default;
} else {
  Root = require('../../containers/Root.prod').default;
}

// Promise 兼容性处理
promise.polyfill();

render(
  <Root routes={routes} reducers={reducers}/>,
  document.getElementById('layout')
);
