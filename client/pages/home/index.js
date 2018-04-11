import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux-immutable';
import {Route} from 'react-router-dom';

import Root from '../../Root';
import toast from '../../common/reducers/toast';
import home from './reducer';
import App from '../../common/App';
import HomePage from './HomePage';
import {urlContext} from '../../utils/config';

// react-router 4 中不支持路由的嵌套写法，跟 3 有很大的不同，官方的说法是去中心化
// 路由如果用到嵌套的时候，需要在路由对应的组件中加入
const routes = () => {
  return (
    <App>
      <Route path="/" component={HomePage}/>
    </App>
  );
};


const reducers = combineReducers({
  toast,
  home,
});

render(
  <Root routes={routes} reducers={reducers} basename={`${urlContext}/home`}/>,
  document.getElementById('layout'),
);
