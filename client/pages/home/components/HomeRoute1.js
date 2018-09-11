import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva/index';

@connect(({ home }) => ({
  homeRoute: home.get('homeRoute'),
}))
class HomeRoute1 extends Component {
  static propTypes = {
    homeRoute: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/setHomeRoute',
      payload: { content: '首页路由1' },
    });
  }

  render() {
    const { homeRoute } = this.props;
    const {
      location: { pathname },
    } = this.props;

    return (
      <h5 className="theme-secondary">
        {homeRoute.get('content')}
        ，路由 pathname： {pathname}
      </h5>
    );
  }
}

export default HomeRoute1;
