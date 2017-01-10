import promise from 'es6-promise';
import React from 'react';
import {render} from 'react-dom';

import routes from './routes';
import reducers from './reducers';

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
