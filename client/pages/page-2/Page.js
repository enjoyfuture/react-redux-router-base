import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func,
    caches: PropTypes.object,
    person: PropTypes.object,
    film: PropTypes.object,
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
      children, caches, person, film, location,
    } = this.props;

    const {pathname} = location;
    const type = pathname.indexOf('/person') !== -1 ? 'person' : 'film';
    const props = type === 'person'
      ? {person}
      : {caches, film};

    return (
      <div className="container m-t-3">
        <nav className="tab-bar tab-bar-primary">
          <NavLink className="tab" activeClassName="active" to="/person">Person</NavLink>
          <NavLink className="tab" activeClassName="active" to="/film">Film</NavLink>
        </nav>
        <div className="m-t-4">
          {children && React.cloneElement(children, props)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const person = state.get('person');
  const film = state.get('film');
  const caches = state.get('caches');
  return {
    person,
    film,
    caches,
  };
}

export default withRouter(connect(mapStateToProps)(Page));


