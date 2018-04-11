import React from 'react';
import classNames from 'classnames';
import {urlContext} from '../../utils/config';

const Header = () => {
  const {pathname} = document.location;

  return (
    <header className="navbar navbar-expand navbar-primary navbar-top flex-column flex-sm-row">
      <a className="navbar-brand" href="#">React+Redux+Router</a>
      <div className="navbar-scroll">
        <ul className="navbar-nav">
          <li>
            <a href={`${urlContext}/home`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${urlContext}/home`) !== -1 ? 'active' : '')}>
              Home
            </a>
          </li>
          <li>
            <a href={`${urlContext}/page1/module1`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${urlContext}/page1`) !== -1 ? 'active' : '')}>
              Page1
            </a>
          </li>
          <li>
            <a href={`${urlContext}/page2/person`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${urlContext}/page2`) !== -1 ? 'active' : '')}>
              Page2
            </a>
          </li>
          <li>
            <a href={`${urlContext}/about`}
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${urlContext}/about`) !== -1 ? 'active' : '')}>
              About
            </a>
          </li>
          <li>
            <a href={`${urlContext}/h5-example/detail/123456`} target="_blank"
               className={classNames('ripple ripple-primary nav-link', pathname.indexOf(`${urlContext}/h5-example`) !== -1 ? 'active' : '')}>
              H5 Example
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
