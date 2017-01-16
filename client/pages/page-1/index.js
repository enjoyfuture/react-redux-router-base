import React from 'react';
import {render} from 'react-dom';
import promise from 'es6-promise';
import Root from '../../Root';
import routes from './routes';
import reducers from './reducers';
import '../../common/less/main.less';

// Promise 兼容性处理
promise.polyfill();

render(
  <Root routes={routes} reducers={reducers} basename="/context/page1"/>,
  document.getElementById('layout')
);
