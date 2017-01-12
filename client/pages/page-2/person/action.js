import callApi from '../../../utils/fetch';
import errorHandler from '../../../utils/errorHandler';

//获取 person 分页列表
//请求，该行为可不加，也可以改成全局的 action，待改进
function fetchPersonRequest() {
  return {
    type: 'person-list-request'
  };
}

// 成功
function fetchPersonSuccess(data, clear) {
  return {
    type: 'person-list-success',
    data,
    clear
  };
}

// 失败
function fetchPersonFailure(error) {
  return {
    type: 'person-list-failure',
    error
  };
}

function fetchPersonList(currentPage = 1, clear) {
  return (dispatch, getState) => {
    callApi({
      url: `person/list?currentPage=${currentPage}`,
    }).then((json) => {
      const {resultData} = json;
      if (!json) {
        return dispatch(fetchPersonFailure('请求失败'));
      }

      return dispatch(fetchPersonSuccess(resultData, clear));
    }, (error) => {
      const message = errorHandler(error);
      return dispatch(fetchPersonFailure(message));
    });
  };
}

export function getPersonList(clear) {
  return (dispatch, getState) => {
    const person = getState().get('person');
    const isFetching = person.get('isFetching');
    const entities = person.get('entities');
    //请求页码
    const currentPage = clear === true || !entities ? 1 : entities.get('currentPage') + 1;
    //最后一页
    const lastPage = clear === true || !entities ? false : entities.get('lastPage');

    if (isFetching || lastPage) {
      return null;
    }
    dispatch(fetchPersonRequest());
    return dispatch(fetchPersonList(currentPage, clear));
  };
}

//清空数据
export function clearPersonList() {
  return {
    type: 'person-clear',
  }
}

//修改
export function updatePerson(person) {
  return {
    type: 'person-update',
    person
  };
}

//删除
export function deletePerson(id) {
  return {
    type: 'person-delete',
    id
  };
}

//添加一列
export function addPerson(person) {
  return {
    type: 'person-add',
    person
  };
}
