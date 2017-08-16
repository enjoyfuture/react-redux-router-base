import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Immutable from 'immutable';
import {getFilmList} from '../../action';
import {setCache} from '../../../../../common/action/caches';
import FilmList from '../FilmList';

import mainCss from '../../../../../utils/main-css';

class Film extends Component {
  static propTypes = {
    film: PropTypes.object,
    caches: PropTypes.object,
  };

  static contextTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'all'
    };

    this.name = '';
    this.animations = ['opacity', 'fade-in', 'burst-in', 'animate-right'];
  }

  componentWillMount() {
    this.switchTab('all')();
  }

  /*eslint-disable max-len*/

  // https://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710581&idx=1&sn=4f1d6594439ef59c00a6ae02b8b2a8ee&scene=0&uin=MTM4MDEzMzQxMw%3D%3D&key=1a6dc58b177dc62684c4d35441a1ece9fae7c32fd287bc4ee392ad381e23b83f382f5bd7a4720c828268d80c2f208aa0&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.6+build(15G1004)&version=11020113&lang=zh_CN&pass_ticket=D5FbIwwfJDVO%2FZY8dAdnoE5N4hN5zzu1HnU1wNa7ZnPSCdUqrPt63rJWiM6fh5xo
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeTab !== nextState.activeTab
      || !Immutable.is(this.props.film, nextProps.film);
  }

  switchTab = (type) => {
    return (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      const {dispatch} = this.context;
      const {caches} = this.props;

      this.setState({
        activeTab: type
      });

      if (!caches[`film-${type}`]) {
        dispatch(getFilmList(type));
        dispatch(setCache(`film-${type}`));
      }
    };
  };

  // CSSTransition 当 in 为 true，触发动画样式 example-enter CSS class and the example-enter-active CSS class
  // 当 in 为 false，触发动画样式 example-exit CSS class and the example-exit-active CSS class
  // 对于多个组件需要动画时，需要使用 TransitionGroup ，然后 children 中 用 CSSTransition 或 Transition包裹
  render() {
    const {film} = this.props;
    const {activeTab} = this.state;
    const random = Math.ceil(Math.random() * 10);
    let index = 0;
    if (random < 3 && random <= 5) {
      index = 1;
    } else if (random > 5 && random <= 7) {
      index = 2;
    } else {
      index = 3;
    }
    const transitionName = this.animations[index];

    /**
     * react 动画结合 css Module，解决的方法有两种，利用 :global 设置全局 css
     * 指定 transitionName 为 对象 Object prop。详见
     * https://github.com/css-modules/css-modules/issues/84
     */
    return (
      <div>
        <ul className={mainCss('nav', 'nav-pills')}>
          <li className={mainCss('nav-item')}>
            <a className={mainCss('nav-link', activeTab === 'all' ? 'active' : '')}
               onClick={this.switchTab('all')} href="#">全部</a>
          </li>
          <li className={mainCss('nav-item')}>
            <a className={mainCss('nav-link', activeTab === 'popularity' ? 'active' : '')}
               onClick={this.switchTab('popularity')} href="#">人气</a>
          </li>
        </ul>

        <TransitionGroup>
          <CSSTransition key={activeTab}
                         in={activeTab === 'popularity'}
                         classNames={transitionName}
                         timeout={{exit: 500, enter: 500}}>
            <div className={mainCss('mt-1')}>
              <FilmList film={film} activeTab={activeTab}/>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Film;
