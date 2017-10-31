import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {setToast} from '../../../../../common/action/toast';
import style from './style.scss';
const cx = classNames.bind(style);

export class Com1 extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.context.dispatch(setToast({content: 'Module-2 Com-1'}));
  };

  render() {
    return (
      <div className="container">
        <h3 className="mb-1">Module-2 Com-1</h3>
        <button className={cx('btn', 'btn-primary')} onClick={this.toast}>Toast</button>
      </div>
    );
  }
}

export default Com1;
