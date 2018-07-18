import { fromJS } from 'immutable';
import { fetchPerson, deletePerson, savePerson } from '../services/person';

// 初始化数据
const initialState = {
  pageNum: 1,
  pageSize: 20,
  items: [], // 分页数据
  totalPages: 1,
};

export default {
  namespace: 'person',
  state: fromJS(initialState),
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    init(
      state,
      {
        payload: { data },
      }
    ) {
      return state.merge(fromJS(data));
    },

    // 追加 items
    append(
      state,
      {
        payload: { data },
      }
    ) {
      const { pageNum, items } = data;

      return state
        .update('items', _oldItems => _oldItems.concat(fromJS(items)))
        .set('pageNum', pageNum);
    },

    // 清空/初始化数据
    clear() {
      return fromJS(initialState);
    },

    // 修改
    update(
      state,
      {
        payload: { person, index },
      }
    ) {
      return state.updateIn(['items', index], () => person);
    },

    // 删除
    remove(
      state,
      {
        payload: { index },
      }
    ) {
      return state.update('items', items => items.delete(index));
    },

    // 添加一列
    add(
      state,
      {
        payload: { person },
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
    *getPersonList({ payload = {} }, { call, put, select }) {
      // 如果不是第一页，页码
      const { firstPage } = payload;
      const person = yield select(state => state.person);
      const pageNum = person.get('pageNum');
      const { data } = yield call(fetchPerson, {
        body: {
          pageNum: firstPage ? 1 : pageNum + 1,
          pageSize: person.get('pageSize'),
        },
      });

      if (firstPage) {
        yield put({
          type: 'init',
          payload: { data },
        });
      } else {
        yield put({
          type: 'append',
          payload: { data: { ...data, pageNum: pageNum + 1 } },
        });
      }
    },

    *addPerson({ payload = {} }, { call, put, select }) {
      const { body } = payload;

      const { data } = yield call(savePerson, {
        body,
      });

      yield put({
        type: 'add',
        payload: { person: { ...body, id: data.id } },
      });
    },

    *deletePerson({ payload = {} }, { call, put, select }) {
      const { id, index } = payload;

      yield call(deletePerson, {
        body: { id },
      });

      yield put({
        type: 'removePerson',
        payload: { index },
      });
    },
  },
};
