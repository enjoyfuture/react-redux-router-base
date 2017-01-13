import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import Immutable from 'immutable';
import {getFilmList} from '../../action';
import {setCache} from '../../../../../common/action/caches';
import FilmList from '../FilmList';

import './style.less'

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
    this.animations = ['opacity', 'fade-in', 'burst-in'];
  }

  componentWillMount() {
    this.switchTab('all')();
  }

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

  render() {
    const {film} = this.props;
    const {activeTab} = this.state;
    const random = Math.ceil(Math.random() * 10);
    let index = 0;
    if (random > 4 && random < 8) {
      index = 1;
    } else if (random >= 8) {
      index = 2;
    }
    const transitionName = this.animations[index];

    /**
     * react 动画结合 css Module，解决的方法有两种，利用 :global 设置全局 css
     * 指定 transitionName 为 对象 Object prop。详见
     * https://github.com/css-modules/css-modules/issues/84
     */
    return (
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className={classNames('nav-link', activeTab === 'all' ? 'active' : '')}
               onClick={this.switchTab('all')}>全部</a>
          </li>
          <li className="nav-item">
            <a className={classNames('nav-link', activeTab === 'popularity' ? 'active' : '')}
               onClick={this.switchTab('popularity')}>人气</a>
          </li>
        </ul>
        <ReactCSSTransitionGroup
          component="div"
          transitionName={transitionName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={200}>
          <div className="tab-content mt-1" key={activeTab}>
            <FilmList film={film} activeTab={activeTab}/>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Film;
