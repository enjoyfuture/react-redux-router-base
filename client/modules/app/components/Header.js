import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
import styles from '../less/header.less';
const cx = classNames.bind(styles);

const Header = () => {
  const pathname = location.pathname;
  return (
    <nav className={cx('nav')}>
      <a href="/"
            className={cx('nav-item', pathname === '/' ? 'nav-item-active' : '')}>Wern Home</a>
      <a href="/person/index"
            className={cx('nav-item', pathname === '/demo/person' ? 'nav-item-active' : '')}>Person(Paging)</a>
      <a href="/about" className={cx('nav-item', pathname === '/about' ? 'nav-item-active' : '')}>About</a>
    </nav>
  );
};

export default Header;