import React from 'react';
import './about.less';

import reactLogo from './images/react-logo.svg';
import reduxLogo from './images/redux-logo.png';
import reactRouterLogo from './images/react-router-logo.png';
import webpackLogo from './images/webpack-logo.png';

const AboutPage = () => {
  const height = 40;
  return (
    <div className="about">
      <h2 className="about-title">React, Redux, Router, Webpack etc.</h2>
      <div className="perfect-icon"/>
      <div className="about-img">
        <img src={reactLogo} alt="React" height={height}/>
        <img src={reduxLogo} alt="Redux" height={height}/>
        <img src={reactRouterLogo} alt="React Router" height={height}/>
        <img src={webpackLogo} alt="Webpack" height={height}/>
      </div>
    </div>
  );
};

export default AboutPage;