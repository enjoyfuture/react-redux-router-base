import React from 'react';
import PropTypes from 'prop-types';
import {Link, Router, Route, Switch, Redirect} from 'dva/router';
import Loadable from 'react-loadable';

import {URL_CONTEXT} from '../../../common/constants';
import models from './models';

import Root from '../../Root';
import LoadingComponent from '../../components/LoadingComponent';

const basename = `${URL_CONTEXT}/`;

const Container = ({history, location}) => {
  return (
    <Router history={history}>
      <Switch location={location}>
        <Redirect exact from="/" to="/overview"/>
        <Route
          path={`${basename}`}
          component={Loadable({
            loader: () => import('./components/Persons'),
            loading: LoadingComponent,
          })}
        />
      </Switch>
    </Router>
  );
};

Container.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

Root({models, Container});
