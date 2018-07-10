import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../../../utils/fetch';

export class Com2 extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  toast = () => {
    this.context.dispatch({
      type: 'toast/show',
      payload: { content: 'Module-1 Com-2' },
    });
  };

  handleFetch = url => () => {
    callApi({
      url,
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="m-y-4">Module-1 Com-2</h3>
        <button
          type="button"
          className="btn btn-primary btn-raised"
          onClick={this.toast}
        >
          Toast
        </button>

        <div className="m-t-5">
          <p>多接口数据请求，返回数据请在控制台中查看</p>
          <div className="btn-group m-t-4">
            <button
              type="button"
              className="btn btn-primary btn-raised"
              onClick={this.handleFetch('page-1/sync-list')}
            >
              同步
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-raised"
              onClick={this.handleFetch('page-1/async-list')}
            >
              异步
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Com2;
