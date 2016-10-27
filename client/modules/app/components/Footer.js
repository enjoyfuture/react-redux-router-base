import React from 'react';

// Import Style
import styles from '../less/footer.less';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>&copy; 2016 &middot; Linder &middot; Wern team Inc.</p>
      <p><a href="https://www.npmjs.com/package/wern-cli" target="_Blank">@wern-cli</a></p>
    </div>
  );
};

export default Footer;
