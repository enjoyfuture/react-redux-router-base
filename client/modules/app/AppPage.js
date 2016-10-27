import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import Header from './components/Header'
import Footer from './components/Footer';
import {clearToast} from './action';
import styles from './less/main.less';

const cx = classNames.bind(styles);

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
        className={cx('toast-panel', 'flex', 'flex-items-center', 'flex-items-middle', effect || '')}>
        <div className={cx('toast')}>{content}</div>
      </div>
    );
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className={styles.main}>
        {this.renderToast()}
        <Header />
        <div className={styles.container}>
          {children}
        </div>
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
