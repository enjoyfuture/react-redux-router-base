import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import api from '../util/middleware-api';

export default function configureStore(history, reducers, initialState) {
  const middleware = [thunk, api, routerMiddleware(history)];

  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}
