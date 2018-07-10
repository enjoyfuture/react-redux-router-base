import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './style.scss';
const cx = classNames.bind(style);

const FilmList = ({ film, activeTab }) => {
  const allFilmList = film.get('all');
  const popularityFilmList = film.get('popularity');

  const filmList = activeTab === 'all' ? allFilmList : popularityFilmList;

  if (!filmList) {
    return null;
  } else if (filmList.size === 0) {
    return (
      <div className={cx('no-items')}>
        <div className={cx('no-items-icon')} />
        <p>暂无记录</p>
      </div>
    );
  }

  return (
    <ul className="list list-border">
      {filmList.map((item, index, list) => (
        <li key={item.get('id')} className="list-item">
          <a href={item.get('link')} target="_blank">
            {item.get('name')}
          </a>
        </li>
      ))}
    </ul>
  );
};

FilmList.propTypes = {
  film: PropTypes.object,
  activeTab: PropTypes.string,
};

export default FilmList;
