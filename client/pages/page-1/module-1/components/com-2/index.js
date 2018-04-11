import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {openToast} from '../../../../../common/action/toast';
import {helloModule1} from '../../action';

export class Com2 extends Component {
  static propTypes = {
    module1: PropTypes.object,
  };

  static contextTypes = {
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.context.dispatch(openToast('Module-1 Com-2'));
  };

  handleHello = () => {
    this.context.dispatch(helloModule1('您好，欢迎您来到这里'));
  };

  render() {
    return (
      <div className="container">
        <h3 className="m-y-4">Module-1 Com-2</h3>
        <button className="btn btn-primary btn-raised" onClick={this.toast}>Toast</button>

        <div className="m-t-4">
          <button className="btn btn-secondary btn-raised" onClick={this.handleHello}>Hello World</button>
          <p className="theme-secondary m-t-2">{this.props.module1.get('content')}</p>
        </div>
      </div>
    );
  }
}

export default Com2;
