import callApi from '../../../utils/fetch';

// 拉取 Person 列表
export function fetchPerson({ body = {} }) {
  const { pageNum, pageSize } = body;
  return callApi({
    url: `person/paging?pageNum=${pageNum}&&pageSize=${pageSize}`,
    options: {
      method: 'get',
    },
  });
}

// 删除 Person
export function deletePerson({ body = {} }) {
  return callApi({
    url: 'person/delete',
    body,
  });
}

// 保存 Person
export function savePerson({ body = {} }) {
  return callApi({
    url: 'person/save',
    body,
  });
}
