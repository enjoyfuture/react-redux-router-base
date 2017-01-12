import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    caches: PropTypes.object,
  };
  static childContextTypes = {
    dispatch: PropTypes.func
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
      children, location, caches
    } = this.props;

    const props = {
      location, caches
    };

    return (
      <section className="abs-container">
        {
          children && React.cloneElement(children, props)
        }
      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    caches: state.get('caches'),
  };
}

export default connect(mapStateToProps)(Page);
