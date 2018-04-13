import {CALL_API} from '../../../middlewares/api';

export function getPersonList(clear) {
  return (dispatch, getState) => {
    const person = getState().get('person');
    const isFetching = person.get('isFetching');
    const paging = person.get('paging');
    // 请求页码
    const pageNum = clear === true || !paging ? 1 : paging.get('pageNum') + 1;
    // 最后一页
    const lastPage = clear === true || !paging ? false : paging.get('lastPage');

    if (isFetching || lastPage) {
      return null;
    }

    return dispatch({
      [CALL_API]: {
        types: {
          request: 'person-list-request',
          success: 'person-list-success',
        },
        url: `page-2/person?pageNum=${pageNum}`,
        clear,
        options: {
          method: 'get',
        },
      }
    });
  };
}

// 清空数据
export function clearPersonList() {
  return {
    type: 'person-clear',
  }
}

// 修改
export function updatePerson(person) {
  return {
    type: 'person-update',
    person
  };
}

// 删除
export function deletePerson(id) {
  return {
    type: 'person-delete',
    id
  };
}

// 添加一列
export function addPerson(person) {
  return {
    type: 'person-add',
    person
  };
}
