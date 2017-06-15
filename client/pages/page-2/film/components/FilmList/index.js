import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.scss';
const cx = classNames.bind(style);

const FilmList = ({film, activeTab}) => {
  const allFilmList = film.get('allFilmList');
  const popularityFilmList = film.get('popularityFilmList');

  const filmList = activeTab === 'all' ? allFilmList : popularityFilmList;
  const items = filmList.get('items');

  if (!items) {
    return (
      <div className={cx('page-loading')}>载入中，请稍后 ...</div>
    );
  } else if (items.size === 0) {
    return (
      <div className={cx('no-items')}>
        <div className={cx('no-items-icon')}></div>
        <p>暂无记录</p>
      </div>
    );
  }

  return (
    <ul className={cx('list-group')}>
      {
        //item 是每条记录，index 下标值，list 所有数据
        items.map((item, index, list) => {
          return (
            <li key={item.get('id')} className={cx('list-group-item')}>
              <a href={item.get('link')} target="_blank">{item.get('name')}</a>
            </li>
          );
        })
      }
    </ul>
  );
};

FilmList.propTypes = {
  film: PropTypes.object,
  activeTab: PropTypes.string,
};

export default FilmList;
