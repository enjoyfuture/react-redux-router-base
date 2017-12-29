import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hello, clearHello} from './action';
import classNames from 'classnames';
import {openToast} from '../../common/action/toast';
import style from './home.scss';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func,
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
    this.props.dispatch(openToast('你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！'));
  };

  render() {
    const {home} = this.props;
    return (
      <div className={classNames(style.home, 'text-center')}>
        <h1 className="m-t-6">
          React Redux Router Immutable Webpack Less etc.
        </h1>
        <hr className="m-y-4"/>
        <div>
          <h3 className="m-y-4">{home.get('content')}</h3>
          <div className="btn-group">
            <button className="btn btn-raised btn-primary"
                    onClick={this.helloHandle()}>欢迎您来到这里
            </button>
            <button className="btn btn-raised btn-secondary"
                    onClick={this.helloHandle(true)}>悄悄的离开
            </button>
            <button className="btn btn-raised btn-info"
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
    home: state.get('home'),
  };
}


export default connect(mapStateToProps)(Home);
