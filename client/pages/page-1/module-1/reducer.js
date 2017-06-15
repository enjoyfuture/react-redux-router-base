import {Map} from 'immutable';

function module1(state = Map(), action) {
  const {type, content} = action;
  switch (type) {
  case 'module-1-hello':
    return state.set('content', content);
  default:
    return state;
  }
}

export default module1;
