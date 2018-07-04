import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = ({ isLoading }) => (
  <div className={classNames('loading', { 'd-none': !isLoading })}>
    <div className="loading-icon" />
  </div>
);

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loading;
