import promise from 'es6-promise';
import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route, IndexRoute} from 'react-router';

import Root from '../../Root';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import home from './reducer';
import App from '../../common/App';
import HomePage from './HomePage';

import '../../common/less/main.less';

// Promise 兼容性处理
promise.polyfill();

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);

const reducers = combineReducers({
  routing,
  toast,
  home
});

render(
  <Root routes={routes} reducers={reducers} basename="/context/home"/>,
  document.getElementById('layout')
);
