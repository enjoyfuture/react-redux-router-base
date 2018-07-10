import React from 'react';
import { Route, NavLink } from 'dva/router';
import LoadingComponent from '../../components/LoadingComponent';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

const Container = ({ match, location }) => {
  let { url } = match;
  // 去掉结尾 /
  url = /\/$/.test(url) ? url.substring(0, url.length - 1) : url;

  return (
    <div className="container m-t-3">
      <nav className="tab-bar tab-bar-primary">
        <NavLink className="tab" activeClassName="active" to={`${url}/person`}>
          Person
        </NavLink>
        <NavLink className="tab" activeClassName="active" to={`${url}/film`}>
          Film
        </NavLink>
      </nav>
      <div className="m-t-2">
        <Route
          path={`${url}/person`}
          component={Loadable({
            loader: () => import('./components/person/Person'),
            loading: LoadingComponent,
          })}
        />

        <Route
          path={`${url}/film`}
          component={Loadable({
            loader: () => import('./components/film/Film'),
            loading: LoadingComponent,
          })}
        />
      </div>
    </div>
  );
};

Container.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default Container;
