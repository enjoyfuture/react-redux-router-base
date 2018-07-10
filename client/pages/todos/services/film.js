import callApi from '../../../utils/fetch';

// 拉取 Film 列表
export function fetchFilm({ type } = {}) {
  return callApi({
    url: `film/${type}`,
    options: {
      method: 'get',
    },
  });
}
