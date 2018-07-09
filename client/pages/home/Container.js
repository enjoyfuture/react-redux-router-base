import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva/index';
import classNames from 'classnames';
import {Route, NavLink, Switch} from 'dva/router';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';
import pureRender from '../../components/react-immutable-pure-decorator';

import style from './index.module.scss';

// 采用装饰器处理
@connect(({home}) => ({
  hello: home.get('hello'),
}))
@pureRender
export default class Container extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    hello: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  helloHandle = clear => e => {
    e.stopPropagation();
    const {dispatch} = this.props;
    if (clear) {
      dispatch({
        type: 'home/clearHello',
      });
    } else {
      dispatch({
        type: 'home/hello',
        payload: {content: '开启 React Redux Router Immutable 之旅吧！'},
      });
    }
  };

  toastHandle = e => {
    e.stopPropagation();
    this.props.dispatch({
      type: 'toast/show',
      payload: {
        content:
          '你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！',
      },
    });
  };

  handleToRoute = route => () => {
    this.props.history.push(route);
    /*
     * 或者这样
     * this.context.router.history.push(route);
     */
  };

  render() {
    const {
      hello,
      match: {url},
      location,
    } = this.props;
    const {pathname, key} = location;

    // 去掉结尾 /
    const _url = /\/$/.test(url) ? url.substring(0, url.length - 1) : url;

    return (
      <div className={classNames(style.home, 'text-center')}>
        <h1 className="m-t-6">React Redux Router Immutable Sass etc.</h1>
        <hr className="m-y-4" />
        <div>
          <h3 className="m-y-4">{hello.get('content')}</h3>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-raised btn-primary"
              onClick={this.helloHandle()}
            >
              欢迎您来到这里
            </button>
            <button
              type="button"
              className="btn btn-raised btn-secondary"
              onClick={this.helloHandle(true)}
            >
              悄悄的离开
            </button>
            <button
              type="button"
              className="btn btn-raised btn-info"
              onClick={this.toastHandle}
            >
              Toast
            </button>
          </div>
        </div>

        <div className="container">
          <hr />
          <div className="row">
            <div className="offset-4 col-8">
              <p> 通过 NavLink 组件来处理路由跳转</p>
              <p>
                参数 replace 为 true 时表示替换，{' '}
                <a
                  href="https://reacttraining.com/react-router/web/api/NavLink"
                  target="_blank"
                >
                  官方 Api{' '}
                </a>
              </p>
              <div className="btn-group m-3">
                <NavLink
                  className="btn btn-raised"
                  activeClassName="btn-primary"
                  to={`${_url}/route1`}
                >
                  子路由1
                </NavLink>
                <NavLink
                  className="btn btn-raised"
                  activeClassName="btn-primary"
                  to={`${_url}/route2`}
                >
                  子路由2
                </NavLink>
              </div>
            </div>
            <div className="col-8">
              <p>通过点击调用 this.props.history.push 或</p>
              <p>this.context.router.history.push 来处理路由跳转</p>
              <div className="btn-group m-3">
                <button
                  type="button"
                  className={classNames('btn btn-raised', {
                    'btn-primary': pathname === `${_url}/route1`,
                  })}
                  onClick={this.handleToRoute(`${_url}/route1`)}
                >
                  子路由1
                </button>
                <button
                  type="button"
                  className={classNames('btn btn-raised', {
                    'btn-primary': pathname === `${_url}/route2`,
                  })}
                  onClick={this.handleToRoute(`${_url}/route2`)}
                >
                  子路由2
                </button>
              </div>
            </div>
          </div>

          <div className="position-relative d-flex flex-column justify-content-center m-t-6">
            <p>此处动画效果待优化</p>
            <TransitionGroup>
              <CSSTransition
                key={key}
                classNames="animate-right"
                timeout={{exit: 0, enter: 300}}
              >
                <Switch location={location}>
                  {/* 这里使用异步加载 */}
                  <Route
                    exact
                    path={`${_url}/route1`}
                    component={Loadable({
                      loader: () => import('./components/HomeRoute1'),
                      loading: LoadingComponent,
                    })}
                  />
                  <Route
                    exact
                    path={`${_url}/route2`}
                    component={Loadable({
                      loader: () => import('./components/HomeRoute2'),
                      loading: LoadingComponent,
                    })}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}
