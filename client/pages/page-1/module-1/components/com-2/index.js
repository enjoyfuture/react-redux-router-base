import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {setToast} from '../../../../../common/action/toast';
import style from './style.scss';
const cx = classNames.bind(style);

export class Com2 extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.context.dispatch(setToast({content: 'Module-1 Com-2'}));
  };

  render() {
    return (
      <div className="container">
        <h3 className="mb-1">Module-1 Com-2</h3>
        <button className={cx('btn', 'btn-primary')} onClick={this.toast}>Toast</button>
      </div>
    );
  }
}

export default Com2;
