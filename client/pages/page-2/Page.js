import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

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
      children, caches, person, film, location
    } = this.props;

    const {pathname} = location;
    const type = pathname.indexOf('/person') !== -1 ? 'person' : 'film';
    const props = type === 'person'
      ? {person}
      : {caches, film};

    return (
      <div className="container mt-1">
        <ul className="nav nav-tabs mb-2">
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/person">Person</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/film">Film</Link>
          </li>
        </ul>

        {children && React.cloneElement(children, props)}
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
    caches
  };
}

export default connect(mapStateToProps)(Page);


