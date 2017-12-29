import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {openToast} from '../../../../../common/action/toast';

export class Com2 extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.context.dispatch(openToast('Module-1 Com-2'));
  };

  render() {
    return (
      <div className="container">
        <h3 className="m-y-4">Module-1 Com-2</h3>
        <button className="btn btn-primary btn-raised" onClick={this.toast}>Toast</button>
      </div>
    );
  }
}

export default Com2;
