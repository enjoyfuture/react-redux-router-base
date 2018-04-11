import {CALL_API} from '../../../middlewares/api';

// fetch 电影数据
function fetchFilmList(type = 'all') {
  return {
    [CALL_API]: {
      types: {
        request: `film-${type}-request`,
        success: `film-${type}-success`,
        failure: `film-${type}-failure`
      },
      url: `page-2/film/${type}`
    }
  };
}

// 返回电影列表
export function getFilmList(type) {
  return (dispatch, getState) => {
    return dispatch(fetchFilmList(type));
  };
}
