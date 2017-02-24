import React from 'react';
import {Route, IndexRoute} from 'react-router';

// 把 store 传入路由中，这样不同的路由可以根据 store 值来处理业务逻辑
/*eslint-disable react/jsx-no-bind,react/react-in-jsx-scope*/
const routes = (store) => {
  return (
    <Route path="/page2" getComponent={(nextState, cb) => {
      require.ensure([], require => {
        cb(null, require('../../common/App').default);
      });
    }}>
      <Route getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Page').default);
        });
      }}>
        <Route path="person" getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./person/components/Person').default);
          });
        }}>
          <IndexRoute getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./person/components/PersonList').default);
            });
          }}/>
          <Route path="create" getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./person/components/PersonForm').default);
            });
          }}/>
        </Route>

        <Route path="film" getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./film/components/Film').default);
          });
        }}/>

      </Route>
    </Route>
  );
};

export default routes;