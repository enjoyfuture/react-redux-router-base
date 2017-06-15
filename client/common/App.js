import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Header from './components/Header'
import Footer from './components/Footer';
import {clearToast} from './action/toast';

import mainCss from '../utils/main-css';

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

  // toast 组件
  renderToast() {
    const {
      toast
    } = this.props;
    const content = toast.get('content');
    const effect = toast.get('effect');

    return (
      <div
        className={mainCss('toast-panel', effect || '')}>
        <div className={mainCss('toast')}>{content}</div>
      </div>
    );
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className={mainCss('main')}>
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
