import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames/bind';
import PersonItem from '../PersonItem';
import {getPersonList} from '../../action';

import style from './style.scss';
import {connect} from 'react-redux';
const cx = classNames.bind(style);

// 采用装饰器处理
@connect(state => ({
  person: state.get('person'),
}))
export default class PersonList extends Component {
  static propTypes = {
    person: PropTypes.object,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const {person, dispatch} = this.props;
    // 如果第一次需加载列表
    const paging = person.get('paging');
    if (!paging) {
      dispatch(getPersonList(true));
    }
  }

  // 加载更多
  loadMore = () => {
    const {person} = this.props;
    const {dispatch} = this.props;
    const isFetching = person.get('isFetching');
    const paging = person.get('paging');
    const lastPage = paging.get('lastPage');
    if (!isFetching && !lastPage) {
      dispatch(getPersonList());
    }
  };

  refresh = (e) => {
    const {dispatch} = this.props;
    dispatch(getPersonList(true));
  };

  renderList() {
    const {person} = this.props;
    const paging = person.get('paging');

    if (!paging) {
      return (
        <div className={cx('page-loading')}>载入中，请稍后 ...</div>
      );
    }

    const items = paging.get('items');

    if (items.size === 0) {
      return (
        <div className={cx('no-items')}>
          <div className={cx('no-items-icon')}/>
          <p>暂无记录</p>
        </div>
      );
    }

    return (
      <div>
        <table className="table table-thead-primary table-striped table-hover-primary">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {
              items ? items.map((item) => {
                return (
                  <PersonItem key={item.get('id')} person={item}/>
                );
              }) : null
            }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const {person} = this.props;
    const paging = person.get('paging');
    const lastPage = paging && paging.get('lastPage');
    return (
      <div>
        <div className="m-b-4">
          <NavLink className="btn btn-primary btn-raised" to="/person/create">Add Person</NavLink>
        </div>
        {this.renderList()}
        <div className="btn-group">
          <button type="button" className="btn btn-primary btn-raised" disabled={lastPage}
                  onClick={this.loadMore}>Load More
          </button>
          <button type="button" className="btn btn-info btn-raised"
                  onClick={this.refresh}>Refresh
          </button>
        </div>
      </div>
    );
  }
}
