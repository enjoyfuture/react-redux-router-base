import React from 'react'
import {Route, IndexRoute} from 'react-router';
import App from '../../modules/app/AppPage';

// 把 store 传入路由中，这样不同的路由可以根据 store 值来处理业务逻辑
/*eslint-disable react/jsx-no-bind,react/react-in-jsx-scope*/
const routes = (store) => {
  return (
    <Route path="/" component={App}>
      <Route path="person" getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../../modules/person/PersonPage').default);
        });
      }}>
        <IndexRoute getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../../modules/person/components/PersonList').default);
          });
        }}/>
        <Route path="create" getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('../../modules/person/components/PersonForm').default);
          });
        }}/>
      </Route>
    </Route>
  );
};

export default routes;