import {Map, fromJS} from 'immutable';

function detail (state = Map(), action) {
  const {type, resultData} = action;
  if (type === 'detail-success') {
    return state.set('data', fromJS(resultData));
  }
  return state;
}

export default detail;

