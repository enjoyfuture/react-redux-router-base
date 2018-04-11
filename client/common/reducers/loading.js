import {Map} from 'immutable';

const requestR = /-request$/;
const successR = /-success$/;
const failureR = /-failure$/;

/**
 * 该 loading 主要用来统一处理 fetch 请求加载中效果
 * 请求的 action 中如果设置了 loading 为 true，则直接在整个页面显示加载效果
 * 如果没有设置，需要子组件根据 isFetching 状态来处理 loading 效果
 * 当 action 中传入了 error 内容，即使没有传递 type ，也让 loading 消失
 * @param state
 * @param action
 * @returns {*}
 */
export default function loading(state = Map(), action) {
  const {type, error, loading} = action;
  // if (requestR.test(type)) {
  //   // if (loading) {
  //   //   return state.set('isFetching', true).set('loading', true);
  //   // }
  //   return state.set('isFetching', true).delete('loading');
  // } else if (successR.test(type) || failureR.test(type)) {
  //   // if (loading) {
  //   //   return state.set('isFetching', false).set('loading', true);
  //   // }
  //   return state.set('isFetching', false).delete('loading');
  // }
  return state.set('isFetching', false);
}
