import {fromJS} from 'immutable';
import {fetchPerson, deletePerson, savePerson} from '../services/person';

// 初始化数据
const initialState = {
  loading: false,
  pageNum: 1,
  pageSize: 20,
  items: [], // 分页数据
  totalPages: 1,
};

export default {
  namespace: 'person',
  state: fromJS(initialState),
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    // 设置加载中和加载结束
    loading(
      state,
      {
        payload: {loading},
      }
    ) {
      return state.set('loading', loading);
    },

    init(
      state,
      {
        payload: {data},
      }
    ) {
      return state.merge(fromJS(data)).set('loading', false);
    },

    // 追加 items
    append(
      state,
      {
        payload: {data},
      }
    ) {
      const {pageNum, items} = data;

      return state
        .update('items', _data => _data.concat(fromJS(items)))
        .set('pageNum', pageNum)
        .set('loading', false);
    },

    // 清空/初始化数据
    clearPerson() {
      return fromJS(initialState);
    },

    // 修改
    updatePerson(
      state,
      {
        payload: {person, index},
      }
    ) {
      return state.updateIn(['items', index], () => person);
    },

    // 删除
    removePerson(
      state,
      {
        payload: {index},
      }
    ) {
      return state.update('items', items => items.delete(index));
    },

    // 添加一列
    addPerson(
      state,
      {
        payload: {person},
      }
    ) {
      return state.update('items', items => items.unshift(fromJS(person)));
    },
  },

  effects: {
    /*
     * (action, effects)
     * 拉取分页数据
     */
    *getPersonList({payload = {}}, {call, put, select}) {
      // 加载中
      yield put({
        type: 'loading',
        payload: {loading: true},
      });

      // 如果不是第一页，页码
      const {firstPage} = payload;
      const person = yield select(state => state.person);
      const pageNum = person.get('pageNum');
      const {data} = yield call(fetchPerson, {
        body: {
          pageNum: firstPage ? 1 : pageNum + 1,
          pageSize: person.get('pageSize'),
        },
      });

      if (firstPage) {
        yield put({
          type: 'init',
          payload: {data},
        });
      } else {
        yield put({
          type: 'append',
          payload: {data: {...data, pageNum: pageNum + 1}},
        });
      }
    },

    *deletePerson({payload = {}}, {call, put, select}) {
      const {id, index} = payload;

      yield call(deletePerson, {
        body: {id},
      });

      yield put({
        type: 'removePerson',
        payload: {index},
      });
    },

    *savePerson({payload = {}}, {call, put, select}) {
      const {body} = payload;

      const {data} = yield call(savePerson, {
        body,
      });

      yield put({
        type: 'addPerson',
        payload: {person: {...body, id: data.id}},
      });
    },
  },
};
