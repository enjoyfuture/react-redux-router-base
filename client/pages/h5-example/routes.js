import React from 'react';
import {Route, IndexRoute} from 'react-router';

// 把 store 传入路由中，这样不同的路由可以根据 store 值来处理业务逻辑
/*eslint-disable react/jsx-no-bind,react/react-in-jsx-scope*/
const routes = (store) => {
  return (
    <Route path="/" getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('./H5ExamplePage').default);
      });
    }}>
      <Route path="/detail"
             getComponent={(nextState, cb) => {
               require.ensure([], require => {
                 cb(null, require('./detail/components/Detail').default);
               });
             }}/>
    </Route>
  );
};

export default routes;
