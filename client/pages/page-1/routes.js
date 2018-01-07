import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../../common/App';
import Page from './Page';
import Module1Com1 from './module-1/components/com-1';
import Module1Com2 from './module-1/components/com-2';

const routes = (
  <Route path="/" component={App}>
    <Route path="/" component={Page}>
      <Route path="module1" component={Module1Com1}>
        <IndexRoute components={Module1Com2}/>
      </Route>
      <Route path="module2"
             getComponent={(nextState, cb) => {
               //动态加载模块
               import('./module-2/components/com-1').then((_thunk) => cb(null, _thunk.default));
             }}/>
    </Route>
  </Route>
);

export default routes;
