import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';

function homeHello(state = Map(), action) {
  const {type, content} = action;
  if (type === 'home-hello') {
    return state.set('content', content);
  } else if (type === 'home-clear-hello') {
    return state.clear();
  }
  return state;
}

function homeRoute(state = Map(), action) {
  const {type, content} = action;
  if (type === 'home-route') {
    return state.set('content', content);
  }
  return state;
}

export default combineReducers({
  homeHello,
  homeRoute,
});
