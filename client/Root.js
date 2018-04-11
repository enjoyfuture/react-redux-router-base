import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import Immutable from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {isMobile} from './utils/device-env';

// 加载 scss
import './scss/perfect.scss';

if (isMobile) {
  // 初始化调整字体大小，通常不建议动态调整字体大小，以 html 默认的字体 16px 为准
  // require('./utils/perfect').adjustFontSize();
}

// 对于手机端项目需要初始化 tapEvent 事件
injectTapEventPlugin();

// 开发环境
let DevTools;
if (process.env.NODE_ENV === 'development') {
  const {createDevTools} = require('redux-devtools');
  const LogMonitor = require('redux-devtools-log-monitor').default;
  const DockMonitor = require('redux-devtools-dock-monitor').default;

  /*eslint-disable indent*/
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-w"
                 defaultIsVisible={false}
                 defaultPosition="right">
      <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>,
  );

  // 引入 eruda
  import('eruda')
    .then(eruda => eruda.init());
}

/**
 * 配置 store
 * @param history
 * @param reducers
 * @param initialState
 * @returns {*}
 */
export function configureStore(reducers, initialState) {

  const middleware = [thunk];
  if (process.env.NODE_ENV === 'development') { //开发环境
    const {createLogger} = require('redux-logger');
    middleware.push(createLogger());
  }

  let devTools = [];
  if (DevTools && typeof document !== 'undefined') {
    devTools = [DevTools.instrument()];
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...devTools,
    ));

  return store;
}


const Root = ({routes, reducers, basename}) => {

  //初始化 store
  const store = configureStore(reducers, Immutable.fromJS(window.__initialState__ || {}));

  let router = null;

  const Routes = routes;

  if (process.env.NODE_ENV === 'development') {
    // 对于开发环境，由于 css 是异步加入的，页面体验不是很好，可以加入定时器来处理
    const layout = document.getElementById('layout');
    layout.style.setProperty('display', 'none');

    setTimeout(() => {
      layout.style.removeProperty('display');
    }, 1000);

    router = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <div>
            <Routes/>
            <DevTools/>
          </div>
        </Provider>
      </BrowserRouter>
    );
  } else {
    router = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Routes/>
        </Provider>
      </BrowserRouter>
    );
  }
  return router;
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func,
  basename: PropTypes.string,
};

export default Root;
