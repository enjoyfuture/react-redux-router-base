import React from 'react';
import classNames from 'classnames/bind';
import styles from './about.less';
const cx = classNames.bind(styles);

import reactLogo from './images/react-logo.svg';
import reduxLogo from './images/redux-logo.png';
import reactRouterLogo from './images/react-router-logo.png';
import webpackLogo from './images/webpack-logo.png';
import gulpLogo from './images/gulp-logo.svg';

const About = () => {
  const height = 40;
  return (
    <div className={cx('about')}>
      <h2 className={cx('title')}>React, Redux, Router, Webpack, Gulp etc.</h2>
      <div className={cx('perfect-icon')}/>
      <div className={cx('about-img')}>
        <img src={reactLogo} alt="React" height={height}/>
        <img src={reduxLogo} alt="Redux" height={height}/>
        <img src={reactRouterLogo} alt="React Router" height={height}/>
        <img src={webpackLogo} alt="Webpack" height={height}/>
        <img src={gulpLogo} alt="Gulp" height={height}/>
      </div>
    </div>
  );
};

export default About;