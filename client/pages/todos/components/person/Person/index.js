import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from '../../../../../components/LoadingComponent';

const Person = ({ match }) => {
  let { url } = match;
  // 去掉结尾 /
  url = /\/$/.test(url) ? url.substring(0, url.length - 1) : url;

  return (
    <div className="p-x-4">
      <p className="m-b-4">在组建中定制 loading 效果</p>
      <Switch>
        <Route
          exact
          path={`${url}`}
          component={Loadable({
            loader: () => import('../PersonList'),
            loading: LoadingComponent,
          })}
        />
        <Route
          exact
          path={`${url}/create`}
          component={Loadable({
            loader: () => import('../PersonForm'),
            loading: LoadingComponent,
          })}
        />
      </Switch>
    </div>
  );
};

Person.propTypes = {
  match: PropTypes.object,
};

export default Person;
