import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Loadable from 'react-loadable';
import LoadingComponent from '../../../../../components/LoadingComponent';

@connect()
export default class Person extends Component {
  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
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
    const {match} = this.props;

    return (
      <div className="p-x-4">
        <Switch>
          <Route exact path={`${match.url}`} component={Loadable({
            loader: () => import('../PersonList'),
            loading: LoadingComponent,
          })}/>
          <Route path={`${match.url}/create`} component={Loadable({
            loader: () => import('../PersonForm'),
            loading: LoadingComponent,
          })}/>
        </Switch>
      </div>
    );
  }
}
