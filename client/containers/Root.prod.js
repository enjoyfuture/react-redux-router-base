import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
//对于 pc 端使用 hash 来处理
//import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import Immutable from 'immutable';
import configureStore from '../store/configureStore.prod.js'
import createSelectLocationState from '../util/createSelectLocationState';

const Root = ({routes, reducers}) => {
  // 路由转换配置
  // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
  const store = configureStore(browserHistory, reducers, Immutable.fromJS({}));
  //对于 pc 端使用 hash 来处理
  //const store = configureStore(hashHistory, Immutable.fromJS({}));

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState()
  });

  //对于 pc 端使用 hash 来处理
  //const history = syncHistoryWithStore(hashHistory, store, {
  //  selectLocationState: createSelectLocationState()
  //});
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
  reducers: PropTypes.object
};

export default Root;
