import React from 'react';
import classNames from 'classnames';
import style from './style.scss';

const IconFont = () => {
  return (
    <div className="container m-t-4">
      <p className="m-b-4">图标使用阿里提供的图标库 <a href="http://www.iconfont.cn/" target="_blank">http://www.iconfont.cn/</a></p>
      <div className="clearfix">
        <div className={classNames('float-left', style['icon-wrap'])}>
          <i className="icon icon-search"/>
        </div>
        <div className={classNames('float-left', style['icon-wrap'])}>
          <i className="icon icon-plus"/>
        </div>
      </div>
    </div>
  );
};

export default IconFont;
