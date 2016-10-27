import React, {PropTypes} from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux';
//import {Router, browserHistory} from 'react-router';
//对于 pc 端使用 hash 来处理
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import Immutable from 'immutable';
import configureStore from '../store/configureStore.dev'
import createSelectLocationState from '../util/createSelectLocationState';

import DevTools from './DevTools';
import Perf from 'react-addons-perf';

const Root = ({routes, reducers}) => {
  //const store = configureStore(browserHistory, reducers, Immutable.fromJS({}));
  //对于 pc 端使用 hash 来处理
  const store = configureStore(hashHistory, reducers, Immutable.fromJS({}));

  //const history = syncHistoryWithStore(browserHistory, store, {
  //  selectLocationState: createSelectLocationState()
  //});

  //对于 pc 端使用 hash 来处理
  const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState: createSelectLocationState()
  });

  const _routes = typeof routes === 'function' ? routes(store) : routes;
  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          {_routes}
        </Router>
        <DevTools/>
      </div>
    </Provider>
  );
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func
};

export default Root;

/**
 * import Perf from 'react-addons-perf';
 * Perf.start()
 * Perf.stop()
 * Perf.printInclusive()
 */
window.Perf = Perf;