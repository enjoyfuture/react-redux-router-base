import {Map} from 'immutable';

import {HELLO} from './constant';

function home(state = Map(), action) {
  const {type, content} = action;
  if (type === HELLO) {
    return state.set('content', content);
  }
  return state;
}

export default home;
