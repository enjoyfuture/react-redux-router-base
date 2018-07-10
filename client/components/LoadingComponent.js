/*
 * 异步加载组件，做到 code spliting
 * 参考 https://segmentfault.com/a/1190000011128817
 * https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
 * https://www.npmjs.com/package/react-loadable
 */
import React from 'react';
import PropTypes from 'prop-types';

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div />;
  }

  if (error) {
    console.error(error);
    return <div>加载该组件出错</div>;
  }
  return null;
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default LoadingComponent;
