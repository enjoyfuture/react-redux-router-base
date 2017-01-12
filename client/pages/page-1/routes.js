import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../../common/App';
import Page from './Page';
import Com1 from './module-1/components/com-1';
import Com2 from './module-1/components/com-2';

const routes = (
  <Route path="/" component={App}>
    <Route path="/" component={Page}>
      <Route path="com-1" component={Com1}/>
      <Route path="com-2" component={Com2}/>
    </Route>
  </Route>
);

export default routes;