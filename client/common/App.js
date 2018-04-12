import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Toast} from 'react-perfect-component';
import Header from './components/Header';
import Footer from './components/Footer';
import {closeToast} from './action/toast';

/**
 * 根组件
 * 对于 toast 的调用，在需要调用的地方直接调用方法 openToast，例如
 * this.props.dispatch(openToast('轻轻的，我来了'));
 */
@connect(state => ({
  toast: state.get('toast'),
  loading: state.get('loading'),
}))
export class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    toast: PropTypes.object,
    loading: PropTypes.object,
    // dispatch: PropTypes.func.isRequired,
  };

  handleClose = () => {
    // this.props.dispatch(closeToast());
  };

  // React 16 新增方法，用来处理错误边界，可以捕获整个子组件树内发生的任何异常
  componentDidCatch(error, errorInfo) {
    // 可以打印异常，或者往后端日志中发送异常，方便定位跟踪
    console.info(error);
    console.error(errorInfo);
  }

  render() {
    const {
      children, toast, loading,
    } = this.props;

    const content = toast.get('content');
    const open = toast.get('open');

    const _loading = loading.get('loading');
    const isFetching = loading.get('isFetching');

    return (
      <div>
        {_loading && isFetching ? (<div>Loading</div>) : null}
        <Toast duration={2000} open={open} content={content}/>
        <Header/>
        {children}
        <Footer/>
      </div>
    );
  }
}

export default App;
