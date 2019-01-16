import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'dva/router';
import { URL_CONTEXT } from '../../../common/constants';

const Header = () => {
  const { pathname } = document.location;

  return (
    <header className="navbar navbar-expand navbar-primary navbar-top flex-column flex-sm-row">
      <NavLink className="navbar-brand" to={`${URL_CONTEXT}/home`}>
        React+Redux+Router
      </NavLink>
      <div className="navbar-scroll">
        <ul className="navbar-nav">
          <li>
            <NavLink
              className="ripple ripple-primary nav-link"
              activeClassName="active"
              to={`${URL_CONTEXT}/home`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="ripple ripple-primary nav-link"
              activeClassName="active"
              to={`${URL_CONTEXT}/example`}
            >
              Example
            </NavLink>
          </li>
          <li>
            <NavLink
              className="ripple ripple-primary nav-link"
              activeClassName="active"
              to={`${URL_CONTEXT}/todos`}
            >
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${URL_CONTEXT}/about`}
              className={classNames(
                'ripple ripple-primary nav-link',
                pathname.indexOf(`${URL_CONTEXT}/about`) !== -1 ? 'active' : ''
              )}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
