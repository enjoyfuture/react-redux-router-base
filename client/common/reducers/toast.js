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
  } else if ((type === 'fetch-failure' && error) || error) { // 统一处理请求失败的情况，弹出 toast 提示
    return state.set('content', error).set('open', true).set('time', 3000);
  }
  return state;
}
