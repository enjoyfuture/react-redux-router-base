import React from 'react';
import mainCss from '../../utils/main-css';

const Footer = () => {
  return (
    <footer className={mainCss('footer-assist')}>
      <div className={mainCss('footer')}>
        <div className={mainCss('container')}>
          <p className={mainCss('copyright')}>Copyright &copy; 2016-2017 京东金融科技业务部前端</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
