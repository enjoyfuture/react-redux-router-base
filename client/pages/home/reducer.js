import {Map} from 'immutable';

function home(state = Map(), action) {
  const {type, content} = action;
  if (type === 'home-hello') {
    return state.set('content', content);
  } else if (type === 'home-clear-hello') {
    return state.clear();
  }
  return state;
}

export default home;
