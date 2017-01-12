import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    person: PropTypes.object
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
      children, person
    } = this.props;

    return (
      <div className="container mt-2">
        {children && React.cloneElement(children, {
          person
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const person = state.get('person');
  return {
    person
  };
}

export default connect(mapStateToProps)(Page);


