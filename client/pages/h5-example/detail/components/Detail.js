import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';
import {connect} from 'react-redux';
import {getDetail} from '../action';
import {
thousands, toPercentNum, formatDate,
} from '../../../../utils/perfect';

import style from './index.scss';

const perfect = classNamesBind.bind(style);

// 采用装饰器处理
@connect(state => ({
  detail: state.get('detail'),
}))
export default class Detail extends Component {
  static propTypes = {
    match: PropTypes.object,
    detail: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false, // 加载数据
    };

    // 避免点透或快速点击多次
    this.clickEnable = false;
    setTimeout(() => {
      this.clickEnable = true;
    }, 500);
  }

  componentWillMount() {
    const {dispatch, match: {params: {projectId}}} = this.props;
    dispatch(getDetail(projectId));
  }

  componentWillReceiveProps(nextProps) {
    const {detail} = nextProps;
    if (detail && detail.get('data')) {
      this.setState({
        loaded: true,
      });
    }
  }

  // 项目说明或查看协议
  handlerDetail = (url) => {
    return () => {
      if (this.clickEnable) {
        // this.context.router.history.push(url);
      }
    };
  };

  render() {
    const {detail, match: {params: {projectId}}} = this.props;

    console.info('路由参数的用法:', projectId);

    // if (!detail || !detail.get('data')) {
    //   return (
    //     <div className="page-loading">载入中，请稍后 ...</div>
    //   );
    // }

    // const data = detail.get('data');
    //
    // const financingAmount = data.get('financingAmount'); // 项目金额
    // const rate = data.get('rate'); // 预计年化收益率，精确到小数点后4位
    // const investTerm = data.get('investTerm'); // 项目期限
    // const tradeTime = data.get('tradeTime'); // 买入时间
    // const rateDay = data.get('rateDay'); // 项目起息日,date对象
    // const ransomDay = data.get('ransomDay'); // 项目到期日,date对象
    // const tradeAmount = data.get('tradeAmount'); // 投资金额
    // const profit = data.get('profit'); // 预计收益
    // const projectName = data.get('projectName');
    // const agreementUrl = data.get('agreementUrl') ? encodeURIComponent(data.get('agreementUrl')) : null;

    return (
      <div className={style['investment-detail']}>
        <div className={style['investment-detail-header']}>
          <h5 className="text-ellipsis">连心投(第二期)</h5>
          <div className="row m-t-4 text-left m-l-2">
            <div className="col-10 f-border-right">
              <div className="text-muted">投资金额（元）</div>
              <div className="m-t-2 h3 text-nowrap">
                {thousands(1000000 / 100)}
              </div>
            </div>
            <div className="col-14">
              <div className="text-muted">预计收益（元）</div>
              <div className="m-t-2 h3 text-nowrap">
                {thousands(10000 / 100)}
              </div>
            </div>
          </div>
        </div>

        <div className={perfect('investment-spacing', 'investment-cycle')}>
          <div className="d-flex justify-content-between m-b-2">
            <div>买入日期</div>
            <div>开始起息</div>
            <div>项目到期</div>
          </div>
          <div className="progress progress-dot">
            <div className="progress-inner theme-error-bg" style={{width: '50%'}}/>
            <div className="progress-inner progress-baring" style={{width: '50%'}}/>
            <div className="progress-dot-inner active"/>
            <div className="progress-dot-inner active" style={{left: '50%'}}/>
            <div className="progress-dot-inner" style={{left: '100%'}}/>
          </div>
          <div className="d-flex justify-content-between m-t-2">
            <div>{formatDate({time: 1522598400000, showTime: false, shortYear: true})}</div>
            <div>{formatDate({time: 1522598400000, showTime: false, shortYear: true})}</div>
            <div>{formatDate({time: 1522598400000, showTime: false, shortYear: true})}</div>
          </div>
        </div>

        <ul className="list m-t-2">
          <li className="list-item">
            <span>项目金额</span>
            <span className="list-item-text-right">
              {thousands(10000000 / 100)}元
            </span>
          </li>
          <li className="list-divider list-divider-inset"/>
          <li className="list-item">
            <span>预计年化收益率</span>
            <span className="list-item-text-right">
              {toPercentNum(0.08, true)}
            </span>
          </li>
          <li className="list-divider list-divider-inset"/>
          <li className="list-item">
            <span>项目期限</span>
            <span className="list-item-text-right">{10}天</span>
          </li>
        </ul>

        <div className="list m-t-2">
          <div onTouchTap={this.handlerDetail(`/home/intro/${projectId}`)} className="list-item">
            项目说明
            <span className="list-item-icon-end icon-pure-caret-right"/>
          </div>
        </div>

        <div className="list m-t-2">
          <div onTouchTap={this.handlerDetail(`/home/investment/protocol/${''}/${''}`)} className="list-item">
            查看协议
            <span className="list-item-icon-end icon-pure-caret-right"/>
          </div>
        </div>
      </div>
    );
  }
}
