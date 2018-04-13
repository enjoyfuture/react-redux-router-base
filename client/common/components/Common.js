import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Toast} from 'react-perfect-component';
import {closeToast} from '../action/toast';

/**
 * 对于 toast 的调用，在需要调用的地方直接调用方法 openToast，例如
 * this.props.dispatch(openToast('轻轻的，我来了'));
 */
@connect(state => ({
  toast: state.get('toast'),
  loading: state.get('loading'),
}))
export class Common extends Component {

  static propTypes = {
    toast: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.props.dispatch(closeToast());
  };

  render() {
    const {
      toast, loading,
    } = this.props;

    const content = toast.get('content');
    const open = toast.get('open');

    const _loading = loading.get('loading');
    const isFetching = loading.get('isFetching');

    return (
      <div>
        {_loading && isFetching ? (
          <div className="loading">
            <div className="loading-icon"/>
          </div>
        ) : null}
        <Toast duration={2000} open={open} content={content} handleClose={this.handleClose}/>
      </div>
    );
  }
}

export default Common;
