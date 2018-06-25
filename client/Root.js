import React from 'react';
import PropTypes from 'prop-types';
import dva from 'dva';
import createBrowserHistory from 'history/createBrowserHistory';

// middlewares
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  middleware.push(createLogger());
}

// 创建 app
const app = dva({
  initialState: {}, // 初始化数据怎么处理，后续待看具体 api
  history: createBrowserHistory(),
  onAction: middleware,
  onError(e, dispatch) {
    console.log(e.message);
  },
});


const Root = ({ models = [], Container }) => {
  const RouterConfig = ({ history, location }) => (
    <Container history={history} locaiton={location} />
  );

  RouterConfig.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  };

  models.forEach(model => {
    app.model(model.default);
  });

  app.router(RouterConfig);

  app.start('#layout');
};

export default Root;
