import {fromJS} from 'immutable';

/**
 *
 * 返回的数据格式为
 {
  isFetching: false,
  paging: {
    pageNum: 1,
    lastPage: false,
    totalPages: 12,
    totalCount: 59,
    items: [{}, {}] //分页数据
  }
 }
 */
function person(state = fromJS({
  isFetching: false,
}), action) {
  const {type} = action;
  switch (type) {
  case 'person-list-request':
    return state.set('isFetching', true);
  case 'person-list-failure': {
    return state.set('isFetching', false);
  }
  case 'person-list-success': {
    const {data, clear} = action;
    const paging = state.get('paging');
    //初始化时或者先清空数据时
    if (!paging || clear === true) {
      return state.set('isFetching', false).set('paging', fromJS(data));
    } else {
      return state.set('isFetching', false)
        .updateIn(['paging'], (paging) => {
          let map = fromJS(data);
          const _items = map.get('items');
          if (_items) {
            map = map.delete('items');
            return paging.mergeDeep(map).updateIn(['items'], items => items.concat(_items));
          } else {
            return paging.mergeDeep(map);
          }
        });
    }
  }
  case 'person-clear':
    return state.clear();
  case 'person-update': {
    const {person} = action;
    return state.updateIn(['paging', 'items'], (items) => {
      return items.map((item) => {
        if (item.get('id') === person.get('id')) {
          return person;
        } else {
          return item;
        }
      })
    });
  }
  case 'person-add': {
    const {person} = action;
    const paging = state.get('paging');
    let _state = state;
    if (!paging) {
      _state = state.set('paging', fromJS({
        pageNum: 1,
        lastPage: false,
        items: []
      }));
    }
    return _state.updateIn(['paging', 'items'], (items) => {
      return items.unshift(fromJS(person));
    });
  }
  case 'person-delete': {
    const {id} = action;
    return state.updateIn(['paging', 'items'], (items) => {
      return items.filter(item => item.get('id') !== id);
    });
  }
  default:
    return state;
  }
}

export default person;
