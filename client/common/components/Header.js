import React from 'react';
import {context} from '../../utils/config';
import mainCss from '../../utils/main-css';

const Header = () => {
  const {pathname} = document.location;
  return (
    <nav className="header-nav">
      <a href={`${context}/home`}
         className={mainCss('header-nav-item', pathname.indexOf(`${context}/home`) !== -1 ? 'active' : '')}>
        Home
      </a>
      <a href={`${context}/page1/module1`}
         className={mainCss('header-nav-item', pathname.indexOf(`${context}/page1`) !== -1 ? 'active' : '')}>
        Page1
      </a>
      <a href={`${context}/page2/person`}
         className={mainCss('header-nav-item', pathname.indexOf(`${context}/page2`) !== -1 ? 'active' : '')}>
        Page2
      </a>
      <a href={`${context}/about`}
         className={mainCss('header-nav-item', pathname.indexOf(`${context}/about`) !== -1 ? 'active' : '')}>
        About
      </a>
    </nav>
  );
};

export default Header;
