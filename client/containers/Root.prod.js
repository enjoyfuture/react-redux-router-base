import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncHistoryWithStore} from 'react-router-redux'
import Immutable from 'immutable';
import configureStore from '../store/configureStore.prod.js'
import createSelectLocationState from '../util/createSelectLocationState';

const Root = ({routes, reducers, basename}) => {
  // 路由转换配置
  // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
  const browserHistory = useRouterHistory(createBrowserHistory)({
    basename: basename ? basename : '/'
  });
  const store = configureStore(browserHistory, reducers, Immutable.fromJS({}));
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState()
  });

  const _routes = typeof routes === 'function' ? routes(store) : routes;
  return (
    <Provider store={store}>
      <Router history={history}>
        {_routes}
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func,
  basename: PropTypes.string
};

export default Root;
