import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'dva/index';

import style from './style.module.scss';
const cx = classNames.bind(style);

@connect(({ module2 }) => ({
  module2,
}))
class Com1 extends Component {
  static propTypes = {
    module2: PropTypes.object,
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.props.dispatch({
      type: 'toast/show',
      payload: { content: 'Module-2 Com-1' },
    });
  };

  handleHello = () => {
    this.props.dispatch({
      type: 'module2/helloModule2',
      payload: { content: '您好，欢迎您来到这里' },
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="m-y-4">Module-2 Com-1</h3>
        <button
          type="button"
          className="btn btn-raised btn-success"
          onClick={this.toast}
        >
          Toast
        </button>

        <div className="m-t-4">
          <button
            type="button"
            className="btn btn-secondary btn-raised"
            onClick={this.handleHello}
          >
            Hello World
          </button>
          <p className="theme-secondary m-t-2">
            {this.props.module2.get('content')}
          </p>
        </div>
      </div>
    );
  }
}

export default Com1;
