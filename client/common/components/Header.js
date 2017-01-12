import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Header = () => {
  const {pathname} = document.location;
  const context = '/context';//路径上下文，根据实际业务定义
  return (
    <nav className="nav">
      <a href={`${context}/home`}
         className={classNames('nav-item', pathname.indexOf(`${context}/home`) !== -1 ? 'nav-item-active' : '')}>
        Home
      </a>
      <a href={`${context}/page1`}
         className={classNames('nav-item', pathname.indexOf(`${context}/page1`) !== -1 ? 'nav-item-active' : '')}>
        Page1
      </a>
      <a href={`${context}/page2/person`}
         className={classNames('nav-item', pathname.indexOf(`${context}/page2`) !== -1 ? 'nav-item-active' : '')}>
        Page2
      </a>
      <a href={`${context}/about`}
         className={classNames('nav-item', pathname.indexOf(`${context}/about`) !== -1 ? 'nav-item-active' : '')}>
        About
      </a>
    </nav>
  );
};

export default Header;