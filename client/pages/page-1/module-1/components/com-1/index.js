import React, {Component, PropTypes} from 'react';
import {setToast} from '../../../../../common/action/toast';

export class Com1 extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  toast = () => {
    this.context.dispatch(setToast({content: 'Toast'}));
  };

  render() {
    return (
      <div className="content">
        <button onClick={this.toast}>Toast</button>
        Com1
      </div>
    );
  }
}

export default Com1;
