import React from 'react';
import { BrowserRouter, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import App from '../../common/App';
import { URL_CONTEXT } from '../../../common/constants';
import models from './models';

import Root from '../../Root';
import LoadingComponent from '../../components/LoadingComponent';

const basename = `${URL_CONTEXT}/page1`;

const Container = () => (
  /*
   * 使用 BrowserRouter 后，不用再单独设置 history
   * 设置 basename 后，子路由会基于 basename 匹配
   * 也可以 把 basename 设置到 Route path 上，然后子路由通过取 match.url 来匹配，见 home 中的例子
   * 建议直接设置 basename 即可
   */
  <BrowserRouter basename={basename}>
    <App>
      <Switch>
        <Route
          component={Loadable({
            loader: () => import('./Page'),
            loading: LoadingComponent,
          })}
        />
      </Switch>
    </App>
  </BrowserRouter>
);
Root({ models, Container });
