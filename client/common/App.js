import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import className from 'classnames';
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

  // toast 组件
  renderToast() {
    const {
      toast
    } = this.props;
    const content = toast.get('content');
    const effect = toast.get('effect');

    return (
      <div
        className={className('toast-panel', effect || '')}>
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
