import callApi from '../../../utils/fetch';

export function fetchPerson({ body = {} }) {
  const { pageNum, pageSize } = body;
  return callApi({
    url: `person/paging?pageNum=${pageNum}&&pageSize=${pageSize}`,
    options: {
      method: 'get',
    },
  });
}
