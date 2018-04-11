import React from 'react';
import PropTypes from 'prop-types';

const H5ExamplePage = ({children}) => {
  return (
    <div>
      {/*<div>公共部分</div>*/}
      {children}
    </div>
  );
};

H5ExamplePage.propTypes = {
  children: PropTypes.node,
};

export default H5ExamplePage;

