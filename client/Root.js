import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory } from 'history';
import commonModels from './common/models';
// 加载 scss
import './scss/perfect.scss';

// 以下代码为移动端使用，对于 PC 端项目删除以下代码 --- start
const isMobile = false;
if (isMobile) {
  // 引入 eruda
  import('eruda').then(eruda => eruda.default.init());
}
// --- end

// 中间件
const middleware = [];
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  const { createLogger } = require('redux-logger');
  middleware.push(createLogger());
}

/*
 * 创建 app
 * https://dvajs.com/api
 */
const myApp = dva({
  history: createBrowserHistory(),
  onAction: middleware, // 注册 redux 中间件
  onError(e, dispatch) {
    console.log(e.message);
  },
});

// 使用 dva 中间件
myApp.use(createLoading());

// 在 production 构建时，参数如果是 Container，会构建失败，故这里传入小写 container， 然后在方法体中定义大写的 Container
const Root = ({ models = [], container }) => {
  // 设置 redux 中 的 action 和 reducer ，dva 中是以 models 形式设置的
  [...commonModels, ...models].forEach(model => {
    myApp.model(model.default);
  });

  const Container = container;
  /**
   * dva 源码中会调用 router，传入参数 { app, history: app._history, ...extraProps }
   * function getProvider(store, app, router) {
   * const DvaRoot = extraProps => (
   * <Provider store={store}>
   * { router({ app, history: app._history, ...extraProps }) }
   * </Provider>
   * );
   * return DvaRoot;
   * }
   * 后续根据实际扩展参数 app 和 history 的用法
   */
  myApp.router(({ app, history }) => {
    console.log('params: app--------------', app);
    console.log('params: history--------------', history);

    return <Container />;
  });

  myApp.start('#layout');
};

export default Root;
