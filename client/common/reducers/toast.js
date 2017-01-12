import {Map} from 'immutable';

// 设置 toast 内容和效果
export default function toast(state = Map(), action) {
  const {type, content, effect, time, error} = action;
  if (type === 'clear_toast') {
    return state.set('effect', effect);
  } else if (type === 'set_toast') {
    return state.set('content', content).set('effect', effect).set('time', time);
  } else if (error) {
    return state.set('content', error).set('effect', 'enter').set('time', 3000);
  }
  return state;
}
