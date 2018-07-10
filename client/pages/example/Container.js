import React from 'react';
import { Route, NavLink } from 'dva/router';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';
import PropTypes from 'prop-types';

const Container = ({ match, location }) => {
  let { url } = match;
  // 去掉结尾 /
  url = /\/$/.test(url) ? url.substring(0, url.length - 1) : url;

  return (
    <div className="container m-t-1">
      <nav className="tab-bar tab-bar-primary">
        <NavLink className="tab" activeClassName="active" to={`${url}/module1`}>
          Module1
        </NavLink>
        <NavLink className="tab" activeClassName="active" to={`${url}/module2`}>
          Module2
        </NavLink>
        <NavLink
          className="tab"
          activeClassName="active"
          to={`${url}/file-download-upload`}
        >
          File Download Upload
        </NavLink>
        <NavLink
          className="tab"
          activeClassName="active"
          to={`${url}/iconfont`}
        >
          Icon Font
        </NavLink>
      </nav>

      <Route
        path={`${url}/module1`}
        component={Loadable({
          loader: () => import('./module-1/components/com-1'),
          loading: LoadingComponent,
        })}
      />
      <Route
        path={`${url}/module2`}
        component={Loadable({
          loader: () => import('./module-2/components/com-1'),
          loading: LoadingComponent,
        })}
      />
      <Route
        path={`${url}/file-download-upload`}
        component={Loadable({
          loader: () => import('./file-download-upload/components/FileUpload'),
          loading: LoadingComponent,
        })}
      />
      <Route
        path={`${url}/iconfont`}
        component={Loadable({
          loader: () => import('./iconfont/IconFont'),
          loading: LoadingComponent,
        })}
      />
    </div>
  );
};

Container.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default Container;
