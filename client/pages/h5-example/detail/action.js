import callApi from '../../../utils/fetch';
import errorHandler from '../../../utils/error-handler';

// 成功
function fetchDetailSuccess(resultData) {
  return {
    type: 'detail-success',
    resultData,
  };
}

// 失败
function fetchDetailFailure(error) {
  return {
    type: 'detail-failure',
    error
  };
}

export function getDetail(projectId) {
  return (dispatch, getState) => {
    callApi({
      url: 'order/-detail',
      body: {
        projectId
      }
    }).then((json) => {
      if (!json) {
        return dispatch(fetchDetailFailure('请求失败'));
      }

      const {resultData} = json;
      return dispatch(fetchDetailSuccess(resultData));
    }, (error) => {
      const message = errorHandler(error);
      return dispatch(fetchDetailFailure(message));
    });
  };
}
