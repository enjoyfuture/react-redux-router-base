import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'dva/router';
import Loadable from 'react-loadable';
import App from '../common/App';
import { URL_CONTEXT } from '../../common/constants';
import models from './models';

import Root from '../Root';
import LoadingComponent from '../components/LoadingComponent';

// 如果整个项目就一个页面，则以 / 开头即可，如果分为好几个页面，则可以加前缀来区分
const basename = `${URL_CONTEXT}/`;

const container = () => (
  /*
   * 使用 BrowserRouter 后，不用再单独设置 history
   * 在 BrowserRouter 上设置 basename 后，子路由会基于 basename 匹配
   * 也可以不设置，把 basename 直接设置到 Route path 上，然后子路由通过取 match.url 来匹配
   * 建议直接设置在 Route path 上
   */
  <BrowserRouter>
    <App>
      <Switch>
        <Redirect exact from={basename} to={`${basename}home/`} />
        <Route
          path={`${basename}`}
          component={Loadable({
            loader: () => import('./Container'),
            loading: LoadingComponent,
          })}
        />
      </Switch>
    </App>
  </BrowserRouter>
);

Root({ models, container });
