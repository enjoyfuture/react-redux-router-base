import {fromJS} from 'immutable';
import {fetchPersons} from '../services';

export default {
  namespace: 'demo',
  state: fromJS({
    persons: [], //
  }),
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        // console.log(location);
      });
    },
  },
  reducers: {
    persons(
      state,
      {
        payload: {data},
      }
    ) {
      return state.set('persons', fromJS(data));
    },
  },
  effects: {
    /*
     * (action, effects)
     * 拉取数据
     */
    *getPerson({payload = {}}, {call, put}) {
      const {body} = payload;
      const {data} = yield call(fetchPersons, {body});
      yield put({type: 'persons', payload: {data}});
    },
  },
};
