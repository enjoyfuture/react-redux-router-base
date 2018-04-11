import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, NavLink, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent';
import {hello, clearHello} from './action';
import classNames from 'classnames';
import {openToast} from '../../common/action/toast';
import style from './home.scss';

// 采用装饰器处理
@connect(state => ({
  home: state.get('home'),
}))
export default class Home extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    home: PropTypes.object,
    dispatch: PropTypes.func,
  };

  helloHandle = (clear) => {
    return (e) => {
      e.stopPropagation();
      const {dispatch} = this.props;
      if (clear) {
        dispatch(clearHello());
      } else {
        dispatch(hello('开启 React Router Redux Immutable 之旅吧！'));
      }
    };
  };

  toastHandle = (e) => {
    e.stopPropagation();
    this.props.dispatch(openToast('你好，这是一个 Toast，来体验 React 的美妙之处吧。希望能给你带去快乐！'));
  };

  handleToRoute = (route) => {
    return () => {
      this.props.history.push(route);
    };
  };

  render() {
    const {home, match, location} = this.props;
    const {pathname, key} = location;

    return (
      <div className={classNames(style.home, 'text-center')}>
        <h1 className="m-t-6">
          React Redux Router Immutable Webpack Less etc.
        </h1>
        <hr className="m-y-4"/>
        <div>
          <h3 className="m-y-4">{home.getIn(['homeHello', 'content'])}</h3>
          <div className="btn-group">
            <button className="btn btn-raised btn-primary"
                    onClick={this.helloHandle()}>欢迎您来到这里
            </button>
            <button className="btn btn-raised btn-secondary"
                    onClick={this.helloHandle(true)}>悄悄的离开
            </button>
            <button className="btn btn-raised btn-info"
                    onClick={this.toastHandle}>Toast
            </button>
          </div>
        </div>

        <div className="container">
          <hr/>
          <div className="row">
            <div className="offset-4 col-8">
              <p> 通过 NavLink 组件来处理路由跳转</p>
              <p>参数 replace 为 true 时表示替换， <a href="https://reacttraining.com/react-router/web/api/NavLink" target="_blank">官方 Api </a>
              </p>
              <div className="btn-group m-3">
                <NavLink className="btn btn-raised" activeClassName="btn-primary" to={`${match.url}route1`}>子路由1</NavLink>
                <NavLink className="btn btn-raised" activeClassName="btn-primary" to={`${match.url}route2`}>子路由2</NavLink>
              </div>
            </div>
            <div className="col-8">
              <p>通过点击调用 this.props.history.push 或</p>
              <p>this.props.history.replace 来处理路由跳转</p>
              <div className="btn-group m-3">
                <button className={classNames('btn btn-raised', {'btn-primary': pathname === `${match.url}route1`})} onClick={this.handleToRoute(`${match.url}route1`)}>子路由1</button>
                <button className={classNames('btn btn-raised', {'btn-primary': pathname === `${match.url}route2`})} onClick={this.handleToRoute(`${match.url}route2`)}>子路由2</button>
              </div>
            </div>
          </div>
          <TransitionGroup>
            <CSSTransition key={key} classNames="animate-right" timeout={{exit: 300, enter: 300}}>
              <Switch location={location}>
                {/* 这里使用异步加载 */}
                <Route path={`${match.url}route1`} component={Loadable({
                  loader: () => import('./components/HomeRoute1'),
                  loading: LoadingComponent,
                })}/>
                <Route path={`${match.url}route2`} component={Loadable({
                  loader: () => import('./components/HomeRoute2'),
                  loading: LoadingComponent,
                })}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
