import {Map} from 'immutable';

function module2(state = Map(), action) {
  const {type, content} = action;
  switch (type) {
  case 'module-2-hello':
    return state.set('content', content);
  default:
    return state;
  }
}

export default module2;
