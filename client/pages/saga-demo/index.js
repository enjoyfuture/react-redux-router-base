import React from 'react';
import { BrowserRouter, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import App from '../../common/App';
import { URL_CONTEXT } from '../../../common/constants';
import models from './models';

import Root from '../../Root';
import LoadingComponent from '../../components/LoadingComponent';

const basename = `${URL_CONTEXT}/saga-demo`;

const Container = () => (
  // 使用 BrowserRouter 后，不用再单独设置 history
  <BrowserRouter>
    <App>
      <Switch>
        <Route
          path={basename}
          component={Loadable({
            loader: () => import('./components/Persons'),
            loading: LoadingComponent,
          })}
        />
      </Switch>
    </App>
  </BrowserRouter>
);
Root({ models, Container });
