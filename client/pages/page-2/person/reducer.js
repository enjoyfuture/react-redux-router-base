import {Map, fromJS} from 'immutable';

/**
 * customTypes 根据实际业务需求自定义 reducer
 */
function person(state = Map(), action) {
  const {type} = action;
  switch (type) {
  case 'person-list-request':
    return state.set('isFetching', true);
  case 'person-list-failure': {
    return state.set('isFetching', false);
  }
  case 'person-list-success': {
    /**
     * 返回的数据格式为
     {
      isFetching: false,
      paging: {
        currentPage: 1,
        lastPage: false,
        items: [{}, {}] //分页数据
      }
     }
     */
    const {data, clean} = action;
    const items = state.get('items');
    //初始化时或者先清空数据时
    if (!items || clean === true) {
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
    return state.updateIn(['paging', 'items'], (items) => {
      return items.unshift(person);
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
