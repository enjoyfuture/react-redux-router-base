import {fromJS} from 'immutable';
import {fetchFilm} from '../services/film';

export default {
  namespace: 'film',
  state: fromJS({
    all: null,
    popularity: null,
  }),
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        console.log(location);
      });
    },
  },
  reducers: {
    filmList(
      state,
      {
        payload: {data, type},
      }
    ) {
      return state.set(type, fromJS(data));
    },
  },

  effects: {
    /*
     * (action, effects)
     * 拉取数据
     */
    *getFilmList({payload = {}}, {call, put, select}) {
      const {type} = payload;
      const {data} = yield call(fetchFilm, {
        type,
      });

      yield put({
        type: 'filmList',
        payload: {data, type},
      });
    },
  },
};
