import React from 'react';
import classNames from 'classnames';
import {urlContext} from '../../utils/config';

const Header = () => {
  const {pathname} = document.location;
  return (
    <nav className="header-nav">
      <a href={`${urlContext}/home`}
         className={classNames('header-nav-item', pathname.indexOf(`${urlContext}/home`) !== -1 ? 'active' : '')}>
        Home
      </a>
      <a href={`${urlContext}/page1/module1`}
         className={classNames('header-nav-item', pathname.indexOf(`${urlContext}/page1`) !== -1 ? 'active' : '')}>
        Page1
      </a>
      <a href={`${urlContext}/page2/person`}
         className={classNames('header-nav-item', pathname.indexOf(`${urlContext}/page2`) !== -1 ? 'active' : '')}>
        Page2
      </a>
      <a href={`${urlContext}/about`}
         className={classNames('header-nav-item', pathname.indexOf(`${urlContext}/about`) !== -1 ? 'active' : '')}>
        About
      </a>
    </nav>
  );
};

export default Header;
