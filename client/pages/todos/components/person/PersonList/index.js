import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'dva/router';
import classNames from 'classnames/bind';
import PersonItem from '../PersonItem/index';

import style from './style.module.scss';
import {connect} from 'react-redux';
import pureRender from '../../../../../components/react-immutable-pure-decorator';

const cx = classNames.bind(style);

// 采用装饰器处理
@connect(({person}) => ({
  person,
}))
@pureRender
export default class PersonList extends Component {
  static propTypes = {
    person: PropTypes.object,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: 'person/getPersonList', payload: {firstPage: true}});
  }

  // 加载更多
  loadMore = () => {
    const {person, dispatch} = this.props;
    const pageNum = person.get('pageNum');
    const totalPages = person.get('totalPages');
    if (pageNum < totalPages) {
      dispatch({type: 'person/getPersonList'});
    }
  };

  refresh = e => {
    const {dispatch} = this.props;
    dispatch({type: 'person/clearPersonList'});
    dispatch({type: 'person/getPersonList'});
  };

  renderList() {
    const {person} = this.props;

    const loading = person.get('loading');

    if (loading) {
      return <div className={cx('page-loading')}>载入中，请稍后 ...</div>;
    }

    const items = person.get('items');

    if (items.length === 0) {
      return (
        <div className={cx('no-items')}>
          <div className={cx('no-items-icon')} />
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
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <PersonItem key={item.get('id')} person={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const {person} = this.props;
    const pageNum = person.get('pageNum');
    const totalPages = person.get('totalPages');
    return (
      <div>
        <div className="m-b-4">
          <NavLink className="btn btn-primary btn-raised" to="/person/create">
            Add Person
          </NavLink>
        </div>
        {this.renderList()}
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary btn-raised"
            disabled={pageNum >= totalPages}
            onClick={this.loadMore}
          >
            Load More
          </button>
          <button
            type="button"
            className="btn btn-info btn-raised"
            onClick={this.refresh}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
}
