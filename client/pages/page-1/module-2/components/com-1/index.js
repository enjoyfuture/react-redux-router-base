import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {setToast} from '../../../../../common/action/toast';
import './style.scss';

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
        <button className="btn btn-primary" onClick={this.toast}>Toast</button>
      </div>
    );
  }
}

export default Com1;
