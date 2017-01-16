import React, {Component, PropTypes} from 'react';
import {setToast} from '../../../../../common/action/toast';
import './style.less';

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
        <button className="btn btn-primary" onClick={this.toast}>Toast</button>
      </div>
    );
  }
}

export default Com2;
