import {
  PERSON_REQUEST, PERSON_SUCCESS, PERSON_FAILURE, PERSON_CLEAN,
  PERSON_UPDATE, PERSON_DELETE, PERSON_ADD
} from './constant';
import {CALL_API} from '../../util/middleware-api';

function fetchPersonList(currentPage, clean) {
  return {
    [CALL_API]: {
      types: {
        request: PERSON_REQUEST,
        success: PERSON_SUCCESS,
        failure: PERSON_FAILURE
      },
      url: `person/list?currentPage=${currentPage}`,
      clean
    }
  };
}

//获取 person 分页列表
export function getPersonList(clean) {
  return (dispatch, getState) => {
    const person = getState().get('person');
    const isFetching = person.get('isFetching');
    const entities = person.get('entities');
    //请求页码
    const currentPage = clean === true || !entities ? 1 : entities.get('currentPage') + 1;
    //最后一页
    const lastPage = clean === true || !entities ? false : entities.get('lastPage');

    if (isFetching || lastPage) {
      return null;
    }
    return dispatch(fetchPersonList(currentPage, clean));
  };
}

//清空数据
export function cleanPersonList() {
  return {
    type: PERSON_CLEAN
  }
}

//修改
export function updatePerson(person) {
  return {
    type: PERSON_UPDATE,
    person
  };
}

//删除
export function deletePerson(id) {
  return {
    type: PERSON_DELETE,
    id
  };
}

//添加一列
export function addPerson(person) {
  return {
    type: PERSON_ADD,
    person
  };
}
