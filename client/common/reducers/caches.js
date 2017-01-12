import {Map} from 'immutable';

//处理缓存数据
export default function caches(state = Map(), action) {
  switch (action.type) {
  case 'add_cache':
    return state.set(action.id, action.value || true);
  case 'remove_cache': {
    const {ids = []} = action;
    let _state = state;
    ids.forEach((item) => {
      _state = _state.remove(item);
    });
    return _state;
  }
  case 'clear_cache':
    return state.clear();
  default:
    return state;
  }
}
