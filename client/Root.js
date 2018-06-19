import React from 'react';
import PropTypes from 'prop-types';
import dva from 'dva';
import createLoading from 'dva-loading';
// import {Provider} from 'react-redux';
// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import {BrowserRouter} from 'react-router-dom';
// import Immutable from 'immutable';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import createBrowserHistory from 'history/createBrowserHistory';
// import api from './middlewares/api';
import {isMobile} from './utils/device-env';
import commonModels from './common/models';

// 加载 scss
import './scss/perfect.scss';

// if (isMobile) {
//   // 初始化调整字体大小，通常不建议动态调整字体大小，以 html 默认的字体 16px 为准
//   // require('./utils/perfect').adjustFontSize();
// }

// 对于手机端项目需要初始化 tapEvent 事件
// injectTapEventPlugin();

// 开发环境
// let DevTools;
// if (process.env.NODE_ENV === 'development') {
//   const {createDevTools} = require('redux-devtools');
//   const LogMonitor = require('redux-devtools-log-monitor').default;
//   const DockMonitor = require('redux-devtools-dock-monitor').default;
//
//   /* eslint-disable indent */
//   DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h"
//                  changePositionKey="ctrl-w"
//                  defaultIsVisible={false}
//                  defaultPosition="right">
//       <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
//     </DockMonitor>,
//   );
//
//   // 引入 eruda
//   import('eruda')
//     .then(eruda => eruda.init());
// }

// middlewares
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  middleware.push(createLogger());
}

// 创建 app
const app = dva({
  history: createBrowserHistory(),
  onAction: middleware,
  onError(e, dispatch) {
    console.log(e.message);
  },
});

app.use(createLoading());

const Root = ({ models = [], Container }) => {
  const RouterConfig = ({ history, location }) => (
    <Container history={history} locaiton={location} />
  );

  RouterConfig.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  };

  const ms = models;

  ms.forEach(model => {
    app.model(model.default);
  });

  app.router(RouterConfig);

  app.start('#layout');
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func,
  basename: PropTypes.string,
};

export default Root;
