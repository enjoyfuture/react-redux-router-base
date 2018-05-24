import {CALL_API} from '../../../middlewares/api';

// fetch 电影列表
export function getFilmList(type) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        types: {
          success: `film-${type}-success`,
        },
        url: `page-2/film/${type}`,
        loading: true,
      }
    });
  };
}
