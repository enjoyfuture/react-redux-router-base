import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from './components/Header'
import Footer from './components/Footer';
import {clearToast} from './action/toast';

export class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    toast: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const {
      toast, dispatch
    } = this.props;

    if (toast && toast.get('effect') === 'enter') {
      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId);
      }
      this.toastTimeoutId = setTimeout(() => {
        dispatch(clearToast());
        this.toastTimeoutId = null;
      }, toast.get('time'));
    }
  }

  // React 16 新增方法，用来处理错误边界，可以捕获整个子组件树内发生的任何异常
  componentDidCatch(error, errorInfo) {
    // 可以打印异常，或者往后端日志中发送异常，方便定位跟踪
    console.info(error);
    console.error(errorInfo);
  }

  // toast 组件
  renderToast() {
    const {
      toast
    } = this.props;
    const content = toast.get('content');
    const effect = toast.get('effect');

    return (
      <div
        className={`toast-panel ${effect || ''}`}>
        <div className="toast">{content}</div>
      </div>
    );
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className="main">
        {this.renderToast()}
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toast: state.get('toast')
  };
}

export default connect(mapStateToProps)(App);
