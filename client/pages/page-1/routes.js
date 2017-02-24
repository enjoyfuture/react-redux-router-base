import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../../common/App';
import Page from './Page';
import Module1Com1 from './module-1/components/com-1';
import Module1Com2 from './module-1/components/com-2';
import Module2Com1 from './module-2/components/com-1';

const routes = (
  <Route path="/" component={App}>
    <Route path="page1" component={Page}>
      <Route path="module1" component={Module1Com1}>
        <IndexRoute components={Module1Com2}/>
      </Route>
      <Route path="module2" component={Module2Com1} />
    </Route>
  </Route>
);

export default routes;