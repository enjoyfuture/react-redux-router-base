import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class DemoPage extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    caches: PropTypes.object,
    detail: PropTypes.object,
    location: PropTypes.object,
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
    const {
      children, caches, detail, location,
    } = this.props;

    return (
      <div>
        {children && React.cloneElement(children, {
          caches, detail, location
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const detail = state.get('detail');
  const caches = state.get('caches');
  return {
    detail,
    caches,
  };
}

export default connect(mapStateToProps)(DemoPage);

