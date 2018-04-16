import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Module1Com2 from '../com-2';

@connect((state) => {
  return {
    module1: state.get('module1'),
  };
})
export default class Com1 extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    module1: PropTypes.object,
  };

  static childContextTypes = {
    dispatch: PropTypes.func,
  };

  /**
   * 注意：在子组件中使用 context 的值，不要修改，只能使用或调用
   * Updating Context
   * Don't do Updating Context.
   */
  getChildContext() {
    const {dispatch} = this.props;
    return {dispatch};
  }

  render() {
    return (
      <div>
        <h4 className="m-y-4 theme-primary">以下为子组件 Module1Com2</h4>
        <Module1Com2 module1={this.props.module1}/>
      </div>
    );
  }
}

