import React from 'react';
import classNames from 'classnames';
import {URL_CONTEXT} from '../../../common/constants';

const Header = () => {
  const {pathname} = document.location;

  return (
    <header className="navbar navbar-expand navbar-primary navbar-top flex-column flex-sm-row">
      <a className="navbar-brand" href={`${URL_CONTEXT}/home`}>React+Redux+Router</a>
      <div className="navbar-scroll">
        <ul className="navbar-nav">
          <li>
            <a href={`${URL_CONTEXT}/home`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${URL_CONTEXT}/home`) !== -1 ? 'active' : '')}>
              Home
            </a>
          </li>
          <li>
            <a href={`${URL_CONTEXT}/page1/module1`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${URL_CONTEXT}/page1`) !== -1 ? 'active' : '')}>
              Page1
            </a>
          </li>
          <li>
            <a href={`${URL_CONTEXT}/page2/person`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${URL_CONTEXT}/page2`) !== -1 ? 'active' : '')}>
              Page2
            </a>
          </li>
          <li>
            <a href={`${URL_CONTEXT}/about`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${URL_CONTEXT}/about`) !== -1 ? 'active' : '')}>
              About
            </a>
          </li>
          <li>
            <a href={`${URL_CONTEXT}/h5-example/detail/123456`} target="_blank"
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${URL_CONTEXT}/h5-example`) !== -1 ? 'active' : '')}>
              H5 Example
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
