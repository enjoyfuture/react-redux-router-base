import callApi from '../../../utils/fetch';
import errorHandler from '../../../utils/errorHandler';

//获取 film 列表
// 成功
function fetchFilmSuccess(data, type) {
  return {
    type: `film-${type}-success`,
    data,
  };
}

// 失败
function fetchFilmFailure(error) {
  return {
    type: 'film-list-failure',
    error
  };
}

//返回电影列表
export function getFilmList(type) {
  return (dispatch, getState) => {
    callApi({
      url: `page-2/film/${type}`,
    }).then((json) => {
      const {data} = json;
      if (!json) {
        return dispatch(fetchFilmFailure('请求失败'));
      }

      return dispatch(fetchFilmSuccess(data, type));
    }, (error) => {
      const message = errorHandler(error);
      return dispatch(fetchFilmFailure(message));
    });
  };
}
