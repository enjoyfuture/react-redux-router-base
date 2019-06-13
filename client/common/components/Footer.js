import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-assist">
      <div className="footer">
        <div className="container">
          <p className="copyright">{`Copyright &copy; 2016-${year} Joy Web`}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
