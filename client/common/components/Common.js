import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'react-perfect-component';

/**
 * 对于 toast 的调用，在需要调用的地方直接调用toast/show，例如
 * this.props.dispatch({
 * type: 'toast/show',
 * payload: {content: '轻轻的，我来了'}
 * });
 */
@connect(({ toast }) => ({
  toast,
}))
export class Common extends Component {
  static propTypes = {
    toast: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.props.dispatch({
      type: 'toast/hide',
    });
  };

  render() {
    const { toast } = this.props;

    const content = toast.get('content');
    const show = toast.get('show');

    return (
      <div>
        <Toast
          duration={2000}
          show={show}
          content={content}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Common;
