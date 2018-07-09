import callApi from '../../../utils/fetch';

// 获取数据
export function fetchPersons({body = {}}) {
  return callApi({
    url: 'pipe/persons',
    body,
  });
}
