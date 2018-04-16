import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {homeRoute} from '../action';

@connect(state => ({
  home: state.get('home'),
}))
export default class HomeRoute2 extends Component {
  static propTypes = {
    home: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(homeRoute('首页路由2'));
  }

  render() {
    const {home} = this.props;
    const {
      location: {
        pathname,
      },
    } = this.props;

    return (
      <h5 className="theme-secondary">{home.getIn(['homeRoute', 'content'])}，路由 pathname： {pathname}</h5>
    );
  }
}
