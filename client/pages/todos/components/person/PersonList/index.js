import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { NavLink } from 'dva/router';
import classNames from 'classnames/bind';
import PersonItem from '../PersonItem/index';

import style from './style.module.scss';
import pureRender from '../../../../../components/react-immutable-pure-decorator';

const cx = classNames.bind(style);

// 采用装饰器处理
@connect(({ person, loading }) => ({
  person,
  loading: loading.effects['person/getPersonList'] || false,
}))
@pureRender
class PersonList extends Component {
  static propTypes = {
    person: PropTypes.object,
    loading: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'person/getPersonList', payload: { firstPage: true } });
  }

  // 加载更多
  loadMore = () => {
    const { person, dispatch } = this.props;
    const pageNum = person.get('pageNum');
    const totalPages = person.get('totalPages');
    if (pageNum < totalPages) {
      dispatch({ type: 'person/getPersonList' });
    }
  };

  refresh = e => {
    const { dispatch } = this.props;
    dispatch({ type: 'person/getPersonList', payload: { firstPage: true } });
  };

  renderList() {
    const { person, dispatch, loading } = this.props;

    const items = person.get('items');

    if (!items) {
      return null;
    }

    if (items.size === 0) {
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
            {items.map((item, index) => (
              <PersonItem
                key={item.get('id')}
                person={item}
                index={index}
                dispatch={dispatch}
              />
            ))}
          </tbody>
        </table>
        {loading ? (
          <div className={cx('page-loading')}>载入中，请稍后 ...</div>
        ) : null}
      </div>
    );
  }

  render() {
    const { person } = this.props;
    const pageNum = person.get('pageNum');
    const totalPages = person.get('totalPages');
    return (
      <div>
        <div className="m-b-4">
          <NavLink
            className="btn btn-primary btn-raised"
            to="/todos/person/create"
          >
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

export default PersonList;
