import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva/index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import FilmList from '../FilmList/index';
import pureRender from '../../../../../components/react-immutable-pure-decorator';

// 采用装饰器处理
@connect(({ film, caches }) => ({
  film,
  caches,
}))
@pureRender
class Film extends Component {
  static propTypes = {
    film: PropTypes.object,
    caches: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'all',
    };

    this.name = '';
    this.animations = ['opacity', 'fade-in', 'burst-in', 'animate-right'];
  }

  componentDidMount() {
    this.switchTab('all')();
  }

  switchTab = type => e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { caches, dispatch } = this.props;

    this.setState({
      activeTab: type,
    });

    if (!caches.get(`film-${type}`)) {
      dispatch({ type: 'film/getFilmList', payload: { type } });
      dispatch({ type: 'caches/setCache', payload: { key: `film-${type}` } });
    }
  };

  /*
   * CSSTransition 当 in 为 true，触发动画样式 example-enter CSS class and the example-enter-active CSS class
   * 当 in 为 false，触发动画样式 example-exit CSS class and the example-exit-active CSS class
   * 对于多个组件需要动画时，需要使用 TransitionGroup ，然后 children 中 用 CSSTransition 或 Transition包裹
   */
  render() {
    const { film } = this.props;
    const { activeTab } = this.state;
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
      <div className="p-x-2">
        <p className="m-b-4">调用全局 loading 效果</p>
        <div className="btn-group">
          <a
            className={classNames(
              'btn btn-raised',
              activeTab === 'all' ? 'btn-primary' : ''
            )}
            onClick={this.switchTab('all')}
            href="#"
          >
            全部
          </a>
          <a
            className={classNames(
              'btn btn-raised',
              activeTab === 'popularity' ? 'btn-primary' : ''
            )}
            onClick={this.switchTab('popularity')}
            href="#"
          >
            人气
          </a>
        </div>

        <TransitionGroup>
          <CSSTransition
            key={activeTab}
            in={activeTab === 'popularity'}
            classNames={transitionName}
            timeout={{ exit: 500, enter: 500 }}
          >
            <div className="m-t-1">
              <FilmList film={film} activeTab={activeTab} />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Film;
