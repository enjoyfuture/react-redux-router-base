import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import PersonItem from '../PersonItem';
import {getPersonList} from '../../action';
import './style.less'

class PersonList extends Component {
  static propTypes = {
    person: PropTypes.object,
  };
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const {person} = this.props;
    const {dispatch} = this.context;
    // 如果第一次需加载列表
    const paging = person.get('paging');
    if (!paging) {
      dispatch(getPersonList(true));
    }
  }

  //加载更多
  loadMore = () => {
    const {person} = this.props;
    const {dispatch} = this.context;
    const isFetching = person.get('isFetching');
    const paging = person.get('paging');
    const lastPage = paging.get('lastPage');
    if (!isFetching && !lastPage) {
      dispatch(getPersonList());
    }
  };

  refresh = (e) => {
    const {dispatch} = this.context;
    dispatch(getPersonList(true));
  };

  renderList() {
    const {person} = this.props;
    const isFetching = person.get('isFetching');
    const paging = person.get('paging');

    if (!paging) {
      return (
        <div className="page-loading">载入中，请稍后 ...</div>
      );
    }

    const lastPage = paging.get('lastPage');
    const items = paging.get('items');

    if (items.size === 0) {
      return (
        <div className="no-items">
          <div className="no-items-icon"></div>
          <p>暂无记录</p>
        </div>
      );
    }

    return (
      <div>
        <table className="table">
          <thead className="thead-inverse">
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
        <div className="mb-1">
          <Link className="btn btn-primary" to="/person/create">Add Person</Link>
        </div>
        {this.renderList()}
        <div className="btn-group">
          <button type="button" className="btn btn-primary" disabled={lastPage}
                  onClick={this.loadMore}>Load More
          </button>
          <button type="button" className="btn btn-info"
                  onClick={this.refresh}>Refresh
          </button>
        </div>
      </div>
    );
  }
}

export default PersonList;
