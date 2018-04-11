import {Map} from 'immutable';

// 显示 toast 并设置内容
export default function toast(state = Map(), action) {
  const {type, content, time, error} = action;
  if (type === 'close-toast') {
    if (content) {
      return state.set('open', false).set('content', content);
    }
    return state.set('open', false);
  } else if (type === 'open-toast') {
    return state.set('content', content).set('open', true).set('time', time);
  }
  return state;
}
