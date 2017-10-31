import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {hello, clearHello} from './action';
import {setToast} from '../../common/action/toast';
import style from './home.scss';
const cx = classNames.bind(style);

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func
  };

  helloHandle = (clear) => {
    return (e) => {
      e.stopPropagation();
      const {dispatch} = this.props;
      if (clear) {
        dispatch(clearHello());
      } else {
        dispatch(hello('开启 React Router Redux Immutable 之旅吧！'));
      }
    };
  };

  toastHandle = (e) => {
    e.stopPropagation();
    this.props.dispatch(setToast({
      content: '你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！'
    }));
  };

  render() {
    const {home} = this.props;
    return (
      <div className={style.home}>
        <h1 className="mt-3">
          React Redux Router Immutable Webpack Less etc.
        </h1>
        <hr className="mt-2 mb-2"/>
        <div>
          <h3 className="mb-1">{home.get('content')}</h3>
          <div className={style['btn-group']}>
            <button className={cx('btn', 'btn-info')}
                    onClick={this.helloHandle()}>欢迎您来到这里
            </button>
            <button className={cx('btn', 'btn-info')}
                    onClick={this.helloHandle(true)}>悄悄的离开
            </button>
            <button className={cx('btn', 'btn-primary')}
                    onClick={this.toastHandle}>Toast
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    home: state.get('home')
  };
}


export default connect(mapStateToProps)(Home);
