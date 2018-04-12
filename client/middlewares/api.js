/*
 * 中间件，用来统一处理 fetch 请求
 */
import callApi from '../utils/fetch';
import errorHandler from '../utils/error-handler';

export const CALL_API = Symbol('Call API');

// 一个 redux 中间件，用来统一处理 fetch 的 request success failure，即发送前，发送成功和失败的 dispatch
// 统一处理的好处是：不用重复写太多的 action 方法，返回的错误信息统一处理
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  /**
   * url 为请求地址
   * types 为定义的 request success failure 三种状态
   * options 为 fetch options 选项
   * body 为请求参数
   * clean 为 true 时，表示先清空数据，比如列表刷新时
   * loading 为 true 时，自动在全局加载 loading 效果
   */
  const {url, types, options, body, clean, loading} = callAPI;

  // 分别执行发送请求，成功和失败请求
  function actionWith(data) {
    // 注意这里，返回最终的 action 供 reducer 中使用，即 reducer 中拿到的 action 是从这里取到的
    const finalAction = {...action, ...data};
    delete finalAction[CALL_API];
    return finalAction;
  }

  const {request, success} = types;
  if (!success) {
    throw new Error('请至少传入 success 参数');
  }

  if (request) {
    // 发送请求
    next(actionWith({type: request, loading}));
  }

  // Fetch 一个请求，并返回结果
  return callApi({url, body, options}).then(
    (json) => {
      const {data} = json;
      // 调用成功 action，并把结果数据返回
      return next(actionWith({
        data,
        type: success,
        clean,
        loading
      }));
    },
    (error) => {
      const message = errorHandler(error);
      return next(actionWith({
        type: 'failure-toast',
        error: message,
        loading
      }));
    }
  );
};
