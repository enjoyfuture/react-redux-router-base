import {Map, fromJS} from 'immutable';

/*eslint-disable indent*/
/**
 * 加工处理action 拿到的数据
 * @param types reducer 对应的 Types
 * @param customTypes 自定义 type
 * @returns {processData}
 */
function process({types, customTypes}) {
  const {request, success, failure, clean} = types;
  const customTypesArray = customTypes ? Object.keys(customTypes) : [];

  // 加工数据，相当于平时直接在 reducer 中处理，这是这里统一封装了 request success failure 等
  function processByFetchType(state, action) {
    switch (action.type) {
      case request:
        return state.set('isFetching', true);
      case success: {
        /**
         * entities 设置 fetch 请求的数据
         */
        const {data, clean} = action;
        const entities = state.get('entities');
        //初始化时或者先清空数据时
        if (!entities || clean === true) {
          return state.set('isFetching', false).set('entities', fromJS(data));
        } else {
          return state.set('isFetching', false)
            .updateIn(['entities'], (entities) => {
              let map = fromJS(data);
              const _items = map.get('items');
              //对于分页的需要单独处理
              if (_items) {
                map = map.delete('items');
                return entities.mergeDeep(map).updateIn(['items'], items => items.concat(_items));
              } else {
                return entities.mergeDeep(map);
              }
            });
        }
      }
      case failure:
        return state.set('isFetching', false);
      default:
        return state;
    }
  }

  /**
   * 处理数据
   */
  return function processData(state = Map({
    isFetching: false
  }), action) {
    // 处理自定义的 types
    if (customTypesArray.indexOf(action.type) !== -1) {
      return customTypes[action.type](state, action);
    }

    switch (action.type) {
      // 清空数据
      case clean:
        return state.delete('entities');
      // 处理请求结果
      case request:
      case success:
      case failure: {
        return processByFetchType(state, action);
      }
      default:
        return state;
    }
  };
}

export default process;
