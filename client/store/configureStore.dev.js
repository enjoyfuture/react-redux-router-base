import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import api from '../util/middleware-api';

// 使用中间件来处理
export default function configureStore(history, reducers, initialState) {

  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, api, routerMiddleware(history), createLogger()];

  let devTools = [];
  if (typeof document !== 'undefined') {
    devTools = [DevTools.instrument()]
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...devTools
    ));

  // For hot reloading reducers
/*  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = reducers.default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }*/

  return store;
}
