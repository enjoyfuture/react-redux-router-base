import {Map} from 'immutable';

import {SET_TOAST, CLEAR_TOAST} from './constant';

// 设置 toast 内容和效果
function toast(state = Map(), action) {
  const {type, content, effect, time, error} = action;
  if (type === CLEAR_TOAST) {
    return state.set('effect', effect);
  } else if (type === SET_TOAST) {
    return state.set('content', content).set('effect', effect).set('time', time);
  } else if (error) {
    return state.set('content', error).set('effect', 'enter').set('time', 3000);
  }
  return state;
}

export default toast;
