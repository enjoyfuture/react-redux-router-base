/*
 * 中间件，用来统一处理 fetch 请求
 */
import assign from 'lodash/assign';
import callApi from './fetch';
import errorHandler from './errorHandler';

export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  //参数 clean 为 true 时，表示先清空数据，比如列表刷新时
  const {url, body, method, types, options, clean} = callAPI;

  // 分别执行发送请求，成功或失败请求
  function actionWith(data) {
    // 注意这里，返回最终的 action 供 reducer 中使用，即 reducer 中拿到的 action 是从这里取到的
    const finalAction = assign({}, action, data);
    //delete finalAction[CALL_API];
    return finalAction;
  }

  const {request, success, failure} = types;
  if (!success || !failure) {
    throw new Error('请传入 success 和 failure');
  }
  if (request) {
    // 先发送请求
    next(actionWith({type: request}));
  }

  // Fetch 一个请求，并返回结果
  return callApi({url, body, method, options}).then(
    (json) => {
      const {data} = json;
      //调用成功 action，并把结果数据返回
      return next(actionWith({
        data,
        type: success,
        clean
      }));
    },
    (error) => {
      const message = errorHandler(error);
      return next(actionWith({
        type: failure,
        error: message
      }));
    }
  );
};
