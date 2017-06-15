import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import mainCss from '../../utils/main-css';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    caches: PropTypes.object,
    module1: PropTypes.object,
    module2: PropTypes.object,
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
      children, location, caches, module1, module2
    } = this.props;

    const {pathname} = location;
    const props = pathname.indexOf('/module1') !== -1
      ? {location, caches, module1}
      : {location, caches, module2};

    return (
      <div className={mainCss('container', 'mt-1')}>
        <ul className={mainCss('nav', 'nav-tabs', 'mb-2')}>
          <li className={mainCss('nav-item')}>
            <Link className={mainCss('nav-link')} activeClassName={mainCss('active')} to="/module1">Module1</Link>
          </li>
          <li className={mainCss('nav-item')}>
            <Link className={mainCss('nav-link')} activeClassName={mainCss('active')} to="/module2">Module2</Link>
          </li>
        </ul>

        {children && React.cloneElement(children, props)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    caches: state.get('caches'),
    module1: state.get('module1'),
    module2: state.get('module2'),
  };
}

export default connect(mapStateToProps)(Page);
