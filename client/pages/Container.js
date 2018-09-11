import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva/index';
import { Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import LoadingComponent from '../components/LoadingComponent';
import pureRender from '../components/react-immutable-pure-decorator';

// 采用装饰器处理
@pureRender
@connect()
class Container extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const {
      match: { url },
      location,
    } = this.props;

    // 这里可以根据项目实际需要添加其他元素，比如左侧菜单等
    return (
      <div>
        <Switch location={location}>
          <Route
            path={`${url}home/`}
            component={Loadable({
              loader: () => import('./home/Container'),
              loading: LoadingComponent,
            })}
          />
          <Route
            path={`${url}about/`}
            component={Loadable({
              loader: () => import('./about/Container'),
              loading: LoadingComponent,
            })}
          />
          <Route
            path={`${url}example/`}
            component={Loadable({
              loader: () => import('./example/Container'),
              loading: LoadingComponent,
            })}
          />
          <Route
            path={`${url}todos/`}
            component={Loadable({
              loader: () => import('./todos/Container'),
              loading: LoadingComponent,
            })}
          />
        </Switch>
      </div>
    );
  }
}

export default Container;
